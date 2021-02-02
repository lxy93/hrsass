<template>
    <el-dialog :title="showTitle" :visible="showDailog" @close="cancelBtn">
      <el-form ref="formData" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="formData.name" type="text" style="width:400px"/>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="formData.description" type="textarea" rows="3" style="width:400px"/>
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-button size="small" @click="cancelBtn">取消</el-button>
        <el-button size="small" type="primary" @click="comfirmBtn">确定</el-button>
      </el-row>
    </el-dialog>
</template>
<script>
import { getRoleDetail ,updateRole ,addRole} from '@/api/setting'
export default {
    props:{
        showDailog:{
            type:Boolean,
            default:false
        },
        showTitle:{
            type:String,
            default:''
        }
    },
    data(){
        const checkName = ((rulue,value,callback)=>{
            
        })
        return {
            formData:{
                name:'',
                description:''
            },
            rules:{
                name:[
                    {required:true,message:'角色名称不能为空',trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        async getRoleDetail(id){
            this.formData = await getRoleDetail(id)
        },
        comfirmBtn(){
            this.$refs.formData.validate(async isok=>{
                if(isok){
                    if(this.formData.id){
                        await updateRole(this.formData)
                    }else{
                        await addRole(this.formData);
                    }
                    this.$emit('updateRole',false);
                    
                
                }
            })
        },
        cancelBtn(){
            this.formData= {
                name:'',
                description:''
            }
            this.$refs.formData.resetFields();
            this.$emit('update:showDailog',false)
        }
    }
}
</script>
<style scoped>

</style>