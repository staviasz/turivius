from django.test import TestCase
from django.urls import reverse
from django.test import Client
from django.contrib.auth.models import User
from tasks.models import Task



class DeleteTaskTest(TestCase):
    def setUp(self) -> None:
        self.client = Client()
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
        self.client.login(username='test2@example.com', password='password!123')
        response = self.client.delete(reverse('delete-task', kwargs={'task_id': self.task.id}))

        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json(), {"message": "Tarefa pertencendo a outro usuário"})


    def test_delete_task_not_found(self):
        self.client.login(username='test@example.com', password='password!123')
        response = self.client.delete(reverse('delete-task', kwargs={'task_id': 999}))

        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json(), {"message": "Tarefa não encontrada"})
    
    def test_delete_task_success(self):
        self.client.login(username='test@example.com', password='password!123')
        response = self.client.delete(reverse('delete-task', kwargs={'task_id': self.task.id}))

        self.assertEqual(response.status_code, 204)