import request from '@/utils/request'

// 查询角色列表
export function listRole(query) {
  return request({
    url: '/system/role/list',
    method: 'get',
    params: query
  })
}

// 查询角色详细
export function getRole(roleId) {
  return request({
    url: `/system/role/${roleId}`,
    method: 'get'
  })
}

// 新增角色
export function addRole(param) {
  return request({
    url: '/system/role',
    method: 'post',
    data: param
  })
}

// 修改角色
export function updateRole(param) {
  return request({
    url: '/system/role',
    method: 'put',
    data: param
  })
}

// 角色数据权限
export function dataScope(param) {
  return request({
    url: '/system/role/dataScope',
    method: 'put',
    data: param
  })
}

// 角色状态修改
export function changeRoleStatus(roleId, status) {
  const param = {
    roleId,
    status
  }
  return request({
    url: '/system/role/changeStatus',
    method: 'put',
    data: param
  })
}

// 删除角色
export function delRole(roleId) {
  return request({
    url: `/system/role/${roleId}`,
    method: 'delete'
  })
}

// 导出角色
export function exportRole(query) {
  return request({
    url: '/system/role/export',
    method: 'get',
    params: query
  })
}
