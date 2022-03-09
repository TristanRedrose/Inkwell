from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("sign_in", views.sign_in, name="sign_in"),
    path("register", views.register, name="register"),
    path("logout", views.log_out, name="logout"),
    path("create_blog", views.create_blog_view, name="create_blog"),
    path("create_post", views.create_post, name="create_post"),
]
