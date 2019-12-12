import { logout, getInfo } from '@/api/login'
import { getToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: '',
    userId: '',
    userName: '',
    roles: [],
    permissions: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_USERNAME: (state, userName) => {
      state.userName = userName
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },
  actions: {
    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          removeToken()
          resolve()
        }).catch((error) => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 获取用户信息
    setUserInfoAction({ commit }, res) {
      const info = res.user
      const userId = info.userId
      const token = info.token || getToken()
      const userName = info.userName
      const roles = res.roles
      const permissions = res.permissions

      commit('SET_TOKEN', token)
      commit('SET_USERNAME', userName)
      commit('SET_USERID', userId)
      if (roles && roles.length > 0) { // 验证返回的roles是否是一个非空数组
        commit('SET_ROLES', roles)
        commit('SET_PERMISSIONS', permissions)
      } else {
        commit('SET_ROLES', ['ROLE_DEFAULT'])
      }
    },
    GetInfo({ dispatch }) {
      return getInfo(getToken()).then((response) => {
        dispatch('setUserInfoAction', response)
      })
    }
  }
}

export default user
