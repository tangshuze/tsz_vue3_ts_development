
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [{
  path: '/404',
  component: () => import('@/views/404/index.vue'),

},
{
  path: '/',
  component: () => import('@/views/home/index.vue'),

}]
export default routes