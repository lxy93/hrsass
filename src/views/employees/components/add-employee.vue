<template>
    <el-dialog title="新增员工" :visible="showDialog" @close="addCancel">
        <el-form ref="formData" :model="formData" :rules="rules" label-width="120px">
            <el-form-item label="姓名" prop="username">
                <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名"/>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
                <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机"/>
            </el-form-item>
            <el-form-item label="入职时间" prop="timeOfEntry">
                <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择日期" />
            </el-form-item>
            <el-form-item label="聘用形式" prop="formOfEmployment">
                <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择">
                    <el-option v-for="item in employeesEnum.hireType" :key="item.id" :label="item.value" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="工号" prop="workNumber">
                <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号"/>
            </el-form-item>
            <el-form-item label="部门" prop="departmentName">
                <el-input v-loading="loading" @focus="getDepartments" v-model="formData.departmentName" style="width:50%" placeholder="请选择"/>
                <el-tree v-if="treeShow" :data="treeData" :props="{label:'name'}" :default-expand-all="true" @node-click="selectDepartment"/>
            </el-form-item>
            <el-form-item label="转正时间" prop="correctionTime">
                <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择"></el-date-picker>
            </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
            <el-col :span="6">
                <el-button size="small" @click="addCancel">取消</el-button>
                <el-button size="small" type="primary" @click="addConfirm">确定</el-button>
            </el-col>
            
        </el-row>
    </el-dialog>
</template>
<script>
import { addEmployee } from '@/api/employees'
import { getDepartments } from '@/api/departments'
import { tranListToTreeList } from '@/utils'
import employeesEnum from '@/api/constant/employees'
export default {
    props:{
        showDialog:{
            type:Boolean,
            default:false
        }
    },
    data(){
        const ischeck = (rule,value,callback)=>{
            console.log(value)
        }
        return{
            formData:{
                username:'',
                mobile:'',
                workNumber:'',
                formOfEmployment:'',
                departmentName:'',
                timeOfEntry:'',
                correctionTime:''
            },
            rules:{
               username:[
                   {required:true,message:'姓名不能为空',tigger:'blur'},
                   {min:1,max:5,message:'姓名长度在1-5个字符',tigger:'blur'}
               ],
               mobile:[
                   {required:true,message:'手机不能为空',tigger:'blur'},
                   {pattern:/^1[3-9]\d{9}$/,message:'手机格式不正确',trigger:'blur'}
               ],
               workNumber:[
                   {required:true,message:'工号不能为空',tigger:'blur'}
               ],
               formOfEmployment:[ 
                   {required:true,message:'聘用形式不能为空'}
               ],
               departmentName:[
                   {required:true,message:'部门不能为空',tigger:'change'}
               ],
               timeOfEntry:[
                    {required:true,message:'入职时间不能为空'}
               ],
               correctionTime:[
                   {required:true,message:'转正时间不能为空'}
               ]

            },
            treeData:[],
            treeShow:false,
            loading:false,
            employeesEnum
            
        }
    },
    methods:{
        async addConfirm(){
           try{
                await this.$refs.formData.validate();
                await addEmployee(this.formData);
                this.$refs.formData.resetFields();
                this.$emit('updateEmployee')
           }catch(error){
                console.log(error)
           } 
        },
        async getDepartments(){
            this.loading = true;
            const {depts} = await getDepartments();
            this.treeData = tranListToTreeList(depts,'');
            this.treeShow = true;
            this.loading = false;
        },
        selectDepartment(data){
            this.formData.departmentName = data.name;
            this.treeShow = false;
        },
        addCancel(){
            this.formData = {
                username:'',
                mobile:'',
                workNumber:'',
                formOfEmployment:'',
                departmentName:'',
                timeOfEntry:'',
                correctionTime:''
            };
            this.$refs.formData.resetFields();
            this.$emit('update:showDialog',false);
            
        }
    }
}
</script>
<style lang="sass">

</style>