var R=Object.defineProperty;var S=Object.getOwnPropertySymbols;var A=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable;var g=(t,a,o)=>a in t?R(t,a,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[a]=o,w=(t,a)=>{for(var o in a||(a={}))A.call(a,o)&&g(t,o,a[o]);if(S)for(var o of S(a))B.call(a,o)&&g(t,o,a[o]);return t};var C=(t,a,o)=>new Promise((e,c)=>{var v=l=>{try{n(o.next(l))}catch(s){c(s)}},i=l=>{try{n(o.throw(l))}catch(s){c(s)}},n=l=>l.done?e(l.value):Promise.resolve(l.value).then(v,i);n((o=o.apply(t,a)).next())});import{_ as N,r as y,h as f,i as T,q as P,w as u,e as d,x as q,D as V}from"./index.15d75692.js";import{u as j}from"./useModal.a8ea85e1.js";import{u as z}from"./useForm.25159ea8.js";import"./tinymce.b4091e4a.js";import"./echarts.cbe68697.js";const G={name:"Edit",emits:["ok"],setup(t,{emit:a}){const{modal:o,showModal:e,hideModal:c,showLoading:v,hideLoading:i}=j(),{formRecord:n,formState:l,formRef:s,rules:_,formLayout:p,resetForm:r}=z(),h=y(!1),k=y("\u53D6\u6D88");_.value={role:{required:!0,message:"\u8BF7\u9009\u62E9\u6240\u5C5E\u4E0A\u7EA7"},name:{required:!0,message:"\u8BF7\u8F93\u5165\u540D\u79F0"},alias:{required:!0,message:"\u8BF7\u8F93\u5165\u522B\u540D"},sort:{required:!0,message:"\u8BF7\u8F93\u5165\u6392\u5E8F"}};function L(){e({type:"create",title:"\u65B0\u5EFA\u89D2\u8272"})}function O(m){e({type:"edit",title:"\u7F16\u8F91\u89D2\u8272"}),l.value=q(m),n.value=m}function U(m){e({type:"preview",title:"\u67E5\u770B\u89D2\u8272"}),l.value=q(m),h.value=!0,k.value="\u5173\u95ED"}function D(){s.value.validateFields().then(m=>C(this,null,function*(){var x;v();const M=w({id:(x=l.value)==null?void 0:x.id},m);let b=null;b=yield V.common.saveData(M).catch(()=>{i()}),i(),(b==null?void 0:b.code)===200&&(c(),a("ok"))})).catch(m=>{i()})}function E(){c()}function F(){r(),h.value=!1,k.value="\u53D6\u6D88",i()}return{modal:o,formRef:s,rules:_,formState:l,formLayout:p,disabled:h,cancelText:k,handleCreate:L,handleEdit:O,handlePreview:U,handleOk:D,handleCancel:E,onAfterClose:F}}};function H(t,a,o,e,c,v){const i=f("a-cascader"),n=f("a-form-item"),l=f("a-input"),s=f("a-input-number"),_=f("a-form"),p=f("a-modal");return T(),P(p,{visible:e.modal.visible,title:e.modal.title,width:480,"confirm-loading":e.modal.confirmLoading,"after-close":e.onAfterClose,"ok-button-props":{style:{display:e.disabled?"none":""}},"cancel-text":e.cancelText,onOk:e.handleOk,onCancel:e.handleCancel},{default:u(()=>[d(_,{model:e.formState,rules:e.rules,ref:"formRef","label-col":{style:{width:"90px"}}},{default:u(()=>[d(n,{label:"\u6240\u5C5E\u4E0A\u7EA7",name:"role"},{default:u(()=>[d(i,{value:e.formState.role,"onUpdate:value":a[0]||(a[0]=r=>e.formState.role=r),disabled:e.disabled},null,8,["value","disabled"])]),_:1}),d(n,{label:"\u540D\u79F0",name:"name"},{default:u(()=>[d(l,{value:e.formState.name,"onUpdate:value":a[1]||(a[1]=r=>e.formState.name=r),disabled:e.disabled},null,8,["value","disabled"])]),_:1}),d(n,{label:"\u522B\u540D",name:"userName"},{default:u(()=>[d(l,{value:e.formState.alias,"onUpdate:value":a[2]||(a[2]=r=>e.formState.alias=r),disabled:e.disabled},null,8,["value","disabled"])]),_:1}),d(n,{label:"\u6392\u5E8F",name:"sort"},{default:u(()=>[d(s,{value:e.formState.sort,"onUpdate:value":a[3]||(a[3]=r=>e.formState.sort=r),disabled:e.disabled,min:1,precision:0},null,8,["value","disabled"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["visible","title","confirm-loading","after-close","ok-button-props","cancel-text","onOk","onCancel"])}const Y=N(G,[["render",H]]);export{Y as default};