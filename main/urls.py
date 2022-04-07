from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("sign_in", views.sign_in_page, name="sign_in_page"),
    path("register", views.register_page, name="register_page"),
    path("logout", views.log_out, name="logout"),
    path("profile/<str:username>", views.profile_page, name="profile_page"),
    path("create_blog_view", views.create_blog_view, name="create_blog_view"),
    path("edit_blog_view/<str:blog_name>", views.edit_blog_view, name="edit_blog_view"),
    path("delete_blog_view/<str:blog_name>", views.delete_blog_view, name="delete_blog_view"),
    path("create_post_view", views.create_post_view, name="create_post_view"),
    path("edit_post_view/<str:post_title>", views.edit_post_view, name="edit_post_view"),
    path("delete/<str:post_title>", views.delete_post_view, name="delete_post_view"),
    path("delete_post/<str:post_title>", views.delete_post, name="delete_post"),
    path("blogs", views.view_blogs, name="blogs"),
    path("blogs/<str:blog_name>", views.view_blog, name="view_blog"),
    path("posts", views.view_posts, name="posts"),
    path("view/<str:blog_name>/<str:post_title>", views.view_post, name="post"),
    path("search", views.view_search, name="search"),


    #API-s
    path("api/sign_in_user", views.sign_in, name="sign_in"),
    path("api/register_user", views.register, name="register"),
    path("api/create_blog", views.create_blog, name="create_blog"),
    path("api/blog_edit/<int:blog_id>", views.edit_blog, name="edit_blog"),
    path("api/create_post", views.create_post, name="create_post"),
    path("api/edit_post/<int:post_id>", views.edit_post, name="edit_post"),
    path("api/comment", views.comment, name="comment"),
    path("api/comments/delete/<int:comment_id>", views.delete_comment, name="delete_comment"),
    path("api/comments/find/<int:comment_id>", views.get_comment, name="get_comment"),
    path("api/comments/edit/<int:comment_id>", views.edit_comment, name="edit_comment"),
    path("api/filter/<str:set>/<str:category>", views.category_filter, name="category_filter"),
    path("api/edit_profile/<str:username>", views.edit_profile, name="edit_profile")
]
