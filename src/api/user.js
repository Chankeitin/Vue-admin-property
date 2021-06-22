import request from '../utils/request'

export const findUserList = (current,size,userVO)=>{
    return request({
        url: "/user/findUserPageByVO",
        method: 'post',
        params: {
            current,
            size
        },
        data: userVO
    })
}

