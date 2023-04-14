# 去除权限控制

当你要开发一个小系统，或一个完全不需要权限控制的，开放后台任意访问的管理面板。

## 去除路由守卫

移除代码 `/src/core/index.js` 第 `11` 行

<<< @/../src/core/index.js {11}


## 让菜单生成不经过动态路由

<<< @/../src/router/config.js {22-51}

将路由添加到 `/src/router/config.js` 的 `constantRouterMap` 中