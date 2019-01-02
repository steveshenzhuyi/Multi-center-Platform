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
                       v-if="isnew"
                       @click="save">确定</el-button>
            <el-button type="primary"
                       v-else
                       @click="edit">编辑</el-button>
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
      //后端传入的变量表
      VarTable: [],
      isnew: true,
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

    //先获取变量列表
    this.getVariableTable();
    this.getModleID();
    //根据是否传入modleid判断是新建还是编辑


  },
  watch: {
    mid: function (newValue, oldValue) {
      console.log(oldValue) // 旧的值
      console.log(newValue) // 新的值
    }
  },
  // created() {
  //   // this.getModleID();
  //   // this.getVariableTable();
  //   this.getVariableTable();
  //   this.getModleID();
  // },



  methods: {


    //新建方法时获取变量
    getVariableTable() {

      axios.get('/feature/getList', {
        params: {
          "token": this.GLOBAL.token
        }
      })
        .then((response) => {
          var cashdata = [];
          cashdata = response.data.data;
          // this.Varlist=response.data.data;
          //变量列表存储
          for (var i = 0; i < cashdata.length; i++) {
            var a = cashdata[i].name
            var b = parseInt(cashdata[i].featureId)
            this.VarTable.push({ "name": a, "featureId": b })
          }
          // console.log('打印变量表')
          // console.log(this.VarTable)

        })
        .catch(function (error) {
          console.log("error", error);
        });
    },

    //获取修改的模型ID
    getModleID() {
      if (this.mid != -1) {

        axios.get('/model/getDetail', {
          params: {
            "token": this.GLOBAL.token,
            "modelId": this.mid
          }
        })
          .then(response => {
            if (response.data.code == "0") {
              this.MethodDetails = response.data.data
              this.mstjForm.methodname = this.MethodDetails.name;


              this.mstjForm.quantile = JSON.parse(this.MethodDetails.data.data1);
              //console.log(this.mstjForm.quantile);
              this.mstjForm.centraltendency = JSON.parse(this.MethodDetails.data.data2);
              this.mstjForm.discretetrend = JSON.parse(this.MethodDetails.data.data3);
              this.mstjForm.distribution = JSON.parse(this.MethodDetails.data.data4);
              this.mstjForm.chart = JSON.parse(this.MethodDetails.data.data5);
              this.mstjForm.num1 = JSON.parse(this.MethodDetails.data.data6);
              this.isnew = false
              var todolist = this.MethodDetails.feature;
              console.log(todolist);
              this.checklist(todolist);
              //这边解析数组


            }
          })
          .catch(function (error) {
            console.log("error", error);
          });

      }
      else {
        if (this.VarTable != null) {
          this.Varlist = this.VarTable;
          // console.log('打印页面变量表')
          // console.log(this.Varlist)

        }

      }


    },
    checklist(t) {
      if (t.length != 0) {
        var choosenId = parseInt(t[0].featureId);//获得选中的变量id

        // console.log(choosenId);
        // console.log(this.VarTable.length)
        var data1 = this.VarTable;
        this.Chosenlist = data1.filter(function (item) {
          return item.featureId == choosenId;


          //this.Chosenlist.push(item)
        })
        var data2 = this.VarTable;
        var t = this.remove(this.VarTable, choosenId);
        data2.splice(t, 1)
        this.Varlist = data2



      }
    },
    //返回索引
    remove(arr, cd) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].featureId == cd) return i;
      }
      return -1;


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

      // console.log(this.Chosenlist)
      // if (this.Chosenlist.length != 0) {

      //   this.List1.push({ 'sortNo': 1, 'featureID': this.Chosenlist[0].featureID, 'featureType': 1 })
      // }
      // console.log(this.List1)

      // 只有一个变量直接写也成吧


      for (var i = 0; i < this.Chosenlist.length; i++) {
        // console.log(this.Chosenlist[i].featureId)

        var f = { 'sortNo': i + 1, 'featureId': this.Chosenlist[i].featureId, 'featureType': 1 }
        this.List1.push(f);


      }
      console.log(this.List1)


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

        "feature": this.List1





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
    //编辑
    edit: function () {

      for (var i = 0; i < this.Chosenlist.length; i++) {
        // console.log(this.Chosenlist[i].featureId)

        var f = { 'sortNo': i + 1, 'featureId': this.Chosenlist[i].featureId, 'featureType': 1 }
        this.List1.push(f);


      }
      console.log(this.List1)


      axios.post('/model/edit', {
        "token": this.GLOBAL.token,

        "modelId": this.mid,
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

        "feature": this.List1





      })
        .then(response => {
          if (response.data.code == "0") {
            this.$alert('修改成功');
            console.log(response.data.data.modelId)
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
