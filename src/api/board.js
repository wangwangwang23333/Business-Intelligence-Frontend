
/*
和留言区有关的api
*/

import request from '@/utils/request'

export function getComment() {
    /*
    返回所有的留言
    */
    return request({
      url: '/Comments',
      method: 'get'
    })
  }

export function sendComment(data) {
    /*
    上传一条新的留言
    */
    let param= JSON.stringify(data)
    return request({
        url:'/Comments',
        method:'post',
        data: param
    })
}


export function deleteComment(data){
  return request({  
    url: '/Comments/'+data,
    method: 'delete',
  })
}