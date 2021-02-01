<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <tree-node :tree-node="company" @addDepts="addDepts" :isroot="true"/>

        <!-- 树形结构开始 -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <tree-node slot-scope="{ data }" :tree-node="data" @addDepts="addDepts" 
          @delDepartment="getDepartments" @editDepts="editDepts"/>
        </el-tree>
      </el-card>
    </div>
    <add-dept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments"/>
  </div>
</template>

<script>
import treeNode from './components/tree-tools.vue'
import addDept from './components/add-dept.vue'
import { getDepartments,getDepartDetail} from '@/api/departments'
import { tranListToTreeList } from '@/utils'
export default {
  components:{
    treeNode,
    addDept
  },
  data(){
    return {
      departs: [],
      defaultProps:{
        label:'name',
        children:'children'
      },
      company:{},
      showDialog:false,
      node:null
    }
  },
  methods:{
    async getDepartments(){
      const result = await getDepartments()
      this.departs = tranListToTreeList(result.depts,'');
      this.company = {name:result.companyName,manager:'负责人',id:''}
    },
    addDepts(node){
      this.showDialog = true;
      this.node = node;

    },
    editDepts(node){
      this.showDialog = true;
      this.node = node;
      this.$refs.addDept.getDepartDetail(node.id);
    }
  },
  mounted(){
    this.getDepartments();
  }
}
</script>

<style>

</style>