import constRoutes from '@/router/routeList'
import { getRouters } from '@/api/login'
// 这里是引入组件的地方
import Layout from '@/views/layout/layout'
import Login from '@/views/login/login'
import Dashboard from '@/views/dashboard/dashboard'
import User from '@/views/system/user/index'
import Role from '@/views/system/role/index'
import Menu from '@/views/system/menu/index'
import Dept from '@/views/system/dept/index'
import Auditor from '@/views/deploy/auditor/index'
import Word from '@/views/deploy/word/index'
import Setting from '@/views/deploy/setting/index'
import Code from '@/views/deploy/code/index'
import Phone from '@/views/deploy/phone/index'
import NewsAgency from '@/views/articles/newsAgency/index'
// 信息管理
import InfoList from '@/views/infoManage/infoList'
import InfoAudit from '@/views/infoManage/infoAudit'
// 引入组件之后还需要把字符串反转一下变成真正的组件
const componentsList = {
  Layout,
  Login,
  Dashboard,
  User,
  Role,
  Menu,
  Dept,
  InfoList,
  Auditor,
  Word,
  Setting,
  Code,
  Phone,
  NewsAgency,
  InfoAudit,
}

const asynRoutes = {
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constRoutes.concat(routers)
    }
  },
  actions: {
    getAsynRoutes({ commit }) {
      return getRouters().then((res) => {
        const data = res.data
        const forchMenu = (arr) => {
          arr.map((currentValue) => {
            currentValue.component = componentsList[currentValue.component]
            if (currentValue.children) {
              currentValue.children.map((currentValues) => {
                currentValues.component = componentsList[currentValues.component]
                if (currentValues.children) {
                  forchMenu(currentValues.children)
                }
                return currentValues
              })
            }
            return currentValue
          })
        }
        forchMenu(data)
        commit('SET_ROUTERS', data)
      })
    }
  }
}

export default asynRoutes
