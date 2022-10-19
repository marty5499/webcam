from PIL import Image

img = Image.open('project.tm.report.jpg')
h, w = img.size
c = img.mode
if(c!='RGB'):
    img = img.convert('RGB')
if(h!=224 or w!=224):
    img = img.resize((224, 224))
img.save('test.jpg')