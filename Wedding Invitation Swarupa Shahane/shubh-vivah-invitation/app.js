(()=>{const C=CONFIG,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
let L=localStorage.getItem?.("l")||"en";try{L=localStorage.l||"en"}catch(e){}
const bride=location.hash==="#bride";document.body.classList.toggle("bride",bride);
const tz={timeZone:"Asia/Kolkata"};
function t(k){return I18N[L][k]}
function names(){const a=t("brideA"),b=t("brideB"),f=bride?[b,a]:[a,b];
 const w=x=>L==="en"?[...x].map((c,i)=>`<span class="l" style="transition-delay:${i*.07}s">${c}</span>`).join(""):`<span class="w">${x}</span>`;
 $("#names").innerHTML=`<span>${w(f[0])}</span><span class="amp">&amp;</span><span>${w(f[1])}</span>`}
function gcal(e,T){const f=d=>new Date(d).toISOString().replace(/[-:]|\.\d+/g,"");return`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(T)}&dates=${f(e.start)}/${f(e.end)}&location=${encodeURIComponent(C.venue)}&ctz=Asia/Kolkata`}
function ics(e,T){const f=d=>new Date(d).toISOString().replace(/[-:]|\.\d+/g,"");return"data:text/calendar;charset=utf8,"+encodeURIComponent(`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nUID:${e.id}@raviraj-swarupa\nDTSTAMP:${f(Date.now())}\nDTSTART:${f(e.start)}\nDTEND:${f(e.end)}\nSUMMARY:${T}\nLOCATION:${C.venue}\nEND:VEVENT\nEND:VCALENDAR`)}
function events(){$("#tl").innerHTML='<i id="fill"></i>'+C.events.map((e,i)=>{const T=t("e"+(i+1));return`<div class="ev rv"><h3>${T}</h3><p>${t("e"+(i+1)+"d")}</p><p>📍 ${C.venue}</p>
 ${e.subs.map(s=>`<div class="sub dv"><span>${s[0]}</span><span>${s[1]}</span></div>`).join("")}${i==1?`<p class="cg" style="color:var(--tc);margin-top:8px">${t("e2n")}</p>`:""}
 <div class="acts"><a class="btn" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(C.mapsQuery)}">${t("dir")}</a>
 <a class="btn" target="_blank" rel="noopener" href="${gcal(e,T)}">${t("gcal")}</a><a class="btn" download="${e.id}.ics" href="${ics(e,T)}">${t("ics")}</a>
 ${i==1&&C.video?`<button class="btn" data-film>${t("film")}</button>`:""}</div></div>`}).join("");observe()}
function render(){document.documentElement.lang=L==="en"?"en":"hi";$$("[data-i]").forEach(n=>n.textContent=t(n.dataset.i));
 $("#gl").textContent=$("#lang").textContent=t("lang");names();events();
 $("#rs").innerHTML=C.rsvp.map(r=>`<p class="dv">${r.name}<br><a href="tel:+91${r.tel}" style="color:var(--tc)">📞 ${r.tel}</a></p>`).join("")}
function setL(){L=L==="en"?"hi":"en";try{localStorage.l=L}catch(e){}render()}
$("#lang").onclick=$("#gl").onclick=setL;
// monogram + gallery
[$("#seal1"),$("#mono")].forEach(n=>{const i=new Image();i.src=C.monogram;i.onload=()=>{n.textContent="";n.appendChild(i.cloneNode())}});
$("#gal").innerHTML=(C.gallery.length?C.gallery:[1,2,3,4,5,6]).map(g=>C.gallery.length?`<img src="${g}" alt="">`:`<div>❀</div>`).join("");
$("#gal").onclick=e=>{if(e.target.tagName=="IMG"){$("#lb img").src=e.target.src;$("#lb").style.display="flex"}};$("#lb").onclick=()=>$("#lb").style.display="none";
let x0;$("#lb").ontouchstart=e=>x0=e.touches[0].clientX;$("#lb").ontouchend=e=>{const g=$$("#gal img"),i=g.findIndex(n=>n.src==$("#lb img").src),d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>40&&g.length)$("#lb img").src=g[(i+(d<0?1:g.length-1))%g.length].src};
// reveal
let io;function observe(){io=io||new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("in")),{threshold:.15});$$(".rv").forEach(n=>io.observe(n))}
addEventListener("scroll",()=>{const tl=$("#tl"),f=$("#fill");if(!tl||!f)return;const r=tl.getBoundingClientRect();f.style.height=Math.max(0,Math.min(r.height,innerHeight*.6-r.top))+"px";wind=Math.min(6,Math.abs(scrollY-ly)/8);ly=scrollY},{passive:true});
// countdown
function tick(){let d=Math.max(0,new Date(C.muhurat)-Date.now())/1e3|0;[["cd",86400],["ch",3600],["cm",60],["cs",1]].forEach(([id,u])=>{$("#"+id).textContent=String(d/u|0).padStart(2,"0");d%=u})}tick();setInterval(tick,1000);
// toast/share
const toast=m=>{const n=$("#toast");n.textContent=m;n.style.opacity=1;setTimeout(()=>n.style.opacity=0,1800)};
const url=()=>C.siteUrl||location.href.split("#")[0];
$("#sh").onclick=()=>{const d={title:document.title,text:"Raviraj & Swarupa — Shubh Vivah, 16 Nov 2026",url:url()};navigator.share?navigator.share(d).catch(()=>{}):open("https://wa.me/?text="+encodeURIComponent(d.text+" "+d.url))};
$("#cp").onclick=()=>navigator.clipboard.writeText(url()).then(()=>toast(t("copied")));$("#pd").onclick=()=>print();
// audio
const au=$("#au"),vd=$("#vd");au.src=C.audio;au.volume=.5;let want=false;
const mus=()=>{$("#mus").textContent=au.paused?"♪ ▶":"♪ ❚❚"};
$("#mus").onclick=()=>{if(au.paused){want=true;au.play().catch(()=>{})}else{want=false;au.pause()}mus()};
document.addEventListener("visibilitychange",()=>{if(document.hidden)au.pause();else if(want)au.play().catch(()=>{});mus()});
document.addEventListener("click",e=>{if(e.target.dataset.film){vd.src=C.video;vd.style.cssText="display:block;position:fixed;inset:0;z-index:80;width:100%;height:100%;background:#000";vd.controls=true;au.pause();vd.play();vd.onended=()=>vd.style.display="none"}});
// gate + petals + canvas
const cv=$("#bg"),cx=cv.getContext("2d");let P=[],wind=0,ly=0,burst=false;
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
const PAL={hero:["#c7343c","#fff"],bless:["#F4A81D","#E8731A"],inv:["#E8A0B4","#B85D4B"],cdS:["#F2A7C3"],fns:["#6b8f5e","#F4A81D"],galS:["#D6458F"],clo:["#c7343c","#C29B58"]};
function sec(){const y=innerHeight/2;return($$("section").find(s=>{const r=s.getBoundingClientRect();return r.top<=y&&r.bottom>y})||{}).id||"hero"}
function mk(cols,top){return{x:Math.random()*innerWidth,y:top?-20:Math.random()*innerHeight,s:4+Math.random()*7,v:.4+Math.random()*1.2*(1+(+top)),r:Math.random()*6,c:cols[Math.random()*cols.length|0],z:Math.random()*.6+.4}}
function loop(){cv.width=innerWidth;cv.height=innerHeight;const cols=burst?["#F4A81D","#E8731A","#c7343c","#a3172a"]:PAL[sec()];
 if(P.length<(burst?90:26)&&Math.random()<.3)P.push(mk(cols,burst));
 P=P.filter(p=>p.y<innerHeight+20);
 P.forEach(p=>{p.y+=p.v*p.z*(burst?3:1);p.x+=Math.sin(p.y/60+p.r)*.6+wind*p.z;p.r+=.02;cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.globalAlpha=burst?.9:.45*p.z;cx.fillStyle=p.c;cx.beginPath();cx.ellipse(0,0,p.s,p.s*.55,0,0,7);cx.fill();cx.restore()});
 wind*=.95;if(!reduce)requestAnimationFrame(loop)}
$("#openBtn").onclick=()=>{const g=$("#gate");g.classList.add("open");burst=true;want=true;au.play().catch(()=>{});mus();loop();
 setTimeout(()=>{g.classList.add("gone");document.body.classList.add("on");setTimeout(()=>burst=false,4000)},2800)};
render();mus();if(!reduce)loop();
})();
