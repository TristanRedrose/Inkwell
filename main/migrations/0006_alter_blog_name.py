# Generated by Django 3.2.9 on 2022-03-17 10:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_category_color'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='name',
            field=models.CharField(max_length=200, unique=True),
        ),
    ]
