import request from "../utils/request"

export  const getMenuList=()=>{
    return request({
      url: "/menu/getMenuList",
      method: "get",
    })
  }