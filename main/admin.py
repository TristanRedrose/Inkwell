from django.contrib import admin
from .models import Category,Blog,Posts, Profile

# Register your models here.
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "color")

class BlogAdmin(admin.ModelAdmin):
    list_display = ("id", "author", "name")

class PostsAdmin(admin.ModelAdmin):
    list_display = ("id", "author", "title")

admin.site.register(Category, CategoryAdmin)
admin.site.register(Blog, BlogAdmin)
admin.site.register(Posts, PostsAdmin)
admin.site.register(Profile)