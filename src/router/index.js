import Vue from 'vue'
import VueRouter from 'vue-router'
// import test from "../views/test.vue"
import Home from "../views/Home.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/test',
  //   name: 'Test',
  //   component: test
  // }
]

const router = new VueRouter({
  routes
})

export default router