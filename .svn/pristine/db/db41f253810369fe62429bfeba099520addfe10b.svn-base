import request from '@/utils/request'
import { praseStrEmpty } from '@/utils/xhkx';

// 查询用户列表
export function listUser(query) {
  return request({
    url: '/system/user/list',
    method: 'get',
    params: query
  })
}

// 查询用户详细
export function getUser(userId) {
  return request({
    url: `/system/user/${praseStrEmpty(userId)}`,
    method: 'get'
  })
}

// 新增用户
export function addUser(param) {
  return request({
    url: '/system/user',
    method: 'post',
    data: param
  })
}

// 修改用户
export function updateUser(param) {
  return request({
    url: '/system/user',
    method: 'put',
    data: param
  })
}

// 删除用户
export function delUser(userId) {
  return request({
    url: `/system/user/${userId}`,
    method: 'delete'
  })
}

// 导出用户
export function exportUser(query) {
  return request({
    url: '/system/user/export',
    method: 'get',
    params: query
  })
}

// 用户密码重置
export function resetUserPwd(userId, password) {
  const param = {
    userId,
    password
  }
  return request({
    url: '/system/user/resetPwd',
    method: 'put',
    data: param
  })
}

// 用户状态修改
export function changeUserStatus(userId, status) {
  const param = {
    userId,
    status
  }
  return request({
    url: '/system/user/changeStatus',
    method: 'put',
    data: param
  })
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: '/system/user/profile',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(param) {
  return request({
    url: '/system/user/profile',
    method: 'put',
    data: param
  })
}

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const param = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/system/user/profile/updatePwd',
    method: 'put',
    params: param
  })
}

// 用户头像上传
export function uploadAvatar(param) {
  return request({
    url: '/system/user/profile/avatar',
    method: 'post',
    data: param
  })
}
