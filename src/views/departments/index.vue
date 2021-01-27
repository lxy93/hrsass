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
export default {
  components:{
    treeNode
  },
  data(){
    return {
      departs: [
        {
          name: '总裁办',
          manager:'曹操',
          children: [
            { 
              name: '董事会',
              manager:'曹丕'
            }
          ]
        },
        {
          name: '行政部',
          manager:'刘备'
        },
        { 
          name: '人事部',
          manager:'孙权'
        }
      ],
      defaultProps:{
        label:'name',
        children:'children'
      },
      company:{
        name:'xxx科技有限公司',
        manager:'负责人'
      }
    }
  }
}
</script>

<style>

</style>