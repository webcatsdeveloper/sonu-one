import re

def main():
    # 1. Update sections/sonu-faq-accordion-sh.liquid
    section_path = 'sections/sonu-faq-accordion-sh.liquid'
    with open(section_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace block type declarations and presets
    content = content.replace('"type": "faq"', '"type": "faq_item"')
    
    with open(section_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated section block types.")

    # 2. Update templates/page.support.json
    template_path = 'templates/page.support.json'
    with open(template_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    content = content.replace('"type": "faq"', '"type": "faq_item"')
    
    with open(template_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated page support template block types.")

if __name__ == '__main__':
    main()
