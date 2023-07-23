import service from './index'

export function uploadFile(data) {
    return new Promise((resolve, reject) => {
        service.post('/upload/uploadFile', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}
