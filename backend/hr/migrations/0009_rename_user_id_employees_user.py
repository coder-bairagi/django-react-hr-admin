# Generated by Django 5.0.7 on 2024-07-17 11:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hr', '0008_rename_employee_id_employees_user_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='employees',
            old_name='user_id',
            new_name='user',
        ),
    ]
