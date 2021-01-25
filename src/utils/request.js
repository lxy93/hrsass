import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

//创建axios实例
const service = axios.create({
    baseURL:process.env.VUE_APP_BASE_API,
    timeout:5000
});

//请求拦截器
service.interceptors.request.use(config=>{
    if(store.getters.token){
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

export default service