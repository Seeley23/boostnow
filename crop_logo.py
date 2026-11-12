from PIL import Image

source = '/home/ubuntu/screenshots/boostnow_pl_2026-08-27_07-27-15_4400.webp'
out = '/home/ubuntu/boostnow_print_assets/boostnow-logo-cropped.png'
img = Image.open(source).convert('RGBA')
# The direct SVG browser render places the complete logo in the upper-left 140 x 70 px.
crop = img.crop((0, 0, 138, 64))
crop.save(out, dpi=(600, 600))
print(out)
