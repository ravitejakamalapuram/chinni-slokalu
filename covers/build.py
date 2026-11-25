import os
import json,subprocess,sys,html
S=sys.argv[1]; R=os.environ.get('REEL_OUT', os.environ['REEL_ROOT']+'/out')+'/'
only=sys.argv[2:] 
cov=json.load(open(S+'/covers.json'))
def dur(f): return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',R+f]))
for name,f,t,(x,y,w,h),te,en,men,mte in cov:
    if only and name not in only: continue
    d=dur(f)
    if t=='end': t=d-2
    elif isinstance(t,int): t=round(2+(d-4)*t/15,1)
    subprocess.run(['ffmpeg','-v','error','-y','-ss',str(t),'-i',R+f,'-frames:v','1',f'{S}/{name}-frame.png'],check=True)
    subprocess.run(['ffmpeg','-v','error','-y','-i',f'{S}/{name}-frame.png','-vf',f'crop={w}:{h}:{x}:{y}',f'{S}/{name}-art.png'],check=True)
    ens=56 if len(en)<=18 else 46
    tes=84 if len(te)<=14 else 70
    doc=f'''<html><head><meta charset="utf-8"><link rel="stylesheet" href="fonts/fonts.css"><style>
*{{margin:0;box-sizing:border-box}} body{{width:1080px;height:1920px;overflow:hidden;position:relative;background:#222}}
.bg{{position:absolute;inset:-60px;background:url({name}-frame.png) center/cover;filter:blur(28px) saturate(1.2) brightness(.8)}}
.shade{{position:absolute;inset:0;background:linear-gradient(#0006,#0000 25%,#0000 70%,#0007)}}
.top{{position:absolute;top:250px;width:100%;text-align:center;font:800 40px 'Baloo Tammudu 2';color:#fff;text-shadow:0 3px 10px #0008}}
.art{{position:absolute;left:40px;top:450px;width:1000px;height:600px;border-radius:44px;background:url({name}-art.png) center/cover;border:8px solid #FFE27A;box-shadow:0 14px 40px #0007}}
.te{{position:absolute;top:1085px;width:100%;text-align:center;font:800 {tes}px/1.25 'Baloo Tammudu 2';color:#fff;-webkit-text-stroke:3px #5a2a00;paint-order:stroke fill;text-shadow:0 5px 0 #5a2a00,0 8px 20px #0008}}
.en{{position:absolute;top:{1085+int(tes*1.25)+6}px;width:100%;text-align:center;font:{ens}px 'Luckiest Guy';color:#FFD23F;letter-spacing:1px;-webkit-text-stroke:2px #5a2a00;paint-order:stroke fill;text-shadow:0 4px 0 #5a2a00}}
.mean{{position:absolute;left:70px;right:70px;top:1300px;height:185px;background:#FFF8E7;border-radius:30px;border:5px solid #E9A23B;display:flex;flex-direction:column;justify-content:center;text-align:center;padding:0 30px;box-shadow:0 10px 26px #0006}}
.mean .a{{font:800 40px/1.2 'Baloo Tammudu 2';color:#3b1c00}} .mean .b{{font:800 30px/1.3 'Baloo Tammudu 2';color:#B4462E;margin-top:6px}}
.bot{{position:absolute;top:1590px;width:100%;text-align:center}} .pill{{display:inline-block;background:#D6336C;color:#fff;font:46px 'Luckiest Guy';padding:22px 50px 14px;border-radius:60px;border:5px solid #fff;box-shadow:0 8px 20px #0007}}
</style></head><body><div class="bg"></div><div class="shade"></div>
<div class="top">తెలుగు శ్లోకాలు · Slokas for Kids</div>
<div class="art"></div><div class="te">{html.escape(te)}</div><div class="en">{html.escape(en)}</div>
<div class="mean"><div class="a">{html.escape(men)}</div><div class="b">{html.escape(mte)}</div></div>
<div class="bot"><span class="pill">▶ SING ALONG!</span></div></body></html>'''
    open(f'{S}/{name}.html','w').write(doc)
    print(name,t)
