import Vue from 'vue'
import VueRouter from 'vue-router'
// import test from "../views/test.vue"
import Visit from '@/views/Visit'
import Login from '@/components/login.vue'
import Register from '@/components/register.vue'
import Main from "../views/Main.vue"
import Home from '@/components/home.vue'
import Public from '@/components/public.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home 
      },
      {
        path: 'public',
        name: 'Public',
        component: Public
      }
    ]
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
router.beforeEach((to, from, go) => {
  console.log(from, to)
  if (sessionStorage.getItem('user_email') || (to.fullPath == '/' || to.fullPath == '/register')) {
    go()
  } else {
    alert ('请先完成登录')
    router.push('/')
  }
})
export default router