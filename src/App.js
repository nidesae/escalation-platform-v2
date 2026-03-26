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
adoI.push({id:`ADO-${10100+c*2+j}`,type:pw(AT,[10,40,10,20,20]),pr,team:cfe.t,owner:R()>.1?cfe.n:null,commit:cdt,pct,blk:!comp&&R()<.2?pk(["Ext dep","Design review","Test env","Resource","Approval"]):null})}}
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
<div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:9,color:a.owner?C.ts:C.rd}}>{a.owner||"⚠"}</span><Rg p={a.pct} sz={18} sw={2} co={a.pct>=80?C.gn:C.rd}/><span style={{fontSize:9,fontFamily:"monospace",color:C.tm}}>{a.pct}%</span>{a.blk&&<Bd ch="BLK" co={C.rd} bg={C.rdd} s={{fontSize:8}}/>}</div></div>)}</div>}
{t.cxeA.length>0&&<div>{t.cxeA.map(a=><div key={a.id} style={{display:"flex",justifyContent:"space-between",padding:"3px 8px",background:C.bgS,borderRadius:3,marginBottom:1,fontSize:10}}>
<div style={{display:"flex",gap:4,alignItems:"center"}}><Bd ch={a.type} co={C.pu} bg={C.pud}/><span style={{color:C.ts}}>{a.desc}</span></div>
<Bd ch={a.st} co={a.st==="Complete"?C.gn:a.st==="In Progress"?C.am:C.tm} bg={a.st==="Complete"?C.gnd:C.bd}/></div>)}</div>}
</div>}</div>)}{f.length>40&&<div style={{textAlign:"center",padding:6,fontSize:9,color:C.tm}}>40 of {f.length}. Filter to narrow.</div>}</div></div>}

function BriefTab(){const[br,setBr]=useState(null),[ld,setLd]=useState(false);
const s=useMemo(()=>({t:TIX.length,o:TIX.filter(t=>t.st.startsWith("Open")).length,sa:TIX.filter(t=>t.sev==="Sev A").length,ad:TIX.filter(t=>t.disp.includes("ADO")).length,bl:TIX.filter(t=>t.adoI.some(a=>a.blk)).length,os:TIX.filter(t=>t.oos).length}),[]);
const gen=async()=>{setLd(true);try{const r=await fetch("/api/claude",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:`VP CX Engineering MCS4MW. Brief. Total:${s.t}|Open:${s.o}|SevA:${s.sa}|ADO:${s.ad}|Blocked:${s.bl}|OOS:${s.os}. 5 renewed,1→Security,1 churned(CFE slip),1 dropped(server gap). 4 sections: Summary, Risks, Delivery, Actions.`}]})});const d=await r.json();setBr(d.content?.map(b=>b.text||"").join("\n"))}catch{setBr(`## Summary\n${s.t} escalations, 8 customers, 5 months. ${s.o} open, ${s.sa} Sev A. 62.5% MCS4MW renewal, 75% retained in MCS portfolio.\n\n## Risks\n- ${s.bl} ADO items blocked — Northwind P1 slip caused churn\n- ${s.os} out-of-scope tickets — Adventure Works dropped on server gap\n- CFE delivery velocity is top retention risk\n\n## Delivery\n${s.ad} ADO defects. ${s.bl} blocked. Velocity constrained.\n\n## Actions\n1. CFE commit accountability — P1 slips trigger exec review\n2. Clear scope docs at onboarding\n3. MCS4Security cross-sell for Intune customers`)}setLd(false)};
const rM=t=>t.split("\n").map((l,i)=>{if(l.startsWith("## "))return <h3 key={i} style={{color:C.ac,fontSize:13,fontWeight:600,margin:"12px 0 4px",borderBottom:`1px solid ${C.bd}`,paddingBottom:4}}>{l.replace("## ","")}</h3>;if(l.startsWith("- "))return <div key={i} style={{display:"flex",gap:5,margin:"2px 0 2px 8px",fontSize:11,color:C.ts}}><span style={{color:C.ac}}>▸</span><span>{l.replace("- ","")}</span></div>;if(l.match(/^\d\./))return <div key={i} style={{margin:"2px 0 2px 8px",fontSize:11,color:C.ts}}>{l}</div>;if(!l.trim())return <div key={i} style={{height:4}}/>;return <p key={i} style={{fontSize:11,color:C.ts,lineHeight:1.5,margin:"2px 0"}}>{l}</p>});
return <div>
<div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:12}}>{[{l:"Total",v:s.t,c:C.ac},{l:"Open",v:s.o,c:C.am},{l:"Sev A",v:s.sa,c:C.rd},{l:"OOS",v:s.os,c:C.or}].map((x,i)=><div key={i} style={{background:C.bgC,border:`1px solid ${C.bd}`,borderRadius:6,padding:8}}><div style={{fontSize:8,color:C.tm,textTransform:"uppercase"}}>{x.l}</div><div style={{fontSize:20,fontWeight:700,color:x.c,fontFamily:"monospace"}}>{x.v}</div></div>)}</div>
<button onClick={gen} disabled={ld} style={{background:ld?C.bd:`linear-gradient(135deg,${C.acd},${C.pud})`,border:`1px solid ${C.ac}33`,color:C.tx,padding:"6px 12px",borderRadius:5,fontSize:11,fontWeight:600,cursor:ld?"wait":"pointer",marginBottom:12}}>✦ {ld?"Generating...":"Generate Brief"}</button>
{br&&<div style={{background:C.bgC,border:`1px solid ${C.bd}`,borderRadius:6,padding:14}}>{rM(br)}</div>}</div>}

function TrendsTab(){const tr=useMemo(compTr,[]);const mx=Math.max(...tr.map(t=>Math.max(t.op,t.cl)),1);
return <div><div style={{background:C.bgC,border:`1px solid ${C.bd}`,borderRadius:6,padding:14,marginBottom:12}}>
<div style={{fontSize:8,color:C.tm,textTransform:"uppercase",marginBottom:8}}>Opened vs Closed</div>
<div style={{display:"flex",alignItems:"flex-end",gap:6,height:130}}>{tr.map((t,i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}><div style={{display:"flex",gap:2,alignItems:"flex-end",height:100}}><div style={{width:14,height:(t.op/mx)*90,background:C.ac,borderRadius:"2px 2px 0 0"}}/><div style={{width:14,height:(t.cl/mx)*90,background:C.gn,borderRadius:"2px 2px 0 0"}}/></div><span style={{fontSize:8,color:C.tm}}>{t.lb}</span></div>)}</div>
<div style={{display:"flex",gap:10,marginTop:6,justifyContent:"center"}}><span style={{fontSize:9,color:C.tm}}><span style={{display:"inline-block",width:7,height:7,background:C.ac,borderRadius:1,marginRight:3}}/>Opened</span><span style={{fontSize:9,color:C.tm}}><span style={{display:"inline-block",width:7,height:7,background:C.gn,borderRadius:1,marginRight:3}}/>Closed</span></div></div>
<div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6}}>{tr.map((t,i)=><div key={i} style={{background:C.bgC,border:`1px solid ${C.bd}`,borderRadius:6,padding:8}}><div style={{fontSize:11,fontWeight:600,color:C.tx,marginBottom:3}}>{t.lb}</div>
<div style={{fontSize:9,color:C.ts,lineHeight:1.7}}>
<div>Open: <span style={{color:C.ac,fontFamily:"monospace"}}>{t.op}</span></div>
<div>Closed: <span style={{color:C.gn,fontFamily:"monospace"}}>{t.cl}</span></div>
<div>Sev A: <span style={{color:C.rd,fontFamily:"monospace"}}>{t.sa}</span></div>
<div>OOS: <span style={{color:C.or,fontFamily:"monospace"}}>{t.os}</span></div>
<div>Avg: <span style={{color:C.pu,fontFamily:"monospace"}}>{t.avg}d</span></div></div></div>)}</div></div>}

function HealthTab(){const[mo,setMo]=useState("all"),[exp,setExp]=useState(null);const cs=useMemo(()=>compH(mo),[mo]);
const oc={renewed:C.gn,shifted:C.cy,churned:C.rd,dropped:C.or};
return <div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,flexWrap:"wrap",gap:6}}><span style={{fontSize:8,color:C.tm,textTransform:"uppercase"}}>Customer Health — 5×20pts</span><MSel v={mo} onChange={setMo}/></div>
<div style={{display:"flex",flexDirection:"column",gap:6}}>{cs.map(c=><div key={c.id} onClick={()=>setExp(exp===c.id?null:c.id)} style={{background:C.bgC,border:`1px solid ${exp===c.id?RK[c.risk]+"33":C.bd}`,borderRadius:6,padding:10,cursor:"pointer",borderLeft:`3px solid ${RK[c.risk]}`}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
<div style={{display:"flex",alignItems:"center",gap:8}}>
<div style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center"}}><Rg p={c.sc.t} sz={38} sw={3} co={RK[c.risk]}/><span style={{position:"absolute",fontSize:11,fontWeight:700,color:RK[c.risk],fontFamily:"monospace"}}>{c.sc.t}</span></div>
<div><div style={{fontSize:13,fontWeight:600,color:C.tx}}>{c.nm}</div>
<div style={{display:"flex",gap:4,marginTop:2}}><Bd ch={c.risk.toUpperCase()} co={RK[c.risk]} bg={c.risk==="healthy"?C.gnd:c.risk==="at-risk"?C.amd:C.rdd}/><span style={{fontSize:9,color:c.tr==="Improving"?C.gn:c.tr==="Deteriorating"?C.rd:C.tm}}>{c.tr==="Improving"?"↑":c.tr==="Deteriorating"?"↓":"→"} {c.tr}</span><Bd ch={c.out} co={oc[c.out]||C.ts} bg={C.bd}/></div></div></div>
<div style={{display:"flex",gap:8}}>{[{l:"Vel",v:c.sc.v,co:C.ac},{l:"Sev",v:c.sc.s,co:C.rd},{l:"Dsp",v:c.sc.d,co:C.am},{l:"CXE",v:c.sc.c,co:C.pu},{l:"Snt",v:c.sc.sn,co:C.cy}].map((x,i)=><div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}><span style={{fontSize:7,color:C.tm}}>{x.l}</span><MB v={x.v} mx={20} co={x.co}/><span style={{fontSize:8,fontFamily:"monospace",color:x.v>=15?C.gn:x.v>=8?C.am:C.rd}}>{x.v}</span></div>)}</div></div>
<Fl f={c.fl}/>
<div style={{fontSize:9,color:C.tm,marginTop:3}}>{c.ind} · {c.tier} · {c.cv} · {c.fl.toLocaleString()} dev · PM: {c.pm}</div>
{exp===c.id&&<div style={{marginTop:8,borderTop:`1px solid ${C.bd}`,paddingTop:6}}>{c.tix.slice(0,10).map(t=><div key={t.id} style={{display:"flex",justifyContent:"space-between",padding:"2px 6px",background:C.bgS,borderRadius:3,fontSize:10,marginBottom:1}}><div style={{display:"flex",alignItems:"center",gap:4}}><Dt o={t.st.startsWith("Open")}/><span style={{fontFamily:"monospace",color:C.ac,fontSize:9}}>{t.id}</span><SB s={t.sev}/><span style={{color:C.ts,fontSize:9}}>{t.q}</span></div><span style={{fontSize:9,color:t.age>90?C.rd:C.tm,fontFamily:"monospace"}}>{t.age}d</span></div>)}{c.tot2>10&&<div style={{fontSize:8,color:C.tm}}>+{c.tot2-10} more</div>}</div>}
</div>)}</div></div>}

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
const SG=["Which accounts are most at risk?","All P0 blocked items","What drove Northwind's non-renewal?","Pilot renewal summary","Server scope gap impact","Contoso vs Datum arcs"];
const send=async t=>{const nm={role:"user",content:t};const um=[...ms,nm];setMs(um);setInp("");setLd(true);
const ctx=TIX.slice(0,80).map(t=>`${t.id}|${t.mo}|${t.q}|${t.sev}|${t.st}|${t.cust}|${t.age}d|${t.disp}|OOS:${t.oos}`).join("\n");
try{const r=await fetch("/api/claude",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:`MCS4MW analyst. 8 customers, 5mo. Contoso(renewed), Fabrikam(→Security), Northwind(churned-CFE), Adventure Works(dropped-server), others renewed. Datum Month4 incident.\n${ctx}`,messages:um.map(m=>({role:m.role,content:m.content}))})});const d=await r.json();setMs([...um,{role:"assistant",content:d.content?.map(b=>b.text||"").join("\n")||"Error"}])}
catch{setMs([...um,{role:"assistant",content:"**API not reachable** in artifact. Deployed version uses Vercel serverless proxy."}])}setLd(false)};
const rM=t=>t.split("\n").map((l,i)=>{if(l.startsWith("## "))return <h3 key={i} style={{color:C.ac,fontSize:12,margin:"8px 0 3px"}}>{l.replace("## ","")}</h3>;if(l.startsWith("- "))return <div key={i} style={{fontSize:10,color:C.ts,margin:"1px 0 1px 6px"}}>▸ {l.replace("- ","")}</div>;if(!l.trim())return <div key={i} style={{height:3}}/>;return <p key={i} style={{fontSize:10,color:C.ts,margin:"1px 0"}}>{l}</p>});
return <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
{!ms.length&&<div style={{marginBottom:12}}><div style={{fontSize:12,fontWeight:600,color:C.tx,marginBottom:6}}>✦ Ask about the pilot</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:4}}>{SG.map((q,i)=><button key={i} onClick={()=>send(q)} style={{background:C.bgC,border:`1px solid ${C.bd}`,borderRadius:4,padding:"5px 7px",color:C.ts,fontSize:10,cursor:"pointer",textAlign:"left"}}>{q}</button>)}</div></div>}
<div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:5,marginBottom:8}}>{ms.map((m,i)=><div key={i} style={{alignSelf:m.role==="user"?"flex-end":"flex-start",maxWidth:m.role==="user"?"70%":"95%",background:m.role==="user"?C.acd:C.bgC,border:`1px solid ${m.role==="user"?C.ac+"33":C.bd}`,borderRadius:6,padding:"6px 10px"}}>{m.role==="assistant"?rM(m.content):<span style={{fontSize:11,color:C.tx}}>{m.content}</span>}</div>)}
{ld&&<div style={{padding:"6px 10px",background:C.bgC,borderRadius:6,fontSize:10,color:C.tm}}>✦ Analyzing...</div>}</div>
<div style={{display:"flex",gap:4}}><input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&inp.trim()&&send(inp.trim())} placeholder="Ask..." style={{flex:1,background:C.bgC,border:`1px solid ${C.bd}`,color:C.tx,padding:"6px 10px",borderRadius:5,fontSize:11,outline:"none"}}/><button onClick={()=>inp.trim()&&send(inp.trim())} disabled={ld||!inp.trim()} style={{background:inp.trim()?C.ac:C.bd,border:"none",color:C.bg,padding:"6px 10px",borderRadius:5,fontSize:11,fontWeight:600,cursor:inp.trim()?"pointer":"default"}}>Send</button></div></div>}

const TABS=[{id:"tickets",l:"Tickets",i:"📋"},{id:"brief",l:"Brief",i:"📊"},{id:"trends",l:"Trends",i:"📈"},{id:"health",l:"Health",i:"💊"},{id:"crm",l:"CRM",i:"💬"},{id:"intel",l:"Intel",i:"🔗"},{id:"ask",l:"Ask ✦",i:"✦"}];

export default function App(){const[tab,setTab]=useState("tickets");
return <div style={{fontFamily:"system-ui,sans-serif",background:C.bg,color:C.tx,minHeight:"100vh",display:"flex",flexDirection:"column"}}>
<style>{`*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:${C.bd};border-radius:2px}select option{background:${C.bgC};color:${C.tx}}body{background:${C.bg}}`}</style>
<header style={{background:C.bgS,borderBottom:`1px solid ${C.bd}`,padding:"7px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:24,height:24,borderRadius:4,background:`linear-gradient(135deg,${C.ac},${C.pu})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11}}>⚡</div>
<div><div style={{fontSize:12,fontWeight:700}}>Escalation Intelligence Platform</div><div style={{fontSize:8,color:C.tm}}>MCS4MW · Nov 24 — Mar 25 · 8 Customers</div></div></div>
<div style={{display:"flex",gap:8,alignItems:"center"}}><span style={{fontSize:9,color:C.tm}}>{TIX.filter(t=>t.st.startsWith("Open")).length} open</span><span style={{fontSize:9,color:C.tm}}>{TIX.length} total</span></div></header>
<nav style={{background:C.bgS,borderBottom:`1px solid ${C.bd}`,padding:"0 14px",display:"flex",gap:1,overflowX:"auto"}}>{TABS.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{background:"none",border:"none",padding:"6px 10px",color:tab===t.id?C.ac:C.tm,fontSize:10,fontWeight:tab===t.id?600:400,cursor:"pointer",borderBottom:`2px solid ${tab===t.id?C.ac:"transparent"}`,display:"flex",alignItems:"center",gap:3,whiteSpace:"nowrap"}}><span style={{fontSize:10}}>{t.i}</span>{t.l}</button>)}</nav>
<main style={{flex:1,padding:14,overflowY:"auto"}}>{tab==="tickets"&&<TicketsTab/>}{tab==="brief"&&<BriefTab/>}{tab==="trends"&&<TrendsTab/>}{tab==="health"&&<HealthTab/>}{tab==="crm"&&<CrmTab/>}{tab==="intel"&&<IntelTab/>}{tab==="ask"&&<AskTab/>}</main>
<footer style={{background:C.bgS,borderTop:`1px solid ${C.bd}`,padding:"4px 14px",display:"flex",justifyContent:"space-between"}}><span style={{fontSize:7,color:C.tm}}>Nishant Desae · Sr. CX Engineering Manager</span><span style={{fontSize:7,color:C.tm}}>{TIX.length} tickets · {CRM.length} CRM · Claude API</span></footer></div>}
