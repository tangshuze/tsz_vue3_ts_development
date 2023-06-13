
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [{
  path: '/404',
  component: () => import('@/views/404/index.vue'),
  
}]
export default routes