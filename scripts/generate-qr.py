#!/usr/bin/env python3
import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import RoundedModuleDrawer
from qrcode.image.styles.colormasks import SolidFillColorMask
from PIL import Image, ImageDraw
import os

URL = "https://cv.riyanalghamdi.com"
OUTPUT = "/home/opa/projects/cv-riyanalghamdi/public/qr.png"
PHOTO  = "/home/opa/projects/cv-riyanalghamdi/public/images/riyan.jpg"

BG = (10, 10, 10)
FG = (240, 240, 240)
SIZE = 1000

qr = qrcode.QRCode(
    version=4,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=14,
    border=3,
)
qr.add_data(URL)
qr.make(fit=True)

img = qr.make_image(
    image_factory=StyledPilImage,
    module_drawer=RoundedModuleDrawer(radius_ratio=0.55),
    color_mask=SolidFillColorMask(back_color=BG, front_color=FG),
).convert("RGBA")

img = img.resize((SIZE, SIZE), Image.LANCZOS)

# --- Profile photo circular crop ---
logo_size = int(SIZE * 0.22)
border_w  = int(logo_size * 0.06)

photo = Image.open(PHOTO).convert("RGBA")
w, h = photo.size
crop = min(w, h)
left = (w - crop) // 2
top  = max(0, int((h - crop) * 0.15))
photo = photo.crop((left, top, left + crop, top + crop))
photo = photo.resize((logo_size, logo_size), Image.LANCZOS)

mask = Image.new("L", (logo_size, logo_size), 0)
ImageDraw.Draw(mask).ellipse((0, 0, logo_size, logo_size), fill=255)

# Dark border ring
ring_size = logo_size + border_w * 2
ring = Image.new("RGBA", (ring_size, ring_size), (0,0,0,0))
ring_mask = Image.new("L", (ring_size, ring_size), 0)
ImageDraw.Draw(ring_mask).ellipse((0, 0, ring_size, ring_size), fill=255)
ring_bg = Image.new("RGBA", (ring_size, ring_size), BG + (255,))
ring.paste(ring_bg, mask=ring_mask)

# White halo
halo_size = ring_size + border_w * 2
halo = Image.new("RGBA", (halo_size, halo_size), (0,0,0,0))
halo_mask = Image.new("L", (halo_size, halo_size), 0)
ImageDraw.Draw(halo_mask).ellipse((0, 0, halo_size, halo_size), fill=255)
halo_bg = Image.new("RGBA", (halo_size, halo_size), FG + (200,))
halo.paste(halo_bg, mask=halo_mask)

ring.paste(photo, (border_w, border_w), mask)
halo.paste(ring, (border_w, border_w), ring_mask)

cx = (SIZE - halo_size) // 2
cy = (SIZE - halo_size) // 2
img.paste(halo, (cx, cy), halo_mask)

final = img.convert("RGB")
final.save(OUTPUT, "PNG", optimize=True)
print(f"Saved {final.size[0]}x{final.size[1]} → {OUTPUT}")
