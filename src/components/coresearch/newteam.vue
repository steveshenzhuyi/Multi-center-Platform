<template>
  <div>
    <el-row style="margin-top:30px;margin-bottom:10px">
      <el-col :span="24">
        <el-steps :active="CollaborState"
                  align-center>
          <el-step title="1 研究开始"></el-step>
          <el-step title="2 团队建立"></el-step>
          <el-step title="3 多中心运算"></el-step>
          <el-step title="4 成果讨论"></el-step>
          <el-step title="5 资格审核"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-row :gutter="20"
            type="flex"
            justify="center">
      <el-col :span="5">
        <el-row>
          <el-card class="box-card">
            <div>邀请码</div>
          </el-card>
        </el-row>
        <el-row type="flex"
                justify="center"
                style="margin-top:30px;margin-bottom:10px">
          <el-col :span="16">
            <div>生产邀请码个数：</div>
          </el-col>
          <el-col :span="8">
            <div>
              <el-input size="small">
              </el-input>
            </div>
          </el-col>
        </el-row>

      </el-col>
      <el-col :span="15">
        <el-row>
          <el-card class="box-card">
            <div slot="header"
                 class="clearfix">
              <span>团队信息</span>
            </div>
            <el-row style="margin-top:20px;margin-bottom:10px">
              <el-col :span="23"
                      :offset="1">
                <div>项目名称：{{detail.collaborInfo.NAME}}</div>
              </el-col>
            </el-row>
            <el-row style="margin-top:10px;margin-bottom:10px">
              <el-col :span="23"
                      :offset="1">
                <div>项目发起日期：{{detail.collaborInfo.CREATEDATE}}</div>
              </el-col>
            </el-row>
            <el-row style="margin-top:10px;margin-bottom:10px">
              <el-col :span="7"
                      :offset="1">
                <div>项目发起人：{{Initiator[0].MEMBERNAME}}</div>
              </el-col>
              <el-col :span="15"
                      :offset="1">
                <div>发起人单位：{{Initiator[0].ORGANIZATIONNAME}}</div>
              </el-col>
            </el-row>
            <div v-if="detail.collaborMemberList.length > 0">
              <el-row v-for="people in detail.collaborMemberList"
                      :key="people.USERID"
                      style="margin-top:10px;margin-bottom:10px">
                <el-col :span="1">
                  <i class="el-icon-delete"
                     style="cursor:pointer"
                     @click="deleteParticipation(people.USERID)"></i>
                </el-col>
                <el-col :span="7">
                  <div>项目参与人：{{people.MEMBERNAME}}</div>
                </el-col>
                <el-col :span="7"
                        :offset="1">
                  <div>参与人单位：{{people.ORGANIZATIONNAME}}</div>
                </el-col>
                <el-col :span="8">
                  <div>参与人状态：{{getParticipationState(people.PARTICIPATIONSTATE)}}</div>
                </el-col>
              </el-row>
            </div>

          </el-card>
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex"
            justify="center"
            style="margin-top:10px;margin-bottom:10px">
      <el-col :span="5"
              :offset="7">
        <el-button type="primary">生成</el-button>
      </el-col>
      <el-col :span="12"
              :offset="7">
        <el-button type="primary"
                   @click="goResult()">构建团队</el-button>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
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
    }
  },
  computed: {
    // ParticipationState: function () {
    //   if (this.people.PARTICIPATIONSTATE == 0) {
    //     return "待响应"
    //   } else if (this.people.PARTICIPATIONSTATE == 1) {
    //     return "已参加"
    //   } else if (this.people.PARTICIPATIONSTATE == 2) {
    //     return "已拒绝"
    //   }
    // },
    Initiator: function () {
      return this.detail.collaborMemberList.splice(0, 1)
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
    console.log("collaborationId", this.$route.query.collaborationId)
    this.getCollaborInfo(this.$route.query.collaborationId)

  },
  methods: {

    getCollaborInfo(COLLABORATIONID) {
      axios.get('collaboration/collaborInfo', {
        params: {
          token: this.GLOBAL.token,
          collaborationId: COLLABORATIONID
        }
      })
        .then((response) => {
          if (response.data.code == 0) {
            console.log("data", response.data.data)
            this.detail = response.data.data

          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    getParticipationState(PARTICIPATIONSTATE) {
      if (PARTICIPATIONSTATE == 0) {
        return "待响应"
      } else if (PARTICIPATIONSTATE == 1) {
        return "已参加"
      } else if (PARTICIPATIONSTATE == 2) {
        return "已拒绝"
      }
    },
    deleteParticipation(USERID) {
      this.$confirm('删除该成员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('/collaboration/deleteParticipation', {
          "token": this.GLOBAL.token,
          "userId": USERID,
          "collaborationId": this.$route.query.collaborationId

        })
          .then((response) => {
            if (response.data.code == 0) {
              this.$message.success("删除成功！");
              console.log("deletesuccess")
              this.getCollaborInfo(this.$route.query.collaborationId)
            } else {
              this.$message.error("删除失败！");
            }
          })
          .catch(function (error) {
            console.log("error", error);
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    goResult() {
      // this.$router.push({
      //   path: 'result',
      //   query:
      //     {
      //       collaborationId: this.$route.query.collaborationId
      //     }
      // });
      axios.post('/collaboration/createCollaboration', {
        "token": this.GLOBAL.token,
        "collaborationId": this.$route.query.collaborationId,
        "collaborationStateCode": "1"
      })
        .then((response) => {

          if (response.data.code == 0) {
            console.log("newteamsuccess")
            this.$router.push({
              path: 'result',
              query:
                {
                  collaborationId: this.$route.query.collaborationId
                }
            });
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });

    }
  }
};
</script>
<style>
.box-card {
  height: 400px;
}
</style>