# Generated by Django 3.2.9 on 2022-03-19 16:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_alter_blog_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='posts',
            name='category',
            field=models.ForeignKey(default='Other', on_delete=django.db.models.deletion.CASCADE, related_name='post_category', to='main.category'),
        ),
    ]
