import{J as k,K as M,d as y,i as x,n as C,_ as h,f as B,b as S,o as q,h as _,j as L,k as l,w as p,F as O,y as v}from"./index.66cc4c36.js";import{C as D}from"./index.bcb7ed0f.js";import{O as I}from"./orderTable.0d922f9d.js";import K from"./list.5e54609f.js";import"./index.187d93a7.js";import"./editor.cc3642af.js";import"./index.d3546514.js";import"./common.b6c75224.js";import"./fetch.355e1957.js";import"./source.09d3a396.js";import"./query.116a3d4d.js";import"./pageHeader.9328b4bb.js";function N(){return k.get(`${M}/record/axis`)}var b={exports:{}},z=[],d=[],R="insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).";function w(t,n){if(n=n||{},t===void 0)throw new Error(R);var r=n.prepend===!0?"prepend":"append",a=n.container!==void 0?n.container:document.querySelector("head"),s=z.indexOf(a);s===-1&&(s=z.push(a)-1,d[s]={});var e;return d[s]!==void 0&&d[s][r]!==void 0?e=d[s][r]:(e=d[s][r]=Y(),r==="prepend"?a.insertBefore(e,a.childNodes[0]):a.appendChild(e)),t.charCodeAt(0)===65279&&(t=t.substr(1,t.length)),e.styleSheet?e.styleSheet.cssText+=t:e.textContent+=t,e}function Y(){var t=document.createElement("style");return t.setAttribute("type","text/css"),t}b.exports=w;b.exports.insertCss=w;const j=y({__name:"order",setup(t){return(n,r)=>(x(),C(I,{size:"small","disabled-btn":""}))}}),A=h(j,[["__file","F:/inf/Yearning/gemini-next/src/views/record/order.vue"]]),H=y({__name:"query",setup(t){return(n,r)=>(x(),C(K,{"is-record":"",size:"small"}))}}),U=h(H,[["__file","F:/inf/Yearning/gemini-next/src/views/record/query.vue"]]),V=v("div",{id:"app-container"},[v("div",{id:"g2-customize-tooltip"}),v("div",{id:"g2-container"})],-1),J=y({__name:"record",setup(t){const{t:n}=B(),r={title:n("record.title"),subTitle:""},a=S("order");b.exports(`
#app-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

#g2-container {
  flex: auto;
}

#g2-customize-tooltip {
  margin-bottom: 16px;
  font-size: 12px;
}


#g2-customize-tooltip .tooltip-title {
  
}

#g2-customize-tooltip .tooltip-items {
  display: flex;
  flex-direction: row;
}

#g2-customize-tooltip .tooltip-item {
  flex-basis: 240px;
  padding-left: 8px;
  margin-right: 12px;
}

#g2-customize-tooltip .tooltip-item .tooltip-item-value {
  font-size: 16px;
  font-weight: bold;
}



#g2-customize-tooltip .tooltip-item-info {
  display: flex;
  justify-content: space-between;
}

#g2-customize-tooltip .tooltip-item-info .info-item {
  display: flex;
}

#g2-customize-tooltip .tooltip-item-info .info-item .info-item-name {
  opacity: 0.65;
}

#g2-customize-tooltip .tooltip-item-info .info-item .info-item-value {
  margin-left: 8px;
}
`);const s=(e,m)=>{const o=new D({container:"g2-container",autoFit:!0,height:300});o.data(m),o.scale({count:{nice:!0},type:{formatter:i=>{if(i==="0")return"DDL";if(i==="1")return"DML"}}}),o.tooltip({showCrosshairs:!0,shared:!0}),o.axis("count",{label:{formatter:i=>i+" /per"},grid:{line:{style:{opacity:0}}}}),o.line().position("time*count").color("type").shape("smooth"),o.point().position("time*count").color("type").shape("circle");const u=document.getElementById("g2-customize-tooltip");function f(i){const{title:c,items:$}=i;return`
                  <div class="tooltip-title">${c}</div>
                  <div class="tooltip-items">
                  ${$.map(g=>{const F=g.color,E=g.name,T=g.value;return`
                        <div class="tooltip-item" style="border-left: 2px solid ${F}">
                        <div class="tooltip-item-name">${E}</div>
                        <div class="tooltip-item-value">${T} /per</div>
                       
                        </div>
        `}).join("")}
    </div>
  `}o.on("afterrender",()=>{const c={title:"0000-00-00",items:[{color:"#5B8FF9",name:"DML",value:"0"}]};u.innerHTML=f(c)}),o.on("tooltip:change",i=>{u.innerHTML=f(i.data)}),o.render()};return q(async()=>{const{data:e}=await N();s("container",e.payload)}),(e,m)=>{const o=_("a-tab-pane"),u=_("a-tabs"),f=_("a-page-header"),i=_("a-back-top");return x(),L(O,null,[l(f,{title:r.title,ghost:!1,"sub-title":r.subTitle},{footer:p(()=>[l(u,{activeKey:a.value,"onUpdate:activeKey":m[0]||(m[0]=c=>a.value=c),size:"small"},{default:p(()=>[l(o,{key:"order",tab:e.$t("common.order")},{default:p(()=>[l(A)]),_:1},8,["tab"]),l(o,{key:"query",tab:e.$t("common.query")},{default:p(()=>[l(U)]),_:1},8,["tab"])]),_:1},8,["activeKey"])]),default:p(()=>[V]),_:1},8,["title","sub-title"]),l(i)],64)}}}),se=h(J,[["__file","F:/inf/Yearning/gemini-next/src/views/record/record.vue"]]);export{se as default};
