<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <tree-node :tree-node="company" :isroot="true"/>

        <!-- 树形结构开始 -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <tree-node slot-scope="{ data }" :tree-node="data"/>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import treeNode from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeList } from '@/utils'
export default {
  components:{
    treeNode
  },
  data(){
    return {
      departs: [],
      defaultProps:{
        label:'name',
        children:'children'
      },
      company:{}
    }
  },
  methods:{
    async getDepartments(){
      const result = await getDepartments()
      this.departs = tranListToTreeList(result.depts,'');
      this.company = {name:result.companyName,manager:'负责人'}
    }
  },
  mounted(){
    this.getDepartments();
  }
}
</script>

<style>

</style>