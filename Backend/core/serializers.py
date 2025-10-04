from rest_framework import serializers
from .models import User, Company, Expense, ApprovalStep, EmployeeManager
from django.contrib.auth import get_user_model

User = get_user_model()

class CreateCompanyAdminSerializer(serializers.Serializer):
    companyName = serializers.CharField(max_length=255)
    country = serializers.CharField(default="India")
    currency = serializers.CharField(default="INR")
    adminName = serializers.CharField(max_length=150)
    adminEmail = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
    def create(self, validated_data):
        company = Company.objects.create(
            name=validated_data["companyName"],
            country=validated_data.get("country", "India"),
            default_currency=validated_data.get("currency", "INR")
        )
        admin_user = User.objects.create_user(
            username=validated_data["adminName"],
            email=validated_data["adminEmail"],
            password=validated_data["password"],
            role="admin",
            company=company
        )
        return {"company": company, "admin_user": admin_user}

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("username", "password", "email", "role", "company")

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email"),
            password=validated_data["password"],
            role=validated_data.get("role", "employee"),
            company=validated_data.get("company", None),
        )
        return user


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ("password",)


class ExpenseSerializer(serializers.ModelSerializer):
    employee = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = Expense
        fields = "__all__"


class ApprovalStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApprovalStep
        fields = "__all__"


class EmployeeManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeManager
        fields = "__all__"
