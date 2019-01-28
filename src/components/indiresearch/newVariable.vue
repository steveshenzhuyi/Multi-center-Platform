<template>
  <div>
    <el-row style="margin-top:30px;margin-bottom:10px">
      <el-steps :active="2"
                align-center>
        <el-step title="1 研究开始"></el-step>
        <el-step title="2 队列生成"
                 style="cursor:pointer"
                 @click.native="gocreateCohort()"></el-step>
        <el-step title="3 变量生成"></el-step>
        <el-step title="4 模型选择"
                 style="cursor:pointer"
                 @click.native="goselectModel()"></el-step>
        <el-step title="5 结果分析"
                 style="cursor:pointer"
                 @click.native="goanalysisResult()"></el-step>
      </el-steps>
    </el-row>
    <!-- 主页面 -->
    <el-row style="margin-top:5px">
      <el-col :span="3"
              :offset="4">
        <div class="SubTitle2">
          <i style="position:relative;top:2px"
             class="myIcon-jilu"></i> 变量列表</div>
      </el-col>
    </el-row>
    <el-row style="margin-top:20px">
      <el-col :span="10"
              :offset="4">
        <el-table :data="VariableTable"
                  stripe
                  border
                  max-height="800">
          <el-table-column prop="name"
                           label="变量名称"
                           min-width="60%"></el-table-column>
          <el-table-column prop="type"
                           label="变量类型"
                           min-width="60%"></el-table-column>
          <el-table-column prop="description"
                           label="变量描述"
                           min-width="170%"
                           show-overflow-tooltip></el-table-column>
          <el-table-column label="编辑"
                           min-width="140px"
                           show-overflow-tooltip>
            <template slot-scope="scope">
              <!-- <el-button size="mini"
                             type="primary"
                             @click="EditVar(scope.$index)">编辑</el-button> -->
              <el-button size="mini"
                         type="primary"
                         @click="corhortanalysis(scope.$index)"
                         icon="el-icon-edit-outline">统计</el-button>
              <el-button size="mini"
                         type="info"
                         icon="el-icon-delete"
                         plain
                         @click="DeleteVar('RS', scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="3"
              :offset="1">
        <el-button type="primary"
                   plain
                   @click="NewVarVisible=true"
                   style="width:120px">新增变量</el-button>
        </br></br>
        <el-button type="primary"
                   plain
                   @click="VarLibVisible=true"
                   style="width:120px">从变量库导入</el-button>
        </br></br>
        <el-button type="primary"
                   @click=""
                   round
                   @click="goselectModel()"
                   style="width:120px">下一步<i class="el-icon-d-arrow-right el-icon--right"></i></el-button>
      </el-col>
    </el-row>
    </br>
    <el-row style="margin-top:30px;margin-bottom:10px">
      <el-col :offset="4">
        <div v-show="ifanalysis"
             id="echartContainer"
             style="width:500px;height:500px;">
        </div>
      </el-col>
    </el-row>

    <!-- 新增变量弹框 父用子的open、close、submit函数，子向父传NewVarVisiable -->
    <el-dialog title="新增变量"
               :visible.sync="NewVarVisible"
               @open="OpenNewVarDialog()"
               @close="CloseNewVarDialog()"
               append-to-body
               :width="NewVarDialogWidth">
      <component :is="mynewvariable"
                 ref="NewVarDialog"
                 @PostNewVarVisiable="GetNewVarVisiable"></component>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="CloseNewVarDialog()">取 消</el-button>
        <el-button type="primary"
                   @click="SubmitNewVariable()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 变量库弹窗 -->
    <el-dialog title="变量库"
               :visible.sync="VarLibVisible"
               @open="OpenVarLibDialog()"
               @close="CloseVarLibDialog()"
               width="50%"
               append-to-body>
      <el-row>
        <el-col :span="18"
                :offset="2">
          <td style="margin-buttom:0">
            <el-input v-model="LibSearchInput"
                      prefix-icon="el-icon-search"
                      size="medium"
                      clearable
                      @clear="GetVariableTable('FB')"
                      placeholder="请输入变量名称"></el-input>
          </td>
          <td>
            <el-button size="medium"
                       type="primary"
                       icon="el-icon-search"
                       round
                       style="margin-left:15px"
                       @click="GetVariableTable('FB', LibSearchInput)">搜索</el-button>
          </td>
          </td>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px">
        <el-col :span="24"
                :offset="1">
          <el-table :data="VarLibTable"
                    style="width:90%"
                    ref="VarLibTable"
                    stripe
                    border
                    @selection-change="HandleSelectionChange"
                    max-height="500">
            <el-table-column type="selection"
                             width="35">
            </el-table-column>
            <el-table-column prop="featureId"
                             v-if="false"></el-table-column>
            <el-table-column prop="name"
                             label="变量名称"
                             min-width="60%"></el-table-column>
            <el-table-column prop="type"
                             label="变量类型"
                             min-width="60%"></el-table-column>
            <el-table-column prop="description"
                             label="变量描述"
                             min-width="150%"
                             show-overflow-tooltip></el-table-column>
            <el-table-column label="编辑"
                             min-width="100%">
              <template slot-scope="scope">
                <!-- <el-button size="mini"
                             type="primary"
                             @click="EditVar(scope.$index)">编辑</el-button> -->
                <el-button size="mini"
                           type="info"
                           icon="el-icon-delete"
                           @click="DeleteVar('FB', scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="CloseVarLibDialog()">取 消</el-button>
        <el-button type="primary"
                   @click="ConfirmVarSelect()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import axios from 'axios'
import echarts from 'echarts';
import { setTimeout } from 'timers';
import newvariable from './newvariable/NewVarDialog.vue'
import _ from 'lodash'
export default {
  data() {
    return {
      NewVarDialogWidth: (72352 / document.body.clientWidth).toString() + "%",
      // ------主页面------
      VariableTable: [{ 'id': '1', 'name': '性别', 'type': '定性', 'description': '样本的性别' },
      { 'id': '2', 'name': '年龄', 'type': '定量', 'description': '样本的年龄' }],
      NewVarVisible: false,
      VarLibVisible: false,
      ifanalysis: false,
      // ------变量库弹窗------
      VarLibTable: [],
      LibSearchInput: "",
      MultiSelection: [],
      // ------引入------
      mynewvariable: newvariable
    }
  },
  created() {
    this.GetVariableTable('RS')
  },
  mounted() {
    let that = this
    window.onresize = _.debounce(() => {
      that.NewVarDialogWidth = (72352 / document.body.clientWidth).toString() + "%"
    }, 100)
  },
  watch: {
  },
  methods: {
    // ------新建变量导入------
    CloseNewVarDialog() {
      this.$refs.NewVarDialog.CloseNewVarDialog()
    },
    OpenNewVarDialog() {
      this.$nextTick(() => {
        this.$refs.NewVarDialog.OpenNewVarDialog()
      })
    },
    SubmitNewVariable() {
      this.$refs.NewVarDialog.SubmitNewVariable()
      this.GetVariableTable('RS')
    },
    GetNewVarVisiable(val) {
      this.NewVarVisible = val
    },
    // ------主页面与变量库的获取和删除------
    GetVariableTable(flag, name) {
      axios.get('/feature/getList', {
        params: {
          "token": this.GLOBAL.token,
          "flag": flag,
          "researchId": flag == 'RS' ? 16 : "", // 应该是this.$route.params.RESEARCHID
          "name": name || ""
        }
      })
        .then(response => {
          let data = response.data.data
          data.forEach(item => {
            item.type = item.type == 1 ? '定性' : '定量'
          })
          if (flag == 'RS') {
            this.VariableTable = data
          } else {
            this.VarLibTable = data
          }
        })
        .catch(error => {
          console.log("error", error);
        })
    },
    DeleteVar(flag, index) {
      axios.post('/feature/deleteFeature', {
        "token": this.GLOBAL.token,
        "featureId": flag == 'RS' ? this.VariableTable[index].featureId : this.VarLibTable[index].featureId
      })
        .then(response => {
          if (response.data.code == "0") {
            this.$alert('删除成功！', '提示', { confirmButtonText: '确定' })
            this.GetVariableTable(flag)
          }
        })
        .catch(error => {
          console.log("error", error);
        })
      // this.aaa = true
      // setTimeout(() => console.log("settimeout"), 0)
      // this.$nextTick(() => console.log("vue nexttick"))
      // process.nextTick(() => console.log("process.nexttick"))
      // Promise.resolve().then(() => console.log("promise"))
      // console.log("start")
    },
    // ------变量库弹窗------
    OpenVarLibDialog() {
      this.GetVariableTable('FB')
    },
    CloseVarLibDialog() {
      this.VarLibTable.forEach(row => {
        this.$refs['VarLibTable'].toggleRowSelection(row, false)
      })
      this.LibSearchInput = ""
      this.VarLibVisible = false
    },
    HandleSelectionChange(val) {
      this.MultiSelection = val
    },
    ConfirmVarSelect() {
      var res = this.MultiSelection.map(item => {
        return item.featureId
      })
      axios.post('/feature/importFeature', {
        "token": this.GLOBAL.token,
        "featureId": res,
        "researchId": 16  // 应该是this.$route.params.RESEARCHID
      })
        .then(response => {
          if (response.data.code == "0") {
            this.$alert('导入变量成功！', '提示', {
              confirmButtonText: '确定',
              callback: () => {
                this.GetVariableTable("RS")
                this.CloseVarLibDialog()
              }
            })
          }
        })
        .catch(error => {
          console.log("error", error);
        })

    },

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
    corhortanalysis(index) {

      // 加了index，获取id用this.VariableTable[index].featureId /dwx
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
@import "~@/assets/AdminInfo/css_admin/css_admin.css";
@import "~@/assets/AdminInfo/css_admin/myIcon/iconfont.css";
</style>