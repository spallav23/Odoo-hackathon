from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == "admin"


class IsManager(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == "manager"


class IsEmployee(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == "employee"
