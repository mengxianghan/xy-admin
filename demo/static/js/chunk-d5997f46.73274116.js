(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d5997f46"],{"04db":function(e,t,n){"use strict";n("1366")},1366:function(e,t,n){},"13d8":function(e,t,n){"use strict";var u=n("f2bf");t["a"]=function(){var e=Object(u["Q"])({}),t=Object(u["Q"])({}),n=Object(u["Q"])(null),l=Object(u["Q"])({}),r={labelCol:{span:6},wrapperCol:{span:18}},c={wrapperCol:{span:18,offset:6}};function o(){t.value=null,l.value={},e.value.resetFields(),e.value.clearValidate()}function a(e,t){return t.componentOptions.children[0].text.toLowerCase().indexOf(e.toLowerCase())>=0}return{formRef:e,rules:n,formRecord:t,formState:l,formLayout:r,formButtonLayout:c,resetForm:o,filterOption:a}}},fb89:function(e,t,n){"use strict";n.r(t);var u=n("f2bf"),l=function(e){return Object(u["O"])("data-v-2a424387"),e=e(),Object(u["M"])(),e},r=l((function(){return Object(u["o"])("div",{class:"custom"}," 自定义插槽 ",-1)})),c=Object(u["q"])("提交 "),o=Object(u["q"])("重置");function a(e,t,n,l,a,b){var f=Object(u["U"])("x-upload-image"),d=Object(u["U"])("a-col"),i=Object(u["U"])("a-row"),O=Object(u["U"])("a-card"),j=Object(u["U"])("x-upload-input"),m=Object(u["U"])("a-form-item"),s=Object(u["U"])("a-date-picker"),p=Object(u["U"])("a-button"),h=Object(u["U"])("a-space"),_=Object(u["U"])("a-form");return Object(u["L"])(),Object(u["n"])(u["b"],null,[Object(u["r"])(O,{title:"基础示例"},{default:Object(u["hb"])((function(){return[Object(u["r"])(i,{gutter:16},{default:Object(u["hb"])((function(){return[Object(u["r"])(d,null,{default:Object(u["hb"])((function(){return[Object(u["r"])(f,{modelValue:l.basic,"onUpdate:modelValue":t[0]||(t[0]=function(e){return l.basic=e})},null,8,["modelValue"])]})),_:1}),Object(u["r"])(d,null,{default:Object(u["hb"])((function(){return[Object(u["r"])(f,{modelValue:l.customTitle,"onUpdate:modelValue":t[1]||(t[1]=function(e){return l.customTitle=e}),text:"自定义标题",icon:"icon-picture-outlined"},null,8,["modelValue"])]})),_:1}),Object(u["r"])(d,null,{default:Object(u["hb"])((function(){return[Object(u["r"])(f,{modelValue:l.customSlot,"onUpdate:modelValue":t[2]||(t[2]=function(e){return l.customSlot=e}),width:240},{default:Object(u["hb"])((function(){return[r]})),_:1},8,["modelValue"])]})),_:1}),Object(u["r"])(d,null,{default:Object(u["hb"])((function(){return[Object(u["r"])(f,{modelValue:l.cropper,"onUpdate:modelValue":t[3]||(t[3]=function(e){return l.cropper=e}),text:"开启裁剪",cropper:"","aspect-ratio":1},null,8,["modelValue"])]})),_:1}),Object(u["r"])(d,null,{default:Object(u["hb"])((function(){return[Object(u["r"])(f,{modelValue:l.round,"onUpdate:modelValue":t[4]||(t[4]=function(e){return l.round=e}),round:"",text:"圆角"},null,8,["modelValue"])]})),_:1})]})),_:1})]})),_:1}),Object(u["r"])(O,{class:"mt-8-2",title:"批量上传示例"},{default:Object(u["hb"])((function(){return[Object(u["r"])(f,{modelValue:l.multipleList,"onUpdate:modelValue":t[5]||(t[5]=function(e){return l.multipleList=e}),multiple:"",cropper:""},null,8,["modelValue"])]})),_:1}),Object(u["r"])(O,{class:"mt-8-2",title:"其他示例"},{default:Object(u["hb"])((function(){return[Object(u["r"])(i,{gutter:16},{default:Object(u["hb"])((function(){return[Object(u["r"])(d,{span:8},{default:Object(u["hb"])((function(){return[Object(u["r"])(j)]})),_:1})]})),_:1})]})),_:1}),Object(u["r"])(i,{gutter:16,class:"mt-8-2"},{default:Object(u["hb"])((function(){return[Object(u["r"])(d,{span:12},{default:Object(u["hb"])((function(){return[Object(u["r"])(O,{title:"表单示例"},{default:Object(u["hb"])((function(){return[Object(u["r"])(_,{"label-col":{style:{width:"100px"}},model:l.formState,rules:l.rules,ref:"formRef"},{default:Object(u["hb"])((function(){return[Object(u["r"])(m,{label:"身份证",class:"mb-0",required:""},{default:Object(u["hb"])((function(){return[Object(u["r"])(i,{gutter:16},{default:Object(u["hb"])((function(){return[Object(u["r"])(d,null,{default:Object(u["hb"])((function(){return[Object(u["r"])(m,{name:"field1"},{default:Object(u["hb"])((function(){return[Object(u["r"])(f,{modelValue:l.formState.field1,"onUpdate:modelValue":t[6]||(t[6]=function(e){return l.formState.field1=e}),text:"人像面",width:191},null,8,["modelValue"])]})),_:1})]})),_:1}),Object(u["r"])(d,null,{default:Object(u["hb"])((function(){return[Object(u["r"])(m,{name:"field2"},{default:Object(u["hb"])((function(){return[Object(u["r"])(f,{modelValue:l.formState.field2,"onUpdate:modelValue":t[7]||(t[7]=function(e){return l.formState.field2=e}),text:"国徽面",width:191},null,8,["modelValue"])]})),_:1})]})),_:1})]})),_:1})]})),_:1}),Object(u["r"])(m,{label:"其他凭证",name:"field3"},{default:Object(u["hb"])((function(){return[Object(u["r"])(f,{modelValue:l.formState.field3,"onUpdate:modelValue":t[8]||(t[8]=function(e){return l.formState.field3=e})},null,8,["modelValue"])]})),_:1}),Object(u["r"])(m,{label:"上传文件",name:"field5"},{default:Object(u["hb"])((function(){return[Object(u["r"])(j,{modelValue:l.formState.field5,"onUpdate:modelValue":t[9]||(t[9]=function(e){return l.formState.field5=e})},null,8,["modelValue"])]})),_:1}),Object(u["r"])(m,{label:"日期",name:"field4"},{default:Object(u["hb"])((function(){return[Object(u["r"])(s,{value:l.formState.field4,"onUpdate:value":t[10]||(t[10]=function(e){return l.formState.field4=e})},null,8,["value"])]})),_:1}),Object(u["r"])(m,{style:{paddingLeft:"100px"}},{default:Object(u["hb"])((function(){return[Object(u["r"])(h,null,{default:Object(u["hb"])((function(){return[Object(u["r"])(p,{type:"primary",onClick:l.handleSubmit},{default:Object(u["hb"])((function(){return[c]})),_:1},8,["onClick"]),Object(u["r"])(p,{onClick:l.handleReset},{default:Object(u["hb"])((function(){return[o]})),_:1},8,["onClick"])]})),_:1})]})),_:1})]})),_:1},8,["model","rules"])]})),_:1})]})),_:1}),Object(u["r"])(d,{span:12},{default:Object(u["hb"])((function(){return[Object(u["r"])(O,{title:"输出结果"},{default:Object(u["hb"])((function(){return[Object(u["o"])("pre",null,Object(u["Y"])(l.formState),1)]})),_:1})]})),_:1})]})),_:1})],64)}var b=n("13d8"),f={name:"componentUpload",setup:function(){var e=Object(u["Q"])(""),t=Object(u["Q"])(""),n=Object(u["Q"])(""),l=Object(u["Q"])(""),r=Object(u["Q"])(""),c=Object(u["Q"])([]),o=Object(b["a"])(),a=o.formState,f=o.rules,d=o.formRef,i=o.resetForm;function O(){d.value.validate().then((function(e){console.log(e)})).catch((function(){}))}function j(){i()}return f.value={field1:{required:!0,message:"请上传人像面"},field2:{required:!0,message:"请上传国徽面"},field5:{required:!0,message:"请上传文件"}},{basic:e,customTitle:t,customSlot:n,cropper:l,round:r,multipleList:c,formState:a,rules:f,formRef:d,handleSubmit:O,handleReset:j}}},d=(n("04db"),n("6b0d")),i=n.n(d);const O=i()(f,[["render",a],["__scopeId","data-v-2a424387"]]);t["default"]=O}}]);