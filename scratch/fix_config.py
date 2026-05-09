#!/usr/bin/env python3
"""Fix multiline strings in data/config.js: convert single-quotes to backticks."""
import os

CONFIG_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'data', 'config.js')

with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

# Walk through the file character by character
# Convert any single-quoted string that spans multiple lines to a backtick string
result = []
i = 0
n = len(content)
converted = 0

while i < n:
    ch = content[i]
    
    # Skip template literals (backticks) - leave them as-is
    if ch == '`':
        result.append(ch)
        i += 1
        while i < n and content[i] != '`':
            result.append(content[i])
            i += 1
        if i < n:
            result.append(content[i])  # closing backtick
            i += 1
        continue
    
    # Skip double-quoted strings
    if ch == '"':
        result.append(ch)
        i += 1
        while i < n and content[i] != '"':
            if content[i] == '\\':
                result.append(content[i])
                i += 1
                if i < n:
                    result.append(content[i])
                    i += 1
                continue
            result.append(content[i])
            i += 1
        if i < n:
            result.append(content[i])  # closing double quote
            i += 1
        continue
    
    # Handle single-quoted strings
    if ch == "'":
        # Scan ahead to find the closing single quote
        j = i + 1
        has_newline = False
        while j < n:
            if content[j] == '\\':
                j += 2
                continue
            if content[j] == "'":
                break
            if content[j] == '\n':
                has_newline = True
            j += 1
        
        if has_newline and j < n:
            # Multiline string - convert to backtick
            result.append('`')
            result.append(content[i+1:j])
            result.append('`')
            converted += 1
            i = j + 1
            continue
        else:
            # Single-line string - keep as-is
            result.append(ch)
            i += 1
            continue
    
    result.append(ch)
    i += 1

output = ''.join(result)

with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
    f.write(output)

print(f"Done! Converted {converted} multiline single-quoted strings to backtick template literals.")
print(f"Output file: {CONFIG_PATH}")
print(f"File size: {len(output)} bytes")
