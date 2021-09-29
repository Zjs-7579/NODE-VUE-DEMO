<template>
  <div>
    <el-form>
      <el-descriptions title="个人信息" :column="2" border>
        <el-descriptions-item
          label="id"
          label-class-name="my-label"
          content-class-name="my-content"
          >{{User.id}}</el-descriptions-item
        >

        <el-descriptions-item label="用户名">
          <el-button type="text" @click="UserName = true">{{
            User.username
          }}</el-button>
        </el-descriptions-item>

        <el-descriptions-item label="手机号">
          <el-button type="text" @click="Call = true">{{
            User.call
          }}</el-button>
        </el-descriptions-item>
        <el-descriptions-item label="邮箱">
          <el-button type="text" @click="Email = true">{{
            User.email
          }}</el-button>
        </el-descriptions-item>
        <el-descriptions-item label="居住地">
          <el-button type="text" @click="Address = true">{{
            User.address
          }}</el-button>
        </el-descriptions-item>

        <el-descriptions-item label="密码">
          <el-button type="text" @click="PassWord = true">密码修改</el-button>
        </el-descriptions-item>
      </el-descriptions>

      <br />
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确 认</el-button>
      </el-form-item>
    </el-form>



    <el-dialog title="用户名修改" :visible.sync="UserName">
      <el-form :model="upform" >
        <el-form-item
          label="新用户名"
          :label-width="formLabelWidth"
        
        >
          <el-input v-model="upform.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="UserName = false">取 消</el-button>
        <el-button type="primary" @click="UpUser( 'username',upform.name)">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="手机号修改" :visible.sync="Call">
      <el-form :model="upform" >
        <el-form-item
          label="新手机号"
          :label-width="formLabelWidth"
         
        >
          <el-input v-model="upform.call" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Call = false">取 消</el-button>
        <el-button type="primary" @click="UpUser('call',upform.call)">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="邮箱修改" :visible.sync="Email">
      <el-form :model="upform" >
        <el-form-item label="新邮箱" :label-width="formLabelWidth" >
          <el-input v-model="upform.email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Email = false">取 消</el-button>
        <el-button type="primary" @click="UpUser('email',upform.email)">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="地址修改" :visible.sync="Address">
      <el-form :model="upform">
        <el-form-item label="新地址" :label-width="formLabelWidth">
          <el-input v-model="upform.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Address = false">取 消</el-button>
        <el-button type="primary" @click="UpUser('address',upform.address)">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="密码修改" :visible.sync="PassWord">
      <el-form :model="upform">
        <el-form-item label="旧密码" :label-width="formLabelWidth">
          <el-input v-model="upform.passworde" autocomplete="off" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input v-model="upform.newpassworde" autocomplete="off" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" :label-width="formLabelWidth">
          <el-input v-model="upform.newspwd" autocomplete="off" type="password" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="PassWord = false">取 消</el-button>
        <el-button type="primary" @click="UpUser('password',upform.newspwd)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      UserName: false,
      Call: false,
      Email: false,
      Address: false,
      PassWord: false,
      formLabelWidth: "100px",
      upform: {
        name: "",
        call: "",
        email: "",
        address: "",
        passworde: "",
        newpassworde: "",
        newspwd: "",
      },
    };
  },
  computed: {
    ...mapState(['User'])
  },
  methods: {
    UpUser(value, data) {
      console.log(value, data)
      //const {name} =this.upform


      if (value === 'username') {
        let RegName = /^[a-zA-Z0-9_-]{1,16}$/;
           if (data === '') {
              this.$message.error('用户名不能为空');
            }else if (!RegName.test(data)) {
               this.$message.error('用户名不能大于16位');
            }else{
              //this.form.username = value;
              //let res = {name: value, data: name}
              //this.$store.dispatch('UpStateUser', res)
              this.UserName = false; 
            } 
      }

      if (value === 'call') {
        let RegCall = /^1(3|4|5|6|7|8|9)\d{9}$/;
                if (!data) {
                    this.$message.error('手机号不能为空');
                }else if (!RegCall.test(data)) {
                   this.$message.error('手机号验证错误');
                }else{
                  this.Call = false;
                }
      }
      if (value === 'email') {
         let RegEmail = /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if (!data) {
                    this.$message.error('邮箱不能为空');
                }else if (!RegEmail.test(data)) {
                    this.$message.error('邮箱验证错误');
                }else{
                  this.Email = false;
                }
      }

      if (value === 'address') {
        this.Address = false;
      }
      if (value === 'password') {
         const {newpassworde, newspwd} = this.upform;
          if(newpassworde === newspwd){
            this.PassWord = false;
          }else{
            this.upform.newspwd = ''
            this.$message.error('两次密码输入不相同');
          }

           return
      }
      //console.log(this.upform);
      let res = {value, data}
      this.$store.dispatch('UpStateUser', res)
             
    },

    onSubmit() {
      // const {name, call, email, address, passworde, newsomepassworde} = this.upform

      // // let res = this.upform.filter(item => return item);
      // const data = {id: this.User.id ,name, call, email, address, passworde, newsomepassworde};
      // //console.log(data);
      // for(let item in data){
      //   if (data[item] === '') {
      //     delete data[item]
      //   }
      // }
     let data = {}
      //console.log(this.newsomepassworde)
      if (this.upform.newspwd == '') {
        console.log('空')
        data = {...this.$store.state.User}
      }else{
        console.log('111')
        data = {...this.$store.state.User, password: this.upform.passworde, newspwd: this.upform.newspwd}
      }
      
      //console.log(data);
      const res = this.$http.post('upuser', data)
      //console.log(res)
      res.then(
        (d)=> {
           if (d.data.code === 200) {
              this.$message.success('更新信息成功')
            }else if(d.data.code === 403){
              this.$message.warning('密码错误，此项更改失效');
              const user = d;
              this.$store.dispatch('getUser', user )
            }else{
              this.$message.danger('更新信息失败')
            }
         }
        )
      // if (res.data.code === 200) {
      //   this.$$message.success('更新信息成功')
      // }
      // if(res.data.code === 403){
      //   this.$$message.warning('密码错误，更新密码失败')
      // }else{
      //   this.$$message.danger('更新信息失败')
      // }


      

    }
  },
  // watch: {
  //   User(val) {
  //     this.form = val
  //   }
  // }
};
</script>
<style>
.my-label {
  background: #e1f3d8;
}

.my-content {
  background: #fde2e2;
}
</style>