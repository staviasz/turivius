from enum import Enum
from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Category(Enum):
    HOME = 'home'
    LEISURE = 'leisure'
    FOOD = 'food'
    PERSONAL = 'personal'
    WORK = 'work'
    STUDY = 'study'

class Task(models.Model):
    title = models.CharField(max_length=30)
    description = models.TextField()
    execute_date = models.DateField()
    category = models.CharField(max_length=30 , choices=[(c.value, c.value) for c in Category])
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)




