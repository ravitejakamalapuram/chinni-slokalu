import numpy as np,librosa,soundfile as sf,sys
sr=44100
v,_=librosa.load(sys.argv[1],sr=sr,mono=True)
f0,vf,_=librosa.pyin(v,fmin=120,fmax=500,sr=sr); med=np.nanmedian(f0[vf])
# tonic: nearest semitone, placed so median voice ~ between Sa and Pa
sa=librosa.midi_to_hz(round(librosa.hz_to_midi(med)))/ 2  # one octave below voice
print("voice median",med,"Sa",sa)
pad=2.0; dur=len(v)/sr+pad+3.0; N=int(dur*sr); out=np.zeros(N)
def ks(freq,n,bright=0.996):
    p=int(sr/freq); buf=np.random.uniform(-1,1,p); y=np.zeros(n)
    for i in range(n):
        y[i]=buf[i%p]; buf[i%p]=bright*0.5*(buf[i%p]+buf[(i+1)%p])
    return y
# tanpura cycle: Pa, Sa', Sa', Sa  (each pluck 0.9s apart, 4.0s cycle)
notes=[sa*1.5,sa*2,sa*2,sa]; n=int(5*sr)
pl=[ks(f,n) for f in notes]
t=0.0
while t<dur-0.5:
    for k,f in enumerate(notes):
        s=int((t+k*0.95)*sr)
        if s>=N: break
        e=min(N,s+n); out[s:e]+=pl[k][:e-s]*0.35
    t+=3.9
# soft flute-ish pad on Sa and Pa (sine + slow vibrato), very low
tt=np.arange(N)/sr
padw=(np.sin(2*np.pi*sa*2*tt+0.3*np.sin(2*np.pi*5*tt))*0.5+np.sin(2*np.pi*sa*3*tt)*0.25)*0.04
out+=padw*np.clip(tt/3,0,1)
# temple bell at start and end
def bell(at):
    s=int(at*sr); n=int(4*sr); x=np.arange(n)/sr; b=sum(a*np.sin(2*np.pi*sa*4*r*x) for a,r in [(1,1),(.5,2.76),(.3,5.4),(.2,8.9)])*np.exp(-x*1.5)*0.25
    e=min(N,s+n); out[s:e]+=b[:e-s]
bell(0.0); bell(dur-3.5)
fade=np.clip(np.minimum(tt/1.5,(dur-tt)/2.5),0,1); out*=fade
out=out/np.max(np.abs(out))*0.25
mix=out.copy(); s=int(pad*sr); mix[s:s+len(v)]+=v*0.9
mix=mix/np.max(np.abs(mix))*0.95
sf.write(sys.argv[2],mix,sr); sf.write("bgm_only.wav",out,sr)
