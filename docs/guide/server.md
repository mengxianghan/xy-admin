# 和服务端进行交互

`XYAdmin` 是一套基于 `Vue` 技术栈的单页面应用，我们提供的是前端代码和 `mock` 模拟数据的开发模式，
通过 `API` 的形式和任何技术栈的服务端应用一起工作。下面将简单介绍和服务端交互的基本写法。

## 使用

**1. 删除 `/src/core/index.js` 中第 `5`、`16-18` 行；**

<<< @/../src/core/index.js {5,16-18}

**2. 删除 /src/mock 目录；**

**3. 删除 `.env.*` 文件中第 `16-17` 行；**

<<< @/../.env.dev {16-17 txt}

4. 调用统一管理的 api service 请求函数；
5. 使用封装的 request 发送请求；

为了方便管理维护，统一的请求处理都放在 `/src/api` 目录中，并且一般按照 model 纬度进行拆分文件，如：

``` {:no-line-numbers}
api/
  modules/
    user.js
    permission.js
    goods.js
    ...
  index.js
```

其中，`/src/utils/request` 是基于 `axios` 的封装，便于统一处理 `POST`，`GET` 等请求参数，请求头，以及错误提示信息等。 它封装了全局 `request` 拦截器、`response` 拦截器、统一的错误处理、`baseURL` 设置等。

::: code-group
<<< @/../src/utils/request.js {73-82}
:::

通过配置 `baseURL` 可支持请求多服务接口，详见 `/src/utils/request.js` 第 `73~82` 行

::: warning
在使用正式请求时务必执行以上流程中的 1、2、3，否则可能会出现接口请求不通的情况。
:::