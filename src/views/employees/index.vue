<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :showBefore="true">
        <template v-slot:before>
          <span>共{{page.total}}条记录</span>
        </template>
        <div slot="after">
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </div>
      </page-tools>

      <el-card v-loading="loading">
        <el-table :data="list" border>
          <el-table-column label="序号" type="index" width="100px" align="center"></el-table-column>
          <el-table-column label="姓名" prop="username" align="center"></el-table-column>
          <el-table-column  label="工号" prop="workNumber" align="center"></el-table-column>
          <el-table-column  label="聘用形式" prop="formOfEmployment" align="center" :formatter="employeeFormatter">
          </el-table-column>
          <el-table-column  label="部门" prop="departmentName" align="center"></el-table-column>
          <el-table-column  label="入职时间" prop="timeOfEntry" align="center">
            <!-- 作用域插槽 加 过滤器-->
            <template v-slot="scope">
              {{scope.row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column  label="账户状态" prop="enableState" align="center">
            <el-switch slot-scope="{row}" :value="row.enableState==1"></el-switch>
          </el-table-column>
          <el-table-column  label="操作" align="center">
            
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
            
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="center" align="middle" style="height:60px;">
          <el-pagination @current-change="pageChange" :current-page="page.page" :page-size="page.size" layout="prev,pager,next" :total="page.total"></el-pagination>
        </el-row>
      </el-card>

    </div>
  </div>
</template>

<script>
import { getEmployeeList } from '@/api/employees'
import employeesEnum from '@/api/constant/employees'
export default {
  data(){
    return {
      page:{
        page:1,
        size:10,
        total:0
      },
      list:[],
      loading:false
    }
  },
  methods:{
    async getEmployeeList(){
      this.loading = true;
      const {rows,total} = await getEmployeeList(this.page);
      this.list = rows;
      this.page.total = total;
      this.loading = false;
    },
    pageChange(newPage){
      this.page.page = newPage;
      this.getEmployeeList()
    },
    employeeFormatter(row, column, cellValue, index){

      const isEnum = employeesEnum.hireType.find(item=>{
        return item.id == cellValue;
      })
      return isEnum?isEnum.value:'未知'
       
    }
  },
  created(){
    this.getEmployeeList()
  }
}
</script>

<style>

</style>