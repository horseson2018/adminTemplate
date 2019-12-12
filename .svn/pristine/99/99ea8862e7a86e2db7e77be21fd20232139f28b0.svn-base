import request from '@/utils/request'

// 查询配置项列表
export function listSetting(query) {
  return request({
    url: '/deploy/setting/list',
    method: 'get',
    params: query
  })
}

// 查询详细
export function getSettingInfo(name) {
  return request({
    url: `/deploy/setting/${name}`,
    method: 'get'
  })
}

// 新增
export function addSetting(param) {
  return request({
    url: 'deploy/setting',
    method: 'post',
    data: param
  })
}

// 修改
export function updateSetting(param) {
  return request({
    url: '/deploy/setting',
    method: 'put',
    data: param
  })
}

// 删除
export function delSetting(roleId) {
  return request({
    url: `/deploy/setting/${roleId}`,
    method: 'delete'
  })
}

// 导出
export function exportSetting(query) {
  return request({
    url: '/deploy/setting/export',
    method: 'get',
    params: query
  })
}
