import json

with open(r'C:\Users\Prem Mandal\.gemini\antigravity\brain\b74d4e1f-794f-4891-bba8-86083f7ec73b\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8') as f:
    lines = f.readlines()

css_content = ''

for idx, line in enumerate(lines):
    if idx > 1230:
        break
        
    try:
        d = json.loads(line)
        tool_calls = d.get('tool_calls', [])
        for tc in tool_calls:
            name = tc.get('name')
            target = tc.get('args', {}).get('TargetFile', '')
            
            if name == 'write_to_file' and target.endswith('style.css'):
                css_content = tc.get('args', {}).get('CodeContent', '')
                
            elif name in ['replace_file_content', 'multi_replace_file_content'] and target.endswith('style.css'):
                
                chunks = tc.get('args', {}).get('ReplacementChunks', []) if name == 'multi_replace_file_content' else [tc.get('args', {})]
                
                for chunk in chunks:
                    target_text = chunk.get('TargetContent', '')
                    replace_text = chunk.get('ReplacementContent', '')
                    
                    if target_text in css_content:
                        # only replace the first occurrence to be safe, or just use string replace
                        css_content = css_content.replace(target_text, replace_text, 1)
                    else:
                        pass
    except Exception as e:
        pass

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(css_content)

print(f"Rebuilt style.css up to line 1230. Size: {len(css_content)}")
