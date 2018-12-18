<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-transfer v-model="value2_2"
                     :data="data2_2"
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
    <el-row>
      <el-transfer v-model="value2_2_2"
                   :data="data2_2_2"
                   :titles="['变量', '分组变量']"></el-transfer>
    </el-row>

    <el-row :gutter="20">

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
      data2_2: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      data2_2_2: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      value2_2: [],
      value2_2_2: [],
      num2_2: 95,
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