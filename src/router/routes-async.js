const routesBasic = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'view-home' */ '../components/views/ViewHome.vue'),
  },
  {
    path: '/generator',
    component: () => import(/* webpackChunkName: 'view-home' */ '../components/views/generator/ViewGenerator.vue'),
  },
  {
    path: '/uploader',
    component: () => import(/* webpackChunkName: 'view-uploader' */ '../components/views/uploader/ViewUploader.vue'),
  },
]

const routesAsync = [...routesBasic].map((o) => o)

export default routesAsync
