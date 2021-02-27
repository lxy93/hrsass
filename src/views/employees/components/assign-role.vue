<template>
    <el-dialog title="角色配置" :visible.sync="roleShowDialog">
        <el-checkbox-group v-model="roleIds">
            <el-checkbox label="A" v-for="(item,index) in list" :key="item.id" :label="item.id">
                {{item.name}}
            </el-checkbox>
        </el-checkbox-group>

        <el-row type="flex" justify="center" slot="footer">
            <el-col :span="6">
                <el-button size="small">取消</el-button>
                <el-button size="small" type="primary">确定</el-button>
            </el-col>
        </el-row>
    </el-dialog>
</template>
<script>
    import { getRoleList } from '@/api/setting'
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
            }
        },
        mounted(){
            this.getRoleList();
        }

    }
</script>
<style>

</style>