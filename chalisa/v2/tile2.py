import sys,glob
from PIL import Image, ImageDraw
fs=sorted(glob.glob(sys.argv[1]),key=lambda f: float(f.split('_')[-1][:-4])); pre=sys.argv[2]; C=8; per=32
for k in range(0,len(fs),per):
    sub=fs[k:k+per]; W,H=300,400; R=(len(sub)+C-1)//C; im=Image.new('RGB',(C*W,R*H),'white'); d=ImageDraw.Draw(im)
    for i,f in enumerate(sub):
        a=Image.open(f).convert('RGB'); a=a.crop((0,int(a.height*0.12),a.width,int(a.height*0.69))).resize((W,H))
        x,y=(i%C)*W,(i//C)*H; im.paste(a,(x,y)); d.rectangle([x,y,x+60,y+16],fill='black'); d.text((x+3,y+2),f.split('_')[-1][:-4].lstrip('0'),fill='yellow')
    im.save(f'{pre}{k//per}.png')
