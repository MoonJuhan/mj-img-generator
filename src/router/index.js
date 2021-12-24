import { createWebHistory, createRouter } from 'vue-router'
import routesAsync from './routes-async'

const routes = [
  ...routesAsync,
  {
    path: '/:pathMatch(.*)*',
    component: () => import(/* webpackChunkName: 'view-not-found' */ '../components/views/ViewNotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
