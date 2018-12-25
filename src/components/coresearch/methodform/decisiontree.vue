<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-row>
          <el-transfer v-model="value8_1"
                       :data="data8_1"
                       :titles="['变量', '结局变量']"></el-transfer>
        </el-row>
        <el-row>
          <el-transfer v-model="value8_2"
                       :data="data8_2"
                       :titles="['变量', '自变量']"></el-transfer>
        </el-row>

        <el-row style="margin-top:10px;margin-bottom:10px">
          <form>
            <fieldset class="groupbox-boarder">
              <legend class="one-of-groupbox-boarder">参数设置</legend>
              <el-row>
                criterion<el-select v-model="value8"
                           size="mini">
                  <el-option v-for="item in options8"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
                <el-checkbox v-model="check8">class weight</el-checkbox>

              </el-row>
              <el-row tyle="margin-top:20px;margin-bottom:10px">
                max deepth<el-input type="number"
                          v-model="input8_1"
                          size="mini"
                          style="width:100px;"></el-input>

              </el-row>
              <el-row tyle="margin-top:20px;margin-bottom:10px">
                max features<el-input type="number"
                          v-model="input8_2"
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
                min samples split<el-input type="number"
                          v-model="input8_3"
                          size="mini"
                          style="width:100px;"></el-input>

              </el-row>
              <el-row tyle="margin-top:10px;margin-bottom:10px">
                min samples leaf <el-input type="number"
                          v-model="input8_4"
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
      options8: [
        {
          value: '选项1',
          label: '信息增益'
        }, {
          value: '选项2',
          label: 'gini impurity'
        }
      ],
      input8_1: 8,
      input8_2: 5,
      input8_3: 5,
      input8_4: 2,
      check8: true,
      value8: [],
      value8_1: [],
      value8_2: [],
      data8_1: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      data8_2: [
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
</style>

