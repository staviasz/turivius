from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.test import APIClient


# Create your tests here.
data_task = {
    'title': 'Teste',
    'description': 'Teste',
    'execute_date': '2030-01-01',
    'category': 'work',
}


class CreateTaskTest(TestCase):
    def setUp(self):
        """Cria um usuário e faz login"""
        self.client = APIClient()
        self.user = User.objects.create_user(
            first_name='John Doe',
            username='test@example.com',
            email='test@example.com',
            password='password!123',
        )

         # Obtenha um token JWT para o usuário
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)
        # Configurar o cabeçalho de autorização com o token JWT para todos os testes
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)
        

    def test_create_task_success(self):

        # Fazer uma solicitação POST para a visualização protegida
        response = self.client.post(reverse('create-task'), data=data_task)

        # Verificar se a solicitação foi bem-sucedida e a task foi criada
        data = response.json()
        self.assertEqual(response.status_code, 201)
        self.assertEqual(data['title'], data_task['title'])
        self.assertEqual(data['description'], data_task['description'])
        self.assertEqual(data['execute_date'], data_task['execute_date'])

    def test_create_task_required_description(self):
        new_data = {**data_task}
        del new_data['description']

        response = self.client.post(reverse('create-task'), data=new_data)

        # Verificar se a solicitação retornou um erro de validação para o campo description
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(),  {'description': ["O campo 'description' é obrigatório"]})
    
    def test_create_task_max_length_description(self):
        new_data = {**data_task}
        new_data['description'] = 'a' * 256

        response = self.client.post(reverse('create-task'), data=new_data)

        # Verificar se a solicitação retornou um erro de validação para o campo description
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(),  {'description': ["O campo 'description' pode conter no maximo 255 caracteres"]})
    
    def test_create_task_required_title(self):
        new_data = {**data_task}
        del new_data['title']

        response = self.client.post(reverse('create-task'), data=new_data)

        # Verificar se a solicitação retornou um erro de validação para o campo title
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(),  {'title': ["O campo 'title' é obrigatório"]})
    
    def test_create_task_max_length_title(self):
        new_data = {**data_task}
        new_data['title'] = 'a' * 256

        response = self.client.post(reverse('create-task'), data=new_data)

        # Verificar se a solicitação retornou um erro de validação para o campo title
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(),  {'title': ["O campo 'title' pode conter no máximo 30 caracteres"]})

    def test_create_task_required_category(self):
        new_data = {**data_task}
        del new_data['category']

        response = self.client.post(reverse('create-task'), data=new_data)

        # Verificar se a solicitação retornou um erro de validação para o campo category
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(),  {'category': ["O campo 'category' é obrigatório"]})
    
    def test_create_task_invalid_category(self):
        new_data = {**data_task}
        new_data['category'] = 'invalid'

        response = self.client.post(reverse('create-task'), data=new_data)

        # Verificar se a solicitação retornou um erro de validação para o campo category
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {"category": ["O campo 'category' deve ter um dos valores ['home', 'leisure', 'food', 'personal', 'work', 'study']"]})


    def test_create_task_required_date(self):
        new_data = {**data_task}
        del new_data['execute_date']

        response = self.client.post(reverse('create-task'), data=new_data)

        # Verificar se a solicitação retornou um erro de validação para o campo execute_date
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'execute_date': ["O campo 'execute_date' é obrigatório"]})

    def test_create_task_past_date(self):
        new_data = {**data_task}
        new_data['execute_date'] = '2020-01-01'

        response = self.client.post(reverse('create-task'), data=new_data)

        # Verificar se a solicitação retornou um erro de validação para o campo execute_date
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'execute_date': ["O campo 'execute_date' deve ser uma data futura"]})

    def test_create_task_invalid_format_date(self):
        new_data = {**data_task}
        new_data['execute_date'] = '01-01-2020'

        response = self.client.post(reverse('create-task'), data=new_data)

        # Verificar se a solicitação retornou um erro de validação para o campo execute_date
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(),{'execute_date': ["O formato da data deve ser 'YYYY-MM-DD'"]})

    def test_create_task_unauthorized(self): 
        self.client.logout()
        
        response = self.client.post(reverse('create-task'), data=data_task)
        
        # Verificar se o código de status é 401 (não autorizado) messagem de erro
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json(), {'message': 'Token de autenticação não fornecido ou no formato inválido'})

 