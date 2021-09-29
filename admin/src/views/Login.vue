<template>
    <div>
        <el-form status-icon
                 label-position="top"
                 label-width="80px"
                 class="login-page">
            <h3 class="title">系统登录</h3>
            <el-form-item label="用户名：">
                <el-input type="text" v-model="FormData.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码：">
                <el-input placeholder="请输入密码" v-model="FormData.password" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="checked">
                    记住密码
                </el-checkbox>
                <router-link to="/registered">
                    <el-link type="info" :underline="false" class="enroll">没有账户，我要注册</el-link>
                </router-link>
            </el-form-item>

            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                FormData: {
                    username: '',
                    password: '',
                },
                checked: false
            }
        },
        methods: {
            async handleSubmit(){
                const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                         pinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                setTimeout(() => {
                    loading.close();
                }, 2000);            
                const user =  await this.$http.post('login', this.FormData);
                const newsclass =  await this.$http.get('newsclass');
                const tagclass =  await this.$http.get('tagnews');
                const newsClassTag =  await this.$http.get('newsclasstag');
                const userList = await this.$http.get('userlist');
                //console.log(res);
                if (user.data.code === 200&&newsclass.data.code === 200&&tagclass.data.code&&newsClassTag.data.code === 200&&userList.data.code===200){
                    this.$store.dispatch('getNewsClassList', newsclass)
                    this.$store.dispatch('getTagClassList', tagclass)
                    this.$store.dispatch('getNewsListAll', newsClassTag.data.newsList)
                    this.$store.dispatch('getUserList', userList.data.userlist)
                    this.$message({
                        message: '恭喜你，登录成功',
                        type: 'success'
                    });
                    if (user.data.flag == 1) {
                        this.$store.dispatch('getUser', user)
                        this.$router.push({
                            path: `/admin`,
                        })
                    }else {
                        this.$store.dispatch('getUser', user)
                        this.$router.push({
                            path: `/superadmin`,
                        })
                    }

                } else {
                    this.$message.error('账户或密码错误,请重新登录');
                    this.FormData.username = '';
                    this.FormData.password = '';
                }

            }
        }
    }
</script>

<style scoped>
    .enroll{
        float: right;
    }
    .title{
        text-align: center;
    }
    .login-page {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        margin: 130px auto;
        width: 400px;
        padding: 35px 35px 15px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
</style>