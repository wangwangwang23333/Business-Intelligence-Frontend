import request from '@/utils/request'


export function findAreaAuthors(key) {
    return request({
        url: '/areaedAuthors',
        method: 'get',
        params: {
            "area": key,
        }
    })
}