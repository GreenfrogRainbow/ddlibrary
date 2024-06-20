import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  scrollBehavior: () => ({ top: 0 }),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/login.vue') },
    {
      path: '/',
      component: () => import('@/views/layout-system.vue'),
      redirect: '/recommend',
      children: [
        {
          path: '/recommend',
          name: 'recommend',
          component: () => import('@/views/recommend/recommend-view.vue')
        },
        {
          path: '/borrow',
          name: 'borrowManage',
          component: () => import('@/views/borrow-manage/borrow-manage.vue')
        },
        {
          path: '/favorite',
          name: 'favorite',
          component: () => import('@/views/user_favorite/favorite_view.vue'),
          children: [
            { path: '', component: () => import('@/components/favorite/favorite_simplified.vue') },
            {
              path: '/favorite/:favoriteCatalogue',
              name: 'favoriteCatalogue',
              component: () => import('@/components/favorite/favorite_detail.vue')
            }
          ]
        },
        {
          path: '/allbooks',
          name: 'allbooks',
          component: () => import('@/views/tags-all-books/allTagsBooks.vue'),
          children: [
            { path: '', component: () => import('@/components/all-books/all-books-tags.vue') },
            {
              path: '/allbooks/:tag',
              name: 'allbooksbytag',
              component: () => import('@/components/all-books/all-books-here.vue')
            }
          ]
        },
        {
          path: '/details',
          name: 'bookDetails',
          component: () => import('@/views/bookDetails/details-view.vue')
        },
        {
          path: '/searchresults',
          name: 'searchresults',
          component: () => import('@/views/search/search_view.vue')
        }
      ]
    },
    {
      path: '/user-center',
      component: () => import('@/views/user-center.vue')
    }
  ]
})

import { useUserStore } from '@/stores'
router.beforeEach((to) => {
  // 如果没有token, 且访问的是非登录页，拦截到登录，其他情况正常放行
  const useStore = useUserStore()
  if (!useStore.token && to.path !== '/login' && to.path !== '/recommend') return '/login'
})

export default router
