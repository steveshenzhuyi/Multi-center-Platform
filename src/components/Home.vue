<template>
  <div>
    <!-- 标题/RH -->
    <header>
      <img src="../assets/logo.png">多中心协同的生物医学智能信息技术平台

      <!-- 个人信息下拉条/RH -->
      <el-dropdown style="float:right;padding-top:30px;padding-right:30px;"
                   trigger="click"
                   @command="handleCommand">
        <span class="el-dropdown-link"
              style="color:white;  cursor: pointer;
">
          <i class="iconfont icon-yonghuicon"></i> Admin<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="toInfo">个人信息</el-dropdown-item>
          <el-dropdown-item command="toMsg">消息中心</el-dropdown-item>
          <el-dropdown-item command="toLogout">登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </header>

    <!-- 导航条/RH -->
    <el-menu :default-active="activeIndex"
             class="el-menu-demo"
             mode="horizontal"
             @select="handleSelect"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#2d8cf0"
             style="  width: 100%;  min-width: 823px;">
      <el-menu-item index="data">
      </el-menu-item>
      <el-menu-item index="data">数据总览</el-menu-item>
      <el-menu-item index="indiresearch/hisresearch">个人研究</el-menu-item>
      <el-menu-item index="coresearch/myteam">协同研究</el-menu-item>
      <el-menu-item index="knowledgegraph">知识图谱</el-menu-item>
      <el-menu-item index="dataimport">数据导入</el-menu-item>
      <el-submenu index="6">
        <template slot="title">管理中心</template>
        <el-menu-item index="personalpage">个人主页</el-menu-item>
        <el-menu-item index="resourcestatus">资源状态</el-menu-item>
        <el-menu-item index="authoritycontrol">权限控制</el-menu-item>
      </el-submenu>
      <el-menu-item index="thirdparty">第三方数据使用</el-menu-item>
    </el-menu>

    <el-dialog title="登出"
               :visible.sync="dialogVisible"
               width="30%">
      <span>确定退出当前账号并回到登录页面吗？</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="toLogout()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 主题内容【不要删】/RH -->
    <router-view style="margin-top:20px;width: 100%;  min-width: 823px;"></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return { dialogVisible: false };
  },
  computed: {
    activeIndex() {
      return this.$route.path.replace("/", "");
    }
  },
  methods: {
    // 页面跳转/RH
    handleSelect(key, keyPath) {
      // console.log(this);
      // console.log(key, keyPath);
      this.$router.push({ path: "/" + key });
    },
    handleCommand(command) {
      if (command == 'toLogout') { this.dialogVisible = true }
    },
    toLogout() {
      this.GLOBAL.token = "";
      this.dialogVisible = false;
      this.$router.push({
        path: '/',
      });
    }
  }
};
</script>
<style>
header {
  background-color: #545c64;
  width: 100%;
  min-width: 823px;
  font-size: 28px;
  color: white;
}
img {
  padding-left: 20px;
  margin-top: 10px;
  margin-bottom: 0px;
  padding-right: 40px;
  height: 40px;
}
</style>



