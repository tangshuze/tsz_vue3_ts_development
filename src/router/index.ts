
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import routesList from './modules/test'
const constant: any = import.meta.glob("./modules/constant/*.ts", { eager: true });
const whiteRoutes: Array<RouteRecordRaw> = [];
for (const key in constant) {
  whiteRoutes.push(...constant[key].default);
}
whiteRoutes.push({
  path: '/:pathMath(.*)*',
  redirect: '/404',
  name: 'Any'
})
const router = createRouter({
  history: createWebHistory(), // history 模式则使用 createWebHistory()
  routes: whiteRoutes,
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
});
for (const key in routesList) {
  router.addRoute({
    name:routesList[key].name,
    path:routesList[key].path,
    component: (routesList[key]!.component as any).default
  });
}
router.beforeEach(async (_to, _from, next) => {
  NProgress.start();
  next();
});
router.afterEach((_to) => {
  NProgress.done();
});

export default router;