<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
          <el-tabs>
              <el-tab-pane label="登陆账号设置">
                  <el-form label-width="120px" style="margin-left:120px;margin-top:30px;">
                      <el-form-item label="姓名" prop="username">
                          <el-input type="text" v-model="formData.username" style="width:300px"/>
                      </el-form-item>
                      <el-form-item label="密码" prop="password2">
                          <el-input type="password" v-model="formData.password2" style="width:300px"/>
                      </el-form-item>
                      <el-form-item>
                          <el-row type="flex" justify="center">
                              <el-col :span="16">
                                  <el-button type="primary" size="small" @click="saveUserDetailById">保存</el-button >
                              </el-col>
                          </el-row>
                      </el-form-item>
                  </el-form>
              </el-tab-pane>
              <el-tab-pane label="个人详情"></el-tab-pane>
              <el-tab-pane label="岗位信息"></el-tab-pane>
          </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserInfoById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
export default {
    data(){
        return{
            userId:this.$route.params.id,
            formData:{
                username:'',
                password2:''
            },
            rules:{
                username:[
                    {required:true,message:'用户名不能为空',trigger:'blur'}
                ],
                password2:[
                    {required:true,message:'密码不能为空',trigger:'blur'},
                    {min:6,max:9,message:'密码长度在6-9个字符',trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        async getUserInfoById(){
            this.formData = await getUserInfoById(this.userId)
        },
        async saveUserDetailById(){
            await saveUserDetailById({...this.formData,password:this.formData.password2});
            this.$message.success('用户信息设置成功')
        }

    },
    created(){
        this.getUserInfoById()
    }
}
</script>

<style>

</style>