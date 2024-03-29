import{d as h,u as V,a as B,f as G,e as D,r as O,h as f,i as b,j as N,y as t,k as e,w as o,t as n,F as S,L as q,M as z,N as C,_ as Y,b as _,o as T,z as k,l as M,n as X,m as l,p as Z,A as L,v as U,x as j}from"./index.66cc4c36.js";import{_ as R,S as W,A as H,a as x}from"./announce.89061fc5.js";import{C as y}from"./common.b6c75224.js";import{V as J,C as K}from"./vars.a08ea0cc.js";import{R as Q}from"./registerForm.0724201b.js";import{E as $}from"./index.187d93a7.js";import"./user.f1b2b1fb.js";const ee="data:image/png;base64,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",te={href:"/#/login"},oe=["title"],Ae=t("br",null,null,-1),ae={style:{"text-align":"center","font-size":"90%","margin-top":"3px"}},se=t("div",{style:{margin:"auto 38%"}},[t("img",{src:ee,width:"104",height:"174",style:{opacity:"0.5","margin-top":"3px"}})],-1),ne={style:{"text-align":"center","font-size":"90%","margin-top":"6px"}},re=h({__name:"mfa-form",setup(c){const{regExpMfaCode:P}=y(),u=V();B();const{t:p}=G(),v=D.currentRoute.value.query.username,d=D.currentRoute.value.query.password,m=O({username:v,password:d,is_ldap:!1,is_oidc:!1,is_mfa:!0,mfa_code:""}),a=async s=>{m.mfa_code=s;const r=q(m),{data:A}=await z(r);A.code!==1301&&A.payload.mfa_account===!0&&(C.success(p("user.form.valid.maf_login_success")),u.commit("user/USER_STORE",A.payload),u.commit("menu/CHANGE_SELECTED",["/home"]),D.replace("/home"))},i={mfa_code:[{validator:P,trigger:"blur",required:!0},{validator:async(s,r,A)=>{try{await P(s,r),a(r),A()}catch{A(new Error("Validation failed"))}},trigger:"blur",required:!0}]};return(s,r)=>{const A=f("a-input"),g=f("a-form-item"),E=f("a-form");return b(),N(S,null,[t("a",te,[t("img",{src:R,width:"350",style:{"margin-top":"-30%",cursor:"pointer"},title:s.$t("user.form.mfa_to_login")},null,8,oe)]),Ae,e(E,{ref:"formRef",model:m,layout:"vertical",rules:i},{default:o(()=>[t("div",null,[t("p",ae,n(s.$t("user.form.mfa_operate_top")),1)]),se,t("div",ne,[t("p",null,n(s.$t("user.form.mfa_operate_bot")),1)]),e(g,{label:s.$t("user.form.mfa_input"),name:"mfa_code"},{default:o(()=>[e(A,{value:m.mfa_code,"onUpdate:value":r[0]||(r[0]=w=>m.mfa_code=w),style:{"margin-top":"3px"},placeholder:s.$t("user.form.mfa_prompt")},null,8,["value","placeholder"])]),_:1},8,["label"])]),_:1},8,["model"])],64)}}}),fe=Y(re,[["__file","F:/inf/Yearning/gemini-next/src/views/login/mfa-form.vue"]]),ie=c=>(U("data-v-18d82aa6"),c=c(),j(),c),le={style:{"margin-left":"2%"}},de={class:"fff"},me=ie(()=>t("video",{id:"v1",autoplay:"",loop:"",muted:""},[t("source",{src:x,type:"video/mp4"})],-1)),ce={class:"mfa_container"},Pe={class:"footer"},ue={style:{"text-align":"center"}},pe={style:{"text-align":"center"}},ge=h({__name:"mfa",setup(c){const P=_(!1),u=_(),p=_(),v=_(),{is_open:d}=y(),m=()=>{u.value.open()};return T(async()=>{const{data:a}=await k();P.value=a.payload.reg,$.on("closeState",()=>{d.value=!1})}),(a,i)=>{const s=f("a-button"),r=f("a-space"),A=f("a-typography-link"),g=f("a-tooltip"),E=f("a-col"),w=f("a-row"),I=f("a-modal");return b(),N("div",null,[t("div",le,[e(r,null,{default:o(()=>[t("span",de,n(M(J)),1),P.value?(b(),X(s,{key:0,type:"dashed",ghost:"",size:"small",onClick:i[0]||(i[0]=F=>d.value=!0)},{default:o(()=>[l(n(a.$t("user.form.title")),1)]),_:1})):Z("v-if",!0)]),_:1})]),me,t("div",ce,[e(fe)]),t("div",Pe,[e(w,null,{default:o(()=>[e(E,{span:24},{default:o(()=>[t("div",ue,[e(r,{size:"large"},{default:o(()=>[e(A,{href:"https://yearning.io",target:"_blank",style:{color:"#ffffff"}},{default:o(()=>[l(n(a.$t("common.about")),1)]),_:1}),e(g,null,{title:o(()=>[l(n(a.$t("common.qq")),1)]),default:o(()=>[l(" "+n(a.$t("common.community")),1)]),_:1}),e(A,{style:{color:"#ffffff"},onClick:m},{default:o(()=>[l(n(a.$t("common.sponsor")),1)]),_:1}),e(A,{href:"https://www.infvie.com",target:"_blank",style:{color:"#ffffff"}},{default:o(()=>[l(n(a.$t("common.custom_dev")),1)]),_:1}),e(A,{style:{color:"#ffffff"},onClick:i[1]||(i[1]=F=>p.value.open())},{default:o(()=>[l(n(a.$t("common.statement")),1)]),_:1}),e(A,{href:"https://www.gnu.org/licenses/agpl-3.0.en.html",target:"_blank",style:{color:"#ffffff"}},{default:o(()=>[l("AGPL3.0")]),_:1}),t("div",pe,n(M(K)),1)]),_:1})])]),_:1})]),_:1})]),e(W,{ref_key:"sponsor",ref:u},null,512),e(H,{ref_key:"announce",ref:p},null,512),e(I,{visible:M(d),"onUpdate:visible":i[2]||(i[2]=F=>L(d)?d.value=F:null),title:a.$t("user.form.title")},{footer:o(()=>[]),default:o(()=>[e(Q,{ref_key:"register",ref:v},null,512)]),_:1},8,["visible","title"])])}}});const be=Y(ge,[["__scopeId","data-v-18d82aa6"],["__file","F:/inf/Yearning/gemini-next/src/views/login/mfa.vue"]]);export{be as default};
