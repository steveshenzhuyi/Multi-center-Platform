<template>
  <div>

    <!-- <el-row :gutter="20"
            type="flex"
            justify="center"
            style="margin-top:10px;margin-bottom:10px"> 
      <el-col :span="7"
              style="margin-top:30px;margin-bottom:10px">
        <el-row>
          <el-card class="box-card">
            <el-scrollbar style="height:100%">

              <el-tree :data="team"
                       :props="defaultProps"
                       @node-click="handleNodeClick"></el-tree>

            </el-scrollbar>
          </el-card>
        </el-row>
        <el-row type="flex"
                justify="space-between"
                style="margin-top:10px;margin-bottom:10px">
          <el-col :span="12">
            <el-button type="primary"
                       @click="goNewResearch()">新建团队</el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="primary"
                       @click="goJoinTeam()">加入团队</el-button>
          </el-col>
        </el-row>
      </el-col> -->

    <el-row style="margin-top:30px;margin-bottom:10px">
      <el-steps :active="CollaborState"
                align-center>
        <el-step title="1 研究开始"></el-step>
        <el-step title="2 团队建立"
                 style="cursor:pointer"
                 @click.native="goNewTeam()"></el-step>
        <el-step title="3 多中心运算"
                 style="cursor:pointer"
                 @click.native="goNewCoresearch()"></el-step>
        <el-step title="4 成果讨论"
                 style="cursor:pointer"
                 @click.native="goResult()"></el-step>
        <el-step title="5 资格审核"
                 style="cursor:pointer"
                 @click.native="goQualification()"></el-step>
      </el-steps>
    </el-row>
    <el-row type="flex"
            justify="center"
            style="margin-top:10px;margin-bottom:10px">
      <el-col :span="20">
        <el-card>

          <el-row style="margin-top:20px;margin-bottom:10px">
            <div>项目名称：{{detail.collaborInfo['name'.toUpperCase()]}}</div>
          </el-row>
          <el-row style="margin-top:10px;margin-bottom:10px">
            <el-col :span="8">
              <div>项目发起人：{{Initiator[0]['MEMBERNAME']}}</div>
            </el-col>
            <el-col :span="16">
              <div>发起人单位：{{Initiator[0].ORGANIZATIONNAME}}</div>
            </el-col>
          </el-row>
          <div v-if=" detail.collaborMemberList.length > 0">
            <el-row v-for="people in detail.collaborMemberList"
                    :key="people.USERID"
                    style="margin-top:10px;margin-bottom:10px">
              <el-col :span="8">
                <div>项目参与人：{{people.MEMBERNAME}}</div>
              </el-col>
              <el-col :span="16">
                <div>参与人单位：{{people.ORGANIZATIONNAME}}</div>
              </el-col>
            </el-row>
          </div>

          <el-row style="margin-top:10px;margin-bottom:10px">
            <el-col :span="24">
              <div>项目发起日期：{{detail.collaborInfo.CREATEDATE}}</div>
            </el-col>
          </el-row>
          <el-row style="margin-top:10px;margin-bottom:10px">
            <el-col :span="24">
              <div>研究目的：{{detail.collaborInfo.TARGET}}</div>
            </el-col>
          </el-row>
          <el-row style="margin-top:10px;margin-bottom:10px">
            <el-col :span="24">
              <div>成果分配方案：{{detail.collaborInfo.OUTCOMEDISTRIBUTION}}</div>
            </el-col>
          </el-row>
          <el-row style="margin-top:10px;margin-bottom:10px">
            <el-col :span="24">
              <div>项目进度：{{detail.collaborInfo.COLLABORATIONSTATENAME}}</div>
            </el-col>
          </el-row>
          <!-- <el-row style="margin-top:10px;margin-bottom:10px">
              <el-col :span="24">
                <div>研究有效期：{{detail[3][0].NAME}}</div>
              </el-col>
            </el-row> -->
          <el-row type="flex"
                  justify="center"
                  style="margin-top:30px;margin-bottom:10px">
            <el-col :span="12">
              <el-button type="primary"
                         @click="goNewTeam()">继续研究</el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="primary">退出团队</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <!-- </el-row> -->
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      list: [],
      collaborationId: null,
      detail: {
        collaborInfo: {
          COLLABORATIONSTATENAM: "",
          COLLABORATIONSTATECODE: "",
          NAME: "",
          CREATEDATE: "",
          TARGET: "",
          PROPOSAL: "",
          EXPECTEDOUTCOMES: "",
          OUTCOMEDISTRIBUTION: ""
        },
        collaborMemberList: [
          {
            ORGANIZATIONNAME: "",
            ORGANIZATIONCODE: "",
            MEMBERNAME: "",
            SORTNO: 1,
            USERID: "",
            INITIATORTAG: "",
            PARTICIPATIONSTATE: "",
            NAME: "",
            CREATEDATE: "",
            TARGET: "",
            PROPOSAL: "",
            EXPECTEDOUTCOMES: "",
            OUTCOMEDISTRIBUTION: ""
          }
        ]
      },
      participant: [],
      team: [{
        id: -1,
        label: '研究中',
        children: []
      }, {
        id: -2,
        label: '已完成',
        children: []
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  computed: {
    Initiator: function () {
      return this.detail.collaborMemberList.splice(0, 1)
      // console.log("datail", this.detail[1].length)
      // for (var i = 0; i < this.detail.collaborMemberList.length; i++) {
      //   /console.log(this.detail[1][i].INITIATORTAG)
      //   if (this.detail.collaborMemberList[i].INITIATORTAG == 1) {
      //     /console.log(this.detail[1][i].INITIATORTAG)
      //     return this.detail.collaborMemberList.splice(i, 1)
      //   }
      // }
      // console.log("mistake")
    },
    CollaborState: function () {
      //console.log("state", this.detail.collaborInfo.COLLABORATIONSTATECODE)
      if (this.detail.collaborInfo.COLLABORATIONSTATECODE == 0 || this.detail.collaborInfo.COLLABORATIONSTATECODE == 1) {
        return 1
      } else if (this.detail.collaborInfo.COLLABORATIONSTATECODE == 2 || this.detail.collaborInfo.COLLABORATIONSTATECODE == 3) {
        return 2
      } else if (this.detail.collaborInfo.COLLABORATIONSTATECODE == 4) {
        return 3
      } else if (this.detail.collaborInfo.COLLABORATIONSTATECODE == 5) {
        return 4
      } else if (this.detail.collaborInfo.COLLABORATIONSTATECODE == 6) {
        return 5
      }
    }
  },
  mounted() {
    //this.getMyCollaborList()
    this.getCollaborInfo(this.$route.query.collaborationId)
    console.log("token", this.GLOBAL.token)

  },
  methods: {
    getMyCollaborList() {
      axios.get('collaboration/getMyCollaborList', {
        params: {
          token: this.GLOBAL.token,
          collaborationStateCode: "0,1,2,3,4,5,6",
        }
      })
        .then((response) => {
          if (response.data.code == 0) {
            //console.log("success")
            this.list = response.data.data
            console.log("LISTDATA", this.list)
            for (var i = 0; i < this.list.length; i++) {
              if (this.list[i].COLLABORATIONSTATECODE == 6) {
                this.team[1].children.push({
                  label: this.list[i].NAME,
                  id: this.list[i].COLLABORATIONID
                })
                console.log(this.list[i].COLLABORATIONID)
              } else {
                this.team[0].children.push({
                  label: this.list[i].NAME,
                  id: this.list[i].COLLABORATIONID
                })
              }
            }
            this.getCollaborInfo(this.list[0].COLLABORATIONID)
            // axios.get('collaboration/CollaborInfo', {
            //   params: {
            //     token: this.GLOBAL.token,
            //     collaborationId: 12
            //   }
            // })
            //   .then((response) => {
            //     if (response.data.msg == "success!") {
            //       //console.log("success")


            //       this.detail = response.data.data
            //       console.log("detail", this.detail)
            //     }
            //   })
            //   .catch(function (error) {
            //     console.log("error", error);
            //   });
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    getCollaborInfo(COLLABORATIONID) {
      axios.get('collaboration/collaborInfo', {
        params: {
          token: this.GLOBAL.token,
          collaborationId: COLLABORATIONID
        }
      })
        .then((response) => {
          if (response.data.code == 0) {
            //console.log("success")
            this.collaborationId = COLLABORATIONID
            console.log("DETAILDATA", response.data.data)
            this.detail = response.data.data
            //this.detail[2][1].DOCTORNAME = response.data.data[2][1].DOCTORNAME
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    handleNodeClick(data) {
      console.log(data)
      if (data.id > 0) {
        this.getCollaborInfo(data.id)
        //this.detail[3][0].NAME = "agags"
        //console.log("length", this.detail[2].length)
      }

    },
    goNewResearch() {
      this.$router.push({ path: 'newresearch' })
    },
    goJoinTeam() {
      this.$router.push({ path: 'jointeam' })
    },
    goNewTeam() {
      console.log(this.researchDetail)
      this.$router.push({
        path: 'newteam',
        query:
          {
            collaborationId: Number(this.collaborationId)
          }
      });
    },
    goNewCoresearch() {
      this.$router.push({
        path: 'newcoresearch',
        query:
          {
            collaborationId: Number(this.collaborationId)
          }
      })
    },
    goResult() {
      this.$router.push({
        path: 'result',
        query:
          {
            collaborationId: Number(this.collaborationId)
          }
      })
    },
    goQualification() {
      this.$router.push({
        path: 'qualification',
        query:
          {
            collaborationId: Number(this.collaborationId)
          }
      })
    }

  }
};
</script>
<style>
.box-card {
  height: 500px;
  overflow: auto;
}
.el-tree {
  min-width: 100%;
  display: inline-block;
}
.box-card.el-scrollbar .el-scrollbar__wrap {
  overflow: auto;
  overflow-x: hidden;
}
.box-card.el-tree > .el-tree-node {
  display: inline-block;
}
</style>  