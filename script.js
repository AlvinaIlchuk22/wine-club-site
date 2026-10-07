(function(){var d=document,h=d.getElementById('hdr');
function onS(){h&&h.classList.toggle('solid',scrollY>40)}addEventListener('scroll',onS,{passive:true});onS();
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
d.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
if(window.gsap&&!rm){gsap.registerPlugin(ScrollTrigger);
if(d.querySelector('.hero'))gsap.from('.hero h1,.hero .eyebrow,.hero .lede,.hero .cta',{y:40,opacity:0,duration:1.1,stagger:.15,ease:'power3.out',delay:.2});
d.querySelectorAll('.hero').forEach(function(hero){var r=hero.querySelector('.rows'),s=hero.querySelector('.sun');
if(r)gsap.to(r,{yPercent:18,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:true}});
if(s)gsap.to(s,{yPercent:-30,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:true}})});}
d.querySelectorAll('[data-tier]').forEach(function(a){a.addEventListener('click',function(){var r=d.querySelector('input[name=tier][value="'+a.dataset.tier+'"]');if(r)r.checked=true})});
var f=d.getElementById('joinForm');if(f){f.addEventListener('submit',function(e){e.preventDefault();var err=d.getElementById('joinErr'),m=[];
if(!f.name.value.trim())m.push('Please enter your name.');
if(!/^\S+@\S+\.\S+$/.test(f.email.value))m.push('Please enter a valid email.');
if(!f.age.checked)m.push('Please confirm you are 18 or older.');
err.textContent=m.join(' ');if(m.length)return;f.hidden=true;var ok=d.getElementById('joinOk');ok.hidden=false;ok.focus&&ok.focus();})}})();

(function(){var st=document.getElementById('stage');if(!st)return;
var sl=[].slice.call(st.querySelectorAll('.slide')),cur=0,busy=false,timer,cn=document.getElementById('cur'),
rm=matchMedia('(prefers-reduced-motion:reduce)').matches,g=window.gsap;
function parts(s){return{sc:s.querySelector('.scene'),nm:s.querySelector('.wname'),bt:s.querySelector('.bwrap'),inf:s.querySelector('.info')}}
function show(s,on){s.classList.toggle('active',on);s.setAttribute('aria-hidden',on?'false':'true')}
function go(n,dir){if(busy||n===cur)return;busy=true;var a=sl[cur],b=sl[n],pa=parts(a),pb=parts(b);dir=dir||1;
if(!g||rm){show(a,false);show(b,true);cur=n;cn.textContent='0'+(n+1);busy=false;return}
b.style.zIndex=3;a.style.zIndex=2;show(b,true);
var arch=st.querySelector('.arch'),badge=st.querySelector('.badge');
var d1=st.querySelector('.d1'),d2=st.querySelector('.d2');
g.set(pb.sc,{scale:1.4,rotation:-dir*22,opacity:1,filter:'blur(8px) brightness(.5)',clipPath:'circle(0% at 50% 62%)'});
g.set(d1,{xPercent:-50,yPercent:-50,x:0,y:0,scale:.2,rotation:0,opacity:0});g.set(d2,{xPercent:-50,yPercent:-50,x:-dir*420,y:300,scale:.25,rotation:-dir*40,opacity:0});
g.set(pb.nm,{opacity:0,y:34,filter:'blur(10px)'});
g.set(pb.bt,{transformOrigin:'50% 62%',rotation:-dir*80,x:-dir*420,y:340,opacity:0});
g.set(pb.inf,{opacity:0,y:20});g.set(pa.bt,{transformOrigin:'50% 62%'});
var tl=g.timeline({onComplete:function(){show(a,false);a.style.zIndex='';b.style.zIndex='';g.set([pa.sc,pa.nm,pa.bt,pa.inf],{clearProps:'all'});g.set([pb.bt],{clearProps:'transformOrigin'});g.set(pb.sc,{clearProps:'clipPath'});g.set([d1,d2],{opacity:0});cur=n;cn.textContent='0'+(n+1);busy=false}});
tl.to(pa.bt,{rotation:dir*85,x:dir*430,y:380,opacity:0,duration:1,ease:'power2.in'},0)
.to(pa.nm,{opacity:0,y:-24,filter:'blur(10px)',duration:.6,ease:'power2.in'},0)
.to(pa.inf,{opacity:0,duration:.35},0)
.to([arch,badge],{opacity:.15,duration:.5},0)
.to(pa.sc,{rotation:dir*22,scale:1.45,filter:'blur(5px) brightness(.62)',duration:1.5,ease:'power2.inOut'},.2)
.to(pa.sc,{opacity:0,duration:.5},1.35)
.to(pb.sc,{clipPath:'circle(150% at 50% 62%)',duration:1.5,ease:'power2.inOut'},.35)
.to(pb.sc,{rotation:0,scale:1,filter:'blur(0px) brightness(1)',duration:1.6,ease:'power3.out'},.35)
.to(d1,{opacity:.9,duration:.35,ease:'power1.out'},.2).to(d1,{scale:1.5,rotation:dir*70,duration:1.5,ease:'power2.inOut'},.2).to(d1,{opacity:0,duration:.6},1.1)
.to(d2,{opacity:.85,duration:.35},.4).to(d2,{x:0,y:0,scale:1.05,rotation:0,duration:1.5,ease:'power2.inOut'},.4).to(d2,{opacity:0,duration:.6},1.3)
.to(pb.bt,{rotation:0,x:0,y:0,opacity:1,duration:1.2,ease:'back.out(1.15)'},1)
.to(pb.nm,{opacity:1,y:0,filter:'blur(0px)',duration:1.1,ease:'power2.out'},1.1)
.to([arch,badge],{opacity:1,duration:.7},1.3)
.to(pb.inf,{opacity:1,y:0,duration:.7},1.5)}
function next(){go((cur+1)%sl.length,1)}function prev(){go((cur-1+sl.length)%sl.length,-1)}
st.querySelector('.next').addEventListener('click',function(){next();reset()});
st.querySelector('.prev').addEventListener('click',function(){prev();reset()});
addEventListener('keydown',function(e){if(e.key==='ArrowRight'){next();reset()}if(e.key==='ArrowLeft'){prev();reset()}});
function reset(){clearInterval(timer);if(!rm)timer=setInterval(next,7000)}
st.addEventListener('mouseenter',function(){clearInterval(timer)});st.addEventListener('mouseleave',reset);reset();
var t0=null;st.addEventListener('touchstart',function(e){t0=e.touches[0].clientX},{passive:true});
st.addEventListener('touchend',function(e){if(t0===null)return;var dx=e.changedTouches[0].clientX-t0;if(Math.abs(dx)>50){dx<0?next():prev();reset()}t0=null});
})();

(function(){var els=[].slice.call(document.querySelectorAll('[data-count]'));if(!els.length)return;
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;if(rm||!('IntersectionObserver' in window))return;
function run(el){var to=parseFloat(el.dataset.count),from=parseFloat(el.dataset.from||0),dec=parseInt(el.dataset.dec||0,10),dur=1800,t0=null;
function f(t){if(t0===null)t0=t;var p=Math.min((t-t0)/dur,1),e=1-Math.pow(1-p,3),v=from+(to-from)*e;el.textContent=v.toFixed(dec);if(p<1)requestAnimationFrame(f);else el.textContent=to.toFixed(dec)}
el.textContent=from.toFixed(dec);requestAnimationFrame(f)}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var i=els.indexOf(e.target);setTimeout(function(){run(e.target)},i*120);io.unobserve(e.target)}})},{threshold:.6});
els.forEach(function(el){el.textContent=(el.dataset.from||0);io.observe(el)})})();

(function(){document.querySelectorAll('.pcard').forEach(function(c){var o=c.querySelector('output'),q=1;
function set(v){q=Math.max(1,Math.min(12,v));o.textContent=(q<10?'0':'')+q}
c.querySelector('.q-minus').addEventListener('click',function(){set(q-1)});c.querySelector('.q-plus').addEventListener('click',function(){set(q+1)});
var h=c.querySelector('.heart');h.addEventListener('click',function(){h.setAttribute('aria-pressed',h.getAttribute('aria-pressed')==='true'?'false':'true')});
var a=c.querySelector('.add'),t;a.addEventListener('click',function(){a.textContent='Added \u2713 ('+q+')';a.classList.add('done');clearTimeout(t);t=setTimeout(function(){a.textContent='Add to cart';a.classList.remove('done')},1800)})})})();

(function(){var g=window.gsap;if(!g||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
var cm=document.querySelector('.c-main img'),cd=document.querySelector('.c-detail img'),col=document.querySelector('.collage');if(!col)return;
g.to(cm,{yPercent:-9,ease:'none',scrollTrigger:{trigger:col,start:'top bottom',end:'bottom top',scrub:true}});
g.to(cd,{yPercent:-11,ease:'none',scrollTrigger:{trigger:col,start:'top bottom',end:'bottom top',scrub:true}});
g.to('.c-detail',{y:-34,ease:'none',scrollTrigger:{trigger:col,start:'top bottom',end:'bottom top',scrub:true}})})();

(function(){var g=window.gsap,b=document.querySelector('.band-bg');if(!g||!b||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
g.to(b,{yPercent:8,ease:'none',scrollTrigger:{trigger:'.band',start:'top bottom',end:'bottom top',scrub:true}})})();

(function(){var g=window.gsap,t=document.querySelector('.trio');if(!g||!t||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
g.from('.chero-copy > *',{y:36,opacity:0,duration:1,stagger:.12,ease:'power3.out',delay:.15});
g.from('.trio-arch',{scaleY:.7,opacity:0,transformOrigin:'50% 100%',duration:1.1,ease:'power3.out',delay:.2});
g.from('.tb1',{y:300,rotation:-10,opacity:0,duration:1.2,ease:'back.out(1.1)',delay:.45});
g.from('.tb3',{y:300,rotation:10,opacity:0,duration:1.2,ease:'back.out(1.1)',delay:.6});
g.from('.tb2',{yPercent:30,opacity:0,duration:1.3,ease:'back.out(1.1)',delay:.3});
g.from('.trio-plinth',{scaleX:.4,opacity:0,duration:1,ease:'power3.out',delay:.2});
var bg=document.querySelector('.chero-bg');g.to(bg,{yPercent:10,ease:'none',scrollTrigger:{trigger:'.chero',start:'top top',end:'bottom top',scrub:true}});
g.to('.tb1',{y:-14,duration:3.4,ease:'sine.inOut',yoyo:true,repeat:-1,delay:1.8});g.to('.tb3',{y:-18,duration:4.1,ease:'sine.inOut',yoyo:true,repeat:-1,delay:2.1})})();

(function(){var f=document.getElementById('unsubForm');if(!f)return;f.addEventListener('submit',function(e){e.preventDefault();var v=document.getElementById('ue').value,err=document.getElementById('unsubErr');
if(!/^\S+@\S+\.\S+$/.test(v)){err.textContent='Please enter a valid email.';return}err.textContent='';f.hidden=true;document.getElementById('unsubOk').hidden=false})})();
