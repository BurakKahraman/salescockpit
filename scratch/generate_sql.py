import re
import json

with open('data/templates.js', 'r') as f:
    content = f.read()

# Since templates.js is a JS file, it's hard to parse perfectly in Python.
# I will use node to generate the SQL since node is not installed, wait!
# Node wasn't installed, the previous run failed with `command not found: node`!
