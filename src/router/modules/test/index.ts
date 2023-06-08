/*
 * @Author: Tsz
 * @Date: 2023-05-23 20:43:48
 */
import {RouteRecordRaw} from 'vue-router';

const testRoutes:Array<RouteRecordRaw> = [
  {
    path:'/',
    component: () => import('@/views/homeView.vue')
  },
]
export default testRoutes