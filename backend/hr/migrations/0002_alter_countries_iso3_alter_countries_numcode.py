# Generated by Django 5.0.7 on 2024-07-15 07:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hr', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='countries',
            name='iso3',
            field=models.CharField(blank=True, max_length=3, null=True),
        ),
        migrations.AlterField(
            model_name='countries',
            name='numcode',
            field=models.CharField(blank=True, max_length=6, null=True),
        ),
    ]
