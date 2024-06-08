from user.validators import validate_first_name, validate_password
from rest_framework import serializers
from django.contrib.auth.models import User

class UserRegisterSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(
        required=True, 
        error_messages={'required': 'O campo nome é obrigatório'})
    
    email = serializers.EmailField(
        required=True, 
        error_messages={'required': 'O campo email é obrigatório', 
                        'invalid': 'O email não é válido'})
    password = serializers.CharField(write_only=True, required=True, error_messages={'required': 'O campo senha é obrigatório'})

    class Meta:
        model = User
        fields = ['first_name', 'email', 'password']

    def validate(self, data):
        validate_first_name(data.get('first_name'))
        validate_password(data.get('password'))

        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            first_name=validated_data['first_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(
        required=True, 
        error_messages={'required': 'O campo email é obrigatório', 
                        'invalid': 'O email não é válido'})
    
    password = serializers.CharField(
        write_only=True, 
        required=True,
        error_messages={'required': 'O campo senha é obrigatório'})
