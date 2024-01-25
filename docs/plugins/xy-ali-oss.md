# XYAliOSS 阿里云 OSS 上传

## 安装

使用 npm：

```shell
npm install ali-oss xy-ali-oss -S
```

使用 jsDelivr CDN：

```html

<script src="https://cdn.jsdelivr.net/npm/ali-oss/dist/aliyun-oss-sdk.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/xy-ali-oss/dist/index.min.js"></script>
```

## 响应结构

```json5
{
  code: 200,
  data: {
    // 文件名称
    name: '',
    // 上传后的文件 url
    url: '',
    // 文件后缀
    suffix: '',
    // 元信息
    meta: {},
  },
}
```

## 示例

### 基础用法

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta
            name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta
            http-equiv="X-UA-Compatible"
            content="ie=edge"/>
    <title>example</title>
</head>
<body>
<input
        type="file"
        id="file"/>
<button id="upload">上传</button>

<script src="https://cdn.jsdelivr.net/npm/ali-oss@6.17.1/dist/aliyun-oss-sdk.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/xy-ali-oss/dist/index.min.js"></script>
<script src=""></script>
<script>
    const options = {
        // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
        region: 'yourRegion',
        // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
        accessKeyId: 'yourAccessKeyId',
        accessKeySecret: 'yourAccessKeySecret',
        // 填写Bucket名称。
        bucket: 'examplebucket',
    }
    const oss = new XYAliOSS(options)

    // 上传
    document.getElementById('upload').addEventListener('click', async () => {
        const file = document.getElementById('file').files[0]
        const result = await oss.put(file.name, file, {
            rename: false, // 可以单独控制是否重新命名
        })
        console.log(result)
    })
</script>
</body>
</html>
```

### 异步获取配置

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta
            name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta
            http-equiv="X-UA-Compatible"
            content="ie=edge"/>
    <title>example</title>
</head>
<body>
<input
        type="file"
        id="file"/>
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

    // 上传
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
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta
            name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta
            http-equiv="X-UA-Compatible"
            content="ie=edge"/>
    <title>example</title>
</head>
<body>
<input
        type="file"
        id="file"/>
<button id="upload">上传</button>

<script src="https://cdn.jsdelivr.net/npm/ali-oss@6.17.1/dist/aliyun-oss-sdk.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/xy-ali-oss/dist/index.min.js"></script>
<script src=""></script>
<script>
    const options = {
        // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
        region: 'yourRegion',
        // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
        accessKeyId: 'yourAccessKeyId',
        accessKeySecret: 'yourAccessKeySecret',
        // 填写Bucket名称。
        bucket: 'examplebucket',
    }
    const oss = new XYAliOSS(options)

    // 分片上传
    document.getElementById('upload').addEventListener('click', async () => {
        const file = document.getElementById('file').files[0]
        const result = await oss.multipartUpload(file.name, file, {
            progress: (percent, cpt, res) => {
                // 在这里可以添加进度
                console.log(`上传进度：${ percent }`)
            },
        })
        console.log(result)
    })
</script>
</body>
</html>
```

### 断点续传

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta
            name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta
            http-equiv="X-UA-Compatible"
            content="ie=edge"/>
    <title>example</title>
</head>
<body>
<input
        type="file"
        id="file"/>
<button id="upload">上传</button>
<button id="pause">暂停</button>
<button id="resume">继续上传</button>
<button id="abort">中断上传</button>

<script src="https://cdn.jsdelivr.net/npm/ali-oss@6.17.1/dist/aliyun-oss-sdk.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/xy-ali-oss/dist/index.min.js"></script>
<script src=""></script>
<script>
    let abortCheckpoint = null
    const options = {
        // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
        region: 'yourRegion',
        // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
        accessKeyId: 'yourAccessKeyId',
        accessKeySecret: 'yourAccessKeySecret',
        // 填写Bucket名称。
        bucket: 'examplebucket',
    }
    const oss = new XYAliOSS(options)

    let abortCheckpoint = null

    // 分片上传
    document.getElementById('upload').addEventListener('click', async () => {
        const file = document.getElementById('file').files[0]
        const result = await oss.multipartUpload(file.name, file, {
            progress: (percent, cpt, res) => {
                abortCheckpoint = cpt
            },
        })
        console.log(result)
    })

    // 暂停
    document.getElementById('pause').addEventListener('click', async () => {
        const store = await oss.getStore()
        store.cancel()
    })

    // 继续上传
    document.getElementById('resume').addEventListener('click', async () => {
        const result = await oss.multipartUpload(abortCheckpoint.uploadId, abortCheckpoint.file, {
            checkpoint: abortCheckpoint,
            progress: (percent, cpt) => {
                abortCheckpoint = cpt
            },
        })
        console.log(result)
    })

    // 中断上传
    document.getElementById('abort').addEventListener('click', async () => {
        const store = await oss.getStore()
        store.abortMultipartUpload(abortCheckpoint.name, abortCheckpoint.uploadId)
    })
</script>
</body>
</html>
```

## API

### 参数

这是创建实例时可以用的配置项。仅列举出了`XYAliOSS`配置和基础配置。[详细配置](https://help.aliyun.com/product/31815.html)

| 名称                      | 说明                                   | 类型         | 默认值                                           |
|-------------------------|--------------------------------------|------------|-----------------------------------------------|
| async                   | 是否异步获取配置信息，配合 getOptions 使用。默认：false | `boolean`  | `false`                                       |
| rename                  | 使用 GUID 生成新的文件名。                     | `boolean`  | `true`                                        |
| rootPath                | 上传文件储存的根目录                           | `string`   | `-`                                           |
| enableCdn               | 启用 cdn                               | `boolean`  | `false`                                       |
| cdnUrl                  | cdn 域名                               | `string`   | `-`                                           |
| retryCount              | 重试次数，上传失败后重试的次数，仅分片上传有效              | `number`   | `5`                                           |
| refreshSTSTokenInterval | STSToken 刷新间隔                        | `number`   | `300000`                                      |
| config                  | 基础配置                                 | `object`   | `{ headers: { 'Cache-Control': 'public' }, }` |
| refreshSTSToken         | 刷新 STSToken                          | `function` | `()=>{}`                                      |
| getOptions              | 异步获取配置信息，async=true 时有效；支持配置中所有的配置项。 | `function` | `()=>{}`                                      |

### 方法

**基础实例方法**

put(filename, file[, config])

multipartUpload(filename, file[, config])

**其他实例方法**

第一步获取 store：

const store = await instance.getStore()

第二步使用：

store.cancel(url[, config])

store.abortMultipartUpload(filename, uploadId)

store.append(filename, target)

## 依赖

[ali-oss](https://www.npmjs.com/package/ali-oss)

## 参考文档

[对象储存](https://help.aliyun.com/product/31815.html)
