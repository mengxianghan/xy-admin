var g=(l,s,e)=>new Promise((n,u)=>{var f=t=>{try{a(e.next(t))}catch(d){u(d)}},c=t=>{try{a(e.throw(t))}catch(d){u(d)}},a=t=>t.done?n(t.value):Promise.resolve(t.value).then(f,c);a((e=e.apply(l,s)).next())});import{_ as E,r as C,o as I,D as b,h as r,i as k,d as v,e as o,w as i,j as m,F as y,s as M,v as h,M as N,m as P}from"./index-f770ad8c.js";import{u as V}from"./usePagination-965b137c.js";import B from"./EditDialog-ed0f9143.js";import"./tinymce-87fd2522.js";import"./echarts-c0f2d21b.js";import"./useModal-5ff77b06.js";import"./useForm-c124bf97.js";const F={name:"systemRole",components:{EditDialog:B},setup(){const l=C([{title:"#",key:"no",width:60,align:"center"},{title:"名称",dataIndex:"name"},{title:"别名",dataIndex:"alias"},{title:"排序",dataIndex:"sort",width:80},{title:"操作",key:"action",width:160}]),{list:s,loading:e}=V(),n=C();I(()=>{u()});function u(){return g(this,null,function*(){e.value=!0;const{code:c,data:a}=yield b.system.getUserRoleList().catch(()=>{e.value=!1});if(e.value=!1,c===200){const{rows:t}=a;s.value=t}})}function f({id:c}){N.confirm({title:"删除提示",content:"确认删除？",onOk:()=>g(this,null,function*(){e.value=!0;const{code:a}=yield b.common.deleteData({id:c}).catch(()=>{e.value=!1});a===200?(P.success("删除成功"),yield u()):e.value=!1})})}return{list:s,loading:e,columns:l,editDialogRef:n,handleDelete:f}}};function L(l,s,e,n,u,f){const c=r("icon-plus-outlined"),a=r("a-button"),t=r("x-action-bar"),d=r("x-action-button"),D=r("a-table"),w=r("a-card"),R=r("edit-dialog");return k(),v(y,null,[o(w,{bordered:!1},{default:i(()=>[o(t,{class:"mb-8-2"},{default:i(()=>[o(a,{type:"primary",onClick:s[0]||(s[0]=_=>l.$refs.editDialogRef.handleCreate())},{icon:i(()=>[o(c)]),default:i(()=>[m(" 新建角色 ")]),_:1})]),_:1}),o(D,{columns:n.columns,"data-source":n.list,loading:n.loading,pagination:!1,"expand-icon-column-index":1},{bodyCell:i(({column:_,record:p,index:$})=>[_.key==="no"?(k(),v(y,{key:0},[m(M($+1),1)],64)):h("",!0),_.key==="action"?(k(),v(y,{key:1},[o(d,{onClick:x=>l.$refs.editDialogRef.handlePreview(p)},{default:i(()=>[m("查看")]),_:2},1032,["onClick"]),o(d,{onClick:x=>l.$refs.editDialogRef.handleEdit(p)},{default:i(()=>[m("编辑")]),_:2},1032,["onClick"]),o(d,{onClick:x=>n.handleDelete(p)},{default:i(()=>[m("删除")]),_:2},1032,["onClick"])],64)):h("",!0)]),_:1},8,["columns","data-source","loading"])]),_:1}),o(R,{ref:"editDialogRef"},null,512)],64)}const G=E(F,[["render",L]]);export{G as default};
