from pathlib import Path
import xml.etree.ElementTree as ET

root = ET.fromstring(Path('/home/ubuntu/boostnow_print_assets/boostnow-logo.svg').read_text())
ns = {'svg': 'http://www.w3.org/2000/svg'}
for element in root.iter():
    tag = element.tag.rsplit('}', 1)[-1]
    if tag in {'path', 'image', 'rect'}:
        attrs = {k.rsplit('}', 1)[-1]: v for k, v in element.attrib.items()}
        print(tag, {k: attrs[k] for k in attrs if k not in {'d', 'href', 'xlink:href'}})
        if tag == 'path':
            print('path_prefix', attrs.get('d', '')[:120])
