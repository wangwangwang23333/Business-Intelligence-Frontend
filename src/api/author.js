import request from '@/utils/request'


export function findAuthorPapers(key) {
    return request({
        url: '/writtenPapers',
        method: 'get',
        params: {
            "authorIndex": key,
        }
    })
}

export function findAuthorCooperateAuthors(key) {
    return request({
        url: '/cooperateAuthors',
        method: 'get',
        params: {
            "authorIndex": key,
        }
    })
}