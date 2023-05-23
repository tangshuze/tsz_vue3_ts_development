# vue@3

建议使用setup语法糖，类型推断文件夹各自组件的`type`使用declare声明

# vue-Router@4+

路由分模块引入，注册到主文件`index.ts`中，核心代码
```ts
const modules: any = import.meta.glob("./modules/**/*.ts", { eager: true });
```
后续路由在modules下进行 update

页面级权限直接通过守卫进行元信息权限校验,菜单和按钮等小粒度权限通过字典或其他方式进行动态的`addRoutes`

# Pinia

按需导入对应的store,模块对应ID，对应的持久化使用
`pinia-plugin-persist`插件

# pinia-plugin-persist

默认保存
```js
persist: {
    enabled: true // true 表示开启持久化保存sessionStorage 
}
```
手动
```js
strategies: [
    {
      key: 'user',
      storage: localStorage,
      paths: ['name'] 
    },
],
```


# Element-Plus

  1. 组件按需引入所需插件：unplugin-auto-import 、 unplugin-vue-components

  2. 图标按需引入所需插件：unplugin-auto-import 、 unplugin-icons

按需引入后无需再引入，直接使用即可

# svg-icon

全局注册，直接使用

```html
<svg-icon className="test" icon="keai"></svg-icon>
```
`className:string` 为图标进行样式处理 `icon:string`为 `src/assets/icons/`路径下的svg文件名称

# Lodash

后续使用通过按需引入的方式

```js
import _xxx from 'lodash'
```
# EventBus(原生封装)

```ts
import EventBus from '@/bus'
EventBus.dispatch('test', 1, 2)
EventBus.addEventListener('test', (a, b) => {
  console.log(a, b)
})

```

# storage
storage:
```js
storage.get(key:string)
storage.set(key:string,value:any)
storage.remove(key:string)
```
sessionStorage:
```js
sessionStorage.get(key:string)
sessionStorage.set(key:string,value:any)
sessionStorage.remove(key:string)
```

