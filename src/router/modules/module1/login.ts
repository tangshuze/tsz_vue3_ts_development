
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [{
  path: '/',
  component: () => import('@/views/login/index.vue')
}]
export default routes