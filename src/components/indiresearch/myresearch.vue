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
                         @click="NewMethodVisible=true">新建方法</el-button>
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
                      <span :class="[data.id > method_maxexpandId ? 'slot-t-node--label' : '']">{{ node.label }}</span>
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
                                :ref="'slotTreeInput_method'+data.id"
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
      <el-tabs :value="NewVarTabs">
        <el-tab-pane label="新增变量"
                     name="NewVariable">
        </el-tab-pane>
        <el-tab-pane label="变量列表"
                     name="VarList">
          <el-row>
            <el-col :span=24
                    :offset=1>
              <el-table :data="VariableTable"
                        style="width:90%"
                        stripe
                        border>
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
                                 min-width="120%">
                  <template slot-scope="scope">
                    <el-button size="mini"
                               type="primary"
                               @click="EditVar(scope.$index)">编辑</el-button>
                    <el-button size="mini"
                               @click="CancelVar(scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="NewVarVisible = false">确 定</el-button>
      </span>
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

    <!--顾忆芯  2018/12/13 构建方法，统一了组合框 -->

    <el-dialog :visible.sync="NewMethodVisible"
               width="50%"
               height="80%"
               :before-close="handleClose">

      <el-tabs :tab-position="tabPosition"
               type="border-card"
               @tab-click="handleClick">

        <el-tab-pane name="A"
                     label="描述性分析">

          <div id="1">
            <component :is="methodName"></component>
          </div>

        </el-tab-pane>
        <el-tab-pane name="B "
                     label="t检验">
          <el-tabs @tab-click="handleClick2">
            <el-tab-pane name="a"
                         label="单样本t检验">
              <div id="2-1">
                <component :is="methodName"></component>
              </div>
            </el-tab-pane>
            <el-tab-pane name="b"
                         label="独立样本t检验">
              <div id="2-2">
                <component :is="methodName"></component>
              </div>
              独立样本t检验
            </el-tab-pane>
            <el-tab-pane name="c"
                         label="配对样本t检验">
              <div id="2-3">
                <component :is="methodName"></component>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane name="C"
                     label="方差分析">
          <el-tabs @tab-click="handleClick3">
            <el-tab-pane name="d"
                         label="单因素方差分析">
              <div id="3-1">
                <component :is="methodName"></component>
              </div>
            </el-tab-pane>
            <el-tab-pane name="e"
                         label="多因素方差分析">
              <div id="3-2">
                <component :is="methodName"></component>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane name="D"
                     label="线性回归">
          <div id="4">
            <component :is="methodName"></component>
          </div>
        </el-tab-pane>
        <el-tab-pane name="E"
                     label="逻辑回归">
          <div id="5">
            <component :is="methodName"></component>
          </div>
        </el-tab-pane>
        <el-tab-pane name="F"
                     label="SVM">
          <div id="6">
            <component :is="methodName"></component>
          </div>
        </el-tab-pane>
        <el-tab-pane name="G"
                     label="贝叶斯网络">
          <div id="7">
            <component :is="methodName"></component>
          </div>
        </el-tab-pane>
        <el-tab-pane name="H"
                     label="决策树">
          <div id="8">
            <component :is='methodName'></component>
          </div>
        </el-tab-pane>
      </el-tabs>

    </el-dialog>

  </div>
</template>
<script>

import axios from 'axios';
import echarts from 'echarts';

import createconceptset from './createconceptset/createconceptset.vue';
import draggable from 'vuedraggable';
import Vue from 'vue';
import firstanalysis from './methodform/firstanalysis.vue'
import bayesiannetworks from './methodform/bayesiannetworks.vue'
import decisiontree from './methodform/decisiontree.vue'
import independent_ttest from './methodform/independent_ttest.vue'
import linearregression from './methodform/linearregression.vue'
import logicregression from './methodform/logicregression.vue'
import multifactor_analysis from './methodform/multifactor_analysis.vue'
import onesample_ttest from './methodform/onesample_ttest.vue'
import oneway_anova from './methodform/oneway_anova.vue'
import pairedsample_ttest from './methodform/pairedsample_ttest.vue'
import svmanalysis from './methodform/svmanalysis.vue'

// import firstanalysisVue from './methodform/firstanalysis.vue';
// import firstanalysis from './methodform/firstanalysis.vue'
// import bayesiannetworks from './methodform/bayesiannetworks.vue'
// import decisiontree from './methodform/decisiontree.vue'
// import independent_ttest from './methodform/independent_ttest.vue'
// import linearregression from './methodform/linearregression.vue'
// import logicregression from './methodform/logicregression.vue'
// import multifactor_analysis from './methodform/multifactor_analysis.vue'
// import onesample_ttest from './methodform/onesample_ttest.vue'
// import oneway_anova from './methodform/oneway_anova.vue'
// import pairedsample_ttest from './methodform/pairedsample_ttest.vue'
// import svm from './methodform/svm.vue'


export default {
  components: {
    'firstanalysis': firstanalysis,
    'bayesiannetworks': bayesiannetworks,
    'decisiontree': decisiontree,
    'independent_ttest': independent_ttest,
    'linearregression': linearregression,
    'logicregression': logicregression,
    'multifactor_analysis': multifactor_analysis,
    'onesample_ttest': onesample_ttest,
    'oneway_anova': oneway_anova,
    'pairedsample_ttest': pairedsample_ttest,
    'svmanalysis': svmanalysis,
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
      methodName: '',
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
      tableData: [{
        quene: '队列A',
        method: 'SVM',
      }],
      // 概念集假数据/RH
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
        path: 'createCohort',
      });
    },
    toNewVariable: function () {
      this.NewVarVisible = true
      this.getVariableTable()
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
    // 新增变量弹框


    // 新增变量弹框 dwx
    getVariableTable() {
      axios.get('/feature/getList', {
        params: {
          "token": this.GLOBAL.token
        }
      })
        .then((response) => {
          this.VariableTable = response.data.data
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },

    CancelVar(index) {
      axios.post('/feature/deleteFeature', {
        "token": this.GLOBAL.token,
        "featureId": this.VariableTable[index].featureId
      })
        .then(response => {
          if (response.data.code == "0") {
            this.$alert('删除成功！', '提示', { confirmButtonText: '确定' });
            this.getVariableTable()
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    EditVar(index) {

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

    //以下为切换tab
    handleClick(tab, event) {
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
        // case 'first':
        //   console.log('第一');
        //   // this.methodName='firstanalysis';
        //   break;
        case "A":
          console.log('描述统计');
          this.methodName = firstanalysis;
          break;
        case "a":
          console.log('单样本t检验');
          this.methodName = onesample_ttest;
          break;
        case "b":
          console.log('独立样本t检验');
          this.methodName = independent_ttest;
          break;
        case "c":
          console.log('配对样本t检验');
          this.methodName = pairedsample_ttest;
          break;
        case "d":
          console.log('单因素方差');
          this.methodName = oneway_anova;

          break;
        case "e":
          console.log('多因素方差');
          this.methodName = multifactor_analysis;
          break;
        case 'D':
          console.log('线性回归');
          this.methodName = linearregression;
          break;
        case 'E':
          console.log('逻辑回归');
          this.methodName = logicregression;
          break;
        case 'F':
          console.log("SVM")
          this.methodName = svmanalysis;
          break;
        case "G":
          console.log('贝叶斯');
          this.methodName = bayesiannetworks;
          break;
        case "H":
          console.log('决策树');
          this.methodName = decisiontree;
          break;

        default:
          break;
      }
    },

    // 队列统计（未完）/RH
    cohortstatistic(cohortId) {
      console.log(this.$route.params.researchId)
      console.log(cohortId)
      if (cohortId == undefined) { this.$message.warning("请选择统计队列！") }
      else {
        for (var i = 0; i < this.dynamicTags.length; i++) { console.log(this.dynamicTags[i].featureId) }
        // 定性！

        axios.post('/cohort/statInfo', ({
          "token": this.GLOBAL.token,
          "cohortId": "1",
          "organizationCode": "1",
          "featureId": "23"
        }))
          .then(response => {
            console.log(response)
            axios.post('/result/createResearch2CohortStatInfo', ({
              "token": this.GLOBAL.token,
              "researchTypeTag": "1",
              "researchId": this.$route.params.researchId,
              "userId": this.GLOBAL.userId,
              "cohortId": "1",
              "featureId": "23"
            }))
              .then(response2 => {
                if ((response.data.code == 0) && (response2.data.code == 0)) {
                  this.$message.success("开始统计！")
                  setTimeout(function () {
                    // 基于准备好的dom，初始化echarts实例
                    var myChart = echarts.init(document.getElementById('echartContainer1'));
                    // 绘制图表
                    myChart.setOption({
                      title: { text: '队列统计结果' },
                      tooltip: {},
                      xAxis: {
                        data: ["0-1", "1-2", "2-3", "3-4", "4-5"]
                      },
                      yAxis: {},
                      series: [{
                        type: 'bar',
                        data: JSON.parse(response.data.data.histogramData)
                      }]
                    });
                  }, 1000);
                }
              })
          })
        // 定量！

        axios.post('/cohort/statInfo', ({
          "token": this.GLOBAL.token,
          "cohortId": "1",
          "organizationCode": "1",
          "featureId": "18"
        }))
          .then(response => {
            console.log(response)
            axios.post('/result/createResearch2CohortStatInfo', ({
              "token": this.GLOBAL.token,
              "researchTypeTag": "1",
              "researchId": this.$route.params.researchId,
              "userId": this.GLOBAL.userId,
              "cohortId": "1",
              "featureId": "18"
            }))
              .then(response2 => {
                console.log(response2)
                if ((response.data.code == 0) && (response2.data.code == 0)) {                  this.$message.success("开始统计！")
                  setTimeout(function () {
                    // 基于准备好的dom，初始化echarts实例
                    var myChart = echarts.init(document.getElementById('echartContainer2'));
                    // 绘制图表
                    myChart.setOption({
                      title: { text: '队列统计结果' },
                      tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                      },
                      series: [
                        {
                          type: 'pie',
                          radius: '55%',
                          center: ['50%', '50%'],
                          data: [
                            { value: JSON.parse(response.data.data.positiveNo), name: '正样本' },
                            { value: JSON.parse(response.data.data.positiveNo), name: '负样本' },
                          ].sort(function (a, b) { return a.value - b.value; }),
                          roseType: 'radius',
                          label: {
                            normal: {
                              textStyle: {
                                color: 'rgba(0, 0, 0, 1)'
                              }
                            }
                          },
                        }
                      ]
                    });
                  }, 1000);
                }

              })
          })
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
