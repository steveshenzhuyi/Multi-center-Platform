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
               @click="tonewResearch()">
            <div>

              <el-row><i class="el-icon-plus"></i></el-row>
              <el-row>
                <div style="font-size: 15px;">新建研究</div>
              </el-row>
            </div>
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
                 @click="goByStatus(research.RESEARCHID,research.RESEARCHSTATECODE)"
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
        //   {
        //   "NAME": "研究1",
        //   "RESEARCHSTATECODE": "0                   ",
        //   "RESEARCHID": "1                  ",
        //   "CREATEDATE": "2019-1-15",
        //   "USERID": "Admin"
        // },
        // {
        //   "NAME": "研究2",
        //   "RESEARCHSTATECODE": "1                   ",
        //   "RESEARCHID": "2                  ",
        //   "CREATEDATE": "2019-1-15",
        //   "USERID": "Admin"
        // },
        // {
        //   "NAME": "研究3",
        //   "RESEARCHSTATECODE": "2                   ",
        //   "RESEARCHID": "3                  ",
        //   "CREATEDATE": "2019-1-15",
        //   "USERID": "Admin"
        // },
        // {
        //   "NAME": "研究4",
        //   "RESEARCHSTATECODE": "3                   ",
        //   "RESEARCHID": "4                  ",
        //   "CREATEDATE": "2019-1-15",
        //   "USERID": "Admin"
        // },
        // {
        //   "NAME": "研究5",
        //   "RESEARCHSTATECODE": "4                   ",
        //   "RESEARCHID": "5                  ",
        //   "CREATEDATE": "2019-1-15",
        //   "USERID": "Admin"
        // },
        // {
        //   "NAME": "研究6",
        //   "RESEARCHSTATECODE": "4                   ",
        //   "RESEARCHID": "6                 ",
        //   "CREATEDATE": "2019-1-15",
        //   "USERID": "Admin"
        // }
      ]
    }
  },
  filters: {
    researchstatusfilter: function (input) {
      switch (Number(input)) {
        case 0:
          return '队列生成中';
          break;
        case 1:
          return '变量生成中';
          break;
        case 2:
          return '模型选择中';
          break;
        case 3:
          return '结果分析中';
          break;
        case 4:
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
    goByStatus(RESEARCHID, RESEARCHSTATECODE) {
      var status = Number(RESEARCHSTATECODE)
      var id = Number(RESEARCHID)
      switch (status) {
        case 0:
          this.$router.push({
            name: '队列生成',
            params:
              {
                RESEARCHID: id
              }
          });
          break;
        case 1:
          this.$router.push({
            name: '变量生成',
            params:
              {
                RESEARCHID: id
              }
          });
          break;
        case 2:
          this.$router.push({
            name: '模型选择',
            params:
              {
                RESEARCHID: id
              }
          });
          break;
        case 3:
          this.$router.push({
            name: '结果分析',
            params:
              {
                RESEARCHID: id
              }
          });
          break;
        case 4:
          this.$router.push({
            name: '结果分析',
            params:
              {
                RESEARCHID: id
              }
          });
          break;
        default:

          this.$message('研究状态不正确！');

          // this.$router.push({
          //   name: 'myteam',
          //   params:
          //     {
          //       RESEARCHID: id
          //     }
          // });
          break;
      }
    },
    // 跳转至新建研究
    tonewResearch: function () {
      this.$router.push({
        path: 'newResearch',

      });
    }

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