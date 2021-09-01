<template>
    <el-dialog title="分配权限" :visible="assignPermShowDialog" @close="cancelBtn">
        <el-tree :data="permData" :props="defaultPerm" 
        :default-expand-all="true" 
        :show-checkbox="true" 
        :check-strictly="true"
        :default-checked-keys="selectPerm"
        node-key="id"
        />
        <el-row slot="footer" type="flex" justify="center">
            <el-col :span="6">
                <el-button size="small" @click="cancelBtn">取消</el-button>
                <el-button size="small" type="primary" @click="comfirmBtn">确定</el-button>
            </el-col>
        </el-row>
    </el-dialog>
</template>
<script>
    import { getPermissionList } from '@/api/pemission'
    import { getRoleDetail, assignPerm } from '@/api/setting'
    import { tranListToTreeList } from '@/utils'
    export default {
        props:{
            assignPermShowDialog:{
                type:Boolean,
                default:false
            },
            roleId:{
                type:String,
                default:null
            }
        },
        data(){
            return {
                permData:[],
                defaultPerm:{
                    label:'name',
                    children:'children'
                },
                selectPerm:[]
            }
        },
        methods:{
            async getPermissionList(){
                this.selectPerm = [];
                this.permData = tranListToTreeList(await getPermissionList(),'0');
            },
            async getRoleDetail(id){
                let { permIds } = await getRoleDetail(id);
                this.selectPerm = permIds;
            },
            async comfirmBtn(){
                await assignPerm({id:this.roleId,permIds:this.selectPerm});
                this.$emit('update:assignPermShowDialog',false)
            },
            cancelBtn(){
                this.$emit('update:assignPermShowDialog',false);
            }
        }
    }
</script>
<style>

</style>