<template>
  <div>
    <el-steps :active="2"
              style="padding-top:10px;padding-left:10px;padding-right:10px">
      <el-step title="1 研究开始"
               style="cursor:pointer"
               @click.native="gonewResearch()"></el-step>
      <el-step title="2 队列生成"
               style="cursor:pointer"
               @click.native="gocreateCohort()"></el-step>
      <el-step title="3 变量生成"
               style="cursor:pointer"
               @click.native="gonewVariable()"></el-step>
      <el-step title="4 模型选择"
               style="cursor:pointer"
               @click.native="goselectModel()"></el-step>
      <el-step title="5 结果分析"
               style="cursor:pointer"
               @click.native="goanalysisResult()"></el-step>
    </el-steps>
    变量生成
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {

    }
  },

  methods: {
    // 进度条跳转 RH
    gonewResearch() {
      this.$router.push({
        path: 'newResearch',
      });
    },
    gocreateCohort() {
      this.$router.push({
        path: 'createcohort',
      });
    },
    gonewVariable() {
      this.$router.push({
        path: 'newVariable',
      });
    },
    goselectModel() {
      this.$router.push({
        path: 'selectModel',
      });
    },
    goanalysisResult() {
      this.$router.push({
        path: 'analysisResult',
      });
    }
  }
}
</script>

<style>
</style>