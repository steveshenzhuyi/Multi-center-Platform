<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-row>
          <el-transfer v-model="value4_1"
                       :data="data4_1"
                       :titles="['变量', '因变量']"></el-transfer>
        </el-row>
        <el-row>
          <el-transfer v-model="value4_2"
                       :data="data4_2"
                       :titles="['变量', '自变量']"></el-transfer>

        </el-row>
        <el-row style="margin-top:10px;margin-bottom:10px">
          <form>
            <fieldset class="groupbox-boarder">
              <legend class="one-of-groupbox-boarder">参数设置</legend>
              <el-checkbox-group v-model="checkList4">

                <el-row>
                  <el-checkbox :label="1">interception</el-checkbox>
                </el-row>
                <el-row>
                  <el-checkbox :label="2">normalization</el-checkbox>
                </el-row>

              </el-checkbox-group>
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
      checkList4: [2],
      value4_1: [],
      value4_2: [],
      data4_1: [
        { key: "1", label: "变量1" },
        { key: "2", label: "变量2" },
        { key: "3", label: "变量3" },
        { key: "4", label: "变量4" }
      ],
      data4_2: [
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