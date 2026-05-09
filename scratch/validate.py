#!/usr/bin/env python3
"""Validate config.js syntax by checking backtick balance and multiline strings."""

CONFIG_PATH = '/Users/burakkahraman/Desktop/test/data/config.js'

with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

# Count backticks
bt_count = content.count('`')
print(f"Backtick count: {bt_count} (even: {bt_count % 2 == 0})")

# Check for remaining multiline single-quoted strings
i = 0
n = len(content)
issues = []
while i < n:
    ch = content[i]
    if ch == '`':
        # Skip backtick string
        i += 1
        while i < n and content[i] != '`':
            i += 1
        i += 1  # skip closing backtick
        continue
    if ch == '"':
        # Skip double-quoted string
        i += 1
        while i < n and content[i] != '"':
            if content[i] == '\\':
                i += 1
            i += 1
        i += 1
        continue
    if ch == "'":
        # Check if this single-quoted string is multiline
        j = i + 1
        while j < n and content[j] != "'":
            if content[j] == '\\':
                j += 1
            j += 1
        if j < n:
            segment = content[i+1:j]
            if '\n' in segment:
                line_num = content[:i].count('\n') + 1
                issues.append(f"Line {line_num}: Multiline single-quoted string found!")
        i = j + 1
        continue
    i += 1

print(f"Total lines: {content.count(chr(10)) + 1}")
if issues:
    print(f"PROBLEMS FOUND: {len(issues)}")
    for iss in issues:
        print(f"  - {iss}")
else:
    print("No multiline single-quoted strings found. Config looks clean!")
