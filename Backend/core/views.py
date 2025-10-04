from rest_framework import viewsets, status, generics
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.serializers import ModelSerializer, CharField
from django.contrib.auth import get_user_model

from .models import User, Company, Expense, ApprovalStep, EmployeeManager
from .serializers import (
    UserSerializer,
    CompanySerializer,
    ExpenseSerializer,
    EmployeeManagerSerializer,
)
from .permissions import IsAdmin, IsManager, IsEmployee


# -------------------
# User, Company, EmployeeManager
# -------------------
class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdmin]  # Only admin can manage users

    def get_queryset(self):
        user = self.request.user
        if user.role == "admin":
            return User.objects.filter(company=user.company)
        return User.objects.none()


class CompanyViewSet(viewsets.ModelViewSet):
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def get_queryset(self):
        user = self.request.user
        if user.role == "admin":
            return Company.objects.filter(id=user.company.id)
        return Company.objects.none()


class EmployeeManagerViewSet(viewsets.ModelViewSet):
    queryset = EmployeeManager.objects.all()
    serializer_class = EmployeeManagerSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    @action(detail=False, methods=["get"])
    def team(self, request):
        """Get employees under a manager"""
        manager = request.user
        employees = EmployeeManager.objects.filter(manager=manager)
        serializer = self.get_serializer(employees, many=True)
        return Response(serializer.data)


# -------------------
# Expenses
# -------------------
class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == "employee":
            return Expense.objects.filter(employee=user)
        elif user.role == "manager":
            return Expense.objects.filter(current_approver=user)
        else:
            return Expense.objects.all()

    def perform_create(self, serializer):
        expense = serializer.save(employee=self.request.user, status="pending")
        managers = self.request.user.managers.all()
        if managers.exists():
            for i, em in enumerate(managers):
                ApprovalStep.objects.create(
                    expense=expense, approver=em.manager, sequence=i + 1
                )
            expense.current_approver = managers.first().manager
            expense.save()
        else:
            expense.status = "approved"
            expense.current_approver = None
            expense.save()

    @action(detail=True, methods=["post"])
    def approve(self, request, pk=None):
        expense = self.get_object()
        approver = request.user
        step = ApprovalStep.objects.filter(
            expense=expense, approver=approver, approved=None
        ).first()
        if not step:
            return Response(
                {"detail": "Not allowed to approve"}, status=status.HTTP_403_FORBIDDEN
            )
        step.approved = True
        step.comments = request.data.get("comments", "")
        step.save()

        next_step = (
            ApprovalStep.objects.filter(expense=expense, approved=None)
            .order_by("sequence")
            .first()
        )
        if next_step:
            expense.current_approver = next_step.approver
        else:
            expense.status = "approved"
            expense.current_approver = None
        expense.save()
        return Response({"detail": "Approved successfully"})

    @action(detail=True, methods=["post"])
    def reject(self, request, pk=None):
        expense = self.get_object()
        approver = request.user
        step = ApprovalStep.objects.filter(
            expense=expense, approver=approver, approved=None
        ).first()
        if not step:
            return Response(
                {"detail": "Not allowed to reject"}, status=status.HTTP_403_FORBIDDEN
            )
        step.approved = False
        step.comments = request.data.get("comments", "")
        step.save()
        expense.status = "rejected"
        expense.current_approver = None
        expense.save()
        return Response({"detail": "Rejected successfully"})


# -------------------
# Signup for Admin
# -------------------
User = get_user_model()


class SignupSerializer(ModelSerializer):
    password = CharField(write_only=True)

    class Meta:
        model = User
        fields = ("username", "password", "email", "role", "company")

    def create(self, validated_data):
        company = validated_data.get("company")
        if not company and validated_data.get("role") == "admin":
            company = Company.objects.create(name=f"{validated_data['username']}'s Company")

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email"),
            password=validated_data["password"],
            role=validated_data.get("role", "employee"),
            company=company,
        )
        return user


class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = SignupSerializer
    permission_classes = [IsAdminUser]  # Only admin can create users


# -------------------
# Change Password API
# -------------------
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    old_password = request.data.get("old_password")
    new_password = request.data.get("new_password")

    if not user.check_password(old_password):
        return Response({"detail": "Old password incorrect"}, status=400)

    user.set_password(new_password)
    user.save()
    return Response({"detail": "Password updated successfully"})
