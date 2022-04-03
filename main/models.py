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

    def serialize(self):
        return {
            "id": self.id,
            "author": self.author.username,
            "name": self.name,
            "description": self.description,
            "image": self.image,
            "category": self.category.name,
            "color": self.category.color,
            "created": self.created.strftime("%Y-%m-%d"),
        }
   

class Posts(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="writer")
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name="blog")
    category = models.ForeignKey(Category, on_delete=models.CASCADE,default="Other", related_name="post_category")
    title = models.CharField(max_length=200)
    body = models.TextField(blank=False)
    image = models.URLField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def serialize(self):
        return {
            "id": self.id,
            "author": self.author.username,
            "blog":self.blog.name,
            "category": self.category.name,
            "color": self.category.color,
            "title": self.title,
            "body": self.body,
            "image": self.image,
            "created": self.created.strftime("%Y-%m-%d"),
            "updated": self.updated.strftime("%Y-%m-%d")
        }

    class Meta:
            verbose_name= "Post"
            verbose_name_plural= "Posts"

class Comments(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="com_author")
    post = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name="post")
    body = models.TextField(blank=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
