from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TaskSerializer, UserSerializer
from .models import Task, User

# Create your views here.

class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()