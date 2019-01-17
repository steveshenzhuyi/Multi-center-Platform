<template>
  <div>
    <el-row type="flex"
            align="middle"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="2"
              :offset="6">
        <div class="title">研究简介</div>
      </el-col>
    </el-row>
    <el-row type="flex"
            align="middle"
            justify="center"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="2">
        <div>研究方案</div>
      </el-col>
      <el-col :span="1">
        <i class="iconfont icon-shuzi1"></i>
      </el-col>
      <el-col :span="9">
        <div>
          <div>
            队列条件：满足女性、入院60天以上
            入组人数：单位一入组308人，单位二入组736人
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :offset="8"
              :span="1">
        <i class="iconfont icon-shuzi2"></i>
      </el-col>
      <el-col :span="9">
        <div>
          所选变量：年龄、性别、具体病种
        </div>
      </el-col>
    </el-row>
    <el-row type="flex"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :offset="8"
              :span="1">
        <i class="iconfont icon-shuzi3"></i>
      </el-col>
      <el-col :span="9">

        <div>
          所选模型：SVM，惩罚系数C=1.0
        </div>
      </el-col>
    </el-row>
    </el-collapse>
    <el-row type="flex"
            align="middle"
            style="margin-top:50px;margin-bottom:10px">
      <el-col :span="2"
              :offset="8">
        <el-button type="primary"
                   @click="corhortanalysis"
                   plain>开始分析</el-button>
      </el-col>
    </el-row>
    <el-row type="flex"
            align="middle"
            style="margin-top:30px;margin-bottom:10px"
            v-show="ifanalysis">

      <el-col :span="12"
              style="margin-left:30px;margin-right:10px">
        <el-tabs type="border-card">
          <el-tab-pane label="本院方法一结果（已完成）">本院方法一结果</el-tab-pane>
          <el-tab-pane label="本院方法二结果">正在分析中</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="12"
              style="margin-left:10px;margin-right:30px">
        <el-tabs type="border-card">
          <el-tab-pane label="团队方法一结果（已完成）">团队方法一结果</el-tab-pane>
          <el-tab-pane label="团队方法二结果">正在分析中</el-tab-pane>
        </el-tabs>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
import echarts from 'echarts';


export default {
  data() {
    return {
      collaborationId: "",
      ifanalysis: false,
      ifgenerate: false,
    }
  },
  mounted() {
  },
  computed: {

  },
  methods: {
    corhortanalysis() {
      this.$message.success("开始分析！")
      this.ifanalysis = true
      setTimeout(function () {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echartContainer'));
        // 绘制图表
        myChart.setOption({
          title: { text: '队列变量统计结果' },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }]
        });
      }, 1000);
    },
  }
}
</script>

<style>
.el-cascader .el-input {
  width: 300px;
}
.el-icon-circle-check {
  margin: auto;
}
.title {
  color: #409eff;
  font-weight: bold;
}
.el-icon-loading {
  font-size: 50px;
}
</style>