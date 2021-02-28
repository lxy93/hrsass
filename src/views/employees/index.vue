<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :showBefore="true">
        <template v-slot:before>
          <span>共{{page.total}}条记录</span>
        </template>
        <div slot="after">
          <el-button size="small" type="warning" @click="$router.push('/import')">导入Excel</el-button>
          <el-button size="small" type="danger" @click="exportExcel">导出Excel</el-button>
          <el-button size="small" type="primary" @click="showDialog = true">新增员工</el-button>
        </div>
      </page-tools>

      <el-card v-loading="loading">
        <el-table :data="list" border>
          <el-table-column label="序号" type="index" width="100px" align="center"></el-table-column>
          <el-table-column label="姓名" prop="username" align="center"></el-table-column>
          <el-table-column label="头像" prop="staffPhoto" align="center">
            <template slot-scope="{row}">
              <img v-imagerror="require('@/assets/common/head.jpg')" :src="row.staffPhoto" @click="showQrcode(row.staffPhoto)" style="border-radius: 50%; width: 100px; height: 100px; padding: 10px">
            </template>
          </el-table-column>
          <el-table-column label="手机号" prop="mobile" align="center"></el-table-column>
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
            <template slot-scope="{ row }">
              <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="roleEdit(row.id)">角色</el-button>
              <el-button type="text" size="small" @click="delEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="center" align="middle" style="height:60px;">
          <el-pagination @current-change="pageChange" :current-page="page.page" :page-size="page.size" layout="prev,pager,next" :total="page.total"></el-pagination>
        </el-row>
      </el-card>
    </div>
    <add-employee :showDialog.sync="showDialog" @updateEmployee="updateEmployee"/>
    <assign-role ref="roleEdit" :roleShowDialog.sync="roleShowDialog" :userId="userId"/>

    <el-dialog :visible.sync="showImageQrcode" title="图片二维码">
      <el-row type="flex" justify="center">
        <canvas ref="qrcodeCanvas"></canvas>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import addEmployee from './components/add-employee.vue'
import assignRole from './components/assign-role.vue'
import { getEmployeeList ,delEmployee} from '@/api/employees'
import employeesEnum from '@/api/constant/employees'
import { formatDate } from '@/filters'
import Qrcode from 'qrcode'
export default {
  components:{
    addEmployee,
    assignRole
  },
  data(){
    return {
      page:{
        page:1,
        size:10,
        total:0
      },
      list:[],
      loading:false,
      showDialog:false,
      showImageQrcode:false,
      roleShowDialog:false,
      userId:null
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
    },
    async delEmployee(id){
      try {
        await this.$confirm('确定删除该员工么');
        await delEmployee(id);
        this.getEmployeeList();
        this.$message.success('成功删除');
      } catch (error) {
        console.log(error)
        // this.$message.warning(error);
      }
    },
    updateEmployee(){
      this.getEmployeeList();
      this.showDialog = false;
    },
    exportExcel(){
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      import('@/vendor/Export2Excel').then(async excel=>{
        const { rows } = await getEmployeeList({page:1,size:this.page.total})
        const data = this.formatJson(headers,rows);
        const multiHeader = [['姓名','主要内容','','','','','部门']]//复杂表头
        const merges = ['A1:A2','B1:F1','G1:G2']//合并区域
        excel.export_json_to_excel({
          header:Object.keys(headers),
          data,
          filename:'员工资料',
          multiHeader,//复杂表头
          merges//合并单元格区域
        })
        
      })
    },
    formatJson(headers,rows){
      return rows.map(item=>{
          return Object.keys(headers).map(key=>{
            if(headers[key]=='timeOfEntry' || headers[key]=='correctionTime'){
              return formatDate(item[headers[key]])
            }
            if(headers[key] == 'formOfEmployment'){
              const obj = employeesEnum.hireType.find(type=>{
                
                return type.id == item[headers[key]]
              })
              return obj?obj.value:'未知' 
            }
            return item[headers[key]]
          })
        })
    },
    showQrcode(url){
      if(url){
        this.showImageQrcode = true;
        this.$nextTick(()=>{
          Qrcode.toCanvas(this.$refs.qrcodeCanvas,url)
        })
      }else{
        this.$message.warning('该用户还未上传图片')
      }
    },
    async roleEdit(id){
      this.userId = id;
      await this.$refs.roleEdit.getUserInfoById(id);
      this.roleShowDialog = true;
    }

  },
  created(){
    this.getEmployeeList()
  }
}
</script>

<style>

</style>