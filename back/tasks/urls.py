from django.urls import path

from decorators.auth_decorator import authentication_required
from . import views

urlpatterns = [
    path("",authentication_required(views.TaskView.as_view()), name="task"),
]