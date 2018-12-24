<template>
  <div>
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
                                 label="结局变量">
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
    <el-form ref="form"
             :model="mstjForm">
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
                                   @change="handleChange1"
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
import axios from 'axios';
export default {
  data() {
    return {

      // Varlist: [
      //   { variable: "变量1" }, { variable: "变量2" }, { variable: "变量3" }, { variable: "变量4" }, { variable: "变量5" }]
      // ,
      idshow: false,
      idshow2: false,
      Varlist: [],
      Chosenlist: [],
      // multipleSelection1: [],
      // multipleSelection2: [],
      // handleCurrentChange2:[],
      // handleCurrentChange1:[],
      currentRow2: [],
      currentRow1: [],
      mstjForm: {
        quantile: [],
        centraltendency: [],
        discretetrend: [],
        distribution: [],
        chart: [],
        num1: '',

      },
      // 
      fl: {
        sortNo: '',
        featureId: '',
        featureType: '',
      },
      List1: [],
      // checkList1_1: [],
      // checkList1_2: [],
      // checkList1_3: [],
      //checkList1_4: [],
      //checkList1_5: [],
      //value1: [],
      //num1: 3,
      //input1: "",
    }
  },
  mounted() {
    // console.log(this.GLOBAL.token)
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
      this.Chosenlist.push(this.currentRow1);
      // console.log(this.Chosenlist[0].featureId)
      this.Varlist.splice(this.currentRow1, 1);


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

    // handleSelectionChange1(val) {
    //   this.multipleSelection1 = val;


    // },
    // handleSelectionChange2(val) {
    //   this.multipleSelection2 = val;


    // },
    handleChange1(value) {
      // console.log(value);

    },
    //确定就是保存 然后关闭窗口
    save: function () {


      console.log(this.Chosenlist.length);
      for (var i = 0; i < this.Chosenlist.length; i++) {

        // var a = i + 1;
        // var b = this.Chosenlist[i].featureId
        // var c = 1;
        //var f = { "sortNo": a, "featureId": b, "featureType": c };
        var ff = { "sortNo": i + 1, "featureId": this.Chosenlist[i].featureId, "featureType": 1 }
        this.List1.push(f);




      }
      console.log(this.List1)

      axios.post('/model/create', {
        "token": this.GLOBAL.token,
        // "name":JSON.stringify(this.mstjForm.name),
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
