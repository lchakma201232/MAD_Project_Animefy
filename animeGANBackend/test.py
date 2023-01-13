from KK import Model
import requests
import PIL.Image

image = requests("https://i.imgur.com/1ZQ2Z9A.jpg", stream=True).raw
print(image)