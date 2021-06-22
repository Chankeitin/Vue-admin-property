import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{},//用户信息列表
    userRoles:[],//用户角色集合
    
  },
  mutations: {
    //登录保存用户信息
    login(state,data) {
      state.userInfo =data;
    },
    //保存用户的角色信息
    userRoles(state,userRole){
      state.userRoles=userRole;
    },
  },
  actions: {
  },
  modules: {
  }
})
