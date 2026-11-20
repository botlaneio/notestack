import json
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor,white
from reportlab.lib.utils import simpleSplit
from pathlib import Path
products=json.load(open('src/data/catalog.json'));samples=json.load(open('src/data/samples.json'))
# Built-in PDF fonts are used with plain-text equivalents for mathematical glyphs.
def plain(t):
 for a,b in [('²','^2'),('₂','2'),('−','-'),('≠','!='),('→','->'),('’',"'"),('·',' / '),('–','-')]:t=t.replace(a,b)
 return t
for p in products:
 s=samples[p['id']];path=Path('public'+p['sampleFile']);c=canvas.Canvas(str(path),pagesize=(595,842));c.setTitle('NoteStack '+p['title']+' - Sample Notes');c.setAuthor('NoteStack / Vedanta Ventures')
 def page(n):
  c.setFillColor(HexColor('#182c42'));c.rect(0,790,595,52,fill=1,stroke=0);c.setFillColor(white);c.setFont('Helvetica-Bold',19);c.drawString(42,810,'notestack.');c.setFont('Helvetica',9);c.drawRightString(553,813,p['title']+' / SAMPLE');c.setFillColor(HexColor('#8997a4'));c.setFont('Helvetica',8);c.drawString(42,34,'Sample notes. Teacher and final syllabus review pending.');c.drawRightString(553,34,f'{n} / 2');c.setFillColor(HexColor('#182c42'))
 def text(t,y,size=11,bold=False,color='#607383'):
  c.setFillColor(HexColor(color));c.setFont('Helvetica-Bold' if bold else 'Helvetica',size)
  lines=simpleSplit(plain(t),'Helvetica-Bold' if bold else 'Helvetica',size,507)
  for line in lines:c.drawString(44,y,line);y-=size*1.65
  return y-10
 page(1);y=text('KARNATAKA SSLC / CLASS 10 / ENGLISH MEDIUM',757,8,color='#8a9aa8');y=text(s['topic'],y-5,25,True,'#182c42');y=text(s['intro'],y-7)
 y=text('01 / UNDERSTAND',y-10,10,True,'#3156a1')
 for con in s['concepts']:y=text(con['label'],y-5,12,True,'#182c42');y=text(con['text'],y,11)
 y=text('Remember',y-8,11,True,'#182c42');text(s['mistake'],y,10)
 c.showPage();page(2);y=text('02 / WORK THROUGH IT',754,10,True,'#3156a1');y=text(s['worked']['question'],y-10,16,True,'#182c42')
 for i,step in enumerate(s['worked']['steps']):y=text(str(i+1)+'. '+step,y-5)
 y=text('Check: '+s['worked']['check'],y-5,10)
 y=text('03 / TRY IT YOURSELF',y-25,10,True,'#3156a1');y=text(s['practice']['question'],y-8,13,True,'#182c42')
 for i,opt in enumerate(s['practice']['options']):y=text(chr(65+i)+'. '+opt,y,11)
 y=text('Answer: '+chr(65+s['practice']['correct']),y-20,11,True,'#285a4a');y=text(s['practice']['explanation'],y,10)
 text('This free sample illustrates the proposed format. It is not the full paid subject pack.',90,9)
 c.save()
 print(path)
