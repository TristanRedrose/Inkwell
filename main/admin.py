from django.contrib import admin
from .models import Category,Blog,Posts

# Register your models here.
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name")

admin.site.register(Category, CategoryAdmin)
admin.site.register(Blog)
admin.site.register(Posts)