import request from '@/utils/request'


export function getPaperById(key) {
    return request({
        url: '/paper',
        method: 'get',
        params: {
            "paperIndex": key,
        }
    })
}