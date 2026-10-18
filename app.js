(()=>{
const N=128,R=7;
const ROUNDS=["Ronda de 128","Ronda de 64","Dieciseisavos","Octavos","Cuartos","Semifinal","Final"];
const SHORT=["R128","R64","R32","R16","QF","SF","F"];

const blank=()=>({name:"BYE",cat:"",club:""});
const isBye=s=>!s||!s.name||/^bye$/i.test(String(s.name).trim());
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const norm=s=>String(s??"").normalize("NFD").replace(/[̀-ͯ]/g,"").trim().toLowerCase();
const k=(r,m)=>r+"_"+m;
const SB={url:"https://stouysjmkjlrmyiyetvm.supabase.co",key:"sb_publishable_hbQ71KmUQTxX8nnhtriNoA_CyxCJOWw"};
const FECHA_R128="2026-10-18";
const nM=r=>(N/2)>>r;
const child=(r,m,s)=>s?2*nM(r)-1-m:m;
const parent=(r,m)=>{const n=nM(r+1);return m<n?m:2*n-1-m};
const ORDER=(()=>{const o=[];o[R-1]=[0];for(let r=R-1;r>0;r--)o[r-1]=o[r].flatMap(m=>[child(r,m,0),child(r,m,1)]);return o})();

function slot(st,r,m,side){
  if(r===0){const i=2*m+side;return {...st.players[i],llave:i+1};}
  const c=child(r,m,side),w=st.win[k(r-1,c)];
  if(w===undefined)return null;
  return slot(st,r-1,c,w);
}
function autoByes(st){
  for(let m=0;m<N/2;m++){
    const a=slot(st,0,m,0),b=slot(st,0,m,1),key=k(0,m);
    if(st.win[key]!==undefined)continue;
    if(isBye(b)&&!isBye(a))st.win[key]=0;
    else if(isBye(a)&&!isBye(b))st.win[key]=1;
  }
  return st;
}
function pick(st,r,m,side){
  const key=k(r,m);
  if(st.win[key]===side)delete st.win[key];else st.win[key]=side;
  for(let rr=r,mm=m;rr<R-1;rr++){mm=parent(rr,mm);delete st.win[k(rr+1,mm)]}
  return st;
}

function parseRows(rows){
  rows=rows.filter(r=>r&&r.some(c=>String(c??"").trim()!==""));
  if(!rows.length)throw new Error("la hoja está vacía");
  const head=rows[0].map(norm);
  const find=t=>head.findIndex(h=>h===t||h.startsWith(t));
  const out=Array.from({length:N},blank);
  const put=(i,name,cat,club)=>{
    if(!(i>=0&&i<N))return;
    const n=String(name??"").trim();
    out[i]=n&&!/^bye$/i.test(n)?{name:n,cat:String(cat??"").trim(),club:String(club??"").trim()}:blank();
  };
  const j1=head.findIndex(h=>/jugador\s*1/.test(h)),j2=head.findIndex(h=>/jugador\s*2/.test(h));
  if(j1>=0&&j2>=0){
    const pi=find("partida");
    const cats=head.map((h,i)=>/categor/.test(h)?i:-1).filter(i=>i>=0);
    const c1=cats.find(i=>i>j1&&i<j2)??-1,c2=cats.find(i=>i>j2)??-1;
    rows.slice(1).forEach((r,ix)=>{
      const p=pi>=0&&+r[pi]>0?+r[pi]-1:ix;
      put(2*p,r[j1],c1>=0?r[c1]:"","");
      put(2*p+1,r[j2],c2>=0?r[c2]:"","");
    });
    return out;
  }
  let li=find("llave"),ni=find("jugador"),ci=find("categor"),ki=find("club"),body=rows.slice(1);
  if(ni<0)throw new Error("no encontré la columna “Jugador”");
  body.forEach((r,ix)=>{const p=li>=0&&+r[li]>0?+r[li]-1:ix;put(p,r[ni],ci>=0?r[ci]:"",ki>=0?r[ki]:"")});
  return out;
}
const splitName=v=>{const t=String(v??"").trim().replace(/\s+/g," ");const m=t.match(/^(.*?)\s+(\d{1,3})(?:\.0+)?$/);return m?{name:m[1],hcp:m[2]}:{name:t,hcp:""}};
const roundOf=t=>{t=norm(t);if(!/ronda|octav|cuart|semi|final|dieciseis/.test(t))return -1;if(/128/.test(t))return 0;if(/\b64\b/.test(t))return 1;if(/\b32\b|dieciseis/.test(t))return 2;if(/\b16\b|octav/.test(t))return 3;if(/\b8\b|cuart/.test(t))return 4;if(/semi/.test(t))return 5;if(/final/.test(t))return 6;return -1};
const cleanHora=v=>{const t=String(v??"").trim().toUpperCase().replace(/\.0+$/,"");return /^\d{1,2}A?$/.test(t)?t:""};
function parseCuadro(rows){
  const h=rows.findIndex(r=>r.some(c=>roundOf(c)===0));
  const cols={};
  rows[h].forEach((c,i)=>{const r=roundOf(c);if(r>=0)(cols[r]=cols[r]||[]).push(i)});
  const out=Array.from({length:N},blank),hx={},win={},avisos=[];
  const blk=r=>{const c=cols[r];if(!c)return null;const c1=c[0],c2=c[1]??c1+2;return {c1,c2,num:c1-1,hora:c2+2}};
  const b0=blk(0);
  rows.slice(h+1).forEach(r=>{
    const p=Math.round(+r[b0.num]);if(!(p>=1&&p<=N/2))return;
    [r[b0.c1],r[b0.c2]].forEach((v,s)=>{const x=splitName(v);out[2*(p-1)+s]=x.name&&!/^bye$/i.test(x.name)?{name:x.name,cat:"",club:"",hcp:x.hcp}:blank()});
    const h=cleanHora(r[b0.hora]);if(h)hx[k(0,p-1)]=FECHA_R128+"T"+hm(h);
  });
  const st={players:out,win,hx};
  for(let r=1;r<R;r++){
    const b=blk(r);if(!b)continue;
    rows.slice(h+1).forEach(row=>{
      const i=Math.round(+row[b.num]);if(!(i>=1&&i<=nM(r)))return;
      [0,1].forEach(s=>{
        const nm=norm(splitName(row[s?b.c2:b.c1]).name);if(!nm)return;
        const pm=child(r,i-1,s);
        const a=slot(st,r-1,pm,0),c=slot(st,r-1,pm,1);
        if(a&&norm(a.name)===nm)win[k(r-1,pm)]=0;
        else if(c&&norm(c.name)===nm)win[k(r-1,pm)]=1;
        else avisos.push(`${ROUNDS[r]} ${i}: “${splitName(row[s?b.c2:b.c1]).name}” no juega la partida ${pm+1} de ${ROUNDS[r-1]}`);
      });
    });
  }
  if(avisos.length)console.warn(avisos.join("\n"));
  return {...st,avisos};
}
function parseWorkbook(buf){
  if(!window.XLSX)throw new Error("no cargó el lector de Excel; recarga la página");
  const wb=XLSX.read(buf,{type:"array"});
  const name=wb.SheetNames.find(n=>norm(n)==="fixture")||wb.SheetNames[0];
  const rows=XLSX.utils.sheet_to_json(wb.Sheets[name],{header:1,defval:""});
  if(rows.slice(0,5).some(r=>r.some(c=>roundOf(c)===0)))return parseCuadro(rows);
  return {players:parseRows(rows),win:{},hx:{}};
}
function hm(h){let n=parseInt(h,10);if(n<8)n+=12;return String(n).padStart(2,"0")+":"+(h.endsWith("A")?"30":"00")}
const DIAS=["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"],MESES=["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
const horaDe=(st,r,m)=>(st.hx&&st.hx[k(r,m)])||"";
const splitHx=v=>{const [d,t]=v.includes("T")?v.split("T"):["",v];return {d,t}};
const fmtT=t=>{if(!t)return "";let [h,mi]=t.split(":").map(Number);const ap=h>=12?"PM":"AM";return `${h%12||12}:${String(mi).padStart(2,"0")} ${ap}`};
const fmtD=d=>{if(!d)return "";const x=new Date(d+"T12:00:00");return `${DIAS[x.getDay()]} ${x.getDate()} ${MESES[x.getMonth()]}`};
const horaTxt=v=>{if(!v)return "";const {d,t}=splitHx(v);return [fmtD(d),fmtT(t)].filter(Boolean).join(" · ")};
const sbHead={apikey:SB.key,"Content-Type":"application/json"};
async function sbRpc(fn,body){
  const r=await fetch(`${SB.url}/rest/v1/rpc/${fn}`,{method:"POST",headers:sbHead,body:JSON.stringify(body)});
  const d=await r.json().catch(()=>null);
  if(!r.ok){const e=new Error((d&&(d.message||d.hint))||("Error "+r.status));e.status=r.status;e.code=d&&d.code;throw e}
  return d;
}
const checkPin=pin=>sbRpc("copa_dm14_check",{pin});
async function saveState(pin,st){
  const datos={players:st.players.map(p=>({name:p.name,cat:p.cat||"",club:p.club||"",hcp:p.hcp||""})),win:st.win,hx:st.hx||{}};
  return sbRpc("copa_dm14_guardar",{pin,datos});
}

async function loadState({skipCloud=false}={}){
  if(!skipCloud)try{
    const r=await fetch(`${SB.url}/rest/v1/copa_dm14?id=eq.1&select=data,updated_at`,{headers:{apikey:SB.key},cache:"no-store"});
    if(r.ok){const [row]=await r.json();const d=row&&row.data;if(d&&Array.isArray(d.players)&&d.players.length===N)return {state:{players:d.players,win:d.win||{},hx:d.hx||{}},source:"nube",updated:row.updated_at};}
  }catch(e){}
  const r=await fetch("datos/fixture.xlsx",{cache:"no-store"});
  if(!r.ok)throw new Error("no encontré datos/fixture.xlsx");
  return {state:autoByes(parseWorkbook(await r.arrayBuffer())),source:"excel"};
}

function stats(st){
  let played=0,real=0;
  for(let r=0;r<R;r++)for(let m=0;m<(N/2)>>r;m++){
    if(st.win[k(r,m)]===undefined)continue;
    played++;
    if(!(r===0&&(isBye(slot(st,0,m,0))||isBye(slot(st,0,m,1)))))real++;
  }
  let cur=R-1;
  for(let r=0;r<R;r++){let done=true;for(let m=0;m<(N/2)>>r;m++)if(st.win[k(r,m)]===undefined){done=false;break}if(!done){cur=r;break}}
  const entrants=st.players.filter(p=>!isBye(p)).length;
  return {played:real,left:127-played,round:played===127?"Final jugada":ROUNDS[cur],alive:played===127?1:entrants-real,entrants};
}

const tag=(p)=>{
  const t=String(p.cat||"").trim();
  if(t){const three=/3/.test(t);return `<span class="c${three?" c3":""}">${three?"3RA":/2/.test(t)?"2DA":esc(t.slice(0,4).toUpperCase())}</span>`}
  return p.hcp?`<span class="c">${esc(p.hcp)}</span>`:"";
};
const FROM=[{r:0,label:"128"},{r:1,label:"64"},{r:2,label:"32"},{r:3,label:"16"},{r:4,label:"8"}];

function bracket(root,{editable=false,onPick=null}={}){
  let st=null,from=0,zoom=null,query="",userZoom=false;
  try{const f=sessionStorage.getItem("dm14.from");if(f!==null)from=+f}catch(e){}
  root.classList.add("bk");
  root.innerHTML=`<div class="bk-bar">
    <div class="seg" role="group" aria-label="Ver desde la ronda">${FROM.map(f=>`<button type="button" data-from="${f.r}">${f.label}</button>`).join("")}</div>
    <div class="zoom" role="group" aria-label="Zoom"><button type="button" data-z="-" aria-label="Alejar">−</button><output class="zv">100%</output><button type="button" data-z="+" aria-label="Acercar">+</button><button type="button" data-z="fit">Ajustar</button></div>
  </div>
  <div class="bk-view${editable?" editable":""}" tabindex="0"><div class="bk-stage"><div class="bk-canvas"></div></div></div>`;
  const bar=root.querySelector(".bk-bar"),view=root.querySelector(".bk-view"),stage=root.querySelector(".bk-stage"),cv=root.querySelector(".bk-canvas");
  let W=0,H=0;
  const applyZoom=()=>{
    stage.style.width=W*zoom+"px";stage.style.height=H*zoom+"px";
    cv.style.transform=`scale(${zoom})`;
    root.querySelector(".zv").textContent=Math.round(zoom*100)+"%";
  };
  const fit=()=>{const w=view.clientWidth-8;return Math.max(.5,Math.min(1,w/W))};
  function draw(){
    if(!st)return;
    bar.querySelectorAll("[data-from]").forEach(b=>b.setAttribute("aria-pressed",+b.dataset.from===from));
    const narrow=innerWidth<700;
    const colw=narrow?168:184,gap=narrow?22:30,mh=46,unit=from>=3?96:from>=2?80:66,top=46;
    const side=6-from,cols=2*side+1,perSide=nM(from)/2;
    H=top+perSide*unit+24;W=cols*colw+(cols-1)*gap;
    const colX=(r,right)=>(right?2*side-(r-from):(r-from))*(colw+gap);
    const q=norm(query);
    let html="",paths="";
    for(let r=from;r<=5;r++){
      const c=nM(r);
      html+=`<div class="rh" style="left:${colX(r,0)}px;width:${colw}px">${ROUNDS[r]}<small>${c} ${c===1?"partida":"partidas"}</small></div>`;
      html+=`<div class="rh r" style="left:${colX(r,1)}px;width:${colw}px">${ROUNDS[r]}<small>${c} ${c===1?"partida":"partidas"}</small></div>`;
    }
    html+=`<div class="rh gold" style="left:${colX(6,0)}px;width:${colw}px">Final</div>`;
    const pos={};
    const card=(r,m,x,cy,right)=>{
      const w=st.win[k(r,m)];
      const rows=[0,1].map(s=>{
        const p=slot(st,r,m,s),bye=p&&isBye(p);
        const cls=["p"];
        if(!p)cls.push("tbd");
        if(bye)cls.push("bye");
        if(p&&w!==undefined)cls.push(w===s?"w":"l");
        if(p&&!bye&&q&&norm(p.name).includes(q))cls.push("hit");
        const other=slot(st,r,m,1-s);
        const dis=!editable||!p||bye||!other||isBye(other);
        const label=p?(bye?"Libre":p.name):`Ganador P${child(r,m,s)+1}`;
        return `<button type="button" class="${cls.join(" ")}" data-r="${r}" data-m="${m}" data-s="${s}" ${dis?"disabled":""} title="${esc(label)}${p&&p.club?" · "+esc(p.club):""}"><span class="ball" aria-hidden="true"></span><span class="n">${esc(label)}</span>${p&&!bye?tag(p):""}<span class="s">${p?p.llave:""}</span></button>`;
      }).join("");
      const hv=horaDe(st,r,m),hora=hv?fmtT(splitHx(hv).t):"";
      const done=w!==undefined;
      return `<div class="m${right?" right":""}${r===6?" final":""}${done?" done":""}" style="left:${x}px;top:${cy-mh/2}px"><span class="lab">P${m+1}${hora?`<i>${hora}</i>`:""}</span>${rows}</div>`;
    };
    for(let r=from;r<=5;r++){
      const n=nM(r),half=n/2,step=1<<(r-from);
      for(let j=0;j<n;j++){
        const m=ORDER[r][j],right=j>=half,jj=right?j-half:j;
        const cy=top+(jj+.5)*step*unit,x=colX(r,right);
        pos[k(r,m)]={x,cy};
        html+=card(r,m,x,cy,right);
        if(r>from)for(const s of [0,1]){
          const c=child(r,m,s),a=pos[k(r-1,c)];if(!a)continue;
          const on=st.win[k(r-1,c)]!==undefined;
          if(right){const x0=a.x,xm=x0-gap/2;paths+=`<path class="${on?"on":""}" d="M${x0} ${a.cy}H${xm}V${cy}H${x+colw}"/>`}
          else{const x1=a.x+colw,xm=x1+gap/2;paths+=`<path class="${on?"on":""}" d="M${x1} ${a.cy}H${xm}V${cy}H${x}"/>`}
        }
      }
    }
    const fx=colX(6,0),fy=top+perSide*unit/2;
    pos[k(6,0)]={x:fx,cy:fy};
    html+=card(6,0,fx,fy,false);
    for(const s of [0,1]){
      const c=child(6,0,s),a=pos[k(5,c)];if(!a)continue;
      const on=st.win[k(5,c)]!==undefined;
      paths+=s?`<path class="${on?"on":""}" d="M${a.x} ${a.cy}H${fx+colw}"/>`:`<path class="${on?"on":""}" d="M${a.x+colw} ${a.cy}H${fx}"/>`;
    }
    const w6=st.win[k(6,0)],champ=w6!==undefined?slot(st,6,0,w6):null;
    html+=`<div class="champ${champ?" set":""}" style="left:${fx}px;width:${colw}px;top:${fy-mh/2-128}px"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h10v3a5 5 0 0 1-10 0V4Z"/><path d="M7 5H4v1a3 3 0 0 0 3 3M17 5h3v1a3 3 0 0 1-3 3M12 12v4M8 20h8M9 16h6v4H9z"/></svg><small>Campeón</small><b>${champ?esc(champ.name):"Por definir"}</b></div>`;
    cv.style.width=W+"px";cv.style.height=H+"px";
    cv.innerHTML=`<svg class="links" width="${W}" height="${H}">${paths}</svg>`+html;
    if(zoom===null||!userZoom)zoom=fit();
    applyZoom();
    const hit=cv.querySelector(".p.hit");
    if(hit&&q){const b=hit.getBoundingClientRect(),v=view.getBoundingClientRect();view.scrollBy({left:b.left-v.left-v.width/2,top:b.top-v.top-v.height/2,behavior:"smooth"})}
  }
  bar.addEventListener("click",e=>{
    const b=e.target.closest("button");if(!b)return;
    if(b.dataset.from!==undefined){from=+b.dataset.from;userZoom=false;try{sessionStorage.setItem("dm14.from",from)}catch(e){};draw();view.scrollTo(0,0);return}
    const z=b.dataset.z;
    if(z==="fit"){userZoom=false;zoom=fit()}else{userZoom=true;zoom=Math.max(.35,Math.min(1.6,zoom+(z==="+"?.1:-.1)))}
    applyZoom();
  });
  let drag=null,moved=false;
  view.addEventListener("pointerdown",e=>{if(e.pointerType!=="mouse"||e.button!==0)return;drag={x:e.clientX,y:e.clientY,l:view.scrollLeft,t:view.scrollTop};moved=false});
  addEventListener("pointermove",e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(!moved&&Math.hypot(dx,dy)<5)return;moved=true;view.classList.add("grab");view.scrollLeft=drag.l-dx;view.scrollTop=drag.t-dy});
  addEventListener("pointerup",()=>{drag=null;view.classList.remove("grab")});
  view.addEventListener("click",e=>{
    if(moved){e.stopPropagation();e.preventDefault();moved=false;return}
    const b=e.target.closest("button.p");if(!b||b.disabled||!onPick)return;
    const sx=view.scrollLeft,sy=view.scrollTop;
    onPick(+b.dataset.r,+b.dataset.m,+b.dataset.s);
    view.scrollTo(sx,sy);
  },true);
  let rt;addEventListener("resize",()=>{clearTimeout(rt);rt=setTimeout(draw,150)});
  return {
    update(s){st=s;draw()},
    setQuery(qq){query=qq;draw()},
    setFrom(r){from=r;draw()},
  };
}

function timeline(el,st,{query=""}={}){
  const q=norm(query);
  const slots={},pend={};
  for(let r=0;r<R;r++)for(let m=0;m<nM(r);m++){
    const h=horaDe(st,r,m);
    if(h)(slots[h]=slots[h]||[]).push([r,m]);
    else if(slot(st,r,m,0)||slot(st,r,m,1))(pend[r]=pend[r]||[]).push([r,m]);
  }
  const sk=v=>{const {d,t}=splitHx(v);return (d||"0000")+"T"+t};
  const groups=Object.keys(slots).sort((a,b)=>sk(a)<sk(b)?-1:1).map(h=>({h,ms:slots[h]}));
  Object.keys(pend).forEach(r=>groups.push({h:"",title:ROUNDS[r],ms:pend[r]}));
  const matchCard=([r,m])=>{
    const w=st.win[k(r,m)],done=w!==undefined;
    const pl=s=>{
      const p=slot(st,r,m,s);
      if(!p)return `<div class="tp tbd"><span class="ball"></span><span class="n">Ganador P${child(r,m,s)+1}</span></div>`;
      if(isBye(p))return `<div class="tp tbd"><span class="ball"></span><span class="n">Libre</span></div>`;
      const cls=["tp",done?(w===s?"w":"l"):"",q&&norm(p.name).includes(q)?"hit":""].join(" ");
      return `<div class="${cls}"><span class="ball"></span><span class="n">${esc(p.name)}</span>${tag(p)}<span class="s">${p.llave}</span></div>`;
    };
    const both=slot(st,r,m,0)&&slot(st,r,m,1);
    return `<article class="tm${done?" done":""}"><header><b>P${m+1}</b><span>${SHORT[r]}</span><em class="${done?"ok":both?"go":"wait"}">${done?"Finalizada":both?"Por jugar":"En espera"}</em></header>${pl(0)}<div class="vs">VS</div>${pl(1)}</article>`;
  };
  el.innerHTML=`<ol class="tl">${groups.map((g,i)=>{
    const done=g.ms.filter(([r,m])=>st.win[k(r,m)]!==undefined).length,tot=g.ms.length;
    const state=done===tot?"full":done?"live":"todo";
    const {d,t}=splitHx(g.h||"");const [hh,ap]=g.h?fmtT(t).split(" "):[SHORT[g.ms[0][0]],""];
    const rs=[...new Set(g.ms.map(([r])=>ROUNDS[r]))].join(" · ");
    return `<li class="slot ${state}${i%2?" alt":""}">
      <div class="node"><time>${esc(hh)}</time>${ap?`<small>${ap}</small>`:""}</div>
      <div class="slot-body">
        <div class="slot-head"><h3>${g.h?esc(horaTxt(g.h)):esc(g.title)+" · por programar"}</h3>${g.h?`<span class="rs">${esc(rs)}</span>`:""}
          <p><span>${done} de ${tot} finalizadas</span><span class="bar"><i style="width:${tot?done/tot*100:0}%"></i></span></p></div>
        <div class="tms">${g.ms.map(matchCard).join("")}</div>
      </div></li>`}).join("")}</ol>`;
  const hit=el.querySelector(".hit");
  if(hit&&q)hit.scrollIntoView({block:"center",behavior:"smooth"});
}

window.Fixture={N,R,ROUNDS,SHORT,FROM,FECHA_R128,blank,isBye,esc,k,nM,child,slot,autoByes,pick,parseRows,parseWorkbook,loadState,stats,bracket,timeline,horaTxt,horaDe,splitHx,checkPin,saveState};
})();
