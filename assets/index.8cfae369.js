var eo=Object.defineProperty,to=Object.defineProperties;var oo=Object.getOwnPropertyDescriptors;var ie=Object.getOwnPropertySymbols;var at=Object.prototype.hasOwnProperty,nt=Object.prototype.propertyIsEnumerable;var xe=(e,t,o)=>t in e?eo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,f=(e,t)=>{for(var o in t||(t={}))at.call(t,o)&&xe(e,o,t[o]);if(ie)for(var o of ie(t))nt.call(t,o)&&xe(e,o,t[o]);return e},T=(e,t)=>to(e,oo(t));var C=(e,t)=>{var o={};for(var r in e)at.call(e,r)&&t.indexOf(r)<0&&(o[r]=e[r]);if(e!=null&&ie)for(var r of ie(e))t.indexOf(r)<0&&nt.call(e,r)&&(o[r]=e[r]);return o};var _=(e,t,o)=>(xe(e,typeof t!="symbol"?t+"":t,o),o);import{d as ge,s as ro,_ as Me,r as g,j as i,B as x,M as io,a as p,F as R,L as B,R as oe,u as ct,C as V,A as ao,b as w,c as pt,e as no,f as v,g as L,h as lo,i as O,k as yt,P as so,l as co,G as me,q as po,E as yo,N as ut,m as uo,n as $,o as je,p as We,I as gt,t as go,S as mo,v as K,w as mt,x as N,y as Ve,z as fe,D as vo,H as $e,J as bo,K as Ke,O as Je,Q as vt,T as z,U as ho,V as fo,W as bt,X as le,Y as se,Z as ce,$ as Eo,a0 as re,a1 as _o,a2 as To,a3 as Ee,a4 as ht,a5 as Ue,a6 as ve,a7 as De,a8 as So,a9 as No,aa as be,ab as _e,ac as ft,ad as Et,ae as Ro,af as Ao,ag as Oo,ah as Io,ai as wo,aj as Co,ak as Xe,al as P,am as Lo,an as ko,ao as xo,ap as Do,aq as dt,ar as zo,as as Po,at as Mo,au as Uo,av as Bo,aw as _t,ax as H,ay as j,az as W,aA as Fo,aB as Go,aC as he,aD as Tt,aE as Yo,aF as Ho,aG as jo,aH as Wo,aI as ae,aJ as Vo,aK as $o,aL as Ko,aM as Jo,aN as Xo,aO as Zo,aP as qo,aQ as Qo}from"./vendor.b652248c.js";const er=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function o(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerpolicy&&(n.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?n.credentials="include":a.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(a){if(a.ep)return;a.ep=!0;const n=o(a);fetch(a.href,n)}};er();const tr=/^Error (?<code>\d+):/;class I extends Error{constructor(t,o,r){super(t);_(this,"code");_(this,"sql");var a;if(Object.setPrototypeOf(this,I.prototype),this.sql=o,r)this.code=r;else{const n=t.match(tr);this.code=n?parseInt(((a=n.groups)==null?void 0:a.code)||"-1",10):-1}}isUnknownDatabase(){return this.code===1049}isDatabaseRecovering(){return this.code===2269}}const St=async(e,t,...o)=>{const r=await Y(e,t,...o);if(r.length!==1)throw new I("Expected exactly one row",t);return r[0]},Y=async(e,t,...o)=>{const r=await Te("query/rows",e,t,...o);if(r.results.length!==1)throw new I("Expected exactly one result set",t);return r.results[0].rows},Nt=(e,t,...o)=>Y(T(f({},e),{database:void 0}),t,...o),Ze=async(e,t,...o)=>{const r=await Te("query/tuples",e,t,...o);if(r.results.length!==1)throw new I("Expected exactly one result set",t);return r.results[0].rows},qe=(e,t,...o)=>Te("exec",T(f({},e),{database:void 0}),t,...o),b=(e,t,...o)=>Te("exec",e,t,...o),Te=async(e,t,o,...r)=>{var d;const a=await fetch(`${t.host}/api/v1/${e}`,{method:"POST",signal:(d=t.ctx)==null?void 0:d.signal,headers:{"Content-Type":"application/json",Authorization:`Basic ${btoa(`${t.user}:${t.password}`)}`},body:JSON.stringify({sql:o,args:r,database:t.database})});if(!a.ok)throw new I(await a.text(),o);const n=await a.json();if(n.error)throw new I(n.error.message,o,n.error.code);return n};class or{constructor(t,o,r=!1){_(this,"tuples",[]);this.table=t,this.columns=o,this.replace=r}append(...t){if(t.length!==this.columns.length)throw new Error(`Expected ${this.columns.length} values, got ${t.length}`);this.tuples.push(t)}clear(){this.tuples=[]}sql(){const t=`(${this.columns.map(()=>"?").join(",")})`,o=this.tuples.map(()=>t).join(",");return ge`
      ${this.replace?"REPLACE":"INSERT"} INTO ${this.table}
      (${this.columns.join(", ")})
      VALUES
        ${o}
    `}params(){return this.tuples.flat()}}class Rt extends or{constructor(t,o){super(t,o,!0)}}const rr=e=>`POLYGON((${e.map(o=>`${o[0]} ${o[1]}`).join(",")}))`,Qe=e=>{const[t,o]=e.ne,[r,a]=e.sw;return rr([[a,t],[o,t],[o,r],[a,r],[a,t]])},lt="POLYGON((",st="))",ir=e=>{if(e.startsWith(lt)&&e.endsWith(st))return e.slice(lt.length,-st.length).split(",").map(o=>{const[r,a]=o.trim().split(" ");return[parseFloat(r),parseFloat(a)]});throw new Error(`Invalid WKT polygon: ${e}`)};var ar=[{id:1,vendor:"Youspan",tld:"info",category:"sports",popularity:.37},{id:2,vendor:"Linkbridge",tld:"edu",category:"books",popularity:.6},{id:3,vendor:"Feedfire",tld:"gov",category:"sports",popularity:.55},{id:4,vendor:"Kimia",tld:"gov",category:"movies",popularity:.53},{id:5,vendor:"Zava",tld:"net",category:"kids",popularity:.39},{id:6,vendor:"Oyoyo",tld:"net",category:"jewelry",popularity:.21},{id:7,vendor:"Trunyx",tld:"edu",category:"outdoors",popularity:.72},{id:8,vendor:"Oyonder",tld:"org",category:"games",popularity:.38},{id:9,vendor:"Podcat",tld:"mil",category:"beauty",popularity:.2},{id:10,vendor:"Quatz",tld:"mil",category:"garden",popularity:.59},{id:11,vendor:"Thoughtsphere",tld:"biz",category:"home",popularity:.13},{id:12,vendor:"Twinte",tld:"biz",category:"clothing",popularity:.47},{id:13,vendor:"Blogtags",tld:"edu",category:"toys",popularity:.87},{id:14,vendor:"Oyonder",tld:"com",category:"garden",popularity:.54},{id:15,vendor:"Babbleblab",tld:"gov",category:"kids",popularity:.63},{id:16,vendor:"Realbridge",tld:"net",category:"music",popularity:.75},{id:17,vendor:"Einti",tld:"name",category:"shoes",popularity:.41},{id:18,vendor:"Vitz",tld:"edu",category:"sports",popularity:.36},{id:19,vendor:"Jabbercube",tld:"gov",category:"kids",popularity:.77},{id:20,vendor:"Kwimbee",tld:"net",category:"beauty",popularity:.36},{id:21,vendor:"Aibox",tld:"net",category:"toys",popularity:1.02},{id:22,vendor:"Wikibox",tld:"edu",category:"toys",popularity:.58},{id:23,vendor:"Devpoint",tld:"edu",category:"garden",popularity:.93},{id:24,vendor:"Latz",tld:"biz",category:"music",popularity:.2},{id:25,vendor:"Minyx",tld:"biz",category:"music",popularity:.76},{id:26,vendor:"Jetwire",tld:"edu",category:"toys",popularity:.54},{id:27,vendor:"Topicshots",tld:"info",category:"movies",popularity:.65},{id:28,vendor:"Zoomzone",tld:"gov",category:"outdoors",popularity:.73},{id:29,vendor:"Eare",tld:"gov",category:"tools",popularity:.57},{id:30,vendor:"Centidel",tld:"org",category:"grocery",popularity:.8},{id:31,vendor:"Fivebridge",tld:"info",category:"books",popularity:.69},{id:32,vendor:"Twitterbeat",tld:"mil",category:"jewelry",popularity:.54},{id:33,vendor:"Chatterbridge",tld:"com",category:"jewelry",popularity:.43},{id:34,vendor:"Edgepulse",tld:"edu",category:"jewelry",popularity:.44},{id:35,vendor:"Skyvu",tld:"org",category:"sports",popularity:1.02},{id:36,vendor:"Gevee",tld:"mil",category:"computers",popularity:.41},{id:37,vendor:"Kwinu",tld:"mil",category:"sports",popularity:.46},{id:38,vendor:"Quire",tld:"mil",category:"industrial",popularity:.47},{id:39,vendor:"Roombo",tld:"info",category:"tools",popularity:.45},{id:40,vendor:"Linkbuzz",tld:"net",category:"kids",popularity:.59},{id:41,vendor:"Photobug",tld:"net",category:"books",popularity:.84},{id:42,vendor:"Wikizz",tld:"info",category:"toys",popularity:.3},{id:43,vendor:"Ainyx",tld:"biz",category:"kids",popularity:.51},{id:44,vendor:"Mita",tld:"gov",category:"music",popularity:.8},{id:45,vendor:"Oloo",tld:"biz",category:"home",popularity:.62},{id:46,vendor:"Wikido",tld:"mil",category:"books",popularity:.33},{id:47,vendor:"Agivu",tld:"net",category:"industrial",popularity:.16},{id:48,vendor:"Jabberstorm",tld:"name",category:"toys",popularity:.34},{id:49,vendor:"Voonix",tld:"edu",category:"health",popularity:.67},{id:50,vendor:"Dabfeed",tld:"mil",category:"movies",popularity:.63},{id:51,vendor:"Camido",tld:"com",category:"games",popularity:.16},{id:52,vendor:"Yodel",tld:"com",category:"automotive",popularity:.71},{id:53,vendor:"Twitterbeat",tld:"net",category:"health",popularity:.77},{id:54,vendor:"Bubblemix",tld:"name",category:"clothing",popularity:.29},{id:55,vendor:"Eidel",tld:"com",category:"outdoors",popularity:.19},{id:56,vendor:"Devify",tld:"biz",category:"jewelry",popularity:.3},{id:57,vendor:"Pixope",tld:"net",category:"jewelry",popularity:.55},{id:58,vendor:"Twiyo",tld:"mil",category:"automotive",popularity:.59},{id:59,vendor:"Flashpoint",tld:"mil",category:"beauty",popularity:.83},{id:60,vendor:"Dynabox",tld:"biz",category:"automotive",popularity:.43},{id:61,vendor:"Browseblab",tld:"edu",category:"automotive",popularity:.64},{id:62,vendor:"Gabspot",tld:"mil",category:"shoes",popularity:.39},{id:63,vendor:"Edgetag",tld:"biz",category:"electronics",popularity:.78},{id:64,vendor:"Fatz",tld:"info",category:"music",popularity:.47},{id:65,vendor:"Tagfeed",tld:"info",category:"sports",popularity:.72},{id:66,vendor:"Aivee",tld:"gov",category:"games",popularity:-.01},{id:67,vendor:"Gabvine",tld:"net",category:"garden",popularity:.31},{id:68,vendor:"Thoughtstorm",tld:"biz",category:"health",popularity:.63},{id:69,vendor:"Rhynyx",tld:"info",category:"games",popularity:.3},{id:70,vendor:"Meezzy",tld:"biz",category:"shoes",popularity:.49},{id:71,vendor:"Jaloo",tld:"com",category:"home",popularity:.03},{id:72,vendor:"Ntags",tld:"info",category:"computers",popularity:.82},{id:73,vendor:"Meevee",tld:"info",category:"grocery",popularity:.09},{id:74,vendor:"Zoonder",tld:"org",category:"grocery",popularity:.8},{id:75,vendor:"Twitterworks",tld:"com",category:"computers",popularity:.18},{id:76,vendor:"Tagchat",tld:"biz",category:"toys",popularity:.41},{id:77,vendor:"Wordpedia",tld:"biz",category:"music",popularity:.72},{id:78,vendor:"Trilith",tld:"com",category:"shoes",popularity:.33},{id:79,vendor:"Oyonder",tld:"com",category:"music",popularity:.67},{id:80,vendor:"Abata",tld:"net",category:"games",popularity:.39},{id:81,vendor:"BlogXS",tld:"gov",category:"movies",popularity:.31},{id:82,vendor:"Oba",tld:"info",category:"health",popularity:.18},{id:83,vendor:"Edgewire",tld:"name",category:"beauty",popularity:.32},{id:84,vendor:"Ainyx",tld:"gov",category:"baby",popularity:.19},{id:85,vendor:"Riffpedia",tld:"gov",category:"grocery",popularity:.23},{id:86,vendor:"Fadeo",tld:"gov",category:"movies",popularity:.27},{id:87,vendor:"Muxo",tld:"name",category:"grocery",popularity:.15},{id:88,vendor:"Skaboo",tld:"org",category:"sports",popularity:.18},{id:89,vendor:"Babbleopia",tld:"gov",category:"automotive",popularity:.6},{id:90,vendor:"Meedoo",tld:"gov",category:"sports",popularity:.81},{id:91,vendor:"Dabshots",tld:"name",category:"home",popularity:.65},{id:92,vendor:"Aimbo",tld:"mil",category:"baby",popularity:.55},{id:93,vendor:"Jaloo",tld:"gov",category:"jewelry",popularity:.83},{id:94,vendor:"Browsezoom",tld:"org",category:"beauty",popularity:.66},{id:95,vendor:"Browsedrive",tld:"org",category:"beauty",popularity:.56},{id:96,vendor:"Jazzy",tld:"gov",category:"automotive",popularity:.85},{id:97,vendor:"Meetz",tld:"info",category:"movies",popularity:.71},{id:98,vendor:"Trudeo",tld:"edu",category:"movies",popularity:.98},{id:99,vendor:"Skimia",tld:"com",category:"industrial",popularity:.77},{id:100,vendor:"Skiba",tld:"com",category:"music",popularity:.93},{id:101,vendor:"Babblestorm",tld:"name",category:"industrial",popularity:1.18},{id:102,vendor:"Voomm",tld:"name",category:"computers",popularity:.08},{id:103,vendor:"Roombo",tld:"edu",category:"garden",popularity:1.16},{id:104,vendor:"Twimm",tld:"info",category:"baby",popularity:.96},{id:105,vendor:"Bluejam",tld:"edu",category:"health",popularity:.48},{id:106,vendor:"Twitterwire",tld:"org",category:"garden",popularity:.62},{id:107,vendor:"Ainyx",tld:"name",category:"toys",popularity:.5},{id:108,vendor:"Livetube",tld:"net",category:"automotive",popularity:.4},{id:109,vendor:"Eidel",tld:"gov",category:"baby",popularity:.48},{id:110,vendor:"Realmix",tld:"edu",category:"kids",popularity:.7},{id:111,vendor:"Zoonoodle",tld:"mil",category:"automotive",popularity:.77},{id:112,vendor:"Omba",tld:"biz",category:"jewelry",popularity:.48},{id:113,vendor:"Brightdog",tld:"name",category:"automotive",popularity:.39},{id:114,vendor:"Brainlounge",tld:"info",category:"baby",popularity:.8},{id:115,vendor:"Shufflester",tld:"mil",category:"music",popularity:.49},{id:116,vendor:"Fivebridge",tld:"com",category:"industrial",popularity:.54},{id:117,vendor:"Topicshots",tld:"biz",category:"toys",popularity:.55},{id:118,vendor:"Photobug",tld:"mil",category:"outdoors",popularity:.4},{id:119,vendor:"Skippad",tld:"biz",category:"computers",popularity:.2},{id:120,vendor:"Dabshots",tld:"mil",category:"shoes",popularity:.47},{id:121,vendor:"Aimbo",tld:"mil",category:"jewelry",popularity:.61},{id:122,vendor:"Oyope",tld:"biz",category:"electronics",popularity:.53},{id:123,vendor:"Kimia",tld:"org",category:"tools",popularity:.53},{id:124,vendor:"Avaveo",tld:"biz",category:"garden",popularity:.37},{id:125,vendor:"Kwideo",tld:"biz",category:"kids",popularity:.02},{id:126,vendor:"Voomm",tld:"com",category:"movies",popularity:.3},{id:127,vendor:"Voolia",tld:"com",category:"outdoors",popularity:.8},{id:128,vendor:"Layo",tld:"gov",category:"books",popularity:.17},{id:129,vendor:"Trilia",tld:"com",category:"games",popularity:.13},{id:130,vendor:"Zazio",tld:"edu",category:"clothing",popularity:.34},{id:131,vendor:"Topdrive",tld:"gov",category:"industrial",popularity:.53},{id:132,vendor:"Yoveo",tld:"info",category:"computers",popularity:.63},{id:133,vendor:"Yodel",tld:"info",category:"electronics",popularity:.4},{id:134,vendor:"Dynabox",tld:"org",category:"industrial",popularity:.02},{id:135,vendor:"Browsebug",tld:"info",category:"toys",popularity:.65},{id:136,vendor:"Riffpath",tld:"mil",category:"jewelry",popularity:.46},{id:137,vendor:"Jaloo",tld:"name",category:"baby",popularity:.62},{id:138,vendor:"Linklinks",tld:"mil",category:"health",popularity:.33},{id:139,vendor:"Yotz",tld:"biz",category:"industrial",popularity:.88},{id:140,vendor:"Mymm",tld:"org",category:"computers",popularity:.64},{id:141,vendor:"Ailane",tld:"biz",category:"automotive",popularity:.67},{id:142,vendor:"Realmix",tld:"org",category:"kids",popularity:.45},{id:143,vendor:"Pixonyx",tld:"edu",category:"automotive",popularity:.23},{id:144,vendor:"Talane",tld:"com",category:"grocery",popularity:.29},{id:145,vendor:"Jabberbean",tld:"info",category:"industrial",popularity:.38},{id:146,vendor:"Wikido",tld:"mil",category:"clothing",popularity:.93},{id:147,vendor:"InnoZ",tld:"info",category:"automotive",popularity:.76},{id:148,vendor:"Photobug",tld:"org",category:"toys",popularity:.63},{id:149,vendor:"Dazzlesphere",tld:"mil",category:"toys",popularity:.38},{id:150,vendor:"Trudoo",tld:"net",category:"music",popularity:.41},{id:151,vendor:"Photolist",tld:"edu",category:"health",popularity:.56},{id:152,vendor:"Twinte",tld:"gov",category:"clothing",popularity:.76},{id:153,vendor:"Buzzbean",tld:"org",category:"movies",popularity:.57},{id:154,vendor:"Demivee",tld:"net",category:"home",popularity:.08},{id:155,vendor:"Photojam",tld:"edu",category:"movies",popularity:.86},{id:156,vendor:"Flipstorm",tld:"info",category:"tools",popularity:.5},{id:157,vendor:"Muxo",tld:"edu",category:"garden",popularity:.66},{id:158,vendor:"Dabjam",tld:"mil",category:"kids",popularity:.75},{id:159,vendor:"Vimbo",tld:"edu",category:"electronics",popularity:.34},{id:160,vendor:"Yakidoo",tld:"name",category:"books",popularity:.76},{id:161,vendor:"Tagfeed",tld:"com",category:"sports",popularity:.21},{id:162,vendor:"Twimm",tld:"org",category:"sports",popularity:.65},{id:163,vendor:"Pixonyx",tld:"org",category:"garden",popularity:.44},{id:164,vendor:"Twimm",tld:"org",category:"beauty",popularity:.52},{id:165,vendor:"Camimbo",tld:"org",category:"home",popularity:.67},{id:166,vendor:"Pixope",tld:"org",category:"clothing",popularity:.55},{id:167,vendor:"Camimbo",tld:"gov",category:"kids",popularity:.62},{id:168,vendor:"Teklist",tld:"name",category:"games",popularity:.81},{id:169,vendor:"Meeveo",tld:"com",category:"movies",popularity:.64},{id:170,vendor:"Kwimbee",tld:"edu",category:"books",popularity:.69},{id:171,vendor:"Jabbersphere",tld:"com",category:"shoes",popularity:.43},{id:172,vendor:"Kwilith",tld:"gov",category:"computers",popularity:.7},{id:173,vendor:"Livetube",tld:"mil",category:"games",popularity:.34},{id:174,vendor:"Izio",tld:"gov",category:"tools",popularity:.56},{id:175,vendor:"Jatri",tld:"org",category:"baby",popularity:.87},{id:176,vendor:"Trupe",tld:"info",category:"sports",popularity:.24},{id:177,vendor:"Rhyloo",tld:"biz",category:"games",popularity:.62},{id:178,vendor:"Rhynyx",tld:"mil",category:"sports",popularity:.63},{id:179,vendor:"Teklist",tld:"org",category:"tools",popularity:.86},{id:180,vendor:"Skibox",tld:"com",category:"kids",popularity:.31},{id:181,vendor:"Gigashots",tld:"gov",category:"outdoors",popularity:.06},{id:182,vendor:"Tambee",tld:"edu",category:"baby",popularity:.55},{id:183,vendor:"Kwideo",tld:"mil",category:"outdoors",popularity:.82},{id:184,vendor:"Zoovu",tld:"mil",category:"games",popularity:.61},{id:185,vendor:"InnoZ",tld:"biz",category:"beauty",popularity:.61},{id:186,vendor:"Tagfeed",tld:"mil",category:"outdoors",popularity:.62},{id:187,vendor:"Eazzy",tld:"net",category:"beauty",popularity:.42},{id:188,vendor:"Meejo",tld:"com",category:"outdoors",popularity:.33},{id:189,vendor:"Centizu",tld:"biz",category:"kids",popularity:.83},{id:190,vendor:"Browsedrive",tld:"net",category:"automotive",popularity:.61},{id:191,vendor:"Zoomzone",tld:"mil",category:"books",popularity:.74},{id:192,vendor:"Riffwire",tld:"edu",category:"jewelry",popularity:.13},{id:193,vendor:"Vinte",tld:"mil",category:"games",popularity:.7},{id:194,vendor:"Browsezoom",tld:"info",category:"automotive",popularity:.02},{id:195,vendor:"Gabvine",tld:"info",category:"tools",popularity:.46},{id:196,vendor:"Linkbridge",tld:"mil",category:"kids",popularity:.79},{id:197,vendor:"Riffpedia",tld:"info",category:"grocery",popularity:.62},{id:198,vendor:"Zoombox",tld:"net",category:"industrial",popularity:-.09},{id:199,vendor:"Skiba",tld:"info",category:"jewelry",popularity:.82},{id:200,vendor:"Flashdog",tld:"biz",category:"games",popularity:.86},{id:201,vendor:"Rhyloo",tld:"name",category:"movies",popularity:.28},{id:202,vendor:"Yata",tld:"name",category:"sports",popularity:.74},{id:203,vendor:"Yakitri",tld:"info",category:"electronics",popularity:.33},{id:204,vendor:"Jetwire",tld:"biz",category:"computers",popularity:.67},{id:205,vendor:"Wordtune",tld:"org",category:"automotive",popularity:-.13},{id:206,vendor:"Zoombox",tld:"net",category:"garden",popularity:1.23},{id:207,vendor:"Photojam",tld:"com",category:"electronics",popularity:.52},{id:208,vendor:"Youspan",tld:"biz",category:"jewelry",popularity:.96},{id:209,vendor:"Twiyo",tld:"net",category:"grocery",popularity:.71},{id:210,vendor:"Reallinks",tld:"gov",category:"grocery",popularity:.85},{id:211,vendor:"Mycat",tld:"com",category:"music",popularity:.8},{id:212,vendor:"Jayo",tld:"edu",category:"computers",popularity:.43},{id:213,vendor:"Aivee",tld:"mil",category:"computers",popularity:.27},{id:214,vendor:"Eadel",tld:"biz",category:"movies",popularity:.64},{id:215,vendor:"Jabberstorm",tld:"net",category:"garden",popularity:.14},{id:216,vendor:"Oyope",tld:"gov",category:"computers",popularity:.97},{id:217,vendor:"Eabox",tld:"biz",category:"computers",popularity:.68},{id:218,vendor:"Edgeify",tld:"org",category:"home",popularity:.39},{id:219,vendor:"Jaxbean",tld:"edu",category:"automotive",popularity:.15},{id:220,vendor:"Topicblab",tld:"name",category:"books",popularity:.72},{id:221,vendor:"Vinder",tld:"org",category:"electronics",popularity:.51},{id:222,vendor:"Quimm",tld:"biz",category:"sports",popularity:.71},{id:223,vendor:"Thoughtstorm",tld:"mil",category:"beauty",popularity:.61},{id:224,vendor:"Browsedrive",tld:"edu",category:"shoes",popularity:.72},{id:225,vendor:"Mydo",tld:"name",category:"sports",popularity:.16},{id:226,vendor:"Gabcube",tld:"net",category:"beauty",popularity:.15},{id:227,vendor:"Rhynyx",tld:"name",category:"electronics",popularity:.55},{id:228,vendor:"Centizu",tld:"gov",category:"computers",popularity:.55},{id:229,vendor:"Quatz",tld:"biz",category:"outdoors",popularity:.91},{id:230,vendor:"Twitterwire",tld:"biz",category:"sports",popularity:.05},{id:231,vendor:"Oyonder",tld:"info",category:"garden",popularity:.43},{id:232,vendor:"Rhybox",tld:"gov",category:"jewelry",popularity:.19},{id:233,vendor:"Yacero",tld:"name",category:"sports",popularity:.67},{id:234,vendor:"Skyvu",tld:"org",category:"garden",popularity:.41},{id:235,vendor:"Dabvine",tld:"mil",category:"computers",popularity:.57},{id:236,vendor:"Brainverse",tld:"biz",category:"electronics",popularity:.97},{id:237,vendor:"Linkbridge",tld:"gov",category:"tools",popularity:.69},{id:238,vendor:"Ozu",tld:"net",category:"games",popularity:.7},{id:239,vendor:"Photobug",tld:"edu",category:"sports",popularity:.47},{id:240,vendor:"Gabtype",tld:"mil",category:"tools",popularity:.58},{id:241,vendor:"Tagcat",tld:"mil",category:"kids",popularity:.56},{id:242,vendor:"Centizu",tld:"info",category:"sports",popularity:.96},{id:243,vendor:"Babbleblab",tld:"com",category:"books",popularity:.76},{id:244,vendor:"Twitternation",tld:"biz",category:"jewelry",popularity:-.09},{id:245,vendor:"Jabbersphere",tld:"info",category:"outdoors",popularity:.44},{id:246,vendor:"Eabox",tld:"edu",category:"baby",popularity:.54},{id:247,vendor:"Oyonder",tld:"biz",category:"garden",popularity:.23},{id:248,vendor:"Eamia",tld:"biz",category:"tools",popularity:.63},{id:249,vendor:"Dabtype",tld:"mil",category:"jewelry",popularity:.55},{id:250,vendor:"Skyvu",tld:"edu",category:"movies",popularity:.55},{id:251,vendor:"Devshare",tld:"net",category:"computers",popularity:.71},{id:252,vendor:"Voolia",tld:"biz",category:"tools",popularity:.36},{id:253,vendor:"Camido",tld:"net",category:"health",popularity:.62},{id:254,vendor:"Wikizz",tld:"info",category:"industrial",popularity:.63},{id:255,vendor:"Youopia",tld:"gov",category:"kids",popularity:.42},{id:256,vendor:"Buzzdog",tld:"mil",category:"toys",popularity:.48},{id:257,vendor:"Livetube",tld:"info",category:"electronics",popularity:.06},{id:258,vendor:"Lazzy",tld:"gov",category:"shoes",popularity:.25},{id:259,vendor:"Dynabox",tld:"info",category:"electronics",popularity:.62},{id:260,vendor:"Livetube",tld:"biz",category:"games",popularity:.48},{id:261,vendor:"Eare",tld:"com",category:"industrial",popularity:.48},{id:262,vendor:"Skimia",tld:"com",category:"jewelry",popularity:.25},{id:263,vendor:"Dabtype",tld:"name",category:"books",popularity:.65},{id:264,vendor:"Avavee",tld:"info",category:"automotive",popularity:.61},{id:265,vendor:"Jabbertype",tld:"org",category:"automotive",popularity:.62},{id:266,vendor:"Zoombox",tld:"mil",category:"grocery",popularity:.97},{id:267,vendor:"Youspan",tld:"info",category:"movies",popularity:.33},{id:268,vendor:"Feedspan",tld:"mil",category:"outdoors",popularity:.88},{id:269,vendor:"Oyope",tld:"biz",category:"sports",popularity:.71},{id:270,vendor:"Feedfish",tld:"name",category:"home",popularity:.8},{id:271,vendor:"Linktype",tld:"info",category:"tools",popularity:.12},{id:272,vendor:"Centizu",tld:"net",category:"electronics",popularity:.28},{id:273,vendor:"Fivespan",tld:"info",category:"automotive",popularity:.52},{id:274,vendor:"Chatterpoint",tld:"org",category:"toys",popularity:.5},{id:275,vendor:"Fivebridge",tld:"com",category:"industrial",popularity:-.12},{id:276,vendor:"Quatz",tld:"com",category:"sports",popularity:.47},{id:277,vendor:"Eimbee",tld:"gov",category:"automotive",popularity:.53},{id:278,vendor:"Yotz",tld:"info",category:"movies",popularity:.78},{id:279,vendor:"Meevee",tld:"mil",category:"computers",popularity:.53},{id:280,vendor:"Kwideo",tld:"biz",category:"industrial",popularity:.58},{id:281,vendor:"Viva",tld:"name",category:"movies",popularity:.39},{id:282,vendor:"Thoughtworks",tld:"biz",category:"sports",popularity:.66},{id:283,vendor:"Plambee",tld:"net",category:"computers",popularity:-.02},{id:284,vendor:"Gabtune",tld:"gov",category:"beauty",popularity:.64},{id:285,vendor:"Eimbee",tld:"org",category:"jewelry",popularity:.32},{id:286,vendor:"Fiveclub",tld:"info",category:"games",popularity:.79},{id:287,vendor:"Vimbo",tld:"name",category:"garden",popularity:.63},{id:288,vendor:"Flashset",tld:"edu",category:"games",popularity:.53},{id:289,vendor:"Meeveo",tld:"name",category:"health",popularity:.4},{id:290,vendor:"Thoughtbridge",tld:"biz",category:"clothing",popularity:.22},{id:291,vendor:"Youspan",tld:"mil",category:"electronics",popularity:.34},{id:292,vendor:"Meembee",tld:"org",category:"beauty",popularity:.28},{id:293,vendor:"Zooveo",tld:"info",category:"games",popularity:.45},{id:294,vendor:"Feedbug",tld:"edu",category:"games",popularity:.6},{id:295,vendor:"Npath",tld:"org",category:"garden",popularity:.34},{id:296,vendor:"Jazzy",tld:"com",category:"grocery",popularity:.86},{id:297,vendor:"Kimia",tld:"biz",category:"games",popularity:.44},{id:298,vendor:"Ooba",tld:"com",category:"kids",popularity:.5},{id:299,vendor:"Gabspot",tld:"gov",category:"industrial",popularity:.42},{id:300,vendor:"Realcube",tld:"name",category:"beauty",popularity:.66},{id:301,vendor:"Yambee",tld:"net",category:"toys",popularity:.67},{id:302,vendor:"Realcube",tld:"biz",category:"outdoors",popularity:.41},{id:303,vendor:"Youfeed",tld:"mil",category:"health",popularity:.34},{id:304,vendor:"Eabox",tld:"com",category:"toys",popularity:.31},{id:305,vendor:"Riffpath",tld:"biz",category:"computers",popularity:.73},{id:306,vendor:"Ainyx",tld:"info",category:"sports",popularity:.75},{id:307,vendor:"Feedmix",tld:"biz",category:"health",popularity:.41},{id:308,vendor:"Eare",tld:"edu",category:"toys",popularity:.86},{id:309,vendor:"Vinder",tld:"info",category:"beauty",popularity:.55},{id:310,vendor:"Roombo",tld:"biz",category:"industrial",popularity:1},{id:311,vendor:"Dynazzy",tld:"name",category:"shoes",popularity:.43},{id:312,vendor:"Zoomzone",tld:"biz",category:"sports",popularity:.46},{id:313,vendor:"Voolia",tld:"name",category:"movies",popularity:.74},{id:314,vendor:"Ntag",tld:"mil",category:"sports",popularity:.34},{id:315,vendor:"Quinu",tld:"net",category:"home",popularity:.43},{id:316,vendor:"Jabbertype",tld:"info",category:"industrial",popularity:.54},{id:317,vendor:"Jatri",tld:"info",category:"clothing",popularity:.53},{id:318,vendor:"Feedbug",tld:"net",category:"grocery",popularity:.36},{id:319,vendor:"Babbleblab",tld:"net",category:"computers",popularity:1.05},{id:320,vendor:"Twiyo",tld:"org",category:"industrial",popularity:.79},{id:321,vendor:"Avamm",tld:"info",category:"kids",popularity:.29},{id:322,vendor:"Skippad",tld:"edu",category:"books",popularity:.23},{id:323,vendor:"Thoughtstorm",tld:"net",category:"movies",popularity:.45},{id:324,vendor:"Browseblab",tld:"gov",category:"jewelry",popularity:.77},{id:325,vendor:"Fliptune",tld:"name",category:"toys",popularity:.68},{id:326,vendor:"Twitterwire",tld:"mil",category:"sports",popularity:.8},{id:327,vendor:"Skippad",tld:"org",category:"games",popularity:.48},{id:328,vendor:"Lazzy",tld:"name",category:"electronics",popularity:.59},{id:329,vendor:"Zava",tld:"mil",category:"kids",popularity:.25},{id:330,vendor:"Linktype",tld:"org",category:"games",popularity:.81},{id:331,vendor:"Dabjam",tld:"net",category:"beauty",popularity:.78},{id:332,vendor:"Kare",tld:"org",category:"clothing",popularity:.23},{id:333,vendor:"Bubblebox",tld:"name",category:"beauty",popularity:.57},{id:334,vendor:"Gevee",tld:"net",category:"automotive",popularity:.34},{id:335,vendor:"Oyoyo",tld:"gov",category:"books",popularity:.55},{id:336,vendor:"Katz",tld:"gov",category:"outdoors",popularity:.25},{id:337,vendor:"Livepath",tld:"com",category:"games",popularity:.53},{id:338,vendor:"Ooba",tld:"org",category:"clothing",popularity:.23},{id:339,vendor:"Brightbean",tld:"edu",category:"automotive",popularity:.26},{id:340,vendor:"Skiba",tld:"net",category:"jewelry",popularity:.35},{id:341,vendor:"Feedfish",tld:"name",category:"outdoors",popularity:.08},{id:342,vendor:"Avamba",tld:"name",category:"sports",popularity:.41},{id:343,vendor:"Oba",tld:"com",category:"outdoors",popularity:.75},{id:344,vendor:"Zoombox",tld:"gov",category:"jewelry",popularity:.53},{id:345,vendor:"Fliptune",tld:"info",category:"electronics",popularity:.14},{id:346,vendor:"Brainbox",tld:"biz",category:"clothing",popularity:.21},{id:347,vendor:"Avamm",tld:"name",category:"baby",popularity:.46},{id:348,vendor:"Yozio",tld:"org",category:"toys",popularity:.63},{id:349,vendor:"Photobug",tld:"edu",category:"baby",popularity:.52},{id:350,vendor:"Demivee",tld:"gov",category:"clothing",popularity:.72},{id:351,vendor:"Brainlounge",tld:"org",category:"books",popularity:.45},{id:352,vendor:"Dazzlesphere",tld:"biz",category:"beauty",popularity:.75},{id:353,vendor:"Dazzlesphere",tld:"org",category:"games",popularity:.3},{id:354,vendor:"Aibox",tld:"biz",category:"home",popularity:.08},{id:355,vendor:"Feedspan",tld:"com",category:"home",popularity:.59},{id:356,vendor:"Camido",tld:"org",category:"outdoors",popularity:.24},{id:357,vendor:"Kare",tld:"net",category:"music",popularity:.41},{id:358,vendor:"Photolist",tld:"info",category:"shoes",popularity:.51},{id:359,vendor:"Photobug",tld:"net",category:"toys",popularity:.52},{id:360,vendor:"Centidel",tld:"net",category:"shoes",popularity:.66},{id:361,vendor:"Yabox",tld:"info",category:"outdoors",popularity:.32},{id:362,vendor:"Lajo",tld:"mil",category:"grocery",popularity:.59},{id:363,vendor:"Tagopia",tld:"net",category:"tools",popularity:.42},{id:364,vendor:"Brainlounge",tld:"gov",category:"outdoors",popularity:.49},{id:365,vendor:"Brainverse",tld:"org",category:"kids",popularity:.54},{id:366,vendor:"Kazio",tld:"edu",category:"books",popularity:.44},{id:367,vendor:"Thoughtbeat",tld:"mil",category:"music",popularity:.57},{id:368,vendor:"Yakidoo",tld:"org",category:"tools",popularity:.57},{id:369,vendor:"Skiptube",tld:"net",category:"jewelry",popularity:.41},{id:370,vendor:"Buzzshare",tld:"edu",category:"games",popularity:-.1},{id:371,vendor:"Brainbox",tld:"com",category:"industrial",popularity:.72},{id:372,vendor:"Talane",tld:"biz",category:"games",popularity:.7},{id:373,vendor:"Skyndu",tld:"com",category:"tools",popularity:.94},{id:374,vendor:"Jetwire",tld:"mil",category:"music",popularity:.02},{id:375,vendor:"Dazzlesphere",tld:"edu",category:"toys",popularity:.41},{id:376,vendor:"Rhynyx",tld:"gov",category:"beauty",popularity:.46},{id:377,vendor:"Kanoodle",tld:"biz",category:"shoes",popularity:.24},{id:378,vendor:"Jaxnation",tld:"org",category:"computers",popularity:.45},{id:379,vendor:"Photobug",tld:"gov",category:"outdoors",popularity:.32},{id:380,vendor:"Midel",tld:"info",category:"health",popularity:.86},{id:381,vendor:"Linktype",tld:"info",category:"tools",popularity:.7},{id:382,vendor:"Dabshots",tld:"mil",category:"industrial",popularity:.95},{id:383,vendor:"Zooveo",tld:"org",category:"beauty",popularity:.42},{id:384,vendor:"Blognation",tld:"mil",category:"jewelry",popularity:.26},{id:385,vendor:"Oyonder",tld:"name",category:"games",popularity:.97},{id:386,vendor:"Zoozzy",tld:"mil",category:"baby",popularity:.5},{id:387,vendor:"Skyble",tld:"edu",category:"shoes",popularity:.58},{id:388,vendor:"Zoomdog",tld:"name",category:"beauty",popularity:1.13},{id:389,vendor:"Buzzster",tld:"org",category:"industrial",popularity:.58},{id:390,vendor:"Bluezoom",tld:"gov",category:"books",popularity:.53},{id:391,vendor:"Skipfire",tld:"name",category:"kids",popularity:.35},{id:392,vendor:"InnoZ",tld:"org",category:"garden",popularity:.36},{id:393,vendor:"Youspan",tld:"edu",category:"garden",popularity:.12},{id:394,vendor:"Gabspot",tld:"net",category:"music",popularity:.68},{id:395,vendor:"Gabvine",tld:"edu",category:"home",popularity:.36},{id:396,vendor:"Flashspan",tld:"edu",category:"tools",popularity:.94},{id:397,vendor:"BlogXS",tld:"info",category:"grocery",popularity:.63},{id:398,vendor:"Tazzy",tld:"edu",category:"shoes",popularity:.57},{id:399,vendor:"Photofeed",tld:"mil",category:"clothing",popularity:.18},{id:400,vendor:"Agimba",tld:"biz",category:"grocery",popularity:.14},{id:401,vendor:"Jabberbean",tld:"biz",category:"kids",popularity:.49},{id:402,vendor:"Camimbo",tld:"mil",category:"sports",popularity:.28},{id:403,vendor:"Twitterwire",tld:"gov",category:"books",popularity:.58},{id:404,vendor:"Shuffledrive",tld:"gov",category:"garden",popularity:.95},{id:405,vendor:"Eayo",tld:"info",category:"tools",popularity:.44},{id:406,vendor:"Zoomzone",tld:"info",category:"toys",popularity:.46},{id:407,vendor:"Tagcat",tld:"gov",category:"electronics",popularity:0},{id:408,vendor:"Blogtags",tld:"biz",category:"home",popularity:.49},{id:409,vendor:"Jabbertype",tld:"com",category:"computers",popularity:.74},{id:410,vendor:"Photobug",tld:"info",category:"grocery",popularity:.75},{id:411,vendor:"Livepath",tld:"net",category:"beauty",popularity:1.03},{id:412,vendor:"Shufflebeat",tld:"net",category:"tools",popularity:.62},{id:413,vendor:"Skynoodle",tld:"biz",category:"clothing",popularity:.14},{id:414,vendor:"Youfeed",tld:"name",category:"shoes",popularity:.23},{id:415,vendor:"Gigaclub",tld:"net",category:"outdoors",popularity:.74},{id:416,vendor:"Twitterwire",tld:"info",category:"games",popularity:.93},{id:417,vendor:"Livefish",tld:"edu",category:"garden",popularity:.85},{id:418,vendor:"Dazzlesphere",tld:"mil",category:"beauty",popularity:.63},{id:419,vendor:"Quatz",tld:"edu",category:"toys",popularity:.35},{id:420,vendor:"Meezzy",tld:"biz",category:"kids",popularity:.37},{id:421,vendor:"Eidel",tld:"com",category:"movies",popularity:.61},{id:422,vendor:"DabZ",tld:"edu",category:"kids",popularity:.17},{id:423,vendor:"DabZ",tld:"mil",category:"beauty",popularity:.32},{id:424,vendor:"Twitterbridge",tld:"net",category:"tools",popularity:.29},{id:425,vendor:"Brainsphere",tld:"name",category:"books",popularity:.53},{id:426,vendor:"Realmix",tld:"gov",category:"baby",popularity:.74},{id:427,vendor:"Yodo",tld:"gov",category:"movies",popularity:.82},{id:428,vendor:"Realpoint",tld:"net",category:"toys",popularity:.33},{id:429,vendor:"Jamia",tld:"net",category:"music",popularity:.46},{id:430,vendor:"Skaboo",tld:"biz",category:"books",popularity:.17},{id:431,vendor:"LiveZ",tld:"edu",category:"baby",popularity:.52},{id:432,vendor:"Realbuzz",tld:"biz",category:"grocery",popularity:.55},{id:433,vendor:"Jetpulse",tld:"com",category:"sports",popularity:.17},{id:434,vendor:"Fivebridge",tld:"net",category:"shoes",popularity:.8},{id:435,vendor:"Talane",tld:"name",category:"jewelry",popularity:.58},{id:436,vendor:"Cogibox",tld:"com",category:"grocery",popularity:.09},{id:437,vendor:"Kwideo",tld:"edu",category:"shoes",popularity:.26},{id:438,vendor:"Avaveo",tld:"org",category:"electronics",popularity:.4},{id:439,vendor:"Brightbean",tld:"info",category:"baby",popularity:.92},{id:440,vendor:"Dablist",tld:"com",category:"beauty",popularity:.66},{id:441,vendor:"Voomm",tld:"org",category:"shoes",popularity:.59},{id:442,vendor:"Edgeblab",tld:"name",category:"electronics",popularity:.23},{id:443,vendor:"Gigazoom",tld:"edu",category:"electronics",popularity:.28},{id:444,vendor:"Riffpath",tld:"net",category:"shoes",popularity:.2},{id:445,vendor:"Edgepulse",tld:"com",category:"health",popularity:.29},{id:446,vendor:"Wordtune",tld:"gov",category:"electronics",popularity:.67},{id:447,vendor:"Ntags",tld:"org",category:"kids",popularity:.42},{id:448,vendor:"Divavu",tld:"gov",category:"automotive",popularity:.72},{id:449,vendor:"Skyble",tld:"mil",category:"tools",popularity:.93},{id:450,vendor:"Viva",tld:"mil",category:"grocery",popularity:1.07},{id:451,vendor:"Bubblebox",tld:"net",category:"automotive",popularity:.33},{id:452,vendor:"Twinder",tld:"org",category:"baby",popularity:.19},{id:453,vendor:"Feedbug",tld:"gov",category:"jewelry",popularity:.72},{id:454,vendor:"Yodoo",tld:"org",category:"shoes",popularity:.23},{id:455,vendor:"Dynava",tld:"org",category:"automotive",popularity:.99},{id:456,vendor:"Pixonyx",tld:"com",category:"grocery",popularity:.64},{id:457,vendor:"Jaxworks",tld:"com",category:"outdoors",popularity:.68},{id:458,vendor:"Yakijo",tld:"info",category:"jewelry",popularity:.57},{id:459,vendor:"Fivespan",tld:"org",category:"garden",popularity:.17},{id:460,vendor:"Camido",tld:"biz",category:"toys",popularity:.76},{id:461,vendor:"Mycat",tld:"name",category:"computers",popularity:.69},{id:462,vendor:"Twitternation",tld:"mil",category:"health",popularity:.36},{id:463,vendor:"Divavu",tld:"net",category:"shoes",popularity:.66},{id:464,vendor:"Thoughtstorm",tld:"info",category:"games",popularity:.52},{id:465,vendor:"Aibox",tld:"edu",category:"clothing",popularity:.75},{id:466,vendor:"Mita",tld:"biz",category:"home",popularity:.1},{id:467,vendor:"Livetube",tld:"biz",category:"games",popularity:.48},{id:468,vendor:"Flipstorm",tld:"gov",category:"industrial",popularity:.57},{id:469,vendor:"Thoughtmix",tld:"biz",category:"kids",popularity:.4},{id:470,vendor:"Topiclounge",tld:"biz",category:"garden",popularity:.43},{id:471,vendor:"Mydeo",tld:"name",category:"books",popularity:.65},{id:472,vendor:"Ooba",tld:"info",category:"industrial",popularity:.42},{id:473,vendor:"LiveZ",tld:"com",category:"industrial",popularity:.31},{id:474,vendor:"Kayveo",tld:"mil",category:"garden",popularity:.27},{id:475,vendor:"Gabcube",tld:"org",category:"clothing",popularity:.73},{id:476,vendor:"Meejo",tld:"org",category:"outdoors",popularity:.4},{id:477,vendor:"Dynazzy",tld:"gov",category:"books",popularity:.76},{id:478,vendor:"Tavu",tld:"name",category:"movies",popularity:.95},{id:479,vendor:"Kazio",tld:"info",category:"electronics",popularity:.34},{id:480,vendor:"Photobean",tld:"info",category:"games",popularity:.38},{id:481,vendor:"Oyoba",tld:"net",category:"grocery",popularity:.79},{id:482,vendor:"Divanoodle",tld:"org",category:"toys",popularity:.46},{id:483,vendor:"Voomm",tld:"mil",category:"garden",popularity:.66},{id:484,vendor:"Miboo",tld:"info",category:"toys",popularity:.67},{id:485,vendor:"Jatri",tld:"org",category:"industrial",popularity:.75},{id:486,vendor:"Shufflebeat",tld:"info",category:"automotive",popularity:.85},{id:487,vendor:"Jazzy",tld:"mil",category:"computers",popularity:.59},{id:488,vendor:"Omba",tld:"com",category:"games",popularity:.41},{id:489,vendor:"Yamia",tld:"info",category:"garden",popularity:.25},{id:490,vendor:"Eimbee",tld:"gov",category:"books",popularity:.35},{id:491,vendor:"Quimba",tld:"com",category:"books",popularity:.83},{id:492,vendor:"Jabbercube",tld:"edu",category:"kids",popularity:.93},{id:493,vendor:"Thoughtstorm",tld:"name",category:"games",popularity:.68},{id:494,vendor:"Eayo",tld:"name",category:"toys",popularity:.62},{id:495,vendor:"Meembee",tld:"gov",category:"music",popularity:.27},{id:496,vendor:"BlogXS",tld:"gov",category:"sports",popularity:.59},{id:497,vendor:"Twitterworks",tld:"net",category:"games",popularity:.72},{id:498,vendor:"Dynabox",tld:"edu",category:"computers",popularity:.94},{id:499,vendor:"Yakidoo",tld:"com",category:"grocery",popularity:.77},{id:500,vendor:"Feednation",tld:"org",category:"beauty",popularity:1.24},{id:501,vendor:"Divape",tld:"biz",category:"garden",popularity:.5},{id:502,vendor:"InnoZ",tld:"org",category:"books",popularity:.79},{id:503,vendor:"Gigazoom",tld:"mil",category:"electronics",popularity:.55},{id:504,vendor:"Rhycero",tld:"info",category:"books",popularity:1.05},{id:505,vendor:"Yodel",tld:"org",category:"garden",popularity:.25},{id:506,vendor:"Browseblab",tld:"net",category:"sports",popularity:.36},{id:507,vendor:"Yamia",tld:"info",category:"tools",popularity:.32},{id:508,vendor:"Jaxnation",tld:"org",category:"electronics",popularity:.69},{id:509,vendor:"Chatterpoint",tld:"edu",category:"baby",popularity:.43},{id:510,vendor:"Tazzy",tld:"org",category:"automotive",popularity:.51},{id:511,vendor:"Yotz",tld:"info",category:"tools",popularity:.52},{id:512,vendor:"Wikivu",tld:"info",category:"sports",popularity:.6},{id:513,vendor:"Fatz",tld:"name",category:"garden",popularity:.65},{id:514,vendor:"Yodoo",tld:"com",category:"tools",popularity:.21},{id:515,vendor:"Devify",tld:"org",category:"automotive",popularity:.32},{id:516,vendor:"Wikizz",tld:"org",category:"books",popularity:.37},{id:517,vendor:"Skivee",tld:"edu",category:"shoes",popularity:.27},{id:518,vendor:"Trupe",tld:"edu",category:"movies",popularity:.83},{id:519,vendor:"Oyoloo",tld:"edu",category:"music",popularity:.67},{id:520,vendor:"Podcat",tld:"biz",category:"books",popularity:.23},{id:521,vendor:"Kazu",tld:"biz",category:"clothing",popularity:.27},{id:522,vendor:"Agivu",tld:"gov",category:"toys",popularity:.63},{id:523,vendor:"Avavee",tld:"info",category:"computers",popularity:.44},{id:524,vendor:"Leenti",tld:"mil",category:"toys",popularity:.52},{id:525,vendor:"Bubblemix",tld:"edu",category:"health",popularity:.27},{id:526,vendor:"Voomm",tld:"net",category:"clothing",popularity:.34},{id:527,vendor:"Eire",tld:"com",category:"jewelry",popularity:.21},{id:528,vendor:"Roombo",tld:"org",category:"clothing",popularity:.47},{id:529,vendor:"Eayo",tld:"biz",category:"music",popularity:.67},{id:530,vendor:"Ooba",tld:"name",category:"games",popularity:.45},{id:531,vendor:"Youspan",tld:"org",category:"health",popularity:-.08},{id:532,vendor:"Jaxbean",tld:"mil",category:"tools",popularity:.11},{id:533,vendor:"Meezzy",tld:"edu",category:"kids",popularity:.54},{id:534,vendor:"Flashpoint",tld:"com",category:"outdoors",popularity:.34},{id:535,vendor:"Riffpath",tld:"biz",category:"health",popularity:.53},{id:536,vendor:"Edgeclub",tld:"name",category:"garden",popularity:.37},{id:537,vendor:"Thoughtbeat",tld:"edu",category:"sports",popularity:.15},{id:538,vendor:"Cogidoo",tld:"com",category:"games",popularity:.67},{id:539,vendor:"Mydeo",tld:"name",category:"movies",popularity:.66},{id:540,vendor:"Browsezoom",tld:"edu",category:"home",popularity:.35},{id:541,vendor:"Feednation",tld:"org",category:"games",popularity:.65},{id:542,vendor:"Camimbo",tld:"mil",category:"music",popularity:.37},{id:543,vendor:"Skipstorm",tld:"mil",category:"tools",popularity:.13},{id:544,vendor:"Skinder",tld:"org",category:"sports",popularity:.57},{id:545,vendor:"Twimm",tld:"name",category:"beauty",popularity:-.08},{id:546,vendor:"Yadel",tld:"gov",category:"shoes",popularity:.44},{id:547,vendor:"Skajo",tld:"biz",category:"toys",popularity:.66},{id:548,vendor:"Voolith",tld:"info",category:"jewelry",popularity:.93},{id:549,vendor:"Yamia",tld:"edu",category:"shoes",popularity:.3},{id:550,vendor:"Bubbletube",tld:"info",category:"beauty",popularity:.21},{id:551,vendor:"Oyonder",tld:"edu",category:"home",popularity:.36},{id:552,vendor:"Tazzy",tld:"mil",category:"tools",popularity:.77},{id:553,vendor:"Voonyx",tld:"com",category:"computers",popularity:.29},{id:554,vendor:"Linkbuzz",tld:"biz",category:"shoes",popularity:.66},{id:555,vendor:"Myworks",tld:"info",category:"music",popularity:.52},{id:556,vendor:"Jabbertype",tld:"biz",category:"tools",popularity:.36},{id:557,vendor:"Brightdog",tld:"com",category:"electronics",popularity:.71},{id:558,vendor:"Meembee",tld:"name",category:"home",popularity:.27},{id:559,vendor:"Voonix",tld:"name",category:"computers",popularity:.18},{id:560,vendor:"Gigabox",tld:"edu",category:"computers",popularity:.26},{id:561,vendor:"Browsezoom",tld:"com",category:"kids",popularity:.57},{id:562,vendor:"Yombu",tld:"biz",category:"automotive",popularity:.37},{id:563,vendor:"Devshare",tld:"biz",category:"toys",popularity:.52},{id:564,vendor:"Photofeed",tld:"edu",category:"automotive",popularity:.57},{id:565,vendor:"Realcube",tld:"mil",category:"industrial",popularity:.09},{id:566,vendor:"Brainbox",tld:"edu",category:"health",popularity:.69},{id:567,vendor:"Kamba",tld:"info",category:"garden",popularity:.33},{id:568,vendor:"Yodel",tld:"name",category:"home",popularity:.59},{id:569,vendor:"Mydo",tld:"info",category:"outdoors",popularity:.81},{id:570,vendor:"Youopia",tld:"biz",category:"beauty",popularity:.44},{id:571,vendor:"Tagchat",tld:"mil",category:"jewelry",popularity:.45},{id:572,vendor:"Quire",tld:"info",category:"health",popularity:.53},{id:573,vendor:"Shuffledrive",tld:"biz",category:"toys",popularity:.77},{id:574,vendor:"Browseblab",tld:"org",category:"tools",popularity:.47},{id:575,vendor:"Flashset",tld:"name",category:"electronics",popularity:.55},{id:576,vendor:"Tagfeed",tld:"name",category:"outdoors",popularity:.46},{id:577,vendor:"Skyndu",tld:"mil",category:"health",popularity:-.03},{id:578,vendor:"Dynabox",tld:"edu",category:"music",popularity:.99},{id:579,vendor:"Leexo",tld:"net",category:"industrial",popularity:.39},{id:580,vendor:"Plajo",tld:"info",category:"jewelry",popularity:.12},{id:581,vendor:"Yabox",tld:"name",category:"movies",popularity:.32},{id:582,vendor:"Snaptags",tld:"edu",category:"music",popularity:.96},{id:583,vendor:"Cogibox",tld:"com",category:"garden",popularity:.57},{id:584,vendor:"Thoughtmix",tld:"name",category:"home",popularity:.31},{id:585,vendor:"Feedfire",tld:"mil",category:"automotive",popularity:.31},{id:586,vendor:"Buzzbean",tld:"gov",category:"tools",popularity:.3},{id:587,vendor:"Youfeed",tld:"info",category:"music",popularity:.39},{id:588,vendor:"Rhynoodle",tld:"mil",category:"health",popularity:.71},{id:589,vendor:"Zoovu",tld:"mil",category:"automotive",popularity:.45},{id:590,vendor:"Yodel",tld:"biz",category:"garden",popularity:.64},{id:591,vendor:"Skilith",tld:"edu",category:"shoes",popularity:.37},{id:592,vendor:"Eadel",tld:"edu",category:"tools",popularity:.39},{id:593,vendor:"Topicblab",tld:"net",category:"books",popularity:.64},{id:594,vendor:"Yodoo",tld:"net",category:"tools",popularity:.16},{id:595,vendor:"Digitube",tld:"info",category:"automotive",popularity:.43},{id:596,vendor:"Avavee",tld:"com",category:"sports",popularity:.49},{id:597,vendor:"Cogibox",tld:"org",category:"beauty",popularity:.64},{id:598,vendor:"Skimia",tld:"biz",category:"garden",popularity:-.01},{id:599,vendor:"Skibox",tld:"biz",category:"sports",popularity:.32},{id:600,vendor:"Tagtune",tld:"org",category:"beauty",popularity:.43},{id:601,vendor:"Eare",tld:"info",category:"outdoors",popularity:.39},{id:602,vendor:"Dabjam",tld:"edu",category:"tools",popularity:.29},{id:603,vendor:"Twitterbeat",tld:"org",category:"toys",popularity:.8},{id:604,vendor:"Quimba",tld:"biz",category:"games",popularity:.59},{id:605,vendor:"Oozz",tld:"com",category:"shoes",popularity:.66},{id:606,vendor:"Yoveo",tld:"com",category:"tools",popularity:.21},{id:607,vendor:"Photofeed",tld:"org",category:"computers",popularity:.73},{id:608,vendor:"Eayo",tld:"biz",category:"electronics",popularity:.64},{id:609,vendor:"Zoonoodle",tld:"name",category:"automotive",popularity:.83},{id:610,vendor:"Livetube",tld:"info",category:"industrial",popularity:.61},{id:611,vendor:"Ailane",tld:"org",category:"electronics",popularity:.83},{id:612,vendor:"Zooveo",tld:"edu",category:"clothing",popularity:.58},{id:613,vendor:"Realbridge",tld:"info",category:"baby",popularity:.68},{id:614,vendor:"Skiptube",tld:"info",category:"outdoors",popularity:.3},{id:615,vendor:"Riffpedia",tld:"info",category:"tools",popularity:.57},{id:616,vendor:"Buzzbean",tld:"name",category:"garden",popularity:.37},{id:617,vendor:"Skibox",tld:"net",category:"games",popularity:.59},{id:618,vendor:"Topicblab",tld:"com",category:"kids",popularity:.56},{id:619,vendor:"Skaboo",tld:"com",category:"sports",popularity:1.1},{id:620,vendor:"Riffpedia",tld:"com",category:"grocery",popularity:.69},{id:621,vendor:"Oyondu",tld:"com",category:"toys",popularity:.14},{id:622,vendor:"Meevee",tld:"net",category:"shoes",popularity:.55},{id:623,vendor:"Jabbertype",tld:"gov",category:"baby",popularity:.77},{id:624,vendor:"Kanoodle",tld:"edu",category:"computers",popularity:.21},{id:625,vendor:"Tagchat",tld:"info",category:"computers",popularity:.33},{id:626,vendor:"Fadeo",tld:"com",category:"movies",popularity:.47},{id:627,vendor:"Aimbo",tld:"gov",category:"clothing",popularity:.01},{id:628,vendor:"Quimba",tld:"edu",category:"toys",popularity:.84},{id:629,vendor:"Twiyo",tld:"mil",category:"grocery",popularity:.23},{id:630,vendor:"Thoughtblab",tld:"name",category:"books",popularity:.45},{id:631,vendor:"Meembee",tld:"info",category:"beauty",popularity:.25},{id:632,vendor:"Twimbo",tld:"org",category:"books",popularity:.33},{id:633,vendor:"Brainsphere",tld:"org",category:"sports",popularity:.75},{id:634,vendor:"Quatz",tld:"edu",category:"baby",popularity:.87},{id:635,vendor:"Fanoodle",tld:"mil",category:"electronics",popularity:.2},{id:636,vendor:"Buzzshare",tld:"info",category:"tools",popularity:.59},{id:637,vendor:"Yodel",tld:"edu",category:"books",popularity:.45},{id:638,vendor:"Buzzbean",tld:"mil",category:"kids",popularity:.77},{id:639,vendor:"Kayveo",tld:"org",category:"kids",popularity:.37},{id:640,vendor:"Kare",tld:"mil",category:"books",popularity:.15},{id:641,vendor:"Cogidoo",tld:"info",category:"clothing",popularity:.33},{id:642,vendor:"Zoomdog",tld:"gov",category:"movies",popularity:.56},{id:643,vendor:"Twitterlist",tld:"name",category:"sports",popularity:.69},{id:644,vendor:"Nlounge",tld:"edu",category:"movies",popularity:.31},{id:645,vendor:"Twiyo",tld:"net",category:"baby",popularity:.63},{id:646,vendor:"Feedfire",tld:"edu",category:"music",popularity:.97},{id:647,vendor:"Trunyx",tld:"mil",category:"kids",popularity:.33},{id:648,vendor:"Skyble",tld:"gov",category:"garden",popularity:.39},{id:649,vendor:"Npath",tld:"name",category:"outdoors",popularity:.68},{id:650,vendor:"Meedoo",tld:"info",category:"jewelry",popularity:.39},{id:651,vendor:"Skivee",tld:"net",category:"electronics",popularity:.72},{id:652,vendor:"Fiveclub",tld:"org",category:"outdoors",popularity:.5},{id:653,vendor:"Talane",tld:"org",category:"home",popularity:.55},{id:654,vendor:"Jaxbean",tld:"com",category:"computers",popularity:.56},{id:655,vendor:"Realblab",tld:"edu",category:"toys",popularity:.05},{id:656,vendor:"Eamia",tld:"name",category:"books",popularity:.35},{id:657,vendor:"Meevee",tld:"net",category:"computers",popularity:.82},{id:658,vendor:"Lazz",tld:"edu",category:"baby",popularity:.51},{id:659,vendor:"Ntags",tld:"edu",category:"movies",popularity:.68},{id:660,vendor:"Dabfeed",tld:"mil",category:"industrial",popularity:.7},{id:661,vendor:"Linklinks",tld:"gov",category:"home",popularity:.82},{id:662,vendor:"Wikizz",tld:"info",category:"clothing",popularity:.5},{id:663,vendor:"Gigaclub",tld:"net",category:"kids",popularity:.62},{id:664,vendor:"Cogilith",tld:"gov",category:"garden",popularity:.31},{id:665,vendor:"Chatterbridge",tld:"edu",category:"electronics",popularity:.88},{id:666,vendor:"Ntags",tld:"biz",category:"movies",popularity:.15},{id:667,vendor:"Flipopia",tld:"edu",category:"sports",popularity:.6},{id:668,vendor:"Feednation",tld:"info",category:"sports",popularity:.43},{id:669,vendor:"Rooxo",tld:"info",category:"health",popularity:.36},{id:670,vendor:"Yoveo",tld:"com",category:"shoes",popularity:.34},{id:671,vendor:"Lazzy",tld:"org",category:"movies",popularity:.29},{id:672,vendor:"Shufflester",tld:"name",category:"health",popularity:.78},{id:673,vendor:"Demimbu",tld:"gov",category:"books",popularity:.65},{id:674,vendor:"Katz",tld:"net",category:"baby",popularity:.38},{id:675,vendor:"InnoZ",tld:"com",category:"tools",popularity:.58},{id:676,vendor:"Zooveo",tld:"net",category:"shoes",popularity:.18},{id:677,vendor:"Wordtune",tld:"name",category:"kids",popularity:.41},{id:678,vendor:"Skajo",tld:"org",category:"kids",popularity:.37},{id:679,vendor:"Rooxo",tld:"net",category:"movies",popularity:.21},{id:680,vendor:"Youspan",tld:"biz",category:"tools",popularity:.74},{id:681,vendor:"Topicshots",tld:"gov",category:"shoes",popularity:.47},{id:682,vendor:"Brainverse",tld:"mil",category:"games",popularity:.38},{id:683,vendor:"Flashdog",tld:"gov",category:"movies",popularity:.61},{id:684,vendor:"Feedbug",tld:"net",category:"home",popularity:.83},{id:685,vendor:"Centimia",tld:"name",category:"books",popularity:.15},{id:686,vendor:"Twitternation",tld:"biz",category:"tools",popularity:.18},{id:687,vendor:"Oyondu",tld:"biz",category:"electronics",popularity:-.12},{id:688,vendor:"Flipbug",tld:"org",category:"health",popularity:.34},{id:689,vendor:"Gevee",tld:"name",category:"beauty",popularity:.75},{id:690,vendor:"Eadel",tld:"net",category:"industrial",popularity:.89},{id:691,vendor:"Dabjam",tld:"biz",category:"tools",popularity:.85},{id:692,vendor:"Fadeo",tld:"org",category:"jewelry",popularity:.08},{id:693,vendor:"Babbleblab",tld:"org",category:"games",popularity:.21},{id:694,vendor:"Linkbuzz",tld:"edu",category:"grocery",popularity:.03},{id:695,vendor:"Youfeed",tld:"net",category:"games",popularity:.53},{id:696,vendor:"Oyoba",tld:"com",category:"movies",popularity:1.08},{id:697,vendor:"Oloo",tld:"name",category:"toys",popularity:.68},{id:698,vendor:"Livetube",tld:"net",category:"outdoors",popularity:.36},{id:699,vendor:"Realcube",tld:"com",category:"movies",popularity:.61},{id:700,vendor:"Jaxworks",tld:"org",category:"shoes",popularity:.21},{id:701,vendor:"Divanoodle",tld:"org",category:"toys",popularity:.89},{id:702,vendor:"Skilith",tld:"org",category:"computers",popularity:.16},{id:703,vendor:"Livefish",tld:"name",category:"garden",popularity:.5},{id:704,vendor:"Kayveo",tld:"org",category:"computers",popularity:.8},{id:705,vendor:"Twitterbridge",tld:"gov",category:"grocery",popularity:.74},{id:706,vendor:"Edgewire",tld:"edu",category:"shoes",popularity:.39},{id:707,vendor:"Riffpedia",tld:"edu",category:"electronics",popularity:.47},{id:708,vendor:"Camido",tld:"mil",category:"movies",popularity:1},{id:709,vendor:"Jayo",tld:"com",category:"jewelry",popularity:.42},{id:710,vendor:"Katz",tld:"name",category:"kids",popularity:.73},{id:711,vendor:"Livefish",tld:"com",category:"baby",popularity:.42},{id:712,vendor:"Latz",tld:"net",category:"health",popularity:.41},{id:713,vendor:"Mybuzz",tld:"gov",category:"home",popularity:.46},{id:714,vendor:"Twitternation",tld:"edu",category:"shoes",popularity:.18},{id:715,vendor:"Photojam",tld:"com",category:"automotive",popularity:.51},{id:716,vendor:"Browseblab",tld:"net",category:"kids",popularity:.19},{id:717,vendor:"Yozio",tld:"com",category:"automotive",popularity:1.02},{id:718,vendor:"Quimm",tld:"com",category:"clothing",popularity:.63},{id:719,vendor:"Skynoodle",tld:"gov",category:"games",popularity:.22},{id:720,vendor:"Rhynyx",tld:"gov",category:"games",popularity:.74},{id:721,vendor:"Devpulse",tld:"mil",category:"sports",popularity:.43},{id:722,vendor:"Fivechat",tld:"info",category:"kids",popularity:.45},{id:723,vendor:"Trudoo",tld:"mil",category:"clothing",popularity:.38},{id:724,vendor:"Kayveo",tld:"biz",category:"books",popularity:.46},{id:725,vendor:"Ooba",tld:"gov",category:"automotive",popularity:.81},{id:726,vendor:"Oloo",tld:"name",category:"computers",popularity:.88},{id:727,vendor:"BlogXS",tld:"edu",category:"garden",popularity:.53},{id:728,vendor:"Riffpedia",tld:"com",category:"electronics",popularity:.41},{id:729,vendor:"Fivechat",tld:"info",category:"garden",popularity:.31},{id:730,vendor:"Pixope",tld:"biz",category:"home",popularity:.39},{id:731,vendor:"Flashdog",tld:"mil",category:"books",popularity:.82},{id:732,vendor:"Yombu",tld:"mil",category:"jewelry",popularity:.34},{id:733,vendor:"Trilia",tld:"biz",category:"home",popularity:.83},{id:734,vendor:"Shuffledrive",tld:"info",category:"beauty",popularity:.45},{id:735,vendor:"Skaboo",tld:"mil",category:"computers",popularity:.52},{id:736,vendor:"Oodoo",tld:"biz",category:"kids",popularity:.27},{id:737,vendor:"Kazu",tld:"com",category:"automotive",popularity:.66},{id:738,vendor:"Gigazoom",tld:"com",category:"computers",popularity:.7},{id:739,vendor:"Mydo",tld:"org",category:"tools",popularity:.6},{id:740,vendor:"Browsezoom",tld:"edu",category:"automotive",popularity:.78},{id:741,vendor:"Youopia",tld:"biz",category:"music",popularity:.62},{id:742,vendor:"Babbleset",tld:"mil",category:"jewelry",popularity:.73},{id:743,vendor:"Omba",tld:"mil",category:"electronics",popularity:.49},{id:744,vendor:"Trilith",tld:"com",category:"music",popularity:.49},{id:745,vendor:"Topiczoom",tld:"info",category:"health",popularity:0},{id:746,vendor:"Blogspan",tld:"gov",category:"health",popularity:.55},{id:747,vendor:"Shufflebeat",tld:"net",category:"kids",popularity:.53},{id:748,vendor:"Oyonder",tld:"edu",category:"shoes",popularity:.81},{id:749,vendor:"Tagopia",tld:"biz",category:"clothing",popularity:.1},{id:750,vendor:"Pixoboo",tld:"net",category:"computers",popularity:.5},{id:751,vendor:"Skipstorm",tld:"name",category:"movies",popularity:1.07},{id:752,vendor:"Youtags",tld:"biz",category:"electronics",popularity:.56},{id:753,vendor:"Wordware",tld:"info",category:"tools",popularity:.75},{id:754,vendor:"Zoonder",tld:"mil",category:"sports",popularity:.48},{id:755,vendor:"Brainverse",tld:"mil",category:"beauty",popularity:.25},{id:756,vendor:"Feedfire",tld:"gov",category:"clothing",popularity:.81},{id:757,vendor:"Tanoodle",tld:"gov",category:"movies",popularity:.63},{id:758,vendor:"Devbug",tld:"mil",category:"electronics",popularity:.31},{id:759,vendor:"Voolia",tld:"name",category:"grocery",popularity:.39},{id:760,vendor:"LiveZ",tld:"gov",category:"electronics",popularity:.48},{id:761,vendor:"InnoZ",tld:"gov",category:"garden",popularity:.8},{id:762,vendor:"Photobean",tld:"gov",category:"baby",popularity:.55},{id:763,vendor:"Digitube",tld:"edu",category:"clothing",popularity:.04},{id:764,vendor:"Abata",tld:"mil",category:"health",popularity:.62},{id:765,vendor:"Oloo",tld:"mil",category:"garden",popularity:.23},{id:766,vendor:"Katz",tld:"name",category:"outdoors",popularity:.63},{id:767,vendor:"Fivechat",tld:"edu",category:"kids",popularity:.53},{id:768,vendor:"Dabtype",tld:"org",category:"grocery",popularity:.27},{id:769,vendor:"Vitz",tld:"gov",category:"beauty",popularity:.12},{id:770,vendor:"Yambee",tld:"mil",category:"movies",popularity:.64},{id:771,vendor:"LiveZ",tld:"gov",category:"kids",popularity:.33},{id:772,vendor:"Pixope",tld:"net",category:"home",popularity:.39},{id:773,vendor:"Gabtune",tld:"info",category:"industrial",popularity:.68},{id:774,vendor:"Voonyx",tld:"gov",category:"beauty",popularity:.47},{id:775,vendor:"Jetwire",tld:"gov",category:"health",popularity:.43},{id:776,vendor:"Meejo",tld:"org",category:"games",popularity:.67},{id:777,vendor:"Dynabox",tld:"info",category:"grocery",popularity:.55},{id:778,vendor:"Kayveo",tld:"biz",category:"shoes",popularity:.42},{id:779,vendor:"Abatz",tld:"name",category:"industrial",popularity:.3},{id:780,vendor:"Linklinks",tld:"org",category:"computers",popularity:.13},{id:781,vendor:"Zoozzy",tld:"org",category:"garden",popularity:.4},{id:782,vendor:"Topiclounge",tld:"name",category:"toys",popularity:.42},{id:783,vendor:"Skipstorm",tld:"org",category:"home",popularity:.63},{id:784,vendor:"Jazzy",tld:"info",category:"baby",popularity:.33},{id:785,vendor:"Skiptube",tld:"net",category:"health",popularity:.73},{id:786,vendor:"Bubblebox",tld:"gov",category:"jewelry",popularity:.93},{id:787,vendor:"Izio",tld:"name",category:"health",popularity:.68},{id:788,vendor:"Skinder",tld:"edu",category:"baby",popularity:-.02},{id:789,vendor:"Mita",tld:"org",category:"sports",popularity:.64},{id:790,vendor:"Eabox",tld:"edu",category:"home",popularity:.15},{id:791,vendor:"Wordpedia",tld:"mil",category:"music",popularity:0},{id:792,vendor:"Oba",tld:"name",category:"clothing",popularity:.29},{id:793,vendor:"Meemm",tld:"biz",category:"automotive",popularity:.84},{id:794,vendor:"Vimbo",tld:"mil",category:"books",popularity:.2},{id:795,vendor:"Yakidoo",tld:"info",category:"books",popularity:.92},{id:796,vendor:"Voomm",tld:"com",category:"shoes",popularity:.45},{id:797,vendor:"Browsezoom",tld:"org",category:"automotive",popularity:.58},{id:798,vendor:"Yakitri",tld:"com",category:"books",popularity:.74},{id:799,vendor:"Twiyo",tld:"name",category:"tools",popularity:.65},{id:800,vendor:"Feedmix",tld:"com",category:"toys",popularity:.48},{id:801,vendor:"Tagtune",tld:"com",category:"clothing",popularity:.39},{id:802,vendor:"Youtags",tld:"org",category:"outdoors",popularity:.05},{id:803,vendor:"Babbleblab",tld:"net",category:"toys",popularity:.5},{id:804,vendor:"Wordpedia",tld:"edu",category:"automotive",popularity:.74},{id:805,vendor:"Kwinu",tld:"net",category:"home",popularity:.7},{id:806,vendor:"Meetz",tld:"org",category:"toys",popularity:.69},{id:807,vendor:"Realfire",tld:"com",category:"shoes",popularity:.7},{id:808,vendor:"Quimba",tld:"mil",category:"computers",popularity:.62},{id:809,vendor:"Lajo",tld:"com",category:"books",popularity:.45},{id:810,vendor:"Abata",tld:"gov",category:"clothing",popularity:.47},{id:811,vendor:"Skinix",tld:"com",category:"baby",popularity:.71},{id:812,vendor:"Ntags",tld:"biz",category:"health",popularity:.06},{id:813,vendor:"Ainyx",tld:"com",category:"shoes",popularity:.46},{id:814,vendor:"Tagtune",tld:"name",category:"music",popularity:.72},{id:815,vendor:"Twitterlist",tld:"gov",category:"home",popularity:.61},{id:816,vendor:"Kazio",tld:"edu",category:"garden",popularity:.21},{id:817,vendor:"Agimba",tld:"biz",category:"computers",popularity:.5},{id:818,vendor:"Quimm",tld:"mil",category:"garden",popularity:.32},{id:819,vendor:"Brainverse",tld:"biz",category:"grocery",popularity:.34},{id:820,vendor:"Twinder",tld:"biz",category:"music",popularity:.79},{id:821,vendor:"Twitterworks",tld:"org",category:"industrial",popularity:.26},{id:822,vendor:"Photospace",tld:"com",category:"industrial",popularity:.2},{id:823,vendor:"Thoughtblab",tld:"org",category:"computers",popularity:.51},{id:824,vendor:"Pixoboo",tld:"gov",category:"electronics",popularity:.54},{id:825,vendor:"Quire",tld:"org",category:"electronics",popularity:.52},{id:826,vendor:"Vitz",tld:"com",category:"beauty",popularity:.57},{id:827,vendor:"Vimbo",tld:"gov",category:"health",popularity:.25},{id:828,vendor:"Dabvine",tld:"com",category:"beauty",popularity:.45},{id:829,vendor:"Devpulse",tld:"net",category:"movies",popularity:.51},{id:830,vendor:"Layo",tld:"net",category:"games",popularity:.39},{id:831,vendor:"Zoomlounge",tld:"org",category:"games",popularity:.49},{id:832,vendor:"Browsetype",tld:"com",category:"kids",popularity:.14},{id:833,vendor:"Brainverse",tld:"biz",category:"garden",popularity:.79},{id:834,vendor:"Izio",tld:"org",category:"movies",popularity:.5},{id:835,vendor:"Vipe",tld:"info",category:"books",popularity:.76},{id:836,vendor:"Dablist",tld:"edu",category:"books",popularity:-.11},{id:837,vendor:"Eayo",tld:"com",category:"clothing",popularity:.54},{id:838,vendor:"Yozio",tld:"mil",category:"garden",popularity:.76},{id:839,vendor:"Ntag",tld:"info",category:"industrial",popularity:.72},{id:840,vendor:"Feedfish",tld:"gov",category:"kids",popularity:.62},{id:841,vendor:"Myworks",tld:"org",category:"computers",popularity:.74},{id:842,vendor:"Voomm",tld:"net",category:"baby",popularity:.31},{id:843,vendor:"Realblab",tld:"name",category:"garden",popularity:.57},{id:844,vendor:"Realfire",tld:"edu",category:"home",popularity:.49},{id:845,vendor:"Dabshots",tld:"edu",category:"tools",popularity:.49},{id:846,vendor:"Topicblab",tld:"org",category:"grocery",popularity:.37},{id:847,vendor:"BlogXS",tld:"edu",category:"tools",popularity:.78},{id:848,vendor:"Skalith",tld:"name",category:"automotive",popularity:.03},{id:849,vendor:"Abata",tld:"net",category:"industrial",popularity:.27},{id:850,vendor:"Jetwire",tld:"info",category:"games",popularity:.67},{id:851,vendor:"Youopia",tld:"gov",category:"computers",popularity:.33},{id:852,vendor:"Eare",tld:"org",category:"sports",popularity:.48},{id:853,vendor:"Skippad",tld:"biz",category:"kids",popularity:.48},{id:854,vendor:"Vitz",tld:"com",category:"toys",popularity:0},{id:855,vendor:"Wikibox",tld:"mil",category:"jewelry",popularity:.34},{id:856,vendor:"Skilith",tld:"edu",category:"industrial",popularity:.79},{id:857,vendor:"Voolia",tld:"com",category:"garden",popularity:.64},{id:858,vendor:"Vimbo",tld:"mil",category:"beauty",popularity:-.1},{id:859,vendor:"Topiclounge",tld:"name",category:"tools",popularity:.59},{id:860,vendor:"Rhynyx",tld:"name",category:"books",popularity:.21},{id:861,vendor:"Livetube",tld:"biz",category:"kids",popularity:.36},{id:862,vendor:"Agivu",tld:"info",category:"games",popularity:.82},{id:863,vendor:"Skiptube",tld:"gov",category:"jewelry",popularity:.39},{id:864,vendor:"Twitterlist",tld:"info",category:"books",popularity:1.16},{id:865,vendor:"Kwinu",tld:"biz",category:"kids",popularity:.8},{id:866,vendor:"Roodel",tld:"org",category:"books",popularity:.67},{id:867,vendor:"Livepath",tld:"net",category:"clothing",popularity:.51},{id:868,vendor:"Midel",tld:"net",category:"automotive",popularity:.99},{id:869,vendor:"Fadeo",tld:"net",category:"tools",popularity:.3},{id:870,vendor:"Roombo",tld:"name",category:"movies",popularity:.88},{id:871,vendor:"Zooxo",tld:"gov",category:"beauty",popularity:1.01},{id:872,vendor:"Babbleopia",tld:"gov",category:"sports",popularity:.36},{id:873,vendor:"Kazu",tld:"net",category:"beauty",popularity:.81},{id:874,vendor:"Kwideo",tld:"name",category:"music",popularity:.5},{id:875,vendor:"Meezzy",tld:"info",category:"electronics",popularity:.61},{id:876,vendor:"Yozio",tld:"name",category:"music",popularity:.62},{id:877,vendor:"Twitterbeat",tld:"edu",category:"kids",popularity:.69},{id:878,vendor:"Avamm",tld:"net",category:"health",popularity:.21},{id:879,vendor:"Snaptags",tld:"name",category:"toys",popularity:.76},{id:880,vendor:"Youopia",tld:"edu",category:"health",popularity:.43},{id:881,vendor:"Zooxo",tld:"net",category:"garden",popularity:.8},{id:882,vendor:"Ailane",tld:"edu",category:"movies",popularity:.9},{id:883,vendor:"Voolith",tld:"name",category:"industrial",popularity:.38},{id:884,vendor:"Edgeblab",tld:"net",category:"toys",popularity:.48},{id:885,vendor:"Twitternation",tld:"biz",category:"clothing",popularity:.42},{id:886,vendor:"Babbleblab",tld:"info",category:"computers",popularity:.5},{id:887,vendor:"Topdrive",tld:"com",category:"books",popularity:.54},{id:888,vendor:"Tagtune",tld:"biz",category:"toys",popularity:.2},{id:889,vendor:"Feedmix",tld:"edu",category:"toys",popularity:.39},{id:890,vendor:"Tagchat",tld:"org",category:"grocery",popularity:.33},{id:891,vendor:"Thoughtstorm",tld:"mil",category:"music",popularity:.1},{id:892,vendor:"Kazio",tld:"net",category:"books",popularity:.87},{id:893,vendor:"Vipe",tld:"edu",category:"outdoors",popularity:.49},{id:894,vendor:"Browsezoom",tld:"mil",category:"health",popularity:.57},{id:895,vendor:"Jaxnation",tld:"name",category:"sports",popularity:.34},{id:896,vendor:"Mybuzz",tld:"info",category:"kids",popularity:.54},{id:897,vendor:"Wikizz",tld:"info",category:"jewelry",popularity:.5},{id:898,vendor:"Kazio",tld:"info",category:"clothing",popularity:.56},{id:899,vendor:"Yoveo",tld:"net",category:"industrial",popularity:.24},{id:900,vendor:"Topiclounge",tld:"gov",category:"outdoors",popularity:.44},{id:901,vendor:"Yata",tld:"gov",category:"garden",popularity:.11},{id:902,vendor:"Skimia",tld:"biz",category:"electronics",popularity:.19},{id:903,vendor:"Topicware",tld:"gov",category:"jewelry",popularity:.43},{id:904,vendor:"Ooba",tld:"com",category:"books",popularity:.11},{id:905,vendor:"Edgeclub",tld:"name",category:"home",popularity:.37},{id:906,vendor:"Trilith",tld:"name",category:"industrial",popularity:.6},{id:907,vendor:"Eidel",tld:"org",category:"home",popularity:.43},{id:908,vendor:"Flipbug",tld:"mil",category:"health",popularity:.48},{id:909,vendor:"Twitterworks",tld:"net",category:"automotive",popularity:.47},{id:910,vendor:"Edgepulse",tld:"edu",category:"movies",popularity:.42},{id:911,vendor:"Vinder",tld:"gov",category:"garden",popularity:.77},{id:912,vendor:"Trilia",tld:"com",category:"music",popularity:0},{id:913,vendor:"Jabbersphere",tld:"org",category:"kids",popularity:.7},{id:914,vendor:"Yakitri",tld:"info",category:"games",popularity:.26},{id:915,vendor:"Mymm",tld:"edu",category:"music",popularity:.43},{id:916,vendor:"Linkbuzz",tld:"edu",category:"clothing",popularity:.53},{id:917,vendor:"Yadel",tld:"mil",category:"grocery",popularity:.09},{id:918,vendor:"Rooxo",tld:"gov",category:"industrial",popularity:.7},{id:919,vendor:"Mybuzz",tld:"info",category:"clothing",popularity:.3},{id:920,vendor:"Aimbu",tld:"info",category:"baby",popularity:.32},{id:921,vendor:"Eazzy",tld:"edu",category:"beauty",popularity:.14},{id:922,vendor:"Agivu",tld:"com",category:"electronics",popularity:.76},{id:923,vendor:"Devify",tld:"info",category:"automotive",popularity:.7},{id:924,vendor:"Vinte",tld:"gov",category:"movies",popularity:.29},{id:925,vendor:"Tanoodle",tld:"info",category:"movies",popularity:.61},{id:926,vendor:"Meetz",tld:"com",category:"toys",popularity:.24},{id:927,vendor:"Youopia",tld:"net",category:"games",popularity:.7},{id:928,vendor:"Yakidoo",tld:"net",category:"shoes",popularity:.63},{id:929,vendor:"Buzzbean",tld:"mil",category:"beauty",popularity:.36},{id:930,vendor:"Podcat",tld:"com",category:"outdoors",popularity:.57},{id:931,vendor:"Kare",tld:"org",category:"shoes",popularity:.64},{id:932,vendor:"Wikido",tld:"org",category:"tools",popularity:.7},{id:933,vendor:"Youspan",tld:"net",category:"shoes",popularity:.48},{id:934,vendor:"Quimm",tld:"net",category:"shoes",popularity:.46},{id:935,vendor:"Cogibox",tld:"biz",category:"sports",popularity:.23},{id:936,vendor:"Browsebug",tld:"edu",category:"shoes",popularity:.98},{id:937,vendor:"Devify",tld:"info",category:"industrial",popularity:.75},{id:938,vendor:"Janyx",tld:"biz",category:"jewelry",popularity:.72},{id:939,vendor:"Mydo",tld:"org",category:"books",popularity:.79},{id:940,vendor:"Avamm",tld:"name",category:"games",popularity:.82},{id:941,vendor:"Gigashots",tld:"mil",category:"garden",popularity:.07},{id:942,vendor:"Avamba",tld:"edu",category:"jewelry",popularity:.49},{id:943,vendor:"Eimbee",tld:"info",category:"toys",popularity:.78},{id:944,vendor:"Edgeify",tld:"gov",category:"books",popularity:.64},{id:945,vendor:"Oloo",tld:"mil",category:"kids",popularity:.68},{id:946,vendor:"Meembee",tld:"com",category:"games",popularity:.36},{id:947,vendor:"Jetpulse",tld:"edu",category:"games",popularity:1},{id:948,vendor:"Babbleblab",tld:"org",category:"health",popularity:.47},{id:949,vendor:"Tagpad",tld:"gov",category:"health",popularity:.44},{id:950,vendor:"Leexo",tld:"net",category:"industrial",popularity:.16},{id:951,vendor:"Voomm",tld:"edu",category:"shoes",popularity:.51},{id:952,vendor:"JumpXS",tld:"com",category:"home",popularity:.75},{id:953,vendor:"Skalith",tld:"gov",category:"computers",popularity:.48},{id:954,vendor:"Photobug",tld:"name",category:"movies",popularity:.56},{id:955,vendor:"Fatz",tld:"edu",category:"garden",popularity:.47},{id:956,vendor:"Youbridge",tld:"net",category:"clothing",popularity:.44},{id:957,vendor:"Tagpad",tld:"com",category:"sports",popularity:-.05},{id:958,vendor:"Twimm",tld:"net",category:"jewelry",popularity:.53},{id:959,vendor:"Meejo",tld:"org",category:"automotive",popularity:.65},{id:960,vendor:"Photobean",tld:"mil",category:"industrial",popularity:.11},{id:961,vendor:"Edgetag",tld:"org",category:"beauty",popularity:1.05},{id:962,vendor:"Skimia",tld:"gov",category:"garden",popularity:.59},{id:963,vendor:"Youtags",tld:"info",category:"industrial",popularity:.4},{id:964,vendor:"Skynoodle",tld:"net",category:"industrial",popularity:.67},{id:965,vendor:"Feedbug",tld:"info",category:"kids",popularity:.57},{id:966,vendor:"Eare",tld:"name",category:"sports",popularity:.3},{id:967,vendor:"Chatterpoint",tld:"name",category:"beauty",popularity:.21},{id:968,vendor:"Youspan",tld:"biz",category:"electronics",popularity:.47},{id:969,vendor:"BlogXS",tld:"mil",category:"movies",popularity:.88},{id:970,vendor:"DabZ",tld:"info",category:"clothing",popularity:.53},{id:971,vendor:"Feedfire",tld:"biz",category:"industrial",popularity:.79},{id:972,vendor:"Realcube",tld:"mil",category:"toys",popularity:.35},{id:973,vendor:"Avavee",tld:"org",category:"clothing",popularity:.63},{id:974,vendor:"Quatz",tld:"edu",category:"electronics",popularity:.32},{id:975,vendor:"Zoombeat",tld:"com",category:"outdoors",popularity:1.21},{id:976,vendor:"Realfire",tld:"mil",category:"tools",popularity:.24},{id:977,vendor:"Topicware",tld:"biz",category:"industrial",popularity:.68},{id:978,vendor:"Oyondu",tld:"name",category:"health",popularity:.86},{id:979,vendor:"Thoughtstorm",tld:"net",category:"toys",popularity:.3},{id:980,vendor:"Jayo",tld:"com",category:"clothing",popularity:.58},{id:981,vendor:"Jabberstorm",tld:"biz",category:"movies",popularity:.53},{id:982,vendor:"Topiclounge",tld:"com",category:"beauty",popularity:.17},{id:983,vendor:"Oyondu",tld:"edu",category:"health",popularity:.54},{id:984,vendor:"Yakidoo",tld:"gov",category:"shoes",popularity:.7},{id:985,vendor:"Edgewire",tld:"edu",category:"industrial",popularity:.56},{id:986,vendor:"Yodo",tld:"mil",category:"clothing",popularity:.42},{id:987,vendor:"Oozz",tld:"info",category:"shoes",popularity:.62},{id:988,vendor:"Linkbridge",tld:"edu",category:"clothing",popularity:.43},{id:989,vendor:"Livetube",tld:"gov",category:"jewelry",popularity:.29},{id:990,vendor:"Leexo",tld:"name",category:"movies",popularity:.24},{id:991,vendor:"Topdrive",tld:"info",category:"electronics",popularity:.94},{id:992,vendor:"Kaymbo",tld:"net",category:"music",popularity:.8},{id:993,vendor:"Rooxo",tld:"mil",category:"toys",popularity:.28},{id:994,vendor:"Feedmix",tld:"net",category:"computers",popularity:1},{id:995,vendor:"Pixonyx",tld:"edu",category:"industrial",popularity:.32},{id:996,vendor:"Yakidoo",tld:"gov",category:"shoes",popularity:.46},{id:997,vendor:"Linklinks",tld:"name",category:"shoes",popularity:.27},{id:998,vendor:"Fivechat",tld:"name",category:"grocery",popularity:.6},{id:999,vendor:"Jaxspan",tld:"mil",category:"baby",popularity:.48},{id:1e3,vendor:"Feednation",tld:"net",category:"industrial",popularity:.27}];const Se=e=>e[Math.floor(Math.random()*e.length)],Be=(e,t)=>Math.random()*(t-e)+e,ne=(e,t)=>Math.floor(Be(e,t)),Fe=()=>Se(ar),nr=0,te={id:120658,name:"New York",lonlat:[-73.993562,40.727063],diameter:.1},dr=500,At=(e,t)=>b(e,`
      INSERT INTO cities (city_id, city_name, center, diameter)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        city_name = VALUES(city_name),
        center = VALUES(center),
        diameter = VALUES(diameter)
    `,t.id,t.name,`POINT(${t.lonlat[0]} ${t.lonlat[1]})`,t.diameter),lr=(e,t)=>b(e,"DELETE FROM cities WHERE city_id = ?",t),sr=["olc_8","purchase","request"],cr=["minute","hour","day","week","month"],Ot=({interval:e,kind:t,value:o})=>ro(`${e}-${t}-${o}`),pr=async(e,t)=>{const o=new Rt("segments",["segment_id","valid_interval","filter_kind","filter_value"]);for(const r of t)o.append(Ot(r),r.interval,r.kind,r.value);await b(e,o.sql(),...o.params())},yr=async(e,t,o=nr)=>{const r=new Rt("offers",["customer_id","notification_zone","segment_ids","notification_content","notification_target","maximum_bid_cents"]);let a=0,n=[];const d=async()=>{await Promise.all([b(e,r.sql(),...r.params()),pr(e,n)]),r.clear(),n=[],a=0};for(const s of t)r.append(o,s.notificationZone,JSON.stringify(s.segments.map(Ot)),s.notificationContent,s.notificationTarget,s.maximumBidCents),a++,n=n.concat(s.segments),a>=dr&&await d();a>0&&await d()},ur=()=>Se(sr),gr=()=>Se(cr),It=({vendor:e,tld:t})=>`${e.toLowerCase()}.${t}`,wt=e=>{const[t,o]=e.lonlat,r=e.diameter/2,[a,n]=[t-r,t+r],[d,s]=[o-r,o+r];return[Be(a,n),Be(d,s)]},mr=e=>{const t=ur(),o=gr();switch(t){case"olc_8":{const[r,a]=wt(e),n=Me.encode(a,r,8).substring(0,8);return{kind:t,interval:o,value:n}}case"purchase":return{kind:t,interval:o,value:Fe().vendor};case"request":return{kind:t,interval:o,value:It(Fe())}}},vr=e=>{const t=ne(1,3),o=Array.from({length:t},()=>mr(e)),r=Fe(),a=It(r),n=ne(10,50),d=ne(1,1e3),s=`${n}% off at ${r.vendor}`,l=`https://${a}/offers/${d}`,[c,y]=wt(e),u=Me.encode(y,c,Se([8,10])),m=Me.decode(u),h={ne:[m.latitudeHi,m.longitudeHi],sw:[m.latitudeLo,m.longitudeLo]};return{segments:o,notificationZone:Qe(h),notificationContent:s,notificationTarget:l,maximumBidCents:ne(2,15)}},br=(e,t)=>Array.from({length:t},()=>vr(e)),hr=e=>(t,o,r,a=1)=>`https://stamen-tiles.a.ssl.fastly.net/${e}/${r}/${t}/${o}${a>=2?"@2x":""}.png`,fr=p(R,{children:["Map tiles by ",i(B,{href:"http://stamen.com",children:"Stamen Design"}),", under"," ",i(B,{href:"http://creativecommons.org/licenses/by/3.0",children:"CC BY 3.0"}),". Data by ",i(B,{href:"http://openstreetmap.org",children:"OpenStreetMap"}),", under"," ",i(B,{href:"http://www.openstreetmap.org/copyright",children:"ODbL"}),"."]}),Er=[te.lonlat[1],te.lonlat[0]],_r=12,Tr=({width:e,height:t,bounds:o,latLngToPixel:r,pixelToLatLng:a,useRenderer:n,options:d})=>{const s=oe.useRef(null),l=ct(()=>new V),{setup:c,update:y}=n({scene:l,width:e,height:t,bounds:o,latLngToPixel:r,pixelToLatLng:a,options:d});return g.exports.useLayoutEffect(()=>{if(!s.current)throw new Error("No canvas ref");console.log("PixiMapLayer: Setup");const u=new ao({view:s.current,width:e,height:t,backgroundAlpha:0,antialias:!0});return u.stage.addChild(l),c==null||c(),y&&u.ticker.add(m=>{y(m)}),()=>{console.log("PixiMapLayer: Destroy"),u.stage.removeChild(l),u.destroy(!1,{children:!1,texture:!0,baseTexture:!0})}},[t,l,c,y,e]),i("canvas",{ref:s})},Sr=({mapState:e,latLngToPixel:t,pixelToLatLng:o,useRenderer:r,options:a})=>{const{width:n,height:d,bounds:s}=e||{width:0,height:0};return n<=0||d<=0||!t||!o||!s?null:i(Tr,{useRenderer:r,width:n,height:d,bounds:s,latLngToPixel:t,pixelToLatLng:o,options:a})},Ne=d=>{var s=d,{height:e="100%",defaultCenter:t=Er,defaultZoom:o=_r,useRenderer:r,options:a}=s,n=C(s,["height","defaultCenter","defaultZoom","useRenderer","options"]);const[l,c]=g.exports.useState(t),[y,u]=g.exports.useState(o);return i(x,T(f({borderRadius:"lg",overflow:"hidden",height:e},n),{children:i(io,{dprs:[1,2],provider:hr("toner-lite"),attribution:fr,maxZoom:20,center:l,zoom:y,onBoundsChanged:({center:m,zoom:h})=>{c(m),u(h)},children:i(Sr,{useRenderer:r,options:a})})}))};var Re=[{name:"date_sub_dynamic",createStmt:`CREATE OR REPLACE FUNCTION date_sub_dynamic (
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
END`}],Ae=[{name:"process_locations",createStmt:`CREATE OR REPLACE PROCEDURE process_locations (
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
END`}],Oe=[{name:"worldcities",createStmt:`create rowstore table if not exists worldcities (
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
);`},{name:"customers",createStmt:`create table if not exists customers (
  customer_id BIGINT NOT NULL,
  company_name TEXT NOT NULL,

  PRIMARY KEY (customer_id)
);`},{name:"offers",createStmt:`create rowstore reference table if not exists offers (
  offer_id BIGINT NOT NULL AUTO_INCREMENT,
  customer_id BIGINT NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT TRUE,

  notification_zone GEOGRAPHY NOT NULL,
  segment_ids JSON NOT NULL,

  notification_content TEXT NOT NULL,
  notification_target TEXT NOT NULL,

  maximum_bid_cents BIGINT NOT NULL,

  PRIMARY KEY (offer_id),
  INDEX (notification_zone)
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
);`}];const pe="singlestore-realtime-digital-marketing",Nr=[`CREATE LINK aws_s3 AS S3 CREDENTIALS '{}' CONFIG '{ "region": "us-east-1" }'`,"REPLACE INTO customers VALUES (0, 'default customer')",`
    CREATE OR REPLACE PIPELINE worldcities
    AS LOAD DATA LINK aws_s3 '${pe}/cities.ndjson'
    SKIP DUPLICATE KEY ERRORS
    INTO TABLE worldcities
    FORMAT JSON (
      city_id <- id,
      city_name <- name,
      @lat <- lat,
      @lng <- lng
    )
    SET center = GEOGRAPHY_POINT(@lng, @lat)
  `,"START PIPELINE worldcities FOREGROUND"],Rr=e=>{const t=Oe.find(a=>a.name===e);if(t)return t;const o=Ae.find(a=>a.name===e);if(o)return o;const r=Re.find(a=>a.name===e);if(r)return r;throw new Error("Could not find schema object: "+e)},Ar=async e=>{try{return await qe(e,"SELECT 1"),!0}catch{return!1}},Or=async e=>{let t={tables:[],procedures:[],functions:[]};const s=e,{database:o}=s,r=C(s,["database"]);try{t=(await Ze(r,`
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
        `,o,o)).reduce((l,[c,y])=>(l[c].push(y),l),t)}catch(l){if(!(l instanceof I&&(l.isUnknownDatabase()||l.isDatabaseRecovering())))throw l}const{tables:a,procedures:n,functions:d}=t;return Object.fromEntries([Oe.map(({name:l})=>[l,a.includes(l)]),Ae.map(({name:l})=>[l,n.includes(l)]),Re.map(({name:l})=>[l,d.includes(l)])].flat())},Ct=e=>qe(e,"DROP DATABASE IF EXISTS `"+e.database+"`"),Ir=async(e,{progress:t,scaleFactor:o,includeSeedData:r,skipCreate:a=!1})=>{a||(t("Dropping existing schema","info"),await Ct(e),t("Creating database","info"),await qe(e,"CREATE DATABASE `"+e.database+"`"));for(const n of Re)t(`Creating function: ${n.name}`,"info"),await b(e,n.createStmt);for(const n of Oe)t(`Creating table: ${n.name}`,"info"),await b(e,n.createStmt);for(const n of Ae)t(`Creating procedure: ${n.name}`,"info"),await b(e,n.createStmt);await wr(e),await At(e,te),r&&(t("Creating sample data","info"),await et(e,te,o)),t("Schema initialized","success")},wr=async e=>{for(const t of Nr)await b(e,t)},et=(e,t,o)=>{const r=100*o.partitions,a=br(t,r);return yr(e,a)},Lt=async(e,t)=>{const o=t.prefix;return await Y(e,`
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
    `,e.database)},kt=async(e,t)=>{const o=t.prefix,r=await Lt(e,t);await Promise.all(r.filter(a=>a.needsUpdate).map(async a=>{console.log(`recreating pipeline ${a.pipelineName} for city ${a.cityName}`),a.pipelineName.startsWith("locations_")?await b(e,`
            CREATE OR REPLACE PIPELINE ${a.pipelineName}
            AS LOAD DATA LINK aws_s3 '${pe}/${o}/locations.*'
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
          `,a.cityId,a.lon,a.diameter,a.lat,a.diameter):a.pipelineName.startsWith("requests_")?await b(e,`
            CREATE OR REPLACE PIPELINE ${a.pipelineName}
            AS LOAD DATA LINK aws_s3 '${pe}/${o}/requests.*'
            MAX_PARTITIONS_PER_BATCH ${t.partitions}
            INTO TABLE requests FORMAT PARQUET (
              subscriber_id <- subscriberid,
              domain <- domain
            )
            SET ts = NOW(),
              city_id = ?;
          `,a.cityId):a.pipelineName.startsWith("purchases_")&&await b(e,`
            CREATE OR REPLACE PIPELINE ${a.pipelineName}
            AS LOAD DATA LINK aws_s3 '${pe}/${o}/purchases.*'
            MAX_PARTITIONS_PER_BATCH ${t.partitions}
            INTO TABLE purchases FORMAT PARQUET (
              subscriber_id <- subscriberid,
              vendor <- vendor
            )
            SET ts = NOW(),
              city_id = ?;
          `,a.cityId),await b(e,`ALTER PIPELINE ${a.pipelineName} SET OFFSETS EARLIEST DROP ORPHAN FILES`),await b(e,`START PIPELINE IF NOT RUNNING ${a.pipelineName}`),console.log(`finished creating pipeline ${a.pipelineName} for city ${a.cityName}`)}))},Cr=async e=>{const t=await Ze(e,`
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
    `,e.database);await Promise.all(t.map(async([o])=>{console.log("restarting pipeline",o),await b(e,`ALTER PIPELINE ${o} SET OFFSETS EARLIEST DROP ORPHAN FILES`),await b(e,`START PIPELINE IF NOT RUNNING ${o}`)}))},Lr=async e=>{const t=await Y(e,`
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
    `,e.database);await Promise.all(t.map(o=>(console.log("dropping pipeline",o.pipelineName),b(e,`DROP PIPELINE ${o.pipelineName}`))))},xt=async e=>{const t=await Y(e,`
      SELECT plan_id AS planId
      FROM information_schema.plancache
      WHERE
        plan_warnings LIKE "%empty tables%"
    `);return await Promise.all(t.map(({planId:o})=>b(e,`DROP ${o} FROM PLANCACHE`))),t.length>0},kr=(e,...t)=>{const o=t.map(r=>`"${r}"`).join(",");return Nt(e,`
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
    `,e.database)},tt=(e,...t)=>kr(e,...t).then(o=>o.reduce((r,{tableName:a,count:n})=>(r[a]=n,r),{})),xr=async(e,t)=>{const{maxRows:o}=t,a=["locations","requests","purchases","notifications"].map(d=>`"${d}"`).join(","),n=await Nt(e,`
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
            AND table_name IN (${a})
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
    `,e.database,o);await Promise.all(n.map(async({tableName:d,count:s,minTs:l,maxTs:c})=>{const u=(s-o)/s;if(u<.2)return;const m=new Date((l+u*(c-l))*1e3);console.log(`removing rows from ${d} older than ${m.toISOString()}`),await b(e,`DELETE FROM ${d} WHERE ts <= ?`,m.toISOString())}))},ot=(e,t="minute")=>St(e,"ECHO run_matching_process(?)",t).then(o=>o.RESULT),rt=async(e,t)=>{const o=new Date().toISOString();return await Promise.all(["update_location_segments","update_request_segments","update_purchase_segments"].map(r=>b(e,`CALL ${r}(?, ?)`,t,o))),await b(e,"CALL prune_segments(?)",o),o},Dr=(e,t,o,r)=>Ze(e,`
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
    `,t,Qe(r)),zr=(e,t,o)=>Y(e,`
      SELECT
        offer_id AS offerId,
        notification_zone AS notificationZone
      FROM offers
      WHERE GEOGRAPHY_INTERSECTS(?, notification_zone)
      LIMIT ${t}
    `,Qe(o)),Pr=e=>Y(e,`
      SELECT
        city_id AS id,
        city_name AS name,
        GEOGRAPHY_LATITUDE(center) AS centerLat,
        GEOGRAPHY_LONGITUDE(center) AS centerLon,
        diameter
      FROM cities
    `),Mr=(e,t,o)=>St(e,`
      SELECT
        city_id AS id,
        city_name AS name,
        GEOGRAPHY_LATITUDE(center) AS centerLat,
        GEOGRAPHY_LONGITUDE(center) AS centerLon,
        0.1 AS diameter
      FROM worldcities
      ORDER BY GEOGRAPHY_DISTANCE(center, GEOGRAPHY_POINT(?, ?)) ASC
      LIMIT 1
    `,t,o),F=[{name:"s00",maxRows:1e7,prefix:"v2/100k-2p",partitions:2},{name:"s0",maxRows:2e7,prefix:"v2/100k-4p",partitions:4},{name:"s1",maxRows:4e7,prefix:"v2/100k-8p",partitions:8},{name:"s2",maxRows:16e7,prefix:"v2/1m-16p",partitions:16},{name:"s4",maxRows:32e7,prefix:"v2/1m-32p",partitions:16},{name:"s8",maxRows:64e7,prefix:"v2/1m-64p",partitions:64},{name:"s10",maxRows:1e9,prefix:"v2/10m-80p",partitions:80}],Ur=e=>F.find(t=>t.name===e)||F[0],J=({encode:e,decode:t}={encode:JSON.stringify,decode:JSON.parse})=>({setSelf:o,onSet:r,node:a})=>{const n=`recoil.localstorage.${a.key}`,d=localStorage.getItem(n);d!=null&&o(t(d)),r((s,l,c)=>{c?localStorage.removeItem(n):localStorage.setItem(n,e(s))})},it=()=>({setSelf:e,node:{key:t}})=>{const{location:o}=window;if(o){const r=new URLSearchParams(o.search);e(r.get(t))}},Br=w({key:"skipCreateDatabase",default:null,effects:[it()]}),Fr=w({key:"sessionId",default:null,effects:[it()]}),Gr=w({key:"vaporBaseUrl",default:"https://vapor.labs.singlestore.com",effects:[it()]}),Dt=w({key:"connectionHost",default:"http://127.0.0.1",effects:[J()]}),zt=w({key:"connectionUser",default:"root",effects:[J()]}),Pt=w({key:"connectionPassword",default:"",effects:[J()]}),X=w({key:"connectionDatabase",default:"martech",effects:[J()]}),Mt=pt({key:"vaporConnectionConfig",get:async({get:e})=>{const t=e(Fr),o=e(Gr);if(t)try{const r=await fetch(o+"/api/v1/vapor/connect?sessionId="+t);if(r.status===200){const a=await r.json();return{host:a.endpoint,user:a.user,password:a.password,database:e(X)}}}catch{console.log(`Failed to connect to vapor at ${o}, falling back to local config`)}}}),E=pt({key:"connectionConfig",get:({get:e})=>{const t=e(Mt);if(t)return t;const o=e(Dt),r=e(zt),a=e(Pt),n=e(X);return{host:o,user:r,password:a,database:n}},cachePolicy_UNSTABLE:{eviction:"most-recent"}}),Z=w({key:"configScaleFactor",default:F[0],effects:[J({encode:e=>e.name,decode:e=>F.find(t=>t.name===e)||F[0]})]}),q=w({key:"simulatorEnabled",default:!0,effects:[J()]}),Yr=w({key:"databaseDrawerIsOpen",default:!1}),Ge=no({key:"tickDurationMs",default:void 0}),Hr=Object.fromEntries([Oe.map(({name:e})=>[e,!1]),Ae.map(({name:e})=>[e,!1]),Re.map(({name:e})=>[e,!1])].flat()),Ut=(e=!1)=>{const t=v(E);return L(["schemaObjects",t,e],()=>Or(t),{isPaused:()=>e,refreshInterval:o=>Object.values(o||[]).some(a=>!a)?1e3:0,fallbackData:Hr})},A=()=>{const n=v(E),{database:e}=n,t=C(n,["database"]),o=v(Mt),r=L(["isConnected",t],()=>Ar(t)),a=Ut(!r.data);return{isVapor:!!o,connected:!!r.data,initialized:!!r.data&&Object.values(a.data||[]).every(Boolean),reset:()=>{r.mutate(),a.mutate()}}},jr=(()=>{let e={};return t=>(t in e||(e[t]=1),`${t}(${e[t]++})`)})(),Ye=(e,{name:t,enabled:o,intervalMS:r})=>{const a=lo(Ge(t));g.exports.useEffect(()=>{if(!o)return;const n=new AbortController,d=jr(t);console.log(`Starting ${d}: tick interval: ${r}ms`);const s=async()=>{try{if(console.time(d),n.signal.aborted)return;const l=performance.now();await e(n);const c=performance.now()-l;a(c),setTimeout(s,Math.max(0,r-c))}catch(l){if(n.signal.aborted||l instanceof I&&l.isUnknownDatabase()||l instanceof DOMException&&l.name==="AbortError")return;throw l}finally{console.timeEnd(d)}};return s(),()=>{console.log(`Stopping ${d}`),n.abort()}},[o,e,r,t,a])},Wr=({before:e,after:t,includeSeedData:o})=>{const r=v(E),a=v(Z),{reset:n}=A(),[d,s]=O(q),l=yt(),c=v(Br);return g.exports.useCallback(async()=>{const y=d;s(!1),e(),await Ir(r,{progress(u,m){const h="reset-schema";l.isActive(h)?l.update(h,{title:u,status:m,duration:m==="success"?2e3:null,isClosable:!0}):l({id:h,title:u,status:m,duration:null})},scaleFactor:a,includeSeedData:o,skipCreate:!!c}),t(),n(),s(y)},[d,s,e,r,a,o,c,t,n,l])},Bt=(e,t)=>{const[o,r]=g.exports.useState(e);return g.exports.useEffect(()=>{const a=setTimeout(()=>r(e),t);return()=>clearTimeout(a)},[e,t]),o},Ft=()=>{const[{elapsed:e,isRunning:t},o]=g.exports.useReducer((r,a)=>{switch(a.type){case"start":return{start:Math.floor(performance.now()),isRunning:!0,elapsed:r.elapsed};case"stop":return{elapsed:Math.floor(performance.now())-(r.start||0),isRunning:!1}}},{isRunning:!1});return{elapsed:e,isRunning:t,startTimer:()=>o({type:"start"}),stopTimer:()=>o({type:"stop"})}},Gt=(e,t)=>{let o=!1,r=new so(0,0),a=0;e.on("pointerdown",n=>{o=!0,r=n.data.global,a=performance.now()}),e.on("pointerup",n=>{if(!o||(o=!1,performance.now()-a>200))return;const s=n.data.global;Math.sqrt(Math.pow(s.x-r.x,2)+Math.pow(s.y-r.y,2))>10||t(n)}),e.on("pointercancel",()=>{o=!1})};class Vr extends V{constructor(t,o){super();_(this,"gfx");_(this,"hover",!1);this.city=t,this.onRemove=o,this.gfx=new me,this.addChild(this.gfx),this.gfx.interactive=!0,this.gfx.on("pointerover",()=>{this.hover=!0}),this.gfx.on("pointerout",()=>{this.hover=!1}),Gt(this.gfx,()=>o(this.city))}update(t){this.gfx.clear(),this.gfx.lineStyle(1,this.hover?16711680:306687,1),this.gfx.beginFill(this.hover?16711680:306687,.2);const[o,r]=t([this.city.centerLat,this.city.centerLon]);this.gfx.drawCircle(o,r,25),this.gfx.endFill()}}const $r=e=>{const t=v(E),{initialized:o}=A();return L(["cities",t,o],()=>Pr(t),{isPaused:()=>!o,onSuccess:e})},Kr=({scene:e,latLngToPixel:t,pixelToLatLng:o,width:r,height:a})=>{const n=v(E),d=ct(()=>new V),{mutate:s}=$r(y=>{d.removeChildren();for(let u=0;u<y.length;u++)d.addChild(new Vr(y[u],c))}),l=g.exports.useCallback(async(y,u)=>{const m=await Mr(n,u,y),h={id:m.id,name:m.name,lonlat:[m.centerLon,m.centerLat],diameter:m.diameter};await At(n,h),await et(n,h,F[0]),s()},[n,s]),c=g.exports.useCallback(async y=>{await lr(n,y.id),s()},[n,s]);return{setup:g.exports.useCallback(()=>{const y=new V;e.addChild(y),e.addChild(d),y.interactive=!0,y.hitArea=new co(0,0,r,a),Gt(y,u=>{const[m,h]=o([u.data.global.x,u.data.global.y]);l(m,h)})},[d,a,l,o,e,r]),update:g.exports.useCallback(()=>{for(let y=0;y<d.children.length;y++)d.children[y].update(t)},[d,t])}},Jr=e=>i(Ne,T(f({},e),{useRenderer:Kr,options:{},cursor:"pointer"})),Xr=po({a:o=>{var r=o,{children:e}=r,t=C(r,["children"]);const{href:a}=t,n=!!(a!=null&&a.startsWith("http"));return n?p(B,T(f({isExternal:n},t),{children:[e,i(yo,{bottom:"2px",boxSize:"0.9em",position:"relative",ml:1})]})):i(B,T(f({to:a||""},t),{as:ut,children:e}))}}),S=o=>{var r=o,{children:e}=r,t=C(r,["children"]);return i(uo,T(f({},t),{skipHtml:!0,components:Xr,children:Array.isArray(e)?e.filter(a=>a).map(a=>ge(a||"")).join(`

`):ge(e)}))},Zr=()=>p($,{maxW:"container.lg",mt:10,mb:"30vh",children:[i($,{maxW:"container.md",mb:10,children:i(S,{children:`
            ## Admin

            You can configure cities and offers on this page. To learn more
            about this application please visit the [Overview page](/).
          `})}),i(qr,{})]}),qr=()=>p(R,{children:[i($,{maxW:"container.md",mb:4,children:i(S,{children:`
            #### Cities

            You can create and remove cities by interacting with the map below.
            Click anywhere to define a new city, or click an existing city to
            remove it.
          `})}),i(Jr,{defaultZoom:4,defaultCenter:[39.716470511656766,-99.59395661915288],height:300})]}),de=({label:e,placeholder:t,value:o,setValue:r,helpText:a,type:n="text"})=>p(je,{children:[i(We,{mb:1,fontSize:"xs",fontWeight:"bold",textTransform:"uppercase",children:e}),i(gt,{size:"sm",placeholder:t,value:o,onChange:d=>r(d.target.value),type:n}),a?i(go,{fontSize:"xs",children:a}):null]}),Qr=()=>{const[e,t]=O(Z);return p(je,{children:[i(We,{mb:1,fontSize:"xs",fontWeight:"bold",textTransform:"uppercase",children:"Scale Factor"}),i(mo,{size:"sm",required:!0,value:e.name,onChange:o=>{const r=o.target.value;t(Ur(r))},children:F.map(o=>i("option",{value:o.name,children:o.name},o.name))})]})},Yt=({showDatabase:e,showScaleFactor:t})=>{const[o,r]=O(Dt),[a,n]=O(zt),[d,s]=O(Pt),[l,c]=O(X);return p(K,{spacing:4,children:[i(de,{label:"Host & Port",placeholder:"http://127.0.0.1:8808",value:o,setValue:r,helpText:i(S,{children:`
              The protocol (http, https), host, and port for the SingleStore
              [HTTP API][1].

              [1]: https://docs.singlestore.com/docs/http-api/
            `})}),p(mt,{columns:2,gap:2,children:[i(de,{label:"Username",placeholder:"admin",value:a,setValue:n}),i(de,{label:"Password",placeholder:"",value:d,setValue:s,type:"password"}),e&&i(de,{label:"Database",placeholder:"martech",value:l,setValue:c}),t&&i(Qr,{})]})]})},Ht=e=>i(N,T(f({onClick:()=>{const{pathname:t,hash:o}=window.location;window.location.replace(t+o)},colorScheme:"red"},e),{children:"Disconnect"})),jt=e=>{const{connected:t,initialized:o}=A(),r=Ve(),[a,n]=fe(),d=v(X),s=oe.useRef(null),m=e,{skipSeedData:l,disabled:c}=m,y=C(m,["skipSeedData","disabled"]),u=Wr({before:g.exports.useCallback(()=>n.on(),[n]),after:g.exports.useCallback(()=>{n.off(),r.onClose()},[r,n]),includeSeedData:!l});return p(R,{children:[i(N,f({disabled:!t||c,onClick:r.onOpen,colorScheme:o?"green":"red"},y)),i(vo,{isOpen:r.isOpen,onClose:r.onClose,closeOnEsc:!1,closeOnOverlayClick:!1,leastDestructiveRef:s,children:i($e,{children:p(bo,{children:[p(Ke,{fontSize:"lg",fontWeight:"bold",children:[o?"Reset":"Setup"," database ",d]}),p(Je,{children:["This will ",o?"recreate":"create"," the database called ",d,". Are you sure?"]}),p(vt,{children:[i(N,{ref:s,onClick:r.onClose,disabled:a,children:"Cancel"}),i(N,{disabled:a,colorScheme:o?"red":"green",onClick:u,ml:3,children:a?i(z,{}):o?"Recreate database":"Create database"})]})]})})})]})},ei=({isOpen:e,onClose:t,finalFocusRef:o})=>{const[r,a]=O(q),n=v(E),{connected:d,initialized:s,isVapor:l}=A(),c=Ve(),[y,u]=fe(!1),m=g.exports.useCallback(async()=>{u.on(),await Ct(n),u.off()},[n,u]);return p(ho,{isOpen:e,placement:"right",onClose:t,finalFocusRef:o,children:[i($e,{}),p(fo,{children:[i(bt,{}),i(Ke,{children:"Config"}),i(Je,{children:p(K,{spacing:4,children:[l?null:i(Yt,{showScaleFactor:!0,showDatabase:!0}),p(le,{status:d?"success":"error",borderRadius:"md",children:[i(se,{}),i(ce,{children:d?"connected":"disconnected"}),l?i(Ht,{position:"absolute",right:4,top:3,size:"xs"}):null]}),p(le,{status:s?"success":"warning",borderRadius:"md",children:[i(se,{}),i(ce,{children:"schema"}),i(jt,{position:"absolute",right:4,top:3,size:"xs",children:s?"Reset":"Setup"})]}),p(le,{status:r?"success":"warning",borderRadius:"md",children:[i(se,{}),i(ce,{children:"simulator"}),i(Eo,{position:"absolute",right:4,top:3.5,size:"md",colorScheme:r?"green":"red",isChecked:r,disabled:!d||!s,onChange:()=>a(!r)})]}),p(re,{onClick:c.onToggle,fontSize:"xs",textAlign:"center",cursor:"pointer",children:["Advanced",c.isOpen?i(_o,{ml:2}):i(To,{ml:2})]}),c.isOpen?i(N,{size:"xs",_hover:{colorScheme:"red"},onClick:m,disabled:y,children:"Drop Database"}):void 0]})}),i(vt,{})]})]})},ze=({to:e,children:t,onClick:o})=>{const r=wo(e),a=Co({path:r.pathname,end:!0});return i(B,{as:ut,to:e,px:2,py:1,onClick:o,rounded:"md",_hover:{textDecoration:"none",bg:Ue("gray.300","gray.600")},fontWeight:a?"bold":"normal",href:"#",color:Ue("gray.700","gray.200"),children:t})},ti=()=>{const{colorMode:e,toggleColorMode:t}=Ee(),o=Ve(),[r,a]=O(Yr),n=oe.useRef(null),{connected:d,initialized:s}=A(),l=v(q),[c]=ht("(max-width: 640px)"),y=p(R,{children:[i(ze,{to:"/",onClick:o.onClose,children:"Overview"}),i(ze,{to:"/map",onClick:o.onClose,children:"Map"}),i(ze,{to:"/admin",onClick:o.onClose,children:"Admin"})]});let u;return c||(u=d?s?l?"connected":"simulator disabled":"needs schema":"disconnected"),i(R,{children:i(x,{bg:Ue("gray.200","gray.700"),children:p($,{maxW:"container.lg",children:[p(ve,{h:16,alignItems:"center",justifyContent:"space-between",children:[i(De,{size:"md",icon:o.isOpen?i(So,{}):i(No,{}),"aria-label":"Open Menu",display:{md:"none"},onClick:o.isOpen?o.onClose:o.onOpen}),p(be,{spacing:8,alignItems:"center",children:[i(_e,{as:"h1",size:c?"sm":"md",children:c?"Martech":"Realtime Digital Marketing"}),i(be,{as:"nav",spacing:4,display:{base:"none",md:"flex"},children:y})]}),p(ve,{alignItems:"center",gap:2,children:[p(N,{size:"sm",ref:n,onClick:()=>a(!0),colorScheme:d?s&&l?"green":"yellow":"red",children:[s?i(ft,{}):i(Et,{}),c||i(re,{pl:2,children:u})]}),i(De,{"aria-label":"Github Repo",size:"sm",icon:e==="light"?i(Ro,{size:"1.4em"}):i(Ao,{size:"1.4em"}),onClick:()=>window.open("https://github.com/singlestore-labs/demo-realtime-digital-marketing","_blank")}),i(De,{"aria-label":"Toggle Color Mode",size:"sm",onClick:t,icon:e==="light"?i(Oo,{boxSize:"1.2em"}):i(Io,{boxSize:"1.2em"})})]})]}),o.isOpen?i(x,{pb:4,display:{md:"none"},children:i(K,{as:"nav",spacing:4,children:y})}):null,i(ei,{isOpen:r,onClose:()=>a(!1),finalFocusRef:n})]})})})},oi=e=>{const t=g.exports.useRef([]),{data:o}=L(["timeseries",e.name,...e.deps||[]],async()=>{const r=await e.fetcher();return t.current.push({data:r,ts:new Date}),t.current=t.current.slice(-e.limit),t.current},{refreshInterval:e.intervalMS});return o||[]},ri=Xe("~s"),Wt=(e,...t)=>oi({name:"estimatedRowCount",deps:t,fetcher:g.exports.useCallback(()=>tt(e,...t),[e,t]),limit:30,intervalMS:1e3}),Vt=o=>{var r=o,{data:e}=r,t=C(r,["data"]);const{colorMode:a}=Ee(),n=g.exports.useCallback(({tooltipData:l,colorScale:c})=>!c||!l?null:Object.keys(l.datumByKey).sort((y,u)=>l.datumByKey[u].datum.data[u]-l.datumByKey[y].datum.data[y]).map(y=>{const{datum:u}=l.datumByKey[y],m=u.data[y];return p(re,{mb:1,color:c(y),fontSize:"sm",children:[y,": ",Xe(".4~s")(m)]},y)}),[]),d=g.exports.useCallback(l=>ri(l).replace("G","B"),[]);if(e.length<2)return i(P,{height:t.height,children:i(z,{size:"md"})});const s=e.length>0?Object.keys(e[0].data).filter(l=>l!=="ts").map(l=>i(Lo,{dataKey:l,data:e,xAccessor:c=>c==null?void 0:c.ts,yAccessor:c=>c==null?void 0:c.data[l]},l)):null;return p(ko,T(f({xScale:{type:"time"},yScale:{type:"sqrt",nice:!0,zero:!1,clamp:!0},theme:a==="light"?xo:Do,margin:{left:0,right:50,top:10,bottom:40}},t),{children:[i(dt,{orientation:"bottom",numTicks:5,label:"time",labelOffset:10}),i(dt,{orientation:"right",numTicks:t.height<250?3:5,tickFormat:d,label:"rows",labelOffset:20}),s,i(zo,{showVerticalCrosshair:!0,detectBounds:!1,offsetLeft:-175,offsetTop:20,renderTooltip:n})]}))},ii=10*1e3,$t=(e=!1)=>{const t=v(E),o=v(Z),r=v(q),{initialized:a}=A(),n=g.exports.useCallback(d=>{const s=T(f({},t),{ctx:d});return Promise.all([kt(s,o),Cr(s),Lr(s),xr(s,o),xt(s)])},[t,o]);Ye(n,{name:"SimulatorMonitor",enabled:a&&r&&!e,intervalMS:ii})},ai=1*1e3,ni=10*1e3,di=()=>{const e=v(E),t=v(q),{initialized:o}=A(),r=g.exports.useRef(new Date(0).toISOString()),a=g.exports.useCallback(d=>ot(T(f({},e),{ctx:d}),"minute"),[e]);Ye(a,{name:"SimulatorMatcher",enabled:o&&t,intervalMS:ai});const n=g.exports.useCallback(async d=>{r.current=await rt(T(f({},e),{ctx:d}),r.current)},[e]);Ye(n,{name:"SimulatorUpdateSegments",enabled:o&&t,intervalMS:ni})},He=1e3,ye=60*He,ue=60*ye,Pe=24*ue,k=e=>e.toLocaleString(void 0,{maximumFractionDigits:2}),G=e=>e?e<He?`${k(e)}ms`:e<ye?`${k(e/He)}s`:e<ue?`${Math.floor(e/ye)}m${G(e%ye)}`:e<Pe?`${Math.floor(e/ue)}h${G(e%ue)}`:`${Math.floor(e/Pe)}d${G(e%Pe)}`:"0s",li=100,si=1e3,U=class extends V{constructor(t){super();_(this,"latlng");_(this,"age",0);_(this,"marker");_(this,"pulse");this.latlng=t,this.marker=new me,this.marker.beginFill(U.markerColor).drawCircle(0,0,5).endFill(),this.addChild(this.marker),this.pulse=new me,this.pulse.beginFill(U.pulseColor),this.pulse.drawTorus&&this.pulse.drawTorus(0,0,4,6),this.pulse.endFill(),this.addChild(this.pulse)}update(t,o){if(this.age+=o/60,this.age>U.lifetime&&this.parent){this.parent.removeChild(this);return}const r=this.age%U.lifetime/U.lifetime,a=Bo(r);this.pulse.scale.set(1+a);const n=.4,d=r<n?Po(r/n):1-Mo((r-n)/(1-n));this.pulse.alpha=d,r<n?this.marker.alpha=d:this.marker.alpha=1-Uo((r-n)/(1-n));const[s,l]=t(this.latlng);this.x=s,this.y=l}};let ee=U;_(ee,"lifetime",1.5),_(ee,"markerColor",306687),_(ee,"pulseColor",306687);const Kt=()=>{const e=v(E),{initialized:t}=A();return g.exports.useMemo(()=>["notifications",e,t],[e,t])},Jt=({scene:e,latLngToPixel:t,bounds:o})=>{const r=g.exports.useRef(new Date().toISOString()),a=v(E),{initialized:n}=A(),d=Bt(o,50),s=Kt();return L(s,()=>Dr(a,r.current,li,d),{refreshInterval:si,isPaused:()=>!n,onSuccess:l=>{if(l.length>0){r.current=l[0][0];for(const[,c,y]of l)e.addChild(new ee([y,c]))}}}),{update:g.exports.useCallback(l=>{for(let c=e.children.length-1;c>=0;c--)e.children[c].update(t,l)},[t,e])}},ci=()=>{const e=v(E),t=Wt(e,"locations","requests","purchases","notifications","subscriber_segments"),o=L(["notificationsMapTableCounts",e],()=>tt(e,"offers","subscribers","cities","segments"),{refreshInterval:1e3}),r=v(Ge("SimulatorMatcher")),a=v(Ge("SimulatorUpdateSegments")),n=Xe(".4~s"),d=o.data?p(_t,{templateColumns:"repeat(auto-fit, minmax(100px, 1fr))",columnGap:2,rowGap:2,children:[p(H,{children:[i(j,{children:"Offers"}),i(W,{children:n(o.data.offers)})]}),p(H,{children:[i(j,{children:"Cities"}),i(W,{children:n(o.data.cities)})]}),p(H,{children:[i(j,{children:"Subscribers"}),i(W,{children:n(o.data.subscribers)})]}),p(H,{children:[i(j,{children:"Segments"}),i(W,{children:n(o.data.segments)})]}),p(H,{children:[i(j,{children:"Segmentation"}),i(W,{children:G(a)})]}),p(H,{children:[i(j,{children:"Matching"}),i(W,{children:G(r)})]})]}):null;return p(R,{children:[i(S,{children:`
          The map on this page displays notifications as they are delivered to
          subscribers in realtime. Below, you will find some key statistics
          about the demo.
        `}),d,p(x,{children:[i(re,{fontSize:"sm",fontWeight:"medium",children:"Row count / time"}),i(Vt,{data:t,height:150})]})]})},pi=()=>{const[e,t]=O(q);return $t(),di(),p(ve,{gap:4,justifyContent:"space-between",direction:["column","column","row"],height:"100%",children:[i(K,{spacing:4,flex:"2 2 0",minHeight:"200px",maxHeight:"100%",children:i(Ne,{useRenderer:Jt,options:{}})}),p(K,{spacing:4,flex:"1 1 0",minWidth:"0",children:[i(S,{children:`

            This application is a demo of how to use SingleStore to serve ads to
            users based on their behavior and realtime location. The demo is
            based on location, purchase, and request history from millions of
            simulated subscribers for a hypothetical service company. To learn
            about how this works please visit the [overview page](/).
          `}),e?i(ci,{}):i(R,{children:p(le,{status:"warning",borderRadius:"md",children:[i(se,{}),i(ce,{children:"The simulator is disabled"}),i(N,{position:"absolute",right:4,top:3,size:"xs",colorScheme:"blue",onClick:()=>t(!0),children:"Enable simulator"})]})})]})]})},Xt=o=>{var r=o,{children:e}=r,t=C(r,["children"]);return i(Fo,T(f({as:"pre",borderRadius:"md",overflow:"auto",display:"block",px:6,py:4,minW:0},t),{children:e}))},yi=1e3;class ui extends V{constructor(t){super();_(this,"offer");_(this,"points");_(this,"polygon");this.offer=t,this.points=ir(t.notificationZone),this.polygon=new me,this.addChild(this.polygon),this.polygon.interactive=!0,this.polygon.on("mouseover",()=>{this.polygon.tint=65280}),this.polygon.on("mouseout",()=>{this.polygon.tint=16777215})}update(t){this.polygon.clear(),this.polygon.lineStyle(1,306687,1),this.polygon.beginFill(306687,.2),this.polygon.drawPolygon(this.points.flatMap(([o,r])=>t([r,o]))),this.polygon.endFill()}}const gi=({scene:e,latLngToPixel:t,bounds:o})=>{const r=v(E),{initialized:a}=A(),n=Bt(o,100);return L(["offers",r,a,n],()=>zr(r,yi,n),{isPaused:()=>!a,onSuccess:d=>{e.removeChildren();for(let s=0;s<d.length;s++)e.addChild(new ui(d[s]))}}),{update:g.exports.useCallback(()=>{for(let d=0;d<e.children.length;d++)e.children[d].update(t)},[t,e])}},mi=e=>i(Ne,T(f({},e),{useRenderer:gi,options:{}})),D=e=>{const{completed:t,title:o,left:r,right:a}=e,{colorMode:n}=Ee(),d=n==="light"?".300":".500",s=t?"gray"+d:void 0,l=(t?"green":"gray")+d;return p(R,{children:[p(he,{children:[p(_e,{as:"h2",size:"lg",mb:4,color:s,children:[i(ft,f({color:l},{boxSize:6,position:"relative",bottom:.5,mr:2})),o]}),r]}),i(he,{children:a})]})},vi=({connected:e,isVapor:t})=>t?i(D,{completed:e,title:"Connected",left:p(R,{children:[i(S,{children:`
                Connected to a demo cluster running in the SingleStore Managed
                Service. To disconnect and use your own cluster instead, click
                the button below.
              `}),i(Ht,{size:"xs",colorScheme:"gray"})]}),right:null}):i(D,{completed:e,title:"Connect to SingleStore",left:i(S,{children:`
            This demo requires a connection to SingleStore's HTTP API. Please
            ensure the connection details on the right are correct.
            
            **Note**: The HTTP API may need to be enabled on your SingleStore
            cluster. To do so please see [our documentation][1] or contact
            support for assistance.
            
            [1]: https://docs.singlestore.com/docs/http-api/
          `}),right:i(Yt,{})}),bi=({onClose:e,schemaObjectName:t})=>{const o=Rr(t),[r]=ht("(max-width: 640px)");return p(Ho,{isOpen:!0,onClose:e,size:r?"full":"4xl",scrollBehavior:"inside",children:[i($e,{}),p(jo,{children:[p(Ke,{children:["Create statement for ",o.name]}),i(bt,{}),i(Je,{children:i(Xt,{mb:4,children:o.createStmt})})]})]})},hi=({initialized:e})=>{const[t,o]=O(X),r=Ut(),{colorMode:a}=Ee(),[n,d]=g.exports.useState(),s=g.exports.useCallback(c=>d(c),[]),l=g.exports.useCallback(()=>d(null),[]);return p(R,{children:[!!n&&i(bi,{onClose:l,schemaObjectName:n}),i(D,{completed:e,title:"Setup the schema",left:p(R,{children:[i(S,{children:`
                Our schema includes the database and a set of tables and views we
                need to store all of our data. Use the controls below to set the
                database name and create the schema.
              `}),i(Go,{mt:4,mb:6}),p(be,{alignItems:"flex-end",children:[p(je,{flex:1,children:[i(We,{fontSize:"xs",fontWeight:"bold",textTransform:"uppercase",children:"Database name"}),i(gt,{placeholder:"martech",value:t,size:"sm",onChange:c=>o(c.target.value)})]}),i(x,{flex:1,textAlign:"center",children:i(jt,{colorScheme:"blue",size:"sm",disabled:e,skipSeedData:!0,children:e?"Schema is setup":"Setup schema"})})]})]}),right:i(mt,{columns:[1,2,2],gap:1,children:Object.keys(r.data||{}).sort().map(c=>{var y;return i(he,{bg:((y=r.data)!=null&&y[c]?"green":"gray")+(a==="light"?".200":".600"),color:a==="light"?"gray.800":"gray.100",textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden",borderRadius:"md",px:2,py:1,textAlign:"center",_hover:{fontWeight:"bold"},cursor:"pointer",onClick:()=>s(c),children:c},c)})})})]})},Zt=(e,t,o=!0)=>{var n;const r=L(["pipelineStatus",e,t],()=>Lt(e,t),{isPaused:()=>!o}),a=(n=r.data)!=null&&n.length?r.data.every(d=>!d.needsUpdate):!1;return{pipelines:r,completed:a}},fi=()=>{const e=v(E),t=v(Z),{pipelines:o,completed:r}=Zt(e,t);$t(!r);const[a,n]=fe(),d=g.exports.useCallback(async()=>{n.on(),await kt(e,t),o.mutate(),n.off()},[n,e,t,o]),s=Wt(e,"locations","requests","purchases"),l=s.length<2||s.every(({data:y})=>y.locations+y.purchases+y.requests===0);return i(D,{completed:r,title:"Ingest data",left:i(S,{children:`
            The demo needs to load location, request, and purchase history from
            simulated subscribers in real time. We will simulate these streams
            using [SingleStore Pipelines][1] to ingest data from [AWS S3][2].

            [1]: https://docs.singlestore.com/managed-service/en/load-data/about-loading-data-with-pipelines/pipeline-concepts/overview-of-pipelines.html
            [2]: https://aws.amazon.com/s3/
          `}),right:l||!r?i(P,{h:220,children:p(N,{colorScheme:"blue",size:"sm",onClick:d,disabled:r,children:[(a||r)&&i(z,{mr:2}),a?"Creating Pipelines":r?"...waiting for data":"Create pipelines"]})}):i(Vt,{data:s,height:200})})},Ie=(e,t=!0)=>L(["overviewTableCounts",e],()=>tt(e,"locations","notifications","offers","purchases","requests","segments","subscriber_segments","subscribers"),{isPaused:()=>!t}),Ei=()=>{var s,l;const e=v(E),t=v(Z),[o,r]=fe(),a=Ie(e),n=g.exports.useCallback(async()=>{r.on(),await et(e,te,t),a.mutate(),r.off()},[e,t,a,r]),d=!!((s=a.data)!=null&&s.offers);return i(D,{completed:d,title:"Offers",left:i(R,{children:p(S,{children:[`
              This demo allows any company to place offers. Each offer has a
              maximum bid price, activation zone, list of segments, and
              notification content. As subscribers move around, they are
              continuously matched to offers based on their location and
              whichever segments they are members of. If multiple offers match
              the offer with the highest bid price will be selected.
            `,!d&&`
                Press the "load offers" button on the right to create some
                sample offers in New York City.
            `,d&&`
                The map to your right displays a polygon representing each
                offer's activation zone. Hover over a polygon to see it's exact
                boundary. There are ${(l=a.data)==null?void 0:l.offers} offers in the
                database.
            `]})}),right:d?i(mi,{height:300}):i(P,{h:"100%",children:p(N,{onClick:n,disabled:o,children:[o&&i(z,{mr:2}),o?"loading...":d?"loaded offers!":"load offers"]})})})},_i=({done:e,setDone:t})=>{const o=v(E),r=g.exports.useRef(new Date(0).toISOString());return g.exports.useEffect(()=>{if(e)return;const a=new AbortController,n=T(f({},o),{ctx:a});return(async()=>{try{for(let d=0;d<10;d++)if(r.current=await rt(n,r.current),await ot(n,"second"),d>1&&!await xt(n))return}catch(d){if(a.signal.aborted||d instanceof DOMException&&d.name==="AbortError")return;throw d}})().then(()=>t(!0)),()=>{a.abort()}},[o,e,t]),e?null:i(he,{colSpan:[1,1,2],children:p(P,{w:"100%",h:"200px",color:"gray.500",children:[i(z,{size:"md",mr:4}),i(_e,{size:"md",children:"Warming up queries..."})]})})},Ti=()=>{var y;const e=v(E),t=Ie(e),{elapsed:o,isRunning:r,startTimer:a,stopTimer:n}=Ft(),d=g.exports.useRef(new Date(0).toISOString()),s=!!((y=t.data)!=null&&y.subscriber_segments),l=g.exports.useCallback(async()=>{a(),d.current=await rt(e,d.current),n(),t.mutate()},[e,t,a,n]);let c;if(o&&t.data){const{segments:u,subscriber_segments:m,locations:h,requests:M,purchases:Q}=t.data,we=G(o),Ce=k(h+M+Q),Le=k(u),ke=k(m);c=i(S,{children:`
          The last update evaluated ${Ce} rows against ${Le} segments
          producing ${ke} segment memberships.
          
          **This process took ${we}**.
        `})}return i(D,{completed:s,title:"Segmentation",left:i(S,{children:`
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
          `}),right:i(P,{h:"100%",children:p(Tt,{gap:4,textAlign:"center",children:[p(N,{disabled:r,onClick:l,children:[r&&i(z,{mr:2}),r?"...running":"Match subscribers to segments"]}),c]})})})},Si=()=>{var h;const e=v(E),t=Ie(e),o=Kt(),{mutate:r}=Yo(),{elapsed:a,isRunning:n,startTimer:d,stopTimer:s}=Ft(),[l,c]=g.exports.useState(0),y=!!((h=t.data)!=null&&h.notifications),u=g.exports.useCallback(async()=>{let M=0,Q=0;for(;M===0&&Q++<10;)d(),M=await ot(e,"second");s(),c(M),t.mutate(),r(o)},[e,d,s,t,r,o]);let m;if(a&&t.data){const{offers:M,subscribers:Q,subscriber_segments:we,notifications:Ce}=t.data,Le=k(M*Q+Ce),ke=k(we),qt=G(a),Qt=k(l);m=i(S,{children:`
          The last update evaluated up to ${Le} notification opportunities
          against ${ke} segment memberships generating ${Qt}
          notifications. This process took ${qt}.
        `})}return i(D,{completed:y,title:"Matching",left:i(S,{children:`
            Now that we have offers and have assigned subscribers to segments,
            we are finally able to deliver ads to subscribers as push
            notifications. In this demo, rather than actually sending
            notifications we will insert them into a table called
            "notifications".

            Click the button to generate notifications interactively, or run the
            following query in your favorite SQL client:

                select * from match_offers_to_subscribers("second");
          `}),right:i(P,{h:"100%",children:p(Tt,{gap:4,w:"100%",children:[p(N,{disabled:n,onClick:u,children:[n&&i(z,{mr:2}),n?"...running":"Generate notifications"]}),i(x,{width:"100%",children:i(Ne,{height:250,defaultZoom:12,useRenderer:Jt,options:{}})}),m]})})})},Ni=()=>{const e=v(X);return i(D,{completed:!0,title:"Putting it all together",left:i(S,{children:`
            Nice job! At this point you are ready to step into the shoes of a
            data engineer. Here are some recommendations on what to do next:

            * Visit the [live demo dashboard][1]
            * Explore the ${e} database in SingleStore Studio

            [1]: map
          `}),right:null})},Ri=()=>{const e=v(E),t=v(Z),{connected:o,initialized:r,isVapor:a}=A(),{completed:n}=Zt(e,t,o&&r),{data:d}=Ie(e,o&&r),[s,l]=g.exports.useState(!1),c=[{completed:o,component:i(vi,{connected:o,isVapor:a},"connection")},{completed:r,component:i(hi,{initialized:r},"schema")},{completed:n,component:i(fi,{},"pipelines")},{completed:d?d.offers>0:!1,component:i(Ei,{},"offers")},{completed:s,component:i(_i,{done:s,setDone:l},"warmup")},{completed:d?d.subscriber_segments>0:!1,component:i(Ti,{},"segmentation")},{completed:d?d.notifications>0:!1,component:i(Si,{},"matching")},{completed:!0,component:i(Ni,{},"summary")}];let y=!0;const u=[];for(const{completed:m,component:h}of c)if(y)u.push(h),y=m;else break;return p($,{maxW:"container.lg",mt:10,mb:"30vh",children:[i(x,{maxW:"container.md",mb:10,px:0,children:i(S,{children:`
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
          `})}),i(_t,{columnGap:6,rowGap:10,templateColumns:["minmax(0, 1fr)",null,"repeat(2, minmax(0, 1fr))"],children:u})]})};function Ai(){const e=i(P,{height:"100vh",children:i(z,{size:"xl",speed:"0.85s",thickness:"3px",emptyColor:"gray.200",color:"blue.500"})});return i(g.exports.Suspense,{fallback:e,children:p(ve,{height:"100vh",direction:"column",children:[i(ti,{}),i(x,{m:4,flex:"1",children:p(Wo,{children:[i(ae,{path:"/",element:i(Ri,{})}),i(ae,{path:"/map",element:i(pi,{})}),i(ae,{path:"/admin",element:i(Zr,{})}),i(ae,{path:"*",element:i(Vo,{to:"/",replace:!0})})]})})]})})}class Oi extends oe.Component{constructor(){super(void 0);_(this,"state",{});this.handlePromiseRejection=this.handlePromiseRejection.bind(this)}componentDidMount(){window.addEventListener("unhandledrejection",this.handlePromiseRejection)}componentWillUnmount(){window.removeEventListener("unhandledrejection",this.handlePromiseRejection)}handlePromiseRejection(t){this.setState({error:t.reason})}static getDerivedStateFromError(t){return{error:t}}render(){const{error:t}=this.state;if(t){let o;return t instanceof I&&(o=p(R,{children:[i(re,{textAlign:"center",children:"An error occurred while running the following query:"}),i(Xt,{children:ge(t.sql)})]})),i($,{maxW:"container.md",my:10,children:p(K,{gap:4,children:[i(P,{children:i(Et,{boxSize:20,color:"red"})}),i(_e,{size:"xl",textAlign:"center",children:t.message}),o,p(be,{justify:"center",gap:4,children:[i(N,{onClick:()=>this.setState({error:void 0}),size:"sm",children:"Dismiss Error"}),i(N,{onClick:()=>window.location.reload(),size:"sm",colorScheme:"blue",leftIcon:i($o,{}),children:"Reload"})]})]})})}return this.props.children}}const Ii=Ko({fonts:{heading:"InterVariable, sans-serif",body:"InterVariable, sans-serif",mono:'"Source Code ProVariable", monospace'},components:{Link:{baseStyle:e=>({color:e.colorMode==="light"?"blue.600":"blue.300"})}}}),wi=({children:e})=>{const t=yt();return i(Qo,{value:{onError:r=>{t({title:"An error occurred",description:r.message,status:"error",duration:5e3,isClosable:!0})}},children:e})};Jo.render(i(oe.StrictMode,{children:i(Xo,{theme:Ii,children:i(Oi,{children:i(wi,{children:i(Zo,{children:i(qo,{basename:"/",children:i(Ai,{})})})})})})}),document.getElementById("root"));
