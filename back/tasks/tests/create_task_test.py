from django.test import TestCase
from django.urls import reverse
from django.test import Client
from django.contrib.auth.models import User


# Create your tests here.
data_task = {
    'title': 'Teste',
    'description': 'Teste',
    'execute_date': '2030-01-01',
    'category': 'work',
}


class CreateTaskTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            first_name='John Doe',
            username='test@example.com',
            email='test@example.com',
            password='password!123',
        )
        self.client.login(username='test@example.com', password='password!123')
        

    def test_create_task_success(self):

        # Fazer uma solicitação POST para a visualização protegida
        response = self.client.post(reverse('create-task'), data=data_task)

        # Verificar se a solicitação foi bem-sucedida
        data = response.json()
        self.assertEqual(response.status_code, 201)
        self.assertEqual(data['title'], data_task['title'])
        self.assertEqual(data['description'], data_task['description'])
        self.assertEqual(data['execute_date'], data_task['execute_date'])
        self.assertEqual(data['category'], data_task['category'])

    def test_create_task_required_description(self):
        new_data = {**data_task}
        del new_data['description']

        # Fazer uma solicitação POST para a visualização protegida
        response = self.client.post(reverse('create-task'), data=new_data)

        # Verificar se a solicitação foi bem-sucedida
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'errors': {'description': "O campo 'description' é obrigatório"}})
    
    def test_create_task_max_length_description(self):
        new_data = {**data_task}
        new_data['description'] = 'a' * 256

        # Fazer uma solicitação POST para a visualização protegida
        response = self.client.post(reverse('create-task'), data=new_data)

        # Verificar se a solicitação foi bem-sucedida
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'errors': {'description': "O campo 'description' pode conter no maximo 255 caracteres"}})
    
    def test_create_task_required_title(self):
        new_data = {**data_task}
        del new_data['title']

        # Fazer uma solicitação POST para a visualização protegida
        response = self.client.post(reverse('create-task'), data=new_data)

        # Verificar se a solicitação foi bem-sucedida
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'errors': {'title': "O campo 'title' é obrigatório"}})
    
    def test_create_task_max_length_title(self):
        new_data = {**data_task}
        new_data['title'] = 'a' * 256

        # Fazer uma solicitação POST para a visualização protegida
        response = self.client.post(reverse('create-task'), data=new_data)

        # Verificar se a solicitação foi bem-sucedida
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'errors': {'title': "O campo 'title' pode conter no maximo 30 caracteres"}})

    def test_create_task_required_category(self):
        new_data = {**data_task}
        del new_data['category']

        # Fazer uma solicitação POST para a visualização protegida
        response = self.client.post(reverse('create-task'), data=new_data)

        # Verificar se a solicitação foi bem-sucedida
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'errors': {'category': "O campo 'category' é obrigatório"}})
    
    def test_create_task_invalid_category(self):
        new_data = {**data_task}
        new_data['category'] = 'invalid'

        # Fazer uma solicitação POST para a visualização protegida
        response = self.client.post(reverse('create-task'), data=new_data)

        # Verificar se a solicitação foi bem-sucedida
        self.assertEqual(response.status_code, 400)
        expected_error = "O campo 'category' deve ter um dos valores ['study','work', 'home', 'leisure', 'food']"
        actual_error = response.json()['errors']['category']
        self.assertEqual(expected_error.replace(" ", ""), actual_error.replace(" ", ""))


    def test_create_task_required_date(self):
        new_data = {**data_task}
        del new_data['execute_date']

        # Fazer uma solicitação POST para a visualização protegida
        response = self.client.post(reverse('create-task'), data=new_data)

        # Verificar se a solicitação foi bem-sucedida
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'errors': {'execute_date': "O campo 'execute_date' é obrigatório"}})

    def test_create_task_past_date(self):
        new_data = {**data_task}
        new_data['execute_date'] = '2020-01-01'

        # Fazer uma solicitação POST para a visualização protegida
        response = self.client.post(reverse('create-task'), data=new_data)

        # Verificar se a solicitação foi bem-sucedida
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'errors': {'execute_date': "O campo 'execute_date' deve ser uma data futura"}})

    def test_create_task_invalid_format_date(self):
        new_data = {**data_task}
        new_data['execute_date'] = '01-01-2020'

        # Fazer uma solicitação POST para a visualização protegida
        response = self.client.post(reverse('create-task'), data=new_data)

        # Verificar se a solicitação foi bem-sucedida
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'errors': {'execute_date': "O formato da data deve ser 'YYYY-MM-DD'"}})

    def test_create_task_unauthorized(self): 
        self.client.logout()
        # Criar a solicitação POST sem autenticação
        response = self.client.post(reverse('create-task'), data=data_task)
        
        # Verificar se o código de status é 401 (não autorizado) messagem de erro
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json(), {'message': 'Autenticação necessária'})

    