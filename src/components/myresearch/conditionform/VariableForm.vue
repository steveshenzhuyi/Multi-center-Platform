<template>
  <el-form ref="VariableForm"
           :model="VariableForm"
           label-width="100px"
           :inline="true"
           class="diagnose">
    <draggable :options="{group:'condition'}">
      <el-form-item label="诊断编码">
        <el-input v-model="VariableForm.CodeCName"
                  placeholder="中文名称"></el-input>
        <el-input v-model="VariableForm.CodeEName"
                  placeholder="英文名称"></el-input>
        <el-input v-model="VariableForm.CodeDiscription"
                  placeholder="变量描述"></el-input>
      </el-form-item>
      <el-form-item label="用药记录">
        <el-input v-model="VariableForm.MedCName"></el-input>
      </el-form-item>
      <el-form-item label="手术操作">
        <el-input v-model="VariableForm.OpeCName"></el-input>
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
      VariableForm: {
        CodeCName: "",
        CodeEName: "",
        CodeDiscription: "",
        MedCName: "",
        OpeCName: ""
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