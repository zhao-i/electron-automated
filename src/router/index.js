
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Fight from '../views/Fight.vue';
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/f',
    name: 'fight',
    component: Fight
  },
  {
    path: '/n',
    name: 'nsh',
    component: () => import('../views/NSH.vue')
  },
  {
    path: '/tx3',
    name: 'tianxia3',
    component: () => import('../views/TX3.vue')
  },
  {
    path: '/ys',
    name: 'yuanshen',
    component: () => import('../views/YS.vue')
  },
  {
    path: '/lol',
    name: 'lol',
    component: () => import('../views/LOL.vue')

  },
  {
    path:'/worker',
    name:'worker',
    component:()=> import('../views/Worker.vue')
  }]
})

router.beforeEach((to, from, next) => {

  const isAuthenticated = localStorage.getItem('token')
  if (to.path === '/zone' && !isAuthenticated) {
    next({ name: 'login' })
  }
  else if (to.path !== '/' && to.path !== '/login'&&to.path!=='/worker' && !isAuthenticated) {
    next({ name: 'login' })
  }
  else {
    next()
  }

})
export default router