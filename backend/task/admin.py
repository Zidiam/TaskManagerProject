from django.contrib import admin
from .models import Task, User

class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')

class UserAdmin(admin.ModelAdmin):
    list_display = ('first', 'last')

# Register your models here.

admin.site.register(Task, TaskAdmin)
admin.site.register(User, UserAdmin)