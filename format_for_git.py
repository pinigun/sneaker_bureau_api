import re
import os
import sys

def slugify(text: str) -> str:
    text = text.lower()
    text = re.sub(r'[^a-zа-яё0-9\s\-]', '', text)
    text = re.sub(r'\s+', '-', text)
    return text

def convert_links(md_text: str) -> str:
    pattern = r'\[\[#(.+?)\|(.+?)\]\]'
    def replacer(m):
        header = m.group(1)
        link_text = m.group(2)
        anchor = slugify(header)
        return f'[{link_text}](#{anchor})'
    return re.sub(pattern, replacer, md_text)

def process_file(filepath: str):
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    new_text = convert_links(text)
    base, ext = os.path.splitext(filepath)
    new_filename = f"{base}-git{ext}"
    with open(new_filename, 'w', encoding='utf-8') as f:
        f.write(new_text)
    print(f"Created {new_filename}")

def process_path(path: str):
    if os.path.isdir(path):
        for root, _, files in os.walk(path):
            for file in files:
                if file.endswith('.md'):
                    process_file(os.path.join(root, file))
    else:
        process_file(path)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python make_git_versions.py <file_or_dir>")
        sys.exit(1)
    process_path(sys.argv[1])

