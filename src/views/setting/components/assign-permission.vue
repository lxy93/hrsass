<template>
    <el-dialog title="分配权限" :visible="permShowDialog" @close="cancleBtn">

        <el-row type="flex" justify="center" slot="footer">
            <el-col :span="6">
                <el-button size="small" @click="cancleBtn">取消</el-button>
                <el-button size="small" type="primary" @click="confimBtn">确定</el-button>
            </el-col>
        </el-row>
    </el-dialog>
</template>
<script>
import {assignPerm} from '@/api/setting'
export default {
    props:{
        permShowDialog:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        async assignPerm(id){
            await assignPerm(id);
        },
        confimBtn(){

        },
        cancleBtn(){
            this.$emit('update:cancleBtn',false)
        }
    }
}
</script>
<style scoped>

</style>