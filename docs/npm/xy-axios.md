# XYAxios 网络请求库

基于 `Axios` 网络请求库

## 安装

使用 npm：

```shell
npm install axios xy-axios -S
```

使用 jsDelivr CDN：

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/xy-axios/dist/index.min.js"></script>
```

## 示例

### 基础用法

```js
import XYAxios from "xy-axios";

const options = {
    baseURL: "https://api.example.com",
    timeout: 1000
};

const request = new XYAxios(options);

request.get("/getPageList", { current: 1, pageSize: 1 })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
    });
```

### 拦截器

```js
import XYAxios from 'xy-axios'

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

const request = new XYAxios(options)

request.get('/getPageList', { current: 1, pageSize: 1 })
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
    })
```

### 取消相同请求

```js {10-13,32}
import XYAxios from 'xy-axios'

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

const request = new XYAxios(options)

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
import XYAxios from 'xy-axios'

const options = {
    timeout: 1000
}

// 服务 1
const request1 = new XYAxios({
    ...options,
    baseURL: 'https://api.example_1.com/'
})

// 服务 2
const request2 = new XYAxios({
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

### 扩展 XYAxios

```js
import XYAxios from 'xy-axios'
import jschardet from 'jschardet'

/**
 * 读取文件
 */
class ReadFile extends XYAxios {
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
                        reader.onload = function () {
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
            reader.onload = function () {
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

## XYAxios 实例

### 创建一个新实例

new XYAxios([options])

```js
const instance = new XYAxios({
    baseURL: 'http://example.com',
    timeout: 1000,
    headers: {
        'X-Custom-Header': 'foobar'
    }
})
```

### 实例方法
**以下是可用的实例方法。指定的配置将与实例的配置合并。**

instance.request(config)  

instance.get(url[, params[, config]])  

instance.delete(url[, data[, config]])

instance.post(url[, data[, config]])  

instance.put(url[, data[, config]])  

instance.upload(url, formData[, config])

instance.download(url[, config])

**其他实例方法**  

instance.store.head(url[, config])  

instance.store.options(url[, config])  

instance.store.patch(url[, data[, config]])  

instance.store.getUri([config])

## 配置
这是创建请求时可以用的配置项。仅列举出了`XYAxios`新增的配置。其他配置请参考 [Axios 请求配置](https://www.axios-http.cn/docs/req_config)

```
{
    // 启用终止控制器。启用后会将同时发送的相同地请求取消
    enableAbortController: false,
    // 请求拦截回调
    interceptorRequest: (request)=>{},
    // 请求异常回调
    interceptorRequestCatch: function(err){},
    // 响应拦截回调
    interceptorResponse: function(response, controller){},
    // 响应拦截异常回调
    interceptorResponseCatch: function(err){}
}
```
更多使用方法参考 [Axios](https://www.axios-http.cn/docs/intro)
