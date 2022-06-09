import request from '@/utils/request'

export function uploadCsv(data){
    return request({
        url: '/Upload',
        method: 'post',
        data:data
    })
}