# Generated by Django 3.2.9 on 2022-03-14 18:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_rename_name_posts_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='color',
            field=models.CharField(default='lightgreen', max_length=30),
        ),
    ]