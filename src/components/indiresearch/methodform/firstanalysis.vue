<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-transfer v-model="value1"
                     :data="data1"
                     :titles="['变量', '目标变量']"></el-transfer>
      </el-col>
      <el-col :span="6">
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
    <el-row :gutter="20"
            style="margin-top:10px;margin-bottom:10px">
      <el-col :span="16">
        <el-row>
          <form>
            <fieldset class="groupbox-boarder">
              <legend class="one-of-groupbox-boarder">百分位数</legend>
              <el-checkbox-group v-model="checkList1_1">
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
              <el-checkbox-group v-model="checkList1_2">
                <el-row>
                  <el-checkbox :label="5">均值</el-checkbox>
                </el-row>
                <el-row>
                  <el-checkbox :label="6">几何平均数</el-checkbox>
                </el-row>
                <el-row>
                  <el-checkbox :label="7">众数</el-checkbox>
                </el-row>
              </el-checkbox-group>
            </fieldset>

          </form>
        </el-row>
        <el-row style="margin-top:10px;margin-bottom:10px">

          <form>
            <fieldset class="groupbox-boarder">
              <legend class="one-of-groupbox-boarder"> 离散趋势</legend>
              <el-checkbox-group v-model="checkList1_3">
                <el-col :span="8">
                  <el-row>
                    <el-checkbox :label="11">极大值</el-checkbox>
                  </el-row>
                  <el-row>
                    <el-checkbox :label="13">极小值</el-checkbox>
                  </el-row>

                </el-col>
                <el-col :span="16">
                  <el-row>
                    <el-checkbox :label="12">方差</el-checkbox>
                  </el-row>
                  <el-row>
                    <el-checkbox :label="14">标准差</el-checkbox>
                  </el-row>

                </el-col>
              </el-checkbox-group>
            </fieldset>
          </form>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>

          <form>
            <fieldset class="groupbox-boarder">
              <legend class="one-of-groupbox-boarder">分布状态</legend>
              <el-checkbox-group v-model="checkList1_4">
                <el-row>
                  <el-checkbox :label="1">偏度（Skewness）</el-checkbox>
                </el-row>
                <el-row>
                  <el-checkbox :label="2">峰度（Kurtosis）</el-checkbox>
                </el-row>
              </el-checkbox-group>
            </fieldset>
          </form>

        </el-row>
        <el-row style="margin-top:10px;margin-bottom:10px">
          <form>
            <fieldset class="groupbox-boarder">
              <legend class="one-of-groupbox-boarder">图表</legend>
              <el-checkbox-group v-model="checkList1_5">
                <el-row>
                  <el-checkbox :label="5">条形图</el-checkbox>
                </el-row>
                <el-row>
                  <el-checkbox :label="6">饼图</el-checkbox>
                </el-row>
                <el-row>
                  <el-checkbox :label="7">折线图</el-checkbox>
                </el-row>
                <el-row>
                  <el-checkbox :label="8">箱线图</el-checkbox>
                </el-row>
                <el-row>
                  <el-checkbox :label="9">直方图</el-checkbox>
                </el-row>
                <el-row>
                  <el-checkbox :label="10">散点图</el-checkbox>
                </el-row>
              </el-checkbox-group>
            </fieldset>
          </form>

        </el-row>
      </el-col>

    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data1: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],

      checkList1_1: [],


      checkList1_2: [],
      checkList1_3: [],
      checkList1_4: [],
      checkList1_5: [],
      value1: [],
      num1: 3,
      input1: "",
    }
  },
  methods: {

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
