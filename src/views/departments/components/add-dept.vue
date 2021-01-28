<template>
    <el-dialog title="新增部门" :visible="true">
        <el-form label-width="120px">
            <el-form-item label="部门名称">
                <el-input style="width:80%" placeholder="请输入部门名称"/>
            </el-form-item>
            <el-form-item label="部门编码">
                <el-input style="width:80%" placeholder="请输入部门编码"/>
            </el-form-item>
            <el-form-item label="部门负责人">
                <el-select style="width:80%" placeholder="请选择部门负责人"/>
            </el-form-item>
            <el-form-item label="部门介绍">
                <el-input style="width:80%" placeholder="请输入部门介绍"/>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
export default {
    
}
</script>
<style scoped>

</style>