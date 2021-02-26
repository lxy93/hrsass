import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'

export default {
    install(Vue){
        Vue.component('PageTools',PageTools);
        Vue.component('UploadExcel',UploadExcel);
        Vue.component('ImageUpload',ImageUpload);
    }
}