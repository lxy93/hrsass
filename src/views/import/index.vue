<template>
    <upload-excel :on-success="success"></upload-excel>
</template>
<script>
import { importEmployee } from '@/api/employees';
export default {
    methods:{
        async success({header,results}){
            console.log(results)
            const userRelations = {
                '姓名':'username',
                '手机号':'mobile',
                '工号':'workNumber',
                '入职日期':'timeOfEntry',
                '转正日期':'correctionTime'
            }
            var arr = [];
            results.forEach(item => {
                let userInfo = {};
                Object.keys(item).forEach(key=>{
                    userInfo[userRelations[key]] = item[key]
                })
                arr.push(userInfo);
            });
            await importEmployee(arr);
            this.$message.success('导入Excel成功');
            this.$router.back();
        }

    }
}
</script>
<style lang="sass" scoped>

</style>