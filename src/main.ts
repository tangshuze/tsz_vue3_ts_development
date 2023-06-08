/*
 * @Author: Tsz
 * @Date: 2023-05-23 20:43:48
 */
import { createApp } from 'vue'
import router from "./router/index"
import  '@/styles/style.scss';
import  '@/styles/TailWindCss/index.css';
import { createPinia } from 'pinia'
import App from './App.vue'
const pinia = createPinia()
import 'xe-utils'
import 'vxe-table/lib/style.css'
import SvgIcon from "@/components/SvgIcon/index.vue"
import 'virtual:svg-icons-register'
import 'animate.css';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

console.log(import.meta.env);
if(import.meta.env.VITE_USER_NODE_ENV === 'mock'){
  console.log('进入mock了');
  // mockRequest()
}
const app = createApp(App as any)

// app.config.globalProperties//全局属性

app.use(router)
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.component("svg-icon", SvgIcon);
app.mount('#app')

