<template>
  <el-form ref="deathRecordsform"
           :model="deathRecordsform"
           label-width="100px"
           size="mini"
           :inline="true"
           class="deathRecords">
    <draggable :options="{group:'deathRecords'}">
      <el-form-item label="性别">
        <el-input v-model="deathRecordsform.sex"></el-input>
      </el-form-item>
      <el-form-item label="死亡记录集合">
        <el-input v-model="deathRecordsform.recordSet"></el-input>
        <el-checkbox v-model="deathRecordsform.recordSetchecked"
                     class="except">不在其之间</el-checkbox>
      </el-form-item>
      <el-form-item label="死亡日期">
        <el-date-picker v-model="deathRecordsform.deathdate"
                        type="daterange"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
        <el-checkbox v-model="deathRecordsform.deathdatechecked"
                     class="except">不在其之间</el-checkbox>
      </el-form-item>
      <el-form-item label="死亡原因">
        <el-input v-model="deathRecordsform.deathCause"></el-input>
      </el-form-item>
      <el-form-item label="死亡年龄">
        <el-input-number v-model="deathRecordsform.deathage1"
                         controls-position="right"
                         @change="ageChange"
                         :min="0"
                         :max="120"></el-input-number><span class="line"> - </span>
        <el-input-number v-model="deathRecordsform.deathage2"
                         controls-position="right"
                         @change="ageChange"
                         :min="0"
                         :max="120"></el-input-number>
        <el-checkbox v-model="deathRecordsform.deathagechecked"
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
      deathRecordsform: {
        sex: '',
        recordSet: '',
        recordSetchecked: false,
        deathage1: '',
        deathage2: '',
        deathagechecked: false,
        deathCause: '',
        deathdate: '',
        deathdatechecked: false,
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
.deathRecords .el-input__inner {
  display: none;
}
.deathRecords .el-checkbox__input {
  display: none;
}
.deathRecords .el-input-number {
  display: none;
}
.deathRecords .el-range-input {
  display: none;
}
.deathRecords .el-range-editor.el-input__inner {
  display: none;
}
.deathRecords .except {
  display: none;
}
.deathRecords .line {
  display: none;
}
.deathRecords .el-checkbox__label {
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
.deathRecords .el-form-item__label {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 2px 2px 2px 2px;
  box-shadow: 0 8px 6px -6px #777;
  padding: 0 20px;
  display: inline-block;
  margin: 0 5px 12px 0;
  text-align: center;
}
.deathRecords .el-form-item--mini .el-form-item__label {
  line-height: 38px;
}
</style>
