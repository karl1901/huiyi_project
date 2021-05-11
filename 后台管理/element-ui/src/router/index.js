import Vue from 'vue';
import VueRouter from 'vue-router';
// 后台管理路由配置
import back_index from './back';

Vue.use(VueRouter);

// 路由配置信息
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  }
].concat(back_index);

const router = new VueRouter({
  routes
});

export default router;
