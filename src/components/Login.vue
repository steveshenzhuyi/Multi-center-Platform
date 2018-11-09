<template>
    <div class="login-contain" style="height:100%">
       
    <div id="login-box" class="login-box visible widget-box no-border">   
         <h1 style="color:white">科研分析平台</h1>  
         <div class='tips'>账号库为123/123456,456/456789</div> 
     <div class="form-group">
            <i class="iconfont  icon-yonghuicon"></i>
            <input type="text" v-model="loginForm.phoneNumber" placeholder="用户名" >
            </input>
       </div>
        <div class="form-group">
            <i class="iconfont  icon-suo"></i>
            <input type="password" id="ps" v-model="loginForm.password" placeholder="密码">

            </input>
            <i @click="psshow" style="position:fixed;padding-top:15.5px;padding-bottom:0;padding-left:5px" class="iconfont  icon-eye"></i>

        </div>
        <div class="form-group">
            <button type="primary" @click="handleLogin()" >登 录</button>
        </div>        
        <div class='tips' style="color:red" v-show="loginresult">{{tips}}</div>
        
        </div>
    </div>
</template>

<script>
// import { isphoneNumber } from "utils/validate";

export default {
  name: "Hi",
  data() {
    // const validateEmail = (rule, value, callback) => {
    //   if (!isWscnEmail(value)) {
    //     callback(new Error("请输入正确的手机号"));
    //   } else {
    //     callback();
    //   }
    // };
    // const validatePass = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error("密码不能小于6位"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      isShow: true,
      loginresult: false,
      tips: "",
      loginForm: {
        phoneNumber: "",
        password: ""
      },
      userpass: [
        {
          phoneNumber: "123",
          password: "123456"
        },
        {
          phoneNumber: "456",
          password: "456789"
        }
      ]
    };
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
    handleLogin: function() {
      var ret = this.userpass.findIndex(v => {
        return v.phoneNumber == this.loginForm.phoneNumber;
      });
      //   console.log(ret,this.tips);
      if (ret >= 0) {
        if (this.userpass[ret].password == this.loginForm.password) {
          this.loginresult = true;
          this.tips = "登录成功";
          this.$router.push({ path: "/home" });
        } else {
          this.loginresult = true;
          this.tips = "密码错误";
        }
      } else {
        this.loginresult = true;
        this.tips = "用户名不存在";
      }
      //   console.log(this.userpass);
      //   console.log(this.loginForm.phoneNumber, this.loginForm.password);
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
  max-height: 758px;
  background-color: #141a48;
  text-align: center;
}

.login-box {
  padding-top: 10%;
  padding-bottom: 10%;
  margin: 0 auto;
  height: 100%;
  width: 35%;
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
    color:white;   
    margin-right:5px;
    font-size: 20px;
    margin-top:0;
    margin-bottom:0;
}

label {
  display: inline-block;
  width: 10rem;
  text-align: right;
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
  font-size:15px;
  height: 45px;
}
</style>
