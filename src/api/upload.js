import request from '@/utils/request'

export function uploadCsv(data, tableName, method){
    return request({
        url: '/Upload?tableName='+ tableName + '&method=' + method,
        method: 'post',
        data:data
    })
}