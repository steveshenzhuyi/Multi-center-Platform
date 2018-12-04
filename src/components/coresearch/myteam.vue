<template>
  <div>
    <el-row style="margin-top:30px;margin-bottom:10px">
      <el-col :span="24">
        <el-steps :active="2"
                  align-center>
          <el-step title="1 研究开始"
                   @click.native="to1()"></el-step>
          <el-step title="2 团队建立"
                   @click.native="to2()"></el-step>
          <el-step title="3 资格审核"></el-step>
          <el-step title="4 多功能运算"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-row :gutter="20"
            type="flex"
            justify="center">
      <el-col :span="5">
        <el-row>
          <el-card class="box-card">
            <el-tree :data="team"
                     :props="defaultProps"
                     @node-click="handleNodeClick"></el-tree>
          </el-card>
        </el-row>
        <el-row type="flex"
                justify="space-between"
                style="margin-top:10px;margin-bottom:10px">
          <el-col :span="12">
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
        <el-row>
          <el-card class="box-card"
                   style="height:100%">

          </el-card>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      team: [{
        label: '新建团队等待构建',
        children: [{
          label: '心脑血管协同团队',
        },
        {
          label: '糖尿病团队',
        }]
      }, {
        label: '团队待审核',
        children: [{
          label: '骨折团队',
        }]
      }, {
        label: '正在研究',
        children: [{
          label: '临终关怀团队',
        }]
      }, {
        label: '已完成研究'
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
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
</style>