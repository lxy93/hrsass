<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <el-button slot="after" size="small" type="primary" @click="addPermission(1)">添加权限</el-button>
      </page-tools>
      <el-table border :data="list" row-key="id">
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column align="center" label="标识" prop="code"></el-table-column>
        <el-table-column align="center" label="描述" prop="description"></el-table-column>
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <el-button v-if="row.type==1" type="text" @click="addPermission(2,row.id)">添加</el-button>
            <el-button type="text" @click="editPermission(row.id)">编辑</el-button>
            <el-button type="text" @click="deleteClick(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <add-edit ref="addEdit" :editShowDialog.sync="editShowDialog" :permissionType="type" :permissionId="id" @getPermissionList="getPermissionList"></add-edit>
    </div>
  </div>
</template>

<script>
import { getPermissionList,delPermission} from '@/api/pemission'
import { tranListToTreeList } from '@/utils'
import addEdit from './components/addEdit.vue'
export default {
  components:{
    addEdit
  },
  data(){
    return {
      list:[],
      editShowDialog:false,
      type:null,
      id:''
    }
  },
  methods:{
    async getPermissionList(){
      this.list = tranListToTreeList(await getPermissionList(),'0')//转换为树形结构
    },
    addPermission(type,id){
      this.type = type;
      this.id = id
      this.editShowDialog = true;
    },
    async deleteClick(id){
      await delPermission(id);
      this.getPermissionList();
      this.$message.success('删除成功');
    },
    async editPermission(id){
      this.id = id;
      await this.$refs.addEdit.getPermissionDetail(id);
      this.editShowDialog = true;
    }
  },
  created(){
    this.getPermissionList();
  }
}
</script>

<style>

</style>