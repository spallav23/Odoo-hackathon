from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..models import User
from ..permissions import IsAdmin


@api_view(["POST"])
@permission_classes([IsAuthenticated, IsAdmin])
def admin_send_password(request):
    """
    Admin generates a random password for a user and emails it.
    Request body: { "user_id": <id> }
    """
    user_id = request.data.get("user_id")
    if not user_id:
        return Response({"detail": "user_id is required"}, status=400)

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"detail": "User not found"}, status=404)

    temp_password = get_random_string(length=8)
    user.password = make_password(temp_password)
    user.save()

    send_mail(
        subject="Your temporary password",
        message=f"Hello {user.username},\n\nYour temporary password is: {temp_password}\nPlease log in and update it immediately.",
        from_email="admin@example.com",
        recipient_list=[user.email],
        fail_silently=False,
    )

    return Response({"detail": f"Temporary password sent to {user.email}"})
