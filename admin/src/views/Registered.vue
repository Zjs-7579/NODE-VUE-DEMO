<template>
    <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" label-position="right" class="demo-ruleForm login-page">
            <h3 class="title">用户注册</h3>
            <el-form-item label="用户名：" prop="username">
                <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" prop="call">
                <el-input type="text" v-model="ruleForm.call" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
                <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="家庭地址：" prop="address">
                <el-select v-model="ruleForm.address" clearable  placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.label">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="密码：" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="enrollFrom">提交</el-button>
                <el-button style="float: right" @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Registered",
        data() {
            const username = (rule, value, callback) => {
                let RegName = /^[a-zA-Z0-9_-]{1,16}$/;
                if (value === '') {
                    return callback(new Error('姓名不能为空'));
                }
                if (!RegName.test(value)) {
                    return callback(new Error('名字不能大于16位'));
                }
            };
            const call = (rule, value, callback) => {
                let RegCall = /^1(3|4|5|6|7|8|9)\d{9}$/;
                if (!value) {
                    return callback(new Error('手机号不能为空'));
                }
                if (!RegCall.test(value)) {
                    return callback(new Error('手机号验证错误'));
                }
            };
            const email = (rule, value, callback) => {
                let RegEmail = /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if (!value) {
                    return callback(new Error('邮箱不能为空'));
                }
                if (!RegEmail.test(value)) {
                    return callback(new Error('邮箱验证错误'));
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    pass: '',
                    checkPass: '',
                    username: '',
                    call: '',
                    email: '',
                    address: '其它',
                },
                options: [{
                    value: '1',
                    label: '北京市'
                }, {
                    value: '2',
                    label: '上海市'
                }, {
                    value: '3',
                    label: '广州市'
                }, {
                    value: '4',
                    label: '深圳市'
                }, {
                    value: '5',
                    label: '其它'
                }],
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    username: [
                        { validator: username, trigger: 'blur' }
                    ],
                    call: [
                        { validator: call, trigger: 'blur' }
                    ],
                    email: [
                        { validator: email, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            async enrollFrom() {
                const {pass, username, call, email, address} = this.ruleForm;
                const id = Math.random().toString(36).substr(2);
                const userData = {id,username,pass,call, email, address, flag: '1'};
                const res = await this.$http.post('registered', userData);
                //console.log(res);
                 if (res.data.code === 200){
                    this.$message({
                        message: '注册成功',
                        type: 'success'
                    });
                    this.$router.push({
                            path: '/login',
                        })

                } else {
                    let txt = res.data.code===401?'用户名已存在，请重新创建':'创建失败，请重新创建';
                    this.$message.error(txt);
                    this.resetForm('ruleForm');
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

        }
    }
</script>

<style scoped>
    .title{
        text-align: center;
    }
    .login-page {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        margin: 80px auto;
        width: 400px;
        padding: 35px 35px 15px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
</style>