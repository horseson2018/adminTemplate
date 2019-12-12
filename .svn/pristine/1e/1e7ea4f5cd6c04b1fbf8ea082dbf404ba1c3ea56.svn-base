import request from '@/utils/request'

// 查询审核人员列表
export function listAudit(query) {
  return request({
    url: '/deploy/auditmanager/list',
    method: 'get',
    params: query
  })
}

// 查询详细
export function getAuditInfo(id) {
  return request({
    url: `/deploy/auditmanager/${id}`,
    method: 'get'
  })
}

// 新增
export function addAuditor(param) {
  return request({
    url: 'deploy/auditmanager',
    method: 'post',
    data: param
  })
}

// 修改
export function updateAuditor(param) {
  return request({
    url: '/deploy/auditmanager',
    method: 'put',
    data: param
  })
}

// 删除
export function delAuditor(roleId) {
  return request({
    url: `/deploy/auditmanager/${roleId}`,
    method: 'delete'
  })
}

// 导出角色
export function exportAuditor(query) {
  return request({
    url: '/deploy/auditmanager/export',
    method: 'get',
    params: query
  })
}
