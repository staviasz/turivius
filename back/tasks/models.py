from enum import Enum
from django.db import models


# Create your models here.

class Category(Enum):
    STUDY = 'study'
    WORK = 'work'
    HOME = 'home'
    LEISURE = 'leisure'
    FOOD = 'food'


class Task(models.Model):
    title = models.CharField(max_length=30)
    description = models.TextField()
    execute_date = models.DateTimeField()
    category = models.CharField(max_length=30, choices=[(tag, tag.value) for tag in Category])
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)




