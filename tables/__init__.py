#!/usr/bin/python3
"""This script holds tells where to begin when process begins"""
from tables.engine.storage_handler import StorageHandler

storage = StorageHandler()
storage.reload()
