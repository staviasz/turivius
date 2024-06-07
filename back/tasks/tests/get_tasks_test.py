from django.test import TestCase
from django.urls import reverse
from django.test import Client
from django.contrib.auth.models import User
from tasks.models import Task



class GetTaskTest(TestCase):
    def setUp(self) -> None:
        """Cria um usuário e faz login e cria uma tarefa"""
        self.client = Client()
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
        
    def test_get_tasks(self):
        """Retorna uma lista de tarefas do usuario logado"""

        self.client.login(username='test@example.com', password='password!123')
        response = self.client.get(reverse('get-tasks'))
        
        # Verificar se o código de status é 200 (ok) e o corpo de resposta
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]['title'], 'Teste')
        