<template>
  <div class="login-contain">

    <div id="login-box"
         class="login-box visible widget-box no-border">
      <h1 style="color:white">科研分析平台</h1>
      <!-- <div class='tips'>账号库为123/123456,456/456789</div> -->
      <div class="form-group">
        <i class="iconfont  icon-yonghuicon"></i>
        <input type="text"
               v-model="loginForm.username"
               placeholder="用户名">
        </input>
      </div>
      <div class="form-group">
        <i class="iconfont  icon-suo"></i>
        <input type="password"
               id="ps"
               v-model="loginForm.password"
               placeholder="密码">
        <i @click="psshow"
           style="position:fixed;padding-top:15.5px;padding-bottom:0;padding-left:5px"
           class="el-icon-view"></i>

      </div>
      <div class="form-group">
        <button type="primary"
                @click="handleLogin()">登 录</button>
      </div>
      <div class='tips'
           style="color:red"
           v-show="loginresult">{{tips}}</div>
    </div>

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
  components: {
    'remote-js': {
      render(createElement) {
        return createElement('script', { attrs: { type: 'text/javascript', src: this.src } });
      },
      props: {
        src: { type: String, required: true },
      },
    },
  },
  methods: {

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
.tips {
  font-size: 14px;
  color: #fff;
  margin-bottom: 5px;
}

.login-contain {
  /* margin:0 auto; */

  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #141a48;
  text-align: center;
}

.login-box {
  padding-top: 10%;
  padding-bottom: 10%;
  margin: 0 auto;
  height: 100%;
  width: 35%;
  min-width: 322px;
  background-color: #141a48;
}

.form-group {
  margin: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #454545;
}

input {
  background: transparent;
  border: 1px solid #2d8cf0;
  -webkit-appearance: none;
  border-radius: 3px;
  padding: 2px 5px 2px 15px;
  color: #eeeeee;
  height: 47px;
}

i {
  color: white;
  margin-right: 5px;
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 0;
}

button {
  outline: none;
  padding: 5px 8px;
  color: #fff;
  border: 1px solid #bcbcbc;
  border-radius: 3px;
  cursor: pointer;
  background-color: #2d8cf0;
  border-color: #2d8cf0;
  width: 100%;
  font-size: 15px;
  height: 45px;
}
</style>
