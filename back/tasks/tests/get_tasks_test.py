from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from tasks.models import Task
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken


class GetTaskTest(TestCase):
    def setUp(self) -> None:
        """Cria um usuário e faz login e cria uma tarefa"""
        self.client = APIClient()
        self.user_primary = User.objects.create_user(
            first_name='John Doe',
            username='test@example.com',
            email='test@example.com',
            password='password!123',
        )

        self.task = Task.objects.create(
            title='Teste',
            description='Teste',
            execute_date='2030-01-01',
            category='work',
            user=self.user_primary)
        
        # Obtenha um token JWT para o usuário
        refresh = RefreshToken.for_user(self.user_primary)
        self.access_token = str(refresh.access_token)
        # Configurar o cabeçalho de autorização com o token JWT para todos os testes
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)
        
    def test_get_tasks(self):
        """Retorna uma lista de tarefas do usuario logado"""

        self.client.login(username='test@example.com', password='password!123')
        response = self.client.get(reverse('get-tasks'))
        
        # Verificar se o código de status é 200 (ok) e o corpo de resposta
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]['title'], 'Teste')
        