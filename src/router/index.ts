
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import routesList from './modules/test'
import {useWebsocketStore} from '@/store/websocket'
const constant: any = import.meta.glob("./modules/constant/*.ts", { eager: true });
const pagesList: Array<string> = [];
const whiteRoutes: Array<RouteRecordRaw> = [];
for (const key in constant) {
  pagesList.push(constant[key].default[0].path)
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
    name: routesList[key].name,
    path: routesList[key].path,
    component: (routesList[key]!.component as any).default
  });
}
router.beforeEach(async (_to, _from, next) => {
  NProgress.start();
  _to.meta.transition = pagesList.indexOf(_to.path) !== -1 ? 'fade' : 'defa'
  router.beforeEach(to => {
    // 解决持久化失效问题
    const  websocket = useWebsocketStore();
    if (!websocket.exhibitWs) {
      websocket.initExhibitSocket();
    }
  });
  
  next();
});

router.afterEach((_to) => {
  NProgress.done();
});
export default router;