<template>
  <el-form ref="marform"
           :model="marform"
           label-width="100px"
           size="mini"
           :inline="true"
           class="mar">
    <draggable :options="{group:'mar'}">
      <el-checkbox v-model="marform.debut">首次出现</el-checkbox>
      <el-form-item label="性别">
        <el-input v-model="marform.sex"></el-input>
      </el-form-item>
      <el-form-item label="记录来源">
        <el-input v-model="marform.source"></el-input>
      </el-form-item>
      <el-form-item label="用药方式">
        <el-input v-model="marform.martype"></el-input>
      </el-form-item>
      <el-form-item label="用药单位">
        <el-input v-model="marform.unit"></el-input>
      </el-form-item>
      <el-form-item label="取药路径">
        <el-input v-model="marform.route"></el-input>
      </el-form-item>
      <el-form-item label="用药记录合集">
        <el-input v-model="marform.collection"></el-input>
        <el-checkbox v-model="marform.collectionchecked"
                     class="except">不在其之间</el-checkbox>
      </el-form-item>
      <el-form-item label="用药年龄">
        <el-input-number v-model="marform.age1"
                         controls-position="right"
                         @change="ageChange"
                         :min="0"
                         :max="120"></el-input-number><span class="line"> - </span>
        <el-input-number v-model="marform.age2"
                         controls-position="right"
                         @change="ageChange"
                         :min="0"
                         :max="120"></el-input-number>
        <el-checkbox v-model="marform.agechecked"
                     class="except">不在其之间</el-checkbox>
      </el-form-item>
      <el-form-item label="用药日期">
        <el-date-picker v-model="marform.date"
                        type="daterange"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
        <el-checkbox v-model="marform.datechecked"
                     class="except">不在其之间</el-checkbox>
      </el-form-item>
      <el-form-item label="用药天数">
        <el-input-number v-model="marform.day1"
                         controls-position="right"
                         @change="ageChange"></el-input-number><span class="line"> - </span>
        <el-input-number v-model="marform.day2"
                         controls-position="right"
                         @change="ageChange"></el-input-number>
        <el-checkbox v-model="marform.dayschecked"
                     class="except">不在其之间</el-checkbox>
      </el-form-item>
      <el-form-item label="用药剂量">
        <el-input v-model="marform.dose1"></el-input>
      </el-form-item>
      <el-form-item><span class="line">-</span></el-form-item>
      <el-form-item>
        <el-input v-model="marform.dose2"></el-input>
        <el-checkbox v-model="marform.dosechecked"
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
      marform: {
        debut: false,
        sex: '',
        source: '',
        martype: '',
        unit: '',
        route: '',
        collection: '',
        collectionchecked: false,
        age1: '',
        age2: '',
        agechecked: false,
        date: '',
        datechecked: false,
        day1: '',
        day2: '',
        dayschecked: false,
        dose1: '',
        dose2: '',
        dosechecked: false
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
.mar .el-input__inner {
  display: none;
}
.mar .el-checkbox__input {
  display: none;
}
.mar .el-input-number {
  display: none;
}
.mar .el-range-input {
  display: none;
}
.mar .el-range-editor.el-input__inner {
  display: none;
}
.mar .except {
  display: none;
}
.mar .line {
  display: none;
}
.mar .el-checkbox__label {
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
.mar .el-form-item__label {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 2px 2px 2px 2px;
  box-shadow: 0 8px 6px -6px #777;
  padding: 0 20px;
  display: inline-block;
  margin: 0 5px 12px 0;
  text-align: center;
}
.mar .el-form-item--mini .el-form-item__label {
  line-height: 38px;
}
</style>