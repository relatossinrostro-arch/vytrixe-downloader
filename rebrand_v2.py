import os
import re

def replace_in_file(file_path, replacements):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = content
        for pattern, replacement in replacements.items():
            new_content = re.sub(pattern, replacement, new_content)
        
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return True
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
    return False

def main():
    root_dir = r"c:\Users\georg\Desktop\downloader"
    # Specific order to handle longer strings first
    replacements = {
        r"ViralAuthorityPro": "ViralAuthority PRO PREMIUM",
        r"ViralAuthority Pro": "ViralAuthority PRO PREMIUM",
        r"Vytrixe": "ViralAuthority PRO PREMIUM"
    }
    
    ignore_dirs = {'.git', '.next', 'node_modules', '.gemini'}
    
    for root, dirs, files in os.walk(root_dir):
        dirs[:] = [d for d in dirs if d not in ignore_dirs]
        for file in files:
            if file.endswith(('.tsx', '.ts', '.js', '.jsx', '.json', '.html', '.css', '.md', '.txt')):
                file_path = os.path.join(root, file)
                if replace_in_file(file_path, replacements):
                    print(f"Updated: {file_path}")

if __name__ == "__main__":
    main()
