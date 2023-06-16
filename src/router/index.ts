
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// const modules: any = import.meta.glob("./modules/**/*.ts", { eager: true });
const whiteList: any = import.meta.glob("./modules/whiteList/*.ts", { eager: true });   //白名单
// const routes: Array<RouteRecordRaw> = [];
// for (const key in modules) {
//     routes.push(...modules[key].default);
// }
const whiteRoutes: Array<RouteRecordRaw> = [];
for (const key in whiteList) {
  whiteRoutes.push(...whiteList[key].default);
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

router.beforeEach(async (_to, _from, next) => {
  NProgress.start();
  next();
});

router.afterEach((_to) => {
  NProgress.done();
});

export default router;