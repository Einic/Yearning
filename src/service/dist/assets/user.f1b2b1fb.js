import{J as s,K as r}from"./index.66cc4c36.js";function u(e){return s({url:e.isManager?`${r}/manage/user?tp=password`:`${r}/common/edit?tp=password`,method:e.isManager?"POST":"PUT",data:{password:e.password.password,origin:e.password.origin,username:e.username}})}function p(e){return s.get(`${r}/fetch/groups`,{params:{user:e}})}function i(e,t){return s.post(`${r}/manage/user?tp=policy`,{group:e,username:t})}function c(e){return s.delete(`${r}/manage/user`,{params:{user:e}})}function d(){return s.get(`${r}/fetch/userinfo`)}function f(){return s.get(`${r}/otp/usermfa`)}async function g(e,t){try{const n=parseInt(e);if(isNaN(n))throw new Error("Invalid passcode format. Please enter a number.");return await s.post(`${r}/otp/validate`,{Passcode:n,mfa_secret:t})}catch(n){throw n}}function m(e){return s.put(`${r}/manage/user`,e)}function U(e,t){return s.post(t?`${r}/manage/user?tp=edit`:`${r}/common/edit?tp=edit`,e)}function $(){return s.post(`${r}/manage/user?tp=principal`)}function w(e,t){return s.post(t?`${r}/manage/user?tp=add`:"/register",e)}export{f as a,p as b,i as c,m as d,c as e,u as f,d as g,$ as h,g as p,w as s,U as u};
