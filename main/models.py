from tkinter import CASCADE
from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=200)

class Blog(models.Model):
    #owner = models.ForeignKey(User, on_delete=CASCADE, related_name="writer")
    name = models.CharField(max_length=200)
    description = models.TextField(null=False, blank=False)
    image = models.ImageField()
    created = models.DateTimeField(auto_now_add=True)
   

class Posts(models.Model):
    #writer = models.ForeignKey(User, on_delete=CASCADE, related_name="writer")
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name="blog")
    name = models.CharField(max_length=200)
    body = models.TextField(null=False, blank=False)
    image = models.ImageField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

