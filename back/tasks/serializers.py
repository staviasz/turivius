from tasks.models import Task, Category
from rest_framework import serializers
from .validators import validate_execute_date



class TaskSerializer(serializers.ModelSerializer):
    title = serializers.CharField(
        required=True,
        max_length=30, 
        error_messages={'required': "O campo 'title' é obrigatório",
                        'max_length': "O campo 'title' pode conter no máximo 30 caracteres"})
   
    description = serializers.CharField(
        required=True, 
        max_length=255, 
        error_messages={'required': "O campo 'description' é obrigatório",
                        'max_length': "O campo 'description' pode conter no maximo 255 caracteres"})
   
    execute_date = serializers.DateField(
        input_formats=['%Y-%m-%d'], 
        required=True, 
        error_messages={'invalid': "O formato da data deve ser 'YYYY-MM-DD'", 'required': "O campo 'execute_date' é obrigatório"})
   
    category = serializers.ChoiceField(
        choices=[(c.value, c.value) for c in Category], 
        error_messages={'required': "O campo 'category' é obrigatório", 
                        'invalid_choice': f"O campo 'category' deve ter um dos valores {[c.value for c in Category]}"})

    class Meta:
        model = Task
        fields = '__all__'
  

    def validate(self, data):
        validate_execute_date(data.get('execute_date'))
        return data
