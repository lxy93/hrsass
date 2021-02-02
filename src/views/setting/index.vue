<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <el-row type="flex" style="margin-bottom:30px;">
              <el-button size="small" type="primary" icon="el-icon-plus" @click="addRole">
                新增角色
              </el-button>
            </el-row>
            <el-table border :data="list">
              <el-table-column align="center" type="index" label="序号" width="150"></el-table-column>
              <el-table-column align="center" prop="name" label="角色名称" width="180"></el-table-column>
              <el-table-column align="center" prop="description" label="描述"></el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="{row}">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRole(row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="deleteRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="center" align="middle" style="height:60px;">
              <el-pagination 
              layout="prev,pager,next" 
              :total="page.total"
              @current-change="changePage"></el-pagination>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert type="info" show-icon :closable="false" title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"></el-alert>
            <el-form label-width="120px" style="margin-top:30px;">
              <el-form-item label="公司名称">
                <el-input v-model="formData.name" disabled type="text" style="width:400px;"/>
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" disabled type="text" style="width:400px;"/>
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="formData.companyPhone" disabled type="text" style="width:400px;"/>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox" disabled type="text" style="width:400px;"/>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formData.remarks" disabled type="textarea" rows="3" style="width:400px;"/>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <add-set ref="addRole" :showTitle="showTitle" :showDailog.sync="showDailog" @updateRole="updateRole" />
  </div>
</template>

<script>
import addSet from './components/add-set.vue'
import { getRoleList ,getCompanyInfo ,deleteRole } from '@/api/setting'
import { mapGetters } from 'vuex'
export default {
  components:{
    addSet
  },
  data(){
    return {
      page:{
        page:1,
        pagesize:10,
        total:0
      },
      list:[],
      formData:{},
      showDailog:false,
      showTitle:''
    }
  },
  computed:{
    ...mapGetters(['userInfo'])
  },
  methods:{
    async getRoleList(){
    const {total,rows} = await getRoleList(this.page);
    this.page.total = total;
    this.list =rows;
    },
    changePage(newPage){
      this.page.page = newPage;
      this.getRoleList();
    },
    async getCompanyInfo(){
      this.formData = await getCompanyInfo(this.userInfo.companyId)
    },
    async deleteRole(id){
      try{
        await this.$confirm('是否确认删除该角色吗？')
        await deleteRole(id)
        this.getRoleList()
        this.$message.success('删除角色成功')
      }catch(error){
        console.log(error);
      }
      
    },
    editRole(id){
      this.$refs.addRole.getRoleDetail(id);
      this.showTitle = '编辑角色'
      this.showDailog = true;

    },
    updateRole(showDailog){
      this.getRoleList();
      this.showDailog = showDailog;
    },
    addRole(){
      this.showDailog = true;
      this.showTitle = '新增角色'
    }

  },
  created(){
    this.getRoleList();
    this.getCompanyInfo();
  }
}
</script>

<style>

</style>