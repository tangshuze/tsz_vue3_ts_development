import {RouteRecordRaw} from 'vue-router';

const testRoutes:Array<RouteRecordRaw> = [
  {
    path:'/',
    component: () => import('@/views/homeView.vue')
  }
]
export default testRoutes