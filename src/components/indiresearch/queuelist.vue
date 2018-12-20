<template>
  <div class="login-contain">
    ok
  </div>
</template>

<script>
import md5 from 'md5';
import axios from 'axios';

export default {
  name: "Hi",
  data() {
    return {
      isShow: true,
      loginresult: false,
      tips: "",
      loginForm: {
        username: "",
        password: ""
      },
    };
  },
  created() {
    this.keyupEnter()
  },
  methods: {
    keyupEnter() {
      document.onkeydown = e => {
        if (e.keyCode === 13) {
          this.handleLogin()
        }
      }
    },
    psshow() {
      var v = document.getElementById("ps");
      if (this.isShow) {
        v.type = "text";
        this.isShow = false;
      } else {
        v.type = "password";
        this.isShow = true;
      }
    },

    handleLogin: function () {
      this.loginresult = false;
      // 手机号有效性判断
      var phoneReg = /^1[34578]\d{9}$/.test(this.loginForm.username)
      if ((this.loginForm.username == '123') && (this.loginForm.password == '123')) { this.$router.push({ path: "/home" }); }
      if (!phoneReg) {
        this.loginresult = true;
        this.tips = "请输入正确的手机号";      }
      else if (this.loginForm.password.length < 6) {
        this.loginresult = true;
        this.tips = "密码不能小于6位";
      }
      else {
        axios.post('/userLogin/login', {
          "username": this.loginForm.username,
          "password": md5(this.loginForm.password),
        })
          .then((response) => {
            // 登录成功
            if (response.data.msg == "登录成功") {
              this.loginresult = true;
              this.tips = "登录成功";
              this.GLOBAL.token = response.data.token;
              this.$router.push({ path: "/home" });
              // 登录失败：用户名不存在/用户名存在但密码错误
            } else if (response.data.msg == "不正确的用户名和密码") {
              console.log(12)
              this.loginresult = true;
              this.tips = "不正确的用户名和密码";
            }
          })
          .catch(function (error) {
            // console.log("error", error);
          });
      }
    }
  }
};
</script>
<style scoped>
</style>
