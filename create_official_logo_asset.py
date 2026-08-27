from pathlib import Path
import xml.etree.ElementTree as ET

source = Path('/home/ubuntu/boostnow_print_assets/boostnow-logo.svg')
out = Path('/home/ubuntu/boostnow_print_assets/boostnow-official-print.svg')
root = ET.fromstring(source.read_text())
white_path = None
for element in root.iter():
    tag = element.tag.rsplit('}', 1)[-1]
    if tag == 'path' and element.attrib.get('fill') == '#ffffff' and len(element.attrib.get('d', '')) > 500:
        white_path = element.attrib['d']
        break
if not white_path:
    raise RuntimeError('Official wordmark path not found in source SVG')
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 75" width="150" height="75">
<rect x="0" y="0" width="150" height="75" fill="#05070c"/>
<path d="{white_path}" fill="#ffffff" fill-rule="nonzero"/>
<path d="M 135 38 L 143 30 M 143 30 L 143 36 M 143 30 L 137 30" fill="none" stroke="#8dff00" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>'''
out.write_text(svg)
print(out)
