import v from"./Step1.1c5ac954.js";import h from"./Step2.5189f052.js";import x from"./Step3.1b32c6c6.js";import{_ as N,r as P,h as n,i as o,l as r,w as i,e as a,k,q as s}from"./index.a8948c02.js";import"./useForm.049bdf41.js";import"./tinymce.b4091e4a.js";import"./echarts.98d40a9a.js";const b={name:"formStep",components:{Step1:v,Step2:h,Step3:x},setup(){const t=P(0);function _(){t.value<2&&(t.value+=1)}function l(){t.value>0&&(t.value-=1)}function e(){t.value=0}return{currentTab:t,handleNext:_,handlePrev:l,handleFinish:e}}},y={class:"content"};function T(t,_,l,e,F,S){const c=n("a-step"),p=n("a-steps"),d=n("step1"),m=n("step2"),u=n("step3"),f=n("a-card");return o(),r(f,null,{default:i(()=>[a(p,{class:"steps",current:e.currentTab},{default:i(()=>[a(c,{title:"\u586B\u5199\u8F6C\u8D26\u4FE1\u606F"}),a(c,{title:"\u786E\u8BA4\u8F6C\u8D26\u4FE1\u606F"}),a(c,{title:"\u5B8C\u6210"})]),_:1},8,["current"]),k("div",y,[e.currentTab===0?(o(),r(d,{key:0,onNext:e.handleNext},null,8,["onNext"])):s("",!0),e.currentTab===1?(o(),r(m,{key:1,onNext:e.handleNext,onPrev:e.handlePrev},null,8,["onNext","onPrev"])):s("",!0),e.currentTab===2?(o(),r(u,{key:2,onPrev:e.handlePrev,onFinish:e.handleFinish},null,8,["onPrev","onFinish"])):s("",!0)])]),_:1})}const j=N(b,[["render",T],["__scopeId","data-v-6c3787ec"]]);export{j as default};
