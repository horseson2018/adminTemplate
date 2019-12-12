import request from '@/utils/request'

// 查询列表
export function listCode(query) {
  return request({
    url: '/message/code/listPage',
    method: 'get',
    params: query
  })
}

// 查询详细
export function getCodeInfo(id) {
  return request({
    url: `/message/code/${id}`,
    method: 'get'
  })
}

// 新增
export function addCode(param) {
  return request({
    url: 'message/code',
    method: 'post',
    data: param
  })
}

// 修改
export function updateCode(param) {
  return request({
    url: '/message/code',
    method: 'put',
    data: param
  })
}

// 删除
export function delCode(roleId) {
  return request({
    url: `/message/code/${roleId}`,
    method: 'delete'
  })
}

// 导出
export function exportCode(query) {
  return request({
    url: '/message/code/export',
    method: 'get',
    params: query
  })
}
