import request from '../utils/request'

export const findRole = ()=>{
    return request({
        url: "/role/findRole",
        method: 'get',
        
    })
}

export const findRoleById = (roleId)=>{
    return request({
        url: "/role/findRoleById",
        method: 'get',
        params: {
            roleId
        }
    })
}