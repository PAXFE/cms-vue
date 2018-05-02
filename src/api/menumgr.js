import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/menu/listAll',
    method: 'get',
    params: query
  })
}

export function createMenuItem(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateMenuItem(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}
