from rest_framework import serializers
from .models import User, Company, Expense, ApprovalStep, EmployeeManager
from django.contrib.auth import get_user_model

User = get_user_model()


# -------------------
# Signup Serializer
# -------------------
class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("username", "password", "email", "role", "company")

    def create(self, validated_data):
        # Auto-create company for admin if not provided
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


# -------------------
# Company Serializer
# -------------------
class CompanySerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Company
        fields = "__all__"


# -------------------
# User Serializer
# -------------------
class UserSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    company = CompanySerializer(read_only=True)

    class Meta:
        model = User
        exclude = ("password",)


# -------------------
# Expense Serializer
# -------------------
class ExpenseSerializer(serializers.ModelSerializer):
    employee = UserSerializer(read_only=True)
    current_approver = UserSerializer(read_only=True)

    class Meta:
        model = Expense
        fields = "__all__"


# -------------------
# Approval Step Serializer
# -------------------
class ApprovalStepSerializer(serializers.ModelSerializer):
    expense = ExpenseSerializer(read_only=True)
    approver = UserSerializer(read_only=True)

    class Meta:
        model = ApprovalStep
        fields = "__all__"


# -------------------
# EmployeeManager Serializer
# -------------------
class EmployeeManagerSerializer(serializers.ModelSerializer):
    employee = UserSerializer(read_only=True)
    manager = UserSerializer(read_only=True)

    class Meta:
        model = EmployeeManager
        fields = "__all__"
