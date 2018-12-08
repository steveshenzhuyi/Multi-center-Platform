<template>
  <el-form ref="diagnoseform"
           :model="diagnoseform"
           label-width="100px"
           size="mini"
           :inline="true"
           class="diagnose">
    <draggable :options="{group:'condition'}">
      <el-checkbox v-model="diagnoseform.debut">首次出现</el-checkbox>
      <el-form-item label="性别">
        <el-input v-model="diagnoseform.sex"></el-input>
      </el-form-item>
      <el-form-item label="记录来源">
        <el-input v-model="diagnoseform.source"></el-input>
      </el-form-item>
      <el-form-item label="诊断类型">
        <el-input v-model="diagnoseform.type"></el-input>
      </el-form-item>
      <el-form-item label="诊断编码集合">
        <el-input v-model="diagnoseform.code"></el-input>
        <el-checkbox v-model="diagnoseform.codechecked"
                     class="except">不在其之间</el-checkbox>
      </el-form-item>
      <el-form-item label="诊断年龄">
        <el-input-number v-model="diagnoseform.age1"
                         controls-position="right"
                         @change="ageChange"
                         :min="0"
                         :max="120"></el-input-number><span class="line"> - </span>
        <el-input-number v-model="diagnoseform.age2"
                         controls-position="right"
                         @change="ageChange"
                         :min="0"
                         :max="120"></el-input-number>
        <el-checkbox v-model="diagnoseform.agechecked"
                     class="except">不在其之间</el-checkbox>
      </el-form-item>
      <el-form-item label="诊断日期">
        <el-date-picker v-model="diagnoseform.date"
                        type="daterange"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
        <el-checkbox v-model="diagnoseform.datechecked"
                     class="except">不在其之间</el-checkbox>
      </el-form-item>
    </draggable>

  </el-form>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable,
  },
  data() {
    return {
      diagnoseform: {
        debut: false,
        sex: '',
        code: '',
        codechecked: false,
        age1: '',
        age2: '',
        agechecked: false,
        type: '',
        date: '',
        datechecked: false,
        source: ''
      }
    }
  },
  methods: {
    ageChange(value) {
      console.log(value);
    }
  }
}
</script>
<style>
.diagnose .el-input__inner {
  display: none;
}
.diagnose .el-checkbox__input {
  display: none;
}
.diagnose .el-input-number {
  display: none;
}
.diagnose .el-range-input {
  display: none;
}
.diagnose .el-range-editor.el-input__inner {
  display: none;
}
.diagnose .except {
  display: none;
}
.diagnose .line {
  display: none;
}
.diagnose .el-checkbox__label {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 2px 2px 2px 2px;
  box-shadow: 0 8px 6px -6px #777;
  padding: 0 20px;
  display: inline-block;
  margin: 0 5px 12px 0;
  line-height: 38px;
  text-align: center;
}
.diagnose .el-form-item__label {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 2px 2px 2px 2px;
  box-shadow: 0 8px 6px -6px #777;
  padding: 0 20px;
  display: inline-block;
  margin: 0 5px 12px 0;
  text-align: center;
}
.diagnose .el-form-item--mini .el-form-item__label {
  line-height: 38px;
}
</style>
