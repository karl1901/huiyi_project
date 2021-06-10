// 文件和门户管理路由配置

const routes = [
  {
    path: '/allinfo/file',
    name: 'AllInfoFile',
    component: () => import('../views/allinfo/File.vue')
  },
  {
    path: '/allinfo/protable',
    name: 'Index',
    component: () => import('../views/allinfo/Protable.vue')
  }
];

export default routes;
