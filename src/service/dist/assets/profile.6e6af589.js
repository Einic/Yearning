import{d as Kt,f as Jt,u as Yt,b as q,V as jt,o as qt,h as P,i as et,j as nt,k as B,w as I,l as rt,m as ot,t as H,y as it,p as Bt,F as Ot,N as st,_ as Qt}from"./index.66cc4c36.js";import{C as _t}from"./common.b6c75224.js";import{P as Gt}from"./pageHeader.9328b4bb.js";import{g as Zt,a as Wt,u as Xt,p as xt}from"./user.f1b2b1fb.js";var Y={},te=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then},It={},T={};let wt;const ee=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];T.getSymbolSize=function(t){if(!t)throw new Error('"version" cannot be null or undefined');if(t<1||t>40)throw new Error('"version" should be in range from 1 to 40');return t*4+17};T.getSymbolTotalCodewords=function(t){return ee[t]};T.getBCHDigit=function(e){let t=0;for(;e!==0;)t++,e>>>=1;return t};T.setToSJISFunction=function(t){if(typeof t!="function")throw new Error('"toSJISFunc" is not a valid function.');wt=t};T.isKanjiModeEnabled=function(){return typeof wt<"u"};T.toSJIS=function(t){return wt(t)};var W={};(function(e){e.L={bit:1},e.M={bit:0},e.Q={bit:3},e.H={bit:2};function t(i){if(typeof i!="string")throw new Error("Param is not a string");switch(i.toLowerCase()){case"l":case"low":return e.L;case"m":case"medium":return e.M;case"q":case"quartile":return e.Q;case"h":case"high":return e.H;default:throw new Error("Unknown EC Level: "+i)}}e.isValid=function(n){return n&&typeof n.bit<"u"&&n.bit>=0&&n.bit<4},e.from=function(n,o){if(e.isValid(n))return n;try{return t(n)}catch{return o}}})(W);function Nt(){this.buffer=[],this.length=0}Nt.prototype={get:function(e){const t=Math.floor(e/8);return(this.buffer[t]>>>7-e%8&1)===1},put:function(e,t){for(let i=0;i<t;i++)this.putBit((e>>>t-i-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(e){const t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}};var ne=Nt;function j(e){if(!e||e<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}j.prototype.set=function(e,t,i,n){const o=e*this.size+t;this.data[o]=i,n&&(this.reservedBit[o]=!0)};j.prototype.get=function(e,t){return this.data[e*this.size+t]};j.prototype.xor=function(e,t,i){this.data[e*this.size+t]^=i};j.prototype.isReserved=function(e,t){return this.reservedBit[e*this.size+t]};var re=j,Tt={};(function(e){const t=T.getSymbolSize;e.getRowColCoords=function(n){if(n===1)return[];const o=Math.floor(n/7)+2,r=t(n),s=r===145?26:Math.ceil((r-13)/(2*o-2))*2,l=[r-7];for(let a=1;a<o-1;a++)l[a]=l[a-1]-s;return l.push(6),l.reverse()},e.getPositions=function(n){const o=[],r=e.getRowColCoords(n),s=r.length;for(let l=0;l<s;l++)for(let a=0;a<s;a++)l===0&&a===0||l===0&&a===s-1||l===s-1&&a===0||o.push([r[l],r[a]]);return o}})(Tt);var Mt={};const oe=T.getSymbolSize,bt=7;Mt.getPositions=function(t){const i=oe(t);return[[0,0],[i-bt,0],[0,i-bt]]};var Pt={};(function(e){e.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t={N1:3,N2:3,N3:40,N4:10};e.isValid=function(o){return o!=null&&o!==""&&!isNaN(o)&&o>=0&&o<=7},e.from=function(o){return e.isValid(o)?parseInt(o,10):void 0},e.getPenaltyN1=function(o){const r=o.size;let s=0,l=0,a=0,c=null,f=null;for(let _=0;_<r;_++){l=a=0,c=f=null;for(let y=0;y<r;y++){let g=o.get(_,y);g===c?l++:(l>=5&&(s+=t.N1+(l-5)),c=g,l=1),g=o.get(y,_),g===f?a++:(a>=5&&(s+=t.N1+(a-5)),f=g,a=1)}l>=5&&(s+=t.N1+(l-5)),a>=5&&(s+=t.N1+(a-5))}return s},e.getPenaltyN2=function(o){const r=o.size;let s=0;for(let l=0;l<r-1;l++)for(let a=0;a<r-1;a++){const c=o.get(l,a)+o.get(l,a+1)+o.get(l+1,a)+o.get(l+1,a+1);(c===4||c===0)&&s++}return s*t.N2},e.getPenaltyN3=function(o){const r=o.size;let s=0,l=0,a=0;for(let c=0;c<r;c++){l=a=0;for(let f=0;f<r;f++)l=l<<1&2047|o.get(c,f),f>=10&&(l===1488||l===93)&&s++,a=a<<1&2047|o.get(f,c),f>=10&&(a===1488||a===93)&&s++}return s*t.N3},e.getPenaltyN4=function(o){let r=0;const s=o.data.length;for(let a=0;a<s;a++)r+=o.data[a];return Math.abs(Math.ceil(r*100/s/5)-10)*t.N4};function i(n,o,r){switch(n){case e.Patterns.PATTERN000:return(o+r)%2===0;case e.Patterns.PATTERN001:return o%2===0;case e.Patterns.PATTERN010:return r%3===0;case e.Patterns.PATTERN011:return(o+r)%3===0;case e.Patterns.PATTERN100:return(Math.floor(o/2)+Math.floor(r/3))%2===0;case e.Patterns.PATTERN101:return o*r%2+o*r%3===0;case e.Patterns.PATTERN110:return(o*r%2+o*r%3)%2===0;case e.Patterns.PATTERN111:return(o*r%3+(o+r)%2)%2===0;default:throw new Error("bad maskPattern:"+n)}}e.applyMask=function(o,r){const s=r.size;for(let l=0;l<s;l++)for(let a=0;a<s;a++)r.isReserved(a,l)||r.xor(a,l,i(o,a,l))},e.getBestMask=function(o,r){const s=Object.keys(e.Patterns).length;let l=0,a=1/0;for(let c=0;c<s;c++){r(c),e.applyMask(c,o);const f=e.getPenaltyN1(o)+e.getPenaltyN2(o)+e.getPenaltyN3(o)+e.getPenaltyN4(o);e.applyMask(c,o),f<a&&(a=f,l=c)}return l}})(Pt);var X={};const U=W,O=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],Q=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];X.getBlocksCount=function(t,i){switch(i){case U.L:return O[(t-1)*4+0];case U.M:return O[(t-1)*4+1];case U.Q:return O[(t-1)*4+2];case U.H:return O[(t-1)*4+3];default:return}};X.getTotalCodewordsCount=function(t,i){switch(i){case U.L:return Q[(t-1)*4+0];case U.M:return Q[(t-1)*4+1];case U.Q:return Q[(t-1)*4+2];case U.H:return Q[(t-1)*4+3];default:return}};var St={},x={};const K=new Uint8Array(512),G=new Uint8Array(256);(function(){let t=1;for(let i=0;i<255;i++)K[i]=t,G[t]=i,t<<=1,t&256&&(t^=285);for(let i=255;i<512;i++)K[i]=K[i-255]})();x.log=function(t){if(t<1)throw new Error("log("+t+")");return G[t]};x.exp=function(t){return K[t]};x.mul=function(t,i){return t===0||i===0?0:K[G[t]+G[i]]};(function(e){const t=x;e.mul=function(n,o){const r=new Uint8Array(n.length+o.length-1);for(let s=0;s<n.length;s++)for(let l=0;l<o.length;l++)r[s+l]^=t.mul(n[s],o[l]);return r},e.mod=function(n,o){let r=new Uint8Array(n);for(;r.length-o.length>=0;){const s=r[0];for(let a=0;a<o.length;a++)r[a]^=t.mul(o[a],s);let l=0;for(;l<r.length&&r[l]===0;)l++;r=r.slice(l)}return r},e.generateECPolynomial=function(n){let o=new Uint8Array([1]);for(let r=0;r<n;r++)o=e.mul(o,new Uint8Array([1,t.exp(r)]));return o}})(St);const Rt=St;function pt(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}pt.prototype.initialize=function(t){this.degree=t,this.genPoly=Rt.generateECPolynomial(this.degree)};pt.prototype.encode=function(t){if(!this.genPoly)throw new Error("Encoder not initialized");const i=new Uint8Array(t.length+this.degree);i.set(t);const n=Rt.mod(i,this.genPoly),o=this.degree-n.length;if(o>0){const r=new Uint8Array(this.degree);return r.set(n,o),r}return n};var ie=pt,Lt={},D={},yt={};yt.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40};var R={};const Ut="[0-9]+",se="[A-Z $%*+\\-./:]+";let J="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";J=J.replace(/u/g,"\\u");const ae="(?:(?![A-Z0-9 $%*+\\-./:]|"+J+`)(?:.|[\r
]))+`;R.KANJI=new RegExp(J,"g");R.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g");R.BYTE=new RegExp(ae,"g");R.NUMERIC=new RegExp(Ut,"g");R.ALPHANUMERIC=new RegExp(se,"g");const le=new RegExp("^"+J+"$"),ue=new RegExp("^"+Ut+"$"),ce=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");R.testKanji=function(t){return le.test(t)};R.testNumeric=function(t){return ue.test(t)};R.testAlphanumeric=function(t){return ce.test(t)};(function(e){const t=yt,i=R;e.NUMERIC={id:"Numeric",bit:1<<0,ccBits:[10,12,14]},e.ALPHANUMERIC={id:"Alphanumeric",bit:1<<1,ccBits:[9,11,13]},e.BYTE={id:"Byte",bit:1<<2,ccBits:[8,16,16]},e.KANJI={id:"Kanji",bit:1<<3,ccBits:[8,10,12]},e.MIXED={bit:-1},e.getCharCountIndicator=function(r,s){if(!r.ccBits)throw new Error("Invalid mode: "+r);if(!t.isValid(s))throw new Error("Invalid version: "+s);return s>=1&&s<10?r.ccBits[0]:s<27?r.ccBits[1]:r.ccBits[2]},e.getBestModeForData=function(r){return i.testNumeric(r)?e.NUMERIC:i.testAlphanumeric(r)?e.ALPHANUMERIC:i.testKanji(r)?e.KANJI:e.BYTE},e.toString=function(r){if(r&&r.id)return r.id;throw new Error("Invalid mode")},e.isValid=function(r){return r&&r.bit&&r.ccBits};function n(o){if(typeof o!="string")throw new Error("Param is not a string");switch(o.toLowerCase()){case"numeric":return e.NUMERIC;case"alphanumeric":return e.ALPHANUMERIC;case"kanji":return e.KANJI;case"byte":return e.BYTE;default:throw new Error("Unknown mode: "+o)}}e.from=function(r,s){if(e.isValid(r))return r;try{return n(r)}catch{return s}}})(D);(function(e){const t=T,i=X,n=W,o=D,r=yt,s=1<<12|1<<11|1<<10|1<<9|1<<8|1<<5|1<<2|1<<0,l=t.getBCHDigit(s);function a(y,g,C){for(let u=1;u<=40;u++)if(g<=e.getCapacity(u,C,y))return u}function c(y,g){return o.getCharCountIndicator(y,g)+4}function f(y,g){let C=0;return y.forEach(function(u){C+=c(u.mode,g)+u.getBitsLength()}),C}function _(y,g){for(let C=1;C<=40;C++)if(f(y,C)<=e.getCapacity(C,g,o.MIXED))return C}e.from=function(g,C){return r.isValid(g)?parseInt(g,10):C},e.getCapacity=function(g,C,u){if(!r.isValid(g))throw new Error("Invalid QR Code version");typeof u>"u"&&(u=o.BYTE);const h=t.getSymbolTotalCodewords(g),d=i.getTotalCodewordsCount(g,C),m=(h-d)*8;if(u===o.MIXED)return m;const w=m-c(u,g);switch(u){case o.NUMERIC:return Math.floor(w/10*3);case o.ALPHANUMERIC:return Math.floor(w/11*2);case o.KANJI:return Math.floor(w/13);case o.BYTE:default:return Math.floor(w/8)}},e.getBestVersionForData=function(g,C){let u;const h=n.from(C,n.M);if(Array.isArray(g)){if(g.length>1)return _(g,h);if(g.length===0)return 1;u=g[0]}else u=g;return a(u.mode,u.getLength(),h)},e.getEncodedBits=function(g){if(!r.isValid(g)||g<7)throw new Error("Invalid QR Code version");let C=g<<12;for(;t.getBCHDigit(C)-l>=0;)C^=s<<t.getBCHDigit(C)-l;return g<<12|C}})(Lt);var Dt={};const dt=T,Ft=1<<10|1<<8|1<<5|1<<4|1<<2|1<<1|1<<0,fe=1<<14|1<<12|1<<10|1<<4|1<<1,At=dt.getBCHDigit(Ft);Dt.getEncodedBits=function(t,i){const n=t.bit<<3|i;let o=n<<10;for(;dt.getBCHDigit(o)-At>=0;)o^=Ft<<dt.getBCHDigit(o)-At;return(n<<10|o)^fe};var kt={};const de=D;function k(e){this.mode=de.NUMERIC,this.data=e.toString()}k.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)};k.prototype.getLength=function(){return this.data.length};k.prototype.getBitsLength=function(){return k.getBitsLength(this.data.length)};k.prototype.write=function(t){let i,n,o;for(i=0;i+3<=this.data.length;i+=3)n=this.data.substr(i,3),o=parseInt(n,10),t.put(o,10);const r=this.data.length-i;r>0&&(n=this.data.substr(i),o=parseInt(n,10),t.put(o,r*3+1))};var ge=k;const he=D,at=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function z(e){this.mode=he.ALPHANUMERIC,this.data=e}z.getBitsLength=function(t){return 11*Math.floor(t/2)+6*(t%2)};z.prototype.getLength=function(){return this.data.length};z.prototype.getBitsLength=function(){return z.getBitsLength(this.data.length)};z.prototype.write=function(t){let i;for(i=0;i+2<=this.data.length;i+=2){let n=at.indexOf(this.data[i])*45;n+=at.indexOf(this.data[i+1]),t.put(n,11)}this.data.length%2&&t.put(at.indexOf(this.data[i]),6)};var me=z,we=function(t){for(var i=[],n=t.length,o=0;o<n;o++){var r=t.charCodeAt(o);if(r>=55296&&r<=56319&&n>o+1){var s=t.charCodeAt(o+1);s>=56320&&s<=57343&&(r=(r-55296)*1024+s-56320+65536,o+=1)}if(r<128){i.push(r);continue}if(r<2048){i.push(r>>6|192),i.push(r&63|128);continue}if(r<55296||r>=57344&&r<65536){i.push(r>>12|224),i.push(r>>6&63|128),i.push(r&63|128);continue}if(r>=65536&&r<=1114111){i.push(r>>18|240),i.push(r>>12&63|128),i.push(r>>6&63|128),i.push(r&63|128);continue}i.push(239,191,189)}return new Uint8Array(i).buffer};const pe=we,ye=D;function $(e){this.mode=ye.BYTE,typeof e=="string"&&(e=pe(e)),this.data=new Uint8Array(e)}$.getBitsLength=function(t){return t*8};$.prototype.getLength=function(){return this.data.length};$.prototype.getBitsLength=function(){return $.getBitsLength(this.data.length)};$.prototype.write=function(e){for(let t=0,i=this.data.length;t<i;t++)e.put(this.data[t],8)};var Ce=$;const Ee=D,Be=T;function V(e){this.mode=Ee.KANJI,this.data=e}V.getBitsLength=function(t){return t*13};V.prototype.getLength=function(){return this.data.length};V.prototype.getBitsLength=function(){return V.getBitsLength(this.data.length)};V.prototype.write=function(e){let t;for(t=0;t<this.data.length;t++){let i=Be.toSJIS(this.data[t]);if(i>=33088&&i<=40956)i-=33088;else if(i>=57408&&i<=60351)i-=49472;else throw new Error("Invalid SJIS character: "+this.data[t]+`
Make sure your charset is UTF-8`);i=(i>>>8&255)*192+(i&255),e.put(i,13)}};var _e=V,zt={exports:{}};(function(e){var t={single_source_shortest_paths:function(i,n,o){var r={},s={};s[n]=0;var l=t.PriorityQueue.make();l.push(n,0);for(var a,c,f,_,y,g,C,u,h;!l.empty();){a=l.pop(),c=a.value,_=a.cost,y=i[c]||{};for(f in y)y.hasOwnProperty(f)&&(g=y[f],C=_+g,u=s[f],h=typeof s[f]>"u",(h||u>C)&&(s[f]=C,l.push(f,C),r[f]=c))}if(typeof o<"u"&&typeof s[o]>"u"){var d=["Could not find a path from ",n," to ",o,"."].join("");throw new Error(d)}return r},extract_shortest_path_from_predecessor_list:function(i,n){for(var o=[],r=n;r;)o.push(r),i[r],r=i[r];return o.reverse(),o},find_path:function(i,n,o){var r=t.single_source_shortest_paths(i,n,o);return t.extract_shortest_path_from_predecessor_list(r,o)},PriorityQueue:{make:function(i){var n=t.PriorityQueue,o={},r;i=i||{};for(r in n)n.hasOwnProperty(r)&&(o[r]=n[r]);return o.queue=[],o.sorter=i.sorter||n.default_sorter,o},default_sorter:function(i,n){return i.cost-n.cost},push:function(i,n){var o={value:i,cost:n};this.queue.push(o),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};e.exports=t})(zt);(function(e){const t=D,i=ge,n=me,o=Ce,r=_e,s=R,l=T,a=zt.exports;function c(d){return unescape(encodeURIComponent(d)).length}function f(d,m,w){const p=[];let E;for(;(E=d.exec(w))!==null;)p.push({data:E[0],index:E.index,mode:m,length:E[0].length});return p}function _(d){const m=f(s.NUMERIC,t.NUMERIC,d),w=f(s.ALPHANUMERIC,t.ALPHANUMERIC,d);let p,E;return l.isKanjiModeEnabled()?(p=f(s.BYTE,t.BYTE,d),E=f(s.KANJI,t.KANJI,d)):(p=f(s.BYTE_KANJI,t.BYTE,d),E=[]),m.concat(w,p,E).sort(function(v,N){return v.index-N.index}).map(function(v){return{data:v.data,mode:v.mode,length:v.length}})}function y(d,m){switch(m){case t.NUMERIC:return i.getBitsLength(d);case t.ALPHANUMERIC:return n.getBitsLength(d);case t.KANJI:return r.getBitsLength(d);case t.BYTE:return o.getBitsLength(d)}}function g(d){return d.reduce(function(m,w){const p=m.length-1>=0?m[m.length-1]:null;return p&&p.mode===w.mode?(m[m.length-1].data+=w.data,m):(m.push(w),m)},[])}function C(d){const m=[];for(let w=0;w<d.length;w++){const p=d[w];switch(p.mode){case t.NUMERIC:m.push([p,{data:p.data,mode:t.ALPHANUMERIC,length:p.length},{data:p.data,mode:t.BYTE,length:p.length}]);break;case t.ALPHANUMERIC:m.push([p,{data:p.data,mode:t.BYTE,length:p.length}]);break;case t.KANJI:m.push([p,{data:p.data,mode:t.BYTE,length:c(p.data)}]);break;case t.BYTE:m.push([{data:p.data,mode:t.BYTE,length:c(p.data)}])}}return m}function u(d,m){const w={},p={start:{}};let E=["start"];for(let b=0;b<d.length;b++){const v=d[b],N=[];for(let S=0;S<v.length;S++){const M=v[S],F=""+b+S;N.push(F),w[F]={node:M,lastCount:0},p[F]={};for(let A=0;A<E.length;A++){const L=E[A];w[L]&&w[L].node.mode===M.mode?(p[L][F]=y(w[L].lastCount+M.length,M.mode)-y(w[L].lastCount,M.mode),w[L].lastCount+=M.length):(w[L]&&(w[L].lastCount=M.length),p[L][F]=y(M.length,M.mode)+4+t.getCharCountIndicator(M.mode,m))}}E=N}for(let b=0;b<E.length;b++)p[E[b]].end=0;return{map:p,table:w}}function h(d,m){let w;const p=t.getBestModeForData(d);if(w=t.from(m,p),w!==t.BYTE&&w.bit<p.bit)throw new Error('"'+d+'" cannot be encoded with mode '+t.toString(w)+`.
 Suggested mode is: `+t.toString(p));switch(w===t.KANJI&&!l.isKanjiModeEnabled()&&(w=t.BYTE),w){case t.NUMERIC:return new i(d);case t.ALPHANUMERIC:return new n(d);case t.KANJI:return new r(d);case t.BYTE:return new o(d)}}e.fromArray=function(m){return m.reduce(function(w,p){return typeof p=="string"?w.push(h(p,null)):p.data&&w.push(h(p.data,p.mode)),w},[])},e.fromString=function(m,w){const p=_(m,l.isKanjiModeEnabled()),E=C(p),b=u(E,w),v=a.find_path(b.map,"start","end"),N=[];for(let S=1;S<v.length-1;S++)N.push(b.table[v[S]].node);return e.fromArray(g(N))},e.rawSplit=function(m){return e.fromArray(_(m,l.isKanjiModeEnabled()))}})(kt);const tt=T,lt=W,be=ne,Ae=re,ve=Tt,Ie=Mt,gt=Pt,ht=X,Ne=ie,Z=Lt,Te=Dt,Me=D,ut=kt;function Pe(e,t){const i=e.size,n=Ie.getPositions(t);for(let o=0;o<n.length;o++){const r=n[o][0],s=n[o][1];for(let l=-1;l<=7;l++)if(!(r+l<=-1||i<=r+l))for(let a=-1;a<=7;a++)s+a<=-1||i<=s+a||(l>=0&&l<=6&&(a===0||a===6)||a>=0&&a<=6&&(l===0||l===6)||l>=2&&l<=4&&a>=2&&a<=4?e.set(r+l,s+a,!0,!0):e.set(r+l,s+a,!1,!0))}}function Se(e){const t=e.size;for(let i=8;i<t-8;i++){const n=i%2===0;e.set(i,6,n,!0),e.set(6,i,n,!0)}}function Re(e,t){const i=ve.getPositions(t);for(let n=0;n<i.length;n++){const o=i[n][0],r=i[n][1];for(let s=-2;s<=2;s++)for(let l=-2;l<=2;l++)s===-2||s===2||l===-2||l===2||s===0&&l===0?e.set(o+s,r+l,!0,!0):e.set(o+s,r+l,!1,!0)}}function Le(e,t){const i=e.size,n=Z.getEncodedBits(t);let o,r,s;for(let l=0;l<18;l++)o=Math.floor(l/3),r=l%3+i-8-3,s=(n>>l&1)===1,e.set(o,r,s,!0),e.set(r,o,s,!0)}function ct(e,t,i){const n=e.size,o=Te.getEncodedBits(t,i);let r,s;for(r=0;r<15;r++)s=(o>>r&1)===1,r<6?e.set(r,8,s,!0):r<8?e.set(r+1,8,s,!0):e.set(n-15+r,8,s,!0),r<8?e.set(8,n-r-1,s,!0):r<9?e.set(8,15-r-1+1,s,!0):e.set(8,15-r-1,s,!0);e.set(n-8,8,1,!0)}function Ue(e,t){const i=e.size;let n=-1,o=i-1,r=7,s=0;for(let l=i-1;l>0;l-=2)for(l===6&&l--;;){for(let a=0;a<2;a++)if(!e.isReserved(o,l-a)){let c=!1;s<t.length&&(c=(t[s]>>>r&1)===1),e.set(o,l-a,c),r--,r===-1&&(s++,r=7)}if(o+=n,o<0||i<=o){o-=n,n=-n;break}}}function De(e,t,i){const n=new be;i.forEach(function(a){n.put(a.mode.bit,4),n.put(a.getLength(),Me.getCharCountIndicator(a.mode,e)),a.write(n)});const o=tt.getSymbolTotalCodewords(e),r=ht.getTotalCodewordsCount(e,t),s=(o-r)*8;for(n.getLengthInBits()+4<=s&&n.put(0,4);n.getLengthInBits()%8!==0;)n.putBit(0);const l=(s-n.getLengthInBits())/8;for(let a=0;a<l;a++)n.put(a%2?17:236,8);return Fe(n,e,t)}function Fe(e,t,i){const n=tt.getSymbolTotalCodewords(t),o=ht.getTotalCodewordsCount(t,i),r=n-o,s=ht.getBlocksCount(t,i),l=n%s,a=s-l,c=Math.floor(n/s),f=Math.floor(r/s),_=f+1,y=c-f,g=new Ne(y);let C=0;const u=new Array(s),h=new Array(s);let d=0;const m=new Uint8Array(e.buffer);for(let v=0;v<s;v++){const N=v<a?f:_;u[v]=m.slice(C,C+N),h[v]=g.encode(u[v]),C+=N,d=Math.max(d,N)}const w=new Uint8Array(n);let p=0,E,b;for(E=0;E<d;E++)for(b=0;b<s;b++)E<u[b].length&&(w[p++]=u[b][E]);for(E=0;E<y;E++)for(b=0;b<s;b++)w[p++]=h[b][E];return w}function ke(e,t,i,n){let o;if(Array.isArray(e))o=ut.fromArray(e);else if(typeof e=="string"){let c=t;if(!c){const f=ut.rawSplit(e);c=Z.getBestVersionForData(f,i)}o=ut.fromString(e,c||40)}else throw new Error("Invalid data");const r=Z.getBestVersionForData(o,i);if(!r)throw new Error("The amount of data is too big to be stored in a QR Code");if(!t)t=r;else if(t<r)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+r+`.
`);const s=De(t,i,o),l=tt.getSymbolSize(t),a=new Ae(l);return Pe(a,t),Se(a),Re(a,t),ct(a,i,0),t>=7&&Le(a,t),Ue(a,s),isNaN(n)&&(n=gt.getBestMask(a,ct.bind(null,a,i))),gt.applyMask(n,a),ct(a,i,n),{modules:a,version:t,errorCorrectionLevel:i,maskPattern:n,segments:o}}It.create=function(t,i){if(typeof t>"u"||t==="")throw new Error("No input text");let n=lt.M,o,r;return typeof i<"u"&&(n=lt.from(i.errorCorrectionLevel,lt.M),o=Z.from(i.version),r=gt.from(i.maskPattern),i.toSJISFunc&&tt.setToSJISFunction(i.toSJISFunc)),ke(t,o,n,r)};var $t={},Ct={};(function(e){function t(i){if(typeof i=="number"&&(i=i.toString()),typeof i!="string")throw new Error("Color should be defined as hex string");let n=i.slice().replace("#","").split("");if(n.length<3||n.length===5||n.length>8)throw new Error("Invalid hex color: "+i);(n.length===3||n.length===4)&&(n=Array.prototype.concat.apply([],n.map(function(r){return[r,r]}))),n.length===6&&n.push("F","F");const o=parseInt(n.join(""),16);return{r:o>>24&255,g:o>>16&255,b:o>>8&255,a:o&255,hex:"#"+n.slice(0,6).join("")}}e.getOptions=function(n){n||(n={}),n.color||(n.color={});const o=typeof n.margin>"u"||n.margin===null||n.margin<0?4:n.margin,r=n.width&&n.width>=21?n.width:void 0,s=n.scale||4;return{width:r,scale:r?4:s,margin:o,color:{dark:t(n.color.dark||"#000000ff"),light:t(n.color.light||"#ffffffff")},type:n.type,rendererOpts:n.rendererOpts||{}}},e.getScale=function(n,o){return o.width&&o.width>=n+o.margin*2?o.width/(n+o.margin*2):o.scale},e.getImageWidth=function(n,o){const r=e.getScale(n,o);return Math.floor((n+o.margin*2)*r)},e.qrToImageData=function(n,o,r){const s=o.modules.size,l=o.modules.data,a=e.getScale(s,r),c=Math.floor((s+r.margin*2)*a),f=r.margin*a,_=[r.color.light,r.color.dark];for(let y=0;y<c;y++)for(let g=0;g<c;g++){let C=(y*c+g)*4,u=r.color.light;if(y>=f&&g>=f&&y<c-f&&g<c-f){const h=Math.floor((y-f)/a),d=Math.floor((g-f)/a);u=_[l[h*s+d]?1:0]}n[C++]=u.r,n[C++]=u.g,n[C++]=u.b,n[C]=u.a}}})(Ct);(function(e){const t=Ct;function i(o,r,s){o.clearRect(0,0,r.width,r.height),r.style||(r.style={}),r.height=s,r.width=s,r.style.height=s+"px",r.style.width=s+"px"}function n(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}e.render=function(r,s,l){let a=l,c=s;typeof a>"u"&&(!s||!s.getContext)&&(a=s,s=void 0),s||(c=n()),a=t.getOptions(a);const f=t.getImageWidth(r.modules.size,a),_=c.getContext("2d"),y=_.createImageData(f,f);return t.qrToImageData(y.data,r,a),i(_,c,f),_.putImageData(y,0,0),c},e.renderToDataURL=function(r,s,l){let a=l;typeof a>"u"&&(!s||!s.getContext)&&(a=s,s=void 0),a||(a={});const c=e.render(r,s,a),f=a.type||"image/png",_=a.rendererOpts||{};return c.toDataURL(f,_.quality)}})($t);var Vt={};const ze=Ct;function vt(e,t){const i=e.a/255,n=t+'="'+e.hex+'"';return i<1?n+" "+t+'-opacity="'+i.toFixed(2).slice(1)+'"':n}function ft(e,t,i){let n=e+t;return typeof i<"u"&&(n+=" "+i),n}function $e(e,t,i){let n="",o=0,r=!1,s=0;for(let l=0;l<e.length;l++){const a=Math.floor(l%t),c=Math.floor(l/t);!a&&!r&&(r=!0),e[l]?(s++,l>0&&a>0&&e[l-1]||(n+=r?ft("M",a+i,.5+c+i):ft("m",o,0),o=0,r=!1),a+1<t&&e[l+1]||(n+=ft("h",s),s=0)):o++}return n}Vt.render=function(t,i,n){const o=ze.getOptions(i),r=t.modules.size,s=t.modules.data,l=r+o.margin*2,a=o.color.light.a?"<path "+vt(o.color.light,"fill")+' d="M0 0h'+l+"v"+l+'H0z"/>':"",c="<path "+vt(o.color.dark,"stroke")+' d="'+$e(s,r,o.margin)+'"/>',f='viewBox="0 0 '+l+" "+l+'"',_=o.width?'width="'+o.width+'" height="'+o.width+'" ':"",y='<svg xmlns="http://www.w3.org/2000/svg" '+_+f+' shape-rendering="crispEdges">'+a+c+`</svg>
`;return typeof n=="function"&&n(null,y),y};const Ve=te,mt=It,Ht=$t,He=Vt;function Et(e,t,i,n,o){const r=[].slice.call(arguments,1),s=r.length,l=typeof r[s-1]=="function";if(!l&&!Ve())throw new Error("Callback required as last argument");if(l){if(s<2)throw new Error("Too few arguments provided");s===2?(o=i,i=t,t=n=void 0):s===3&&(t.getContext&&typeof o>"u"?(o=n,n=void 0):(o=n,n=i,i=t,t=void 0))}else{if(s<1)throw new Error("Too few arguments provided");return s===1?(i=t,t=n=void 0):s===2&&!t.getContext&&(n=i,i=t,t=void 0),new Promise(function(a,c){try{const f=mt.create(i,n);a(e(f,t,n))}catch(f){c(f)}})}try{const a=mt.create(i,n);o(null,e(a,t,n))}catch(a){o(a)}}Y.create=mt.create;Y.toCanvas=Et.bind(null,Ht.render);Y.toDataURL=Et.bind(null,Ht.renderToDataURL);Y.toString=Et.bind(null,function(e,t,i){return He.render(e,i)});const Ke={key:0},Je={style:{"margin-top":"-20px","font-size":"90%"}},Ye=["title"],je=["src"],qe={style:{"margin-top":"10px","font-size":"90%"}},Oe=Kt({__name:"profile",setup(e){const{t}=Jt(),i=Yt(),n=q({password:"",confirm_password:"",real_name:"",email:"",department:"",theme:"dark",is_mfa:0,mfa_code:0,mfa_secret:""});jt(n,u=>{o.value=!!u.is_mfa});const o=q(!!n.value.is_mfa),r=q(null),s=q(null),l=async()=>{try{const{data:u}=await Wt();if(u&&u.payload&&u.payload.qrCodeUrl&&u.payload.secret){const h=await Y.toDataURL(u.payload.qrCodeUrl);r.value=h,s.value=u.payload.secret}else console.error("API does not return correct QR code URL and 2FA")}catch(u){console.error("An error occurred while obtaining secret and QR code information:",u)}},a=async u=>{n.value.is_mfa=u?1:0,u?await l():(r.value=null,s.value=null)},c=async u=>{var h;try{const d=await xt(u,s.value),{payload:m}=d.data;m==="Valid 2FA passcode"?(n.value.mfa_secret=(h=s.value)!=null?h:n.value.mfa_secret,st.success(t("user.form.valid.maf_success"))):st.warn(t("user.form.valid.mfa_error"))}catch{st.error(t("user.form.valid.mfa_error"))}},f=u=>{localStorage.setItem("theme",u),location.reload()},_=async(u,h)=>/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/.test(h)?h!==n.value.password&&h!==""?Promise.reject("\u8F93\u5165\u7684\u5BC6\u7801\u4E0D\u4E00\u81F4"):Promise.resolve():Promise.reject(t("user.form.valid.password")),{regExpPassword:y}=_t(),{regExpMfaCode:g}=_t(),C={password:[{validator:y,trigger:"blur",required:!0}],confirm_password:[{trigger:"blur",message:"\u8BF7\u786E\u8BA4\u5BC6\u7801",required:!0},{required:!0,validator:_,trigger:"blur"}],mfa_code:[{validator:g,trigger:"blur",required:!0},{validator:async(u,h,d)=>{try{await g(u,h),c(h),d()}catch{d(new Error("Validation failed"))}},trigger:"blur",required:!0}]};return qt(async()=>{const{data:u}=await Zt();n.value=u.payload,n.value.is_mfa&&a(!0),localStorage.getItem("theme")===null?n.value.theme="dark":n.value.theme=localStorage.getItem("theme"),localStorage.getItem("lang")===null?n.value.lang="zh_CN":n.value.lang=localStorage.getItem("lang")}),(u,h)=>{const d=P("a-input"),m=P("a-form-item"),w=P("a-select-option"),p=P("a-select"),E=P("a-input-password"),b=P("a-switch"),v=P("a-button"),N=P("a-form"),S=P("a-col"),M=P("a-row"),F=P("a-card");return et(),nt(Ot,null,[B(Gt,{title:u.$t("common.profile.title"),"sub-title":u.$t("common.profile.subtitle")},null,8,["title","sub-title"]),B(F,null,{default:I(()=>[B(M,{type:"flex",justify:"center",align:"middle"},{default:I(()=>[B(S,{span:10},{default:I(()=>[B(N,{ref:"formRef",model:n.value,layout:"vertical",rules:C},{default:I(()=>[B(m,{label:u.$t("user.form.user")},{default:I(()=>[B(d,{value:rt(i).state.user.account.user,"onUpdate:value":h[0]||(h[0]=A=>rt(i).state.user.account.user=A),disabled:""},null,8,["value"])]),_:1},8,["label"]),B(m,{label:u.$t("user.form.dept")},{default:I(()=>[B(d,{value:n.value.department,"onUpdate:value":h[1]||(h[1]=A=>n.value.department=A)},null,8,["value"])]),_:1},8,["label"]),B(m,{label:u.$t("user.form.real_name")},{default:I(()=>[B(d,{value:n.value.real_name,"onUpdate:value":h[2]||(h[2]=A=>n.value.real_name=A)},null,8,["value"])]),_:1},8,["label"]),B(m,{label:u.$t("user.form.email")},{default:I(()=>[B(d,{value:n.value.email,"onUpdate:value":h[3]||(h[3]=A=>n.value.email=A)},null,8,["value"])]),_:1},8,["label"]),B(m,{label:u.$t("common.theme")},{default:I(()=>[B(p,{value:n.value.theme,"onUpdate:value":h[4]||(h[4]=A=>n.value.theme=A),onChange:f},{default:I(()=>[B(w,{key:"dark",value:"dark"},{default:I(()=>[ot(H(u.$t("common.theme.dark")),1)]),_:1}),B(w,{key:"light",value:"light"},{default:I(()=>[ot(H(u.$t("common.theme.light")),1)]),_:1})]),_:1},8,["value"])]),_:1},8,["label"]),B(m,{label:u.$t("user.password.new"),name:"password"},{default:I(()=>[B(E,{value:n.value.password,"onUpdate:value":h[5]||(h[5]=A=>n.value.password=A)},null,8,["value"])]),_:1},8,["label"]),B(m,{label:u.$t("user.password.confirm"),name:"confirm_password"},{default:I(()=>[B(E,{value:n.value.confirm_password,"onUpdate:value":h[6]||(h[6]=A=>n.value.confirm_password=A)},null,8,["value"])]),_:1},8,["label"]),B(m,{label:u.$t("user.form.mfa_auth"),name:"mfa_auth"},{default:I(()=>[B(b,{id:"mfa-switch",checked:o.value,"onUpdate:checked":h[7]||(h[7]=A=>o.value=A),onChange:a},null,8,["checked"])]),_:1},8,["label"]),o.value?(et(),nt("div",Ke,[it("div",Je,H(u.$t("user.form.mfa")),1),it("div",{style:{cursor:"pointer",display:"flex","justify-content":"center","margin-top":"10px"},title:u.$t("user.form.mfa_refresh_qrcode")},[r.value?(et(),nt("img",{key:0,src:r.value,alt:"qrcode",style:{width:"200px",height:"200px"},onClick:l},null,8,je)):Bt("v-if",!0)],8,Ye),it("div",qe,"Secret: "+H(s.value),1),B(m,{label:u.$t("user.form.mfa_input"),name:"mfa_code"},{default:I(()=>[B(d,{value:n.value.mfa_code,"onUpdate:value":h[8]||(h[8]=A=>n.value.mfa_code=A),style:{"margin-top":"-5px"},placeholder:u.$t("user.form.mfa_prompt")},null,8,["value","placeholder"])]),_:1},8,["label"])])):Bt("v-if",!0),B(m,null,{default:I(()=>[B(v,{block:"",type:"primary",onClick:h[9]||(h[9]=()=>rt(Xt)(n.value,!1))},{default:I(()=>[ot(H(u.$t("common.save")),1)]),_:1})]),_:1})]),_:1},8,["model"])]),_:1})]),_:1})]),_:1})],64)}}}),Xe=Qt(Oe,[["__file","F:/inf/Yearning/gemini-next/src/views/home/profile.vue"]]);export{Xe as default};
