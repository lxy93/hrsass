import router from '@/router'
import store from '@/store'

//路由前守卫
const white = ['/login','/404'];
router.beforeEach((to,from,next)=>{
    if(store.getters.token){
        if(to.path=='/login'){
            next('/')
        }else{
            next();
        }
    }else{
        if(white.indexOf(to.path)>-1){
            next()
        }else{
            next('/login')
        }
    }
})