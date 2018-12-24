<template>
  <el-form ref="operatingForm"
           :model="operatingform"
           size="mini"
           :inline="true"
           class="operating">
    <!-- 手术操作rzx -->
    <draggable :options="{group:'operating'}">
      <el-checkbox v-model="operatingform.debut">首次出现</el-checkbox>
      <el-form-item label="性别">
        <el-input v-model="operatingform.sex"></el-input>
      </el-form-item>
      <el-form-item label="记录来源">
        <el-input v-model="operatingform.source"></el-input>
      </el-form-item>
      <el-form-item label="手术操作集合">
        <el-input v-model="operatingform.collection"></el-input>
        <el-checkbox v-model="operatingform.collectionchecked"
                     class="except">不在其之间</el-checkbox>
      </el-form-item>
      <el-form-item label="手术年龄">
        <el-input-number v-model="operatingform.age1"
                         controls-position="right"
                         @change="ageChange"
                         :min="0"
                         :max="120"></el-input-number><span class="line"> - </span>
        <el-input-number v-model="operatingform.age2"
                         controls-position="right"
                         @change="ageChange"
                         :min="0"
                         :max="120"></el-input-number>
        <el-checkbox v-model="operatingform.agechecked"
                     class="except">不在其之间</el-checkbox>
      </el-form-item>
      <el-form-item label="手术日期">
        <el-date-picker v-model="operatingform.date"
                        type="daterange"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
        <el-checkbox v-model="operatingform.datechecked"
                     class="except">不在其之间</el-checkbox>
      </el-form-item>
      <el-form-item label="数目">
        <el-input-number v-model="operatingform.number1"
                         controls-position="right"
                         @change="ageChange"></el-input-number><span class="line"> - </span>
        <el-input-number v-model="operatingform.number2"
                         controls-position="right"
                         @change="ageChange"></el-input-number>
        <el-checkbox v-model="operatingform.numberchecked"
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
      operatingform: {
        debut: false,
        sex: '',
        source: '',
        collection: '',
        collectionchecked: false,
        age1: '',
        age2: '',
        agechecked: false,
        date: '',
        datechecked: false,
        number1: '',
        number2: '',
        numberchecked: false
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
.operating .el-input__inner {
  display: none;
}
.operating .el-checkbox__input {
  display: none;
}
.operating .el-input-number {
  display: none;
}
.operating .el-range-input {
  display: none;
}
.operating .el-range-editor.el-input__inner {
  display: none;
}
.operating .except {
  display: none;
}
.operating .line {
  display: none;
}
.operating .el-checkbox__label {
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
.operating .el-form-item__label {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 2px 2px 2px 2px;
  box-shadow: 0 8px 6px -6px #777;
  padding: 0 20px;
  display: inline-block;
  margin: 0 5px 12px 0;
  text-align: center;
}
.operating .el-form-item--mini .el-form-item__label {
  line-height: 38px;
}
</style>
