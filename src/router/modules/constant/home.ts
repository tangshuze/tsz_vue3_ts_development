
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [{
  path: '/',
  component: () => import('@/views/home/index.vue'),
  
}]
export default routes