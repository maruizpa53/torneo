(()=>{
const N=128,R=7;
const ROUNDS=["Ronda de 128","Ronda de 64","Dieciseisavos","Octavos","Cuartos","Semifinal","Final"];
const SHORT=["R128","R64","R32","R16","QF","SF","F"];
const VIEWS=[
  {id:"all",label:"Cuadro completo",r0:0,r1:6,m0:0,cnt:64},
  {id:"A",label:"Grupo A",r0:0,r1:4,m0:0,cnt:16},
  {id:"B",label:"Grupo B",r0:0,r1:4,m0:16,cnt:16},
  {id:"C",label:"Grupo C",r0:0,r1:4,m0:32,cnt:16},
  {id:"D",label:"Grupo D",r0:0,r1:4,m0:48,cnt:16},
  {id:"F",label:"Fase final",r0:3,r1:6,m0:0,cnt:8},
];

const blank=()=>({name:"BYE",cat:"",club:""});
const isBye=s=>!s||!s.name||/^bye$/i.test(String(s.name).trim());
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const norm=s=>String(s??"").normalize("NFD").replace(/[̀-ͯ]/g,"").trim().toLowerCase();
const k=(r,m)=>r+"_"+m;

function slot(st,r,m,side){
  if(r===0){const i=2*m+side;return {...st.players[i],llave:i+1};}
  const w=st.win[k(r-1,2*m+side)];
  if(w===undefined)return null;
  return slot(st,r-1,2*m+side,w);
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
  for(let rr=r+1,mm=m>>1;rr<R;rr++,mm>>=1)delete st.win[k(rr,mm)];
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
function parseWorkbook(buf){
  if(!window.XLSX)throw new Error("no cargó el lector de Excel; recarga la página");
  const wb=XLSX.read(buf,{type:"array"});
  const name=wb.SheetNames.find(n=>norm(n)==="fixture")||wb.SheetNames[0];
  return parseRows(XLSX.utils.sheet_to_json(wb.Sheets[name],{header:1,defval:""}));
}

async function loadState(){
  try{
    const r=await fetch("/api/estado",{cache:"no-store"});
    if(r.ok){const d=await r.json();if(d&&Array.isArray(d.players)&&d.players.length===N)return {state:{players:d.players,win:d.win||{}},source:"api",updated:d.updated};}
  }catch(e){}
  const r=await fetch("datos/fixture.xlsx",{cache:"no-store"});
  if(!r.ok)throw new Error("no encontré datos/fixture.xlsx");
  return {state:autoByes({players:parseWorkbook(await r.arrayBuffer()),win:{}}),source:"excel"};
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

const catTag=c=>{const t=String(c||"").trim();if(!t)return "";const three=/3/.test(t);return `<span class="c${three?" c3":""}">${three?"3RA":/2/.test(t)?"2DA":esc(t.slice(0,4).toUpperCase())}</span>`};

function renderBracket(board,st,{view="all",query="",editable=false}={}){
  const v=VIEWS.find(x=>x.id===view)||VIEWS[0];
  const narrow=innerWidth<640;
  const colw=narrow?190:220,gap=narrow?26:40,mh=46,unit=v.cnt>16?56:70;
  board.classList.toggle("editable",editable);
  board.innerHTML=`<div class="inner" style="--colw:${colw}px;--colgap:${gap}px;--mh:${mh}px"><div class="roundheads"></div><div class="canvas"></div></div>`;
  const champ=v.r1===6,cols=v.r1-v.r0+1+(champ?1:0);
  const H=v.cnt*unit,W=cols*colw+(cols-1)*gap;
  let hh="";
  for(let r=v.r0;r<=v.r1;r++){const c=(N/2)>>r;hh+=`<div${r===6?' class="gold"':""}>${ROUNDS[r]}<small>${c} ${c===1?"partida":"partidas"}</small></div>`}
  if(champ)hh+=`<div class="gold">Campeón<small></small></div>`;
  const heads=board.querySelector(".roundheads");heads.innerHTML=hh;heads.style.width=(W+32)+"px";
  const cv=board.querySelector(".canvas");cv.style.width=W+"px";cv.style.height=H+"px";
  let html="",paths="";
  const q=norm(query);
  const pos={};
  for(let r=v.r0;r<=v.r1;r++){
    const rel=r-v.r0,step=1<<rel,count=v.cnt>>rel,mStart=v.m0>>rel,x=rel*(colw+gap);
    for(let j=0;j<count;j++){
      const m=mStart+j,cy=(j+.5)*step*unit,key=k(r,m),w=st.win[key];
      pos[key]={x,cy};
      const sides=[0,1].map(s=>{
        const p=slot(st,r,m,s),bye=p&&isBye(p);
        const cls=["p"];
        if(!p)cls.push("tbd");
        if(bye)cls.push("bye");
        if(p&&w!==undefined)cls.push(w===s?"w":"l");
        if(p&&!bye&&q&&norm(p.name).includes(q))cls.push("hit");
        const other=slot(st,r,m,1-s);
        const dis=!editable||!p||bye||!other||isBye(other);
        const label=p?(bye?"Libre":p.name):"Por definir";
        return `<button class="${cls.join(" ")}" data-r="${r}" data-m="${m}" data-s="${s}" ${dis?"disabled":""} title="${esc(label)}${p&&p.club?" · "+esc(p.club):""}"><span class="s">${p?p.llave:""}</span><span class="n">${esc(label)}</span>${p&&!bye?catTag(p.cat):""}</button>`;
      }).join("");
      html+=`<div class="m${r===6?" final":""}" style="left:${x}px;top:${cy-mh/2}px">${sides}<span class="no">${SHORT[r]}-${m+1}</span></div>`;
      if(r>v.r0)for(const s of [0,1]){
        const a=pos[k(r-1,2*m+s)];if(!a)continue;
        const x1=a.x+colw,xm=x1+gap/2,on=st.win[k(r-1,2*m+s)]!==undefined;
        paths+=`<path class="${on?"on":""}" d="M${x1} ${a.cy}H${xm}V${cy}H${x}"/>`;
      }
    }
  }
  if(champ){
    const f=pos[k(6,0)],cx=(6-v.r0+1)*(colw+gap);
    const w=st.win[k(6,0)],c=w!==undefined?slot(st,6,0,w):null;
    html+=`<div class="champ" style="left:${cx}px;top:${f.cy-42}px"><small>Campeón</small><b>${c?esc(c.name):"Por definir"}</b><i>${c?"Llave "+c.llave+(c.club?" · "+esc(c.club):""):"2da Copa DM14"}</i></div>`;
    paths+=`<path class="${c?"on":""}" d="M${f.x+colw} ${f.cy}H${cx}"/>`;
  }
  cv.innerHTML=`<svg class="links" width="${W}" height="${H}">${paths}</svg>`+html;
  const hit=board.querySelector(".p.hit");
  if(hit&&q)hit.scrollIntoView({block:"center",inline:"center"});
}

function renderLists(el,st,{round=0,query=""}={}){
  const q=norm(query);
  const total=(N/2)>>round,per=round===0?16:round===1?8:total;
  const cards=[];
  for(let start=0;start<total;start+=per){
    let rows="";
    for(let m=start;m<Math.min(total,start+per);m++){
      const w=st.win[k(round,m)];
      const cell=s=>{
        const p=slot(st,round,m,s);
        if(!p)return `<span class="t">Ganador partida ${(2*m+s)+1} (${SHORT[round-1]})</span>`;
        if(isBye(p))return `<span class="t">Libre</span>`;
        const cls=[w===undefined?"":w===s?"w":"l",q&&norm(p.name).includes(q)?"hit":""].join(" ").trim();
        return `<span class="${cls}">${esc(p.name)}<span class="k">LLAVE ${p.llave}${p.cat?" · "+esc(p.cat):""}</span></span>`;
      };
      rows+=`<li>${cell(0)}<span class="vs">VS</span>${cell(1)}</li>`;
    }
    const a=start+1,b=Math.min(total,start+per);
    cards.push(`<section class="card"><h3>${ROUNDS[round]}${total>per?` · ${a}–${b}`:""}</h3><div class="sub">Jugadores</div><ol>${rows}</ol></section>`);
  }
  el.innerHTML=cards.join("");
  const hit=el.querySelector(".hit");
  if(hit&&q)hit.scrollIntoView({block:"center"});
}

window.Fixture={N,R,ROUNDS,SHORT,VIEWS,blank,isBye,esc,slot,autoByes,pick,parseRows,parseWorkbook,loadState,stats,renderBracket,renderLists};
})();
