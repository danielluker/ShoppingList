""" Class which defines the objects stored in the database

    @author Daniel Luker
    @date 11/11/2015
"""

from django.db import models
# from djangotoolbox.fields import ListField
# from mongoengine import ListField
from djangotoolbox.fields import DictField, ListField
from django.contrib.auth.models import User


class UserObject(models.Model):
    """ Defines the main user object stored in the database """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    shoppinglists = ListField()
    messages = ListField()


class ShoppingList(models.Model):
    """ Defines a list of items """
    # unique_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=32)
    numberOfItems = models.IntegerField()
    contents = DictField()

    # def add_contents(self, contents_dict):
    #     """ Adds a dictionary to the contents field """
    #     self.contents = contents_dict


class Message(models.Model):
    """ Defines a list of messages """
    # We want to protect messages on deletion to allow keeping messages
    # sent by former users
    sender = models.ForeignKey(User, on_delete=models.PROTECT)
    content = models.CharField(max_length=2048)
    date = models.DateTimeField()
