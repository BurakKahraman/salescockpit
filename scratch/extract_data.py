import re
import json

with open('SalesCockpit.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Basit bir regex ile JS objelerini yakalamaya calisalim
# Not: eval() tehlikeli ama bu kontrollü bir ortam. 
# Ancak Python eval'i JS objelerini (true/false/null farki) anlamaz.
# Bu yüzden sadece veriyi oldugu gibi dosyaya yazip manüel düzenleyecegiz 
# veya JS objesini JSON formatina yaklastiracagiz.

def extract_obj(name):
    pattern = f"const {name} = ({{[\s\S]*?}});"
    match = re.search(pattern, content)
    if match:
        # JS objesini JSON'a cevirmek icin basit düzeltmeler
        raw = match.group(1)
        # Regex ile keyleri "key" haline getir, single quote'lari double yap vb.
        # Bu cok riskli, en iyisi veriyi oldugu gibi alip kucuk parcalar halinde dosyaya yazmak.
        return raw
    return None

tmpl = extract_obj('TMPL_DEFAULT')
cfg = extract_obj('CFG')

if tmpl:
    with open('data/templates.raw.js', 'w') as f:
        f.write("export const TMPL_DEFAULT = " + tmpl + ";")
if cfg:
    with open('data/config.raw.js', 'w') as f:
        f.write("export const CFG = " + cfg + ";")

print("Raw data files created in data/")
