import json

with open(r'C:\Users\Prem Mandal\.gemini\antigravity\brain\b74d4e1f-794f-4891-bba8-86083f7ec73b\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8') as f:
    lines = f.readlines()

last_css = ''
for line in lines:
    try:
        d = json.loads(line)
        if d.get('type') == 'SYSTEM_MESSAGE':
            content = d.get('content', '')
            if '.bg-effects' in content and 'var(--bg-main)' in content:
                last_css = content
    except:
        pass

if last_css:
    with open('last_view_css.txt', 'w', encoding='utf-8') as f:
        f.write(last_css)
    print("Extracted to last_view_css.txt")
else:
    print("Could not find style.css view output.")
