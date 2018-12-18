<template>
  <div>
    <el-row>
      <el-col :span="20">
        <el-row :gutter="10">
          <el-col :span="10">
            <fieldset style=" min-width: inherit; height:220px;border-width:0.5px;border-style: double">
              <el-table :data="Varlist"
                        ref="multipleTable"
                        max-height="200"
                        tooltip-effect="dark"
                        @selection-change="handleSelectionChange1">
                <el-table-column type="selection"
                                 width="55">
                </el-table-column>

                <el-table-column prop="variable">
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
                        ref="multipleTable"
                        tooltip-effect="dark"
                        @selection-change="handleSelectionChange2">
                <el-table-column type="selection"
                                 width="55">
                </el-table-column>
                <el-table-column prop="variable"
                                 label="结局变量">
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
export default {
  data() {
    return {

      Varlist: [
        { variable: "变量1" }, { variable: "变量2" }, { variable: "变量3" }, { variable: "变量4" }, { variable: "变量5" }]
      ,
      Chosenlist: [],
      multipleSelection1: [],
      multipleSelection2: [],
      mstjForm: {
        quantile: [],
        centraltendency: [],
        discretetrend: [1],
        distribution: [2],
        chart: [2],

      },

      // checkList1_1: [],
      // checkList1_2: [],
      // checkList1_3: [],
      //checkList1_4: [],
      //checkList1_5: [],
      //value1: [],
      num1: 3,
      //input1: "",
    }
  },
  methods: {
    rightshift: function () {

      this.Chosenlist.push.apply(this.Chosenlist, this.multipleSelection1);
      this.Varlist = this.Varlist.filter(v => !this.multipleSelection1.includes(v))

      //console.log(this.multipleSelection);
      //this.Varlist.overlap(this.Varlist, this.Chosenlist);
      // this.Varlist.splice(index, 1);
      // console.log(this.Varlist);
      // const a = this.Varlist;
      // const b = this.Chosenlist;

      // const c = a.filter(v => !b.includes(v));

      // this.Varlist = c;
      // console.log(this.Varlist);

    },
    leftshift: function () {
      this.Varlist.push.apply(this.Varlist, this.multipleSelection2);
      this.Chosenlist = this.Chosenlist.filter(v => !this.multipleSelection2.includes(v))

    },
    handleSelectionChange1(val) {
      this.multipleSelection1 = val;
      //console.log(this.$refs.multipleTable.store.states.selection);

    },
    handleSelectionChange2(val) {
      this.multipleSelection2 = val;
      //console.log(this.$refs.multipleTable.store.states.selection);

    },
    handleChange1(value) {
      console.log(value);

    },
    //确定就是保存 然后关闭窗口
    save: function () {
      console.log(this.mstjForm.quantile);

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
