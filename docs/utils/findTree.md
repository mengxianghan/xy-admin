# findTree

```js :no-line-numbers
findTree(data, value, callback, fieldNames)
```

从树型结构中查找符合条件的数据

## 参数

| 名称         | 说明    | 类型                         | 默认值                                   |
|------------|-------|----------------------------|---------------------------------------|
| data       | 数据列表  | `array`                    | `-`                                   |
| value      | 父级初始值 | `number` `string` `object` | `0`                                   |
| callback   | 回调函数  | `function`                 | `-`                                   |
| fieldNames | 字段名   | `object`                   | `{ key: 'id', children: 'children' }` |

## 示例

### 基础用法

::: code-group

```js [例子]
const data = [
    {
        "id": "1",
        "title": "选项1",
        "parentId": "0",
        "children": [
            {
                "id": "1-1",
                "title": "选项1-1",
                "parentId": "1"
            },
            {
                "id": "1-2",
                "title": "选项1-2",
                "parentId": "1"
            }
        ]
    },
    {
        "id": "2",
        "title": "选项2",
        "parentId": "0",
        "children": [
            {
                "id": "2-1",
                "title": "选项2-1",
                "parentId": "2"
            },
            {
                "id": "2-2",
                "title": "选项2-2",
                "parentId": "2"
            }
        ]
    }
]

findTree(data, '2-1', (item, index, array, path) => {
    console.log(item)
    console.log(index)
    console.log(array)
    console.log(path)
})
```

```json [输出 item]
{
  "id": "2-1",
  "title": "选项2-1",
  "parentId": "2"
}
```

```json [输出 index]
0
```

```json [输出 array]
[
  {
    "id": "2-1",
    "title": "选项2-1",
    "parentId": "2"
  },
  {
    "id": "2-2",
    "title": "选项2-2",
    "parentId": "2"
  }
]
```

```json [输出 path]
[
  {
    "id": "2",
    "title": "选项2",
    "parentId": "0",
    "children": [
      {
        "id": "2-1",
        "title": "选项2-1",
        "parentId": "2"
      },
      {
        "id": "2-2",
        "title": "选项2-2",
        "parentId": "2"
      }
    ]
  },
  {
    "id": "2-1",
    "title": "选项2-1",
    "parentId": "2"
  }
]
```

:::


### 使用多个字段

::: code-group

```js [例子]
const data = [
    {
        "id": "1",
        "title": "选项1",
        "parentId": "0",
        "active": false,
        "children": [
            {
                "id": "1-1",
                "title": "选项1-1",
                "parentId": "1",
                "active": false,
            },
            {
                "id": "1-2",
                "title": "选项1-2",
                "parentId": "1",
                "active": false,
            }
        ]
    },
    {
        "id": "2",
        "title": "选项2",
        "parentId": "0",
        "active": false,
        "children": [
            {
                "id": "2-1",
                "title": "选项2-1",
                "parentId": "2",
                "active": false,
            },
            {
                "id": "2-2",
                "title": "选项2-2",
                "parentId": "2",
                "active": true,
            }
        ]
    }
]

findTree(data, { parentId: '2', active: true }, (item, index, array, path) => {
    console.log(item)
    console.log(index)
    console.log(array)
    console.log(path)
})
```

```json [输出 item]
{
  "id": "2-2",
  "title": "选项2-2",
  "parentId": "2",
  "active": true
}
```

```json [输出 index]
1
```

```json [输出 array]
[
  {
    "id": "2-1",
    "title": "选项2-1",
    "parentId": "2",
    "active": false
  },
  {
    "id": "2-2",
    "title": "选项2-2",
    "parentId": "2",
    "active": true
  }
]
```

```json [输出 path]
[
  {
    "id": "2",
    "title": "选项2",
    "parentId": "0",
    "active": false,
    "children": [
      {
        "id": "2-1",
        "title": "选项2-1",
        "parentId": "2",
        "active": false
      },
      {
        "id": "2-2",
        "title": "选项2-2",
        "parentId": "2",
        "active": true
      }
    ]
  },
  {
    "id": "2-2",
    "title": "选项2-2",
    "parentId": "2",
    "active": true
  }
]
```

:::