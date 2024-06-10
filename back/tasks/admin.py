from django.contrib import admin

from .models import Task

# Register your models here.

class TaskAdmin(admin.ModelAdmin):
    list_display = ['title', 'description', 'execute_date', 'category', 'completed', 'user']

admin.site.register(Task, TaskAdmin)