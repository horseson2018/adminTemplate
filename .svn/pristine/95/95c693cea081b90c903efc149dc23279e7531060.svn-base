import request from '@/utils/request'

// 查询列表
export function listAccPhone(query) {
  return request({
    url: '/deploy/phone/list',
    method: 'get',
    params: query
  })
}
// 查询所有用户
export function listUser() {
  return request({
    url: '/system/user/listUser',
    method: 'get',
  })
}

// 查询详细
export function getAccInfo(id) {
  return request({
    url: `/deploy/phone/${id}`,
    method: 'get'
  })
}

// 新增
export function addAccPhone(param) {
  return request({
    url: 'deploy/phone',
    method: 'post',
    data: param
  })
}

// 修改
export function updateAccPhone(param) {
  return request({
    url: '/deploy/phone',
    method: 'put',
    data: param
  })
}

// 删除
export function delAccPhone(roleId) {
  return request({
    url: `/deploy/phone/${roleId}`,
    method: 'delete'
  })
}

// 导出
export function exportAccPhone(query) {
  return request({
    url: '/deploy/phone/export',
    method: 'get',
    params: query
  })
}
