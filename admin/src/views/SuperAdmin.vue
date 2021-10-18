<template>
    <el-container style="height: 100vh">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246);">
            <div class="logo">
                <img src="../assets/logo_henghe.png" alt="logo">
                <router-link to="/superadmin/home">
                    <span>后台管理系统</span>
                </router-link>
            </div>
            <el-menu>
              <!-- 在el-menu添加:default-openeds="['1', '3']"，自动开启1，3列表 -->
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>新闻管理</template>
                    <router-link to="/superadmin/newslist">
                        <el-menu-item index="1-1">新闻管理</el-menu-item>
                    </router-link>
                    <router-link to="/superadmin/adminclass">
                        <el-menu-item index="1-2">分类管理</el-menu-item>
                    </router-link> 
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
                     <router-link to="/superadmin/usereditor">
                        <el-menu-item index="2-1">用户管理</el-menu-item>
                    </router-link>
                     <router-link to="/superadmin/usersuper">
                        <el-menu-item index="2-2">系统注册</el-menu-item>
                    </router-link>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-setting"></i>个人设置</template>
                     <router-link to="/superadmin/newscheck">
                        <el-menu-item index="3-1">
                            新闻审阅
                            </el-menu-item>
                    </router-link>
                     <router-link to="/superadmin/personage">
                        <el-menu-item index="3-2">个人中心</el-menu-item>
                    </router-link>
                </el-submenu>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"><el-badge is-dot:true></el-badge></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <router-link to="/superadmin/personage">
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
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "SuperAdmin",
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
      color: black;
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