import{_ as h,r as i,h as o,i as c,q as s,w as e,e as t,j as n,s as q,l as U,v as F}from"./index.15d75692.js";import"./tinymce.b4091e4a.js";import"./echarts.cbe68697.js";const L="/xy-admin/demo/assets/cropper.aa9e5fac.png",j={name:"componentCropper",setup(){const b=i(0),_=i(1),u=i(),a=i(""),p=i(""),v=i(!1);function y(){p.value="Base64",d(),u.value.getBase64().then(r=>{a.value=r})}function f(){p.value="Blob",d(),u.value.getBlob().then(r=>{a.value=URL.createObjectURL(r)})}function l(){p.value="File",d(),u.value.getFile("test.jpg").then(r=>{a.value=URL.createObjectURL(r)})}function d(){v.value=!0,setTimeout(()=>{v.value=!1},500)}return{cropperImg:L,aspectRatio:b,quality:_,cropperRef:u,src:a,type:p,loading:v,handleBase64:y,handleBlob:f,handleFile:l}}},w=["src"];function N(b,_,u,a,p,v){const y=o("x-cropper"),f=o("a-card"),l=o("a-select-option"),d=o("a-select"),r=o("a-form-item"),m=o("a-col"),g=o("a-button"),x=o("a-space"),B=o("a-row"),C=o("a-form"),R=o("a-spin");return c(),s(B,{gutter:16},{default:e(()=>[t(m,{span:12},{default:e(()=>[t(f,{bordered:!1},{default:e(()=>[t(y,{src:a.cropperImg,"aspect-ratio":a.aspectRatio,quality:a.quality,ref:"cropperRef"},null,8,["src","aspect-ratio","quality"])]),_:1}),t(f,{bordered:!1,title:"\u53C2\u6570\u548C\u65B9\u6CD5",class:"mt-8-2"},{default:e(()=>[t(C,{layout:"vertical"},{default:e(()=>[t(B,{gutter:16},{default:e(()=>[t(m,{span:12},{default:e(()=>[t(r,{label:"\u7F29\u653E\u6BD4\u4F8B"},{default:e(()=>[t(d,{value:a.aspectRatio,"onUpdate:value":_[0]||(_[0]=k=>a.aspectRatio=k)},{default:e(()=>[(c(),s(l,{key:0},{default:e(()=>[n("\u81EA\u7531")]),_:1})),(c(),s(l,{key:1/1},{default:e(()=>[n("1:1")]),_:1})),(c(),s(l,{key:4/3},{default:e(()=>[n("4:3")]),_:1})),(c(),s(l,{key:16/9},{default:e(()=>[n("16:9")]),_:1}))]),_:1},8,["value"])]),_:1})]),_:1}),t(m,{span:12},{default:e(()=>[t(r,{label:"\u56FE\u50CF\u538B\u7F29\u7387",extra:"\u53D6\u503C\u8303\u56F4 0~1"},{default:e(()=>[t(d,{value:a.quality,"onUpdate:value":_[1]||(_[1]=k=>a.quality=k)},{default:e(()=>[(c(),s(l,{key:.1},{default:e(()=>[n("0.1")]),_:1})),(c(),s(l,{key:.5},{default:e(()=>[n("0.5")]),_:1})),(c(),s(l,{key:1},{default:e(()=>[n("1")]),_:1}))]),_:1},8,["value"])]),_:1})]),_:1}),t(m,{span:24},{default:e(()=>[t(x,null,{default:e(()=>[t(g,{onClick:a.handleBase64},{default:e(()=>[n("Base64")]),_:1},8,["onClick"]),t(g,{onClick:a.handleBlob},{default:e(()=>[n("Blob")]),_:1},8,["onClick"]),t(g,{onClick:a.handleFile},{default:e(()=>[n("File")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),a.src?(c(),s(m,{key:0,span:12},{default:e(()=>[t(R,{spinning:a.loading},{default:e(()=>[t(f,{bordered:!1,title:"\u7ED3\u679C"},{extra:e(()=>[n("\u7C7B\u578B\uFF1A"+q(a.type),1)]),default:e(()=>[U("img",{src:a.src},null,8,w)]),_:1})]),_:1},8,["spinning"])]),_:1})):F("",!0)]),_:1})}const T=h(j,[["render",N]]);export{T as default};
