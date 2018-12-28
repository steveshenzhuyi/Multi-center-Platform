<template>
  <div onselectstart="return false">
    <el-row :gutter="20"
            style="margin-top:15px;margin-bottom:10px;">
      <el-col :span="6">
        <!-- 概念集模块/RH by lqh-->
        <el-row>
          <el-card class="box-card"
                   style="text-align:center;font-size:13px;height:100%">
            <div slot="header"
                 style="height:12px;"
                 class="clearfix">
              <span>概念集</span>
            </div>
            <div class="expand">
              <el-button size="mini"
                         @click="handleAddTop_concept">添加新文件夹</el-button>
              <el-button type="primary"
                         size="mini"
                         @click="createConceptVisible = true">新建概念集</el-button>
              <div class="slot-tree">
                <el-tree ref="SlotMenuList"
                         class="expand-tree"
                         v-if="isLoadingTree"
                         default-expand-all
                         node-key="id"
                         draggable
                         @node-drop="handleDrop"
                         :allow-drop="allowDrop"
                         :allow-drag="allowDrag"
                         :data="conceptsets"
                         :props="defaultProps"
                         :expand-on-click-node="false">
                  <span class="slot-t-node"
                        slot-scope="{ node, data }">
                    <!-- 未编辑状态 -->
                    <span v-show="!node.isEdit">
                      <span :class="[data.id > concept_maxexpandId ? 'slot-t-node--label' : '']"
                            @click="dialogVisible = true">{{ node.label }}</span>
                      <el-dialog title="提示"
                                 :visible.sync="dialogVisible"
                                 width="30%"
                                 :before-close="handleClose">
                        <span>这是一段信息</span>
                        <span slot="footer"
                              class="dialog-footer">
                          <el-button @click="dialogVisible = false">取 消</el-button>
                          <el-button type="primary"
                                     @click="dialogVisible = false">确 定</el-button>
                        </span>
                      </el-dialog>
                      <span class="slot-t-icons">
                        <!-- 新增按钮 -->
                        <!--i class="el-icon-plus"
                         @click="NodeAdd(node, data)"></i-->
                        <!-- 编辑按钮 -->
                        <i class="el-icon-edit"
                           @click="NodeEdit_concept(node, data)"></i>
                        <!-- 删除按钮 -->
                        <i class="el-icon-delete"
                           @click="NodeDel_concept(node, data)"></i>
                      </span>
                    </span>
                    <!-- 编辑输入框 -->
                    <span v-show="node.isEdit">
                      <el-input class="slot-t-input"
                                size="mini"
                                autofocus
                                v-model="data.label"
                                :ref="'slotTreeInput_concept'+data.id"
                                @blur.stop="NodeBlur(node, data)"
                                @keyup.enter.native="NodeBlur(node, data)"></el-input>
                    </span>
                  </span>
                </el-tree>
              </div>
            </div>
          </el-card>
        </el-row>

        <!-- 队列模块/RH -->
        <el-row>
          <el-card class="box-card"
                   style="text-align:center;font-size:13px;height:100%">
            <div slot="header"
                 style="height:12px;"
                 class="clearfix">
              <span>个人队列</span>
            </div>
            <el-button size="mini"
                       @click="handleAddTop_cohort">添加新文件夹</el-button>
            <el-button type="primary"
                       size="mini"
                       @click="toCreatecohort">新建队列</el-button>
            <div class="slot-tree">
              <el-tree ref="SlotMenuList"
                       class="expand-tree"
                       v-if="isLoadingTree"
                       default-expand-all
                       node-key="id"
                       draggable
                       @node-drop="handleDrop"
                       :allow-drop="allowDrop"
                       :allow-drag="allowDrag"
                       :data="cohortsets"
                       :props="defaultProps"
                       :expand-on-click-node="false">
                <span class="slot-t-node"
                      slot-scope="{ node, data }">
                  <!-- 未编辑状态 -->
                  <span v-show="!node.isEdit">

                    <span :class="[data.id > cohort_maxexpandId ? 'slot-t-node--label' : '']">{{ node.label }}</span>
                    <span class="slot-t-icons">
                      <!-- 新增按钮 -->
                      <!--i class="el-icon-plus"
                         @click="NodeAdd(node, data)"></i-->
                      <!-- 编辑按钮 -->
                      <i class="el-icon-edit"
                         @click="NodeEdit_cohort(node, data)"></i>
                      <!-- 删除按钮 -->
                      <i class="el-icon-delete"
                         @click="NodeDel_cohort(node, data)"></i>
                    </span>
                  </span>
                  <!-- 编辑输入框 -->
                  <span v-show="node.isEdit">
                    <el-input class="slot-t-input"
                              size="mini"
                              autofocus
                              v-model="data.label"
                              :ref="'slotTreeInput_cohort'+data.id"
                              @blur.stop="NodeBlur(node, data)"
                              @keyup.enter.native="NodeBlur(node, data)"></el-input>
                  </span>
                </span>
              </el-tree>
            </div>
          </el-card>
        </el-row>

        <!-- 分析模块/RH -->
        <!--分析模块删除编辑/ GYX -->
        <el-row>
          <el-card class="box-card"
                   style="text-align:center;font-size:13px;height:100%">
            <div slot="header"
                 style="height:12px;"
                 class="clearfix">
              <span>分析方法</span>
            </div>
            <div class="expand">
              <el-button size="mini"
                         @click="handleAddTop_method">添加新文件夹</el-button>
              <el-button type="primary"
                         size="mini"
                         @click="NewMethod">新建方法</el-button>
              <div class="slot-tree">
                <el-tree ref="SlotMenuList"
                         class="expand-tree"
                         v-if="isLoadingTree"
                         default-expand-all
                         node-key="id"
                         @node-drop="handleDrop"
                         draggable
                         :allow-drop="allowDrop"
                         :allow-drag="allowDrag"
                         :data="analysismethods"
                         :props="defaultProps"
                         :expand-on-click-node="false">

                  <span class="slot-t-node"
                        slot-scope="{ node, data }">
                    <!-- 未编辑状态 -->
                    <span v-show="!node.isEdit">

                      <span :class="[data.id > method_maxexpandId ? 'slot-t-node--label' : '']"
                            @click="editMethod(node,data)">{{ node.label }}</span>
                      <span class="slot-t-icons">
                        <!-- 新增按钮 -->
                        <!--i class="el-icon-plus"
                         @click="NodeAdd(node, data)"></i-->
                        <!-- 编辑按钮 -->
                        <i class="el-icon-edit"
                           @click="NodeEdit_method(node, data)"></i>
                        <!-- 删除按钮 -->
                        <i class="el-icon-delete"
                           @click="NodeDel_method(node, data)"></i>
                      </span>
                    </span>
                    <!-- 编辑输入框 -->
                    <span v-show="node.isEdit">
                      <el-input class="slot-t-input"
                                size="mini"
                                autofocus
                                v-model="data.label"
                                :ref="'slotTreeInput_cohort'+data.id"
                                @blur.stop="NodeBlur(node, data)"
                                @keyup.enter.native="NodeBlur(node, data)"></el-input>
                    </span>
                  </span>

                </el-tree>
              </div>
            </div>

          </el-card>
        </el-row>
      </el-col>
      <el-col :span="18">
        <!-- 构建模块/RH  -->
        <el-row>
          <el-card class="box-card"
                   style="height:100%">
            <el-tabs v-model="activeName"
                     style="margin-top:-10px">
              <el-tab-pane label="队列统计"
                           name="cohortstatistic">
                <el-select v-model="cohortstatisticdata.cohortId"
                           placeholder="请选择">
                  <el-option-group v-for="cohort in cohortsets"
                                   :key="cohort.id"
                                   :label="cohort.label">
                    <el-option v-for="item in cohort.children"
                               :key="item.id"
                               :label="item.label"
                               :value="item.id">
                    </el-option>
                  </el-option-group>
                </el-select>
                <!-- <el-autocomplete class="inline-input"
                                 v-model="state1"
                                 :fetch-suggestions="querySearch"
                                 placeholder="请输入内容"
                                 @select="handleSelect"></el-autocomplete> -->
                <!-- 变量标签/RH -->
                <el-tag :key="selectedvariable.featureId"
                        v-for="selectedvariable in dynamicTags"
                        closable
                        :disable-transitions="false"
                        @close="taghandleClose(selectedvariable.name)">
                  {{selectedvariable.name}}
                </el-tag>
                <el-input class="input-new-tag"
                          v-if="inputVisible"
                          v-model="inputValue"
                          ref="saveTagInput"
                          size="small"
                          @keyup.enter.native="handleInputConfirm"
                          @blur="handleInputConfirm">
                </el-input>
                <!-- <el-button v-else
                           class="button-new-tag"
                           size="small"
                           @click="showInput">+ New Tag</el-button> -->

                <el-button type="primary"
                           @click="toNewVariable()">新增变量</el-button>
                <el-button style="float:right;margin-bottom:5px;margin-top:5px"
                           type="primary"
                           @click="cohortstatistic(cohortstatisticdata.cohortId)">统计</el-button>
              </el-tab-pane>
              <el-tab-pane label="队列分析"
                           name="cohortanalysis">
                <el-select v-model="cohortanalysisdata.cohortId"
                           placeholder="请选择">
                  <el-option-group v-for="cohort in cohortsets"
                                   :key="cohort.id"
                                   :label="cohort.label">
                    <el-option v-for="item in cohort.children"
                               :key="item.id"
                               :label="item.label"
                               :value="item.id">
                    </el-option>
                  </el-option-group>
                </el-select>
                <el-select v-model="cohortanalysisdata.modelId"
                           placeholder="请选择">
                  <el-option-group v-for="method in analysismethods"
                                   :key="method.id"
                                   :label="method.label">
                    <el-option v-for="item in method.children"
                               :key="item.id"
                               :label="item.label"
                               :value="item.id">
                    </el-option>
                  </el-option-group>
                </el-select>

                <el-button style="float:right;margin-bottom:5px;margin-top:5px"
                           type="primary"
                           @click="cohortanalysis(cohortanalysisdata.cohortId,cohortanalysisdata.modelId)">分析</el-button>

              </el-tab-pane>
            </el-tabs>
          </el-card>

        </el-row>

        <!-- 分析结果模块/RH -->
        <el-row>
          <el-card class="box-card"
                   style="height:100%">
            <div slot="header"
                 style="height:12px;font-size:13px;"
                 class="clearfix">
              <span>分析结果</span>
            </div>
            <ul id="containerlist">
              <li>
                <div id="echartContainer1"
                     style="width:500px; height:500px"></div>
              </li>
              <li>
                <div id="echartContainer2"
                     style="width:500px; height:500px"></div>
              </li>
            </ul>
            <el-button v-show="ifsave"
                       style="float:right;margin-bottom:20px;margin-top:480px"
                       type="primary"
                       @click="saveresult=true">保存</el-button>
          </el-card>

        </el-row>
      </el-col>
    </el-row>
    <el-dialog title="保存结果"
               :visible.sync="saveresult"
               width="30%"
               :before-close="handleClose">
      <el-form>
        <el-form-item label="结果名称："
                      :label-width="formLabelWidth">
          <el-input placeholder="请输入结果名称"
                    v-model="saveresultname"
                    clearable>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="saveresult = false">取 消</el-button>
        <el-button type="primary"
                   @click="saveresult = false;tosaveresult(saveresultname)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新建变量 dwx -->
    <el-dialog title="新建变量"
               :visible.sync="NewVarVisible"
               width="50%"
               :before-close="handleClose">
      <component :is="NewVariable"
                 ref="NewVariable"
                 @GetNewVarVisiable="GetNewVarVisiable"
                 @GetVarSelection="GetVarSelection"></component>
    </el-dialog>

    <!--新增概念集 by lqh—-->
    <el-dialog title="新增概念集"
               :visible.sync="createConceptVisible"
               width="60%"
               :before-close="handleClose">
      <component :is="mycreateconceptset"
                 @getdata="getMultipleSelection"
                 @getdata1="getExcludeditems"
                 @getdata2="getChilerenConcepts"
                 @getdata3="getConceptName"
                 @getdata4="getConceptDes"></component>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="createConceptVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="postConceptData()">确 定</el-button>
      </span>
    </el-dialog>

    <!--GYX  2018/12/13 构建方法，统一了组合框 -->
    <div v-if="NewMethodVisible">
      <el-dialog :visible.sync="NewMethodVisible"
                 width="50%"
                 height="80%"
                 :before-close="handleClose">

        <el-tabs :tab-position="tabPosition"
                 type="border-card"
                 v-model="activeMethod1"
                 @tab-click="handleClick">

          <el-tab-pane name="A"
                       label="描述性分析">

            <component :is="methodName1"
                       :mid="methodID"></component>

          </el-tab-pane>
          <el-tab-pane name="B"
                       label="t检验">
            <el-tabs @tab-click="handleClick2"
                     v-model="activeMethod2">
              <el-tab-pane name="a"
                           label="单样本t检验">

                <component :is="methodName2_1"
                           :mid="methodID"></component>

              </el-tab-pane>
              <el-tab-pane name="b"
                           label="独立样本t检验">

                <component :is="methodName2_2"
                           :mid="methodID"></component>

              </el-tab-pane>
              <el-tab-pane name="c"
                           label="配对样本t检验">

                <component :is="methodName2_3"
                           :mid="methodID"></component>

              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane name="C"
                       label="方差分析">
            <el-tabs @tab-click="handleClick3"
                     v-model="activeMethod3">
              <el-tab-pane name="d"
                           label="单因素方差分析">

                <component :is="methodName3_1"></component>

              </el-tab-pane>
              <el-tab-pane name="e"
                           label="多因素方差分析">

                <component :is="methodName3_2"></component>

              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane name="D"
                       label="线性回归">

            <component :is="methodName4"></component>

          </el-tab-pane>
          <el-tab-pane name="E"
                       label="逻辑回归">

            <component :is="methodName5"></component>

          </el-tab-pane>
          <el-tab-pane name="F"
                       label="SVM">

            <component :is="methodName6"></component>

          </el-tab-pane>
          <el-tab-pane name="G"
                       label="贝叶斯网络">

            <component :is="methodName7"></component>

          </el-tab-pane>
          <el-tab-pane name="H"
                       label="决策树">

            <component :is='methodName8'></component>

          </el-tab-pane>
        </el-tabs>

      </el-dialog>

    </div>
    <!--编辑对话框-->

  </div>
</template>
<script>

import axios from 'axios';
import echarts from 'echarts';

import createconceptset from './createconceptset/createconceptset.vue';
import draggable from 'vuedraggable';
import Vue from 'vue';
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


import NewVariable from './newvariable/newvariable.vue'


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
    'NewVariable': NewVariable,
    'createconceptset': createconceptset
  },
  data() {
    return {
      activeName: 'cohortstatistic',
      formLabelWidth: "90px",
      cohortstatisticdata: {},
      cohortanalysisdata: {},
      selectedvariable: [],
      dialogVisible: false,

      saveresult: false,
      saveresultname: '',
      mycreateconceptset: createconceptset,
      conceptSetName: '',
      conceptSetDes: '',
      Excludeditems: [],
      ChilerenConcepts: [],
      multipleSelection: [],
      concepts: [],
      concept_exist: false,
      researchstatus: this.$route.query.researchstatus,
      createConceptVisible: false,
      NewVarVisible: false,
      NewMethodVisible: false,
      NewVariable: NewVariable,
      tableData: [{
        quene: '队列A',
        method: 'SVM',
      }],
      // 概念集假数据/RH
      formLabelWidth: '90px',
      concept_maxexpandId: 3,//新增节点开始id
      non_concept_maxexpandId: 3,//新增节点开始id(不更改)
      cohort_maxexpandId: 3,//新增节点开始id
      non_cohort_maxexpandId: 3,//新增节点开始id(不更改)
      method_maxexpandId: 3,//新增节点开始id
      non_method_maxexpandId: 3,//新增节点开始id(不更改)
      isLoadingTree: true,//是否加载节点树
      conceptsets: [],
      cohortsets: [],
      analysismethods: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      NewMethodVisible: false,
      tabPosition: "left",
      checked: true,
      // 新增变量弹框 dwx
      NewVarTabs: "NewVariable",
      VariableTable: [],

      //GYX 模型一级 二级条件  methodname重新命名
      //methodName: '',
      MethodDetails: '',
      activeMethod1: '',
      //methodName: '',
      activeMethod2: 'a',
      activeMethod3: 'd',
      // modelID: '',

      methodID: -1,
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

      VarSelection: [],
      // 增加变量标签初始化/RH
      dynamicTags: [
        // {
        //   "featureId": 1,
        //   "name": "性别"
        // },
        // {
        //   "featureId": 2,
        //   "name": "年龄"
        // },
      ],
      inputVisible: false,
      inputValue: '',
      ifsave: false,
      cohortidnow: "",
      modelidnow: "",
    };
  },
  mounted() {
    // console.log(this.GLOBAL.token)
    this.getConceptsetsData();
    this.getcohortsetsData();
    this.getAnalysismethodsData();
  },
  methods: {
    getConceptsetsData() {
      axios.get('/structure/getStructure', {
        params: {
          "token": this.GLOBAL.token
        }
      })
        .then((response) => {
          //console.log(response)
          this.conceptsets = JSON.parse(response.data.data.conceptSetStructure)
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    getcohortsetsData() {
      axios.get('/structure/getStructure', {
        params: {
          "token": this.GLOBAL.token
        }
      })
        .then((response) => {
          this.cohortsets = JSON.parse(response.data.data.privateCohortStructure)
          this.cohortsets[0].tag = '0'
          this.cohortsets[0].children[0].tag = '1'
          this.cohortsets[0].children[1].tag = '1'
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    getAnalysismethodsData() {
      axios.get('/structure/getStructure', {
        params: {
          "token": this.GLOBAL.token
        }
      })
        .then((response) => {
          this.analysismethods = JSON.parse(response.data.data.modelStructure)
          this.analysismethods[0].tag = '0'
          this.analysismethods[0].children[0].tag = '1'
          this.analysismethods[0].children[1].tag = '1'
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    getConceptName(val) {
      this.conceptSetName = val;
    },
    getConceptDes(val) {
      this.conceptSetDes = val;
    },
    getExcludeditems(val) {
      this.Excludeditems = val;
      //console.log(this.Excludeditems)
    },
    getChilerenConcepts(val) {
      this.ChilerenConcepts = val;
      //console.log(this.ChilerenConcepts)
    },
    getMultipleSelection(val) {
      this.multipleSelection = val;
      //console.log(this.multipleSelection)
    },
    postConceptData() {
      this.createConceptVisible = false;
      this.concepts = [];
      for (var i = 0; i < this.multipleSelection.length; i++) {
        this.concepts.push({
          conceptCode: this.multipleSelection[i].subject,
          excludeTag: "0",
          childTag: "0"
        });
      }
      for (var i = 0; i < this.Excludeditems.length; i++) {
        this.concept_exist = false;
        var a = []
        a = this.Excludeditems[i].split('#')
        for (var j = 0; j < this.concepts.length; j++) {
          if (a[0].indexOf(this.concepts[j].conceptCode) != -1) {
            this.concept_exist = true;
            this.concepts[j].excludeTag = "1"
          }
        }
        if (!this.concept_exist) {
          this.concepts.push({
            conceptCode: a[0],
            excludeTag: "1",
            childTag: "0"
          });
        }
      }
      for (var i = 0; i < this.ChilerenConcepts.length; i++) {
        this.concept_exist = false;
        var a = []
        a = this.ChilerenConcepts[i].split('#')
        for (var j = 0; j < this.concepts.length; j++) {
          if (a[0].indexOf(this.concepts[j].conceptCode) != -1) {
            this.concept_exist = true;
            this.concepts[j].childTag = "1"
          }
        }
        if (!this.concept_exist) {
          this.concepts.push({
            conceptCode: a[0],
            excludeTag: "0",
            childTag: "1"
          });
        }
      }
      axios.post('/conceptSet/createConceptSet?token=' + this.GLOBAL.token, ({
        "conceptSetName": this.conceptSetName,
        "conceptSetDes": this.conceptSetDes,
        "concepts": this.concepts,
      }))
        .then(response => {
          if (response.data.code == "0") {
            this.$message.success("新建成功！")
          }
        })
      console.log(this.concepts)
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    handleNodeClick(data) {
      // console.log(data);
    },
    toCreatecohort() {
      this.$router.push({
        path: 'createqueue',
      });
    },
    toNewVariable: function () {
      this.NewVarVisible = true
      // this.$refs.NewVariable.Initialize()
      setTimeout(() => {
        this.$refs.NewVariable.Initialize();
      })
      // if (this.$refs['VarForm'] !== undefined) {
      //   this.VarResetFields()
      // }
      // this.GetVariableLayer1()
      // this.GetVariableSample()
      // this.GetVariableTable()
    },
    //概念集资源结构编辑函数
    handleAddTop_concept() {
      this.conceptsets.push({
        id: ++this.concept_maxexpandId,
        label: '新增文件夹',
        children: [],
        tag: "0"
      });
      axios.post('/structure/updateStructure?token=' + this.GLOBAL.token, ({
        "conceptSetStructure": JSON.stringify(this.conceptsets),
        "privateCohortStructure": "[]",
        "collaborationCohortStructure": JSON.stringify(this.cohortsets),
        "modelStructure": JSON.stringify(this.analysismethods),
        "featureStructure": "[]",
        "resultStructure": "[]"
      }))
        .then(response => {
          if (response.data.code == "0") {
            this.$message.success("编辑成功！")
          }
        })
    },
    NodeBlur(n, d) {//输入框失焦
      //console.log(n, d)
      if (n.isEdit) {
        this.$set(n, 'isEdit', false)
      }
      axios.post('/structure/updateStructure?token=' + this.GLOBAL.token, ({
        "conceptSetStructure": JSON.stringify(this.conceptsets),
        "privateCohortStructure": "[]",
        "collaborationCohortStructure": JSON.stringify(this.cohortsets),
        "modelStructure": JSON.stringify(this.analysismethods),
        "featureStructure": "[]",
        "resultStructure": "[]"
      }))
        .then(response => {
          if (response.data.code == "0") {
            this.$message.success("编辑成功！")
          }
        })
    },
    NodeEdit_concept(n, d) {//编辑节点
      //console.log(n, d)
      if (!n.isEdit) {//检测isEdit是否存在or是否为false
        this.$set(n, 'isEdit', true)
      }
      this.$nextTick(() => {
        this.$refs['slotTreeInput_concept' + d.id].$refs.input.focus()
      })
    },
    NodeDel_concept(n, d) {//删除节点
      //console.log(n, d)
      let that = this;
      if (d.children && d.children.length !== 0) {
        this.$message.error("此节点有子级，不可删除！")
        return false;
      } else {
        //新增节点可直接删除，已存在的节点要二次确认
        //删除操作
        let DelFun = () => {
          let _list = n.parent.data.children || n.parent.data;//节点同级数据
          let _index = _list.map((c) => c.id).indexOf(d.id);
          //console.log(_index)
          _list.splice(_index, 1);
          this.$message.success("删除成功！")
          axios.post('/structure/updateStructure?token=' + this.GLOBAL.token, ({
            "conceptSetStructure": JSON.stringify(this.conceptsets),
            "privateCohortStructure": "[]",
            "collaborationCohortStructure": JSON.stringify(this.cohortsets),
            "modelStructure": JSON.stringify(this.analysismethods),
            "featureStructure": "[]",
            "resultStructure": "[]"
          }))
            .then(response => {
              if (response.data.code == "0") {
                //this.$message.success("编辑成功！")
              }
            })
        }
        //二次确认
        let ConfirmFun = () => {
          this.$confirm("是否删除此节点？", "提示", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            DelFun()
          }).catch(() => { })
        }
        //判断是否是新增节点
        d.id > this.non_concept_maxexpandId ? DelFun() : ConfirmFun()
      }
    },
    //队列资源结构编辑函数
    handleAddTop_cohort() {
      this.cohortsets.push({
        id: ++this.cohort_maxexpandId,
        label: '新增文件夹',
        children: [],
        tag: "0"
      });
    },
    NodeEdit_cohort(n, d) {//编辑节点
      console.log(n, d)
      if (!n.isEdit) {//检测isEdit是否存在or是否为false
        this.$set(n, 'isEdit', true)
      }
      this.$nextTick(() => {
        this.$refs['slotTreeInput_cohort' + d.id].$refs.input.focus()
      })
    },
    NodeDel_cohort(n, d) {//删除节点
      console.log(n, d)
      let that = this;
      if (d.children && d.children.length !== 0) {
        this.$message.error("此节点有子级，不可删除！")
        return false;
      } else {
        //新增节点可直接删除，已存在的节点要二次确认
        //删除操作
        let DelFun = () => {
          let _list = n.parent.data.children || n.parent.data;//节点同级数据
          let _index = _list.map((c) => c.id).indexOf(d.id);
          console.log(_index)
          _list.splice(_index, 1);
          this.$message.success("删除成功！")
          axios.post('/structure/updateStructure?token=' + this.GLOBAL.token, ({
            "conceptSetStructure": JSON.stringify(this.conceptsets),
            "privateCohortStructure": "[]",
            "collaborationCohortStructure": JSON.stringify(this.cohortsets),
            "modelStructure": JSON.stringify(this.analysismethods),
            "featureStructure": "[]",
            "resultStructure": "[]"
          }))
            .then(response => {
              if (response.data.code == "0") {
                //this.$message.success("编辑成功！")
              }
            })
        }
        //二次确认
        let ConfirmFun = () => {
          this.$confirm("是否删除此节点？", "提示", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            DelFun()
          }).catch(() => { })
        }
        //判断是否是新增节点
        d.id > this.non_cohort_maxexpandId ? DelFun() : ConfirmFun()
      }
    },

    //模型方法资源结构编辑函数
    handleAddTop_method() {
      this.analysismethods.push({
        id: ++this.method_maxexpandId,
        label: '新增文件夹',
        children: [],
        tag: "0"
      });
    },
    NodeEdit_method(n, d) {//编辑节点
      if (!n.isEdit) {//检测isEdit是否存在or是否为false
        this.$set(n, 'isEdit', true)
      }
      this.$nextTick(() => {
        this.$refs['slotTreeInput_method' + d.id].$refs.input.focus()
      })
    },
    NodeDel_method(n, d) {//删除节点
      console.log(n, d)
      let that = this;
      if (d.children && d.children.length !== 0) {
        this.$message.error("此节点有子级，不可删除！")
        return false;
      } else {
        //新增节点可直接删除，已存在的节点要二次确认
        //删除操作
        let DelFun = () => {
          let _list = n.parent.data.children || n.parent.data;//节点同级数据
          let _index = _list.map((c) => c.id).indexOf(d.id);
          console.log(_index)
          _list.splice(_index, 1);
          this.$message.success("删除成功！")
          axios.post('/structure/updateStructure?token=' + this.GLOBAL.token, ({
            "conceptSetStructure": JSON.stringify(this.conceptsets),
            "privateCohortStructure": "[]",
            "collaborationCohortStructure": JSON.stringify(this.cohortsets),
            "modelStructure": JSON.stringify(this.analysismethods),
            "featureStructure": "[]",
            "resultStructure": "[]"
          }))
            .then(response => {
              if (response.data.code == "0") {
                //this.$message.success("成功！")
              }
            })
        }
        //二次确认
        let ConfirmFun = () => {
          this.$confirm("是否删除此节点？", "提示", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            DelFun()
          }).catch(() => { })
        }
        //判断是否是新增节点
        d.id > this.non_method_maxexpandId ? DelFun() : ConfirmFun()
      }
    },
    // ------新增变量弹框 dwx------
    GetNewVarVisiable(val) {
      this.NewVarVisible = val
    },
    GetVarSelection(val) {
      this.VarSelection = val
      // console.log(this.VarSelection)
    },
    // handleChange2_2(value) {
    //   console.log(value);
    // },
    // handleChange2_3(value) {
    //   console.log(value);
    // },
    // handleChange3_1(value) {
    //   console.log(value);
    // },
    // handleChange3_2(value) {
    //   console.log(value);
    // },
    //队列拖拽所需
    handleDragStart(node, ev) {
      console.log('drag start', node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType);
    },
    //队列拖拽所需
    handleDrop(draggingNode, dropNode, dropType, ev) {
      axios.post('/structure/updateStructure?token=' + this.GLOBAL.token, ({
        "conceptSetStructure": JSON.stringify(this.conceptsets),
        "privateCohortStructure": "[]",
        "collaborationCohortStructure": JSON.stringify(this.cohortsets),
        "modelStructure": JSON.stringify(this.analysismethods),
        "featureStructure": "[]",
        "resultStructure": "[]"
      }))
        .then(response => {
          if (response.data.code == "0") {
            //this.$message.success("编辑成功！")
          }
        })
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.tag.indexOf('1') != -1) {
        return type !== 'inner';
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.tag.indexOf('0') === -1;
    },
    //GYX打开新建方法按钮，自动加载描述统计
    NewMethod: function () {
      this.NewMethodVisible = true;
      this.activeMethod1 = 'A';
      this.methodName1 = mstj;
      this.methodID = -1;

    },

    //以下为切换tab GYX 新建模型切换tab
    //默认进去描述统计
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

    // GYX  编辑分析方法
    // 获得方法的ID
    editMethod(n, d) {
      // 获得了ID,在这里直接对methodID赋值，同时获得ID一级条件二级条件
      if (d.tag.indexOf('0') === -1) {


        this.methodID = d.id;
        this.getMethodDetails(d.id);
        this.NewMethodVisible = true;
        // setTimeout(() => {
        //   this.$refs.mstj.Initialize();
        // })
        console.log('获得id'); console.log(this.methodID)

      }
    },
    //GYX 根据ID 获得一级二级条件
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
            this.chooseVue(a, b)
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });


    },
    //根据一级条件二级条件切换Vue
    chooseVue(a, b) {
      console.log('选tab')
      switch (a) {
        case 1:
          //console.log(this.methodID);
          this.activeMethod1 = 'A'
          this.methodName1 = mstj;
          break;
        case 2:
          this.activeMethod1 = 'B'
          this.chooseVue1(b);
          break;
        case 3:
          this.activeMethod1 = 'C'
          this.chooseVue2(b);
          break;
        case 4:
          this.activeMethod1 = 'D'
          this.methodName4 = linearregression;
          break;
        case 5:
          this.activeMethod1 = 'E'
          this.methodName5 = logicregression;
          break;
        case 6:
          this.activeMethod1 = 'F'
          this.methodName6 = svmanalysis;
          break;
        case 7:
          this.activeMethod1 = 'G'
          this.methodName7 = bayesiannetworks;
          break;
        case 8:
          this.activeMethod1 = 'H'
          this.methodName8 = decisiontree;
          break;
        default:
          break;

      }

    },
    chooseVue1(b) {
      console.log('进入t检验选择')

      switch (b) {
        case 1:

          this.activeMethod2 = "a";
          //单样本t检验
          this.methodName2_1 = ttest_one;
          break;
        case 2:
          this.activeMethod2 = "b";
          this.methodName2_2 = ttest_independent;
          break;
        case 3:
          this.activeMethod2 = "c";
          this.methodName2_3 = ttest_paired;
          break;
        default:
          break;
      }
    },
    chooseVue2(b) {
      switch (b) {
        case 1:
          this.activeMethod3 = "d";
          this.methodName3_1 = oneway_anova;

          break;
        case 2:
          this.activeMethod3 = "e";
          this.methodName3_2 = multifactor_analysis;
          break;
        default:
          break;
      }
    },
    // 队列分析（未完）/RH
    cohortanalysis(cohortId, modelId) {
      console.log("开始分析")
      if (cohortId == undefined) {        this.$message.warning("请选择分析队列！")
      } else if (modelId == undefined) { this.$message.warning("请选择计算模型！") } else {
        console.log(cohortId, modelId)
        this.cohortidnow = cohortId;
        this.modelidnow = modelId;
        this.$message.success("开始分析！")
        // 开始计算
        this.ifsave = true
      }
    },

    tosaveresult(saveresultname) {
      axios.post('/result/createResult', ({
        "token": this.GLOBAL.token,
        "researchTypeTag": "1",
        "researchId": this.$route.params.researchId,
        "name": saveresultname,
        "description": "test",
        "userId": this.GLOBAL.userId,
        "cohortId": this.cohortidnow,
        "cohortVersion": "1",
        "modelId": this.modelidnow,
        "modelVersion": "1",
        "modelTypeLayer1Code": "1",
        "modelTypeLayer2Code": "1",
        "resultTemplateVersion": "1",
        "organizationCode": this.GLOBAL.ORGANIZATIONCODE
      }))
        .then(response => {
          if (response.data.code == "0") {
            this.$message.success("保存成功")
          }
        })
    },
    // 删除变量/RH
    taghandleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    //新增变量（显示输入框）/RH
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 新增变量（确定新增）/RH
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push({
          "featureId": this.dynamicTags.length - 1,
          "name": inputValue        });
      }
      this.inputVisible = false;
      this.inputValue = '';
    }

  },
  components: {
    draggable
  },
};
</script>
<style>
.slot-tree {
  width: 100%;
  height: 80%;
  padding: 1em;
  max-width: 600px;
  overflow-y: auto;
}
/*顶部按钮*/
.slot-tree .slot-t-top {
  margin-bottom: 15px;
}
.slot-tree .slot-t-node span {
  font-size: 14px;
  display: inline-block;
}
/*节点*/
.slot-tree .slot-t-node--label {
  font-weight: 600;
}
/*输入框*/
.slot-tree .slot-t-input .el-input__inner {
  height: 26px;
  line-height: 26px;
}
/*按钮列表*/
.slot-tree .slot-t-node .slot-t-icons {
  display: none;
  position: absolute;
  left: 85%;
}
.slot-tree .el-tree-node__content:hover .slot-t-icons {
  display: inline-block;
}
.drag-cover {
  width: 100%;
  height: 10px;
}
.sifting-cohort-content {
  background: linear-gradient(to bottom, #eaeaea, #f9f9f9);
  border-radius: 5px;
  padding: 10px 0 0 10px;
  display: block;
}
.groupbox-boarder {
  border: 1px solid #ccc;
  box-shadow: 0px 0px 0px 0px #000;
}
.one-of-groupbox-boarder {
  padding: 0 10px;
  background-color: #428bca;
  color: #fffffb;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
#containerlist li {
  display: block;
  float: left;
  margin: 5px;
}
</style>
