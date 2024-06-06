from django.urls import path
from . import views

urlpatterns = [
    path("register", views.UserView.as_view(), kwargs={"action": "register"}, name="user-register"),
    path("login", views.UserView.as_view(), kwargs={"action": "login"}, name="user-login"),
]
