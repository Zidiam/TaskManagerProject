# Generated by Django 3.2.4 on 2021-06-30 00:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0002_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='user',
            field=models.CharField(default=None, max_length=120),
            preserve_default=False,
        ),
    ]
