from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("sign_in", views.sign_in, name="sign_in"),
    path("register", views.register, name="register"),
    path("logout", views.log_out, name="logout"),
    path("create_blog", views.create_blog_view, name="create_blog"),
    path("edit_blog/<str:blog_name>", views.edit_blog, name="edit_blog"),
    path("create_post", views.create_post, name="create_post"),
    path("edit_post/<str:post_title>", views.edit_post, name="edit_post"),
    path("delete/<str:post_title>", views.delete_post_view, name="delete_post_view"),
    path("delete_post/<str:post_title>", views.delete_post, name="delete_post"),
    path("blogs", views.view_blogs, name="blogs"),
    path("blogs/<str:blog_name>", views.view_blog, name="view_blog"),
    path("posts", views.view_posts, name="posts"),
    path("<str:blog_name>/<str:post_title>", views.view_post, name="post"),
    path("search", views.view_search, name="search"),
    path("comment", views.comment, name="comment")

]
