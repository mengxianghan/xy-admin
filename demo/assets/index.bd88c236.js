import{_ as k,f as v,G as b,r as h,o as T,H as x,h as c,i as R,d as M,e,w as t,j as d,l as O,s as Y}from"./index.15d75692.js";import"./tinymce.b4091e4a.js";import"./echarts.cbe68697.js";const w={name:"otherMultiTab",setup(){const i=v(),{reload:s,close:m,closeOther:l,setTitle:r}=b(),u=h(""),a=h("\u81EA\u5B9A\u4E49\u540D\u79F0");T(()=>{u.value=x().format("YYYY-MM-DD HH:mm:ss")});function n(){i.push({name:"welcome"})}function o(){s()}function _(){m()}function f(){l()}function p(){r(a.value)}function C(){r(i.currentRoute.value.meta.title)}return{date:u,title:a,handleOpen:n,handleReload:o,handleClose:_,handleCloseOther:f,handleSetTitle:p,handleRevertTitle:C}}};function B(i,s,m,l,r,u){const a=c("a-button"),n=c("a-space"),o=c("a-card"),_=c("a-input");return R(),M("div",null,[e(o,{bordered:!1,title:"\u6253\u5F00"},{default:t(()=>[e(n,null,{default:t(()=>[e(a,{onClick:l.handleOpen},{default:t(()=>[d("\u6253\u5F00\u6B22\u8FCE\u9875")]),_:1},8,["onClick"])]),_:1})]),_:1}),e(o,{bordered:!1,title:"\u5237\u65B0",class:"mt-8-2"},{default:t(()=>[e(n,null,{default:t(()=>[e(a,{onClick:l.handleReload},{default:t(()=>[d("\u5237\u65B0\u5F53\u524D")]),_:1},8,["onClick"]),O("span",null,Y(l.date),1)]),_:1})]),_:1}),e(o,{bordered:!1,title:"\u5173\u95ED",class:"mt-8-2"},{default:t(()=>[e(n,null,{default:t(()=>[e(a,{onClick:l.handleClose},{default:t(()=>[d("\u5173\u95ED\u5F53\u524D")]),_:1},8,["onClick"]),e(a,{onClick:l.handleCloseOther},{default:t(()=>[d("\u5173\u95ED\u5176\u4ED6")]),_:1},8,["onClick"])]),_:1})]),_:1}),e(o,{bordered:!1,title:"\u8BBE\u7F6E",class:"mt-8-2"},{default:t(()=>[e(n,null,{default:t(()=>[e(_,{value:l.title,"onUpdate:value":s[0]||(s[0]=f=>l.title=f)},null,8,["value"]),e(a,{onClick:l.handleSetTitle},{default:t(()=>[d("\u8BBE\u7F6E\u6807\u9898")]),_:1},8,["onClick"]),e(a,{onClick:l.handleRevertTitle},{default:t(()=>[d("\u8FD8\u539F")]),_:1},8,["onClick"])]),_:1})]),_:1})])}const S=k(w,[["render",B]]);export{S as default};
