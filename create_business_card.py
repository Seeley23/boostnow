from reportlab.pdfgen import canvas
from reportlab.lib.colors import Color, black, white
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import stringWidth, registerFont
from reportlab.pdfbase.ttfonts import TTFont

OUT = '/home/ubuntu/boostnow/wizytowka_uslugi_boostnow.pdf'
registerFont(TTFont('DejaVu', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
registerFont(TTFont('DejaVu-Bold', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'))
W = 91 * mm
H = 61 * mm
TRIM_X = 3 * mm
TRIM_Y = 3 * mm
LIME = Color(0.58, 1.0, 0.0)
INK = Color(0.035, 0.04, 0.045)
GREY = Color(0.38, 0.40, 0.42)


def draw_logo(c, x, y, width, on_dark=True):
    # Print-safe vector recreation of the visible website mark: wordmark plus lime arrow.
    font_size = width * 0.20
    c.setFillColor(white)
    c.setFont('DejaVu-Bold', font_size)
    c.drawString(x, y + width * 0.16, 'boostnow')
    text_width = stringWidth('boostnow', 'DejaVu-Bold', font_size)
    ax = x + text_width + width * 0.035
    ay = y + width * 0.30
    c.setStrokeColor(LIME)
    c.setLineWidth(width * 0.050)
    c.setLineCap(1)
    c.line(ax, ay, ax + width * 0.16, ay + width * 0.18)
    c.line(ax + width * 0.16, ay + width * 0.18, ax + width * 0.16, ay + width * 0.05)
    c.line(ax + width * 0.16, ay + width * 0.18, ax + width * 0.03, ay + width * 0.18)


def centered(c, text, y, font='DejaVu', size=8, color=INK):
    c.setFont(font, size)
    c.setFillColor(color)
    c.drawCentredString(W / 2, y, text)


def front(c):
    c.setFillColor(INK)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    # quiet lime registration line inside the trim area
    c.setFillColor(LIME)
    c.rect(TRIM_X + 10*mm, H - TRIM_Y - 2.2*mm, 18*mm, 0.7*mm, fill=1, stroke=0)
    draw_logo(c, (W - 45*mm)/2, (H - 16*mm)/2 + 1*mm, 45*mm, on_dark=True)
    centered(c, 'Mateusz Nowotka', TRIM_Y + 11*mm, 'DejaVu-Bold', 8.5, white)
    centered(c, 'marketing online', TRIM_Y + 7*mm, 'DejaVu', 6.5, Color(0.72,0.74,0.76))


def back(c):
    c.setFillColor(white)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    x = TRIM_X + 9*mm
    top = H - TRIM_Y - 10*mm
    c.setFillColor(INK)
    c.setFont('DejaVu-Bold', 10.5)
    c.drawString(x, top, 'Usługi marketingowe')
    c.setFillColor(LIME)
    c.rect(x, top - 3.2*mm, 16*mm, 0.8*mm, fill=1, stroke=0)
    services = [
        'Strony internetowe',
        'Marketing online',
        'Social media',
        'Reklamy Google i Facebook',
        'SEO i AI',
    ]
    y = top - 12*mm
    c.setFillColor(INK)
    c.setFont('DejaVu', 8.2)
    for service in services:
        c.drawString(x, y, service)
        y -= 5.1*mm
    # Contact block with high contrast and restrained hierarchy
    cx = W - TRIM_X - 9*mm
    c.setFillColor(GREY)
    c.setFont('DejaVu', 6.7)
    c.drawRightString(cx, TRIM_Y + 14*mm, 'Mateusz Nowotka')
    c.setFillColor(INK)
    c.setFont('DejaVu-Bold', 7.2)
    c.drawRightString(cx, TRIM_Y + 9.8*mm, 'kontakt@boostnow.pl')
    c.drawRightString(cx, TRIM_Y + 5.5*mm, '+48 667 530 936')
    c.setFillColor(LIME)
    c.rect(cx - 25*mm, TRIM_Y + 2.6*mm, 25*mm, 0.7*mm, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont('DejaVu-Bold', 7.2)
    c.drawRightString(cx, TRIM_Y - 0.1*mm + 0.5*mm, 'boostnow.pl')


c = canvas.Canvas(OUT, pagesize=(W, H), pageCompression=1)
front(c)
c.showPage()
back(c)
c.showPage()
c.save()
print(OUT)
