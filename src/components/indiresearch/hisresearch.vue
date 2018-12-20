<template>
  <div style="margin-left:10px;margin-right:10px">
    <ul id="researchlist">
      <li>
        <el-tooltip class="item"
                    effect="dark"
                    content="Right Top 新建研究"
                    placement="right-start">

          <div id="newresearch"
               class="cardBox"
               shadow="hover"
               @click="toNewresearch">

            <span class="el-icon-plus"></span>
          </div>
        </el-tooltip>
      </li>

      <li v-for="research in researchlist">
        <div class="cardBox">
          <div class="headerBox">
            <span style="font-size:20px; font-weight:bold">{{research.researchname}}</span>
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
            <img class="img"
                 style="position:absolute;"
                 :src="imgUrl">
            <div class="bodyBox"
                 @click="toMyresearch"
                 style="position:absolute;">
              <div class="flex-container">
                {{'项目创建时间 ' }}<span style="float: right; ">{{research.researchname}}</span>
              </div>
              <div class="flex-container">
                {{'研究者 ' }}
                <span style="float: right; ">{{research.researchadmin }}</span>
              </div>
              <div class="flex-container">
                {{'研究状态 ' }}
                <span style="float: right; ">{{research.researchstatus |researchstatusfilter }}</span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
let id = 1000;
import wait from '../../assets/等待审核.png'
import end from '../../assets/已结束.png'


export default {
  data() {
    return {
      NewVarVisible: false,
      NewConceptVisible: false,
      NewQueneVisible: false,
      NewMethodVisible: false,
      imgUrl: wait,
      researchlist: [
        {
          researchname: "项目1",
          researchadmin: "Admin",
          createtime: "2018-12-06",
          researchstatus: 1,

        }, {          researchname: "项目2",
          researchadmin: "Admin",
          createtime: "2018-12-08",
          researchstatus: 1

        }, {
          researchname: "项目3",
          researchadmin: "Admin",
          createtime: "2018-12-08",
          researchstatus: 2
        }
      ]
    }
  },
  mounted() {
    this.setimgurl();
  },
  filters: {
    researchstatusfilter: function (input) {
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
    setimgurl: function () {
      console.log(this)
      switch (this.researchstatus) {
        case 1:
          imgUrl = wait;
          break;
        case 2:
          imgUrl = end;
          break;
        default:
          return '未知';
      }
    },
    toMyresearch: function () {
      this.$router.replace({
        path: "queuelist",
        query:
          {
            researchid: ""
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
#researchlist {
}
#researchlist li {
  display: block;
  float: left;
  margin: 5px;
}

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