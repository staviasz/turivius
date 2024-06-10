from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import TaskSerializer
from .models import Task  # Se você tiver um modelo Task

class TaskView(APIView):
    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        # Crie a tarefa usando os dados validados
        if serializer.is_valid():
            validated_data = serializer.validated_data
            Task.objects.create(
                title=validated_data['title'],
                description=validated_data['description'],
                execute_date=validated_data['execute_date'],
                category=validated_data['category'],
                user=request.user
            )
            # Retorne os dados da tarefa criada
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, task_id):
        try:
            # Busca a tarefa pelo id e pelo usuário para que o usuario so possa alterar as tarefas dele
            user = request.user
            task = Task.objects.get(id=task_id, user=user)
            serializer = TaskSerializer(task, data=request.data, partial=True)

            # Valida e salva a tarefa
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Task.DoesNotExist:
            return Response({"message": "Tarefa não encontrada"}, status=status.HTTP_404_NOT_FOUND)
        
    def delete(self, request, task_id):
        """Deleta a tarefa pelo id"""
        try:
            # Busca a tarefa pelo id e pelo usuário, evitando que um usuario delete uma tarefa que não pertence
            user = request.user
            task = Task.objects.get(id=task_id, user=user)

            # Deleta a tarefa
            task.delete()

            return Response({}, status=status.HTTP_204_NO_CONTENT)
        except Task.DoesNotExist:
            # Caso a tarefa não exista, retorna uma mensagem de erro
            return Response({"message": "Tarefa não encontrada"}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request):
        """Retorna todas as tarefas do usuário"""
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

        return Response(tasks_data, status=status.HTTP_200_OK)