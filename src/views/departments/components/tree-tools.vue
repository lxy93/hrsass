<template>
    <el-row type="flex" justify="space-between" align="middle" style="height:40px;width:100%;">
        <el-col>
            {{treeNode.name}}
        </el-col>
        <el-col :span="4">
            <el-row type="flex">
            <el-col>{{treeNode.manager}}</el-col>
            <el-col>
                <el-dropdown @command="operateDepts">
                <span>
                    操作
                    <i class="el-icon-arrow-down"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                    <el-dropdown-item v-if="!isroot" command="edit">编辑部门</el-dropdown-item>
                    <el-dropdown-item v-if="!isroot" command="del">删除部门</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>
<script>
import { delDepartments } from '@/api/departments'
export default {
    props:{
        treeNode:{
            required:true,
            type:Object
        },
        isroot:{
            required:false,
            type:Boolean
        }

    },
    methods:{
        operateDepts(type){
            if(type == 'add'){
                
            }else if(type == 'edit'){

            }else if(type == 'del'){
                this.$confirm('确定要删除该部门吗').then(()=>{
                    return delDepartments(this.treeNode.id)
                }).then(()=>{
                    this.$emit('delDepartment')
                })
                
            }
            
        }
    }
}
</script>
<style>

</style>
