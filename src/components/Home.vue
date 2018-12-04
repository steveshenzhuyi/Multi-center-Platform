<template>
  <div>
    <!-- 标题/RH -->
    <header>
      <img src="../assets/logo.png">多中心协同的生物医学智能信息技术平台

      <!-- 个人信息下拉条/RH -->
      <el-dropdown style="float:right;padding-top:30px;padding-right:30px;"
                   trigger="click">
        <span class="el-dropdown-link"
              style="color:white;font-style:bold">
          <i class="iconfont icon-yonghu"></i> Admin<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>消息中心</el-dropdown-item>
          <el-dropdown-item>登出</el-dropdown-item>
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
             active-text-color="#2d8cf0">
      <el-menu-item index="data">
      </el-menu-item>
      <el-menu-item index="data">数据总览</el-menu-item>
      <el-menu-item index="myresearch">我的研究</el-menu-item>
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

    <!-- 主题内容【不要删】/RH -->
    <router-view style="margin-top:20px"></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
    data() {
    return {};
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
    }
  }
};
</script>
<style>
header {
  background-color: #545c64;
  width: 100%;
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



