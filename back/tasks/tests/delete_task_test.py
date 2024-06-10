from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from tasks.models import Task
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

def login_user(user, client):
    # Obtenha um token JWT para o usuário
    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)
    # Configurar o cabeçalho de autorização com o token JWT para todos os testes
    client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)

class DeleteTaskTest(TestCase):
    def setUp(self) -> None:
        """Cria 2 usuários e faz login de um deles"""
        self.client = APIClient()
        self.user_primary = User.objects.create_user(
            first_name='John Doe',
            username='test@example.com',
            email='test@example.com',
            password='password!123',
        )

        self.user_secondary = User.objects.create_user(
            first_name='John Doe',
            username='test2@example.com',
            email='test2@example.com',
            password='password!123',
        )

        self.task = Task.objects.create(
            title='Teste',
            description='Teste',
            execute_date='2030-01-01',
            category='work',
            user=self.user_primary
        )

    def test_delete_task_no_owner(self):
        """usuario tentando fazer delete de uma tarefa que não pertence"""

        login_user(self.user_secondary, self.client)
        
        response = self.client.delete(reverse('delete-task', kwargs={'task_id': self.task.id}))
        
        # Verificar se o código de status é 401 (não autorizado) messagem de erro
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json(), {'message': 'Tarefa não encontrada'})

    def test_delete_task_not_found(self):
        """Tenta deletar uma tarefa que não existe"""

        login_user(self.user_primary, self.client)

        response = self.client.delete(reverse('delete-task', kwargs={'task_id': 999}))
        
        # Verificar se o código de status é 404 (nao encontrado) messagem de erro
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json(), {"message": "Tarefa não encontrada"})
    
    def test_delete_task_success(self):
        """Deleta uma tarefa existente"""

        login_user(self.user_primary, self.client)
        response = self.client.delete(reverse('delete-task', kwargs={'task_id': self.task.id}))

        # Verificar se o código de status é 204 (sem corpo de resposta)
        self.assertEqual(response.status_code, 204)