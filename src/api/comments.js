import request from '../utils/request'

export const getCommentList = (tagId)=>{
    return request({
        url: "/comment/getCommentList",
        method: 'get',
        params: {
            tagId
        }
        
    })
}