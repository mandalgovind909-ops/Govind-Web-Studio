import os
import glob

old_html = """            <div class="nav-actions">
                <a href="https://wa.me/917257997915" target="_blank" class="whatsapp-btn" aria-label="Chat on WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
                <a href="contact.html" class="btn btn-primary">Get Free Quote &rarr;</a>
                <button class="mobile-toggle" aria-label="Toggle Menu"><i class="fa-solid fa-bars"></i></button>
            </div>"""

new_html = """            <div class="nav-actions">
                <a href="https://wa.me/917257997915" target="_blank" class="nav-wa" aria-label="Chat on WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
                <a href="contact.html" class="btn btn-primary nav-quote-btn">Get Free Quote &rarr;</a>
                <button class="mobile-toggle" aria-label="Toggle Menu"><i class="fa-solid fa-bars"></i></button>
            </div>"""

files = glob.glob('*.html')
count = 0
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    if old_html in content:
        content = content.replace(old_html, new_html)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

print(f"Updated {count} HTML files.")
