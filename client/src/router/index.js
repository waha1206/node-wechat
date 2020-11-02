import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

// 解決 vue-router 報錯 NavigationDuplicated: Avoided redundant navigation to current l

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// end  解決 vue-router 報錯

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index,
    children: [
      {
        path: '',
        redirect: '/chats'
      },
      {
        path: '/chats',
        name: 'chats',
        component: () => import('../views/Chats')
      },
      {
        path: '/contacts',
        name: 'contacts',
        component: () => import('../views/Contacts')
      },
      {
        path: '/discover',
        name: 'discover',
        component: () => import('../views/Discover')
      },
      {
        path: '/me',
        name: 'me',
        component: () => import('../views/Me')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/moments',
    name: 'moments',
    component: () => import('../views/Moments.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/todo',
    name: 'todo',
    component: () => import('../views/Todo.vue')
  },
  {
    path: '/discover-slot-demo',
    name: 'discover-slot-demo',
    component: () => import('../views/DiscoverSlotDemo.vue')
  },
  {
    path: '/about-vuex',
    name: 'about-vuex',
    component: () => import('../views/AboutVuex.vue')
  },
  {
    path: '/publish',
    name: 'publish',
    component: () => import('../views/Publish.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守衛
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.chatToken ? true : false
  console.log('router.js 使用 beforeEach 先去看 loaclStorage 有沒有 token')
  if (to.path == '/login' || to.path == '/register') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router
