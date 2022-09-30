import{u as C}from"./useForm.25159ea8.js";import{_ as U,h as n,i as w,q,w as t,e as l,j as i}from"./index.15d75692.js";import"./tinymce.b4091e4a.js";import"./echarts.cbe68697.js";const B={name:"formBasic",setup(){const m=[{label:"\u516C\u5F00",value:1},{label:"\u90E8\u5206\u516C\u5F00",value:2},{label:"\u4E0D\u516C\u5F00",value:3}],{formRef:a,formState:d,rules:e,resetForm:u}=C();d.value={field8:1},e.value={field1:{required:!0,message:"\u8BF7\u8F93\u5165\u6807\u9898"},field2:{required:!0,message:"\u8BF7\u9009\u62E9\u8D77\u6B62\u65E5\u671F"},field3:{required:!0,message:"\u8BF7\u8F93\u5165\u76EE\u6807\u63CF\u8FF0"},field4:{required:!0,message:"\u8BF7\u8F93\u5165\u8861\u91CF\u6807\u51C6"}};function _(){a.value.validateFields().then(r=>{console.log(r)})}function f(){u()}return{targetList:m,formRef:a,formState:d,rules:e,handleOk:_,handleCancel:f}}};function F(m,a,d,e,u,_){const f=n("a-input"),r=n("a-form-item"),p=n("a-range-picker"),s=n("a-textarea"),g=n("icon-info-circle-outlined"),v=n("a-tooltip"),S=n("a-radio-group"),c=n("a-button"),b=n("a-space"),k=n("a-form"),x=n("a-card");return w(),q(x,{bordered:!1},{default:t(()=>[l(k,{"label-col":{sm:7,lg:7},"wrapper-col":{sm:17,lg:10},ref:"formRef",rules:e.rules,model:e.formState},{default:t(()=>[l(r,{label:"\u6807\u9898",name:"field1"},{default:t(()=>[l(f,{placeholder:"\u7ED9\u76EE\u6807\u8D77\u4E2A\u540D\u5B57",value:e.formState.field1,"onUpdate:value":a[0]||(a[0]=o=>e.formState.field1=o)},null,8,["value"])]),_:1}),l(r,{label:"\u8D77\u6B62\u65E5\u671F",name:"field2"},{default:t(()=>[l(p,{value:e.formState.field2,"onUpdate:value":a[1]||(a[1]=o=>e.formState.field2=o)},null,8,["value"])]),_:1}),l(r,{label:"\u76EE\u6807\u63CF\u8FF0",name:"field3"},{default:t(()=>[l(s,{target:e.formState.field3,"onUpdate:target":a[2]||(a[2]=o=>e.formState.field3=o),placeholder:"\u8BF7\u8F93\u5165\u4F60\u7684\u9636\u6BB5\u6027\u5DE5\u4F5C\u76EE\u6807",rows:4},null,8,["target"])]),_:1}),l(r,{label:"\u8861\u91CF\u6807\u51C6",name:"field4"},{default:t(()=>[l(s,{target:e.formState.field4,"onUpdate:target":a[3]||(a[3]=o=>e.formState.field4=o),placeholder:"\u8BF7\u8F93\u5165\u8861\u91CF\u6807\u51C6",rows:4},null,8,["target"])]),_:1}),l(r,{name:"field5"},{label:t(()=>[i(" \u5BA2\u6237\uFF08\u9009\u586B\uFF09 "),l(v,{title:"\u76EE\u6807\u7684\u670D\u52A1\u5BF9\u8C61"},{default:t(()=>[l(g)]),_:1})]),default:t(()=>[l(f,{target:e.formState.field5,"onUpdate:target":a[4]||(a[4]=o=>e.formState.field5=o),placeholder:"\u8BF7\u63CF\u8FF0\u4F60\u670D\u52A1\u7684\u5BA2\u6237,\u5185\u90E8\u5BA2\u6237\u76F4\u63A5 \u59D3\u540D/\u5DE5\u53F7"},null,8,["target"])]),_:1}),l(r,{label:"\u9080\u8BC4\u4EBA\uFF08\u9009\u586B\uFF09",name:"field6"},{default:t(()=>[l(f,{value:e.formState.field6,"onUpdate:value":a[5]||(a[5]=o=>e.formState.field6=o),placeholder:"\u8BF7\u76F4\u63A5 \u59D3\u540D/\u5DE5\u53F7,\u6700\u591A\u53EF\u9080\u8BF7 5 \u4EBA"},null,8,["value"])]),_:1}),l(r,{label:"\u6743\u91CD\uFF08\u9009\u586B\uFF09",name:"field7"},{default:t(()=>[l(f,{value:e.formState.field7,"onUpdate:value":a[6]||(a[6]=o=>e.formState.field7=o),placeholder:"\u8BF7\u8F93\u5165"},null,8,["value"])]),_:1}),l(r,{label:"\u76EE\u6807\u516C\u5F00",name:"field8"},{default:t(()=>[l(S,{value:e.formState.field8,"onUpdate:value":a[7]||(a[7]=o=>e.formState.field8=o),options:e.targetList},null,8,["value","options"])]),_:1}),l(r,{"wrapper-col":{offset:7,sm:17,lg:10}},{default:t(()=>[l(b,null,{default:t(()=>[l(c,{type:"primary",onClick:e.handleOk},{default:t(()=>[i("\u63D0\u4EA4 ")]),_:1},8,["onClick"]),l(c,{onClick:e.handleCancel},{default:t(()=>[i("\u53D6\u6D88")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},8,["rules","model"])]),_:1})}const R=U(B,[["render",F]]);export{R as default};
