import request from '@/utils/request'

// 查询敏感词列表
export function listWord(query) {
  return request({
    url: '/deploy/word/list',
    method: 'get',
    params: query
  })
}

// 查询详细
export function getWordInfo(id) {
  return request({
    url: `/deploy/word/${id}`,
    method: 'get'
  })
}

// 新增
export function addWord(param) {
  return request({
    url: 'deploy/word/',
    method: 'post',
    data: param
  })
}

// 修改
export function updateWord(param) {
  return request({
    url: '/deploy/word',
    method: 'put',
    data: param
  })
}

// 删除
export function delWord(roleId) {
  return request({
    url: `/deploy/word/${roleId}`,
    method: 'delete'
  })
}

// 导出
export function exportWord(query) {
  return request({
    url: '/deploy/word/export',
    method: 'get',
    params: query
  })
}
