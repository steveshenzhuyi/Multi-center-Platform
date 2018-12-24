<template>
  <div>
    <el-row style="margin-top:30px;margin-bottom:10px">
      <el-col :span="24">
        <el-steps :active="1"
                  align-center>
          <el-step title="1 研究开始"
                   @click.native="to1()"></el-step>
          <el-step title="2 团队建立"
                   @click.native="to2()"></el-step>
          <el-step title="3 多中心运算"></el-step>
          <el-step title="4 成果讨论"></el-step>
          <el-step title="5 资格审核"></el-step>
        </el-steps>>
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
      <el-col :span="12">
        <el-row>
          <el-card class="box-card">
            <div slot="header"
                 class="clearfix">
              <span>团队信息</span>
            </div>
            <el-row style="margin-top:20px;margin-bottom:10px">
              <el-col :span="23"
                      :offset="1">
                <div>项目名称：{{detail[0][0].NAME}}</div>
              </el-col>
            </el-row>
            <el-row style="margin-top:10px;margin-bottom:10px">
              <el-col :span="23"
                      :offset="1">
                <div>项目发起日期：{{detail[0][0].CREATEDATE}}</div>
              </el-col>
            </el-row>
            <el-row style="margin-top:10px;margin-bottom:10px">
              <el-col :span="7"
                      :offset="1">
                <div>项目发起人：{{Initiator[0].DOCTORNAME}}</div>
              </el-col>
              <el-col :span="16">
                <div>发起人单位：{{Initiator[0].ORGANIZATIONNAME}}</div>
              </el-col>
            </el-row>
            <div v-if="detail[1].length > 0">
              <el-row v-for="people in detail[1]"
                      :key="people.USERID"
                      style="margin-top:10px;margin-bottom:10px">
                <el-col :span="1">
                  <i class="el-icon-delete"
                     @click="deleteParticipation(people.USERID)"></i>
                </el-col>
                <el-col :span="7">
                  <div>项目参与人：{{people.DOCTORNAME}}</div>
                </el-col>
                <el-col :span="8">
                  <div>参与人单位：{{people.ORGANIZATIONNAME}}</div>
                </el-col>
                <el-col :span="8">
                  <div>参与人状态：</div>
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
      detail: []
      //Initiator: null
    }
  },
  computed: {
    Initiator: function () {
      //console.log("datail", this.detail[1].length)
      for (var i = 0; i < this.detail[1].length; i++) {
        //console.log(this.detail[1][i].INITIATORTAG)
        if (this.detail[1][i].INITIATORTAG == "1   ") {
          console.log(this.detail[1][i].INITIATORTAG)
          return this.detail[1].splice(i, 1)
        }
      }
      console.log("mistake")


    }
  },
  mounted() {
    console.log("collaborationId", this.$route.query.collaborationId)
    this.getCollaborInfo(this.$route.query.collaborationId)

  },
  methods: {

    getCollaborInfo(COLLABORATIONID) {
      axios.get('collaboration/CollaborInfo', {
        params: {
          token: this.GLOBAL.token,
          collaborationId: COLLABORATIONID
        }
      })
        .then((response) => {
          if (response.data.msg == "success!") {
            //console.log("success")

            console.log("data", response.data.data)
            this.detail = response.data.data
            //this.detail[3][0].NAME = response.data.data[3][0].NAME

          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
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
            if (response.data.msg == "成功删除成员") {
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
      this.$router.push({
        path: 'result',
        query:
          {
            collaborationId: this.$route.query.collaborationId
          }
      });
      axios.post('/collaboration/createCollaboration', {
        "token": this.GLOBAL.token,
        "collaborationId": this.$route.query.collaborationId,
        "collaborationStateCode": "1"
      })
        .then((response) => {

          if (response.data.msg == "成功修改协同状态数据!") {
            console.log("newteamsuccess")
            // this.$router.push({
            //   path: 'result',
            //   params:
            //     {
            //       collaborationId: this.$route.query.collaborationId
            //     }
            // });
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