<template>
  <div>
    <el-row style="margin-top:10px;margin-bottom:10px;">
      <el-col :span="4"
              style="text-align:center">
        <!-- <el-col :span="12"
                style="">
          <el-button type="primary"
                     @click="toMyresearch">我的研究</el-button>
        </el-col> -->
        <!-- <el-col :span="12">
          <el-button type="primary"
                     @click="toHisresearch">历史研究</el-button>
        </el-col> -->
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="6">

        <!-- 概念集模块/RH -->
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
        <!-- 构建模块/RH -->
        <el-row>
          <div class="cardBox">
            <div class="headerBox">
              <span style="font-size:20px; font-weight:bold">项目1</span>
              <span style="float: right; padding: 3px 0"
                    class="el-icon-more"></span>
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
        <!-- 构建模块/RH -->
        <el-row>
          <div class="cardBox">
            <div class="headerBox">
              <span style="font-size:20px; font-weight:bold">项目2</span>
              <span style="float: right; padding: 3px 0"
                    class="el-icon-more"></span>
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
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    handleNodeClick(data) {
      // console.log(data);
    },

    toMyresearch: function () {
      this.$router.replace({ path: "/myresearch", params: { researchstatus: 0 } });
    },

    toNewresearch: function () {
      console.log(1)
      this.$router.replace({ path: "/myresearch", params: { researchstatus: 0 } });
    }
  },
};
</script>
<style>
#newresearch {
  vertical-align: middle;
  text-align: center;
  font-size: 117px;
  color: dimgrey;
  width: 380px;
  height: 175px;
  cursor: pointer;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
}
.cardBox {
  width: 380px;
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