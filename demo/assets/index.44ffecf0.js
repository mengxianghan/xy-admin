var k=(i,l,e)=>new Promise((a,u)=>{var m=t=>{try{n(e.next(t))}catch(d){u(d)}},c=t=>{try{n(e.throw(t))}catch(d){u(d)}},n=t=>t.done?a(t.value):Promise.resolve(t.value).then(m,c);n((e=e.apply(i,l)).next())});import{_ as E,r as x,q as I,s as C,h as r,o as h,d as y,e as o,w as s,F as g,i as _,y as L,z as b,M,m as N}from"./index.d310c45b.js";import{u as P}from"./usePagination.209fa131.js";import V from"./Edit.7be294f5.js";import"./tinymce.44d39310.js";import"./echarts.8bcd3921.js";import"./useModal.a18932ea.js";import"./useForm.adf1d994.js";const B={name:"systemRole",components:{Edit:V},setup(){const i=x([{title:"#",key:"no",width:60,align:"center"},{title:"\u540D\u79F0",dataIndex:"name"},{title:"\u522B\u540D",dataIndex:"alias"},{title:"\u6392\u5E8F",dataIndex:"sort",width:80},{title:"\u64CD\u4F5C",key:"action",width:160}]),{list:l,loading:e}=P(),a=x();I(()=>{u()});function u(){return k(this,null,function*(){e.value=!0;const{code:c,data:n}=yield C.system.getUserRoleList().catch(()=>{e.value=!1});if(e.value=!1,c===200){const{rows:t}=n;l.value=t}})}function m({id:c}){M.confirm({title:"\u5220\u9664\u63D0\u793A",content:"\u786E\u8BA4\u5220\u9664\uFF1F",onOk:()=>k(this,null,function*(){e.value=!0;const{code:n}=yield C.common.deleteData({id:c}).catch(()=>{e.value=!1});n===200?(N.success("\u5220\u9664\u6210\u529F"),yield getPageList()):e.value=!1})})}return{columns:i,list:l,loading:e,editRef:a,handleDelete:m}}},F=_(" \u65B0\u5EFA\u89D2\u8272 "),U=_("\u67E5\u770B"),q=_("\u7F16\u8F91"),z=_("\u5220\u9664");function O(i,l,e,a,u,m){const c=r("icon-plus-outlined"),n=r("a-button"),t=r("x-action-bar"),d=r("x-action-button"),w=r("a-table"),R=r("a-card"),$=r("edit");return h(),y(g,null,[o(R,null,{default:s(()=>[o(t,{class:"mb-8-2"},{default:s(()=>[o(n,{type:"primary",onClick:l[0]||(l[0]=f=>i.$refs.editRef.handleCreate())},{icon:s(()=>[o(c)]),default:s(()=>[F]),_:1})]),_:1}),o(w,{columns:a.columns,"data-source":a.list,loading:a.loading,pagination:!1,"expand-icon-column-index":1},{bodyCell:s(({column:f,record:p,index:D})=>[f.key==="no"?(h(),y(g,{key:0},[_(L(D+1),1)],64)):b("",!0),f.key==="action"?(h(),y(g,{key:1},[o(d,{onClick:v=>i.$refs.editRef.handlePreview(p)},{default:s(()=>[U]),_:2},1032,["onClick"]),o(d,{onClick:v=>i.$refs.editRef.handleEdit(p)},{default:s(()=>[q]),_:2},1032,["onClick"]),o(d,{onClick:v=>a.handleDelete(p)},{default:s(()=>[z]),_:2},1032,["onClick"])],64)):b("",!0)]),_:1},8,["columns","data-source","loading"])]),_:1}),o($,{ref:"editRef"},null,512)],64)}var Q=E(B,[["render",O]]);export{Q as default};
