from django.contrib import admin

# Register your models here.
from .models import Category,Blog,Posts

admin.site.register(Category)
admin.site.register(Blog)
admin.site.register(Posts)