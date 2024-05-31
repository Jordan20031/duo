import qrcode

qr = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_L, box_size=10, border=4)
qr.add_data('https://f514-85-169-101-162.ngrok-free.app/screen/DUO')
qr.make(fit=True)

img = qr.make_image(fill_color="black", back_color="white")
img.save("screen/qr-connect/qrcode.png")