import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Goods from '../components/Goods.vue'
import Code from '../components/Code.vue'
import Person from '../components/Person.vue'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      { path: '/goods', component: Goods },
      { path: '/code', component: Code },
      { path: '/person', component: Person }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    return next()
  }
  // 获取token
  const tokenstr = window.sessionStorage.getItem('token')
  if (!tokenstr) {
    return next('/')
  }
  next()
})
export default router
