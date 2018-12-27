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
      <el-col :span="1"></el-col>
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
      <el-col :span="1"></el-col>
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
      <el-col :span="1"></el-col>
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
      <el-col :span="1"></el-col>
    </el-row>
    <el-row type="flex"
            justify="center"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="2">
        <div>团队成员</div>
      </el-col>
      <el-col :span="6">
        <el-cascader size="small"
                     expand-trigger="hover"
                     :options="orgdep"
                     v-model="select1"
                     placeholder="医院/科室">
        </el-cascader>
      </el-col>
      <el-col :span="4">

        <el-input size="small"
                  placeholder="姓名"
                  v-model="researchDetail.partiName">

        </el-input>

      </el-col>
      <el-col :span="1"></el-col>
    </el-row>
    <el-row v-for="(n,index) in number"
            :key="index"
            type="flex"
            justify="center"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="2">
        <div>团队成员</div>
      </el-col>
      <el-col :span="3">
        <el-select size="small"
                   v-model="select2"
                   placeholder="请选择">
          <el-option v-for="item in orgdep"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select size="small"
                   v-model="select3"
                   placeholder="请选择">
          <el-option v-for="item in orgdep[0].children"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <div>
          <el-input size="small"
                    placeholder="姓名"
                    v-model="researchDetail.partiName">

          </el-input>
        </div>
      </el-col>
      <el-col :span="1"><i v-if="n == number"
           class="el-icon-plus"
           @click="number++"></i><i v-if="n == number"
           class="el-icon-delete"
           @click="number--"></i></el-col>
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
      <el-col :span="1"></el-col>
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
      <el-col :span="1"></el-col>
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
      <el-col :span="1"></el-col>
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
                     @click="showProtocol()">阅读协议</el-button>
        </div>
      </el-col>
      <el-col :span="1"></el-col>
    </el-row>
    <el-row type="flex"
            justify="center"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="6">
        <el-button type="primary"
                   :disabled="!checked"
                   @click="goNewTeam()">创建研究</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="primary">取消创建</el-button>
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
      number: 1,
      select1: [],
      select2: [],
      select3: [],
      orgdep: [{
        value: '0',
        label: '浙一',
        children: [{
          value: '0',
          label: '内科',
        }, {
          value: '1',
          label: '外科',
        }]
      }, {
        value: '1',
        label: '浙二',
        children: [{
          value: '0',
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
      }
    }
  },
  mounted() {
    this.getOrgAndDep()
  },
  methods: {
    showProtocol() {
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
    getOrgAndDep() {
      axios.get('/collaboration/organization', {
        params: {
          token: this.GLOBAL.token
        }
      })
        .then((response) => {

          if (response.data.msg == "success!") {
            console.log("org", response.data.data)

          }
        })
        .catch(function (error) {
          console.log("error", error);
        });

    },
    goNewTeam() {
      console.log(this.researchDetail)
      this.$router.push({
        path: 'newteam',
        query:
          {
            collaborationId: 49
          }
      });
      axios.post('/collaboration/createResearch', {
        "token": this.GLOBAL.token,
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
            // this.$router.push({
            //   path: 'newteam',
            //   params:
            //     {
            //       collaborationId: response.data.data
            //     }
            // });
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