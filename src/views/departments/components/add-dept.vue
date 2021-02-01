<template>
    <el-dialog :title="showTitle" :visible="showDialog" @close="deptsCancelBtn">
        <el-form ref="deptsForm" :model="formData" :rules="rules" label-width="120px">
            <el-form-item label="部门名称" prop="name">
                <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符"/>
            </el-form-item>
            <el-form-item label="部门编码" prop="code">
                <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符"/>
            </el-form-item>
            <el-form-item label="部门负责人" prop="manager">
                <el-select @focus="getEmployeeSimple" v-model="formData.manager" style="width:80%" placeholder="请选择部门负责人">
                    <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="部门介绍" prop="introduce">
                <el-input v-model="formData.introduce" style="width:80%" type="textarea" rows="5" placeholder="1-300个字符"/>
            </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="space-between" style="text-align: center;">
            <el-col>
                <el-button size="small" @click="deptsCancelBtn">取消</el-button>
                <el-button type="primary" size="small" @click="deptsComfirmBtn">确定</el-button>
            </el-col>
        </el-row>
    </el-dialog>
</template>
<script>
import { getDepartments,addDepartments,getDepartDetail,updateDepartments } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
export default {
    props:{
        showDialog:{
            type:Boolean,
            default:false
        },
        treeNode:{
            type:Object,
            default:null
        }
    },
    data(){
        const checkNameRepeat = async (rule,value,callback)=>{
            const { depts } = await getDepartments();
            let isCheck = false;
            if(this.formData.id){
                isCheck = depts.filter(item=>{
                    return item.pid == this.formData.pid && item.id != this.formData.id
                }).some(item=>{
                    return item.name == value
                })
            }else{
                isCheck = depts.filter(item=>{
                    return item.pid == this.treeNode.id
                }).some(item=>{
                    return item.name == value
                })
            }
            
            isCheck?callback(new Error(`同级部门已存在${value}部门`)):callback() 
        }
        const checkCodeRepeat = async (rule,value,callback)=>{
            const { depts } = await getDepartments();
            let isCheck = false;
            if(this.formData.id){
                isCheck = depts.filter(item=>{
                    return item.id != this.formData.id
                }).some(item=>{
                    return item.code == value
                })
            }else{
                isCheck = depts.some(item=>{
                    return item.code == value
                })
            }
            
            isCheck?callback(new Error(`部门里已存在${value}编码`)):callback()
        }

        return {
            formData:{
                name:'',
                code:'',
                manager:'',
                introduce:''
            },
            rules:{
                name:[
                    {required:true,message:'部门名称不能为空',trigger:'blur'},
                    {min:1,max:50,message:'部门名称长度1—50个字符',trigger:'blur'},
                    {validator:checkNameRepeat,trigger:'blur'}
                ],
                code:[
                    {required:true,message:'部门编码不能为空',trigger:'blur'},
                    {min:1,max:50,message:'部门编码长度1—50个字符',trigger:'blur'},
                    {validator:checkCodeRepeat,trigger:'blur'}
                ],
                manager:[
                    {required:true,message:'部门负责人不能为空',trigger:'blur'}
                ],
                introduce:[
                    {required:true,message:'部门介绍不能为空',trigger:'blur'},
                    {min:1,max:50,message:'部门介绍长度1—300个字符',trigger:'blur'}
                ]
            },
            peoples:[]
        }
    },
    computed:{
        showTitle(){
            console.log(this.formData.id)
            return this.formData.id?'编辑部门':'新增部门'
        }
    },
    methods:{
        async getEmployeeSimple(){
          this.peoples = await getEmployeeSimple();
        },
        deptsComfirmBtn(){
            this.$refs.deptsForm.validate(async isOk=>{
                if(isOk){
                    if(this.formData.id){
                        await updateDepartments(this.formData)
                    }else{
                        await addDepartments({...this.formData,pid:this.treeNode.id});
                    }
                    this.$emit('addDepts');
                    this.$emit('update:showDialog',false)
                }
            })
        },
        deptsCancelBtn(){
            this.formData = {
                name:'',
                code:'',
                manager:'',
                introduce:''
            }
            this.$emit('update:showDialog',false);
            this.$refs.deptsForm.resetFields();
        },
        async getDepartDetail(id){
            this.formData = await getDepartDetail(id);
        }

    }
}
</script>
<style scoped>

</style>