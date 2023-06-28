/*
 * @Author: Tsz
 * @Date: 2023-05-23 20:43:48
 */
import '@/styles/TailWindCss/index.css';
import { App, createApp } from 'vue'
import router from "./router/index"
import '@/styles/style.scss';
import { createPinia } from 'pinia'
import App1 from './App.vue'
const pinia = createPinia()
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import SvgIcon from "@/components/SvgIcon/index.vue"
import 'virtual:svg-icons-register'
import 'animate.css'
import './rem.ts'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import formCreate from '@form-create/element-ui'
import ElementPLUS from 'element-plus'
import 'element-plus/dist/index.css'


const app = createApp(App1 as any)
const useTable = (app: App) => {
  app.use(VXETable)
}

// app.config.globalProperties//全局属性

app.use(router)
app.use(formCreate)
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(ElementPLUS)
app.use(useTable)
app.component("svg-icon", SvgIcon);
app.mount('#app')