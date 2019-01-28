<template>
  <div>
    <el-row style="margin-top:30px;margin-bottom:10px">
      <el-steps :active="4"
                align-center>
        <el-step title="1 研究开始"></el-step>
        <el-step title="2 队列生成"
                 style="cursor:pointer"
                 @click.native="gocreateCohort()"></el-step>
        <el-step title="3 变量生成"
                 style="cursor:pointer"
                 @click.native="gonewVariable()"></el-step>
        <el-step title="4 模型选择"
                 style="cursor:pointer"
                 @click.native="goselectModel()"></el-step>
        <el-step title="5 结果分析"></el-step>
      </el-steps>
    </el-row>

    <div style="margin-left:20px;margin-top:20px;margin-right:20px;">
      <el-row class="tac">
        <el-col :span="4">
          <el-menu default-active="1"
                   class="el-menu-vertical-demo"
                   @select="handleSelect">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">已选模型一(已完成)</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">已选模型二</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="20">
          <el-card class="box-card"
                   style="margin-left:20px;">
            {{selectedmodelname}}

          </el-card>
        </el-col>
      </el-row>
    </div>

  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      selectedmodelname: "模型一结果0 \n 模型一结果1",
    }
  },

  methods: {
    // 进度条跳转 RH
    gocreateCohort() {
      this.$router.push({
        path: 'createcohort',
        query:
          {
            RESEARCHID: this.$route.query.RESEARCHID
          }
      });
    },
    gonewVariable() {
      this.$router.push({
        path: 'newvariable',
        query:
          {
            RESEARCHID: this.$route.query.RESEARCHID
          }
      });
    },
    goselectModel() {
      this.$router.push({
        path: 'selectmodel',
        query:
          {
            RESEARCHID: this.$route.query.RESEARCHID
          }
      });
    },
    handleSelect(key, keyPath) {
      switch (key) {
        case "1":
          this.selectedmodelname = "模型一结果"
          break;
        case "2":
          console.log(1111)
          this.selectedmodelname = "正在分析中"
          break;
      }
    }
  }
}
</script>

<style>
</style>