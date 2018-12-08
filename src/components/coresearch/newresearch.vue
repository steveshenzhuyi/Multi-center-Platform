<template>
  <div>
    <el-row type="flex"
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
            justify="center"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="2">
        <div>研究方法</div>
      </el-col>
      <el-col :span="10">
        <div>
          <el-input size="small"
                    placeholder="空白等待输入"
                    v-model="researchDetail.proposal">
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex"
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
            justify="center"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="2">
        <div>团队成员</div>
      </el-col>
      <el-col :span="10">
        <div>
          <el-input class="input-with-cascader"
                    size="small"
                    placeholder="姓名"
                    v-model="researchDetail.partiName">
            <el-cascader size="small"
                         expand-trigger="hover"
                         :options="options"
                         v-model="select1"
                         slot="prepend"
                         placeholder="医院/科室">
            </el-cascader>

          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex"
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
            justify="center"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="2">
        <div>成果分配</div>
      </el-col>
      <el-col :span="10">
        <div>
          <el-input size="small"
                    placeholder="空白等待输入"
                    v-model="researchDetail.outcomeDistribution">
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex"
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
            justify="center"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="2">
        <div>研究协议</div>
      </el-col>
      <el-col :span="10">
        <div>
          <el-checkbox v-model="checked">我同意接收研究发起人相关协议</el-checkbox>
          <el-button type="text"
                     @click="messagebox()">阅读协议</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex"
            justify="center"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="6">
        <el-button type="info"
                   :disabled="!this.checked"
                   @click="tonewteam()">创建研究</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="info">取消创建</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      checked: false,
      options: [{
        value: '浙一',
        label: '浙一',
        children: [{
          value: '内科',
          label: '内科',
        }, {
          value: '外科',
          label: '外科',
        }]
      }, {
        value: '浙二',
        label: '浙二',
        children: [{
          value: '内科',
          label: '内科',
        }]
      }],
      researchDetail: {
        name: '',
        target: '',
        proposal: '',
        expectedOutcomes: '',
        outcomeDistribution: '',
        dataRange: '',
        projectSupport: '',
        organizationCode: '',
        departmentCode: '',
        partiName: ''
      },

      select1: []
    }
  },
  methods: {
    messagebox() {
      console.log(this.select1)
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
    tonewteam() {
      console.log(this.researchDetail)
      axios.post('/collaboration/createResearch', {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOlsiMTg4NjgxOCAgICAgICAgICAgICAiXSwiZXhwIjoxNTc1NDUyMjg3ODM0LCJpYXQiOjE1NDM5MTYyODd9.PJPezRTd-Tp2MpfgOjGEcpA9hf44b93rgJDSr4xYNps",
        "name": this.researchDetail.name,
        "target": this.researchDetail.target,
        "proposal": this.researchDetail.proposal,
        "expectedOutcomes": this.researchDetail.expectedOutcomes,
        "outcomeDistribution": this.researchDetail.outcomeDistribution,
        "dataRange": this.researchDetail.dataRange,
        "projectSupport": this.researchDetail.projectSupport,
        "redundancy": "qwerty",
        "organizationCode": this.select1[0],
        "departmentCode": this.select1[1],
        "partiName": this.researchDetail.partiName
      })
        .then((response) => {

          if (response.data.msg == "成功插入协同状态数据!") {
            this.$router.push({ path: 'newteam' });

          }
        })
        .catch(function (error) {
          console.log("error", error);
        });

    }
  }
}
</script>


<style>
.el-cascader .el-input {
  width: 300px;
}
</style>