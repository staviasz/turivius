from datetime import datetime
import json 
from django.views import View
from django.http import JsonResponse

from .models import Category, Task


# Create your views here.

class TaskView(View):    
    def post(self, request):
        """Cria uma nova tarefa e retorna os dados da tarefa criada"""

        #recuperando dados do body
        title = request.POST.get("title")
        description = request.POST.get("description")
        execute_date = request.POST.get("execute_date")
        category = request.POST.get("category")


        # Por ser um rota protegida, os dados do usuário estão no request.user
        user = request.user

        # Valida os dados de entrada
        errors = self._clean_data(action="create", title=title, description=description, execute_date=execute_date, category=category)
        if errors:
            return JsonResponse({"errors": errors}, status=400)
        

        # Cria a tarefa
        new_task = Task.objects.create(
            title=title,
            description=description,
            execute_date=execute_date,
            category=category,
            user=user
        )


        # Retorna os dados da tarefa junto com o id do usuario
        task_data = {
            "id": new_task.id,
            "title": new_task.title,
            "description": new_task.description,
            "execute_date": new_task.execute_date,
            "category": new_task.category,
            "completed": new_task.completed,
        }

        return JsonResponse(task_data, status=201)
    
    def put(self, request, task_id):
        """Altera os dados da tarefa pelo id e retorna os dados da tarefa alterada"""
        
        try:
            #recuperando dados do body
            body_str = request.body.decode('utf-8')
            data = json.loads(body_str)
            title = data.get("title")
            description = data.get("description")
            execute_date = data.get("execute_date")
            completed = data.get("completed")
            category = data.get("category")


            # Valida os dados de entrada
            errors = self._clean_data(action="update", title=title, description=description, execute_date=execute_date, category=category, completed=completed)
            if errors:
                return JsonResponse({"errors": errors}, status=400)


            # Busca a tarefa pelo id
            task = Task.objects.get(id=task_id)


            # Valida se a tarefa pertence ao usuário
            user = request.user
            if task.user != user:
                return JsonResponse({"message": "Tarefa pertencendo a outro usuário"}, status=401)


            # Altera os dados
            task.title = title or task.title
            task.description = description or task.description
            task.execute_date = execute_date or task.execute_date
            task.completed = completed or task.completed
            task.category = category or task.category
            task.save()


            # Retorna os dados da tarefa com as alterações
            task_data = {
                "id": task.id,
                "title": task.title,
                "description": task.description,
                "execute_date": task.execute_date,
                "category": task.category,
                "completed": task.completed,
            }

            return JsonResponse(task_data, status=200)
        except Task.DoesNotExist:
            # Caso a tarefa não exista, retorna uma mensagem de erro
            return JsonResponse({"message": "Tarefa não encontrada"}, status=404)

    def delete(self, request, task_id):
        """Deleta a tarefa pelo id"""
        try:
            # Busca a tarefa pelo id
            task = Task.objects.get(id=task_id)
        

            # Valida se a tarefa pertence ao usuário
            user = request.user
            if task.user != user:
                return JsonResponse({"message": "Tarefa pertencendo a outro usuário"}, status=401)


            # Deleta a tarefa
            task.delete()

            return JsonResponse({},status=204)
        except Task.DoesNotExist:
            # Caso a tarefa não exista, retorna uma mensagem de erro
            return JsonResponse({"message": "Tarefa não encontrada"}, status=404)

    def get(self, request):
        """Retorna todas as tarefas do usuário"""

        # Por ser um rota protegida, os dados do usuário estão no request.user
        user = request.user

        # Retorna todas as tarefas do usuário
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
        """Chama as funções de validação para cada campo enviado na requisição"""
        validators = {
        'title': self._clean_title,
        'description': self._clean_description,
        'execute_date': self._clean_execute_date,
        'category': self._clean_category,
        'completed': self._clean_completed
        }

        errors = {}

        # Executa um loop para fazer as validações
        for field, value in kwargs.items():

            # Caso se ja um create todos os campos devem ser validados
            if field in validators and action == "create":
                errors[field] = validators[field](value)

            # Caso sejam updates, apenas os campos enviados devem ser validados
            if field in validators and action == "update" and value:
                errors[field] = validators[field](value)

        return {field: error for field, error in errors.items() if error}

    def _clean_completed(self, completed):
        """Valida se o dado enviado é um booleano"""
        if not isinstance(completed, bool):
            return "O campo 'completed' deve ser um booleano."
        
        return None

    def _clean_title(self, title):
        """Valida se o dado foi passado e se o mesmo tiver no maximo 30 caracteres"""
        if not title:
            return "O campo 'title' é obrigatório"
        if len(title) > 30:
            return "O campo 'title' pode conter no maximo 30 caracteres"
        
        return None
    
    def _clean_description(self, description):
        """Valida se o dado foi passado e se o mesmo tiver no maximo 255 caracteres"""
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
        
            # Valida se a data é uma data futura
            if date_obj < datetime.now():
                return "O campo 'execute_date' deve ser uma data futura"

            return None
        except ValueError:
            return "O formato da data deve ser 'YYYY-MM-DD'"
    
    def _clean_category(self, category):
        """Valida se o dado foi passado e se o mesmo esta dentro dos valores permitidos"""
        if not category:
            return "O campo 'category' é obrigatório"
        
        valid_categories = [c.value for c in Category]
        if category not in valid_categories:
            return f"O campo 'category' deve ter um dos valores {valid_categories}" 
        
        return None
   