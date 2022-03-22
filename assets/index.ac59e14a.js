var et=Object.defineProperty,ot=Object.defineProperties;var tt=Object.getOwnPropertyDescriptors;var re=Object.getOwnPropertySymbols;var io=Object.prototype.hasOwnProperty,ao=Object.prototype.propertyIsEnumerable;var Ce=(e,o,t)=>o in e?et(e,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[o]=t,h=(e,o)=>{for(var t in o||(o={}))io.call(o,t)&&Ce(e,t,o[t]);if(re)for(var t of re(o))ao.call(o,t)&&Ce(e,t,o[t]);return e},T=(e,o)=>ot(e,tt(o));var L=(e,o)=>{var t={};for(var r in e)io.call(e,r)&&o.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&re)for(var r of re(e))o.indexOf(r)<0&&ao.call(e,r)&&(t[r]=e[r]);return t};var E=(e,o,t)=>(Ce(e,typeof o!="symbol"?o+"":o,t),t);import{d as ue,s as rt,_ as De,r as g,j as i,B as x,M as it,a as p,F as N,L as B,R as te,u as co,C as V,A as at,b as A,c as po,e as nt,f as v,g as C,h as dt,i as R,k as yo,P as lt,l as st,G as ge,q as ct,E as pt,N as uo,m as yt,n as K,o as He,p as je,I as go,t as ut,S as gt,v as $,w as mo,x as O,y as vo,z as We,D as mt,H as Ve,J as vt,K as Ke,O as $e,Q as bo,T as D,U as bt,V as ht,W as ho,X as de,Y as le,Z as se,$ as ft,a0 as he,a1 as fo,a2 as Pe,a3 as me,a4 as ke,a5 as Et,a6 as _t,a7 as ve,a8 as fe,a9 as Eo,aa as _o,ab as Ee,ac as Tt,ad as St,ae as Nt,af as Ot,ag as wt,ah as Rt,ai as Je,aj as P,ak as It,al as At,am as Lt,an as Ct,ao as no,ap as kt,aq as xt,ar as zt,as as Dt,at as Pt,au as To,av as H,aw as j,ax as W,ay as Mt,az as Ut,aA as be,aB as So,aC as Bt,aD as Gt,aE as Ft,aF as Yt,aG as ie,aH as Ht,aI as jt,aJ as Wt,aK as Vt,aL as Kt,aM as $t,aN as Jt,aO as Zt}from"./vendor.04fdf617.js";const Xt=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function t(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerpolicy&&(n.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?n.credentials="include":a.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(a){if(a.ep)return;a.ep=!0;const n=t(a);fetch(a.href,n)}};Xt();const qt=/^Error (?<code>\d+):/;class I extends Error{constructor(o,t,r){super(o);E(this,"code");E(this,"sql");var a;if(Object.setPrototypeOf(this,I.prototype),this.sql=t,r)this.code=r;else{const n=o.match(qt);this.code=n?parseInt(((a=n.groups)==null?void 0:a.code)||"-1",10):-1}}isUnknownDatabase(){return this.code===1049}isDatabaseRecovering(){return this.code===2269}}const Ze=async(e,o,...t)=>{const r=await Y(e,o,...t);if(r.length!==1)throw new I("Expected exactly one row",o);return r[0]},Y=async(e,o,...t)=>{const r=await _e("query/rows",e,o,...t);if(r.results.length!==1)throw new I("Expected exactly one result set",o);return r.results[0].rows},No=(e,o,...t)=>Y(T(h({},e),{database:void 0}),o,...t),Xe=async(e,o,...t)=>{const r=await _e("query/tuples",e,o,...t);if(r.results.length!==1)throw new I("Expected exactly one result set",o);return r.results[0].rows},Me=(e,o,...t)=>_e("exec",T(h({},e),{database:void 0}),o,...t),f=(e,o,...t)=>_e("exec",e,o,...t),_e=async(e,o,t,...r)=>{var d;const a=await fetch(`${o.host}/api/v1/${e}`,{method:"POST",signal:(d=o.ctx)==null?void 0:d.signal,headers:{"Content-Type":"application/json",Authorization:`Basic ${btoa(`${o.user}:${o.password}`)}`},body:JSON.stringify({sql:t,args:r,database:o.database})});if(!a.ok)throw new I(await a.text(),t);const n=await a.json();if(n.error)throw new I(n.error.message,t,n.error.code);return n};class Qt{constructor(o,t,r=!1){E(this,"tuples",[]);this.table=o,this.columns=t,this.replace=r}append(...o){if(o.length!==this.columns.length)throw new Error(`Expected ${this.columns.length} values, got ${o.length}`);this.tuples.push(o)}clear(){this.tuples=[]}sql(){const o=`(${this.columns.map(()=>"?").join(",")})`,t=this.tuples.map(()=>o).join(",");return ue`
      ${this.replace?"REPLACE":"INSERT"} INTO ${this.table}
      (${this.columns.join(", ")})
      VALUES
        ${t}
    `}params(){return this.tuples.flat()}}class Oo extends Qt{constructor(o,t){super(o,t,!0)}}const er=e=>`POLYGON((${e.map(t=>`${t[0]} ${t[1]}`).join(",")}))`,qe=e=>{const[o,t]=e.ne,[r,a]=e.sw;return er([[a,o],[t,o],[t,r],[a,r],[a,o]])},lo="POLYGON((",so="))",or=e=>{if(e.startsWith(lo)&&e.endsWith(so))return e.slice(lo.length,-so.length).split(",").map(t=>{const[r,a]=t.trim().split(" ");return[parseFloat(r),parseFloat(a)]});throw new Error(`Invalid WKT polygon: ${e}`)};var tr=[{id:1,vendor:"Youspan",tld:"info",category:"sports",popularity:.37},{id:2,vendor:"Linkbridge",tld:"edu",category:"books",popularity:.6},{id:3,vendor:"Feedfire",tld:"gov",category:"sports",popularity:.55},{id:4,vendor:"Kimia",tld:"gov",category:"movies",popularity:.53},{id:5,vendor:"Zava",tld:"net",category:"kids",popularity:.39},{id:6,vendor:"Oyoyo",tld:"net",category:"jewelry",popularity:.21},{id:7,vendor:"Trunyx",tld:"edu",category:"outdoors",popularity:.72},{id:8,vendor:"Oyonder",tld:"org",category:"games",popularity:.38},{id:9,vendor:"Podcat",tld:"mil",category:"beauty",popularity:.2},{id:10,vendor:"Quatz",tld:"mil",category:"garden",popularity:.59},{id:11,vendor:"Thoughtsphere",tld:"biz",category:"home",popularity:.13},{id:12,vendor:"Twinte",tld:"biz",category:"clothing",popularity:.47},{id:13,vendor:"Blogtags",tld:"edu",category:"toys",popularity:.87},{id:14,vendor:"Oyonder",tld:"com",category:"garden",popularity:.54},{id:15,vendor:"Babbleblab",tld:"gov",category:"kids",popularity:.63},{id:16,vendor:"Realbridge",tld:"net",category:"music",popularity:.75},{id:17,vendor:"Einti",tld:"name",category:"shoes",popularity:.41},{id:18,vendor:"Vitz",tld:"edu",category:"sports",popularity:.36},{id:19,vendor:"Jabbercube",tld:"gov",category:"kids",popularity:.77},{id:20,vendor:"Kwimbee",tld:"net",category:"beauty",popularity:.36},{id:21,vendor:"Aibox",tld:"net",category:"toys",popularity:1.02},{id:22,vendor:"Wikibox",tld:"edu",category:"toys",popularity:.58},{id:23,vendor:"Devpoint",tld:"edu",category:"garden",popularity:.93},{id:24,vendor:"Latz",tld:"biz",category:"music",popularity:.2},{id:25,vendor:"Minyx",tld:"biz",category:"music",popularity:.76},{id:26,vendor:"Jetwire",tld:"edu",category:"toys",popularity:.54},{id:27,vendor:"Topicshots",tld:"info",category:"movies",popularity:.65},{id:28,vendor:"Zoomzone",tld:"gov",category:"outdoors",popularity:.73},{id:29,vendor:"Eare",tld:"gov",category:"tools",popularity:.57},{id:30,vendor:"Centidel",tld:"org",category:"grocery",popularity:.8},{id:31,vendor:"Fivebridge",tld:"info",category:"books",popularity:.69},{id:32,vendor:"Twitterbeat",tld:"mil",category:"jewelry",popularity:.54},{id:33,vendor:"Chatterbridge",tld:"com",category:"jewelry",popularity:.43},{id:34,vendor:"Edgepulse",tld:"edu",category:"jewelry",popularity:.44},{id:35,vendor:"Skyvu",tld:"org",category:"sports",popularity:1.02},{id:36,vendor:"Gevee",tld:"mil",category:"computers",popularity:.41},{id:37,vendor:"Kwinu",tld:"mil",category:"sports",popularity:.46},{id:38,vendor:"Quire",tld:"mil",category:"industrial",popularity:.47},{id:39,vendor:"Roombo",tld:"info",category:"tools",popularity:.45},{id:40,vendor:"Linkbuzz",tld:"net",category:"kids",popularity:.59},{id:41,vendor:"Photobug",tld:"net",category:"books",popularity:.84},{id:42,vendor:"Wikizz",tld:"info",category:"toys",popularity:.3},{id:43,vendor:"Ainyx",tld:"biz",category:"kids",popularity:.51},{id:44,vendor:"Mita",tld:"gov",category:"music",popularity:.8},{id:45,vendor:"Oloo",tld:"biz",category:"home",popularity:.62},{id:46,vendor:"Wikido",tld:"mil",category:"books",popularity:.33},{id:47,vendor:"Agivu",tld:"net",category:"industrial",popularity:.16},{id:48,vendor:"Jabberstorm",tld:"name",category:"toys",popularity:.34},{id:49,vendor:"Voonix",tld:"edu",category:"health",popularity:.67},{id:50,vendor:"Dabfeed",tld:"mil",category:"movies",popularity:.63},{id:51,vendor:"Camido",tld:"com",category:"games",popularity:.16},{id:52,vendor:"Yodel",tld:"com",category:"automotive",popularity:.71},{id:53,vendor:"Twitterbeat",tld:"net",category:"health",popularity:.77},{id:54,vendor:"Bubblemix",tld:"name",category:"clothing",popularity:.29},{id:55,vendor:"Eidel",tld:"com",category:"outdoors",popularity:.19},{id:56,vendor:"Devify",tld:"biz",category:"jewelry",popularity:.3},{id:57,vendor:"Pixope",tld:"net",category:"jewelry",popularity:.55},{id:58,vendor:"Twiyo",tld:"mil",category:"automotive",popularity:.59},{id:59,vendor:"Flashpoint",tld:"mil",category:"beauty",popularity:.83},{id:60,vendor:"Dynabox",tld:"biz",category:"automotive",popularity:.43},{id:61,vendor:"Browseblab",tld:"edu",category:"automotive",popularity:.64},{id:62,vendor:"Gabspot",tld:"mil",category:"shoes",popularity:.39},{id:63,vendor:"Edgetag",tld:"biz",category:"electronics",popularity:.78},{id:64,vendor:"Fatz",tld:"info",category:"music",popularity:.47},{id:65,vendor:"Tagfeed",tld:"info",category:"sports",popularity:.72},{id:66,vendor:"Aivee",tld:"gov",category:"games",popularity:-.01},{id:67,vendor:"Gabvine",tld:"net",category:"garden",popularity:.31},{id:68,vendor:"Thoughtstorm",tld:"biz",category:"health",popularity:.63},{id:69,vendor:"Rhynyx",tld:"info",category:"games",popularity:.3},{id:70,vendor:"Meezzy",tld:"biz",category:"shoes",popularity:.49},{id:71,vendor:"Jaloo",tld:"com",category:"home",popularity:.03},{id:72,vendor:"Ntags",tld:"info",category:"computers",popularity:.82},{id:73,vendor:"Meevee",tld:"info",category:"grocery",popularity:.09},{id:74,vendor:"Zoonder",tld:"org",category:"grocery",popularity:.8},{id:75,vendor:"Twitterworks",tld:"com",category:"computers",popularity:.18},{id:76,vendor:"Tagchat",tld:"biz",category:"toys",popularity:.41},{id:77,vendor:"Wordpedia",tld:"biz",category:"music",popularity:.72},{id:78,vendor:"Trilith",tld:"com",category:"shoes",popularity:.33},{id:79,vendor:"Oyonder",tld:"com",category:"music",popularity:.67},{id:80,vendor:"Abata",tld:"net",category:"games",popularity:.39},{id:81,vendor:"BlogXS",tld:"gov",category:"movies",popularity:.31},{id:82,vendor:"Oba",tld:"info",category:"health",popularity:.18},{id:83,vendor:"Edgewire",tld:"name",category:"beauty",popularity:.32},{id:84,vendor:"Ainyx",tld:"gov",category:"baby",popularity:.19},{id:85,vendor:"Riffpedia",tld:"gov",category:"grocery",popularity:.23},{id:86,vendor:"Fadeo",tld:"gov",category:"movies",popularity:.27},{id:87,vendor:"Muxo",tld:"name",category:"grocery",popularity:.15},{id:88,vendor:"Skaboo",tld:"org",category:"sports",popularity:.18},{id:89,vendor:"Babbleopia",tld:"gov",category:"automotive",popularity:.6},{id:90,vendor:"Meedoo",tld:"gov",category:"sports",popularity:.81},{id:91,vendor:"Dabshots",tld:"name",category:"home",popularity:.65},{id:92,vendor:"Aimbo",tld:"mil",category:"baby",popularity:.55},{id:93,vendor:"Jaloo",tld:"gov",category:"jewelry",popularity:.83},{id:94,vendor:"Browsezoom",tld:"org",category:"beauty",popularity:.66},{id:95,vendor:"Browsedrive",tld:"org",category:"beauty",popularity:.56},{id:96,vendor:"Jazzy",tld:"gov",category:"automotive",popularity:.85},{id:97,vendor:"Meetz",tld:"info",category:"movies",popularity:.71},{id:98,vendor:"Trudeo",tld:"edu",category:"movies",popularity:.98},{id:99,vendor:"Skimia",tld:"com",category:"industrial",popularity:.77},{id:100,vendor:"Skiba",tld:"com",category:"music",popularity:.93},{id:101,vendor:"Babblestorm",tld:"name",category:"industrial",popularity:1.18},{id:102,vendor:"Voomm",tld:"name",category:"computers",popularity:.08},{id:103,vendor:"Roombo",tld:"edu",category:"garden",popularity:1.16},{id:104,vendor:"Twimm",tld:"info",category:"baby",popularity:.96},{id:105,vendor:"Bluejam",tld:"edu",category:"health",popularity:.48},{id:106,vendor:"Twitterwire",tld:"org",category:"garden",popularity:.62},{id:107,vendor:"Ainyx",tld:"name",category:"toys",popularity:.5},{id:108,vendor:"Livetube",tld:"net",category:"automotive",popularity:.4},{id:109,vendor:"Eidel",tld:"gov",category:"baby",popularity:.48},{id:110,vendor:"Realmix",tld:"edu",category:"kids",popularity:.7},{id:111,vendor:"Zoonoodle",tld:"mil",category:"automotive",popularity:.77},{id:112,vendor:"Omba",tld:"biz",category:"jewelry",popularity:.48},{id:113,vendor:"Brightdog",tld:"name",category:"automotive",popularity:.39},{id:114,vendor:"Brainlounge",tld:"info",category:"baby",popularity:.8},{id:115,vendor:"Shufflester",tld:"mil",category:"music",popularity:.49},{id:116,vendor:"Fivebridge",tld:"com",category:"industrial",popularity:.54},{id:117,vendor:"Topicshots",tld:"biz",category:"toys",popularity:.55},{id:118,vendor:"Photobug",tld:"mil",category:"outdoors",popularity:.4},{id:119,vendor:"Skippad",tld:"biz",category:"computers",popularity:.2},{id:120,vendor:"Dabshots",tld:"mil",category:"shoes",popularity:.47},{id:121,vendor:"Aimbo",tld:"mil",category:"jewelry",popularity:.61},{id:122,vendor:"Oyope",tld:"biz",category:"electronics",popularity:.53},{id:123,vendor:"Kimia",tld:"org",category:"tools",popularity:.53},{id:124,vendor:"Avaveo",tld:"biz",category:"garden",popularity:.37},{id:125,vendor:"Kwideo",tld:"biz",category:"kids",popularity:.02},{id:126,vendor:"Voomm",tld:"com",category:"movies",popularity:.3},{id:127,vendor:"Voolia",tld:"com",category:"outdoors",popularity:.8},{id:128,vendor:"Layo",tld:"gov",category:"books",popularity:.17},{id:129,vendor:"Trilia",tld:"com",category:"games",popularity:.13},{id:130,vendor:"Zazio",tld:"edu",category:"clothing",popularity:.34},{id:131,vendor:"Topdrive",tld:"gov",category:"industrial",popularity:.53},{id:132,vendor:"Yoveo",tld:"info",category:"computers",popularity:.63},{id:133,vendor:"Yodel",tld:"info",category:"electronics",popularity:.4},{id:134,vendor:"Dynabox",tld:"org",category:"industrial",popularity:.02},{id:135,vendor:"Browsebug",tld:"info",category:"toys",popularity:.65},{id:136,vendor:"Riffpath",tld:"mil",category:"jewelry",popularity:.46},{id:137,vendor:"Jaloo",tld:"name",category:"baby",popularity:.62},{id:138,vendor:"Linklinks",tld:"mil",category:"health",popularity:.33},{id:139,vendor:"Yotz",tld:"biz",category:"industrial",popularity:.88},{id:140,vendor:"Mymm",tld:"org",category:"computers",popularity:.64},{id:141,vendor:"Ailane",tld:"biz",category:"automotive",popularity:.67},{id:142,vendor:"Realmix",tld:"org",category:"kids",popularity:.45},{id:143,vendor:"Pixonyx",tld:"edu",category:"automotive",popularity:.23},{id:144,vendor:"Talane",tld:"com",category:"grocery",popularity:.29},{id:145,vendor:"Jabberbean",tld:"info",category:"industrial",popularity:.38},{id:146,vendor:"Wikido",tld:"mil",category:"clothing",popularity:.93},{id:147,vendor:"InnoZ",tld:"info",category:"automotive",popularity:.76},{id:148,vendor:"Photobug",tld:"org",category:"toys",popularity:.63},{id:149,vendor:"Dazzlesphere",tld:"mil",category:"toys",popularity:.38},{id:150,vendor:"Trudoo",tld:"net",category:"music",popularity:.41},{id:151,vendor:"Photolist",tld:"edu",category:"health",popularity:.56},{id:152,vendor:"Twinte",tld:"gov",category:"clothing",popularity:.76},{id:153,vendor:"Buzzbean",tld:"org",category:"movies",popularity:.57},{id:154,vendor:"Demivee",tld:"net",category:"home",popularity:.08},{id:155,vendor:"Photojam",tld:"edu",category:"movies",popularity:.86},{id:156,vendor:"Flipstorm",tld:"info",category:"tools",popularity:.5},{id:157,vendor:"Muxo",tld:"edu",category:"garden",popularity:.66},{id:158,vendor:"Dabjam",tld:"mil",category:"kids",popularity:.75},{id:159,vendor:"Vimbo",tld:"edu",category:"electronics",popularity:.34},{id:160,vendor:"Yakidoo",tld:"name",category:"books",popularity:.76},{id:161,vendor:"Tagfeed",tld:"com",category:"sports",popularity:.21},{id:162,vendor:"Twimm",tld:"org",category:"sports",popularity:.65},{id:163,vendor:"Pixonyx",tld:"org",category:"garden",popularity:.44},{id:164,vendor:"Twimm",tld:"org",category:"beauty",popularity:.52},{id:165,vendor:"Camimbo",tld:"org",category:"home",popularity:.67},{id:166,vendor:"Pixope",tld:"org",category:"clothing",popularity:.55},{id:167,vendor:"Camimbo",tld:"gov",category:"kids",popularity:.62},{id:168,vendor:"Teklist",tld:"name",category:"games",popularity:.81},{id:169,vendor:"Meeveo",tld:"com",category:"movies",popularity:.64},{id:170,vendor:"Kwimbee",tld:"edu",category:"books",popularity:.69},{id:171,vendor:"Jabbersphere",tld:"com",category:"shoes",popularity:.43},{id:172,vendor:"Kwilith",tld:"gov",category:"computers",popularity:.7},{id:173,vendor:"Livetube",tld:"mil",category:"games",popularity:.34},{id:174,vendor:"Izio",tld:"gov",category:"tools",popularity:.56},{id:175,vendor:"Jatri",tld:"org",category:"baby",popularity:.87},{id:176,vendor:"Trupe",tld:"info",category:"sports",popularity:.24},{id:177,vendor:"Rhyloo",tld:"biz",category:"games",popularity:.62},{id:178,vendor:"Rhynyx",tld:"mil",category:"sports",popularity:.63},{id:179,vendor:"Teklist",tld:"org",category:"tools",popularity:.86},{id:180,vendor:"Skibox",tld:"com",category:"kids",popularity:.31},{id:181,vendor:"Gigashots",tld:"gov",category:"outdoors",popularity:.06},{id:182,vendor:"Tambee",tld:"edu",category:"baby",popularity:.55},{id:183,vendor:"Kwideo",tld:"mil",category:"outdoors",popularity:.82},{id:184,vendor:"Zoovu",tld:"mil",category:"games",popularity:.61},{id:185,vendor:"InnoZ",tld:"biz",category:"beauty",popularity:.61},{id:186,vendor:"Tagfeed",tld:"mil",category:"outdoors",popularity:.62},{id:187,vendor:"Eazzy",tld:"net",category:"beauty",popularity:.42},{id:188,vendor:"Meejo",tld:"com",category:"outdoors",popularity:.33},{id:189,vendor:"Centizu",tld:"biz",category:"kids",popularity:.83},{id:190,vendor:"Browsedrive",tld:"net",category:"automotive",popularity:.61},{id:191,vendor:"Zoomzone",tld:"mil",category:"books",popularity:.74},{id:192,vendor:"Riffwire",tld:"edu",category:"jewelry",popularity:.13},{id:193,vendor:"Vinte",tld:"mil",category:"games",popularity:.7},{id:194,vendor:"Browsezoom",tld:"info",category:"automotive",popularity:.02},{id:195,vendor:"Gabvine",tld:"info",category:"tools",popularity:.46},{id:196,vendor:"Linkbridge",tld:"mil",category:"kids",popularity:.79},{id:197,vendor:"Riffpedia",tld:"info",category:"grocery",popularity:.62},{id:198,vendor:"Zoombox",tld:"net",category:"industrial",popularity:-.09},{id:199,vendor:"Skiba",tld:"info",category:"jewelry",popularity:.82},{id:200,vendor:"Flashdog",tld:"biz",category:"games",popularity:.86},{id:201,vendor:"Rhyloo",tld:"name",category:"movies",popularity:.28},{id:202,vendor:"Yata",tld:"name",category:"sports",popularity:.74},{id:203,vendor:"Yakitri",tld:"info",category:"electronics",popularity:.33},{id:204,vendor:"Jetwire",tld:"biz",category:"computers",popularity:.67},{id:205,vendor:"Wordtune",tld:"org",category:"automotive",popularity:-.13},{id:206,vendor:"Zoombox",tld:"net",category:"garden",popularity:1.23},{id:207,vendor:"Photojam",tld:"com",category:"electronics",popularity:.52},{id:208,vendor:"Youspan",tld:"biz",category:"jewelry",popularity:.96},{id:209,vendor:"Twiyo",tld:"net",category:"grocery",popularity:.71},{id:210,vendor:"Reallinks",tld:"gov",category:"grocery",popularity:.85},{id:211,vendor:"Mycat",tld:"com",category:"music",popularity:.8},{id:212,vendor:"Jayo",tld:"edu",category:"computers",popularity:.43},{id:213,vendor:"Aivee",tld:"mil",category:"computers",popularity:.27},{id:214,vendor:"Eadel",tld:"biz",category:"movies",popularity:.64},{id:215,vendor:"Jabberstorm",tld:"net",category:"garden",popularity:.14},{id:216,vendor:"Oyope",tld:"gov",category:"computers",popularity:.97},{id:217,vendor:"Eabox",tld:"biz",category:"computers",popularity:.68},{id:218,vendor:"Edgeify",tld:"org",category:"home",popularity:.39},{id:219,vendor:"Jaxbean",tld:"edu",category:"automotive",popularity:.15},{id:220,vendor:"Topicblab",tld:"name",category:"books",popularity:.72},{id:221,vendor:"Vinder",tld:"org",category:"electronics",popularity:.51},{id:222,vendor:"Quimm",tld:"biz",category:"sports",popularity:.71},{id:223,vendor:"Thoughtstorm",tld:"mil",category:"beauty",popularity:.61},{id:224,vendor:"Browsedrive",tld:"edu",category:"shoes",popularity:.72},{id:225,vendor:"Mydo",tld:"name",category:"sports",popularity:.16},{id:226,vendor:"Gabcube",tld:"net",category:"beauty",popularity:.15},{id:227,vendor:"Rhynyx",tld:"name",category:"electronics",popularity:.55},{id:228,vendor:"Centizu",tld:"gov",category:"computers",popularity:.55},{id:229,vendor:"Quatz",tld:"biz",category:"outdoors",popularity:.91},{id:230,vendor:"Twitterwire",tld:"biz",category:"sports",popularity:.05},{id:231,vendor:"Oyonder",tld:"info",category:"garden",popularity:.43},{id:232,vendor:"Rhybox",tld:"gov",category:"jewelry",popularity:.19},{id:233,vendor:"Yacero",tld:"name",category:"sports",popularity:.67},{id:234,vendor:"Skyvu",tld:"org",category:"garden",popularity:.41},{id:235,vendor:"Dabvine",tld:"mil",category:"computers",popularity:.57},{id:236,vendor:"Brainverse",tld:"biz",category:"electronics",popularity:.97},{id:237,vendor:"Linkbridge",tld:"gov",category:"tools",popularity:.69},{id:238,vendor:"Ozu",tld:"net",category:"games",popularity:.7},{id:239,vendor:"Photobug",tld:"edu",category:"sports",popularity:.47},{id:240,vendor:"Gabtype",tld:"mil",category:"tools",popularity:.58},{id:241,vendor:"Tagcat",tld:"mil",category:"kids",popularity:.56},{id:242,vendor:"Centizu",tld:"info",category:"sports",popularity:.96},{id:243,vendor:"Babbleblab",tld:"com",category:"books",popularity:.76},{id:244,vendor:"Twitternation",tld:"biz",category:"jewelry",popularity:-.09},{id:245,vendor:"Jabbersphere",tld:"info",category:"outdoors",popularity:.44},{id:246,vendor:"Eabox",tld:"edu",category:"baby",popularity:.54},{id:247,vendor:"Oyonder",tld:"biz",category:"garden",popularity:.23},{id:248,vendor:"Eamia",tld:"biz",category:"tools",popularity:.63},{id:249,vendor:"Dabtype",tld:"mil",category:"jewelry",popularity:.55},{id:250,vendor:"Skyvu",tld:"edu",category:"movies",popularity:.55},{id:251,vendor:"Devshare",tld:"net",category:"computers",popularity:.71},{id:252,vendor:"Voolia",tld:"biz",category:"tools",popularity:.36},{id:253,vendor:"Camido",tld:"net",category:"health",popularity:.62},{id:254,vendor:"Wikizz",tld:"info",category:"industrial",popularity:.63},{id:255,vendor:"Youopia",tld:"gov",category:"kids",popularity:.42},{id:256,vendor:"Buzzdog",tld:"mil",category:"toys",popularity:.48},{id:257,vendor:"Livetube",tld:"info",category:"electronics",popularity:.06},{id:258,vendor:"Lazzy",tld:"gov",category:"shoes",popularity:.25},{id:259,vendor:"Dynabox",tld:"info",category:"electronics",popularity:.62},{id:260,vendor:"Livetube",tld:"biz",category:"games",popularity:.48},{id:261,vendor:"Eare",tld:"com",category:"industrial",popularity:.48},{id:262,vendor:"Skimia",tld:"com",category:"jewelry",popularity:.25},{id:263,vendor:"Dabtype",tld:"name",category:"books",popularity:.65},{id:264,vendor:"Avavee",tld:"info",category:"automotive",popularity:.61},{id:265,vendor:"Jabbertype",tld:"org",category:"automotive",popularity:.62},{id:266,vendor:"Zoombox",tld:"mil",category:"grocery",popularity:.97},{id:267,vendor:"Youspan",tld:"info",category:"movies",popularity:.33},{id:268,vendor:"Feedspan",tld:"mil",category:"outdoors",popularity:.88},{id:269,vendor:"Oyope",tld:"biz",category:"sports",popularity:.71},{id:270,vendor:"Feedfish",tld:"name",category:"home",popularity:.8},{id:271,vendor:"Linktype",tld:"info",category:"tools",popularity:.12},{id:272,vendor:"Centizu",tld:"net",category:"electronics",popularity:.28},{id:273,vendor:"Fivespan",tld:"info",category:"automotive",popularity:.52},{id:274,vendor:"Chatterpoint",tld:"org",category:"toys",popularity:.5},{id:275,vendor:"Fivebridge",tld:"com",category:"industrial",popularity:-.12},{id:276,vendor:"Quatz",tld:"com",category:"sports",popularity:.47},{id:277,vendor:"Eimbee",tld:"gov",category:"automotive",popularity:.53},{id:278,vendor:"Yotz",tld:"info",category:"movies",popularity:.78},{id:279,vendor:"Meevee",tld:"mil",category:"computers",popularity:.53},{id:280,vendor:"Kwideo",tld:"biz",category:"industrial",popularity:.58},{id:281,vendor:"Viva",tld:"name",category:"movies",popularity:.39},{id:282,vendor:"Thoughtworks",tld:"biz",category:"sports",popularity:.66},{id:283,vendor:"Plambee",tld:"net",category:"computers",popularity:-.02},{id:284,vendor:"Gabtune",tld:"gov",category:"beauty",popularity:.64},{id:285,vendor:"Eimbee",tld:"org",category:"jewelry",popularity:.32},{id:286,vendor:"Fiveclub",tld:"info",category:"games",popularity:.79},{id:287,vendor:"Vimbo",tld:"name",category:"garden",popularity:.63},{id:288,vendor:"Flashset",tld:"edu",category:"games",popularity:.53},{id:289,vendor:"Meeveo",tld:"name",category:"health",popularity:.4},{id:290,vendor:"Thoughtbridge",tld:"biz",category:"clothing",popularity:.22},{id:291,vendor:"Youspan",tld:"mil",category:"electronics",popularity:.34},{id:292,vendor:"Meembee",tld:"org",category:"beauty",popularity:.28},{id:293,vendor:"Zooveo",tld:"info",category:"games",popularity:.45},{id:294,vendor:"Feedbug",tld:"edu",category:"games",popularity:.6},{id:295,vendor:"Npath",tld:"org",category:"garden",popularity:.34},{id:296,vendor:"Jazzy",tld:"com",category:"grocery",popularity:.86},{id:297,vendor:"Kimia",tld:"biz",category:"games",popularity:.44},{id:298,vendor:"Ooba",tld:"com",category:"kids",popularity:.5},{id:299,vendor:"Gabspot",tld:"gov",category:"industrial",popularity:.42},{id:300,vendor:"Realcube",tld:"name",category:"beauty",popularity:.66},{id:301,vendor:"Yambee",tld:"net",category:"toys",popularity:.67},{id:302,vendor:"Realcube",tld:"biz",category:"outdoors",popularity:.41},{id:303,vendor:"Youfeed",tld:"mil",category:"health",popularity:.34},{id:304,vendor:"Eabox",tld:"com",category:"toys",popularity:.31},{id:305,vendor:"Riffpath",tld:"biz",category:"computers",popularity:.73},{id:306,vendor:"Ainyx",tld:"info",category:"sports",popularity:.75},{id:307,vendor:"Feedmix",tld:"biz",category:"health",popularity:.41},{id:308,vendor:"Eare",tld:"edu",category:"toys",popularity:.86},{id:309,vendor:"Vinder",tld:"info",category:"beauty",popularity:.55},{id:310,vendor:"Roombo",tld:"biz",category:"industrial",popularity:1},{id:311,vendor:"Dynazzy",tld:"name",category:"shoes",popularity:.43},{id:312,vendor:"Zoomzone",tld:"biz",category:"sports",popularity:.46},{id:313,vendor:"Voolia",tld:"name",category:"movies",popularity:.74},{id:314,vendor:"Ntag",tld:"mil",category:"sports",popularity:.34},{id:315,vendor:"Quinu",tld:"net",category:"home",popularity:.43},{id:316,vendor:"Jabbertype",tld:"info",category:"industrial",popularity:.54},{id:317,vendor:"Jatri",tld:"info",category:"clothing",popularity:.53},{id:318,vendor:"Feedbug",tld:"net",category:"grocery",popularity:.36},{id:319,vendor:"Babbleblab",tld:"net",category:"computers",popularity:1.05},{id:320,vendor:"Twiyo",tld:"org",category:"industrial",popularity:.79},{id:321,vendor:"Avamm",tld:"info",category:"kids",popularity:.29},{id:322,vendor:"Skippad",tld:"edu",category:"books",popularity:.23},{id:323,vendor:"Thoughtstorm",tld:"net",category:"movies",popularity:.45},{id:324,vendor:"Browseblab",tld:"gov",category:"jewelry",popularity:.77},{id:325,vendor:"Fliptune",tld:"name",category:"toys",popularity:.68},{id:326,vendor:"Twitterwire",tld:"mil",category:"sports",popularity:.8},{id:327,vendor:"Skippad",tld:"org",category:"games",popularity:.48},{id:328,vendor:"Lazzy",tld:"name",category:"electronics",popularity:.59},{id:329,vendor:"Zava",tld:"mil",category:"kids",popularity:.25},{id:330,vendor:"Linktype",tld:"org",category:"games",popularity:.81},{id:331,vendor:"Dabjam",tld:"net",category:"beauty",popularity:.78},{id:332,vendor:"Kare",tld:"org",category:"clothing",popularity:.23},{id:333,vendor:"Bubblebox",tld:"name",category:"beauty",popularity:.57},{id:334,vendor:"Gevee",tld:"net",category:"automotive",popularity:.34},{id:335,vendor:"Oyoyo",tld:"gov",category:"books",popularity:.55},{id:336,vendor:"Katz",tld:"gov",category:"outdoors",popularity:.25},{id:337,vendor:"Livepath",tld:"com",category:"games",popularity:.53},{id:338,vendor:"Ooba",tld:"org",category:"clothing",popularity:.23},{id:339,vendor:"Brightbean",tld:"edu",category:"automotive",popularity:.26},{id:340,vendor:"Skiba",tld:"net",category:"jewelry",popularity:.35},{id:341,vendor:"Feedfish",tld:"name",category:"outdoors",popularity:.08},{id:342,vendor:"Avamba",tld:"name",category:"sports",popularity:.41},{id:343,vendor:"Oba",tld:"com",category:"outdoors",popularity:.75},{id:344,vendor:"Zoombox",tld:"gov",category:"jewelry",popularity:.53},{id:345,vendor:"Fliptune",tld:"info",category:"electronics",popularity:.14},{id:346,vendor:"Brainbox",tld:"biz",category:"clothing",popularity:.21},{id:347,vendor:"Avamm",tld:"name",category:"baby",popularity:.46},{id:348,vendor:"Yozio",tld:"org",category:"toys",popularity:.63},{id:349,vendor:"Photobug",tld:"edu",category:"baby",popularity:.52},{id:350,vendor:"Demivee",tld:"gov",category:"clothing",popularity:.72},{id:351,vendor:"Brainlounge",tld:"org",category:"books",popularity:.45},{id:352,vendor:"Dazzlesphere",tld:"biz",category:"beauty",popularity:.75},{id:353,vendor:"Dazzlesphere",tld:"org",category:"games",popularity:.3},{id:354,vendor:"Aibox",tld:"biz",category:"home",popularity:.08},{id:355,vendor:"Feedspan",tld:"com",category:"home",popularity:.59},{id:356,vendor:"Camido",tld:"org",category:"outdoors",popularity:.24},{id:357,vendor:"Kare",tld:"net",category:"music",popularity:.41},{id:358,vendor:"Photolist",tld:"info",category:"shoes",popularity:.51},{id:359,vendor:"Photobug",tld:"net",category:"toys",popularity:.52},{id:360,vendor:"Centidel",tld:"net",category:"shoes",popularity:.66},{id:361,vendor:"Yabox",tld:"info",category:"outdoors",popularity:.32},{id:362,vendor:"Lajo",tld:"mil",category:"grocery",popularity:.59},{id:363,vendor:"Tagopia",tld:"net",category:"tools",popularity:.42},{id:364,vendor:"Brainlounge",tld:"gov",category:"outdoors",popularity:.49},{id:365,vendor:"Brainverse",tld:"org",category:"kids",popularity:.54},{id:366,vendor:"Kazio",tld:"edu",category:"books",popularity:.44},{id:367,vendor:"Thoughtbeat",tld:"mil",category:"music",popularity:.57},{id:368,vendor:"Yakidoo",tld:"org",category:"tools",popularity:.57},{id:369,vendor:"Skiptube",tld:"net",category:"jewelry",popularity:.41},{id:370,vendor:"Buzzshare",tld:"edu",category:"games",popularity:-.1},{id:371,vendor:"Brainbox",tld:"com",category:"industrial",popularity:.72},{id:372,vendor:"Talane",tld:"biz",category:"games",popularity:.7},{id:373,vendor:"Skyndu",tld:"com",category:"tools",popularity:.94},{id:374,vendor:"Jetwire",tld:"mil",category:"music",popularity:.02},{id:375,vendor:"Dazzlesphere",tld:"edu",category:"toys",popularity:.41},{id:376,vendor:"Rhynyx",tld:"gov",category:"beauty",popularity:.46},{id:377,vendor:"Kanoodle",tld:"biz",category:"shoes",popularity:.24},{id:378,vendor:"Jaxnation",tld:"org",category:"computers",popularity:.45},{id:379,vendor:"Photobug",tld:"gov",category:"outdoors",popularity:.32},{id:380,vendor:"Midel",tld:"info",category:"health",popularity:.86},{id:381,vendor:"Linktype",tld:"info",category:"tools",popularity:.7},{id:382,vendor:"Dabshots",tld:"mil",category:"industrial",popularity:.95},{id:383,vendor:"Zooveo",tld:"org",category:"beauty",popularity:.42},{id:384,vendor:"Blognation",tld:"mil",category:"jewelry",popularity:.26},{id:385,vendor:"Oyonder",tld:"name",category:"games",popularity:.97},{id:386,vendor:"Zoozzy",tld:"mil",category:"baby",popularity:.5},{id:387,vendor:"Skyble",tld:"edu",category:"shoes",popularity:.58},{id:388,vendor:"Zoomdog",tld:"name",category:"beauty",popularity:1.13},{id:389,vendor:"Buzzster",tld:"org",category:"industrial",popularity:.58},{id:390,vendor:"Bluezoom",tld:"gov",category:"books",popularity:.53},{id:391,vendor:"Skipfire",tld:"name",category:"kids",popularity:.35},{id:392,vendor:"InnoZ",tld:"org",category:"garden",popularity:.36},{id:393,vendor:"Youspan",tld:"edu",category:"garden",popularity:.12},{id:394,vendor:"Gabspot",tld:"net",category:"music",popularity:.68},{id:395,vendor:"Gabvine",tld:"edu",category:"home",popularity:.36},{id:396,vendor:"Flashspan",tld:"edu",category:"tools",popularity:.94},{id:397,vendor:"BlogXS",tld:"info",category:"grocery",popularity:.63},{id:398,vendor:"Tazzy",tld:"edu",category:"shoes",popularity:.57},{id:399,vendor:"Photofeed",tld:"mil",category:"clothing",popularity:.18},{id:400,vendor:"Agimba",tld:"biz",category:"grocery",popularity:.14},{id:401,vendor:"Jabberbean",tld:"biz",category:"kids",popularity:.49},{id:402,vendor:"Camimbo",tld:"mil",category:"sports",popularity:.28},{id:403,vendor:"Twitterwire",tld:"gov",category:"books",popularity:.58},{id:404,vendor:"Shuffledrive",tld:"gov",category:"garden",popularity:.95},{id:405,vendor:"Eayo",tld:"info",category:"tools",popularity:.44},{id:406,vendor:"Zoomzone",tld:"info",category:"toys",popularity:.46},{id:407,vendor:"Tagcat",tld:"gov",category:"electronics",popularity:0},{id:408,vendor:"Blogtags",tld:"biz",category:"home",popularity:.49},{id:409,vendor:"Jabbertype",tld:"com",category:"computers",popularity:.74},{id:410,vendor:"Photobug",tld:"info",category:"grocery",popularity:.75},{id:411,vendor:"Livepath",tld:"net",category:"beauty",popularity:1.03},{id:412,vendor:"Shufflebeat",tld:"net",category:"tools",popularity:.62},{id:413,vendor:"Skynoodle",tld:"biz",category:"clothing",popularity:.14},{id:414,vendor:"Youfeed",tld:"name",category:"shoes",popularity:.23},{id:415,vendor:"Gigaclub",tld:"net",category:"outdoors",popularity:.74},{id:416,vendor:"Twitterwire",tld:"info",category:"games",popularity:.93},{id:417,vendor:"Livefish",tld:"edu",category:"garden",popularity:.85},{id:418,vendor:"Dazzlesphere",tld:"mil",category:"beauty",popularity:.63},{id:419,vendor:"Quatz",tld:"edu",category:"toys",popularity:.35},{id:420,vendor:"Meezzy",tld:"biz",category:"kids",popularity:.37},{id:421,vendor:"Eidel",tld:"com",category:"movies",popularity:.61},{id:422,vendor:"DabZ",tld:"edu",category:"kids",popularity:.17},{id:423,vendor:"DabZ",tld:"mil",category:"beauty",popularity:.32},{id:424,vendor:"Twitterbridge",tld:"net",category:"tools",popularity:.29},{id:425,vendor:"Brainsphere",tld:"name",category:"books",popularity:.53},{id:426,vendor:"Realmix",tld:"gov",category:"baby",popularity:.74},{id:427,vendor:"Yodo",tld:"gov",category:"movies",popularity:.82},{id:428,vendor:"Realpoint",tld:"net",category:"toys",popularity:.33},{id:429,vendor:"Jamia",tld:"net",category:"music",popularity:.46},{id:430,vendor:"Skaboo",tld:"biz",category:"books",popularity:.17},{id:431,vendor:"LiveZ",tld:"edu",category:"baby",popularity:.52},{id:432,vendor:"Realbuzz",tld:"biz",category:"grocery",popularity:.55},{id:433,vendor:"Jetpulse",tld:"com",category:"sports",popularity:.17},{id:434,vendor:"Fivebridge",tld:"net",category:"shoes",popularity:.8},{id:435,vendor:"Talane",tld:"name",category:"jewelry",popularity:.58},{id:436,vendor:"Cogibox",tld:"com",category:"grocery",popularity:.09},{id:437,vendor:"Kwideo",tld:"edu",category:"shoes",popularity:.26},{id:438,vendor:"Avaveo",tld:"org",category:"electronics",popularity:.4},{id:439,vendor:"Brightbean",tld:"info",category:"baby",popularity:.92},{id:440,vendor:"Dablist",tld:"com",category:"beauty",popularity:.66},{id:441,vendor:"Voomm",tld:"org",category:"shoes",popularity:.59},{id:442,vendor:"Edgeblab",tld:"name",category:"electronics",popularity:.23},{id:443,vendor:"Gigazoom",tld:"edu",category:"electronics",popularity:.28},{id:444,vendor:"Riffpath",tld:"net",category:"shoes",popularity:.2},{id:445,vendor:"Edgepulse",tld:"com",category:"health",popularity:.29},{id:446,vendor:"Wordtune",tld:"gov",category:"electronics",popularity:.67},{id:447,vendor:"Ntags",tld:"org",category:"kids",popularity:.42},{id:448,vendor:"Divavu",tld:"gov",category:"automotive",popularity:.72},{id:449,vendor:"Skyble",tld:"mil",category:"tools",popularity:.93},{id:450,vendor:"Viva",tld:"mil",category:"grocery",popularity:1.07},{id:451,vendor:"Bubblebox",tld:"net",category:"automotive",popularity:.33},{id:452,vendor:"Twinder",tld:"org",category:"baby",popularity:.19},{id:453,vendor:"Feedbug",tld:"gov",category:"jewelry",popularity:.72},{id:454,vendor:"Yodoo",tld:"org",category:"shoes",popularity:.23},{id:455,vendor:"Dynava",tld:"org",category:"automotive",popularity:.99},{id:456,vendor:"Pixonyx",tld:"com",category:"grocery",popularity:.64},{id:457,vendor:"Jaxworks",tld:"com",category:"outdoors",popularity:.68},{id:458,vendor:"Yakijo",tld:"info",category:"jewelry",popularity:.57},{id:459,vendor:"Fivespan",tld:"org",category:"garden",popularity:.17},{id:460,vendor:"Camido",tld:"biz",category:"toys",popularity:.76},{id:461,vendor:"Mycat",tld:"name",category:"computers",popularity:.69},{id:462,vendor:"Twitternation",tld:"mil",category:"health",popularity:.36},{id:463,vendor:"Divavu",tld:"net",category:"shoes",popularity:.66},{id:464,vendor:"Thoughtstorm",tld:"info",category:"games",popularity:.52},{id:465,vendor:"Aibox",tld:"edu",category:"clothing",popularity:.75},{id:466,vendor:"Mita",tld:"biz",category:"home",popularity:.1},{id:467,vendor:"Livetube",tld:"biz",category:"games",popularity:.48},{id:468,vendor:"Flipstorm",tld:"gov",category:"industrial",popularity:.57},{id:469,vendor:"Thoughtmix",tld:"biz",category:"kids",popularity:.4},{id:470,vendor:"Topiclounge",tld:"biz",category:"garden",popularity:.43},{id:471,vendor:"Mydeo",tld:"name",category:"books",popularity:.65},{id:472,vendor:"Ooba",tld:"info",category:"industrial",popularity:.42},{id:473,vendor:"LiveZ",tld:"com",category:"industrial",popularity:.31},{id:474,vendor:"Kayveo",tld:"mil",category:"garden",popularity:.27},{id:475,vendor:"Gabcube",tld:"org",category:"clothing",popularity:.73},{id:476,vendor:"Meejo",tld:"org",category:"outdoors",popularity:.4},{id:477,vendor:"Dynazzy",tld:"gov",category:"books",popularity:.76},{id:478,vendor:"Tavu",tld:"name",category:"movies",popularity:.95},{id:479,vendor:"Kazio",tld:"info",category:"electronics",popularity:.34},{id:480,vendor:"Photobean",tld:"info",category:"games",popularity:.38},{id:481,vendor:"Oyoba",tld:"net",category:"grocery",popularity:.79},{id:482,vendor:"Divanoodle",tld:"org",category:"toys",popularity:.46},{id:483,vendor:"Voomm",tld:"mil",category:"garden",popularity:.66},{id:484,vendor:"Miboo",tld:"info",category:"toys",popularity:.67},{id:485,vendor:"Jatri",tld:"org",category:"industrial",popularity:.75},{id:486,vendor:"Shufflebeat",tld:"info",category:"automotive",popularity:.85},{id:487,vendor:"Jazzy",tld:"mil",category:"computers",popularity:.59},{id:488,vendor:"Omba",tld:"com",category:"games",popularity:.41},{id:489,vendor:"Yamia",tld:"info",category:"garden",popularity:.25},{id:490,vendor:"Eimbee",tld:"gov",category:"books",popularity:.35},{id:491,vendor:"Quimba",tld:"com",category:"books",popularity:.83},{id:492,vendor:"Jabbercube",tld:"edu",category:"kids",popularity:.93},{id:493,vendor:"Thoughtstorm",tld:"name",category:"games",popularity:.68},{id:494,vendor:"Eayo",tld:"name",category:"toys",popularity:.62},{id:495,vendor:"Meembee",tld:"gov",category:"music",popularity:.27},{id:496,vendor:"BlogXS",tld:"gov",category:"sports",popularity:.59},{id:497,vendor:"Twitterworks",tld:"net",category:"games",popularity:.72},{id:498,vendor:"Dynabox",tld:"edu",category:"computers",popularity:.94},{id:499,vendor:"Yakidoo",tld:"com",category:"grocery",popularity:.77},{id:500,vendor:"Feednation",tld:"org",category:"beauty",popularity:1.24},{id:501,vendor:"Divape",tld:"biz",category:"garden",popularity:.5},{id:502,vendor:"InnoZ",tld:"org",category:"books",popularity:.79},{id:503,vendor:"Gigazoom",tld:"mil",category:"electronics",popularity:.55},{id:504,vendor:"Rhycero",tld:"info",category:"books",popularity:1.05},{id:505,vendor:"Yodel",tld:"org",category:"garden",popularity:.25},{id:506,vendor:"Browseblab",tld:"net",category:"sports",popularity:.36},{id:507,vendor:"Yamia",tld:"info",category:"tools",popularity:.32},{id:508,vendor:"Jaxnation",tld:"org",category:"electronics",popularity:.69},{id:509,vendor:"Chatterpoint",tld:"edu",category:"baby",popularity:.43},{id:510,vendor:"Tazzy",tld:"org",category:"automotive",popularity:.51},{id:511,vendor:"Yotz",tld:"info",category:"tools",popularity:.52},{id:512,vendor:"Wikivu",tld:"info",category:"sports",popularity:.6},{id:513,vendor:"Fatz",tld:"name",category:"garden",popularity:.65},{id:514,vendor:"Yodoo",tld:"com",category:"tools",popularity:.21},{id:515,vendor:"Devify",tld:"org",category:"automotive",popularity:.32},{id:516,vendor:"Wikizz",tld:"org",category:"books",popularity:.37},{id:517,vendor:"Skivee",tld:"edu",category:"shoes",popularity:.27},{id:518,vendor:"Trupe",tld:"edu",category:"movies",popularity:.83},{id:519,vendor:"Oyoloo",tld:"edu",category:"music",popularity:.67},{id:520,vendor:"Podcat",tld:"biz",category:"books",popularity:.23},{id:521,vendor:"Kazu",tld:"biz",category:"clothing",popularity:.27},{id:522,vendor:"Agivu",tld:"gov",category:"toys",popularity:.63},{id:523,vendor:"Avavee",tld:"info",category:"computers",popularity:.44},{id:524,vendor:"Leenti",tld:"mil",category:"toys",popularity:.52},{id:525,vendor:"Bubblemix",tld:"edu",category:"health",popularity:.27},{id:526,vendor:"Voomm",tld:"net",category:"clothing",popularity:.34},{id:527,vendor:"Eire",tld:"com",category:"jewelry",popularity:.21},{id:528,vendor:"Roombo",tld:"org",category:"clothing",popularity:.47},{id:529,vendor:"Eayo",tld:"biz",category:"music",popularity:.67},{id:530,vendor:"Ooba",tld:"name",category:"games",popularity:.45},{id:531,vendor:"Youspan",tld:"org",category:"health",popularity:-.08},{id:532,vendor:"Jaxbean",tld:"mil",category:"tools",popularity:.11},{id:533,vendor:"Meezzy",tld:"edu",category:"kids",popularity:.54},{id:534,vendor:"Flashpoint",tld:"com",category:"outdoors",popularity:.34},{id:535,vendor:"Riffpath",tld:"biz",category:"health",popularity:.53},{id:536,vendor:"Edgeclub",tld:"name",category:"garden",popularity:.37},{id:537,vendor:"Thoughtbeat",tld:"edu",category:"sports",popularity:.15},{id:538,vendor:"Cogidoo",tld:"com",category:"games",popularity:.67},{id:539,vendor:"Mydeo",tld:"name",category:"movies",popularity:.66},{id:540,vendor:"Browsezoom",tld:"edu",category:"home",popularity:.35},{id:541,vendor:"Feednation",tld:"org",category:"games",popularity:.65},{id:542,vendor:"Camimbo",tld:"mil",category:"music",popularity:.37},{id:543,vendor:"Skipstorm",tld:"mil",category:"tools",popularity:.13},{id:544,vendor:"Skinder",tld:"org",category:"sports",popularity:.57},{id:545,vendor:"Twimm",tld:"name",category:"beauty",popularity:-.08},{id:546,vendor:"Yadel",tld:"gov",category:"shoes",popularity:.44},{id:547,vendor:"Skajo",tld:"biz",category:"toys",popularity:.66},{id:548,vendor:"Voolith",tld:"info",category:"jewelry",popularity:.93},{id:549,vendor:"Yamia",tld:"edu",category:"shoes",popularity:.3},{id:550,vendor:"Bubbletube",tld:"info",category:"beauty",popularity:.21},{id:551,vendor:"Oyonder",tld:"edu",category:"home",popularity:.36},{id:552,vendor:"Tazzy",tld:"mil",category:"tools",popularity:.77},{id:553,vendor:"Voonyx",tld:"com",category:"computers",popularity:.29},{id:554,vendor:"Linkbuzz",tld:"biz",category:"shoes",popularity:.66},{id:555,vendor:"Myworks",tld:"info",category:"music",popularity:.52},{id:556,vendor:"Jabbertype",tld:"biz",category:"tools",popularity:.36},{id:557,vendor:"Brightdog",tld:"com",category:"electronics",popularity:.71},{id:558,vendor:"Meembee",tld:"name",category:"home",popularity:.27},{id:559,vendor:"Voonix",tld:"name",category:"computers",popularity:.18},{id:560,vendor:"Gigabox",tld:"edu",category:"computers",popularity:.26},{id:561,vendor:"Browsezoom",tld:"com",category:"kids",popularity:.57},{id:562,vendor:"Yombu",tld:"biz",category:"automotive",popularity:.37},{id:563,vendor:"Devshare",tld:"biz",category:"toys",popularity:.52},{id:564,vendor:"Photofeed",tld:"edu",category:"automotive",popularity:.57},{id:565,vendor:"Realcube",tld:"mil",category:"industrial",popularity:.09},{id:566,vendor:"Brainbox",tld:"edu",category:"health",popularity:.69},{id:567,vendor:"Kamba",tld:"info",category:"garden",popularity:.33},{id:568,vendor:"Yodel",tld:"name",category:"home",popularity:.59},{id:569,vendor:"Mydo",tld:"info",category:"outdoors",popularity:.81},{id:570,vendor:"Youopia",tld:"biz",category:"beauty",popularity:.44},{id:571,vendor:"Tagchat",tld:"mil",category:"jewelry",popularity:.45},{id:572,vendor:"Quire",tld:"info",category:"health",popularity:.53},{id:573,vendor:"Shuffledrive",tld:"biz",category:"toys",popularity:.77},{id:574,vendor:"Browseblab",tld:"org",category:"tools",popularity:.47},{id:575,vendor:"Flashset",tld:"name",category:"electronics",popularity:.55},{id:576,vendor:"Tagfeed",tld:"name",category:"outdoors",popularity:.46},{id:577,vendor:"Skyndu",tld:"mil",category:"health",popularity:-.03},{id:578,vendor:"Dynabox",tld:"edu",category:"music",popularity:.99},{id:579,vendor:"Leexo",tld:"net",category:"industrial",popularity:.39},{id:580,vendor:"Plajo",tld:"info",category:"jewelry",popularity:.12},{id:581,vendor:"Yabox",tld:"name",category:"movies",popularity:.32},{id:582,vendor:"Snaptags",tld:"edu",category:"music",popularity:.96},{id:583,vendor:"Cogibox",tld:"com",category:"garden",popularity:.57},{id:584,vendor:"Thoughtmix",tld:"name",category:"home",popularity:.31},{id:585,vendor:"Feedfire",tld:"mil",category:"automotive",popularity:.31},{id:586,vendor:"Buzzbean",tld:"gov",category:"tools",popularity:.3},{id:587,vendor:"Youfeed",tld:"info",category:"music",popularity:.39},{id:588,vendor:"Rhynoodle",tld:"mil",category:"health",popularity:.71},{id:589,vendor:"Zoovu",tld:"mil",category:"automotive",popularity:.45},{id:590,vendor:"Yodel",tld:"biz",category:"garden",popularity:.64},{id:591,vendor:"Skilith",tld:"edu",category:"shoes",popularity:.37},{id:592,vendor:"Eadel",tld:"edu",category:"tools",popularity:.39},{id:593,vendor:"Topicblab",tld:"net",category:"books",popularity:.64},{id:594,vendor:"Yodoo",tld:"net",category:"tools",popularity:.16},{id:595,vendor:"Digitube",tld:"info",category:"automotive",popularity:.43},{id:596,vendor:"Avavee",tld:"com",category:"sports",popularity:.49},{id:597,vendor:"Cogibox",tld:"org",category:"beauty",popularity:.64},{id:598,vendor:"Skimia",tld:"biz",category:"garden",popularity:-.01},{id:599,vendor:"Skibox",tld:"biz",category:"sports",popularity:.32},{id:600,vendor:"Tagtune",tld:"org",category:"beauty",popularity:.43},{id:601,vendor:"Eare",tld:"info",category:"outdoors",popularity:.39},{id:602,vendor:"Dabjam",tld:"edu",category:"tools",popularity:.29},{id:603,vendor:"Twitterbeat",tld:"org",category:"toys",popularity:.8},{id:604,vendor:"Quimba",tld:"biz",category:"games",popularity:.59},{id:605,vendor:"Oozz",tld:"com",category:"shoes",popularity:.66},{id:606,vendor:"Yoveo",tld:"com",category:"tools",popularity:.21},{id:607,vendor:"Photofeed",tld:"org",category:"computers",popularity:.73},{id:608,vendor:"Eayo",tld:"biz",category:"electronics",popularity:.64},{id:609,vendor:"Zoonoodle",tld:"name",category:"automotive",popularity:.83},{id:610,vendor:"Livetube",tld:"info",category:"industrial",popularity:.61},{id:611,vendor:"Ailane",tld:"org",category:"electronics",popularity:.83},{id:612,vendor:"Zooveo",tld:"edu",category:"clothing",popularity:.58},{id:613,vendor:"Realbridge",tld:"info",category:"baby",popularity:.68},{id:614,vendor:"Skiptube",tld:"info",category:"outdoors",popularity:.3},{id:615,vendor:"Riffpedia",tld:"info",category:"tools",popularity:.57},{id:616,vendor:"Buzzbean",tld:"name",category:"garden",popularity:.37},{id:617,vendor:"Skibox",tld:"net",category:"games",popularity:.59},{id:618,vendor:"Topicblab",tld:"com",category:"kids",popularity:.56},{id:619,vendor:"Skaboo",tld:"com",category:"sports",popularity:1.1},{id:620,vendor:"Riffpedia",tld:"com",category:"grocery",popularity:.69},{id:621,vendor:"Oyondu",tld:"com",category:"toys",popularity:.14},{id:622,vendor:"Meevee",tld:"net",category:"shoes",popularity:.55},{id:623,vendor:"Jabbertype",tld:"gov",category:"baby",popularity:.77},{id:624,vendor:"Kanoodle",tld:"edu",category:"computers",popularity:.21},{id:625,vendor:"Tagchat",tld:"info",category:"computers",popularity:.33},{id:626,vendor:"Fadeo",tld:"com",category:"movies",popularity:.47},{id:627,vendor:"Aimbo",tld:"gov",category:"clothing",popularity:.01},{id:628,vendor:"Quimba",tld:"edu",category:"toys",popularity:.84},{id:629,vendor:"Twiyo",tld:"mil",category:"grocery",popularity:.23},{id:630,vendor:"Thoughtblab",tld:"name",category:"books",popularity:.45},{id:631,vendor:"Meembee",tld:"info",category:"beauty",popularity:.25},{id:632,vendor:"Twimbo",tld:"org",category:"books",popularity:.33},{id:633,vendor:"Brainsphere",tld:"org",category:"sports",popularity:.75},{id:634,vendor:"Quatz",tld:"edu",category:"baby",popularity:.87},{id:635,vendor:"Fanoodle",tld:"mil",category:"electronics",popularity:.2},{id:636,vendor:"Buzzshare",tld:"info",category:"tools",popularity:.59},{id:637,vendor:"Yodel",tld:"edu",category:"books",popularity:.45},{id:638,vendor:"Buzzbean",tld:"mil",category:"kids",popularity:.77},{id:639,vendor:"Kayveo",tld:"org",category:"kids",popularity:.37},{id:640,vendor:"Kare",tld:"mil",category:"books",popularity:.15},{id:641,vendor:"Cogidoo",tld:"info",category:"clothing",popularity:.33},{id:642,vendor:"Zoomdog",tld:"gov",category:"movies",popularity:.56},{id:643,vendor:"Twitterlist",tld:"name",category:"sports",popularity:.69},{id:644,vendor:"Nlounge",tld:"edu",category:"movies",popularity:.31},{id:645,vendor:"Twiyo",tld:"net",category:"baby",popularity:.63},{id:646,vendor:"Feedfire",tld:"edu",category:"music",popularity:.97},{id:647,vendor:"Trunyx",tld:"mil",category:"kids",popularity:.33},{id:648,vendor:"Skyble",tld:"gov",category:"garden",popularity:.39},{id:649,vendor:"Npath",tld:"name",category:"outdoors",popularity:.68},{id:650,vendor:"Meedoo",tld:"info",category:"jewelry",popularity:.39},{id:651,vendor:"Skivee",tld:"net",category:"electronics",popularity:.72},{id:652,vendor:"Fiveclub",tld:"org",category:"outdoors",popularity:.5},{id:653,vendor:"Talane",tld:"org",category:"home",popularity:.55},{id:654,vendor:"Jaxbean",tld:"com",category:"computers",popularity:.56},{id:655,vendor:"Realblab",tld:"edu",category:"toys",popularity:.05},{id:656,vendor:"Eamia",tld:"name",category:"books",popularity:.35},{id:657,vendor:"Meevee",tld:"net",category:"computers",popularity:.82},{id:658,vendor:"Lazz",tld:"edu",category:"baby",popularity:.51},{id:659,vendor:"Ntags",tld:"edu",category:"movies",popularity:.68},{id:660,vendor:"Dabfeed",tld:"mil",category:"industrial",popularity:.7},{id:661,vendor:"Linklinks",tld:"gov",category:"home",popularity:.82},{id:662,vendor:"Wikizz",tld:"info",category:"clothing",popularity:.5},{id:663,vendor:"Gigaclub",tld:"net",category:"kids",popularity:.62},{id:664,vendor:"Cogilith",tld:"gov",category:"garden",popularity:.31},{id:665,vendor:"Chatterbridge",tld:"edu",category:"electronics",popularity:.88},{id:666,vendor:"Ntags",tld:"biz",category:"movies",popularity:.15},{id:667,vendor:"Flipopia",tld:"edu",category:"sports",popularity:.6},{id:668,vendor:"Feednation",tld:"info",category:"sports",popularity:.43},{id:669,vendor:"Rooxo",tld:"info",category:"health",popularity:.36},{id:670,vendor:"Yoveo",tld:"com",category:"shoes",popularity:.34},{id:671,vendor:"Lazzy",tld:"org",category:"movies",popularity:.29},{id:672,vendor:"Shufflester",tld:"name",category:"health",popularity:.78},{id:673,vendor:"Demimbu",tld:"gov",category:"books",popularity:.65},{id:674,vendor:"Katz",tld:"net",category:"baby",popularity:.38},{id:675,vendor:"InnoZ",tld:"com",category:"tools",popularity:.58},{id:676,vendor:"Zooveo",tld:"net",category:"shoes",popularity:.18},{id:677,vendor:"Wordtune",tld:"name",category:"kids",popularity:.41},{id:678,vendor:"Skajo",tld:"org",category:"kids",popularity:.37},{id:679,vendor:"Rooxo",tld:"net",category:"movies",popularity:.21},{id:680,vendor:"Youspan",tld:"biz",category:"tools",popularity:.74},{id:681,vendor:"Topicshots",tld:"gov",category:"shoes",popularity:.47},{id:682,vendor:"Brainverse",tld:"mil",category:"games",popularity:.38},{id:683,vendor:"Flashdog",tld:"gov",category:"movies",popularity:.61},{id:684,vendor:"Feedbug",tld:"net",category:"home",popularity:.83},{id:685,vendor:"Centimia",tld:"name",category:"books",popularity:.15},{id:686,vendor:"Twitternation",tld:"biz",category:"tools",popularity:.18},{id:687,vendor:"Oyondu",tld:"biz",category:"electronics",popularity:-.12},{id:688,vendor:"Flipbug",tld:"org",category:"health",popularity:.34},{id:689,vendor:"Gevee",tld:"name",category:"beauty",popularity:.75},{id:690,vendor:"Eadel",tld:"net",category:"industrial",popularity:.89},{id:691,vendor:"Dabjam",tld:"biz",category:"tools",popularity:.85},{id:692,vendor:"Fadeo",tld:"org",category:"jewelry",popularity:.08},{id:693,vendor:"Babbleblab",tld:"org",category:"games",popularity:.21},{id:694,vendor:"Linkbuzz",tld:"edu",category:"grocery",popularity:.03},{id:695,vendor:"Youfeed",tld:"net",category:"games",popularity:.53},{id:696,vendor:"Oyoba",tld:"com",category:"movies",popularity:1.08},{id:697,vendor:"Oloo",tld:"name",category:"toys",popularity:.68},{id:698,vendor:"Livetube",tld:"net",category:"outdoors",popularity:.36},{id:699,vendor:"Realcube",tld:"com",category:"movies",popularity:.61},{id:700,vendor:"Jaxworks",tld:"org",category:"shoes",popularity:.21},{id:701,vendor:"Divanoodle",tld:"org",category:"toys",popularity:.89},{id:702,vendor:"Skilith",tld:"org",category:"computers",popularity:.16},{id:703,vendor:"Livefish",tld:"name",category:"garden",popularity:.5},{id:704,vendor:"Kayveo",tld:"org",category:"computers",popularity:.8},{id:705,vendor:"Twitterbridge",tld:"gov",category:"grocery",popularity:.74},{id:706,vendor:"Edgewire",tld:"edu",category:"shoes",popularity:.39},{id:707,vendor:"Riffpedia",tld:"edu",category:"electronics",popularity:.47},{id:708,vendor:"Camido",tld:"mil",category:"movies",popularity:1},{id:709,vendor:"Jayo",tld:"com",category:"jewelry",popularity:.42},{id:710,vendor:"Katz",tld:"name",category:"kids",popularity:.73},{id:711,vendor:"Livefish",tld:"com",category:"baby",popularity:.42},{id:712,vendor:"Latz",tld:"net",category:"health",popularity:.41},{id:713,vendor:"Mybuzz",tld:"gov",category:"home",popularity:.46},{id:714,vendor:"Twitternation",tld:"edu",category:"shoes",popularity:.18},{id:715,vendor:"Photojam",tld:"com",category:"automotive",popularity:.51},{id:716,vendor:"Browseblab",tld:"net",category:"kids",popularity:.19},{id:717,vendor:"Yozio",tld:"com",category:"automotive",popularity:1.02},{id:718,vendor:"Quimm",tld:"com",category:"clothing",popularity:.63},{id:719,vendor:"Skynoodle",tld:"gov",category:"games",popularity:.22},{id:720,vendor:"Rhynyx",tld:"gov",category:"games",popularity:.74},{id:721,vendor:"Devpulse",tld:"mil",category:"sports",popularity:.43},{id:722,vendor:"Fivechat",tld:"info",category:"kids",popularity:.45},{id:723,vendor:"Trudoo",tld:"mil",category:"clothing",popularity:.38},{id:724,vendor:"Kayveo",tld:"biz",category:"books",popularity:.46},{id:725,vendor:"Ooba",tld:"gov",category:"automotive",popularity:.81},{id:726,vendor:"Oloo",tld:"name",category:"computers",popularity:.88},{id:727,vendor:"BlogXS",tld:"edu",category:"garden",popularity:.53},{id:728,vendor:"Riffpedia",tld:"com",category:"electronics",popularity:.41},{id:729,vendor:"Fivechat",tld:"info",category:"garden",popularity:.31},{id:730,vendor:"Pixope",tld:"biz",category:"home",popularity:.39},{id:731,vendor:"Flashdog",tld:"mil",category:"books",popularity:.82},{id:732,vendor:"Yombu",tld:"mil",category:"jewelry",popularity:.34},{id:733,vendor:"Trilia",tld:"biz",category:"home",popularity:.83},{id:734,vendor:"Shuffledrive",tld:"info",category:"beauty",popularity:.45},{id:735,vendor:"Skaboo",tld:"mil",category:"computers",popularity:.52},{id:736,vendor:"Oodoo",tld:"biz",category:"kids",popularity:.27},{id:737,vendor:"Kazu",tld:"com",category:"automotive",popularity:.66},{id:738,vendor:"Gigazoom",tld:"com",category:"computers",popularity:.7},{id:739,vendor:"Mydo",tld:"org",category:"tools",popularity:.6},{id:740,vendor:"Browsezoom",tld:"edu",category:"automotive",popularity:.78},{id:741,vendor:"Youopia",tld:"biz",category:"music",popularity:.62},{id:742,vendor:"Babbleset",tld:"mil",category:"jewelry",popularity:.73},{id:743,vendor:"Omba",tld:"mil",category:"electronics",popularity:.49},{id:744,vendor:"Trilith",tld:"com",category:"music",popularity:.49},{id:745,vendor:"Topiczoom",tld:"info",category:"health",popularity:0},{id:746,vendor:"Blogspan",tld:"gov",category:"health",popularity:.55},{id:747,vendor:"Shufflebeat",tld:"net",category:"kids",popularity:.53},{id:748,vendor:"Oyonder",tld:"edu",category:"shoes",popularity:.81},{id:749,vendor:"Tagopia",tld:"biz",category:"clothing",popularity:.1},{id:750,vendor:"Pixoboo",tld:"net",category:"computers",popularity:.5},{id:751,vendor:"Skipstorm",tld:"name",category:"movies",popularity:1.07},{id:752,vendor:"Youtags",tld:"biz",category:"electronics",popularity:.56},{id:753,vendor:"Wordware",tld:"info",category:"tools",popularity:.75},{id:754,vendor:"Zoonder",tld:"mil",category:"sports",popularity:.48},{id:755,vendor:"Brainverse",tld:"mil",category:"beauty",popularity:.25},{id:756,vendor:"Feedfire",tld:"gov",category:"clothing",popularity:.81},{id:757,vendor:"Tanoodle",tld:"gov",category:"movies",popularity:.63},{id:758,vendor:"Devbug",tld:"mil",category:"electronics",popularity:.31},{id:759,vendor:"Voolia",tld:"name",category:"grocery",popularity:.39},{id:760,vendor:"LiveZ",tld:"gov",category:"electronics",popularity:.48},{id:761,vendor:"InnoZ",tld:"gov",category:"garden",popularity:.8},{id:762,vendor:"Photobean",tld:"gov",category:"baby",popularity:.55},{id:763,vendor:"Digitube",tld:"edu",category:"clothing",popularity:.04},{id:764,vendor:"Abata",tld:"mil",category:"health",popularity:.62},{id:765,vendor:"Oloo",tld:"mil",category:"garden",popularity:.23},{id:766,vendor:"Katz",tld:"name",category:"outdoors",popularity:.63},{id:767,vendor:"Fivechat",tld:"edu",category:"kids",popularity:.53},{id:768,vendor:"Dabtype",tld:"org",category:"grocery",popularity:.27},{id:769,vendor:"Vitz",tld:"gov",category:"beauty",popularity:.12},{id:770,vendor:"Yambee",tld:"mil",category:"movies",popularity:.64},{id:771,vendor:"LiveZ",tld:"gov",category:"kids",popularity:.33},{id:772,vendor:"Pixope",tld:"net",category:"home",popularity:.39},{id:773,vendor:"Gabtune",tld:"info",category:"industrial",popularity:.68},{id:774,vendor:"Voonyx",tld:"gov",category:"beauty",popularity:.47},{id:775,vendor:"Jetwire",tld:"gov",category:"health",popularity:.43},{id:776,vendor:"Meejo",tld:"org",category:"games",popularity:.67},{id:777,vendor:"Dynabox",tld:"info",category:"grocery",popularity:.55},{id:778,vendor:"Kayveo",tld:"biz",category:"shoes",popularity:.42},{id:779,vendor:"Abatz",tld:"name",category:"industrial",popularity:.3},{id:780,vendor:"Linklinks",tld:"org",category:"computers",popularity:.13},{id:781,vendor:"Zoozzy",tld:"org",category:"garden",popularity:.4},{id:782,vendor:"Topiclounge",tld:"name",category:"toys",popularity:.42},{id:783,vendor:"Skipstorm",tld:"org",category:"home",popularity:.63},{id:784,vendor:"Jazzy",tld:"info",category:"baby",popularity:.33},{id:785,vendor:"Skiptube",tld:"net",category:"health",popularity:.73},{id:786,vendor:"Bubblebox",tld:"gov",category:"jewelry",popularity:.93},{id:787,vendor:"Izio",tld:"name",category:"health",popularity:.68},{id:788,vendor:"Skinder",tld:"edu",category:"baby",popularity:-.02},{id:789,vendor:"Mita",tld:"org",category:"sports",popularity:.64},{id:790,vendor:"Eabox",tld:"edu",category:"home",popularity:.15},{id:791,vendor:"Wordpedia",tld:"mil",category:"music",popularity:0},{id:792,vendor:"Oba",tld:"name",category:"clothing",popularity:.29},{id:793,vendor:"Meemm",tld:"biz",category:"automotive",popularity:.84},{id:794,vendor:"Vimbo",tld:"mil",category:"books",popularity:.2},{id:795,vendor:"Yakidoo",tld:"info",category:"books",popularity:.92},{id:796,vendor:"Voomm",tld:"com",category:"shoes",popularity:.45},{id:797,vendor:"Browsezoom",tld:"org",category:"automotive",popularity:.58},{id:798,vendor:"Yakitri",tld:"com",category:"books",popularity:.74},{id:799,vendor:"Twiyo",tld:"name",category:"tools",popularity:.65},{id:800,vendor:"Feedmix",tld:"com",category:"toys",popularity:.48},{id:801,vendor:"Tagtune",tld:"com",category:"clothing",popularity:.39},{id:802,vendor:"Youtags",tld:"org",category:"outdoors",popularity:.05},{id:803,vendor:"Babbleblab",tld:"net",category:"toys",popularity:.5},{id:804,vendor:"Wordpedia",tld:"edu",category:"automotive",popularity:.74},{id:805,vendor:"Kwinu",tld:"net",category:"home",popularity:.7},{id:806,vendor:"Meetz",tld:"org",category:"toys",popularity:.69},{id:807,vendor:"Realfire",tld:"com",category:"shoes",popularity:.7},{id:808,vendor:"Quimba",tld:"mil",category:"computers",popularity:.62},{id:809,vendor:"Lajo",tld:"com",category:"books",popularity:.45},{id:810,vendor:"Abata",tld:"gov",category:"clothing",popularity:.47},{id:811,vendor:"Skinix",tld:"com",category:"baby",popularity:.71},{id:812,vendor:"Ntags",tld:"biz",category:"health",popularity:.06},{id:813,vendor:"Ainyx",tld:"com",category:"shoes",popularity:.46},{id:814,vendor:"Tagtune",tld:"name",category:"music",popularity:.72},{id:815,vendor:"Twitterlist",tld:"gov",category:"home",popularity:.61},{id:816,vendor:"Kazio",tld:"edu",category:"garden",popularity:.21},{id:817,vendor:"Agimba",tld:"biz",category:"computers",popularity:.5},{id:818,vendor:"Quimm",tld:"mil",category:"garden",popularity:.32},{id:819,vendor:"Brainverse",tld:"biz",category:"grocery",popularity:.34},{id:820,vendor:"Twinder",tld:"biz",category:"music",popularity:.79},{id:821,vendor:"Twitterworks",tld:"org",category:"industrial",popularity:.26},{id:822,vendor:"Photospace",tld:"com",category:"industrial",popularity:.2},{id:823,vendor:"Thoughtblab",tld:"org",category:"computers",popularity:.51},{id:824,vendor:"Pixoboo",tld:"gov",category:"electronics",popularity:.54},{id:825,vendor:"Quire",tld:"org",category:"electronics",popularity:.52},{id:826,vendor:"Vitz",tld:"com",category:"beauty",popularity:.57},{id:827,vendor:"Vimbo",tld:"gov",category:"health",popularity:.25},{id:828,vendor:"Dabvine",tld:"com",category:"beauty",popularity:.45},{id:829,vendor:"Devpulse",tld:"net",category:"movies",popularity:.51},{id:830,vendor:"Layo",tld:"net",category:"games",popularity:.39},{id:831,vendor:"Zoomlounge",tld:"org",category:"games",popularity:.49},{id:832,vendor:"Browsetype",tld:"com",category:"kids",popularity:.14},{id:833,vendor:"Brainverse",tld:"biz",category:"garden",popularity:.79},{id:834,vendor:"Izio",tld:"org",category:"movies",popularity:.5},{id:835,vendor:"Vipe",tld:"info",category:"books",popularity:.76},{id:836,vendor:"Dablist",tld:"edu",category:"books",popularity:-.11},{id:837,vendor:"Eayo",tld:"com",category:"clothing",popularity:.54},{id:838,vendor:"Yozio",tld:"mil",category:"garden",popularity:.76},{id:839,vendor:"Ntag",tld:"info",category:"industrial",popularity:.72},{id:840,vendor:"Feedfish",tld:"gov",category:"kids",popularity:.62},{id:841,vendor:"Myworks",tld:"org",category:"computers",popularity:.74},{id:842,vendor:"Voomm",tld:"net",category:"baby",popularity:.31},{id:843,vendor:"Realblab",tld:"name",category:"garden",popularity:.57},{id:844,vendor:"Realfire",tld:"edu",category:"home",popularity:.49},{id:845,vendor:"Dabshots",tld:"edu",category:"tools",popularity:.49},{id:846,vendor:"Topicblab",tld:"org",category:"grocery",popularity:.37},{id:847,vendor:"BlogXS",tld:"edu",category:"tools",popularity:.78},{id:848,vendor:"Skalith",tld:"name",category:"automotive",popularity:.03},{id:849,vendor:"Abata",tld:"net",category:"industrial",popularity:.27},{id:850,vendor:"Jetwire",tld:"info",category:"games",popularity:.67},{id:851,vendor:"Youopia",tld:"gov",category:"computers",popularity:.33},{id:852,vendor:"Eare",tld:"org",category:"sports",popularity:.48},{id:853,vendor:"Skippad",tld:"biz",category:"kids",popularity:.48},{id:854,vendor:"Vitz",tld:"com",category:"toys",popularity:0},{id:855,vendor:"Wikibox",tld:"mil",category:"jewelry",popularity:.34},{id:856,vendor:"Skilith",tld:"edu",category:"industrial",popularity:.79},{id:857,vendor:"Voolia",tld:"com",category:"garden",popularity:.64},{id:858,vendor:"Vimbo",tld:"mil",category:"beauty",popularity:-.1},{id:859,vendor:"Topiclounge",tld:"name",category:"tools",popularity:.59},{id:860,vendor:"Rhynyx",tld:"name",category:"books",popularity:.21},{id:861,vendor:"Livetube",tld:"biz",category:"kids",popularity:.36},{id:862,vendor:"Agivu",tld:"info",category:"games",popularity:.82},{id:863,vendor:"Skiptube",tld:"gov",category:"jewelry",popularity:.39},{id:864,vendor:"Twitterlist",tld:"info",category:"books",popularity:1.16},{id:865,vendor:"Kwinu",tld:"biz",category:"kids",popularity:.8},{id:866,vendor:"Roodel",tld:"org",category:"books",popularity:.67},{id:867,vendor:"Livepath",tld:"net",category:"clothing",popularity:.51},{id:868,vendor:"Midel",tld:"net",category:"automotive",popularity:.99},{id:869,vendor:"Fadeo",tld:"net",category:"tools",popularity:.3},{id:870,vendor:"Roombo",tld:"name",category:"movies",popularity:.88},{id:871,vendor:"Zooxo",tld:"gov",category:"beauty",popularity:1.01},{id:872,vendor:"Babbleopia",tld:"gov",category:"sports",popularity:.36},{id:873,vendor:"Kazu",tld:"net",category:"beauty",popularity:.81},{id:874,vendor:"Kwideo",tld:"name",category:"music",popularity:.5},{id:875,vendor:"Meezzy",tld:"info",category:"electronics",popularity:.61},{id:876,vendor:"Yozio",tld:"name",category:"music",popularity:.62},{id:877,vendor:"Twitterbeat",tld:"edu",category:"kids",popularity:.69},{id:878,vendor:"Avamm",tld:"net",category:"health",popularity:.21},{id:879,vendor:"Snaptags",tld:"name",category:"toys",popularity:.76},{id:880,vendor:"Youopia",tld:"edu",category:"health",popularity:.43},{id:881,vendor:"Zooxo",tld:"net",category:"garden",popularity:.8},{id:882,vendor:"Ailane",tld:"edu",category:"movies",popularity:.9},{id:883,vendor:"Voolith",tld:"name",category:"industrial",popularity:.38},{id:884,vendor:"Edgeblab",tld:"net",category:"toys",popularity:.48},{id:885,vendor:"Twitternation",tld:"biz",category:"clothing",popularity:.42},{id:886,vendor:"Babbleblab",tld:"info",category:"computers",popularity:.5},{id:887,vendor:"Topdrive",tld:"com",category:"books",popularity:.54},{id:888,vendor:"Tagtune",tld:"biz",category:"toys",popularity:.2},{id:889,vendor:"Feedmix",tld:"edu",category:"toys",popularity:.39},{id:890,vendor:"Tagchat",tld:"org",category:"grocery",popularity:.33},{id:891,vendor:"Thoughtstorm",tld:"mil",category:"music",popularity:.1},{id:892,vendor:"Kazio",tld:"net",category:"books",popularity:.87},{id:893,vendor:"Vipe",tld:"edu",category:"outdoors",popularity:.49},{id:894,vendor:"Browsezoom",tld:"mil",category:"health",popularity:.57},{id:895,vendor:"Jaxnation",tld:"name",category:"sports",popularity:.34},{id:896,vendor:"Mybuzz",tld:"info",category:"kids",popularity:.54},{id:897,vendor:"Wikizz",tld:"info",category:"jewelry",popularity:.5},{id:898,vendor:"Kazio",tld:"info",category:"clothing",popularity:.56},{id:899,vendor:"Yoveo",tld:"net",category:"industrial",popularity:.24},{id:900,vendor:"Topiclounge",tld:"gov",category:"outdoors",popularity:.44},{id:901,vendor:"Yata",tld:"gov",category:"garden",popularity:.11},{id:902,vendor:"Skimia",tld:"biz",category:"electronics",popularity:.19},{id:903,vendor:"Topicware",tld:"gov",category:"jewelry",popularity:.43},{id:904,vendor:"Ooba",tld:"com",category:"books",popularity:.11},{id:905,vendor:"Edgeclub",tld:"name",category:"home",popularity:.37},{id:906,vendor:"Trilith",tld:"name",category:"industrial",popularity:.6},{id:907,vendor:"Eidel",tld:"org",category:"home",popularity:.43},{id:908,vendor:"Flipbug",tld:"mil",category:"health",popularity:.48},{id:909,vendor:"Twitterworks",tld:"net",category:"automotive",popularity:.47},{id:910,vendor:"Edgepulse",tld:"edu",category:"movies",popularity:.42},{id:911,vendor:"Vinder",tld:"gov",category:"garden",popularity:.77},{id:912,vendor:"Trilia",tld:"com",category:"music",popularity:0},{id:913,vendor:"Jabbersphere",tld:"org",category:"kids",popularity:.7},{id:914,vendor:"Yakitri",tld:"info",category:"games",popularity:.26},{id:915,vendor:"Mymm",tld:"edu",category:"music",popularity:.43},{id:916,vendor:"Linkbuzz",tld:"edu",category:"clothing",popularity:.53},{id:917,vendor:"Yadel",tld:"mil",category:"grocery",popularity:.09},{id:918,vendor:"Rooxo",tld:"gov",category:"industrial",popularity:.7},{id:919,vendor:"Mybuzz",tld:"info",category:"clothing",popularity:.3},{id:920,vendor:"Aimbu",tld:"info",category:"baby",popularity:.32},{id:921,vendor:"Eazzy",tld:"edu",category:"beauty",popularity:.14},{id:922,vendor:"Agivu",tld:"com",category:"electronics",popularity:.76},{id:923,vendor:"Devify",tld:"info",category:"automotive",popularity:.7},{id:924,vendor:"Vinte",tld:"gov",category:"movies",popularity:.29},{id:925,vendor:"Tanoodle",tld:"info",category:"movies",popularity:.61},{id:926,vendor:"Meetz",tld:"com",category:"toys",popularity:.24},{id:927,vendor:"Youopia",tld:"net",category:"games",popularity:.7},{id:928,vendor:"Yakidoo",tld:"net",category:"shoes",popularity:.63},{id:929,vendor:"Buzzbean",tld:"mil",category:"beauty",popularity:.36},{id:930,vendor:"Podcat",tld:"com",category:"outdoors",popularity:.57},{id:931,vendor:"Kare",tld:"org",category:"shoes",popularity:.64},{id:932,vendor:"Wikido",tld:"org",category:"tools",popularity:.7},{id:933,vendor:"Youspan",tld:"net",category:"shoes",popularity:.48},{id:934,vendor:"Quimm",tld:"net",category:"shoes",popularity:.46},{id:935,vendor:"Cogibox",tld:"biz",category:"sports",popularity:.23},{id:936,vendor:"Browsebug",tld:"edu",category:"shoes",popularity:.98},{id:937,vendor:"Devify",tld:"info",category:"industrial",popularity:.75},{id:938,vendor:"Janyx",tld:"biz",category:"jewelry",popularity:.72},{id:939,vendor:"Mydo",tld:"org",category:"books",popularity:.79},{id:940,vendor:"Avamm",tld:"name",category:"games",popularity:.82},{id:941,vendor:"Gigashots",tld:"mil",category:"garden",popularity:.07},{id:942,vendor:"Avamba",tld:"edu",category:"jewelry",popularity:.49},{id:943,vendor:"Eimbee",tld:"info",category:"toys",popularity:.78},{id:944,vendor:"Edgeify",tld:"gov",category:"books",popularity:.64},{id:945,vendor:"Oloo",tld:"mil",category:"kids",popularity:.68},{id:946,vendor:"Meembee",tld:"com",category:"games",popularity:.36},{id:947,vendor:"Jetpulse",tld:"edu",category:"games",popularity:1},{id:948,vendor:"Babbleblab",tld:"org",category:"health",popularity:.47},{id:949,vendor:"Tagpad",tld:"gov",category:"health",popularity:.44},{id:950,vendor:"Leexo",tld:"net",category:"industrial",popularity:.16},{id:951,vendor:"Voomm",tld:"edu",category:"shoes",popularity:.51},{id:952,vendor:"JumpXS",tld:"com",category:"home",popularity:.75},{id:953,vendor:"Skalith",tld:"gov",category:"computers",popularity:.48},{id:954,vendor:"Photobug",tld:"name",category:"movies",popularity:.56},{id:955,vendor:"Fatz",tld:"edu",category:"garden",popularity:.47},{id:956,vendor:"Youbridge",tld:"net",category:"clothing",popularity:.44},{id:957,vendor:"Tagpad",tld:"com",category:"sports",popularity:-.05},{id:958,vendor:"Twimm",tld:"net",category:"jewelry",popularity:.53},{id:959,vendor:"Meejo",tld:"org",category:"automotive",popularity:.65},{id:960,vendor:"Photobean",tld:"mil",category:"industrial",popularity:.11},{id:961,vendor:"Edgetag",tld:"org",category:"beauty",popularity:1.05},{id:962,vendor:"Skimia",tld:"gov",category:"garden",popularity:.59},{id:963,vendor:"Youtags",tld:"info",category:"industrial",popularity:.4},{id:964,vendor:"Skynoodle",tld:"net",category:"industrial",popularity:.67},{id:965,vendor:"Feedbug",tld:"info",category:"kids",popularity:.57},{id:966,vendor:"Eare",tld:"name",category:"sports",popularity:.3},{id:967,vendor:"Chatterpoint",tld:"name",category:"beauty",popularity:.21},{id:968,vendor:"Youspan",tld:"biz",category:"electronics",popularity:.47},{id:969,vendor:"BlogXS",tld:"mil",category:"movies",popularity:.88},{id:970,vendor:"DabZ",tld:"info",category:"clothing",popularity:.53},{id:971,vendor:"Feedfire",tld:"biz",category:"industrial",popularity:.79},{id:972,vendor:"Realcube",tld:"mil",category:"toys",popularity:.35},{id:973,vendor:"Avavee",tld:"org",category:"clothing",popularity:.63},{id:974,vendor:"Quatz",tld:"edu",category:"electronics",popularity:.32},{id:975,vendor:"Zoombeat",tld:"com",category:"outdoors",popularity:1.21},{id:976,vendor:"Realfire",tld:"mil",category:"tools",popularity:.24},{id:977,vendor:"Topicware",tld:"biz",category:"industrial",popularity:.68},{id:978,vendor:"Oyondu",tld:"name",category:"health",popularity:.86},{id:979,vendor:"Thoughtstorm",tld:"net",category:"toys",popularity:.3},{id:980,vendor:"Jayo",tld:"com",category:"clothing",popularity:.58},{id:981,vendor:"Jabberstorm",tld:"biz",category:"movies",popularity:.53},{id:982,vendor:"Topiclounge",tld:"com",category:"beauty",popularity:.17},{id:983,vendor:"Oyondu",tld:"edu",category:"health",popularity:.54},{id:984,vendor:"Yakidoo",tld:"gov",category:"shoes",popularity:.7},{id:985,vendor:"Edgewire",tld:"edu",category:"industrial",popularity:.56},{id:986,vendor:"Yodo",tld:"mil",category:"clothing",popularity:.42},{id:987,vendor:"Oozz",tld:"info",category:"shoes",popularity:.62},{id:988,vendor:"Linkbridge",tld:"edu",category:"clothing",popularity:.43},{id:989,vendor:"Livetube",tld:"gov",category:"jewelry",popularity:.29},{id:990,vendor:"Leexo",tld:"name",category:"movies",popularity:.24},{id:991,vendor:"Topdrive",tld:"info",category:"electronics",popularity:.94},{id:992,vendor:"Kaymbo",tld:"net",category:"music",popularity:.8},{id:993,vendor:"Rooxo",tld:"mil",category:"toys",popularity:.28},{id:994,vendor:"Feedmix",tld:"net",category:"computers",popularity:1},{id:995,vendor:"Pixonyx",tld:"edu",category:"industrial",popularity:.32},{id:996,vendor:"Yakidoo",tld:"gov",category:"shoes",popularity:.46},{id:997,vendor:"Linklinks",tld:"name",category:"shoes",popularity:.27},{id:998,vendor:"Fivechat",tld:"name",category:"grocery",popularity:.6},{id:999,vendor:"Jaxspan",tld:"mil",category:"baby",popularity:.48},{id:1e3,vendor:"Feednation",tld:"net",category:"industrial",popularity:.27}];const Te=e=>e[Math.floor(Math.random()*e.length)],Ue=(e,o)=>Math.random()*(o-e)+e,ae=(e,o)=>Math.floor(Ue(e,o)),Be=()=>Te(tr),rr=0,oe={id:120658,name:"New York",lonlat:[-73.993562,40.727063],diameter:.1},ir=500,wo=(e,o)=>f(e,`
      INSERT INTO cities (city_id, city_name, center, diameter)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        city_name = VALUES(city_name),
        center = VALUES(center),
        diameter = VALUES(diameter)
    `,o.id,o.name,`POINT(${o.lonlat[0]} ${o.lonlat[1]})`,o.diameter),ar=(e,o)=>f(e,"DELETE FROM cities WHERE city_id = ?",o),nr=["olc_8","olc_6","purchase","request"],dr=["minute","hour","day","week","month"],Ro=({interval:e,kind:o,value:t})=>rt(`${e}-${o}-${t}`),lr=async(e,o)=>{const t=new Oo("segments",["segment_id","valid_interval","filter_kind","filter_value"]);for(const r of o)t.append(Ro(r),r.interval,r.kind,r.value);await f(e,t.sql(),...t.params())},sr=async(e,o,t=rr)=>{const r=new Oo("offers",["customer_id","notification_zone","segment_ids","notification_content","notification_target","maximum_bid_cents"]);let a=0,n=[];const d=async()=>{await Promise.all([f(e,r.sql(),...r.params()),lr(e,n)]),r.clear(),n=[],a=0};for(const l of o)r.append(t,l.notificationZone,JSON.stringify(l.segments.map(Ro)),l.notificationContent,l.notificationTarget,l.maximumBidCents),a++,n=n.concat(l.segments),a>=ir&&await d();a>0&&await d()},cr=()=>Te(nr),pr=()=>Te(dr),Io=({vendor:e,tld:o})=>`${e.toLowerCase()}.${o}`,Ao=e=>{const[o,t]=e.lonlat,r=e.diameter/2,[a,n]=[o-r,o+r],[d,l]=[t-r,t+r];return[Ue(a,n),Ue(d,l)]},yr=e=>{const o=cr(),t=pr();switch(o){case"olc_8":case"olc_6":{const[r,a]=Ao(e),n=o==="olc_8"?8:6,d=De.encode(a,r,n).substring(0,n);return{kind:o,interval:t,value:d}}case"purchase":return{kind:o,interval:t,value:Be().vendor};case"request":return{kind:o,interval:t,value:Io(Be())}}},ur=e=>{const o=ae(1,3),t=Array.from({length:o},()=>yr(e)),r=Be(),a=Io(r),n=ae(10,50),d=ae(1,1e3),l=`${n}% off at ${r.vendor}`,s=`https://${a}/offers/${d}`,[c,y]=Ao(e),u=De.encode(y,c,Te([8,10])),m=De.decode(u),b={ne:[m.latitudeHi,m.longitudeHi],sw:[m.latitudeLo,m.longitudeLo]};return{segments:t,notificationZone:qe(b),notificationContent:l,notificationTarget:s,maximumBidCents:ae(2,15)}},gr=(e,o)=>Array.from({length:o},()=>ur(e)),mr=e=>(o,t,r,a=1)=>`https://stamen-tiles.a.ssl.fastly.net/${e}/${r}/${o}/${t}${a>=2?"@2x":""}.png`,vr=p(N,{children:["Map tiles by ",i(B,{href:"http://stamen.com",children:"Stamen Design"}),", under"," ",i(B,{href:"http://creativecommons.org/licenses/by/3.0",children:"CC BY 3.0"}),". Data by ",i(B,{href:"http://openstreetmap.org",children:"OpenStreetMap"}),", under"," ",i(B,{href:"http://www.openstreetmap.org/copyright",children:"ODbL"}),"."]}),br=[oe.lonlat[1],oe.lonlat[0]],hr=12,fr=({width:e,height:o,bounds:t,latLngToPixel:r,pixelToLatLng:a,useRenderer:n,options:d})=>{const l=te.useRef(null),s=co(()=>new V),{setup:c,update:y}=n({scene:s,width:e,height:o,bounds:t,latLngToPixel:r,pixelToLatLng:a,options:d});return g.exports.useLayoutEffect(()=>{if(!l.current)throw new Error("No canvas ref");console.log("PixiMapLayer: Setup");const u=new at({view:l.current,width:e,height:o,backgroundAlpha:0,antialias:!0});return u.stage.addChild(s),c==null||c(),y&&u.ticker.add(m=>{y(m)}),()=>{console.log("PixiMapLayer: Destroy"),u.stage.removeChild(s),u.destroy(!1,{children:!1,texture:!0,baseTexture:!0})}},[o,s,c,y,e]),i("canvas",{ref:l})},Er=({mapState:e,latLngToPixel:o,pixelToLatLng:t,useRenderer:r,options:a})=>{const{width:n,height:d,bounds:l}=e||{width:0,height:0};return n<=0||d<=0||!o||!t||!l?null:i(fr,{useRenderer:r,width:n,height:d,bounds:l,latLngToPixel:o,pixelToLatLng:t,options:a})},Se=d=>{var l=d,{height:e="100%",defaultCenter:o=br,defaultZoom:t=hr,useRenderer:r,options:a}=l,n=L(l,["height","defaultCenter","defaultZoom","useRenderer","options"]);const[s,c]=g.exports.useState(o),[y,u]=g.exports.useState(t);return i(x,T(h({borderRadius:"lg",overflow:"hidden",height:e},n),{children:i(it,{dprs:[1,2],provider:mr("toner-lite"),attribution:vr,maxZoom:20,center:s,zoom:y,onBoundsChanged:({center:m,zoom:b})=>{c(m),u(b)},children:i(Er,{useRenderer:r,options:a})})}))};var Ne=[{name:"date_sub_dynamic",createStmt:`CREATE OR REPLACE FUNCTION date_sub_dynamic (
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
END`}],Oe=[{name:"process_locations",createStmt:`CREATE OR REPLACE PROCEDURE process_locations (
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
END`},{name:"update_segments",createStmt:`CREATE OR REPLACE PROCEDURE update_segments() RETURNS BIGINT
AS
DECLARE
    _count BIGINT;
BEGIN
    START TRANSACTION;

    DELETE FROM subscriber_segments;

    INSERT INTO subscriber_segments
    SELECT * FROM dynamic_subscriber_segments;

    _count = row_count();

    COMMIT;

    RETURN _count;
END`}],we=[{name:"worldcities",createStmt:`create rowstore table if not exists worldcities (
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
  -- open location code length 6 (5.5km resolution)
  olc_6 AS SUBSTR(olc_8, 1, 6) PERSISTED TEXT,

  SHARD KEY (city_id, subscriber_id),
  SORT KEY (ts),

  KEY (city_id, subscriber_id) USING HASH,
  KEY (olc_8) USING HASH,
  KEY (olc_6) USING HASH
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
  filter_kind ENUM ("olc_8", "olc_6", "request", "purchase") NOT NULL,
  filter_value TEXT NOT NULL,

  PRIMARY KEY (segment_id),
  UNIQUE KEY (valid_interval, filter_kind, filter_value),
  KEY (filter_kind, filter_value)
);`},{name:"subscriber_segments",createStmt:`create table subscriber_segments (
  city_id BIGINT NOT NULL,
  subscriber_id BIGINT NOT NULL,
  segment_id BIGINT NOT NULL,

  UNIQUE KEY (city_id, subscriber_id, segment_id) USING HASH,
  SORT KEY (city_id, subscriber_id, segment_id),
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
        AND segment_ids.table_col :> BIGINT = segment.segment_id
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
);`},{name:"dynamic_subscriber_segments",createStmt:`create view dynamic_subscriber_segments as (
  SELECT city_id, subscriber_id, segment_id
  FROM segments, locations
  WHERE
    segments.filter_kind = "olc_8"
    AND segments.filter_value = locations.olc_8
    AND ts >= date_sub_dynamic(NOW(6), segments.valid_interval)
  UNION
  SELECT city_id, subscriber_id, segment_id
  FROM segments, locations
  WHERE
    segments.filter_kind = "olc_6"
    AND segments.filter_value = locations.olc_6
    AND ts >= date_sub_dynamic(NOW(6), segments.valid_interval)
  UNION
  SELECT city_id, subscriber_id, segment_id
  FROM segments, requests
  WHERE
    segments.filter_kind = "request"
    AND segments.filter_value = requests.domain
    AND ts >= date_sub_dynamic(NOW(6), segments.valid_interval)
  UNION
  SELECT city_id, subscriber_id, segment_id
  FROM segments, purchases
  WHERE
    segments.filter_kind = "purchase"
    AND segments.filter_value = purchases.vendor
    AND ts >= date_sub_dynamic(NOW(6), segments.valid_interval)
);`}];const ce="singlestore-realtime-digital-marketing",_r=[`CREATE LINK aws_s3 AS S3 CREDENTIALS '{}' CONFIG '{ "region": "us-east-1" }'`,"REPLACE INTO customers VALUES (0, 'default customer')",`
    CREATE OR REPLACE PIPELINE worldcities
    AS LOAD DATA LINK aws_s3 '${ce}/cities.ndjson'
    SKIP DUPLICATE KEY ERRORS
    INTO TABLE worldcities
    FORMAT JSON (
      city_id <- id,
      city_name <- name,
      @lat <- lat,
      @lng <- lng
    )
    SET center = GEOGRAPHY_POINT(@lng, @lat)
  `,"START PIPELINE worldcities FOREGROUND"],Tr=e=>{const o=we.find(a=>a.name===e);if(o)return o;const t=Oe.find(a=>a.name===e);if(t)return t;const r=Ne.find(a=>a.name===e);if(r)return r;throw new Error("Could not find schema object: "+e)},Sr=async e=>{try{return await Me(e,"SELECT 1"),!0}catch{return!1}},Nr=async e=>{let o={tables:[],procedures:[],functions:[]};const l=e,{database:t}=l,r=L(l,["database"]);try{o=(await Xe(r,`
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
        `,t,t)).reduce((s,[c,y])=>(s[c].push(y),s),o)}catch(s){if(!(s instanceof I&&(s.isUnknownDatabase()||s.isDatabaseRecovering())))throw s}const{tables:a,procedures:n,functions:d}=o;return Object.fromEntries([we.map(({name:s})=>[s,a.includes(s)]),Oe.map(({name:s})=>[s,n.includes(s)]),Ne.map(({name:s})=>[s,d.includes(s)])].flat())},Or=async(e,{progress:o,scaleFactor:t,includeSeedData:r,skipCreate:a=!1})=>{a||(o("Dropping existing schema","info"),await Me(e,"DROP DATABASE IF EXISTS `"+e.database+"`"),o("Creating database","info"),await Me(e,"CREATE DATABASE `"+e.database+"`"));for(const n of Ne)o(`Creating function: ${n.name}`,"info"),await f(e,n.createStmt);for(const n of we)o(`Creating table: ${n.name}`,"info"),await f(e,n.createStmt);for(const n of Oe)o(`Creating procedure: ${n.name}`,"info"),await f(e,n.createStmt);await wr(e),await wo(e,oe),r&&(o("Creating sample data","info"),await Qe(e,oe,t)),o("Schema initialized","success")},wr=async e=>{for(const o of _r)await f(e,o)},Qe=(e,o,t)=>{const r=100*t.partitions,a=gr(o,r);return sr(e,a)},Lo=async(e,o)=>{const t=o.prefix;return await Y(e,`
      SELECT
        expected.city_id AS cityId,
        expected.city_name AS cityName,
        GEOGRAPHY_LONGITUDE(expected.center) AS lon,
        GEOGRAPHY_LATITUDE(expected.center) AS lat,
        expected.diameter,
        pipelineName,
        (
          pipelines.pipeline_name IS NULL
          OR config_json::$connection_string NOT LIKE "%${t}%"
        ) AS needsUpdate
      FROM (
        SELECT cities.*, CONCAT(prefix.table_col, cities.city_id) AS pipelineName
        FROM ${e.database}.cities
        JOIN TABLE(["locations_", "requests_", "purchases_"]) AS prefix
      ) AS expected
      LEFT JOIN information_schema.pipelines
        ON pipelines.database_name = ?
        AND pipelines.pipeline_name = expected.pipelineName
    `,e.database)},Co=async(e,o)=>{const t=o.prefix,r=await Lo(e,o);await Promise.all(r.filter(a=>a.needsUpdate).map(async a=>{console.log(`recreating pipeline ${a.pipelineName} for city ${a.cityName}`),a.pipelineName.startsWith("locations_")?await f(e,`
            CREATE OR REPLACE PIPELINE ${a.pipelineName}
            AS LOAD DATA LINK aws_s3 '${ce}/${t}/locations.*'
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
          `,a.cityId,a.lon,a.diameter,a.lat,a.diameter):a.pipelineName.startsWith("requests_")?await f(e,`
            CREATE OR REPLACE PIPELINE ${a.pipelineName}
            AS LOAD DATA LINK aws_s3 '${ce}/${t}/requests.*'
            INTO TABLE requests FORMAT PARQUET (
              subscriber_id <- subscriberid,
              domain <- domain
            )
            SET ts = NOW(),
              city_id = ?;
          `,a.cityId):a.pipelineName.startsWith("purchases_")&&await f(e,`
            CREATE OR REPLACE PIPELINE ${a.pipelineName}
            AS LOAD DATA LINK aws_s3 '${ce}/${t}/purchases.*'
            INTO TABLE purchases FORMAT PARQUET (
              subscriber_id <- subscriberid,
              vendor <- vendor
            )
            SET ts = NOW(),
              city_id = ?;
          `,a.cityId),await f(e,`ALTER PIPELINE ${a.pipelineName} SET OFFSETS EARLIEST DROP ORPHAN FILES`),await f(e,`START PIPELINE IF NOT RUNNING ${a.pipelineName}`),console.log(`finished creating pipeline ${a.pipelineName} for city ${a.cityName}`)}))},Rr=async e=>{const o=await Xe(e,`
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
    `,e.database);await Promise.all(o.map(async([t])=>{console.log("restarting pipeline",t),await f(e,`ALTER PIPELINE ${t} SET OFFSETS EARLIEST DROP ORPHAN FILES`),await f(e,`START PIPELINE IF NOT RUNNING ${t}`)}))},Ir=async e=>{const o=await Y(e,`
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
    `,e.database);await Promise.all(o.map(t=>(console.log("dropping pipeline",t.pipelineName),f(e,`DROP PIPELINE ${t.pipelineName}`))))},ko=async e=>{const o=await Y(e,`
      SELECT plan_id AS planId
      FROM information_schema.plancache
      WHERE
        plan_warnings LIKE "%empty tables%"
    `);return await Promise.all(o.map(({planId:t})=>f(e,`DROP ${t} FROM PLANCACHE`))),o.length>0},Ar=(e,...o)=>{const t=o.map(r=>`"${r}"`).join(",");return No(e,`
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
    `,e.database)},eo=(e,...o)=>Ar(e,...o).then(t=>t.reduce((r,{tableName:a,count:n})=>(r[a]=n,r),{})),Lr=async(e,o)=>{const{maxRows:t}=o,a=["locations","requests","purchases","notifications"].map(d=>`"${d}"`).join(","),n=await No(e,`
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
    `,e.database,t);await Promise.all(n.map(async({tableName:d,count:l,minTs:s,maxTs:c})=>{const u=(l-t)/l;if(u<.2)return;const m=new Date((s+u*(c-s))*1e3);console.log(`removing rows from ${d} older than ${m.toISOString()}`),await f(e,`DELETE FROM ${d} WHERE ts <= ?`,m.toISOString())}))},oo=(e,o="minute")=>Ze(e,"ECHO run_matching_process(?)",o).then(t=>t.RESULT),to=e=>Ze(e,"ECHO update_segments()").then(o=>o.RESULT),Cr=(e,o,t,r)=>Xe(e,`
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
    `,o,qe(r)),kr=(e,o,t)=>Y(e,`
      SELECT
        offer_id AS offerId,
        notification_zone AS notificationZone
      FROM offers
      WHERE GEOGRAPHY_INTERSECTS(?, notification_zone)
      LIMIT ${o}
    `,qe(t)),xr=e=>Y(e,`
      SELECT
        city_id AS id,
        city_name AS name,
        GEOGRAPHY_LATITUDE(center) AS centerLat,
        GEOGRAPHY_LONGITUDE(center) AS centerLon,
        diameter
      FROM cities
    `),zr=(e,o,t)=>Ze(e,`
      SELECT
        city_id AS id,
        city_name AS name,
        GEOGRAPHY_LATITUDE(center) AS centerLat,
        GEOGRAPHY_LONGITUDE(center) AS centerLon,
        0.1 AS diameter
      FROM worldcities
      ORDER BY GEOGRAPHY_DISTANCE(center, GEOGRAPHY_POINT(?, ?)) ASC
      LIMIT 1
    `,o,t),G=[{name:"s00",maxRows:1e7,prefix:"v2/100k-2p",partitions:2},{name:"s0",maxRows:2e7,prefix:"v2/100k-4p",partitions:4},{name:"s1",maxRows:4e7,prefix:"v2/100k-8p",partitions:8},{name:"s2",maxRows:16e7,prefix:"v2/1m-16p",partitions:16},{name:"s4",maxRows:32e7,prefix:"v2/1m-32p",partitions:16},{name:"s8",maxRows:64e7,prefix:"v2/1m-64p",partitions:64},{name:"s10",maxRows:1e9,prefix:"v2/10m-80p",partitions:80}],Dr=e=>G.find(o=>o.name===e)||G[0],J=({encode:e,decode:o}={encode:JSON.stringify,decode:JSON.parse})=>({setSelf:t,onSet:r,node:a})=>{const n=`recoil.localstorage.${a.key}`,d=localStorage.getItem(n);d!=null&&t(o(d)),r((l,s,c)=>{c?localStorage.removeItem(n):localStorage.setItem(n,e(l))})},ro=()=>({setSelf:e,node:{key:o}})=>{const{location:t}=window;if(t){const r=new URLSearchParams(t.search);e(r.get(o))}},Pr=A({key:"skipCreateDatabase",default:null,effects:[ro()]}),Mr=A({key:"sessionId",default:null,effects:[ro()]}),Ur=A({key:"vaporBaseUrl",default:"https://vapor.labs.singlestore.com",effects:[ro()]}),xo=A({key:"connectionHost",default:"http://127.0.0.1",effects:[J()]}),zo=A({key:"connectionUser",default:"root",effects:[J()]}),Do=A({key:"connectionPassword",default:"",effects:[J()]}),Z=A({key:"connectionDatabase",default:"martech",effects:[J()]}),Po=po({key:"vaporConnectionConfig",get:async({get:e})=>{const o=e(Mr),t=e(Ur);if(o)try{const r=await fetch(t+"/api/v1/vapor/connect?sessionId="+o);if(r.status===200){const a=await r.json();return{host:a.endpoint,user:a.user,password:a.password,database:e(Z)}}}catch{console.log(`Failed to connect to vapor at ${t}, falling back to local config`)}}}),_=po({key:"connectionConfig",get:({get:e})=>{const o=e(Po);if(o)return o;const t=e(xo),r=e(zo),a=e(Do),n=e(Z);return{host:t,user:r,password:a,database:n}},cachePolicy_UNSTABLE:{eviction:"most-recent"}}),X=A({key:"configScaleFactor",default:G[0],effects:[J({encode:e=>e.name,decode:e=>G.find(o=>o.name===e)||G[0]})]}),q=A({key:"simulatorEnabled",default:!0,effects:[J()]}),Br=A({key:"databaseDrawerIsOpen",default:!1}),Ge=nt({key:"tickDurationMs",default:void 0}),Gr=Object.fromEntries([we.map(({name:e})=>[e,!1]),Oe.map(({name:e})=>[e,!1]),Ne.map(({name:e})=>[e,!1])].flat()),Mo=(e=!1)=>{const o=v(_);return C(["schemaObjects",o,e],()=>Nr(o),{isPaused:()=>e,refreshInterval:t=>Object.values(t||[]).some(a=>!a)?1e3:0,fallbackData:Gr})},w=()=>{const n=v(_),{database:e}=n,o=L(n,["database"]),t=v(Po),r=C(["isConnected",o],()=>Sr(o)),a=Mo(!r.data);return{isVapor:!!t,connected:!!r.data,initialized:!!r.data&&Object.values(a.data||[]).every(Boolean),reset:()=>{r.mutate(),a.mutate()}}},Fr=(()=>{let e={};return o=>(o in e||(e[o]=1),`${o}(${e[o]++})`)})(),Fe=(e,{name:o,enabled:t,intervalMS:r})=>{const a=dt(Ge(o));g.exports.useEffect(()=>{if(!t)return;const n=new AbortController,d=Fr(o);console.log(`Starting ${d}: tick interval: ${r}ms`);const l=async()=>{try{if(console.time(d),n.signal.aborted)return;const s=performance.now();await e(n);const c=performance.now()-s;a(c),setTimeout(l,Math.max(0,r-c))}catch(s){if(n.signal.aborted||s instanceof I&&s.isUnknownDatabase()||s instanceof DOMException&&s.name==="AbortError")return;throw s}finally{console.timeEnd(d)}};return l(),()=>{console.log(`Stopping ${d}`),n.abort()}},[t,e,r,o,a])},Yr=({before:e,after:o,includeSeedData:t})=>{const r=v(_),a=v(X),{reset:n}=w(),[d,l]=R(q),s=yo(),c=v(Pr);return g.exports.useCallback(async()=>{const y=d;l(!1),e(),await Or(r,{progress(u,m){const b="reset-schema";s.isActive(b)?s.update(b,{title:u,status:m,duration:m==="success"?2e3:null,isClosable:!0}):s({id:b,title:u,status:m,duration:null})},scaleFactor:a,includeSeedData:t,skipCreate:!!c}),o(),n(),l(y)},[d,l,e,r,a,t,c,o,n,s])},Uo=(e,o)=>{const[t,r]=g.exports.useState(e);return g.exports.useEffect(()=>{const a=setTimeout(()=>r(e),o);return()=>clearTimeout(a)},[e,o]),t},Bo=()=>{const[{elapsed:e,isRunning:o},t]=g.exports.useReducer((r,a)=>{switch(a.type){case"start":return{start:Math.floor(performance.now()),isRunning:!0,elapsed:r.elapsed};case"stop":return{elapsed:Math.floor(performance.now())-(r.start||0),isRunning:!1}}},{isRunning:!1});return{elapsed:e,isRunning:o,startTimer:()=>t({type:"start"}),stopTimer:()=>t({type:"stop"})}},Go=(e,o)=>{let t=!1,r=new lt(0,0),a=0;e.on("pointerdown",n=>{t=!0,r=n.data.global,a=performance.now()}),e.on("pointerup",n=>{if(!t||(t=!1,performance.now()-a>200))return;const l=n.data.global;Math.sqrt(Math.pow(l.x-r.x,2)+Math.pow(l.y-r.y,2))>10||o(n)}),e.on("pointercancel",()=>{t=!1})};class Hr extends V{constructor(o,t){super();E(this,"gfx");E(this,"hover",!1);this.city=o,this.onRemove=t,this.gfx=new ge,this.addChild(this.gfx),this.gfx.interactive=!0,this.gfx.on("pointerover",()=>{this.hover=!0}),this.gfx.on("pointerout",()=>{this.hover=!1}),Go(this.gfx,()=>t(this.city))}update(o){this.gfx.clear(),this.gfx.lineStyle(1,this.hover?16711680:306687,1),this.gfx.beginFill(this.hover?16711680:306687,.2);const[t,r]=o([this.city.centerLat,this.city.centerLon]);this.gfx.drawCircle(t,r,25),this.gfx.endFill()}}const jr=e=>{const o=v(_),{initialized:t}=w();return C(["cities",o,t],()=>xr(o),{isPaused:()=>!t,onSuccess:e})},Wr=({scene:e,latLngToPixel:o,pixelToLatLng:t,width:r,height:a})=>{const n=v(_),d=co(()=>new V),{mutate:l}=jr(y=>{d.removeChildren();for(let u=0;u<y.length;u++)d.addChild(new Hr(y[u],c))}),s=g.exports.useCallback(async(y,u)=>{const m=await zr(n,u,y),b={id:m.id,name:m.name,lonlat:[m.centerLon,m.centerLat],diameter:m.diameter};await wo(n,b),await Qe(n,b,G[0]),l()},[n,l]),c=g.exports.useCallback(async y=>{await ar(n,y.id),l()},[n,l]);return{setup:g.exports.useCallback(()=>{const y=new V;e.addChild(y),e.addChild(d),y.interactive=!0,y.hitArea=new st(0,0,r,a),Go(y,u=>{const[m,b]=t([u.data.global.x,u.data.global.y]);s(m,b)})},[d,a,s,t,e,r]),update:g.exports.useCallback(()=>{for(let y=0;y<d.children.length;y++)d.children[y].update(o)},[d,o])}},Vr=e=>i(Se,T(h({},e),{useRenderer:Wr,options:{},cursor:"pointer"})),Kr=ct({a:t=>{var r=t,{children:e}=r,o=L(r,["children"]);const{href:a}=o,n=!!(a!=null&&a.startsWith("http"));return n?p(B,T(h({isExternal:n},o),{children:[e,i(pt,{bottom:"2px",boxSize:"0.9em",position:"relative",ml:1})]})):i(B,T(h({to:a||""},o),{as:uo,children:e}))}}),S=t=>{var r=t,{children:e}=r,o=L(r,["children"]);return i(yt,T(h({},o),{skipHtml:!0,components:Kr,children:Array.isArray(e)?e.filter(a=>a).map(a=>ue(a||"")).join(`

`):ue(e)}))},$r=()=>p(K,{maxW:"container.lg",mt:10,mb:"30vh",children:[i(K,{maxW:"container.md",mb:10,children:i(S,{children:`
            ## Admin

            You can configure cities and offers on this page. To learn more
            about this application please visit the [Overview page](/).
          `})}),i(Jr,{})]}),Jr=()=>p(N,{children:[i(K,{maxW:"container.md",mb:4,children:i(S,{children:`
            #### Cities

            You can create and remove cities by interacting with the map below.
            Click anywhere to define a new city, or click an existing city to
            remove it.
          `})}),i(Vr,{defaultZoom:4,defaultCenter:[39.716470511656766,-99.59395661915288],height:300})]}),ne=({label:e,placeholder:o,value:t,setValue:r,helpText:a,type:n="text"})=>p(He,{children:[i(je,{mb:1,fontSize:"xs",fontWeight:"bold",textTransform:"uppercase",children:e}),i(go,{size:"sm",placeholder:o,value:t,onChange:d=>r(d.target.value),type:n}),a?i(ut,{fontSize:"xs",children:a}):null]}),Zr=()=>{const[e,o]=R(X);return p(He,{children:[i(je,{mb:1,fontSize:"xs",fontWeight:"bold",textTransform:"uppercase",children:"Scale Factor"}),i(gt,{size:"sm",required:!0,value:e.name,onChange:t=>{const r=t.target.value;o(Dr(r))},children:G.map(t=>i("option",{value:t.name,children:t.name},t.name))})]})},Fo=({showDatabase:e,showScaleFactor:o})=>{const[t,r]=R(xo),[a,n]=R(zo),[d,l]=R(Do),[s,c]=R(Z);return p($,{spacing:4,children:[i(ne,{label:"Host & Port",placeholder:"http://127.0.0.1:8808",value:t,setValue:r,helpText:i(S,{children:`
              The protocol (http, https), host, and port for the SingleStore
              [HTTP API][1].

              [1]: https://docs.singlestore.com/docs/http-api/
            `})}),p(mo,{columns:2,gap:2,children:[i(ne,{label:"Username",placeholder:"admin",value:a,setValue:n}),i(ne,{label:"Password",placeholder:"",value:d,setValue:l,type:"password"}),e&&i(ne,{label:"Database",placeholder:"martech",value:s,setValue:c}),o&&i(Zr,{})]})]})},Yo=e=>i(O,T(h({onClick:()=>{const{pathname:o,hash:t}=window.location;window.location.replace(o+t)},colorScheme:"red"},e),{children:"Disconnect"})),Ho=e=>{const{connected:o,initialized:t}=w(),r=vo(),[a,n]=We(),d=v(Z),l=te.useRef(null),m=e,{skipSeedData:s,disabled:c}=m,y=L(m,["skipSeedData","disabled"]),u=Yr({before:g.exports.useCallback(()=>n.on(),[n]),after:g.exports.useCallback(()=>{n.off(),r.onClose()},[r,n]),includeSeedData:!s});return p(N,{children:[i(O,h({disabled:!o||c,onClick:r.onOpen,colorScheme:t?"green":"red"},y)),i(mt,{isOpen:r.isOpen,onClose:r.onClose,closeOnEsc:!1,closeOnOverlayClick:!1,leastDestructiveRef:l,children:i(Ve,{children:p(vt,{children:[p(Ke,{fontSize:"lg",fontWeight:"bold",children:[t?"Reset":"Setup"," database ",d]}),p($e,{children:["This will ",t?"recreate":"create"," the database called ",d,". Are you sure?"]}),p(bo,{children:[i(O,{ref:l,onClick:r.onClose,disabled:a,children:"Cancel"}),i(O,{disabled:a,colorScheme:t?"red":"green",onClick:u,ml:3,children:a?i(D,{}):t?"Recreate database":"Create database"})]})]})})})]})},Xr=({isOpen:e,onClose:o,finalFocusRef:t})=>{const[r,a]=R(q),{connected:n,initialized:d,isVapor:l}=w();return p(bt,{isOpen:e,placement:"right",onClose:o,finalFocusRef:t,children:[i(Ve,{}),p(ht,{children:[i(ho,{}),i(Ke,{children:"Config"}),i($e,{children:p($,{spacing:4,children:[l?null:i(Fo,{showScaleFactor:!0,showDatabase:!0}),p(de,{status:n?"success":"error",borderRadius:"md",children:[i(le,{}),i(se,{children:n?"connected":"disconnected"}),l?i(Yo,{position:"absolute",right:4,top:3,size:"xs"}):null]}),p(de,{status:d?"success":"warning",borderRadius:"md",children:[i(le,{}),i(se,{children:"schema"}),i(Ho,{position:"absolute",right:4,top:3,size:"xs",children:d?"Reset":"Setup"})]}),p(de,{status:r?"success":"warning",borderRadius:"md",children:[i(le,{}),i(se,{children:"simulator"}),i(ft,{position:"absolute",right:4,top:3.5,size:"md",colorScheme:r?"green":"red",isChecked:r,disabled:!n||!d,onChange:()=>a(!r)})]})]})}),i(bo,{})]})]})},xe=({to:e,children:o,onClick:t})=>{const r=wt(e),a=Rt({path:r.pathname,end:!0});return i(B,{as:uo,to:e,px:2,py:1,onClick:t,rounded:"md",_hover:{textDecoration:"none",bg:Pe("gray.300","gray.600")},fontWeight:a?"bold":"normal",href:"#",color:Pe("gray.700","gray.200"),children:o})},qr=()=>{const{colorMode:e,toggleColorMode:o}=he(),t=vo(),[r,a]=R(Br),n=te.useRef(null),{connected:d,initialized:l}=w(),s=v(q),[c]=fo("(max-width: 640px)"),y=p(N,{children:[i(xe,{to:"/",onClick:t.onClose,children:"Overview"}),i(xe,{to:"/map",onClick:t.onClose,children:"Map"}),i(xe,{to:"/admin",onClick:t.onClose,children:"Admin"})]});let u;return c||(u=d?l?s?"connected":"simulator disabled":"needs schema":"disconnected"),i(N,{children:i(x,{bg:Pe("gray.200","gray.700"),children:p(K,{maxW:"container.lg",children:[p(me,{h:16,alignItems:"center",justifyContent:"space-between",children:[i(ke,{size:"md",icon:t.isOpen?i(Et,{}):i(_t,{}),"aria-label":"Open Menu",display:{md:"none"},onClick:t.isOpen?t.onClose:t.onOpen}),p(ve,{spacing:8,alignItems:"center",children:[i(fe,{as:"h1",size:c?"sm":"md",children:c?"Martech":"Realtime Digital Marketing"}),i(ve,{as:"nav",spacing:4,display:{base:"none",md:"flex"},children:y})]}),p(me,{alignItems:"center",gap:2,children:[p(O,{size:"sm",ref:n,onClick:()=>a(!0),colorScheme:d?l&&s?"green":"yellow":"red",children:[l?i(Eo,{}):i(_o,{}),c||i(Ee,{pl:2,children:u})]}),i(ke,{"aria-label":"Github Repo",size:"sm",icon:e==="light"?i(Tt,{size:"1.4em"}):i(St,{size:"1.4em"}),onClick:()=>window.open("https://github.com/singlestore-labs/demo-realtime-digital-marketing","_blank")}),i(ke,{"aria-label":"Toggle Color Mode",size:"sm",onClick:o,icon:e==="light"?i(Nt,{boxSize:"1.2em"}):i(Ot,{boxSize:"1.2em"})})]})]}),t.isOpen?i(x,{pb:4,display:{md:"none"},children:i($,{as:"nav",spacing:4,children:y})}):null,i(Xr,{isOpen:r,onClose:()=>a(!1),finalFocusRef:n})]})})})},Qr=e=>{const o=g.exports.useRef([]),{data:t}=C(["timeseries",e.name,...e.deps||[]],async()=>{const r=await e.fetcher();return o.current.push({data:r,ts:new Date}),o.current=o.current.slice(-e.limit),o.current},{refreshInterval:e.intervalMS});return t||[]},ei=Je("~s"),jo=(e,...o)=>Qr({name:"estimatedRowCount",deps:o,fetcher:g.exports.useCallback(()=>eo(e,...o),[e,o]),limit:30,intervalMS:1e3}),Wo=t=>{var r=t,{data:e}=r,o=L(r,["data"]);const{colorMode:a}=he(),n=g.exports.useCallback(({tooltipData:s,colorScale:c})=>!c||!s?null:Object.keys(s.datumByKey).sort((y,u)=>s.datumByKey[u].datum.data[u]-s.datumByKey[y].datum.data[y]).map(y=>{const{datum:u}=s.datumByKey[y],m=u.data[y];return p(Ee,{mb:1,color:c(y),fontSize:"sm",children:[y,": ",Je(".4~s")(m)]},y)}),[]),d=g.exports.useCallback(s=>ei(s).replace("G","B"),[]);if(e.length<2)return i(P,{height:o.height,children:i(D,{size:"md"})});const l=e.length>0?Object.keys(e[0].data).filter(s=>s!=="ts").map(s=>i(It,{dataKey:s,data:e,xAccessor:c=>c==null?void 0:c.ts,yAccessor:c=>c==null?void 0:c.data[s]},s)):null;return p(At,T(h({xScale:{type:"time"},yScale:{type:"sqrt",nice:!0,zero:!1,clamp:!0},theme:a==="light"?Lt:Ct,margin:{left:0,right:50,top:10,bottom:40}},o),{children:[i(no,{orientation:"bottom",numTicks:5,label:"time",labelOffset:10}),i(no,{orientation:"right",numTicks:o.height<250?3:5,tickFormat:d,label:"rows",labelOffset:20}),l,i(kt,{showVerticalCrosshair:!0,detectBounds:!1,offsetLeft:-175,offsetTop:20,renderTooltip:n})]}))},oi=10*1e3,Vo=(e=!1)=>{const o=v(_),t=v(X),r=v(q),{initialized:a}=w(),n=g.exports.useCallback(d=>{const l=T(h({},o),{ctx:d});return Promise.all([Co(l,t),Rr(l),Ir(l),Lr(l,t),ko(l)])},[o,t]);Fe(n,{name:"SimulatorMonitor",enabled:a&&r&&!e,intervalMS:oi})},ti=1*1e3,ri=10*1e3,ii=()=>{const e=v(_),o=v(q),{initialized:t}=w(),r=g.exports.useCallback(n=>oo(T(h({},e),{ctx:n}),"minute"),[e]);Fe(r,{name:"SimulatorMatcher",enabled:t&&o,intervalMS:ti});const a=g.exports.useCallback(n=>to(T(h({},e),{ctx:n})),[e]);Fe(a,{name:"SimulatorUpdateSegments",enabled:t&&o,intervalMS:ri})},Ye=1e3,pe=60*Ye,ye=60*pe,ze=24*ye,k=e=>e.toLocaleString(void 0,{maximumFractionDigits:2}),F=e=>e?e<Ye?`${k(e)}ms`:e<pe?`${k(e/Ye)}s`:e<ye?`${Math.floor(e/pe)}m${F(e%pe)}`:e<ze?`${Math.floor(e/ye)}h${F(e%ye)}`:`${Math.floor(e/ze)}d${F(e%ze)}`:"0s",ai=100,ni=1e3,U=class extends V{constructor(o){super();E(this,"latlng");E(this,"age",0);E(this,"marker");E(this,"pulse");this.latlng=o,this.marker=new ge,this.marker.beginFill(U.markerColor).drawCircle(0,0,5).endFill(),this.addChild(this.marker),this.pulse=new ge,this.pulse.beginFill(U.pulseColor),this.pulse.drawTorus&&this.pulse.drawTorus(0,0,4,6),this.pulse.endFill(),this.addChild(this.pulse)}update(o,t){if(this.age+=t/60,this.age>U.lifetime&&this.parent){this.parent.removeChild(this);return}const r=this.age%U.lifetime/U.lifetime,a=Pt(r);this.pulse.scale.set(1+a);const n=.4,d=r<n?xt(r/n):1-zt((r-n)/(1-n));this.pulse.alpha=d,r<n?this.marker.alpha=d:this.marker.alpha=1-Dt((r-n)/(1-n));const[l,s]=o(this.latlng);this.x=l,this.y=s}};let ee=U;E(ee,"lifetime",1.5),E(ee,"markerColor",306687),E(ee,"pulseColor",306687);const Ko=()=>{const e=v(_),{initialized:o}=w();return g.exports.useMemo(()=>["notifications",e,o],[e,o])},$o=({scene:e,latLngToPixel:o,bounds:t})=>{const r=g.exports.useRef(new Date().toISOString()),a=v(_),{initialized:n}=w(),d=Uo(t,50),l=Ko();return C(l,()=>Cr(a,r.current,ai,d),{refreshInterval:ni,isPaused:()=>!n,onSuccess:s=>{if(s.length>0){r.current=s[0][0];for(const[,c,y]of s)e.addChild(new ee([y,c]))}}}),{update:g.exports.useCallback(s=>{for(let c=e.children.length-1;c>=0;c--)e.children[c].update(o,s)},[o,e])}},di=()=>{const e=v(_),o=jo(e,"locations","requests","purchases","notifications"),t=C(["notificationsMapTableCounts",e],()=>eo(e,"offers","subscribers","cities","segments"),{refreshInterval:1e3}),r=v(Ge("SimulatorMatcher")),a=v(Ge("SimulatorUpdateSegments")),n=Je(".4~s"),d=t.data?p(To,{templateColumns:"repeat(auto-fit, minmax(100px, 1fr))",columnGap:2,rowGap:2,children:[p(H,{children:[i(j,{children:"Offers"}),i(W,{children:n(t.data.offers)})]}),p(H,{children:[i(j,{children:"Cities"}),i(W,{children:n(t.data.cities)})]}),p(H,{children:[i(j,{children:"Subscribers"}),i(W,{children:n(t.data.subscribers)})]}),p(H,{children:[i(j,{children:"Segments"}),i(W,{children:n(t.data.segments)})]}),p(H,{children:[i(j,{children:"Segmentation"}),i(W,{children:F(a)})]}),p(H,{children:[i(j,{children:"Matching"}),i(W,{children:F(r)})]})]}):null;return p(N,{children:[i(S,{children:`
          The map on this page displays notifications as they are delivered to
          subscribers in realtime. Below, you will find some key statistics
          about the demo.
        `}),d,p(x,{children:[i(Ee,{fontSize:"sm",fontWeight:"medium",children:"Row count / time"}),i(Wo,{data:o,height:150})]})]})},li=()=>{const[e,o]=R(q);return Vo(),ii(),p(me,{gap:4,justifyContent:"space-between",direction:["column","column","row"],height:"100%",children:[i($,{spacing:4,flex:"2 2 0",minHeight:"200px",maxHeight:"100%",children:i(Se,{useRenderer:$o,options:{}})}),p($,{spacing:4,flex:"1 1 0",minWidth:"0",children:[i(S,{children:`

            This application is a demo of how to use SingleStore to serve ads to
            users based on their behavior and realtime location. The demo is
            based on location, purchase, and request history from millions of
            simulated subscribers for a hypothetical service company. To learn
            about how this works please visit the [overview page](/).
          `}),e?i(di,{}):i(N,{children:p(de,{status:"warning",borderRadius:"md",children:[i(le,{}),i(se,{children:"The simulator is disabled"}),i(O,{position:"absolute",right:4,top:3,size:"xs",colorScheme:"blue",onClick:()=>o(!0),children:"Enable simulator"})]})})]})]})},Jo=t=>{var r=t,{children:e}=r,o=L(r,["children"]);return i(Mt,T(h({as:"pre",borderRadius:"md",overflow:"auto",display:"block",px:6,py:4,minW:0},o),{children:e}))},si=1e3;class ci extends V{constructor(o){super();E(this,"offer");E(this,"points");E(this,"polygon");this.offer=o,this.points=or(o.notificationZone),this.polygon=new ge,this.addChild(this.polygon),this.polygon.interactive=!0,this.polygon.on("mouseover",()=>{this.polygon.tint=65280}),this.polygon.on("mouseout",()=>{this.polygon.tint=16777215})}update(o){this.polygon.clear(),this.polygon.lineStyle(1,306687,1),this.polygon.beginFill(306687,.2),this.polygon.drawPolygon(this.points.flatMap(([t,r])=>o([r,t]))),this.polygon.endFill()}}const pi=({scene:e,latLngToPixel:o,bounds:t})=>{const r=v(_),{initialized:a}=w(),n=Uo(t,100);return C(["offers",r,a,n],()=>kr(r,si,n),{isPaused:()=>!a,onSuccess:d=>{e.removeChildren();for(let l=0;l<d.length;l++)e.addChild(new ci(d[l]))}}),{update:g.exports.useCallback(()=>{for(let d=0;d<e.children.length;d++)e.children[d].update(o)},[o,e])}},yi=e=>i(Se,T(h({},e),{useRenderer:pi,options:{}})),z=e=>{const{completed:o,title:t,left:r,right:a}=e,{colorMode:n}=he(),d=n==="light"?".300":".500",l=o?"gray"+d:void 0,s=(o?"green":"gray")+d;return p(N,{children:[p(be,{children:[p(fe,{as:"h2",size:"lg",mb:4,color:l,children:[i(Eo,h({color:s},{boxSize:6,position:"relative",bottom:.5,mr:2})),t]}),r]}),i(be,{children:a})]})},ui=({connected:e,isVapor:o})=>o?i(z,{completed:e,title:"Connected",left:p(N,{children:[i(S,{children:`
                Connected to a demo cluster running in the SingleStore Managed
                Service. To disconnect and use your own cluster instead, click
                the button below.
              `}),i(Yo,{size:"xs",colorScheme:"gray"})]}),right:null}):i(z,{completed:e,title:"Connect to SingleStore",left:i(S,{children:`
            This demo requires a connection to SingleStore's HTTP API. Please
            ensure the connection details on the right are correct.
            
            **Note**: The HTTP API may need to be enabled on your SingleStore
            cluster. To do so please see [our documentation][1] or contact
            support for assistance.
            
            [1]: https://docs.singlestore.com/docs/http-api/
          `}),right:i(Fo,{})}),gi=({onClose:e,schemaObjectName:o})=>{const t=Tr(o),[r]=fo("(max-width: 640px)");return p(Gt,{isOpen:!0,onClose:e,size:r?"full":"4xl",scrollBehavior:"inside",children:[i(Ve,{}),p(Ft,{children:[p(Ke,{children:["Create statement for ",t.name]}),i(ho,{}),i($e,{children:i(Jo,{mb:4,children:t.createStmt})})]})]})},mi=({initialized:e})=>{const[o,t]=R(Z),r=Mo(),{colorMode:a}=he(),[n,d]=g.exports.useState(),l=g.exports.useCallback(c=>d(c),[]),s=g.exports.useCallback(()=>d(null),[]);return p(N,{children:[!!n&&i(gi,{onClose:s,schemaObjectName:n}),i(z,{completed:e,title:"Setup the schema",left:p(N,{children:[i(S,{children:`
                Our schema includes the database and a set of tables and views we
                need to store all of our data. Use the controls below to set the
                database name and create the schema.
              `}),i(Ut,{mt:4,mb:6}),p(ve,{alignItems:"flex-end",children:[p(He,{flex:1,children:[i(je,{fontSize:"xs",fontWeight:"bold",textTransform:"uppercase",children:"Database name"}),i(go,{placeholder:"martech",value:o,size:"sm",onChange:c=>t(c.target.value)})]}),i(x,{flex:1,textAlign:"center",children:i(Ho,{colorScheme:"blue",size:"sm",disabled:e,skipSeedData:!0,children:e?"Schema is setup":"Setup schema"})})]})]}),right:i(mo,{columns:[1,2,2],gap:1,children:Object.keys(r.data||{}).sort().map(c=>{var y;return i(be,{bg:((y=r.data)!=null&&y[c]?"green":"gray")+(a==="light"?".200":".600"),color:a==="light"?"gray.800":"gray.100",textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden",borderRadius:"md",px:2,py:1,textAlign:"center",_hover:{fontWeight:"bold"},cursor:"pointer",onClick:()=>l(c),children:c},c)})})})]})},Zo=(e,o,t=!0)=>{var n;const r=C(["pipelineStatus",e,o],()=>Lo(e,o),{isPaused:()=>!t}),a=!!((n=r.data)!=null&&n.every(d=>!d.needsUpdate));return{pipelines:r,completed:a}},vi=()=>{const e=v(_),o=v(X),{pipelines:t,completed:r}=Zo(e,o);Vo(!r);const[a,n]=We(),d=g.exports.useCallback(async()=>{n.on(),await Co(e,o),t.mutate(),n.off()},[n,e,o,t]),l=jo(e,"locations","requests","purchases"),s=l.length<2||l.every(({data:y})=>y.locations+y.purchases+y.requests===0);return i(z,{completed:r,title:"Ingest data",left:i(S,{children:`
            The demo needs to load location, request, and purchase history from
            simulated subscribers in real time. We will simulate these streams
            using [SingleStore Pipelines][1] to ingest data from [AWS S3][2].

            [1]: https://docs.singlestore.com/managed-service/en/load-data/about-loading-data-with-pipelines/pipeline-concepts/overview-of-pipelines.html
            [2]: https://aws.amazon.com/s3/
          `}),right:s||!r?i(P,{h:220,children:p(O,{colorScheme:"blue",size:"sm",onClick:d,disabled:r,children:[(a||r)&&i(D,{mr:2}),a?"Creating Pipelines":r?"...waiting for data":"Create pipelines"]})}):i(Wo,{data:l,height:200})})},Re=(e,o=!0)=>C(["overviewTableCounts",e],()=>eo(e,"locations","notifications","offers","purchases","requests","segments","subscriber_segments","subscribers"),{isPaused:()=>!o}),bi=()=>{var l,s;const e=v(_),o=v(X),[t,r]=We(),a=Re(e),n=g.exports.useCallback(async()=>{r.on(),await Qe(e,oe,o),a.mutate(),r.off()},[e,o,a,r]),d=!!((l=a.data)!=null&&l.offers);return i(z,{completed:d,title:"Offers",left:i(N,{children:p(S,{children:[`
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
                boundary. There are ${(s=a.data)==null?void 0:s.offers} offers in the
                database.
            `]})}),right:d?i(yi,{height:300}):i(P,{h:"100%",children:p(O,{onClick:n,disabled:t,children:[t&&i(D,{mr:2}),t?"loading...":d?"loaded offers!":"load offers"]})})})},hi=({done:e,setDone:o})=>{const t=v(_);return g.exports.useEffect(()=>{if(e)return;const r=new AbortController,a=T(h({},t),{ctx:r});return(async()=>{try{for(let n=0;n<10;n++){const d=performance.now();if(await to(a),await oo(a,"second"),performance.now()-d<2e3||n>1&&!await ko(a))return}}catch(n){if(r.signal.aborted||n instanceof DOMException&&n.name==="AbortError")return;throw n}})().then(()=>o(!0)),()=>{r.abort()}},[t,e,o]),e?null:i(be,{colSpan:[1,1,2],children:p(P,{w:"100%",h:"200px",color:"gray.500",children:[i(D,{size:"md",mr:4}),i(fe,{size:"md",children:"Warming up queries..."})]})})},fi=()=>{var c;const e=v(_),o=Re(e),{elapsed:t,isRunning:r,startTimer:a,stopTimer:n}=Bo(),d=!!((c=o.data)!=null&&c.subscriber_segments),l=g.exports.useCallback(async()=>{a(),await to(e),n(),o.mutate()},[e,o,a,n]);let s;if(t&&o.data){const{segments:y,subscriber_segments:u,locations:m,requests:b,purchases:M}=o.data,Q=F(t),Ie=k(m+b+M),Ae=k(y),Le=k(u);s=i(S,{children:`
          The last update evaluated ${Ie} rows against ${Ae} segments
          producing ${Le} segment memberships.
          
          **This process took ${Q}**.
        `})}return i(z,{completed:d,title:"Segmentation",left:i(S,{children:`
            As mentioned above, each offer includes a list of segments. A
            segment is defined by a simple rule like "bought a coffee in the
            last day" or "visited the grocery store in the last week". While we
            could evaluate all of the segments dynamically when matching offers
            to subscribers, we would be wasting a lot of compute time since
            segment memberships don't change very often. Instead we will
            use a routine to periodically cache the mapping between subscribers
            and segments.

            Click the button to run the update interactively, or run the following query in your favorite SQL client:

                select * from dynamic_subscriber_segments;
          `}),right:i(P,{h:"100%",children:p(So,{gap:4,textAlign:"center",children:[p(O,{disabled:r,onClick:l,children:[r&&i(D,{mr:2}),r?"...running":"Match subscribers to segments"]}),s]})})})},Ei=()=>{var b;const e=v(_),o=Re(e),t=Ko(),{mutate:r}=Bt(),{elapsed:a,isRunning:n,startTimer:d,stopTimer:l}=Bo(),[s,c]=g.exports.useState(0),y=!!((b=o.data)!=null&&b.notifications),u=g.exports.useCallback(async()=>{let M=0,Q=0;for(;M===0&&Q++<10;)d(),M=await oo(e,"second");l(),c(M),o.mutate(),r(t)},[e,d,l,o,r,t]);let m;if(a&&o.data){const{offers:M,subscribers:Q,subscriber_segments:Ie,notifications:Ae}=o.data,Le=k(M*Q+Ae),Xo=k(Ie),qo=F(a),Qo=k(s);m=i(S,{children:`
          The last update evaluated up to ${Le} notification opportunities
          against ${Xo} segment memberships generating ${Qo}
          notifications. This process took ${qo}.
        `})}return i(z,{completed:y,title:"Matching",left:i(S,{children:`
            Now that we have offers and have assigned subscribers to segments,
            we are finally able to deliver ads to subscribers as push
            notifications. In this demo, rather than actually sending
            notifications we will insert them into a table called
            "notifications".

            Click the button to generate notifications interactively, or run the
            following query in your favorite SQL client:

                select * from match_offers_to_subscribers("second");
          `}),right:i(P,{h:"100%",children:p(So,{gap:4,w:"100%",children:[p(O,{disabled:n,onClick:u,children:[n&&i(D,{mr:2}),n?"...running":"Generate notifications"]}),i(x,{width:"100%",children:i(Se,{height:250,defaultZoom:12,useRenderer:$o,options:{}})}),m]})})})},_i=()=>{const e=v(Z);return i(z,{completed:!0,title:"Putting it all together",left:i(S,{children:`
            Nice job! At this point you are ready to step into the shoes of a
            data engineer. Here are some recommendations on what to do next:

            * Visit the [live demo dashboard][1]
            * Explore the ${e} database in SingleStore Studio

            [1]: map
          `}),right:null})},Ti=()=>{const e=v(_),o=v(X),{connected:t,initialized:r,isVapor:a}=w(),{completed:n}=Zo(e,o,t&&r),{data:d}=Re(e,t&&r),[l,s]=g.exports.useState(!1),c=[{completed:t,component:i(ui,{connected:t,isVapor:a},"connection")},{completed:r,component:i(mi,{initialized:r},"schema")},{completed:n,component:i(vi,{},"pipelines")},{completed:d?d.offers>0:!1,component:i(bi,{},"offers")},{completed:l,component:i(hi,{done:l,setDone:s},"warmup")},{completed:d?d.subscriber_segments>0:!1,component:i(fi,{},"segmentation")},{completed:d?d.notifications>0:!1,component:i(Ei,{},"matching")},{completed:!0,component:i(_i,{},"summary")}];let y=!0;const u=[];for(const{completed:m,component:b}of c)if(y)u.push(b),y=m;else break;return p(K,{maxW:"container.lg",mt:10,mb:"30vh",children:[i(x,{maxW:"container.md",mb:10,px:0,children:i(S,{children:`
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
          `})}),i(To,{columnGap:6,rowGap:10,templateColumns:["minmax(0, 1fr)",null,"repeat(2, minmax(0, 1fr))"],children:u})]})};function Si(){const e=i(P,{height:"100vh",children:i(D,{size:"xl",speed:"0.85s",thickness:"3px",emptyColor:"gray.200",color:"blue.500"})});return i(g.exports.Suspense,{fallback:e,children:p(me,{height:"100vh",direction:"column",children:[i(qr,{}),i(x,{m:4,flex:"1",children:p(Yt,{children:[i(ie,{path:"/",element:i(Ti,{})}),i(ie,{path:"/map",element:i(li,{})}),i(ie,{path:"/admin",element:i($r,{})}),i(ie,{path:"*",element:i(Ht,{to:"/",replace:!0})})]})})]})})}class Ni extends te.Component{constructor(){super(void 0);E(this,"state",{});this.handlePromiseRejection=this.handlePromiseRejection.bind(this)}componentDidMount(){window.addEventListener("unhandledrejection",this.handlePromiseRejection)}componentWillUnmount(){window.removeEventListener("unhandledrejection",this.handlePromiseRejection)}handlePromiseRejection(o){this.setState({error:o.reason})}static getDerivedStateFromError(o){return{error:o}}render(){const{error:o}=this.state;if(o){let t;return o instanceof I&&(t=p(N,{children:[i(Ee,{textAlign:"center",children:"An error occurred while running the following query:"}),i(Jo,{children:ue(o.sql)})]})),i(K,{maxW:"container.md",my:10,children:p($,{gap:4,children:[i(P,{children:i(_o,{boxSize:20,color:"red"})}),i(fe,{size:"xl",textAlign:"center",children:o.message}),t,p(ve,{justify:"center",gap:4,children:[i(O,{onClick:()=>this.setState({error:void 0}),size:"sm",children:"Dismiss Error"}),i(O,{onClick:()=>window.location.reload(),size:"sm",colorScheme:"blue",leftIcon:i(jt,{}),children:"Reload"})]})]})})}return this.props.children}}const Oi=Wt({fonts:{heading:"InterVariable, sans-serif",body:"InterVariable, sans-serif",mono:'"Source Code ProVariable", monospace'},components:{Link:{baseStyle:e=>({color:e.colorMode==="light"?"blue.600":"blue.300"})}}}),wi=({children:e})=>{const o=yo();return i(Zt,{value:{onError:r=>{o({title:"An error occurred",description:r.message,status:"error",duration:5e3,isClosable:!0})}},children:e})};Vt.render(i(te.StrictMode,{children:i(Kt,{theme:Oi,children:i(Ni,{children:i(wi,{children:i($t,{children:i(Jt,{basename:"/",children:i(Si,{})})})})})})}),document.getElementById("root"));
