<template>
  <div>
    <el-form :model="ttest_3Form"
             ref="ttest_3Form"
             label-width="100px"
             class="demo-ttest_2Form">

      <el-row style="margin-top:10px;margin-bottom:10px">
        模型名称: &nbsp;<el-input v-model="ttest_3Form.methodname"
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
                          @current-change="handleCurrentChange2">

                  <el-table-column prop="name"
                                   label="检验变量">
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
                          @current-change="handleCurrentChange2">

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
              style="margin-top:10px;margin-bottom:10px">

        <el-col :span="12">
          <el-row>置信区间百分比：
            <el-input-number v-model="ttest_3Form.percent"
                             controls-position="right"
                             :min="0"
                             :max="100"></el-input-number>%
          </el-row>
        </el-col>
        <el-col :span="12">

          <fieldset class="groupbox-boarder">
            <legend class="one-of-groupbox-boarder">预检验</legend>
            <el-checkbox-group v-model="ttest_3Form.tchoose">
              <el-row>
                <el-checkbox :label="1">方差齐性预检验</el-checkbox>
              </el-row>
              <el-row>
                <el-checkbox :label="2">组别相关性检验</el-checkbox>
              </el-row>
            </el-checkbox-group>
          </fieldset>

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
      ttest_3Form: {
        percent: 95,
        tchoose: '',



      },
      Varlist: [
      ]
      ,
      Chosenlist1: [],
      Chosenlist2: [],

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
    rightshift: function () {
      if (this.Chosenlist1.length < 1) {
        this.Chosenlist1.push(this.currentRow1);
        console.log(this.Chosenlist1)
        this.Varlist.splice(this.currentRow1, 1);

      }
      else {

        this.$message('只能选择一个检验变量');

      }

    },
    leftshift: function () {
      this.Varlist.push(this.currentRow2);
      this.Chosenlist1.splice(this.currentRow2, 1);
    },
    rightshift2: function () {
      if (this.Chosenlist2.length < 1) {
        this.Chosenlist2.push(this.currentRow1);
        this.Varlist.splice(this.currentRow1, 1);
      }
      else {

        this.$message('只能选择一个分组变量');

      }

    },
    leftshift2: function () {
      this.Varlist.push(this.currentRow3);
      this.Chosenlist2.splice(this.currentRow3, 1);
    },
    handleCurrentChange1(val) {

      this.currentRow1 = val;
      //console.log(this.currentRow1.featureId);
    },
    handleCurrentChange2(val) {
      this.currentRow2 = val;
    },
    handleCurrentChange3(val) {

      this.currentRow3 = val;
      //console.log(this.currentRow1.featureId);
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