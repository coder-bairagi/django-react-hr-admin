# Generated by Django 5.0.7 on 2024-07-17 05:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hr', '0004_employees_date_hired'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Employees',
            new_name='Users',
        ),
    ]