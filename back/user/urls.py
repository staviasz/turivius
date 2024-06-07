# from django.urls import path
# from . import views

# urlpatterns = [
#     path("register", views.UserView.as_view(), kwargs={"action": "register"}, name="user-register"),
#     path("login", views.UserView.as_view(), kwargs={"action": "login"}, name="user-login"),
# ]

from django.urls import path
from .api_view import UserRegisterView, UserLoginView

urlpatterns = [
    path('register/', UserRegisterView.as_view(), name='user-register'),
    path('login/', UserLoginView.as_view(), name='user-login'),
]