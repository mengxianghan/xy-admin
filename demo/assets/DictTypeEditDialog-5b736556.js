import{u as S}from"./useModal-5ff77b06.js";import{u as b}from"./useForm-c124bf97.js";import{_ as w,h as m,i as x,q as D,w as i,e as t,x as O}from"./index-f770ad8c.js";import"./tinymce-87fd2522.js";import"./echarts-c0f2d21b.js";const q={name:"DictTypeEdit",emits:["ok"],setup(v,{emit:o}){const{modal:c,showModal:e,hideModal:f,showLoading:u,hideLoading:d}=S(),{formRef:l,rules:n,formRecord:s,formState:r,resetForm:a}=b();n.value={name:{required:!0,message:"请输入名称"},code:{required:!0,message:"请输入编码"}},r.value={valid:!0};function p(){e({title:"新建分类"})}function h(_){e({title:"编辑分类"}),r.value=O(_),s.value=_}function C(){l.value.validateFields().then(()=>{u(),setTimeout(()=>{d(),f(),o("ok")},3e3)}).catch(()=>{d()})}function g(){f()}function k(){a()}return{modal:c,formRef:l,formState:r,rules:n,handleCreate:p,handleEdit:h,handleOk:C,handleCancel:g,onAfterClose:k}}};function y(v,o,c,e,f,u){const d=m("a-tree-select"),l=m("a-form-item"),n=m("a-input"),s=m("a-form"),r=m("a-modal");return x(),D(r,{visible:e.modal.visible,title:e.modal.title,"confirm-loading":e.modal.confirmLoading,"after-close":e.onAfterClose,width:480,onOk:e.handleOk,onCancel:e.handleCancel},{default:i(()=>[t(s,{ref:"formRef",model:e.formState,rules:e.rules,"scroll-to-first-error":"","label-col":{style:{width:"100px"}}},{default:i(()=>[t(l,{label:"所属上级",name:"parent"},{default:i(()=>[t(d,{value:e.formState.parent,"onUpdate:value":o[0]||(o[0]=a=>e.formState.parent=a)},null,8,["value"])]),_:1}),t(l,{label:"名称",name:"name"},{default:i(()=>[t(n,{value:e.formState.name,"onUpdate:value":o[1]||(o[1]=a=>e.formState.name=a)},null,8,["value"])]),_:1}),t(l,{label:"编码",name:"code"},{default:i(()=>[t(n,{value:e.formState.code,"onUpdate:value":o[2]||(o[2]=a=>e.formState.code=a)},null,8,["value"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["visible","title","confirm-loading","after-close","onOk","onCancel"])}const T=w(q,[["render",y]]);export{T as default};
