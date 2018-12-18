<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-row>
          <el-transfer v-model="value5_1"
                       :data="data5_1"
                       :titles="['变量', '因变量']"></el-transfer>
        </el-row>
        <el-row>
          <el-transfer v-model="value5_2"
                       :data="data5_2"
                       :titles="['变量', '自变量']"></el-transfer>

        </el-row>
        <el-row style="margin-top:10px;margin-bottom:10px">
          <form>
            <fieldset class="groupbox-boarder">
              <legend class="one-of-groupbox-boarder">参数设置</legend>
              <el-checkbox-group v-model="checkList5">

                <el-row>
                  <el-checkbox :label="1">intercept</el-checkbox>
                  基准精度<el-input v-model="input5_1"
                            type="number"
                            size="mini"
                            style="width:100px;"></el-input>
                </el-row>
                <el-row>
                  <el-checkbox :label="2">class weight</el-checkbox>
                </el-row>

              </el-checkbox-group>
            </fieldset>
          </form>

        </el-row>
        <el-row style="margin-top:10px;margin-bottom:10px">
          <form>
            <fieldset class="groupbox-boarder">
              <legend class="one-of-groupbox-boarder">高级参数</legend>
              <el-row>正规化
                <el-select v-model="value5"
                           size="mini">
                  <el-option v-for="item in options5"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
                精度基准<el-input v-model="input5_1"
                          type="number"
                          size="mini"
                          style="width:100px;"></el-input>
              </el-row>
              <el-row style="margin-top:10px;margin-bottom:10px">
                惩罚因子C <el-input type="number"
                          v-model="input5_2"
                          size="mini"
                          style="width:100px;"></el-input>
              </el-row>
            </fieldset>
          </form>

        </el-row>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      data5_1: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      data5_2: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      value5: [],
      value5_1: [],
      value5_2: [],
      checkList5: [1, 2],
      input5_1: 0.0001,
      input5_2: 1.0,
      options5: [{
        value: '选项1',
        label: 'L1'
      }, {
        value: '选项2',
        label: 'L2'
      },],
    }
  }
}
</script>
<style>
</style>