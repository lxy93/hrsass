<template>
    <el-dialog title="角色配置" :visible="roleShowDialog" @close="cancleBtn">
        <el-checkbox-group v-model="roleIds">
            <el-checkbox label="A" v-for="item in list" :key="item.id" :label="item.id">
                {{item.name}}
            </el-checkbox>
        </el-checkbox-group>

        <el-row type="flex" justify="center" slot="footer">
            <el-col :span="6">
                <el-button size="small" @click="cancleBtn">取消</el-button>
                <el-button size="small" type="primary" @click="confimBtn">确定</el-button>
            </el-col>
        </el-row>
    </el-dialog>
</template>
<script>
    import { getRoleList } from '@/api/setting'
    import { getUserInfoById } from '@/api/user'
    import { assignRoles } from '@/api/employees'
    export default {
        props:{
            roleShowDialog:{
                type:Boolean,
                default:false
            },
            userId:{
                type:String,
                default:null,
                require:true
            }
        },
        data(){
            return {
                list:[],
                roleIds:[]
            }
        },
        methods:{
            async getRoleList(){
                let { rows } = await getRoleList({page:1,pagesize:20});
                this.list = rows;
            },
            async getUserInfoById(userId){
                let {roleIds} = await getUserInfoById(userId);
                this.roleIds = roleIds;
            },
            async confimBtn(){
                await assignRoles({id:this.userId,roleIds:this.roleIds});
                this.$emit('update:roleShowDialog',false)
            },
            cancleBtn(){
                this.$parent.roleShowDialog = false;
            }
        },
        mounted(){
            this.getRoleList();
            
        }

    }
</script>
<style>

</style>