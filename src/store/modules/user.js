import {getToken,setToken,removeToken} from '@/utils/auth.js'

//状态管理
const state = {
  token:getToken(),//一进入页面时，先从缓存中获取token
  userInfo:{}
}

const mutations = {
  //设置token缓存
  SET_TOKEN(state,token){
    state.token = token;
    setToken(token);
  },
  //清除token缓存
  REMOVE_TOKEN(stata){
    state.token = null;
    removeToken()
  },
  GET_USER_INFO(state,data){
    state.userInfo = data;
  },
  CLEAR_USER_INFO(state){
    state.userInfo = {};
  }
}

const actions = {
  login({commit},data){
    commit('SET_TOKEN',data)
  },
  getUserInfo({commit},data){
    commit('GET_USER_INFO',data)
  }
}

export default {
  namespaced:true,
  state,
  mutations,
  actions
}