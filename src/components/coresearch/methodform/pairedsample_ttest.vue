<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-transfer v-model="value2_3"
                     :data="data2_3"
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
      <el-transfer v-model="value2_3_2"
                   :data="data2_3_2"
                   :titles="['变量', '分组变量']"></el-transfer>

    </el-row>
    <el-row :gutter="20"
            style="margin-top:10px;margin-bottom:10px">

      <el-col :span="12">
        <el-row>置信区间百分比：
          <el-input-number v-model="num2_3"
                           controls-position="right"
                           @change="handleChange2_3"
                           :min="0"
                           :max="100"></el-input-number>%
        </el-row>
      </el-col>
      <el-col :span="12">

        <form>
          <fieldset class="groupbox-boarder">
            <legend class="one-of-groupbox-boarder">预检验</legend>
            <el-checkbox-group v-model="checkList2_3">
              <el-row>
                <el-checkbox :label="1">方差齐性预检验</el-checkbox>
              </el-row>
              <el-row>
                <el-checkbox :label="2">组别相关性检验</el-checkbox>
              </el-row>
            </el-checkbox-group>
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
      num2_3: 95,
      value2_3: [],
      value2_3_2: [],
      data2_3: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      data2_3_2: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
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