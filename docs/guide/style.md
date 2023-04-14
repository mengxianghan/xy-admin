# 样式

这篇文档主要针对如何在项目中使用和规划样式文件进行介绍，如果想获取基础的 `CSS` 知识或查阅属性，可以参考 [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)。

## Less

由于 `Ant Design Vue` 采用 less 为了方便扩展，`XYAdmin` 也默认采用 less 作为样式语言，建议在使用前或者遇到疑问时学习一下 [less](http://lesscss.org/) 的相关特性。

在样式开发过程中，有两个问题比较突出：

- 全局污染 —— CSS 文件中的选择器是全局生效的，不同文件中的同名选择器，根据 build 后生成文件中的先后顺序，后面的样式会将前面的覆盖；
- 选择器复杂 —— 为了避免上面的问题，我们在编写样式的时候不得不小心翼翼，类名里会带上限制范围的标识，变得越来越长，多人开发时还很容易导致命名风格混乱，一个元素上使用的选择器个数也可能越来越多。
为了解决上述问题，我们的脚手架推荐样式尽量保证使用 `scoped` 局部样式方案，先来看下在这种模式下怎么写样式。

```vue
<template>
    <div class="title">
        {{ title }}
    </div>
</template>

<script>
export default {
    setup(){
        const title = "啦啦啦"
        
        return {
            title
        }
    }
}
</script>

<style lang="less" scoped>
@import 'index.less';

.title {
    color: #000;
    font-weight: 600;
    margin-bottom: 16px;
}
</style>
```

在上面的样式文件中，`.title` 只会在本文件生效，你可以在其他任意文件中使用同名选择器，也不会对这里造成影响。不过有的时候，我们就是想要一个全局生效的样式呢？可以将样式提取到一个公共文件，例如：`/src/styles/app.less` 然后在 `/src/core/index.js` 将样式引入

```less
// app.less 
// 在这个文件内定义的样式会全局污染
.title {
  color: #000;
  font-weight: 600;
  margin-bottom: 16px;
}

.text {
  font-size: 16px;
}

.footer {
  color: #ccc;
}
.sider {
  background: #ebebeb;
}
```

Vue 中对样式的 `scoped` 处理基本原理很简单，就是对每个类名所在的 `dom` 元素按照一定规则进行转换，增加 `data-v-xx` 属性，并让编译后的样式表类名与 `data-x` 选择器合作来保证它的唯一性。如果在浏览器里查看这个示例的 `dom` 结构，你会发现实际渲染出来是这样的：

```html
<div class="title" data-v-c05f9fc4>title</div>
```
类名被自动添加了一个 `hash` 值的选择器，这保证了它的唯一性。

除了上面的基础知识，还有一些关键点需要注意：

- 由于不用担心类名重复，你的 `class` 可以在基本语意化的前提下尽量简单一点儿。
- https://cn.vuejs.org/api/sfc-css-features.html#css-modules

## 样式文件类别
在一个项目中，样式文件根据功能不同，可以划分为不同的类别。

### /src/styles/app.less

全局样式文件，在这里你可以进行一些通用设置，比如脚手架中自带的：

```less
html, body {
  height: 100%;
}

body {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

> 因为 antd 中会自带一些全局设置，如字号，颜色，行高等，所以在这里，你只需要关注自己的个性化需求即可，不用进行大量的 reset。

### /src/styles/util.less
这里可以放置一些工具函数供调用。

### 模块样式
针对某个模块/页面生效的文件。

### 通用模块级
包含一些基本布局的样式，项目中使用这种布局的页面就不需要再关心整体布局的设置。如果你的项目中需要使用其他布局，也建议将布局相关的 js 和 less 放在这里 `/src/layouts`。

### 页面级
具体页面相关的样式，内容仅和本页面的内容相关。一般情况下，如果不是页面内容特别复杂，有了前面全局样式、通用模块样式的配合，这里要写的应该不多。

### 组件级
这个也很简单，就是组件相关的样式了，有一些在页面中重复使用的片段或相对独立的功能，你可以提炼成组件，相关的样式也应该提炼出来放在组件中，而不是混淆在页面里。

> 以上样式类别都是针对独立的样式文件，有时样式配置特别简单，也没有重复使用，你也可以用内联样式 style="{ fontSize: fontSizeVar }" 来设置。

## 覆盖组件样式
由于业务的个性化需求，我们经常会遇到需要覆盖组件样式的情况，这里举个简单的例子。

```vue
<template>
    <div class="test-wrapper">
        <a-select>
            <a-select-option value="1">Option 1</a-select-option>
            <a-select-option value="2">Option 2</a-select-option>
            <a-select-option value="3">Option 3</a-select-option>
        </a-select>
    </div>
</template>

<script>
export default {

}
</script>
<style lang="less" scoped>
.test-wrapper{
    // 使用 deep 进行样式穿透
    :deep(.ant-select) {
        font-size: 16px;
    }
}
</style>
```

方法很简单，有两点需要注意：

- 引入的 `antd` 组件类名没有被 CSS 编译器转化，所以被覆盖的类名 `.ant-select` 必须依靠 Vue 提供的穿透方案来穿透组件的样式。
- 因为上一条的关系，覆盖是全局性的。为了防止对其他 `Select` 组件造成影响，所以需要包裹额外的 `class` 限制样式的生效范围。
