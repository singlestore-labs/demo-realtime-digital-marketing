var bo=Object.defineProperty,ho=Object.defineProperties;var Eo=Object.getOwnPropertyDescriptors;var le=Object.getOwnPropertySymbols;var ft=Object.prototype.hasOwnProperty,mt=Object.prototype.propertyIsEnumerable;var Ye=(e,t,o)=>t in e?bo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,h=(e,t)=>{for(var o in t||(t={}))ft.call(t,o)&&Ye(e,o,t[o]);if(le)for(var o of le(t))mt.call(t,o)&&Ye(e,o,t[o]);return e},_=(e,t)=>ho(e,Eo(t));var k=(e,t)=>{var o={};for(var i in e)ft.call(e,i)&&t.indexOf(i)<0&&(o[i]=e[i]);if(e!=null&&le)for(var i of le(e))t.indexOf(i)<0&&mt.call(e,i)&&(o[i]=e[i]);return o};var S=(e,t,o)=>(Ye(e,typeof t!="symbol"?t+"":t,o),o);import{d as j,l as _o,s as To,_ as Ve,r as g,j as r,B as L,M as So,a as l,F as A,L as W,R as ae,u as Rt,C as q,A as No,b as x,c as At,e as Ro,f,g as N,h as Ot,i as z,k as Ct,P as Ao,m as Oo,G as _e,q as Co,E as Io,N as It,n as wo,o as K,p as ge,t as fe,v as me,w as R,x as ne,S as F,y as P,z as M,D as Ae,H as C,I,J as w,K as vt,O as Te,T as Lo,Q as ko,U as bt,V as se,W as oe,X as Do,Y as pe,Z as $e,$ as xo,a0 as Qe,a1 as et,a2 as wt,a3 as zo,a4 as Po,a5 as tt,a6 as Oe,a7 as Mo,a8 as ot,a9 as Uo,aa as rt,ab as it,ac as Lt,ad as Bo,ae as Fo,af as kt,ag as Go,ah as ce,ai as Yo,aj as Ce,ak as Dt,al as Se,am as He,an as Ho,ao as Wo,ap as Ne,aq as Ie,ar as xt,as as zt,at as jo,au as Vo,av as $o,aw as Ko,ax as qo,ay as Jo,az as Xo,aA as Zo,aB as Qo,aC as er,aD as ht,aE as tr,aF as or,aG as rr,aH as ir,aI as dr,aJ as ar,aK as nr,aL as cr,aM as Re,aN as Pt,aO as lr,aP as sr,aQ as pr,aR as ur,aS as te,aT as yr,aU as gr,aV as fr,aW as mr,aX as vr,aY as br,aZ as hr,a_ as Er}from"./vendor.dc13b385.js";const _r=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))i(d);new MutationObserver(d=>{for(const a of d)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(d){const a={};return d.integrity&&(a.integrity=d.integrity),d.referrerpolicy&&(a.referrerPolicy=d.referrerpolicy),d.crossorigin==="use-credentials"?a.credentials="include":d.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(d){if(d.ep)return;d.ep=!0;const a=o(d);fetch(d.href,a)}};_r();const Tr=/^Error (?<code>\d+):/;class D extends Error{constructor(t,o,i){super(t);S(this,"code");S(this,"sql");var d;if(Object.setPrototypeOf(this,D.prototype),this.sql=o,i)this.code=i;else{const a=t.match(Tr);this.code=a?parseInt(((d=a.groups)==null?void 0:d.code)||"-1",10):-1}}isUnknownDatabase(){return this.code===1049}isDatabaseRecovering(){return this.code===2269}}const dt=async(e,t,...o)=>{const i=await U(e,t,...o);if(i.length!==1)throw new D("Expected exactly one row",t);return i[0]},U=async(e,t,...o)=>{const i=await we("query/rows",e,t,...o);if(i.results.length!==1)throw new D("Expected exactly one result set",t);return i.results[0].rows},Mt=(e,t,...o)=>U(_(h({},e),{database:void 0}),t,...o),at=async(e,t,...o)=>{const i=await we("query/tuples",e,t,...o);if(i.results.length!==1)throw new D("Expected exactly one result set",t);return i.results[0].rows},nt=(e,t,...o)=>we("exec",_(h({},e),{database:void 0}),t,...o),b=(e,t,...o)=>we("exec",e,t,...o),we=async(e,t,o,...i)=>{var n;const d=await fetch(`${t.host}/api/v1/${e}`,{method:"POST",signal:(n=t.ctx)==null?void 0:n.signal,headers:{"Content-Type":"application/json",Authorization:`Basic ${btoa(`${t.user}:${t.password}`)}`},body:JSON.stringify({sql:o,args:i,database:t.database})});if(!d.ok)throw new D(await d.text(),o);const a=await d.json();if(a.error)throw new D(a.error.message,o,a.error.code);return a},Ut=e=>{const{table:t,columns:o,tuples:i,options:d}=e,a=`(${o.map(()=>"?").join(",")})`,n=i.map(()=>a).join(",");return{sql:j`
      ${d!=null&&d.replace?"REPLACE":"INSERT"} INTO ${t}
      (${o.join(", ")})
      VALUES
        ${n}
    `,params:i.flat()}},Et=e=>({sql:typeof e=="string"?e:e.sql,params:typeof e=="string"?[]:e.params||[]}),ct=e=>{const{with:t,base:o}=e,i=[],d=t.map(([s,c])=>{const{sql:p,params:u}=Et(c);return i.push(...u),`${s} AS (${j(p)})`}).join(`,
`),{sql:a,params:n}=Et(o);return{sql:j`
      WITH ${d}
      ${j(a)}
    `,params:[...i,...n]}},Sr=e=>`POLYGON((${e.map(o=>`${o[0]} ${o[1]}`).join(",")}))`,Le=e=>{const[t,o]=e.ne,[i,d]=e.sw;return Sr([[d,t],[o,t],[o,i],[d,i],[d,t]])},_t="POLYGON((",Tt="))",Nr=e=>{if(e.startsWith(_t)&&e.endsWith(Tt))return e.slice(_t.length,-Tt.length).split(",").map(o=>{const[i,d]=o.trim().split(" ");return[parseFloat(i),parseFloat(d)]});throw new Error(`Invalid WKT polygon: ${e}`)};var We=[{id:205,vendor:"Wordtune",tld:"org",category:"automotive",popularity:-.13,cdf:130},{id:275,vendor:"Fivebridge",tld:"com",category:"industrial",popularity:-.12,cdf:250},{id:687,vendor:"Oyondu",tld:"biz",category:"electronics",popularity:-.12,cdf:370},{id:836,vendor:"Dablist",tld:"edu",category:"books",popularity:-.11,cdf:480},{id:370,vendor:"Buzzshare",tld:"edu",category:"games",popularity:-.1,cdf:580},{id:858,vendor:"Vimbo",tld:"mil",category:"beauty",popularity:-.1,cdf:680},{id:198,vendor:"Zoombox",tld:"net",category:"industrial",popularity:-.09,cdf:770},{id:244,vendor:"Twitternation",tld:"biz",category:"jewelry",popularity:-.09,cdf:860},{id:531,vendor:"Youspan",tld:"org",category:"health",popularity:-.08,cdf:940},{id:545,vendor:"Twimm",tld:"name",category:"beauty",popularity:-.08,cdf:1020},{id:957,vendor:"Tagpad",tld:"com",category:"sports",popularity:-.05,cdf:1070},{id:577,vendor:"Skyndu",tld:"mil",category:"health",popularity:-.03,cdf:1100},{id:283,vendor:"Plambee",tld:"net",category:"computers",popularity:-.02,cdf:1120},{id:788,vendor:"Skinder",tld:"edu",category:"baby",popularity:-.02,cdf:1140},{id:66,vendor:"Aivee",tld:"gov",category:"games",popularity:-.01,cdf:1150},{id:598,vendor:"Skimia",tld:"biz",category:"garden",popularity:-.01,cdf:1160},{id:407,vendor:"Tagcat",tld:"gov",category:"electronics",popularity:0,cdf:1160},{id:745,vendor:"Topiczoom",tld:"info",category:"health",popularity:0,cdf:1160},{id:791,vendor:"Wordpedia",tld:"mil",category:"music",popularity:0,cdf:1160},{id:854,vendor:"Vitz",tld:"com",category:"toys",popularity:0,cdf:1160},{id:912,vendor:"Trilia",tld:"com",category:"music",popularity:0,cdf:1160},{id:627,vendor:"Aimbo",tld:"gov",category:"clothing",popularity:.01,cdf:1170},{id:125,vendor:"Kwideo",tld:"biz",category:"kids",popularity:.02,cdf:1190},{id:134,vendor:"Dynabox",tld:"org",category:"industrial",popularity:.02,cdf:1210},{id:194,vendor:"Browsezoom",tld:"info",category:"automotive",popularity:.02,cdf:1230},{id:374,vendor:"Jetwire",tld:"mil",category:"music",popularity:.02,cdf:1250},{id:71,vendor:"Jaloo",tld:"com",category:"home",popularity:.03,cdf:1280},{id:694,vendor:"Linkbuzz",tld:"edu",category:"grocery",popularity:.03,cdf:1310},{id:848,vendor:"Skalith",tld:"name",category:"automotive",popularity:.03,cdf:1340},{id:763,vendor:"Digitube",tld:"edu",category:"clothing",popularity:.04,cdf:1380},{id:230,vendor:"Twitterwire",tld:"biz",category:"sports",popularity:.05,cdf:1430},{id:655,vendor:"Realblab",tld:"edu",category:"toys",popularity:.05,cdf:1480},{id:802,vendor:"Youtags",tld:"org",category:"outdoors",popularity:.05,cdf:1530},{id:181,vendor:"Gigashots",tld:"gov",category:"outdoors",popularity:.06,cdf:1590},{id:257,vendor:"Livetube",tld:"info",category:"electronics",popularity:.06,cdf:1650},{id:812,vendor:"Ntags",tld:"biz",category:"health",popularity:.06,cdf:1710},{id:941,vendor:"Gigashots",tld:"mil",category:"garden",popularity:.07,cdf:1780},{id:102,vendor:"Voomm",tld:"name",category:"computers",popularity:.08,cdf:1860},{id:154,vendor:"Demivee",tld:"net",category:"home",popularity:.08,cdf:1940},{id:341,vendor:"Feedfish",tld:"name",category:"outdoors",popularity:.08,cdf:2020},{id:354,vendor:"Aibox",tld:"biz",category:"home",popularity:.08,cdf:2100},{id:692,vendor:"Fadeo",tld:"org",category:"jewelry",popularity:.08,cdf:2180},{id:73,vendor:"Meevee",tld:"info",category:"grocery",popularity:.09,cdf:2270},{id:436,vendor:"Cogibox",tld:"com",category:"grocery",popularity:.09,cdf:2360},{id:565,vendor:"Realcube",tld:"mil",category:"industrial",popularity:.09,cdf:2450},{id:917,vendor:"Yadel",tld:"mil",category:"grocery",popularity:.09,cdf:2540},{id:466,vendor:"Mita",tld:"biz",category:"home",popularity:.1,cdf:2640},{id:749,vendor:"Tagopia",tld:"biz",category:"clothing",popularity:.1,cdf:2740},{id:891,vendor:"Thoughtstorm",tld:"mil",category:"music",popularity:.1,cdf:2840},{id:532,vendor:"Jaxbean",tld:"mil",category:"tools",popularity:.11,cdf:2950},{id:901,vendor:"Yata",tld:"gov",category:"garden",popularity:.11,cdf:3060},{id:904,vendor:"Ooba",tld:"com",category:"books",popularity:.11,cdf:3170},{id:960,vendor:"Photobean",tld:"mil",category:"industrial",popularity:.11,cdf:3280},{id:271,vendor:"Linktype",tld:"info",category:"tools",popularity:.12,cdf:3400},{id:393,vendor:"Youspan",tld:"edu",category:"garden",popularity:.12,cdf:3520},{id:580,vendor:"Plajo",tld:"info",category:"jewelry",popularity:.12,cdf:3640},{id:769,vendor:"Vitz",tld:"gov",category:"beauty",popularity:.12,cdf:3760},{id:11,vendor:"Thoughtsphere",tld:"biz",category:"home",popularity:.13,cdf:3890},{id:129,vendor:"Trilia",tld:"com",category:"games",popularity:.13,cdf:4020},{id:192,vendor:"Riffwire",tld:"edu",category:"jewelry",popularity:.13,cdf:4150},{id:543,vendor:"Skipstorm",tld:"mil",category:"tools",popularity:.13,cdf:4280},{id:780,vendor:"Linklinks",tld:"org",category:"computers",popularity:.13,cdf:4410},{id:215,vendor:"Jabberstorm",tld:"net",category:"garden",popularity:.14,cdf:4550},{id:345,vendor:"Fliptune",tld:"info",category:"electronics",popularity:.14,cdf:4690},{id:400,vendor:"Agimba",tld:"biz",category:"grocery",popularity:.14,cdf:4830},{id:413,vendor:"Skynoodle",tld:"biz",category:"clothing",popularity:.14,cdf:4970},{id:621,vendor:"Oyondu",tld:"com",category:"toys",popularity:.14,cdf:5110},{id:832,vendor:"Browsetype",tld:"com",category:"kids",popularity:.14,cdf:5250},{id:921,vendor:"Eazzy",tld:"edu",category:"beauty",popularity:.14,cdf:5390},{id:87,vendor:"Muxo",tld:"name",category:"grocery",popularity:.15,cdf:5540},{id:219,vendor:"Jaxbean",tld:"edu",category:"automotive",popularity:.15,cdf:5690},{id:226,vendor:"Gabcube",tld:"net",category:"beauty",popularity:.15,cdf:5840},{id:537,vendor:"Thoughtbeat",tld:"edu",category:"sports",popularity:.15,cdf:5990},{id:640,vendor:"Kare",tld:"mil",category:"books",popularity:.15,cdf:6140},{id:666,vendor:"Ntags",tld:"biz",category:"movies",popularity:.15,cdf:6290},{id:685,vendor:"Centimia",tld:"name",category:"books",popularity:.15,cdf:6440},{id:790,vendor:"Eabox",tld:"edu",category:"home",popularity:.15,cdf:6590},{id:47,vendor:"Agivu",tld:"net",category:"industrial",popularity:.16,cdf:6750},{id:51,vendor:"Camido",tld:"com",category:"games",popularity:.16,cdf:6910},{id:225,vendor:"Mydo",tld:"name",category:"sports",popularity:.16,cdf:7070},{id:594,vendor:"Yodoo",tld:"net",category:"tools",popularity:.16,cdf:7230},{id:702,vendor:"Skilith",tld:"org",category:"computers",popularity:.16,cdf:7390},{id:950,vendor:"Leexo",tld:"net",category:"industrial",popularity:.16,cdf:7550},{id:128,vendor:"Layo",tld:"gov",category:"books",popularity:.17,cdf:7720},{id:422,vendor:"DabZ",tld:"edu",category:"kids",popularity:.17,cdf:7890},{id:430,vendor:"Skaboo",tld:"biz",category:"books",popularity:.17,cdf:8060},{id:433,vendor:"Jetpulse",tld:"com",category:"sports",popularity:.17,cdf:8230},{id:459,vendor:"Fivespan",tld:"org",category:"garden",popularity:.17,cdf:8400},{id:982,vendor:"Topiclounge",tld:"com",category:"beauty",popularity:.17,cdf:8570},{id:75,vendor:"Twitterworks",tld:"com",category:"computers",popularity:.18,cdf:8750},{id:82,vendor:"Oba",tld:"info",category:"health",popularity:.18,cdf:8930},{id:88,vendor:"Skaboo",tld:"org",category:"sports",popularity:.18,cdf:9110},{id:399,vendor:"Photofeed",tld:"mil",category:"clothing",popularity:.18,cdf:9290},{id:559,vendor:"Voonix",tld:"name",category:"computers",popularity:.18,cdf:9470},{id:676,vendor:"Zooveo",tld:"net",category:"shoes",popularity:.18,cdf:9650},{id:686,vendor:"Twitternation",tld:"biz",category:"tools",popularity:.18,cdf:9830},{id:714,vendor:"Twitternation",tld:"edu",category:"shoes",popularity:.18,cdf:10010},{id:55,vendor:"Eidel",tld:"com",category:"outdoors",popularity:.19,cdf:10200},{id:84,vendor:"Ainyx",tld:"gov",category:"baby",popularity:.19,cdf:10390},{id:232,vendor:"Rhybox",tld:"gov",category:"jewelry",popularity:.19,cdf:10580},{id:452,vendor:"Twinder",tld:"org",category:"baby",popularity:.19,cdf:10770},{id:716,vendor:"Browseblab",tld:"net",category:"kids",popularity:.19,cdf:10960},{id:902,vendor:"Skimia",tld:"biz",category:"electronics",popularity:.19,cdf:11150},{id:9,vendor:"Podcat",tld:"mil",category:"beauty",popularity:.2,cdf:11350},{id:24,vendor:"Latz",tld:"biz",category:"music",popularity:.2,cdf:11550},{id:119,vendor:"Skippad",tld:"biz",category:"computers",popularity:.2,cdf:11750},{id:444,vendor:"Riffpath",tld:"net",category:"shoes",popularity:.2,cdf:11950},{id:635,vendor:"Fanoodle",tld:"mil",category:"electronics",popularity:.2,cdf:12150},{id:794,vendor:"Vimbo",tld:"mil",category:"books",popularity:.2,cdf:12350},{id:822,vendor:"Photospace",tld:"com",category:"industrial",popularity:.2,cdf:12550},{id:888,vendor:"Tagtune",tld:"biz",category:"toys",popularity:.2,cdf:12750},{id:6,vendor:"Oyoyo",tld:"net",category:"jewelry",popularity:.21,cdf:12960},{id:161,vendor:"Tagfeed",tld:"com",category:"sports",popularity:.21,cdf:13170},{id:346,vendor:"Brainbox",tld:"biz",category:"clothing",popularity:.21,cdf:13380},{id:514,vendor:"Yodoo",tld:"com",category:"tools",popularity:.21,cdf:13590},{id:527,vendor:"Eire",tld:"com",category:"jewelry",popularity:.21,cdf:13800},{id:550,vendor:"Bubbletube",tld:"info",category:"beauty",popularity:.21,cdf:14010},{id:606,vendor:"Yoveo",tld:"com",category:"tools",popularity:.21,cdf:14220},{id:624,vendor:"Kanoodle",tld:"edu",category:"computers",popularity:.21,cdf:14430},{id:679,vendor:"Rooxo",tld:"net",category:"movies",popularity:.21,cdf:14640},{id:693,vendor:"Babbleblab",tld:"org",category:"games",popularity:.21,cdf:14850},{id:700,vendor:"Jaxworks",tld:"org",category:"shoes",popularity:.21,cdf:15060},{id:816,vendor:"Kazio",tld:"edu",category:"garden",popularity:.21,cdf:15270},{id:860,vendor:"Rhynyx",tld:"name",category:"books",popularity:.21,cdf:15480},{id:878,vendor:"Avamm",tld:"net",category:"health",popularity:.21,cdf:15690},{id:967,vendor:"Chatterpoint",tld:"name",category:"beauty",popularity:.21,cdf:15900},{id:290,vendor:"Thoughtbridge",tld:"biz",category:"clothing",popularity:.22,cdf:16120},{id:719,vendor:"Skynoodle",tld:"gov",category:"games",popularity:.22,cdf:16340},{id:85,vendor:"Riffpedia",tld:"gov",category:"grocery",popularity:.23,cdf:16570},{id:143,vendor:"Pixonyx",tld:"edu",category:"automotive",popularity:.23,cdf:16800},{id:247,vendor:"Oyonder",tld:"biz",category:"garden",popularity:.23,cdf:17030},{id:322,vendor:"Skippad",tld:"edu",category:"books",popularity:.23,cdf:17260},{id:332,vendor:"Kare",tld:"org",category:"clothing",popularity:.23,cdf:17490},{id:338,vendor:"Ooba",tld:"org",category:"clothing",popularity:.23,cdf:17720},{id:414,vendor:"Youfeed",tld:"name",category:"shoes",popularity:.23,cdf:17950},{id:442,vendor:"Edgeblab",tld:"name",category:"electronics",popularity:.23,cdf:18180},{id:454,vendor:"Yodoo",tld:"org",category:"shoes",popularity:.23,cdf:18410},{id:520,vendor:"Podcat",tld:"biz",category:"books",popularity:.23,cdf:18640},{id:629,vendor:"Twiyo",tld:"mil",category:"grocery",popularity:.23,cdf:18870},{id:765,vendor:"Oloo",tld:"mil",category:"garden",popularity:.23,cdf:19100},{id:935,vendor:"Cogibox",tld:"biz",category:"sports",popularity:.23,cdf:19330},{id:176,vendor:"Trupe",tld:"info",category:"sports",popularity:.24,cdf:19570},{id:356,vendor:"Camido",tld:"org",category:"outdoors",popularity:.24,cdf:19810},{id:377,vendor:"Kanoodle",tld:"biz",category:"shoes",popularity:.24,cdf:20050},{id:899,vendor:"Yoveo",tld:"net",category:"industrial",popularity:.24,cdf:20290},{id:926,vendor:"Meetz",tld:"com",category:"toys",popularity:.24,cdf:20530},{id:976,vendor:"Realfire",tld:"mil",category:"tools",popularity:.24,cdf:20770},{id:990,vendor:"Leexo",tld:"name",category:"movies",popularity:.24,cdf:21010},{id:258,vendor:"Lazzy",tld:"gov",category:"shoes",popularity:.25,cdf:21260},{id:262,vendor:"Skimia",tld:"com",category:"jewelry",popularity:.25,cdf:21510},{id:329,vendor:"Zava",tld:"mil",category:"kids",popularity:.25,cdf:21760},{id:336,vendor:"Katz",tld:"gov",category:"outdoors",popularity:.25,cdf:22010},{id:489,vendor:"Yamia",tld:"info",category:"garden",popularity:.25,cdf:22260},{id:505,vendor:"Yodel",tld:"org",category:"garden",popularity:.25,cdf:22510},{id:631,vendor:"Meembee",tld:"info",category:"beauty",popularity:.25,cdf:22760},{id:755,vendor:"Brainverse",tld:"mil",category:"beauty",popularity:.25,cdf:23010},{id:827,vendor:"Vimbo",tld:"gov",category:"health",popularity:.25,cdf:23260},{id:339,vendor:"Brightbean",tld:"edu",category:"automotive",popularity:.26,cdf:23520},{id:384,vendor:"Blognation",tld:"mil",category:"jewelry",popularity:.26,cdf:23780},{id:437,vendor:"Kwideo",tld:"edu",category:"shoes",popularity:.26,cdf:24040},{id:560,vendor:"Gigabox",tld:"edu",category:"computers",popularity:.26,cdf:24300},{id:821,vendor:"Twitterworks",tld:"org",category:"industrial",popularity:.26,cdf:24560},{id:914,vendor:"Yakitri",tld:"info",category:"games",popularity:.26,cdf:24820},{id:86,vendor:"Fadeo",tld:"gov",category:"movies",popularity:.27,cdf:25090},{id:213,vendor:"Aivee",tld:"mil",category:"computers",popularity:.27,cdf:25360},{id:474,vendor:"Kayveo",tld:"mil",category:"garden",popularity:.27,cdf:25630},{id:495,vendor:"Meembee",tld:"gov",category:"music",popularity:.27,cdf:25900},{id:517,vendor:"Skivee",tld:"edu",category:"shoes",popularity:.27,cdf:26170},{id:521,vendor:"Kazu",tld:"biz",category:"clothing",popularity:.27,cdf:26440},{id:525,vendor:"Bubblemix",tld:"edu",category:"health",popularity:.27,cdf:26710},{id:558,vendor:"Meembee",tld:"name",category:"home",popularity:.27,cdf:26980},{id:736,vendor:"Oodoo",tld:"biz",category:"kids",popularity:.27,cdf:27250},{id:768,vendor:"Dabtype",tld:"org",category:"grocery",popularity:.27,cdf:27520},{id:849,vendor:"Abata",tld:"net",category:"industrial",popularity:.27,cdf:27790},{id:997,vendor:"Linklinks",tld:"name",category:"shoes",popularity:.27,cdf:28060},{id:1e3,vendor:"Feednation",tld:"net",category:"industrial",popularity:.27,cdf:28330},{id:201,vendor:"Rhyloo",tld:"name",category:"movies",popularity:.28,cdf:28610},{id:272,vendor:"Centizu",tld:"net",category:"electronics",popularity:.28,cdf:28890},{id:292,vendor:"Meembee",tld:"org",category:"beauty",popularity:.28,cdf:29170},{id:402,vendor:"Camimbo",tld:"mil",category:"sports",popularity:.28,cdf:29450},{id:443,vendor:"Gigazoom",tld:"edu",category:"electronics",popularity:.28,cdf:29730},{id:993,vendor:"Rooxo",tld:"mil",category:"toys",popularity:.28,cdf:30010},{id:54,vendor:"Bubblemix",tld:"name",category:"clothing",popularity:.29,cdf:30300},{id:144,vendor:"Talane",tld:"com",category:"grocery",popularity:.29,cdf:30590},{id:321,vendor:"Avamm",tld:"info",category:"kids",popularity:.29,cdf:30880},{id:424,vendor:"Twitterbridge",tld:"net",category:"tools",popularity:.29,cdf:31170},{id:445,vendor:"Edgepulse",tld:"com",category:"health",popularity:.29,cdf:31460},{id:553,vendor:"Voonyx",tld:"com",category:"computers",popularity:.29,cdf:31750},{id:602,vendor:"Dabjam",tld:"edu",category:"tools",popularity:.29,cdf:32040},{id:671,vendor:"Lazzy",tld:"org",category:"movies",popularity:.29,cdf:32330},{id:792,vendor:"Oba",tld:"name",category:"clothing",popularity:.29,cdf:32620},{id:924,vendor:"Vinte",tld:"gov",category:"movies",popularity:.29,cdf:32910},{id:989,vendor:"Livetube",tld:"gov",category:"jewelry",popularity:.29,cdf:33200},{id:42,vendor:"Wikizz",tld:"info",category:"toys",popularity:.3,cdf:33500},{id:56,vendor:"Devify",tld:"biz",category:"jewelry",popularity:.3,cdf:33800},{id:69,vendor:"Rhynyx",tld:"info",category:"games",popularity:.3,cdf:34100},{id:126,vendor:"Voomm",tld:"com",category:"movies",popularity:.3,cdf:34400},{id:353,vendor:"Dazzlesphere",tld:"org",category:"games",popularity:.3,cdf:34700},{id:549,vendor:"Yamia",tld:"edu",category:"shoes",popularity:.3,cdf:35e3},{id:586,vendor:"Buzzbean",tld:"gov",category:"tools",popularity:.3,cdf:35300},{id:614,vendor:"Skiptube",tld:"info",category:"outdoors",popularity:.3,cdf:35600},{id:779,vendor:"Abatz",tld:"name",category:"industrial",popularity:.3,cdf:35900},{id:869,vendor:"Fadeo",tld:"net",category:"tools",popularity:.3,cdf:36200},{id:919,vendor:"Mybuzz",tld:"info",category:"clothing",popularity:.3,cdf:36500},{id:966,vendor:"Eare",tld:"name",category:"sports",popularity:.3,cdf:36800},{id:979,vendor:"Thoughtstorm",tld:"net",category:"toys",popularity:.3,cdf:37100},{id:67,vendor:"Gabvine",tld:"net",category:"garden",popularity:.31,cdf:37410},{id:81,vendor:"BlogXS",tld:"gov",category:"movies",popularity:.31,cdf:37720},{id:180,vendor:"Skibox",tld:"com",category:"kids",popularity:.31,cdf:38030},{id:304,vendor:"Eabox",tld:"com",category:"toys",popularity:.31,cdf:38340},{id:473,vendor:"LiveZ",tld:"com",category:"industrial",popularity:.31,cdf:38650},{id:584,vendor:"Thoughtmix",tld:"name",category:"home",popularity:.31,cdf:38960},{id:585,vendor:"Feedfire",tld:"mil",category:"automotive",popularity:.31,cdf:39270},{id:644,vendor:"Nlounge",tld:"edu",category:"movies",popularity:.31,cdf:39580},{id:664,vendor:"Cogilith",tld:"gov",category:"garden",popularity:.31,cdf:39890},{id:729,vendor:"Fivechat",tld:"info",category:"garden",popularity:.31,cdf:40200},{id:758,vendor:"Devbug",tld:"mil",category:"electronics",popularity:.31,cdf:40510},{id:842,vendor:"Voomm",tld:"net",category:"baby",popularity:.31,cdf:40820},{id:83,vendor:"Edgewire",tld:"name",category:"beauty",popularity:.32,cdf:41140},{id:285,vendor:"Eimbee",tld:"org",category:"jewelry",popularity:.32,cdf:41460},{id:361,vendor:"Yabox",tld:"info",category:"outdoors",popularity:.32,cdf:41780},{id:379,vendor:"Photobug",tld:"gov",category:"outdoors",popularity:.32,cdf:42100},{id:423,vendor:"DabZ",tld:"mil",category:"beauty",popularity:.32,cdf:42420},{id:507,vendor:"Yamia",tld:"info",category:"tools",popularity:.32,cdf:42740},{id:515,vendor:"Devify",tld:"org",category:"automotive",popularity:.32,cdf:43060},{id:581,vendor:"Yabox",tld:"name",category:"movies",popularity:.32,cdf:43380},{id:599,vendor:"Skibox",tld:"biz",category:"sports",popularity:.32,cdf:43700},{id:818,vendor:"Quimm",tld:"mil",category:"garden",popularity:.32,cdf:44020},{id:920,vendor:"Aimbu",tld:"info",category:"baby",popularity:.32,cdf:44340},{id:974,vendor:"Quatz",tld:"edu",category:"electronics",popularity:.32,cdf:44660},{id:995,vendor:"Pixonyx",tld:"edu",category:"industrial",popularity:.32,cdf:44980},{id:46,vendor:"Wikido",tld:"mil",category:"books",popularity:.33,cdf:45310},{id:78,vendor:"Trilith",tld:"com",category:"shoes",popularity:.33,cdf:45640},{id:138,vendor:"Linklinks",tld:"mil",category:"health",popularity:.33,cdf:45970},{id:188,vendor:"Meejo",tld:"com",category:"outdoors",popularity:.33,cdf:46300},{id:203,vendor:"Yakitri",tld:"info",category:"electronics",popularity:.33,cdf:46630},{id:267,vendor:"Youspan",tld:"info",category:"movies",popularity:.33,cdf:46960},{id:428,vendor:"Realpoint",tld:"net",category:"toys",popularity:.33,cdf:47290},{id:451,vendor:"Bubblebox",tld:"net",category:"automotive",popularity:.33,cdf:47620},{id:567,vendor:"Kamba",tld:"info",category:"garden",popularity:.33,cdf:47950},{id:625,vendor:"Tagchat",tld:"info",category:"computers",popularity:.33,cdf:48280},{id:632,vendor:"Twimbo",tld:"org",category:"books",popularity:.33,cdf:48610},{id:641,vendor:"Cogidoo",tld:"info",category:"clothing",popularity:.33,cdf:48940},{id:647,vendor:"Trunyx",tld:"mil",category:"kids",popularity:.33,cdf:49270},{id:771,vendor:"LiveZ",tld:"gov",category:"kids",popularity:.33,cdf:49600},{id:784,vendor:"Jazzy",tld:"info",category:"baby",popularity:.33,cdf:49930},{id:851,vendor:"Youopia",tld:"gov",category:"computers",popularity:.33,cdf:50260},{id:890,vendor:"Tagchat",tld:"org",category:"grocery",popularity:.33,cdf:50590},{id:48,vendor:"Jabberstorm",tld:"name",category:"toys",popularity:.34,cdf:50930},{id:130,vendor:"Zazio",tld:"edu",category:"clothing",popularity:.34,cdf:51270},{id:159,vendor:"Vimbo",tld:"edu",category:"electronics",popularity:.34,cdf:51610},{id:173,vendor:"Livetube",tld:"mil",category:"games",popularity:.34,cdf:51950},{id:291,vendor:"Youspan",tld:"mil",category:"electronics",popularity:.34,cdf:52290},{id:295,vendor:"Npath",tld:"org",category:"garden",popularity:.34,cdf:52630},{id:303,vendor:"Youfeed",tld:"mil",category:"health",popularity:.34,cdf:52970},{id:314,vendor:"Ntag",tld:"mil",category:"sports",popularity:.34,cdf:53310},{id:334,vendor:"Gevee",tld:"net",category:"automotive",popularity:.34,cdf:53650},{id:479,vendor:"Kazio",tld:"info",category:"electronics",popularity:.34,cdf:53990},{id:526,vendor:"Voomm",tld:"net",category:"clothing",popularity:.34,cdf:54330},{id:534,vendor:"Flashpoint",tld:"com",category:"outdoors",popularity:.34,cdf:54670},{id:670,vendor:"Yoveo",tld:"com",category:"shoes",popularity:.34,cdf:55010},{id:688,vendor:"Flipbug",tld:"org",category:"health",popularity:.34,cdf:55350},{id:732,vendor:"Yombu",tld:"mil",category:"jewelry",popularity:.34,cdf:55690},{id:819,vendor:"Brainverse",tld:"biz",category:"grocery",popularity:.34,cdf:56030},{id:855,vendor:"Wikibox",tld:"mil",category:"jewelry",popularity:.34,cdf:56370},{id:895,vendor:"Jaxnation",tld:"name",category:"sports",popularity:.34,cdf:56710},{id:340,vendor:"Skiba",tld:"net",category:"jewelry",popularity:.35,cdf:57060},{id:391,vendor:"Skipfire",tld:"name",category:"kids",popularity:.35,cdf:57410},{id:419,vendor:"Quatz",tld:"edu",category:"toys",popularity:.35,cdf:57760},{id:490,vendor:"Eimbee",tld:"gov",category:"books",popularity:.35,cdf:58110},{id:540,vendor:"Browsezoom",tld:"edu",category:"home",popularity:.35,cdf:58460},{id:656,vendor:"Eamia",tld:"name",category:"books",popularity:.35,cdf:58810},{id:972,vendor:"Realcube",tld:"mil",category:"toys",popularity:.35,cdf:59160},{id:18,vendor:"Vitz",tld:"edu",category:"sports",popularity:.36,cdf:59520},{id:20,vendor:"Kwimbee",tld:"net",category:"beauty",popularity:.36,cdf:59880},{id:252,vendor:"Voolia",tld:"biz",category:"tools",popularity:.36,cdf:60240},{id:318,vendor:"Feedbug",tld:"net",category:"grocery",popularity:.36,cdf:60600},{id:392,vendor:"InnoZ",tld:"org",category:"garden",popularity:.36,cdf:60960},{id:395,vendor:"Gabvine",tld:"edu",category:"home",popularity:.36,cdf:61320},{id:462,vendor:"Twitternation",tld:"mil",category:"health",popularity:.36,cdf:61680},{id:506,vendor:"Browseblab",tld:"net",category:"sports",popularity:.36,cdf:62040},{id:551,vendor:"Oyonder",tld:"edu",category:"home",popularity:.36,cdf:62400},{id:556,vendor:"Jabbertype",tld:"biz",category:"tools",popularity:.36,cdf:62760},{id:669,vendor:"Rooxo",tld:"info",category:"health",popularity:.36,cdf:63120},{id:698,vendor:"Livetube",tld:"net",category:"outdoors",popularity:.36,cdf:63480},{id:861,vendor:"Livetube",tld:"biz",category:"kids",popularity:.36,cdf:63840},{id:872,vendor:"Babbleopia",tld:"gov",category:"sports",popularity:.36,cdf:64200},{id:929,vendor:"Buzzbean",tld:"mil",category:"beauty",popularity:.36,cdf:64560},{id:946,vendor:"Meembee",tld:"com",category:"games",popularity:.36,cdf:64920},{id:1,vendor:"Youspan",tld:"info",category:"sports",popularity:.37,cdf:65290},{id:124,vendor:"Avaveo",tld:"biz",category:"garden",popularity:.37,cdf:65660},{id:420,vendor:"Meezzy",tld:"biz",category:"kids",popularity:.37,cdf:66030},{id:516,vendor:"Wikizz",tld:"org",category:"books",popularity:.37,cdf:66400},{id:536,vendor:"Edgeclub",tld:"name",category:"garden",popularity:.37,cdf:66770},{id:542,vendor:"Camimbo",tld:"mil",category:"music",popularity:.37,cdf:67140},{id:562,vendor:"Yombu",tld:"biz",category:"automotive",popularity:.37,cdf:67510},{id:591,vendor:"Skilith",tld:"edu",category:"shoes",popularity:.37,cdf:67880},{id:616,vendor:"Buzzbean",tld:"name",category:"garden",popularity:.37,cdf:68250},{id:639,vendor:"Kayveo",tld:"org",category:"kids",popularity:.37,cdf:68620},{id:678,vendor:"Skajo",tld:"org",category:"kids",popularity:.37,cdf:68990},{id:846,vendor:"Topicblab",tld:"org",category:"grocery",popularity:.37,cdf:69360},{id:905,vendor:"Edgeclub",tld:"name",category:"home",popularity:.37,cdf:69730},{id:8,vendor:"Oyonder",tld:"org",category:"games",popularity:.38,cdf:70110},{id:145,vendor:"Jabberbean",tld:"info",category:"industrial",popularity:.38,cdf:70490},{id:149,vendor:"Dazzlesphere",tld:"mil",category:"toys",popularity:.38,cdf:70870},{id:480,vendor:"Photobean",tld:"info",category:"games",popularity:.38,cdf:71250},{id:674,vendor:"Katz",tld:"net",category:"baby",popularity:.38,cdf:71630},{id:682,vendor:"Brainverse",tld:"mil",category:"games",popularity:.38,cdf:72010},{id:723,vendor:"Trudoo",tld:"mil",category:"clothing",popularity:.38,cdf:72390},{id:883,vendor:"Voolith",tld:"name",category:"industrial",popularity:.38,cdf:72770},{id:5,vendor:"Zava",tld:"net",category:"kids",popularity:.39,cdf:73160},{id:62,vendor:"Gabspot",tld:"mil",category:"shoes",popularity:.39,cdf:73550},{id:80,vendor:"Abata",tld:"net",category:"games",popularity:.39,cdf:73940},{id:113,vendor:"Brightdog",tld:"name",category:"automotive",popularity:.39,cdf:74330},{id:218,vendor:"Edgeify",tld:"org",category:"home",popularity:.39,cdf:74720},{id:281,vendor:"Viva",tld:"name",category:"movies",popularity:.39,cdf:75110},{id:579,vendor:"Leexo",tld:"net",category:"industrial",popularity:.39,cdf:75500},{id:587,vendor:"Youfeed",tld:"info",category:"music",popularity:.39,cdf:75890},{id:592,vendor:"Eadel",tld:"edu",category:"tools",popularity:.39,cdf:76280},{id:601,vendor:"Eare",tld:"info",category:"outdoors",popularity:.39,cdf:76670},{id:648,vendor:"Skyble",tld:"gov",category:"garden",popularity:.39,cdf:77060},{id:650,vendor:"Meedoo",tld:"info",category:"jewelry",popularity:.39,cdf:77450},{id:706,vendor:"Edgewire",tld:"edu",category:"shoes",popularity:.39,cdf:77840},{id:730,vendor:"Pixope",tld:"biz",category:"home",popularity:.39,cdf:78230},{id:759,vendor:"Voolia",tld:"name",category:"grocery",popularity:.39,cdf:78620},{id:772,vendor:"Pixope",tld:"net",category:"home",popularity:.39,cdf:79010},{id:801,vendor:"Tagtune",tld:"com",category:"clothing",popularity:.39,cdf:79400},{id:830,vendor:"Layo",tld:"net",category:"games",popularity:.39,cdf:79790},{id:863,vendor:"Skiptube",tld:"gov",category:"jewelry",popularity:.39,cdf:80180},{id:889,vendor:"Feedmix",tld:"edu",category:"toys",popularity:.39,cdf:80570},{id:108,vendor:"Livetube",tld:"net",category:"automotive",popularity:.4,cdf:80970},{id:118,vendor:"Photobug",tld:"mil",category:"outdoors",popularity:.4,cdf:81370},{id:133,vendor:"Yodel",tld:"info",category:"electronics",popularity:.4,cdf:81770},{id:289,vendor:"Meeveo",tld:"name",category:"health",popularity:.4,cdf:82170},{id:438,vendor:"Avaveo",tld:"org",category:"electronics",popularity:.4,cdf:82570},{id:469,vendor:"Thoughtmix",tld:"biz",category:"kids",popularity:.4,cdf:82970},{id:476,vendor:"Meejo",tld:"org",category:"outdoors",popularity:.4,cdf:83370},{id:781,vendor:"Zoozzy",tld:"org",category:"garden",popularity:.4,cdf:83770},{id:963,vendor:"Youtags",tld:"info",category:"industrial",popularity:.4,cdf:84170},{id:17,vendor:"Einti",tld:"name",category:"shoes",popularity:.41,cdf:84580},{id:36,vendor:"Gevee",tld:"mil",category:"computers",popularity:.41,cdf:84990},{id:76,vendor:"Tagchat",tld:"biz",category:"toys",popularity:.41,cdf:85400},{id:150,vendor:"Trudoo",tld:"net",category:"music",popularity:.41,cdf:85810},{id:234,vendor:"Skyvu",tld:"org",category:"garden",popularity:.41,cdf:86220},{id:302,vendor:"Realcube",tld:"biz",category:"outdoors",popularity:.41,cdf:86630},{id:307,vendor:"Feedmix",tld:"biz",category:"health",popularity:.41,cdf:87040},{id:342,vendor:"Avamba",tld:"name",category:"sports",popularity:.41,cdf:87450},{id:357,vendor:"Kare",tld:"net",category:"music",popularity:.41,cdf:87860},{id:369,vendor:"Skiptube",tld:"net",category:"jewelry",popularity:.41,cdf:88270},{id:375,vendor:"Dazzlesphere",tld:"edu",category:"toys",popularity:.41,cdf:88680},{id:488,vendor:"Omba",tld:"com",category:"games",popularity:.41,cdf:89090},{id:677,vendor:"Wordtune",tld:"name",category:"kids",popularity:.41,cdf:89500},{id:712,vendor:"Latz",tld:"net",category:"health",popularity:.41,cdf:89910},{id:728,vendor:"Riffpedia",tld:"com",category:"electronics",popularity:.41,cdf:90320},{id:187,vendor:"Eazzy",tld:"net",category:"beauty",popularity:.42,cdf:90740},{id:255,vendor:"Youopia",tld:"gov",category:"kids",popularity:.42,cdf:91160},{id:299,vendor:"Gabspot",tld:"gov",category:"industrial",popularity:.42,cdf:91580},{id:363,vendor:"Tagopia",tld:"net",category:"tools",popularity:.42,cdf:92e3},{id:383,vendor:"Zooveo",tld:"org",category:"beauty",popularity:.42,cdf:92420},{id:447,vendor:"Ntags",tld:"org",category:"kids",popularity:.42,cdf:92840},{id:472,vendor:"Ooba",tld:"info",category:"industrial",popularity:.42,cdf:93260},{id:709,vendor:"Jayo",tld:"com",category:"jewelry",popularity:.42,cdf:93680},{id:711,vendor:"Livefish",tld:"com",category:"baby",popularity:.42,cdf:94100},{id:778,vendor:"Kayveo",tld:"biz",category:"shoes",popularity:.42,cdf:94520},{id:782,vendor:"Topiclounge",tld:"name",category:"toys",popularity:.42,cdf:94940},{id:885,vendor:"Twitternation",tld:"biz",category:"clothing",popularity:.42,cdf:95360},{id:910,vendor:"Edgepulse",tld:"edu",category:"movies",popularity:.42,cdf:95780},{id:986,vendor:"Yodo",tld:"mil",category:"clothing",popularity:.42,cdf:96200},{id:33,vendor:"Chatterbridge",tld:"com",category:"jewelry",popularity:.43,cdf:96630},{id:60,vendor:"Dynabox",tld:"biz",category:"automotive",popularity:.43,cdf:97060},{id:171,vendor:"Jabbersphere",tld:"com",category:"shoes",popularity:.43,cdf:97490},{id:212,vendor:"Jayo",tld:"edu",category:"computers",popularity:.43,cdf:97920},{id:231,vendor:"Oyonder",tld:"info",category:"garden",popularity:.43,cdf:98350},{id:311,vendor:"Dynazzy",tld:"name",category:"shoes",popularity:.43,cdf:98780},{id:315,vendor:"Quinu",tld:"net",category:"home",popularity:.43,cdf:99210},{id:470,vendor:"Topiclounge",tld:"biz",category:"garden",popularity:.43,cdf:99640},{id:509,vendor:"Chatterpoint",tld:"edu",category:"baby",popularity:.43,cdf:100070},{id:595,vendor:"Digitube",tld:"info",category:"automotive",popularity:.43,cdf:100500},{id:600,vendor:"Tagtune",tld:"org",category:"beauty",popularity:.43,cdf:100930},{id:668,vendor:"Feednation",tld:"info",category:"sports",popularity:.43,cdf:101360},{id:721,vendor:"Devpulse",tld:"mil",category:"sports",popularity:.43,cdf:101790},{id:775,vendor:"Jetwire",tld:"gov",category:"health",popularity:.43,cdf:102220},{id:880,vendor:"Youopia",tld:"edu",category:"health",popularity:.43,cdf:102650},{id:903,vendor:"Topicware",tld:"gov",category:"jewelry",popularity:.43,cdf:103080},{id:907,vendor:"Eidel",tld:"org",category:"home",popularity:.43,cdf:103510},{id:915,vendor:"Mymm",tld:"edu",category:"music",popularity:.43,cdf:103940},{id:988,vendor:"Linkbridge",tld:"edu",category:"clothing",popularity:.43,cdf:104370},{id:34,vendor:"Edgepulse",tld:"edu",category:"jewelry",popularity:.44,cdf:104810},{id:163,vendor:"Pixonyx",tld:"org",category:"garden",popularity:.44,cdf:105250},{id:245,vendor:"Jabbersphere",tld:"info",category:"outdoors",popularity:.44,cdf:105690},{id:297,vendor:"Kimia",tld:"biz",category:"games",popularity:.44,cdf:106130},{id:366,vendor:"Kazio",tld:"edu",category:"books",popularity:.44,cdf:106570},{id:405,vendor:"Eayo",tld:"info",category:"tools",popularity:.44,cdf:107010},{id:523,vendor:"Avavee",tld:"info",category:"computers",popularity:.44,cdf:107450},{id:546,vendor:"Yadel",tld:"gov",category:"shoes",popularity:.44,cdf:107890},{id:570,vendor:"Youopia",tld:"biz",category:"beauty",popularity:.44,cdf:108330},{id:900,vendor:"Topiclounge",tld:"gov",category:"outdoors",popularity:.44,cdf:108770},{id:949,vendor:"Tagpad",tld:"gov",category:"health",popularity:.44,cdf:109210},{id:956,vendor:"Youbridge",tld:"net",category:"clothing",popularity:.44,cdf:109650},{id:39,vendor:"Roombo",tld:"info",category:"tools",popularity:.45,cdf:110100},{id:142,vendor:"Realmix",tld:"org",category:"kids",popularity:.45,cdf:110550},{id:293,vendor:"Zooveo",tld:"info",category:"games",popularity:.45,cdf:111e3},{id:323,vendor:"Thoughtstorm",tld:"net",category:"movies",popularity:.45,cdf:111450},{id:351,vendor:"Brainlounge",tld:"org",category:"books",popularity:.45,cdf:111900},{id:378,vendor:"Jaxnation",tld:"org",category:"computers",popularity:.45,cdf:112350},{id:530,vendor:"Ooba",tld:"name",category:"games",popularity:.45,cdf:112800},{id:571,vendor:"Tagchat",tld:"mil",category:"jewelry",popularity:.45,cdf:113250},{id:589,vendor:"Zoovu",tld:"mil",category:"automotive",popularity:.45,cdf:113700},{id:630,vendor:"Thoughtblab",tld:"name",category:"books",popularity:.45,cdf:114150},{id:637,vendor:"Yodel",tld:"edu",category:"books",popularity:.45,cdf:114600},{id:722,vendor:"Fivechat",tld:"info",category:"kids",popularity:.45,cdf:115050},{id:734,vendor:"Shuffledrive",tld:"info",category:"beauty",popularity:.45,cdf:115500},{id:796,vendor:"Voomm",tld:"com",category:"shoes",popularity:.45,cdf:115950},{id:809,vendor:"Lajo",tld:"com",category:"books",popularity:.45,cdf:116400},{id:828,vendor:"Dabvine",tld:"com",category:"beauty",popularity:.45,cdf:116850},{id:37,vendor:"Kwinu",tld:"mil",category:"sports",popularity:.46,cdf:117310},{id:136,vendor:"Riffpath",tld:"mil",category:"jewelry",popularity:.46,cdf:117770},{id:195,vendor:"Gabvine",tld:"info",category:"tools",popularity:.46,cdf:118230},{id:312,vendor:"Zoomzone",tld:"biz",category:"sports",popularity:.46,cdf:118690},{id:347,vendor:"Avamm",tld:"name",category:"baby",popularity:.46,cdf:119150},{id:376,vendor:"Rhynyx",tld:"gov",category:"beauty",popularity:.46,cdf:119610},{id:406,vendor:"Zoomzone",tld:"info",category:"toys",popularity:.46,cdf:120070},{id:429,vendor:"Jamia",tld:"net",category:"music",popularity:.46,cdf:120530},{id:482,vendor:"Divanoodle",tld:"org",category:"toys",popularity:.46,cdf:120990},{id:576,vendor:"Tagfeed",tld:"name",category:"outdoors",popularity:.46,cdf:121450},{id:713,vendor:"Mybuzz",tld:"gov",category:"home",popularity:.46,cdf:121910},{id:724,vendor:"Kayveo",tld:"biz",category:"books",popularity:.46,cdf:122370},{id:813,vendor:"Ainyx",tld:"com",category:"shoes",popularity:.46,cdf:122830},{id:934,vendor:"Quimm",tld:"net",category:"shoes",popularity:.46,cdf:123290},{id:996,vendor:"Yakidoo",tld:"gov",category:"shoes",popularity:.46,cdf:123750},{id:12,vendor:"Twinte",tld:"biz",category:"clothing",popularity:.47,cdf:124220},{id:38,vendor:"Quire",tld:"mil",category:"industrial",popularity:.47,cdf:124690},{id:64,vendor:"Fatz",tld:"info",category:"music",popularity:.47,cdf:125160},{id:120,vendor:"Dabshots",tld:"mil",category:"shoes",popularity:.47,cdf:125630},{id:239,vendor:"Photobug",tld:"edu",category:"sports",popularity:.47,cdf:126100},{id:276,vendor:"Quatz",tld:"com",category:"sports",popularity:.47,cdf:126570},{id:528,vendor:"Roombo",tld:"org",category:"clothing",popularity:.47,cdf:127040},{id:574,vendor:"Browseblab",tld:"org",category:"tools",popularity:.47,cdf:127510},{id:626,vendor:"Fadeo",tld:"com",category:"movies",popularity:.47,cdf:127980},{id:681,vendor:"Topicshots",tld:"gov",category:"shoes",popularity:.47,cdf:128450},{id:707,vendor:"Riffpedia",tld:"edu",category:"electronics",popularity:.47,cdf:128920},{id:774,vendor:"Voonyx",tld:"gov",category:"beauty",popularity:.47,cdf:129390},{id:810,vendor:"Abata",tld:"gov",category:"clothing",popularity:.47,cdf:129860},{id:909,vendor:"Twitterworks",tld:"net",category:"automotive",popularity:.47,cdf:130330},{id:948,vendor:"Babbleblab",tld:"org",category:"health",popularity:.47,cdf:130800},{id:955,vendor:"Fatz",tld:"edu",category:"garden",popularity:.47,cdf:131270},{id:968,vendor:"Youspan",tld:"biz",category:"electronics",popularity:.47,cdf:131740},{id:105,vendor:"Bluejam",tld:"edu",category:"health",popularity:.48,cdf:132220},{id:109,vendor:"Eidel",tld:"gov",category:"baby",popularity:.48,cdf:132700},{id:112,vendor:"Omba",tld:"biz",category:"jewelry",popularity:.48,cdf:133180},{id:256,vendor:"Buzzdog",tld:"mil",category:"toys",popularity:.48,cdf:133660},{id:260,vendor:"Livetube",tld:"biz",category:"games",popularity:.48,cdf:134140},{id:261,vendor:"Eare",tld:"com",category:"industrial",popularity:.48,cdf:134620},{id:327,vendor:"Skippad",tld:"org",category:"games",popularity:.48,cdf:135100},{id:467,vendor:"Livetube",tld:"biz",category:"games",popularity:.48,cdf:135580},{id:754,vendor:"Zoonder",tld:"mil",category:"sports",popularity:.48,cdf:136060},{id:760,vendor:"LiveZ",tld:"gov",category:"electronics",popularity:.48,cdf:136540},{id:800,vendor:"Feedmix",tld:"com",category:"toys",popularity:.48,cdf:137020},{id:852,vendor:"Eare",tld:"org",category:"sports",popularity:.48,cdf:137500},{id:853,vendor:"Skippad",tld:"biz",category:"kids",popularity:.48,cdf:137980},{id:884,vendor:"Edgeblab",tld:"net",category:"toys",popularity:.48,cdf:138460},{id:908,vendor:"Flipbug",tld:"mil",category:"health",popularity:.48,cdf:138940},{id:933,vendor:"Youspan",tld:"net",category:"shoes",popularity:.48,cdf:139420},{id:953,vendor:"Skalith",tld:"gov",category:"computers",popularity:.48,cdf:139900},{id:999,vendor:"Jaxspan",tld:"mil",category:"baby",popularity:.48,cdf:140380},{id:70,vendor:"Meezzy",tld:"biz",category:"shoes",popularity:.49,cdf:140870},{id:115,vendor:"Shufflester",tld:"mil",category:"music",popularity:.49,cdf:141360},{id:364,vendor:"Brainlounge",tld:"gov",category:"outdoors",popularity:.49,cdf:141850},{id:401,vendor:"Jabberbean",tld:"biz",category:"kids",popularity:.49,cdf:142340},{id:408,vendor:"Blogtags",tld:"biz",category:"home",popularity:.49,cdf:142830},{id:596,vendor:"Avavee",tld:"com",category:"sports",popularity:.49,cdf:143320},{id:743,vendor:"Omba",tld:"mil",category:"electronics",popularity:.49,cdf:143810},{id:744,vendor:"Trilith",tld:"com",category:"music",popularity:.49,cdf:144300},{id:831,vendor:"Zoomlounge",tld:"org",category:"games",popularity:.49,cdf:144790},{id:844,vendor:"Realfire",tld:"edu",category:"home",popularity:.49,cdf:145280},{id:845,vendor:"Dabshots",tld:"edu",category:"tools",popularity:.49,cdf:145770},{id:893,vendor:"Vipe",tld:"edu",category:"outdoors",popularity:.49,cdf:146260},{id:942,vendor:"Avamba",tld:"edu",category:"jewelry",popularity:.49,cdf:146750},{id:107,vendor:"Ainyx",tld:"name",category:"toys",popularity:.5,cdf:147250},{id:156,vendor:"Flipstorm",tld:"info",category:"tools",popularity:.5,cdf:147750},{id:274,vendor:"Chatterpoint",tld:"org",category:"toys",popularity:.5,cdf:148250},{id:298,vendor:"Ooba",tld:"com",category:"kids",popularity:.5,cdf:148750},{id:386,vendor:"Zoozzy",tld:"mil",category:"baby",popularity:.5,cdf:149250},{id:501,vendor:"Divape",tld:"biz",category:"garden",popularity:.5,cdf:149750},{id:652,vendor:"Fiveclub",tld:"org",category:"outdoors",popularity:.5,cdf:150250},{id:662,vendor:"Wikizz",tld:"info",category:"clothing",popularity:.5,cdf:150750},{id:703,vendor:"Livefish",tld:"name",category:"garden",popularity:.5,cdf:151250},{id:750,vendor:"Pixoboo",tld:"net",category:"computers",popularity:.5,cdf:151750},{id:803,vendor:"Babbleblab",tld:"net",category:"toys",popularity:.5,cdf:152250},{id:817,vendor:"Agimba",tld:"biz",category:"computers",popularity:.5,cdf:152750},{id:834,vendor:"Izio",tld:"org",category:"movies",popularity:.5,cdf:153250},{id:874,vendor:"Kwideo",tld:"name",category:"music",popularity:.5,cdf:153750},{id:886,vendor:"Babbleblab",tld:"info",category:"computers",popularity:.5,cdf:154250},{id:897,vendor:"Wikizz",tld:"info",category:"jewelry",popularity:.5,cdf:154750},{id:43,vendor:"Ainyx",tld:"biz",category:"kids",popularity:.51,cdf:155260},{id:221,vendor:"Vinder",tld:"org",category:"electronics",popularity:.51,cdf:155770},{id:358,vendor:"Photolist",tld:"info",category:"shoes",popularity:.51,cdf:156280},{id:510,vendor:"Tazzy",tld:"org",category:"automotive",popularity:.51,cdf:156790},{id:658,vendor:"Lazz",tld:"edu",category:"baby",popularity:.51,cdf:157300},{id:715,vendor:"Photojam",tld:"com",category:"automotive",popularity:.51,cdf:157810},{id:823,vendor:"Thoughtblab",tld:"org",category:"computers",popularity:.51,cdf:158320},{id:829,vendor:"Devpulse",tld:"net",category:"movies",popularity:.51,cdf:158830},{id:867,vendor:"Livepath",tld:"net",category:"clothing",popularity:.51,cdf:159340},{id:951,vendor:"Voomm",tld:"edu",category:"shoes",popularity:.51,cdf:159850},{id:164,vendor:"Twimm",tld:"org",category:"beauty",popularity:.52,cdf:160370},{id:207,vendor:"Photojam",tld:"com",category:"electronics",popularity:.52,cdf:160890},{id:273,vendor:"Fivespan",tld:"info",category:"automotive",popularity:.52,cdf:161410},{id:349,vendor:"Photobug",tld:"edu",category:"baby",popularity:.52,cdf:161930},{id:359,vendor:"Photobug",tld:"net",category:"toys",popularity:.52,cdf:162450},{id:431,vendor:"LiveZ",tld:"edu",category:"baby",popularity:.52,cdf:162970},{id:464,vendor:"Thoughtstorm",tld:"info",category:"games",popularity:.52,cdf:163490},{id:511,vendor:"Yotz",tld:"info",category:"tools",popularity:.52,cdf:164010},{id:524,vendor:"Leenti",tld:"mil",category:"toys",popularity:.52,cdf:164530},{id:555,vendor:"Myworks",tld:"info",category:"music",popularity:.52,cdf:165050},{id:563,vendor:"Devshare",tld:"biz",category:"toys",popularity:.52,cdf:165570},{id:735,vendor:"Skaboo",tld:"mil",category:"computers",popularity:.52,cdf:166090},{id:825,vendor:"Quire",tld:"org",category:"electronics",popularity:.52,cdf:166610},{id:4,vendor:"Kimia",tld:"gov",category:"movies",popularity:.53,cdf:167140},{id:122,vendor:"Oyope",tld:"biz",category:"electronics",popularity:.53,cdf:167670},{id:123,vendor:"Kimia",tld:"org",category:"tools",popularity:.53,cdf:168200},{id:131,vendor:"Topdrive",tld:"gov",category:"industrial",popularity:.53,cdf:168730},{id:277,vendor:"Eimbee",tld:"gov",category:"automotive",popularity:.53,cdf:169260},{id:279,vendor:"Meevee",tld:"mil",category:"computers",popularity:.53,cdf:169790},{id:288,vendor:"Flashset",tld:"edu",category:"games",popularity:.53,cdf:170320},{id:317,vendor:"Jatri",tld:"info",category:"clothing",popularity:.53,cdf:170850},{id:337,vendor:"Livepath",tld:"com",category:"games",popularity:.53,cdf:171380},{id:344,vendor:"Zoombox",tld:"gov",category:"jewelry",popularity:.53,cdf:171910},{id:390,vendor:"Bluezoom",tld:"gov",category:"books",popularity:.53,cdf:172440},{id:425,vendor:"Brainsphere",tld:"name",category:"books",popularity:.53,cdf:172970},{id:535,vendor:"Riffpath",tld:"biz",category:"health",popularity:.53,cdf:173500},{id:572,vendor:"Quire",tld:"info",category:"health",popularity:.53,cdf:174030},{id:695,vendor:"Youfeed",tld:"net",category:"games",popularity:.53,cdf:174560},{id:727,vendor:"BlogXS",tld:"edu",category:"garden",popularity:.53,cdf:175090},{id:747,vendor:"Shufflebeat",tld:"net",category:"kids",popularity:.53,cdf:175620},{id:767,vendor:"Fivechat",tld:"edu",category:"kids",popularity:.53,cdf:176150},{id:916,vendor:"Linkbuzz",tld:"edu",category:"clothing",popularity:.53,cdf:176680},{id:958,vendor:"Twimm",tld:"net",category:"jewelry",popularity:.53,cdf:177210},{id:970,vendor:"DabZ",tld:"info",category:"clothing",popularity:.53,cdf:177740},{id:981,vendor:"Jabberstorm",tld:"biz",category:"movies",popularity:.53,cdf:178270},{id:14,vendor:"Oyonder",tld:"com",category:"garden",popularity:.54,cdf:178810},{id:26,vendor:"Jetwire",tld:"edu",category:"toys",popularity:.54,cdf:179350},{id:32,vendor:"Twitterbeat",tld:"mil",category:"jewelry",popularity:.54,cdf:179890},{id:116,vendor:"Fivebridge",tld:"com",category:"industrial",popularity:.54,cdf:180430},{id:246,vendor:"Eabox",tld:"edu",category:"baby",popularity:.54,cdf:180970},{id:316,vendor:"Jabbertype",tld:"info",category:"industrial",popularity:.54,cdf:181510},{id:365,vendor:"Brainverse",tld:"org",category:"kids",popularity:.54,cdf:182050},{id:533,vendor:"Meezzy",tld:"edu",category:"kids",popularity:.54,cdf:182590},{id:824,vendor:"Pixoboo",tld:"gov",category:"electronics",popularity:.54,cdf:183130},{id:837,vendor:"Eayo",tld:"com",category:"clothing",popularity:.54,cdf:183670},{id:887,vendor:"Topdrive",tld:"com",category:"books",popularity:.54,cdf:184210},{id:896,vendor:"Mybuzz",tld:"info",category:"kids",popularity:.54,cdf:184750},{id:983,vendor:"Oyondu",tld:"edu",category:"health",popularity:.54,cdf:185290},{id:3,vendor:"Feedfire",tld:"gov",category:"sports",popularity:.55,cdf:185840},{id:57,vendor:"Pixope",tld:"net",category:"jewelry",popularity:.55,cdf:186390},{id:92,vendor:"Aimbo",tld:"mil",category:"baby",popularity:.55,cdf:186940},{id:117,vendor:"Topicshots",tld:"biz",category:"toys",popularity:.55,cdf:187490},{id:166,vendor:"Pixope",tld:"org",category:"clothing",popularity:.55,cdf:188040},{id:182,vendor:"Tambee",tld:"edu",category:"baby",popularity:.55,cdf:188590},{id:227,vendor:"Rhynyx",tld:"name",category:"electronics",popularity:.55,cdf:189140},{id:228,vendor:"Centizu",tld:"gov",category:"computers",popularity:.55,cdf:189690},{id:249,vendor:"Dabtype",tld:"mil",category:"jewelry",popularity:.55,cdf:190240},{id:250,vendor:"Skyvu",tld:"edu",category:"movies",popularity:.55,cdf:190790},{id:309,vendor:"Vinder",tld:"info",category:"beauty",popularity:.55,cdf:191340},{id:335,vendor:"Oyoyo",tld:"gov",category:"books",popularity:.55,cdf:191890},{id:432,vendor:"Realbuzz",tld:"biz",category:"grocery",popularity:.55,cdf:192440},{id:503,vendor:"Gigazoom",tld:"mil",category:"electronics",popularity:.55,cdf:192990},{id:575,vendor:"Flashset",tld:"name",category:"electronics",popularity:.55,cdf:193540},{id:622,vendor:"Meevee",tld:"net",category:"shoes",popularity:.55,cdf:194090},{id:653,vendor:"Talane",tld:"org",category:"home",popularity:.55,cdf:194640},{id:746,vendor:"Blogspan",tld:"gov",category:"health",popularity:.55,cdf:195190},{id:762,vendor:"Photobean",tld:"gov",category:"baby",popularity:.55,cdf:195740},{id:777,vendor:"Dynabox",tld:"info",category:"grocery",popularity:.55,cdf:196290},{id:95,vendor:"Browsedrive",tld:"org",category:"beauty",popularity:.56,cdf:196850},{id:151,vendor:"Photolist",tld:"edu",category:"health",popularity:.56,cdf:197410},{id:174,vendor:"Izio",tld:"gov",category:"tools",popularity:.56,cdf:197970},{id:241,vendor:"Tagcat",tld:"mil",category:"kids",popularity:.56,cdf:198530},{id:618,vendor:"Topicblab",tld:"com",category:"kids",popularity:.56,cdf:199090},{id:642,vendor:"Zoomdog",tld:"gov",category:"movies",popularity:.56,cdf:199650},{id:654,vendor:"Jaxbean",tld:"com",category:"computers",popularity:.56,cdf:200210},{id:752,vendor:"Youtags",tld:"biz",category:"electronics",popularity:.56,cdf:200770},{id:898,vendor:"Kazio",tld:"info",category:"clothing",popularity:.56,cdf:201330},{id:954,vendor:"Photobug",tld:"name",category:"movies",popularity:.56,cdf:201890},{id:985,vendor:"Edgewire",tld:"edu",category:"industrial",popularity:.56,cdf:202450},{id:29,vendor:"Eare",tld:"gov",category:"tools",popularity:.57,cdf:203020},{id:153,vendor:"Buzzbean",tld:"org",category:"movies",popularity:.57,cdf:203590},{id:235,vendor:"Dabvine",tld:"mil",category:"computers",popularity:.57,cdf:204160},{id:333,vendor:"Bubblebox",tld:"name",category:"beauty",popularity:.57,cdf:204730},{id:367,vendor:"Thoughtbeat",tld:"mil",category:"music",popularity:.57,cdf:205300},{id:368,vendor:"Yakidoo",tld:"org",category:"tools",popularity:.57,cdf:205870},{id:398,vendor:"Tazzy",tld:"edu",category:"shoes",popularity:.57,cdf:206440},{id:458,vendor:"Yakijo",tld:"info",category:"jewelry",popularity:.57,cdf:207010},{id:468,vendor:"Flipstorm",tld:"gov",category:"industrial",popularity:.57,cdf:207580},{id:544,vendor:"Skinder",tld:"org",category:"sports",popularity:.57,cdf:208150},{id:561,vendor:"Browsezoom",tld:"com",category:"kids",popularity:.57,cdf:208720},{id:564,vendor:"Photofeed",tld:"edu",category:"automotive",popularity:.57,cdf:209290},{id:583,vendor:"Cogibox",tld:"com",category:"garden",popularity:.57,cdf:209860},{id:615,vendor:"Riffpedia",tld:"info",category:"tools",popularity:.57,cdf:210430},{id:826,vendor:"Vitz",tld:"com",category:"beauty",popularity:.57,cdf:211e3},{id:843,vendor:"Realblab",tld:"name",category:"garden",popularity:.57,cdf:211570},{id:894,vendor:"Browsezoom",tld:"mil",category:"health",popularity:.57,cdf:212140},{id:930,vendor:"Podcat",tld:"com",category:"outdoors",popularity:.57,cdf:212710},{id:965,vendor:"Feedbug",tld:"info",category:"kids",popularity:.57,cdf:213280},{id:22,vendor:"Wikibox",tld:"edu",category:"toys",popularity:.58,cdf:213860},{id:240,vendor:"Gabtype",tld:"mil",category:"tools",popularity:.58,cdf:214440},{id:280,vendor:"Kwideo",tld:"biz",category:"industrial",popularity:.58,cdf:215020},{id:387,vendor:"Skyble",tld:"edu",category:"shoes",popularity:.58,cdf:215600},{id:389,vendor:"Buzzster",tld:"org",category:"industrial",popularity:.58,cdf:216180},{id:403,vendor:"Twitterwire",tld:"gov",category:"books",popularity:.58,cdf:216760},{id:435,vendor:"Talane",tld:"name",category:"jewelry",popularity:.58,cdf:217340},{id:612,vendor:"Zooveo",tld:"edu",category:"clothing",popularity:.58,cdf:217920},{id:675,vendor:"InnoZ",tld:"com",category:"tools",popularity:.58,cdf:218500},{id:797,vendor:"Browsezoom",tld:"org",category:"automotive",popularity:.58,cdf:219080},{id:980,vendor:"Jayo",tld:"com",category:"clothing",popularity:.58,cdf:219660},{id:10,vendor:"Quatz",tld:"mil",category:"garden",popularity:.59,cdf:220250},{id:40,vendor:"Linkbuzz",tld:"net",category:"kids",popularity:.59,cdf:220840},{id:58,vendor:"Twiyo",tld:"mil",category:"automotive",popularity:.59,cdf:221430},{id:328,vendor:"Lazzy",tld:"name",category:"electronics",popularity:.59,cdf:222020},{id:355,vendor:"Feedspan",tld:"com",category:"home",popularity:.59,cdf:222610},{id:362,vendor:"Lajo",tld:"mil",category:"grocery",popularity:.59,cdf:223200},{id:441,vendor:"Voomm",tld:"org",category:"shoes",popularity:.59,cdf:223790},{id:487,vendor:"Jazzy",tld:"mil",category:"computers",popularity:.59,cdf:224380},{id:496,vendor:"BlogXS",tld:"gov",category:"sports",popularity:.59,cdf:224970},{id:568,vendor:"Yodel",tld:"name",category:"home",popularity:.59,cdf:225560},{id:604,vendor:"Quimba",tld:"biz",category:"games",popularity:.59,cdf:226150},{id:617,vendor:"Skibox",tld:"net",category:"games",popularity:.59,cdf:226740},{id:636,vendor:"Buzzshare",tld:"info",category:"tools",popularity:.59,cdf:227330},{id:859,vendor:"Topiclounge",tld:"name",category:"tools",popularity:.59,cdf:227920},{id:962,vendor:"Skimia",tld:"gov",category:"garden",popularity:.59,cdf:228510},{id:2,vendor:"Linkbridge",tld:"edu",category:"books",popularity:.6,cdf:229110},{id:89,vendor:"Babbleopia",tld:"gov",category:"automotive",popularity:.6,cdf:229710},{id:294,vendor:"Feedbug",tld:"edu",category:"games",popularity:.6,cdf:230310},{id:512,vendor:"Wikivu",tld:"info",category:"sports",popularity:.6,cdf:230910},{id:667,vendor:"Flipopia",tld:"edu",category:"sports",popularity:.6,cdf:231510},{id:739,vendor:"Mydo",tld:"org",category:"tools",popularity:.6,cdf:232110},{id:906,vendor:"Trilith",tld:"name",category:"industrial",popularity:.6,cdf:232710},{id:998,vendor:"Fivechat",tld:"name",category:"grocery",popularity:.6,cdf:233310},{id:121,vendor:"Aimbo",tld:"mil",category:"jewelry",popularity:.61,cdf:233920},{id:184,vendor:"Zoovu",tld:"mil",category:"games",popularity:.61,cdf:234530},{id:185,vendor:"InnoZ",tld:"biz",category:"beauty",popularity:.61,cdf:235140},{id:190,vendor:"Browsedrive",tld:"net",category:"automotive",popularity:.61,cdf:235750},{id:223,vendor:"Thoughtstorm",tld:"mil",category:"beauty",popularity:.61,cdf:236360},{id:264,vendor:"Avavee",tld:"info",category:"automotive",popularity:.61,cdf:236970},{id:421,vendor:"Eidel",tld:"com",category:"movies",popularity:.61,cdf:237580},{id:610,vendor:"Livetube",tld:"info",category:"industrial",popularity:.61,cdf:238190},{id:683,vendor:"Flashdog",tld:"gov",category:"movies",popularity:.61,cdf:238800},{id:699,vendor:"Realcube",tld:"com",category:"movies",popularity:.61,cdf:239410},{id:815,vendor:"Twitterlist",tld:"gov",category:"home",popularity:.61,cdf:240020},{id:875,vendor:"Meezzy",tld:"info",category:"electronics",popularity:.61,cdf:240630},{id:925,vendor:"Tanoodle",tld:"info",category:"movies",popularity:.61,cdf:241240},{id:45,vendor:"Oloo",tld:"biz",category:"home",popularity:.62,cdf:241860},{id:106,vendor:"Twitterwire",tld:"org",category:"garden",popularity:.62,cdf:242480},{id:137,vendor:"Jaloo",tld:"name",category:"baby",popularity:.62,cdf:243100},{id:167,vendor:"Camimbo",tld:"gov",category:"kids",popularity:.62,cdf:243720},{id:177,vendor:"Rhyloo",tld:"biz",category:"games",popularity:.62,cdf:244340},{id:186,vendor:"Tagfeed",tld:"mil",category:"outdoors",popularity:.62,cdf:244960},{id:197,vendor:"Riffpedia",tld:"info",category:"grocery",popularity:.62,cdf:245580},{id:253,vendor:"Camido",tld:"net",category:"health",popularity:.62,cdf:246200},{id:259,vendor:"Dynabox",tld:"info",category:"electronics",popularity:.62,cdf:246820},{id:265,vendor:"Jabbertype",tld:"org",category:"automotive",popularity:.62,cdf:247440},{id:412,vendor:"Shufflebeat",tld:"net",category:"tools",popularity:.62,cdf:248060},{id:494,vendor:"Eayo",tld:"name",category:"toys",popularity:.62,cdf:248680},{id:663,vendor:"Gigaclub",tld:"net",category:"kids",popularity:.62,cdf:249300},{id:741,vendor:"Youopia",tld:"biz",category:"music",popularity:.62,cdf:249920},{id:764,vendor:"Abata",tld:"mil",category:"health",popularity:.62,cdf:250540},{id:808,vendor:"Quimba",tld:"mil",category:"computers",popularity:.62,cdf:251160},{id:840,vendor:"Feedfish",tld:"gov",category:"kids",popularity:.62,cdf:251780},{id:876,vendor:"Yozio",tld:"name",category:"music",popularity:.62,cdf:252400},{id:987,vendor:"Oozz",tld:"info",category:"shoes",popularity:.62,cdf:253020},{id:15,vendor:"Babbleblab",tld:"gov",category:"kids",popularity:.63,cdf:253650},{id:50,vendor:"Dabfeed",tld:"mil",category:"movies",popularity:.63,cdf:254280},{id:68,vendor:"Thoughtstorm",tld:"biz",category:"health",popularity:.63,cdf:254910},{id:132,vendor:"Yoveo",tld:"info",category:"computers",popularity:.63,cdf:255540},{id:148,vendor:"Photobug",tld:"org",category:"toys",popularity:.63,cdf:256170},{id:178,vendor:"Rhynyx",tld:"mil",category:"sports",popularity:.63,cdf:256800},{id:248,vendor:"Eamia",tld:"biz",category:"tools",popularity:.63,cdf:257430},{id:254,vendor:"Wikizz",tld:"info",category:"industrial",popularity:.63,cdf:258060},{id:287,vendor:"Vimbo",tld:"name",category:"garden",popularity:.63,cdf:258690},{id:348,vendor:"Yozio",tld:"org",category:"toys",popularity:.63,cdf:259320},{id:397,vendor:"BlogXS",tld:"info",category:"grocery",popularity:.63,cdf:259950},{id:418,vendor:"Dazzlesphere",tld:"mil",category:"beauty",popularity:.63,cdf:260580},{id:522,vendor:"Agivu",tld:"gov",category:"toys",popularity:.63,cdf:261210},{id:645,vendor:"Twiyo",tld:"net",category:"baby",popularity:.63,cdf:261840},{id:718,vendor:"Quimm",tld:"com",category:"clothing",popularity:.63,cdf:262470},{id:757,vendor:"Tanoodle",tld:"gov",category:"movies",popularity:.63,cdf:263100},{id:766,vendor:"Katz",tld:"name",category:"outdoors",popularity:.63,cdf:263730},{id:783,vendor:"Skipstorm",tld:"org",category:"home",popularity:.63,cdf:264360},{id:928,vendor:"Yakidoo",tld:"net",category:"shoes",popularity:.63,cdf:264990},{id:973,vendor:"Avavee",tld:"org",category:"clothing",popularity:.63,cdf:265620},{id:61,vendor:"Browseblab",tld:"edu",category:"automotive",popularity:.64,cdf:266260},{id:140,vendor:"Mymm",tld:"org",category:"computers",popularity:.64,cdf:266900},{id:169,vendor:"Meeveo",tld:"com",category:"movies",popularity:.64,cdf:267540},{id:214,vendor:"Eadel",tld:"biz",category:"movies",popularity:.64,cdf:268180},{id:284,vendor:"Gabtune",tld:"gov",category:"beauty",popularity:.64,cdf:268820},{id:456,vendor:"Pixonyx",tld:"com",category:"grocery",popularity:.64,cdf:269460},{id:590,vendor:"Yodel",tld:"biz",category:"garden",popularity:.64,cdf:270100},{id:593,vendor:"Topicblab",tld:"net",category:"books",popularity:.64,cdf:270740},{id:597,vendor:"Cogibox",tld:"org",category:"beauty",popularity:.64,cdf:271380},{id:608,vendor:"Eayo",tld:"biz",category:"electronics",popularity:.64,cdf:272020},{id:770,vendor:"Yambee",tld:"mil",category:"movies",popularity:.64,cdf:272660},{id:789,vendor:"Mita",tld:"org",category:"sports",popularity:.64,cdf:273300},{id:857,vendor:"Voolia",tld:"com",category:"garden",popularity:.64,cdf:273940},{id:931,vendor:"Kare",tld:"org",category:"shoes",popularity:.64,cdf:274580},{id:944,vendor:"Edgeify",tld:"gov",category:"books",popularity:.64,cdf:275220},{id:27,vendor:"Topicshots",tld:"info",category:"movies",popularity:.65,cdf:275870},{id:91,vendor:"Dabshots",tld:"name",category:"home",popularity:.65,cdf:276520},{id:135,vendor:"Browsebug",tld:"info",category:"toys",popularity:.65,cdf:277170},{id:162,vendor:"Twimm",tld:"org",category:"sports",popularity:.65,cdf:277820},{id:263,vendor:"Dabtype",tld:"name",category:"books",popularity:.65,cdf:278470},{id:471,vendor:"Mydeo",tld:"name",category:"books",popularity:.65,cdf:279120},{id:513,vendor:"Fatz",tld:"name",category:"garden",popularity:.65,cdf:279770},{id:541,vendor:"Feednation",tld:"org",category:"games",popularity:.65,cdf:280420},{id:673,vendor:"Demimbu",tld:"gov",category:"books",popularity:.65,cdf:281070},{id:799,vendor:"Twiyo",tld:"name",category:"tools",popularity:.65,cdf:281720},{id:959,vendor:"Meejo",tld:"org",category:"automotive",popularity:.65,cdf:282370},{id:94,vendor:"Browsezoom",tld:"org",category:"beauty",popularity:.66,cdf:283030},{id:157,vendor:"Muxo",tld:"edu",category:"garden",popularity:.66,cdf:283690},{id:282,vendor:"Thoughtworks",tld:"biz",category:"sports",popularity:.66,cdf:284350},{id:300,vendor:"Realcube",tld:"name",category:"beauty",popularity:.66,cdf:285010},{id:360,vendor:"Centidel",tld:"net",category:"shoes",popularity:.66,cdf:285670},{id:440,vendor:"Dablist",tld:"com",category:"beauty",popularity:.66,cdf:286330},{id:463,vendor:"Divavu",tld:"net",category:"shoes",popularity:.66,cdf:286990},{id:483,vendor:"Voomm",tld:"mil",category:"garden",popularity:.66,cdf:287650},{id:539,vendor:"Mydeo",tld:"name",category:"movies",popularity:.66,cdf:288310},{id:547,vendor:"Skajo",tld:"biz",category:"toys",popularity:.66,cdf:288970},{id:554,vendor:"Linkbuzz",tld:"biz",category:"shoes",popularity:.66,cdf:289630},{id:605,vendor:"Oozz",tld:"com",category:"shoes",popularity:.66,cdf:290290},{id:737,vendor:"Kazu",tld:"com",category:"automotive",popularity:.66,cdf:290950},{id:49,vendor:"Voonix",tld:"edu",category:"health",popularity:.67,cdf:291620},{id:79,vendor:"Oyonder",tld:"com",category:"music",popularity:.67,cdf:292290},{id:141,vendor:"Ailane",tld:"biz",category:"automotive",popularity:.67,cdf:292960},{id:165,vendor:"Camimbo",tld:"org",category:"home",popularity:.67,cdf:293630},{id:204,vendor:"Jetwire",tld:"biz",category:"computers",popularity:.67,cdf:294300},{id:233,vendor:"Yacero",tld:"name",category:"sports",popularity:.67,cdf:294970},{id:301,vendor:"Yambee",tld:"net",category:"toys",popularity:.67,cdf:295640},{id:446,vendor:"Wordtune",tld:"gov",category:"electronics",popularity:.67,cdf:296310},{id:484,vendor:"Miboo",tld:"info",category:"toys",popularity:.67,cdf:296980},{id:519,vendor:"Oyoloo",tld:"edu",category:"music",popularity:.67,cdf:297650},{id:529,vendor:"Eayo",tld:"biz",category:"music",popularity:.67,cdf:298320},{id:538,vendor:"Cogidoo",tld:"com",category:"games",popularity:.67,cdf:298990},{id:776,vendor:"Meejo",tld:"org",category:"games",popularity:.67,cdf:299660},{id:850,vendor:"Jetwire",tld:"info",category:"games",popularity:.67,cdf:300330},{id:866,vendor:"Roodel",tld:"org",category:"books",popularity:.67,cdf:301e3},{id:964,vendor:"Skynoodle",tld:"net",category:"industrial",popularity:.67,cdf:301670},{id:217,vendor:"Eabox",tld:"biz",category:"computers",popularity:.68,cdf:302350},{id:325,vendor:"Fliptune",tld:"name",category:"toys",popularity:.68,cdf:303030},{id:394,vendor:"Gabspot",tld:"net",category:"music",popularity:.68,cdf:303710},{id:457,vendor:"Jaxworks",tld:"com",category:"outdoors",popularity:.68,cdf:304390},{id:493,vendor:"Thoughtstorm",tld:"name",category:"games",popularity:.68,cdf:305070},{id:613,vendor:"Realbridge",tld:"info",category:"baby",popularity:.68,cdf:305750},{id:649,vendor:"Npath",tld:"name",category:"outdoors",popularity:.68,cdf:306430},{id:659,vendor:"Ntags",tld:"edu",category:"movies",popularity:.68,cdf:307110},{id:697,vendor:"Oloo",tld:"name",category:"toys",popularity:.68,cdf:307790},{id:773,vendor:"Gabtune",tld:"info",category:"industrial",popularity:.68,cdf:308470},{id:787,vendor:"Izio",tld:"name",category:"health",popularity:.68,cdf:309150},{id:945,vendor:"Oloo",tld:"mil",category:"kids",popularity:.68,cdf:309830},{id:977,vendor:"Topicware",tld:"biz",category:"industrial",popularity:.68,cdf:310510},{id:31,vendor:"Fivebridge",tld:"info",category:"books",popularity:.69,cdf:311200},{id:170,vendor:"Kwimbee",tld:"edu",category:"books",popularity:.69,cdf:311890},{id:237,vendor:"Linkbridge",tld:"gov",category:"tools",popularity:.69,cdf:312580},{id:461,vendor:"Mycat",tld:"name",category:"computers",popularity:.69,cdf:313270},{id:508,vendor:"Jaxnation",tld:"org",category:"electronics",popularity:.69,cdf:313960},{id:566,vendor:"Brainbox",tld:"edu",category:"health",popularity:.69,cdf:314650},{id:620,vendor:"Riffpedia",tld:"com",category:"grocery",popularity:.69,cdf:315340},{id:643,vendor:"Twitterlist",tld:"name",category:"sports",popularity:.69,cdf:316030},{id:806,vendor:"Meetz",tld:"org",category:"toys",popularity:.69,cdf:316720},{id:877,vendor:"Twitterbeat",tld:"edu",category:"kids",popularity:.69,cdf:317410},{id:110,vendor:"Realmix",tld:"edu",category:"kids",popularity:.7,cdf:318110},{id:172,vendor:"Kwilith",tld:"gov",category:"computers",popularity:.7,cdf:318810},{id:193,vendor:"Vinte",tld:"mil",category:"games",popularity:.7,cdf:319510},{id:238,vendor:"Ozu",tld:"net",category:"games",popularity:.7,cdf:320210},{id:372,vendor:"Talane",tld:"biz",category:"games",popularity:.7,cdf:320910},{id:381,vendor:"Linktype",tld:"info",category:"tools",popularity:.7,cdf:321610},{id:660,vendor:"Dabfeed",tld:"mil",category:"industrial",popularity:.7,cdf:322310},{id:738,vendor:"Gigazoom",tld:"com",category:"computers",popularity:.7,cdf:323010},{id:805,vendor:"Kwinu",tld:"net",category:"home",popularity:.7,cdf:323710},{id:807,vendor:"Realfire",tld:"com",category:"shoes",popularity:.7,cdf:324410},{id:913,vendor:"Jabbersphere",tld:"org",category:"kids",popularity:.7,cdf:325110},{id:918,vendor:"Rooxo",tld:"gov",category:"industrial",popularity:.7,cdf:325810},{id:923,vendor:"Devify",tld:"info",category:"automotive",popularity:.7,cdf:326510},{id:927,vendor:"Youopia",tld:"net",category:"games",popularity:.7,cdf:327210},{id:932,vendor:"Wikido",tld:"org",category:"tools",popularity:.7,cdf:327910},{id:984,vendor:"Yakidoo",tld:"gov",category:"shoes",popularity:.7,cdf:328610},{id:52,vendor:"Yodel",tld:"com",category:"automotive",popularity:.71,cdf:329320},{id:97,vendor:"Meetz",tld:"info",category:"movies",popularity:.71,cdf:330030},{id:209,vendor:"Twiyo",tld:"net",category:"grocery",popularity:.71,cdf:330740},{id:222,vendor:"Quimm",tld:"biz",category:"sports",popularity:.71,cdf:331450},{id:251,vendor:"Devshare",tld:"net",category:"computers",popularity:.71,cdf:332160},{id:269,vendor:"Oyope",tld:"biz",category:"sports",popularity:.71,cdf:332870},{id:557,vendor:"Brightdog",tld:"com",category:"electronics",popularity:.71,cdf:333580},{id:588,vendor:"Rhynoodle",tld:"mil",category:"health",popularity:.71,cdf:334290},{id:811,vendor:"Skinix",tld:"com",category:"baby",popularity:.71,cdf:335e3},{id:7,vendor:"Trunyx",tld:"edu",category:"outdoors",popularity:.72,cdf:335720},{id:65,vendor:"Tagfeed",tld:"info",category:"sports",popularity:.72,cdf:336440},{id:77,vendor:"Wordpedia",tld:"biz",category:"music",popularity:.72,cdf:337160},{id:220,vendor:"Topicblab",tld:"name",category:"books",popularity:.72,cdf:337880},{id:224,vendor:"Browsedrive",tld:"edu",category:"shoes",popularity:.72,cdf:338600},{id:350,vendor:"Demivee",tld:"gov",category:"clothing",popularity:.72,cdf:339320},{id:371,vendor:"Brainbox",tld:"com",category:"industrial",popularity:.72,cdf:340040},{id:448,vendor:"Divavu",tld:"gov",category:"automotive",popularity:.72,cdf:340760},{id:453,vendor:"Feedbug",tld:"gov",category:"jewelry",popularity:.72,cdf:341480},{id:497,vendor:"Twitterworks",tld:"net",category:"games",popularity:.72,cdf:342200},{id:651,vendor:"Skivee",tld:"net",category:"electronics",popularity:.72,cdf:342920},{id:814,vendor:"Tagtune",tld:"name",category:"music",popularity:.72,cdf:343640},{id:839,vendor:"Ntag",tld:"info",category:"industrial",popularity:.72,cdf:344360},{id:938,vendor:"Janyx",tld:"biz",category:"jewelry",popularity:.72,cdf:345080},{id:28,vendor:"Zoomzone",tld:"gov",category:"outdoors",popularity:.73,cdf:345810},{id:305,vendor:"Riffpath",tld:"biz",category:"computers",popularity:.73,cdf:346540},{id:475,vendor:"Gabcube",tld:"org",category:"clothing",popularity:.73,cdf:347270},{id:607,vendor:"Photofeed",tld:"org",category:"computers",popularity:.73,cdf:348e3},{id:710,vendor:"Katz",tld:"name",category:"kids",popularity:.73,cdf:348730},{id:742,vendor:"Babbleset",tld:"mil",category:"jewelry",popularity:.73,cdf:349460},{id:785,vendor:"Skiptube",tld:"net",category:"health",popularity:.73,cdf:350190},{id:191,vendor:"Zoomzone",tld:"mil",category:"books",popularity:.74,cdf:350930},{id:202,vendor:"Yata",tld:"name",category:"sports",popularity:.74,cdf:351670},{id:313,vendor:"Voolia",tld:"name",category:"movies",popularity:.74,cdf:352410},{id:409,vendor:"Jabbertype",tld:"com",category:"computers",popularity:.74,cdf:353150},{id:415,vendor:"Gigaclub",tld:"net",category:"outdoors",popularity:.74,cdf:353890},{id:426,vendor:"Realmix",tld:"gov",category:"baby",popularity:.74,cdf:354630},{id:680,vendor:"Youspan",tld:"biz",category:"tools",popularity:.74,cdf:355370},{id:705,vendor:"Twitterbridge",tld:"gov",category:"grocery",popularity:.74,cdf:356110},{id:720,vendor:"Rhynyx",tld:"gov",category:"games",popularity:.74,cdf:356850},{id:798,vendor:"Yakitri",tld:"com",category:"books",popularity:.74,cdf:357590},{id:804,vendor:"Wordpedia",tld:"edu",category:"automotive",popularity:.74,cdf:358330},{id:841,vendor:"Myworks",tld:"org",category:"computers",popularity:.74,cdf:359070},{id:16,vendor:"Realbridge",tld:"net",category:"music",popularity:.75,cdf:359820},{id:158,vendor:"Dabjam",tld:"mil",category:"kids",popularity:.75,cdf:360570},{id:306,vendor:"Ainyx",tld:"info",category:"sports",popularity:.75,cdf:361320},{id:343,vendor:"Oba",tld:"com",category:"outdoors",popularity:.75,cdf:362070},{id:352,vendor:"Dazzlesphere",tld:"biz",category:"beauty",popularity:.75,cdf:362820},{id:410,vendor:"Photobug",tld:"info",category:"grocery",popularity:.75,cdf:363570},{id:465,vendor:"Aibox",tld:"edu",category:"clothing",popularity:.75,cdf:364320},{id:485,vendor:"Jatri",tld:"org",category:"industrial",popularity:.75,cdf:365070},{id:633,vendor:"Brainsphere",tld:"org",category:"sports",popularity:.75,cdf:365820},{id:689,vendor:"Gevee",tld:"name",category:"beauty",popularity:.75,cdf:366570},{id:753,vendor:"Wordware",tld:"info",category:"tools",popularity:.75,cdf:367320},{id:937,vendor:"Devify",tld:"info",category:"industrial",popularity:.75,cdf:368070},{id:952,vendor:"JumpXS",tld:"com",category:"home",popularity:.75,cdf:368820},{id:25,vendor:"Minyx",tld:"biz",category:"music",popularity:.76,cdf:369580},{id:147,vendor:"InnoZ",tld:"info",category:"automotive",popularity:.76,cdf:370340},{id:152,vendor:"Twinte",tld:"gov",category:"clothing",popularity:.76,cdf:371100},{id:160,vendor:"Yakidoo",tld:"name",category:"books",popularity:.76,cdf:371860},{id:243,vendor:"Babbleblab",tld:"com",category:"books",popularity:.76,cdf:372620},{id:460,vendor:"Camido",tld:"biz",category:"toys",popularity:.76,cdf:373380},{id:477,vendor:"Dynazzy",tld:"gov",category:"books",popularity:.76,cdf:374140},{id:835,vendor:"Vipe",tld:"info",category:"books",popularity:.76,cdf:374900},{id:838,vendor:"Yozio",tld:"mil",category:"garden",popularity:.76,cdf:375660},{id:879,vendor:"Snaptags",tld:"name",category:"toys",popularity:.76,cdf:376420},{id:922,vendor:"Agivu",tld:"com",category:"electronics",popularity:.76,cdf:377180},{id:19,vendor:"Jabbercube",tld:"gov",category:"kids",popularity:.77,cdf:377950},{id:53,vendor:"Twitterbeat",tld:"net",category:"health",popularity:.77,cdf:378720},{id:99,vendor:"Skimia",tld:"com",category:"industrial",popularity:.77,cdf:379490},{id:111,vendor:"Zoonoodle",tld:"mil",category:"automotive",popularity:.77,cdf:380260},{id:324,vendor:"Browseblab",tld:"gov",category:"jewelry",popularity:.77,cdf:381030},{id:499,vendor:"Yakidoo",tld:"com",category:"grocery",popularity:.77,cdf:381800},{id:552,vendor:"Tazzy",tld:"mil",category:"tools",popularity:.77,cdf:382570},{id:573,vendor:"Shuffledrive",tld:"biz",category:"toys",popularity:.77,cdf:383340},{id:623,vendor:"Jabbertype",tld:"gov",category:"baby",popularity:.77,cdf:384110},{id:638,vendor:"Buzzbean",tld:"mil",category:"kids",popularity:.77,cdf:384880},{id:911,vendor:"Vinder",tld:"gov",category:"garden",popularity:.77,cdf:385650},{id:63,vendor:"Edgetag",tld:"biz",category:"electronics",popularity:.78,cdf:386430},{id:278,vendor:"Yotz",tld:"info",category:"movies",popularity:.78,cdf:387210},{id:331,vendor:"Dabjam",tld:"net",category:"beauty",popularity:.78,cdf:387990},{id:672,vendor:"Shufflester",tld:"name",category:"health",popularity:.78,cdf:388770},{id:740,vendor:"Browsezoom",tld:"edu",category:"automotive",popularity:.78,cdf:389550},{id:847,vendor:"BlogXS",tld:"edu",category:"tools",popularity:.78,cdf:390330},{id:943,vendor:"Eimbee",tld:"info",category:"toys",popularity:.78,cdf:391110},{id:196,vendor:"Linkbridge",tld:"mil",category:"kids",popularity:.79,cdf:391900},{id:286,vendor:"Fiveclub",tld:"info",category:"games",popularity:.79,cdf:392690},{id:320,vendor:"Twiyo",tld:"org",category:"industrial",popularity:.79,cdf:393480},{id:481,vendor:"Oyoba",tld:"net",category:"grocery",popularity:.79,cdf:394270},{id:502,vendor:"InnoZ",tld:"org",category:"books",popularity:.79,cdf:395060},{id:820,vendor:"Twinder",tld:"biz",category:"music",popularity:.79,cdf:395850},{id:833,vendor:"Brainverse",tld:"biz",category:"garden",popularity:.79,cdf:396640},{id:856,vendor:"Skilith",tld:"edu",category:"industrial",popularity:.79,cdf:397430},{id:939,vendor:"Mydo",tld:"org",category:"books",popularity:.79,cdf:398220},{id:971,vendor:"Feedfire",tld:"biz",category:"industrial",popularity:.79,cdf:399010},{id:30,vendor:"Centidel",tld:"org",category:"grocery",popularity:.8,cdf:399810},{id:44,vendor:"Mita",tld:"gov",category:"music",popularity:.8,cdf:400610},{id:74,vendor:"Zoonder",tld:"org",category:"grocery",popularity:.8,cdf:401410},{id:114,vendor:"Brainlounge",tld:"info",category:"baby",popularity:.8,cdf:402210},{id:127,vendor:"Voolia",tld:"com",category:"outdoors",popularity:.8,cdf:403010},{id:211,vendor:"Mycat",tld:"com",category:"music",popularity:.8,cdf:403810},{id:270,vendor:"Feedfish",tld:"name",category:"home",popularity:.8,cdf:404610},{id:326,vendor:"Twitterwire",tld:"mil",category:"sports",popularity:.8,cdf:405410},{id:434,vendor:"Fivebridge",tld:"net",category:"shoes",popularity:.8,cdf:406210},{id:603,vendor:"Twitterbeat",tld:"org",category:"toys",popularity:.8,cdf:407010},{id:704,vendor:"Kayveo",tld:"org",category:"computers",popularity:.8,cdf:407810},{id:761,vendor:"InnoZ",tld:"gov",category:"garden",popularity:.8,cdf:408610},{id:865,vendor:"Kwinu",tld:"biz",category:"kids",popularity:.8,cdf:409410},{id:881,vendor:"Zooxo",tld:"net",category:"garden",popularity:.8,cdf:410210},{id:992,vendor:"Kaymbo",tld:"net",category:"music",popularity:.8,cdf:411010},{id:90,vendor:"Meedoo",tld:"gov",category:"sports",popularity:.81,cdf:411820},{id:168,vendor:"Teklist",tld:"name",category:"games",popularity:.81,cdf:412630},{id:330,vendor:"Linktype",tld:"org",category:"games",popularity:.81,cdf:413440},{id:569,vendor:"Mydo",tld:"info",category:"outdoors",popularity:.81,cdf:414250},{id:725,vendor:"Ooba",tld:"gov",category:"automotive",popularity:.81,cdf:415060},{id:748,vendor:"Oyonder",tld:"edu",category:"shoes",popularity:.81,cdf:415870},{id:756,vendor:"Feedfire",tld:"gov",category:"clothing",popularity:.81,cdf:416680},{id:873,vendor:"Kazu",tld:"net",category:"beauty",popularity:.81,cdf:417490},{id:72,vendor:"Ntags",tld:"info",category:"computers",popularity:.82,cdf:418310},{id:183,vendor:"Kwideo",tld:"mil",category:"outdoors",popularity:.82,cdf:419130},{id:199,vendor:"Skiba",tld:"info",category:"jewelry",popularity:.82,cdf:419950},{id:427,vendor:"Yodo",tld:"gov",category:"movies",popularity:.82,cdf:420770},{id:657,vendor:"Meevee",tld:"net",category:"computers",popularity:.82,cdf:421590},{id:661,vendor:"Linklinks",tld:"gov",category:"home",popularity:.82,cdf:422410},{id:731,vendor:"Flashdog",tld:"mil",category:"books",popularity:.82,cdf:423230},{id:862,vendor:"Agivu",tld:"info",category:"games",popularity:.82,cdf:424050},{id:940,vendor:"Avamm",tld:"name",category:"games",popularity:.82,cdf:424870},{id:59,vendor:"Flashpoint",tld:"mil",category:"beauty",popularity:.83,cdf:425700},{id:93,vendor:"Jaloo",tld:"gov",category:"jewelry",popularity:.83,cdf:426530},{id:189,vendor:"Centizu",tld:"biz",category:"kids",popularity:.83,cdf:427360},{id:491,vendor:"Quimba",tld:"com",category:"books",popularity:.83,cdf:428190},{id:518,vendor:"Trupe",tld:"edu",category:"movies",popularity:.83,cdf:429020},{id:609,vendor:"Zoonoodle",tld:"name",category:"automotive",popularity:.83,cdf:429850},{id:611,vendor:"Ailane",tld:"org",category:"electronics",popularity:.83,cdf:430680},{id:684,vendor:"Feedbug",tld:"net",category:"home",popularity:.83,cdf:431510},{id:733,vendor:"Trilia",tld:"biz",category:"home",popularity:.83,cdf:432340},{id:41,vendor:"Photobug",tld:"net",category:"books",popularity:.84,cdf:433180},{id:628,vendor:"Quimba",tld:"edu",category:"toys",popularity:.84,cdf:434020},{id:793,vendor:"Meemm",tld:"biz",category:"automotive",popularity:.84,cdf:434860},{id:96,vendor:"Jazzy",tld:"gov",category:"automotive",popularity:.85,cdf:435710},{id:210,vendor:"Reallinks",tld:"gov",category:"grocery",popularity:.85,cdf:436560},{id:417,vendor:"Livefish",tld:"edu",category:"garden",popularity:.85,cdf:437410},{id:486,vendor:"Shufflebeat",tld:"info",category:"automotive",popularity:.85,cdf:438260},{id:691,vendor:"Dabjam",tld:"biz",category:"tools",popularity:.85,cdf:439110},{id:155,vendor:"Photojam",tld:"edu",category:"movies",popularity:.86,cdf:439970},{id:179,vendor:"Teklist",tld:"org",category:"tools",popularity:.86,cdf:440830},{id:200,vendor:"Flashdog",tld:"biz",category:"games",popularity:.86,cdf:441690},{id:296,vendor:"Jazzy",tld:"com",category:"grocery",popularity:.86,cdf:442550},{id:308,vendor:"Eare",tld:"edu",category:"toys",popularity:.86,cdf:443410},{id:380,vendor:"Midel",tld:"info",category:"health",popularity:.86,cdf:444270},{id:978,vendor:"Oyondu",tld:"name",category:"health",popularity:.86,cdf:445130},{id:13,vendor:"Blogtags",tld:"edu",category:"toys",popularity:.87,cdf:446e3},{id:175,vendor:"Jatri",tld:"org",category:"baby",popularity:.87,cdf:446870},{id:634,vendor:"Quatz",tld:"edu",category:"baby",popularity:.87,cdf:447740},{id:892,vendor:"Kazio",tld:"net",category:"books",popularity:.87,cdf:448610},{id:139,vendor:"Yotz",tld:"biz",category:"industrial",popularity:.88,cdf:449490},{id:268,vendor:"Feedspan",tld:"mil",category:"outdoors",popularity:.88,cdf:450370},{id:665,vendor:"Chatterbridge",tld:"edu",category:"electronics",popularity:.88,cdf:451250},{id:726,vendor:"Oloo",tld:"name",category:"computers",popularity:.88,cdf:452130},{id:870,vendor:"Roombo",tld:"name",category:"movies",popularity:.88,cdf:453010},{id:969,vendor:"BlogXS",tld:"mil",category:"movies",popularity:.88,cdf:453890},{id:690,vendor:"Eadel",tld:"net",category:"industrial",popularity:.89,cdf:454780},{id:701,vendor:"Divanoodle",tld:"org",category:"toys",popularity:.89,cdf:455670},{id:882,vendor:"Ailane",tld:"edu",category:"movies",popularity:.9,cdf:456570},{id:229,vendor:"Quatz",tld:"biz",category:"outdoors",popularity:.91,cdf:457480},{id:439,vendor:"Brightbean",tld:"info",category:"baby",popularity:.92,cdf:458400},{id:795,vendor:"Yakidoo",tld:"info",category:"books",popularity:.92,cdf:459320},{id:23,vendor:"Devpoint",tld:"edu",category:"garden",popularity:.93,cdf:460250},{id:100,vendor:"Skiba",tld:"com",category:"music",popularity:.93,cdf:461180},{id:146,vendor:"Wikido",tld:"mil",category:"clothing",popularity:.93,cdf:462110},{id:416,vendor:"Twitterwire",tld:"info",category:"games",popularity:.93,cdf:463040},{id:449,vendor:"Skyble",tld:"mil",category:"tools",popularity:.93,cdf:463970},{id:492,vendor:"Jabbercube",tld:"edu",category:"kids",popularity:.93,cdf:464900},{id:548,vendor:"Voolith",tld:"info",category:"jewelry",popularity:.93,cdf:465830},{id:786,vendor:"Bubblebox",tld:"gov",category:"jewelry",popularity:.93,cdf:466760},{id:373,vendor:"Skyndu",tld:"com",category:"tools",popularity:.94,cdf:467700},{id:396,vendor:"Flashspan",tld:"edu",category:"tools",popularity:.94,cdf:468640},{id:498,vendor:"Dynabox",tld:"edu",category:"computers",popularity:.94,cdf:469580},{id:991,vendor:"Topdrive",tld:"info",category:"electronics",popularity:.94,cdf:470520},{id:382,vendor:"Dabshots",tld:"mil",category:"industrial",popularity:.95,cdf:471470},{id:404,vendor:"Shuffledrive",tld:"gov",category:"garden",popularity:.95,cdf:472420},{id:478,vendor:"Tavu",tld:"name",category:"movies",popularity:.95,cdf:473370},{id:104,vendor:"Twimm",tld:"info",category:"baby",popularity:.96,cdf:474330},{id:208,vendor:"Youspan",tld:"biz",category:"jewelry",popularity:.96,cdf:475290},{id:242,vendor:"Centizu",tld:"info",category:"sports",popularity:.96,cdf:476250},{id:582,vendor:"Snaptags",tld:"edu",category:"music",popularity:.96,cdf:477210},{id:216,vendor:"Oyope",tld:"gov",category:"computers",popularity:.97,cdf:478180},{id:236,vendor:"Brainverse",tld:"biz",category:"electronics",popularity:.97,cdf:479150},{id:266,vendor:"Zoombox",tld:"mil",category:"grocery",popularity:.97,cdf:480120},{id:385,vendor:"Oyonder",tld:"name",category:"games",popularity:.97,cdf:481090},{id:646,vendor:"Feedfire",tld:"edu",category:"music",popularity:.97,cdf:482060},{id:98,vendor:"Trudeo",tld:"edu",category:"movies",popularity:.98,cdf:483040},{id:936,vendor:"Browsebug",tld:"edu",category:"shoes",popularity:.98,cdf:484020},{id:455,vendor:"Dynava",tld:"org",category:"automotive",popularity:.99,cdf:485010},{id:578,vendor:"Dynabox",tld:"edu",category:"music",popularity:.99,cdf:486e3},{id:868,vendor:"Midel",tld:"net",category:"automotive",popularity:.99,cdf:486990},{id:310,vendor:"Roombo",tld:"biz",category:"industrial",popularity:1,cdf:487990},{id:708,vendor:"Camido",tld:"mil",category:"movies",popularity:1,cdf:488990},{id:947,vendor:"Jetpulse",tld:"edu",category:"games",popularity:1,cdf:489990},{id:994,vendor:"Feedmix",tld:"net",category:"computers",popularity:1,cdf:490990},{id:871,vendor:"Zooxo",tld:"gov",category:"beauty",popularity:1.01,cdf:492e3},{id:21,vendor:"Aibox",tld:"net",category:"toys",popularity:1.02,cdf:493020},{id:35,vendor:"Skyvu",tld:"org",category:"sports",popularity:1.02,cdf:494040},{id:717,vendor:"Yozio",tld:"com",category:"automotive",popularity:1.02,cdf:495060},{id:411,vendor:"Livepath",tld:"net",category:"beauty",popularity:1.03,cdf:496090},{id:319,vendor:"Babbleblab",tld:"net",category:"computers",popularity:1.05,cdf:497140},{id:504,vendor:"Rhycero",tld:"info",category:"books",popularity:1.05,cdf:498190},{id:961,vendor:"Edgetag",tld:"org",category:"beauty",popularity:1.05,cdf:499240},{id:450,vendor:"Viva",tld:"mil",category:"grocery",popularity:1.07,cdf:500310},{id:751,vendor:"Skipstorm",tld:"name",category:"movies",popularity:1.07,cdf:501380},{id:696,vendor:"Oyoba",tld:"com",category:"movies",popularity:1.08,cdf:502460},{id:619,vendor:"Skaboo",tld:"com",category:"sports",popularity:1.1,cdf:503560},{id:388,vendor:"Zoomdog",tld:"name",category:"beauty",popularity:1.13,cdf:504690},{id:103,vendor:"Roombo",tld:"edu",category:"garden",popularity:1.16,cdf:505850},{id:864,vendor:"Twitterlist",tld:"info",category:"books",popularity:1.16,cdf:507010},{id:101,vendor:"Babblestorm",tld:"name",category:"industrial",popularity:1.18,cdf:508190},{id:975,vendor:"Zoombeat",tld:"com",category:"outdoors",popularity:1.21,cdf:509400},{id:206,vendor:"Zoombox",tld:"net",category:"garden",popularity:1.23,cdf:510630},{id:500,vendor:"Feednation",tld:"org",category:"beauty",popularity:1.24,cdf:511870}];const Bt=e=>e[Math.floor(Math.random()*e.length)],Ke=(e,t)=>Math.random()*(t-e)+e,ve=(e,t)=>Math.floor(Ke(e,t)),Rr=()=>{const e=We[We.length-1],t=ve(0,e.cdf),o=_o(We,i=>i.cdf>=t?i.cdf-t:Number.MAX_SAFE_INTEGER);return o||e},de={id:120658,name:"New York",lonlat:[-73.993562,40.727063],diameter:.04},Ar=500,Ft=(e,t)=>b(e,`
      INSERT INTO cities (city_id, city_name, center, diameter)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        city_name = VALUES(city_name),
        center = VALUES(center),
        diameter = VALUES(diameter)
    `,t.id,t.name,`POINT(${t.lonlat[0]} ${t.lonlat[1]})`,t.diameter),Or=(e,t)=>b(e,"DELETE FROM cities WHERE city_id = ?",t),Cr=["olc_8","purchase","request"],Ir=["minute","hour","day","week","month"],Gt=({interval:e,kind:t,value:o})=>To(`${e}-${t}-${o}`),wr=async(e,t)=>{const{sql:o,params:i}=Ut({table:"segments",options:{replace:!0},columns:["segment_id","valid_interval","filter_kind","filter_value"],tuples:t.map(d=>[Gt(d),d.interval,d.kind,d.value])});await b(e,o,...i)},Lr=async(e,t)=>{const o={table:"offers",options:{replace:!0},columns:["customer","notification_zone","segment_ids","notification_content","notification_target","maximum_bid_cents"],tuples:[]};let i=0,d=[];const a=async()=>{const{sql:n,params:s}=Ut(o);await Promise.all([b(e,n,...s),wr(e,d)]),o.tuples=[],d=[],i=0};for(const n of t)o.tuples.push([n.customer,n.notificationZone,JSON.stringify(n.segments.map(Gt)),n.notificationContent,n.notificationTarget,n.maximumBidCents]),i++,d=d.concat(n.segments),i>=Ar&&await a();i>0&&await a()},kr=()=>Bt(Cr),Dr=()=>Bt(Ir),Yt=({vendor:e,tld:t})=>`${e.toLowerCase()}.${t}`,Ht=e=>{const[t,o]=e.lonlat,i=e.diameter/2,[d,a]=[t-i,t+i],[n,s]=[o-i,o+i];return[Ke(d,a),Ke(n,s)]},xr=(e,t)=>{const o=kr(),i=Dr();switch(o){case"olc_8":{const[d,a]=Ht(e),n=Ve.encode(a,d,8).substring(0,8);return{kind:o,interval:i,value:n}}case"purchase":return{kind:o,interval:i,value:t.vendor};case"request":return{kind:o,interval:i,value:Yt(t)}}},zr=e=>{const t=ve(1,3),o=Rr(),i=Array.from({length:t},()=>xr(e,o)),d=Yt(o),n=`${ve(10,50)}% off at ${o.vendor}`,s=d,[c,p]=Ht(e),u=Ve.encode(p,c,8),y=Ve.decode(u),m={ne:[y.latitudeHi,y.longitudeHi],sw:[y.latitudeLo,y.longitudeLo]};return{customer:o.vendor,segments:i,notificationZone:Le(m),notificationContent:n,notificationTarget:s,maximumBidCents:ve(2,15)}},Pr=(e,t)=>Array.from({length:t},()=>zr(e)),Mr=e=>(t,o,i,d=1)=>`https://stamen-tiles.a.ssl.fastly.net/${e}/${i}/${t}/${o}${d>=2?"@2x":""}.png`,Ur=l(A,{children:["Map tiles by ",r(W,{href:"http://stamen.com",children:"Stamen Design"}),", under"," ",r(W,{href:"http://creativecommons.org/licenses/by/3.0",children:"CC BY 3.0"}),". Data by ",r(W,{href:"http://openstreetmap.org",children:"OpenStreetMap"}),", under"," ",r(W,{href:"http://www.openstreetmap.org/copyright",children:"ODbL"}),"."]}),Br=[de.lonlat[1],de.lonlat[0]],Fr=12,Gr=({width:e,height:t,bounds:o,latLngToPixel:i,pixelToLatLng:d,useRenderer:a,options:n})=>{const s=ae.useRef(null),c=Rt(()=>new q),{setup:p,update:u}=a({scene:c,width:e,height:t,bounds:o,latLngToPixel:i,pixelToLatLng:d,options:n});return g.exports.useLayoutEffect(()=>{if(!s.current)throw new Error("No canvas ref");console.log("PixiMapLayer: Setup");const y=new No({view:s.current,width:e,height:t,backgroundAlpha:0,antialias:!0});return y.stage.addChild(c),p==null||p(),u&&y.ticker.add(m=>{u(m)}),()=>{console.log("PixiMapLayer: Destroy"),y.stage.removeChild(c),y.destroy(!1,{children:!1,texture:!0,baseTexture:!0})}},[t,c,p,u,e]),r("canvas",{ref:s})},Yr=({mapState:e,latLngToPixel:t,pixelToLatLng:o,useRenderer:i,options:d})=>{const{width:a,height:n,bounds:s}=e||{width:0,height:0};return a<=0||n<=0||!t||!o||!s?null:r(Gr,{useRenderer:i,width:a,height:n,bounds:s,latLngToPixel:t,pixelToLatLng:o,options:d})},ke=n=>{var s=n,{height:e="100%",defaultCenter:t=Br,defaultZoom:o=Fr,useRenderer:i,options:d}=s,a=k(s,["height","defaultCenter","defaultZoom","useRenderer","options"]);const[c,p]=g.exports.useState(t),[u,y]=g.exports.useState(o);return r(L,_(h({borderRadius:"lg",overflow:"hidden",height:e},a),{children:r(So,{dprs:[1,2],provider:Mr("toner-lite"),attribution:Ur,maxZoom:20,center:c,zoom:u,onBoundsChanged:({center:m,zoom:E})=>{p(m),y(E)},children:r(Yr,{useRenderer:i,options:d})})}))};var De=[{name:"date_sub_dynamic",createStmt:`CREATE OR REPLACE FUNCTION date_sub_dynamic (
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
END`}],xe=[{name:"process_locations",createStmt:`CREATE OR REPLACE PROCEDURE process_locations (
    _batch QUERY(
        city_id BIGINT NOT NULL,
        subscriber_id BIGINT NOT NULL,
        lonlat GEOGRAPHYPOINT NOT NULL
    )
)
AS
BEGIN
    INSERT INTO subscribers
    SELECT city_id, subscriber_id, lonlat
    FROM _batch
    ON DUPLICATE KEY UPDATE current_location = VALUES(current_location);

    INSERT INTO locations
    SELECT
        city_id,
        subscriber_id,
        now(6) AS ts,
        lonlat,
        encode_open_location_code(lonlat, 8) AS olc_8
    FROM _batch;
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
END`},{name:"update_location_segments",createStmt:`CREATE OR REPLACE PROCEDURE update_location_segments(_since DATETIME(6), _until DATETIME(6))
AS
BEGIN
    INSERT INTO subscriber_segments
    SELECT * FROM dynamic_subscriber_segments_locations(_since, _until)
    ON DUPLICATE KEY UPDATE expires_at = VALUES(expires_at);
END`},{name:"update_request_segments",createStmt:`CREATE OR REPLACE PROCEDURE update_request_segments(_since DATETIME(6), _until DATETIME(6))
AS
BEGIN
    INSERT INTO subscriber_segments
    SELECT * FROM dynamic_subscriber_segments_requests(_since, _until)
    ON DUPLICATE KEY UPDATE expires_at = VALUES(expires_at);
END`},{name:"update_purchase_segments",createStmt:`CREATE OR REPLACE PROCEDURE update_purchase_segments(_since DATETIME(6), _until DATETIME(6))
AS
BEGIN
    INSERT INTO subscriber_segments
    SELECT * FROM dynamic_subscriber_segments_purchases(_since, _until)
    ON DUPLICATE KEY UPDATE expires_at = VALUES(expires_at);
END`},{name:"prune_segments",createStmt:`CREATE OR REPLACE PROCEDURE prune_segments(_until DATETIME(6))
AS
BEGIN
    DELETE FROM subscriber_segments WHERE expires_at <= _until;
END`}],ze=[{name:"worldcities",createStmt:`create rowstore table if not exists worldcities (
  city_id BIGINT NOT NULL PRIMARY KEY,
  city_name TEXT NOT NULL,
  center GEOGRAPHYPOINT NOT NULL,

  INDEX (center)
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
  UNION
  SELECT * FROM dynamic_subscriber_segments_requests(_since, _until)
  UNION
  SELECT * FROM dynamic_subscriber_segments_purchases(_since, _until)
);`}];const be="singlestore-realtime-digital-marketing",Hr=[`CREATE LINK aws_s3 AS S3 CREDENTIALS '{}' CONFIG '{ "region": "us-east-1" }'`,`
    CREATE OR REPLACE PIPELINE worldcities
    AS LOAD DATA LINK aws_s3 '${be}/cities.ndjson'
    SKIP DUPLICATE KEY ERRORS
    INTO TABLE worldcities
    FORMAT JSON (
      city_id <- id,
      city_name <- name,
      @lat <- lat,
      @lng <- lng
    )
    SET center = GEOGRAPHY_POINT(@lng, @lat)
  `,"START PIPELINE worldcities FOREGROUND"],Wr=e=>{const t=ze.find(d=>d.name===e);if(t)return t;const o=xe.find(d=>d.name===e);if(o)return o;const i=De.find(d=>d.name===e);if(i)return i;throw new Error("Could not find schema object: "+e)},jr=async e=>{try{return await nt(e,"SELECT 1"),!0}catch{return!1}},Vr=async e=>{let t={tables:[],procedures:[],functions:[]};const s=e,{database:o}=s,i=k(s,["database"]);try{t=(await at(i,`
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
        `,o,o)).reduce((c,[p,u])=>(c[p].push(u),c),t)}catch(c){if(!(c instanceof D&&(c.isUnknownDatabase()||c.isDatabaseRecovering())))throw c}const{tables:d,procedures:a,functions:n}=t;return Object.fromEntries([ze.map(({name:c})=>[c,d.includes(c)]),xe.map(({name:c})=>[c,a.includes(c)]),De.map(({name:c})=>[c,n.includes(c)])].flat())},Wt=e=>nt(e,"DROP DATABASE IF EXISTS `"+e.database+"`"),$r=async(e,{progress:t,scaleFactor:o,includeSeedData:i,skipCreate:d=!1})=>{d||(t("Dropping existing schema","info"),await Wt(e),t("Creating database","info"),await nt(e,"CREATE DATABASE `"+e.database+"`"));for(const a of De)t(`Creating function: ${a.name}`,"info"),await b(e,a.createStmt);for(const a of ze)t(`Creating table: ${a.name}`,"info"),await b(e,a.createStmt);for(const a of xe)t(`Creating procedure: ${a.name}`,"info"),await b(e,a.createStmt);await Kr(e),await Ft(e,de),i&&(t("Creating sample data","info"),await lt(e,de,o)),t("Schema initialized","success")},Kr=async e=>{for(const t of Hr)await b(e,t)},lt=(e,t,o)=>{const i=100*o.partitions,d=Pr(t,i);return Lr(e,d)},jt=async(e,t)=>{const o=t.prefix;return await U(e,`
      SELECT
        expected.city_id AS cityId,
        expected.city_name AS cityName,
        GEOGRAPHY_LONGITUDE(expected.center) AS lon,
        GEOGRAPHY_LATITUDE(expected.center) AS lat,
        expected.diameter,
        pipelineName,
        (
          pipelines.pipeline_name IS NULL
          OR config_json::$connection_string NOT LIKE "%${o}%"
        ) AS needsUpdate
      FROM (
        SELECT cities.*, CONCAT(prefix.table_col, cities.city_id) AS pipelineName
        FROM ${e.database}.cities
        JOIN TABLE(["locations_", "requests_", "purchases_"]) AS prefix
      ) AS expected
      LEFT JOIN information_schema.pipelines
        ON pipelines.database_name = ?
        AND pipelines.pipeline_name = expected.pipelineName
    `,e.database)},Vt=async(e,t)=>{const o=t.prefix,i=await jt(e,t);await Promise.all(i.filter(d=>d.needsUpdate).map(async d=>{console.log(`recreating pipeline ${d.pipelineName} for city ${d.cityName}`),d.pipelineName.startsWith("locations_")?await b(e,`
            CREATE OR REPLACE PIPELINE ${d.pipelineName}
            AS LOAD DATA LINK aws_s3 '${be}/${o}/locations.*'
            MAX_PARTITIONS_PER_BATCH ${t.partitions}
            INTO PROCEDURE process_locations FORMAT PARQUET (
              subscriber_id <- subscriberid,
              @offset_x <- offsetX,
              @offset_y <- offsetY
            )
            SET
              city_id = ?,
              lonlat = GEOGRAPHY_POINT(
                ? + (@offset_x * ?),
                ? + (@offset_y * ?)
              )
          `,d.cityId,d.lon,d.diameter,d.lat,d.diameter):d.pipelineName.startsWith("requests_")?await b(e,`
            CREATE OR REPLACE PIPELINE ${d.pipelineName}
            AS LOAD DATA LINK aws_s3 '${be}/${o}/requests.*'
            MAX_PARTITIONS_PER_BATCH ${t.partitions}
            INTO TABLE requests FORMAT PARQUET (
              subscriber_id <- subscriberid,
              domain <- domain
            )
            SET ts = NOW(),
              city_id = ?;
          `,d.cityId):d.pipelineName.startsWith("purchases_")&&await b(e,`
            CREATE OR REPLACE PIPELINE ${d.pipelineName}
            AS LOAD DATA LINK aws_s3 '${be}/${o}/purchases.*'
            MAX_PARTITIONS_PER_BATCH ${t.partitions}
            INTO TABLE purchases FORMAT PARQUET (
              subscriber_id <- subscriberid,
              vendor <- vendor
            )
            SET ts = NOW(),
              city_id = ?;
          `,d.cityId),await b(e,`ALTER PIPELINE ${d.pipelineName} SET OFFSETS EARLIEST DROP ORPHAN FILES`),await b(e,`START PIPELINE IF NOT RUNNING ${d.pipelineName}`),console.log(`finished creating pipeline ${d.pipelineName} for city ${d.cityName}`)}))},qr=async e=>{const t=await at(e,`
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
    `,e.database);await Promise.all(t.map(async([o])=>{console.log("restarting pipeline",o),await b(e,`ALTER PIPELINE ${o} SET OFFSETS EARLIEST DROP ORPHAN FILES`),await b(e,`START PIPELINE IF NOT RUNNING ${o}`)}))},Jr=async e=>{const t=await U(e,`
      SELECT pipeline_name AS pipelineName
      FROM information_schema.pipelines
      WHERE
        database_name = ?
        AND pipelineName NOT IN (
          SELECT CONCAT(prefix.table_col, cities.city_id)
          FROM ${e.database}.cities
          JOIN TABLE(["locations_", "requests_", "purchases_"]) AS prefix
        )
        AND pipelineName != "worldcities"
    `,e.database);await Promise.all(t.map(o=>(console.log("dropping pipeline",o.pipelineName),b(e,`DROP PIPELINE ${o.pipelineName}`))))},$t=async e=>{const t=await U(e,`
      SELECT plan_id AS planId
      FROM information_schema.plancache
      WHERE
        plan_warnings LIKE "%empty tables%"
    `);return await Promise.all(t.map(({planId:o})=>b(e,`DROP ${o} FROM PLANCACHE`))),t.length>0},Xr=(e,...t)=>{const o=t.map(i=>`"${i}"`).join(",");return Mt(e,`
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
          AND table_name IN (${o})
        GROUP BY table_name
        UNION ALL
        SELECT table_col AS tableName, 0 AS count
        FROM TABLE([${o}])
      )
      GROUP BY tableName
    `,e.database)},Pe=(e,...t)=>Xr(e,...t).then(o=>o.reduce((i,{tableName:d,count:a})=>(i[d]=a,i),{})),Zr=async(e,t)=>{const{maxRows:o}=t,d=["locations","requests","purchases","notifications"].map(n=>`"${n}"`).join(","),a=await Mt(e,`
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
    `,e.database,o);await Promise.all(a.map(async({tableName:n,count:s,minTs:c,maxTs:p})=>{const y=(s-o)/s;if(y<.2)return;const m=new Date((c+y*(p-c))*1e3);console.log(`removing rows from ${n} older than ${m.toISOString()}`),await b(e,`DELETE FROM ${n} WHERE ts <= ?`,m.toISOString())}))},st=(e,t="minute")=>dt(e,"ECHO run_matching_process(?)",t).then(o=>o.RESULT),pt=async(e,t)=>{const o=new Date().toISOString();return await Promise.all(["update_location_segments","update_request_segments","update_purchase_segments"].map(i=>b(e,`CALL ${i}(?, ?)`,t,o))),await b(e,"CALL prune_segments(?)",o),o},Qr=(e,t,o,i)=>at(e,`
      SELECT
        ts,
        GEOGRAPHY_LONGITUDE(lonlat) AS lon,
        GEOGRAPHY_LATITUDE(lonlat) AS lat
      FROM notifications
      WHERE
        ts > ?
        AND GEOGRAPHY_CONTAINS(?, lonlat)
      ORDER BY ts DESC
      LIMIT ${o}
    `,t,Le(i)),ei=(e,t,o)=>U(e,`
      SELECT
        offer_id AS offerId,
        notification_zone AS notificationZone
      FROM offers
      WHERE GEOGRAPHY_INTERSECTS(?, notification_zone)
      LIMIT ${t}
    `,Le(o)),ti=e=>U(e,`
      SELECT
        city_id AS id,
        city_name AS name,
        GEOGRAPHY_LATITUDE(center) AS centerLat,
        GEOGRAPHY_LONGITUDE(center) AS centerLon,
        diameter
      FROM cities
    `),oi=(e,t,o)=>dt(e,`
      SELECT
        city_id AS id,
        city_name AS name,
        GEOGRAPHY_LATITUDE(center) AS centerLat,
        GEOGRAPHY_LONGITUDE(center) AS centerLon,
        0.1 AS diameter
      FROM worldcities
      ORDER BY GEOGRAPHY_DISTANCE(center, GEOGRAPHY_POINT(?, ?)) ASC
      LIMIT 1
    `,t,o),ut=e=>`
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
`,ri=(e,t,o,i)=>U(e,ct({with:[["metrics",ut(t)]],base:`
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
        ORDER BY ${o} DESC
        LIMIT ${i}
      `}).sql),St=(e,t)=>dt(e,ct({with:[["metrics",ut(t)]],base:`
        SELECT
          *, (totalConversions / totalNotifications) :> DOUBLE AS conversionRate
        FROM (
          SELECT
            COUNT(metrics.offer_id) AS totalNotifications,
            COUNT(metrics.converted_at) AS totalConversions
          FROM metrics
        )
      `}).sql),ii=(e,t,o)=>{const i=ct({with:[["metrics",ut(o)]],base:{sql:`
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
      `,params:[Le(t)]}});return U(e,i.sql,...i.params)},V=[{name:"s00",maxRows:1e7,prefix:"v2/100k-2p",partitions:2},{name:"s0",maxRows:2e7,prefix:"v2/100k-4p",partitions:4},{name:"s1",maxRows:4e7,prefix:"v2/100k-8p",partitions:8},{name:"s2",maxRows:16e7,prefix:"v2/1m-16p",partitions:16},{name:"s4",maxRows:32e7,prefix:"v2/1m-32p",partitions:16},{name:"s8",maxRows:64e7,prefix:"v2/1m-64p",partitions:64},{name:"s10",maxRows:1e9,prefix:"v2/10m-80p",partitions:80}],di=e=>V.find(t=>t.name===e)||V[0],J=({encode:e,decode:t}={encode:JSON.stringify,decode:JSON.parse})=>({setSelf:o,onSet:i,node:d})=>{const a=`recoil.localstorage.${d.key}`,n=localStorage.getItem(a);n!=null&&o(t(n)),i((s,c,p)=>{p?localStorage.removeItem(a):localStorage.setItem(a,e(s))})},yt=()=>({setSelf:e,node:{key:t}})=>{const{location:o}=window;if(o){const i=new URLSearchParams(o.search);e(i.get(t))}},ai=x({key:"skipCreateDatabase",default:null,effects:[yt()]}),ni=x({key:"sessionId",default:null,effects:[yt()]}),ci=x({key:"vaporBaseUrl",default:"https://vapor.labs.singlestore.com",effects:[yt()]}),Kt=x({key:"connectionHost",default:"http://127.0.0.1",effects:[J()]}),qt=x({key:"connectionUser",default:"root",effects:[J()]}),Jt=x({key:"connectionPassword",default:"",effects:[J()]}),X=x({key:"connectionDatabase",default:"martech",effects:[J()]}),Xt=At({key:"vaporConnectionConfig",get:async({get:e})=>{const t=e(ni),o=e(ci);if(t)try{const i=await fetch(o+"/api/v1/vapor/connect?sessionId="+t);if(i.status===200){const d=await i.json();return{host:d.endpoint,user:d.user,password:d.password,database:e(X)}}}catch{console.log(`Failed to connect to vapor at ${o}, falling back to local config`)}}}),v=At({key:"connectionConfig",get:({get:e})=>{const t=e(Xt);if(t)return t;const o=e(Kt),i=e(qt),d=e(Jt),a=e(X);return{host:o,user:i,password:d,database:a}},cachePolicy_UNSTABLE:{eviction:"most-recent"}}),Z=x({key:"configScaleFactor",default:V[0],effects:[J({encode:e=>e.name,decode:e=>V.find(t=>t.name===e)||V[0]})]}),Q=x({key:"simulatorEnabled",default:!0,effects:[J()]}),li=x({key:"databaseDrawerIsOpen",default:!1}),qe=Ro({key:"tickDurationMs",default:void 0}),si=Object.fromEntries([ze.map(({name:e})=>[e,!1]),xe.map(({name:e})=>[e,!1]),De.map(({name:e})=>[e,!1])].flat()),Zt=(e=!1)=>{const t=f(v);return N(["schemaObjects",t,e],()=>Vr(t),{isPaused:()=>e,refreshInterval:o=>Object.values(o||[]).some(d=>!d)?1e3:0,fallbackData:si})},O=()=>{const a=f(v),{database:e}=a,t=k(a,["database"]),o=f(Xt),i=N(["isConnected",t],()=>jr(t)),d=Zt(!i.data);return{isVapor:!!o,connected:!!i.data,initialized:!!i.data&&Object.values(d.data||[]).every(Boolean),reset:()=>{i.mutate(),d.mutate()}}},pi=(()=>{let e={};return t=>(t in e||(e[t]=1),`${t}(${e[t]++})`)})(),Je=(e,{name:t,enabled:o,intervalMS:i})=>{const d=Ot(qe(t));g.exports.useEffect(()=>{if(!o)return;const a=new AbortController,n=pi(t);console.log(`Starting ${n}: tick interval: ${i}ms`);const s=async()=>{try{if(console.time(n),a.signal.aborted)return;const c=performance.now();await e(a);const p=performance.now()-c;d(p),setTimeout(s,Math.max(0,i-p))}catch(c){if(a.signal.aborted||c instanceof D&&c.isUnknownDatabase()||c instanceof DOMException&&c.name==="AbortError")return;throw c}finally{console.timeEnd(n)}};return s(),()=>{console.log(`Stopping ${n}`),a.abort()}},[o,e,i,t,d])},ui=({before:e,after:t,includeSeedData:o})=>{const i=f(v),d=f(Z),{reset:a}=O(),[n,s]=z(Q),c=Ct(),p=f(ai);return g.exports.useCallback(async()=>{const u=n;s(!1),e(),await $r(i,{progress(y,m){const E="reset-schema";c.isActive(E)?c.update(E,{title:y,status:m,duration:m==="success"?2e3:null,isClosable:!0}):c({id:E,title:y,status:m,duration:null})},scaleFactor:d,includeSeedData:o,skipCreate:!!p}),t(),a(),s(u)},[n,s,e,i,d,o,p,t,a,c])},Qt=(e,t)=>{const[o,i]=g.exports.useState(e);return g.exports.useEffect(()=>{const d=setTimeout(()=>i(e),t);return()=>clearTimeout(d)},[e,t]),o},eo=()=>{const[{elapsed:e,isRunning:t},o]=g.exports.useReducer((i,d)=>{switch(d.type){case"start":return{start:Math.floor(performance.now()),isRunning:!0,elapsed:i.elapsed};case"stop":return{elapsed:Math.floor(performance.now())-(i.start||0),isRunning:!1}}},{isRunning:!1});return{elapsed:e,isRunning:t,startTimer:()=>o({type:"start"}),stopTimer:()=>o({type:"stop"})}},to=(e,t)=>{let o=!1,i=new Ao(0,0),d=0;e.on("pointerdown",a=>{o=!0,i=a.data.global,d=performance.now()}),e.on("pointerup",a=>{if(!o||(o=!1,performance.now()-d>200))return;const s=a.data.global;Math.sqrt(Math.pow(s.x-i.x,2)+Math.pow(s.y-i.y,2))>10||t(a)}),e.on("pointercancel",()=>{o=!1})};class yi extends q{constructor(t,o){super();S(this,"gfx");S(this,"hover",!1);this.city=t,this.onRemove=o,this.gfx=new _e,this.addChild(this.gfx),this.gfx.interactive=!0,this.gfx.on("pointerover",()=>{this.hover=!0}),this.gfx.on("pointerout",()=>{this.hover=!1}),to(this.gfx,()=>o(this.city))}update(t){this.gfx.clear(),this.gfx.lineStyle(1,this.hover?16711680:306687,1),this.gfx.beginFill(this.hover?16711680:306687,.2);const[o,i]=t([this.city.centerLat,this.city.centerLon]);this.gfx.drawCircle(o,i,25),this.gfx.endFill()}}const gi=e=>{const t=f(v),{initialized:o}=O();return N(["cities",t,o],()=>ti(t),{isPaused:()=>!o,onSuccess:e})},fi=({scene:e,latLngToPixel:t,pixelToLatLng:o,width:i,height:d})=>{const a=f(v),n=Rt(()=>new q),{mutate:s}=gi(u=>{n.removeChildren();for(let y=0;y<u.length;y++)n.addChild(new yi(u[y],p))}),c=g.exports.useCallback(async(u,y)=>{const m=await oi(a,y,u),E={id:m.id,name:m.name,lonlat:[m.centerLon,m.centerLat],diameter:m.diameter};await Ft(a,E),await lt(a,E,V[0]),s()},[a,s]),p=g.exports.useCallback(async u=>{await Or(a,u.id),s()},[a,s]);return{setup:g.exports.useCallback(()=>{const u=new q;e.addChild(u),e.addChild(n),u.interactive=!0,u.hitArea=new Oo(0,0,i,d),to(u,y=>{const[m,E]=o([y.data.global.x,y.data.global.y]);c(m,E)})},[n,d,c,o,e,i]),update:g.exports.useCallback(()=>{for(let u=0;u<n.children.length;u++)n.children[u].update(t)},[n,t])}},mi=e=>r(ke,_(h({},e),{useRenderer:fi,options:{},cursor:"pointer"})),vi=Co({a:o=>{var i=o,{children:e}=i,t=k(i,["children"]);const{href:d}=t,a=!!(d!=null&&d.startsWith("http"));return a?l(W,_(h({isExternal:a},t),{children:[e,r(Io,{bottom:"2px",boxSize:"0.9em",position:"relative",ml:1})]})):r(W,_(h({to:d||""},t),{as:It,children:e}))}}),T=o=>{var i=o,{children:e}=i,t=k(i,["children"]);return r(wo,_(h({},t),{skipHtml:!0,components:vi,children:Array.isArray(e)?e.filter(d=>d).map(d=>j(d||"")).join(`

`):j(e)}))},bi=()=>l(K,{maxW:"container.lg",mt:10,mb:"30vh",children:[r(K,{maxW:"container.md",mb:10,children:r(T,{children:`
            ## Admin

            You can configure cities and offers on this page. To learn more
            about this application please visit the [Overview page](/).
          `})}),r(hi,{})]}),hi=()=>l(A,{children:[r(K,{maxW:"container.md",mb:4,children:r(T,{children:`
            #### Cities

            You can create and remove cities by interacting with the map below.
            Click anywhere to define a new city, or click an existing city to
            remove it.
          `})}),r(mi,{defaultZoom:4,defaultCenter:[39.716470511656766,-99.59395661915288],height:300})]}),oo=()=>{const e=Ot(Q);return l(ge,{status:"warning",borderRadius:"md",children:[r(fe,{}),r(me,{children:"The simulator is disabled"}),r(R,{position:"absolute",right:4,top:3,size:"xs",colorScheme:"blue",onClick:()=>e(!0),children:"Enable simulator"})]})},Nt=e=>{const{r:t,g:o,b:i}=e.rgb();return t<<16|o<<8|i};class Ei extends q{constructor(t){super();S(this,"points");S(this,"polygon");S(this,"hovering",!1);this.config=t,this.points=Nr(t.wktPolygon),this.polygon=new _e,this.addChild(this.polygon),this.polygon.interactive=!0,this.polygon.on("mouseover",()=>{this.hovering=!0}),this.polygon.on("mouseout",()=>{this.hovering=!1})}update(t){const o=this.hovering?this.config.hoverColor:this.config.color;this.polygon.clear(),this.polygon.lineStyle(1,Nt(o),.5),this.polygon.beginFill(Nt(o),.2),this.polygon.drawPolygon(this.points.flatMap(([i,d])=>t([d,i]))),this.polygon.endFill()}}const _i=e=>({scene:t,latLngToPixel:o,bounds:i})=>{const d=Qt(i,100);return e.useCells(d,a=>{t.removeChildren();for(const n of a)t.addChild(new Ei(e.getCellConfig(n)))}),{update:g.exports.useCallback(()=>{for(let a=0;a<t.children.length;a++)t.children[a].update(o)},[o,t])}},ro=e=>{const a=e,{useCells:t,getCellConfig:o}=a,i=k(a,["useCells","getCellConfig"]),d=g.exports.useMemo(()=>_i({useCells:t,getCellConfig:o}),[o,t]);return r(ke,_(h({},i),{useRenderer:d,options:{}}))},Ti=10*1e3,gt=e=>{const t=f(v),o=f(Z),{initialized:i}=O(),d=g.exports.useCallback(a=>{const n=_(h({},t),{ctx:a});return Promise.all([Vt(n,o),qr(n),Jr(n),Zr(n,o),$t(n)])},[t,o]);Je(d,{name:"SimulatorMonitor",enabled:i&&e,intervalMS:Ti})},Si=1*1e3,Ni=10*1e3,io=e=>{const t=f(v),{initialized:o}=O(),i=g.exports.useRef(new Date(0).toISOString()),d=g.exports.useCallback(n=>st(_(h({},t),{ctx:n}),"minute"),[t]);Je(d,{name:"SimulatorMatcher",enabled:o&&e,intervalMS:Si});const a=g.exports.useCallback(async n=>{i.current=await pt(_(h({},t),{ctx:n}),i.current)},[t]);Je(a,{name:"SimulatorUpdateSegments",enabled:o&&e,intervalMS:Ni})},Xe=ne(",.2%"),ie=ne(".4~s"),Ri=()=>{const{initialized:e}=O(),t=f(Q);return gt(t),io(t),r(K,{maxW:"container.lg",mt:10,mb:"30vh",children:e?t?l(F,{gap:10,children:[r(Ai,{}),r(Oi,{}),r(wi,{})]}):r(oo,{}):r(ao,{})})},ao=()=>r(P,{children:r(M,{size:"xl",speed:"0.85s",thickness:"3px",emptyColor:"gray.200",color:"blue.500"})}),Ai=()=>{var d,a;const e=f(v),t=N(["overallConversionRateRequests",e],()=>St(e,"requests"),{refreshInterval:1e3}),o=N(["overallConversionRatePurchases",e],()=>St(e,"purchases"),{refreshInterval:1e3}),i=N(["analyticsTableCounts",e],()=>Pe(e,"offers","subscribers","notifications"),{refreshInterval:1e3});return!i.data||!t.data||!o.data?r(ao,{}):l(Ae,{spacing:2,minChildWidth:"150px",flex:2,children:[l(C,{children:[r(I,{children:"Offers"}),r(w,{children:ie(i.data.offers)})]}),l(C,{children:[r(I,{children:"Subscribers"}),r(w,{children:ie(i.data.subscribers)})]}),l(C,{children:[r(I,{children:"Notifications"}),r(w,{children:ie(i.data.notifications)})]}),l(C,{children:[r(I,{children:"Conversion Rate"}),r(w,{children:Xe(((d=t.data)==null?void 0:d.conversionRate)||0)}),r(vt,{children:"Requests"})]}),l(C,{children:[r(I,{children:"Conversion Rate"}),r(w,{children:Xe(((a=o.data)==null?void 0:a.conversionRate)||0)}),r(vt,{children:"Purchases"})]})]})},Oi=()=>{var a;const e=f(v),[t,o]=g.exports.useState("conversionRate"),i=N(["customerMetrics",e,t],()=>ri(e,"purchases",t,10),{refreshInterval:1e3}),d=Te("blue.500","blue.200");return r(L,{overflowX:"auto",children:l(Lo,{size:"sm",colorScheme:"gray",variant:"striped",children:[r(ko,{children:l(bt,{children:[l(se,{onClick:()=>o("customer"),_hover:{color:d},color:t==="customer"?d:void 0,cursor:"pointer",children:["Customer",t==="customer"&&r(oe,{})]}),l(se,{onClick:()=>o("totalNotifications"),_hover:{color:d},color:t==="totalNotifications"?d:void 0,isNumeric:!0,cursor:"pointer",children:["Total Notifications",t==="totalNotifications"&&r(oe,{})]}),l(se,{onClick:()=>o("totalConversions"),_hover:{color:d},color:t==="totalConversions"?d:void 0,isNumeric:!0,cursor:"pointer",children:["Total Conversions",t==="totalConversions"&&r(oe,{})]}),l(se,{onClick:()=>o("conversionRate"),_hover:{color:d},color:t==="conversionRate"?d:void 0,isNumeric:!0,cursor:"pointer",children:["Conversion Rate",t==="conversionRate"&&r(oe,{})]})]})}),r(Do,{children:(a=i.data)==null?void 0:a.map(n=>l(bt,{children:[r(pe,{children:n.customer}),r(pe,{isNumeric:!0,children:ie(n.totalNotifications)}),r(pe,{isNumeric:!0,children:ie(n.totalConversions)}),r(pe,{isNumeric:!0,children:Xe(n.conversionRate)})]},n.customer))})]})})},Ci=(e,t)=>{const o=f(v);N(["zoneMetrics",o,e],()=>ii(o,e,"purchases"),{refreshInterval:1e3,onSuccess:t})},Ii=e=>$e(xo(e))||$e(0,0,0),wi=()=>l(F,{direction:["column","row"],alignItems:"top",children:[r(L,{flex:1,children:r(T,{children:`
            ### Conversion Map

            This map shows the total conversion rate for all offers in each
            notification zone. Each polygon is colored based on the rate.
          `})}),r(L,{flex:2,children:r(ro,{height:400,defaultZoom:14,useCells:Ci,getCellConfig:({conversionRate:e,wktPolygon:t})=>{const o=Ii(e);return{color:o,hoverColor:o.brighter(1),wktPolygon:t}}})})]}),ue=({label:e,placeholder:t,value:o,setValue:i,helpText:d,type:a="text"})=>l(Qe,{children:[r(et,{mb:1,fontSize:"xs",fontWeight:"bold",textTransform:"uppercase",children:e}),r(wt,{size:"sm",placeholder:t,value:o,onChange:n=>i(n.target.value),type:a}),d?r(zo,{fontSize:"xs",children:d}):null]}),Li=()=>{const[e,t]=z(Z);return l(Qe,{children:[r(et,{mb:1,fontSize:"xs",fontWeight:"bold",textTransform:"uppercase",children:"Scale Factor"}),r(Po,{size:"sm",required:!0,value:e.name,onChange:o=>{const i=o.target.value;t(di(i))},children:V.map(o=>r("option",{value:o.name,children:o.name},o.name))})]})},no=({showDatabase:e,showScaleFactor:t})=>{const[o,i]=z(Kt),[d,a]=z(qt),[n,s]=z(Jt),[c,p]=z(X);return l(F,{spacing:4,children:[r(ue,{label:"Host & Port",placeholder:"http://127.0.0.1:8808",value:o,setValue:i,helpText:r(T,{children:`
              The protocol (http, https), host, and port for the SingleStore
              [HTTP API][1].

              [1]: https://docs.singlestore.com/docs/http-api/
            `})}),l(Ae,{columns:2,gap:2,children:[r(ue,{label:"Username",placeholder:"admin",value:d,setValue:a}),r(ue,{label:"Password",placeholder:"",value:n,setValue:s,type:"password"}),e&&r(ue,{label:"Database",placeholder:"martech",value:c,setValue:p}),t&&r(Li,{})]})]})},co=e=>r(R,_(h({onClick:()=>{const{pathname:t,hash:o}=window.location;window.location.replace(t+o)},colorScheme:"red"},e),{children:"Disconnect"})),lo=e=>{const{connected:t,initialized:o}=O(),i=tt(),[d,a]=Oe(),n=f(X),s=ae.useRef(null),m=e,{skipSeedData:c,disabled:p}=m,u=k(m,["skipSeedData","disabled"]),y=ui({before:g.exports.useCallback(()=>a.on(),[a]),after:g.exports.useCallback(()=>{a.off(),i.onClose()},[i,a]),includeSeedData:!c});return l(A,{children:[r(R,h({disabled:!t||p,onClick:i.onOpen,colorScheme:o?"green":"red"},u)),r(Mo,{isOpen:i.isOpen,onClose:i.onClose,closeOnEsc:!1,closeOnOverlayClick:!1,leastDestructiveRef:s,children:r(ot,{children:l(Uo,{children:[l(rt,{fontSize:"lg",fontWeight:"bold",children:[o?"Reset":"Setup"," database ",n]}),l(it,{children:["This will ",o?"recreate":"create"," the database called ",n,". Are you sure?"]}),l(Lt,{children:[r(R,{ref:s,onClick:i.onClose,disabled:d,children:"Cancel"}),r(R,{disabled:d,colorScheme:o?"red":"green",onClick:y,ml:3,children:d?r(M,{}):o?"Recreate database":"Create database"})]})]})})})]})},ki=({isOpen:e,onClose:t,finalFocusRef:o})=>{const[i,d]=z(Q),a=f(v),{connected:n,initialized:s,isVapor:c}=O(),p=tt(),[u,y]=Oe(!1),m=g.exports.useCallback(async()=>{y.on(),await Wt(a),y.off()},[a,y]);return l(Bo,{isOpen:e,placement:"right",onClose:t,finalFocusRef:o,children:[r(ot,{}),l(Fo,{children:[r(kt,{}),r(rt,{children:"Config"}),r(it,{children:l(F,{spacing:4,children:[c?null:r(no,{showScaleFactor:!0,showDatabase:!0}),l(ge,{status:n?"success":"error",borderRadius:"md",children:[r(fe,{}),r(me,{children:n?"connected":"disconnected"}),c?r(co,{position:"absolute",right:4,top:3,size:"xs"}):null]}),l(ge,{status:s?"success":"warning",borderRadius:"md",children:[r(fe,{}),r(me,{children:"schema"}),r(lo,{position:"absolute",right:4,top:3,size:"xs",children:s?"Reset":"Setup"})]}),l(ge,{status:i?"success":"warning",borderRadius:"md",children:[r(fe,{}),r(me,{children:"simulator"}),r(Go,{position:"absolute",right:4,top:3.5,size:"md",colorScheme:i?"green":"red",isChecked:i,disabled:!n||!s,onChange:()=>d(!i)})]}),l(ce,{onClick:p.onToggle,fontSize:"xs",textAlign:"center",cursor:"pointer",children:["Advanced",p.isOpen?r(Yo,{ml:2}):r(oe,{ml:2})]}),p.isOpen?r(R,{size:"xs",_hover:{colorScheme:"red"},onClick:m,disabled:u,children:"Drop Database"}):void 0]})}),r(Lt,{})]})]})},ye=({to:e,children:t,onClick:o})=>{const i=qo(e),d=Jo({path:i.pathname,end:!0});return r(W,{as:It,to:e,px:2,py:1,onClick:o,rounded:"md",_hover:{textDecoration:"none",bg:Te("gray.300","gray.600")},fontWeight:d?"bold":"normal",href:"#",color:Te("gray.700","gray.200"),children:t})},Di=()=>{const{colorMode:e,toggleColorMode:t}=Ce(),o=tt(),[i,d]=z(li),a=ae.useRef(null),{connected:n,initialized:s}=O(),c=f(Q),[p]=Dt("(max-width: 640px)"),u=l(A,{children:[r(ye,{to:"/",onClick:o.onClose,children:"Overview"}),r(ye,{to:"/map",onClick:o.onClose,children:"Map"}),r(ye,{to:"/admin",onClick:o.onClose,children:"Admin"}),r(ye,{to:"/analytics",onClick:o.onClose,children:"Analytics"})]});let y;return p||(y=n?s?c?"connected":"simulator disabled":"needs schema":"disconnected"),r(A,{children:r(L,{bg:Te("gray.200","gray.700"),children:l(K,{maxW:"container.lg",children:[l(Se,{h:16,alignItems:"center",justifyContent:"space-between",children:[r(He,{size:"md",icon:o.isOpen?r(Ho,{}):r(Wo,{}),"aria-label":"Open Menu",display:{md:"none"},onClick:o.isOpen?o.onClose:o.onOpen}),l(Ne,{spacing:8,alignItems:"center",children:[r(Ie,{as:"h1",size:p?"sm":"md",children:p?"Martech":"Realtime Digital Marketing"}),r(Ne,{as:"nav",spacing:4,display:{base:"none",md:"flex"},children:u})]}),l(Se,{alignItems:"center",gap:2,children:[l(R,{size:"sm",ref:a,onClick:()=>d(!0),colorScheme:n?s&&c?"green":"yellow":"red",children:[s?r(xt,{}):r(zt,{}),p||r(ce,{pl:2,children:y})]}),r(He,{"aria-label":"Github Repo",size:"sm",icon:e==="light"?r(jo,{size:"1.4em"}):r(Vo,{size:"1.4em"}),onClick:()=>window.open("https://github.com/singlestore-labs/demo-realtime-digital-marketing","_blank")}),r(He,{"aria-label":"Toggle Color Mode",size:"sm",onClick:t,icon:e==="light"?r($o,{boxSize:"1.2em"}):r(Ko,{boxSize:"1.2em"})})]})]}),o.isOpen?r(L,{pb:4,display:{md:"none"},children:r(F,{as:"nav",spacing:4,children:u})}):null,r(ki,{isOpen:i,onClose:()=>d(!1),finalFocusRef:a})]})})})},xi=e=>{const t=g.exports.useRef([]),{data:o}=N(["timeseries",e.name,...e.deps||[]],async()=>{const i=await e.fetcher();return t.current.push({data:i,ts:new Date}),t.current=t.current.slice(-e.limit),t.current},{refreshInterval:e.intervalMS});return o||[]},zi=ne("~s"),so=(e,...t)=>xi({name:"estimatedRowCount",deps:t,fetcher:g.exports.useCallback(()=>Pe(e,...t),[e,t]),limit:30,intervalMS:1e3}),po=o=>{var i=o,{data:e}=i,t=k(i,["data"]);const{colorMode:d}=Ce(),a=g.exports.useCallback(({tooltipData:c,colorScale:p})=>!p||!c?null:Object.keys(c.datumByKey).sort((u,y)=>c.datumByKey[y].datum.data[y]-c.datumByKey[u].datum.data[u]).map(u=>{const{datum:y}=c.datumByKey[u],m=y.data[u];return l(ce,{mb:1,color:p(u),fontSize:"sm",children:[u,": ",ne(".4~s")(m)]},u)}),[]),n=g.exports.useCallback(c=>zi(c).replace("G","B"),[]);if(e.length<2)return r(P,{height:t.height,children:r(M,{size:"md"})});const s=e.length>0?Object.keys(e[0].data).filter(c=>c!=="ts").map(c=>r(Xo,{dataKey:c,data:e,xAccessor:p=>p==null?void 0:p.ts,yAccessor:p=>p==null?void 0:p.data[c]},c)):null;return l(Zo,_(h({xScale:{type:"time"},yScale:{type:"sqrt",nice:!0,zero:!1,clamp:!0},theme:d==="light"?Qo:er,margin:{left:0,right:50,top:10,bottom:40}},t),{children:[r(ht,{orientation:"bottom",numTicks:5,label:"time",labelOffset:10}),r(ht,{orientation:"right",numTicks:t.height<250?3:5,tickFormat:n,label:"rows",labelOffset:20}),s,r(tr,{showVerticalCrosshair:!0,detectBounds:!1,offsetLeft:-175,offsetTop:20,renderTooltip:a})]}))},Ze=1e3,he=60*Ze,Ee=60*he,je=24*Ee,B=e=>e.toLocaleString(void 0,{maximumFractionDigits:2}),$=e=>e?e<Ze?`${B(e)}ms`:e<he?`${B(e/Ze)}s`:e<Ee?`${Math.floor(e/he)}m${$(e%he)}`:e<je?`${Math.floor(e/Ee)}h${$(e%Ee)}`:`${Math.floor(e/je)}d${$(e%je)}`:"0s",Pi=100,Mi=1e3,H=class extends q{constructor(t){super();S(this,"latlng");S(this,"age",0);S(this,"marker");S(this,"pulse");this.latlng=t,this.marker=new _e,this.marker.beginFill(H.markerColor).drawCircle(0,0,5).endFill(),this.addChild(this.marker),this.pulse=new _e,this.pulse.beginFill(H.pulseColor),this.pulse.drawTorus&&this.pulse.drawTorus(0,0,4,6),this.pulse.endFill(),this.addChild(this.pulse)}update(t,o){if(this.age+=o/60,this.age>H.lifetime&&this.parent){this.parent.removeChild(this);return}const i=this.age%H.lifetime/H.lifetime,d=dr(i);this.pulse.scale.set(1+d);const a=.4,n=i<a?or(i/a):1-rr((i-a)/(1-a));this.pulse.alpha=n,i<a?this.marker.alpha=n:this.marker.alpha=1-ir((i-a)/(1-a));const[s,c]=t(this.latlng);this.x=s,this.y=c}};let re=H;S(re,"lifetime",1.5),S(re,"markerColor",306687),S(re,"pulseColor",306687);const uo=()=>{const e=f(v),{initialized:t}=O();return g.exports.useMemo(()=>["notifications",e,t],[e,t])},yo=({scene:e,latLngToPixel:t,bounds:o})=>{const i=g.exports.useRef(new Date().toISOString()),d=f(v),{initialized:a}=O(),n=Qt(o,50),s=uo();return N(s,()=>Qr(d,i.current,Pi,n),{refreshInterval:Mi,isPaused:()=>!a,onSuccess:c=>{if(c.length>0){i.current=c[0][0];for(const[,p,u]of c)e.addChild(new re([u,p]))}}}),{update:g.exports.useCallback(c=>{for(let p=e.children.length-1;p>=0;p--)e.children[p].update(t,c)},[t,e])}},Ui=()=>{const e=f(v),t=so(e,"locations","requests","purchases","notifications","subscriber_segments"),o=N(["notificationsMapTableCounts",e],()=>Pe(e,"offers","subscribers","cities","segments"),{refreshInterval:1e3}),i=f(qe("SimulatorMatcher")),d=f(qe("SimulatorUpdateSegments")),a=ne(".4~s"),n=o.data?l(Ae,{spacing:2,minChildWidth:"120px",children:[l(C,{children:[r(I,{children:"Offers"}),r(w,{children:a(o.data.offers)})]}),l(C,{children:[r(I,{children:"Cities"}),r(w,{children:a(o.data.cities)})]}),l(C,{children:[r(I,{children:"Subscribers"}),r(w,{children:a(o.data.subscribers)})]}),l(C,{children:[r(I,{children:"Segments"}),r(w,{children:a(o.data.segments)})]}),l(C,{children:[r(I,{children:"Segmentation"}),r(w,{children:$(d)})]}),l(C,{children:[r(I,{children:"Matching"}),r(w,{children:$(i)})]})]}):null;return l(A,{children:[r(T,{children:`
          The map on this page displays notifications as they are delivered to
          subscribers in realtime. Below, you will find some key statistics
          about the demo.
        `}),n,l(L,{children:[r(ce,{fontSize:"sm",fontWeight:"medium",children:"Row count / time"}),r(po,{data:t,height:150})]})]})},Bi=()=>{const e=f(Q);return gt(e),io(e),l(Se,{gap:4,justifyContent:"space-between",direction:["column","column","row"],height:"100%",children:[r(F,{spacing:4,flex:"2 2 0",minHeight:"200px",maxHeight:"100%",children:r(ke,{useRenderer:yo,options:{}})}),l(F,{spacing:4,flex:"1 1 0",minWidth:"0",children:[r(T,{children:`

            This application is a demo of how to use SingleStore to serve ads to
            users based on their behavior and realtime location. The demo is
            based on location, purchase, and request history from millions of
            simulated subscribers for a hypothetical service company. To learn
            about how this works please visit the [overview page](/).
          `}),e?r(Ui,{}):r(oo,{})]})]})},go=o=>{var i=o,{children:e}=i,t=k(i,["children"]);return r(ar,_(h({as:"pre",borderRadius:"md",overflow:"auto",display:"block",px:6,py:4,minW:0},t),{children:e}))},Fi=1e3,Gi=(e,t)=>{const o=f(v),{initialized:i}=O();N(["offers",o,i,e],()=>ei(o,Fi,e),{isPaused:()=>!i,onSuccess:t})},Yi=e=>r(ro,_(h({},e),{useCells:Gi,getCellConfig:t=>{const o=$e(4,173,255);return{color:o,hoverColor:o.brighter(1),wktPolygon:t.notificationZone}}})),G=e=>{const{completed:t,title:o,left:i,right:d}=e,{colorMode:a}=Ce(),n=a==="light"?".300":".500",s=t?"gray"+n:void 0,c=(t?"green":"gray")+n;return l(A,{children:[l(Re,{children:[l(Ie,{as:"h2",size:"lg",mb:4,color:s,children:[r(xt,h({color:c},{boxSize:6,position:"relative",bottom:.5,mr:2})),o]}),i]}),r(Re,{children:d})]})},Hi=({connected:e,isVapor:t})=>t?r(G,{completed:e,title:"Connected",left:l(A,{children:[r(T,{children:`
                Connected to a demo cluster running in the SingleStore Managed
                Service. To disconnect and use your own cluster instead, click
                the button below.
              `}),r(co,{size:"xs",colorScheme:"gray"})]}),right:null}):r(G,{completed:e,title:"Connect to SingleStore",left:r(T,{children:`
            This demo requires a connection to SingleStore's HTTP API. Please
            ensure the connection details on the right are correct.
            
            **Note**: The HTTP API may need to be enabled on your SingleStore
            cluster. To do so please see [our documentation][1] or contact
            support for assistance.
            
            [1]: https://docs.singlestore.com/docs/http-api/
          `}),right:r(no,{})}),Wi=({onClose:e,schemaObjectName:t})=>{const o=Wr(t),[i]=Dt("(max-width: 640px)");return l(sr,{isOpen:!0,onClose:e,size:i?"full":"4xl",scrollBehavior:"inside",children:[r(ot,{}),l(pr,{children:[l(rt,{children:["Create statement for ",o.name]}),r(kt,{}),r(it,{children:r(go,{mb:4,children:o.createStmt})})]})]})},ji=({initialized:e})=>{const[t,o]=z(X),i=Zt(),{colorMode:d}=Ce(),[a,n]=g.exports.useState(),s=g.exports.useCallback(p=>n(p),[]),c=g.exports.useCallback(()=>n(null),[]);return l(A,{children:[!!a&&r(Wi,{onClose:c,schemaObjectName:a}),r(G,{completed:e,title:"Setup the schema",left:l(A,{children:[r(T,{children:`
                Our schema includes the database and a set of tables and views we
                need to store all of our data. Use the controls below to set the
                database name and create the schema.
              `}),r(cr,{mt:4,mb:6}),l(Ne,{alignItems:"flex-end",children:[l(Qe,{flex:1,children:[r(et,{fontSize:"xs",fontWeight:"bold",textTransform:"uppercase",children:"Database name"}),r(wt,{placeholder:"martech",value:t,size:"sm",onChange:p=>o(p.target.value)})]}),r(L,{flex:1,textAlign:"center",children:r(lo,{colorScheme:"blue",size:"sm",disabled:e,skipSeedData:!0,children:e?"Schema is setup":"Setup schema"})})]})]}),right:r(Ae,{columns:[1,2,2],gap:1,children:Object.keys(i.data||{}).sort().map(p=>{var u;return r(Re,{bg:((u=i.data)!=null&&u[p]?"green":"gray")+(d==="light"?".200":".600"),color:d==="light"?"gray.800":"gray.100",textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden",borderRadius:"md",px:2,py:1,textAlign:"center",_hover:{fontWeight:"bold"},cursor:"pointer",onClick:()=>s(p),children:p},p)})})})]})},fo=(e,t,o=!0)=>{var a;const i=N(["pipelineStatus",e,t],()=>jt(e,t),{isPaused:()=>!o}),d=(a=i.data)!=null&&a.length?i.data.every(n=>!n.needsUpdate):!1;return{pipelines:i,completed:d}},Vi=()=>{const e=f(v),t=f(Z),{pipelines:o,completed:i}=fo(e,t);gt(i);const[d,a]=Oe(),n=g.exports.useCallback(async()=>{a.on(),await Vt(e,t),o.mutate(),a.off()},[a,e,t,o]),s=so(e,"locations","requests","purchases"),c=s.length<2||s.every(({data:u})=>u.locations+u.purchases+u.requests===0);return r(G,{completed:i,title:"Ingest data",left:r(T,{children:`
            The demo needs to load location, request, and purchase history from
            simulated subscribers in real time. We will simulate these streams
            using [SingleStore Pipelines][1] to ingest data from [AWS S3][2].

            [1]: https://docs.singlestore.com/managed-service/en/load-data/about-loading-data-with-pipelines/pipeline-concepts/overview-of-pipelines.html
            [2]: https://aws.amazon.com/s3/
          `}),right:c||!i?r(P,{h:220,children:l(R,{colorScheme:"blue",size:"sm",onClick:n,disabled:i,children:[(d||i)&&r(M,{mr:2}),d?"Creating Pipelines":i?"...waiting for data":"Create pipelines"]})}):r(po,{data:s,height:200})})},Me=(e,t=!0)=>N(["overviewTableCounts",e],()=>Pe(e,"locations","notifications","offers","purchases","requests","segments","subscriber_segments","subscribers"),{isPaused:()=>!t}),$i=()=>{var s,c;const e=f(v),t=f(Z),[o,i]=Oe(),d=Me(e),a=g.exports.useCallback(async()=>{i.on(),await lt(e,de,t),d.mutate(),i.off()},[e,t,d,i]),n=!!((s=d.data)!=null&&s.offers);return r(G,{completed:n,title:"Offers",left:r(A,{children:l(T,{children:[`
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
                boundary. There are ${(c=d.data)==null?void 0:c.offers} offers in the
                database.
            `]})}),right:n?r(Yi,{height:300,defaultZoom:13}):r(P,{h:"100%",children:l(R,{onClick:a,disabled:o,children:[o&&r(M,{mr:2}),o?"loading...":n?"loaded offers!":"load offers"]})})})},Ki=({done:e,setDone:t})=>{const o=f(v),i=g.exports.useRef(new Date().toISOString());return g.exports.useEffect(()=>{if(e)return;const d=new AbortController,a=_(h({},o),{ctx:d});return(async()=>{try{for(let n=0;n<10;n++)if(i.current=await pt(a,i.current),await st(a,"second"),n>1&&!await $t(a))return}catch(n){if(d.signal.aborted||n instanceof DOMException&&n.name==="AbortError")return;throw n}})().then(()=>t(!0)),()=>{d.abort()}},[o,e,t]),e?null:r(Re,{colSpan:[1,1,2],children:l(P,{w:"100%",h:"200px",color:"gray.500",children:[r(M,{size:"md",mr:4}),r(Ie,{size:"md",children:"Warming up queries..."})]})})},qi=()=>{var u;const e=f(v),t=Me(e),{elapsed:o,isRunning:i,startTimer:d,stopTimer:a}=eo(),n=g.exports.useRef(new Date().toISOString()),s=!!((u=t.data)!=null&&u.subscriber_segments),c=g.exports.useCallback(async()=>{d(),n.current=await pt(e,n.current),a(),t.mutate()},[e,t,d,a]);let p;if(o&&t.data){const{segments:y,subscriber_segments:m,locations:E,requests:Y,purchases:ee}=t.data,Ue=$(o),Be=B(E+Y+ee),Fe=B(y),Ge=B(m);p=r(T,{children:`
          The last update evaluated ${Be} rows against ${Fe} segments
          producing ${Ge} segment memberships.
          
          **This process took ${Ue}**.
        `})}return r(G,{completed:s,title:"Segmentation",left:r(T,{children:`
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
          `}),right:r(P,{h:"100%",children:l(Pt,{gap:4,textAlign:"center",children:[l(R,{disabled:i,onClick:c,children:[i&&r(M,{mr:2}),i?"...running":"Match subscribers to segments"]}),p]})})})},Ji=()=>{var E;const e=f(v),t=Me(e),o=uo(),{mutate:i}=lr(),{elapsed:d,isRunning:a,startTimer:n,stopTimer:s}=eo(),[c,p]=g.exports.useState(0),u=!!((E=t.data)!=null&&E.notifications),y=g.exports.useCallback(async()=>{let Y=0,ee=0;for(;Y===0&&ee++<10;)n(),Y=await st(e,"second");s(),p(Y),t.mutate(),i(o)},[e,n,s,t,i,o]);let m;if(d&&t.data){const{offers:Y,subscribers:ee,subscriber_segments:Ue,notifications:Be}=t.data,Fe=B(Y*ee+Be),Ge=B(Ue),mo=$(d),vo=B(c);m=r(T,{children:`
          The last update evaluated up to ${Fe} notification opportunities
          against ${Ge} segment memberships generating ${vo}
          notifications. This process took ${mo}.
        `})}return r(G,{completed:u,title:"Matching",left:r(T,{children:`
            Now that we have offers and have assigned subscribers to segments,
            we are finally able to deliver ads to subscribers as push
            notifications. In this demo, rather than actually sending
            notifications we will insert them into a table called
            "notifications".

            Click the button to generate notifications interactively, or run the
            following query in your favorite SQL client:

                select * from match_offers_to_subscribers("second");
          `}),right:r(P,{h:"100%",children:l(Pt,{gap:4,w:"100%",children:[l(R,{disabled:a,onClick:y,children:[a&&r(M,{mr:2}),a?"...running":"Generate notifications"]}),r(L,{width:"100%",children:r(ke,{height:250,defaultZoom:12,useRenderer:yo,options:{}})}),m]})})})},Xi=()=>{const e=f(X);return r(G,{completed:!0,title:"Putting it all together",left:r(T,{children:`
            Nice job! At this point you are ready to step into the shoes of a
            data engineer. Here are some recommendations on what to do next:

            * Visit the [live demo dashboard][1]
            * Explore the ${e} database in SingleStore Studio

            [1]: map
          `}),right:null})},Zi=()=>{const e=f(v),t=f(Z),{connected:o,initialized:i,isVapor:d}=O(),{completed:a}=fo(e,t,o&&i),{data:n}=Me(e,o&&i),[s,c]=g.exports.useState(!1),p=[{completed:o,component:r(Hi,{connected:o,isVapor:d},"connection")},{completed:i,component:r(ji,{initialized:i},"schema")},{completed:a,component:r(Vi,{},"pipelines")},{completed:n?n.offers>0:!1,component:r($i,{},"offers")},{completed:s,component:r(Ki,{done:s,setDone:c},"warmup")},{completed:n?n.subscriber_segments>0:!1,component:r(qi,{},"segmentation")},{completed:n?n.notifications>0:!1,component:r(Ji,{},"matching")},{completed:!0,component:r(Xi,{},"summary")}];let u=!0;const y=[];for(const{completed:m,component:E}of p)if(u)y.push(E),u=m;else break;return l(K,{maxW:"container.lg",mt:10,mb:"30vh",children:[r(L,{maxW:"container.md",mb:10,px:0,children:r(T,{children:`
            ## Realtime Digital Marketing

            This application is a demo of how to use [SingleStore][3] to serve ads to
            users based on their behavior and realtime location. The demo is
            based on location, purchase, and request history from millions of
            simulated subscribers for a hypothetical service company.

            This page will take you through the process of setting up the demo,
            explaining everything as we go. If you have any questions or issues,
            please file an issue on the [GitHub repo][1] or our [forums][2].

            [1]: https://github.com/singlestore-labs/demo-realtime-digital-marketing
            [2]: https://www.singlestore.com/forum/
            [3]: https://www.singlestore.com
          `})}),r(nr,{columnGap:6,rowGap:10,templateColumns:["minmax(0, 1fr)",null,"repeat(2, minmax(0, 1fr))"],children:y})]})};function Qi(){const e=r(P,{height:"100vh",children:r(M,{size:"xl",speed:"0.85s",thickness:"3px",emptyColor:"gray.200",color:"blue.500"})});return r(g.exports.Suspense,{fallback:e,children:l(Se,{height:"100vh",direction:"column",children:[r(Di,{}),r(L,{m:4,flex:"1",children:l(ur,{children:[r(te,{path:"/",element:r(Zi,{})}),r(te,{path:"/map",element:r(Bi,{})}),r(te,{path:"/admin",element:r(bi,{})}),r(te,{path:"/analytics",element:r(Ri,{})}),r(te,{path:"*",element:r(yr,{to:"/",replace:!0})})]})})]})})}class ed extends ae.Component{constructor(){super(void 0);S(this,"state",{});this.handlePromiseRejection=this.handlePromiseRejection.bind(this)}componentDidMount(){window.addEventListener("unhandledrejection",this.handlePromiseRejection)}componentWillUnmount(){window.removeEventListener("unhandledrejection",this.handlePromiseRejection)}handlePromiseRejection(t){this.setState({error:t.reason})}static getDerivedStateFromError(t){return{error:t}}render(){const{error:t}=this.state;if(t){let o;return t instanceof D&&(o=l(A,{children:[r(ce,{textAlign:"center",children:"An error occurred while running the following query:"}),r(go,{children:j(t.sql)})]})),r(K,{maxW:"container.md",my:10,children:l(F,{gap:4,children:[r(P,{children:r(zt,{boxSize:20,color:"red"})}),r(Ie,{size:"xl",textAlign:"center",children:t.message}),o,l(Ne,{justify:"center",gap:4,children:[r(R,{onClick:()=>this.setState({error:void 0}),size:"sm",children:"Dismiss Error"}),r(R,{onClick:()=>window.location.reload(),size:"sm",colorScheme:"blue",leftIcon:r(gr,{}),children:"Reload"})]})]})})}return this.props.children}}const td=fr({fonts:{heading:"InterVariable, sans-serif",body:"InterVariable, sans-serif",mono:'"Source Code ProVariable", monospace'},components:{Link:{baseStyle:e=>({color:e.colorMode==="light"?"blue.600":"blue.300"})}}}),od=({children:e})=>{const t=Ct();return r(Er,{value:{onError:i=>{t({title:"An error occurred",description:i.message,status:"error",duration:5e3,isClosable:!0})}},children:e})};mr.render(r(ae.StrictMode,{children:r(vr,{theme:td,children:r(ed,{children:r(od,{children:r(br,{children:r(hr,{basename:"/",children:r(Qi,{})})})})})})}),document.getElementById("root"));
