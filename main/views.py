from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

from .models import Category,Blog,Posts



# Create your views here.

def index(request):

    return render (request, "main/index.html")

def sign_in(request):

    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        try:
            user = User.objects.get(username=username)
        except:
            return render (request, "main/login.html", {
                "message": "Invalid username"
            })
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("create_blog")
        else:
            return render (request, "main/login.html", {
                "message": "Invalid username or password"
            })
    else:    
        return render (request, "main/login.html")

def log_out(request):

    logout(request)
    return render (request, "main/login.html", {
                "message": "Successfully logged out"
            })

def register(request):

    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        confirm = request.POST.get("confirm")

        if password != confirm:
            return render (request, "main/register.html", {
                "message": "Passwords must match"
            })
        
        try:
            user = User.objects.create_user(username, password)
            user.save()
        except IntegrityError:
            return render(request, "main/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return redirect("create_blog")
    else:
        return render (request, "main/register.html")

@login_required
def create_blog_view(request):
    
    if request.method == "POST":
        author = request.user
        name = request.POST.get("blog-name")
        description = request.POST.get("description")
        category = request.POST.get("category")
        image = request.POST.get("image")

        blog=Blog(
            author=author,
            name=name,
            description=description,
            category=Category.objects.get(name=category),
            image=image
        )
        blog.save()

        return render (request, "main/my_blog.html")
    else:
        try:
            blog = Blog.objects.get(author=request.user)
        except:
            ctg = Category.objects.all()   
            return render (request, "main/create_blog.html", {
                "categories": ctg
            })
        
        posts=Posts.objects.filter(blog=blog)
        return render (request, "main/my_blog.html", {
            "blog": blog,
            "posts":posts
        })

@login_required
def create_post(request):

    if request.method == "POST":
        author = request.user
        blog = Blog.objects.get(author=request.user)
        title = request.POST.get("title")
        body = request.POST.get("body")
        image = request.POST.get("image")

        post=Posts(
            author=author,
            blog=blog,
            title=title,
            body=body,
            image=image
        )
        post.save()

        posts=Posts.objects.filter(blog=blog)
        return render (request, "main/my_blog.html", {
            "blog": blog,
            "posts": posts
        })

    else:   
        return render(request,"main/create_post.html")

def view_blogs(request):

    blogs = Blog.objects.all()
    return render(request,"main/blogs.html", {
        "blogs": blogs
    })
