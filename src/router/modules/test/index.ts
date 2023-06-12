
import {RouteRecordRaw} from 'vue-router';

const routes:Array<RouteRecordRaw> = [
  {
    path:'/',
    component: () => import('@/views/homeView.vue')
  },
  {
    path:'/animate',
    component: () => import('@/views/test_page/test_animate/index.vue')
  },
  {
    path:'/avue',
    component: () => import('@/views/test_page/test_avue/index.vue')
  },
  {
    path:'/editor',
    component: () => import('@/views/test_page/test_editor/index.vue')
  },
  {
    path:'/mobile',
    component: () => import('@/views/test_page/test_mobile/index.vue')
  },
  {
    path:'/svg',
    component: () => import('@/views/test_page/test_svg/index.vue')
  },
  {
    path:'/wind',
    component: () => import('@/views/test_page/test_tailwind/index.vue')
  },
  {
    path:'/vxe',
    component: () => import('@/views/test_page/test_vxetable/index.vue')
  },
  {
    path:'/tsx',
    component: () => import('@/views/test_page/test_tsx/index.tsx')
  },
]
export default routes