""" Class which defines the objects stored in the database

    @author Daniel Luker
    @date 11/11/2015
"""

from django.db import models
# from djangotoolbox.fields import ListField
from mongoengine import ListField
from djangotoolbox.fields import DictField


class UserObject(models.Model):
    """ Defines the main user object stored in the database """
    unique_id = models.AutoField(primary_key=True)
    shoppinglists = ListField()


class ShoppingList(models.Model):
    """ Defines a list of items """
    unique_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=32)
    numberOfItems = models.IntegerField()
    contents = DictField()

    # def add_contents(self, contents_dict):
    #     """ Adds a dictionary to the contents field """
    #     self.contents = contents_dict
