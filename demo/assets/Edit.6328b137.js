var H=Object.defineProperty,I=Object.defineProperties;var J=Object.getOwnPropertyDescriptors;var q=Object.getOwnPropertySymbols;var K=Object.prototype.hasOwnProperty,Q=Object.prototype.propertyIsEnumerable;var V=(o,a,e)=>a in o?H(o,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[a]=e,k=(o,a)=>{for(var e in a||(a={}))K.call(a,e)&&V(o,e,a[e]);if(q)for(var e of q(a))Q.call(a,e)&&V(o,e,a[e]);return o},E=(o,a)=>I(o,J(a));var x=(o,a,e)=>new Promise((b,f)=>{var g=r=>{try{u(e.next(r))}catch(l){f(l)}},h=r=>{try{u(e.throw(r))}catch(l){f(l)}},u=r=>r.done?b(r.value):Promise.resolve(r.value).then(g,h);u((e=e.apply(o,a)).next())});import{r as L,h as v,i as W,s as X,w as _,e as i,j as t,y as F,E as M}from"./index.7b6fce2d.js";import{u as Y}from"./useModal.b84de592.js";import{u as Z}from"./useForm.98a74fe7.js";import"./tinymce.b4091e4a.js";import"./echarts.98d40a9a.js";const se={__name:"Edit",emits:["ok"],setup(o,{expose:a,emit:e}){const{modal:b,showModal:f,hideModal:g,showLoading:h,hideLoading:u}=Y(),{formRecord:r,formState:l,formRef:C,rules:U,formLayout:$,resetForm:B}=Z(),d=L(!1),y=L("\u53D6\u6D88"),N=L([]);U.value={avatar:{required:!0,message:"\u8BF7\u4E0A\u4F20\u5934\u50CF"},userName:{required:!0,message:"\u8BF7\u8F93\u5165\u767B\u5F55\u5E10\u53F7"},name:{required:!0,message:"\u8BF7\u8F93\u5165\u59D3\u540D"},role:{required:!0,message:"\u8BF7\u9009\u62E9\u6240\u5C5E\u89D2\u8272"}};function w(){return x(this,null,function*(){const{code:s,data:n}=yield M.system.getUserRoleList().catch(()=>{});s===200&&(N.value=n.rows)})}function D(){f({type:"create",title:"\u65B0\u5EFA\u7528\u6237"}),w()}function O(s){f({type:"edit",title:"\u7F16\u8F91\u7528\u6237"}),l.value=E(k({},F(s)),{role:[]}),r.value=s,w()}function j(s){f({type:"preview",title:"\u67E5\u770B\u7528\u6237"}),l.value=F(s),d.value=!0,y.value="\u5173\u95ED",w()}function A(){C.value.validateFields().then(s=>x(this,null,function*(){var m;h();const n=k({id:(m=l.value)==null?void 0:m.id},s);let p=null;p=yield M.common.saveData(n).catch(()=>{u()}),u(),(p==null?void 0:p.code)===200&&(g(),e("ok"))})).catch(s=>{u()})}function P(){g()}function S(){B(),d.value=!1,y.value="\u53D6\u6D88",u()}return a({handleCreate:D,handleEdit:O,handlePreview:j}),(s,n)=>{const p=v("x-upload-image"),m=v("a-form-item"),R=v("a-input"),T=v("a-cascader"),z=v("a-form"),G=v("a-modal");return W(),X(G,{visible:t(b).visible,title:t(b).title,width:480,"confirm-loading":t(b).confirmLoading,"after-close":S,"ok-button-props":{style:{display:d.value?"none":""}},"cancel-text":y.value,onOk:A,onCancel:P},{default:_(()=>[i(z,{ref_key:"formRef",ref:C,model:t(l),rules:t(U),"label-col":{style:{width:"90px"}}},{default:_(()=>[i(m,{label:"\u5934\u50CF",name:"avatar"},{default:_(()=>[i(p,{modelValue:t(l).avatar,"onUpdate:modelValue":n[0]||(n[0]=c=>t(l).avatar=c),disabled:d.value},null,8,["modelValue","disabled"])]),_:1}),i(m,{label:"\u767B\u5F55\u5E10\u53F7",name:"userName"},{default:_(()=>[i(R,{value:t(l).userName,"onUpdate:value":n[1]||(n[1]=c=>t(l).userName=c),disabled:d.value},null,8,["value","disabled"])]),_:1}),i(m,{label:"\u59D3\u540D",name:"name"},{default:_(()=>[i(R,{value:t(l).name,"onUpdate:value":n[2]||(n[2]=c=>t(l).name=c),disabled:d.value},null,8,["value","disabled"])]),_:1}),i(m,{label:"\u6240\u5C5E\u89D2\u8272",name:"role"},{default:_(()=>[i(T,{value:t(l).role,"onUpdate:value":n[3]||(n[3]=c=>t(l).role=c),placeholder:"",multiple:"","max-tag-count":"responsive",options:N.value,disabled:d.value,"field-names":{label:"name",value:"key",children:"children"}},null,8,["value","options","disabled"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["visible","title","confirm-loading","ok-button-props","cancel-text"])}}};export{se as default};
