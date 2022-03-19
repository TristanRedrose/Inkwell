from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.db.models import Q
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
            print(user)
            login(request, user)
            return redirect("posts")
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
            user = User.objects.create_user(username=username,password=password)
            user.save()
        except IntegrityError:
            return render(request, "main/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return redirect("posts")
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

        return redirect("view_blog", name)
    else:
        try:
            blog = Blog.objects.get(author=request.user)
        except:
            ctg = Category.objects.all()   
            return render (request, "main/create_blog.html", {
                "categories": ctg
            })
        
        blog = Blog.objects.get(author=request.user)
        return redirect("view_blog", blog.name)

@login_required
def edit_blog(request, blog_name):

    ctg = Category.objects.all()
    blog = Blog.objects.get(name=blog_name)

    # Redirect user back to blog if user does not have permission to edit blog
    if request.user != blog.author:
        return redirect("view_blog", blog_name)

    if request.method == "POST":
        name = request.POST.get("blog-name")
        description = request.POST.get("description")
        category = request.POST.get("category")
        image = request.POST.get("image")
        blog.name = name
        blog.description = description
        blog.category = Category.objects.get(name=category)
        blog.image = image

        blog.save()

        return redirect("view_blog", blog.name)
    
    else:
        return render(request,"main/edit_blog.html", {
            "blog": blog,
            "categories": ctg
        })
    

@login_required
def create_post(request):

    if request.method == "POST":
        author = request.user
        blog = Blog.objects.get(author=request.user)
        category = request.POST.get("category")
        title = request.POST.get("title")
        body = request.POST.get("body")
        image = request.POST.get("image")

        post=Posts(
            author=author,
            blog=blog,
            category=Category.objects.get(name=category),
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
        categories = Category.objects.all()
        blog = Blog.objects.get(author=request.user)   
        return render(request,"main/create_post.html", {
            "default": blog.category.name,
            "categories": categories
        })

@login_required
def edit_post(request, post_title):

    post = Posts.objects.get(title=post_title)
    categories = Category.objects.all()

    # Redirect user back to post if user does not have permission to edit post
    if request.user != post.author:
        return redirect("post", post.blog.name, post.title)

    if request.method == "POST":
        category = request.POST.get("category")
        title = request.POST.get("title")
        body = request.POST.get("body")
        image = request.POST.get("image")
        post.category = Category.objects.get(name=category)
        post.title = title
        post.body = body
        post.image = image 

        post.save()

        return redirect("post", post.blog.name, post.title)
    
    else:
        return render(request,"main/edit_post.html", {
            "post": post,
            "categories": categories
        })

def view_blogs(request):

    blogs = Blog.objects.all()
    return render(request,"main/blogs.html", {
        "blogs": blogs
    })

@login_required
def delete_post_view(request, post_title):

    blog = Blog.objects.get(author=request.user)
    post = Posts.objects.get(title=post_title)

    return render(request,"main/delete_post.html", {
            "post": post,
            "blog":blog
        })

@login_required
def delete_post(request, post_title):

    blog = Blog.objects.get(author=request.user)
    post = Posts.objects.get(title=post_title)

    # Redirect user back to post if user does not have permission to edit post
    if request.user != post.author:
        return redirect("post", post.blog.name, post.title)

    post.delete()

    return redirect("view_blog", blog.name)
    
        

def view_blog(request,blog_name):

    blog = Blog.objects.get(name=blog_name)
    posts = Posts.objects.filter(blog=blog)
    return render(request,"main/my_blog.html", {
        "blog": blog,
        "posts": posts
    })

def view_posts(request):

    posts = Posts.objects.all()
    return render(request,"main/posts.html", {
        "posts": posts
    })

def view_post(request,blog_name,post_title):

    blog = Blog.objects.get(name=blog_name)
    posts = Posts.objects.filter(blog=blog)
    post = posts.get(title=post_title)
    return render(request,"main/post.html", {
        "blog":blog,
        "post": post
    })

def view_search(request):

    q = request.GET.get("q") if request.GET.get != None else ""
    filtr = request.GET.get("filter")

    if filtr == "All":
        posts = Posts.objects.filter(
            Q(author__username__icontains=q) |
            Q(title__icontains=q) |
            Q(body__icontains=q)
            )

        blogs = Blog.objects.filter(
            Q(author__username__icontains=q) |
            Q(name__icontains=q) |
            Q(description__icontains=q)
            )

    elif filtr == "Blogs" :
        blogs = Blog.objects.filter(
            Q(author__username__icontains=q) |
            Q(name__icontains=q) |
            Q(description__icontains=q)
            )

        posts = None

    else:
        posts = Posts.objects.filter(
            Q(author__username__icontains=q) |
            Q(title__icontains=q) |
            Q(body__icontains=q)
            )
        
        blogs = None

    return render(request,"main/search.html", {
        "search":q,
        "filtr": filtr,
        "blogs":blogs,
        "posts": posts
    })