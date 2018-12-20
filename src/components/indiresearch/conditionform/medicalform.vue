<template>
  <el-form ref="medicalform"
           :model="medicalform"
           size="mini"
           :inline="true"
           class="medical">
    <draggable :options="{group:'medical'}">
      <el-checkbox v-model="medicalform.debut">首次出现</el-checkbox>
      <el-form-item label="性别">
        <el-input v-model="medicalform.sex"></el-input>
      </el-form-item>
      <el-form-item label="记录来源">
        <el-input v-model="medicalform.source"></el-input>
      </el-form-item>
      <el-form-item label="检测类型">
        <el-input v-model="medicalform.type"></el-input>
      </el-form-item>
      <el-form-item label="检测结果">
        <el-input v-model="medicalform.result"></el-input>
      </el-form-item>
      <el-form-item label="医学检测集合">
        <el-input v-model="medicalform.medicalSet"></el-input>
        <el-checkbox v-model="medicalform.medicalSetchecked"
                     class="except">不在其之间</el-checkbox>
      </el-form-item>
      <el-form-item label="检测年龄">
        <el-input-number v-model="medicalform.age1"
                         controls-position="right"
                         @change="ageChange"
                         :min="0"
                         :max="120"></el-input-number><span class="line"> - </span>
        <el-input-number v-model="medicalform.age2"
                         controls-position="right"
                         @change="ageChange"
                         :min="0"
                         :max="120"></el-input-number>
        <el-checkbox v-model="medicalform.agechecked"
                     class="except">不在其之间</el-checkbox>
      </el-form-item>
      <el-form-item label="检测日期">
        <el-date-picker v-model="medicalform.date"
                        type="daterange"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
        <el-checkbox v-model="medicalform.datechecked"
                     class="except">不在其之间</el-checkbox>
      </el-form-item>
      <el-form-item label="检测单位">
        <el-input v-model="medicalform.unit"></el-input>
      </el-form-item>
      <el-form-item label="检测值操作符">
        <el-input v-model="medicalform.character"></el-input>
      </el-form-item>
      <el-form-item label="所需结果">
        <el-input v-model="medicalform.desiredResult1"></el-input>
        <span class="line"> - </span>
        <el-input v-model="medicalform.desiredResult2"></el-input>
        <el-checkbox v-model="medicalform.desiredResultchecked"
                     class="except">不在其之间</el-checkbox>
      </el-form-item>
      <el-form-item label="结果下限范围">
        <el-input v-model="medicalform.lowerLimit1"></el-input>
        <span class="line"> - </span>
        <el-input v-model="medicalform.lowerLimit2"></el-input>
        <el-checkbox v-model="medicalform.lowerLimitchecked"
                     class="except">不在其之间</el-checkbox>
      </el-form-item>
      <el-form-item label="结果下限范围百分比">
        <el-input v-model="medicalform.lowerPct1"></el-input>
        <span class="line"> - </span>
        <el-input v-model="medicalform.lowerPct2"></el-input>
        <el-checkbox v-model="medicalform.lowerPctchecked"
                     class="except">不在其之间</el-checkbox>
      </el-form-item>
      <el-form-item label="结果上限范围">
        <el-input v-model="medicalform.upperLimit1"></el-input>
        <span class="line"> - </span>
        <el-input v-model="medicalform.upperLimit2"></el-input>
        <el-checkbox v-model="medicalform.upperLimitchecked"
                     class="except">不在其之间</el-checkbox>
      </el-form-item>
      <el-form-item label="结果上限范围百分比">
        <el-input v-model="medicalform.upperPct1"></el-input>
        <span class="line"> - </span>
        <el-input v-model="medicalform.upperPct2"></el-input>
        <el-checkbox v-model="medicalform.upperPctchecked"
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
      medicalform: {
        debut: false,
        sex: '',
        source: '',
        type: '',
        result: '',
        medicalSet: '',
        medicalSetchecked: false,
        age1: '',
        age2: '',
        agechecked: false,
        date: '',
        datechecked: false,
        unit: '',
        character: '',
        desiredResult1: '',
        desiredResult2: '',
        desiredResultchecked: false,
        lowerLimit1: '',
        lowerLimit2: '',
        lowerLimitchecked: false,
        lowerPct1: '',
        lowerPct2: '',
        lowerPctchecked: false,
        upperLimit1: '',
        upperLimit2: '',
        upperLimitchecked: false,
        upperPct1: '',
        upperPct2: '',
        upperPctchecked: false,
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
.medical .el-input__inner {
  display: none;
}
.medical .el-checkbox__input {
  display: none;
}
.medical .el-input-number {
  display: none;
}
.medical .el-range-input {
  display: none;
}
.medical .el-range-editor.el-input__inner {
  display: none;
}
.medical .except {
  display: none;
}
.medical .line {
  display: none;
}
.medical .el-checkbox__label {
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
.medical .el-form-item__label {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 2px 2px 2px 2px;
  box-shadow: 0 8px 6px -6px #777;
  padding: 0 20px;
  display: inline-block;
  margin: 0 5px 12px 0;
  text-align: center;
}
.medical .el-form-item--mini .el-form-item__label {
  line-height: 38px;
}
</style>
