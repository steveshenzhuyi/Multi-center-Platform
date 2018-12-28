<template>
  <div style="margin-left:10px;margin-right:10px">
    <el-tabs v-model="activeName">
      <el-tab-pane label="队列生成结果"
                   name="summarygenerateresult">
        <ul id="cohortlist">
          <li>
            <el-tooltip class="item"
                        effect="dark"
                        content="新建队列"
                        placement="right-start">

              <div id="newcohort"
                   class="cardBox"
                   shadow="hover"
                   @click="ifNewcohort">

                <span class="el-icon-plus"></span>
              </div>
            </el-tooltip>
          </li>

          <li v-for="cohort in generateresultlist">
            <div class="cardBox">
              <div class="headerBox">
                <span style="font-size:20px; font-weight:bold">{{cohort.cohortname}}</span>
                <el-dropdown style="float: right; padding: 3px 0"
                             trigger="click">
                  <span class="el-icon-more">
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item> <i class="el-icon-view"></i> 预览</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div class="div-relative">
                <!-- <img class="img"
                 style="position:absolute;"
                 :src="imgUrl"> -->
                <div class="bodyBox"
                     @click="toMycohort"
                     style="position:absolute;">
                  <div class="flex-container">
                    {{'计算时间 ' }}<span style="float: right; ">{{cohort.createtime}}</span>
                  </div>
                  <div class="flex-container">
                    {{'研究者 ' }}
                    <span style="float: right; ">{{cohort.researchadmin }}</span>
                  </div>
                  <!-- <div class="flex-container">
                {{'研究状态 ' }}
                <span style="float: right; ">{{research.researchstatus |researchstatusfilter }}</span>
              </div> -->
                </div>
              </div>
            </div>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="队列分析结果"
                   name="cohortanalysisresult">
        <ul id="cohortlist">
          <li>
            <el-tooltip class="item"
                        effect="dark"
                        content="新建队列"
                        placement="right-start">

              <div id="newcohort"
                   class="cardBox"
                   shadow="hover"
                   @click="ifNewcohort">

                <span class="el-icon-plus"></span>
              </div>
            </el-tooltip>
          </li>

          <li v-for="result in analysisresultlist">
            <div class="cardBox">
              <div class="headerBox">
                <span style="font-size:20px; font-weight:bold">{{result.NAME}}</span>
                <el-dropdown style="float: right; padding: 3px 0"
                             trigger="click">
                  <span class="el-icon-more">
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item> <i class="el-icon-view"></i> 预览</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div class="div-relative">
                <!-- <img class="img"
                 style="position:absolute;"
                 :src="imgUrl"> -->
                <div class="bodyBox"
                     @click="toMycohort"
                     style="position:absolute;">
                  <div class="flex-container">
                    {{'结果ID ' }}<span style="float: right; ">{{result.RESULTID}}</span>
                  </div>
                  <div class="flex-container">
                    {{'研究者 ' }}
                    <span style="float: right; ">{{name}}</span>
                  </div>
                  <!-- <div class="flex-container">
                {{'研究状态 ' }}
                <span style="float: right; ">{{research.researchstatus |researchstatusfilter }}</span>
              </div> -->
                </div>
              </div>
            </div>
          </li>
        </ul>
      </el-tab-pane>

    </el-tabs>

    <el-dialog title="新建队列"
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="handleClose">
      <el-form>
        <el-form-item label="队列名称："
                      :label-width="formLabelWidth">
          <el-input placeholder="请输入队列名称"
                    v-model="newcohortname"
                    clearable>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false;toNewcohort()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
// import wait from '../../assets/等待审核.png'
// import end from '../../assets/已结束.png'
import axios from 'axios';

export default {
  data() {
    return {
      NewVarVisible: false,
      NewConceptVisible: false,
      NewQueneVisible: false,
      NewMethodVisible: false,
      activeName: 'summarygenerateresult',
      // imgUrl: wait,
      dialogVisible: false,
      newcohortname: "",
      formLabelWidth: '90px',
      createtime: "",
      researchId: "",
      name: "",
      generateresultlist: [
        {
          cohortname: "队列生成结果1",
          researchadmin: "Admin",
          createtime: "2018-12-06",
          cohortstatus: 1,

        }, {
          cohortname: "队列生成结果2",
          researchadmin: "Admin",
          createtime: "2018-12-08",
          cohortstatus: 1

        }, {
          cohortname: "队列生成结果3",
          researchadmin: "Admin",
          createtime: "2018-12-08",
          cohortstatus: 2
        }
      ],
      analysisresultlist: [
        {
          cohortname: "队列分析结果1",
          researchadmin: "Admin",
          createtime: "2018-12-06",
          cohortstatus: 1,

        }, {
          cohortname: "队列分析结果2",
          researchadmin: "Admin",
          createtime: "2018-12-08",
          cohortstatus: 2
        }
      ]
    }
  },
  filters: {
    cohortstatusfilter: function (input) {
      switch (input) {
        case 1:
          return '等待审核';
          break;
        case 2:
          return '已结束';
          break;
        default:
          return '未知';
      }
    }
  },
  mounted() {
    this.getStatInfoList();
    this.getResearchResultList();
    this.name = this.GLOBAL.NAME
  },
  methods: {
    // 获取队列统计信息列表/RH
    getStatInfoList() {
      axios.get('/result/getStatInfoList', {
        params: {
          "token": this.GLOBAL.token,
          "researchTypeTag": "1",
          "researchId": this.$route.params.researchId,
        }
      })
        .then((response) => {
          console.log(response)
          this.generateresultlist = response.data.data

        })
        .catch(function (error) {
          console.log("error", error);
        });
    },

    // 获取研究对应分析结果列表/RH
    getResearchResultList() {
      axios.get('/result/getResearchResultList', {
        params: {
          "token": this.GLOBAL.token,
          "researchTypeTag": "1",
          "researchId": this.$route.params.researchId,
        }
      })
        .then((response) => {
          console.log(response)
          this.analysisresultlist = response.data.data

        })
        .catch(function (error) {
          console.log("error", error);
        });
    },

    // 关闭对话框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    // 跳转至对应研究页面
    toMycohort: function () {
      this.$router.replace({
        name: "我的研究",
        params:
          {
            "researchId": this.$route.params.researchId,
            cohortid: ""
          }
      });
    },
    // 新建队列对话框
    ifNewcohort: function () {
      this.dialogVisible = true;
    },

    // 跳转至新建队列
    toNewcohort: function () {
      this.createtime = new Date();
      this.$router.push({
        name: '我的研究',
        params:
          {
            "researchId": this.$route.params.researchId,
          }
      });
    },

  },
};
</script>
<style>
#cohortlist li {
  display: block;
  float: left;
  margin: 5px;
}

#newcohort {
  vertical-align: middle;
  text-align: center;
  font-size: 105px;
  color: dimgrey;
  height: 150px;
  cursor: pointer;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
}
.cardBox {
  height: 150px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-right: 10px;
  padding: 5px;
  padding-top: 15px;
  border-radius: 5px;
  width: 300px;
}

.headerBox {
  padding: 15px;
}
.el-icon-more {
  cursor: pointer;
}

.bodyBox {
  padding: 15px;
  cursor: pointer;
  font-size: 15px;
  width: 90%;
}
.img {
  height: 98px;
  width: 98px;
  padding-left: 101px;
}

.flex-container {
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom: 1px #000000 dotted;
}

.div-relative {
  position: relative;
}
</style>