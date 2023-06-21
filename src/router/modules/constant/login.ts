
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [{
  path: '/login',
  component: () => import('@/views/login/index.vue'),
  
}]
export default routes