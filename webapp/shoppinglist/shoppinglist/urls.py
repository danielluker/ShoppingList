"""shoppinglist URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin

from . import views, requests, auth

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', views.initial, name='initial'),
    url(r'^home/$', views.home, name='home'),
    url(r'^home?show_login=true', views.initial_login, name='home'),
    url(r'^home/save/', requests.save_list),
    url(r'^home/get_all_lists/', requests.get_all_lists),
    url(r'^home/get_list', requests.get_list),
    url(r'^home/new_list', views.new_list, name='new_list'),
    url(r'^djangojs/', include('djangojs.urls')),
    url(r'^email/', requests.check_email),
    url(r'^register/', auth.register_user),
    url(r'^login/', auth.login_user),
    url(r'^logout/', auth.logout_user),
    url(r'^forgot_password/$', views.forgot_password),
]
