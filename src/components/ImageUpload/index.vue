<template>
    <div>
        <el-upload :class="{disabled:fileComputed}" 
        :before-upload="beforeUpload" 
        :http-request="upload" 
        :on-change="changeFile" 
        :on-remove="removeImg" 
        :on-preview="previewImg" 
        :file-list="fileList" 
        :limit="1"
        list-type="picture-card" action="#">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="showDialog" title="图片预览">
            <img :src="imgUrl" style="width:100%;">
        </el-dialog>
    </div>
</template>
<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
   SecretId:'AKIDflANQEWEE61fLkOfHtHUQQWNcan4vZnl',
   SecretKey:'zlIZ1JSMC9qHRdbXFLGoEM3Wkj06tWoB'
})
export default {
    data(){
        return {
            showDialog:false,
            fileList:[
                {
                    name:'img1',
                    url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F20%2F20180720161300_rvipb.thumb.700_0.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615448748&t=9e97965808517058ef43f341b65db1ee'
                }
            ],
            imgUrl:''
        }
    },
    computed:{
        fileComputed(){
            return this.fileList.length==1
        }
    },
    methods:{
        previewImg(file){
            this.imgUrl = file.url;
            this.showDialog = true;
        },
        removeImg(file, fileList){
           this.fileList = this.fileList.filter(item=>{
                return item.uid != file.uid
            })
        },
        changeFile(file, fileList){

        },
        beforeUpload(file){
            //验证图片格式
            const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png','image/jpg'];
            if(!types.includes(file.type)){
                this.$message.error('图片格式不正确');
                return false;
            }

            //验证图片大小
            // 5M; 1M = 1024kb,1kb = 1024b;
            const maxSize = 5 * 1024 * 1024;
            if(file.size > maxSize){
                this.$message.error('图片大小不能超过5M');
                return false;
            }

            return true;
            
        },
        upload(params){
            // console.log(params)
            if(params.file){
                cos.putObject({
                    Bucket: 'lxy-1304974289', /* 必须存储桶名称 */
                    Region: 'ap-guangzho',     /* 存储桶所在地域，必须字段 */
                    Key: params.file.name,              /* 必须 文件名 */
                    StorageClass: 'STANDARD',
                    Body: params.file, // 上传文件对象
                    onProgress:(progressData)=>{

                    }
                },(err, data)=>{
                    console.log(err)
                    // console.log(data)  
                    
                })
            }
            
        }
    }
}
</script>
<style>
.disabled .el-upload--picture-card{
    display: none!important;
}
</style>