<template>
    <el-container style="height: 100vh">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246);">
            <div class="logo">
              <img src="../assets/logo_henghe.png" alt="logo">
              <span>新闻编辑系统</span>
            </div>
            <el-menu>
               <router-link to="/admin/newseditor">
                        <el-menu-item index="1">新闻撰写</el-menu-item>
                </router-link>
                     <router-link to="/admin/adminnewslist">
                        <el-menu-item index="2">新闻列表</el-menu-item>
                    </router-link>
                     <router-link to="/admin/newsstatus">
                        <el-menu-item index="3">审阅状态</el-menu-item>
                    </router-link>
                     <router-link to="/admin/adminpersonage">
                        <el-menu-item index="4">个人中心</el-menu-item> 
                    </router-link>
               
               
               
                             
            </el-menu>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <router-link to="/admin/adminpersonage">
                                查看
                            </router-link>
                           
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <span  @click="Quit">
                                 退出
                            </span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>{{$store.state.User.username}}</span>
            </el-header>

            <el-main>
              <!-- <h1>sdassda</h1> -->
             <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "Admin",
        data() {
          return{

          }
        },
         methods: {
            Quit(){
                sessionStorage.clear();
                this.$router.push({path: `/login`})
            }
        }
       
    }
</script>

<style scoped>
    .logo{
      display: inline-block;
      height: 60px;
      background-color: #B3C0D1;
      display: flex;
    }
    .logo img{
      display: block;
      width: 32px;
      height: 38px;
      margin: 6px;

    }
    .logo span{
      display: block;
      line-height: 60px;
    }
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>