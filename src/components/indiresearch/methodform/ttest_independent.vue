<template>
  <div>
    <el-form :model="ttest_2Form"
             ref="ttest_2Form"
             label-width="100px"
             class="demo-ttest_2Form">

      <el-row style="margin-top:10px;margin-bottom:10px">
        模型名称: &nbsp;<el-input v-model="ttest_2Form.methodname"
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
                          :row-class-name="tableRowClassName"
                          @row-click="getRowdetail1"
                          @current-change="handleCurrentChange1">

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
                          highlight-current-row
                          @row-click="getRowdetail2"
                          @current-change="handleCurrentChange2">
                  <el-table-column prop="name"
                                   label="检验变量">
                  </el-table-column>
                  <el-table-column prop="featureId"
                                   v-if="idshow2">
                  </el-table-column>

                </el-table>
              </fieldset>
              <fieldset style="min-width: inherit; height:220px;border-width:0.5px;border-style: double">
                <el-table :data="Chosenlist2"
                          max-height="200"
                          ref="singleTable"
                          tooltip-effect="dark"
                          highlight-current-row
                          @row-click="getRowdetail3"
                          @current-change="handleCurrentChange3">

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
          <el-row style="margin-top: 30%;margin-left:25%;margin-right:25% ">
            <el-button type="primary"
                       @click="save">确定</el-button>
          </el-row>
          <el-row style="margin-top: 15%;margin-left:25%;margin-right:25% ">
            <el-button type="primary"
                       @click="cancel">取消</el-button>
          </el-row>
          <el-row style="margin-top: 15%;margin-left:25%;margin-right:25% ">
            <el-button type="primary"
                       @click="help">帮助</el-button>
          </el-row>
        </el-col>
      </el-row>

      <el-row :gutter="20"
              style="margin-top:30px">

        <el-col :span="12">
          <el-row style="margin-top:10px;margin-bottom:10px">置信区间百分比：
            <el-input-number size="mini"
                             v-model="ttest_2Form.percent"
                             controls-position="right"
                             :min="0"
                             :max="100"></el-input-number>%
          </el-row>
          <el-row>
            <el-checkbox v-model="ttest_2Form.shifou">
              进行方差齐性预检验
            </el-checkbox>
          </el-row>
        </el-col>
        <el-col :span="12">
          <form>
            <fieldset class="groupbox-boarder">
              <legend class="one-of-groupbox-boarder">t检验的方式</legend>
              <el-radio-group v-model="ttest_2Form.tchoose">
                <el-radio :label="3">标准t检验</el-radio></br>
                <el-radio :label="6">Welch t 检验</el-radio></br>
                <el-radio :label="9">根据方差齐性检验结果自动选择</el-radio>
              </el-radio-group>
            </fieldset>
          </form>

        </el-col>

      </el-row>

    </el-form>

  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      idshow1: false,
      idshow2: false,
      idshow3: false,
      currentRow2: [],
      currentRow1: [],
      currentRow3: [],
      ttest_2Form: {
        percent: 95,
        tchoose: 3,
        shifou: true,
      },

      Varlist: [],
      Chosenlist1: [],
      Chosenlist2: [],
      //Varlist: [{ "name": "变量1", "featureId": 12 }, { "name": "变量2", "featureId": 9 }, { "name": "变量3", "featureId": 11 }, { "name": "变量4", "featureId": 7 }],
      index1: -1,

    }
  },
  mounted() {
    this.getVariableTable();
  },
  methods: {
    getVariableTable() {
      axios.get('/feature/getList', {
        params: {
          "token": this.GLOBAL.token
        }
      })
        .then((response) => {
          this.Varlist = response.data.data;
          // this.Varlist.featureId = response.data.data.featureId
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },

    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;

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

      this.currentRow3 = row;


    },
    rightshift: function () {
      console.log('右移1')
      var t = this.currentRow1;
      if (this.index1 != -1) {
        if (this.Chosenlist1.length == 0) {
          this.Chosenlist1.push(t);
          this.Varlist.splice(this.index1, 1)
          this.index1 = -1
          this.currentRow1 = null
        }
        else {

          this.$alert('只能选择一个检验变量');

        }
      } else {
        this.$alert("请选择变量")
      }

    },

    leftshift: function () {
      console.log('左移1')
      var t = this.currentRow2;
      this.Varlist.push(t);

      this.Chosenlist1.splice(0, 1);

    },
    rightshift2: function () {
      console.log('右移2')
      var t = this.currentRow1;
      if (this.index1 != -1) {
        if (this.Chosenlist2.length == 0) {
          this.Chosenlist2.push(t);
          this.Varlist.splice(this.index1, 1);
          this.index1 = -1
          this.currentRow1 = null
        }
        else {
          this.$alert('只能选择一个分组变量');
        }
      }
      else {
        this.$alert('请选择变量')
      }



    },
    leftshift2: function () {
      console.log('左移2')
      var t = this.currentRow3;
      this.Varlist.push(t);
      this.Chosenlist2.splice(0, 1);

    },

    handleCurrentChange1(val) {

      // this.currentRow1 = val;
      // console.log(this.currentRow1)

    },
    handleCurrentChange2(val) {
      //this.currentRow2 = val;
    },
    handleCurrentChange3(val) {

      // this.currentRow3 = val;

    },
    save: function () {

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