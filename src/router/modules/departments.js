import Layout from '@/layout'

export default {
    path:'/departments',
    name:'departments',
    component:Layout,
    children:[
        {
            path:'',
            component:()=>import('@/views/departments'),
            meta:{
                title:'公司组织',
                icon:'tree'
            }
        }
    ]
}
