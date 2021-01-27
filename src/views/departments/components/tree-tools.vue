<template>
    <el-row type="flex" justify="space-between" align="middle" style="height:40px;width:100%;">
        <el-col>
            {{treeNode.name}}
        </el-col>
        <el-col :span="4">
            <el-row type="flex">
            <el-col>{{treeNode.manager}}</el-col>
            <el-col>
                <el-dropdown>
                <span>
                    操作
                    <i class="el-icon-arrow-down"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加1</el-dropdown-item>
                    <el-dropdown-item v-if="!isroot">添加2</el-dropdown-item>
                    <el-dropdown-item v-if="!isroot">添加3</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>
<script>
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

    }
}
</script>
<style>

</style>
