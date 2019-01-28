<template>
  <div class="create-cohort-vue"
       style="margin:0px 15px 25px 15px">
    <div>
      <el-row style="margin-top:30px;margin-bottom:10px">

        <el-steps :active="1"
                  align-center>
          <el-step title="1 研究开始"></el-step>
          <el-step title="2 队列生成"></el-step>
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
      </el-row>

    </div>
    <!-- 队列基本信息表单 -->
    <div class="user-fill-info"
         style="margin-top:20px">
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form :model="cohortInfo"
                   :rules="rules"
                   ref="cohortInfo"
                   label-width="110px"
                   label-position="left"
                   class="cohort-Info">
            <el-form-item label="队列名称"
                          prop="name">
              <el-input v-model="cohortInfo.name"
                        placeholder="请输入队列名称"></el-input>
            </el-form-item>
            <el-form-item label="队列描述">
              <el-input type="textarea"
                        v-model="cohortInfo.description"
                        placeholder="请输入队列描述"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="3"
                :offset="10">
          <el-button type="primary"
                     style="float:right;"
                     @click="toCohortLibrary">队列库</el-button>
          <!-- 队列库弹框 -->
          <el-dialog title="队列库列表"
                     :visible.sync="viewCohortLibrary"
                     width="80%"
                     :before-close="handleClose">
            <el-table :data="cohortLib"
                      style="width: 100%"
                      height="300">
              <el-table-column label="队列名称"
                               prop="name"
                               align="center"
                               min-width="20%">
              </el-table-column>
              <el-table-column label="队列描述"
                               prop="description"
                               align="center"
                               min-width="30%">
              </el-table-column>
              <el-table-column label="更新时间"
                               align="center"
                               prop="editDate"
                               min-width="20%">
              </el-table-column>
              <el-table-column label="操作"
                               align="center"
                               min-width="30%">
                <template slot-scope="scope">
                  <el-button type="text"
                             size="small"
                             @click="importCohortDetails(scope.row)">导入</el-button>
                  <el-button type="text"
                             size="small"
                             @click="getCohortId(scope.row)">查看</el-button>
                  <el-button type="text"
                             size="small"
                             @click="getCohortId(scope.row)">编辑</el-button>
                  <el-button type="text"
                             size="small"
                             @click="deleteCohort(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <span slot="footer"
                  class="dialog-footer">
              <el-button @click="viewCohortLibrary = false">关 闭</el-button>
            </span>
          </el-dialog>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span="24">
        <div class="conditon-info"
             style="margin-left:10px">
          <!-- 主要条件 -->
          <div class="main-condition">
            <div class="one-of-main-condition">
              <span>主要条件：满足下列条件其中之一的人群队列</span>
            </div>
            <component :is="maindiv.component"
                       v-for="(maindiv,index) in maindivs"
                       :id="maindiv.id"
                       :key="maindiv.uniqueId"
                       :viewdetails="viewdetails"
                       ref="mainCom"
                       @deleteMainDiv="deleteMainDiv">
            </component>
            <div class=main-condition-detail>
              <span style="padding-left:50%"
                    @click="addMajor()">
                <img src="../../assets/plus.png">
              </span>
            </div>
            <div class="limit-condition"
                 slot="footer"
                 style="display: block;">
              <div>设定样本&nbsp;
                <select class="PrimaryLimitSelect"
                        v-model="limitPrimary.data1">
                  <option value="all">所有</option>
                  <option value="earliest">最早</option>
                  <option value="latest">最晚</option>
                </select>&nbsp;发生的主要条件记录，为该样本优先纳入队列的条件记录。</div>
            </div>
          </div>
          <!-- 次要条件 -->
          <div class="secondary-condition">
            <div style="transform: translate(10px, -20px);">
              <span style="background:#ffffff;">次要条件：在满足主要条件的同时，也满足下列
                <select v-model="limitSecondary.data1"
                        class="secondaryLimitSelect">
                  <option value="all">全部</option>
                  <option value="any">之一</option>
                  <option value="at most">至多</option>
                  <option value="at least">至少</option>
                </select>
                <select class="secondaryLimitSelect"
                        v-model="limitSecondary.data2">
                  <option v-for="value in selectvalue"
                          :value="value">{{value}}个</option>
                </select>
                条件的人群
              </span>
            </div>
            <component :is="minordiv.component"
                       v-for="(minordiv,index) in minordivs"
                       :id="minordiv.id"
                       :key="minordiv.uniqueId"
                       :viewdetails2="viewdetails2"
                       ref="minorCom"
                       @deleteMinorDiv="deleteMinorDiv">
            </component>
            <div class=secondary-condition-detail>
              <span style="padding-left:50%"
                    @click="addMinor()">
                <img src="../../assets/plus.png">
              </span>
            </div>
          </div>
          <div>
            <el-col :span="5"
                    :offset="17"
                    style="margin-top:10px">
              <div class="person-number">
                <h3>入组人数</h3>
                <span>xxx人</span>
              </div>
            </el-col>
            <!-- <el-button style="float:right;margin-top:10px"
                       @click="resetForm('cohortInfo')">取消</el-button> -->
            <el-button type="primary"
                       style="float:right;margin-right:5px;margin-top:10px"
                       @click="submitForm('cohortInfo')">生成</el-button>
          </div>
          <div>
            <el-button type="primary"
                       style="clear:both;float:right;margin-right:5px;margin-top:-50px"
                       :disabled="nextstep"
                       @click="addtoCohortLibrary">下一步</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import draggable from 'vuedraggable'
import Vue from 'vue'
import axios from 'axios'
import maincondition from './conditionDiv/mainCondition.vue'
import minorcondition from './conditionDiv/minorCondition.vue'

export default {
  components: {
    // draggable,
    'maincondition': maincondition,
    'minorcondition': minorcondition,
  },
  data() {
    return {
      cohortInfo: {
        name: '',
        description: ''
      },
      // 表单验证
      rules: {
        name: [
          { required: true, message: '请输入队列名称', trigger: 'blur' },
        ],
        // date: [
        //   { type: 'date', required: true, message: '请选择创建时间', trigger: 'change' }
        // ],
      },
      createInfo: {},
      importdetails: [],
      importdetails2: [],
      maindivs: [],
      maindivCount: -1,
      minordivs: [],
      minordivCount: -1,
      uniqueId: -1,
      uniqueId2: -1,//key唯一确定
      cohortId: '',//新建队列返回的队列id
      nextstep: true,
      viewCohortLibrary: false,
      cohortLib: [],//队列库列表
      cohortLibId: '',
      redetails: [],
      redetails2: [],
      viewdetails: [],//主要条件details
      viewdetails2: [],//次要条件details
      limitPrimary: { data1: 'all' },
      limitSecondary: { data1: 'all', data2: '' },
      selectvalue: [],
      organizationCode: '',
      status: '',
    }
  },
  mounted: function () {
    this.getUserInfo()
    this.getDetailByResearch()
    console.log('$route.query', this.$route.query)
    // 查看队列
    // this.getDetailByCohort(65)
  },
  methods: {
    //新增主要条件--rzx
    addMajor() {
      this.maindivCount += 1
      this.uniqueId += 1
      this.maindivs.push({
        'component': 'maincondition',
        'id': this.maindivCount,
        'uniqueId': this.uniqueId
      })
      // console.log(this.maindivCount)
    },
    //新增次要条件--rzx
    addMinor() {
      this.minordivCount += 1
      this.uniqueId2 += 1
      this.minordivs.push({
        'component': 'minorcondition',
        'id': this.minordivCount,
        'uniqueId': this.uniqueId2
      })
      this.selectvalue = Array.from({ length: (this.minordivCount + 2) }, (v, k) => k);
      // console.log(this.minordivCount)
    },
    //拼接队列创建条件--rzx
    fulfilCreateInfo(cohortInfo) {
      this.createInfo = {
        token: this.GLOBAL.token,
        // personalResearchId: this.$route.params.RESEARCHID,
        personalResearchId: 50,
        detail1: [],
        detail2: []
      }
      this.createInfo = Object.assign(this.createInfo, this.cohortInfo)
      // 读取每个主要条件div的form
      this.importdetails = []
      for (var i = 0; i < this.maindivs.length; i++) {
        // 删除不需要的属性
        for (var j = 0; j < this.$refs.mainCom[i].importdetail.length; j++) {
          if (this.$refs.mainCom[i].importdetail[j].layer1SortNo != undefined) {
            this.importdetails.push(this.$refs.mainCom[i].importdetail[j])
          }
        }
      }
      //优先纳入
      this.limitPrimary.criteriaLayer1Code = "6"
      this.limitPrimary.criteriaLayer2Code = "1"
      this.limitPrimary.criteriaTypeCode = "1"
      this.limitPrimary.typeSortNo = 1
      this.limitPrimary.name = "优先纳入"
      this.limitPrimary.layer1SortNo = this.maindivCount
      this.limitPrimary.layer2SortNo = 50
      this.importdetails.push(this.limitPrimary)
      console.log(this.importdetails)
      // 读取每个次要条件div的form
      this.importdetails2 = []
      for (var i = 0; i < this.minordivs.length; i++) {
        console.log(i)
        // 删除不需要的属性
        for (var j = 0; j < this.$refs.minorCom[i].importdetail2.length; j++) {
          if (this.$refs.minorCom[i].importdetail2[j].layer1SortNo != undefined) {
            this.importdetails2.push(this.$refs.minorCom[i].importdetail2[j])
          }
        }
      }
      if (this.limitSecondary.data2 !== '') {
        this.importdetails2.push({
          data1: this.limitSecondary.data1,
          data2: this.limitSecondary.data2,
          criteriaLayer1Code: "6",
          criteriaLayer2Code: "2",
          criteriaTypeCode: "2",
          name: "优先纳入",
          layer1SortNo: this.minordivCount,
          layer2SortNo: 50,
          typeSortNo: 2
        })
      }
      console.log(this.importdetails2)
      this.createInfo.detail1 = this.importdetails
      this.createInfo.detail2 = this.importdetails2
      console.log(this.createInfo)
    },
    //生成队列--rzx
    createCohort() {
      axios.post('cohort/create',
        this.createInfo
      ).then((response) => {
        console.log(response)
        if (response.data.code === 0) {
          this.cohortId = response.data.data.cohortId
          this.nextstep = false
          this.$message({
            message: '队列新建成功！',
            type: 'success',
            duration: 1000
          });
        }
      }).catch(function (error) {
        console.log("error", error);
      });
    },
    submitForm(cohortInfo) {
      //表单验证
      this.$refs[cohortInfo].validate((valid) => {
        if (valid) {
          this.fulfilCreateInfo(cohortInfo)
          this.createCohort()
        } else {
          this.$message({
            message: '请输入队列名称',
            duration: 1000,
            type: 'warning'
          });
          return false;
        }
      });
    },
    //是否加入队列库--rzx
    addtoCohortLibrary() {
      this.$confirm('是否存入队列库?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        center: true
      }).then(() => {
        axios.post('cohort/add2CohortLib', {
          token: this.GLOBAL.token,
          cohortId: this.cohortId
        }).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.$message({
              type: 'success',
              message: '保存成功!',
              duration: 1000
            });
          }
        }).catch(function (error) {
          console.log("error", error);
        });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
      });
    },
    //队列库弹窗--rzx
    toCohortLibrary() {
      this.getCohortLib()
      this.viewCohortLibrary = true
      // this.$nextTick(() => {
      //   this.$refs.NewVariable.Initialize();
      // })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    //重置表单
    // resetForm(cohortInfo) {
    //   this.$refs[cohortInfo].resetFields();
    // },
    // 进度条跳转 RH
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
    goanalysisResult() {
      this.$router.push({
        path: 'analysisresult',
        query:
          {
            RESEARCHID: this.$route.query.RESEARCHID
          }
      });
    },
    //获取队列库列表--rzx
    getCohortLib() {
      axios.get('cohort/getCohortLib', {
        params: {
          token: this.GLOBAL.token,
        }
      }).then((response) => {
        // console.log(response.data)
        if (response.data.code === 0) {
          this.cohortLib = response.data.data
        }
      }).catch(function (error) {
        console.log("error", error);
      });
    },
    //拆分队列详情--rzx
    splitDetails(response) {
      console.log(response.data.data)
      this.cohortInfo.name = response.data.data.name
      this.cohortInfo.description = response.data.data.description
      this.redetails = response.data.data.detail1
      this.redetails2 = response.data.data.detail2
      if (this.redetails.length != 0) {
        for (var i = 0; i < this.redetails[this.redetails.length - 1].layer1SortNo + 1; i++) {
          this.viewdetails[i] = []
          this.redetails.forEach(item => {
            if (item.layer1SortNo == i && item.criteriaLayer1Code.search("6") == -1) {
              this.viewdetails[i].push(item)
            }
          })
          this.addMajor()
        }
        this.limitPrimary = this.redetails[this.redetails.length - 1]
      } else {
        this.addMajor()
      }
      if (this.redetails2.length != 0) {
        for (var i = 0; i < this.redetails2[this.redetails2.length - 1].layer1SortNo + 1; i++) {
          this.viewdetails2[i] = []
          this.redetails2.forEach(item => {
            if (item.layer1SortNo == i && item.criteriaLayer1Code.search("6") == -1) {
              this.viewdetails2[i].push(item)
            } else if (item.criteriaLayer1Code.search("6") != -1) {
              this.limitSecondary = item
            }
          })
          this.addMinor()
        }
      } else {
        this.addMinor()
      }
      console.log(this.viewdetails)
      console.log(this.viewdetails2)
    },
    //根据队列id获取队列详情--rzx
    getDetailByCohort(id) {
      console.log(id)
      axios.get('cohort/getDetail', {
        params: {
          token: this.GLOBAL.token,
          //输入队列Id
          cohortId: id
        }
      }).then((response) => {
        console.log(response)
        if (response.data.code === 0) {
          this.splitDetails(response)
        }
      }).catch(function (error) {
        console.log("error", error);
      });
    },
    //根据研究id获取队列详情
    getDetailByResearch() {
      axios.get('cohort/getDetailByResearch', {
        params: {
          token: this.GLOBAL.token,
          personalResearchId: 50
          // personalResearchId: this.$route.params.RESEARCHID
        }
      }).then((response) => {
        console.log(response)
        if (response.data.code === 0) {
          this.status = 1
          this.splitDetails(response)
        }
      }).catch(function (data) {
        console.log("error", data);
      });
    },
    //导入队列详情--rzx
    importCohortDetails(row) {
      console.log(row)
      this.maindivs = []
      this.getDetailByCohort(row.cohortId)
      this.viewCohortLibrary = false
      this.$message({
        message: '队列导入成功！',
        type: 'success',
        duration: 2000
      });
    },
    //队列库列表得到队列Id--rzx
    getCohortId(row) {
      console.log(row)
      this.cohortLibId = row.id
      console.log(this.cohortLibId)
    },
    //删除队列库队列--rzx
    deleteCohort(row) {
      console.log(row.cohortId)
      axios.post('cohort/delete', {
        "token": this.GLOBAL.token,
        "cohortId": row.cohortId
      }).then((response) => {
        console.log(response)
        if (response.data.code === 0) {
          this.getCohortLib()
          this.$message({
            message: '删除成功！',
            type: 'success',
            duration: 1000
          });
        }
      }).catch(function (error) {
        console.log("error", error);
      });
    },
    //删除主要条件div
    deleteMainDiv(index) {
      this.maindivs.splice(index, 1)
      this.maindivs.forEach(m => {
        if (m.id > index) {
          m.id = m.id - 1;
        }
      });
      this.maindivCount -= 1
      // console.log(this.maindivs)
    },
    //删除次要条件div
    deleteMinorDiv(index) {
      this.minordivs.splice(index, 1)
      this.minordivs.forEach(m => {
        if (m.id > index) {
          m.id = m.id - 1;
        }
      });
      this.minordivCount -= 1
      // console.log(this.minordivs)
    },
    //得到userinfo
    getUserInfo() {
      axios.get('userinfo/select', {
        params: {
          "token": this.GLOBAL.token,
        }
      }).then((response) => {
        if (response.data.code === 0) {
          this.organizationCode = response.data.data.ORGANIZATIONCODE
        }
      }).catch(function (error) {
        console.log("error", error);
      });
    },
  }
}
</script>
<style>
.main-condition {
  /* border: 1px solid #ccc; */
  border: 1px solid #409eff;
  border-radius: 6px;
  display: block;
  /* margin-top: 40px; */
}
.main-condition-detail:hover,
.secondary-condition-detail:hover {
  background-color: #ebeef5;
}
.secondary-condition {
  /* border: 1px solid #ccc; */
  border: 1px solid #409eff;
  border-radius: 6px;
  display: block;
  margin-top: 40px;
}
.main-condition-detail,
.secondary-condition-detail {
  padding: 10px;
  width: 92%;
  background: #ffffff;
  position: relative;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.limit-condition {
  margin-left: 10px;
  margin-bottom: 5px;
  font-size: 14px;
  line-height: 1.5;
  color: #606266;
}
.PrimaryLimitSelect {
  color: #606266;
}
.one-of-main-condition {
  transform: translate(10px, -12px);
  background: #fff;
  padding: 0 10px;
  width: 330px;
  border-radius: 6px;
  line-height: 30px;
}
.condition-code {
  background-color: #fff;
  padding: 0 10px;
  width: 60px;
  text-align: center;
  margin-top: -28px;
  line-height: 2;
}
.drag-cover {
  width: 100%;
  height: 10px;
  /* background-color: rgba(216, 216, 216, 0.18); */
  position: absolute;
}
/* 右侧 */
/* .sifting-cohort-content {
  background: linear-gradient(to bottom, #eaeaea, #f9f9f9);
  border-radius: 5px;
  padding: 10px 0 0 10px;
  display: block;
} */
.line {
  color: #606266;
}
.active {
  background-color: rgba(229, 246, 252, 0.767);
  border-color: rgb(84, 145, 214);
}
</style>
<style>
.droparea .el-input {
  width: 130px;
  display: inline-block;
}
/* .droparea .el-form-item__content {
  display: inline-block;
} */
.droparea .el-form-item__label {
  text-align: left;
}
/* .siftingform {
  margin-top: 10px;
} */
.person-number {
  background-color: rgba(229, 246, 252, 0.767);
  text-align: center;
  line-height: 30px;
  padding: 5px 0px 5px 0px;
  border-radius: 6px;
  color: #606266;
}
.secondaryLimitSelect,
.PrimaryLimitSelect {
  border-radius: 3px;
}
</style>

