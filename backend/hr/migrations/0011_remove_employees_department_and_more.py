# Generated by Django 5.0.7 on 2024-07-22 20:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hr', '0010_merge_20240723_0149'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employees',
            name='department',
        ),
        migrations.RemoveField(
            model_name='employees',
            name='identification_number',
        ),
        migrations.RemoveField(
            model_name='employees',
            name='identification_type',
        ),
    ]
