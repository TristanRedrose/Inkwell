from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=200, default="Other")

class Blog(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="owner")
    name = models.CharField(max_length=200)
    description = models.TextField(null=False, blank=False)
    image = models.ImageField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="category")
    created = models.DateTimeField(auto_now_add=True)
   

class Posts(models.Model):
    writer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="writer")
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name="blog")
    name = models.CharField(max_length=200)
    body = models.TextField(blank=False)
    image = models.ImageField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

