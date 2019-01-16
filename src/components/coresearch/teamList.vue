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
               @click="goNewResearch()">

            <span class="el-icon-plus"></span>
          </div>
        </el-tooltip>
      </li>

      <li>
        <el-tooltip class="item"
                    effect="dark"
                    content="加入团队"
                    placement="right-start">

          <div id="newresearch"
               class="cardBox"
               shadow="hover"
               @click="goJoinTeam()">

            <span class="el-icon-circle-plus"></span>
          </div>
        </el-tooltip>
      </li>

      <li v-for="collabor in list">
        <div class="cardBox">
          <div class="headerBox">
            <span style="font-size:20px; font-weight:bold">{{collabor.NAME}}</span>
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
                 @click="goByStatus(collabor.COLLABORATIONID,collabor.COLLABORATIONSTATECODE)"
                 style="position:absolute;">
              <div class="flex-container">
                {{'项目创建时间 ' }}<span style="float: right; ">{{collabor.CREATEDATE}}</span>
              </div>
              <div class="flex-container">
                {{'发起人 ' }}
                <span style="float: right; ">{{collabor.INITIATOR }}</span>
              </div>
              <div class="flex-container">
                {{'研究状态 ' }}
                <span style="float: right; ">{{collabor.COLLABORATIONSTATECODE |teamStatusFilter }}</span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      list: [
        {
          "NAME": "collaborParticiTest2",
          "INITIATOR": "1111                  ",
          "COLLABORATIONSTATECODE": "0                   ",
          "COLLABORATIONID": "52                  ",
          "CREATEDATE": "2019-1-15"
        },
        {
          "NAME": "collaborThirdPartyTag",
          "INITIATOR": "2222                  ",
          "COLLABORATIONSTATECODE": "1                   ",
          "COLLABORATIONID": "54                  ",
          "CREATEDATE": "2019-1-15"
        },
        {
          "NAME": "collaborThirdPartyTag",
          "INITIATOR": "66                  ",
          "COLLABORATIONSTATECODE": "2                   ",
          "COLLABORATIONID": "55                  ",
          "CREATEDATE": "2019-1-15"
        },
        {
          "NAME": "collaborThirdPartyTag",
          "INITIATOR": "66                  ",
          "COLLABORATIONSTATECODE": "3                   ",
          "COLLABORATIONID": "53                  ",
          "CREATEDATE": "2019-1-15"
        },
        {
          "NAME": "er",
          "INITIATOR": "66                  ",
          "COLLABORATIONSTATECODE": "4                   ",
          "COLLABORATIONID": "49                  ",
          "CREATEDATE": "2019-1-15"
        },
        {
          "NAME": "er",
          "INITIATOR": "66                  ",
          "COLLABORATIONSTATECODE": "5                   ",
          "COLLABORATIONID": "50                 ",
          "CREATEDATE": "2019-1-15"
        }
      ],

    }
  },
  mounted() {
    //this.getMyCollaborList()
  },
  filters: {
    teamStatusFilter: function (input) {
      switch (Number(input)) {
        case 0:
          return '团队构建中';
          break;
        case 1:
          return '多中心运算';
          break;
        case 2:
          return '多中心运算';
          break;
        case 3:
          return '成果讨论';
          break;
        case 4:
          return '资格审核';
          break;
        default:
          return '已完成';
      }
    }
  },
  methods: {
    goNewResearch() {
      this.$router.push({ path: 'newresearch' })
    },
    goJoinTeam() {
      this.$router.push({ path: 'jointeam' })
    },
    goByStatus(COLLABORATIONID, COLLABORATIONSTATECODE) {
      var status = Number(COLLABORATIONSTATECODE)
      var id = Number(COLLABORATIONID)
      switch (status) {
        case 0:
          this.$router.push({
            path: 'newteam',
            query:
              {
                collaborationId: id
              }
          });
          break;
        case 1:
          this.$router.push({
            path: 'newcoresearch',
            query:
              {
                collaborationId: id
              }
          });
          break;
        case 2:
          this.$router.push({
            path: 'newcoresearch',
            query:
              {
                collaborationId: id
              }
          });
          break;
        case 3:
          this.$router.push({
            path: 'result',
            query:
              {
                collaborationId: id
              }
          });
          break;
        case 4:
          this.$router.push({
            path: 'qualification',
            query:
              {
                collaborationId: id
              }
          });
          break;
        default:
          this.$router.push({
            path: 'myteam',
            query:
              {
                collaborationId: id
              }
          });
          break;
      }

    }
  }
}
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