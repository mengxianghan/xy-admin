# deep

```js :no-line-numbers
deep(data, fieldNames)
```

获取树型数据最深层级

## 参数

| 名称         | 说明   | 类型       | 默认值                        |
|------------|------|----------|----------------------------|
| data       | 数据列表 | `array`  | `-`                        |
| fieldNames | 字段名  | `object` | `{ children: 'children' }` |

## 示例

### 基础用法

::: code-group
```js [例子]
const data = [
    {
        "id": "1",
        "title": "选项1",
        "children": [
            {
                "id": "1-1",
                "title": "选项1-1",
                "children": [
                    {
                        "id": '1-1-1',
                        "title": '选项1-1-1'
                    }
                ]
            },
            {
                "id": "1-2",
                "title": "选项1-2",
            }
        ]
    },
    {
        "id": "2",
        "title": "选项2",
        "children": [
            {
                "id": "2-1",
                "title": "选项2-1",
            },
            {
                "id": "2-2",
                "title": "选项2-2",
            }
        ]
    }
]

const count = deep(data)
```

```json [输出]
3
```
:::