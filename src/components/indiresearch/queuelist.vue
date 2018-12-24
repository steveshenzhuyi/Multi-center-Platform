<template>
  <div style="margin-left:10px;margin-right:10px">
    <el-tabs v-model="activeName">
      <el-tab-pane label="队列生成结果"
                   name="summarygenerateresult">
        <ul id="queuelist">
          <li>
            <el-tooltip class="item"
                        effect="dark"
                        content="新建队列"
                        placement="right-start">

              <div id="newqueue"
                   class="cardBox"
                   shadow="hover"
                   @click="ifNewqueue">

                <span class="el-icon-plus"></span>
              </div>
            </el-tooltip>
          </li>

          <li v-for="queue in generateresultlist">
            <div class="cardBox">
              <div class="headerBox">
                <span style="font-size:20px; font-weight:bold">{{queue.queuename}}</span>
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
                     @click="toMyqueue"
                     style="position:absolute;">
                  <div class="flex-container">
                    {{'计算时间 ' }}<span style="float: right; ">{{queue.createtime}}</span>
                  </div>
                  <div class="flex-container">
                    {{'研究者 ' }}
                    <span style="float: right; ">{{queue.researchadmin }}</span>
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
                   name="queueanalysisresult">
        <ul id="queuelist">
          <li>
            <el-tooltip class="item"
                        effect="dark"
                        content="新建队列"
                        placement="right-start">

              <div id="newqueue"
                   class="cardBox"
                   shadow="hover"
                   @click="ifNewqueue">

                <span class="el-icon-plus"></span>
              </div>
            </el-tooltip>
          </li>

          <li v-for="queue in analysisresultlist">
            <div class="cardBox">
              <div class="headerBox">
                <span style="font-size:20px; font-weight:bold">{{queue.queuename}}</span>
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
                     @click="toMyqueue"
                     style="position:absolute;">
                  <div class="flex-container">
                    {{'计算时间 ' }}<span style="float: right; ">{{queue.createtime}}</span>
                  </div>
                  <div class="flex-container">
                    {{'研究者 ' }}
                    <span style="float: right; ">{{queue.researchadmin }}</span>
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
                    v-model="newqueuename"
                    clearable>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false;toNewqueue()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
// import wait from '../../assets/等待审核.png'
// import end from '../../assets/已结束.png'

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
      newqueuename: "",
      formLabelWidth: '90px',
      createtime: "",
      generateresultlist: [
        {
          queuename: "队列生成结果1",
          researchadmin: "Admin",
          createtime: "2018-12-06",
          queuestatus: 1,

        }, {
          queuename: "队列生成结果2",
          researchadmin: "Admin",
          createtime: "2018-12-08",
          queuestatus: 1

        }, {
          queuename: "队列生成结果3",
          researchadmin: "Admin",
          createtime: "2018-12-08",
          queuestatus: 2
        }
      ],
      analysisresultlist: [
        {
          queuename: "队列分析结果1",
          researchadmin: "Admin",
          createtime: "2018-12-06",
          queuestatus: 1,

        }, {
          queuename: "队列分析结果2",
          researchadmin: "Admin",
          createtime: "2018-12-08",
          queuestatus: 2
        }
      ]
    }
  },
  filters: {
    queuestatusfilter: function (input) {
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
  methods: {
    // 关闭对话框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    // 跳转至对应研究页面
    toMyqueue: function () {
      this.$router.replace({
        path: "myresearch",
        query:
          {
            queueid: ""
          }
      });
    },
    // 新建研究对话框
    ifNewqueue: function () {
      this.dialogVisible = true;
    },

    // 跳转至新建队列
    toNewqueue: function () {
      this.createtime = new Date();
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
#queuelist li {
  display: block;
  float: left;
  margin: 5px;
}

#newqueue {
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