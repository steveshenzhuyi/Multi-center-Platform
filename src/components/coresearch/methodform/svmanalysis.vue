<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-row>
          <el-transfer v-model="value6_1"
                       :data="data6_1"
                       :titles="['变量', '结局变量']"></el-transfer>
        </el-row>
        <el-row>
          <el-transfer v-model="value6_2"
                       :data="data6_2"
                       :titles="['变量', '自变量']"></el-transfer>
        </el-row>

        <el-row style="margin-top:10px;margin-bottom:10px">
          <form>
            <fieldset class="groupbox-boarder">
              <legend class="one-of-groupbox-boarder">参数设置</legend>
              <el-row>
                kernal<el-select v-model="value6"
                           size="mini">
                  <el-option v-for="item in options6"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
                基准精度<el-input v-model="input6_1"
                          type="number"
                          size="mini"
                          style="width:100px;"></el-input>
              </el-row>
              <el-row>
                max iter<el-input v-model="input6_2"
                          type="number"
                          size="mini"
                          style="width:100px;"></el-input>
              </el-row>

            </fieldset>
          </form>

        </el-row>
        <el-row style="margin-top:10px;margin-bottom:10px">
          <form>
            <fieldset class="groupbox-boarder">
              <legend class="one-of-groupbox-boarder">高级参数</legend>

              <el-row tyle="margin-top:20px;margin-bottom:10px">
                惩罚因子C <el-input-number v-model="input6_3"
                                 :precision="1"
                                 :step="0.1"
                                 controls-position="right"
                                 size="mini"
                                 style="width:100px;"></el-input-number>
                degree <el-input-number v-model="input6_4"
                                 :precision="1"
                                 :step="0.1"
                                 controls-position="right"
                                 size="mini"
                                 style="width:100px;"></el-input-number>
              </el-row>
              <el-row tyle="margin-top:10px;margin-bottom:10px">
                核函数常数 <el-input-number v-model="input6_5"
                                 :precision="1"
                                 :step="0.1"
                                 controls-position="right"
                                 size="mini"
                                 style="width:100px;"></el-input-number>
                gamma <el-input-number :precision="1"
                                 :step="0.1"
                                 controls-position="right"
                                 v-model="input6_6"
                                 size="mini"
                                 style="width:100px;"></el-input-number>
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
      options6: [
        {
          value: '选项1',
          label: '多项式'
        }, {
          value: '选项2',
          label: 'Radial basis'
        },
        {
          value: '选项3',
          label: '线性'
        },
        {
          value: '选项4',
          label: 'Sigmoid'
        },

      ],
      input6_1: 0.0001,
      input6_2: 10000,
      input6_3: 1.0,
      input6_4: 1.0,
      input6_5: 1.0,
      input6_6: 1.0,
      value6_1: [],
      value6_2: [],
      value6_3: [],
      value6: [],
      data6_1: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      data6_2: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      data6_3: [
        { key: "1", label: "线性" },
        { key: "2", label: "多项式" },
        { key: "3", label: "Radial basis" },
        { key: "4", label: "Sigmoid" }
      ],

    }
  },
  methods: {

  }
}
</script>

<style>
</style>

