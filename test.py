from PIL import Image

logo = Image.open("logo-modified.png")

logo.save("favicon.ico",format='ICO')
