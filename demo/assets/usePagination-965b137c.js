var z=Object.defineProperty;var s=Object.getOwnPropertySymbols;var P=Object.prototype.hasOwnProperty,S=Object.prototype.propertyIsEnumerable;var u=(a,t,e)=>t in a?z(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e,g=(a,t)=>{for(var e in t||(t={}))P.call(t,e)&&u(a,e,t[e]);if(s)for(var e of s(t))S.call(t,e)&&u(a,e,t[e]);return a};import{r as o,J as w}from"./index-f770ad8c.js";const k=(a={})=>{const t=o(!1),e=o([]),l=o({}),r=w(g({total:0,current:1,pageSize:10,showSizeChanger:!0,showQuickJumper:!0,showTotal:n=>`总 ${n} 条数据`,pageSizeOptions:["10","20","30","40"]},a!=null?a:{}));function h(){r.total=0,r.current=1}function f(n=1){const{total:m,current:c,pageSize:p}=r,i=Math.ceil((m-n)/p);r.current=c>i?i:c}return{loading:t,list:e,searchForm:l,pagination:r,resetPagination:h,refreshPagination:f}};export{k as u};
