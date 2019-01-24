<template>
  <div>
    <!-- 选择框 -->
    <el-row style="margin-top:15px">
      <el-col :span=5
              :offset=17>
        <el-radio-group v-model="OptionValue"
                        fill="#909399"
                        size="medium">
          <el-radio-button v-for="item in options"
                           :key="item.OptionValue"
                           :label="item.OptionValue">{{item.label}}</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <!-- 用户管理 -->
    <div v-if="OptionValue==0">
      <component :is="myusermanage"></component>
    </div>
    <!-- 权限管理 -->
    <div v-if="OptionValue==1">
      <component :is="myauthoritymanage"></component>
    </div>
  </div>
</template>

<script>
import usermanage from './userauthority/usermanage.vue'
import authoritymanage from './userauthority/authoritymanage.vue'
export default {
  data() {
    return {
      // ------下拉框------
      options: [{ OptionValue: 0, label: '用户管理' }, { OptionValue: 1, label: '权限管理' }],
      OptionValue: 0,
      myusermanage: usermanage,
      myauthoritymanage: authoritymanage
    }
  },
  methods: {
  }
}
</script>

<style>
</style>