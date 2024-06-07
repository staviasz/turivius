from datetime import datetime 
from django.views import View
from django.http import JsonResponse

from .models import Category, Task
from django.utils.timezone import make_aware


# Create your views here.

class TaskView(View):    
    def post(self, request):
        title = request.POST.get("title")
        description = request.POST.get("description")
        execute_date = request.POST.get("execute_date")
        category = request.POST.get("category")

        errors = self._clean_data(title, description, execute_date, category)
        if errors:
            return JsonResponse({"errors": errors}, status=400)
        
        new_task = Task.objects.create(
            title=title,
            description=description,
            execute_date=execute_date,
            category=category
        )

        task_data = {
            "id": new_task.id,
            "title": new_task.title,
            "description": new_task.description,
            "execute_date": new_task.execute_date,
            "category": new_task.category
        }

        return JsonResponse(task_data, status=201)
    
    def _clean_data(self, title, description, execute_date, category):
        errors = [
            ("title", self._clean_title(title)),
            ("description", self._clean_description(description)),
            ("execute_date", self._clean_execute_date(execute_date)),
            ("category", self._clean_category(category)),
        ]

        return {field: error for field, error in errors if error}


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
            return "A data não pode ser no passado"
        
        return None
    
    def _clean_category(self, category):
        if not category:
            return "O campo 'category' é obrigatório"
        
        valid_categories = [c.value for c in Category]
        if category not in valid_categories:
            return f"O campo 'category' deve ter um dos valores {valid_categories}" 
        
        return None
   