<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-transfer v-model="value2_1"
                     :data="data2_1"
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
      value2_1: [],
    }
  },
  data2_1: [
    { key: "1", label: "变量1" },
    { key: "2", label: "变量2" },
    { key: "3", label: "变量3" },
    { key: "4", label: "变量4" }
  ],
  methos: {
    handleChange2_1(value) {
      console.log(value);
    },
  }
}
</script>

<style>
</style>