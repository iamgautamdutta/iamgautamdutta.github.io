const menu=document.querySelector('.menu'),nav=document.querySelector('#nav');menu.addEventListener('click',()=>nav.classList.toggle('open'));nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const themeButton=document.querySelector('.theme'),themeColor=document.querySelector('meta[name="theme-color"]');
function syncThemeState(){const light=document.body.classList.contains('light');themeButton.setAttribute('aria-pressed',String(light));themeButton.setAttribute('aria-label',light?'Switch to dark theme':'Switch to light theme');if(themeColor)themeColor.content=light?'#f2f0eb':'#101012'}
syncThemeState();themeButton.addEventListener('click',()=>{document.body.classList.toggle('light');syncThemeState();try{localStorage.setItem('gautam-portfolio-theme',document.body.classList.contains('light')?'light':'dark')}catch{}});
document.querySelector('#contact-form').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget),subject=encodeURIComponent(`Portfolio message from ${f.get('name')}`),body=encodeURIComponent(`${f.get('message')}\n\nReply to: ${f.get('email')}`);location.href=`mailto:duttagautam410@gmail.com?subject=${subject}&body=${body}`});
const revealTargets=document.querySelectorAll('.section-label,.section h2,.about-grid>*,.stats>*,.skillgroups>div,.project,.milestone,.cert-card,.resume h2,.resume>a,.contact-grid>*');
if('IntersectionObserver'in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -35px 0px'});revealTargets.forEach((el,i)=>{el.classList.add('reveal-item');el.style.setProperty('--reveal-delay',`${(i%4)*75}ms`);observer.observe(el)})}
const lightbox=document.createElement('dialog');lightbox.className='cert-lightbox';lightbox.setAttribute('aria-label','Certificate preview');lightbox.innerHTML='<div class="lightbox-card"><button class="lightbox-close" type="button" aria-label="Close certificate">×</button><button class="lightbox-nav lightbox-prev" type="button" aria-label="Previous certificate image">←</button><img class="lightbox-image" alt=""><button class="lightbox-nav lightbox-next" type="button" aria-label="Next certificate image">→</button><div class="lightbox-caption"></div><div class="lightbox-count"></div></div>';document.body.append(lightbox);
const lightboxImage=lightbox.querySelector('.lightbox-image'),lightboxCaption=lightbox.querySelector('.lightbox-caption'),lightboxCount=lightbox.querySelector('.lightbox-count'),lightboxClose=lightbox.querySelector('.lightbox-close'),lightboxPrev=lightbox.querySelector('.lightbox-prev'),lightboxNext=lightbox.querySelector('.lightbox-next');let lastFocused=null,lightboxImages=[],lightboxIndex=0;
function showCertificate(index){lightboxIndex=(index+lightboxImages.length)%lightboxImages.length;lightboxImage.src=lightboxImages[lightboxIndex];lightboxImage.alt=`${lightboxCaption.textContent}, image ${lightboxIndex+1} of ${lightboxImages.length}`;lightboxCount.textContent=lightboxImages.length>1?`${lightboxIndex+1} / ${lightboxImages.length}`:'';lightboxPrev.hidden=lightboxImages.length<2;lightboxNext.hidden=lightboxImages.length<2}
document.querySelectorAll('.cert-card').forEach(card=>card.addEventListener('click',event=>{event.preventDefault();lastFocused=card;lightboxImages=(card.dataset.images||card.href).split('|').filter(Boolean);lightboxCaption.textContent=card.querySelector('h3')?.textContent||'Certificate';showCertificate(0);lightbox.showModal();document.documentElement.classList.add('lightbox-open')}));
function closeLightbox(){if(lightbox.open)lightbox.close()}lightboxClose.addEventListener('click',closeLightbox);lightboxPrev.addEventListener('click',()=>showCertificate(lightboxIndex-1));lightboxNext.addEventListener('click',()=>showCertificate(lightboxIndex+1));document.addEventListener('keydown',event=>{if(!lightbox.open||lightboxImages.length<2)return;if(event.key==='ArrowLeft')showCertificate(lightboxIndex-1);if(event.key==='ArrowRight')showCertificate(lightboxIndex+1)});lightbox.addEventListener('click',event=>{if(event.target===lightbox)closeLightbox()});lightbox.addEventListener('close',()=>{document.documentElement.classList.remove('lightbox-open');lastFocused?.focus()});
document.querySelectorAll('[data-cert-scroll]').forEach(button=>button.addEventListener('click',()=>{const track=document.querySelector(button.dataset.certTrack||'#certificates-track');if(track)track.scrollBy({left:(button.dataset.certScroll==='right'?1:-1)*Math.min(390,track.clientWidth*.82),behavior:'smooth'})}));document.querySelectorAll('.credential-grid').forEach(track=>track.addEventListener('wheel',event=>{if(Math.abs(event.deltaY)>Math.abs(event.deltaX)){event.preventDefault();track.scrollBy({left:event.deltaY,behavior:'auto'})}},{passive:false}));
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reducedMotion){document.addEventListener('click',event=>{const target=event.target.closest('button,.cert-card,.project,.milestone,.resume>a,.socials a,.hero-focus-link,.back-top');if(!target)return;const rect=target.getBoundingClientRect(),ripple=document.createElement('span');ripple.className='click-ripple';ripple.style.left=`${event.clientX-rect.left}px`;ripple.style.top=`${event.clientY-rect.top}px`;target.append(ripple);ripple.addEventListener('animationend',()=>ripple.remove(),{once:true});target.classList.remove('tap-effect');void target.offsetWidth;target.classList.add('tap-effect');setTimeout(()=>target.classList.remove('tap-effect'),280)})}
const progress=document.querySelector('.scroll-progress');let scrollTick=false;window.addEventListener('scroll',()=>{if(scrollTick)return;scrollTick=true;requestAnimationFrame(()=>{const range=document.documentElement.scrollHeight-window.innerHeight;progress.style.transform=`scaleX(${range>0?window.scrollY/range:0})`;scrollTick=false})},{passive:true});


function runTypewriter(element, phrases, {typeSpeed=58,deleteSpeed=30,hold=1450,between=260}={}){
  if(!element)return;
  const chars=phrases.map(text=>Array.from(text));
  if(reducedMotion){element.textContent=phrases[0];return}
  let phraseIndex=0,position=chars[0].length,deleting=false;
  function tick(){
    const current=chars[phraseIndex];
    if(!deleting){
      position=Math.min(position+1,current.length);
      element.textContent=current.slice(0,position).join('');
      if(position===current.length){deleting=true;setTimeout(tick,hold);return}
      setTimeout(tick,typeSpeed);return;
    }
    position=Math.max(0,position-1);
    element.textContent=current.slice(0,position).join('');
    if(position===0){deleting=false;phraseIndex=(phraseIndex+1)%chars.length;setTimeout(tick,between);return}
    setTimeout(tick,deleteSpeed);
  }
  setTimeout(tick,hold);
}
function revealHeroLines(element, lines){
  if(!element)return;
  element.replaceChildren();
  let lineIndex=0;
  const addLine=()=>{
    if(lineIndex>=lines.length)return;
    const text=lines[lineIndex++],row=document.createElement('span');
    row.className='hero-type-line'; element.append(row);
    const chars=Array.from(text);let position=0;
    if(reducedMotion){row.textContent=text;addLine();return}
    row.classList.add('is-typing');
    const type=()=>{position++;row.textContent=chars.slice(0,position).join('');if(position<chars.length){setTimeout(type,48);return}row.classList.remove('is-typing');if(lineIndex===lines.length)row.classList.add('is-caret');else setTimeout(addLine,320)};
    setTimeout(type,180);
  };
  addLine();
}
revealHeroLines(document.querySelector('.hero-typewriter'),["Hi there, I'm Gautam Dutta 👋",'AI & Data Science Engineer','Full-Stack Developer','ML | DSA | Open Source']);runTypewriter(document.querySelector('.skill-typewriter'),[
  'Python · JavaScript · C++ · SQL',
  'React.js · Next.js · Node.js · Flask',
  'AWS · CI/CD · Automation',
  'Git · GitHub · VS Code · Cursor',
  'DSA · Product Development · Optimization'
],{typeSpeed:42,deleteSpeed:22,hold:1600,between:240});

// Keep the current section highlighted in the glass navigation.
const sectionLinks=[...document.querySelectorAll('#nav a[href^="#"]')];
if('IntersectionObserver'in window){
  const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    sectionLinks.forEach(link=>{
      const active=link.getAttribute('href')===`#${entry.target.id}`;
      link.classList.toggle('is-current',active);
      if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
    });
  }),{rootMargin:'-34% 0px -56% 0px',threshold:0});
  document.querySelectorAll('main section[id]').forEach(section=>sectionObserver.observe(section));
}

// Soft pointer tilt and a moving light reflection for project cards.
if(!reducedMotion&&window.matchMedia('(pointer:fine)').matches){
  document.querySelectorAll('.project').forEach(card=>{
    card.addEventListener('pointermove',event=>{
      const rect=card.getBoundingClientRect(),x=(event.clientX-rect.left)/rect.width,y=(event.clientY-rect.top)/rect.height;
      card.style.setProperty('--pointer-x',`${x*100}%`);card.style.setProperty('--pointer-y',`${y*100}%`);
      card.style.setProperty('--tilt-x',`${(0.5-y)*3}deg`);card.style.setProperty('--tilt-y',`${(x-0.5)*4}deg`);card.classList.add('is-tilting');
    });
    card.addEventListener('pointerleave',()=>{card.classList.remove('is-tilting');card.style.removeProperty('--tilt-x');card.style.removeProperty('--tilt-y')});
  });
}

// ResumeAI has no live URL yet, so its card opens an animated project details popup.
const resumeCard=document.querySelector('.project:not(.project-link-card)');
if(resumeCard){
  const projectDialog=document.createElement('dialog');projectDialog.className='project-dialog';projectDialog.setAttribute('aria-labelledby','project-dialog-title');
  projectDialog.innerHTML='<div class="project-dialog-panel"><button class="project-dialog-close" type="button" aria-label="Close project details">×</button><div class="project-dialog-layout"><div class="project-dialog-visual"></div><div class="project-dialog-copy"><small>LIVE PROJECT · RESUME ANALYSIS & CAREER ASSISTANT</small><h2 id="project-dialog-title">ResumeAI (Career Pro)</h2><p></p><div class="project-dialog-tags"></div><span class="project-dialog-note">OPEN LIVE DEMO ↗</span></div></div></div>';
  const preview=resumeCard.querySelector('.project-art').cloneNode(true),description=resumeCard.querySelector('.project-meta p')?.textContent||'',tags=(resumeCard.querySelector('.project-tags')?.textContent||'').split('·').map(value=>value.trim()).filter(value=>value&&!value.toLowerCase().includes('no live demo'));
  projectDialog.querySelector('.project-dialog-visual').append(preview);projectDialog.querySelector('.project-dialog-copy p').textContent=description;
  const tagContainer=projectDialog.querySelector('.project-dialog-tags');tags.forEach(value=>{const tag=document.createElement('span');tag.textContent=value;tagContainer.append(tag)});
  document.body.append(projectDialog);resumeCard.tabIndex=0;resumeCard.setAttribute('aria-haspopup','dialog');resumeCard.setAttribute('aria-label','View ResumeAI project details');
  const closeProjectDialog=()=>{if(projectDialog.open)projectDialog.close()};
  resumeCard.addEventListener('click',()=>projectDialog.showModal());resumeCard.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();projectDialog.showModal()}});
  projectDialog.querySelector('.project-dialog-close').addEventListener('click',closeProjectDialog);
  projectDialog.addEventListener('click',event=>{if(event.target===projectDialog)closeProjectDialog()});
}

// Count the portfolio stats up once as they enter view.
if(!reducedMotion&&'IntersectionObserver'in window){
  const statObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const value=entry.target.querySelector('strong'),numberNode=[...value.childNodes].find(node=>node.nodeType===Node.TEXT_NODE),target=Number.parseInt(numberNode?.textContent||'0',10);
    if(!numberNode||!Number.isFinite(target)){statObserver.unobserve(entry.target);return}
    const start=performance.now(),duration=1050;
    const tick=now=>{const t=Math.min(1,(now-start)/duration),eased=1-Math.pow(1-t,4);numberNode.textContent=String(Math.round(target*eased));if(t<1)requestAnimationFrame(tick)};
    requestAnimationFrame(tick);statObserver.unobserve(entry.target);
  }),{threshold:.45});
  document.querySelectorAll('.stats>div').forEach(item=>statObserver.observe(item));
}

// A low-key pointer-following accent adds depth on mouse/trackpad devices only.
if(!reducedMotion&&window.matchMedia('(pointer:fine)').matches){
  const aura=document.createElement('div');aura.className='cursor-aura';aura.setAttribute('aria-hidden','true');document.body.append(aura);
  let pointerFrame=0,lastX=0,lastY=0;
  window.addEventListener('pointermove',event=>{lastX=event.clientX;lastY=event.clientY;if(pointerFrame)return;pointerFrame=requestAnimationFrame(()=>{aura.style.transform=`translate3d(${lastX}px,${lastY}px,0) translate(-50%,-50%)`;document.body.classList.add('has-pointer-aura');pointerFrame=0})},{passive:true});
  document.documentElement.addEventListener('pointerleave',()=>document.body.classList.remove('has-pointer-aura'));
}

// Give the skills terminal and certificate tiles a restrained 3D response to the pointer.
if(!reducedMotion&&window.matchMedia('(pointer:fine)').matches){
  document.querySelectorAll('.cert-card,.terminal').forEach(tile=>{
    tile.addEventListener('pointermove',event=>{
      const rect=tile.getBoundingClientRect(),x=(event.clientX-rect.left)/rect.width,y=(event.clientY-rect.top)/rect.height;
      tile.style.setProperty('--tilt-x',`${(0.5-y)*3.5}deg`);tile.style.setProperty('--tilt-y',`${(x-0.5)*4.5}deg`);tile.classList.add('interactive-tilt');
    });
    tile.addEventListener('pointerleave',()=>{tile.classList.remove('interactive-tilt');tile.style.removeProperty('--tilt-x');tile.style.removeProperty('--tilt-y')});
  });
}

// Convenient animated jump to the top; ring indicates the reader's position.
const backTop=document.createElement('button');backTop.className='back-top';backTop.type='button';backTop.setAttribute('aria-label','Back to top');backTop.innerHTML='<svg viewBox="0 0 48 48" aria-hidden="true"><circle class="back-track" cx="24" cy="24" r="20"></circle><circle class="back-progress" cx="24" cy="24" r="20"></circle></svg><span class="back-arrow" aria-hidden="true">↑</span>';document.body.append(backTop);
const backRing=backTop.querySelector('.back-progress'),ringLength=2*Math.PI*20;backRing.style.strokeDasharray=ringLength;backRing.style.strokeDashoffset=ringLength;
let backTopFrame=0;window.addEventListener('scroll',()=>{if(backTopFrame)return;backTopFrame=requestAnimationFrame(()=>{const maxScroll=document.documentElement.scrollHeight-window.innerHeight,progress=maxScroll>0?Math.min(1,window.scrollY/maxScroll):0;backRing.style.strokeDashoffset=String(ringLength*(1-progress));backTop.classList.toggle('is-visible',window.scrollY>420);backTopFrame=0})},{passive:true});
backTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:reducedMotion?'auto':'smooth'}));

// Let the portrait and orbit softly lean toward a mouse pointer on desktop.
const heroParallax=document.querySelector('.hero');
if(heroParallax&&!reducedMotion&&window.matchMedia('(pointer:fine)').matches){
  let heroFrame=0,heroX=0,heroY=0;
  heroParallax.addEventListener('pointermove',event=>{
    const rect=heroParallax.getBoundingClientRect();heroX=((event.clientX-rect.left)/rect.width-.5)*2;heroY=((event.clientY-rect.top)/rect.height-.5)*2;
    if(heroFrame)return;heroFrame=requestAnimationFrame(()=>{heroParallax.style.setProperty('--hero-photo-x',`${heroX*6}px`);heroParallax.style.setProperty('--hero-photo-y',`${heroY*4}px`);heroParallax.style.setProperty('--hero-orbit-x',`${heroX*4}px`);heroParallax.style.setProperty('--hero-orbit-y',`${heroY*3}px`);heroFrame=0});
  },{passive:true});
  heroParallax.addEventListener('pointerleave',()=>{heroParallax.style.removeProperty('--hero-photo-x');heroParallax.style.removeProperty('--hero-photo-y');heroParallax.style.removeProperty('--hero-orbit-x');heroParallax.style.removeProperty('--hero-orbit-y')});
}
