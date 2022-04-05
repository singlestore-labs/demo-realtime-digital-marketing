var Nt=Object.defineProperty,Rt=Object.defineProperties;var Ot=Object.getOwnPropertyDescriptors;var fe=Object.getOwnPropertySymbols;var ho=Object.prototype.hasOwnProperty,Eo=Object.prototype.propertyIsEnumerable;var je=(e,o,t)=>o in e?Nt(e,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[o]=t,h=(e,o)=>{for(var t in o||(o={}))ho.call(o,t)&&je(e,t,o[t]);if(fe)for(var t of fe(o))Eo.call(o,t)&&je(e,t,o[t]);return e},_=(e,o)=>Rt(e,Ot(o));var z=(e,o)=>{var t={};for(var r in e)ho.call(e,r)&&o.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&fe)for(var r of fe(e))o.indexOf(r)<0&&Eo.call(e,r)&&(t[r]=e[r]);return t};var S=(e,o,t)=>(je(e,typeof o!="symbol"?o+"":o,t),t);import{d as $,l as At,s as Ct,_ as Xe,r as g,j as i,B as k,M as It,a as s,F as C,L as V,R as pe,u as Lo,C as Z,A as wt,b as x,c as ko,e as Lt,f as m,g as R,h as to,i as P,k as Do,P as kt,m as Dt,G as Ae,q as xt,E as zt,N as xo,n as Pt,o as q,v as Mt,p as Q,t as Ee,w as _e,x as Te,y as A,z as ue,S as F,D as M,H as U,I as ke,J as I,K as w,O as L,Q as _o,T as Ce,U as Ut,V as Bt,W as To,X as me,Y as ne,Z as Ft,$ as ve,a0 as qe,a1 as Gt,a2 as ro,a3 as io,a4 as zo,a5 as Yt,a6 as Ht,a7 as ao,a8 as Wt,a9 as no,aa as jt,ab as co,ac as lo,ad as Po,ae as Vt,af as $t,ag as Mo,ah as Kt,ai as ye,aj as Xt,ak as De,al as Uo,am as Ie,an as Ve,ao as qt,ap as Jt,aq as we,ar as xe,as as Bo,at as Fo,au as Zt,av as Qt,aw as er,ax as or,ay as tr,az as rr,aA as ir,aB as dr,aC as ar,aD as nr,aE as So,aF as cr,aG as lr,aH as sr,aI as pr,aJ as ur,aK as yr,aL as gr,aM as fr,aN as Le,aO as Go,aP as mr,aQ as vr,aR as br,aS as hr,aT as ae,aU as Er,aV as _r,aW as Tr,aX as Sr,aY as Nr,aZ as Rr,a_ as Or,a$ as Ar}from"./vendor.8c326be0.js";const Cr=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))r(d);new MutationObserver(d=>{for(const a of d)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function t(d){const a={};return d.integrity&&(a.integrity=d.integrity),d.referrerpolicy&&(a.referrerPolicy=d.referrerpolicy),d.crossorigin==="use-credentials"?a.credentials="include":d.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(d){if(d.ep)return;d.ep=!0;const a=t(d);fetch(d.href,a)}};Cr();const Ir=/^Error (?<code>\d+):/;class D extends Error{constructor(o,t,r){super(o);S(this,"code");S(this,"sql");var d;if(Object.setPrototypeOf(this,D.prototype),this.sql=t,r)this.code=r;else{const a=o.match(Ir);this.code=a?parseInt(((d=a.groups)==null?void 0:d.code)||"-1",10):-1}}isUnknownDatabase(){return this.code===1049}isDatabaseRecovering(){return this.code===2269}isPlanMissing(){return this.code===1885}}const ze=async(e,o,...t)=>{const r=await Y(e,o,...t);if(r.length!==1)throw new D("Expected exactly one row",o);return r[0]},Y=async(e,o,...t)=>{const r=await Pe("query/rows",e,o,...t);if(r.results.length!==1)throw new D("Expected exactly one result set",o);return r.results[0].rows},Yo=(e,o,...t)=>Y(_(h({},e),{database:void 0}),o,...t),so=async(e,o,...t)=>{const r=await Pe("query/tuples",e,o,...t);if(r.results.length!==1)throw new D("Expected exactly one result set",o);return r.results[0].rows},po=(e,o,...t)=>Pe("exec",_(h({},e),{database:void 0}),o,...t),E=(e,o,...t)=>Pe("exec",e,o,...t),Pe=async(e,o,t,...r)=>{var n;const d=await fetch(`${o.host}/api/v1/${e}`,{method:"POST",signal:(n=o.ctx)==null?void 0:n.signal,headers:{"Content-Type":"application/json",Authorization:`Basic ${btoa(`${o.user}:${o.password}`)}`},body:JSON.stringify({sql:t,args:r,database:o.database})});if(!d.ok)throw new D(await d.text(),t);const a=await d.json();if(a.error)throw new D(a.error.message,t,a.error.code);return a},Ho=e=>{const{table:o,columns:t,tuples:r,options:d}=e,a=`(${t.map(()=>"?").join(",")})`,n=r.map(()=>a).join(",");return{sql:$`
      ${d!=null&&d.replace?"REPLACE":"INSERT"} INTO ${o}
      (${t.join(", ")})
      VALUES
        ${n}
    `,params:r.flat()}},No=e=>({sql:typeof e=="string"?e:e.sql,params:typeof e=="string"?[]:e.params||[]}),uo=e=>{const{with:o,base:t}=e,r=[],d=o.map(([c,l])=>{const{sql:u,params:p}=No(l);return r.push(...p),`${c} AS (${$(u)})`}).join(`,
`),{sql:a,params:n}=No(t);return{sql:$`
      WITH ${d}
      ${$(a)}
    `,params:[...r,...n]}},wr=e=>`POLYGON((${e.map(t=>`${t[0]} ${t[1]}`).join(",")}))`,Me=e=>{const[o,t]=e.ne,[r,d]=e.sw;return wr([[d,o],[t,o],[t,r],[d,r],[d,o]])},Ro="POLYGON((",Oo="))",Lr=e=>{if(e.startsWith(Ro)&&e.endsWith(Oo))return e.slice(Ro.length,-Oo.length).split(",").map(t=>{const[r,d]=t.trim().split(" ");return[parseFloat(r),parseFloat(d)]});throw new Error(`Invalid WKT polygon: ${e}`)};var $e=[{id:205,vendor:"Wordtune",tld:"org",category:"automotive",popularity:-.13,cdf:130},{id:275,vendor:"Fivebridge",tld:"com",category:"industrial",popularity:-.12,cdf:250},{id:687,vendor:"Oyondu",tld:"biz",category:"electronics",popularity:-.12,cdf:370},{id:836,vendor:"Dablist",tld:"edu",category:"books",popularity:-.11,cdf:480},{id:370,vendor:"Buzzshare",tld:"edu",category:"games",popularity:-.1,cdf:580},{id:858,vendor:"Vimbo",tld:"mil",category:"beauty",popularity:-.1,cdf:680},{id:198,vendor:"Zoombox",tld:"net",category:"industrial",popularity:-.09,cdf:770},{id:244,vendor:"Twitternation",tld:"biz",category:"jewelry",popularity:-.09,cdf:860},{id:531,vendor:"Youspan",tld:"org",category:"health",popularity:-.08,cdf:940},{id:545,vendor:"Twimm",tld:"name",category:"beauty",popularity:-.08,cdf:1020},{id:957,vendor:"Tagpad",tld:"com",category:"sports",popularity:-.05,cdf:1070},{id:577,vendor:"Skyndu",tld:"mil",category:"health",popularity:-.03,cdf:1100},{id:283,vendor:"Plambee",tld:"net",category:"computers",popularity:-.02,cdf:1120},{id:788,vendor:"Skinder",tld:"edu",category:"baby",popularity:-.02,cdf:1140},{id:66,vendor:"Aivee",tld:"gov",category:"games",popularity:-.01,cdf:1150},{id:598,vendor:"Skimia",tld:"biz",category:"garden",popularity:-.01,cdf:1160},{id:407,vendor:"Tagcat",tld:"gov",category:"electronics",popularity:0,cdf:1160},{id:745,vendor:"Topiczoom",tld:"info",category:"health",popularity:0,cdf:1160},{id:791,vendor:"Wordpedia",tld:"mil",category:"music",popularity:0,cdf:1160},{id:854,vendor:"Vitz",tld:"com",category:"toys",popularity:0,cdf:1160},{id:912,vendor:"Trilia",tld:"com",category:"music",popularity:0,cdf:1160},{id:627,vendor:"Aimbo",tld:"gov",category:"clothing",popularity:.01,cdf:1170},{id:125,vendor:"Kwideo",tld:"biz",category:"kids",popularity:.02,cdf:1190},{id:134,vendor:"Dynabox",tld:"org",category:"industrial",popularity:.02,cdf:1210},{id:194,vendor:"Browsezoom",tld:"info",category:"automotive",popularity:.02,cdf:1230},{id:374,vendor:"Jetwire",tld:"mil",category:"music",popularity:.02,cdf:1250},{id:71,vendor:"Jaloo",tld:"com",category:"home",popularity:.03,cdf:1280},{id:694,vendor:"Linkbuzz",tld:"edu",category:"grocery",popularity:.03,cdf:1310},{id:848,vendor:"Skalith",tld:"name",category:"automotive",popularity:.03,cdf:1340},{id:763,vendor:"Digitube",tld:"edu",category:"clothing",popularity:.04,cdf:1380},{id:230,vendor:"Twitterwire",tld:"biz",category:"sports",popularity:.05,cdf:1430},{id:655,vendor:"Realblab",tld:"edu",category:"toys",popularity:.05,cdf:1480},{id:802,vendor:"Youtags",tld:"org",category:"outdoors",popularity:.05,cdf:1530},{id:181,vendor:"Gigashots",tld:"gov",category:"outdoors",popularity:.06,cdf:1590},{id:257,vendor:"Livetube",tld:"info",category:"electronics",popularity:.06,cdf:1650},{id:812,vendor:"Ntags",tld:"biz",category:"health",popularity:.06,cdf:1710},{id:941,vendor:"Gigashots",tld:"mil",category:"garden",popularity:.07,cdf:1780},{id:102,vendor:"Voomm",tld:"name",category:"computers",popularity:.08,cdf:1860},{id:154,vendor:"Demivee",tld:"net",category:"home",popularity:.08,cdf:1940},{id:341,vendor:"Feedfish",tld:"name",category:"outdoors",popularity:.08,cdf:2020},{id:354,vendor:"Aibox",tld:"biz",category:"home",popularity:.08,cdf:2100},{id:692,vendor:"Fadeo",tld:"org",category:"jewelry",popularity:.08,cdf:2180},{id:73,vendor:"Meevee",tld:"info",category:"grocery",popularity:.09,cdf:2270},{id:436,vendor:"Cogibox",tld:"com",category:"grocery",popularity:.09,cdf:2360},{id:565,vendor:"Realcube",tld:"mil",category:"industrial",popularity:.09,cdf:2450},{id:917,vendor:"Yadel",tld:"mil",category:"grocery",popularity:.09,cdf:2540},{id:466,vendor:"Mita",tld:"biz",category:"home",popularity:.1,cdf:2640},{id:749,vendor:"Tagopia",tld:"biz",category:"clothing",popularity:.1,cdf:2740},{id:891,vendor:"Thoughtstorm",tld:"mil",category:"music",popularity:.1,cdf:2840},{id:532,vendor:"Jaxbean",tld:"mil",category:"tools",popularity:.11,cdf:2950},{id:901,vendor:"Yata",tld:"gov",category:"garden",popularity:.11,cdf:3060},{id:904,vendor:"Ooba",tld:"com",category:"books",popularity:.11,cdf:3170},{id:960,vendor:"Photobean",tld:"mil",category:"industrial",popularity:.11,cdf:3280},{id:271,vendor:"Linktype",tld:"info",category:"tools",popularity:.12,cdf:3400},{id:393,vendor:"Youspan",tld:"edu",category:"garden",popularity:.12,cdf:3520},{id:580,vendor:"Plajo",tld:"info",category:"jewelry",popularity:.12,cdf:3640},{id:769,vendor:"Vitz",tld:"gov",category:"beauty",popularity:.12,cdf:3760},{id:11,vendor:"Thoughtsphere",tld:"biz",category:"home",popularity:.13,cdf:3890},{id:129,vendor:"Trilia",tld:"com",category:"games",popularity:.13,cdf:4020},{id:192,vendor:"Riffwire",tld:"edu",category:"jewelry",popularity:.13,cdf:4150},{id:543,vendor:"Skipstorm",tld:"mil",category:"tools",popularity:.13,cdf:4280},{id:780,vendor:"Linklinks",tld:"org",category:"computers",popularity:.13,cdf:4410},{id:215,vendor:"Jabberstorm",tld:"net",category:"garden",popularity:.14,cdf:4550},{id:345,vendor:"Fliptune",tld:"info",category:"electronics",popularity:.14,cdf:4690},{id:400,vendor:"Agimba",tld:"biz",category:"grocery",popularity:.14,cdf:4830},{id:413,vendor:"Skynoodle",tld:"biz",category:"clothing",popularity:.14,cdf:4970},{id:621,vendor:"Oyondu",tld:"com",category:"toys",popularity:.14,cdf:5110},{id:832,vendor:"Browsetype",tld:"com",category:"kids",popularity:.14,cdf:5250},{id:921,vendor:"Eazzy",tld:"edu",category:"beauty",popularity:.14,cdf:5390},{id:87,vendor:"Muxo",tld:"name",category:"grocery",popularity:.15,cdf:5540},{id:219,vendor:"Jaxbean",tld:"edu",category:"automotive",popularity:.15,cdf:5690},{id:226,vendor:"Gabcube",tld:"net",category:"beauty",popularity:.15,cdf:5840},{id:537,vendor:"Thoughtbeat",tld:"edu",category:"sports",popularity:.15,cdf:5990},{id:640,vendor:"Kare",tld:"mil",category:"books",popularity:.15,cdf:6140},{id:666,vendor:"Ntags",tld:"biz",category:"movies",popularity:.15,cdf:6290},{id:685,vendor:"Centimia",tld:"name",category:"books",popularity:.15,cdf:6440},{id:790,vendor:"Eabox",tld:"edu",category:"home",popularity:.15,cdf:6590},{id:47,vendor:"Agivu",tld:"net",category:"industrial",popularity:.16,cdf:6750},{id:51,vendor:"Camido",tld:"com",category:"games",popularity:.16,cdf:6910},{id:225,vendor:"Mydo",tld:"name",category:"sports",popularity:.16,cdf:7070},{id:594,vendor:"Yodoo",tld:"net",category:"tools",popularity:.16,cdf:7230},{id:702,vendor:"Skilith",tld:"org",category:"computers",popularity:.16,cdf:7390},{id:950,vendor:"Leexo",tld:"net",category:"industrial",popularity:.16,cdf:7550},{id:128,vendor:"Layo",tld:"gov",category:"books",popularity:.17,cdf:7720},{id:422,vendor:"DabZ",tld:"edu",category:"kids",popularity:.17,cdf:7890},{id:430,vendor:"Skaboo",tld:"biz",category:"books",popularity:.17,cdf:8060},{id:433,vendor:"Jetpulse",tld:"com",category:"sports",popularity:.17,cdf:8230},{id:459,vendor:"Fivespan",tld:"org",category:"garden",popularity:.17,cdf:8400},{id:982,vendor:"Topiclounge",tld:"com",category:"beauty",popularity:.17,cdf:8570},{id:75,vendor:"Twitterworks",tld:"com",category:"computers",popularity:.18,cdf:8750},{id:82,vendor:"Oba",tld:"info",category:"health",popularity:.18,cdf:8930},{id:88,vendor:"Skaboo",tld:"org",category:"sports",popularity:.18,cdf:9110},{id:399,vendor:"Photofeed",tld:"mil",category:"clothing",popularity:.18,cdf:9290},{id:559,vendor:"Voonix",tld:"name",category:"computers",popularity:.18,cdf:9470},{id:676,vendor:"Zooveo",tld:"net",category:"shoes",popularity:.18,cdf:9650},{id:686,vendor:"Twitternation",tld:"biz",category:"tools",popularity:.18,cdf:9830},{id:714,vendor:"Twitternation",tld:"edu",category:"shoes",popularity:.18,cdf:10010},{id:55,vendor:"Eidel",tld:"com",category:"outdoors",popularity:.19,cdf:10200},{id:84,vendor:"Ainyx",tld:"gov",category:"baby",popularity:.19,cdf:10390},{id:232,vendor:"Rhybox",tld:"gov",category:"jewelry",popularity:.19,cdf:10580},{id:452,vendor:"Twinder",tld:"org",category:"baby",popularity:.19,cdf:10770},{id:716,vendor:"Browseblab",tld:"net",category:"kids",popularity:.19,cdf:10960},{id:902,vendor:"Skimia",tld:"biz",category:"electronics",popularity:.19,cdf:11150},{id:9,vendor:"Podcat",tld:"mil",category:"beauty",popularity:.2,cdf:11350},{id:24,vendor:"Latz",tld:"biz",category:"music",popularity:.2,cdf:11550},{id:119,vendor:"Skippad",tld:"biz",category:"computers",popularity:.2,cdf:11750},{id:444,vendor:"Riffpath",tld:"net",category:"shoes",popularity:.2,cdf:11950},{id:635,vendor:"Fanoodle",tld:"mil",category:"electronics",popularity:.2,cdf:12150},{id:794,vendor:"Vimbo",tld:"mil",category:"books",popularity:.2,cdf:12350},{id:822,vendor:"Photospace",tld:"com",category:"industrial",popularity:.2,cdf:12550},{id:888,vendor:"Tagtune",tld:"biz",category:"toys",popularity:.2,cdf:12750},{id:6,vendor:"Oyoyo",tld:"net",category:"jewelry",popularity:.21,cdf:12960},{id:161,vendor:"Tagfeed",tld:"com",category:"sports",popularity:.21,cdf:13170},{id:346,vendor:"Brainbox",tld:"biz",category:"clothing",popularity:.21,cdf:13380},{id:514,vendor:"Yodoo",tld:"com",category:"tools",popularity:.21,cdf:13590},{id:527,vendor:"Eire",tld:"com",category:"jewelry",popularity:.21,cdf:13800},{id:550,vendor:"Bubbletube",tld:"info",category:"beauty",popularity:.21,cdf:14010},{id:606,vendor:"Yoveo",tld:"com",category:"tools",popularity:.21,cdf:14220},{id:624,vendor:"Kanoodle",tld:"edu",category:"computers",popularity:.21,cdf:14430},{id:679,vendor:"Rooxo",tld:"net",category:"movies",popularity:.21,cdf:14640},{id:693,vendor:"Babbleblab",tld:"org",category:"games",popularity:.21,cdf:14850},{id:700,vendor:"Jaxworks",tld:"org",category:"shoes",popularity:.21,cdf:15060},{id:816,vendor:"Kazio",tld:"edu",category:"garden",popularity:.21,cdf:15270},{id:860,vendor:"Rhynyx",tld:"name",category:"books",popularity:.21,cdf:15480},{id:878,vendor:"Avamm",tld:"net",category:"health",popularity:.21,cdf:15690},{id:967,vendor:"Chatterpoint",tld:"name",category:"beauty",popularity:.21,cdf:15900},{id:290,vendor:"Thoughtbridge",tld:"biz",category:"clothing",popularity:.22,cdf:16120},{id:719,vendor:"Skynoodle",tld:"gov",category:"games",popularity:.22,cdf:16340},{id:85,vendor:"Riffpedia",tld:"gov",category:"grocery",popularity:.23,cdf:16570},{id:143,vendor:"Pixonyx",tld:"edu",category:"automotive",popularity:.23,cdf:16800},{id:247,vendor:"Oyonder",tld:"biz",category:"garden",popularity:.23,cdf:17030},{id:322,vendor:"Skippad",tld:"edu",category:"books",popularity:.23,cdf:17260},{id:332,vendor:"Kare",tld:"org",category:"clothing",popularity:.23,cdf:17490},{id:338,vendor:"Ooba",tld:"org",category:"clothing",popularity:.23,cdf:17720},{id:414,vendor:"Youfeed",tld:"name",category:"shoes",popularity:.23,cdf:17950},{id:442,vendor:"Edgeblab",tld:"name",category:"electronics",popularity:.23,cdf:18180},{id:454,vendor:"Yodoo",tld:"org",category:"shoes",popularity:.23,cdf:18410},{id:520,vendor:"Podcat",tld:"biz",category:"books",popularity:.23,cdf:18640},{id:629,vendor:"Twiyo",tld:"mil",category:"grocery",popularity:.23,cdf:18870},{id:765,vendor:"Oloo",tld:"mil",category:"garden",popularity:.23,cdf:19100},{id:935,vendor:"Cogibox",tld:"biz",category:"sports",popularity:.23,cdf:19330},{id:176,vendor:"Trupe",tld:"info",category:"sports",popularity:.24,cdf:19570},{id:356,vendor:"Camido",tld:"org",category:"outdoors",popularity:.24,cdf:19810},{id:377,vendor:"Kanoodle",tld:"biz",category:"shoes",popularity:.24,cdf:20050},{id:899,vendor:"Yoveo",tld:"net",category:"industrial",popularity:.24,cdf:20290},{id:926,vendor:"Meetz",tld:"com",category:"toys",popularity:.24,cdf:20530},{id:976,vendor:"Realfire",tld:"mil",category:"tools",popularity:.24,cdf:20770},{id:990,vendor:"Leexo",tld:"name",category:"movies",popularity:.24,cdf:21010},{id:258,vendor:"Lazzy",tld:"gov",category:"shoes",popularity:.25,cdf:21260},{id:262,vendor:"Skimia",tld:"com",category:"jewelry",popularity:.25,cdf:21510},{id:329,vendor:"Zava",tld:"mil",category:"kids",popularity:.25,cdf:21760},{id:336,vendor:"Katz",tld:"gov",category:"outdoors",popularity:.25,cdf:22010},{id:489,vendor:"Yamia",tld:"info",category:"garden",popularity:.25,cdf:22260},{id:505,vendor:"Yodel",tld:"org",category:"garden",popularity:.25,cdf:22510},{id:631,vendor:"Meembee",tld:"info",category:"beauty",popularity:.25,cdf:22760},{id:755,vendor:"Brainverse",tld:"mil",category:"beauty",popularity:.25,cdf:23010},{id:827,vendor:"Vimbo",tld:"gov",category:"health",popularity:.25,cdf:23260},{id:339,vendor:"Brightbean",tld:"edu",category:"automotive",popularity:.26,cdf:23520},{id:384,vendor:"Blognation",tld:"mil",category:"jewelry",popularity:.26,cdf:23780},{id:437,vendor:"Kwideo",tld:"edu",category:"shoes",popularity:.26,cdf:24040},{id:560,vendor:"Gigabox",tld:"edu",category:"computers",popularity:.26,cdf:24300},{id:821,vendor:"Twitterworks",tld:"org",category:"industrial",popularity:.26,cdf:24560},{id:914,vendor:"Yakitri",tld:"info",category:"games",popularity:.26,cdf:24820},{id:86,vendor:"Fadeo",tld:"gov",category:"movies",popularity:.27,cdf:25090},{id:213,vendor:"Aivee",tld:"mil",category:"computers",popularity:.27,cdf:25360},{id:474,vendor:"Kayveo",tld:"mil",category:"garden",popularity:.27,cdf:25630},{id:495,vendor:"Meembee",tld:"gov",category:"music",popularity:.27,cdf:25900},{id:517,vendor:"Skivee",tld:"edu",category:"shoes",popularity:.27,cdf:26170},{id:521,vendor:"Kazu",tld:"biz",category:"clothing",popularity:.27,cdf:26440},{id:525,vendor:"Bubblemix",tld:"edu",category:"health",popularity:.27,cdf:26710},{id:558,vendor:"Meembee",tld:"name",category:"home",popularity:.27,cdf:26980},{id:736,vendor:"Oodoo",tld:"biz",category:"kids",popularity:.27,cdf:27250},{id:768,vendor:"Dabtype",tld:"org",category:"grocery",popularity:.27,cdf:27520},{id:849,vendor:"Abata",tld:"net",category:"industrial",popularity:.27,cdf:27790},{id:997,vendor:"Linklinks",tld:"name",category:"shoes",popularity:.27,cdf:28060},{id:1e3,vendor:"Feednation",tld:"net",category:"industrial",popularity:.27,cdf:28330},{id:201,vendor:"Rhyloo",tld:"name",category:"movies",popularity:.28,cdf:28610},{id:272,vendor:"Centizu",tld:"net",category:"electronics",popularity:.28,cdf:28890},{id:292,vendor:"Meembee",tld:"org",category:"beauty",popularity:.28,cdf:29170},{id:402,vendor:"Camimbo",tld:"mil",category:"sports",popularity:.28,cdf:29450},{id:443,vendor:"Gigazoom",tld:"edu",category:"electronics",popularity:.28,cdf:29730},{id:993,vendor:"Rooxo",tld:"mil",category:"toys",popularity:.28,cdf:30010},{id:54,vendor:"Bubblemix",tld:"name",category:"clothing",popularity:.29,cdf:30300},{id:144,vendor:"Talane",tld:"com",category:"grocery",popularity:.29,cdf:30590},{id:321,vendor:"Avamm",tld:"info",category:"kids",popularity:.29,cdf:30880},{id:424,vendor:"Twitterbridge",tld:"net",category:"tools",popularity:.29,cdf:31170},{id:445,vendor:"Edgepulse",tld:"com",category:"health",popularity:.29,cdf:31460},{id:553,vendor:"Voonyx",tld:"com",category:"computers",popularity:.29,cdf:31750},{id:602,vendor:"Dabjam",tld:"edu",category:"tools",popularity:.29,cdf:32040},{id:671,vendor:"Lazzy",tld:"org",category:"movies",popularity:.29,cdf:32330},{id:792,vendor:"Oba",tld:"name",category:"clothing",popularity:.29,cdf:32620},{id:924,vendor:"Vinte",tld:"gov",category:"movies",popularity:.29,cdf:32910},{id:989,vendor:"Livetube",tld:"gov",category:"jewelry",popularity:.29,cdf:33200},{id:42,vendor:"Wikizz",tld:"info",category:"toys",popularity:.3,cdf:33500},{id:56,vendor:"Devify",tld:"biz",category:"jewelry",popularity:.3,cdf:33800},{id:69,vendor:"Rhynyx",tld:"info",category:"games",popularity:.3,cdf:34100},{id:126,vendor:"Voomm",tld:"com",category:"movies",popularity:.3,cdf:34400},{id:353,vendor:"Dazzlesphere",tld:"org",category:"games",popularity:.3,cdf:34700},{id:549,vendor:"Yamia",tld:"edu",category:"shoes",popularity:.3,cdf:35e3},{id:586,vendor:"Buzzbean",tld:"gov",category:"tools",popularity:.3,cdf:35300},{id:614,vendor:"Skiptube",tld:"info",category:"outdoors",popularity:.3,cdf:35600},{id:779,vendor:"Abatz",tld:"name",category:"industrial",popularity:.3,cdf:35900},{id:869,vendor:"Fadeo",tld:"net",category:"tools",popularity:.3,cdf:36200},{id:919,vendor:"Mybuzz",tld:"info",category:"clothing",popularity:.3,cdf:36500},{id:966,vendor:"Eare",tld:"name",category:"sports",popularity:.3,cdf:36800},{id:979,vendor:"Thoughtstorm",tld:"net",category:"toys",popularity:.3,cdf:37100},{id:67,vendor:"Gabvine",tld:"net",category:"garden",popularity:.31,cdf:37410},{id:81,vendor:"BlogXS",tld:"gov",category:"movies",popularity:.31,cdf:37720},{id:180,vendor:"Skibox",tld:"com",category:"kids",popularity:.31,cdf:38030},{id:304,vendor:"Eabox",tld:"com",category:"toys",popularity:.31,cdf:38340},{id:473,vendor:"LiveZ",tld:"com",category:"industrial",popularity:.31,cdf:38650},{id:584,vendor:"Thoughtmix",tld:"name",category:"home",popularity:.31,cdf:38960},{id:585,vendor:"Feedfire",tld:"mil",category:"automotive",popularity:.31,cdf:39270},{id:644,vendor:"Nlounge",tld:"edu",category:"movies",popularity:.31,cdf:39580},{id:664,vendor:"Cogilith",tld:"gov",category:"garden",popularity:.31,cdf:39890},{id:729,vendor:"Fivechat",tld:"info",category:"garden",popularity:.31,cdf:40200},{id:758,vendor:"Devbug",tld:"mil",category:"electronics",popularity:.31,cdf:40510},{id:842,vendor:"Voomm",tld:"net",category:"baby",popularity:.31,cdf:40820},{id:83,vendor:"Edgewire",tld:"name",category:"beauty",popularity:.32,cdf:41140},{id:285,vendor:"Eimbee",tld:"org",category:"jewelry",popularity:.32,cdf:41460},{id:361,vendor:"Yabox",tld:"info",category:"outdoors",popularity:.32,cdf:41780},{id:379,vendor:"Photobug",tld:"gov",category:"outdoors",popularity:.32,cdf:42100},{id:423,vendor:"DabZ",tld:"mil",category:"beauty",popularity:.32,cdf:42420},{id:507,vendor:"Yamia",tld:"info",category:"tools",popularity:.32,cdf:42740},{id:515,vendor:"Devify",tld:"org",category:"automotive",popularity:.32,cdf:43060},{id:581,vendor:"Yabox",tld:"name",category:"movies",popularity:.32,cdf:43380},{id:599,vendor:"Skibox",tld:"biz",category:"sports",popularity:.32,cdf:43700},{id:818,vendor:"Quimm",tld:"mil",category:"garden",popularity:.32,cdf:44020},{id:920,vendor:"Aimbu",tld:"info",category:"baby",popularity:.32,cdf:44340},{id:974,vendor:"Quatz",tld:"edu",category:"electronics",popularity:.32,cdf:44660},{id:995,vendor:"Pixonyx",tld:"edu",category:"industrial",popularity:.32,cdf:44980},{id:46,vendor:"Wikido",tld:"mil",category:"books",popularity:.33,cdf:45310},{id:78,vendor:"Trilith",tld:"com",category:"shoes",popularity:.33,cdf:45640},{id:138,vendor:"Linklinks",tld:"mil",category:"health",popularity:.33,cdf:45970},{id:188,vendor:"Meejo",tld:"com",category:"outdoors",popularity:.33,cdf:46300},{id:203,vendor:"Yakitri",tld:"info",category:"electronics",popularity:.33,cdf:46630},{id:267,vendor:"Youspan",tld:"info",category:"movies",popularity:.33,cdf:46960},{id:428,vendor:"Realpoint",tld:"net",category:"toys",popularity:.33,cdf:47290},{id:451,vendor:"Bubblebox",tld:"net",category:"automotive",popularity:.33,cdf:47620},{id:567,vendor:"Kamba",tld:"info",category:"garden",popularity:.33,cdf:47950},{id:625,vendor:"Tagchat",tld:"info",category:"computers",popularity:.33,cdf:48280},{id:632,vendor:"Twimbo",tld:"org",category:"books",popularity:.33,cdf:48610},{id:641,vendor:"Cogidoo",tld:"info",category:"clothing",popularity:.33,cdf:48940},{id:647,vendor:"Trunyx",tld:"mil",category:"kids",popularity:.33,cdf:49270},{id:771,vendor:"LiveZ",tld:"gov",category:"kids",popularity:.33,cdf:49600},{id:784,vendor:"Jazzy",tld:"info",category:"baby",popularity:.33,cdf:49930},{id:851,vendor:"Youopia",tld:"gov",category:"computers",popularity:.33,cdf:50260},{id:890,vendor:"Tagchat",tld:"org",category:"grocery",popularity:.33,cdf:50590},{id:48,vendor:"Jabberstorm",tld:"name",category:"toys",popularity:.34,cdf:50930},{id:130,vendor:"Zazio",tld:"edu",category:"clothing",popularity:.34,cdf:51270},{id:159,vendor:"Vimbo",tld:"edu",category:"electronics",popularity:.34,cdf:51610},{id:173,vendor:"Livetube",tld:"mil",category:"games",popularity:.34,cdf:51950},{id:291,vendor:"Youspan",tld:"mil",category:"electronics",popularity:.34,cdf:52290},{id:295,vendor:"Npath",tld:"org",category:"garden",popularity:.34,cdf:52630},{id:303,vendor:"Youfeed",tld:"mil",category:"health",popularity:.34,cdf:52970},{id:314,vendor:"Ntag",tld:"mil",category:"sports",popularity:.34,cdf:53310},{id:334,vendor:"Gevee",tld:"net",category:"automotive",popularity:.34,cdf:53650},{id:479,vendor:"Kazio",tld:"info",category:"electronics",popularity:.34,cdf:53990},{id:526,vendor:"Voomm",tld:"net",category:"clothing",popularity:.34,cdf:54330},{id:534,vendor:"Flashpoint",tld:"com",category:"outdoors",popularity:.34,cdf:54670},{id:670,vendor:"Yoveo",tld:"com",category:"shoes",popularity:.34,cdf:55010},{id:688,vendor:"Flipbug",tld:"org",category:"health",popularity:.34,cdf:55350},{id:732,vendor:"Yombu",tld:"mil",category:"jewelry",popularity:.34,cdf:55690},{id:819,vendor:"Brainverse",tld:"biz",category:"grocery",popularity:.34,cdf:56030},{id:855,vendor:"Wikibox",tld:"mil",category:"jewelry",popularity:.34,cdf:56370},{id:895,vendor:"Jaxnation",tld:"name",category:"sports",popularity:.34,cdf:56710},{id:340,vendor:"Skiba",tld:"net",category:"jewelry",popularity:.35,cdf:57060},{id:391,vendor:"Skipfire",tld:"name",category:"kids",popularity:.35,cdf:57410},{id:419,vendor:"Quatz",tld:"edu",category:"toys",popularity:.35,cdf:57760},{id:490,vendor:"Eimbee",tld:"gov",category:"books",popularity:.35,cdf:58110},{id:540,vendor:"Browsezoom",tld:"edu",category:"home",popularity:.35,cdf:58460},{id:656,vendor:"Eamia",tld:"name",category:"books",popularity:.35,cdf:58810},{id:972,vendor:"Realcube",tld:"mil",category:"toys",popularity:.35,cdf:59160},{id:18,vendor:"Vitz",tld:"edu",category:"sports",popularity:.36,cdf:59520},{id:20,vendor:"Kwimbee",tld:"net",category:"beauty",popularity:.36,cdf:59880},{id:252,vendor:"Voolia",tld:"biz",category:"tools",popularity:.36,cdf:60240},{id:318,vendor:"Feedbug",tld:"net",category:"grocery",popularity:.36,cdf:60600},{id:392,vendor:"InnoZ",tld:"org",category:"garden",popularity:.36,cdf:60960},{id:395,vendor:"Gabvine",tld:"edu",category:"home",popularity:.36,cdf:61320},{id:462,vendor:"Twitternation",tld:"mil",category:"health",popularity:.36,cdf:61680},{id:506,vendor:"Browseblab",tld:"net",category:"sports",popularity:.36,cdf:62040},{id:551,vendor:"Oyonder",tld:"edu",category:"home",popularity:.36,cdf:62400},{id:556,vendor:"Jabbertype",tld:"biz",category:"tools",popularity:.36,cdf:62760},{id:669,vendor:"Rooxo",tld:"info",category:"health",popularity:.36,cdf:63120},{id:698,vendor:"Livetube",tld:"net",category:"outdoors",popularity:.36,cdf:63480},{id:861,vendor:"Livetube",tld:"biz",category:"kids",popularity:.36,cdf:63840},{id:872,vendor:"Babbleopia",tld:"gov",category:"sports",popularity:.36,cdf:64200},{id:929,vendor:"Buzzbean",tld:"mil",category:"beauty",popularity:.36,cdf:64560},{id:946,vendor:"Meembee",tld:"com",category:"games",popularity:.36,cdf:64920},{id:1,vendor:"Youspan",tld:"info",category:"sports",popularity:.37,cdf:65290},{id:124,vendor:"Avaveo",tld:"biz",category:"garden",popularity:.37,cdf:65660},{id:420,vendor:"Meezzy",tld:"biz",category:"kids",popularity:.37,cdf:66030},{id:516,vendor:"Wikizz",tld:"org",category:"books",popularity:.37,cdf:66400},{id:536,vendor:"Edgeclub",tld:"name",category:"garden",popularity:.37,cdf:66770},{id:542,vendor:"Camimbo",tld:"mil",category:"music",popularity:.37,cdf:67140},{id:562,vendor:"Yombu",tld:"biz",category:"automotive",popularity:.37,cdf:67510},{id:591,vendor:"Skilith",tld:"edu",category:"shoes",popularity:.37,cdf:67880},{id:616,vendor:"Buzzbean",tld:"name",category:"garden",popularity:.37,cdf:68250},{id:639,vendor:"Kayveo",tld:"org",category:"kids",popularity:.37,cdf:68620},{id:678,vendor:"Skajo",tld:"org",category:"kids",popularity:.37,cdf:68990},{id:846,vendor:"Topicblab",tld:"org",category:"grocery",popularity:.37,cdf:69360},{id:905,vendor:"Edgeclub",tld:"name",category:"home",popularity:.37,cdf:69730},{id:8,vendor:"Oyonder",tld:"org",category:"games",popularity:.38,cdf:70110},{id:145,vendor:"Jabberbean",tld:"info",category:"industrial",popularity:.38,cdf:70490},{id:149,vendor:"Dazzlesphere",tld:"mil",category:"toys",popularity:.38,cdf:70870},{id:480,vendor:"Photobean",tld:"info",category:"games",popularity:.38,cdf:71250},{id:674,vendor:"Katz",tld:"net",category:"baby",popularity:.38,cdf:71630},{id:682,vendor:"Brainverse",tld:"mil",category:"games",popularity:.38,cdf:72010},{id:723,vendor:"Trudoo",tld:"mil",category:"clothing",popularity:.38,cdf:72390},{id:883,vendor:"Voolith",tld:"name",category:"industrial",popularity:.38,cdf:72770},{id:5,vendor:"Zava",tld:"net",category:"kids",popularity:.39,cdf:73160},{id:62,vendor:"Gabspot",tld:"mil",category:"shoes",popularity:.39,cdf:73550},{id:80,vendor:"Abata",tld:"net",category:"games",popularity:.39,cdf:73940},{id:113,vendor:"Brightdog",tld:"name",category:"automotive",popularity:.39,cdf:74330},{id:218,vendor:"Edgeify",tld:"org",category:"home",popularity:.39,cdf:74720},{id:281,vendor:"Viva",tld:"name",category:"movies",popularity:.39,cdf:75110},{id:579,vendor:"Leexo",tld:"net",category:"industrial",popularity:.39,cdf:75500},{id:587,vendor:"Youfeed",tld:"info",category:"music",popularity:.39,cdf:75890},{id:592,vendor:"Eadel",tld:"edu",category:"tools",popularity:.39,cdf:76280},{id:601,vendor:"Eare",tld:"info",category:"outdoors",popularity:.39,cdf:76670},{id:648,vendor:"Skyble",tld:"gov",category:"garden",popularity:.39,cdf:77060},{id:650,vendor:"Meedoo",tld:"info",category:"jewelry",popularity:.39,cdf:77450},{id:706,vendor:"Edgewire",tld:"edu",category:"shoes",popularity:.39,cdf:77840},{id:730,vendor:"Pixope",tld:"biz",category:"home",popularity:.39,cdf:78230},{id:759,vendor:"Voolia",tld:"name",category:"grocery",popularity:.39,cdf:78620},{id:772,vendor:"Pixope",tld:"net",category:"home",popularity:.39,cdf:79010},{id:801,vendor:"Tagtune",tld:"com",category:"clothing",popularity:.39,cdf:79400},{id:830,vendor:"Layo",tld:"net",category:"games",popularity:.39,cdf:79790},{id:863,vendor:"Skiptube",tld:"gov",category:"jewelry",popularity:.39,cdf:80180},{id:889,vendor:"Feedmix",tld:"edu",category:"toys",popularity:.39,cdf:80570},{id:108,vendor:"Livetube",tld:"net",category:"automotive",popularity:.4,cdf:80970},{id:118,vendor:"Photobug",tld:"mil",category:"outdoors",popularity:.4,cdf:81370},{id:133,vendor:"Yodel",tld:"info",category:"electronics",popularity:.4,cdf:81770},{id:289,vendor:"Meeveo",tld:"name",category:"health",popularity:.4,cdf:82170},{id:438,vendor:"Avaveo",tld:"org",category:"electronics",popularity:.4,cdf:82570},{id:469,vendor:"Thoughtmix",tld:"biz",category:"kids",popularity:.4,cdf:82970},{id:476,vendor:"Meejo",tld:"org",category:"outdoors",popularity:.4,cdf:83370},{id:781,vendor:"Zoozzy",tld:"org",category:"garden",popularity:.4,cdf:83770},{id:963,vendor:"Youtags",tld:"info",category:"industrial",popularity:.4,cdf:84170},{id:17,vendor:"Einti",tld:"name",category:"shoes",popularity:.41,cdf:84580},{id:36,vendor:"Gevee",tld:"mil",category:"computers",popularity:.41,cdf:84990},{id:76,vendor:"Tagchat",tld:"biz",category:"toys",popularity:.41,cdf:85400},{id:150,vendor:"Trudoo",tld:"net",category:"music",popularity:.41,cdf:85810},{id:234,vendor:"Skyvu",tld:"org",category:"garden",popularity:.41,cdf:86220},{id:302,vendor:"Realcube",tld:"biz",category:"outdoors",popularity:.41,cdf:86630},{id:307,vendor:"Feedmix",tld:"biz",category:"health",popularity:.41,cdf:87040},{id:342,vendor:"Avamba",tld:"name",category:"sports",popularity:.41,cdf:87450},{id:357,vendor:"Kare",tld:"net",category:"music",popularity:.41,cdf:87860},{id:369,vendor:"Skiptube",tld:"net",category:"jewelry",popularity:.41,cdf:88270},{id:375,vendor:"Dazzlesphere",tld:"edu",category:"toys",popularity:.41,cdf:88680},{id:488,vendor:"Omba",tld:"com",category:"games",popularity:.41,cdf:89090},{id:677,vendor:"Wordtune",tld:"name",category:"kids",popularity:.41,cdf:89500},{id:712,vendor:"Latz",tld:"net",category:"health",popularity:.41,cdf:89910},{id:728,vendor:"Riffpedia",tld:"com",category:"electronics",popularity:.41,cdf:90320},{id:187,vendor:"Eazzy",tld:"net",category:"beauty",popularity:.42,cdf:90740},{id:255,vendor:"Youopia",tld:"gov",category:"kids",popularity:.42,cdf:91160},{id:299,vendor:"Gabspot",tld:"gov",category:"industrial",popularity:.42,cdf:91580},{id:363,vendor:"Tagopia",tld:"net",category:"tools",popularity:.42,cdf:92e3},{id:383,vendor:"Zooveo",tld:"org",category:"beauty",popularity:.42,cdf:92420},{id:447,vendor:"Ntags",tld:"org",category:"kids",popularity:.42,cdf:92840},{id:472,vendor:"Ooba",tld:"info",category:"industrial",popularity:.42,cdf:93260},{id:709,vendor:"Jayo",tld:"com",category:"jewelry",popularity:.42,cdf:93680},{id:711,vendor:"Livefish",tld:"com",category:"baby",popularity:.42,cdf:94100},{id:778,vendor:"Kayveo",tld:"biz",category:"shoes",popularity:.42,cdf:94520},{id:782,vendor:"Topiclounge",tld:"name",category:"toys",popularity:.42,cdf:94940},{id:885,vendor:"Twitternation",tld:"biz",category:"clothing",popularity:.42,cdf:95360},{id:910,vendor:"Edgepulse",tld:"edu",category:"movies",popularity:.42,cdf:95780},{id:986,vendor:"Yodo",tld:"mil",category:"clothing",popularity:.42,cdf:96200},{id:33,vendor:"Chatterbridge",tld:"com",category:"jewelry",popularity:.43,cdf:96630},{id:60,vendor:"Dynabox",tld:"biz",category:"automotive",popularity:.43,cdf:97060},{id:171,vendor:"Jabbersphere",tld:"com",category:"shoes",popularity:.43,cdf:97490},{id:212,vendor:"Jayo",tld:"edu",category:"computers",popularity:.43,cdf:97920},{id:231,vendor:"Oyonder",tld:"info",category:"garden",popularity:.43,cdf:98350},{id:311,vendor:"Dynazzy",tld:"name",category:"shoes",popularity:.43,cdf:98780},{id:315,vendor:"Quinu",tld:"net",category:"home",popularity:.43,cdf:99210},{id:470,vendor:"Topiclounge",tld:"biz",category:"garden",popularity:.43,cdf:99640},{id:509,vendor:"Chatterpoint",tld:"edu",category:"baby",popularity:.43,cdf:100070},{id:595,vendor:"Digitube",tld:"info",category:"automotive",popularity:.43,cdf:100500},{id:600,vendor:"Tagtune",tld:"org",category:"beauty",popularity:.43,cdf:100930},{id:668,vendor:"Feednation",tld:"info",category:"sports",popularity:.43,cdf:101360},{id:721,vendor:"Devpulse",tld:"mil",category:"sports",popularity:.43,cdf:101790},{id:775,vendor:"Jetwire",tld:"gov",category:"health",popularity:.43,cdf:102220},{id:880,vendor:"Youopia",tld:"edu",category:"health",popularity:.43,cdf:102650},{id:903,vendor:"Topicware",tld:"gov",category:"jewelry",popularity:.43,cdf:103080},{id:907,vendor:"Eidel",tld:"org",category:"home",popularity:.43,cdf:103510},{id:915,vendor:"Mymm",tld:"edu",category:"music",popularity:.43,cdf:103940},{id:988,vendor:"Linkbridge",tld:"edu",category:"clothing",popularity:.43,cdf:104370},{id:34,vendor:"Edgepulse",tld:"edu",category:"jewelry",popularity:.44,cdf:104810},{id:163,vendor:"Pixonyx",tld:"org",category:"garden",popularity:.44,cdf:105250},{id:245,vendor:"Jabbersphere",tld:"info",category:"outdoors",popularity:.44,cdf:105690},{id:297,vendor:"Kimia",tld:"biz",category:"games",popularity:.44,cdf:106130},{id:366,vendor:"Kazio",tld:"edu",category:"books",popularity:.44,cdf:106570},{id:405,vendor:"Eayo",tld:"info",category:"tools",popularity:.44,cdf:107010},{id:523,vendor:"Avavee",tld:"info",category:"computers",popularity:.44,cdf:107450},{id:546,vendor:"Yadel",tld:"gov",category:"shoes",popularity:.44,cdf:107890},{id:570,vendor:"Youopia",tld:"biz",category:"beauty",popularity:.44,cdf:108330},{id:900,vendor:"Topiclounge",tld:"gov",category:"outdoors",popularity:.44,cdf:108770},{id:949,vendor:"Tagpad",tld:"gov",category:"health",popularity:.44,cdf:109210},{id:956,vendor:"Youbridge",tld:"net",category:"clothing",popularity:.44,cdf:109650},{id:39,vendor:"Roombo",tld:"info",category:"tools",popularity:.45,cdf:110100},{id:142,vendor:"Realmix",tld:"org",category:"kids",popularity:.45,cdf:110550},{id:293,vendor:"Zooveo",tld:"info",category:"games",popularity:.45,cdf:111e3},{id:323,vendor:"Thoughtstorm",tld:"net",category:"movies",popularity:.45,cdf:111450},{id:351,vendor:"Brainlounge",tld:"org",category:"books",popularity:.45,cdf:111900},{id:378,vendor:"Jaxnation",tld:"org",category:"computers",popularity:.45,cdf:112350},{id:530,vendor:"Ooba",tld:"name",category:"games",popularity:.45,cdf:112800},{id:571,vendor:"Tagchat",tld:"mil",category:"jewelry",popularity:.45,cdf:113250},{id:589,vendor:"Zoovu",tld:"mil",category:"automotive",popularity:.45,cdf:113700},{id:630,vendor:"Thoughtblab",tld:"name",category:"books",popularity:.45,cdf:114150},{id:637,vendor:"Yodel",tld:"edu",category:"books",popularity:.45,cdf:114600},{id:722,vendor:"Fivechat",tld:"info",category:"kids",popularity:.45,cdf:115050},{id:734,vendor:"Shuffledrive",tld:"info",category:"beauty",popularity:.45,cdf:115500},{id:796,vendor:"Voomm",tld:"com",category:"shoes",popularity:.45,cdf:115950},{id:809,vendor:"Lajo",tld:"com",category:"books",popularity:.45,cdf:116400},{id:828,vendor:"Dabvine",tld:"com",category:"beauty",popularity:.45,cdf:116850},{id:37,vendor:"Kwinu",tld:"mil",category:"sports",popularity:.46,cdf:117310},{id:136,vendor:"Riffpath",tld:"mil",category:"jewelry",popularity:.46,cdf:117770},{id:195,vendor:"Gabvine",tld:"info",category:"tools",popularity:.46,cdf:118230},{id:312,vendor:"Zoomzone",tld:"biz",category:"sports",popularity:.46,cdf:118690},{id:347,vendor:"Avamm",tld:"name",category:"baby",popularity:.46,cdf:119150},{id:376,vendor:"Rhynyx",tld:"gov",category:"beauty",popularity:.46,cdf:119610},{id:406,vendor:"Zoomzone",tld:"info",category:"toys",popularity:.46,cdf:120070},{id:429,vendor:"Jamia",tld:"net",category:"music",popularity:.46,cdf:120530},{id:482,vendor:"Divanoodle",tld:"org",category:"toys",popularity:.46,cdf:120990},{id:576,vendor:"Tagfeed",tld:"name",category:"outdoors",popularity:.46,cdf:121450},{id:713,vendor:"Mybuzz",tld:"gov",category:"home",popularity:.46,cdf:121910},{id:724,vendor:"Kayveo",tld:"biz",category:"books",popularity:.46,cdf:122370},{id:813,vendor:"Ainyx",tld:"com",category:"shoes",popularity:.46,cdf:122830},{id:934,vendor:"Quimm",tld:"net",category:"shoes",popularity:.46,cdf:123290},{id:996,vendor:"Yakidoo",tld:"gov",category:"shoes",popularity:.46,cdf:123750},{id:12,vendor:"Twinte",tld:"biz",category:"clothing",popularity:.47,cdf:124220},{id:38,vendor:"Quire",tld:"mil",category:"industrial",popularity:.47,cdf:124690},{id:64,vendor:"Fatz",tld:"info",category:"music",popularity:.47,cdf:125160},{id:120,vendor:"Dabshots",tld:"mil",category:"shoes",popularity:.47,cdf:125630},{id:239,vendor:"Photobug",tld:"edu",category:"sports",popularity:.47,cdf:126100},{id:276,vendor:"Quatz",tld:"com",category:"sports",popularity:.47,cdf:126570},{id:528,vendor:"Roombo",tld:"org",category:"clothing",popularity:.47,cdf:127040},{id:574,vendor:"Browseblab",tld:"org",category:"tools",popularity:.47,cdf:127510},{id:626,vendor:"Fadeo",tld:"com",category:"movies",popularity:.47,cdf:127980},{id:681,vendor:"Topicshots",tld:"gov",category:"shoes",popularity:.47,cdf:128450},{id:707,vendor:"Riffpedia",tld:"edu",category:"electronics",popularity:.47,cdf:128920},{id:774,vendor:"Voonyx",tld:"gov",category:"beauty",popularity:.47,cdf:129390},{id:810,vendor:"Abata",tld:"gov",category:"clothing",popularity:.47,cdf:129860},{id:909,vendor:"Twitterworks",tld:"net",category:"automotive",popularity:.47,cdf:130330},{id:948,vendor:"Babbleblab",tld:"org",category:"health",popularity:.47,cdf:130800},{id:955,vendor:"Fatz",tld:"edu",category:"garden",popularity:.47,cdf:131270},{id:968,vendor:"Youspan",tld:"biz",category:"electronics",popularity:.47,cdf:131740},{id:105,vendor:"Bluejam",tld:"edu",category:"health",popularity:.48,cdf:132220},{id:109,vendor:"Eidel",tld:"gov",category:"baby",popularity:.48,cdf:132700},{id:112,vendor:"Omba",tld:"biz",category:"jewelry",popularity:.48,cdf:133180},{id:256,vendor:"Buzzdog",tld:"mil",category:"toys",popularity:.48,cdf:133660},{id:260,vendor:"Livetube",tld:"biz",category:"games",popularity:.48,cdf:134140},{id:261,vendor:"Eare",tld:"com",category:"industrial",popularity:.48,cdf:134620},{id:327,vendor:"Skippad",tld:"org",category:"games",popularity:.48,cdf:135100},{id:467,vendor:"Livetube",tld:"biz",category:"games",popularity:.48,cdf:135580},{id:754,vendor:"Zoonder",tld:"mil",category:"sports",popularity:.48,cdf:136060},{id:760,vendor:"LiveZ",tld:"gov",category:"electronics",popularity:.48,cdf:136540},{id:800,vendor:"Feedmix",tld:"com",category:"toys",popularity:.48,cdf:137020},{id:852,vendor:"Eare",tld:"org",category:"sports",popularity:.48,cdf:137500},{id:853,vendor:"Skippad",tld:"biz",category:"kids",popularity:.48,cdf:137980},{id:884,vendor:"Edgeblab",tld:"net",category:"toys",popularity:.48,cdf:138460},{id:908,vendor:"Flipbug",tld:"mil",category:"health",popularity:.48,cdf:138940},{id:933,vendor:"Youspan",tld:"net",category:"shoes",popularity:.48,cdf:139420},{id:953,vendor:"Skalith",tld:"gov",category:"computers",popularity:.48,cdf:139900},{id:999,vendor:"Jaxspan",tld:"mil",category:"baby",popularity:.48,cdf:140380},{id:70,vendor:"Meezzy",tld:"biz",category:"shoes",popularity:.49,cdf:140870},{id:115,vendor:"Shufflester",tld:"mil",category:"music",popularity:.49,cdf:141360},{id:364,vendor:"Brainlounge",tld:"gov",category:"outdoors",popularity:.49,cdf:141850},{id:401,vendor:"Jabberbean",tld:"biz",category:"kids",popularity:.49,cdf:142340},{id:408,vendor:"Blogtags",tld:"biz",category:"home",popularity:.49,cdf:142830},{id:596,vendor:"Avavee",tld:"com",category:"sports",popularity:.49,cdf:143320},{id:743,vendor:"Omba",tld:"mil",category:"electronics",popularity:.49,cdf:143810},{id:744,vendor:"Trilith",tld:"com",category:"music",popularity:.49,cdf:144300},{id:831,vendor:"Zoomlounge",tld:"org",category:"games",popularity:.49,cdf:144790},{id:844,vendor:"Realfire",tld:"edu",category:"home",popularity:.49,cdf:145280},{id:845,vendor:"Dabshots",tld:"edu",category:"tools",popularity:.49,cdf:145770},{id:893,vendor:"Vipe",tld:"edu",category:"outdoors",popularity:.49,cdf:146260},{id:942,vendor:"Avamba",tld:"edu",category:"jewelry",popularity:.49,cdf:146750},{id:107,vendor:"Ainyx",tld:"name",category:"toys",popularity:.5,cdf:147250},{id:156,vendor:"Flipstorm",tld:"info",category:"tools",popularity:.5,cdf:147750},{id:274,vendor:"Chatterpoint",tld:"org",category:"toys",popularity:.5,cdf:148250},{id:298,vendor:"Ooba",tld:"com",category:"kids",popularity:.5,cdf:148750},{id:386,vendor:"Zoozzy",tld:"mil",category:"baby",popularity:.5,cdf:149250},{id:501,vendor:"Divape",tld:"biz",category:"garden",popularity:.5,cdf:149750},{id:652,vendor:"Fiveclub",tld:"org",category:"outdoors",popularity:.5,cdf:150250},{id:662,vendor:"Wikizz",tld:"info",category:"clothing",popularity:.5,cdf:150750},{id:703,vendor:"Livefish",tld:"name",category:"garden",popularity:.5,cdf:151250},{id:750,vendor:"Pixoboo",tld:"net",category:"computers",popularity:.5,cdf:151750},{id:803,vendor:"Babbleblab",tld:"net",category:"toys",popularity:.5,cdf:152250},{id:817,vendor:"Agimba",tld:"biz",category:"computers",popularity:.5,cdf:152750},{id:834,vendor:"Izio",tld:"org",category:"movies",popularity:.5,cdf:153250},{id:874,vendor:"Kwideo",tld:"name",category:"music",popularity:.5,cdf:153750},{id:886,vendor:"Babbleblab",tld:"info",category:"computers",popularity:.5,cdf:154250},{id:897,vendor:"Wikizz",tld:"info",category:"jewelry",popularity:.5,cdf:154750},{id:43,vendor:"Ainyx",tld:"biz",category:"kids",popularity:.51,cdf:155260},{id:221,vendor:"Vinder",tld:"org",category:"electronics",popularity:.51,cdf:155770},{id:358,vendor:"Photolist",tld:"info",category:"shoes",popularity:.51,cdf:156280},{id:510,vendor:"Tazzy",tld:"org",category:"automotive",popularity:.51,cdf:156790},{id:658,vendor:"Lazz",tld:"edu",category:"baby",popularity:.51,cdf:157300},{id:715,vendor:"Photojam",tld:"com",category:"automotive",popularity:.51,cdf:157810},{id:823,vendor:"Thoughtblab",tld:"org",category:"computers",popularity:.51,cdf:158320},{id:829,vendor:"Devpulse",tld:"net",category:"movies",popularity:.51,cdf:158830},{id:867,vendor:"Livepath",tld:"net",category:"clothing",popularity:.51,cdf:159340},{id:951,vendor:"Voomm",tld:"edu",category:"shoes",popularity:.51,cdf:159850},{id:164,vendor:"Twimm",tld:"org",category:"beauty",popularity:.52,cdf:160370},{id:207,vendor:"Photojam",tld:"com",category:"electronics",popularity:.52,cdf:160890},{id:273,vendor:"Fivespan",tld:"info",category:"automotive",popularity:.52,cdf:161410},{id:349,vendor:"Photobug",tld:"edu",category:"baby",popularity:.52,cdf:161930},{id:359,vendor:"Photobug",tld:"net",category:"toys",popularity:.52,cdf:162450},{id:431,vendor:"LiveZ",tld:"edu",category:"baby",popularity:.52,cdf:162970},{id:464,vendor:"Thoughtstorm",tld:"info",category:"games",popularity:.52,cdf:163490},{id:511,vendor:"Yotz",tld:"info",category:"tools",popularity:.52,cdf:164010},{id:524,vendor:"Leenti",tld:"mil",category:"toys",popularity:.52,cdf:164530},{id:555,vendor:"Myworks",tld:"info",category:"music",popularity:.52,cdf:165050},{id:563,vendor:"Devshare",tld:"biz",category:"toys",popularity:.52,cdf:165570},{id:735,vendor:"Skaboo",tld:"mil",category:"computers",popularity:.52,cdf:166090},{id:825,vendor:"Quire",tld:"org",category:"electronics",popularity:.52,cdf:166610},{id:4,vendor:"Kimia",tld:"gov",category:"movies",popularity:.53,cdf:167140},{id:122,vendor:"Oyope",tld:"biz",category:"electronics",popularity:.53,cdf:167670},{id:123,vendor:"Kimia",tld:"org",category:"tools",popularity:.53,cdf:168200},{id:131,vendor:"Topdrive",tld:"gov",category:"industrial",popularity:.53,cdf:168730},{id:277,vendor:"Eimbee",tld:"gov",category:"automotive",popularity:.53,cdf:169260},{id:279,vendor:"Meevee",tld:"mil",category:"computers",popularity:.53,cdf:169790},{id:288,vendor:"Flashset",tld:"edu",category:"games",popularity:.53,cdf:170320},{id:317,vendor:"Jatri",tld:"info",category:"clothing",popularity:.53,cdf:170850},{id:337,vendor:"Livepath",tld:"com",category:"games",popularity:.53,cdf:171380},{id:344,vendor:"Zoombox",tld:"gov",category:"jewelry",popularity:.53,cdf:171910},{id:390,vendor:"Bluezoom",tld:"gov",category:"books",popularity:.53,cdf:172440},{id:425,vendor:"Brainsphere",tld:"name",category:"books",popularity:.53,cdf:172970},{id:535,vendor:"Riffpath",tld:"biz",category:"health",popularity:.53,cdf:173500},{id:572,vendor:"Quire",tld:"info",category:"health",popularity:.53,cdf:174030},{id:695,vendor:"Youfeed",tld:"net",category:"games",popularity:.53,cdf:174560},{id:727,vendor:"BlogXS",tld:"edu",category:"garden",popularity:.53,cdf:175090},{id:747,vendor:"Shufflebeat",tld:"net",category:"kids",popularity:.53,cdf:175620},{id:767,vendor:"Fivechat",tld:"edu",category:"kids",popularity:.53,cdf:176150},{id:916,vendor:"Linkbuzz",tld:"edu",category:"clothing",popularity:.53,cdf:176680},{id:958,vendor:"Twimm",tld:"net",category:"jewelry",popularity:.53,cdf:177210},{id:970,vendor:"DabZ",tld:"info",category:"clothing",popularity:.53,cdf:177740},{id:981,vendor:"Jabberstorm",tld:"biz",category:"movies",popularity:.53,cdf:178270},{id:14,vendor:"Oyonder",tld:"com",category:"garden",popularity:.54,cdf:178810},{id:26,vendor:"Jetwire",tld:"edu",category:"toys",popularity:.54,cdf:179350},{id:32,vendor:"Twitterbeat",tld:"mil",category:"jewelry",popularity:.54,cdf:179890},{id:116,vendor:"Fivebridge",tld:"com",category:"industrial",popularity:.54,cdf:180430},{id:246,vendor:"Eabox",tld:"edu",category:"baby",popularity:.54,cdf:180970},{id:316,vendor:"Jabbertype",tld:"info",category:"industrial",popularity:.54,cdf:181510},{id:365,vendor:"Brainverse",tld:"org",category:"kids",popularity:.54,cdf:182050},{id:533,vendor:"Meezzy",tld:"edu",category:"kids",popularity:.54,cdf:182590},{id:824,vendor:"Pixoboo",tld:"gov",category:"electronics",popularity:.54,cdf:183130},{id:837,vendor:"Eayo",tld:"com",category:"clothing",popularity:.54,cdf:183670},{id:887,vendor:"Topdrive",tld:"com",category:"books",popularity:.54,cdf:184210},{id:896,vendor:"Mybuzz",tld:"info",category:"kids",popularity:.54,cdf:184750},{id:983,vendor:"Oyondu",tld:"edu",category:"health",popularity:.54,cdf:185290},{id:3,vendor:"Feedfire",tld:"gov",category:"sports",popularity:.55,cdf:185840},{id:57,vendor:"Pixope",tld:"net",category:"jewelry",popularity:.55,cdf:186390},{id:92,vendor:"Aimbo",tld:"mil",category:"baby",popularity:.55,cdf:186940},{id:117,vendor:"Topicshots",tld:"biz",category:"toys",popularity:.55,cdf:187490},{id:166,vendor:"Pixope",tld:"org",category:"clothing",popularity:.55,cdf:188040},{id:182,vendor:"Tambee",tld:"edu",category:"baby",popularity:.55,cdf:188590},{id:227,vendor:"Rhynyx",tld:"name",category:"electronics",popularity:.55,cdf:189140},{id:228,vendor:"Centizu",tld:"gov",category:"computers",popularity:.55,cdf:189690},{id:249,vendor:"Dabtype",tld:"mil",category:"jewelry",popularity:.55,cdf:190240},{id:250,vendor:"Skyvu",tld:"edu",category:"movies",popularity:.55,cdf:190790},{id:309,vendor:"Vinder",tld:"info",category:"beauty",popularity:.55,cdf:191340},{id:335,vendor:"Oyoyo",tld:"gov",category:"books",popularity:.55,cdf:191890},{id:432,vendor:"Realbuzz",tld:"biz",category:"grocery",popularity:.55,cdf:192440},{id:503,vendor:"Gigazoom",tld:"mil",category:"electronics",popularity:.55,cdf:192990},{id:575,vendor:"Flashset",tld:"name",category:"electronics",popularity:.55,cdf:193540},{id:622,vendor:"Meevee",tld:"net",category:"shoes",popularity:.55,cdf:194090},{id:653,vendor:"Talane",tld:"org",category:"home",popularity:.55,cdf:194640},{id:746,vendor:"Blogspan",tld:"gov",category:"health",popularity:.55,cdf:195190},{id:762,vendor:"Photobean",tld:"gov",category:"baby",popularity:.55,cdf:195740},{id:777,vendor:"Dynabox",tld:"info",category:"grocery",popularity:.55,cdf:196290},{id:95,vendor:"Browsedrive",tld:"org",category:"beauty",popularity:.56,cdf:196850},{id:151,vendor:"Photolist",tld:"edu",category:"health",popularity:.56,cdf:197410},{id:174,vendor:"Izio",tld:"gov",category:"tools",popularity:.56,cdf:197970},{id:241,vendor:"Tagcat",tld:"mil",category:"kids",popularity:.56,cdf:198530},{id:618,vendor:"Topicblab",tld:"com",category:"kids",popularity:.56,cdf:199090},{id:642,vendor:"Zoomdog",tld:"gov",category:"movies",popularity:.56,cdf:199650},{id:654,vendor:"Jaxbean",tld:"com",category:"computers",popularity:.56,cdf:200210},{id:752,vendor:"Youtags",tld:"biz",category:"electronics",popularity:.56,cdf:200770},{id:898,vendor:"Kazio",tld:"info",category:"clothing",popularity:.56,cdf:201330},{id:954,vendor:"Photobug",tld:"name",category:"movies",popularity:.56,cdf:201890},{id:985,vendor:"Edgewire",tld:"edu",category:"industrial",popularity:.56,cdf:202450},{id:29,vendor:"Eare",tld:"gov",category:"tools",popularity:.57,cdf:203020},{id:153,vendor:"Buzzbean",tld:"org",category:"movies",popularity:.57,cdf:203590},{id:235,vendor:"Dabvine",tld:"mil",category:"computers",popularity:.57,cdf:204160},{id:333,vendor:"Bubblebox",tld:"name",category:"beauty",popularity:.57,cdf:204730},{id:367,vendor:"Thoughtbeat",tld:"mil",category:"music",popularity:.57,cdf:205300},{id:368,vendor:"Yakidoo",tld:"org",category:"tools",popularity:.57,cdf:205870},{id:398,vendor:"Tazzy",tld:"edu",category:"shoes",popularity:.57,cdf:206440},{id:458,vendor:"Yakijo",tld:"info",category:"jewelry",popularity:.57,cdf:207010},{id:468,vendor:"Flipstorm",tld:"gov",category:"industrial",popularity:.57,cdf:207580},{id:544,vendor:"Skinder",tld:"org",category:"sports",popularity:.57,cdf:208150},{id:561,vendor:"Browsezoom",tld:"com",category:"kids",popularity:.57,cdf:208720},{id:564,vendor:"Photofeed",tld:"edu",category:"automotive",popularity:.57,cdf:209290},{id:583,vendor:"Cogibox",tld:"com",category:"garden",popularity:.57,cdf:209860},{id:615,vendor:"Riffpedia",tld:"info",category:"tools",popularity:.57,cdf:210430},{id:826,vendor:"Vitz",tld:"com",category:"beauty",popularity:.57,cdf:211e3},{id:843,vendor:"Realblab",tld:"name",category:"garden",popularity:.57,cdf:211570},{id:894,vendor:"Browsezoom",tld:"mil",category:"health",popularity:.57,cdf:212140},{id:930,vendor:"Podcat",tld:"com",category:"outdoors",popularity:.57,cdf:212710},{id:965,vendor:"Feedbug",tld:"info",category:"kids",popularity:.57,cdf:213280},{id:22,vendor:"Wikibox",tld:"edu",category:"toys",popularity:.58,cdf:213860},{id:240,vendor:"Gabtype",tld:"mil",category:"tools",popularity:.58,cdf:214440},{id:280,vendor:"Kwideo",tld:"biz",category:"industrial",popularity:.58,cdf:215020},{id:387,vendor:"Skyble",tld:"edu",category:"shoes",popularity:.58,cdf:215600},{id:389,vendor:"Buzzster",tld:"org",category:"industrial",popularity:.58,cdf:216180},{id:403,vendor:"Twitterwire",tld:"gov",category:"books",popularity:.58,cdf:216760},{id:435,vendor:"Talane",tld:"name",category:"jewelry",popularity:.58,cdf:217340},{id:612,vendor:"Zooveo",tld:"edu",category:"clothing",popularity:.58,cdf:217920},{id:675,vendor:"InnoZ",tld:"com",category:"tools",popularity:.58,cdf:218500},{id:797,vendor:"Browsezoom",tld:"org",category:"automotive",popularity:.58,cdf:219080},{id:980,vendor:"Jayo",tld:"com",category:"clothing",popularity:.58,cdf:219660},{id:10,vendor:"Quatz",tld:"mil",category:"garden",popularity:.59,cdf:220250},{id:40,vendor:"Linkbuzz",tld:"net",category:"kids",popularity:.59,cdf:220840},{id:58,vendor:"Twiyo",tld:"mil",category:"automotive",popularity:.59,cdf:221430},{id:328,vendor:"Lazzy",tld:"name",category:"electronics",popularity:.59,cdf:222020},{id:355,vendor:"Feedspan",tld:"com",category:"home",popularity:.59,cdf:222610},{id:362,vendor:"Lajo",tld:"mil",category:"grocery",popularity:.59,cdf:223200},{id:441,vendor:"Voomm",tld:"org",category:"shoes",popularity:.59,cdf:223790},{id:487,vendor:"Jazzy",tld:"mil",category:"computers",popularity:.59,cdf:224380},{id:496,vendor:"BlogXS",tld:"gov",category:"sports",popularity:.59,cdf:224970},{id:568,vendor:"Yodel",tld:"name",category:"home",popularity:.59,cdf:225560},{id:604,vendor:"Quimba",tld:"biz",category:"games",popularity:.59,cdf:226150},{id:617,vendor:"Skibox",tld:"net",category:"games",popularity:.59,cdf:226740},{id:636,vendor:"Buzzshare",tld:"info",category:"tools",popularity:.59,cdf:227330},{id:859,vendor:"Topiclounge",tld:"name",category:"tools",popularity:.59,cdf:227920},{id:962,vendor:"Skimia",tld:"gov",category:"garden",popularity:.59,cdf:228510},{id:2,vendor:"Linkbridge",tld:"edu",category:"books",popularity:.6,cdf:229110},{id:89,vendor:"Babbleopia",tld:"gov",category:"automotive",popularity:.6,cdf:229710},{id:294,vendor:"Feedbug",tld:"edu",category:"games",popularity:.6,cdf:230310},{id:512,vendor:"Wikivu",tld:"info",category:"sports",popularity:.6,cdf:230910},{id:667,vendor:"Flipopia",tld:"edu",category:"sports",popularity:.6,cdf:231510},{id:739,vendor:"Mydo",tld:"org",category:"tools",popularity:.6,cdf:232110},{id:906,vendor:"Trilith",tld:"name",category:"industrial",popularity:.6,cdf:232710},{id:998,vendor:"Fivechat",tld:"name",category:"grocery",popularity:.6,cdf:233310},{id:121,vendor:"Aimbo",tld:"mil",category:"jewelry",popularity:.61,cdf:233920},{id:184,vendor:"Zoovu",tld:"mil",category:"games",popularity:.61,cdf:234530},{id:185,vendor:"InnoZ",tld:"biz",category:"beauty",popularity:.61,cdf:235140},{id:190,vendor:"Browsedrive",tld:"net",category:"automotive",popularity:.61,cdf:235750},{id:223,vendor:"Thoughtstorm",tld:"mil",category:"beauty",popularity:.61,cdf:236360},{id:264,vendor:"Avavee",tld:"info",category:"automotive",popularity:.61,cdf:236970},{id:421,vendor:"Eidel",tld:"com",category:"movies",popularity:.61,cdf:237580},{id:610,vendor:"Livetube",tld:"info",category:"industrial",popularity:.61,cdf:238190},{id:683,vendor:"Flashdog",tld:"gov",category:"movies",popularity:.61,cdf:238800},{id:699,vendor:"Realcube",tld:"com",category:"movies",popularity:.61,cdf:239410},{id:815,vendor:"Twitterlist",tld:"gov",category:"home",popularity:.61,cdf:240020},{id:875,vendor:"Meezzy",tld:"info",category:"electronics",popularity:.61,cdf:240630},{id:925,vendor:"Tanoodle",tld:"info",category:"movies",popularity:.61,cdf:241240},{id:45,vendor:"Oloo",tld:"biz",category:"home",popularity:.62,cdf:241860},{id:106,vendor:"Twitterwire",tld:"org",category:"garden",popularity:.62,cdf:242480},{id:137,vendor:"Jaloo",tld:"name",category:"baby",popularity:.62,cdf:243100},{id:167,vendor:"Camimbo",tld:"gov",category:"kids",popularity:.62,cdf:243720},{id:177,vendor:"Rhyloo",tld:"biz",category:"games",popularity:.62,cdf:244340},{id:186,vendor:"Tagfeed",tld:"mil",category:"outdoors",popularity:.62,cdf:244960},{id:197,vendor:"Riffpedia",tld:"info",category:"grocery",popularity:.62,cdf:245580},{id:253,vendor:"Camido",tld:"net",category:"health",popularity:.62,cdf:246200},{id:259,vendor:"Dynabox",tld:"info",category:"electronics",popularity:.62,cdf:246820},{id:265,vendor:"Jabbertype",tld:"org",category:"automotive",popularity:.62,cdf:247440},{id:412,vendor:"Shufflebeat",tld:"net",category:"tools",popularity:.62,cdf:248060},{id:494,vendor:"Eayo",tld:"name",category:"toys",popularity:.62,cdf:248680},{id:663,vendor:"Gigaclub",tld:"net",category:"kids",popularity:.62,cdf:249300},{id:741,vendor:"Youopia",tld:"biz",category:"music",popularity:.62,cdf:249920},{id:764,vendor:"Abata",tld:"mil",category:"health",popularity:.62,cdf:250540},{id:808,vendor:"Quimba",tld:"mil",category:"computers",popularity:.62,cdf:251160},{id:840,vendor:"Feedfish",tld:"gov",category:"kids",popularity:.62,cdf:251780},{id:876,vendor:"Yozio",tld:"name",category:"music",popularity:.62,cdf:252400},{id:987,vendor:"Oozz",tld:"info",category:"shoes",popularity:.62,cdf:253020},{id:15,vendor:"Babbleblab",tld:"gov",category:"kids",popularity:.63,cdf:253650},{id:50,vendor:"Dabfeed",tld:"mil",category:"movies",popularity:.63,cdf:254280},{id:68,vendor:"Thoughtstorm",tld:"biz",category:"health",popularity:.63,cdf:254910},{id:132,vendor:"Yoveo",tld:"info",category:"computers",popularity:.63,cdf:255540},{id:148,vendor:"Photobug",tld:"org",category:"toys",popularity:.63,cdf:256170},{id:178,vendor:"Rhynyx",tld:"mil",category:"sports",popularity:.63,cdf:256800},{id:248,vendor:"Eamia",tld:"biz",category:"tools",popularity:.63,cdf:257430},{id:254,vendor:"Wikizz",tld:"info",category:"industrial",popularity:.63,cdf:258060},{id:287,vendor:"Vimbo",tld:"name",category:"garden",popularity:.63,cdf:258690},{id:348,vendor:"Yozio",tld:"org",category:"toys",popularity:.63,cdf:259320},{id:397,vendor:"BlogXS",tld:"info",category:"grocery",popularity:.63,cdf:259950},{id:418,vendor:"Dazzlesphere",tld:"mil",category:"beauty",popularity:.63,cdf:260580},{id:522,vendor:"Agivu",tld:"gov",category:"toys",popularity:.63,cdf:261210},{id:645,vendor:"Twiyo",tld:"net",category:"baby",popularity:.63,cdf:261840},{id:718,vendor:"Quimm",tld:"com",category:"clothing",popularity:.63,cdf:262470},{id:757,vendor:"Tanoodle",tld:"gov",category:"movies",popularity:.63,cdf:263100},{id:766,vendor:"Katz",tld:"name",category:"outdoors",popularity:.63,cdf:263730},{id:783,vendor:"Skipstorm",tld:"org",category:"home",popularity:.63,cdf:264360},{id:928,vendor:"Yakidoo",tld:"net",category:"shoes",popularity:.63,cdf:264990},{id:973,vendor:"Avavee",tld:"org",category:"clothing",popularity:.63,cdf:265620},{id:61,vendor:"Browseblab",tld:"edu",category:"automotive",popularity:.64,cdf:266260},{id:140,vendor:"Mymm",tld:"org",category:"computers",popularity:.64,cdf:266900},{id:169,vendor:"Meeveo",tld:"com",category:"movies",popularity:.64,cdf:267540},{id:214,vendor:"Eadel",tld:"biz",category:"movies",popularity:.64,cdf:268180},{id:284,vendor:"Gabtune",tld:"gov",category:"beauty",popularity:.64,cdf:268820},{id:456,vendor:"Pixonyx",tld:"com",category:"grocery",popularity:.64,cdf:269460},{id:590,vendor:"Yodel",tld:"biz",category:"garden",popularity:.64,cdf:270100},{id:593,vendor:"Topicblab",tld:"net",category:"books",popularity:.64,cdf:270740},{id:597,vendor:"Cogibox",tld:"org",category:"beauty",popularity:.64,cdf:271380},{id:608,vendor:"Eayo",tld:"biz",category:"electronics",popularity:.64,cdf:272020},{id:770,vendor:"Yambee",tld:"mil",category:"movies",popularity:.64,cdf:272660},{id:789,vendor:"Mita",tld:"org",category:"sports",popularity:.64,cdf:273300},{id:857,vendor:"Voolia",tld:"com",category:"garden",popularity:.64,cdf:273940},{id:931,vendor:"Kare",tld:"org",category:"shoes",popularity:.64,cdf:274580},{id:944,vendor:"Edgeify",tld:"gov",category:"books",popularity:.64,cdf:275220},{id:27,vendor:"Topicshots",tld:"info",category:"movies",popularity:.65,cdf:275870},{id:91,vendor:"Dabshots",tld:"name",category:"home",popularity:.65,cdf:276520},{id:135,vendor:"Browsebug",tld:"info",category:"toys",popularity:.65,cdf:277170},{id:162,vendor:"Twimm",tld:"org",category:"sports",popularity:.65,cdf:277820},{id:263,vendor:"Dabtype",tld:"name",category:"books",popularity:.65,cdf:278470},{id:471,vendor:"Mydeo",tld:"name",category:"books",popularity:.65,cdf:279120},{id:513,vendor:"Fatz",tld:"name",category:"garden",popularity:.65,cdf:279770},{id:541,vendor:"Feednation",tld:"org",category:"games",popularity:.65,cdf:280420},{id:673,vendor:"Demimbu",tld:"gov",category:"books",popularity:.65,cdf:281070},{id:799,vendor:"Twiyo",tld:"name",category:"tools",popularity:.65,cdf:281720},{id:959,vendor:"Meejo",tld:"org",category:"automotive",popularity:.65,cdf:282370},{id:94,vendor:"Browsezoom",tld:"org",category:"beauty",popularity:.66,cdf:283030},{id:157,vendor:"Muxo",tld:"edu",category:"garden",popularity:.66,cdf:283690},{id:282,vendor:"Thoughtworks",tld:"biz",category:"sports",popularity:.66,cdf:284350},{id:300,vendor:"Realcube",tld:"name",category:"beauty",popularity:.66,cdf:285010},{id:360,vendor:"Centidel",tld:"net",category:"shoes",popularity:.66,cdf:285670},{id:440,vendor:"Dablist",tld:"com",category:"beauty",popularity:.66,cdf:286330},{id:463,vendor:"Divavu",tld:"net",category:"shoes",popularity:.66,cdf:286990},{id:483,vendor:"Voomm",tld:"mil",category:"garden",popularity:.66,cdf:287650},{id:539,vendor:"Mydeo",tld:"name",category:"movies",popularity:.66,cdf:288310},{id:547,vendor:"Skajo",tld:"biz",category:"toys",popularity:.66,cdf:288970},{id:554,vendor:"Linkbuzz",tld:"biz",category:"shoes",popularity:.66,cdf:289630},{id:605,vendor:"Oozz",tld:"com",category:"shoes",popularity:.66,cdf:290290},{id:737,vendor:"Kazu",tld:"com",category:"automotive",popularity:.66,cdf:290950},{id:49,vendor:"Voonix",tld:"edu",category:"health",popularity:.67,cdf:291620},{id:79,vendor:"Oyonder",tld:"com",category:"music",popularity:.67,cdf:292290},{id:141,vendor:"Ailane",tld:"biz",category:"automotive",popularity:.67,cdf:292960},{id:165,vendor:"Camimbo",tld:"org",category:"home",popularity:.67,cdf:293630},{id:204,vendor:"Jetwire",tld:"biz",category:"computers",popularity:.67,cdf:294300},{id:233,vendor:"Yacero",tld:"name",category:"sports",popularity:.67,cdf:294970},{id:301,vendor:"Yambee",tld:"net",category:"toys",popularity:.67,cdf:295640},{id:446,vendor:"Wordtune",tld:"gov",category:"electronics",popularity:.67,cdf:296310},{id:484,vendor:"Miboo",tld:"info",category:"toys",popularity:.67,cdf:296980},{id:519,vendor:"Oyoloo",tld:"edu",category:"music",popularity:.67,cdf:297650},{id:529,vendor:"Eayo",tld:"biz",category:"music",popularity:.67,cdf:298320},{id:538,vendor:"Cogidoo",tld:"com",category:"games",popularity:.67,cdf:298990},{id:776,vendor:"Meejo",tld:"org",category:"games",popularity:.67,cdf:299660},{id:850,vendor:"Jetwire",tld:"info",category:"games",popularity:.67,cdf:300330},{id:866,vendor:"Roodel",tld:"org",category:"books",popularity:.67,cdf:301e3},{id:964,vendor:"Skynoodle",tld:"net",category:"industrial",popularity:.67,cdf:301670},{id:217,vendor:"Eabox",tld:"biz",category:"computers",popularity:.68,cdf:302350},{id:325,vendor:"Fliptune",tld:"name",category:"toys",popularity:.68,cdf:303030},{id:394,vendor:"Gabspot",tld:"net",category:"music",popularity:.68,cdf:303710},{id:457,vendor:"Jaxworks",tld:"com",category:"outdoors",popularity:.68,cdf:304390},{id:493,vendor:"Thoughtstorm",tld:"name",category:"games",popularity:.68,cdf:305070},{id:613,vendor:"Realbridge",tld:"info",category:"baby",popularity:.68,cdf:305750},{id:649,vendor:"Npath",tld:"name",category:"outdoors",popularity:.68,cdf:306430},{id:659,vendor:"Ntags",tld:"edu",category:"movies",popularity:.68,cdf:307110},{id:697,vendor:"Oloo",tld:"name",category:"toys",popularity:.68,cdf:307790},{id:773,vendor:"Gabtune",tld:"info",category:"industrial",popularity:.68,cdf:308470},{id:787,vendor:"Izio",tld:"name",category:"health",popularity:.68,cdf:309150},{id:945,vendor:"Oloo",tld:"mil",category:"kids",popularity:.68,cdf:309830},{id:977,vendor:"Topicware",tld:"biz",category:"industrial",popularity:.68,cdf:310510},{id:31,vendor:"Fivebridge",tld:"info",category:"books",popularity:.69,cdf:311200},{id:170,vendor:"Kwimbee",tld:"edu",category:"books",popularity:.69,cdf:311890},{id:237,vendor:"Linkbridge",tld:"gov",category:"tools",popularity:.69,cdf:312580},{id:461,vendor:"Mycat",tld:"name",category:"computers",popularity:.69,cdf:313270},{id:508,vendor:"Jaxnation",tld:"org",category:"electronics",popularity:.69,cdf:313960},{id:566,vendor:"Brainbox",tld:"edu",category:"health",popularity:.69,cdf:314650},{id:620,vendor:"Riffpedia",tld:"com",category:"grocery",popularity:.69,cdf:315340},{id:643,vendor:"Twitterlist",tld:"name",category:"sports",popularity:.69,cdf:316030},{id:806,vendor:"Meetz",tld:"org",category:"toys",popularity:.69,cdf:316720},{id:877,vendor:"Twitterbeat",tld:"edu",category:"kids",popularity:.69,cdf:317410},{id:110,vendor:"Realmix",tld:"edu",category:"kids",popularity:.7,cdf:318110},{id:172,vendor:"Kwilith",tld:"gov",category:"computers",popularity:.7,cdf:318810},{id:193,vendor:"Vinte",tld:"mil",category:"games",popularity:.7,cdf:319510},{id:238,vendor:"Ozu",tld:"net",category:"games",popularity:.7,cdf:320210},{id:372,vendor:"Talane",tld:"biz",category:"games",popularity:.7,cdf:320910},{id:381,vendor:"Linktype",tld:"info",category:"tools",popularity:.7,cdf:321610},{id:660,vendor:"Dabfeed",tld:"mil",category:"industrial",popularity:.7,cdf:322310},{id:738,vendor:"Gigazoom",tld:"com",category:"computers",popularity:.7,cdf:323010},{id:805,vendor:"Kwinu",tld:"net",category:"home",popularity:.7,cdf:323710},{id:807,vendor:"Realfire",tld:"com",category:"shoes",popularity:.7,cdf:324410},{id:913,vendor:"Jabbersphere",tld:"org",category:"kids",popularity:.7,cdf:325110},{id:918,vendor:"Rooxo",tld:"gov",category:"industrial",popularity:.7,cdf:325810},{id:923,vendor:"Devify",tld:"info",category:"automotive",popularity:.7,cdf:326510},{id:927,vendor:"Youopia",tld:"net",category:"games",popularity:.7,cdf:327210},{id:932,vendor:"Wikido",tld:"org",category:"tools",popularity:.7,cdf:327910},{id:984,vendor:"Yakidoo",tld:"gov",category:"shoes",popularity:.7,cdf:328610},{id:52,vendor:"Yodel",tld:"com",category:"automotive",popularity:.71,cdf:329320},{id:97,vendor:"Meetz",tld:"info",category:"movies",popularity:.71,cdf:330030},{id:209,vendor:"Twiyo",tld:"net",category:"grocery",popularity:.71,cdf:330740},{id:222,vendor:"Quimm",tld:"biz",category:"sports",popularity:.71,cdf:331450},{id:251,vendor:"Devshare",tld:"net",category:"computers",popularity:.71,cdf:332160},{id:269,vendor:"Oyope",tld:"biz",category:"sports",popularity:.71,cdf:332870},{id:557,vendor:"Brightdog",tld:"com",category:"electronics",popularity:.71,cdf:333580},{id:588,vendor:"Rhynoodle",tld:"mil",category:"health",popularity:.71,cdf:334290},{id:811,vendor:"Skinix",tld:"com",category:"baby",popularity:.71,cdf:335e3},{id:7,vendor:"Trunyx",tld:"edu",category:"outdoors",popularity:.72,cdf:335720},{id:65,vendor:"Tagfeed",tld:"info",category:"sports",popularity:.72,cdf:336440},{id:77,vendor:"Wordpedia",tld:"biz",category:"music",popularity:.72,cdf:337160},{id:220,vendor:"Topicblab",tld:"name",category:"books",popularity:.72,cdf:337880},{id:224,vendor:"Browsedrive",tld:"edu",category:"shoes",popularity:.72,cdf:338600},{id:350,vendor:"Demivee",tld:"gov",category:"clothing",popularity:.72,cdf:339320},{id:371,vendor:"Brainbox",tld:"com",category:"industrial",popularity:.72,cdf:340040},{id:448,vendor:"Divavu",tld:"gov",category:"automotive",popularity:.72,cdf:340760},{id:453,vendor:"Feedbug",tld:"gov",category:"jewelry",popularity:.72,cdf:341480},{id:497,vendor:"Twitterworks",tld:"net",category:"games",popularity:.72,cdf:342200},{id:651,vendor:"Skivee",tld:"net",category:"electronics",popularity:.72,cdf:342920},{id:814,vendor:"Tagtune",tld:"name",category:"music",popularity:.72,cdf:343640},{id:839,vendor:"Ntag",tld:"info",category:"industrial",popularity:.72,cdf:344360},{id:938,vendor:"Janyx",tld:"biz",category:"jewelry",popularity:.72,cdf:345080},{id:28,vendor:"Zoomzone",tld:"gov",category:"outdoors",popularity:.73,cdf:345810},{id:305,vendor:"Riffpath",tld:"biz",category:"computers",popularity:.73,cdf:346540},{id:475,vendor:"Gabcube",tld:"org",category:"clothing",popularity:.73,cdf:347270},{id:607,vendor:"Photofeed",tld:"org",category:"computers",popularity:.73,cdf:348e3},{id:710,vendor:"Katz",tld:"name",category:"kids",popularity:.73,cdf:348730},{id:742,vendor:"Babbleset",tld:"mil",category:"jewelry",popularity:.73,cdf:349460},{id:785,vendor:"Skiptube",tld:"net",category:"health",popularity:.73,cdf:350190},{id:191,vendor:"Zoomzone",tld:"mil",category:"books",popularity:.74,cdf:350930},{id:202,vendor:"Yata",tld:"name",category:"sports",popularity:.74,cdf:351670},{id:313,vendor:"Voolia",tld:"name",category:"movies",popularity:.74,cdf:352410},{id:409,vendor:"Jabbertype",tld:"com",category:"computers",popularity:.74,cdf:353150},{id:415,vendor:"Gigaclub",tld:"net",category:"outdoors",popularity:.74,cdf:353890},{id:426,vendor:"Realmix",tld:"gov",category:"baby",popularity:.74,cdf:354630},{id:680,vendor:"Youspan",tld:"biz",category:"tools",popularity:.74,cdf:355370},{id:705,vendor:"Twitterbridge",tld:"gov",category:"grocery",popularity:.74,cdf:356110},{id:720,vendor:"Rhynyx",tld:"gov",category:"games",popularity:.74,cdf:356850},{id:798,vendor:"Yakitri",tld:"com",category:"books",popularity:.74,cdf:357590},{id:804,vendor:"Wordpedia",tld:"edu",category:"automotive",popularity:.74,cdf:358330},{id:841,vendor:"Myworks",tld:"org",category:"computers",popularity:.74,cdf:359070},{id:16,vendor:"Realbridge",tld:"net",category:"music",popularity:.75,cdf:359820},{id:158,vendor:"Dabjam",tld:"mil",category:"kids",popularity:.75,cdf:360570},{id:306,vendor:"Ainyx",tld:"info",category:"sports",popularity:.75,cdf:361320},{id:343,vendor:"Oba",tld:"com",category:"outdoors",popularity:.75,cdf:362070},{id:352,vendor:"Dazzlesphere",tld:"biz",category:"beauty",popularity:.75,cdf:362820},{id:410,vendor:"Photobug",tld:"info",category:"grocery",popularity:.75,cdf:363570},{id:465,vendor:"Aibox",tld:"edu",category:"clothing",popularity:.75,cdf:364320},{id:485,vendor:"Jatri",tld:"org",category:"industrial",popularity:.75,cdf:365070},{id:633,vendor:"Brainsphere",tld:"org",category:"sports",popularity:.75,cdf:365820},{id:689,vendor:"Gevee",tld:"name",category:"beauty",popularity:.75,cdf:366570},{id:753,vendor:"Wordware",tld:"info",category:"tools",popularity:.75,cdf:367320},{id:937,vendor:"Devify",tld:"info",category:"industrial",popularity:.75,cdf:368070},{id:952,vendor:"JumpXS",tld:"com",category:"home",popularity:.75,cdf:368820},{id:25,vendor:"Minyx",tld:"biz",category:"music",popularity:.76,cdf:369580},{id:147,vendor:"InnoZ",tld:"info",category:"automotive",popularity:.76,cdf:370340},{id:152,vendor:"Twinte",tld:"gov",category:"clothing",popularity:.76,cdf:371100},{id:160,vendor:"Yakidoo",tld:"name",category:"books",popularity:.76,cdf:371860},{id:243,vendor:"Babbleblab",tld:"com",category:"books",popularity:.76,cdf:372620},{id:460,vendor:"Camido",tld:"biz",category:"toys",popularity:.76,cdf:373380},{id:477,vendor:"Dynazzy",tld:"gov",category:"books",popularity:.76,cdf:374140},{id:835,vendor:"Vipe",tld:"info",category:"books",popularity:.76,cdf:374900},{id:838,vendor:"Yozio",tld:"mil",category:"garden",popularity:.76,cdf:375660},{id:879,vendor:"Snaptags",tld:"name",category:"toys",popularity:.76,cdf:376420},{id:922,vendor:"Agivu",tld:"com",category:"electronics",popularity:.76,cdf:377180},{id:19,vendor:"Jabbercube",tld:"gov",category:"kids",popularity:.77,cdf:377950},{id:53,vendor:"Twitterbeat",tld:"net",category:"health",popularity:.77,cdf:378720},{id:99,vendor:"Skimia",tld:"com",category:"industrial",popularity:.77,cdf:379490},{id:111,vendor:"Zoonoodle",tld:"mil",category:"automotive",popularity:.77,cdf:380260},{id:324,vendor:"Browseblab",tld:"gov",category:"jewelry",popularity:.77,cdf:381030},{id:499,vendor:"Yakidoo",tld:"com",category:"grocery",popularity:.77,cdf:381800},{id:552,vendor:"Tazzy",tld:"mil",category:"tools",popularity:.77,cdf:382570},{id:573,vendor:"Shuffledrive",tld:"biz",category:"toys",popularity:.77,cdf:383340},{id:623,vendor:"Jabbertype",tld:"gov",category:"baby",popularity:.77,cdf:384110},{id:638,vendor:"Buzzbean",tld:"mil",category:"kids",popularity:.77,cdf:384880},{id:911,vendor:"Vinder",tld:"gov",category:"garden",popularity:.77,cdf:385650},{id:63,vendor:"Edgetag",tld:"biz",category:"electronics",popularity:.78,cdf:386430},{id:278,vendor:"Yotz",tld:"info",category:"movies",popularity:.78,cdf:387210},{id:331,vendor:"Dabjam",tld:"net",category:"beauty",popularity:.78,cdf:387990},{id:672,vendor:"Shufflester",tld:"name",category:"health",popularity:.78,cdf:388770},{id:740,vendor:"Browsezoom",tld:"edu",category:"automotive",popularity:.78,cdf:389550},{id:847,vendor:"BlogXS",tld:"edu",category:"tools",popularity:.78,cdf:390330},{id:943,vendor:"Eimbee",tld:"info",category:"toys",popularity:.78,cdf:391110},{id:196,vendor:"Linkbridge",tld:"mil",category:"kids",popularity:.79,cdf:391900},{id:286,vendor:"Fiveclub",tld:"info",category:"games",popularity:.79,cdf:392690},{id:320,vendor:"Twiyo",tld:"org",category:"industrial",popularity:.79,cdf:393480},{id:481,vendor:"Oyoba",tld:"net",category:"grocery",popularity:.79,cdf:394270},{id:502,vendor:"InnoZ",tld:"org",category:"books",popularity:.79,cdf:395060},{id:820,vendor:"Twinder",tld:"biz",category:"music",popularity:.79,cdf:395850},{id:833,vendor:"Brainverse",tld:"biz",category:"garden",popularity:.79,cdf:396640},{id:856,vendor:"Skilith",tld:"edu",category:"industrial",popularity:.79,cdf:397430},{id:939,vendor:"Mydo",tld:"org",category:"books",popularity:.79,cdf:398220},{id:971,vendor:"Feedfire",tld:"biz",category:"industrial",popularity:.79,cdf:399010},{id:30,vendor:"Centidel",tld:"org",category:"grocery",popularity:.8,cdf:399810},{id:44,vendor:"Mita",tld:"gov",category:"music",popularity:.8,cdf:400610},{id:74,vendor:"Zoonder",tld:"org",category:"grocery",popularity:.8,cdf:401410},{id:114,vendor:"Brainlounge",tld:"info",category:"baby",popularity:.8,cdf:402210},{id:127,vendor:"Voolia",tld:"com",category:"outdoors",popularity:.8,cdf:403010},{id:211,vendor:"Mycat",tld:"com",category:"music",popularity:.8,cdf:403810},{id:270,vendor:"Feedfish",tld:"name",category:"home",popularity:.8,cdf:404610},{id:326,vendor:"Twitterwire",tld:"mil",category:"sports",popularity:.8,cdf:405410},{id:434,vendor:"Fivebridge",tld:"net",category:"shoes",popularity:.8,cdf:406210},{id:603,vendor:"Twitterbeat",tld:"org",category:"toys",popularity:.8,cdf:407010},{id:704,vendor:"Kayveo",tld:"org",category:"computers",popularity:.8,cdf:407810},{id:761,vendor:"InnoZ",tld:"gov",category:"garden",popularity:.8,cdf:408610},{id:865,vendor:"Kwinu",tld:"biz",category:"kids",popularity:.8,cdf:409410},{id:881,vendor:"Zooxo",tld:"net",category:"garden",popularity:.8,cdf:410210},{id:992,vendor:"Kaymbo",tld:"net",category:"music",popularity:.8,cdf:411010},{id:90,vendor:"Meedoo",tld:"gov",category:"sports",popularity:.81,cdf:411820},{id:168,vendor:"Teklist",tld:"name",category:"games",popularity:.81,cdf:412630},{id:330,vendor:"Linktype",tld:"org",category:"games",popularity:.81,cdf:413440},{id:569,vendor:"Mydo",tld:"info",category:"outdoors",popularity:.81,cdf:414250},{id:725,vendor:"Ooba",tld:"gov",category:"automotive",popularity:.81,cdf:415060},{id:748,vendor:"Oyonder",tld:"edu",category:"shoes",popularity:.81,cdf:415870},{id:756,vendor:"Feedfire",tld:"gov",category:"clothing",popularity:.81,cdf:416680},{id:873,vendor:"Kazu",tld:"net",category:"beauty",popularity:.81,cdf:417490},{id:72,vendor:"Ntags",tld:"info",category:"computers",popularity:.82,cdf:418310},{id:183,vendor:"Kwideo",tld:"mil",category:"outdoors",popularity:.82,cdf:419130},{id:199,vendor:"Skiba",tld:"info",category:"jewelry",popularity:.82,cdf:419950},{id:427,vendor:"Yodo",tld:"gov",category:"movies",popularity:.82,cdf:420770},{id:657,vendor:"Meevee",tld:"net",category:"computers",popularity:.82,cdf:421590},{id:661,vendor:"Linklinks",tld:"gov",category:"home",popularity:.82,cdf:422410},{id:731,vendor:"Flashdog",tld:"mil",category:"books",popularity:.82,cdf:423230},{id:862,vendor:"Agivu",tld:"info",category:"games",popularity:.82,cdf:424050},{id:940,vendor:"Avamm",tld:"name",category:"games",popularity:.82,cdf:424870},{id:59,vendor:"Flashpoint",tld:"mil",category:"beauty",popularity:.83,cdf:425700},{id:93,vendor:"Jaloo",tld:"gov",category:"jewelry",popularity:.83,cdf:426530},{id:189,vendor:"Centizu",tld:"biz",category:"kids",popularity:.83,cdf:427360},{id:491,vendor:"Quimba",tld:"com",category:"books",popularity:.83,cdf:428190},{id:518,vendor:"Trupe",tld:"edu",category:"movies",popularity:.83,cdf:429020},{id:609,vendor:"Zoonoodle",tld:"name",category:"automotive",popularity:.83,cdf:429850},{id:611,vendor:"Ailane",tld:"org",category:"electronics",popularity:.83,cdf:430680},{id:684,vendor:"Feedbug",tld:"net",category:"home",popularity:.83,cdf:431510},{id:733,vendor:"Trilia",tld:"biz",category:"home",popularity:.83,cdf:432340},{id:41,vendor:"Photobug",tld:"net",category:"books",popularity:.84,cdf:433180},{id:628,vendor:"Quimba",tld:"edu",category:"toys",popularity:.84,cdf:434020},{id:793,vendor:"Meemm",tld:"biz",category:"automotive",popularity:.84,cdf:434860},{id:96,vendor:"Jazzy",tld:"gov",category:"automotive",popularity:.85,cdf:435710},{id:210,vendor:"Reallinks",tld:"gov",category:"grocery",popularity:.85,cdf:436560},{id:417,vendor:"Livefish",tld:"edu",category:"garden",popularity:.85,cdf:437410},{id:486,vendor:"Shufflebeat",tld:"info",category:"automotive",popularity:.85,cdf:438260},{id:691,vendor:"Dabjam",tld:"biz",category:"tools",popularity:.85,cdf:439110},{id:155,vendor:"Photojam",tld:"edu",category:"movies",popularity:.86,cdf:439970},{id:179,vendor:"Teklist",tld:"org",category:"tools",popularity:.86,cdf:440830},{id:200,vendor:"Flashdog",tld:"biz",category:"games",popularity:.86,cdf:441690},{id:296,vendor:"Jazzy",tld:"com",category:"grocery",popularity:.86,cdf:442550},{id:308,vendor:"Eare",tld:"edu",category:"toys",popularity:.86,cdf:443410},{id:380,vendor:"Midel",tld:"info",category:"health",popularity:.86,cdf:444270},{id:978,vendor:"Oyondu",tld:"name",category:"health",popularity:.86,cdf:445130},{id:13,vendor:"Blogtags",tld:"edu",category:"toys",popularity:.87,cdf:446e3},{id:175,vendor:"Jatri",tld:"org",category:"baby",popularity:.87,cdf:446870},{id:634,vendor:"Quatz",tld:"edu",category:"baby",popularity:.87,cdf:447740},{id:892,vendor:"Kazio",tld:"net",category:"books",popularity:.87,cdf:448610},{id:139,vendor:"Yotz",tld:"biz",category:"industrial",popularity:.88,cdf:449490},{id:268,vendor:"Feedspan",tld:"mil",category:"outdoors",popularity:.88,cdf:450370},{id:665,vendor:"Chatterbridge",tld:"edu",category:"electronics",popularity:.88,cdf:451250},{id:726,vendor:"Oloo",tld:"name",category:"computers",popularity:.88,cdf:452130},{id:870,vendor:"Roombo",tld:"name",category:"movies",popularity:.88,cdf:453010},{id:969,vendor:"BlogXS",tld:"mil",category:"movies",popularity:.88,cdf:453890},{id:690,vendor:"Eadel",tld:"net",category:"industrial",popularity:.89,cdf:454780},{id:701,vendor:"Divanoodle",tld:"org",category:"toys",popularity:.89,cdf:455670},{id:882,vendor:"Ailane",tld:"edu",category:"movies",popularity:.9,cdf:456570},{id:229,vendor:"Quatz",tld:"biz",category:"outdoors",popularity:.91,cdf:457480},{id:439,vendor:"Brightbean",tld:"info",category:"baby",popularity:.92,cdf:458400},{id:795,vendor:"Yakidoo",tld:"info",category:"books",popularity:.92,cdf:459320},{id:23,vendor:"Devpoint",tld:"edu",category:"garden",popularity:.93,cdf:460250},{id:100,vendor:"Skiba",tld:"com",category:"music",popularity:.93,cdf:461180},{id:146,vendor:"Wikido",tld:"mil",category:"clothing",popularity:.93,cdf:462110},{id:416,vendor:"Twitterwire",tld:"info",category:"games",popularity:.93,cdf:463040},{id:449,vendor:"Skyble",tld:"mil",category:"tools",popularity:.93,cdf:463970},{id:492,vendor:"Jabbercube",tld:"edu",category:"kids",popularity:.93,cdf:464900},{id:548,vendor:"Voolith",tld:"info",category:"jewelry",popularity:.93,cdf:465830},{id:786,vendor:"Bubblebox",tld:"gov",category:"jewelry",popularity:.93,cdf:466760},{id:373,vendor:"Skyndu",tld:"com",category:"tools",popularity:.94,cdf:467700},{id:396,vendor:"Flashspan",tld:"edu",category:"tools",popularity:.94,cdf:468640},{id:498,vendor:"Dynabox",tld:"edu",category:"computers",popularity:.94,cdf:469580},{id:991,vendor:"Topdrive",tld:"info",category:"electronics",popularity:.94,cdf:470520},{id:382,vendor:"Dabshots",tld:"mil",category:"industrial",popularity:.95,cdf:471470},{id:404,vendor:"Shuffledrive",tld:"gov",category:"garden",popularity:.95,cdf:472420},{id:478,vendor:"Tavu",tld:"name",category:"movies",popularity:.95,cdf:473370},{id:104,vendor:"Twimm",tld:"info",category:"baby",popularity:.96,cdf:474330},{id:208,vendor:"Youspan",tld:"biz",category:"jewelry",popularity:.96,cdf:475290},{id:242,vendor:"Centizu",tld:"info",category:"sports",popularity:.96,cdf:476250},{id:582,vendor:"Snaptags",tld:"edu",category:"music",popularity:.96,cdf:477210},{id:216,vendor:"Oyope",tld:"gov",category:"computers",popularity:.97,cdf:478180},{id:236,vendor:"Brainverse",tld:"biz",category:"electronics",popularity:.97,cdf:479150},{id:266,vendor:"Zoombox",tld:"mil",category:"grocery",popularity:.97,cdf:480120},{id:385,vendor:"Oyonder",tld:"name",category:"games",popularity:.97,cdf:481090},{id:646,vendor:"Feedfire",tld:"edu",category:"music",popularity:.97,cdf:482060},{id:98,vendor:"Trudeo",tld:"edu",category:"movies",popularity:.98,cdf:483040},{id:936,vendor:"Browsebug",tld:"edu",category:"shoes",popularity:.98,cdf:484020},{id:455,vendor:"Dynava",tld:"org",category:"automotive",popularity:.99,cdf:485010},{id:578,vendor:"Dynabox",tld:"edu",category:"music",popularity:.99,cdf:486e3},{id:868,vendor:"Midel",tld:"net",category:"automotive",popularity:.99,cdf:486990},{id:310,vendor:"Roombo",tld:"biz",category:"industrial",popularity:1,cdf:487990},{id:708,vendor:"Camido",tld:"mil",category:"movies",popularity:1,cdf:488990},{id:947,vendor:"Jetpulse",tld:"edu",category:"games",popularity:1,cdf:489990},{id:994,vendor:"Feedmix",tld:"net",category:"computers",popularity:1,cdf:490990},{id:871,vendor:"Zooxo",tld:"gov",category:"beauty",popularity:1.01,cdf:492e3},{id:21,vendor:"Aibox",tld:"net",category:"toys",popularity:1.02,cdf:493020},{id:35,vendor:"Skyvu",tld:"org",category:"sports",popularity:1.02,cdf:494040},{id:717,vendor:"Yozio",tld:"com",category:"automotive",popularity:1.02,cdf:495060},{id:411,vendor:"Livepath",tld:"net",category:"beauty",popularity:1.03,cdf:496090},{id:319,vendor:"Babbleblab",tld:"net",category:"computers",popularity:1.05,cdf:497140},{id:504,vendor:"Rhycero",tld:"info",category:"books",popularity:1.05,cdf:498190},{id:961,vendor:"Edgetag",tld:"org",category:"beauty",popularity:1.05,cdf:499240},{id:450,vendor:"Viva",tld:"mil",category:"grocery",popularity:1.07,cdf:500310},{id:751,vendor:"Skipstorm",tld:"name",category:"movies",popularity:1.07,cdf:501380},{id:696,vendor:"Oyoba",tld:"com",category:"movies",popularity:1.08,cdf:502460},{id:619,vendor:"Skaboo",tld:"com",category:"sports",popularity:1.1,cdf:503560},{id:388,vendor:"Zoomdog",tld:"name",category:"beauty",popularity:1.13,cdf:504690},{id:103,vendor:"Roombo",tld:"edu",category:"garden",popularity:1.16,cdf:505850},{id:864,vendor:"Twitterlist",tld:"info",category:"books",popularity:1.16,cdf:507010},{id:101,vendor:"Babblestorm",tld:"name",category:"industrial",popularity:1.18,cdf:508190},{id:975,vendor:"Zoombeat",tld:"com",category:"outdoors",popularity:1.21,cdf:509400},{id:206,vendor:"Zoombox",tld:"net",category:"garden",popularity:1.23,cdf:510630},{id:500,vendor:"Feednation",tld:"org",category:"beauty",popularity:1.24,cdf:511870}];const Wo=e=>e[Math.floor(Math.random()*e.length)],Je=(e,o)=>Math.random()*(o-e)+e,Se=(e,o)=>Math.floor(Je(e,o)),kr=()=>{const e=$e[$e.length-1],o=Se(0,e.cdf),t=At($e,r=>r.cdf>=o?r.cdf-o:Number.MAX_SAFE_INTEGER);return t||e},se={id:120658,name:"New York",lonlat:[-73.993562,40.727063],diameter:.04},Dr=500,jo=(e,o)=>E(e,`
      INSERT INTO cities (city_id, city_name, center, diameter)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        city_name = VALUES(city_name),
        center = VALUES(center),
        diameter = VALUES(diameter)
    `,o.id,o.name,`POINT(${o.lonlat[0]} ${o.lonlat[1]})`,o.diameter),xr=(e,o)=>E(e,"DELETE FROM cities WHERE city_id = ?",o),zr=["olc_8","purchase","request"],Pr=["minute","hour","day","week","month"],Vo=({interval:e,kind:o,value:t})=>Ct(`${e}-${o}-${t}`),Mr=async(e,o)=>{const{sql:t,params:r}=Ho({table:"segments",options:{replace:!0},columns:["segment_id","valid_interval","filter_kind","filter_value"],tuples:o.map(d=>[Vo(d),d.interval,d.kind,d.value])});await E(e,t,...r)},Ur=async(e,o)=>{const t={table:"offers",options:{replace:!0},columns:["customer","notification_zone","segment_ids","notification_content","notification_target","maximum_bid_cents"],tuples:[]};let r=0,d=[];const a=async()=>{const{sql:n,params:c}=Ho(t);await Promise.all([E(e,n,...c),Mr(e,d)]),t.tuples=[],d=[],r=0};for(const n of o)t.tuples.push([n.customer,n.notificationZone,JSON.stringify(n.segments.map(Vo)),n.notificationContent,n.notificationTarget,n.maximumBidCents]),r++,d=d.concat(n.segments),r>=Dr&&await a();r>0&&await a()},Br=()=>Wo(zr),Fr=()=>Wo(Pr),$o=({vendor:e,tld:o})=>`${e.toLowerCase()}.${o}`,Ko=e=>{const[o,t]=e.lonlat,r=e.diameter/2,[d,a]=[o-r,o+r],[n,c]=[t-r,t+r];return[Je(d,a),Je(n,c)]},Gr=(e,o)=>{const t=Br(),r=Fr();switch(t){case"olc_8":{const[d,a]=Ko(e),n=Xe.encode(a,d,8).substring(0,8);return{kind:t,interval:r,value:n}}case"purchase":return{kind:t,interval:r,value:o.vendor};case"request":return{kind:t,interval:r,value:$o(o)}}},Yr=e=>{const o=Se(1,3),t=kr(),r=Array.from({length:o},()=>Gr(e,t)),d=$o(t),n=`${Se(10,50)}% off at ${t.vendor}`,c=d,[l,u]=Ko(e),p=Xe.encode(u,l,8),y=Xe.decode(p),f={ne:[y.latitudeHi,y.longitudeHi],sw:[y.latitudeLo,y.longitudeLo]};return{customer:t.vendor,segments:r,notificationZone:Me(f),notificationContent:n,notificationTarget:c,maximumBidCents:Se(2,15)}},Hr=(e,o)=>Array.from({length:o},()=>Yr(e)),Wr=e=>(o,t,r,d=1)=>`https://stamen-tiles.a.ssl.fastly.net/${e}/${r}/${o}/${t}${d>=2?"@2x":""}.png`,jr=s(C,{children:["Map tiles by ",i(V,{href:"http://stamen.com",children:"Stamen Design"}),", under"," ",i(V,{href:"http://creativecommons.org/licenses/by/3.0",children:"CC BY 3.0"}),". Data by ",i(V,{href:"http://openstreetmap.org",children:"OpenStreetMap"}),", under"," ",i(V,{href:"http://www.openstreetmap.org/copyright",children:"ODbL"}),"."]}),Vr=[se.lonlat[1],se.lonlat[0]],$r=12,Kr=({width:e,height:o,bounds:t,latLngToPixel:r,pixelToLatLng:d,useRenderer:a,options:n})=>{const c=pe.useRef(null),l=Lo(()=>new Z),{setup:u,update:p}=a({scene:l,width:e,height:o,bounds:t,latLngToPixel:r,pixelToLatLng:d,options:n});return g.exports.useLayoutEffect(()=>{if(!c.current)throw new Error("No canvas ref");console.log("PixiMapLayer: Setup");const y=new wt({view:c.current,width:e,height:o,backgroundAlpha:0,antialias:!0});return y.stage.addChild(l),u==null||u(),p&&y.ticker.add(f=>{p(f)}),()=>{console.log("PixiMapLayer: Destroy"),y.stage.removeChild(l),y.destroy(!1,{children:!1,texture:!0,baseTexture:!0})}},[o,l,u,p,e]),i("canvas",{ref:c})},Xr=({mapState:e,latLngToPixel:o,pixelToLatLng:t,useRenderer:r,options:d})=>{const{width:a,height:n,bounds:c}=e||{width:0,height:0};return a<=0||n<=0||!o||!t||!c?null:i(Kr,{useRenderer:r,width:a,height:n,bounds:c,latLngToPixel:o,pixelToLatLng:t,options:d})},Ue=n=>{var c=n,{height:e="100%",defaultCenter:o=Vr,defaultZoom:t=$r,useRenderer:r,options:d}=c,a=z(c,["height","defaultCenter","defaultZoom","useRenderer","options"]);const[l,u]=g.exports.useState(o),[p,y]=g.exports.useState(t);return i(k,_(h({borderRadius:"lg",overflow:"hidden",height:e},a),{children:i(It,{dprs:[1,2],provider:Wr("toner-lite"),attribution:jr,maxZoom:20,center:l,zoom:p,onBoundsChanged:({center:f,zoom:v})=>{u(f),y(v)},children:i(Xr,{useRenderer:r,options:d})})}))};var Be=[{name:"date_sub_dynamic",createStmt:`CREATE OR REPLACE FUNCTION date_sub_dynamic (
  _dt DATETIME(6),
  _interval ENUM("second", "minute", "hour", "day", "week", "month")
) RETURNS DATETIME(6) AS
BEGIN
  RETURN CASE _interval
    WHEN "second" THEN _dt - INTERVAL 1 SECOND
    WHEN "minute" THEN _dt - INTERVAL 1 MINUTE
    WHEN "hour" THEN _dt - INTERVAL 1 HOUR
    WHEN "day" THEN _dt - INTERVAL 1 DAY
    WHEN "week" THEN _dt - INTERVAL 1 WEEK
    WHEN "month" THEN _dt - INTERVAL 1 MONTH
  END;
END`},{name:"date_add_dynamic",createStmt:`CREATE OR REPLACE FUNCTION date_add_dynamic (
  _dt DATETIME(6),
  _interval ENUM("second", "minute", "hour", "day", "week", "month")
) RETURNS DATETIME(6) AS
BEGIN
  RETURN CASE _interval
    WHEN "second" THEN _dt + INTERVAL 1 SECOND
    WHEN "minute" THEN _dt + INTERVAL 1 MINUTE
    WHEN "hour" THEN _dt + INTERVAL 1 HOUR
    WHEN "day" THEN _dt + INTERVAL 1 DAY
    WHEN "week" THEN _dt + INTERVAL 1 WEEK
    WHEN "month" THEN _dt + INTERVAL 1 MONTH
  END;
END`},{name:"encode_open_location_code",createStmt:`CREATE OR REPLACE FUNCTION encode_open_location_code (
  _lonlat GEOGRAPHYPOINT,
  codeLength INT DEFAULT 12
) RETURNS TEXT AS
DECLARE
  SEPARATOR_ text = '+';
  SEPARATOR_POSITION_ int = 8;
  PADDING_CHARACTER_ text = '0';
  CODE_ALPHABET_ text = '23456789CFGHJMPQRVWX';
  ENCODING_BASE_ int = CHARACTER_LENGTH(CODE_ALPHABET_);
  LATITUDE_MAX_ int = 90;
  LONGITUDE_MAX_ int = 180;
  MAX_DIGIT_COUNT_ int = 15;
  PAIR_CODE_LENGTH_ int = 10;
  PAIR_PRECISION_ decimal = POWER(ENCODING_BASE_, 3);
  GRID_CODE_LENGTH_ int = MAX_DIGIT_COUNT_ - PAIR_CODE_LENGTH_;
  GRID_COLUMNS_ int = 4;
  GRID_ROWS_ int = 5;
  FINAL_LAT_PRECISION_ decimal = PAIR_PRECISION_ * POWER(GRID_ROWS_, MAX_DIGIT_COUNT_ - PAIR_CODE_LENGTH_);
  FINAL_LNG_PRECISION_ decimal = PAIR_PRECISION_ * POWER(GRID_COLUMNS_, MAX_DIGIT_COUNT_ - PAIR_CODE_LENGTH_);
  latitude double = geography_latitude(_lonlat);
  longitude double = geography_longitude(_lonlat);
  code text = '';
  latVal decimal = 0;
  lngVal decimal = 0;
  latDigit smallint;
  lngDigit smallint;
  ndx smallint;
  i_ smallint;
BEGIN
  -- This function has been ported from:
  -- http://github.com/google/open-location-code/blob/cafb35c0d74dd0c06b6a75c05f89e32a972b7b23/plpgsql/pluscode_functions.sql#L313
  -- Licensed under the Apache License, Version 2.0 (the 'License')

  IF ((codeLength < 2) OR ((codeLength < PAIR_CODE_LENGTH_) AND (codeLength % 2 = 1)) OR (codeLength > MAX_DIGIT_COUNT_)) THEN
    RAISE USER_EXCEPTION(CONCAT('Invalid Open Location Code length - ', codeLength));
  END IF;

  latVal = floor(round((latitude + LATITUDE_MAX_) * FINAL_LAT_PRECISION_, 6));
  lngVal = floor(round((longitude + LONGITUDE_MAX_) * FINAL_LNG_PRECISION_, 6));

  IF (codeLength > PAIR_CODE_LENGTH_) THEN
    i_ = 0;
    WHILE (i_ < (MAX_DIGIT_COUNT_ - PAIR_CODE_LENGTH_)) LOOP
      latDigit = latVal % GRID_ROWS_;
      lngDigit = lngVal % GRID_COLUMNS_;
      ndx = (latDigit * GRID_COLUMNS_) + lngDigit;
      code = concat(substr(CODE_ALPHABET_, ndx + 1, 1), code);
      latVal = latVal DIV GRID_ROWS_;
      lngVal = lngVal DIV GRID_COLUMNS_;
      i_ = i_ + 1;
    END LOOP;
  ELSE
    latVal = latVal DIV power(GRID_ROWS_, GRID_CODE_LENGTH_);
    lngVal = lngVal DIV power(GRID_COLUMNS_, GRID_CODE_LENGTH_);
  END IF;

  i_ = 0;
  WHILE (i_ < (PAIR_CODE_LENGTH_ / 2)) LOOP
    code = concat(substr(CODE_ALPHABET_, (lngVal % ENCODING_BASE_) + 1, 1), code);
    code = concat(substr(CODE_ALPHABET_, (latVal % ENCODING_BASE_) + 1, 1), code);
    latVal = latVal DIV ENCODING_BASE_;
    lngVal = lngVal DIV ENCODING_BASE_;
    i_ = i_ + 1;
  END LOOP;

  code = concat(
    substr(code, 1, SEPARATOR_POSITION_),
    SEPARATOR_,
    substr(code, SEPARATOR_POSITION_ + 1)
  );

  IF (codeLength > SEPARATOR_POSITION_) THEN
    RETURN substr(code, 1, codeLength+1);
  ELSE
    RETURN substr(code, 1, codeLength);
  END IF;
END`}],Fe=[{name:"process_locations",createStmt:`CREATE OR REPLACE PROCEDURE process_locations (
  _batch QUERY(
    subscriber_id BIGINT NOT NULL,
    offset_x DOUBLE NOT NULL,
    offset_y DOUBLE NOT NULL
  )
)
AS
DECLARE
  _expanded QUERY(city_id BIGINT, subscriber_id BIGINT, lonlat GEOGRAPHYPOINT) = SELECT
    city_id, subscriber_id,
    GEOGRAPHY_POINT(
      GEOGRAPHY_LONGITUDE(center) + (offset_x * diameter),
      GEOGRAPHY_LATITUDE(center) + (offset_y * diameter)
    ) AS lonlat
  FROM _batch, cities;
BEGIN
  INSERT INTO subscribers (city_id, subscriber_id, current_location)
  SELECT city_id, subscriber_id, lonlat
  FROM _expanded
  ON DUPLICATE KEY UPDATE current_location = VALUES(current_location);

  INSERT INTO locations (city_id, subscriber_id, ts, lonlat, olc_8)
  SELECT
    city_id,
    subscriber_id,
    now(6) AS ts,
    lonlat,
    encode_open_location_code(lonlat, 8) AS olc_8
  FROM _expanded;
END`},{name:"process_requests",createStmt:`CREATE OR REPLACE PROCEDURE process_requests (
  _batch QUERY(subscriber_id BIGINT NOT NULL, domain TEXT NOT NULL)
)
AS
BEGIN
  INSERT INTO requests (city_id, subscriber_id, ts, domain)
  SELECT city_id, subscriber_id, now(6) AS ts, domain
  FROM _batch, cities;
END`},{name:"process_purchases",createStmt:`CREATE OR REPLACE PROCEDURE process_purchases (
  _batch QUERY(subscriber_id BIGINT NOT NULL, vendor TEXT NOT NULL)
)
AS
BEGIN
  INSERT INTO purchases (city_id, subscriber_id, ts, vendor)
  SELECT city_id, subscriber_id, now(6) AS ts, vendor
  FROM _batch, cities;
END`},{name:"run_matching_process",createStmt:`CREATE OR REPLACE PROCEDURE run_matching_process (
  _interval ENUM("second", "minute", "hour", "day", "week", "month")
) RETURNS BIGINT
AS
DECLARE
  _ts DATETIME = NOW(6);
  _count BIGINT;
BEGIN
  INSERT INTO notifications SELECT _ts, * FROM match_offers_to_subscribers(_interval);

  _count = row_count();

  INSERT INTO subscribers_last_notification
  SELECT city_id, subscriber_id, ts
  FROM notifications
  WHERE ts = _ts
  ON DUPLICATE KEY UPDATE last_notification = _ts;

  RETURN _count;
END`},{name:"update_segments",createStmt:`CREATE OR REPLACE PROCEDURE update_segments(_since DATETIME(6), _until DATETIME(6))
AS
BEGIN
  INSERT INTO subscriber_segments
  SELECT * FROM dynamic_subscriber_segments(_since, _until)
  ON DUPLICATE KEY UPDATE expires_at = VALUES(expires_at);
END`},{name:"prune_segments",createStmt:`CREATE OR REPLACE PROCEDURE prune_segments(_until DATETIME(6))
AS
BEGIN
  DELETE FROM subscriber_segments WHERE expires_at <= _until;
END`},{name:"update_sessions",createStmt:`CREATE OR REPLACE PROCEDURE update_sessions(_session_id TEXT, _lease_duration_sections INT)
AS
DECLARE
  _num_alive_controllers QUERY(c INT) =
    SELECT COUNT(*) FROM sessions
    WHERE is_controller AND expires_at > NOW(6);

  _num_transactions QUERY(i INT) = SELECT @@trancount;
BEGIN
  -- make sure this session exists
  INSERT INTO sessions
  SET
    session_id = _session_id,
    expires_at = NOW() + INTERVAL _lease_duration_sections SECOND
  ON DUPLICATE KEY UPDATE expires_at = VALUES(expires_at);

  START TRANSACTION;

  -- ensure this session is the only controller if no other alive controllers are present
  IF SCALAR(_num_alive_controllers) = 0 THEN
    UPDATE sessions
    SET is_controller = (session_id = _session_id);
  END IF;

  -- echo the session details to the caller
  ECHO SELECT
    session_id, is_controller, expires_at
  FROM sessions
  WHERE session_id = _session_id;

  COMMIT;

  -- delete any expired sessions (with a bit of lag)
  DELETE FROM sessions
  WHERE NOW(6) > (expires_at + INTERVAL (_lease_duration_sections * 2) SECOND);

  EXCEPTION
    WHEN OTHERS THEN
      IF SCALAR(_num_transactions) > 0 THEN
        ROLLBACK;
      END IF;
END`}],Ge=[{name:"worldcities",createStmt:`create rowstore table if not exists worldcities (
  city_id BIGINT NOT NULL PRIMARY KEY,
  city_name TEXT NOT NULL,
  center GEOGRAPHYPOINT NOT NULL,

  INDEX (center)
);`},{name:"sessions",createStmt:`create rowstore table if not exists sessions (
  session_id TEXT NOT NULL,
  is_controller BOOLEAN NOT NULL DEFAULT FALSE,
  expires_at DATETIME(6) NOT NULL,

  PRIMARY KEY (session_id)
);`},{name:"cities",createStmt:`create rowstore reference table if not exists cities (
  city_id BIGINT NOT NULL PRIMARY KEY,
  city_name TEXT NOT NULL,
  center GEOGRAPHYPOINT NOT NULL,
  diameter DOUBLE
);`},{name:"subscribers",createStmt:`create rowstore table if not exists subscribers (
  city_id BIGINT NOT NULL,
  subscriber_id BIGINT NOT NULL,
  current_location GEOGRAPHYPOINT NOT NULL,

  PRIMARY KEY (city_id, subscriber_id),
  INDEX (current_location)
);`},{name:"subscribers_last_notification",createStmt:`create rowstore table if not exists subscribers_last_notification (
  city_id BIGINT NOT NULL,
  subscriber_id BIGINT NOT NULL,
  last_notification DATETIME(6),

  PRIMARY KEY (city_id, subscriber_id),
  INDEX (last_notification)
);`},{name:"locations",createStmt:`create table if not exists locations (
  city_id BIGINT NOT NULL,
  subscriber_id BIGINT NOT NULL,
  ts DATETIME(6) NOT NULL SERIES TIMESTAMP,
  lonlat GEOGRAPHYPOINT NOT NULL,

  -- open location code length 8 (275m resolution)
  olc_8 TEXT NOT NULL,

  SHARD KEY (city_id, subscriber_id),
  SORT KEY (ts),

  KEY (city_id, subscriber_id) USING HASH,
  KEY (olc_8) USING HASH
);`},{name:"requests",createStmt:`create table if not exists requests (
  city_id BIGINT NOT NULL,
  subscriber_id BIGINT NOT NULL,
  ts DATETIME(6) NOT NULL SERIES TIMESTAMP,
  domain TEXT NOT NULL,

  SHARD KEY (city_id, subscriber_id),
  SORT KEY (ts),
  KEY (domain) USING HASH
);`},{name:"purchases",createStmt:`create table if not exists purchases (
  city_id BIGINT NOT NULL,
  subscriber_id BIGINT NOT NULL,
  ts DATETIME(6) NOT NULL SERIES TIMESTAMP,
  vendor TEXT NOT NULL,

  SHARD KEY (city_id, subscriber_id),
  SORT KEY (ts),
  KEY (vendor) USING HASH
);`},{name:"offers",createStmt:`create rowstore reference table if not exists offers (
  offer_id BIGINT NOT NULL AUTO_INCREMENT,
  customer TEXT NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT TRUE,

  notification_zone GEOGRAPHY NOT NULL,
  segment_ids JSON NOT NULL,

  notification_content TEXT NOT NULL,
  notification_target TEXT NOT NULL,

  maximum_bid_cents BIGINT NOT NULL,

  PRIMARY KEY (offer_id),
  INDEX (notification_zone),
  INDEX (customer),
  INDEX (notification_target)
);`},{name:"notifications",createStmt:`create table if not exists notifications (
  ts DATETIME(6) NOT NULL SERIES TIMESTAMP,

  city_id BIGINT NOT NULL,
  subscriber_id BIGINT NOT NULL,

  offer_id BIGINT NOT NULL,
  cost_cents BIGINT NOT NULL,
  lonlat GEOGRAPHYPOINT NOT NULL,

  SHARD KEY (city_id, subscriber_id),
  SORT KEY (ts)
);`},{name:"segments",createStmt:`create rowstore reference table segments (
  segment_id BIGINT NOT NULL,

  valid_interval ENUM ("minute", "hour", "day", "week", "month") NOT NULL,
  filter_kind ENUM ("olc_8", "request", "purchase") NOT NULL,
  filter_value TEXT NOT NULL,

  PRIMARY KEY (segment_id),
  UNIQUE KEY (valid_interval, filter_kind, filter_value),
  KEY (filter_kind, filter_value)
);`},{name:"subscriber_segments",createStmt:`create rowstore table subscriber_segments (
  city_id BIGINT NOT NULL,
  subscriber_id BIGINT NOT NULL,
  segment_id BIGINT NOT NULL,

  expires_at DATETIME(6) NOT NULL,

  PRIMARY KEY (city_id, subscriber_id, segment_id),
  SHARD KEY (city_id, subscriber_id)
);`},{name:"match_offers_to_subscribers",createStmt:`CREATE OR REPLACE FUNCTION match_offers_to_subscribers(
  _interval ENUM("second", "minute", "hour", "day", "week", "month")
) RETURNS TABLE AS RETURN (
  WITH
    phase_1 as (
      SELECT offers.*, subscribers.*
      FROM
        offers,
        subscribers
      -- grab last notification time for each subscriber
      -- with(table_convert_subselect=true) forces a hash join
      LEFT JOIN subscribers_last_notification with(table_convert_subselect=true) ON (
        subscribers.city_id = subscribers_last_notification.city_id
        AND subscribers.subscriber_id = subscribers_last_notification.subscriber_id
      )
      WHERE
        offers.enabled = TRUE

        -- match offers to subscribers based on current location
        AND geography_contains(offers.notification_zone, subscribers.current_location)

        -- ensure we don't spam subscribers
        AND (
          subscribers_last_notification.last_notification IS NULL
          OR subscribers_last_notification.last_notification < date_sub_dynamic(NOW(), _interval)
        )

      -- only match (offer, subscriber) pairs such that
      -- there is no matching notification in the last minute
      AND NOT EXISTS (
        SELECT * FROM notifications n
        WHERE
          ts > date_sub_dynamic(NOW(), _interval)
          AND offers.offer_id = n.offer_id
          AND subscribers.city_id = n.city_id
          AND subscribers.subscriber_id = n.subscriber_id
      )
    ),
    phase_2 as (
      select
        phase_1.*,
        row_number() over (
          partition by phase_1.offer_id, phase_1.city_id, phase_1.subscriber_id
        ) as num_matching_segments
      from phase_1
      JOIN TABLE(JSON_TO_ARRAY(phase_1.segment_ids)) AS segment_ids
      LEFT JOIN subscriber_segments segment ON (
        phase_1.city_id = segment.city_id
        AND phase_1.subscriber_id = segment.subscriber_id
        AND (segment_ids.table_col :> BIGINT) = segment.segment_id
      )
    )
  select
    city_id,
    subscriber_id,
    -- window to find one offer with highest bid per subscriber
    last_value(offer_id) over window_best_offer as best_offer_id,
    last_value(maximum_bid_cents) over window_best_offer as cost_cents,
    current_location
  from phase_2
  where json_length(segment_ids) = num_matching_segments
  group by city_id, subscriber_id
  WINDOW window_best_offer as (
    partition by city_id, subscriber_id
    order by maximum_bid_cents asc
  )
);`},{name:"dynamic_subscriber_segments_locations",createStmt:`CREATE OR REPLACE FUNCTION dynamic_subscriber_segments_locations(
  _since DATETIME(6),
  _until DATETIME(6)
) RETURNS TABLE AS RETURN (
  SELECT
    city_id, subscriber_id, segment_id,
    MAX(date_add_dynamic(ts, segments.valid_interval)) AS expires_at
  FROM segments, locations
  WHERE
    segments.filter_kind = "olc_8"
    AND segments.filter_value = locations.olc_8
    AND ts >= date_sub_dynamic(NOW(6), segments.valid_interval)
    AND ts >= _since
    AND ts < _until
  GROUP BY city_id, subscriber_id, segment_id
);`},{name:"dynamic_subscriber_segments_requests",createStmt:`CREATE OR REPLACE FUNCTION dynamic_subscriber_segments_requests(
  _since DATETIME(6),
  _until DATETIME(6)
) RETURNS TABLE AS RETURN (
  SELECT
    city_id, subscriber_id, segment_id,
    MAX(date_add_dynamic(ts, segments.valid_interval)) AS expires_at
  FROM segments, requests
  WHERE
    segments.filter_kind = "request"
    AND segments.filter_value = requests.domain
    AND ts >= date_sub_dynamic(NOW(6), segments.valid_interval)
    AND ts >= _since
    AND ts < _until
  GROUP BY city_id, subscriber_id, segment_id
);`},{name:"dynamic_subscriber_segments_purchases",createStmt:`CREATE OR REPLACE FUNCTION dynamic_subscriber_segments_purchases(
  _since DATETIME(6),
  _until DATETIME(6)
) RETURNS TABLE AS RETURN (
  SELECT
    city_id, subscriber_id, segment_id,
    MAX(date_add_dynamic(ts, segments.valid_interval)) AS expires_at
  FROM segments, purchases
  WHERE
    segments.filter_kind = "purchase"
    AND segments.filter_value = purchases.vendor
    AND ts >= date_sub_dynamic(NOW(6), segments.valid_interval)
    AND ts >= _since
    AND ts < _until
  GROUP BY city_id, subscriber_id, segment_id
);`},{name:"dynamic_subscriber_segments",createStmt:`CREATE OR REPLACE FUNCTION dynamic_subscriber_segments(
  _since DATETIME(6),
  _until DATETIME(6)
) RETURNS TABLE AS RETURN (
  SELECT * FROM dynamic_subscriber_segments_locations(_since, _until)
  UNION ALL
  SELECT * FROM dynamic_subscriber_segments_requests(_since, _until)
  UNION ALL
  SELECT * FROM dynamic_subscriber_segments_purchases(_since, _until)
);`}];const Ne="singlestore-realtime-digital-marketing",qr=[`CREATE LINK aws_s3 AS S3 CREDENTIALS '{}' CONFIG '{ "region": "us-east-1" }'`,`
    CREATE OR REPLACE PIPELINE worldcities
    AS LOAD DATA LINK aws_s3 '${Ne}/cities.ndjson'
    SKIP DUPLICATE KEY ERRORS
    INTO TABLE worldcities
    FORMAT JSON (
      city_id <- id,
      city_name <- name,
      @lat <- lat,
      @lng <- lng
    )
    SET center = GEOGRAPHY_POINT(@lng, @lat)
  `,"START PIPELINE worldcities FOREGROUND"],Jr=e=>{const o=Ge.find(d=>d.name===e);if(o)return o;const t=Fe.find(d=>d.name===e);if(t)return t;const r=Be.find(d=>d.name===e);if(r)return r;throw new Error("Could not find schema object: "+e)},Zr=async e=>{try{return await po(e,"SELECT 1"),!0}catch{return!1}},Qr=async e=>{let o={tables:[],procedures:[],functions:[]};const c=e,{database:t}=c,r=z(c,["database"]);try{o=(await so(r,`
          SELECT "tables", table_name
          FROM information_schema.tables
          WHERE table_schema = ?
          UNION ALL
          SELECT (
            CASE routine_type
              WHEN 'PROCEDURE' THEN 'procedures'
              WHEN 'FUNCTION' THEN 'functions'
            END
          ), routine_name
          FROM information_schema.routines
          WHERE routine_schema = ?
        `,t,t)).reduce((l,[u,p])=>(l[u].push(p),l),o)}catch(l){if(!(l instanceof D&&(l.isUnknownDatabase()||l.isDatabaseRecovering())))throw l}const{tables:d,procedures:a,functions:n}=o;return Object.fromEntries([Ge.map(({name:l})=>[l,d.includes(l)]),Fe.map(({name:l})=>[l,a.includes(l)]),Be.map(({name:l})=>[l,n.includes(l)])].flat())},Xo=e=>po(e,"DROP DATABASE IF EXISTS `"+e.database+"`"),ei=async(e,{progress:o,scaleFactor:t,includeSeedData:r,skipCreate:d=!1})=>{d||(o("Dropping existing schema","info"),await Xo(e),o("Creating database","info"),await po(e,"CREATE DATABASE `"+e.database+"`"));for(const a of Be)o(`Creating function: ${a.name}`,"info"),await E(e,a.createStmt);for(const a of Ge)o(`Creating table: ${a.name}`,"info"),await E(e,a.createStmt);for(const a of Fe)o(`Creating procedure: ${a.name}`,"info"),await E(e,a.createStmt);await oi(e),await jo(e,se),r&&(o("Creating sample data","info"),await yo(e,se,t)),o("Schema initialized","success")},oi=async e=>{for(const o of qr)await E(e,o)},yo=(e,o,t)=>{const r=100*t.partitions,d=Hr(o,r);return Ur(e,d)},qo=async(e,o)=>{const t=o.prefix,r=["locations","requests","purchases"],d=await Y(e,`
      SELECT
        pipeline_name AS pipelineName,
        (config_json::$connection_string NOT LIKE "%${t}%") AS needsUpdate
      FROM information_schema.pipelines
      WHERE
        pipelines.database_name = ?
        AND pipelines.pipeline_name IN (?, ?, ?)
    `,e.database,...r);return r.map(a=>{var c;const n=d.find(l=>l.pipelineName===a);return{pipelineName:a,needsUpdate:(c=n==null?void 0:n.needsUpdate)!=null?c:!0}})},Jo=async(e,o)=>{const t=o.prefix,r=await qo(e,o);await Promise.all(r.filter(d=>d.needsUpdate).map(async d=>{switch(console.log(`recreating pipeline ${d.pipelineName}`),d.pipelineName){case"locations":await E(e,`
                CREATE OR REPLACE PIPELINE ${d.pipelineName}
                AS LOAD DATA LINK aws_s3 '${Ne}/${t}/locations.*'
                MAX_PARTITIONS_PER_BATCH ${o.partitions}
                INTO PROCEDURE process_locations FORMAT PARQUET (
                  subscriber_id <- subscriberid,
                  offset_x <- offsetX,
                  offset_y <- offsetY
                )
              `);break;case"requests":await E(e,`
                CREATE OR REPLACE PIPELINE ${d.pipelineName}
                AS LOAD DATA LINK aws_s3 '${Ne}/${t}/requests.*'
                MAX_PARTITIONS_PER_BATCH ${o.partitions}
                INTO PROCEDURE process_requests FORMAT PARQUET (
                  subscriber_id <- subscriberid,
                  domain <- domain
                )
              `);break;case"purchases":await E(e,`
                CREATE OR REPLACE PIPELINE ${d.pipelineName}
                AS LOAD DATA LINK aws_s3 '${Ne}/${t}/purchases.*'
                MAX_PARTITIONS_PER_BATCH ${o.partitions}
                INTO PROCEDURE process_purchases FORMAT PARQUET (
                  subscriber_id <- subscriberid,
                  vendor <- vendor
                )
              `);break}await E(e,`ALTER PIPELINE ${d.pipelineName} SET OFFSETS EARLIEST DROP ORPHAN FILES`),await E(e,`START PIPELINE IF NOT RUNNING ${d.pipelineName}`),console.log(`finished creating pipeline ${d.pipelineName}`)}))},ti=async e=>{const o=await so(e,`
      SELECT
        pipelines.pipeline_name,
        pipelines.state,
        SUM(file_state = "Loaded"):>int AS num_loaded,
        COUNT(file_state) AS num_total
      FROM information_schema.pipelines
      LEFT JOIN information_schema.pipelines_files ON (
        pipelines_files.pipeline_name = pipelines.pipeline_name
        AND pipelines_files.database_name = pipelines.database_name
      )
      WHERE pipelines.database_name = ? AND pipelines.pipeline_name != "worldcities"
      GROUP BY pipelines.pipeline_name
      HAVING num_loaded = num_total OR state != "Running"
    `,e.database);await Promise.all(o.map(async([t])=>{console.log("restarting pipeline",t),await E(e,`ALTER PIPELINE ${t} SET OFFSETS EARLIEST DROP ORPHAN FILES`),await E(e,`START PIPELINE IF NOT RUNNING ${t}`)}))},Zo=async e=>{const o=await Y(e,`
      SELECT plan_id AS planId
      FROM information_schema.plancache
      WHERE
        plan_warnings LIKE "%empty tables%"
    `);try{await Promise.all(o.map(({planId:t})=>E(e,`DROP ${t} FROM PLANCACHE`)))}catch(t){if(!(t instanceof D&&t.isPlanMissing()))throw t}return o.length>0},ri=(e,...o)=>{const t=o.map(r=>`"${r}"`).join(",");return Yo(e,`
      SELECT tableName, MAX(count) :> BIGINT AS count
      FROM (
        SELECT
          table_name AS tableName,
          SUM(rows) AS count
        FROM information_schema.table_statistics stats
        INNER JOIN information_schema.mv_nodes nodes ON (
          stats.host = nodes.ip_addr
          AND stats.port = nodes.port
        )
        WHERE
          (
            partition_type = "Master"
            OR (
              partition_type = "Reference" AND nodes.type = "MA"
            )
          )
          AND database_name = ?
          AND table_name IN (${t})
        GROUP BY table_name
        UNION ALL
        SELECT table_col AS tableName, 0 AS count
        FROM TABLE([${t}])
      )
      GROUP BY tableName
    `,e.database)},Ye=(e,...o)=>ri(e,...o).then(t=>t.reduce((r,{tableName:d,count:a})=>(r[d]=a,r),{})),ii=async(e,o)=>{const{maxRows:t}=o,d=["locations","requests","purchases","notifications"].map(n=>`"${n}"`).join(","),a=await Yo(e,`
      SELECT
        stats.table_name AS tableName,
        stats.count,
        UNIX_TIMESTAMP(minmax.minTs) AS minTs,
        UNIX_TIMESTAMP(minmax.maxTs) AS maxTs
      FROM
        (
          SELECT database_name, table_name, SUM(rows) AS count
          FROM information_schema.table_statistics
          WHERE
            database_name = ?
            AND table_name IN (${d})
            AND partition_type = "Master"
          GROUP BY database_name, table_name
        ) stats,
        (
          SELECT
            database_name, table_name,
            MIN(min_value) AS minTs,
            MAX(max_value) AS maxTs
          FROM information_schema.columnar_segments
          WHERE column_name = "ts"
          GROUP BY database_name, table_name
        ) minmax
      WHERE
        stats.database_name = minmax.database_name
        AND stats.table_name = minmax.table_name
        AND stats.count > ?
    `,e.database,t);await Promise.all(a.map(async({tableName:n,count:c,minTs:l,maxTs:u})=>{const y=(c-t)/c;if(y<.2)return;const f=new Date((l+y*(u-l))*1e3);console.log(`removing rows from ${n} older than ${f.toISOString()}`),await E(e,`DELETE FROM ${n} WHERE ts <= ?`,f.toISOString())}))},go=(e,o="minute")=>ze(e,"ECHO run_matching_process(?)",o).then(t=>t.RESULT),fo=async(e,o,t=!0)=>{const r=new Date().toISOString();return await E(e,"CALL update_segments(?, ?)",o,r),t&&await E(e,"CALL prune_segments(?)",r),r},di=(e,o,t,r)=>so(e,`
      SELECT
        ts,
        GEOGRAPHY_LONGITUDE(lonlat) AS lon,
        GEOGRAPHY_LATITUDE(lonlat) AS lat
      FROM notifications
      WHERE
        ts > ?
        AND GEOGRAPHY_CONTAINS(?, lonlat)
      ORDER BY ts DESC
      LIMIT ${t}
    `,o,Me(r)),ai=(e,o,t)=>Y(e,`
      SELECT
        offer_id AS offerId,
        notification_zone AS notificationZone
      FROM offers
      WHERE GEOGRAPHY_INTERSECTS(?, notification_zone)
      LIMIT ${o}
    `,Me(t)),ni=e=>Y(e,`
      SELECT
        city_id AS id,
        city_name AS name,
        GEOGRAPHY_LATITUDE(center) AS centerLat,
        GEOGRAPHY_LONGITUDE(center) AS centerLon,
        diameter
      FROM cities
    `),ci=(e,o,t)=>ze(e,`
      SELECT
        city_id AS id,
        city_name AS name,
        GEOGRAPHY_LATITUDE(center) AS centerLat,
        GEOGRAPHY_LONGITUDE(center) AS centerLon,
        0.1 AS diameter
      FROM worldcities
      ORDER BY GEOGRAPHY_DISTANCE(center, GEOGRAPHY_POINT(?, ?)) ASC
      LIMIT 1
    `,o,t),mo=e=>`
  SELECT
    offer_notification.customer,
    offer_notification.notification_zone,
    offer_notification.offer_id,
    events.ts as converted_at
  FROM (
    SELECT
      offers.offer_id,
      offers.customer,
      offers.notification_zone,
      offers.notification_target,
      notifications.city_id,
      notifications.subscriber_id,
      FIRST(notifications.ts) AS ts
    FROM offers, notifications
    WHERE offers.offer_id = notifications.offer_id
    GROUP BY offers.offer_id, notifications.city_id, notifications.subscriber_id
  ) offer_notification
  LEFT JOIN ${e} AS events ON
    offer_notification.city_id = events.city_id
    AND offer_notification.subscriber_id = events.subscriber_id
    AND events.ts > offer_notification.ts
    ${e==="purchases"?"AND events.vendor = offer_notification.customer":"AND events.domain = offer_notification.notification_target"}
`,li=(e,o,t,r)=>Y(e,uo({with:[["metrics",mo(o)]],base:`
        SELECT
          *, (totalConversions / totalNotifications) :> DOUBLE AS conversionRate
        FROM (
          SELECT
            metrics.customer,
            COUNT(metrics.offer_id) AS totalNotifications,
            COUNT(metrics.converted_at) AS totalConversions
          FROM metrics
          GROUP BY metrics.customer
        )
        ORDER BY ${t} DESC
        LIMIT ${r}
      `}).sql),Ao=(e,o)=>ze(e,uo({with:[["metrics",mo(o)]],base:`
        SELECT
          *, (totalConversions / totalNotifications) :> DOUBLE AS conversionRate
        FROM (
          SELECT
            COUNT(metrics.offer_id) AS totalNotifications,
            COUNT(metrics.converted_at) AS totalConversions
          FROM metrics
        )
      `}).sql),si=(e,o,t)=>{const r=uo({with:[["metrics",mo(t)]],base:{sql:`
        SELECT
          *, (totalConversions / totalNotifications) :> DOUBLE AS conversionRate
        FROM (
          SELECT
            metrics.notification_zone AS wktPolygon,
            COUNT(metrics.offer_id) AS totalNotifications,
            COUNT(metrics.converted_at) AS totalConversions
          FROM metrics
          WHERE GEOGRAPHY_INTERSECTS(?, metrics.notification_zone)
          GROUP BY metrics.notification_zone
        )
      `,params:[Me(o)]}});return Y(e,r.sql,...r.params)},pi=(e,o,t)=>ze(e,"CALL update_sessions(?, ?)",o,t).then(({session_id:r,is_controller:d,expires_at:a})=>({sessionId:r,isController:d,expiresAt:new Date(a)})),Qo=(e,o,t)=>E(e,`
      UPDATE sessions
      SET is_controller = IFNULL(session_id = IF(?, ?, (
        SELECT session_id
        FROM sessions
        WHERE expires_at > NOW() AND session_id != ?
        ORDER BY session_id DESC
        LIMIT 1
      )), FALSE)
    `,t,o,o),K=[{name:"s00",maxRows:1e7,prefix:"v2/100k-2p",partitions:2},{name:"s0",maxRows:2e7,prefix:"v2/100k-4p",partitions:4},{name:"s1",maxRows:4e7,prefix:"v2/100k-8p",partitions:8},{name:"s2",maxRows:16e7,prefix:"v2/1m-16p",partitions:16},{name:"s4",maxRows:32e7,prefix:"v2/1m-32p",partitions:16},{name:"s8",maxRows:64e7,prefix:"v2/1m-64p",partitions:64},{name:"s10",maxRows:1e9,prefix:"v2/10m-80p",partitions:80}],ui=e=>K.find(o=>o.name===e)||K[0],ee=({encode:e,decode:o}={encode:JSON.stringify,decode:JSON.parse})=>({setSelf:t,onSet:r,node:d})=>{const a=`recoil.localstorage.${d.key}`,n=localStorage.getItem(a);n!=null&&t(o(n)),r((c,l,u)=>{u?localStorage.removeItem(a):localStorage.setItem(a,e(c))})},vo=()=>({setSelf:e,node:{key:o}})=>{const{location:t}=window;if(t){const r=new URLSearchParams(t.search);e(r.get(o))}},yi=x({key:"skipCreateDatabase",default:null,effects:[vo()]}),gi=x({key:"sessionId",default:null,effects:[vo()]}),fi=x({key:"vaporBaseUrl",default:"https://vapor.labs.singlestore.com",effects:[vo()]}),et=x({key:"connectionHost",default:"http://127.0.0.1",effects:[ee()]}),ot=x({key:"connectionUser",default:"root",effects:[ee()]}),tt=x({key:"connectionPassword",default:"",effects:[ee()]}),oe=x({key:"connectionDatabase",default:"martech",effects:[ee()]}),rt=ko({key:"vaporConnectionConfig",get:async({get:e})=>{const o=e(gi),t=e(fi);if(o)try{const r=await fetch(t+"/api/v1/vapor/connect?sessionId="+o);if(r.status===200){const d=await r.json();return{host:d.endpoint,user:d.user,password:d.password,database:e(oe)}}}catch{console.log(`Failed to connect to vapor at ${t}, falling back to local config`)}}}),b=ko({key:"connectionConfig",get:({get:e})=>{const o=e(rt);if(o)return o;const t=e(et),r=e(ot),d=e(tt),a=e(oe);return{host:t,user:r,password:d,database:a}},cachePolicy_UNSTABLE:{eviction:"most-recent"}}),te=x({key:"configScaleFactor",default:K[0],effects:[ee({encode:e=>e.name,decode:e=>K.find(o=>o.name===e)||K[0]})]}),re=x({key:"simulatorEnabled",default:!0,effects:[ee()]}),mi=x({key:"databaseDrawerIsOpen",default:!1}),Ze=Lt({key:"tickDurationMs",default:void 0}),He=x({key:"resettingSchema",default:!1}),vi=Object.fromEntries([Ge.map(({name:e})=>[e,!1]),Fe.map(({name:e})=>[e,!1]),Be.map(({name:e})=>[e,!1])].flat()),it=(e=!1)=>{const o=m(b);return R(["schemaObjects",o,e],()=>Qr(o),{isPaused:()=>e,refreshInterval:t=>Object.values(t||[]).some(d=>!d)?1e3:0,fallbackData:vi})},O=()=>{const a=m(b),{database:e}=a,o=z(a,["database"]),t=m(rt),r=R(["isConnected",o],()=>Zr(o)),d=it(!r.data);return{isVapor:!!t,connected:!!r.data,initialized:!!r.data&&Object.values(d.data||[]).every(Boolean),reset:()=>{r.mutate(),d.mutate()}}},bi=(()=>{let e={};return o=>(o in e||(e[o]=1),`${o}(${e[o]++})`)})(),Qe=(e,{name:o,enabled:t,intervalMS:r})=>{const d=to(Ze(o));g.exports.useEffect(()=>{if(!t)return;const a=new AbortController,n=bi(o);console.log(`Starting ${n}: tick interval: ${r}ms`);const c=async()=>{try{if(console.time(n),a.signal.aborted)return;const l=performance.now();await e(a);const u=performance.now()-l;d(u),setTimeout(c,Math.max(0,r-u))}catch(l){if(a.signal.aborted||l instanceof D&&l.isUnknownDatabase()||l instanceof DOMException&&l.name==="AbortError")return;throw l}finally{console.timeEnd(n)}};return c(),()=>{console.log(`Stopping ${n}`),a.abort()}},[t,e,r,o,d])},hi=({before:e,after:o,includeSeedData:t})=>{const r=m(b),d=m(te),{reset:a}=O(),[n,c]=P(re),l=Do(),u=m(yi),p=to(He);return g.exports.useCallback(async()=>{const y=n;c(!1),p(!0),e(),await ei(r,{progress(f,v){const N="reset-schema";l.isActive(N)?l.update(N,{title:f,status:v,duration:v==="success"?2e3:null,isClosable:!0}):l({id:N,title:f,status:v,duration:null})},scaleFactor:d,includeSeedData:t,skipCreate:!!u}),o(),a(),c(y),p(!1)},[n,c,p,e,r,d,t,u,o,a,l])},dt=(e,o)=>{const[t,r]=g.exports.useState(e);return g.exports.useEffect(()=>{const d=setTimeout(()=>r(e),o);return()=>clearTimeout(d)},[e,o]),t},at=()=>{const[{elapsed:e,isRunning:o},t]=g.exports.useReducer((r,d)=>{switch(d.type){case"start":return{start:Math.floor(performance.now()),isRunning:!0,elapsed:r.elapsed};case"stop":return{elapsed:Math.floor(performance.now())-(r.start||0),isRunning:!1}}},{isRunning:!1});return{elapsed:e,isRunning:o,startTimer:()=>t({type:"start"}),stopTimer:()=>t({type:"stop"})}},nt=(e,o)=>{let t=!1,r=new kt(0,0),d=0;e.on("pointerdown",a=>{t=!0,r=a.data.global,d=performance.now()}),e.on("pointerup",a=>{if(!t||(t=!1,performance.now()-d>200))return;const c=a.data.global;Math.sqrt(Math.pow(c.x-r.x,2)+Math.pow(c.y-r.y,2))>10||o(a)}),e.on("pointercancel",()=>{t=!1})};class Ei extends Z{constructor(o,t){super();S(this,"gfx");S(this,"hover",!1);this.city=o,this.onRemove=t,this.gfx=new Ae,this.addChild(this.gfx),this.gfx.interactive=!0,this.gfx.on("pointerover",()=>{this.hover=!0}),this.gfx.on("pointerout",()=>{this.hover=!1}),nt(this.gfx,()=>t(this.city))}update(o){this.gfx.clear(),this.gfx.lineStyle(1,this.hover?16711680:306687,1),this.gfx.beginFill(this.hover?16711680:306687,.2);const[t,r]=o([this.city.centerLat,this.city.centerLon]);this.gfx.drawCircle(t,r,25),this.gfx.endFill()}}const _i=e=>{const o=m(b),{initialized:t}=O();return R(["cities",o,t],()=>ni(o),{isPaused:()=>!t,onSuccess:e})},Ti=({scene:e,latLngToPixel:o,pixelToLatLng:t,width:r,height:d})=>{const a=m(b),n=Lo(()=>new Z),{mutate:c}=_i(p=>{n.removeChildren();for(let y=0;y<p.length;y++)n.addChild(new Ei(p[y],u))}),l=g.exports.useCallback(async(p,y)=>{const f=await ci(a,y,p),v={id:f.id,name:f.name,lonlat:[f.centerLon,f.centerLat],diameter:f.diameter};await jo(a,v),await yo(a,v,K[0]),c()},[a,c]),u=g.exports.useCallback(async p=>{await xr(a,p.id),c()},[a,c]);return{setup:g.exports.useCallback(()=>{const p=new Z;e.addChild(p),e.addChild(n),p.interactive=!0,p.hitArea=new Dt(0,0,r,d),nt(p,y=>{const[f,v]=t([y.data.global.x,y.data.global.y]);l(f,v)})},[n,d,l,t,e,r]),update:g.exports.useCallback(()=>{for(let p=0;p<n.children.length;p++)n.children[p].update(o)},[n,o])}},Si=e=>i(Ue,_(h({},e),{useRenderer:Ti,options:{},cursor:"pointer"})),Ni=xt({a:t=>{var r=t,{children:e}=r,o=z(r,["children"]);const{href:d}=o,a=!!(d!=null&&d.startsWith("http"));return a?s(V,_(h({isExternal:a},o),{children:[e,i(zt,{bottom:"2px",boxSize:"0.9em",position:"relative",ml:1})]})):i(V,_(h({to:d||""},o),{as:xo,children:e}))}}),T=t=>{var r=t,{children:e}=r,o=z(r,["children"]);return i(Pt,_(h({},o),{skipHtml:!0,components:Ni,children:Array.isArray(e)?e.filter(d=>d).map(d=>$(d||"")).join(`

`):$(e)}))},Ri=()=>s(q,{maxW:"container.lg",mt:10,mb:"30vh",children:[i(q,{maxW:"container.md",mb:10,children:i(T,{children:`
            ## Admin

            You can configure cities and offers on this page. To learn more
            about this application please visit the [Overview page](/).
          `})}),i(Oi,{})]}),Oi=()=>s(C,{children:[i(q,{maxW:"container.md",mb:4,children:i(T,{children:`
            #### Cities

            You can create and remove cities by interacting with the map below.
            Click anywhere to define a new city, or click an existing city to
            remove it.
          `})}),i(Si,{defaultZoom:4,defaultCenter:[39.716470511656766,-99.59395661915288],height:300})]}),Co=(()=>{const e=()=>crypto&&crypto.randomUUID?crypto.randomUUID():Mt();let o;return o=e(),console.log(`Session ID: ${o}`),o})(),Io=60,ge=()=>{const e=m(b),o=m(He),{connected:t,initialized:r}=O(),{data:d,mutate:a}=R([e,"useSession"],()=>pi(e,Co,Io),{refreshInterval:1e3,isPaused:()=>o||!t||!r});return{session:d||{sessionId:Co,isController:!1,expiresAt:new Date(Date.now()+Io*1e3)},refresh:a}},ct=()=>{const e=to(re),{session:o,refresh:t}=ge(),r=m(b),{connected:d,initialized:a}=O(),[n,c]=Q(!1),l=g.exports.useCallback(async()=>{c.on(),d&&a&&await Qo(r,o.sessionId,!0),e(!0),t(),c.off()},[r,d,c,a,t,o.sessionId,e]);return s(Ee,{status:"warning",borderRadius:"md",children:[i(_e,{}),i(Te,{children:"The simulator is disabled"}),i(A,{position:"absolute",right:4,top:3,size:"xs",colorScheme:"blue",disabled:n,onClick:l,children:"Enable simulator"})]})},wo=e=>{const{r:o,g:t,b:r}=e.rgb();return o<<16|t<<8|r};class Ai extends Z{constructor(o){super();S(this,"points");S(this,"polygon");S(this,"hovering",!1);this.config=o,this.points=Lr(o.wktPolygon),this.polygon=new Ae,this.addChild(this.polygon),this.polygon.interactive=!0,this.polygon.on("mouseover",()=>{this.hovering=!0}),this.polygon.on("mouseout",()=>{this.hovering=!1})}update(o){const t=this.hovering?this.config.hoverColor:this.config.color;this.polygon.clear(),this.polygon.lineStyle(1,wo(t),.5),this.polygon.beginFill(wo(t),.2),this.polygon.drawPolygon(this.points.flatMap(([r,d])=>o([d,r]))),this.polygon.endFill()}}const Ci=e=>({scene:o,latLngToPixel:t,bounds:r})=>{const d=dt(r,100);return e.useCells(d,a=>{o.removeChildren();for(const n of a)o.addChild(new Ai(e.getCellConfig(n)))}),{update:g.exports.useCallback(()=>{for(let a=0;a<o.children.length;a++)o.children[a].update(t)},[t,o])}},lt=e=>{const a=e,{useCells:o,getCellConfig:t}=a,r=z(a,["useCells","getCellConfig"]),d=g.exports.useMemo(()=>Ci({useCells:o,getCellConfig:t}),[t,o]);return i(Ue,_(h({},r),{useRenderer:d,options:{}}))},Ii=10*1e3,bo=e=>{const o=m(b),t=m(te),{initialized:r}=O(),{session:d}=ge(),a=g.exports.useCallback(n=>{const c=_(h({},o),{ctx:n});return Promise.all([Jo(c,t),ti(c),ii(c,t),Zo(c)])},[o,t]);Qe(a,{name:"SimulatorMonitor",enabled:r&&e&&d.isController,intervalMS:Ii})},wi=1*1e3,Li=1*1e3,st=e=>{const o=m(b),{initialized:t}=O(),r=g.exports.useRef(new Date(0).toISOString()),{session:d}=ge(),a=g.exports.useCallback(c=>go(_(h({},o),{ctx:c}),"minute"),[o]);Qe(a,{name:"SimulatorMatcher",enabled:t&&e&&d.isController,intervalMS:wi});const n=g.exports.useCallback(async c=>{r.current=await fo(_(h({},o),{ctx:c}),r.current)},[o]);Qe(n,{name:"SimulatorUpdateSegments",enabled:t&&e&&d.isController,intervalMS:Li})},eo=ue(",.2%"),le=ue(".4~s"),ki=()=>{const{initialized:e}=O(),o=m(re);return bo(o),st(o),i(q,{maxW:"container.lg",mt:10,mb:"30vh",children:e?o?s(F,{gap:10,children:[i(Di,{}),i(xi,{}),i(Mi,{})]}):i(ct,{}):i(pt,{})})},pt=()=>i(M,{children:i(U,{size:"xl",speed:"0.85s",thickness:"3px",emptyColor:"gray.200",color:"blue.500"})}),Di=()=>{var d,a;const e=m(b),o=R(["overallConversionRateRequests",e],()=>Ao(e,"requests"),{refreshInterval:1e3}),t=R(["overallConversionRatePurchases",e],()=>Ao(e,"purchases"),{refreshInterval:1e3}),r=R(["analyticsTableCounts",e],()=>Ye(e,"offers","subscribers","notifications"),{refreshInterval:1e3});return!r.data||!o.data||!t.data?i(pt,{}):s(ke,{spacing:2,minChildWidth:"150px",flex:2,children:[s(I,{children:[i(w,{children:"Offers"}),i(L,{children:le(r.data.offers)})]}),s(I,{children:[i(w,{children:"Subscribers"}),i(L,{children:le(r.data.subscribers)})]}),s(I,{children:[i(w,{children:"Notifications"}),i(L,{children:le(r.data.notifications)})]}),s(I,{children:[i(w,{children:"Conversion Rate"}),i(L,{children:eo(((d=o.data)==null?void 0:d.conversionRate)||0)}),i(_o,{children:"Requests"})]}),s(I,{children:[i(w,{children:"Conversion Rate"}),i(L,{children:eo(((a=t.data)==null?void 0:a.conversionRate)||0)}),i(_o,{children:"Purchases"})]})]})},xi=()=>{var a;const e=m(b),[o,t]=g.exports.useState("conversionRate"),r=R(["customerMetrics",e,o],()=>li(e,"purchases",o,10),{refreshInterval:1e3}),d=Ce("blue.500","blue.200");return i(k,{overflowX:"auto",children:s(Ut,{size:"sm",colorScheme:"gray",variant:"striped",children:[i(Bt,{children:s(To,{children:[s(me,{onClick:()=>t("customer"),_hover:{color:d},color:o==="customer"?d:void 0,cursor:"pointer",children:["Customer",o==="customer"&&i(ne,{})]}),s(me,{onClick:()=>t("totalNotifications"),_hover:{color:d},color:o==="totalNotifications"?d:void 0,isNumeric:!0,cursor:"pointer",children:["Total Notifications",o==="totalNotifications"&&i(ne,{})]}),s(me,{onClick:()=>t("totalConversions"),_hover:{color:d},color:o==="totalConversions"?d:void 0,isNumeric:!0,cursor:"pointer",children:["Total Conversions",o==="totalConversions"&&i(ne,{})]}),s(me,{onClick:()=>t("conversionRate"),_hover:{color:d},color:o==="conversionRate"?d:void 0,isNumeric:!0,cursor:"pointer",children:["Conversion Rate",o==="conversionRate"&&i(ne,{})]})]})}),i(Ft,{children:(a=r.data)==null?void 0:a.map(n=>s(To,{children:[i(ve,{children:n.customer}),i(ve,{isNumeric:!0,children:le(n.totalNotifications)}),i(ve,{isNumeric:!0,children:le(n.totalConversions)}),i(ve,{isNumeric:!0,children:eo(n.conversionRate)})]},n.customer))})]})})},zi=(e,o)=>{const t=m(b);R(["zoneMetrics",t,e],()=>si(t,e,"purchases"),{refreshInterval:1e3,onSuccess:o})},Pi=e=>qe(Gt(e))||qe(0,0,0),Mi=()=>s(F,{direction:["column","row"],alignItems:"top",children:[i(k,{flex:1,children:i(T,{children:`
            ### Conversion Map

            This map shows the total conversion rate for all offers in each
            notification zone. Each polygon is colored based on the rate.
          `})}),i(k,{flex:2,children:i(lt,{height:400,defaultZoom:14,useCells:zi,getCellConfig:({conversionRate:e,wktPolygon:o})=>{const t=Pi(e);return{color:t,hoverColor:t.brighter(1),wktPolygon:o}}})})]}),be=({label:e,placeholder:o,value:t,setValue:r,helpText:d,type:a="text"})=>s(ro,{children:[i(io,{mb:1,fontSize:"xs",fontWeight:"bold",textTransform:"uppercase",children:e}),i(zo,{size:"sm",placeholder:o,value:t,onChange:n=>r(n.target.value),type:a}),d?i(Yt,{fontSize:"xs",children:d}):null]}),Ui=()=>{const[e,o]=P(te);return s(ro,{children:[i(io,{mb:1,fontSize:"xs",fontWeight:"bold",textTransform:"uppercase",children:"Scale Factor"}),i(Ht,{size:"sm",required:!0,value:e.name,onChange:t=>{const r=t.target.value;o(ui(r))},children:K.map(t=>i("option",{value:t.name,children:t.name},t.name))})]})},ut=({showDatabase:e,showScaleFactor:o})=>{const[t,r]=P(et),[d,a]=P(ot),[n,c]=P(tt),[l,u]=P(oe);return s(F,{spacing:4,children:[i(be,{label:"Host & Port",placeholder:"http://127.0.0.1:8808",value:t,setValue:r,helpText:i(T,{children:`
              The protocol (http, https), host, and port for the SingleStore
              [HTTP API][1].

              [1]: https://docs.singlestore.com/docs/http-api/
            `})}),s(ke,{columns:2,gap:2,children:[i(be,{label:"Username",placeholder:"admin",value:d,setValue:a}),i(be,{label:"Password",placeholder:"",value:n,setValue:c,type:"password"}),e&&i(be,{label:"Database",placeholder:"martech",value:l,setValue:u}),o&&i(Ui,{})]})]})},yt=e=>i(A,_(h({onClick:()=>{const{pathname:o,hash:t}=window.location;window.location.replace(o+t)},colorScheme:"red"},e),{children:"Disconnect"})),gt=e=>{const{connected:o,initialized:t}=O(),r=ao(),[d,a]=Q(),n=m(oe),c=pe.useRef(null),f=e,{skipSeedData:l,disabled:u}=f,p=z(f,["skipSeedData","disabled"]),y=hi({before:g.exports.useCallback(()=>a.on(),[a]),after:g.exports.useCallback(()=>{a.off(),r.onClose()},[r,a]),includeSeedData:!l});return s(C,{children:[i(A,h({disabled:!o||u,onClick:r.onOpen,colorScheme:t?"green":"red"},p)),i(Wt,{isOpen:r.isOpen,onClose:r.onClose,closeOnEsc:!1,closeOnOverlayClick:!1,leastDestructiveRef:c,children:i(no,{children:s(jt,{children:[s(co,{fontSize:"lg",fontWeight:"bold",children:[t?"Reset":"Setup"," database ",n]}),s(lo,{children:["This will ",t?"recreate":"create"," the database called ",n,". Are you sure?"]}),s(Po,{children:[i(A,{ref:c,onClick:r.onClose,disabled:d,children:"Cancel"}),i(A,{disabled:d,colorScheme:t?"red":"green",onClick:y,ml:3,children:d?i(U,{}):t?"Recreate database":"Create database"})]})]})})})]})},Bi=({isOpen:e,onClose:o,finalFocusRef:t})=>{const[r,d]=P(re),{session:a,refresh:n}=ge(),c=r&&a.isController,l=m(b),{connected:u,initialized:p,isVapor:y}=O(),f=ao(),[v,N]=Q(!1),H=g.exports.useCallback(async()=>{N.on();const J=!(r&&a.isController);d(J),await Qo(l,a.sessionId,J),n(),N.off()},[l,r,n,a.isController,a.sessionId,d,N]),[ie,W]=Q(!1),de=g.exports.useCallback(async()=>{W.on(),await Xo(l),W.off()},[l,W]);return s(Vt,{isOpen:e,placement:"right",onClose:o,finalFocusRef:t,children:[i(no,{}),s($t,{children:[i(Mo,{}),i(co,{children:"Config"}),i(lo,{children:s(F,{spacing:4,children:[y?null:i(ut,{showScaleFactor:!0,showDatabase:!0}),s(Ee,{status:u?"success":"error",borderRadius:"md",children:[i(_e,{}),i(Te,{children:u?"connected":"disconnected"}),y?i(yt,{position:"absolute",right:4,top:3,size:"xs"}):null]}),s(Ee,{status:p?"success":"warning",borderRadius:"md",children:[i(_e,{}),i(Te,{children:"schema"}),i(gt,{position:"absolute",right:4,top:3,size:"xs",children:p?"Reset":"Setup"})]}),s(Ee,{status:c?"success":"warning",borderRadius:"md",children:[i(_e,{}),i(Te,{children:"simulator"}),i(Kt,{position:"absolute",right:4,top:3.5,size:"md",colorScheme:c?"green":"red",isChecked:c,disabled:!u||!p||v,onChange:H})]}),s(ye,{onClick:f.onToggle,fontSize:"xs",textAlign:"center",cursor:"pointer",children:["Advanced",f.isOpen?i(Xt,{ml:2}):i(ne,{ml:2})]}),f.isOpen?i(A,{size:"xs",_hover:{colorScheme:"red"},onClick:de,disabled:ie,children:"Drop Database"}):void 0]})}),i(Po,{})]})]})},he=({to:e,children:o,onClick:t})=>{const r=tr(e),d=rr({path:r.pathname,end:!0});return i(V,{as:xo,to:e,px:2,py:1,onClick:t,rounded:"md",_hover:{textDecoration:"none",bg:Ce("gray.300","gray.600")},fontWeight:d?"bold":"normal",href:"#",color:Ce("gray.700","gray.200"),children:o})},Fi=()=>{const{colorMode:e,toggleColorMode:o}=De(),t=ao(),[r,d]=P(mi),a=pe.useRef(null),{connected:n,initialized:c}=O(),l=m(re),[u]=Uo("(max-width: 640px)"),{session:p}=ge(),y=s(C,{children:[i(he,{to:"/",onClick:t.onClose,children:"Overview"}),i(he,{to:"/map",onClick:t.onClose,children:"Map"}),i(he,{to:"/admin",onClick:t.onClose,children:"Admin"}),i(he,{to:"/analytics",onClick:t.onClose,children:"Analytics"})]}),f=n?c&&l&&p.isController?"green":"yellow":"red";let v;return u||(v=n?c?l&&p.isController?"connected":"simulator disabled":"needs schema":"disconnected"),i(C,{children:i(k,{bg:Ce("gray.200","gray.700"),children:s(q,{maxW:"container.lg",children:[s(Ie,{h:16,alignItems:"center",justifyContent:"space-between",children:[i(Ve,{size:"md",icon:t.isOpen?i(qt,{}):i(Jt,{}),"aria-label":"Open Menu",display:{md:"none"},onClick:t.isOpen?t.onClose:t.onOpen}),s(we,{spacing:8,alignItems:"center",children:[i(xe,{as:"h1",size:u?"sm":"md",children:u?"Martech":"Realtime Digital Marketing"}),i(we,{as:"nav",spacing:4,display:{base:"none",md:"flex"},children:y})]}),s(Ie,{alignItems:"center",gap:2,children:[s(A,{size:"sm",ref:a,onClick:()=>d(!0),colorScheme:f,children:[f==="green"?i(Bo,{}):i(Fo,{}),u||i(ye,{pl:2,children:v})]}),i(Ve,{"aria-label":"Github Repo",size:"sm",icon:e==="light"?i(Zt,{size:"1.4em"}):i(Qt,{size:"1.4em"}),onClick:()=>window.open("https://github.com/singlestore-labs/demo-realtime-digital-marketing","_blank")}),i(Ve,{"aria-label":"Toggle Color Mode",size:"sm",onClick:o,icon:e==="light"?i(er,{boxSize:"1.2em"}):i(or,{boxSize:"1.2em"})})]})]}),t.isOpen?i(k,{pb:4,display:{md:"none"},children:i(F,{as:"nav",spacing:4,children:y})}):null,i(Bi,{isOpen:r,onClose:()=>d(!1),finalFocusRef:a})]})})})},Gi=ue("~s"),ft=(e,...o)=>{const t=g.exports.useMemo(()=>o.reduce((a,n)=>_(h({},a),{[n]:[]}),{}),[o]),r=g.exports.useRef(t),{data:d}=R(["estimatedRowCount.timeseries",...o],async()=>{const a=await Ye(e,...o),n=new Date;return r.current=o.reduce((c,l)=>{const u=r.current[l];return u.push([n,a[l]]),c[l]=u.slice(-30),c},{}),r.current},{refreshInterval:1e3});return d!=null?d:t},mt=r=>{var d=r,{data:e,yAxisLabel:o}=d,t=z(d,["data","yAxisLabel"]);const{colorMode:a}=De(),n=Object.keys(e),c=g.exports.useCallback(({tooltipData:p,colorScale:y})=>!y||!p?null:n.sort((f,v)=>p.datumByKey[v].datum[1]-p.datumByKey[f].datum[1]).map(f=>{const{datum:v}=p.datumByKey[f];return s(ye,{mb:1,color:y(f),fontSize:"sm",children:[f,": ",ue(".4~s")(v[1])]},f)}),[n]),l=g.exports.useCallback(p=>Gi(p).replace("G","B"),[]);if(n.some(p=>e[p].length<2))return i(M,{height:t.height,children:i(U,{size:"md"})});const u=n.map(p=>i(ir,{dataKey:p,data:e[p],xAccessor:y=>y[0],yAccessor:y=>y[1]},p));return s(dr,_(h({xScale:{type:"time"},yScale:{type:"sqrt",nice:!0,zero:!1,clamp:!0},theme:a==="light"?ar:nr,margin:{left:0,right:50,top:10,bottom:40}},t),{children:[i(So,{orientation:"bottom",numTicks:5,label:"time",labelOffset:10}),i(So,{orientation:"right",numTicks:t.height<250?3:5,tickFormat:l,label:o,labelOffset:20}),u,i(cr,{showVerticalCrosshair:!0,detectBounds:!1,offsetLeft:-175,offsetTop:20,renderTooltip:c})]}))},oo=1e3,Re=60*oo,Oe=60*Re,Ke=24*Oe,B=e=>e.toLocaleString(void 0,{maximumFractionDigits:2}),X=e=>e?e<oo?`${B(e)}ms`:e<Re?`${B(e/oo)}s`:e<Oe?`${Math.floor(e/Re)}m${X(e%Re)}`:e<Ke?`${Math.floor(e/Oe)}h${X(e%Oe)}`:`${Math.floor(e/Ke)}d${X(e%Ke)}`:"0s",Yi=100,Hi=1e3,j=class extends Z{constructor(o){super();S(this,"latlng");S(this,"age",0);S(this,"marker");S(this,"pulse");this.latlng=o,this.marker=new Ae,this.marker.beginFill(j.markerColor).drawCircle(0,0,5).endFill(),this.addChild(this.marker),this.pulse=new Ae,this.pulse.beginFill(j.pulseColor),this.pulse.drawTorus&&this.pulse.drawTorus(0,0,4,6),this.pulse.endFill(),this.addChild(this.pulse)}update(o,t){if(this.age+=t/60,this.age>j.lifetime&&this.parent){this.parent.removeChild(this);return}const r=this.age%j.lifetime/j.lifetime,d=ur(r);this.pulse.scale.set(1+d);const a=.4,n=r<a?lr(r/a):1-sr((r-a)/(1-a));this.pulse.alpha=n,r<a?this.marker.alpha=n:this.marker.alpha=1-pr((r-a)/(1-a));const[c,l]=o(this.latlng);this.x=c,this.y=l}};let ce=j;S(ce,"lifetime",1.5),S(ce,"markerColor",306687),S(ce,"pulseColor",306687);const vt=()=>{const e=m(b),{initialized:o}=O();return g.exports.useMemo(()=>["notifications",e,o],[e,o])},bt=({scene:e,latLngToPixel:o,bounds:t})=>{const r=g.exports.useRef(new Date().toISOString()),d=m(b),{initialized:a}=O(),n=dt(t,50),c=vt();return R(c,()=>di(d,r.current,Yi,n),{refreshInterval:Hi,isPaused:()=>!a,onSuccess:l=>{if(l.length>0){r.current=l[0][0];for(const[,u,p]of l)e.addChild(new ce([p,u]))}}}),{update:g.exports.useCallback(l=>{for(let u=e.children.length-1;u>=0;u--)e.children[u].update(o,l)},[o,e])}},Wi=()=>{const e=m(b),o=ft(e,"locations","requests","purchases","notifications","subscriber_segments"),t=R(["notificationsMapTableCounts",e],()=>Ye(e,"offers","subscribers","cities","segments"),{refreshInterval:1e3}),r=m(Ze("SimulatorMatcher")),d=m(Ze("SimulatorUpdateSegments")),a=ue(".4~s"),n=t.data?s(ke,{spacing:2,minChildWidth:"120px",children:[s(I,{children:[i(w,{children:"Offers"}),i(L,{children:a(t.data.offers)})]}),s(I,{children:[i(w,{children:"Cities"}),i(L,{children:a(t.data.cities)})]}),s(I,{children:[i(w,{children:"Subscribers"}),i(L,{children:a(t.data.subscribers)})]}),s(I,{children:[i(w,{children:"Segments"}),i(L,{children:a(t.data.segments)})]}),s(I,{children:[i(w,{children:"Segmentation"}),i(L,{children:X(d)})]}),s(I,{children:[i(w,{children:"Matching"}),i(L,{children:X(r)})]})]}):null;return s(C,{children:[i(T,{children:`
          The map on this page displays notifications as they are delivered to
          subscribers in realtime. Below, you will find some key statistics
          about the demo.
        `}),n,s(k,{children:[i(ye,{fontSize:"sm",fontWeight:"medium",children:"Row count / time"}),i(mt,{data:o,yAxisLabel:"total rows",height:150})]})]})},ji=()=>{const{connected:e,initialized:o}=O(),t=m(re);return bo(t&&e&&o),st(t&&e&&o),s(Ie,{gap:4,justifyContent:"space-between",direction:["column","column","row"],height:"100%",children:[i(F,{spacing:4,flex:"2 2 0",minHeight:"200px",maxHeight:"100%",children:i(Ue,{useRenderer:bt,options:{}})}),s(F,{spacing:4,flex:"1 1 0",minWidth:"0",children:[i(T,{children:`

            This application is a demo of how to use SingleStore to serve ads to
            users based on their behavior and realtime location. The demo is
            based on location, purchase, and request history from millions of
            simulated subscribers for a hypothetical service company. To learn
            about how this works please visit the [overview page](/).
          `}),t?i(Wi,{}):i(ct,{})]})]})},ht=t=>{var r=t,{children:e}=r,o=z(r,["children"]);return i(yr,_(h({as:"pre",borderRadius:"md",overflow:"auto",display:"block",px:6,py:4,minW:0},o),{children:e}))},Vi=1e3,$i=(e,o)=>{const t=m(b),{initialized:r}=O();R(["offers",t,r,e],()=>ai(t,Vi,e),{isPaused:()=>!r,onSuccess:o})},Ki=e=>i(lt,_(h({},e),{useCells:$i,getCellConfig:o=>{const t=qe(4,173,255);return{color:t,hoverColor:t.brighter(1),wktPolygon:o.notificationZone}}})),Xi=e=>e.every(([,o])=>o===0),G=e=>{const{completed:o,title:t,left:r,right:d}=e,{colorMode:a}=De(),n=a==="light"?".300":".500",c=o?"gray"+n:void 0,l=(o?"green":"gray")+n;return s(C,{children:[s(Le,{children:[s(xe,{as:"h2",size:"lg",mb:4,color:c,children:[i(Bo,h({color:l},{boxSize:6,position:"relative",bottom:.5,mr:2})),t]}),r]}),i(Le,{children:d})]})},qi=({connected:e,isVapor:o})=>o?i(G,{completed:e,title:"Connected",left:s(C,{children:[i(T,{children:`
                Connected to a demo cluster running in the SingleStore Managed
                Service. To disconnect and use your own cluster instead, click
                the button below.
              `}),i(yt,{size:"xs",colorScheme:"gray"})]}),right:null}):i(G,{completed:e,title:"Connect to SingleStore",left:i(T,{children:`
            This demo requires a connection to SingleStore's HTTP API. Please
            ensure the connection details on the right are correct.
            
            **Note**: The HTTP API may need to be enabled on your SingleStore
            cluster. To do so please see [our documentation][1] or contact
            support for assistance.
            
            [1]: https://docs.singlestore.com/docs/http-api/
          `}),right:i(ut,{})}),Ji=({onClose:e,schemaObjectName:o})=>{const t=Jr(o),[r]=Uo("(max-width: 640px)");return s(vr,{isOpen:!0,onClose:e,size:r?"full":"4xl",scrollBehavior:"inside",children:[i(no,{}),s(br,{children:[s(co,{children:["Create statement for ",t.name]}),i(Mo,{}),i(lo,{children:i(ht,{mb:4,children:t.createStmt})})]})]})},Zi=({initialized:e})=>{const[o,t]=P(oe),r=it(),{colorMode:d}=De(),[a,n]=g.exports.useState(),c=g.exports.useCallback(u=>n(u),[]),l=g.exports.useCallback(()=>n(null),[]);return s(C,{children:[!!a&&i(Ji,{onClose:l,schemaObjectName:a}),i(G,{completed:e,title:"Setup the schema",left:s(C,{children:[i(T,{children:`
                Our schema includes the database and a set of tables and views we
                need to store all of our data. Use the controls below to set the
                database name and create the schema.
              `}),i(fr,{mt:4,mb:6}),s(we,{alignItems:"flex-end",children:[s(ro,{flex:1,children:[i(io,{fontSize:"xs",fontWeight:"bold",textTransform:"uppercase",children:"Database name"}),i(zo,{placeholder:"martech",value:o,size:"sm",onChange:u=>t(u.target.value)})]}),i(k,{flex:1,textAlign:"center",children:i(gt,{colorScheme:"blue",size:"sm",disabled:e,skipSeedData:!0,children:e?"Schema is setup":"Setup schema"})})]})]}),right:i(ke,{columns:[1,3,3],gap:1,children:Object.keys(r.data||{}).sort().map(u=>{var p;return i(Le,{bg:((p=r.data)!=null&&p[u]?"green":"gray")+(d==="light"?".200":".600"),fontSize:"xs",color:d==="light"?"gray.800":"gray.100",textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden",borderRadius:"md",px:2,py:1,textAlign:"center",_hover:{fontWeight:"bold"},cursor:"pointer",onClick:()=>c(u),children:u},u)})})})]})},Et=(e,o,t=!0)=>{var a;const r=R(["pipelineStatus",e,o],()=>qo(e,o),{isPaused:()=>!t}),d=(a=r.data)!=null&&a.length?r.data.every(n=>!n.needsUpdate):!1;return{pipelines:r,completed:d}},Qi=()=>{const e=m(b),o=m(te),{pipelines:t,completed:r}=Et(e,o);bo(r);const[d,a]=Q(),n=g.exports.useCallback(async()=>{a.on(),await Jo(e,o),t.mutate(),a.off()},[a,e,o,t]),c=["locations","requests","purchases"],l=ft(e,...c),u=c.some(y=>l[y].length<2)||c.every(y=>Xi(l[y]));return i(G,{completed:r,title:"Ingest data",left:i(T,{children:`
            The demo needs to load location, request, and purchase history from
            simulated subscribers in real time. We will simulate these streams
            using [SingleStore Pipelines][1] to ingest data from [AWS S3][2].

            [1]: https://docs.singlestore.com/managed-service/en/load-data/about-loading-data-with-pipelines/pipeline-concepts/overview-of-pipelines.html
            [2]: https://aws.amazon.com/s3/
          `}),right:u||!r?i(M,{h:220,children:s(A,{colorScheme:"blue",size:"sm",onClick:n,disabled:r,children:[(d||r)&&i(U,{mr:2}),d?"Creating Pipelines":r?"...waiting for data":"Create pipelines"]})}):i(mt,{data:l,yAxisLabel:"total rows",height:200})})},We=(e,o=!0)=>R(["overviewTableCounts",e],()=>Ye(e,"locations","notifications","offers","purchases","requests","segments","subscriber_segments","subscribers"),{isPaused:()=>!o}),ed=()=>{var c,l;const e=m(b),o=m(te),[t,r]=Q(),d=We(e),a=g.exports.useCallback(async()=>{r.on(),await yo(e,se,o),d.mutate(),r.off()},[e,o,d,r]),n=!!((c=d.data)!=null&&c.offers);return i(G,{completed:n,title:"Offers",left:i(C,{children:s(T,{children:[`
              This demo allows any company to place offers. Each offer has a
              maximum bid price, activation zone, list of segments, and
              notification content. As subscribers move around, they are
              continuously matched to offers based on their location and
              whichever segments they are members of. If multiple offers match
              the offer with the highest bid price will be selected.
            `,!n&&`
                Press the "load offers" button on the right to create some
                sample offers in New York City.
            `,n&&`
                The map to your right displays a polygon representing each
                offer's activation zone. Hover over a polygon to see it's exact
                boundary. There are ${(l=d.data)==null?void 0:l.offers} offers in the
                database.
            `]})}),right:n?i(Ki,{height:300,defaultZoom:13}):i(M,{h:"100%",children:s(A,{onClick:a,disabled:t,children:[t&&i(U,{mr:2}),t?"loading...":n?"loaded offers!":"load offers"]})})})},od=({done:e,setDone:o})=>{const t=m(b),r=g.exports.useRef(new Date().toISOString());return g.exports.useEffect(()=>{if(e)return;const d=new AbortController,a=_(h({},t),{ctx:d});return(async()=>{try{for(let n=0;n<10;n++)if(r.current=await fo(a,r.current,!1),await go(a,"second"),n>1&&!await Zo(a))return}catch(n){if(d.signal.aborted||n instanceof DOMException&&n.name==="AbortError")return;throw n}})().then(()=>o(!0)),()=>{d.abort()}},[t,e,o]),e?null:i(Le,{colSpan:[1,1,2],children:s(M,{w:"100%",h:"200px",color:"gray.500",children:[i(U,{size:"md",mr:4}),i(xe,{size:"md",children:"Warming up queries..."})]})})},td=()=>{var p;const e=m(b),o=We(e),{elapsed:t,isRunning:r,startTimer:d,stopTimer:a}=at(),n=g.exports.useRef(new Date().toISOString()),c=!!((p=o.data)!=null&&p.subscriber_segments),l=g.exports.useCallback(async()=>{d(),n.current=await fo(e,n.current),a(),o.mutate()},[e,o,d,a]);let u;if(t&&o.data){const{segments:y,subscriber_segments:f,locations:v,requests:N,purchases:H}=o.data,ie=X(t),W=B(v+N+H),de=B(y),J=B(f);u=i(T,{children:`
          The last update evaluated ${W} rows against ${de} segments
          producing ${J} segment memberships.
          
          **This process took ${ie}**.
        `})}return i(G,{completed:c,title:"Segmentation",left:i(T,{children:`
            As mentioned above, each offer includes a list of segments. A
            segment is defined by a simple rule like "bought a coffee in the
            last day" or "visited the grocery store in the last week". While we
            could evaluate all of the segments dynamically when matching offers
            to subscribers, we would be wasting a lot of compute time since
            segment memberships don't change very often. Instead we will
            use a routine to periodically cache the mapping between subscribers
            and segments.

            Click the button to run the update interactively, or run the following query in your favorite SQL client:

                select count(*)
                from dynamic_subscriber_segments(
                  date_sub_dynamic(now(), "minute"),
                  now()
                );
          `}),right:i(M,{h:"100%",children:s(Go,{gap:4,textAlign:"center",children:[s(A,{disabled:r,onClick:l,children:[r&&i(U,{mr:2}),r?"...running":"Match subscribers to segments"]}),u]})})})},rd=()=>{var v;const e=m(b),o=We(e),t=vt(),{mutate:r}=mr(),{elapsed:d,isRunning:a,startTimer:n,stopTimer:c}=at(),[l,u]=g.exports.useState(0),p=!!((v=o.data)!=null&&v.notifications),y=g.exports.useCallback(async()=>{let N=0,H=0;for(;N===0&&H++<10;)n(),N=await go(e,"second");c(),u(N),o.mutate(),r(t)},[e,n,c,o,r,t]);let f;if(d&&o.data){const{offers:N,subscribers:H,subscriber_segments:ie,notifications:W}=o.data,de=B(N*H+W),J=B(ie),Tt=X(d),St=B(l);f=i(T,{children:`
          The last update evaluated up to ${de} notification opportunities
          against ${J} segment memberships generating ${St}
          notifications. This process took ${Tt}.
        `})}return i(G,{completed:p,title:"Matching",left:i(T,{children:`
            Now that we have offers and have assigned subscribers to segments,
            we are finally able to deliver ads to subscribers as push
            notifications. In this demo, rather than actually sending
            notifications we will insert them into a table called
            "notifications".

            Click the button to generate notifications interactively, or run the
            following query in your favorite SQL client:

                select * from match_offers_to_subscribers("second");
          `}),right:i(M,{h:"100%",children:s(Go,{gap:4,w:"100%",children:[s(A,{disabled:a,onClick:y,children:[a&&i(U,{mr:2}),a?"...running":"Generate notifications"]}),i(k,{width:"100%",children:i(Ue,{height:250,defaultZoom:12,useRenderer:bt,options:{}})}),f]})})})},id=()=>{const e=m(oe);return i(G,{completed:!0,title:"Putting it all together",left:i(T,{children:`
            Nice job! At this point you are ready to step into the shoes of a
            data engineer. Here are some recommendations on what to do next:

            * Visit the [live demo dashboard][1]
            * Explore the ${e} database in SingleStore Studio

            [1]: map
          `}),right:null})},dd=()=>{const e=m(b),o=m(te),{connected:t,initialized:r,isVapor:d}=O(),{completed:a}=Et(e,o,t&&r),{data:n}=We(e,t&&r),[c,l]=g.exports.useState(!1),u=[{completed:t,component:i(qi,{connected:t,isVapor:d},"connection")},{completed:r,component:i(Zi,{initialized:r},"schema")},{completed:a,component:i(Qi,{},"pipelines")},{completed:n?n.offers>0:!1,component:i(ed,{},"offers")},{completed:c,component:i(od,{done:c,setDone:l},"warmup")},{completed:n?n.subscriber_segments>0:!1,component:i(td,{},"segmentation")},{completed:n?n.notifications>0:!1,component:i(rd,{},"matching")},{completed:!0,component:i(id,{},"summary")}];let p=!0;const y=[];for(const{completed:f,component:v}of u)if(p)y.push(v),p=f;else break;return s(q,{maxW:"container.lg",mt:10,mb:"30vh",children:[i(k,{maxW:"container.md",mb:10,px:0,children:i(T,{children:`
            ## Realtime Digital Marketing

            This application is a demo of how to use [SingleStore][3] to serve ads to
            users based on their behavior and realtime location. The demo is
            based on location, purchase, and request history from millions of
            simulated subscribers for a hypothetical service company.

            This page will take you through the process of setting up the demo,
            explaining everything as we go. If you have any questions or issues,
            please file an issue on the [GitHub repo][1] or our [forums][2].

            [1]: https://github.com/singlestore-labs/demo-realtime-digital-marketing/issues
            [2]: https://www.singlestore.com/forum/
            [3]: https://www.singlestore.com
          `})}),i(gr,{columnGap:6,rowGap:10,templateColumns:["minmax(0, 1fr)",null,"repeat(2, minmax(0, 1fr))"],children:y})]})};function ad(){const e=i(M,{height:"100vh",children:i(U,{size:"xl",speed:"0.85s",thickness:"3px",emptyColor:"gray.200",color:"blue.500"})});return i(g.exports.Suspense,{fallback:e,children:s(Ie,{height:"100vh",direction:"column",children:[i(Fi,{}),i(k,{m:4,flex:"1",children:s(hr,{children:[i(ae,{path:"/",element:i(dd,{})}),i(ae,{path:"/map",element:i(ji,{})}),i(ae,{path:"/admin",element:i(Ri,{})}),i(ae,{path:"/analytics",element:i(ki,{})}),i(ae,{path:"*",element:i(Er,{to:"/",replace:!0})})]})})]})})}const nd=({children:e})=>{const o=m(He);return i(_t,{isResettingSchema:o,children:e})};class _t extends pe.Component{constructor(o){super(o);S(this,"state",{});this.handlePromiseRejection=this.handlePromiseRejection.bind(this)}componentDidMount(){window.addEventListener("unhandledrejection",this.handlePromiseRejection)}componentWillUnmount(){window.removeEventListener("unhandledrejection",this.handlePromiseRejection)}handlePromiseRejection(o){this.props.isResettingSchema?console.warn("Ignoring error while resetting schema",o.reason):this.setState({error:o.reason})}componentDidCatch(o){this.props.isResettingSchema?console.warn("Ignoring error while resetting schema",o):this.setState({error:o})}render(){const{error:o}=this.state;if(o){let t;return o instanceof D&&(t=s(C,{children:[i(ye,{textAlign:"center",children:"An error occurred while running the following query:"}),i(ht,{children:$(o.sql)})]})),i(q,{maxW:"container.md",my:10,children:s(F,{gap:4,children:[i(M,{children:i(Fo,{boxSize:20,color:"red"})}),i(xe,{size:"xl",textAlign:"center",children:o.message}),t,s(we,{justify:"center",gap:4,children:[i(A,{onClick:()=>this.setState({error:void 0}),size:"sm",children:"Dismiss Error"}),i(A,{onClick:()=>window.location.reload(),size:"sm",colorScheme:"blue",leftIcon:i(_r,{}),children:"Reload"})]})]})})}return this.props.children}}const cd=Tr({fonts:{heading:"InterVariable, sans-serif",body:"InterVariable, sans-serif",mono:'"Source Code ProVariable", monospace'},components:{Link:{baseStyle:e=>({color:e.colorMode==="light"?"blue.600":"blue.300"})}}}),ld=({children:e})=>{const o=m(He),t=Do();return i(Ar,{value:{onError:d=>{if(o)console.warn("Ignoring error while resetting schema",d);else{console.error(d);const a="swr-error",n={id:"swr-error",title:"An error occurred",description:d.message,status:"error",duration:5e3,isClosable:!0};t.isActive(a)?t.update(a,n):t(h({id:a},n))}}},children:e})};Sr.render(i(pe.StrictMode,{children:i(Nr,{theme:cd,children:i(_t,{children:i(Rr,{children:i(Or,{basename:"/",children:i(ld,{children:i(nd,{children:i(ad,{})})})})})})})}),document.getElementById("root"));
