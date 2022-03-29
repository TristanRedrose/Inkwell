from django.forms import ValidationError
from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.db.models import Q
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

from .models import Category, Blog, Posts, Comments



# Create your views here.

def index(request):

    return render (request, "main/index.html")

def sign_in_page(request):

    return render (request, "main/login.html")

def register_page(request):

    return render (request, "main/register.html")

def log_out(request):

    logout(request)
    return render (request, "main/login.html")

@login_required(login_url="/sign_in")
def create_blog_view(request):
    
    try:
        blog = Blog.objects.get(author=request.user)
    except:
        ctg = Category.objects.all()   
        return render (request, "main/create_blog.html", {
            "categories": ctg
        })
    
    blog = Blog.objects.get(author=request.user)
    return redirect("view_blog", blog.name)

@login_required(login_url="/sign_in")
def edit_blog_view(request, blog_name):

    ctg = Category.objects.all()
    blog = Blog.objects.get(name=blog_name)

    # Redirect user back to blog if user does not have permission to edit blog
    if request.user != blog.author:
        return redirect("view_blog", blog_name)
    
    return render(request,"main/edit_blog.html", {
        "blog": blog,
        "categories": ctg
    })  

@login_required(login_url="/sign_in")
def create_post_view(request):

    
    categories = Category.objects.all()
    blog = Blog.objects.get(author=request.user)   
    return render(request,"main/create_post.html", {
        "default": blog.category.name,
        "categories": categories
    })

@login_required(login_url="/sign_in")
def edit_post_view(request, post_title):

    userposts = Posts.objects.filter(author=request.user)
    post = Posts.objects.get(title=post_title, author=request.user)
    categories = Category.objects.all()

    # Redirect user back to post if user does not have permission to edit post
    if request.user != post.author:
        return redirect("post", post.blog.name, post.title)

    
    return render(request,"main/edit_post.html", {
        "post": post,
        "categories": categories
    })

def view_blogs(request):

    blogs = Blog.objects.all()
    return render(request,"main/blogs.html", {
        "blogs": blogs
    })

@login_required(login_url="/sign_in")
def delete_post_view(request, post_title):

    blog = Blog.objects.get(author=request.user)
    post = Posts.objects.get(title=post_title, blog=blog)

    return render(request,"main/delete_post.html", {
            "post": post,
            "blog":blog
        })

@login_required(login_url="/sign_in")
def delete_post(request, post_title):

    blog = Blog.objects.get(author=request.user)
    post = Posts.objects.get(title=post_title, blog=blog)

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
    comments = Comments.objects.filter(post=post)
    comments = comments.order_by("-created").all()
    return render(request,"main/post.html", {
        "blog":blog,
        "post": post,
        "comments": comments
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

#API-s

def sign_in(request):

    # Signing in must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    data = json.loads(request.body)
    username = data.get("username", "")

    if username.strip() == "":
                return JsonResponse({"error": "Username cannot be empty"}, status=400)

    password = data.get("password", "")
    if password.strip() == "":
        return JsonResponse({"error": "Password cannot be empty"}, status=400)

    # Make username check case insensitive
    users = User.objects.all()
    for user in users:
        if (user.username).upper() == username.upper():
            username = user.username

    # Get user and if no error log him in
    try:
        user = User.objects.get(username=username)
    except:
        return JsonResponse({"error": "Invalid username or password."}, status=400)
        
    user = authenticate(request, username=username, password=password)
    if user is not None:
        print(user)
        login(request, user)
        return JsonResponse({"message": "User logged in."}, status=200)
    else:
        return JsonResponse({"error": "Invalid username or password."}, status=400)

def register(request):

    # Register must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    data = json.loads(request.body)
    username = data.get("username", "")

    if username.strip() == "":
        return JsonResponse({"error": "Username cannot be empty."}, status=400)

    # See if username is already taken
    users = User.objects.all()

    for user in users:
        name = user.username
        if name.upper() == username.upper():
            return JsonResponse({"error": "Username already taken."}, status=400)

    password = data.get("password", "")

    if password.strip() == "":
        return JsonResponse({"error": "Password cannot be empty."}, status=400)

    confirm = data.get("confirm", "")

    # See if passwords match
    if password != confirm:
        return JsonResponse({"error": "Passwords must match."}, status=400)
    
    # If no errors occur create user and log him in
    try:
        user = User.objects.create_user(username=username,password=password)
        user.save()
    except IntegrityError:
        return JsonResponse({"error": "Username already taken"}, status=400)
    login(request, user)
    
    return JsonResponse({"message": "User succesfully registered."}, status=200)

@login_required(login_url="/sign_in")
def create_blog(request):

    # Creating a new blog must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    data = json.loads(request.body)
    author = request.user
    name = data.get("name", "")
    if name.strip() == "":
        return JsonResponse({"error": "Blog name cannot be empty."}, status=400)

    description = data.get("description", "")
    if description.strip() == "":
        return JsonResponse({"error": "Blog description cannot be empty."}, status=400)

    category = data.get("category", "")
    image = data.get("image", "")

    blog=Blog(
        author=author,
        name=name,
        description=description,
        category=Category.objects.get(name=category),
        image=image
    )
    blog.save()

    return JsonResponse({"message": "Blog created."}, status=201)

@login_required(login_url="/sign_in")
def edit_blog(request, blog_id):

    # Creating a new blog must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    try:
        blog = Blog.objects.get(pk=blog_id)
    except:
        return JsonResponse({"error": "Blog not found."}, status=400)

    data = json.loads(request.body)
    name = data.get("name", "")
    if name.strip() == "":
        return JsonResponse({"error": "Blog name cannot be empty."}, status=400)

    description = data.get("description", "")
    if description.strip() == "":
        return JsonResponse({"error": "Blog description cannot be empty."}, status=400)

    category = data.get("category", "")
    image = data.get("image", "")

    blog.name = name
    blog.description = description
    blog.category = Category.objects.get(name=category)
    blog.image = image

    blog.save()

    return JsonResponse({"message": "Blog edited."}, status=201)

@login_required(login_url="/sign_in")
def create_post(request):

    # See if user has any previous posts
    try: 
        posts = Posts.objects.filter(author=request.user)
    except Posts.DoesNotExist:
        posts = None

    if request.method != "POST":
        return JsonResponse({"error": "Post request required."}, status=400)

    author = request.user
    blog = Blog.objects.get(author=request.user)

    data = json.loads(request.body)
    category = data.get("category", "")
    title = data.get("title", "")
    if title.strip() == "":
        return JsonResponse({"error": "Post title cannot be empty."}, status=400)

    # If user has previous posts, see if he already has a post with the given title
    if posts != None:
        for post in posts:
            if post.title.upper() == title.upper():
                return JsonResponse({"error": "You already have a post with this title."}, status=400)

    body = data.get("body", "")
    if body.strip() == "":
        return JsonResponse({"error": "Post body cannot be empty."}, status=400)

    image = data.get("image", "")

    post=Posts(
        author=author,
        blog=blog,
        category=Category.objects.get(name=category),
        title=title,
        body=body,
        image=image
    )
    post.save()

    return JsonResponse({"message": "Post created."}, status=201)

@login_required(login_url="/sign_in")
def edit_post(request,post_id):

    # Composing a new comment must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)
    
    userposts = Posts.objects.filter(author=request.user)

    data = json.loads(request.body)
    category = data.get("category", "")
    title = data.get("title", "")
    if title.strip() == "":
        return JsonResponse({"error": "Post title cannot be empty."}, status=400)
    
    post = Posts.objects.get(pk=post_id, author=request.user)

    # See if user already has a post with the given title
    for userpost in userposts:
        if (userpost.title == title) & (title != post.title):
            return JsonResponse({"error": "You already have a post with this title."}, status=400)

    body = data.get("body", "")
    if body.strip() == "":
        return JsonResponse({"error": "Post body cannot be empty."}, status=400)

    image = data.get("image", "")
    post.category = Category.objects.get(name=category)
    post.title = title
    post.body = body
    post.image = image 

    post.save()

    return JsonResponse({"message": "Post edited."}, status=201)
    
@login_required(login_url="/sign_in")
def comment(request):

    # Composing a new comment must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    data = json.loads(request.body)
    body = data.get("comment", "")
    if body.strip() == "":
        return JsonResponse({"error": "Comment cannot be empty."}, status=400)

    postpk = data.get("post", "")
    post = Posts.objects.get(pk=postpk)   
    
    comment = Comments(
        author=request.user,
        post=post,
        body=body
    )

    comment.save()

    return JsonResponse({"message": "Comment submitted."}, status=201)

@login_required(login_url="/sign_in")
def delete_comment(request, comment_id):

    try:
         comment = Comments.objects.get(pk=comment_id)
    except:
        return JsonResponse({"error": "Comment not found."}, status=400)

    if request.user != comment.author:
        return JsonResponse({"error": "Unauthorised delete"}, status=400)

    comment.delete()

    return JsonResponse({"message": "Comment removed."}, status=201)

@login_required(login_url="/sign_in")
def get_comment(request, comment_id):

    try:
        comment = Comments.objects.get(pk=comment_id)
    except:
        return JsonResponse({"error": "Comment not found."}, status=400)
    
    text = comment.body
    return JsonResponse(text, safe=False)

@login_required(login_url="/sign_in")
def edit_comment(request, comment_id):

    # Editing a comment must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    data = json.loads(request.body)
    body = data.get("comment", "")
    if body.strip() == "":
        return JsonResponse({"error": "Comment cannot be empty."}, status=400)

    comment = Comments.objects.get(pk=comment_id)

    if request.user != comment.author:
        return JsonResponse({"error": "Unauthorised edit."}, status=400)
    
    comment.body = body

    comment.save()

    return JsonResponse({"message": "Comment edited."}, status=201)