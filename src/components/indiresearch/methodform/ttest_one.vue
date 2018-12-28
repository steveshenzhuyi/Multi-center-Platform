<template>
  <div>
    <el-form :model="ttest_1Form"
             ref="ttest_1Form"
             label-width="100px"
             class="demo-ttest_1Form">

      <el-row style="margin-top:10px;margin-bottom:10px">
        模型名称: &nbsp;<el-input v-model="ttest_1Form.methodname"
                  size="mini"
                  style="width:200px;"></el-input>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-row :gutter="10">
            <el-col :span="10">
              <fieldset style=" min-width: inherit; height:220px;border-width:0.5px;border-style: double">
                <el-table :data="Varlist"
                          ref="singleTable"
                          max-height="200"
                          tooltip-effect="dark"
                          @current-change="handleCurrentChange1">
                  <!-- <el-table-column type="selection"
                                 width="55">
                </el-table-column> -->

                  <el-table-column prop="name">
                  </el-table-column>
                  <el-table-column prop="featureId"
                                   v-if="idshow">

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
            </el-col>
            <el-col :span="10">
              <fieldset style="  min-width: inherit; height:220px;border-width:0.5px;border-style: double">
                <el-table :data="Chosenlist"
                          max-height="200"
                          ref="singleTable"
                          tooltip-effect="dark"
                          @current-change="handleCurrentChange2">
                  <!-- <el-table-column type="selection"
                                 width="55">
                </el-table-column> -->
                  <el-table-column prop="name"
                                   label="目标变量">
                  </el-table-column>
                  <el-table-column prop="featureId"
                                   v-if="idshow2">

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

      <el-row style="margin-top:10px;margin-bottom:10px">置信区间百分比：
        <el-input-number v-model="ttest_1Form.percent"
                         controls-position="right"
                         :min="0"
                         :max="100"></el-input-number>%

      </el-row>
      <el-row style="margin-top:10px;margin-bottom:10px">零假设的期望值：
        <el-input style="width:180px;"
                  v-model="ttest_1Form.expect"></el-input>

      </el-row>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  props: ['mid'],
  data() {
    return {

      ttest_1Form: {
        percent: 95,
        expect: '',
        methodname: '',


      },
      // num2_1: 95,
      // //value2_1: [],
      idshow: false,
      idshow2: false,
      Varlist: [],
      Chosenlist: [],

      currentRow2: [],
      currentRow1: [],


      // Varlist: [
      //   { variable: "变量1" }, { variable: "变量2" }, { variable: "变量3" }, { variable: "变量4" }, { variable: "变量5" }]
      // ,
      // Chosenlist: [],
      // multipleSelection1: [],
      // multipleSelection2: [],


    }
  },

  mounted() {
    this.getVariableTable();
    this.getModleID();
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
    getModleID() {
      if (this.mid) {
        console.log(this.mid)
        axios.get('/model/getDetail', {
          params: {
            "token": this.GLOBAL.token,
            "modelId": this.mid
          }
        })
          .then(response => {
            if (response.data.code == "0") {
              this.MethodDetails = response.data.data
              var t = this.MethodDetails.name;
              console.log(t)

            }
          })
          .catch(function (error) {
            console.log("error", error);
          });

      }


    },


    rightshift: function () {
      // var t = this.Chosenlist.length;
      if (this.Chosenlist.length < 1) {
        this.Chosenlist.push(this.currentRow1);
        this.Varlist.splice(this.currentRow1, 1);
      }
      else {

        this.$message('只能选择一个目标变量');

      }

    },
    leftshift: function () {
      this.Varlist.push(this.currentRow2);
      this.Chosenlist.splice(this.currentRow2, 1);


    },
    handleCurrentChange1(val) {

      this.currentRow1 = val;
      //console.log(this.currentRow1.featureId);
    },
    handleCurrentChange2(val) {
      this.currentRow2 = val;
    },
    save: function () {

    },
    cancel: function () {

    },
    help: function () {

    },




    // handleChange2_1(value) {
    //   console.log(value);
    // },



    // rightshift: function () {

    //   this.Chosenlist.push.apply(this.Chosenlist, this.multipleSelection1);
    //   this.Varlist = this.Varlist.filter(v => !this.multipleSelection1.includes(v))



    // },
    // leftshift: function () {
    //   this.Varlist.push.apply(this.Varlist, this.multipleSelection2);
    //   this.Chosenlist = this.Chosenlist.filter(v => !this.multipleSelection2.includes(v))

    // },
    // handleSelectionChange1(val) {
    //   this.multipleSelection1 = val;
    //   //console.log(this.$refs.multipleTable.store.states.selection);

    // },
    // handleSelectionChange2(val) {
    //   this.multipleSelection2 = val;
    //   //console.log(this.$refs.multipleTable.store.states.selection);

    // },
  }
}
</script>

<style>
</style>