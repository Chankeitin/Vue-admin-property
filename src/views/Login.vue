<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 登录页头像 -->
      <div class="avatar_box">
        <img
          src="https://img2.woyaogexing.com/2021/06/02/e4407469d52a499eb65ffc0532bf2ccf!400x400.png"
          alt=""
        />
      </div>
      <!-- 登录表单 -->
      <el-form
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
        label-width="0px"
        class="login_form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-denglu"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-mima"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">提交</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginUser } from '../api/login'
export default {
  data() {
    return {
      // 数据绑定对象
      loginForm: {
        username: 'cqt',
        password: '123456'
      },
      //验证规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm() {
      //console.log(this);
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async vaild => {
        //console.log(vaild);
        if (!vaild) return
        const { data } = await loginUser(
          this.loginForm.username,
          this.loginForm.password
        )
        console.log(data)
        if (data.code == 200) this.$message.success(data.message)
        else return this.$message.error(data.message)

        //    await this.$http.post("/api/login",{

        //          username:this.loginForm.username,
        //          password:this.loginForm.password
        //      },{
        //                 emulateJSON:true //一定要设置 {emulateJSON: true},不然跨域不成功.
        //             }).then(function(data){
        //                 //this.$message.success(data.data.message);
        //           console.log(data);
        //      }).catch(function(){
        //          console.log("服务器异常");

        window.sessionStorage.setItem('username', data.data.user.username)
        window.sessionStorage.setItem(
          'authority',
          data.data.user.authorities[0].authority
        )
        window.sessionStorage.setItem('avatar', data.data.user.user.avatar)
        this.$store.commit('login', data.data.user)
        this.$store.commit('userRoles', data.data.user.authorities[0].authority)
        //console.log(data.data.user.authorities[0].authority);
        this.$router.push('/home/index')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background: url(http://img.netbian.com/file/2018/0511/eb5539b743362544b5cf9b1f99dbbe4f.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity:0.8;
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 0 20px;
  box-sizing: border-box;
  opacity: 1;
}
</style>
