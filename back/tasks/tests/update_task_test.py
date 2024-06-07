from datetime import datetime
from django.test import TestCase
from django.urls import reverse
from django.test import Client
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from tasks.models import Task


# Create your tests here.
data_task = {
    "title": "Teste",
    "description": "Teste",
    "execute_date": "2030-01-01",
    "category": "work",
}


class UpdateTaskTest(TestCase):
    def setUp(self):
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
            title=data_task['title'],
            description=data_task['description'],
            execute_date=data_task['execute_date'],
            category=data_task['category'],
            user=self.user_primary
        )
        self.client.login(username='test@example.com', password='password!123')
        

    def test_update_task_success(self):

        # Fazer uma solicitação POST para a visualização protegida

        response = self.client.put(reverse('update-task',kwargs={'task_id': self.task.id}), data={**data_task, 'execute_date': '2030-01-02'}, content_type='application/json')

        # Verificar se a solicitação foi bem-sucedida
        data = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['title'], data_task['title'])
        self.assertEqual(data['description'], data_task['description'])
        self.assertEqual(data['execute_date'], '2030-01-02')
        self.assertEqual(data['category'], data_task['category'])

    
    def test_update_task_max_length_description(self):
        new_data = {**data_task}
        new_data['description'] = 'a' * 256

        # Fazer uma solicitação POST para a visualização protegida
        response = self.client.put(reverse('update-task',kwargs={'task_id': self.task.id}), data=new_data, content_type='application/json')

        # Verificar se a solicitação foi bem-sucedida
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'errors': {'description': "O campo 'description' pode conter no maximo 255 caracteres"}})
    
   
    
    def test_update_task_max_length_title(self):
        new_data = {**data_task}
        new_data['title'] = 'a' * 256

        # Fazer uma solicitação POST para a visualização protegida
        response = self.client.put(reverse('update-task',kwargs={'task_id': self.task.id}), data=new_data, content_type='application/json')

        # Verificar se a solicitação foi bem-sucedida
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'errors': {'title': "O campo 'title' pode conter no maximo 30 caracteres"}})


    
    def test_update_task_invalid_category(self):
        new_data = {**data_task}
        new_data['category'] = 'invalid'

        # Fazer uma solicitação POST para a visualização protegida
        response = self.client.put(reverse('update-task',kwargs={'task_id': self.task.id}), data=new_data, content_type='application/json')

        # Verificar se a solicitação foi bem-sucedida
        self.assertEqual(response.status_code, 400)
        expected_error = "O campo 'category' deve ter um dos valores ['study','work', 'home', 'leisure', 'food']"
        actual_error = response.json()['errors']['category']
        self.assertEqual(expected_error.replace(" ", ""), actual_error.replace(" ", ""))

    def test_update_task_unauthorized(self): 
        self.client.logout()
        # Criar a solicitação POST sem autenticação
        response = self.client.put(reverse('update-task',kwargs={'task_id': self.task.id}), data=data_task, content_type='application/json')
        
        # Verificar se o código de status é 401 (não autorizado) messagem de erro
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json(), {'message': 'Autenticação necessária'})

    def test_update_task_not_found(self):
        # Criar a solicitação POST sem autenticação
        response = self.client.put(reverse('update-task',kwargs={'task_id': 999}), data=data_task, content_type='application/json')
        
        # Verificar se o código de status é 404 (nao encontrado) messagem de erro
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json(), {'message': 'Tarefa não encontrada'})

    def test_update_task_not_owner(self):
        # Criar a solicitação POST sem autenticação
        self.client.login(username='test2@example.com', password='password!123')
        response = self.client.put(reverse('update-task',kwargs={'task_id': self.task.id}), data=data_task, content_type='application/json')
        
        # Verificar se o código de status é 401 (não autorizado) messagem de erro
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json(), {'message': 'Tarefa pertencendo a outro usuário'})