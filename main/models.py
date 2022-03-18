from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=200, unique=True)
    color = models.CharField(max_length=30, default="lightgreen")

    class Meta:
        verbose_name= "Category"
        verbose_name_plural= "Categories"

class Blog(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="owner")
    name = models.CharField(max_length=200, unique=True)
    description = models.TextField(null=False, blank=False)
    image = models.URLField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="category")
    created = models.DateTimeField(auto_now_add=True)
   

class Posts(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="writer")
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name="blog")
    title = models.CharField(max_length=200)
    body = models.TextField(blank=False)
    image = models.URLField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
            verbose_name= "Post"
            verbose_name_plural= "Posts"