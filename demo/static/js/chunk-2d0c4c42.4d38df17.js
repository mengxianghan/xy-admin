(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c4c42"],{"3bda":function(e,t,l){"use strict";l.r(t);var a=l("f2bf");function u(e,t,l,u,n,r){var c=Object(a["U"])("x-filter"),b=Object(a["U"])("a-card"),o=Object(a["U"])("a-select"),i=Object(a["U"])("x-filter-item"),d=Object(a["U"])("a-switch"),s=Object(a["U"])("a-col"),f=Object(a["U"])("a-row");return Object(a["L"])(),Object(a["l"])(f,{gutter:16},{default:Object(a["hb"])((function(){return[Object(a["r"])(s,{span:18},{default:Object(a["hb"])((function(){return[Object(a["r"])(b,{title:"基础示例"},{default:Object(a["hb"])((function(){return[Object(a["r"])(c,{modelValue:u.filterForm,"onUpdate:modelValue":t[0]||(t[0]=function(e){return u.filterForm=e}),"data-source":u.basicList,"label-width":100},null,8,["modelValue","data-source"])]})),_:1}),Object(a["r"])(b,{title:"使用按钮",class:"mt-8-2"},{default:Object(a["hb"])((function(){return[Object(a["r"])(c,{modelValue:u.filterForm,"onUpdate:modelValue":t[1]||(t[1]=function(e){return u.filterForm=e}),"data-source":u.basicList,"label-width":100,"use-button":"",onOk:u.handleOk,onReset:u.handleReset},null,8,["modelValue","data-source","onOk","onReset"])]})),_:1}),Object(a["r"])(b,{title:"自定义内容",class:"mt-8-2"},{default:Object(a["hb"])((function(){return[Object(a["r"])(c,{modelValue:u.filterForm,"onUpdate:modelValue":t[2]||(t[2]=function(e){return u.filterForm=e}),"data-source":u.customList,"label-width":100,"use-button":"",onOk:u.handleOk},{praise:Object(a["hb"])((function(e){var t=e.record;return[Object(a["r"])(i,{label:t.label},{default:Object(a["hb"])((function(){return[Object(a["r"])(o,{value:t.value,"onUpdate:value":function(e){return t.value=e},options:[{label:"好评",value:"好评"},{label:"中评",value:"中评"},{label:"差评",value:"差评"}]},null,8,["value","onUpdate:value"])]})),_:2},1032,["label"])]})),filter:Object(a["hb"])((function(e){var t=e.record;return[Object(a["r"])(i,{label:t.label},{default:Object(a["hb"])((function(){return[Object(a["r"])(d,{checked:t.value,"onUpdate:checked":function(e){return t.value=e}},null,8,["checked","onUpdate:checked"])]})),_:2},1032,["label"])]})),_:1},8,["modelValue","data-source","onOk"])]})),_:1})]})),_:1}),Object(a["r"])(s,{span:6},{default:Object(a["hb"])((function(){return[Object(a["r"])(b,{title:"结果"},{default:Object(a["hb"])((function(){return[Object(a["o"])("pre",null,Object(a["Y"])(u.filterForm),1)]})),_:1})]})),_:1})]})),_:1})}var n={name:"componentFilter",setup:function(){var e=Object(a["Q"])([{label:"单选",key:"key",type:"tag",options:[{label:"全部",value:0},{label:"选项2",value:2},{label:"选项3",value:3},{label:"选项4",value:4},{label:"选项5",value:5}]},{label:"多选",key:"key1",type:"tag",multiple:!0,options:[{label:"全部",value:0},{label:"选项2",value:2},{label:"选项3",value:3},{label:"选项4",value:4},{label:"选项5",value:5}]},{label:"自定义输入",key:"key2",type:"input"},{label:"自定义区间",key:"key3",type:"inputRange"},{label:"日期",key:"key4",type:"date",valueFormat:"YYYY-MM-DD"},{label:"日期区间",key:"key5",type:"dateRange",valueFormat:"YYYY-MM-DD"}]),t=Object(a["Q"])([{label:"单选",key:"key",type:"tag",options:[{label:"全部",value:0},{label:"选项2",value:2},{label:"选项3",value:3},{label:"选项4",value:4},{label:"选项5",value:5}]},{label:"好评度",key:"praise",scopedSlot:!0},{label:"过滤数据",key:"filter",scopedSlot:!0}]),l=Object(a["Q"])({praise:"好评"});function u(e){l.value=e}function n(){l.value={}}return{basicList:e,customList:t,filterForm:l,handleOk:u,handleReset:n}}},r=l("6b0d"),c=l.n(r);const b=c()(n,[["render",u]]);t["default"]=b}}]);