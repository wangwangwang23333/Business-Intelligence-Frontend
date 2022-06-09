import request from '@/utils/request'

export function uploadCsv(data, tableName){
    return request({
        url: '/Upload?tableName='+ tableName,
        method: 'post',
        data:data
    })
}