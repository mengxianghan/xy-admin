# deepMerge

```js :no-line-numbers
deepMerge(object, sources)
```

合并两个对象

## 参数

| 名称    | 说明     | 类型     | 默认值 |
| ------- | -------- | -------- | ------ |
| object  | 目标对象 | `object` | -      |
| sources | 来源对象 | `object` | -      |

## 代码演示

### 基础用法

::: code-group

```js [示例]
const object = {
  a: [{ b: 2 }, { d: 4 }],
}

const other = {
  a: [{ c: 3 }, { e: 5 }],
}

console.log(deepMerge(object, other))
```

```json [输出]
{
  "a": [
    { "b": 2, "c": 3 },
    { "d": 4, "e": 5 }
  ]
}
```

:::
