from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet,
    CompanyViewSet,
    ExpenseViewSet,
    EmployeeManagerViewSet,
    SignupView,
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .view.forgot_views import admin_send_password

# Create router and register all viewsets
router = DefaultRouter()
router.register(r"users", UserViewSet)
router.register(r"companies", CompanyViewSet)
router.register(r"expenses", ExpenseViewSet)
router.register(r"employeemanager", EmployeeManagerViewSet)

# URL patterns
urlpatterns = [
    # Router endpoints
    path("", include(router.urls)),
    # JWT authentication endpoints
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # Signup endpoint (admin only)
    path("api/signup/", SignupView.as_view(), name="signup"),
    path("admin-send-password/", admin_send_password, name="admin_send_password"),
]
