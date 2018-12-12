<template>
  <div style="margin-left:10px;margin-right:10px">
    <el-row style="margin-top:10px;margin-bottom:10px;">
      <el-col :span="4"
              style="text-align:center">
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="6">
        <el-row>
          <div id="newresearch"
               class="cardBox"
               shadow="hover"
               @click="toNewresearch">
            <span class="el-icon-plus"></span>
          </div>
        </el-row>
      </el-col>

      <el-col :span="6">
        <el-row>
          <div class="cardBox">
            <div class="headerBox">
              <span style="font-size:20px; font-weight:bold">项目1</span>
              <el-dropdown style="float: right; padding: 3px 0"
                           trigger="click">
                <span class="el-icon-more">
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item> <i class="el-icon-view"></i> 预览</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="bodyBox"
                 @click="toMyresearch">
              <div class="flex-container">
                {{'项目创建时间 ' }}<span style="float: right; ">{{'2018-12-06' }}</span>
              </div>
              <div class="flex-container">
                {{'研究者 ' }}
                <span style="float: right; ">{{'Admin' }}</span>
              </div>
              <div class="flex-container">
                {{'研究状态 ' }}
                <span style="float: right; ">{{'等待审核' }}</span>
              </div>
            </div>
          </div>
        </el-row>
      </el-col>

      <el-col :span="6">
        <el-row>
          <div class="cardBox">
            <div class="headerBox">
              <span style="font-size:20px; font-weight:bold">项目2</span>
              <el-dropdown style="float: right; padding: 3px 0"
                           trigger="click">
                <span class="el-icon-more">
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item> <i class="el-icon-edit-outline"></i> 编辑</el-dropdown-item>
                  <el-dropdown-item> <i class="el-icon-document"></i> 申请</el-dropdown-item>
                  <el-dropdown-item> <i class="el-icon-view"></i> 预览</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="bodyBox"
                 @click="toMyresearch">
              <div class="flex-container">
                {{'项目创建时间 ' }}<span style="float: right; ">{{'2018-12-08' }}</span>
              </div>
              <div class="flex-container">
                {{'研究者 ' }}<span style="float: right; ">{{'Admin' }}</span>
              </div>
              <div class="flex-container">
                {{'研究状态 ' }}<span style="float: right; ">{{'已完成' }}</span>
              </div>
            </div>
          </div>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row>
          <div class="cardBox">
            <div class="headerBox">
              <span style="font-size:20px; font-weight:bold">项目3</span>
              <el-dropdown style="float: right; padding: 3px 0"
                           trigger="click">
                <span class="el-icon-more">
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item> <i class="el-icon-edit-outline"></i> 编辑</el-dropdown-item>
                  <el-dropdown-item> <i class="el-icon-document"></i> 申请</el-dropdown-item>
                  <el-dropdown-item> <i class="el-icon-view"></i> 预览</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="bodyBox"
                 @click="toMyresearch">
              <div class="flex-container">
                {{'项目创建时间 ' }}<span style="float: right; ">{{'2018-12-08' }}</span>
              </div>
              <div class="flex-container">
                {{'研究者 ' }}<span style="float: right; ">{{'Admin' }}</span>
              </div>
              <div class="flex-container">
                {{'研究状态 ' }}<span style="float: right; ">{{'已完成' }}</span>
              </div>
            </div>
          </div>
        </el-row>
      </el-col>

    </el-row>
  </div>
</template>
<script>
let id = 1000;

export default {
  data() {
    return {
      NewVarVisible: false,
      NewConceptVisible: false,
      NewQueneVisible: false,
      NewMethodVisible: false,
    }
  },
  methods: {
    toMyresearch: function () {
      this.$router.replace({
        path: "myresearch",
        query:
          {
            researchstatus: 2
          }
      });
    },
    toNewresearch: function () {
      this.$router.push({
        path: 'myresearch',
        query:
          {
            researchstatus: 1
          }
      });
    },

  },
};
</script>
<style>
#newresearch {
  vertical-align: middle;
  text-align: center;
  font-size: 117px;
  color: dimgrey;
  height: 175px;
  cursor: pointer;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
}
.cardBox {
  height: 175px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-right: 10px;
  padding: 5px;
  padding-top: 15px;
  border-radius: 5px;
}

.headerBox {
  padding: 15px;
}

.bodyBox {
  padding: 15px;
  cursor: pointer;
  font-size: 15px;
}
.flex-container {
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom: 1px #000000 dotted;
}
</style>