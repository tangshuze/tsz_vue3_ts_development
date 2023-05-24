# vue@3

建议使用 setup 语法糖，类型推断文件夹各自组件的`type`使用 declare 声明

组件直接使用，无需引入，按照配置格式名称使用

例:
```js
  export interface GlobalComponents {
    Editor: typeof import('./components/editor/Editor.vue')['default']
    P_a: typeof import('./components/p_a/index.vue')['default']
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
    SvgIcon: typeof import('./components/SvgIcon/index.vue')['default']
    TestAuto: typeof import('./components/TestAuto/index.vue')['default']
  }
```
# vue-Router@4+

路由分模块引入，注册到主文件`index.ts`中，核心代码

```ts
const modules: any = import.meta.glob("./modules/**/*.ts", { eager: true });
```

后续路由在 `modules`目录 下进行 `update`

页面级权限直接通过守卫进行元信息权限校验,菜单和按钮等小粒度权限通过字典或其他方式进行动态的`addRoutes`

# Pinia

按需导入对应的 `store`,模块对应 `ID`，对应的持久化使用
`pinia-plugin-persist`插件

# pinia-plugin-persist

默认保存

```js
persist: {
  enabled: true; // true 表示开启持久化保存sessionStorage
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

`className:string` 为图标进行样式处理 `icon:string`为 `src/assets/icons/`路径下的 svg 文件名称

# Lodash

后续使用通过按需引入的方式

```js
import _xxx from "lodash";
```

# EventBus(原生封装)

```ts
import EventBus from "@/bus";
EventBus.dispatch("test", 1, 2);
EventBus.addEventListener("test", (a, b) => {
  console.log(a, b);
});
```
# cookie
```js
cookiesStorage {
  set(key:string,value:any,expires:number=3)//默认值为3天
  get(key:string)
}
```
# storage

useage
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

# tailwind css

使用的话建议下载一个vs code插件 `Tailwind CSS intelliSense`

配置`.vue`文件生效
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```


css配置引入入口`main.ts`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

可能会出现样式覆盖第三方库，到时候再说哎

# dayjs

常见日期获取和判断  utils

# decimaljs

数值类型高精度操作，可注入全局属性上

# echarts


# xlsx

封装`xlsx`前端导入导出

导出 main api
```js
XLSX.utils.book_new() 新建工作簿
xlsx.utils.json_to_sheet(json数组)创建工作表 json格式 or
xlsx.utils.aoa_to_sheet(二位数组)创建工作表 数组格式
xlsx.utils.book_append_sheet(工作簿, 工作表)
xlsx.writeFile(工作簿,名称,配置项) 下载生成的excel
```

导入 main api
```js
cosnt fileReader= new FileReader() Web 应用程序异步读取存储在用户计算机上的文件
fileReader.readAsBinaryString(file); 读取文件的内容为二进制
fileReader.onload 监听读取文件成功
xlsx.read(数据，配置项) 插件读取文件 生成工作簿
XLSX.utils.sheet_to_json(工作表) 把工作表转化为json
```

# wangeditor


usage

```vue
<template>
  <Editor v-model:value="val"></Editor>
</template>
<script lang="ts" setup>
import Editor from '@/components/editor/Editor.vue'
import { ref, watchEffect } from 'vue'
const val = ref('<p style="animation: 11s ease 0s infinite normal none running wordsLoop;">hello world</p>')
watchEffect(()=>{
  console.log(val.value)
})
</script>
<style lang="scss" scoped>

</style>
```

# vueuse@10

和lodash互相补充吧

useage
```js
import { useMouse, usePreferredDark, useLocalStorage } from "@vueuse/core"
export default {
  setup() {
    // tracks mouse position
    const { x, y } = useMouse()
    // is user prefers dark theme
    const isDark = usePreferredDark()
    // persist state in localStorage
    const store = useLocalStorage(
      "my-storage",
      {
        name: "Apple",
        color: "red",
      },
    )
    return { x, y, isDark, store }
  }
}
```

