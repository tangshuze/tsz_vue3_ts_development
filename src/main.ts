/*
 * @Author: Tsz
 * @Date: 2023-05-23 20:43:48
 */
import { App, createApp } from 'vue'
import router from "./router/index"
import '@/styles/style.scss';
import '@/styles/TailWindCss/index.css';
import { createPinia } from 'pinia'
import App1 from './App.vue'
const pinia = createPinia()
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import SvgIcon from "@/components/SvgIcon/index.vue"
import 'virtual:svg-icons-register'
import 'animate.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

console.log(import.meta.env)

const app = createApp(App1 as any)
const useTable = (app: App) => {
  app.use(VXETable)
}
// app.config.globalProperties//全局属性

app.use(router)
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(useTable)
app.component("svg-icon", SvgIcon);
app.mount('#app')