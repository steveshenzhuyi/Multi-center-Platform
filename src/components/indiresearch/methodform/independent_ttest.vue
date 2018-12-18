<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="20">
        <!-- <el-transfer v-model="value2_2"
                     :data="data2_2"
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
              <el-table :data="Chosenlist"
                        max-height="200"
                        ref="multipleTable"
                        tooltip-effect="dark"
                        @selection-change="handleSelectionChange2">
                <el-table-column type="selection"
                                 width="55">
                </el-table-column>
                <el-table-column prop="variable"
                                 label="检验变量">
                </el-table-column>

              </el-table>
            </fieldset>
            <fieldset style="  min-width: inherit; height:220px;border-width:0.5px;border-style: double;margin-top:5%">
              <el-table :data="Chosenlist2"
                        max-height="200"
                        ref="multipleTable"
                        tooltip-effect="dark"
                        @selection-change="handleSelectionChange3">
                <el-table-column type="selection"
                                 width="55">
                </el-table-column>
                <el-table-column prop="variable"
                                 label="分组变量">
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
    <!-- <el-row>
      <el-transfer v-model="value2_2_2"
                   :data="data2_2_2"
                   :titles="['变量', '分组变量']"></el-transfer>
    </el-row> -->

    <el-row :gutter="20"
            style="margin-top:30px">

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
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio2_2: 3,
      // data2_2: [
      //   { key: "1", label: "变量1" },
      //   { key: "2", label: "变量2" },
      //   { key: "3", label: "变量3" },
      //   { key: "4", label: "变量4" }
      // ],
      // data2_2_2: [
      //   { key: "1", label: "变量1" },
      //   { key: "2", label: "变量2" },
      //   { key: "3", label: "变量3" },
      //   { key: "4", label: "变量4" }
      // ],
      // value2_2: [],
      // value2_2_2: [],
      num2_2: 95,

      Varlist: [
        { variable: "变量1" }, { variable: "变量2" }, { variable: "变量3" }, { variable: "变量4" }, { variable: "变量5" }]
      ,
      Chosenlist: [],
      Chosenlist2: [],
      multipleSelection1: [],
      multipleSelection2: [],
      multipleSelection3: [],
    }
  },
  methods: {
    rightshift: function () {

      this.Chosenlist.push.apply(this.Chosenlist, this.multipleSelection1);
      this.Varlist = this.Varlist.filter(v => !this.multipleSelection1.includes(v))

    },
    leftshift: function () {
      this.Varlist.push.apply(this.Varlist, this.multipleSelection2);
      this.Chosenlist = this.Chosenlist.filter(v => !this.multipleSelection2.includes(v))

    },
    rightshift2: function () {
      this.Chosenlist2.push.apply(this.Chosenlist2, this.multipleSelection1);
      this.Varlist = this.Varlist.filter(v => !this.multipleSelection1.includes(v))
    },
    leftshift2: function () {
      this.Varlist.push.apply(this.Varlist, this.multipleSelection3);
      // this.Chosenlist2 = this.Chosenlist2.filter(v => !this.multipleSelection3.includes(v))
      this.Chosenlist2 = this.Chosenlist2.filter(v => !this.multipleSelection3.includes(v))
    },
    handleSelectionChange1(val) {
      this.multipleSelection1 = val;
      //console.log(this.$refs.multipleTable.store.states.selection);
    },
    handleSelectionChange2(val) {
      this.multipleSelection2 = val;
      //console.log(this.$refs.multipleTable.store.states.selection);
    },
    handleSelectionChange3(val) {
      this.multipleSelection3 = val;

    },
    handleChange2_2(value) {

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