from functools import wraps
from django.http import JsonResponse


# Decorator para proteger as rotas que precisam de login
def authentication_required(view_func):
    @wraps(view_func)
    def wrapped_view(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({"message": "Autenticação necessária"}, status=401)
        return view_func(request, *args, **kwargs)
    return wrapped_view
