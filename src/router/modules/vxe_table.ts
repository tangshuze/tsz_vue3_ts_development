
import {RouteRecordRaw} from 'vue-router';

const testRoutes:Array<RouteRecordRaw> = [
  {
    path:'/vxe',
    component: () => import('@/views/test_page/test_vxetable/index.vue')
  },
]
export default testRoutes