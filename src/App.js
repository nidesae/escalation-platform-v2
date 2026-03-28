import { useState, useMemo, useEffect } from "react";

const C={bg:"#060a10",bgC:"#0c1118",bgH:"#131b27",bgS:"#0a0f17",bd:"#1a2332",tx:"#dce4f0",ts:"#8494a7",tm:"#4a5b6e",ac:"#3b9eff",acd:"#0d2847",gn:"#00e5a0",gnd:"#002e20",am:"#ffb224",amd:"#3d2800",rd:"#ff4d6a",rdd:"#3d0014",pu:"#a78bfa",pud:"#1e0f47",cy:"#22d3ee",or:"#ff8a4c"};
const RK={healthy:C.gn,"at-risk":C.am,critical:C.rd};
function sr(s){return()=>{s=(s*16807)%2147483647;return(s-1)/2147483646}}
const R=sr(2024);
const pk=a=>a[Math.floor(R()*a.length)];
const pw=(a,w)=>{const t=w.reduce((x,y)=>x+y,0);let r=R()*t;for(let i=0;i<a.length;i++){r-=w[i];if(r<=0)return a[i]}return a[a.length-1]};
const ri=(a,b)=>Math.floor(R()*(b-a+1))+a;
const rd2=(s,e)=>new Date(new Date(s).getTime()+R()*(new Date(e).getTime()-new Date(s).getTime())).toISOString().split("T")[0];

const QS=["Windows Servicing","Directory Services","Windows Networking","Devices & Deployment",".NET & Runtime","User Experience","Security"];
const QW={C1:[30,10,10,15,5,15,15],C2:[10,5,10,40,5,10,20],C3:[25,20,15,10,5,15,10],C4:[15,25,20,15,5,10,10],C5:[20,10,20,10,5,10,25],C6:[25,10,10,25,5,15,10],C7:[15,5,5,15,35,20,5],C8:[25,10,20,20,5,10,10]};
const SVS=["Sev A","Sev B","Sev C"];
const SO=["Open — Awaiting Engineering","Open — Awaiting OEM","Open — Awaiting Customer Confirmation"];
const SC=["Closed — Resolved","Closed — By Design","Closed — Open Bug, Future Date","Closed — Customer Closed","Closed — 3 Strikes"];
const DS=["ADO Backlog → Microsoft-owned","OEM Owner → Dell/HP/Lenovo","Customer Error / Device Unavailable","Windows as Victim","No Repair Item — Outside Microsoft Scope"];
const CE=["Amit Kumar","Deepa Reddy","Suresh Nair","Kavita Joshi","Nikhil Rao","Pooja Mehta"];
const FE=[{n:"James Wilson",t:"WU Engine"},{n:"Sarah Chen",t:"AD Core"},{n:"Michael Brown",t:"Device Mgmt"},{n:"Lisa Park",t:"TCP/IP"},{n:"David Kim",t:"CLR Runtime"},{n:"Emily Zhang",t:"Shell UX"}];
const IM=["Rahul Verma","Sanjay Mishra","Neha Agarwal","Kiran Patel"];
const AT=["Bug — Security","Bug — Quality","Feature","Task","Eng Improvement"];
const CA=[{t:"KB Article",d:"Update KB for known issue"},{t:"Runbook",d:"Create escalation runbook"},{t:"Process Improvement",d:"Revise triage SOP"},{t:"Eng Hub Doc",d:"Publish RCA to hub"},{t:"Comms Template",d:"Draft customer advisory"},{t:"Training",d:"Training for failure pattern"},{t:"Monitor Alert",d:"Proactive regression alert"}];

const MO=["2024-11","2024-12","2025-01","2025-02","2025-03"];
const ML={"2024-11":"Nov 24","2024-12":"Dec 24","2025-01":"Jan 25","2025-02":"Feb 25","2025-03":"Mar 25"};
const MR={"2024-11":["2024-11-01","2024-11-30"],"2024-12":["2024-12-01","2024-12-31"],"2025-01":["2025-01-01","2025-01-31"],"2025-02":["2025-02-01","2025-02-28"],"2025-03":["2025-03-01","2025-03-31"]};

const CU=[
{id:"C1",nm:"Contoso Ltd",ind:"Mfg",tier:"E5",cv:"$1.2M",fl:12000,csam:"Rachel Foster",pm:"Priya Sharma",out:"renewed"},
{id:"C2",nm:"Fabrikam Inc",ind:"Tech",tier:"E5",cv:"$1.8M",fl:25000,csam:"David Chen",pm:"Raj Kapoor",out:"shifted"},
{id:"C3",nm:"Northwind Traders",ind:"Retail",tier:"E3",cv:"$900K",fl:8000,csam:"Amanda Rodriguez",pm:"Anita Desai",out:"churned"},
{id:"C4",nm:"Adventure Works",ind:"Logistics",tier:"E5",cv:"$1.1M",fl:6000,csam:"Lisa Nakamura",pm:"Vikram Singh",out:"dropped"},
{id:"C5",nm:"Woodgrove Bank",ind:"Finance",tier:"E5",cv:"$2.1M",fl:18000,csam:"Michael Torres",pm:"Maya Patel",out:"renewed"},
{id:"C6",nm:"Litware Corp",ind:"Health",tier:"E3",cv:"$1.4M",fl:15000,csam:"Karen Phillips",pm:"Rohan Gupta",out:"renewed"},
{id:"C7",nm:"Tailspin Toys",ind:"Retail",tier:"E3",cv:"$750K",fl:4000,csam:"Brian Yamamoto",pm:"Priya Sharma",out:"renewed"},
{id:"C8",nm:"Datum Corp",ind:"Energy",tier:"E5",cv:"$1.6M",fl:11000,csam:"Jennifer Adams",pm:"Anita Desai",out:"renewed"}];
const CM=Object.fromEntries(CU.map(c=>[c.id,c]));
const CN=Object.fromEntries(CU.map(c=>[c.id,c.nm]));

const W5R={"Windows Servicing":["No partition validation for CU","No driver compat pre-check","No WSUS cert monitoring"],"Directory Services":["Insufficient OU nesting tests","No VPN hybrid join docs","No cross-team protocol comms"],"Windows Networking":["No 3rd-party NDIS regression tests","No VPN infra upgrade advisory","No DHCP payload validation"],"Devices & Deployment":["No OEM hash auto-registration","No migration optimization guide","TPM not designed for dual-mgmt"],".NET & Runtime":["Migration tool gap for dynamic code","No enterprise app notification channel","DLL hardening lacked LOB compat"],"User Experience":["Custom layout migration untested","No rapid topology resilience","No shell extension validation"],"Security":["Co-mgmt lacks BitLocker authority","Servicing stack security gap","No SSO Credential Guard cert"]};

const TT={"Windows Servicing":["CU install failure — error 0x800f0922","Feature update rollback on fleet","WU scan failure affecting compliance","Patch Tuesday regression","Servicing stack failure on OEM"],"Directory Services":["GPO not applying after update","Hybrid AAD join failing over VPN","Kerberos auth failures","Cert auto-enrollment failing"],"Windows Networking":["Wi-Fi drops after quality update","VPN tunnel failure on W11","DNS resolution failures","NIC reset on dock undock"],"Devices & Deployment":["Autopilot enrollment failing","SCCM co-mgmt stalling","W11 upgrade failing with BitLocker","OOBE provisioning failure"],".NET & Runtime":["LOB app crash after runtime update","WPF high-DPI rendering issue","CLR startup DLL load failure","Runtime memory leak"],"User Experience":["Start menu not rendering","Taskbar icons disappearing","Explorer crash on network share","Login screen delay"],"Security":["BitLocker key not syncing to AAD","Defender disabled after CU","Credential Guard blocking SSO","Tamper protection reset"]};

const MCfg={"2024-11":{t:40,w:{C1:6,C2:6,C3:6,C4:5,C5:5,C6:5,C7:3,C8:4}},"2024-12":{t:50,w:{C1:5,C2:8,C3:7,C4:6,C5:6,C6:7,C7:4,C8:5}},"2025-01":{t:55,w:{C1:5,C2:4,C3:9,C4:4,C5:8,C6:8,C7:6,C8:5}},"2025-02":{t:50,w:{C1:4,C2:1,C3:5,C4:1,C5:6,C6:7,C7:6,C8:8}},"2025-03":{t:35,w:{C1:5,C2:0,C3:0,C4:0,C5:6,C6:6,C7:5,C8:5}}};

function genTix(){const tix=[];let c=1001;
for(const mo of MO){const cfg=MCfg[mo];const tw=Object.values(cfg.w).reduce((a,b)=>a+b,0);
for(const[cid,wt]of Object.entries(cfg.w)){if(!wt)continue;const n=Math.round((wt/tw)*cfg.t);
for(let i=0;i<n;i++){const id=`INC-${c++}`;
const isSv=cid==="C4"&&R()<.4,isIn=cid==="C2"&&R()<.35,oos=isSv||isIn;
const sw=(cid==="C3"&&(mo==="2025-01"||mo==="2024-12"))?[15,40,45]:[5,30,65];
const sev=pw(SVS,sw),q=pw(QS,QW[cid]);
const od=rd2(MR[mo][0],MR[mo][1]);
let st,cd2,cm,age;
if(oos){st="Closed — By Design";const d=ri(3,14);cd2=new Date(new Date(od).getTime()+d*864e5).toISOString().split("T")[0];cm=cd2.substring(0,7);age=d}
else if(mo==="2025-03"){if(R()<.6){st=pk(SO);cd2=null;cm=null;age=ri(5,25)}else{st=pw(SC,[55,10,15,12,8]);const d=ri(5,20);cd2=new Date(new Date(od).getTime()+d*864e5).toISOString().split("T")[0];cm=cd2.substring(0,7);age=d}}
else if(mo==="2025-02"){if(R()<.3){st=pk(SO);cd2=null;cm=null;age=ri(15,50)}else{st=pw(SC,[55,10,15,12,8]);const d=ri(7,45);cd2=new Date(new Date(od).getTime()+d*864e5).toISOString().split("T")[0];cm=cd2.substring(0,7);age=d}}
else{if(R()<.85){st=pw(SC,[55,10,15,12,8]);const d=sev==="Sev A"?ri(14,60):sev==="Sev B"?ri(7,45):ri(3,30);cd2=new Date(new Date(od).getTime()+d*864e5).toISOString().split("T")[0];cm=cd2.substring(0,7);age=d}else{st=pk(SO);cd2=null;cm=null;age=Math.round((new Date("2025-03-31")-new Date(od))/864e5)}}
const disp=oos?"No Repair Item — Outside Microsoft Scope":pw(DS,cid==="C4"?[10,5,10,10,65]:[30,15,20,20,15]);
const cxe=pk(CE);const hasA=disp.includes("ADO")&&!oos;const cfe=hasA?pk(FE):null;
const dev=oos?0:sev==="Sev A"?ri(500,15000):sev==="Sev B"?ri(50,2000):ri(5,200);
const title=oos?(isSv?pk(["AD replication — Server 2022","Print spooler crash — Server 2019","DHCP failover — Server 2022","DNS Server failure — Server 2022"]):pk(["Intune app deployment timeout","Conditional access blocking devices","Intune profile conflict with GPO","Compliance timeout on groups"])):pk(TT[q]);
const w5r=pk(W5R[q]);
const adoI=[];if(hasA){const na=ri(1,2);for(let j=0;j<na;j++){
const pr=sev==="Sev A"?pw(["P0","P1"],[60,40]):sev==="Sev B"?pw(["P1","P2"],[40,60]):pw(["P2","P3"],[50,50]);
const co=pr==="P0"?ri(14,30):pr==="P1"?ri(28,56):ri(42,112);
const cdt=new Date(new Date(od).getTime()+co*864e5).toISOString().split("T")[0];
const comp=st.startsWith("Closed")&&R()<.7;const pct=comp?100:st.startsWith("Closed")?ri(60,95):ri(10,80);
adoI.push({id:`ADO-${10100+c*2+j}`,type:pw(AT,[10,40,10,20,20]),pr,team:cfe.t,owner:pk(FE).n,commit:cdt,pct,blk:!comp&&R()<.2?pk(["Ext dep","Design review","Test env","Resource","Approval"]):null})}}
const nc=oos?0:ri(1,2);const cxeA=[];const us=new Set();
for(let j=0;j<nc;j++){let a;do{a=pk(CA)}while(us.has(a.t));us.add(a.t);
const dn=st.startsWith("Closed")?R()<.85:R()<.4;
cxeA.push({id:`CXE-${3000+c*3+j}`,type:a.t,desc:a.d,st:dn?"Complete":R()<.5?"In Progress":"Not Started",owner:pk(CE)})}
tix.push({id,mo,title,q,cust:CN[cid],cid,sev,st,cm,disp,od,cd:cd2,age,tam:CM[cid].csam,cxe,cfe:cfe?.n,im:pk(IM),dev,oos,w5r,adoI,cxeA})}}}
tix.sort((a,b)=>new Date(a.od)-new Date(b.od));return tix}
const TIX=genTix();

const CRM=[
{cid:"C1",d:"2024-11-08",a:"Priya Sharma",e:"First bi-weekly. Jennifer Wu new to CXE. Critical BSOD — 8,200 devices. Rachel confirmed 3yr OED."},
{cid:"C1",d:"2024-11-22",a:"Priya Sharma",e:"Mark Thompson joined. PIR complete, P0 ADO for Jan CU. Compared favorably to Office issue 2yr ago."},
{cid:"C1",d:"2024-12-20",a:"Priya Sharma",e:"Fix confirmed in Jan CU preview. Jennifer asked about GA — first buying signal."},
{cid:"C1",d:"2025-01-10",a:"Priya Sharma",e:"Fix validated. Mark: 'This is exactly why we pay for premium.' Strong renewal signal."},
{cid:"C1",d:"2025-03-07",a:"Priya Sharma",e:"Signed contract. First customer to convert. Cited bug resolution as driver. Success case study."},
{cid:"C2",d:"2024-11-08",a:"Raj Kapoor",e:"Kevin Park has 25K Intune fleet. Asked about Intune — clarified it's MCS4Security. Scope confusion."},
{cid:"C2",d:"2024-11-22",a:"Raj Kapoor",e:"3 tickets, 2 Intune-rooted. Kevin: 'Signed up for Windows and devices aren't supported.' Friction."},
{cid:"C2",d:"2024-12-20",a:"Raj Kapoor",e:"Sarah Mitchell escalated. Joint Security CXE briefing requested."},
{cid:"C2",d:"2025-01-10",a:"Raj Kapoor",e:"Joint Security session. Kevin more engaged. Procurement evaluating MCS4Security."},
{cid:"C2",d:"2025-02-07",a:"Raj Kapoor",e:"MCS4Security signed. MCS4MW not renewing. Clean transition. Learning: scope boundary friction."},
{cid:"C3",d:"2024-11-08",a:"Anita Desai",e:"Brian Clarke joined. Sev A GPO — 4,800 retail endpoints. Solid 2yr OED relationship."},
{cid:"C3",d:"2024-12-06",a:"Anita Desai",e:"Tom Henderson (new IT Dir). No MCS background. 'Why pay premium when bug is still open?'"},
{cid:"C3",d:"2024-12-20",a:"Anita Desai",e:"Tom wants written commitment. 'Paying a million for targets, not commitments?' Relationship tensing."},
{cid:"C3",d:"2025-01-10",a:"Anita Desai",e:"P1 missed Jan CU. Tom frustrated. Asked for direct CFE call. Deteriorating."},
{cid:"C3",d:"2025-02-21",a:"Anita Desai",e:"Fix delivered Feb CU. Tom: 'Should have been fixed 2 months ago.' Non-renewal final."},
{cid:"C3",d:"2025-03-07",a:"Anita Desai",e:"Closeout. CXE executed well but CFE slip killed perception. Exec continuity matters."},
{cid:"C4",d:"2024-11-08",a:"Vikram Singh",e:"Stephanie manages client + server (400+ instances). Server scope concern flagged immediately."},
{cid:"C4",d:"2024-11-22",a:"Vikram Singh",e:"James walked through 3 server problems. All out of scope. 'Why isn't Server covered?'"},
{cid:"C4",d:"2024-12-20",a:"Vikram Singh",e:"Robert: 'Server admin 5 stuck CSS tickets, client admin 3 resolved in days. Why?' CVP scope decision."},
{cid:"C4",d:"2025-01-10",a:"Vikram Singh",e:"Robert decided against renewal. Server:client ratio 3:1. Scope feedback to CVP — 3rd time."},
{cid:"C4",d:"2025-02-07",a:"Vikram Singh",e:"Closeout. Robert: 'Add Server, call us first.' Gap documented."},
{cid:"C5",d:"2024-12-06",a:"Maya Patel",e:"CISO Patricia Hawkins joined. Patch compliance concern. Monthly metrics requested. Handled well."},
{cid:"C5",d:"2025-01-06",a:"Maya Patel",e:"Credential Guard/Bloomberg resolved via cross-vendor coordination. 'CSS could never do this.'"},
{cid:"C5",d:"2025-02-21",a:"Maya Patel",e:"Gregory Walsh: 8 tickets, all resolved, 22-day avg. 'Quiet, competent, transparent.' Renewed."},
{cid:"C6",d:"2024-11-22",a:"Rohan Gupta",e:"Derek Kim had no idea CXE existed. 3 weeks stuck with CSS on WU issue. Pulled into CXE."},
{cid:"C6",d:"2024-12-06",a:"Rohan Gupta",e:"Derek's issue resolved 10 days vs 3wk CSS. Quick win. Office CXE advocating internally."},
{cid:"C6",d:"2024-12-20",a:"Rohan Gupta",e:"Derek tracking CSS vs CXE — 3x faster. Team using process without reminders."},
{cid:"C6",d:"2025-02-07",a:"Rohan Gupta",e:"Steven Park reviewed: 28-day avg vs 45-day CSS. 'Numbers speak for themselves.' Renewed."},
{cid:"C7",d:"2024-11-22",a:"Priya Sharma",e:"POS .NET issue resolved — serialization breaking change. Ryan impressed. Brian: 'CSS would take weeks.'"},
{cid:"C7",d:"2025-03-07",a:"Priya Sharma",e:"Helen Masters: 'Pilot de-risked our biggest tech transition.' Renewed."},
{cid:"C8",d:"2024-12-06",a:"Anita Desai",e:"No tickets. Jennifer: 'Datum is insurance — want access available when needed.'"},
{cid:"C8",d:"2025-02-07",a:"Anita Desai",e:"URGENT. Feb CU Wi-Fi failure — 3,200 field endpoints. Safety risk. Red button. CXE pulled in 2hr."},
{cid:"C8",d:"2025-02-21",a:"Anita Desai",e:"Lawrence Kim: PIR 4 days, P0 committed, 2,800 restored. 'Response in a different league.'"},
{cid:"C8",d:"2025-03-07",a:"Anita Desai",e:"Hotfix delivered. All restored. 'Went 3 quiet months, questioned the need. Feb answered that.' Renewed."}];

// Analytics
function compH(mo){const byC={};const f=mo==="all"?TIX:TIX.filter(t=>t.mo<=mo);
f.forEach(t=>{if(!byC[t.cid])byC[t.cid]=[];byC[t.cid].push(t)});
return CU.map(c=>{const ct=byC[c.id]||[];const op=ct.filter(t=>t.st.startsWith("Open")||(t.cm&&t.cm>mo)).length;
const sa=ct.filter(t=>t.sev==="Sev A").length;const ado=ct.filter(t=>t.disp.includes("ADO")).length;
const ac=ct.flatMap(t=>t.cxeA);const cc=ac.filter(a=>a.st==="Complete").length;
const vs=Math.max(0,20-op*2),ss=Math.max(0,20-sa*4),ds=Math.max(0,20-ado*2);
const cs=ac.length?Math.round((cc/ac.length)*20):20;const sn=Math.max(0,20-ct.filter(t=>t.age>90).length*4-sa*2);
const tot=vs+ss+ds+cs+sn;
return{...c,tix:ct,op,tot2:ct.length,sc:{v:vs,s:ss,d:ds,c:cs,sn,t:tot},risk:tot>=75?"healthy":tot>=50?"at-risk":"critical",tr:sn>=15?"Improving":sn>=8?"Stable":"Deteriorating",fl:{bl:ct.filter(t=>t.adoI.some(a=>a.blk)).length,a9:ct.filter(t=>t.age>90).length,un:ct.filter(t=>t.adoI.some(a=>!a.owner)).length,os:ct.filter(t=>t.oos).length}}}).sort((a,b)=>a.sc.t-b.sc.t)}

function compTr(){return MO.map(mo=>{const t=TIX.filter(x=>x.mo===mo);const cl=TIX.filter(x=>x.cm===mo);return{mo,lb:ML[mo],op:t.length,cl:cl.length,sa:t.filter(x=>x.sev==="Sev A").length,sb:t.filter(x=>x.sev==="Sev B").length,sc:t.filter(x=>x.sev==="Sev C").length,os:t.filter(x=>x.oos).length,avg:t.length?Math.round(t.reduce((s,x)=>s+x.age,0)/t.length):0}})}

function compPat(mo){const f=mo==="all"?TIX:TIX.filter(t=>t.mo<=mo);
const rs={};f.forEach(t=>{if(t.w5r){if(!rs[t.w5r])rs[t.w5r]=[];rs[t.w5r].push(t)}});
const cq=Object.entries(rs).filter(([,ts])=>new Set(ts.map(t=>t.q)).size>1&&ts.length>2).map(([s,ts])=>({rc:s,n:ts.length,qs:[...new Set(ts.map(t=>t.q))],ids:ts.map(t=>t.id)})).sort((a,b)=>b.n-a.n);
const dr=f.flatMap(t=>t.adoI).filter(a=>{const dl=Math.max(0,(new Date(a.commit)-new Date("2025-03-31"))/864e5);return a.pct<(dl<14?70:40)&&a.pct<100}).sort((a,b)=>a.pct-b.pct);
return{cq,dr}}

// UI Atoms
const Bd=({ch,co=C.ac,bg=C.acd,s={}})=><span style={{display:"inline-flex",alignItems:"center",padding:"2px 6px",borderRadius:3,fontSize:10,fontWeight:600,color:co,background:bg,whiteSpace:"nowrap",...s}}>{ch}</span>;
const SB=({s})=>{const m={"Sev A":[C.rd,C.rdd],"Sev B":[C.am,C.amd],"Sev C":[C.gn,C.gnd]};const[c,b]=m[s]||[C.ts,C.bd];return <Bd ch={s} co={c} bg={b}/>};
const Dt=({o})=><span style={{display:"inline-block",width:6,height:6,borderRadius:"50%",background:o?C.am:C.gn,boxShadow:`0 0 6px ${o?C.am:C.gn}44`,marginRight:5}}/>;
const Rg=({p,sz=30,sw=3,co=C.ac})=>{const r=(sz-sw)/2,ci=2*Math.PI*r,of=ci-(p/100)*ci;return <svg width={sz} height={sz} style={{transform:"rotate(-90deg)"}}><circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke={C.bd} strokeWidth={sw}/><circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke={co} strokeWidth={sw} strokeDasharray={ci} strokeDashoffset={of} strokeLinecap="round"/></svg>};
const MB=({v,mx=20,co})=><div style={{width:48,height:5,borderRadius:3,background:C.bd,overflow:"hidden"}}><div style={{width:`${(v/mx)*100}%`,height:"100%",borderRadius:3,background:co}}/></div>;
const Fl=({f})=>{const it=[];if(f.bl)it.push(`${f.bl} blocked`);if(f.a9)it.push(`${f.a9} aged 90+`);if(f.un)it.push(`${f.un} unassigned`);if(f.os)it.push(`${f.os} OOS`);if(!it.length)return null;return <div style={{fontSize:9,color:C.am,marginTop:4}}>⚠ {it.join(" · ")}</div>};
const BC=({data,h=140})=>{const mx=Math.max(...data.map(d=>d.v),1);return <div style={{display:"flex",alignItems:"flex-end",gap:2,height:h}}>{data.map((d,i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}><span style={{fontSize:8,color:C.tm,fontFamily:"monospace"}}>{d.v}</span><div style={{width:"100%",maxWidth:28,height:`${(d.v/mx)*(h-30)}px`,background:d.co||C.ac,borderRadius:"2px 2px 0 0",minHeight:1}}/><span style={{fontSize:7,color:C.tm,maxWidth:44,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.l}</span></div>)}</div>};
const MSel=({v,onChange})=><div style={{display:"flex",gap:1,background:C.bgC,borderRadius:4,padding:2,border:`1px solid ${C.bd}`}}><button onClick={()=>onChange("all")} style={{background:v==="all"?C.acd:"transparent",border:"none",color:v==="all"?C.ac:C.tm,padding:"3px 7px",borderRadius:3,fontSize:9,cursor:"pointer"}}>All</button>{MO.map(m=><button key={m} onClick={()=>onChange(m)} style={{background:v===m?C.acd:"transparent",border:"none",color:v===m?C.ac:C.tm,padding:"3px 7px",borderRadius:3,fontSize:9,cursor:"pointer",whiteSpace:"nowrap"}}>{ML[m]}</button>)}</div>;
const ss={background:C.bgC,border:`1px solid ${C.bd}`,color:C.tx,padding:"4px 6px",borderRadius:4,fontSize:10,outline:"none"};

function TicketsTab(){const[sel,setSel]=useState(null),[mo,setMo]=useState("all"),[fQ,setQ]=useState("All"),[fS,setS]=useState("All"),[fV,setV]=useState("All"),[fC,setC2]=useState("All"),[sr2,setSr]=useState("");
const f=useMemo(()=>TIX.filter(t=>(mo==="all"||t.mo===mo)&&(fQ==="All"||t.q===fQ)&&(fS==="All"||t.st.startsWith(fS))&&(fV==="All"||t.sev===fV)&&(fC==="All"||t.cust===fC)&&(!sr2||t.id.toLowerCase().includes(sr2.toLowerCase())||t.title.toLowerCase().includes(sr2.toLowerCase())||t.cust.toLowerCase().includes(sr2.toLowerCase()))),[mo,fQ,fS,fV,fC,sr2]);
return <div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,flexWrap:"wrap",gap:6}}><MSel v={mo} onChange={setMo}/><div style={{display:"flex",gap:8}}>{[{l:"Showing",v:f.length,c:C.ac},{l:"Open",v:f.filter(t=>t.st.startsWith("Open")).length,c:C.am},{l:"Sev A",v:f.filter(t=>t.sev==="Sev A").length,c:C.rd}].map((x,i)=><span key={i} style={{fontSize:10,color:C.ts}}>{x.l}: <span style={{color:x.c,fontWeight:600,fontFamily:"monospace"}}>{x.v}</span></span>)}</div></div>
<div style={{display:"flex",gap:4,marginBottom:8,flexWrap:"wrap"}}><input value={sr2} onChange={e=>setSr(e.target.value)} placeholder="Search..." style={{...ss,flex:"1 1 100px"}}/><select value={fC} onChange={e=>setC2(e.target.value)} style={ss}><option value="All">Customer</option>{CU.map(c=><option key={c.id} value={c.nm}>{c.nm}</option>)}</select><select value={fQ} onChange={e=>setQ(e.target.value)} style={ss}><option value="All">Queue</option>{QS.map(q=><option key={q} value={q}>{q}</option>)}</select><select value={fS} onChange={e=>setS(e.target.value)} style={ss}><option value="All">Status</option><option value="Open">Open</option><option value="Closed">Closed</option></select><select value={fV} onChange={e=>setV(e.target.value)} style={ss}><option value="All">Sev</option>{SVS.map(s=><option key={s} value={s}>{s}</option>)}</select></div>
<div style={{display:"flex",flexDirection:"column",gap:3}}>{f.slice(0,40).map(t=><div key={t.id} onClick={()=>setSel(sel?.id===t.id?null:t)} style={{background:sel?.id===t.id?C.bgH:C.bgC,border:`1px solid ${sel?.id===t.id?C.ac+"33":C.bd}`,borderRadius:5,padding:"7px 10px",cursor:"pointer"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:6,flexWrap:"wrap"}}><div style={{display:"flex",alignItems:"center",gap:6,flex:1,minWidth:160}}><Dt o={t.st.startsWith("Open")}/><span style={{fontFamily:"monospace",fontSize:10,color:C.ac}}>{t.id}</span><span style={{fontSize:11,color:C.tx,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.title}</span></div>
<div style={{display:"flex",gap:5,alignItems:"center"}}><SB s={t.sev}/><Bd ch={t.cust.split(" ")[0]} co={C.ts} bg={C.bd}/>{t.oos&&<Bd ch="OOS" co={C.or} bg={C.amd+"88"}/>}<span style={{fontSize:9,color:t.age>90?C.rd:t.age>45?C.am:C.tm,fontFamily:"monospace"}}>{t.age}d</span></div></div>
{sel?.id===t.id&&<div style={{marginTop:8,borderTop:`1px solid ${C.bd}`,paddingTop:8}}>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8,fontSize:10,color:C.ts,lineHeight:1.7}}>
<div>{[["Queue",t.q],["Status",t.st],["Opened",t.od],["TAM",t.tam],["Devices",t.dev?.toLocaleString()]].map(([k,v],i)=><div key={i}><span style={{color:C.tm}}>{k}:</span> {v}</div>)}</div>
<div>{[["CXE",t.cxe],["CFE",t.cfe||"—"],["Disposition",t.disp.split("→")[0]],["Root Cause",t.w5r||"—"]].map(([k,v],i)=><div key={i}><span style={{color:C.tm}}>{k}:</span> {v}</div>)}</div></div>
{t.adoI.length>0&&<div style={{marginBottom:6}}>{t.adoI.map(a=><div key={a.id} style={{background:C.bgS,border:`1px solid ${C.bd}`,borderRadius:4,padding:"5px 8px",marginBottom:2,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:4}}>
<div style={{display:"flex",alignItems:"center",gap:5}}><span style={{fontFamily:"monospace",fontSize:9,color:C.cy}}>{a.id}</span><Bd ch={a.pr} co={a.pr==="P0"?C.rd:a.pr==="P1"?C.am:C.ts} bg={a.pr==="P0"?C.rdd:a.pr==="P1"?C.amd:C.bd}/><span style={{fontSize:9,color:C.ts}}>{a.type}</span></div>
<div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:8,color:C.tm}}>CFE:</span><span style={{fontSize:9,color:C.ts,fontWeight:500}}>{a.owner}</span><span style={{fontSize:8,color:C.tm}}>Due:</span><span style={{fontSize:9,color:C.tm,fontFamily:"monospace"}}>{a.commit}</span><Rg p={a.pct} sz={18} sw={2} co={a.pct>=80?C.gn:C.rd}/><span style={{fontSize:9,fontFamily:"monospace",color:C.tm}}>{a.pct}%</span>{a.blk&&<Bd ch="BLK" co={C.rd} bg={C.rdd} s={{fontSize:8}}/>}</div></div>)}</div>}
{t.cxeA.length>0&&<div>{t.cxeA.map(a=><div key={a.id} style={{display:"flex",justifyContent:"space-between",padding:"3px 8px",background:C.bgS,borderRadius:3,marginBottom:1,fontSize:10}}>
<div style={{display:"flex",gap:4,alignItems:"center"}}><Bd ch={a.type} co={C.pu} bg={C.pud}/><span style={{color:C.ts}}>{a.desc}</span></div>
<Bd ch={a.st} co={a.st==="Complete"?C.gn:a.st==="In Progress"?C.am:C.tm} bg={a.st==="Complete"?C.gnd:C.bd}/></div>)}</div>}
</div>}</div>)}{f.length>40&&<div style={{textAlign:"center",padding:6,fontSize:9,color:C.tm}}>40 of {f.length}. Filter to narrow.</div>}</div></div>}

function BriefTab(){const[br,setBr]=useState(null),[ld,setLd]=useState(false);
const s=useMemo(()=>{const qd={},dd={};TIX.forEach(t=>{qd[t.q]=(qd[t.q]||0)+1;dd[t.disp]=(dd[t.disp]||0)+1});return{t:TIX.length,o:TIX.filter(t=>t.st.startsWith("Open")).length,sa:TIX.filter(t=>t.sev==="Sev A").length,ad:TIX.filter(t=>t.disp.includes("ADO")).length,bl:TIX.filter(t=>t.adoI.some(a=>a.blk)).length,os:TIX.filter(t=>t.oos).length,qd,dd}},[]);
const gen=async()=>{setLd(true);try{const r=await fetch("/api/claude",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:`You are VP of CX Engineering presenting the MCS4MW Windows Workload Pilot results.\n\nTERMINOLOGY: CXE = Customer Experience Engineering (works tickets, owns customer relationship). CFE = Customer Focused Engineering (the SWE org in Windows Servicing & Delivery that owns ADO items and delivers fixes). CSS = Customer Service & Support (frontline). CSAM = Customer Success Account Manager (Unified Support). ADO = Azure DevOps engineering backlog.\n\nPROGRAM: 5-month pilot (Nov 2024-Mar 2025), 8 enterprise customers from OED cohort, Windows 10/11 client scope only (no Server, no Intune).\n\nDATA:\n- Total escalations: ${s.t} | Open: ${s.o} | Sev A: ${s.sa}\n- ADO-owned defects: ${s.ad} | Blocked: ${s.bl} | Out of scope: ${s.os}\n- Queue distribution: ${JSON.stringify(s.qd)}\n- Disposition breakdown: ${JSON.stringify(s.dd)}\n\nRENEWAL OUTCOMES: 5 renewed MCS4MW, 1 shifted to MCS4Security (Intune-heavy), 1 churned (CFE P1 delivery slip eroded trust with new IT Director), 1 dropped (server scope gap - 3:1 server-to-client issue ratio made client-only coverage unjustifiable)\n\nWrite a polished executive brief with these 5 numbered sections. Use ## for section headers. Use **bold** for key metrics and emphasis. Use - for bullet points. Be specific with numbers.\n\n## 1. SITUATION SUMMARY\n2-3 sentences on program scope, scale, and overall outcome.\n\n## 2. TOP THEMES WITH DISPOSITIONS\n3 themes with ticket counts, root cause patterns, and disposition breakdowns. Reference specific queue patterns.\n\n## 3. ENGINEERING DELIVERY STATUS\nADO backlog health, blocked items, CFE (Customer Focused Engineering) velocity, and the Northwind P1 slip lesson.\n\n## 4. CUSTOMER RETENTION ANALYSIS\nBreak down the 4 renewal outcomes with what drove each decision. Be specific.\n\n## 5. RECOMMENDED ACTIONS FOR GA\n4 concrete actions with clear owners (CXE leadership, CFE leadership, Program Office, CSAM team).`}]})});const d=await r.json();setBr(d.content?.map(b=>b.text||"").join("\n"))}catch{setBr(`## 1. SITUATION SUMMARY\n\nThe MCS4MW Windows Workload Pilot tracked **${s.t} escalations** across **8 enterprise customers** over 5 months (Nov 2024 - Mar 2025). The pilot achieved **62.5% MCS4MW renewal** with **75% retained within the broader MCS portfolio**. **${s.o} tickets remain open** with **${s.sa} Sev A** incidents tracked.\n\n## 2. TOP THEMES WITH DISPOSITIONS\n\n**Theme 1: Windows Servicing Regressions** \u2014 Cumulative update and feature update conflicts drove the highest queue volume. OEM driver compatibility gaps were the primary root cause pattern, with dispositions split between ADO Backlog and OEM Owner.\n\n**Theme 2: Scope Boundary Friction** \u2014 **${s.os} tickets** were out of scope (Windows Server or Intune). Adventure Works\u2019 server-to-client ratio of 3:1 made the client-only scope commercially unviable. Fabrikam\u2019s Intune-heavy workload was a better fit for MCS4Security.\n\n**Theme 3: ADO Delivery Dependency** \u2014 **${s.ad} tickets** dispositioned to Microsoft-owned ADO backlog. **${s.bl} items currently blocked** on external dependencies, constraining CFE delivery velocity.\n\n## 3. ENGINEERING DELIVERY STATUS\n\n**${s.ad} ADO items** created during the pilot. **${s.bl} remain blocked**, primarily on external team dependencies and design review cycles. The critical lesson: Northwind\u2019s P1 GPO regression slipped twice (January and February CU), directly causing their non-renewal. CXE engineering execution was strong, but **CFE commit date reliability is the single biggest factor in customer retention**.\n\n## 4. CUSTOMER RETENTION ANALYSIS\n\n- **5 Renewed** \u2014 Contoso (critical bug win), Woodgrove (CISO engagement), Litware (adoption journey), Tailspin (.NET migration de-risk), Datum (Month 4 incident proved insurance model)\n- **1 Shifted to MCS4Security** \u2014 Fabrikam. Intune-rooted issues dominated. Clean handoff, customer satisfied with redirection.\n- **1 Churned** \u2014 Northwind. New IT Director had no OED context. CFE P1 delivery slip was the trigger. CXE executed well but could not control CFE timelines.\n- **1 Dropped** \u2014 Adventure Works. Server scope gap. Their infrastructure is 3:1 server-to-client. Client-only MCS4MW was commercially unjustifiable. CVP scope feedback escalated 3x, not acted upon.\n\n## 5. RECOMMENDED ACTIONS FOR GA\n\n1. **CFE Commit Accountability** (CFE Leadership) \u2014 P1 slippage on customer-visible items must trigger exec-level review within 48 hours. The Northwind loss was preventable.\n2. **Scope Documentation at Onboarding** (Program Office) \u2014 Client vs Server vs Intune boundaries must be explicit from Day 1. Adventure Works should never have reached Month 3 before understanding the limitation.\n3. **MCS4Security Cross-Sell Motion** (CSAM Team) \u2014 Fabrikam pattern will repeat at scale. Build a qualification checklist for Intune-heavy customers and route them to MCS4Security proactively.\n4. **Server Scope Decision Escalation** (CXE Leadership) \u2014 Field intelligence from 3 CXE PMs and multiple CSAMs consistently flagged the server gap. Document the revenue impact for the GA readiness review.`)}setLd(false)};
const bld=t=>{const p=t.split(/\*\*(.*?)\*\*/);return p.map((x,j)=>j%2===1?<strong key={j} style={{color:C.tx}}>{x}</strong>:<span key={j}>{x}</span>)};
const rM=t=>t.split("\n").map((l,i)=>{if(l.startsWith("## "))return <h3 key={i} style={{color:"#e5a63a",fontSize:15,fontWeight:700,margin:"20px 0 8px",paddingBottom:6,borderBottom:"1px solid #e5a63a33",letterSpacing:"0.04em",textTransform:"uppercase"}}>{l.replace(/^## \d*\.?\s*/,"").replace(/^#+\s*/,"")}</h3>;if(l.startsWith("### "))return <h4 key={i} style={{color:"#e5a63a",fontSize:13,fontWeight:600,margin:"14px 0 5px"}}>{bld(l.replace("### ",""))}</h4>;if(l.startsWith("- **")||l.startsWith("- ")){const c=l.replace(/^- /,"");return <div key={i} style={{display:"flex",gap:8,margin:"4px 0",padding:"6px 10px",background:"#0d1117",borderRadius:4,borderLeft:"2px solid #e5a63a44",fontSize:12,color:C.ts,lineHeight:1.6}}><span style={{color:"#e5a63a",flexShrink:0}}>\u25B8</span><span>{bld(c)}</span></div>}if(l.match(/^\d+\./)){const c=l.replace(/^\d+\.\s*/,"");const n=l.match(/^\d+/)[0];return <div key={i} style={{display:"flex",gap:8,margin:"4px 0",padding:"6px 10px",background:"#0d1117",borderRadius:4,borderLeft:"2px solid "+C.ac+"44",fontSize:12,color:C.ts,lineHeight:1.6}}><span style={{color:C.ac,fontWeight:700,fontFamily:"monospace",flexShrink:0}}>{n}.</span><span>{bld(c)}</span></div>}if(l.startsWith("**")&&l.endsWith("**"))return <div key={i} style={{fontSize:13,fontWeight:600,color:C.tx,margin:"10px 0 4px"}}>{l.replace(/\*\*/g,"")}</div>;if(!l.trim())return <div key={i} style={{height:8}}/>;return <p key={i} style={{fontSize:12,color:C.ts,lineHeight:1.65,margin:"3px 0"}}>{bld(l)}</p>});
return <div>
<div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:12}}>{[{l:"Total",v:s.t,c:C.ac},{l:"Open",v:s.o,c:C.am},{l:"Sev A",v:s.sa,c:C.rd},{l:"OOS",v:s.os,c:C.or}].map((x,i)=><div key={i} style={{background:C.bgC,border:`1px solid ${C.bd}`,borderRadius:6,padding:8}}><div style={{fontSize:8,color:C.tm,textTransform:"uppercase"}}>{x.l}</div><div style={{fontSize:20,fontWeight:700,color:x.c,fontFamily:"monospace"}}>{x.v}</div></div>)}</div>
<button onClick={gen} disabled={ld} style={{background:ld?C.bd:`linear-gradient(135deg,${C.acd},${C.pud})`,border:`1px solid ${C.ac}33`,color:C.tx,padding:"6px 12px",borderRadius:5,fontSize:11,fontWeight:600,cursor:ld?"wait":"pointer",marginBottom:12}}>✦ {ld?"Generating...":"Generate Brief"}</button>
{br&&<div style={{background:C.bgC,border:`1px solid ${C.bd}`,borderRadius:8,padding:20,borderLeft:"3px solid #e5a63a"}}><div style={{fontSize:9,color:C.tm,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:4}}>Executive Escalation Brief \u00b7 {s.t} Tickets \u00b7 Full PIR Analysis</div><div style={{fontSize:18,fontWeight:700,color:C.tx,marginBottom:4}}>MCS4MW Windows Pilot: Program Review</div><div style={{fontSize:11,color:C.ts,marginBottom:2}}><strong style={{color:C.tx}}>Prepared for:</strong> VP of Modern Work Engineering</div><div style={{fontSize:11,color:C.ts,marginBottom:12}}><strong style={{color:C.tx}}>Analysis Period:</strong> November 2024 \u2014 March 2025 \u00b7 8 Enterprise Customers</div><div style={{borderTop:`1px solid ${C.bd}`,paddingTop:12}}>{rM(br)}</div></div>}</div>}

function TrendsTab(){const tr=useMemo(compTr,[]);const mx=Math.max(...tr.map(t=>Math.max(t.op,t.cl)),1);
const[view,setView]=useState("sprint");
// Compute sprint data from tickets
const sprints=useMemo(()=>{const start=new Date("2024-11-01");return Array.from({length:10},(_,i)=>{
const ss=new Date(start.getTime()+i*14*864e5);const se=new Date(ss.getTime()+13*864e5);
const lb=`Sprint ${i+1}`;const dt=ss.toLocaleDateString("en-US",{day:"2-digit",month:"short",year:"2-digit"});
const adoInSprint=TIX.flatMap(t=>t.adoI).filter(a=>{const d=new Date(a.commit);return d>=ss&&d<=se});
const cxeInSprint=TIX.flatMap(t=>t.cxeA).filter(a=>a.completedDate&&new Date(a.completedDate)>=ss&&new Date(a.completedDate)<=se);
const tixInSprint=TIX.filter(t=>{const d=new Date(t.od);return d>=ss&&d<=se});
const closedInSprint=TIX.filter(t=>t.cd&&new Date(t.cd)>=ss&&new Date(t.cd)<=se);
return{lb,dt,ado:adoInSprint,cxe:cxeInSprint,opened:tixInSprint.length,closed:closedInSprint.length,adoCount:adoInSprint.length,cxeCount:cxeInSprint.length}}).filter(s=>s.opened>0||s.closed>0||s.adoCount>0)},[]);
const prC={"P0":C.rd,"P1":C.am,"P2":C.ac,"P3":C.ts};
// Disposition breakdown
const dd=useMemo(()=>{const d={};TIX.forEach(t=>{const k=t.disp.split("\u2192")[0].split("\u2014")[0].trim();d[k]=(d[k]||0)+1});return Object.entries(d).sort((a,b)=>b[1]-a[1])},[]);
const ddMx=Math.max(...dd.map(d=>d[1]),1);
const adoPast=TIX.flatMap(t=>t.adoI).filter(a=>new Date(a.commit)<new Date("2025-03-31")&&a.pct<100);
return <div>
{/* Slippage alert */}
{adoPast.length>0&&<div style={{background:C.amd+"44",border:`1px solid ${C.am}33`,borderRadius:6,padding:"8px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
<span style={{fontSize:14}}>{"\ud83d\udcc5"}</span>
<span style={{fontSize:11,color:C.am}}><strong>{adoPast.length} ADO items past commit date</strong> {"\u2014"} {adoPast.slice(0,3).map(a=>`${a.id} (${a.pct}% complete)`).join(", ")}</span></div>}
{/* View toggle + header */}
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
<div style={{display:"flex",gap:4}}>{["sprint","burndown"].map(v=>
<button key={v} onClick={()=>setView(v)} style={{padding:"5px 14px",borderRadius:4,border:`1px solid ${view===v?"#e5a63a33":C.bd}`,background:view===v?"#e5a63a18":"transparent",color:view===v?"#e5a63a":C.tm,fontSize:10,fontWeight:600,cursor:"pointer",textTransform:"uppercase",letterSpacing:"0.04em"}}>{v==="sprint"?"Sprint View":"Burndown"}</button>)}</div>
<span style={{fontSize:9,color:C.tm}}>Program start: Nov 2024 {"\u00b7"} Biweekly sprints</span></div>
{view==="burndown"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
{/* Burndown chart */}
<div style={{background:C.bgC,border:`1px solid ${C.bd}`,borderRadius:8,padding:14}}>
<div style={{fontSize:9,color:C.tm,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>Burndown {"\u2014"} Open vs Closed per Sprint</div>
<div style={{display:"flex",alignItems:"flex-end",gap:4,height:140}}>
{sprints.map((s,i)=>{const omx=Math.max(...sprints.map(x=>Math.max(x.opened,x.closed)),1);
return <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
<div style={{display:"flex",gap:1,alignItems:"flex-end",height:110}}>
<div style={{width:12,height:(s.closed/omx)*95,background:C.gn+"cc",borderRadius:"2px 2px 0 0"}}/>
<div style={{width:12,height:(s.opened/omx)*95,background:C.rd+"88",borderRadius:"2px 2px 0 0"}}/></div>
<span style={{fontSize:7,color:C.tm}}>{s.lb.replace("Sprint ","S")}</span></div>})}
</div>
<div style={{display:"flex",gap:8,marginTop:6,justifyContent:"center"}}>
<span style={{fontSize:8,color:C.tm}}><span style={{display:"inline-block",width:6,height:6,background:C.gn+"cc",borderRadius:1,marginRight:2}}/>Closed</span>
<span style={{fontSize:8,color:C.tm}}><span style={{display:"inline-block",width:6,height:6,background:C.rd+"88",borderRadius:1,marginRight:2}}/>Open</span></div></div>
{/* Disposition distribution */}
<div style={{background:C.bgC,border:`1px solid ${C.bd}`,borderRadius:8,padding:14}}>
<div style={{fontSize:9,color:C.tm,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>Disposition Distribution by Sprint</div>
{dd.map(([k,v],i)=>{const icons=["\u25cb","\u2192","\u00d7","\u25b3","\u25c6"];const cols=[C.ts,C.am,C.or,C.am,C.rd];
return <div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
<span style={{fontSize:10,color:cols[i]||C.ts,minWidth:100}}>{icons[i]||"\u25c6"} {k}</span>
<div style={{flex:1,height:8,borderRadius:4,background:C.bd,overflow:"hidden"}}>
<div style={{height:"100%",borderRadius:4,background:cols[i]||C.ts,width:`${(v/ddMx)*100}%`}}/></div>
<span style={{fontSize:11,fontWeight:700,color:cols[i]||C.ts,fontFamily:"monospace",minWidth:24,textAlign:"right"}}>{v}</span></div>})}
<div style={{fontSize:9,color:C.tm,marginTop:6}}>{TIX.filter(t=>t.disp.includes("ADO")).length} Microsoft-owned defects {"\u00b7"} {TIX.filter(t=>t.oos).length} outside scope</div></div></div>}
{/* Sprint swimlane view */}
{view==="sprint"&&<div>
{/* Sprint header row */}
<div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:12}}>
{sprints.map((s,i)=><div key={i} style={{minWidth:160,flex:"0 0 160px"}}>
<div style={{background:C.bgC,border:`1px solid ${C.bd}`,borderRadius:6,padding:10,marginBottom:8,textAlign:"center"}}>
<div style={{fontSize:12,fontWeight:700,color:C.tx}}>{s.lb}</div>
<div style={{fontSize:9,color:C.tm}}>{s.dt}</div>
<div style={{fontSize:9,color:C.ts,marginTop:4}}>{s.adoCount} ADO {"\u00b7"} {s.cxeCount} CXE</div></div>
{/* ADO cards in this sprint */}
{s.ado.slice(0,4).map((a,j)=><div key={j} style={{background:C.bgC,border:`1px solid ${C.bd}`,borderRadius:5,padding:8,marginBottom:4,borderLeft:`3px solid ${prC[a.pr]||C.ts}`}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
<span style={{fontFamily:"monospace",fontSize:9,color:prC[a.pr]||C.ts,fontWeight:600}}>{a.id}{"\u00b7"}{a.pr}</span>
<Rg p={a.pct} sz={18} sw={2} co={a.pct>=80?C.gn:a.pct>=40?C.am:C.rd}/></div>
<div style={{fontSize:9,color:C.ts,lineHeight:1.4}}>{a.type}</div>
<div style={{fontSize:8,color:C.tm,marginTop:3}}>CFE: {a.owner||"Unassigned"}</div>
{a.blk&&<div style={{fontSize:8,color:C.rd,marginTop:2}}>{"\u26a0"} {a.blk}</div>}
</div>)}
{s.ado.length>4&&<div style={{fontSize:8,color:C.tm,textAlign:"center"}}>+{s.ado.length-4} more</div>}
</div>)}</div></div>}
{/* Monthly summary cards */}
<div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6,marginTop:12}}>
{tr.map((t,i)=><div key={i} style={{background:C.bgC,border:`1px solid ${C.bd}`,borderRadius:6,padding:8}}>
<div style={{fontSize:11,fontWeight:600,color:C.tx,marginBottom:3}}>{t.lb}</div>
<div style={{fontSize:9,color:C.ts,lineHeight:1.7}}>
<div>Opened: <span style={{color:C.ac,fontFamily:"monospace"}}>{t.op}</span></div>
<div>Closed: <span style={{color:C.gn,fontFamily:"monospace"}}>{t.cl}</span></div>
<div>Sev A: <span style={{color:C.rd,fontFamily:"monospace"}}>{t.sa}</span></div>
<div>Avg: <span style={{color:C.pu,fontFamily:"monospace"}}>{t.avg}d</span></div></div></div>)}</div>
</div>}

function HealthTab(){const[mo,setMo]=useState("all");const cs=useMemo(()=>compH(mo),[mo]);
const oc={renewed:C.gn,shifted:C.cy,churned:C.rd,dropped:C.or};
const crit=cs.filter(c=>c.risk==="critical").length,atr=cs.filter(c=>c.risk==="at-risk").length,hlt=cs.filter(c=>c.risk==="healthy").length;
const latestCrm=(cid)=>{const e=CRM.filter(x=>x.cid===cid).sort((a,b)=>new Date(b.d)-new Date(a.d));return e[0]||null};
return <div>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
<div style={{display:"flex",gap:8}}>
{[{l:"CRITICAL",v:crit,c:C.rd,bg:C.rdd},{l:"AT RISK",v:atr,c:C.am,bg:C.amd},{l:"HEALTHY",v:hlt,c:C.gn,bg:C.gnd}].map((x,i)=>
<div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",borderRadius:20,background:x.bg,border:`1px solid ${x.c}33`}}>
<span style={{fontSize:16,fontWeight:800,color:x.c}}>{x.v}</span>
<span style={{fontSize:10,fontWeight:700,color:x.c,letterSpacing:"0.06em"}}>{x.l}</span></div>)}</div>
<MSel v={mo} onChange={setMo}/></div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:12}}>
{cs.map(c=>{const crm=latestCrm(c.id);const trC=c.tr==="Deteriorating"?C.rd:c.tr==="Improving"?C.gn:C.am;const trL=c.tr==="Deteriorating"?"\u2193 DETERIORATING":c.tr==="Improving"?"\u2191 IMPROVING":"\u2192 STABLE";
return <div key={c.id} style={{background:C.bgC,border:`1px solid ${C.bd}`,borderRadius:10,padding:0,overflow:"hidden"}}>
{/* Header */}
<div style={{padding:"14px 16px 10px",borderBottom:`1px solid ${C.bd}`}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
<div><div style={{fontSize:15,fontWeight:700,color:C.tx}}>{c.nm}</div>
<div style={{fontSize:10,color:C.ts,marginTop:2}}>{c.tot2} tickets {"\u00b7"} {c.tix.filter(t=>t.sev==="Sev A").length} critical</div></div>
<div style={{textAlign:"right"}}><div style={{fontSize:36,fontWeight:800,color:RK[c.risk],fontFamily:"monospace",lineHeight:1}}>{c.sc.t}</div>
<div style={{fontSize:10,color:C.tm}}>/100</div></div></div>
<div style={{display:"flex",gap:6,marginTop:8}}>
<div style={{padding:"4px 10px",borderRadius:4,background:c.risk==="critical"?C.rdd:c.risk==="at-risk"?C.amd:C.gnd,border:`1px solid ${RK[c.risk]}33`}}>
<span style={{fontSize:10,fontWeight:700,color:RK[c.risk],letterSpacing:"0.04em"}}>{c.risk.toUpperCase()}</span></div>
<Bd ch={c.out} co={oc[c.out]||C.ts} bg={C.bd}/></div></div>
{/* Score bars */}
<div style={{padding:"12px 16px"}}>
{[{l:"Ticket Velocity",v:c.sc.v,co:C.ac},{l:"Severity Concentration",v:c.sc.s,co:C.rd},{l:"Disposition Pattern",v:c.sc.d,co:C.am},{l:"CXE Completion Rate",v:c.sc.c,co:C.pu},{l:"Customer Sentiment",v:c.sc.sn,co:C.cy}].map((s,i)=>
<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
<span style={{fontSize:11,color:C.ts,flex:1}}>{s.l}</span>
<div style={{display:"flex",alignItems:"center",gap:8}}>
<div style={{width:80,height:6,borderRadius:3,background:C.bd,overflow:"hidden"}}>
<div style={{height:"100%",borderRadius:3,background:s.co,width:`${(s.v/20)*100}%`}}/></div>
<span style={{fontSize:12,fontWeight:700,color:s.v>=15?C.gn:s.v>=8?C.am:C.rd,fontFamily:"monospace",minWidth:32,textAlign:"right"}}>{s.v}/20</span></div></div>)}</div>
{/* CRM Verbatim — latest entry */}
{crm&&<div style={{padding:"0 16px 12px"}}>
<div style={{background:C.bgS,borderRadius:6,padding:10,borderLeft:`3px solid ${trC}`}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
<span style={{fontSize:10,fontWeight:700,color:trC}}>{trL}</span>
<span style={{fontSize:9,color:C.tm}}>{crm.d}</span></div>
<div style={{fontSize:11,color:C.ts,lineHeight:1.55,fontStyle:"italic"}}>"{crm.e}"</div>
<div style={{fontSize:9,color:C.tm,marginTop:4}}>CXE PM: {crm.a}</div></div></div>}
{/* Risk flags */}
<div style={{padding:"0 16px 12px",display:"flex",flexWrap:"wrap",gap:6}}>
{c.fl.bl>0&&<span style={{fontSize:9,padding:"3px 8px",borderRadius:3,background:C.rdd,color:C.rd,display:"flex",alignItems:"center",gap:3}}>{"\u26a0"} {c.fl.bl} blocked on engineering</span>}
{c.fl.a9>0&&<span style={{fontSize:9,padding:"3px 8px",borderRadius:3,background:C.amd,color:C.am,display:"flex",alignItems:"center",gap:3}}>{"\u25cf"} {c.fl.a9} tickets 90+ days</span>}
{c.fl.un>0&&<span style={{fontSize:9,padding:"3px 8px",borderRadius:3,background:C.pud,color:C.pu,display:"flex",alignItems:"center",gap:3}}>{"\u2699"} {c.fl.un} ADO unassigned</span>}
{c.fl.os>0&&<span style={{fontSize:9,padding:"3px 8px",borderRadius:3,background:C.amd+"88",color:C.or,display:"flex",alignItems:"center",gap:3}}>{"\u25cf"} {c.fl.os} out of scope</span>}
</div>
<div style={{padding:"0 16px 10px",fontSize:9,color:C.tm}}>{c.ind} {"\u00b7"} {c.tier} {"\u00b7"} {c.cv} {"\u00b7"} {c.fl.toLocaleString?c.fl+"":"0"} {"\u00b7"} CSAM: {c.csam} {"\u00b7"} PM: {c.pm}</div>
</div>})}</div></div>}

function CrmTab(){const[sc,setSc]=useState("all"),[sm,setSm]=useState("all");
const ent=useMemo(()=>{let a=CRM.slice();if(sc!=="all")a=a.filter(e=>e.cid===sc);if(sm!=="all")a=a.filter(e=>e.d.startsWith(sm));return a.sort((a,b)=>new Date(b.d)-new Date(a.d))},[sc,sm]);
const oc={renewed:C.gn,shifted:C.cy,churned:C.rd,dropped:C.or};
return <div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,flexWrap:"wrap",gap:6}}>
<div><div style={{fontSize:8,color:C.tm,textTransform:"uppercase"}}>CRM Verbatim — CXE PM Notes</div></div>
<div style={{display:"flex",gap:4}}><select value={sc} onChange={e=>setSc(e.target.value)} style={ss}><option value="all">All Customers</option>{CU.map(c=><option key={c.id} value={c.id}>{c.nm}</option>)}</select><MSel v={sm} onChange={setSm}/></div></div>
<div style={{display:"flex",flexDirection:"column",gap:5}}>{ent.map((e,i)=>{const cu=CM[e.cid];return <div key={i} style={{background:C.bgC,border:`1px solid ${C.bd}`,borderRadius:5,padding:10,borderLeft:`3px solid ${oc[cu?.out]||C.ts}`}}>
<div style={{display:"flex",alignItems:"center",gap:5,marginBottom:5}}><span style={{fontFamily:"monospace",fontSize:10,color:C.ac}}>{e.d}</span><Bd ch={cu?.nm} co={oc[cu?.out]||C.ts} bg={C.bd}/><span style={{fontSize:9,color:C.tm}}>by {e.a}</span></div>
<div style={{fontSize:11,color:C.ts,lineHeight:1.6}}>{e.e}</div></div>})}{!ent.length&&<div style={{textAlign:"center",padding:16,color:C.tm,fontSize:11}}>No entries.</div>}</div></div>}

function IntelTab(){const[mo,setMo]=useState("all");const p=useMemo(()=>compPat(mo),[mo]);
return <div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,flexWrap:"wrap",gap:6}}><span style={{fontSize:8,color:C.tm,textTransform:"uppercase"}}>Pattern Intelligence</span><MSel v={mo} onChange={setMo}/></div>
<div style={{background:C.bgC,border:`1px solid ${C.bd}`,borderRadius:6,padding:12,marginBottom:8}}>
<div style={{display:"flex",alignItems:"center",gap:5,marginBottom:6}}><span>🔗</span><span style={{fontSize:11,fontWeight:600,color:C.tx}}>Cross-Queue Clusters</span><Bd ch={`${p.cq.length}`} co={C.rd} bg={C.rdd}/></div>
{!p.cq.length?<div style={{fontSize:10,color:C.tm}}>None</div>:p.cq.slice(0,5).map((x,i)=><div key={i} style={{background:C.bgS,border:`1px solid ${C.bd}`,borderRadius:4,padding:7,marginBottom:3}}>
<div style={{fontSize:10,color:C.am,fontWeight:600,marginBottom:2}}>{x.rc}</div>
<div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:2}}>{x.qs.map(q=><Bd key={q} ch={q} co={C.cy} bg={C.acd}/>)}</div>
<div style={{fontSize:9,color:C.tm}}>{x.n} tickets</div></div>)}</div>
<div style={{background:C.bgC,border:`1px solid ${C.bd}`,borderRadius:6,padding:12}}>
<div style={{display:"flex",alignItems:"center",gap:5,marginBottom:6}}><span>⚡</span><span style={{fontSize:11,fontWeight:600,color:C.tx}}>ADO Delivery Risk</span><Bd ch={`${p.dr.length}`} co={C.am} bg={C.amd}/></div>
{p.dr.slice(0,8).map((a,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"4px 8px",background:C.bgS,borderRadius:3,marginBottom:2,fontSize:10}}>
<div style={{display:"flex",alignItems:"center",gap:4}}><span style={{fontFamily:"monospace",fontSize:9,color:C.cy}}>{a.id}</span><Bd ch={a.pr} co={a.pr==="P0"?C.rd:C.am} bg={a.pr==="P0"?C.rdd:C.amd}/></div>
<div style={{display:"flex",alignItems:"center",gap:5}}><Rg p={a.pct} sz={16} sw={2} co={C.rd}/><span style={{fontSize:9,color:C.rd,fontFamily:"monospace"}}>{a.pct}%</span>{a.blk&&<Bd ch="BLK" co={C.rd} bg={C.rdd} s={{fontSize:7}}/>}</div></div>)}</div></div>}

function AskTab(){const[ms,setMs]=useState([]),[inp,setInp]=useState(""),[ld,setLd]=useState(false);
const SG=["I'm meeting Contoso leadership next week, what should I expect them to ask?","Give me a QBR prep for Northwind \u2014 what went wrong and how do I frame it?","Which customers should I prioritize for renewal conversations this month?","What are the top 3 systemic issues I should raise with CFE leadership?","How do I make the case to include Server in GA scope?","Summarize the pilot outcomes for my VP in 5 bullet points","Compare Contoso and Datum arcs \u2014 what do they teach us?","What questions will my CVP ask about the 62.5% renewal rate?"];
const send=async t=>{const nm={role:"user",content:t};const um=[...ms,nm];setMs(um);setInp("");setLd(true);
const ctx=TIX.slice(0,80).map(t=>`${t.id}|${t.mo}|${t.q}|${t.sev}|${t.st}|${t.cust}|${t.age}d|CXE:${t.cxe}|${t.disp}|OOS:${t.oos}|ADO:${t.adoI.map(a=>a.pr+"/"+a.pct+"%/CFE:"+((a.owner)||"UNASSIGNED")+"/Due:"+a.commit+(a.blk?"/BLOCKED:"+a.blk:"")).join(";")}`).join("\n");
const crmCtx=CRM.slice(0,20).map(e=>`${e.d}|${CM[e.cid]?.nm}|${e.a}|${e.e.substring(0,120)}`).join("\n");
try{const r=await fetch("/api/claude",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:`You are an expert CX Engineering strategy advisor for the MCS4MW Windows Workload Pilot program.\n\nCRITICAL TERMINOLOGY (never interchange these):\n- CXE = Customer Experience Engineering. CXE Engineers work escalation tickets. CXE PMs own the customer relationship.\n- CFE = Customer Focused Engineering. This is the SWE (Software Engineering) org within Windows Servicing & Delivery. CFE engineers own all ADO work items and deliver engineering fixes. Every ADO item has a named CFE engineer as owner.\n- CSS = Customer Service & Support. Frontline support. When a customer presses the red button, CSS steps aside and CXE takes over.\n- CSAM = Customer Success Account Manager. Owns the Unified Support relationship across all product lines.\n- ADO = Azure DevOps. Engineering backlog items (bugs, features, tasks) owned by named CFE engineers with commit dates.\n\nPROGRAM CONTEXT:\n- 5-month pilot (Nov 2024 - Mar 2025), 8 enterprise customers from OED (Office Engineering Direct) cohort\n- Scope: Windows 10/11 client only (no Windows Server, no Intune/Endpoint Manager)\n- Windows Server falls under Azure org. Intune falls under MCS4Security.\n- Renewal outcomes: Contoso(renewed-advocate), Fabrikam(shifted to MCS4Security), Northwind(churned-CFE P1 delivery slip + new IT Director), Adventure Works(dropped-server scope gap), Woodgrove/Litware/Tailspin/Datum(renewed)\n- Key relationship: Each customer has a named CSAM (Unified Support) and a named CXE PM (MCS4MW program). They run bi-weekly check-ins together with the customer.\n\nRESPONSE FORMAT:\nStructure responses for maximum actionability. Use:\n- ### section headers for organized topics\n- **bold** for key names, metrics, and emphasis\n- Numbered lists for prioritized actions\n- Bullet points with - for supporting details\n- When preparing someone for a meeting, include:\n  - Key Questions to Prepare For (with Prep: notes under each)\n  - Recommended Talking Points (prefix with \u2705 for positive points, \u26a0\ufe0f for risk points)\n- When analyzing data, cite specific ticket IDs, customer names, and numbers\n- End strategic responses with a clear "Bottom Line" or "Key Takeaway"\n\nTICKET DATA:\n${ctx}\n\nCRM VERBATIM (CXE PM bi-weekly check-in notes):\n${crmCtx}`,messages:um.map(m=>({role:m.role,content:m.content}))})});const d=await r.json();setMs([...um,{role:"assistant",content:d.content?.map(b=>b.text||"").join("\n")||"Error"}])}
catch{setMs([...um,{role:"assistant",content:"**API not reachable** in artifact. Deployed version uses Vercel serverless proxy."}])}setLd(false)};
const bld=t=>{const p=t.split(/\*\*(.*?)\*\*/);return p.map((x,j)=>j%2===1?<strong key={j} style={{color:C.tx}}>{x}</strong>:<span key={j}>{x}</span>)};
const rM=t=>t.split("\n").map((l,i)=>{
if(l.startsWith("### "))return <h4 key={i} style={{color:"#e5a63a",fontSize:13,fontWeight:700,margin:"14px 0 6px",paddingBottom:4,borderBottom:"1px solid #e5a63a22"}}>{bld(l.replace("### ",""))}</h4>;
if(l.startsWith("## "))return <h3 key={i} style={{color:"#e5a63a",fontSize:14,fontWeight:700,margin:"16px 0 6px",paddingBottom:5,borderBottom:"1px solid #e5a63a33"}}>{bld(l.replace("## ",""))}</h3>;
if(l.startsWith("\u2705 ")||l.startsWith("✅ "))return <div key={i} style={{display:"flex",gap:6,margin:"3px 0",padding:"5px 8px",background:C.gnd+"66",borderRadius:4,borderLeft:"2px solid "+C.gn+"66",fontSize:11,color:C.gn,lineHeight:1.5}}><span style={{flexShrink:0}}>\u2705</span><span style={{color:C.ts}}>{bld(l.replace(/^[\u2705✅]\s*/,""))}</span></div>;
if(l.startsWith("\u26a0\ufe0f ")||l.startsWith("⚠️ "))return <div key={i} style={{display:"flex",gap:6,margin:"3px 0",padding:"5px 8px",background:C.amd+"44",borderRadius:4,borderLeft:"2px solid "+C.am+"66",fontSize:11,color:C.am,lineHeight:1.5}}><span style={{flexShrink:0}}>\u26a0\ufe0f</span><span style={{color:C.ts}}>{bld(l.replace(/^[\u26a0\ufe0f⚠️]\s*/,""))}</span></div>;
if(l.startsWith("- *Prep:")||l.startsWith("- Prep:"))return <div key={i} style={{margin:"1px 0 1px 20px",padding:"3px 8px",background:"#0d1117",borderRadius:3,fontSize:10,color:C.ts,fontStyle:"italic",lineHeight:1.5,borderLeft:"2px solid "+C.ac+"33"}}>{bld(l.replace(/^- \*?Prep:\*?\s*/,""))}</div>;
if(l.startsWith("- **")||l.startsWith("- ")){const c=l.replace(/^- /,"");return <div key={i} style={{display:"flex",gap:6,margin:"2px 0",padding:"4px 8px",fontSize:11,color:C.ts,lineHeight:1.5}}><span style={{color:C.ac,flexShrink:0}}>\u25B8</span><span>{bld(c)}</span></div>}
if(l.match(/^\d+\./)){const c=l.replace(/^\d+\.\s*/,"");const n=l.match(/^\d+/)[0];return <div key={i} style={{display:"flex",gap:6,margin:"3px 0",padding:"5px 8px",background:"#0d1117",borderRadius:4,borderLeft:"2px solid "+C.ac+"44",fontSize:11,color:C.ts,lineHeight:1.5}}><span style={{color:C.ac,fontWeight:700,fontFamily:"monospace",flexShrink:0}}>{n}.</span><span>{bld(c)}</span></div>}
if(l.startsWith("**")&&(l.endsWith("**")||l.endsWith(":**")))return <div key={i} style={{fontSize:12,fontWeight:600,color:C.tx,margin:"10px 0 4px"}}>{l.replace(/\*\*/g,"")}</div>;
if(!l.trim())return <div key={i} style={{height:5}}/>;
return <p key={i} style={{fontSize:11,color:C.ts,lineHeight:1.55,margin:"2px 0"}}>{bld(l)}</p>});
return <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
{!ms.length&&<div style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}><span style={{fontSize:16}}>✦</span><div><div style={{fontSize:13,fontWeight:600,color:C.tx}}>Ask about the pilot program</div><div style={{fontSize:10,color:C.tm}}>Strategic analysis, meeting prep, QBR talking points, data queries</div></div></div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:5}}>{SG.map((q,i)=><button key={i} onClick={()=>send(q)} style={{background:C.bgC,border:`1px solid ${C.bd}`,borderRadius:5,padding:"8px 10px",color:C.ts,fontSize:10,cursor:"pointer",textAlign:"left",lineHeight:1.3,transition:"border-color 0.15s"}} onMouseEnter={e=>e.target.style.borderColor=C.ac+"44"} onMouseLeave={e=>e.target.style.borderColor=C.bd}>{q}</button>)}</div></div>}
<div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:6,marginBottom:8}}>{ms.map((m,i)=><div key={i} style={{alignSelf:m.role==="user"?"flex-end":"flex-start",maxWidth:m.role==="user"?"70%":"95%",background:m.role==="user"?C.acd:C.bgC,border:`1px solid ${m.role==="user"?C.ac+"33":C.bd}`,borderRadius:m.role==="user"?"10px 10px 2px 10px":"10px 10px 10px 2px",padding:m.role==="user"?"8px 12px":"12px 16px"}}>{m.role==="assistant"?rM(m.content):<span style={{fontSize:11,color:C.tx}}>{m.content}</span>}</div>)}
{ld&&<div style={{padding:"8px 12px",background:C.bgC,borderRadius:"10px 10px 10px 2px",border:`1px solid ${C.bd}`}}><span style={{fontSize:11,color:C.tm}}>✦ Analyzing program data...</span></div>}</div>
<div style={{display:"flex",gap:4}}><input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&inp.trim()&&send(inp.trim())} placeholder="Ask about tickets, prep for meetings, get talking points..." style={{flex:1,background:C.bgC,border:`1px solid ${C.bd}`,color:C.tx,padding:"8px 12px",borderRadius:5,fontSize:11,outline:"none"}}/><button onClick={()=>inp.trim()&&send(inp.trim())} disabled={ld||!inp.trim()} style={{background:inp.trim()?C.ac:C.bd,border:"none",color:C.bg,padding:"8px 14px",borderRadius:5,fontSize:11,fontWeight:600,cursor:inp.trim()?"pointer":"default"}}>Send</button></div></div>}

function DashTab({onNav}){
const oc=useMemo(()=>{const r={renewed:[],shifted:[],churned:[],dropped:[]};CU.forEach(c=>{if(r[c.out])r[c.out].push(c.nm)});return r},[]);
const trends=useMemo(compTr,[]);
const health=useMemo(()=>compH("all"),[]);
const openT=TIX.filter(t=>t.st.startsWith("Open")).length;
const closedT=TIX.filter(t=>t.st.startsWith("Closed")).length;
const sevA=TIX.filter(t=>t.sev==="Sev A").length;
const oosT=TIX.filter(t=>t.oos).length;
const adoAll=TIX.flatMap(t=>t.adoI);
const adoComp=adoAll.filter(a=>a.pct>=100).length;
const adoBlk=adoAll.filter(a=>a.blk).length;
const cxeAll=TIX.flatMap(t=>t.cxeA);
const cxeComp=cxeAll.filter(a=>a.st==="Complete").length;
const topRisks=[
{t:"Northwind P1 Slip",d:"GPO regression missed 2 commit dates. New IT Director had no MCS context. Non-renewal despite strong CXE execution.",c:C.rd,icon:"\u26a0\ufe0f"},
{t:"Server Scope Gap",d:"Adventure Works\u2019 3:1 server-to-client ratio made client-only coverage unjustifiable. Scope feedback escalated 3x.",c:C.am,icon:"\u26a0\ufe0f"},
{t:adoBlk+" ADO Items Blocked",d:"External dependencies and design reviews constraining CFE delivery velocity across the backlog.",c:C.or,icon:"\u26a0\ufe0f"}];
const wins=[
{t:"Contoso: Critical Bug \u2192 Advocacy",d:"Sev A BSOD on 8,200 devices. P0 fixed in Jan CU. First customer to sign GA contract. Reference account.",c:C.gn,icon:"\u2705"},
{t:"Datum: Insurance Model Validated",d:"3 quiet months, then Feb CU Wi-Fi regression hit 3,200 field endpoints. P0 hotfix in 3 weeks. Renewed with conviction.",c:C.gn,icon:"\u2705"},
{t:"Litware: Bottom-Up Adoption",d:"Endpoint admin tracked CSS vs CXE: 3x faster resolution. Grassroots data convinced IT Director without exec escalation.",c:C.gn,icon:"\u2705"}];
const mx=Math.max(...trends.map(t=>Math.max(t.op,t.cl)),1);
return <div>
<div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:16}}>
{[{l:"Renewed MCS4MW",v:oc.renewed.length,sub:oc.renewed.join(", "),c:C.gn,bg:C.gnd},{l:"Shifted to MCS4Sec",v:oc.shifted.length,sub:oc.shifted.join(", "),c:C.cy,bg:"#002e35"},{l:"Churned",v:oc.churned.length,sub:oc.churned.join(", "),c:C.rd,bg:C.rdd},{l:"Dropped (Scope)",v:oc.dropped.length,sub:oc.dropped.join(", "),c:C.or,bg:"#3d2000"}].map((x,i)=>
<div key={i} style={{background:x.bg+"44",border:`1px solid ${x.c}22`,borderRadius:8,padding:"12px 14px",borderTop:`3px solid ${x.c}`}}>
<div style={{fontSize:28,fontWeight:800,color:x.c,fontFamily:"monospace",lineHeight:1}}>{x.v}</div>
<div style={{fontSize:10,fontWeight:600,color:x.c,marginTop:2,textTransform:"uppercase",letterSpacing:"0.06em"}}>{x.l}</div>
<div style={{fontSize:9,color:C.ts,marginTop:4}}>{x.sub}</div></div>)}</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:6,marginBottom:16}}>
{[{l:"Total Tickets",v:TIX.length,c:C.ac},{l:"Open",v:openT,c:C.am},{l:"Closed",v:closedT,c:C.gn},{l:"Sev A",v:sevA,c:C.rd},{l:"Out of Scope",v:oosT,c:C.or},{l:"ADO Blocked",v:adoBlk,c:C.pu}].map((x,i)=>
<div key={i} style={{background:C.bgC,border:`1px solid ${C.bd}`,borderRadius:6,padding:"8px 10px",textAlign:"center"}}>
<div style={{fontSize:18,fontWeight:700,color:x.c,fontFamily:"monospace"}}>{x.v}</div>
<div style={{fontSize:8,color:C.tm,textTransform:"uppercase",letterSpacing:"0.08em"}}>{x.l}</div></div>)}</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
<div style={{background:C.bgC,border:`1px solid ${C.bd}`,borderRadius:8,padding:14}}>
<div style={{fontSize:9,color:C.tm,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>5-Month Ticket Trajectory</div>
<div style={{display:"flex",alignItems:"flex-end",gap:8,height:110}}>
{trends.map((t,i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
<div style={{display:"flex",gap:2,alignItems:"flex-end",height:85}}>
<div style={{width:14,height:(t.op/mx)*75,background:C.ac,borderRadius:"2px 2px 0 0"}}/>
<div style={{width:14,height:(t.cl/mx)*75,background:C.gn,borderRadius:"2px 2px 0 0"}}/></div>
<div style={{textAlign:"center"}}><div style={{fontSize:8,color:C.tm}}>{t.lb}</div>
<div style={{fontSize:8,color:C.ac,fontFamily:"monospace"}}>{t.op}<span style={{color:C.tm}}>/</span><span style={{color:C.gn}}>{t.cl}</span></div></div></div>)}</div>
<div style={{display:"flex",gap:10,marginTop:6,justifyContent:"center"}}><span style={{fontSize:8,color:C.tm}}><span style={{display:"inline-block",width:6,height:6,background:C.ac,borderRadius:1,marginRight:3}}/>Opened</span><span style={{fontSize:8,color:C.tm}}><span style={{display:"inline-block",width:6,height:6,background:C.gn,borderRadius:1,marginRight:3}}/>Closed</span></div></div>
<div style={{background:C.bgC,border:`1px solid ${C.bd}`,borderRadius:8,padding:14}}>
<div style={{fontSize:9,color:C.tm,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>Program Delivery Scorecard</div>
{[{l:"ADO Items Delivered",v:adoComp,t:adoAll.length,c:C.gn},{l:"ADO Items Blocked",v:adoBlk,t:adoAll.length,c:C.rd},{l:"CXE Actions Complete",v:cxeComp,t:cxeAll.length,c:C.gn},{l:"Renewal Rate (MCS4MW)",v:"62.5%",t:null,c:C.am},{l:"Retention (MCS Portfolio)",v:"75%",t:null,c:C.gn}].map((x,i)=>
<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:i<4?`1px solid ${C.bd}`:"none"}}>
<span style={{fontSize:11,color:C.ts}}>{x.l}</span>
<div style={{display:"flex",alignItems:"center",gap:6}}>
{x.t!==null&&<div style={{width:60,height:5,borderRadius:3,background:C.bd,overflow:"hidden"}}><div style={{height:"100%",borderRadius:3,background:x.c,width:`${(typeof x.v==="number"?x.v/x.t:0)*100}%`}}/></div>}
<span style={{fontSize:12,fontWeight:700,color:x.c,fontFamily:"monospace",minWidth:40,textAlign:"right"}}>{typeof x.v==="number"?x.v+(x.t!==null?"/"+x.t:""):x.v}</span></div></div>)}</div></div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
<div>
<div style={{fontSize:9,color:C.rd,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8,fontWeight:600}}>{"\u26a0\ufe0f"} Top Risk Signals</div>
{topRisks.map((r,i)=><div key={i} style={{background:C.bgC,border:`1px solid ${r.c}18`,borderRadius:6,padding:10,marginBottom:6,borderLeft:`3px solid ${r.c}`}}>
<div style={{fontSize:11,fontWeight:600,color:r.c,marginBottom:3}}>{r.icon} {r.t}</div>
<div style={{fontSize:10,color:C.ts,lineHeight:1.5}}>{r.d}</div></div>)}</div>
<div>
<div style={{fontSize:9,color:C.gn,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8,fontWeight:600}}>{"\u2705"} Pilot Highlights</div>
{wins.map((w,i)=><div key={i} style={{background:C.bgC,border:`1px solid ${w.c}18`,borderRadius:6,padding:10,marginBottom:6,borderLeft:`3px solid ${w.c}`}}>
<div style={{fontSize:11,fontWeight:600,color:w.c,marginBottom:3}}>{w.icon} {w.t}</div>
<div style={{fontSize:10,color:C.ts,lineHeight:1.5}}>{w.d}</div></div>)}</div></div>
<div style={{background:C.bgC,border:`1px solid ${C.bd}`,borderRadius:8,padding:14}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
<div style={{fontSize:9,color:C.tm,textTransform:"uppercase",letterSpacing:"0.08em"}}>Customer Health Overview</div>
<button onClick={()=>onNav("health")} style={{background:"none",border:`1px solid ${C.bd}`,borderRadius:4,padding:"3px 8px",fontSize:9,color:C.ac,cursor:"pointer"}}>View Details {"\u2192"}</button></div>
<div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6}}>
{health.slice(0,8).map(c=>{const oc2={renewed:C.gn,shifted:C.cy,churned:C.rd,dropped:C.or};return <div key={c.id} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 8px",background:C.bgS,borderRadius:5,borderLeft:`3px solid ${RK[c.risk]}`}}>
<div style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center"}}><Rg p={c.sc.t} sz={30} sw={2.5} co={RK[c.risk]}/><span style={{position:"absolute",fontSize:9,fontWeight:700,color:RK[c.risk],fontFamily:"monospace"}}>{c.sc.t}</span></div>
<div><div style={{fontSize:10,fontWeight:600,color:C.tx}}>{c.nm.split(" ")[0]}</div>
<div style={{display:"flex",gap:3,marginTop:1}}><Bd ch={c.out} co={oc2[c.out]||C.ts} bg={C.bd} s={{fontSize:8,padding:"1px 4px"}}/></div></div></div>})}</div></div></div>}

const TABS=[{id:"dash",l:"Dashboard",i:"\u26a1"},{id:"tickets",l:"Tickets",i:"\ud83d\udccb"},{id:"brief",l:"Brief",i:"\ud83d\udcca"},{id:"trends",l:"Timeline",i:"\ud83d\udcc8"},{id:"health",l:"Health",i:"\ud83d\udc8a"},{id:"crm",l:"CRM",i:"\ud83d\udcac"},{id:"intel",l:"Intel",i:"\ud83d\udd17"},{id:"ask",l:"Ask \u2726",i:"\u2726"}];

export default function App(){const[tab,setTab]=useState("dash");
return <div style={{fontFamily:"system-ui,sans-serif",background:C.bg,color:C.tx,minHeight:"100vh",display:"flex",flexDirection:"column"}}>
<style>{`*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:${C.bd};border-radius:2px}select option{background:${C.bgC};color:${C.tx}}body{background:${C.bg}}`}</style>
<header style={{background:C.bgS,borderBottom:`1px solid ${C.bd}`,padding:"7px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:24,height:24,borderRadius:4,background:`linear-gradient(135deg,${C.ac},${C.pu})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11}}>⚡</div>
<div><div style={{fontSize:12,fontWeight:700}}>Escalation Intelligence Platform</div><div style={{fontSize:8,color:C.tm}}>MCS4MW · Nov 24 — Mar 25 · 8 Customers</div></div></div>
<div style={{display:"flex",gap:8,alignItems:"center"}}><span style={{fontSize:9,color:C.tm}}>{TIX.filter(t=>t.st.startsWith("Open")).length} open</span><span style={{fontSize:9,color:C.tm}}>{TIX.length} total</span></div></header>
<nav style={{background:C.bgS,borderBottom:`1px solid ${C.bd}`,padding:"0 14px",display:"flex",gap:1,overflowX:"auto"}}>{TABS.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{background:"none",border:"none",padding:"6px 10px",color:tab===t.id?C.ac:C.tm,fontSize:10,fontWeight:tab===t.id?600:400,cursor:"pointer",borderBottom:`2px solid ${tab===t.id?C.ac:"transparent"}`,display:"flex",alignItems:"center",gap:3,whiteSpace:"nowrap"}}><span style={{fontSize:10}}>{t.i}</span>{t.l}</button>)}</nav>
<main style={{flex:1,padding:14,overflowY:"auto"}}>{tab==="dash"&&<DashTab onNav={setTab}/>}{tab==="tickets"&&<TicketsTab/>}{tab==="brief"&&<BriefTab/>}{tab==="trends"&&<TrendsTab/>}{tab==="health"&&<HealthTab/>}{tab==="crm"&&<CrmTab/>}{tab==="intel"&&<IntelTab/>}{tab==="ask"&&<AskTab/>}</main>
<footer style={{background:C.bgS,borderTop:`1px solid ${C.bd}`,padding:"6px 14px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:4}}><span style={{fontSize:8,color:C.tm,textTransform:"uppercase",letterSpacing:"0.04em"}}>Built by Nishant Desae {"\u00b7"} github.com/nidesae</span><span style={{fontSize:8,color:C.tm,textTransform:"uppercase",letterSpacing:"0.04em"}}>Synthetic Dataset {"\u00b7"} Enterprise Support Engineering Reference Model</span></footer></div>}
