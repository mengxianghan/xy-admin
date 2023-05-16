# XYStorage 本地缓存

基于 `localStoage` `sessionStorage` `js-cookie` 的本地缓存

## 安装

使用 npm：

```shell
npm install js-cookie xy-storage -S
```

使用 jsDelivr CDN：

```html

<script src="https://cdn.jsdelivr.net/npm/js-cookie/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/xy-storage/dist/index.min.js"></script>
```

## 示例

### 基础用法

```js
import XYStorage from "xy-storage";

const options = {};

const storage = {
    local: new XYStorage({
        ...options,
        name: "local"
    }),
    session: new XYStorage({
        ...options,
        name: "session"
    }),
    cookie: new XYStorage({
        ...options,
        name: "cookie"
    })
};

storage.local.setItem(key, value);

storage.local.getItem(key);

storage.local.removeItem(key);

storage.local.clear();

```

## API

### 参数

| 属性        | 说明                    | 类型                          | 默认值     |
|:----------|:----------------------|:----------------------------|:--------|
| namespace | 命名空间，添加到 `key` 前      | `string`                    | `-`     |
| name      | 储存方式                  | `string`                    | `local` |
| value     | 储存内容                  | `string` `object` `boolean` | `-`     |
| default   | 未获取到值时的返回值            | `string` `object` `boolean` | `null`  |
| attrs     | 属性，详见 [attrs](#attrs) | `object`                    | `-`     |

#### Attrs

| 名称      | 说明                      | 适用于              | 类型              | 默认值     |
|:--------|:------------------------|------------------|:----------------|:--------|
| expires | 有效期。类型为 `number` 时，单位为天 | `local` `cookie` | `number` `Date` | `-`     |
| path    | 储存路径                    | `cookie`         | `string`        | `-`     |
| domain  | 域名                      | `cookie`         | `string`        | `-`     |
| secure  | 是否需要安全协议                | `cookie`         | `boolean`       | `false` |

### 方法

setItem(key[, attrs])

getItem(key[, def])

removeItem(key)

clear()

## 依赖

[js-cookie](https://www.npmjs.com/package/js-cookie)

## 参考文档

[js-cookie](https://www.npmjs.com/package/js-cookie)

[sessionStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage)

[localStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)
