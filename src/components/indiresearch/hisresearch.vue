<template>
  <div style="margin-left:10px;margin-right:10px">
    <ul id="researchlist">
      <li>
        <el-tooltip class="item"
                    effect="dark"
                    content="新建研究"
                    placement="right-start">

          <div id="newresearch"
               class="cardBox"
               shadow="hover"
               @click="dialogVisible=true">

            <span class="el-icon-plus"></span>
          </div>
        </el-tooltip>
      </li>

      <li v-for="research in researchlist">
        <div class="cardBox">
          <div class="headerBox">
            <span style="font-size:20px; font-weight:bold">{{research.NAME}}</span>
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
                 @click="toMyresearch(research.RESEARCHID)"
                 style="position:absolute;">
              <div class="flex-container">
                {{'项目创建时间 ' }}<span style="float: right; ">{{research.CREATEDATE}}</span>
              </div>
              <div class="flex-container">
                {{'研究者 ' }}
                <span style="float: right; ">{{research.USERID }}</span>
              </div>
              <div class="flex-container">
                {{'研究状态 ' }}
                <span style="float: right; ">{{research.RESEARCHSTATECODE |researchstatusfilter }}</span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <el-dialog title="新建研究"
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="handleClose">
      <el-form>
        <el-form-item label="研究名称："
                      :label-width="formLabelWidth">
          <el-input placeholder="请输入研究名称"
                    v-model="newresearchname"
                    clearable>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false;toNewresearch()">确 定</el-button>
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
      // imgUrl: wait,
      dialogVisible: false,
      newresearchname: "",
      formLabelWidth: '90px',
      createtime: "",
      researchlist: [
      ]
    }
  },
  filters: {
    researchstatusfilter: function (input) {
      switch (input) {
        case 0:
          return '个人研究构建完成';
          break;
        case 1:
          return '研究成果构建中';
          break;
        case 2:
          return '资格审核中';
          break;
        case 3:
          return '研究完成';
          break;
        default:
          return '未知';
      }
    }
  },
  mounted() {
    this.getpersonalResearch();

  },
  methods: {

    getpersonalResearch() {
      axios.get('/personalResearch/getMyResearchList', {
        params: {
          "token": this.GLOBAL.token
        }
      })
        .then((response) => {
          // console.log(response)
          this.researchlist = response.data.data

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
    toMyresearch: function (researchid) {
      console.log(researchid)
      this.$router.push({
        name: "结果列表",
        params:
          {
            "researchId": researchid
          }
      });
    },
    // 跳转至新建研究
    toNewresearch: function () {
      this.createtime = new Date();
      axios.post('/personalResearch/createResearch', ({
        "token": this.GLOBAL.token,
        "name": this.newresearchname,
        "target": "aaa",
        "proposal": "aaa",
        "expectedOutcomes": "aaa",
        "dataRange": "aaa",
        "projectSupport": "aaa",
        "redundancy": "qwerty"
      }))
        .then(response => {
          if (response.data.code == "0") {
            this.$message.success("新建成功！")
            setTimeout(function () {
              location.reload()
            }, 1000);
          }
        })


    },

  },
};
</script>
<style>
#researchlist li {
  display: block;
  float: left;
  margin: 5px;
}

#newresearch {
  vertical-align: middle;
  text-align: center;
  font-size: 105px;
  color: dimgrey;
  height: 170px;
  cursor: pointer;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
}
.cardBox {
  height: 170px;
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