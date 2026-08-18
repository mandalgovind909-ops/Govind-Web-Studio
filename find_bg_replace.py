import json

with open(r'C:\Users\Prem Mandal\.gemini\antigravity\brain\b74d4e1f-794f-4891-bba8-86083f7ec73b\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    try:
        d = json.loads(line)
        tool_calls = d.get('tool_calls', [])
        for tc in tool_calls:
            if tc.get('name') in ['replace_file_content', 'multi_replace_file_content']:
                target = tc.get('args', {}).get('TargetFile', '')
                if target.endswith('style.css'):
                    content = str(tc.get('args'))
                    if 'bg-effects' in content:
                        print(f"Found bg-effects modification at line {idx}")
    except Exception as e:
        pass
