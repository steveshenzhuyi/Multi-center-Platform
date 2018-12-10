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
          <el-col :span="14">
            <el-button type="info"
                       @click="goNewResearch()">新建团队</el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="info"
                       @click="goJoinTeam()">加入团队</el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row style="margin-top:10px;margin-bottom:10px">
          <el-steps :active="2"
                    align-center>
            <el-step title="1 研究开始"
                     @click.native="to1()"></el-step>
            <el-step title="2 团队建立"
                     @click.native="to2()"></el-step>
            <el-step title="3 多中心运算"></el-step>
            <el-step title="4 成果讨论"></el-step>
            <el-step title="5 资格审核"></el-step>
          </el-steps>
        </el-row>
        <el-row>
          <el-card>

            <el-row style="margin-top:20px;margin-bottom:10px">
              <div>项目名称：{{this.detail[0][0].NAME}}</div>
            </el-row>
            <el-row style="margin-top:10px;margin-bottom:10px">
              <el-col span="8">
                <div>项目发起人：{{this.detail[2][1].DOCTORNAME}}</div>
              </el-col>
              <el-col span="16">
                <div>发起人单位：{{this.detail[2][1].ORGANIZATIONNAME}}</div>
              </el-col>
            </el-row>
            <el-row style="margin-top:10px;margin-bottom:10px">
              <el-col span="8">
                <div>项目参与人：{{this.detail[2][0].DOCTORNAME}}</div>
              </el-col>
              <el-col span="16">
                <div>参与人单位：{{this.detail[2][0].ORGANIZATIONNAME}}</div>
              </el-col>
            </el-row>
            <el-row style="margin-top:10px;margin-bottom:10px">
              <el-col span="24">
                <div>项目发起日期：{{this.detail[0][0].CREATEDATE}}</div>
              </el-col>
            </el-row>
            <el-row style="margin-top:10px;margin-bottom:10px">
              <el-col span="24">
                <div>项目简介：{{this.detail[0][0].TARGET}}</div>
              </el-col>
            </el-row>
            <el-row style="margin-top:10px;margin-bottom:10px">
              <el-col span="24">
                <div>成果分配方案：{{this.detail[0][0].OUTCOMEDISTRIBUTION}}</div>
              </el-col>
            </el-row>
            <el-row style="margin-top:10px;margin-bottom:10px">
              <el-col span="24">
                <div>项目进度：{{this.detail[3][0].NAME}}</div>
              </el-col>
            </el-row>
            <!-- <el-row style="margin-top:10px;margin-bottom:10px">
              <el-col span="24">
                <div>研究有效期：{{this.detail[3][0].NAME}}</div>
              </el-col>
            </el-row> -->
            <el-row type="flex"
                    justify="center"
                    style="margin-top:30px;margin-bottom:10px">
              <el-col span="12">
                <el-button type="info">继续研究</el-button>
              </el-col>
              <el-col span="12">
                <el-button type="info">退出团队</el-button>
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
      team: [{
        id: 0,
        label: '研究中',
        children: []
      }, {
        id: 1,
        label: '已完成',
        children: []
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  mounted() {
    this.getMyCollaborList()

  },
  methods: {
    getMyCollaborList() {
      axios.get('collaboration/getMyCollaborList?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxODg2ODE4ICAgICAgICAgICAgICIsImV4cCI6MTU3NTYzODAyNTIyMSwiaWF0IjoxNTQ0MTAyMDI1fQ.5C92SLa_yqyOKKz9yTjDZtApz10FSlcHntfn8zPWGwc&collaborationStateCode=0,1,2,3,4,5,6', )
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
              } else {
                this.team[1].children.push({
                  label: this.list[i].NAME,
                  id: this.list[i].COLLABORATIONID
                })
              }
            }
            axios.get('collaboration/CollaborInfo?collaborationId=' + 12 + '&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxODg2ODE4ICAgICAgICAgICAgICIsImV4cCI6MTU3NTYzODAyNTIyMSwiaWF0IjoxNTQ0MTAyMDI1fQ.5C92SLa_yqyOKKz9yTjDZtApz10FSlcHntfn8zPWGwc', )
              .then((response) => {
                if (response.data.msg == "success!") {
                  //console.log("success")

                  console.log("data", response.data.data)
                  this.detail = response.data.data
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
      axios.get('collaboration/CollaborInfo?collaborationId=' + COLLABORATIONID + '&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxODg2ODE4ICAgICAgICAgICAgICIsImV4cCI6MTU3NTYzODAyNTIyMSwiaWF0IjoxNTQ0MTAyMDI1fQ.5C92SLa_yqyOKKz9yTjDZtApz10FSlcHntfn8zPWGwc', )
        .then((response) => {
          if (response.data.msg == "success!") {
            //console.log("success")

            console.log("data", response.data.data)
            this.detail = response.data.data
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    handleNodeClick(data) {
      this.getCollaborInfo(data.id)
    },
    goNewResearch() {
      this.$router.push({ path: 'newresearch' })
    },
    goJoinTeam() {
      this.$router.push({ path: 'jointeam' })
    },
    to1() {
      this.$router.push({ path: 'result' })
    },
    to2() {
      this.$router.push({ path: 'qualification' })
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