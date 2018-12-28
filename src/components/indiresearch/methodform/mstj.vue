<template>
  <div>

    <el-form :model="mstjForm"
             ref="mstjForm"
             label-width="100px"
             class="demo-mstjForm">

      <el-row style="margin-top:10px;margin-bottom:10px">
        模型名称: &nbsp;<el-input v-model="mstjForm.methodname"
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
                          :row-class-name="tableRowClassName"
                          @row-click="getRowdetail1"
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

      <!-- 
    <el-form ref="form"
             :model="mstjForm"> -->
      <el-row :gutter="20"
              style="margin-top:10px;margin-bottom:10px">
        <el-col :span="16">
          <el-row>

            <fieldset class="groupbox-boarder">
              <legend class="one-of-groupbox-boarder">百分位数</legend>
              <el-checkbox-group v-model="mstjForm.quantile">
                <el-row>
                  <el-checkbox :label="1">中位数</el-checkbox>
                </el-row>
                <el-row>

                  <el-checkbox :label="2">百分位数：</el-checkbox>

                  <el-input-number v-model="mstjForm.num1"
                                   :disabled="!mstjForm.quantile.includes(2)"
                                   size="mini"
                                   controls-position="right"
                                   :min="0"
                                   :max="100"></el-input-number>

                </el-row>

              </el-checkbox-group>
            </fieldset>
            <fieldset class="groupbox-boarder">
              <legend class="one-of-groupbox-boarder">集中趋势</legend>
              <el-checkbox-group v-model="mstjForm.centraltendency">

                <el-row>
                  <el-checkbox :label="1">均值</el-checkbox>
                </el-row>
                <el-row>
                  <el-checkbox :label="2">几何平均数</el-checkbox>
                </el-row>
                <el-row>
                  <el-checkbox :label="3">众数</el-checkbox>
                </el-row>
              </el-checkbox-group>
            </fieldset>

          </el-row>
          <el-row style="margin-top:10px;margin-bottom:10px">

            <fieldset class="groupbox-boarder">
              <legend class="one-of-groupbox-boarder"> 离散趋势</legend>
              <el-checkbox-group v-model="mstjForm.discretetrend">
                <el-col :span="8">
                  <el-row>
                    <el-checkbox :label="1">极大值</el-checkbox>
                  </el-row>
                  <el-row>
                    <el-checkbox :label="2">极小值</el-checkbox>
                  </el-row>

                </el-col>
                <el-col :span="16">
                  <el-row>
                    <el-checkbox :label="3">方差</el-checkbox>
                  </el-row>
                  <el-row>
                    <el-checkbox :label="4">标准差</el-checkbox>
                  </el-row>

                </el-col>
              </el-checkbox-group>
            </fieldset>

          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>

            <fieldset class="groupbox-boarder">
              <legend class="one-of-groupbox-boarder">分布状态</legend>
              <el-checkbox-group v-model="mstjForm.distribution">
                <el-row>
                  <el-checkbox :label="1">偏度（Skewness）</el-checkbox>
                </el-row>
                <el-row>
                  <el-checkbox :label="2">峰度（Kurtosis）</el-checkbox>
                </el-row>
              </el-checkbox-group>
            </fieldset>

          </el-row>
          <el-row style="margin-top:10px;margin-bottom:10px">

            <fieldset class="groupbox-boarder">
              <legend class="one-of-groupbox-boarder">图表</legend>
              <el-checkbox-group v-model="mstjForm.chart">
                <el-row>
                  <el-checkbox :label="1">条形图</el-checkbox>
                </el-row>
                <el-row>
                  <el-checkbox :label="2">饼图</el-checkbox>
                </el-row>
                <el-row>
                  <el-checkbox :label="3">折线图</el-checkbox>
                </el-row>
                <el-row>
                  <el-checkbox :label="4">箱线图</el-checkbox>
                </el-row>
                <el-row>
                  <el-checkbox :label="5">直方图</el-checkbox>
                </el-row>
                <el-row>
                  <el-checkbox :label="6">散点图</el-checkbox>
                </el-row>
              </el-checkbox-group>
            </fieldset>

          </el-row>
        </el-col>

      </el-row>
    </el-form>
  </div>
</template>
<script>
import Vue from 'vue';
import axios from 'axios';

export default {
  props: ['mid'],
  data() {
    return {
      MethodDetails: '',
      idshow: false,
      idshow2: false,
      Varlist: [],
      Chosenlist: [],

      currentRow2: [],
      currentRow1: [],
      mstjForm: {
        quantile: [],
        centraltendency: [],
        discretetrend: [],
        distribution: [],
        chart: [],
        num1: '',
        methodname: '',

      },

      List1: [],
      index1: -1,
    }
  },
  mounted() {
    // console.log(this.GLOBAL.token)
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

    //获取修改的模型ID
    getModleID() {
      if (this.mid) {
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
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex



    },
    getRowdetail1(row, event, column) {

      this.index1 = row.index;
      this.currentRow1 = row;


    },

    rightshift: function () {
      // var t = this.Chosenlist.length;
      if (this.index1 != -1) {
        if (this.Chosenlist.length < 1) {
          this.Chosenlist.push(this.currentRow1);
          this.Varlist.splice(this.index1, 1);
          this.index1 = -1;
        }
        else {

          this.$message('只能选择一个目标变量');

        }
      } else {
        this.$alert("请选择变量")
      }

    },
    leftshift: function () {
      this.Varlist.push(this.currentRow2);
      this.Chosenlist.splice(this.currentRow2, 1);


    },
    handleCurrentChange1(val) {

      // this.currentRow1 = val;
      //console.log(this.currentRow1.featureId);
    },
    handleCurrentChange2(val) {
      this.currentRow2 = val;
    },

    save: function () {

      //console.log(this.Chosenlist.length);
      for (var i = 0; i < this.Chosenlist.length; i++) {

        var f = { "sortNo": i + 1, "featureId": this.Chosenlist[i].featureId, "featureType": 1 }
        this.List1.push(f);


      }


      axios.post('/model/create', {
        "token": this.GLOBAL.token,
        //"name": JSON.stringify(this.mstjForm.methodname),
        "name": this.mstjForm.methodname,
        "modelTypeLayer1Code": 1,
        "modelTypeLayer2Code": 1,
        "data": {
          "data1": JSON.stringify(this.mstjForm.quantile),
          "data2": JSON.stringify(this.mstjForm.centraltendency),
          "data3": JSON.stringify(this.mstjForm.discretetrend),
          "data4": JSON.stringify(this.mstjForm.distribution),
          "data5": JSON.stringify(this.mstjForm.chart),
          "data6": JSON.stringify(this.mstjForm.num1),
        },

        "feature": this.List1,





      })
        .then(response => {
          if (response.data.code == "0") {
            this.$alert('创建成功');
            console.log(response.data.id)
            // this.getVariableTable()
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });




    },
    //取消，关闭窗口
    cancel: function () {



    },
    //帮助
    help: function () {


    }



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
