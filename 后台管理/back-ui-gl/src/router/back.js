// 后台管理路由配置

const routes = [
  {
    path: '/back/backindex',
    name: 'BackIndex',
    component: () => import('../views/back/BackIndex.vue')
  },
  {
    path: '/back/index',
    name: 'Index',
    component: () => import('../views/back/Index.vue')
  },
  {
    path: '/back/call',
    name: 'Call',
    component: () => import('../views/back/Call.vue')
  },
  {
    path: '/back/img',
    name: 'Img',
    component: () => import('../views/back/Img.vue')
  }
];

export default routes;
