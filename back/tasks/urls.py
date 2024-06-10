from django.urls import path

from decorators.auth_decorator import authentication_required
from . import views

urlpatterns = [
    path("",authentication_required(views.TaskView.as_view()), name="create-task"),
    path("/<int:task_id>",authentication_required(views.TaskView.as_view()), name="update-task"),
    path("/<int:task_id>",authentication_required(views.TaskView.as_view()), name="delete-task"),
    path("",authentication_required(views.TaskView.as_view()), name="get-tasks"),
]