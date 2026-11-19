const examples = [
  ['Spanish essentials','Languages',[['Hola','Hello'],['Gracias','Thank you'],['Por favor','Please'],['Buenos días','Good morning'],['Hasta luego','See you later'],['Lo siento','I’m sorry']]],
  ['The night sky','Astronomy',[['Nebula','A cloud of gas and dust in space'],['Light-year','The distance light travels in one year'],['Exoplanet','A planet orbiting a star other than the Sun'],['Zenith','The point in the sky directly overhead']]],
  ['Design vocabulary','Design',[['Kerning','Adjusting spacing between specific pairs of letters'],['Hierarchy','Organizing elements by their relative importance'],['Baseline','The line on which most letters sit'],['Leading','Vertical spacing between lines of type']]]
];
const tones = ['var(--violet)','var(--blue)','var(--peach)'];
const storageKey = 'fieldnotes-study-v1';

export function mountStudyDesk(root){
  let data = {
    decks: examples.map(([title,subject,pairs],i) => ({
      id:'starter'+i,title,subject,tone:i,cards:pairs.map(([front,back],j)=>({id:i+'-'+j,front,back}))
    })),
    known:{}, history:[], last:null
  };
  try { const stored = localStorage.getItem(storageKey); if(stored) { const parsed = JSON.parse(stored); if(parsed && Array.isArray(parsed.decks) && Array.isArray(parsed.history) && parsed.known) data = parsed; } } catch {}
  let screen = 'home', selected, session, editing, query = '';
  const app = root.querySelector('#study-desk-content');
  const lifecycle = new AbortController();
  const listenerOptions = {signal:lifecycle.signal};
  const editor = root.querySelector('#editor');
  const form = root.querySelector('#deck-form');
  const rows = root.querySelector('#rows');
  const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const id = () => globalThis.crypto?.randomUUID?.() ?? Date.now().toString(36)+Math.random().toString(36).slice(2);
  const deck = () => data.decks.find(d=>d.id===selected);
  const mastered = d => d.cards.filter(c=>data.known[c.id]).length;
  const btn = (action,text,classes='',attrs='') => `<button class="${classes}" data-action="${action}" ${attrs}>${text}</button>`;
  const meter = (n,total) => `<span class="meter" role="progressbar" aria-label="Progress" aria-valuenow="${n}" aria-valuemax="${total}"><i style="width:${n/total*100}%"></i></span>`;
  const panel = content => '<section class="panel">'+content+'</section>';
  const pairs = cards => '<div class="box">'+cards.map(c=>`<div class="pair"><strong>${esc(c.front)}</strong><span>${esc(c.back)}</span></div>`).join('')+'</div>';
  function save(){
    try { localStorage.setItem(storageKey,JSON.stringify(data)); }
    catch { root.querySelector('#storage').textContent='Browser storage unavailable. Changes last until this page closes.'; }
  }
  function go(next){
    screen=next;
    render();
    app.focus();
    window.scrollTo(0,0);
  }
  function stats(){
    return '<div class="stats">'+[[data.decks.length,'Decks'],[data.decks.reduce((n,d)=>n+mastered(d),0),'Cards mastered'],[data.history.length,'Sessions finished']].map(([n,label])=>`<div class="stat"><strong>${n}</strong><small>${label}</small></div>`).join('')+'</div>';
  }
  function list(){
    const matches=data.decks.filter(d=>(d.title+' '+d.subject).toLowerCase().includes(query.trim().toLowerCase()));
    root.querySelector('#library').innerHTML=matches.length?matches.map(d=>btn('open',`<span class="stripe" style="--tone:${tones[d.tone]}"><small>${esc(d.subject)}</small></span><span class="deck-body"><strong>${esc(d.title)}</strong><span class="muted">${d.cards.length} cards · ${mastered(d)} mastered</span>${meter(mastered(d),d.cards.length)}</span>`,'deck',`data-id="${esc(d.id)}"`)).join(''):`<p class="box empty">${data.decks.length?'No decks match your search.':'Create a deck to begin studying.'}</p>`;
  }
  function render(){
    const d=deck();
    if(screen==='home'){
      const recent=data.decks.find(item=>item.id===data.last);
      app.innerHTML=`<section class="hero"><div class="intro"><h1>Study desk</h1><p class="muted">Review a deck or test what you remember.</p><div>${data.decks.length?btn('review',recent?'Review '+esc(recent.title)+' →':'Start studying →','primary'):btn('new','Create a deck','primary')}</div></div><div class="art" aria-hidden="true"><div class="stack"><i></i><i></i><div class="sample"><small>Flashcard</small><strong>Active recall</strong><span>↻</span></div></div></div></section>${stats()}<section class="library"><div class="spread"><h2>Your decks</h2><input type="search" id="search" aria-label="Search decks" placeholder="Search decks" value="${esc(query)}"></div><div id="library" class="grid"></div></section>`;
      list();
    }
    if(screen==='deck'){
      const canQuiz=new Set(d.cards.map(c=>c.back)).size>=2;
      app.innerHTML=panel(`${btn('home','← Study desk','plain back')}<small>${esc(d.subject)}</small><h1>${esc(d.title)}</h1><p class="muted">${d.cards.length} cards · ${mastered(d)} mastered</p>${meter(mastered(d),d.cards.length)}<div class="actions">${btn('flash','Study flashcards','primary')}${btn('quiz','Take a quiz','',canQuiz?'':'disabled')}${btn('edit','Edit deck')}</div>${canQuiz?'':'<p class="muted">Add two cards with different answers to take a quiz.</p>'}<h2>Cards</h2>${pairs(d.cards)}<div>${btn('delete','Delete deck')}</div>`);
    }
    if(screen==='flash'||screen==='quiz') renderStudy(d);
    if(screen==='summary'){
      const s=session;
      app.innerHTML=panel(`${btn('back','← Back to deck','plain back')}<h1>${s.mode==='quiz'?'Quiz results':'Review complete'}</h1><div class="box"><h2>${s.score} / ${s.cards.length}</h2><p>${s.mode==='quiz'?'Correct answers':'Cards mastered this round'}</p></div>${s.misses.length?'<h2>Needs practice</h2>'+pairs(s.misses):''}<div class="actions">${btn(s.mode,'Study again','primary')}${btn('back','Back to deck')}</div>`);
    }
    if(screen==='progress'){
      const history=data.history.map(s=>`<li><strong>${esc(s.title)}</strong> · ${s.mode==='quiz'?'Quiz':'Flashcards'} · ${s.score}/${s.total} · ${new Date(s.date).toLocaleDateString()}</li>`).join('');
      app.innerHTML=panel(`<h1>Progress</h1>${stats()}<h2>Study history</h2><div class="box">${history?'<ul>'+history+'</ul>':'Complete a flashcard session or quiz to see it here.'}</div>`);
    }
  }
  function shuffle(items){
    const result=[...items];
    for(let i=result.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [result[i],result[j]]=[result[j],result[i]];
    }
    return result;
  }
  function start(mode){
    const d=deck();
    const answers=[...new Set(d.cards.map(c=>c.back))];
    if(mode==='quiz'&&answers.length<2)return;
    const cards=mode==='quiz'?shuffle(d.cards):d.cards;
    session={mode,cards,index:0,score:0,misses:[],flipped:false,response:null,
      options:mode==='quiz'?cards.map(c=>shuffle([c.back,...shuffle(answers.filter(a=>a!==c.back)).slice(0,3)])):[]};
    data.last=d.id;
    save();
    go(mode);
  }
  function renderStudy(d){
    const s=session, c=s.cards[s.index], flash=s.mode==='flash';
    let content;
    if(flash){
      content=btn('flip',`<small>${s.flipped?'Answer':'Prompt'}</small><strong>${esc(s.flipped?c.back:c.front)}</strong><small class="muted">↻ Flip card</small>`,'flash',`data-flipped="${s.flipped}"`)+
        '<div class="spread">'+btn('again','Needs practice','',s.flipped?'':'disabled')+btn('known','Got it','primary',s.flipped?'':'disabled')+'</div>';
    }else{
      const opts=s.options[s.index];
      const options=opts.map((a,i)=>btn('answer',esc(a),s.response===null?'':a===c.back?'right':s.response===i?'wrong':'',`data-index="${i}" ${s.response===null?'':'disabled'}`)).join('');
      const feedback=s.response===null?'':`<p id="feedback" role="status">${opts[s.response]===c.back?'Correct!':'Correct answer: '+esc(c.back)}</p>`;
      content=`<div class="box"><h2>${esc(c.front)}</h2><div class="options">${options}</div>${feedback}</div>${btn('next',s.index+1===s.cards.length?'See results →':'Next question →','primary',s.response===null?'disabled':'aria-describedby="feedback"')}`;
    }
    app.innerHTML=panel(`${btn('back','← Back to deck','plain back')}<div class="spread"><small>${esc(d.title)} · ${flash?'Flashcards':'Quiz'}</small><small>${s.index+1} / ${s.cards.length}</small></div>${meter(s.index,s.cards.length)}${content}`);
  }
  function advance(correct){
    const s=session,c=s.cards[s.index];
    if(s.mode==='flash'){
      if(correct)data.known[c.id]=true;else delete data.known[c.id];
      save();
    }
    if(correct)s.score++;else s.misses.push(c);
    s.index++;
    s.flipped=false;
    s.response=null;
    if(s.index<s.cards.length){render();app.focus();return;}
    data.history.unshift({title:deck().title,mode:s.mode,score:s.score,total:s.cards.length,date:new Date().toISOString()});
    save();
    go('summary');
  }
  function syncRemove(){
    for(const button of rows.querySelectorAll('[data-action=remove]'))button.disabled=rows.children.length===1;
  }
  function addRow(card={id:'',front:'',back:''}){
    const row=document.createElement('div');
    row.className='row';
    row.dataset.id=card.id;
    row.innerHTML='<label>Prompt<textarea required maxlength="500"></textarea></label><label>Answer<textarea required maxlength="1000"></textarea></label><button type="button" data-action="remove" aria-label="Remove card">×</button>';
    const [front,back]=row.querySelectorAll('textarea');
    front.value=card.front;
    back.value=card.back;
    rows.append(row);
    syncRemove();
    return front;
  }
  function edit(existing){
    editing=existing;
    root.querySelector('#editor-title').textContent=existing?'Edit deck':'New deck';
    form.elements.title.value=existing?.title??'';
    form.elements.subject.value=existing?.subject??'';
    root.querySelector('#error').textContent='';
    rows.replaceChildren();
    (existing?.cards??[undefined]).forEach(addRow);
    editor.showModal();
    form.elements.title.focus();
  }
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const title=form.elements.title.value.trim(),subject=form.elements.subject.value.trim()||'General';
    const cards=Array.from(rows.children,row=>{
      const [front,back]=row.querySelectorAll('textarea');
      return {id:row.dataset.id||id(),front:front.value.trim(),back:back.value.trim()};
    });
    if(!title||cards.some(c=>!c.front||!c.back)){
      root.querySelector('#error').textContent='Enter a title and fill in both sides of every card.';
      return;
    }
    const updated={id:editing?.id??id(),title,subject,tone:editing?.tone??data.decks.length%tones.length,cards};
    if(editing){
      for(const old of editing.cards){
        if(!cards.some(c=>c.id===old.id&&c.front===old.front&&c.back===old.back))delete data.known[old.id];
      }
      data.decks=data.decks.map(d=>d.id===editing.id?updated:d);
    }else data.decks.push(updated);
    selected=updated.id;
    query='';
    save();
    editor.close();
    go('deck');
  },listenerOptions);
  app.addEventListener('input',event=>{
    if(event.target.id==='search'){query=event.target.value;list();}
  },listenerOptions);
  root.addEventListener('click',event=>{
    const b=event.target.closest('button[data-action]');
    if(!b)return;
    switch(b.dataset.action){
      case 'home':go('home');break;
      case 'progress':go('progress');break;
      case 'open':selected=b.dataset.id;go('deck');break;
      case 'back':go('deck');break;
      case 'review':selected=(data.decks.find(d=>d.id===data.last)??data.decks[0]).id;start('flash');break;
      case 'new':edit(null);break;
      case 'edit':edit(deck());break;
      case 'close':editor.close();break;
      case 'add':addRow().focus();break;
      case 'remove':b.closest('.row').remove();syncRemove();rows.lastElementChild.querySelector('textarea').focus();break;
      case 'delete':
        if(confirm('Delete “'+deck().title+'” and its card mastery?')){
          for(const c of deck().cards)delete data.known[c.id];
          data.decks=data.decks.filter(d=>d.id!==selected);
          if(data.last===selected)data.last=null;
          save();go('home');
        }
        break;
      case 'flash':case 'quiz':start(b.dataset.action);break;
      case 'flip':session.flipped=!session.flipped;render();app.querySelector('.flash').focus();break;
      case 'known':case 'again':advance(b.dataset.action==='known');break;
      case 'answer':session.response=Number(b.dataset.index);render();app.querySelector('[data-action=next]').focus();break;
      case 'next':
        if(session.response!==null)advance(session.options[session.index][session.response]===session.cards[session.index].back);
        break;
    }
  },listenerOptions);
  render();
  return () => lifecycle.abort();
}
