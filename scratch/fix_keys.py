#!/usr/bin/env python3
"""Fix config.js: revert backtick keys back to single quotes. 
Only multiline VALUES should use backticks, not keys."""
import re

CONFIG_PATH = '/Users/burakkahraman/Desktop/test/data/config.js'

with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern: backtick-quoted key followed by colon
# e.g.  `prem3→prem4`:  should be  'prem3→prem4':
# But we need to be careful not to touch backtick VALUES

# Strategy: Find patterns like `sometext`:  (backtick key before colon)
# These are always single-line so we can use regex
fixed = re.sub(r'`([^`\n]+)`(\s*:)', r"'\1'\2", content)

# Count fixes
changes = len(re.findall(r'`([^`\n]+)`(\s*:)', content))

with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
    f.write(fixed)

print(f"Fixed {changes} backtick-quoted keys back to single quotes.")
print(f"File size: {len(fixed)} bytes")
