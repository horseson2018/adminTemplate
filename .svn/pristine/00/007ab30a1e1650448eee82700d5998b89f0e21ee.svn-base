import request from '@/utils/request'
import { praseStrEmpty } from '@/utils/xhkx';

// 查询参数列表
export function listConfig(query) {
  return request({
    url: '/system/config/list',
    method: 'get',
    params: query
  })
}

// 查询参数详细
export function getConfig(configId) {
  return request({
    url: `/system/config/${praseStrEmpty(configId)}`,
    method: 'get'
  })
}

// 根据参数键名查询参数值
export function getConfigKey(configKey) {
  return request({
    url: `/system/config/configKey/${praseStrEmpty(configKey)}`,
    method: 'get'
  })
}

// 新增参数配置
export function addConfig(configData) {
  return request({
    url: '/system/config',
    method: 'post',
    data: configData
  })
}

// 修改参数配置
export function updateConfig(configData) {
  return request({
    url: '/system/config',
    method: 'put',
    data: configData
  })
}

// 删除参数配置
export function delConfig(configId) {
  return request({
    url: `/system/config/${praseStrEmpty(configId)}`,
    method: 'delete'
  })
}

// 导出参数
export function exportConfig(configQuery) {
  return request({
    url: '/system/config/export',
    method: 'get',
    params: configQuery
  })
}
