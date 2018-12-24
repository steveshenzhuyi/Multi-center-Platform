<template>
  <div>

    <el-row :gutter="20"
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
      </el-col>
      <el-col :span="12">
        <el-row style="margin-top:10px;margin-bottom:10px">
          <el-steps :active="2"
                    align-center>
            <el-step title="1 研究开始"
                     style="cursor:pointer"
                     @click.native="to1()"></el-step>
            <el-step title="2 团队建立"
                     style="cursor:pointer"
                     @click.native="to2()"></el-step>
            <el-step title="3 多中心运算"
                     style="cursor:pointer"
                     @click.native="to3()"></el-step>
            <el-step title="4 成果讨论"></el-step>
            <el-step title="5 资格审核"></el-step>
          </el-steps>
        </el-row>
        <el-row>
          <el-card>

            <el-row style="margin-top:20px;margin-bottom:10px">
              <div>项目名称：{{detail[0][0].NAME}}</div>
            </el-row>
            <el-row style="margin-top:10px;margin-bottom:10px">
              <el-col :span="8">
                <div>项目发起人：{{Initiator[0].DOCTORNAME}}</div>
              </el-col>
              <el-col :span="16">
                <div>发起人单位：{{Initiator[0].ORGANIZATIONNAME}}</div>
              </el-col>
            </el-row>
            <div v-if=" detail[1].length > 0">
              <el-row v-for="people in detail[1]"
                      :key="people.USERID"
                      style="margin-top:10px;margin-bottom:10px">
                <el-col :span="8">
                  <div>项目参与人：{{people.DOCTORNAME}}</div>
                </el-col>
                <el-col :span="16">
                  <div>参与人单位：{{people.ORGANIZATIONNAME}}</div>
                </el-col>
              </el-row>
            </div>

            <el-row style="margin-top:10px;margin-bottom:10px">
              <el-col :span="24">
                <div>项目发起日期：{{detail[0][0].CREATEDATE}}</div>
              </el-col>
            </el-row>
            <el-row style="margin-top:10px;margin-bottom:10px">
              <el-col :span="24">
                <div>项目简介：{{detail[0][0].TARGET}}</div>
              </el-col>
            </el-row>
            <el-row style="margin-top:10px;margin-bottom:10px">
              <el-col :span="24">
                <div>成果分配方案：{{detail[0][0].OUTCOMEDISTRIBUTION}}</div>
              </el-col>
            </el-row>
            <el-row style="margin-top:10px;margin-bottom:10px">
              <el-col :span="24">
                <div>项目进度：{{detail[0][0].COLLABORATIONSTATENAME}}</div>
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
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      list: [],
      detail: [],
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
    this.getMyCollaborList()
    console.log("token", this.GLOBAL.token)

  },
  methods: {
    getMyCollaborList() {
      axios.get('collaboration/getMyCollaborList', {
        params: {
          token: this.GLOBAL.token,
          collaborationStateCode: "0,1,2,3,4,5,6"
        }
      })
        .then((response) => {
          if (response.data.msg == "success!") {
            //console.log("success")
            this.list = response.data.data
            //console.log("data", this.data)
            for (var i = 0; i < this.list.length; i++) {
              if (this.list[i].COLLABORATIONSTATECODE != "6                   ") {
                this.team[0].children.push({
                  label: this.list[i].NAME,
                  id: this.list[i].COLLABORATIONID
                })
                console.log(this.list[i].COLLABORATIONID)
              } else {
                this.team[1].children.push({
                  label: this.list[i].NAME,
                  id: this.list[i].COLLABORATIONID
                })
              }
            }
            axios.get('collaboration/CollaborInfo', {
              params: {
                token: this.GLOBAL.token,
                collaborationId: 12
              }
            })
              .then((response) => {
                if (response.data.msg == "success!") {
                  //console.log("success")


                  this.detail = response.data.data
                  console.log("detail", this.detail)
                }
              })
              .catch(function (error) {
                console.log("error", error);
              });
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
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
            //this.detail[2][1].DOCTORNAME = response.data.data[2][1].DOCTORNAME
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    handleNodeClick(data) {
      if (data.id > 0) {
        this.getCollaborInfo(data.id)
        //this.detail[3][0].NAME = "agags"
        console.log("length", this.detail[2].length)
      }

    },
    goNewResearch() {
      this.$router.push({ path: 'newresearch' })
    },
    goNewTeam() {
      console.log(this.researchDetail)
      this.$router.push({
        path: 'newteam',
        query:
          {
            collaborationId: 47
          }
      });
    },

    goJoinTeam() {
      this.$router.push({ path: 'jointeam' })
    },
    to1() {
      this.$router.push({ path: 'result' })
    },
    to2() {
      this.$router.push({ path: 'qualification' })
    },
    to3() {
      this.$router.push({ path: 'newcoresearch' })
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