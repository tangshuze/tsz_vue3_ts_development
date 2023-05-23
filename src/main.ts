/*
 * @Author: Tsz
 * @Date: 2023-05-23 20:43:48
 */
import { createApp } from 'vue'
import App from './App.vue'
// router
import router from "./router/index"
import '@/styles/style.scss'
// pinia
import { createPinia } from 'pinia'
const pinia = createPinia()
import 'xe-utils'
import 'vxe-table/lib/style.css'
import SvgIcon from "@/components/SvgIcon/index.vue"
import 'virtual:svg-icons-register'
import  piniaPersist from 'pinia-plugin-persist'


pinia.use(piniaPersist)

const app = createApp(App as any)

//routes 
app.use(router)
app.use(pinia)
app.component("svg-icon", SvgIcon);
app.mount('#app')