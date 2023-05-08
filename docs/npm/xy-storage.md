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

| 属性        | 说明                                              | 类型                          | 默认值     |
|:----------|:------------------------------------------------|:----------------------------|:--------|
| namespace | 命名空间，添加到 `key` 前。适用于：`local`、`session`、`cookie` | `string`                    | `-`     |
| name      | 储存方式。适用于：`local`、`session`、`cookie`             | `string`                    | `local` |
| value     | 储存内容。适用于：`local`、`session`、`cookie`             | `string`、`object`、`boolean` | `-`     |
| default   | 未获取到值时的返回值。适用于：`local`、`session`、`cookie`       | `string`、`object`、`boolean` | `null`  |
| attrs     | 属性，详见 [attrs](#attrs)                           | `object`                    | `-`     |

#### Attrs

| 名称      | 必填 | 说明                                           | 类型              | 默认值     |
|:--------|:---|:---------------------------------------------|:----------------|:--------|
| expires | 否  | 有效期。类型为 `number` 时，单位为天。适用于：`local`、`cookie` | `number`、`Date` | `-`     |
| path    | 否  | 储存路径。适用于：`cookie`                            | `string`        | `-`     |
| domain  | 否  | 域名。适用于：`cookie`                              | `string`        | `-`     |
| secure  | 否  | 是否需要安全协议。适用于：`cookie`                        | `boolean`       | `false` |

### 方法

instance.setItem(key[, attrs])

instance.getItem(key[, def])

instance.removeItem(key)

instance.clear()
