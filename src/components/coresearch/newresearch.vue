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
    <!-- <el-row type="flex"
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
    </el-row> -->
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
                   v-model="select2[index]"
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
                   v-model="select3[index]"
                   placeholder="请选择">
          <el-option v-for="item in showDepartment(select2[index])"
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
                    v-model="name[index]">

          </el-input>
        </div>
      </el-col>
      <el-col :span="1"><i v-if="n == number"
           class="el-icon-plus"
           @click="number++"></i><i v-if="(n == number)&& (number > 1)"
           class="el-icon-delete"
           @click="number--;select2.pop();select3.pop();name.pop();"></i></el-col>
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
      name: [],
      orgdep: [],
      organization: [],
      department: [],
      researchDetail: {
        name: "",
        target: "",
        proposal: "",
        expectedOutcomes: "",
        outcomeDistribution: "",
        dataRange: "",
        projectSupport: "",
        organizationCode: "",
        departmentCode: "",
        partiName: "",
        partiOrgList: []
      }
    }
  },
  mounted() {
    this.getOrgAndDep()

  },
  computed: {

  },
  methods: {
    showProtocol() {
      console.log(this.select1)
      console.log(this.select2)
      console.log(this.select3)
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

          if (response.data.code == 0) {
            this.organization = response.data.data
            console.log("org", this.organization)
            for (var i = 0; i < this.organization.length; i++) {
              this.orgdep.push({
                value: this.organization[i]['organizationCode'.toUpperCase()],
                label: this.organization[i]['name'.toUpperCase()],
                children: []
              })
              console.log("i", i)
              this.getDep(i)
            }
          }
        })
        .catch(function (error) {
          console.log("error", error);
        })
    },
    getDep(i) {

      axios.get('/collaboration/department', {
        params: {
          token: this.GLOBAL.token,
          organizationCode: this.organization[i]['organizationCode'.toUpperCase()]
        }
      })
        .then((response) => {

          if (response.data.code == 0) {
            this.department = response.data.data
            console.log("dep", this.department)
            for (var j = 0; j < this.department.length; j++) {
              this.orgdep[i].children.push({
                "value": this.department[j]['departmentCode'.toUpperCase()],
                "label": this.department[j]['name'.toUpperCase()]
              })
            }
          }


        })
        .catch(function (error) {
          console.log("error", error);
        });

      console.log("orgdep", this.orgdep)

    },
    showDepartment(ORGANIZATIONCODE) {
      if (ORGANIZATIONCODE == null) {
        return null
      } else {
        //console.log(this.orgdep[parseInt(ORGANIZATIONCODE)])
        return this.orgdep[parseInt(ORGANIZATIONCODE)].children
      }
    },
    goNewTeam() {
      this.select2.map((e, i) => {
        if (this.name[i] == null || this.name[i] == "") {
          this.researchDetail.partiOrgList.push(
            [this.select2[i], this.select3[i]]
          )
        } else {
          this.researchDetail.partiOrgList.push(
            [this.select2[i], this.select3[i], this.name[i]]
          )
        }
      })
      console.log(this.researchDetail.partiOrgList)


      // this.$router.push({
      //   path: 'newteam',
      //   query:
      //     {
      //       collaborationId: 49
      //     }
      // });
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
        // "organizationCode": this.select1[0],
        // "departmentCode": this.select1[1],
        // "partiName": this.researchDetail.partiName
        "partiOrgList": this.researchDetail.partiOrgList
      })
        .then((response) => {
          console.log("code", response.data.status)
          if (response.data.code == 0) {

            // this.$router.push({
            //   path: 'newteam',
            //   params:
            //     {
            //       collaborationId: response.data.data
            //     }
            // });

          }
        })
        .catch(error => {
          console.log("error", error.response);
          if (error.response.data.msg == "协同成员单位列表有重复") {
            this.$alert('协同成员单位列表有重复', '', {
              confirmButtonText: '确定'
            });
          } else if (error.response.data.msg == "不存在该用户") {
            this.$alert('不存在该用户', '', {
              confirmButtonText: '确定'
            });
          } else {
            this.$alert('信息填写不完整', '', {
              confirmButtonText: '确定'
            });
          }
          this.researchDetail.partiOrgList = []
          //console.log("list", this.researchDetail.partiOrgList)


        })
    }
  }
}
</script>

<style>
.el-cascader .el-input {
  width: 300px;
}
</style>