# usePagination

# API

## Methods

| 方法名     | 说明           | 参数                                  | 默认值         |
| ---------- | -------------- | ------------------------------------- | -------------- |
| open       | 打开新标签页   | `(route)=>void`                       | `currentRoute` |
| close      | 关闭标签页     | `(route)=>void`                       | `currentRoute` |
| closeLeft  | 关闭左侧标签页 | `(route)=>void`                       | `currentRoute` |
| closeRight | 关闭右侧标签页 | `(route)=>void`                       | `currentRoute` |
| closeOther | 关闭其他标签页 | `(route)=>void`                       | `currentRoute` |
| reload     | 重新加载       | `(route)=>void`                       | `currentRoute` |
| setTitle   | 设置标签页标题 | `(title: string, route: Route)=>void` | -              |
