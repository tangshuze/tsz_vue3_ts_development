
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const modules: any = import.meta.glob("./modules/**/*.ts", { eager: true });

const routes: Array<RouteRecordRaw> = [];
for (const key in modules) {
    routes.push(...modules[key].default);
}

const router = createRouter({
    history: createWebHistory(), // history 模式则使用 createWebHistory()
    routes,
});

router.beforeEach(async (_to, _from, next) => {
    NProgress.start();
    next();
});

router.afterEach((_to) => {
    NProgress.done();
});

export default router;