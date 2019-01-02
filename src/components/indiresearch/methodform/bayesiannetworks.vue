<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-row>
          <el-transfer v-model="value7_1"
                       :data="data7_1"
                       :titles="['变量', '结局变量']"></el-transfer>
        </el-row>
        <el-row>
          <el-transfer v-model="value7_2"
                       :data="data7_2"
                       :titles="['变量', '自变量']"></el-transfer>

        </el-row>

        <el-row style="margin-top:10px;margin-bottom:10px">
          <form>
            <fieldset class="groupbox-boarder">
              <legend class="one-of-groupbox-boarder">参数设置</legend>
              <el-row>
                模型<el-select v-model="value7"
                           size="mini">
                  <el-option v-for="item in options7"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>

              </el-row>
            </fieldset>
          </form>

        </el-row>
        <el-row style="margin-top:10px;margin-bottom:10px">
          <form>
            <fieldset class="groupbox-boarder">
              <legend class="one-of-groupbox-boarder">高级参数</legend>
              <el-row tyle="margin-top:20px;margin-bottom:10px">
                smoothing<el-input type="number"
                          v-model="input7_1"
                          size="mini"
                          style="width:100px;"></el-input>
                <el-checkbox v-model="check7">fit prior</el-checkbox>

              </el-row>
              <el-row tyle="margin-top:10px;margin-bottom:10px">
                alpha <el-input type="number"
                          v-model="input7_2"
                          size="mini"
                          style="width:100px;"></el-input>
              </el-row>
              <el-row>
                gamma <el-input type="number"
                          v-model="input7_3"
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
      data7_1: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      data7_2: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      value7: [],
      value7_1: [],
      value7_2: [],
      check7: true,
      input7_1: 0.0001,
      input7_2: 1.0,
      input7_3: 1.0,
      options7: [
        {
          value: '选项1',
          label: '高斯'
        }, {
          value: '选项2',
          label: '多项分布'
        },
        {
          value: '选项3',
          label: '伯努利'
        }
      ],
    }
  }

}
</script>
<style>
</style>
