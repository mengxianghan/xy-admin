# XYHttp 网络请求库

基于 `Axios` 网络请求库

## 安装

使用 npm：

```shell
npm install axios xy-http -S
```

使用 jsDelivr CDN：

```html

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/xy-http/dist/index.min.js"></script>
```

## 示例

### 基础用法

```js
import XYHttp from "docs/npm/xy-http";

const options = {
  baseURL: "https://api.example.com",
  timeout: 1000
};

const request = new XYHttp(options);

request.get("/getPageList", { current: 1, pageSize: 1 })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
  });
```

### 拦截器

```js
import XYHttp from 'docs/npm/xy-http'

const options = {
  baseURL: 'https://api.example.com',
  timeout: 1000,
  // 请求拦截
  interceptorRequest: (request) => {
    // 添加 token
    request.headers['token'] = 'Bearer xxxxxxxxx'
  },
  // 请求拦截异常
  interceptorRequestCatch: (err) => {
    console.error(err)
  },
  // 响应拦截
  interceptorResponse: (response) => {
    if (response.data.code === 203) {
      console.log('token 失效，请重新登录')
      window.location.href = '/login'
    }
  },
  // 响应拦截异常
  interceptorResponseCatch: (err) => {
    console.error(err)
  }
}

const request = new XYHttp(options)

request.get('/getPageList', { current: 1, pageSize: 1 })
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
  })
```

### 取消相同请求

```js {10-13,32}
import XYHttp from 'docs/npm/xy-http'

const options = {
  baseURL: 'https://api.example.com',
  timeout: 1000,
  enableAbortContrller: true,
  interceptorResponse: (response, controller) => {
    if (response.data.code === 203) {
      console.log('token 失效，请重新登录')
      // 终止所有请求（仅开启终止控制器时有效）
      controller.clear()
      // 同时发起多个请求且未调用 controller.clear() ，下方代码将会执行多次
      window.location.href = '/login'
    }
  },
}

const request = new XYHttp(options)

function getList() {
  request.get('/getPageList', { current: 1, pageSize: 1 })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
    })
}

function getList2() {
  request.get('/getPageList',
    { current: 1, pageSize: 1 },
    { enableAbortController: false }
  )
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
    })
}

getList() // 请求会被取消
getList()

// 下面两个请求都不会被取消
getList2()
getList2()
```

### 请求多个服务

```js
import XYHttp from 'docs/npm/xy-http'

const options = {
  timeout: 1000
}

// 服务 1
const request1 = new XYHttp({
  ...options,
  baseURL: 'https://api.example_1.com/'
})

// 服务 2
const request2 = new XYHttp({
  ...options,
  baseURL: 'https://api.example_2.com'
})

// 请求服务 1
request1.get('/getPageList', { current: 1, pageSize: 10 })
  .then((res) => {
    console.log(res)
  })
  .catch(() => {
  })

// 请求服务 2
request2.get('/getPageList', { current: 1, pageSize: 10 })
  .then((res) => {
    console.log(res)
  })
  .catch(() => {
  })
```

### 扩展 XYHttp

```js
import XYHttp from 'docs/npm/xy-http'
import jschardet from 'jschardet'

/**
 * 读取文件
 */
class ReadFile extends XYHttp {
  constructor() {
    super({
      baseURL: '',
      responseType: 'blob',
      transformResponse: [
        async (data) => {
          const encoding = await this._encoding(data)
          return new Promise((resolve) => {
            let reader = new FileReader()
            reader.readAsText(data, encoding)
            reader.onload = function() {
              resolve(reader.result)
            }
          })
        },
      ],

    })
  }

  /**
   * 文本编码
   * @param data
   * @returns {Promise<unknown>}
   * @private
   */
  _encoding(data) {
    return new Promise((resolve) => {
      let reader = new FileReader()
      reader.readAsBinaryString(data)
      reader.onload = function() {
        resolve(jschardet.detect(reader?.result).encoding)
      }
    })
  }
}

const readFile = new ReadFile()

readFile.get('https://cdn.example.com/1.txt')
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
  })
```

## API

### 参数

这是创建请求时可以用的配置项。仅列举出了`XYHttp`新增的配置。 [更多参数](https://www.axios-http.cn/docs/req_config)

| 名称                       | 说明                        | 类型         | 默认值                                |
|--------------------------|---------------------------|------------|------------------------------------|
| enableAbortController    | 启用终止控制器。启用后会将同时发送的相同地请求取消 | `boolean`  | `false`                            |
| interceptorRequest       | 请求拦截回调                    | `function` | `function(request){}`              |
| interceptorRequestCatch  | 请求异常回调                    | `function` | `function(err){}`                  |
| interceptorResponse      | 响应拦截回调                    | `function` | `function(response, controller){}` |
| interceptorResponseCatch | 响应拦截异常回调                  | `function` | `function(err){}`                  |

### 方法

**基础实例方法**

request(config)

get(url[, params[, config]])

delete(url[, data[, config]])

post(url[, data[, config]])

put(url[, data[, config]])

upload(url, formData[, config])

download(url[, config])

**其他实例方法**

第一步获取 store：

const store = instance.store

第二步使用：

store.head(url[, config])

store.options(url[, config])

store.patch(url[, data[, config]])

store.getUri([config])

## 依赖

[axios](https://www.npmjs.com/package/axios)

## 参考文档

[axios](https://www.axios-http.cn/docs/intro)
