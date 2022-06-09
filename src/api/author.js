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

export function findCooperatePapers(key1, key2) {
    return request({
        url: '/cooperatePapers',
        method: 'get',
        params: {
            "oneAuthorIndex": key1,
            "anotherAuthorIndex": key2,
        }
    })
}

export function getBriefAuthorsDescription(key) {
    return request({
        url: '/briefAuthors',
        method: 'get',
        params: {
            "authorName": key,
        }
    })
}

export function getAuthorDepartment(key) {
    return request({
        url: '/authorDepartment',
        method: 'get',
        params: {
            "authorIndex": key,
        }
    })
}

export function getAuthorNameById(key) {
    return request({
        url: '/authorName',
        method: 'get',
        params: {
            "authorIndex": key,
        }
    })
}

export function searchImportAuthDepart(param){
    return request({
        url: '/importantAuthorsDept',
        method: 'get',
        params: param
    })
}