import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
import routes from './routeList'
import { getToken } from '@/utils/auth'

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error)
}

Vue.use(VueRouter)

NProgress.configure({ showSpinner: false })

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
})
const whiteList = ['/login', '/success', '/fail', '/register', '/checkUserName']

/*
* 1、检查是否登录
* 2、如果登录了，访问login就直接定位到/
* 3、合并本地路由与异步路由(路由权限就是这个步骤)
* 4、如果没有登录，就去判断访问的是否是白名单中的路由
* 5、如果是白名单中的，就直接访问，否则就重定向到登陆页面
* 6、判断token是为了防止左侧导航多次加载，导致router重复而出告警
*/

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next('/')
      NProgress.done()
      return
    }
    // 如果已经拉倒用户资料了，就不需要再访问了
    if (!store.getters.token) {
      store.dispatch('GetInfo').then(() => {
        store.dispatch('getAsynRoutes').then(() => {
          router.addRoutes(store.getters.addRouters)
          next({ ...to, replace: true })
        })
      })
    }
    next()
    return
  }
  if (whiteList.indexOf(to.path) !== -1) {
    next()
    return
  }
  next('/login')
  NProgress.done()
})

router.afterEach(() => {
  NProgress.done()
})

export default router;
