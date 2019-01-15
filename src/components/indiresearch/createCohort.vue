<template>
  <div class="create-cohort-vue">
    <el-steps :active="1"
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
        <el-col :span="5"
                :offset="5">
          <el-card shadow="hover">
            该队列入组人数xxx人
          </el-card>
        </el-col>
        <el-col :span="3">
          <el-button type="primary"
                     style="float:right;"
                     @click="toCohortLibrary">队列库</el-button>
          <!-- 队列库弹框 -->
          <el-dialog title="队列库列表"
                     :visible.sync="viewCohortLibrary"
                     width="70%"
                     :before-close="handleClose">
            <el-table :data="cohortLib"
                      style="width: 100%"
                      height="250">
              <el-table-column label="队列名称"
                               width="100">
              </el-table-column>
              <el-table-column label="队列描述"
                               width="180">
              </el-table-column>
              <el-table-column label="创建时间">
              </el-table-column>
              <el-table-column label="入组人数">
              </el-table-column>
              <el-table-column label="操作">
                <el-button type="text"
                           size="small">导入</el-button>
                <el-button type="text"
                           size="small">查看</el-button>
                <el-button type="text"
                           size="small">编辑</el-button>
                <el-button type="text"
                           size="small">删除</el-button>
              </el-table-column>
            </el-table>
            <span slot="footer"
                  class="dialog-footer">
              <el-button @click="viewCohortLibrary = false">取 消</el-button>
              <el-button type="primary"
                         @click="viewCohortLibrary = false">确 定</el-button>
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
                       :key="index"
                       ref="mainCom">
            </component>
            <div class=main-condition-detail>
              <span style="padding-left:50%"
                    @click="addMajor('maincondition')">
                <img src="../../assets/plus.png">
              </span>
            </div>
            <div class="limit-condition"
                 slot="footer"
                 style="display: block;">
              <div><span>在主要事件发生日期之前，至少有</span>
                <label><input class="PriorDays num-input"
                         type="number"
                         min="0"></label><span>天的记录，且该条件发生后，至少有</span>
                <label><input class="PostDays num-input"
                         type="number"
                         min="0"></label>
                <span>天的记录。</span></div>
              <div>设定样本<select class="PrimaryLimitSelect">
                  <option value="earliest">最早</option>
                  <option value="latest">最晚</option>
                </select>发生的主要条件记录，为该样本优先纳入队列的条件记录。</div>
            </div>
          </div>
          <!-- 次要条件 -->
          <div class="secondary-condition">
            <div style="transform: translate(10px, -20px);">
              <span style="background:#ffffff;">次要条件：在满足主要条件的同时，也满足下列
                <select v-model="limitvalue"
                        class="PrimaryLimitSelect">
                  <option value="all">全部</option>
                  <option value="any">之一</option>
                  <option value="at_most">至多</option>
                  <option value="at_least">至少</option>
                </select>
                <select class="PrimaryLimitSelect">
                  <option value="0">0个</option>
                </select>
                条件的人群
              </span>
            </div>
            <component :is="minordiv.component"
                       v-for="(minordiv,index) in minordivs"
                       :id="minordiv.id"
                       :key="index">
            </component>
            <div class=secondary-condition-detail>
              <span style="padding-left:50%"
                    @click="addMinor('minorcondition')">
                <img src="../../assets/plus.png">
              </span>
            </div>
          </div>
          <div>
            <!-- <el-button style="float:right;margin-top:10px"
                       @click="resetForm('cohortInfo')">取消</el-button> -->
            <el-button type="primary"
                       style="float:right;margin-right:5px;margin-top:10px"
                       @click="submitForm('cohortInfo')">生成</el-button>
          </div>
          <div>
            <el-button type="primary"
                       style="clear:both;float:right;margin-right:5px;margin-top:10px"
                       :disabled="nextstep"
                       @click="addtoCohortLibrary">下一步</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Vue from 'vue'
import axios from 'axios'
import maincondition from './conditionDiv/mainCondition.vue'
import minorcondition from './conditionDiv/minorCondition.vue'

export default {
  components: {
    draggable,
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
      maindivs: [{ component: "maincondition", id: 0 }],
      maindivCount: 0,
      minordivs: [{ component: "minorcondition", id: 0 }],
      minordivCount: 0,
      cohortId: '',
      nextstep: true,
      viewCohortLibrary: false,
      cohortLib: [],//队列库列表
      limitvalue: '',
    }
  },
  // mounted: function () {
  //   this.getCohortDetail()
  // },
  methods: {
    //新增主要条件--rzx
    addMajor(component) {
      this.maindivCount = this.maindivCount + 1
      this.maindivs.push({
        'component': component,
        'id': this.maindivCount
      })
      // console.log(this.maindivs)
      console.log(this.maindivCount)
    },
    //新增次要条件--rzx
    addMinor(component) {
      this.minordivCount = this.minordivCount + 1
      this.minordivs.push({
        'component': component,
        'id': this.minordivCount
      })
      // console.log(this.minordivs)
      console.log(this.minordivCount)
    },
    //拼接队列创建条件--rzx
    fulfilCreateInfo(cohortInfo) {
      this.createInfo = {
        token: this.GLOBAL.token,
        detail: []
      }
      this.createInfo = Object.assign(this.createInfo, this.cohortInfo)
      // 读取每个div的form
      this.importdetails = []
      for (var i = 0; i < this.maindivs.length; i++) {
        // 删除不需要的属性
        for (var j = 0; j < this.$refs.mainCom[i].importdetail.length; j++) {
          if (this.$refs.mainCom[i].importdetail[j].layer1SortNo != undefined) {
            this.importdetails.push(this.$refs.mainCom[i].importdetail[j])
          }
        }
      }
      // console.log(this.importdetails)
      this.createInfo.detail = this.importdetails
      console.log(this.createInfo)
    },
    //生成队列--rzx
    createCohort() {
      axios.post('cohort/create',
        this.createInfo
      )
        .then((response) => {
          console.log(response)
          if (response.data.msg == '新建成功') {
            this.cohortId = response.data.id
            this.nextstep = false
            this.$message({
              message: '队列新建成功！',
              type: 'success',
              duration: 1000
            });
          }
        })
        .catch(function (error) {
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
        this.$message({
          type: 'success',
          message: '保存成功!',
          duration: 1000
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
.main-condition {
  border: 1px solid #ccc;
  display: block;
  /* margin-top: 40px; */
}
.main-condition-detail:hover,
.secondary-condition-detail:hover {
  background-color: rgba(234, 235, 242, 0.67);
}
.secondary-condition {
  border: 1px solid #ccc;
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
}
.limit-condition {
  margin-left: 10px;
  margin-bottom: 5px;
  font-size: 14px;
  line-height: 1.5;
  color: #606266;
}
.one-of-main-condition {
  transform: translate(10px, -12px);
  background: #ffffff;
  padding: 0 10px;
  width: 330px;
}
input.num-input {
  width: 60px;
  border: 0px;
  border-bottom: 1px solid #d5d5d5;
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
.siftingform {
  margin-top: 10px;
}
</style>

