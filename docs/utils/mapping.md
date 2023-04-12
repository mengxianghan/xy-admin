# mapping 映射

将列表数据映射成新的数据结构

## 示例

### 基础用法

::: code-group

```js [使用]
const data = [
    { id: '1', title: '选项1', number: 1 },
    { id: '2', title: '选项2', number: 2 },
    { id: '3', title: '选项3', number: 3 },
    { id: '4', title: '选项4', number: 4 },
    { id: '5', title: '选项5', number: 5 },
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
    { "key": "1", "label": "选项1", "value": 1 },
    { "key": "2", "label": "选项2", "value": 2 },
    { "key": "3", "label": "选项3", "value": 3 },
    { "key": "4", "label": "选项4", "value": 4 },
    { "key": "5", "label": "选项5", "value": 5 }
]
```

:::

### 数结构

::: code-group

```js [使用]
const data = [
    {
        id: '1',
        title: '选项1',
        number: 1,
        childList: [
            { id: '1', title: '选项1', number: 1 },
            { id: '2', title: '选项2', number: 2 },
            { id: '3', title: '选项3', number: 3 },
            { id: '4', title: '选项4', number: 4 },
            { id: '5', title: '选项5', number: 5 },
        ],
    },
    {
        id: '2',
        title: '选项2',
        number: 2,
        childList: [
            { id: '1', title: '选项1', number: 1 },
            { id: '2', title: '选项2', number: 2 },
            { id: '3', title: '选项3', number: 3 },
            { id: '4', title: '选项4', number: 4 },
            { id: '5', title: '选项5', number: 5 },
        ],
    },
    { id: '3', title: '选项3', number: 3 },
    { id: '4', title: '选项4', number: 4 },
    { id: '5', title: '选项5', number: 5 },
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

```js [输出]
;[
    {
        key: '1',
        label: '选项1',
        value: 1,
        children: [
            { key: '1', label: '选项1', value: 1 },
            { key: '2', label: '选项2', value: 2 },
            { key: '3', label: '选项3', value: 3 },
            { key: '4', label: '选项4', value: 4 },
            { key: '5', label: '选项5', value: 5 },
        ],
    },
    {
        key: '2',
        label: '选项2',
        value: 2,
        children: [
            { key: '1', label: '选项1', value: 1 },
            { key: '2', label: '选项2', value: 2 },
            { key: '3', label: '选项3', value: 3 },
            { key: '4', label: '选项4', value: 4 },
            { key: '5', label: '选项5', value: 5 },
        ],
    },
    { key: '3', label: '选项3', value: 3 },
    { key: '4', label: '选项4', value: 4 },
    { key: '5', label: '选项5', value: 5 },
]
```

:::

### 保留字段

::: code-group

```js [使用]
const data = [
    { id: '1', title: '选项1', number: 1 },
    { id: '2', title: '选项2', number: 2 },
    { id: '3', title: '选项3', number: 3 },
    { id: '4', title: '选项4', number: 4 },
    { id: '5', title: '选项5', number: 5 },
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
    { "id": "1", "title": "选项1", "number": 1, "key": "1", "label": "选项1", "value": 1 },
    { "id": "2", "title": "选项2", "number": 2, "key": "2", "label": "选项2", "value": 2 },
    { "id": "3", "title": "选项3", "number": 3, "key": "3", "label": "选项3", "value": 3 },
    { "id": "4", "title": "选项4", "number": 4, "key": "4", "label": "选项4", "value": 4 },
    { "id": "5", "title": "选项5", "number": 5, "key": "5", "label": "选项5", "value": 5 }
]
```

:::

### 使用函数

::: code-group

```js [使用]
const data = [
    { id: '1', title: '选项1', number: 1 },
    { id: '2', title: '选项2', number: 2 },
    { id: '3', title: '选项3', number: 3 },
    { id: '4', title: '选项4', number: 4 },
    { id: '5', title: '选项5', number: 5 },
]

const list = mapping({
    data,
    filedNames: {
        key: 'id',
        label: 'title',
        value: 'number',
        alias: (item, index, array) => {
            return `${item.title}-${index}`
        },
    },
    keepOtherFields: true,
})

console.log(list)
```

```json [输出]
[
    { "key": "1", "label": "选项1", "value": 1, "alias": "选项1-0" },
    { "key": "2", "label": "选项2", "value": 2, "alias": "选项2-1" },
    { "key": "3", "label": "选项3", "value": 3, "alias": "选项3-2" },
    { "key": "4", "label": "选项4", "value": 4, "alias": "选项4-3" },
    { "key": "5", "label": "选项5", "value": 5, "alias": "选项5-4" }
]
```

:::