from rest_framework import serializers
from .models import User, Company, Expense, ApprovalStep, EmployeeManager

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password',)

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'

class ApprovalStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApprovalStep
        fields = '__all__'

class EmployeeManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeManager
        fields = '__all__'
