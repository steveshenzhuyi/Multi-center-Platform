<template>
  <div>
    <el-row style="margin-top:30px;margin-bottom:10px">

      <el-steps :active="3"
                align-center>
        <el-step title="1 研究开始"></el-step>
        <el-step title="2 队列生成"
                 style="cursor:pointer"
                 @click.native="gocreateCohort()"></el-step>
        <el-step title="3 变量生成"
                 style="cursor:pointer"
                 @click.native="gonewVariable()"></el-step>
        <el-step title="4 模型选择"></el-step>
        <el-step title="5 结果分析"
                 style="cursor:pointer"
                 @click.native="goanalysisResult()"></el-step>
      </el-steps>
    </el-row>
    <el-row>
      <el-col :span="10"
              :offset="4">
        <el-row style="margin-top:20px;margin-bottom:15px;">
          <i class="el-icon-document"></i>
          已选模型
          <el-button style="float:right;"
                     type="primary"
                     @click="NewModel">新建模型</el-button>
        </el-row>
        <el-table :data="ModelTable"
                  style="width:100%;"
                  stripe
                  border>
          <el-table-column prop="modelId"
                           v-if="false"></el-table-column>
          <el-table-column prop="name"
                           label="模型名称">

          </el-table-column>
          <el-table-column prop="type"
                           label="模型类型">

          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button-group>
                <!-- <el-button type="info"
                           plain
                           @click="Check(scope.$index)">查看</el-button> -->
                <el-button type="primary"
                           plain
                           @click="Edit(scope.$index)">编辑</el-button>
                <el-button type="danger"
                           plain
                           @click="Delete(scope.$index)">删除</el-button>
              </el-button-group>
            </template>
          </el-table-column>

        </el-table>

        <el-row>
          <el-button type="primary"
                     style="float:right;margin-right:5px;margin-top:10px">保存</el-button>
        </el-row>
        <el-row>
          <el-button type="primary"
                     style="clear:both;float:right;margin-right:5px;margin-top:10px">开始分析</el-button>
        </el-row>
      </el-col>
    </el-row>

    <!-- GYX 新建模型弹窗-->
    <div v-if="NewModelVisible">
      <el-dialog :visible.sync="NewModelVisible"
                 width="40%"
                 height="60%"
                 :before-close="handleClose">

        <el-tabs :tab-position="tabPosition"
                 type="border-card"
                 v-model="activeMethod1"
                 @tab-click="handleClick">

          <el-tab-pane name="A"
                       label="描述性分析">

            <component :is="methodName1"
                       :mid="methodID1"></component>

          </el-tab-pane>
          <el-tab-pane name="B"
                       label="t检验">
            <el-tabs @tab-click="handleClick2"
                     v-model="activeMethod2">
              <el-tab-pane name="a"
                           label="单样本t检验">

                <component :is="methodName2_1"
                           :mid="methodID2_1"></component>

              </el-tab-pane>
              <el-tab-pane name="b"
                           label="独立样本t检验">

                <component :is="methodName2_2"
                           :mid="methodID2_2"></component>

              </el-tab-pane>
              <el-tab-pane name="c"
                           label="配对样本t检验">

                <component :is="methodName2_3"
                           :mid="methodID2_3"></component>

              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane name="C"
                       label="方差分析">
            <el-tabs @tab-click="handleClick3"
                     v-model="activeMethod3">
              <el-tab-pane name="d"
                           label="单因素方差分析">

                <component :is="methodName3_1"
                           :mid="methodID3_1"></component>

              </el-tab-pane>
              <el-tab-pane name="e"
                           label="多因素方差分析">

                <component :is="methodName3_2"
                           :mid="methodID3_2"></component>

              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane name="D"
                       label="线性回归">

            <component :is="methodName4"
                       :mid="methodID4"></component>

          </el-tab-pane>
          <el-tab-pane name="E"
                       label="逻辑回归">

            <component :is="methodName5"
                       :mid="methodID5"></component>

          </el-tab-pane>
          <el-tab-pane name="F"
                       label="SVM">

            <component :is="methodName6"
                       :mid="methodID6"></component>

          </el-tab-pane>
          <el-tab-pane name="G"
                       label="贝叶斯网络">

            <component :is="methodName7"
                       :mid="methodID7"></component>

          </el-tab-pane>
          <el-tab-pane name="H"
                       label="决策树">

            <component :is='methodName8'
                       :mid="methodID8"></component>

          </el-tab-pane>
        </el-tabs>

      </el-dialog>

    </div>

  </div>
</template>
<script>
import axios from 'axios'
import mstj from './methodform/mstj.vue'
import bayesiannetworks from './methodform/bayesiannetworks.vue'
import decisiontree from './methodform/decisiontree.vue'
import ttest_independent from './methodform/ttest_independent.vue'
import linearregression from './methodform/linearregression.vue'
import logicregression from './methodform/logicregression.vue'
import multifactor_analysis from './methodform/multifactor_analysis.vue'
import ttest_one from './methodform/ttest_one.vue'
import oneway_anova from './methodform/oneway_anova.vue'
import ttest_paired from './methodform/ttest_paired.vue'
import svmanalysis from './methodform/svmanalysis.vue'
import { isNull } from 'util';

export default {
  components: {
    'mstj': mstj,
    'bayesiannetworks': bayesiannetworks,
    'decisiontree': decisiontree,
    'ttest_independent': ttest_independent,
    'linearregression': linearregression,
    'logicregression': logicregression,
    'multifactor_analysis': multifactor_analysis,
    'ttest_one': ttest_one,
    'oneway_anova': oneway_anova,
    'ttest_paired': ttest_paired,
    'svmanalysis': svmanalysis,


  },
  data() {
    return {
      NewModelVisible: false,
      tabPosition: 'left',
      MethodDetails: '',
      activeMethod1: '',
      activeMethod2: 'a',
      activeMethod3: 'd',
      methodID1: -1,
      methodID2_1: -1,
      methodID2_2: -1,
      methodID2_3: -1,
      methodID3_1: -1,
      methodID3_2: -1,
      methodID4: -1,
      methodID5: -1,
      methodID6: -1,
      methodID7: -1,
      methodID8: -1,
      methodName1: '',
      methodName2_1: '',
      methodName2_2: '',
      methodName2_3: '',
      methodName3_1: '',
      methodName3_2: '',
      methodName4: '',
      methodName5: '',
      methodName6: '',
      methodName7: '',
      methodName8: '',
      ModelTable: [{ modelId: 83, name: '单样本t检验1', type: "t检验-单样本t检验" }, { modelId: 84, name: '独立样本t1', type: "t检验-独立样本t检验" }, { modelId: 85, name: 'mstj1', type: "描述性统计" }],
      methodlist: []

    }
  },
  mounted() {
    this.getModlelist();
  },
  methods: {

    getModlelist() {

    },

    //dialog相关
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          this.reload()
        })
        .catch(_ => { });
    },
    handleClick(tab, event) {
      switch (tab.name) {
        //t检验默认单样本
        case 'B':
          this.activeMethod2 = "a";
          this.methodName2_1 = ttest_one;
          break;
        //方差默认单因素
        case 'C':
          this.activeMethod3 = "d";
          this.methodName3_1 = oneway_anova;
          break;
        default:
          break;
      }
      this.checkVue(tab.name);
    },
    handleClick2(tab, event) {

      this.checkVue(tab.name);
    },
    handleClick3(tab, event) {

      this.checkVue(tab.name);
    },
    checkVue(name) {
      switch (name) {
        case "A":
          // console.log('描述统计');
          this.methodName1 = mstj;
          break;
        case "a":
          //console.log('单样本t检验');
          this.methodName2_1 = ttest_one;
          break;
        case "b":
          // console.log('独立样本t检验');
          this.methodName2_2 = ttest_independent;
          break;
        case "c":
          //console.log('配对样本t检验');
          this.methodName2_3 = ttest_paired;
          break;
        case "d":
          //console.log('单因素方差');
          this.methodName3_1 = oneway_anova;
          break;
        case "e":
          //console.log('多因素方差');
          this.methodName3_2 = multifactor_analysis;
          break;
        case 'D':
          //console.log('线性回归');
          this.methodName4 = linearregression;
          break;
        case 'E':
          //console.log('逻辑回归');
          this.methodName5 = logicregression;
          break;
        case 'F':
          //console.log("SVM")
          this.methodName6 = svmanalysis;
          break;
        case "G":
          //console.log('贝叶斯');
          this.methodName7 = bayesiannetworks;
          break;
        case "H":
          //console.log('决策树');
          this.methodName8 = decisiontree;
          break;
        default:
          break;
      }
    },
    //模型查看编辑删除 GYX
    Check(index) {
      //来不及写
      console.log('haodi')


    },
    Edit(index) {
      var t = this.ModelTable[index].modelId;
      console.log(t);
      this.getMethodDetails(t);
      this.NewModelVisible = true;
    },
    getMethodDetails(t) {
      axios.get('/model/getDetail', {
        params: {
          "token": this.GLOBAL.token,
          "modelId": t
        }
      })
        .then(response => {
          if (response.data.code == "0") {
            console.log('获取一级二级条件成功')
            this.MethodDetails = response.data.data
            var c = this.MethodDetails.modelTypeLayer1Code
            var d = this.MethodDetails.modelTypeLayer2Code
            var a = parseInt(c)
            var b = parseInt(d)
            this.chooseVue(a, b, t)
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });


    },
    //根据一级条件二级条件切换Vue
    chooseVue(a, b, t) {
      console.log('选tab')
      switch (a) {
        case 1:
          //console.log(this.methodID);
          this.activeMethod1 = 'A'
          this.methodID1 = t;
          this.methodName1 = mstj;
          break;
        case 2:
          this.activeMethod1 = 'B'
          this.chooseVue1(b, t);
          break;
        case 3:
          this.activeMethod1 = 'C'
          this.chooseVue2(b, t);
          break;
        case 4:
          this.activeMethod1 = 'D'
          this.methodID4 = t;
          this.methodName4 = linearregression;
          break;
        case 5:
          this.activeMethod1 = 'E'
          this.methodID5 = t;
          this.methodName5 = logicregression;
          break;
        case 6:
          this.activeMethod1 = 'F'
          this.methodID6 = t;
          this.methodName6 = svmanalysis;
          break;
        case 7:
          this.activeMethod1 = 'G'
          this.methodID7 = t;
          this.methodName7 = bayesiannetworks;
          break;
        case 8:
          this.activeMethod1 = 'H'
          this.methodID8 = t;
          this.methodName8 = decisiontree;
          break;
        default:
          break;

      }

    },
    chooseVue1(b, t) {
      console.log('进入t检验选择')

      switch (b) {
        case 1:
          this.activeMethod2 = "a";
          //单样本t检验
          this.methodID2_1 = t;
          this.methodName2_1 = ttest_one;
          break;
        case 2:
          this.activeMethod2 = "b";
          this.methodID2_2 = t;
          this.methodName2_2 = ttest_independent;
          break;
        case 3:
          this.activeMethod2 = "c";
          this.methodID2_3 = t;
          this.methodName2_3 = ttest_paired;
          break;
        default:
          break;
      }
    },
    chooseVue2(b, t) {
      switch (b) {
        case 1:
          this.activeMethod3 = "d";
          this.methodID3_1 = t;
          this.methodName3_1 = oneway_anova;

          break;
        case 2:
          this.activeMethod3 = "e";
          this.methodID3_2 = t;
          this.methodName3_2 = multifactor_analysis;
          break;
        default:
          break;
      }    },
    //删除
    Delete(index) {
      this.ModelTable.splice(index, 1)
      // axios.post('/model/delete', {
      //   "token": this.GLOBAL.token,
      //   "modelId": this.ModelTable[index].modelId
      // })
      //   .then(response => {
      //     if (response.data.code == "0") {
      //       this.$alert('删除成功！', '提示', { confirmButtonText: '确定' });
      //       this.getModlelist()
      //     }
      //   })
      //   .catch(function (error) {
      //     console.log("error", error);
      //   });




    },
    NewModel: function () {
      this.NewModelVisible = true
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
    gonewVariable() {
      this.$router.push({
        path: 'newvariable',
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
  }
}
</script>

<style>
</style>