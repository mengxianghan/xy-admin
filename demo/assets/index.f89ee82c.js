var b=(i,u,n)=>new Promise((o,_)=>{var y=s=>{try{l(n.next(s))}catch(r){_(r)}},d=s=>{try{l(n.throw(s))}catch(r){_(r)}},l=s=>s.done?o(s.value):Promise.resolve(s.value).then(y,d);l((n=n.apply(i,u)).next())});import{J as F,_ as L,r as E,o as j,D,h as a,i as p,d as g,e as t,w as e,j as c,F as v,s as h,v as f,q as M,l as q,M as J,m as O}from"./index.15d75692.js";import{u as P}from"./usePagination.33b21ff5.js";import S from"./Edit.8b51bee6.js";import"./tinymce.b4091e4a.js";import"./echarts.cbe68697.js";import"./useModal.a8ea85e1.js";import"./useForm.25159ea8.js";const z=new F([{key:"menu",value:"menu",desc:"\u83DC\u5355"},{key:"button",value:"button",desc:"\u6309\u94AE"}]),A={name:"systemMenu",components:{Edit:S},setup(){const i=E([{title:"#",key:"no",width:60,align:"center"},{title:"\u540D\u79F0",dataIndex:"name"},{title:"\u7C7B\u578B",dataIndex:"type",key:"type",width:120},{title:"\u6392\u5E8F",dataIndex:"sort",width:80},{title:"\u64CD\u4F5C",key:"action",width:240}]),{list:u,loading:n}=P(),o=E();j(()=>{_()});function _(){return b(this,null,function*(){n.value=!0;const{code:d,data:l}=yield D.system.getMenuList().catch(()=>{n.value=!1});if(n.value=!1,d===200){const{rows:s}=l;u.value=s}})}function y({id:d}){J.confirm({title:"\u5220\u9664\u63D0\u793A",content:"\u786E\u8BA4\u5220\u9664\uFF1F",onOk:()=>b(this,null,function*(){n.value=!0;const{code:l}=yield D.common.deleteData({id:d}).catch(()=>{n.value=!1});l===200?(O.success("\u5220\u9664\u6210\u529F"),yield _()):n.value=!1})})}return{menuTypeEnum:z,columns:i,list:u,loading:n,editRef:o,handleDelete:y}}};function G(i,u,n,o,_,y){const d=a("icon-plus-outlined"),l=a("a-button"),s=a("x-action-bar"),r=a("a-tag"),w=a("x-action-button"),T=a("icon-down-outlined"),x=a("a-menu-item"),R=a("a-menu"),B=a("a-dropdown"),N=a("a-table"),V=a("a-card"),I=a("edit");return p(),g(v,null,[t(V,{bordered:!1},{default:e(()=>[t(s,{class:"mb-8-2"},{default:e(()=>[t(l,{type:"primary",onClick:u[0]||(u[0]=k=>i.$refs.editRef.handleCreate())},{icon:e(()=>[t(d)]),default:e(()=>[c(" \u65B0\u5EFA\u83DC\u5355 ")]),_:1})]),_:1}),t(N,{columns:o.columns,"data-source":o.list,loading:o.loading,pagination:!1,"expand-icon-column-index":1},{bodyCell:e(({column:k,record:m,index:$})=>[k.key==="no"?(p(),g(v,{key:0},[c(h($+1),1)],64)):f("",!0),k.key==="type"?(p(),g(v,{key:1},[o.menuTypeEnum.is("menu",m.type)?(p(),M(r,{key:0,color:"processing"},{default:e(()=>[c(h(o.menuTypeEnum.getDesc(m.type)),1)]),_:2},1024)):f("",!0),o.menuTypeEnum.is("button",m.type)?(p(),M(r,{key:1,color:"success"},{default:e(()=>[c(h(o.menuTypeEnum.getDesc(m.type)),1)]),_:2},1024)):f("",!0)],64)):f("",!0),k.key==="action"?(p(),g(v,{key:2},[t(w,{onClick:C=>i.$refs.editRef.handleEdit(m)},{default:e(()=>[c("\u65B0\u5EFA\u4E0B\u7EA7")]),_:2},1032,["onClick"]),t(w,{onClick:C=>i.$refs.editRef.handleEdit(m)},{default:e(()=>[c("\u7F16\u8F91")]),_:2},1032,["onClick"]),t(w,{tag:"span"},{default:e(()=>[t(B,{trigger:["click"]},{overlay:e(()=>[t(R,null,{default:e(()=>[t(x,{onClick:C=>o.handleDelete(m)},{default:e(()=>[c("\u5220\u9664")]),_:2},1032,["onClick"]),t(x,null,{default:e(()=>[c("\u514B\u9686")]),_:1})]),_:2},1024)]),default:e(()=>[q("a",null,[c(" \u66F4\u591A "),t(T)])]),_:2},1024)]),_:2},1024)],64)):f("",!0)]),_:1},8,["columns","data-source","loading"])]),_:1}),t(I,{ref:"editRef"},null,512)],64)}const ee=L(A,[["render",G]]);export{ee as default};