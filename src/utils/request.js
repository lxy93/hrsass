import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTimeStamp } from '@/utils/auth'
import router from '@/router'
const timeOut = 2

//创建axios实例
const service = axios.create({
    baseURL:process.env.VUE_APP_BASE_API,
    timeout:5000
});

//请求拦截器
service.interceptors.request.use(config=>{
    if(store.getters.token){
        if(isChecktTimeOut){
            console.log('90')
            store.commit('user/REMOVE_TOKEN');
            store.commit('user/CLEAR_USER_INFO');
            router.push('/login');
            return Promise.reject(new Error('请求超时'))
        }
        config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config
},error=>{
    return Promise.reject(error)
}); 

//响应拦截器
service.interceptors.response.use(response=>{
    const {success,message,data} = response.data;
    console.log('请求借口返回开始')
    console.log(response.data)
    console.log('请求借口返回结束')
    if(success){
       return data; 
    }else{
        Message.error(message);
        return Promise.reject(new Error(message));
    }
},error=>{
    Message.error(message);
    return Promise.reject(message);
});

function isChecktTimeOut(){
    const currentTime = Date.now();
    const timeStamp = getTimeStamp();
    return (currentTime-timeStamp)/1000 > timeout
}

export default service