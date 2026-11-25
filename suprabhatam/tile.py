import sys,glob
from PIL import Image, ImageDraw
fs=sorted(glob.glob(sys.argv[1]),key=lambda f: float(f.split('_')[-1][:-4])); C=7; W,H=270,480
R=(len(fs)+C-1)//C; im=Image.new('RGB',(C*W,R*H),'white'); d=ImageDraw.Draw(im)
for i,f in enumerate(fs):
    a=Image.open(f).convert('RGB').resize((W,H)); x,y=(i%C)*W,(i//C)*H; im.paste(a,(x,y)); d.rectangle([x,y,x+50,y+16],fill='black'); d.text((x+3,y+2),f.split('_')[-1][:-4].lstrip('0'),fill='yellow')
im.save(sys.argv[2])
