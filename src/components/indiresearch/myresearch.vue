<template>
  <div>

    <el-row style="margin-top:15px;margin-bottom:10px;">

      <!-- 进度条/RH -->
      <el-col :span="20">
        <el-steps :active="researchstatus"
                  align-center>
          <el-step title="1 队列选择"></el-step>
          <el-step title="2 数据模型"></el-step>
          <el-step title="3 预测结果"></el-step>
          <el-step title></el-step>
        </el-steps>
      </el-col>
      <el-col :span="4">
        <el-button type="primary"
                   @click="toNewVariable()">新增变量</el-button>

      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <!-- 概念集模块/RH -->
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
                         @click="handleAddTop">添加新文件夹</el-button>
              <el-button type="primary"
                         size="mini"
                         @click="dialogVisible = true">新建概念集</el-button>
              <div>
                <el-tree ref="expandMenuList"
                         class="expand-tree"
                         v-if="isLoadingTree"
                         default-expand-all
                         :data="conceptsets"
                         node-key="id"
                         :props="defaultProps"
                         :expand-on-click-node="true"
                         :render-content="renderContent"
                         @node-drag-start="handleDragStart"
                         @node-drag-enter="handleDragEnter"
                         @node-drag-leave="handleDragLeave"
                         @node-drag-over="handleDragOver"
                         @node-drag-end="handleDragEnd"
                         @node-drop="handleDrop"
                         draggable
                         :allow-drop="allowDrop"
                         :allow-drag="allowDrag"
                         :default-expanded-keys="defaultExpandKeys"
                         @node-click="handleNodeClick"></el-tree>
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
              <span>队列</span>
            </div>

            <div class="expand">
              <el-button size="mini"
                         @click="handleAddTop">添加新文件夹</el-button>
              <el-button type="primary"
                         size="mini"
                         @click="toCreateQueue">新建队列</el-button>
              <div>
                <el-tree ref="expandMenuList"
                         class="expand-tree"
                         v-if="isLoadingTree"
                         :data="queuesets"
                         node-key="id"
                         :props="defaultProps"
                         :expand-on-click-node="true"
                         :render-content="renderContent"
                         :default-expanded-keys="defaultExpandKeys"
                         @node-click="handleNodeClick"
                         @node-drag-start="handleDragStart"
                         @node-drag-enter="handleDragEnter"
                         @node-drag-leave="handleDragLeave"
                         @node-drag-over="handleDragOver"
                         @node-drag-end="handleDragEnd"
                         @node-drop="handleDrop"
                         draggable
                         :allow-drop="allowDrop"
                         :allow-drag="allowDrag"
                         default-expand-all></el-tree>
              </div>
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
                         @click="handleAddTop">添加新文件夹</el-button>
              <el-button type="primary"
                         size="mini"
                         @click="NewMethodVisible=true">新建方法</el-button>
              <div>

                <el-tree ref="expandMenuList"
                         class="expand-tree"
                         v-if="isLoadingTree"
                         :data="analysismethods"
                         node-key="id"
                         :props="defaultProps"
                         :expand-on-click-node="true"
                         :render-content="renderContent"
                         :default-expanded-keys="defaultExpandKeys"
                         @node-click="handleNodeClick"
                         @node-drag-start="handleDragStart"
                         @node-drag-enter="handleDragEnter"
                         @node-drag-leave="handleDragLeave"
                         @node-drag-over="handleDragOver"
                         @node-drag-end="handleDragEnd"
                         @node-drop="handleDrop"
                         draggable
                         :allow-drop="allowDrop"
                         :allow-drag="allowDrag"
                         default-expand-all></el-tree>
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
            <div slot="header"
                 style="height:12px;font-size:13px;"
                 class="clearfix">
              <span>构建</span>
            </div>

            <draggable :options="{group:'condition'}">
              <div class="drag-cover"></div>
            </draggable>
            <!-- <el-table :data="tableData"
                      style="width: 100%">

              <el-table-column prop="quene"
                               label="队列"
                               width="180"></el-table-column>
              <el-table-column prop="method"
                               label="分析方法"></el-table-column>
            </el-table> -->
            <el-button style="float:right;margin-bottom:5px;margin-top:5px"
                       type="primary">计算</el-button>
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
            <el-button style="float:right;margin-bottom:5px;margin-top:5px"
                       type="primary">保存</el-button>
          </el-card>
        </el-row>
      </el-col>
    </el-row>

    <!-- 新建变量 dwx 2018.12.14 -->
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
                               type="primary"
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

    <!--新增概念集—-->
    <el-dialog title="新增概念集"
               :visible.sync="dialogVisible"
               width="60%"
               :before-close="handleClose">
      <el-form :model="NewConceptSets"
               ref="NewConceptSets"
               label-width="100px"
               class="demo-ruleForm concept-container">
        <el-row :gutter="10"
                style="margin-top:10px;margin-bottom:10px"
                type="flex"
                justify="center">

          <el-col :span="16">
            <el-input prefix-icon="el-icon-search"
                      v-model="InputConceptName"
                      type="text"></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-top:10px;margin-bottom:10px">
          <el-col :span="16"
                  :offset="4">
            <el-form-item label="*集合名称"
                          prop="SetName"
                          class="form-inline">
              <el-input type="text"
                        v-model="NewConceptSets.SetName"
                        auto-complete="off"
                        placeholder="请输入集合名称"
                        class="form-control"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top:10px;margin-bottom:10px">
          <el-col :span="14"
                  :offset="4">
            <el-form-item label="集合描述"
                          prop="SetDescription"
                          class="form-inline">
              <el-input type="text"
                        v-model="NewConceptSets.SetDescription"
                        auto-complete="off"
                        placeholder="请输入集合描述"
                        class="form-control"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2"
                  :offset="1">
            <el-button type="primary">待选择</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary">已选择</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-row style="margin-top:10px;margin-bottom:10px"
              type="flex"
              justify="center">
        <el-col :span="20">
          <el-table :data="SearchResult"
                    v-model="SearchResult"
                    valign="center"
                    height="300"
                    border
                    style="width: 100%"
                    @selction-change="handleSelectionChange">
            <el-table-column type="selection"
                             label="全选"
                             width="60"></el-table-column>
            <el-table-column prop="ConceptCode"
                             label="概念编码"
                             width="120"></el-table-column>
            <el-table-column prop="ConceptName"
                             label="概念名称"
                             width="150"></el-table-column>
            <el-table-column prop="ConceptType"
                             label="概念类别"
                             width="120"></el-table-column>
            <el-table-column prop="ConceptField"
                             label="概念领域"
                             width="120"></el-table-column>
            <el-table-column prop="ConceptSource"
                             label="概念来源（全部）"
                             width="150"></el-table-column>
            <el-table-column width="100">
              <template slot="header"
                        slot-scope="scope">
                <el-checkbox :indeterminate="isIndeterminate1"
                             v-model="checkAll1"
                             @change="handleCheckAllExcludeditemsChange">排除</el-checkbox>
              </template>
              <template slot-scope="scope">
                <el-checkbox-group v-model="checkedExcludeditems"
                                   @change="handleCheckedExcludeditemsChange">
                  <el-checkbox :label="scope.row.Except"></el-checkbox>
                </el-checkbox-group>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot="header"
                        slot-scope="scope">
                <el-checkbox :indeterminate="isIndeterminate2"
                             v-model="checkAll2"
                             @change="handleCheckAllChilerenConceptsChange">子概念</el-checkbox>
              </template>
              <template slot-scope="scope">
                <el-checkbox-group v-model="checkedChilerenConcepts"
                                   @change="handleCheckedChilerenConceptsChange">
                  <el-checkbox :label="scope.row.ChilerenConcept"></el-checkbox>
                </el-checkbox-group>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--顾忆芯  2018/12/2 -->
    <el-dialog :visible.sync="NewMethodVisible"
               width="50%"
               height="80%"
               :before-close="handleClose">
      <el-tabs :tab-position="tabPosition"
               type="border-card">
        <el-tab-pane name="first "
                     label="描述性分析">
          <el-row :gutter="20">
            <el-col :span="18">
              <el-transfer v-model="value1"
                           :data="data1"
                           :titles="['变量', '目标变量']"></el-transfer>
            </el-col>
            <el-col :span="6">
              <el-row>
                <el-button type="primary">确定</el-button>
              </el-row>
              <el-row style="margin-top:10px;margin-bottom:10px">
                <el-button type="primary">取消</el-button>
              </el-row>
              <el-row>
                <el-button type="primary">帮助</el-button>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20"
                  style="margin-top:10px;margin-bottom:10px">
            <el-col :span="16">
              <el-row>
                <form>
                  <fieldset class="groupbox-boarder">
                    <legend class="one-of-groupbox-boarder">百分位数</legend>
                    <el-checkbox-group v-model="checkList1_1">
                      <el-row>
                        <el-checkbox :label="1">中位数</el-checkbox>
                      </el-row>
                      <el-row>
                        <el-checkbox :label="2">百分位数：
                          <el-input-number v-model="num1"
                                           size="mini"
                                           controls-position="right"
                                           @change="handleChange1"
                                           :min="0"
                                           :max="100"></el-input-number>% </el-checkbox>

                      </el-row>

                    </el-checkbox-group>
                  </fieldset>
                  <fieldset class="groupbox-boarder">
                    <legend class="one-of-groupbox-boarder">集中趋势</legend>
                    <el-checkbox-group v-model="checkList1_2">
                      <el-row>
                        <el-checkbox :label="5">均值</el-checkbox>
                      </el-row>
                      <el-row>
                        <el-checkbox :label="6">几何平均数</el-checkbox>
                      </el-row>
                      <el-row>
                        <el-checkbox :label="7">众数</el-checkbox>
                      </el-row>
                    </el-checkbox-group>
                  </fieldset>

                </form>
              </el-row>
              <el-row style="margin-top:10px;margin-bottom:10px">

                <form>
                  <fieldset class="groupbox-boarder">
                    <legend class="one-of-groupbox-boarder"> 离散趋势</legend>
                    <el-checkbox-group v-model="checkList1_3">
                      <el-col :span="8">
                        <el-row>
                          <el-checkbox :label="11">极大值</el-checkbox>
                        </el-row>
                        <el-row>
                          <el-checkbox :label="13">极小值</el-checkbox>
                        </el-row>

                      </el-col>
                      <el-col :span="16">
                        <el-row>
                          <el-checkbox :label="12">方差</el-checkbox>
                        </el-row>
                        <el-row>
                          <el-checkbox :label="14">标准差</el-checkbox>
                        </el-row>

                      </el-col>
                    </el-checkbox-group>
                  </fieldset>
                </form>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row>

                <form>
                  <fieldset class="groupbox-boarder">
                    <legend class="one-of-groupbox-boarder">分布状态</legend>
                    <el-checkbox-group v-model="checkList1_4">
                      <el-row>
                        <el-checkbox :label="1">偏度（Skewness）</el-checkbox>
                      </el-row>
                      <el-row>
                        <el-checkbox :label="2">峰度（Kurtosis）</el-checkbox>
                      </el-row>
                    </el-checkbox-group>
                  </fieldset>
                </form>

              </el-row>
              <el-row style="margin-top:10px;margin-bottom:10px">
                <form>
                  <fieldset class="groupbox-boarder">
                    <legend class="one-of-groupbox-boarder">图表</legend>
                    <el-checkbox-group v-model="checkList1_5">
                      <el-row>
                        <el-checkbox :label="5">条形图</el-checkbox>
                      </el-row>
                      <el-row>
                        <el-checkbox :label="6">饼图</el-checkbox>
                      </el-row>
                      <el-row>
                        <el-checkbox :label="7">折线图</el-checkbox>
                      </el-row>
                      <el-row>
                        <el-checkbox :label="8">箱线图</el-checkbox>
                      </el-row>
                      <el-row>
                        <el-checkbox :label="9">直方图</el-checkbox>
                      </el-row>
                      <el-row>
                        <el-checkbox :label="10">散点图</el-checkbox>
                      </el-row>
                    </el-checkbox-group>
                  </fieldset>
                </form>

              </el-row>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane name="second "
                     label="t检验">
          <el-tabs>
            <el-tab-pane name="second-1"
                         label="单样本t检验">
              <el-row :gutter="20">
                <el-col :span="18">
                  <el-transfer v-model="value2_1"
                               :data="data2_1"
                               :titles="['变量', '目标变量']"></el-transfer>
                </el-col>
                <el-col :span="6">
                  <el-row>
                    <el-button type="primary">确定</el-button>
                  </el-row>
                  <el-row style="margin-top:10px;margin-bottom:10px">
                    <el-button type="primary">取消</el-button>
                  </el-row>
                  <el-row>
                    <el-button type="primary">帮助</el-button>
                  </el-row>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;margin-bottom:10px">置信区间百分比：
                <el-input-number v-model="num2_1"
                                 controls-position="right"
                                 @change="handleChange2_1"
                                 :min="0"
                                 :max="100"></el-input-number>%

              </el-row>
              <el-row style="margin-top:10px;margin-bottom:10px">零假设的期望值：
                <el-input style="width:180px;"></el-input>

              </el-row>
            </el-tab-pane>
            <el-tab-pane name="second-2"
                         label="独立样本t检验">
              <el-row :gutter="20">
                <el-col :span="18">
                  <el-transfer v-model="value2_2"
                               :data="data2_2"
                               :titles="['变量', '目标变量']"></el-transfer>
                </el-col>
                <el-col :span="6">
                  <el-row>
                    <el-button type="primary">确定</el-button>
                  </el-row>
                  <el-row style="margin-top:10px;margin-bottom:10px">
                    <el-button type="primary">取消</el-button>
                  </el-row>
                  <el-row>
                    <el-button type="primary">帮助</el-button>
                  </el-row>
                </el-col>
              </el-row>
              <el-row>
                <el-transfer v-model="value2_2_2"
                             :data="data2_2_2"
                             :titles="['变量', '分组变量']"></el-transfer>
              </el-row>

              <el-row :gutter="20">

                <el-col :span="12">
                  <el-row style="margin-top:10px;margin-bottom:10px">置信区间百分比：
                    <el-input-number size="mini"
                                     v-model="num2_2"
                                     controls-position="right"
                                     @change="handleChange2_2"
                                     :min="0"
                                     :max="100"></el-input-number>%
                  </el-row>
                  <el-row>
                    <el-checkbox>
                      进行方差齐性预检验
                    </el-checkbox>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <form>
                    <fieldset class="groupbox-boarder">
                      <legend class="one-of-groupbox-boarder">t检验的方式</legend>
                      <el-radio-group v-model="radio2_2">
                        <el-radio :label="3">标准t检验</el-radio></br>
                        <el-radio :label="6">Welch t 检验</el-radio></br>
                        <el-radio :label="9">根据方差齐性检验结果自动选择</el-radio>
                      </el-radio-group>
                    </fieldset>
                  </form>

                </el-col>

              </el-row>

            </el-tab-pane>
            <el-tab-pane name="second-3"
                         label="配对样本t检验">
              <el-row :gutter="20">
                <el-col :span="18">
                  <el-transfer v-model="value2_3"
                               :data="data2_3"
                               :titles="['变量', '目标变量']"></el-transfer>
                </el-col>
                <el-col :span="6">
                  <el-row>
                    <el-button type="primary">确定</el-button>
                  </el-row>
                  <el-row style="margin-top:10px;margin-bottom:10px">
                    <el-button type="primary">取消</el-button>
                  </el-row>
                  <el-row>
                    <el-button type="primary">帮助</el-button>
                  </el-row>
                </el-col>
              </el-row>
              <el-row>
                <el-transfer v-model="value2_3_2"
                             :data="data2_3_2"
                             :titles="['变量', '分组变量']"></el-transfer>

              </el-row>
              <el-row :gutter="20"
                      style="margin-top:10px;margin-bottom:10px">

                <el-col :span="12">
                  <el-row>置信区间百分比：
                    <el-input-number v-model="num2_3"
                                     controls-position="right"
                                     @change="handleChange2_3"
                                     :min="0"
                                     :max="100"></el-input-number>%
                  </el-row>
                </el-col>
                <el-col :span="12">

                  <form>
                    <fieldset class="groupbox-boarder">
                      <legend class="one-of-groupbox-boarder">预检验</legend>
                      <el-checkbox-group v-model="checkList2_3">
                        <el-row>
                          <el-checkbox :label="1">方差齐性预检验</el-checkbox>
                        </el-row>
                        <el-row>
                          <el-checkbox :label="2">组别相关性检验</el-checkbox>
                        </el-row>
                      </el-checkbox-group>
                    </fieldset>
                  </form>

                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane name="third "
                     label="方差分析">
          <el-tabs>
            <el-tab-pane label="单因素方差分析">
              <el-row :gutter="20">
                <el-col :span="18">
                  <el-transfer v-model="value3_1_1"
                               :data="data3_1_1"
                               :titles="['变量', '因变量']"></el-transfer>

                </el-col>
                <el-col :span="6">
                  <el-row>
                    <el-button type="primary">确定</el-button>
                  </el-row>
                  <el-row style="margin-top:10px;margin-bottom:10px">
                    <el-button type="primary">取消</el-button>
                  </el-row>
                  <el-row>
                    <el-button type="primary">帮助</el-button>
                  </el-row>
                </el-col>
              </el-row>
              <el-row>
                <el-transfer v-model="value3_1_2"
                             :data="data3_1_2"
                             :titles="['变量', '自变量']"></el-transfer>

              </el-row>
              <el-row style="margin-top:10px;margin-bottom:10px">置信区间百分比：
                <el-input-number v-model="num3_1"
                                 controls-position="right"
                                 @change="handleChange3_1"
                                 :min="0"
                                 :max="100"></el-input-number>%
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <form>
                    <fieldset class="groupbox-boarder">
                      <legend class="one-of-groupbox-boarder">分析选项</legend>
                      <el-row>
                        方差分析类型：
                        <el-select v-model="value3_1"
                                   size="mini">
                          <el-option v-for="item in options3_1"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value">
                          </el-option>
                        </el-select>

                      </el-row>
                      <el-checkbox-group v-model="checkList3_1_1">

                        <el-row>
                          <el-checkbox :label="1">levene方差齐性检验</el-checkbox>
                        </el-row>
                        <el-row>
                          <el-checkbox :label="2">正态性检验</el-checkbox>
                        </el-row>
                        <el-row>
                          <el-checkbox :label="3">因素间交互作用检验</el-checkbox>
                        </el-row>
                        <el-row>
                          <el-checkbox :label="4">tukey检验</el-checkbox>
                        </el-row>
                      </el-checkbox-group>
                    </fieldset>
                  </form>
                  <!-- <form>
                          <fieldset class="groupbox-boarder">
                            <legend class="one-of-groupbox-boarder"></legend>
                          </fieldset>
                        </form> -->

                </el-col>
                <el-col :span="12">
                  <form>
                    <fieldset class="groupbox-boarder">
                      <legend class="one-of-groupbox-boarder">输出选项</legend>
                      <el-checkbox-group v-model="checkList3_1_2">

                        <el-row>
                          <el-checkbox :label="1">方差分析结果</el-checkbox>
                        </el-row>
                        <el-row>
                          <el-checkbox :label="2">回归结果</el-checkbox>
                        </el-row>
                        <el-row>
                          <el-checkbox :label="3">eta平方</el-checkbox>
                        </el-row>
                        <el-row>
                          <el-checkbox :label="4">omega平方</el-checkbox>
                        </el-row>
                      </el-checkbox-group>
                    </fieldset>
                  </form>

                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="多因素方差分析">
              <el-row :gutter="20">
                <el-col :span="18">
                  <el-row>
                    <el-transfer v-model="value3_2_1"
                                 :data="data3_2_1"
                                 :titles="['变量', '检测变量']"></el-transfer>
                    <el-transfer v-model="value3_2_2"
                                 :data="data3_2_2"
                                 :titles="['变量', '分组变量']"></el-transfer>

                  </el-row>

                </el-col>
                <el-col :span="6">
                  <el-row>
                    <el-button type="primary">确定</el-button>
                  </el-row>
                  <el-row style="margin-top:10px;margin-bottom:10px">
                    <el-button type="primary">取消</el-button>
                  </el-row>
                  <el-row>
                    <el-button type="primary">帮助</el-button>
                  </el-row>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;margin-bottom:10px">置信区间百分比：
                <el-input-number v-model="num3_2"
                                 controls-position="right"
                                 @change="handleChange3_2"
                                 :min="0"
                                 :max="100"></el-input-number>%
              </el-row>

              <el-row :gutter="20">
                <el-col :span="12">
                  <form>
                    <fieldset class="groupbox-boarder">
                      <legend class="one-of-groupbox-boarder">分析选项</legend>
                      <el-row>
                        方差分析类型：
                        <el-select v-model="value3_2"
                                   size="mini">
                          <el-option v-for="item in options3_2"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value">
                          </el-option>
                        </el-select>

                      </el-row>
                      <el-checkbox-group v-model="checkList3_2_1">

                        <el-row>
                          <el-checkbox :label="1">levene方差齐性检验</el-checkbox>
                        </el-row>
                        <el-row>
                          <el-checkbox :label="2">正态性检验</el-checkbox>
                        </el-row>
                        <el-row>
                          <el-checkbox :label="3">因素间交互作用检验</el-checkbox>
                        </el-row>
                        <el-row>
                          <el-checkbox :label="4">tukey检验</el-checkbox>
                        </el-row>
                      </el-checkbox-group>
                    </fieldset>
                  </form>

                </el-col>
                <el-col :span="12">
                  <form>
                    <fieldset class="groupbox-boarder">
                      <legend class="one-of-groupbox-boarder">输出选项</legend>
                      <el-checkbox-group v-model="checkList3_2_2">

                        <el-row>
                          <el-checkbox :label="1">方差分析结果</el-checkbox>
                        </el-row>
                        <el-row>
                          <el-checkbox :label="2">回归结果</el-checkbox>
                        </el-row>
                        <el-row>
                          <el-checkbox :label="3">eta平方</el-checkbox>
                        </el-row>
                        <el-row>
                          <el-checkbox :label="4">omega平方</el-checkbox>
                        </el-row>
                      </el-checkbox-group>
                    </fieldset>
                  </form>

                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane name="fourth "
                     label="线性回归">
          <el-row :gutter="20">
            <el-col :span="18">
              <el-row>
                <el-transfer v-model="value4_1"
                             :data="data4_1"
                             :titles="['变量', '因变量']"></el-transfer>
              </el-row>
              <el-row>
                <el-transfer v-model="value4_2"
                             :data="data4_2"
                             :titles="['变量', '自变量']"></el-transfer>

              </el-row>
              <el-row style="margin-top:10px;margin-bottom:10px">
                <form>
                  <fieldset class="groupbox-boarder">
                    <legend class="one-of-groupbox-boarder">参数设置</legend>
                    <el-checkbox-group v-model="checkList4">

                      <el-row>
                        <el-checkbox :label="1">interception</el-checkbox>
                      </el-row>
                      <el-row>
                        <el-checkbox :label="2">normalization</el-checkbox>
                      </el-row>

                    </el-checkbox-group>
                  </fieldset>
                </form>
              </el-row>
            </el-col>
            <el-col :span="6">
              <el-row>
                <el-button type="primary">确定</el-button>
              </el-row>
              <el-row style="margin-top:10px;margin-bottom:10px">
                <el-button type="primary">取消</el-button>
              </el-row>
              <el-row>
                <el-button type="primary">帮助</el-button>
              </el-row>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane name="fifth "
                     label="逻辑回归">
          <el-row :gutter="20">
            <el-col :span="18">
              <el-row>
                <el-transfer v-model="value5_1"
                             :data="data5_1"
                             :titles="['变量', '因变量']"></el-transfer>
              </el-row>
              <el-row>
                <el-transfer v-model="value5_2"
                             :data="data5_2"
                             :titles="['变量', '自变量']"></el-transfer>

              </el-row>
              <el-row style="margin-top:10px;margin-bottom:10px">
                <form>
                  <fieldset class="groupbox-boarder">
                    <legend class="one-of-groupbox-boarder">参数设置</legend>
                    <el-checkbox-group v-model="checkList5">

                      <el-row>
                        <el-checkbox :label="1">intercept</el-checkbox>
                        基准精度<el-input v-model="input5_1"
                                  type="number"
                                  size="mini"
                                  style="width:100px;"></el-input>
                      </el-row>
                      <el-row>
                        <el-checkbox :label="2">class weight</el-checkbox>
                      </el-row>

                    </el-checkbox-group>
                  </fieldset>
                </form>
                <!-- <form>
                          <fieldset class="groupbox-boarder">
                            <legend class="one-of-groupbox-boarder"></legend>
                          </fieldset>
                        </form> -->
                <!-- <el-card shadow="never"
                                 :body-style="{ padding: '10px'}">
                          <span>参数设置</span>
                          <el-checkbox-group v-model="checkList5">

                            <el-row>
                              <el-checkbox :label="1">intercept</el-checkbox>
                              基准精度<el-input v-model="input5_1"
                                        type="number"
                                        size="mini"
                                        style="width:100px;"></el-input>
                            </el-row>
                            <el-row>
                              <el-checkbox :label="2">class weight</el-checkbox>
                            </el-row>

                          </el-checkbox-group>
                        </el-card> -->
              </el-row>
              <el-row style="margin-top:10px;margin-bottom:10px">
                <form>
                  <fieldset class="groupbox-boarder">
                    <legend class="one-of-groupbox-boarder">高级参数</legend>
                    <el-row>正规化
                      <el-select v-model="value5"
                                 size="mini">
                        <el-option v-for="item in options5"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                      </el-select>
                      精度基准<el-input v-model="input5_1"
                                type="number"
                                size="mini"
                                style="width:100px;"></el-input>
                    </el-row>
                    <el-row style="margin-top:10px;margin-bottom:10px">
                      惩罚因子C <el-input type="number"
                                v-model="input5_2"
                                size="mini"
                                style="width:100px;"></el-input>
                    </el-row>
                  </fieldset>
                </form>

              </el-row>
            </el-col>
            <el-col :span="6">
              <el-row>
                <el-button type="primary">确定</el-button>
              </el-row>
              <el-row style="margin-top:10px;margin-bottom:10px">
                <el-button type="primary">取消</el-button>
              </el-row>
              <el-row>
                <el-button type="primary">帮助</el-button>
              </el-row>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane name="sixth "
                     label="SVM">
          <el-row :gutter="20">
            <el-col :span="18">
              <el-row>
                <el-transfer v-model="value6_1"
                             :data="data6_1"
                             :titles="['变量', '结局变量']"></el-transfer>
              </el-row>
              <el-row>
                <el-transfer v-model="value6_2"
                             :data="data6_2"
                             :titles="['变量', '自变量']"></el-transfer>
              </el-row>

              <el-row style="margin-top:10px;margin-bottom:10px">
                <form>
                  <fieldset class="groupbox-boarder">
                    <legend class="one-of-groupbox-boarder">参数设置</legend>
                    <el-row>
                      kernal<el-select v-model="value6"
                                 size="mini">
                        <el-option v-for="item in options6"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                      </el-select>
                      基准精度<el-input v-model="input6_1"
                                type="number"
                                size="mini"
                                style="width:100px;"></el-input>
                    </el-row>
                    <el-row>
                      max iter<el-input v-model="input6_2"
                                type="number"
                                size="mini"
                                style="width:100px;"></el-input>
                    </el-row>

                  </fieldset>
                </form>

              </el-row>
              <el-row style="margin-top:10px;margin-bottom:10px">
                <form>
                  <fieldset class="groupbox-boarder">
                    <legend class="one-of-groupbox-boarder">高级参数</legend>

                    <el-row tyle="margin-top:20px;margin-bottom:10px">
                      惩罚因子C <el-input-number v-model="input6_3"
                                       :precision="1"
                                       :step="0.1"
                                       controls-position="right"
                                       size="mini"
                                       style="width:100px;"></el-input-number>
                      degree <el-input-number v-model="input6_4"
                                       :precision="1"
                                       :step="0.1"
                                       controls-position="right"
                                       size="mini"
                                       style="width:100px;"></el-input-number>
                    </el-row>
                    <el-row tyle="margin-top:10px;margin-bottom:10px">
                      核函数常数 <el-input-number v-model="input6_5"
                                       :precision="1"
                                       :step="0.1"
                                       controls-position="right"
                                       size="mini"
                                       style="width:100px;"></el-input-number>
                      gamma <el-input-number :precision="1"
                                       :step="0.1"
                                       controls-position="right"
                                       v-model="input6_6"
                                       size="mini"
                                       style="width:100px;"></el-input-number>
                    </el-row>
                  </fieldset>
                </form>

              </el-row>

            </el-col>
            <el-col :span="6">
              <el-row>
                <el-button type="primary">确定</el-button>
              </el-row>
              <el-row style="margin-top:10px;margin-bottom:10px">
                <el-button type="primary">取消</el-button>
              </el-row>
              <el-row>
                <el-button type="primary">帮助</el-button>
              </el-row>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane name="seventh "
                     label="贝叶斯网络">
          <el-row :gutter="20">
            <el-col :span="18">
              <el-row>
                <el-transfer v-model="value7_1"
                             :data="data7_1"
                             :titles="['变量', '结局变量']"></el-transfer>
              </el-row>
              <el-row>
                <el-transfer v-model="value7_2"
                             :data="data7_2"
                             :titles="['变量', '自变量']"></el-transfer>

              </el-row>

              <el-row style="margin-top:10px;margin-bottom:10px">
                <form>
                  <fieldset class="groupbox-boarder">
                    <legend class="one-of-groupbox-boarder">参数设置</legend>
                    <el-row>
                      模型<el-select v-model="value7"
                                 size="mini">
                        <el-option v-for="item in options7"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                      </el-select>
                      <el-checkbox v-model="check7">fit prior</el-checkbox>

                    </el-row>
                  </fieldset>
                </form>

              </el-row>
              <el-row style="margin-top:10px;margin-bottom:10px">
                <form>
                  <fieldset class="groupbox-boarder">
                    <legend class="one-of-groupbox-boarder">高级参数</legend>
                    <el-row tyle="margin-top:20px;margin-bottom:10px">
                      smoothing<el-input type="number"
                                v-model="input7_1"
                                size="mini"
                                style="width:100px;"></el-input>

                    </el-row>
                    <el-row tyle="margin-top:10px;margin-bottom:10px">
                      alpha <el-input type="number"
                                v-model="input7_2"
                                size="mini"
                                style="width:100px;"></el-input>
                    </el-row>
                    <el-row>
                      gamma <el-input type="number"
                                v-model="input7_3"
                                size="mini"
                                style="width:100px;"></el-input>
                    </el-row>
                  </fieldset>
                </form>

              </el-row>
            </el-col>
            <el-col :span="6">
              <el-row>
                <el-button type="primary">确定</el-button>
              </el-row>
              <el-row style="margin-top:10px;margin-bottom:10px">
                <el-button type="primary">取消</el-button>
              </el-row>
              <el-row>
                <el-button type="primary">帮助</el-button>
              </el-row>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane name="eighth "
                     label="决策树">
          <el-row :gutter="20">
            <el-col :span="18">
              <el-row>
                <el-transfer v-model="value7_1"
                             :data="data7_1"
                             :titles="['变量', '结局变量']"></el-transfer>
              </el-row>
              <el-row>
                <el-transfer v-model="value7_2"
                             :data="data7_2"
                             :titles="['变量', '自变量']"></el-transfer>
              </el-row>

              <el-row style="margin-top:10px;margin-bottom:10px">
                <form>
                  <fieldset class="groupbox-boarder">
                    <legend class="one-of-groupbox-boarder">参数设置</legend>
                    <el-row>
                      criterion<el-select v-model="value8"
                                 size="mini">
                        <el-option v-for="item in options8"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                      </el-select>
                      <el-checkbox v-model="check8">class weight</el-checkbox>

                    </el-row>
                    <el-row tyle="margin-top:20px;margin-bottom:10px">
                      max deepth<el-input type="number"
                                v-model="input8_1"
                                size="mini"
                                style="width:100px;"></el-input>

                    </el-row>
                    <el-row tyle="margin-top:20px;margin-bottom:10px">
                      max features<el-input type="number"
                                v-model="input8_2"
                                size="mini"
                                style="width:100px;"></el-input>

                    </el-row>

                  </fieldset>
                </form>

              </el-row>
              <el-row style="margin-top:10px;margin-bottom:10px">
                <form>
                  <fieldset class="groupbox-boarder">
                    <legend class="one-of-groupbox-boarder">高级参数</legend>
                    <el-row tyle="margin-top:20px;margin-bottom:10px">
                      min samples split<el-input type="number"
                                v-model="input8_3"
                                size="mini"
                                style="width:100px;"></el-input>

                    </el-row>
                    <el-row tyle="margin-top:10px;margin-bottom:10px">
                      min samples leaf <el-input type="number"
                                v-model="input8_4"
                                size="mini"
                                style="width:100px;"></el-input>
                    </el-row>

                  </fieldset>
                </form>

              </el-row>
            </el-col>
            <el-col :span="6">
              <el-row>
                <el-button type="primary">确定</el-button>
              </el-row>
              <el-row style="margin-top:10px;margin-bottom:10px">
                <el-button type="primary">取消</el-button>
              </el-row>
              <el-row>
                <el-button type="primary">帮助</el-button>
              </el-row>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
import TreeRender from './tree_render.vue';
import axios from 'axios';

import draggable from 'vuedraggable';

const Excludeditemsoptions = [' ', '  ', '   '];
const ChilerenConceptsoptions = [' ', '  ', '   '];

export default {
  data() {
    return {

      researchstatus: this.$route.query.researchstatus,
      NewVarVisible: false,
      NewMethodVisible: false,
      tableData: [{
        quene: '队列A',
        method: 'SVM',
      }],
      // 概念集假数据/RH
      maxexpandId: 5,//新增节点开始id
      non_maxexpandId: 5,//新增节点开始id(不更改)
      isLoadingTree: false,//是否加载节点树
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultExpandKeys: [],//默认展开节点列表
      conceptsets: [],
      queuesets: [],
      analysismethods: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      //新增概念集假数据
      dialogVisible: false,
      NewConceptSets: {
        SetName: "",
        SetDescription: ""
      },
      table: [
        {
          ConceptCode: "E14.901",
          ConceptName: "糖尿病",
          ConceptType: "ICD10 code",
          ConceptField: "Condition",
          ConceptSource: "SZ_ICD10",
          Except: " ",
          ChilerenConcept: " "
        },
        {
          ConceptCode: "80_000",
          ConceptName: "糖尿病",
          ConceptType: "ICD10 code",
          ConceptField: "Condition",
          ConceptSource: "SZ_ICD10",
          Except: "  ",
          ChilerenConcept: "  "
        },
        {
          ConceptCode: "E10.904",
          ConceptName: "暴发性1型糖尿病",
          ConceptType: "ICD10 code",
          ConceptField: "Condition",
          ConceptSource: "SZ_ICD10",
          Except: "   ",
          ChilerenConcept: "   "
        }
      ],
      multipleSelection: [],
      InputConceptName: "",
      checkAll1: false,
      isIndeterminate1: false,
      checkAll2: false,
      isIndeterminate2: false,
      checkedExcludeditems: [],
      checkedChilerenConcepts: [],
      Excludeditems: Excludeditemsoptions,
      ChilerenConcepts: ChilerenConceptsoptions,
      NewMethodVisible: false,
      tabPosition: "left",
      radio2_2: 3,
      data1: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      data2_1: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      data2_2: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      data2_2_2: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      data2_3: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      data2_3_2: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      data3_1_1: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      data3_1_2: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      data3_2_1: [{ key: "1", label: "变量1" }, { key: "2", label: "变量2" }],
      data3_2_2: [{ key: "1", label: "变量1" }, { key: "2", label: "变量2" }],
      data3_2_3: [{ key: "1", label: "变量1" }, { key: "2", label: "变量2" }],
      data3_2_4: [{ key: "1", label: "变量1" }, { key: "2", label: "变量2" }],
      data4_1: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      data4_2: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      data5_1: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      data5_2: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      data6_1: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      data6_2: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      data6_3: [
        { key: "1", label: "线性" },
        { key: "2", label: "多项式" },
        { key: "3", label: "Radial basis" },
        { key: "4", label: "Sigmoid" }
      ],
      data7_1: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      data7_2: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      value1: [],
      value2_1: [],
      value2_2: [],
      value2_2_2: [],
      value2_3: [],
      value2_3_2: [],
      value3_1_1: [],
      value3_1_2: [],
      value3_2_1: [],
      value3_2_2: [],
      //select 的model
      value3_1: [],
      value3_2: [],
      value5: [],
      value6: [],
      value7: [],
      value8: [],
      //
      value4_1: [],
      value4_2: [],
      value5_1: [],
      value5_2: [],
      value6_1: [],
      value6_2: [],
      value6_3: [],
      value7_1: [],
      value7_2: [],
      checkList1_1: [],
      checkList1_2: [],
      checkList1_3: [],
      checkList1_4: [],
      checkList1_5: [],
      checkList2_3: [2],
      checkList3_1_1: [1, 2, 3, 4],
      checkList3_1_2: [1, 2, 3],
      checkList3_2_1: [1, 2, 3, 4],
      checkList3_2_2: [1, 2, 3],
      checkList4: [2],
      checkList5: [1, 2],
      check7: true,
      check8: true,
      input5_1: 0.0001,
      input5_2: 1.0,
      input6_1: 0.0001,
      input6_2: 10000,
      input6_3: 1.0,
      input6_4: 1.0,
      input6_5: 1.0,
      input6_6: 1.0,
      input7_1: 0.0001,
      input7_2: 1.0,
      input7_3: 1.0,
      input1: "",
      input8_1: 8,
      input8_2: 5,
      input8_3: 5,
      input8_4: 2,
      num1: 3,
      num2_1: 95,
      num2_2: 95,
      num2_3: 95,
      num3_1: 95,
      num3_2: 95,
      options3_1: [{
        value: '选项1',
        label: 'typeⅠ'
      }, {
        value: '选项2',
        label: 'typeⅡ'
      }, {
        value: '选项3',
        label: 'typeⅢ'
      }],
      options3_2: [{
        value: '选项1',
        label: 'typeⅠ'
      }, {
        value: '选项2',
        label: 'typeⅡ'
      }, {
        value: '选项3',
        label: 'typeⅢ'
      }],
      options5: [{
        value: '选项1',
        label: 'L1'
      }, {
        value: '选项2',
        label: 'L2'
      },],
      options6: [
        {
          value: '选项1',
          label: '多项式'
        }, {
          value: '选项2',
          label: 'Radial basis'
        },
        {
          value: '选项3',
          label: '线性'
        },
        {
          value: '选项4',
          label: 'Sigmoid'
        },
      ],
      options7: [
        {
          value: '选项1',
          label: '高斯'
        }, {
          value: '选项2',
          label: '多项分布'
        },
        {
          value: '选项3',
          label: '伯努利'
        }
      ],
      options8: [
        {
          value: '选项1',
          label: '信息增益'
        }, {
          value: '选项2',
          label: 'gini impurity'
        }
      ],
      checked: true,
      // 新增变量弹框
      NewVarTabs: "NewVariable",
      VariableTable: []
    };
  },
  mounted() {
    // console.log(this.GLOBAL.token)
    this.initExpand();
    this.getConceptsetsData();
    this.getQueuesetsData();
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
    getQueuesetsData() {
      axios.get('/structure/getStructure', {
        params: {
          "token": this.GLOBAL.token
        }
      })
        .then((response) => {
          this.queuesets = JSON.parse(response.data.data.collaborationCohortStructure)
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
        })
        .catch(function (error) {
          console.log("error", error);
        });
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
    toCreateQueue() {
      this.$router.push({
        path: 'createqueue',
      });
    },
    toNewVariable: function () {
      this.NewVarVisible = true
      this.getVariableTable()
    },
    //鼠标hover事件所需
    initExpand() {
      this.conceptsets.map(a => {
        this.defaultExpandKeys.push(a.id);
      });
      this.isLoadingTree = true;
    },
    handleNodeClick(d, n, s) {
      //点击节点
      // console.log(d,n)
      d.isEdit = false; //放弃编辑状态
    },
    renderContent(h, { node, data, store }) {
      //加载节点
      let that = this;
      return h(TreeRender, {
        props: {
          DATA: data,
          NODE: node,
          STORE: store,
          maxexpandId: that.non_maxexpandId
        },
        on: {
          nodeAdd: (s, d, n) => that.handleAdd(s, d, n),
          nodeEdit: (s, d, n) => that.handleEdit(s, d, n),
          nodeDel: (s, d, n) => that.handleDelete(s, d, n)
        }
      });
    },
    handleAddTop() {
      this.conceptsets.push({
        id: ++this.maxexpandId,
        label: '新增节点',
        pid: '',
        isEdit: false,
        children: []
      });
    },
    handleAdd(s, d, n) {
      //增加节点
      console.log(s, d, n);
      if (n.level >= 6) {
        this.$message.error("最多只支持五级！");
        return false;
      }
      //添加数据
      d.children.push({
        id: ++this.maxexpandId,
        label: '新增节点',
        pid: d.id,
        isEdit: false,
        children: []
      });
      //展开节点
      if (!n.expanded) {
        n.expanded = true;
      }
    },
    handleEdit(s, d, n) {
      //编辑节点
      console.log(s, d, n);
    },
    handleDelete(s, d, n) {
      //删除节点
      console.log(s, d, n);
      let that = this;
      //有子级不删除
      if (d.children && d.children.length !== 0) {
        this.$message.error("此节点有子级，不可删除！");
        return false;
      } else {
        //新增节点直接删除，否则要询问是否删除
        let delNode = () => {
          let list = n.parent.data.children || n.parent.data,//节点同级数据
            _index = 99999;//要删除的index

          /*if(!n.parent.data.children){//删除顶级节点，无children
            list = n.parent.data
          }*/
          list.map((c, i) => {
            if (d.id == c.id) {
              _index = i;
            }
          });
          let k = list.splice(_index, 1);
          //console.log(_index,k)
          this.$message.success("删除成功！");
        };
        let isDel = () => {
          that
            .$confirm("是否删除此节点？", "提示", {
              confirmButtonText: "确认",
              cancelButtonText: "取消",
              type: "warning"
            })
            .then(() => {
              delNode();
            })
            .catch(() => {
              return false;
            });
        };
        //判断是否新增
        d.id > this.non_maxexpandId ? delNode() : isDel();
      }
    },
    //新增概念集所需
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCheckAllExcludeditemsChange(val) {
      this.checkedExcludeditems = val ? Excludeditemsoptions : [];
      this.isIndeterminate1 = false;
    },
    handleCheckedExcludeditemsChange(value) {
      let checkedCount = value.length;
      this.checkAll1 = checkedCount === this.Excludeditems.length;
      this.isIndeterminate1 =
        checkedCount > 0 && checkedCount < this.Excludeditems.length;
    },
    handleCheckAllChilerenConceptsChange(val) {
      this.checkedChilerenConcepts = val ? ChilerenConceptsoptions : [];
      this.isIndeterminate2 = false;
    },
    handleCheckedChilerenConceptsChange(value) {
      let checkedCount = value.length;
      this.checkAll2 = checkedCount === this.ChilerenConcepts.length;
      this.isIndeterminate2 =
        checkedCount > 0 && checkedCount < this.ChilerenConcepts.length;
    },
    handleChange2_1(value) {
      console.log(value);
    },
    handleChange2_2(value) {
      console.log(value);
    },
    handleChange2_3(value) {
      console.log(value);
    },
    handleChange3_1(value) {
      console.log(value);
    },
    handleChange3_2(value) {
      console.log(value);
    },
    // 新增变量弹框 dwx 2018.12.14
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
        params: {
          "token": this.GLOBAL.token,
          "featureId": this.VariableTable[index].featureId
        }
      })
        .then((response) => {
          if (response.code == 1) {
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
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label.indexOf('队列') != -1) {
        return type !== 'inner';
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf('文件夹') === -1;
    }
  },
  computed: {
    // 新增概念集中实现搜索功能
    SearchResult() {
      const InputConceptName = this.InputConceptName;
      if (InputConceptName) {
        return this.table.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).indexOf(InputConceptName) > -1;
          });
        });
      }
      return this.table;
    },
    options() {
      return this.$store.state.options;
    }

  },
  components: {
    draggable
  },
};
</script>
<style>
.expand {
  width: 100%;
  height: 80%;
  overflow: hidden;
}
.expand > div {
  height: 85%;
  padding-top: 20px;
  width: 100%;
  max-width: 400px;
  overflow-y: auto;
}
.expand > div::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}
.expand > div::-webkit-scrollbar-thumb {
  background-color: rgba(50, 65, 87, 0.5);
  outline: 1px solid slategrey;
  border-radius: 5px;
}
.expand > div::-webkit-scrollbar {
  width: 10px;
}
.expand-tree {
  border: none;
}
.expand-tree .el-tree-node.is-current,
.expand-tree .el-tree-node:hover {
  overflow: hidden;
}
.expand-tree .is-current > .el-tree-node__content .tree-btn,
.expand-tree .el-tree-node__content:hover .tree-btn {
  display: inline-block;
}
.expand-tree .is-current > .el-tree-node__content .tree-label {
  font-weight: 600;
  white-space: normal;
}
.drag-cover {
  width: 100%;
  height: 10px;
}
.sifting-queue-content {
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
</style>
