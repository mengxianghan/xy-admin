# XYAliOSS 网络请求库

基于 `Axios` 网络请求库

## 安装

使用 npm：

```shell
npm install ali-oss xy-ali-oss -S
```

使用 jsDelivr CDN：

```html

<script src="https://cdn.jsdelivr.net/npm/ali-oss@6.17.1/dist/aliyun-oss-sdk.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/xy-ali-oss/dist/index.min.js"></script>
```

## 响应结构

```json5
{
  // 文件名称
  "name": "",
  // 上传后的文件 url
  "url": "",
  // 文件后缀
  "suffix": "",
  // 元信息
  "meta": {}
}
```

## 示例

### 基础用法

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>example</title>
</head>
<body>

<input type="file" id="file">
<button id="upload">上传</button>

<script src="https://cdn.jsdelivr.net/npm/ali-oss@6.17.1/dist/aliyun-oss-sdk.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/xy-ali-oss/dist/index.min.js"></script>
<script src=""></script>
<script>
  const options = {
    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: "yourRegion",
    // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
    accessKeyId: "yourAccessKeyId",
    accessKeySecret: "yourAccessKeySecret",
    // 填写Bucket名称。
    bucket: "examplebucket"
  };
  const oss = new XYAliOSS(options);

  // 分片上传
  document.getElementById("upload").addEventListener("click", async () => {
    const file = document.getElementById("file").files[0];
    const result = await oss.put(file.name, file);
    console.log(result);
  });
</script>
</body>
</html>
```

### 异步获取配置

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>example</title>
</head>
<body>

<input type="file" id="file">
<button id="upload">上传</button>

<script src="https://cdn.jsdelivr.net/npm/ali-oss@6.17.1/dist/aliyun-oss-sdk.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/xy-ali-oss/dist/index.min.js"></script>
<script src=""></script>
<script>
  const options = {
    async: true,
    // 刷新临时访问凭证的时间间隔，单位为毫秒。
    refreshSTSTokenInterval: 300000,
    // 刷新 STSToken
    refreshSTSToken: async () => {
      const result = await fetch("https://api.example.com/xxx").catch(() => {
      });
      // 刷新时以下三项必须返回
      return {
        accessKeyId: result.accessKeyId,
        accessKeySecret: result.accessKeySecret,
        stsToken: result.stsToken
      };
    },
    getOptions: async () => {
      const result = await fetch("https://api.example.com/xxx").catch(() => {
      });
      return {
        // yourRegion填写Bucket所在地域。以华东1（杭州）为例，yourRegion填写为oss-cn-hangzhou。
        region: result.region,
        // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
        accessKeyId: result.accessKeyId,
        accessKeySecret: result.accessKeySecret,
        // 从STS服务获取的安全令牌（SecurityToken）。
        stsToken: result.stsToken,
        // 填写Bucket名称。
        bucket: result.bucket,
        ...
      };
    }
  };
  const oss = new XYAliOSS(options);

  // 分片上传
  document.getElementById("upload").addEventListener("click", async () => {
    const file = document.getElementById("file").files[0];
    const result = await oss.put(file.name, file);
    console.log(result);
  });
</script>
</body>
</html>
```

### 分片上传

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>example</title>
</head>
<body>

<input type="file" id="file">
<button id="upload">上传</button>

<script src="https://cdn.jsdelivr.net/npm/ali-oss@6.17.1/dist/aliyun-oss-sdk.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/xy-ali-oss/dist/index.min.js"></script>
<script src=""></script>
<script>
  const options = {
    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: "yourRegion",
    // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
    accessKeyId: "yourAccessKeyId",
    accessKeySecret: "yourAccessKeySecret",
    // 填写Bucket名称。
    bucket: "examplebucket"
  };
  const oss = new XYAliOSS(options);

  // 分片上传
  document.getElementById("upload").addEventListener("click", async () => {
    const file = document.getElementById("file").files[0];
    const result = await oss.multipartUpload(file.name, file, {
      progress: (percent, cpt, res) => {
        // 在这里可以添加进度
      }
    });
    console.log(result);
  });
</script>
</body>
</html>
```

### 断点续传

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>example</title>
</head>
<body>

<input type="file" id="file">
<button id="upload">上传</button>
<button id="pause">暂停</button>
<button id="resume">继续上传</button>
<button id="abort">中断上传</button>

<script src="https://cdn.jsdelivr.net/npm/ali-oss@6.17.1/dist/aliyun-oss-sdk.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/xy-ali-oss/dist/index.min.js"></script>
<script src=""></script>
<script>
  let abortCheckpoint = null;
  const options = {
    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: "yourRegion",
    // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
    accessKeyId: "yourAccessKeyId",
    accessKeySecret: "yourAccessKeySecret",
    // 填写Bucket名称。
    bucket: "examplebucket"
  };
  const oss = new XYAliOSS(options);

  let abortCheckpoint = null;

  // 分片上传
  document.getElementById("upload").addEventListener("click", async () => {
    const file = document.getElementById("file").files[0];
    const result = await oss.multipartUpload(file.name, file, {
      progress: (percent, cpt, res) => {
        abortCheckpoint = cpt;
      }
    });
    console.log(result);
  });

  // 暂停
  document.getElementById("pause").addEventListener("click", async () => {
    const store = await oss.getStore();
    store.cancel();
  });

  // 继续上传
  document.getElementById("resume").addEventListener("click", async () => {
    const result = await oss.resumeMultipartUpload(abortCheckpoint.uploadId, abortCheckpoint.file, {
      checkpoint: abortCheckpoint,
      progress: (percent, cpt) => {
        abortCheckpoint = cpt;
      }
    });
    console.log(result);
  });

  // 中断上传
  document.getElementById("abort").addEventListener("click", async () => {
    const store = await oss.getStore();
    store.abortMultipartUpload(abortCheckpoint.name, abortCheckpoint.uploadId);
  });
</script>
</body>
</html>
```

## XYAliOSS 实例

### 创建一个新实例

new XYAliOSS(options)

```js
const instance = new XYAliOSS({})
```

### 实例方法

**以下是可用的实例方法。指定的配置将与实例的配置合并。**

instance.put(filename, file[, config])

instance.multipartUpload(filename, file[, config])

instance.resumeMultipartUpload(url[, data[, config]])

**其他实例方法**
使用其他实例需要先获取`Store`，由于支持异步设置配置项，所以`getStore`通过`Promise`返回

const store = await instance.getStore()

store.cancel(url[, config])

store.append(filename, target)

## 配置

这是创建实例时可以用的配置项。仅列举出了`XYAliOSS`配置和基础配置。[更多玩法](https://help.aliyun.com/product/31815.html)

```
{
    // 是否异步获取配置信息，配合 getOptions 使用。默认：false
    async: false,
    // 使用 GUID 生成新的文件名。默认：true
    rename: true,
    // 上传文件储存的根目录
    rootPath: '',
    // cdn 域名，开启 cname 后优先使用 cname
    cdnUrl: '',
    // STSToken 刷新间隔
    refreshSTSTokenInterval: 300000,
    config: {
        headers: { 'Cache-Control': 'public' },
    },
    // 刷新 STSToken
    refreshSTSToken: () => {},
    // 异步获取配置信息，async=true 时有效；支持配置中所有的配置项。
    getOptions: async ()=>{},
}
```

更多使用方法参考 [Axios](https://www.axios-http.cn/docs/intro)
