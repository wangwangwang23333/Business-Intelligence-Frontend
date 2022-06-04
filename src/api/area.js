import request from '@/utils/request'


export function findAreaAuthors(key) {
    if (typeof key != 'string') {
        key = key.value;
    }
    return request({
        url: '/areaedAuthors',
        method: 'get',
        params: {
            "area": key,
        }
    })
}