from django.shortcuts import render

# Create your views here.

def index(request):
    return render (request, "main/index.html")

def sign_in(request):
    return render (request, "main/sign_in.html")