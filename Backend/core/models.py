from django.db import models
from django.contrib.auth.models import AbstractUser


class Company(models.Model):
    name = models.CharField(max_length=255)
    default_currency = models.CharField(max_length=3)
    country = models.CharField(max_length=100, default="India")
    created_at = models.DateTimeField(auto_now_add=True)


class User(AbstractUser):
    ROLE_CHOICES = (
        ("admin", "Admin"),
        ("manager", "Manager"),
        ("employee", "Employee"),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, null=True, blank=True
    )


class EmployeeManager(models.Model):
    employee = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="managers"
    )
    manager = models.ForeignKey(User, on_delete=models.CASCADE, related_name="team")


class Expense(models.Model):
    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    )

    employee = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.FloatField()
    currency = models.CharField(max_length=3)
    category = models.CharField(max_length=100)
    description = models.TextField()
    date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    current_approver = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="pending_expenses",
    )
    created_at = models.DateTimeField(auto_now_add=True)


class ApprovalStep(models.Model):
    expense = models.ForeignKey(
        Expense, on_delete=models.CASCADE, related_name="approval_steps"
    )
    approver = models.ForeignKey(User, on_delete=models.CASCADE)
    sequence = models.PositiveIntegerField()
    approved = models.BooleanField(null=True)
    comments = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now=True)
