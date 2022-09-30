var k=(l,i,d)=>new Promise((a,u)=>{var p=o=>{try{c(d.next(o))}catch(_){u(_)}},g=o=>{try{c(d.throw(o))}catch(_){u(_)}},c=o=>o.done?a(o.value):Promise.resolve(o.value).then(p,g);c((d=d.apply(l,i)).next())});import{_ as T,r as m,o as V,D as P,h as n,K as z,i as b,d as U,e,w as t,B as F,q as B,j as v,v as S,F as E,M as j,m as q}from"./index.15d75692.js";import{u as O}from"./usePagination.33b21ff5.js";import $ from"./Edit.3ee5641d.js";import"./tinymce.b4091e4a.js";import"./echarts.cbe68697.js";import"./useModal.a8ea85e1.js";import"./useForm.25159ea8.js";const A={name:"systemUser",components:{Edit:$},setup(){const{loading:l,pagination:i,resetPagination:d}=O(),a=m(!1),u=m([]),p=m(["0"]),g=m([{title:"ID",dataIndex:"id"},{title:"\u5934\u50CF",key:"avatar"},{title:"\u767B\u5F55\u5E10\u53F7",dataIndex:"userName"},{title:"\u59D3\u540D",dataIndex:"name"},{title:"\u6240\u5C5E\u89D2\u8272",dataIndex:"roleName"},{title:"\u52A0\u5165\u65F6\u95F4",dataIndex:"date"},{title:"\u64CD\u4F5C",key:"action",fixed:"right",width:160}]),c=m([]),o=m();V(()=>{_(),f()});function _(){return k(this,null,function*(){a.value=!0;const{code:s,data:r}=yield P.system.getUserRoleList().catch(()=>{a.value=!1});a.value=!1,s===200&&(u.value=[{name:"\u5168\u90E8",key:"0"},...r.rows])})}function f(){return k(this,null,function*(){l.value=!0;const{pageSize:s,current:r}=i,{code:L,data:R}=yield P.system.getUserPageList({pageSize:s,page:r}).catch(()=>{l.value=!1});if(l.value=!1,L===200){const{rows:y,total:D}=R;c.value=y,i.total=D}})}function C(s){!s.length||(p.value=s,d(),f())}function w({id:s}){j.confirm({title:"\u5220\u9664\u63D0\u793A",content:"\u786E\u8BA4\u5220\u9664\uFF1F",onOk:()=>k(this,null,function*(){l.value=!0;const{code:r}=yield P.common.deleteData({id:s}).catch(()=>{l.value=!1});r===200?(q.success("\u5220\u9664\u6210\u529F"),yield getPageList()):l.value=!1})})}function h({current:s,pageSize:r}){i.current=s,i.pageSize=r,f()}return{roleList:u,columns:g,userList:c,pagination:i,roleLoading:a,loading:l,selectedKeys:p,editRef:o,handleRole:C,handleDelete:w,onTableChange:h}}};function G(l,i,d,a,u,p){const g=n("a-tree"),c=n("a-card"),o=n("a-col"),_=n("icon-plus-outlined"),f=n("a-button"),C=n("a-input"),w=n("a-form-item"),h=n("a-row"),s=n("a-form"),r=n("x-search-bar"),L=n("x-action-bar"),R=n("a-avatar"),y=n("x-action-button"),D=n("a-table"),K=n("edit"),M=z("loading");return b(),U(E,null,[e(h,{gutter:16,type:"flex",class:"hp-100"},{default:t(()=>[e(o,{flex:"0 0 240px"},{default:t(()=>[F((b(),B(c,{bordered:!1,type:"flex"},{default:t(()=>[e(g,{"selected-keys":a.selectedKeys,"tree-data":a.roleList,"field-names":{title:"name",children:"children",key:"key"},"block-node":"",onSelect:a.handleRole},null,8,["selected-keys","tree-data","onSelect"])]),_:1})),[[M,a.roleLoading]])]),_:1}),e(o,{flex:"1"},{default:t(()=>[e(c,{bordered:!1,type:"flex"},{default:t(()=>[e(L,{class:"mb-8-2"},{extra:t(()=>[e(r,{"body-style":{padding:0}},{default:t(()=>[e(s,{layout:"inline"},{default:t(()=>[e(h,{gutter:12,type:"flex"},{default:t(()=>[e(o,null,{default:t(()=>[e(w,null,{default:t(()=>[e(C)]),_:1})]),_:1}),e(o,null,{default:t(()=>[e(f,{type:"primary",ghost:""},{default:t(()=>[v("\u641C\u7D22 ")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),default:t(()=>[e(f,{type:"primary",onClick:i[0]||(i[0]=I=>l.$refs.editRef.handleCreate())},{icon:t(()=>[e(_)]),default:t(()=>[v(" \u65B0\u5EFA\u7528\u6237 ")]),_:1})]),_:1}),e(D,{columns:a.columns,"data-source":a.userList,loading:a.loading,pagination:a.pagination,onChange:a.onTableChange},{bodyCell:t(({column:I,record:x,index:H})=>[I.key==="avatar"?(b(),B(R,{key:0,src:x.avatar},null,8,["src"])):S("",!0),I.key==="action"?(b(),U(E,{key:1},[e(y,{onClick:N=>l.$refs.editRef.handlePreview(x)},{default:t(()=>[v("\u67E5\u770B")]),_:2},1032,["onClick"]),e(y,{onClick:N=>l.$refs.editRef.handleEdit(x)},{default:t(()=>[v("\u7F16\u8F91")]),_:2},1032,["onClick"]),e(y,{onClick:N=>a.handleDelete(x)},{default:t(()=>[v("\u5220\u9664")]),_:2},1032,["onClick"])],64)):S("",!0)]),_:1},8,["columns","data-source","loading","pagination","onChange"])]),_:1})]),_:1})]),_:1}),e(K,{ref:"editRef"},null,512)],64)}const ae=T(A,[["render",G]]);export{ae as default};
