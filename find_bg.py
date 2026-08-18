import json

with open(r'C:\Users\Prem Mandal\.gemini\antigravity\brain\b74d4e1f-794f-4891-bba8-86083f7ec73b\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8') as f:
    lines = f.readlines()

found = False
for line in lines:
    try:
        d = json.loads(line)
        tool_calls = d.get('tool_calls', [])
        for tc in tool_calls:
            if tc.get('name') == 'write_to_file':
                content = tc.get('args', {}).get('CodeContent', '')
                target = tc.get('args', {}).get('TargetFile', '')
                if target.endswith('style.css'):
                    with open('bg_effects_css.txt', 'w', encoding='utf-8') as out:
                        out.write(content)
                    print(f"Saved style.css from transcript to bg_effects_css.txt")
                    found = True
    except:
        pass

if not found:
    print("Could not find any style.css write_to_file.")
