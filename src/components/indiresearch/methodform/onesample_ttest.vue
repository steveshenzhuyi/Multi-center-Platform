<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="20">
        <!-- <el-transfer v-model="value2_1"
                     :data="data2_1"
                     :titles="['变量', '目标变量']"></el-transfer> -->
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      num2_1: 95,
      //value2_1: [],

      Varlist: [
        { variable: "变量1" }, { variable: "变量2" }, { variable: "变量3" }, { variable: "变量4" }, { variable: "变量5" }]
      ,
      Chosenlist: [],
      multipleSelection1: [],
      multipleSelection2: [],


    }
  },
  // data2_1: [
  //   { key: "1", label: "变量1" },
  //   { key: "2", label: "变量2" },
  //   { key: "3", label: "变量3" },
  //   { key: "4", label: "变量4" }
  // ],

  methods: {
    handleChange2_1(value) {
      console.log(value);
    },



    rightshift: function () {

      this.Chosenlist.push.apply(this.Chosenlist, this.multipleSelection1);
      this.Varlist = this.Varlist.filter(v => !this.multipleSelection1.includes(v))



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
  }
}
</script>

<style>
</style>