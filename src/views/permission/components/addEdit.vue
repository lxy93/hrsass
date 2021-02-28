<template>
    <el-dialog :visible="editShowDialog" title="新增" @close="cancleClick">
        <el-form ref="formData" :model="formData" :rules="rules" label-width="120px">
            <el-form-item label="名称" prop="name">
                <el-input v-model="formData.name" style="width:90%"/>
            </el-form-item>
            <el-form-item label="标识" prop="code">
                <el-input v-model="formData.code" style="width:90%"/>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="formData.description" style="width:90%"/>
            </el-form-item>
            <el-form-item label="开启" >
                <el-switch v-model="formData.enVisible" active-value="1" inactive-value="0"/>
            </el-form-item>
            
        </el-form>
        <el-row type="flex" justify="center">
            <el-col :span="6">
                <el-button size="small" @click="cancleClick">取消</el-button>
                <el-button size="small" type="primary" @click="comfrimClick">确定</el-button>
            </el-col>
        </el-row>
    </el-dialog>
</template>
<script>
import {addPermission,updatePermission,getPermissionDetail} from '@/api/pemission'
export default {
    props:{
        editShowDialog:{
            type:Boolean,
            default:false
        },
        permissionType:{
            type:Number,
            default:''
        },
        permissionId:{
            type:String,
            default:'0'
        }
    },
    data(){
        return {
            formData:{
                name:'',
                code:'',
                description:'',
                enVisible:'0',
                type:'',
                pid:'0'
            },
            rules:{
               name:[
                   {required:true,message:'权限名称不能为空',trigger:'blur'}
               ],
               code:[
                   {required:true,message:'权限标识不能为空',trigger:'blur'}
               ] 
            }
        }
    },
    methods:{
        comfrimClick(){
            this.$refs.formData.validate().then(async ()=>{
                if(this.permissionId!='0'){
                    return await updatePermission({...this.formData,pid:this.permissionId})
                }
                await addPermission({...this.formData,type:this.permissionType,pid:this.permissionId});
                this.$refs.formData.resetFields();
                this.$emit('getPermissionList');//子组件通知父组件调用函数时，得在父组件上写上要调用得函数，例如：<add-edit @函数=“函数” /> 
                this.$message.success('新增成功');
                this.$emit('update:editShowDialog',false)
            })
                
            
        },
        cancleClick(){
            this.formData = {
                name:'',
                code:'',
                description:'',
                enVisible:'0',
                type:'',
                pid:'0'
            }
            this.$refs.formData.resetFields();
            this.$emit('update:editShowDialog',false)
        },
        async getPermissionDetail(id){
            this.formData = await getPermissionDetail(id);
        }
        
    }
}
</script>
<style>

</style>