import router from '@/router'
import store from '@/store'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

//路由前守卫
const white = ['/login','/404'];
router.beforeEach((to,from,next)=>{
    Nprogress.start();//开启进度条
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
    Nprogress.done();//手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
})

// 路由后守卫

router.afterEach(()=>{
    Nprogress.done();//关闭进度条
})