import json
from django.test import TestCase
from django.urls import reverse
from django.test import RequestFactory
from user.models import CustomUser
from user.views import UserView

class UserViewRegisterTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    def test_register_success(self):
        request = self.factory.post(reverse('user-register'), {
            'name': 'John Doe',
            'email': 'john.doe@example.com',
            'password': 'Password!23'
        })
        response = UserView.as_view()(request, action='register')

        self.assertEqual(response.status_code, 201)
        data = json.loads(response.content.decode('utf-8'))
        self.assertIn('id', data)
        self.assertEqual(data['email'], 'john.doe@example.com')
        self.assertTrue(CustomUser.objects.filter(email='john.doe@example.com').exists())

    def test_register_email_in_use(self):
        CustomUser.objects.create(name='Jane Doe', email='jane.doe@example.com', password='Password!23')

        request = self.factory.post(reverse('user-register'), {
            'name': 'John Doe',
            'email': 'jane.doe@example.com',
            'password': 'Password!23'
        })
        response = UserView.as_view()(request, action='register')

        self.assertEqual(response.status_code, 400)
        data = json.loads(response.content.decode('utf-8'))
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'Email em uso')

    def test_required_name(self):
        request = self.factory.post(reverse('user-register'), {
            'email': 'john@example.com',
            'password': 'Password!23'
        })
        response = UserView.as_view()(request, action='register')

        self.assertEqual(response.status_code, 400)
        data = json.loads(response.content.decode('utf-8'))
        self.assertIn('error', data)
        self.assertEqual(data['error']['name'], 'O campo nome é obrigatório')
    
    def test_invalid_name(self):
        request = self.factory.post(reverse('user-register'), {
            'name': 'John123',
            'email': 'john@example.com',
            'password': 'Password!23'
        })
        response = UserView.as_view()(request, action='register')

        self.assertEqual(response.status_code, 400)
        data = json.loads(response.content.decode('utf-8'))
        self.assertIn('error', data)
        self.assertEqual(data['error']['name'], 'O nome não pode conter números ou caracteres especiais')

    def test_required_email(self):
        request = self.factory.post(reverse('user-register'), {
            'name': 'John Doe',
            'password': 'Password!23'
        })
        response = UserView.as_view()(request, action='register')

        self.assertEqual(response.status_code, 400)
        data = json.loads(response.content.decode('utf-8'))
        self.assertIn('error', data)
        self.assertEqual(data['error']['email'], 'O campo email é obrigatório')

    def test_invalid_email(self):
        request = self.factory.post(reverse('user-register'), {
            'name': 'John Doe',
            'email': 'invalid-email',
            'password': 'Password!23'
        })
        response = UserView.as_view()(request, action='register')

        self.assertEqual(response.status_code, 400)
        data = json.loads(response.content.decode('utf-8'))
        self.assertIn('error', data)
        self.assertEqual(data['error']['email'], 'O email não é válido')

    def test_required_password(self):
        request = self.factory.post(reverse('user-register'), {
            'name': 'John Doe',
            'email': 'john@example.com',
        })
        response = UserView.as_view()(request, action='register')

        self.assertEqual(response.status_code, 400)
        data = json.loads(response.content.decode('utf-8'))
        self.assertIn('error', data)
        self.assertEqual(data['error']['password'], 'O campo senha é obrigatório')

    def test_invalid_password(self):
        request = self.factory.post(reverse('user-register'), {
            'name': 'John Doe',
            'email': 'john@example.com',
            'password': 'pwd'
        })
        response = UserView.as_view()(request, action='register')

        self.assertEqual(response.status_code, 400)
        data = json.loads(response.content.decode('utf-8'))
        self.assertIn('error', data)
        self.assertEqual(data['error']['password'], 'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um caractere especial e pelo menos 6 caracteres')

