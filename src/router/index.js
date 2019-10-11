import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login/Login.vue'
import Home from '@/pages/Home/Home.vue'
import Common from '@/Common'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '*',
      redirect: 'home',
      component: Home
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name.toLowerCase() === 'login') {
    Common.delCookie('token')
    next()
  }
  if (!!Common.getCookie('token')) {
    next()
  } else {
    next("/login")
  }
})

export default router
