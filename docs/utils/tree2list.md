# tree2list

```js :no-line-numbers
tree2list(data, fieldNames)
```

树型数据结构转换成线型数据结构

## 参数

| 名称              | 说明       | 类型        | 默认值                      |
|-----------------|----------|-----------|--------------------------|
| data            | 数据列表     | `array`   | `-`                      |
| fieldNames      | 字段名      | `object`  | `{children: 'children'}` |

## 示例

::: code-group

```js [例子]
const data = [
    {
        id: '1', title: '选项1', children: [
            { id: '1-1', title: '选项1-1' },
            { id: '1-2', title: '选项1-2' }
        ]
    },
    {
        id: '2', title: '选项2', children: [
            { id: '2-1', title: '选项2-1' },
            { id: '2-2', title: '选项2-2' }
        ]
    },
]

const list = tree2list(data)

console.log(list)
```

```json [输出]
[
  {
    "id": "1",
    "title": "选项1",
    "children": [
      {
        "id": "1-1",
        "title": "选项1-1"
      },
      {
        "id": "1-2",
        "title": "选项1-2"
      }
    ]
  },
  {
    "id": "1-1",
    "title": "选项1-1"
  },
  {
    "id": "1-2",
    "title": "选项1-2"
  },
  {
    "id": "2",
    "title": "选项2",
    "children": [
      {
        "id": "2-1",
        "title": "选项2-1"
      },
      {
        "id": "2-2",
        "title": "选项2-2"
      }
    ]
  },
  {
    "id": "2-1",
    "title": "选项2-1"
  },
  {
    "id": "2-2",
    "title": "选项2-2"
  }
]
```