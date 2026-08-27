from reportlab.pdfgen import canvas
from reportlab.lib.colors import Color, white
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import stringWidth, registerFont
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader

OUT = '/home/ubuntu/boostnow/wizytowka_uslugi_boostnow_v2.pdf'
registerFont(TTFont('DejaVu', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
registerFont(TTFont('DejaVu-Bold', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'))

W, H = 91 * mm, 61 * mm
BLEED = 3 * mm
LIME = Color(0.60, 1.0, 0.0)
LIME_SOFT = Color(0.38, 0.72, 0.05)
BLACK = Color(0.018, 0.022, 0.028)
GRAPHITE = Color(0.055, 0.065, 0.075)
MUTED = Color(0.62, 0.65, 0.68)


def gradient(c, left=True):
    bands = 90
    for i in range(bands):
        t = i / (bands - 1)
        if left:
            col = Color(0.018 + 0.018*t, 0.022 + 0.025*t, 0.028 + 0.025*t)
        else:
            col = Color(0.055 - 0.030*t, 0.065 - 0.035*t, 0.075 - 0.040*t)
        c.setFillColor(col)
        c.rect(0, H * i / bands, W, H / bands + 0.3, fill=1, stroke=0)


def glow(c, cx, cy, radius, color=LIME_SOFT):
    try:
        c.saveState()
        c.setFillAlpha(0.025)
        for i in range(14, 0, -1):
            r = radius * i / 14
            c.setFillColor(color)
            c.circle(cx, cy, r, fill=1, stroke=0)
        c.restoreState()
    except AttributeError:
        pass


def logo(c, x, y, scale=1.0):
    # Exact website SVG logo rendered at high resolution for the print PDF.
    img = ImageReader('/home/ubuntu/boostnow_print_assets/boostnow-official-browser.png')
    iw, ih = img.getSize()
    width = 45 * mm * scale
    height = width * ih / iw
    c.drawImage(img, x, y, width=width, height=height, mask='auto', preserveAspectRatio=True)


def front(c):
    gradient(c, left=True)
    glow(c, W - 12*mm, H - 4*mm, 27*mm)
    x = BLEED + 8*mm
    logo(c, x, H - BLEED - 13*mm, 1.0)
    c.setFillColor(LIME)
    c.rect(x, H - BLEED - 20*mm, 14*mm, 0.65*mm, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont('DejaVu-Bold', 15.5)
    c.drawString(x, BLEED + 17*mm, 'Mateusz')
    c.drawString(x, BLEED + 10.5*mm, 'Nowotka')
    # fine trim-safe frame only inside bleed
    c.setStrokeColor(Color(0.25,0.30,0.20))
    c.setLineWidth(0.25)
    c.line(BLEED, BLEED, W-BLEED, BLEED)


def back(c):
    gradient(c, left=False)
    glow(c, 4*mm, 8*mm, 22*mm, LIME)
    x = BLEED + 9*mm
    top = H - BLEED - 10*mm
    c.setFillColor(LIME)
    c.setFont('DejaVu-Bold', 8.2)
    c.drawString(x, top, 'USŁUGI')
    c.setStrokeColor(Color(0.35,0.45,0.25))
    c.setLineWidth(0.35)
    c.line(x, top - 8*mm, W - BLEED - 9*mm, top - 8*mm)
    c.setFont('DejaVu', 6.8)
    left_services = ['STRONY WWW', 'MARKETING ONLINE', 'SOCIAL MEDIA']
    right_services = ['GOOGLE ADS', 'SEO / AI']
    y = top - 12*mm
    for s in left_services:
        c.setFillColor(white)
        c.drawString(x, y, s)
        y -= 5.0*mm
    y = top - 12*mm
    right_x = W / 2 + 2*mm
    for s in right_services:
        c.setFillColor(LIME if s == 'SEO / AI' else white)
        c.drawString(right_x, y, s)
        y -= 5.0*mm
    cx = W - BLEED - 9*mm
    c.setFillColor(MUTED)
    c.setFont('DejaVu', 6.3)
    c.drawRightString(cx, BLEED + 12.5*mm, 'Mateusz Nowotka')
    c.setFillColor(white)
    c.setFont('DejaVu-Bold', 7.1)
    c.drawRightString(cx, BLEED + 8.5*mm, 'kontakt@boostnow.pl')
    c.drawRightString(cx, BLEED + 4.3*mm, '+48 667 530 936')
    c.setFillColor(LIME)
    c.rect(cx - 20*mm, BLEED + 1.8*mm, 20*mm, 0.6*mm, fill=1, stroke=0)
    c.setFillColor(white)
    c.drawRightString(cx, BLEED - 1.8*mm, 'boostnow.pl')


c = canvas.Canvas(OUT, pagesize=(W, H), pageCompression=1)
front(c)
c.showPage()
back(c)
c.showPage()
c.save()
print(OUT)
