var b=(c,u,n)=>new Promise((o,_)=>{var y=l=>{try{i(n.next(l))}catch(r){_(r)}},d=l=>{try{i(n.throw(l))}catch(r){_(r)}},i=l=>l.done?o(l.value):Promise.resolve(l.value).then(y,d);i((n=n.apply(c,u)).next())});import{K as F,_ as L,r as C,o as j,D as E,h as a,i as p,d as k,e as t,w as e,j as s,F as v,s as D,v as f,q as M,l as q,M as K,m as O}from"./index-f770ad8c.js";import{u as P}from"./usePagination-965b137c.js";import S from"./EditDialog-ac7f92c8.js";import"./tinymce-87fd2522.js";import"./echarts-c0f2d21b.js";import"./useModal-5ff77b06.js";import"./useForm-c124bf97.js";const z=new F([{key:"menu",value:"menu",desc:"菜单"},{key:"button",value:"button",desc:"按钮"}]),A={name:"systemMenu",components:{EditDialog:S},setup(){const c=C([{title:"#",key:"no",width:60,align:"center"},{title:"名称",dataIndex:"name"},{title:"类型",dataIndex:"type",key:"type",width:120},{title:"排序",dataIndex:"sort",width:80},{title:"操作",key:"action",width:240}]),{list:u,loading:n}=P(),o=C();j(()=>{_()});function _(){return b(this,null,function*(){n.value=!0;const{code:d,data:i}=yield E.system.getMenuList().catch(()=>{n.value=!1});if(n.value=!1,d===200){const{rows:l}=i;u.value=l}})}function y({id:d}){K.confirm({title:"删除提示",content:"确认删除？",onOk:()=>b(this,null,function*(){n.value=!0;const{code:i}=yield E.common.deleteData({id:d}).catch(()=>{n.value=!1});i===200?(O.success("删除成功"),yield _()):n.value=!1})})}return{menuTypeEnum:z,list:u,loading:n,columns:c,editDialogRef:o,handleDelete:y}}};function G(c,u,n,o,_,y){const d=a("icon-plus-outlined"),i=a("a-button"),l=a("x-action-bar"),r=a("a-tag"),w=a("x-action-button"),T=a("icon-down-outlined"),h=a("a-menu-item"),R=a("a-menu"),B=a("a-dropdown"),N=a("a-table"),V=a("a-card"),I=a("edit-dialog");return p(),k(v,null,[t(V,{bordered:!1},{default:e(()=>[t(l,{class:"mb-8-2"},{default:e(()=>[t(i,{type:"primary",onClick:u[0]||(u[0]=g=>c.$refs.editDialogRef.handleCreate())},{icon:e(()=>[t(d)]),default:e(()=>[s(" 新建菜单 ")]),_:1})]),_:1}),t(N,{columns:o.columns,"data-source":o.list,loading:o.loading,pagination:!1,"expand-icon-column-index":1},{bodyCell:e(({column:g,record:m,index:$})=>[g.key==="no"?(p(),k(v,{key:0},[s(D($+1),1)],64)):f("",!0),g.key==="type"?(p(),k(v,{key:1},[o.menuTypeEnum.is("menu",m.type)?(p(),M(r,{key:0,color:"processing"},{default:e(()=>[s(D(o.menuTypeEnum.getDesc(m.type)),1)]),_:2},1024)):f("",!0),o.menuTypeEnum.is("button",m.type)?(p(),M(r,{key:1,color:"success"},{default:e(()=>[s(D(o.menuTypeEnum.getDesc(m.type)),1)]),_:2},1024)):f("",!0)],64)):f("",!0),g.key==="action"?(p(),k(v,{key:2},[t(w,{onClick:x=>c.$refs.editDialogRef.handleEdit(m)},{default:e(()=>[s("新建下级")]),_:2},1032,["onClick"]),t(w,{onClick:x=>c.$refs.editDialogRef.handleEdit(m)},{default:e(()=>[s("编辑")]),_:2},1032,["onClick"]),t(w,{tag:"span"},{default:e(()=>[t(B,{trigger:["click"]},{overlay:e(()=>[t(R,null,{default:e(()=>[t(h,{onClick:x=>o.handleDelete(m)},{default:e(()=>[s("删除")]),_:2},1032,["onClick"]),t(h,null,{default:e(()=>[s("克隆")]),_:1})]),_:2},1024)]),default:e(()=>[q("a",null,[s(" 更多 "),t(T)])]),_:2},1024)]),_:2},1024)],64)):f("",!0)]),_:1},8,["columns","data-source","loading"])]),_:1}),t(I,{ref:"editDialogRef"},null,512)],64)}const ee=L(A,[["render",G]]);export{ee as default};
