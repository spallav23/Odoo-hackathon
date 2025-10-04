from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import User, Company, Expense, ApprovalStep, EmployeeManager
from .serializers import UserSerializer, CompanySerializer, ExpenseSerializer, ApprovalStepSerializer

# Users
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Companies
class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

# Expenses
class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        expense = self.get_object()
        approver = request.user
        step = ApprovalStep.objects.filter(expense=expense, approver=approver, approved=None).first()
        if not step:
            return Response({"detail": "Not allowed to approve"}, status=status.HTTP_403_FORBIDDEN)

        step.approved = True
        step.comments = request.data.get('comments', '')
        step.save()

        # Move to next approver
        next_step = ApprovalStep.objects.filter(expense=expense, approved=None).order_by('sequence').first()
        if next_step:
            expense.current_approver = next_step.approver
        else:
            expense.status = 'approved'
            expense.current_approver = None
        expense.save()
        return Response({"detail": "Approved successfully"})
    
    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        expense = self.get_object()
        approver = request.user
        step = ApprovalStep.objects.filter(expense=expense, approver=approver, approved=None).first()
        if not step:
            return Response({"detail": "Not allowed to reject"}, status=status.HTTP_403_FORBIDDEN)

        step.approved = False
        step.comments = request.data.get('comments', '')
        step.save()
        expense.status = 'rejected'
        expense.current_approver = None
        expense.save()
        return Response({"detail": "Rejected successfully"})
