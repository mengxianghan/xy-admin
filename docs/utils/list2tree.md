# list2tree

```js :no-line-numbers
list2tree(data, parentValue, fieldNames)
```

线型数据结构转换成树型数据结构

## 参数

| 名称          | 说明    | 类型                | 默认值                                                          |
|-------------|-------|-------------------|--------------------------------------------------------------|
| data        | 数据列表  | `array`           | `-`                                                          |
| parentValue | 父级初始值 | `number` `string` | `0`                                                          |
| fieldNames  | 字段名   | `object`          | `{ key: 'id', children: 'children', parentKey: 'parentId' }` |

## 示例

::: code-group

```js [例子]
const data = [
    { id: '1', title: '选项1', parentId: '0' },
    { id: '1-1', title: '选项1-1', parentId: '1' },
    { id: '1-2', title: '选项1-2', parentId: '1' },
    { id: '2', title: '选项2', parentId: '0' },
    { id: '2-1', title: '选项2-1', parentId: '2' },
    { id: '2-2', title: '选项2-2', parentId: '2' }
]

const list = tree2list(data)

console.log(list)
```

```json [输出]
[
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
```