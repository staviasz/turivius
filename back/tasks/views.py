from datetime import datetime
import json 
from django.views import View
from django.http import JsonResponse

from .models import Category, Task


# Create your views here.

class TaskView(View):    
    def post(self, request):
        title = request.POST.get("title")
        description = request.POST.get("description")
        execute_date = request.POST.get("execute_date")
        category = request.POST.get("category")

        user = request.user

        errors = self._clean_data(action="create", title=title, description=description, execute_date=execute_date, category=category)
        if errors:
            return JsonResponse({"errors": errors}, status=400)
        
        new_task = Task.objects.create(
            title=title,
            description=description,
            execute_date=execute_date,
            category=category,
            user=user
        )

        task_data = {
            "id": new_task.id,
            "title": new_task.title,
            "description": new_task.description,
            "execute_date": new_task.execute_date,
            "category": new_task.category
        }

        return JsonResponse(task_data, status=201)
    
    def put(self, request, task_id):

        body_str = request.body.decode('utf-8')
        data = json.loads(body_str)
        title = data.get("title")
        description = data.get("description")
        execute_date = data.get("execute_date")
        category = data.get("category")


        errors = self._clean_data(action="update", title=title, description=description, execute_date=execute_date, category=category)
        if errors:
            return JsonResponse({"errors": errors}, status=400)

        try:
            task = Task.objects.get(id=task_id)
        except Task.DoesNotExist:
            return JsonResponse({"message": "Tarefa não encontrada"}, status=404)

        user = request.user
        if task.user != user:
            return JsonResponse({"message": "Tarefa pertencendo a outro usuário"}, status=401)

        task.title = title or task.title
        task.description = description or task.description
        task.execute_date = execute_date or task.execute_date
        task.category = category or task.category
        task.save()

        task_data = {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "execute_date": task.execute_date,
            "category": task.category
        }

        return JsonResponse(task_data, status=200)

    def delete(self, request, task_id):
        try:
            task = Task.objects.get(id=task_id)
        except Task.DoesNotExist:
            return JsonResponse({"message": "Tarefa não encontrada"}, status=404)

        user = request.user
        if task.user != user:
            return JsonResponse({"message": "Tarefa pertencendo a outro usuário"}, status=401)

        task.delete()

        return JsonResponse({},status=204)

    def get(self, request):
        user = request.user
        tasks = Task.objects.filter(user=user)
        tasks_data = [{
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "execute_date": task.execute_date,
            "category": task.category,
            "completed": task.completed,
            "user_id": task.user.id
        } for task in tasks]

        return JsonResponse(tasks_data, safe=False)
    
    def _clean_data(self, action, **kwargs):
        validators = {
        'title': self._clean_title,
        'description': self._clean_description,
        'execute_date': self._clean_execute_date,
        'category': self._clean_category,
        }

        errors = {}

        for field, value in kwargs.items():
            if field in validators and action == "create":
                errors[field] = validators[field](value)

            if field in validators and action == "update" and value:
                errors[field] = validators[field](value)

        return {field: error for field, error in errors.items() if error}

    def _clean_title(self, title):
        if not title:
            return "O campo 'title' é obrigatório"
        if len(title) > 30:
            return "O campo 'title' pode conter no maximo 30 caracteres"
        
        return None
    
    def _clean_description(self, description):
        if not description:
            return "O campo 'description' é obrigatório"
        if len(description) > 255:
            return "O campo 'description' pode conter no maximo 255 caracteres"
        
        return None
    
    def _clean_execute_date(self, execute_date):
        if not execute_date:
            return "O campo 'execute_date' é obrigatório"
        
        try:
            # Tenta criar um objeto datetime a partir do formato 'YYYY-MM-DD'
            date_obj = datetime.strptime(execute_date, '%Y-%m-%d')
        except ValueError:
            return "O formato da data deve ser 'YYYY-MM-DD'"
        
        if date_obj < datetime.now():
            return "O campo 'execute_date' deve ser uma data futura"
        
        return None
    
    def _clean_category(self, category):
        if not category:
            return "O campo 'category' é obrigatório"
        
        valid_categories = [c.value for c in Category]
        if category not in valid_categories:
            return f"O campo 'category' deve ter um dos valores {valid_categories}" 
        
        return None
   