import Vue from 'vue'
import VueRouter from 'vue-router'
// import test from "../views/test.vue"
import Visit from '@/views/Visit'
import Login from '@/components/login.vue'
import Register from '@/components/register.vue'
import Home from "../views/Home.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Visit',
    component: Visit,
    children: [
      {
        path: '',
        name: 'Login',
        component: Login,
        meta: {
          title: '登录'
        }
      },
      {
        path: 'register',
        name: 'Register',
        component: Register,
        meta: {
          title: '注册'
        }
      }
    ]
  },
  {
    path: '/set',
    name: 'Set',
    component: () => import('../views/Set.vue')
  },
  // {
  //   path: '/test',
  //   name: 'test',
  //   component: () => import('../views/test.vue')
  // }

]

const router = new VueRouter({
  routes
})

export default router