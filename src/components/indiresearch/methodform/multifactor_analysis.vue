<template>
  <div>
    <el-row style="margin-top:10px;margin-bottom:10px">
      模型名称: &nbsp;<el-input v-model="anova_2Form.methodname"
                size="mini"
                style="width:200px;"></el-input>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="20">

        <el-row :gutter="10">
          <el-col :span="10">
            <fieldset style=" min-width: inherit; height:220px;border-width:0.5px;border-style: double">
              <el-table :data="Varlist"
                        ref="singleTable"
                        max-height="200"
                        tooltip-effect="dark"
                        highlight-current-row
                        :row-class-name="tableRowClassName1"
                        @row-click="getRowdetail1">

                <el-table-column prop="name">
                </el-table-column>
                <el-table-column prop="featureId"
                                 v-if="idshow1">

                </el-table-column>

              </el-table>
            </fieldset>
          </el-col>

          <el-col :span="4">

            <div style="margin-top: 40%; text-align:center;">
              <!-- 右移 -->
              <el-button type="info"
                         @click="rightshift"
                         icon="icon el-icon-d-arrow-right"></el-button>

            </div>
            <!-- 左移 -->
            <div style="margin-top: 30%; text-align:center;">
              <el-button type="info"
                         @click="leftshift"
                         icon="icon el-icon-d-arrow-left"></el-button>

            </div>

            <div style="margin-top:60%; text-align:center;">
              <!-- 右移 -->
              <el-button type="info"
                         @click="rightshift2"
                         icon="icon el-icon-d-arrow-right"></el-button>

            </div>
            <!-- 左移 -->
            <div style="margin-top: 30%; text-align:center;">
              <el-button type="info"
                         @click="leftshift2"
                         icon="icon el-icon-d-arrow-left"></el-button>

            </div>

          </el-col>
          <el-col :span="10">
            <fieldset style="  min-width: inherit; height:220px;border-width:0.5px;border-style: double">
              <el-table :data="Chosenlist1"
                        max-height="200"
                        ref="singleTable"
                        tooltip-effect="dark"
                        @row-click="getRowdetail2">

                <el-table-column prop="name"
                                 label="检测变量">
                </el-table-column>
                <el-table-column prop="featureId"
                                 v-if="idshow2">

                </el-table-column>

              </el-table>
            </fieldset>
            <fieldset style="  min-width: inherit; height:220px;border-width:0.5px;border-style: double">
              <el-table :data="Chosenlist2"
                        max-height="200"
                        ref="singleTable"
                        tooltip-effect="dark"
                        :row-class-name="tableRowClassName3"
                        @row-click="getRowdetail3">

                <el-table-column prop="name"
                                 label="分组变量">
                </el-table-column>
                <el-table-column prop="featureId"
                                 v-if="idshow3">

                </el-table-column>

              </el-table>
            </fieldset>
          </el-col>
        </el-row>

      </el-col>
      <el-col :span="4">
        <el-row style="margin-top: 30%; ">
          <el-button type="primary"
                     v-if="isnew"
                     @click="save">确定</el-button>
          <el-button type="primary"
                     v-else
                     @click="edit">编辑</el-button>
        </el-row>
        <el-row style="margin-top: 15%;">
          <el-button type="primary"
                     @click="cancel">取消</el-button>
        </el-row>
        <el-row style="margin-top: 15%; ">
          <el-button type="primary"
                     @click="help">帮助</el-button>
        </el-row>
      </el-col>
    </el-row>

    <el-row style="margin-top:10px;margin-bottom:10px">置信区间百分比：
      <el-input-number v-model="anova_2Form.percent"
                       controls-position="right"
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
              <el-select v-model="anova_2Form.analysistype"
                         size="mini">
                <el-option v-for="item in options3_2"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>

            </el-row>
            <el-checkbox-group v-model="anova_2Form.test">

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
            <el-checkbox-group v-model="anova_2Form.output">

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
  </div>
</template>
<script>
export default {
  data() {
    return {
      anova_2Form: {
        percent: 95,
        analysistype: [],
        test: [1, 2, 3, 4],
        output: [1, 2, 3],

        methodname: '',
      },
      idshow1: false,
      idshow2: false,
      idshow3: false,
      isnew: true,
      currentRow2: [],
      currentRow1: [],
      currentRow3: [],
      Varlist: [{ 'featureId': 123, 'name': '变量1' }, { 'featureId': 124, 'name': '变量2' }, { 'featureId': 127, 'name': '变量3' }, { 'featureId': 129, 'name': '变量4' }, { 'featureId': 122, 'name': '变量5' }],
      Chosenlist1: [],
      Chosenlist2: [],
      index1: -1,
      index3: -1,


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

    }

  },
  methods: {
    tableRowClassName1({ row, rowIndex }) {
      row.index = rowIndex;
      // this.index1 = row.index;
      // this.index1 = rowIndex

    },
    tableRowClassName3({ row, rowIndex }) {
      row.index = rowIndex;
      // this.index1 = row.index;
      // this.index1 = rowIndex

    },
    getRowdetail1(row, event, column) {

      this.index1 = row.index;
      this.currentRow1 = row;


    },
    getRowdetail2(row, event, column) {
      // console.log(row.name, row.featureId);

      this.currentRow2 = row;


    },
    getRowdetail3(row, event, column) {
      // console.log(row.name, row.featureId);
      this.index3 = row.index;
      this.currentRow3 = row;


    },



    rightshift: function () {
      // console.log('右移1')
      var t = this.currentRow1;
      if (this.index1 != -1) {
        if (this.Chosenlist1.length == 0) {
          this.Chosenlist1.push(t);
          this.Varlist.splice(this.index1, 1)
          this.index1 = -1
          this.currentRow1 = null
        }
        else {

          this.$alert('只能选择一个检测变量');

        }
      } else {
        this.$alert("请选择变量")
      }

    },

    leftshift: function () {
      // console.log('左移1')
      var t = this.currentRow2;
      this.Varlist.push(t);

      this.Chosenlist1.splice(0, 1);

    },
    rightshift2: function () {

      if (this.index1 != -1) {

        this.Chosenlist2.push(this.currentRow1);
        this.Varlist.splice(this.index1, 1);
        this.index1 = -1
        this.currentRow1 = null

      }
      else {
        this.$alert('请选择变量')
      }



    },
    leftshift2: function () {
      // console.log('左移2')
      var t = this.currentRow3;
      this.Varlist.push(t);
      this.Chosenlist2.splice(this.index3, 1);
      this.index3 = -1
      this.currentRow3 = null

    },
    save: function () {

    },
    edit: function () {

    },
    cancel: function () {

    },
    help: function () {

    },




  }
}
</script>
<style>
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
