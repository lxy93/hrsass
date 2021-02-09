<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
          <el-tabs>
              <el-tab-pane label="登陆账号设置">
                  <el-form ref="formData" label-width="120px" style="margin-left:120px;margin-top:30px;">
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
              <el-tab-pane label="个人详情">
                  <!-- 动态组件 可以动态切换不同的组件 :is里一定要是个变量-->
                  <component :is="personDetail"/>
              </el-tab-pane>
              <el-tab-pane label="岗位信息">
                  <component :is="jobDetail"/>
              </el-tab-pane>
          </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserInfoById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import userInfo from './components/user-info.vue'
import jobInfo from './components/job-info.vue'
export default {
    components:{
        userInfo,
        jobInfo
    },
    data(){
        return{
            userId:this.$route.params.id,
            personDetail:'user-info',
            jobDetail:'job-info',
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
            try{
                await this.$refs.formData.validate();
                await saveUserDetailById({...this.formData,password:this.formData.password2});
                this.$message.success('用户信息设置成功')
            }catch(error){
                console.log(error)
            }
        }

    },
    created(){
        this.getUserInfoById()
    }
}
</script>

<style>

</style>