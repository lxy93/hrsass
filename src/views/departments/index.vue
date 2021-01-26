<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-row type="flex" justify="space-between" align="middle" style="height:40px;margin-bottom:30px;">
          <el-col>
            xxx科技有限公司
          </el-col>
          <el-col :span="4">
            <el-row type="flex">
              <el-col>负责人</el-col>
              <el-col>
                <el-dropdown>
                  <span>
                    操作
                    <i class="el-icon-arrow-down"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <!-- 树形结构开始 -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <el-row slot-scope="{ data }" type="flex" justify="space-between" align="middle" style="height:40px;width:100%;">
            <el-col>
              {{data.name}}
            </el-col>
            <el-col :span="4">
              <el-row type="flex">
                <el-col>{{data.manager}}</el-col>
                <el-col>
                  <el-dropdown>
                    <span>
                      操作
                      <i class="el-icon-arrow-down"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>添加1</el-dropdown-item>
                      <el-dropdown-item>添加2</el-dropdown-item>
                      <el-dropdown-item>添加3</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
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
      }
    }
  }
}
</script>

<style>

</style>