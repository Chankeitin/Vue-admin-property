import request from '../utils/request'

export const loginUser = (name,passwd)=>{
    return request({
        url:"/login",
        method: 'post',
        params: {
            username: name,
            password: passwd
        }
    })
}

export const logoutUser = ()=>{
    return request({
        url:"/logout",
        method: 'post'
    })
}