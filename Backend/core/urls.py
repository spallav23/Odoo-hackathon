from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet,
    CompanyViewSet,
    ExpenseViewSet,
    EmployeeManagerViewSet,
    SignupView,
    change_password,
    CreateCompanyAdminView
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .view.forgot_views import admin_send_password

# -------------------
# Create router and register viewsets
# -------------------
router = DefaultRouter()
router.register(r"users", UserViewSet, basename="users")
router.register(r"companies", CompanyViewSet, basename="companies")
router.register(r"expenses", ExpenseViewSet, basename="expenses")
router.register(r"employeemanager", EmployeeManagerViewSet, basename="employeemanager")

# -------------------
# URL patterns
# -------------------
urlpatterns = [
    # Router endpoints
    path("", include(router.urls)),
    
    # JWT authentication endpoints
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # Admin signup
    path("signup/", SignupView.as_view(), name="signup"),
    path("create-company-admin/", CreateCompanyAdminView.as_view(),name="create-company-admin"),
    # Forgot / reset password
    path("admin/send-password/", admin_send_password, name="admin_send_password"),
    path("create-company-admin/", CreateCompanyAdminView.as_view(), name="create-company-admin"),
    # User change password
    path("change-password/", change_password, name="change_password"),
]
