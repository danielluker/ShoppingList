"""
    Defines a graph data structure to store recommendations

    @author Daniel F. Luker
    @date 7th December 2015
"""

import operator


class Graph(object):
    """ Handles all the functionality on the graph """
    def __init__(self, name="Graph"):
        self.name = name
        self.__data = {}

    def add(self, value):
        """ Inserts a value by creating a new node.
            If the value is already in the graph, does nothing
        """
        if value not in self.__data:
            new_node = _Node()
            self.__data[value] = new_node

    def add_relationship(self, value_a, value_b):
        """ Creates (or strengthens) a relationship between two nodes """
        if value_a == value_b:
            return
        if value_a not in self.__data:
            self.add(value_a)
        if value_b not in self.__data:
            self.add(value_b)
        self.__data[value_a].add_adjacent(value_b)
        self.__data[value_b].add_adjacent(value_a)

    def add_relationship_list(self, relationships):
        """ Relates all objects in the list to each other """
        for i in range(len(relationships)):
            for j in range(i, len(relationships)):
                self.add_relationship(relationships[i], relationships[j])

    def contains(self, value):
        """ Checks if the value is contained in the graph """
        return value in self.__data

    def get_relationships(self, value):
        """ Retrieves the neighbours of value """
        if not self.contains(value):
            raise LookupError("Item not in graph", self, value)
        return self.__data[value].get_neighbours()

    def __str__(self):
        result = ""
        for value in self.__data:
            result += value + " -> "
            result += self.__data[value].get_neighbours().__str__() + "\n"
        return result


class _Node(object):
    """ Represents a node in a graph """
    def __init__(self, data=None):
        self.__adjacent = {}
        self.__data = data

    def add_adjacent(self, neighbour):
        """ Adds a relationship to this node """
        if neighbour in self.__adjacent:
            self.__adjacent[neighbour] = self.__adjacent[neighbour] + 1
        else:
            self.__adjacent[neighbour] = 1

    def get_neighbours(self):
        """ Fetches the map of (neighbours, weight) sorted by weight """
        result = sorted(self.__adjacent.items(), key=operator.itemgetter(1))
        result.reverse()
        return result
