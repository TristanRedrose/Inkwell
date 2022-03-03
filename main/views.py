from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.contrib.auth import authenticate, login, logout



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
            return redirect("index")
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
        return redirect('index')
    else:
        return render (request, "main/register.html")