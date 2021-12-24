const routesBasic = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'view-home' */ '../components/views/ViewHome.vue'),
  },
]

const routesAsync = [...routesBasic].map((o) => o)

export default routesAsync
