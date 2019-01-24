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
        <div>研究名称</div>
      </el-col>
      <el-col :span="10">
        <div>
          <el-input size="small"
                    placeholder="空白等待输入"
                    v-model="researchDetail.name">
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex"
            align="middle"
            justify="center"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="2">
        <div>研究目标</div>
      </el-col>
      <el-col :span="10">
        <div>
          <el-input size="small"
                    placeholder="空白等待输入"
                    v-model="researchDetail.target">
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex"
            align="middle"
            justify="center"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="2">
        <div>数据范围</div>
      </el-col>
      <el-col :span="10">
        <div>
          <el-input size="small"
                    placeholder="空白等待输入"
                    v-model="researchDetail.dataRange">
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex"
            align="middle"
            justify="center"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="2">
        <div>预期成果</div>
      </el-col>
      <el-col :span="10">
        <div>
          <el-input size="small"
                    placeholder="空白等待输入"
                    v-model="researchDetail.expectedOutcomes">
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex"
            align="middle"
            justify="center"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="2">
        <div>项目支持</div>
      </el-col>
      <el-col :span="10">
        <div>
          <el-input size="small"
                    placeholder="空白等待输入"
                    v-model="researchDetail.projectSupport">
          </el-input>
        </div>
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
        <i class="iconfont icon-1"></i>
      </el-col>
      <el-col :span="9">
        <div>
          <el-input size="small"
                    placeholder="空白等待输入"
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 1}"
                    v-model="researchDetail.cohort">
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :offset="8"
              :span="1">
        <i class="iconfont icon-2"></i>
      </el-col>
      <el-col :span="9">
        <div>
          <el-input size="small"
                    placeholder="空白等待输入"
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 1}"
                    v-model="researchDetail.variable">
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :offset="8"
              :span="1">
        <i class="iconfont icon-3"></i>
      </el-col>
      <el-col :span="9">

        <div>
          <el-input size="small"
                    placeholder="空白等待输入"
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 1}"
                    v-model="researchDetail.model">
          </el-input>
        </div>
      </el-col>
    </el-row>
    </el-collapse>
    <el-row type="flex"
            justify="center"
            align="middle"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="2">
        <div>研究协议</div>
      </el-col>
      <el-col :span="10">
        <div>
          <el-checkbox v-model="checked">我同意接收研究发起人相关协议</el-checkbox>
          <el-button type="text"
                     @click="showProtocol()">阅读协议</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row type="flex"
            align="middle"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="2"
              :offset="6">
        <div class="title">数据查看</div>
      </el-col>
      <el-col :span="2">
        <el-button type="primary"
                   @click="corhortgenerate"
                   plain
                   :disabled="!checked">生成队列</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary"
                   @click="corhortanalysis"
                   plain
                   :disabled="!checked">生成队列-变量统计</el-button>
      </el-col>
      <el-col :span="8"
              style="padding-left:100px"
              v-show="ifgenerate">
        符合要求的病人数：{{generateresult}}例
      </el-col>
    </el-row>
    <el-row type="flex"
            align="middle"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="2"
              :offset="6">
        <div class="title">数据操作</div>
      </el-col>
      <el-col :span="2">
        <el-button type="primary"
                   plain
                   @click="loadingModel"
                   :disabled="!checked">加密</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary"
                   plain
                   :disabled="!checked">上传</el-button>
      </el-col>
    </el-row>
    <el-row type="flex"
            align="middle"
            style="margin-top:30px;margin-bottom:10px">

      <div v-show="ifanalysis"
           id="echartContainer"
           style="width:500px;height:500px;margin:0 auto">
      </div>
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
      checked: false,
      number: 1,
      name: [],
      orgdep: [],
      organization: [],
      department: [],
      ifanalysis: false,
      ifgenerate: false,
      generateresult: 0,
      researchDetail: {
        name: "",
        target: "",
        dataRange: "",
        expectedOutcomes: "",
        projectSupport: "",
        cohort: "",
        variable: "",
        model: ""
      },
    }
  },
  mounted() {
    this.collaborationId = "13"
    this.getCollaborInfo()

  },
  computed: {

  },
  methods: {
    getCollaborInfo() {
      axios.get('collaboration/collaborInfo', {
        params: {
          token: this.GLOBAL.token,
          collaborationId: this.collaborationId
        }
      })
        .then((response) => {
          if (response.data.code == 0) {
            this.detail = response.data.data.collaborInfo
            this.researchDetail.name = this.detail.NAME
            this.researchDetail.target = this.detail.TARGET
            this.researchDetail.expectedOutcomes = this.detail.EXPECTEDOUTCOMES
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    showProtocol() {
      this.$alert('协议内容', '协议', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          });
        }
      });
    },
    loadingModel() {
      axios.get('http://10.5.18.44:3000/homomorphic/encryption', {
        params: {
          "token": this.GLOBAL.token,
        },
      })
        .then((response) => {
          if (response.data.code == "0") {
            this.$message.success("开始加密")
            const loading = this.$loading({
              lock: true,
              text: '10%',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            setTimeout(() => {
              loading.close();
            }, 2000);
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    corhortgenerate() {
      this.$message.success("开始生成！")
      this.ifgenerate = true
      this.generateresult = 1254
      setTimeout(function () {
        this.generateresult = 1254
      }, 1000);
    },
    corhortanalysis() {
      this.$message.success("开始统计！")
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