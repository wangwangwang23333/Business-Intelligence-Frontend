import request from '@/utils/request'


export function findWriterSuggestion(key) {
    return request({
        url: '/availableAuthors',
        method: 'get',
        params: {
            "authorName": key,
        }
    })
}

export function findAreaSuggestion(key) {
    return request({
        url: '/availableAreas',
        method: 'get',
        params: {
            "areaName": key,
        }
    })
}