# mapping

```js :no-line-numbers
mapping({ data, fieldNames, expand, treeFieldName, keepOtherFields })
```

将列表数据映射成新的数据结构

## 参数

| 名称              | 说明       | 类型        | 默认值     |
|-----------------|----------|-----------|---------|
| data            | 数据列表     | `array`   | `-`     |
| fieldNames      | 字段名      | `object`  | `-`     |
| expand          | 扩展数据     | `object`  | `-`     |
| treeFieldName   | 子节点字段名   | `string`  | `-`     |
| keepOtherFields | 是否保留其他字段 | `boolean` | `false` |

## 示例

### 基础用法

::: code-group

```js [例子]
const data = [
    { id: '1', title: '选项1', number: 1 },
    { id: '2', title: '选项2', number: 2 },
]

const list = mapping({
    data,
    filedNames: {
        key: 'id',
        label: 'title',
        value: 'number',
    },
})

console.log(list)
```

```json [输出]
[
  {
    "key": "1",
    "label": "选项1",
    "value": 1
  },
  {
    "key": "2",
    "label": "选项2",
    "value": 2
  }
]
```

:::

### 扩展数据

[使用函数](#使用函数)也可实现相同的功能
::: code-group

```js [例子]
const data = [
    { id: '1', title: '选项1', number: 1 },
    { id: '2', title: '选项2', number: 2 },
]

const list = mapping({
    data,
    filedNames: {
        key: 'id',
        label: 'title',
        value: 'number',
    },
    expand: {
        active: true
    }
})

console.log(list)
```

```json [输出]
[
  {
    "key": "1",
    "label": "选项1",
    "value": 1,
    "active": true
  },
  {
    "key": "2",
    "label": "选项2",
    "value": 2,
    "active": true
  }
]
```

:::

### 数结构

::: code-group

```js [例子]
const data = [
    {
        id: '1',
        title: '选项1',
        number: 1,
        childList: [
            { id: '1', title: '选项1', number: 1 },
            { id: '2', title: '选项2', number: 2 },
        ],
    },
    {
        id: '2',
        title: '选项2',
        number: 2,
        childList: [
            { id: '1', title: '选项1', number: 1 },
            { id: '2', title: '选项2', number: 2 },
        ],
    },
    { id: '3', title: '选项3', number: 3 },
    { id: '4', title: '选项4', number: 4 },
]

const list = mapping({
    data,
    filedNames: {
        key: 'id',
        label: 'title',
        value: 'number',
        children: 'childList',
    },
    treeFieldName: 'childList',
})

console.log(list)
```

```js [例子]
;[
    {
        key: '1',
        label: '选项1',
        value: 1,
        children: [
            { key: '1', label: '选项1', value: 1 },
            { key: '2', label: '选项2', value: 2 },
        ],
    },
    {
        key: '2',
        label: '选项2',
        value: 2,
        children: [
            { key: '1', label: '选项1', value: 1 },
            { key: '2', label: '选项2', value: 2 },
        ],
    },
    { key: '3', label: '选项3', value: 3 },
    { key: '4', label: '选项4', value: 4 },
]
```

:::

### 保留字段

::: code-group

```js [例子]
const data = [
    { id: '1', title: '选项1', number: 1 },
    { id: '2', title: '选项2', number: 2 },
]

const list = mapping({
    data,
    filedNames: {
        key: 'id',
        label: 'title',
        value: 'number',
    },
    keepOtherFields: true,
})

console.log(list)
```

```json [输出]
[
  {
    "id": "1",
    "title": "选项1",
    "number": 1,
    "key": "1",
    "label": "选项1",
    "value": 1
  },
  {
    "id": "2",
    "title": "选项2",
    "number": 2,
    "key": "2",
    "label": "选项2",
    "value": 2
  }
]
```

:::

### 使用函数

::: code-group

```js [例子]
const data = [
    { id: '1', title: '选项1', number: 1 },
    { id: '2', title: '选项2', number: 2 },
]

const list = mapping({
    data,
    filedNames: {
        key: 'id',
        label: 'title',
        value: 'number',
        alias: (item, index, array) => {
            return `${ item.title }-${ index }`
        },
    },
    keepOtherFields: true,
})

console.log(list)
```

```json [输出]
[
  {
    "key": "1",
    "label": "选项1",
    "value": 1,
    "alias": "选项1-0"
  },
  {
    "key": "2",
    "label": "选项2",
    "value": 2,
    "alias": "选项2-1"
  }
]
```

:::