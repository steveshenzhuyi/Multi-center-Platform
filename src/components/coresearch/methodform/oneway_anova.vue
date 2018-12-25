<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-transfer v-model="value3_1_1"
                     :data="data3_1_1"
                     :titles="['变量', '因变量']"></el-transfer>

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
      <el-transfer v-model="value3_1_2"
                   :data="data3_1_2"
                   :titles="['变量', '自变量']"></el-transfer>

    </el-row>
    <el-row style="margin-top:10px;margin-bottom:10px">置信区间百分比：
      <el-input-number v-model="num3_1"
                       controls-position="right"
                       @change="handleChange3_1"
                       :min="0"
                       :max="100"></el-input-number>%
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <form>
          <fieldset class="groupbox-boarder">
            <legend class="one-of-groupbox-boarder">分析选项</legend>
            <el-row>
              方差分析类型：
              <el-select v-model="value3_1"
                         size="mini">
                <el-option v-for="item in options3_1"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>

            </el-row>
            <el-checkbox-group v-model="checkList3_1_1">

              <el-row>
                <el-checkbox :label="1">levene方差齐性检验</el-checkbox>
              </el-row>
              <el-row>
                <el-checkbox :label="2">正态性检验</el-checkbox>
              </el-row>
              <el-row>
                <el-checkbox :label="3">因素间交互作用检验</el-checkbox>
              </el-row>
              <el-row>
                <el-checkbox :label="4">tukey检验</el-checkbox>
              </el-row>
            </el-checkbox-group>
          </fieldset>
        </form>
        <!-- <form>
                          <fieldset class="groupbox-boarder">
                            <legend class="one-of-groupbox-boarder"></legend>
                          </fieldset>
                        </form> -->

      </el-col>
      <el-col :span="12">
        <form>
          <fieldset class="groupbox-boarder">
            <legend class="one-of-groupbox-boarder">输出选项</legend>
            <el-checkbox-group v-model="checkList3_1_2">

              <el-row>
                <el-checkbox :label="1">方差分析结果</el-checkbox>
              </el-row>
              <el-row>
                <el-checkbox :label="2">回归结果</el-checkbox>
              </el-row>
              <el-row>
                <el-checkbox :label="3">eta平方</el-checkbox>
              </el-row>
              <el-row>
                <el-checkbox :label="4">omega平方</el-checkbox>
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
      data3_1_1: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      data3_1_2: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      value3_1_1: [],
      value3_1_2: [],
      value3_1: [],
      checkList3_1_1: [1, 2, 3, 4],
      checkList3_1_2: [1, 2, 3],
      num3_1: 95,
      options3_1: [{
        value: '选项1',
        label: 'typeⅠ'
      }, {
        value: '选项2',
        label: 'typeⅡ'
      }, {
        value: '选项3',
        label: 'typeⅢ'
      }],
    }
  },
  methods: {}
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
