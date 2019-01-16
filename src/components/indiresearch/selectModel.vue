<template>
  <div>
    <el-steps :active="3"
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
    <el-row>

      <el-col :span="16"
              :offset="4">
        已选模型：
        <el-button @click="NewModel">新建模型</el-button>
        <el-table :data="ModelTable"
                  style="width:60%;"
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
              <el-button size="mini"
                         type="primary"
                         @click="Edit(scope.$index)">编辑</el-button>
              <el-button size="mini"
                         @click="Delete(scope.$index)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-col>
    </el-row>
    <el-button>保存</el-button></br>

    <el-button>开始分析</el-button>

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
      ModelTable: [{ modelId: 1, name: 'svmsss', type: "SVM" }],

    }
  },

  methods: {
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
    //模型编辑删除 GYX
    Edit(index) {

    },
    Delete(index) {

    },
    NewModel: function () {
      this.NewModelVisible = true
    },

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