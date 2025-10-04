import requests

# URL of your reset password endpoint
reset_url = "http://localhost:8000/api/admin/send-password/"

# JWT access token you got from login
access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU5NTYxNTM5LCJpYXQiOjE3NTk1NTk3MzksImp0aSI6IjM0M2I0OGZhZjc1MTQ2N2RhNjZiMzRkNThiZDQ0OGRlIiwidXNlcl9pZCI6IjIifQ.U_nSafX5XVmnRURx5reRQyk8foUH4QYIfJwlj2vYJp4"

# Replace this with the actual user ID you want to reset
body = {"user_id": 2}

headers = {
    "Authorization": f"Bearer {access_token}",
    "Content-Type": "application/json"
}

response = requests.post(reset_url, headers=headers, json=body)

print("Status code:", response.status_code)
print("Response:", response.json())
