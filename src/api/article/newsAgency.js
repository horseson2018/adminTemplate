import request from '@/utils/request'

// 查询新华社短信征文
export default function listNewsSms(query) {
  return request({
    url: '/deploy/event/list',
    method: 'get',
    params: query
  })
}
