
import {RouteRecordRaw} from 'vue-router';

const files: any = import.meta.glob("../../../views/test_page/**/index.vue", { eager: true })
const routes:Array<RouteRecordRaw>  = []
for (let i in files) {
  const newName:string = i.match( /views\/([\w-]+)\/([\w-]+)/)![2] as string
  routes.push({
    path: '/' + newName.toLocaleLowerCase(),
    name: newName,
    component: files[i],
  });
}
export default routes