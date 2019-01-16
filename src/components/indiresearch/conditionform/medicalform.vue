<template>
  <el-form ref="form"
           :model="form"
           size="mini"
           :inline="true"
           class="medical">
    <draggable :options="{group:'medical'}">
      <el-form-item label="医学检测集合"
                    id="0">
        <el-input v-model="form.formdetail[0].data1"></el-input>
        <!-- <el-checkbox v-model="medicalform.medicalSetchecked"
                     class="except">不在其之间</el-checkbox> -->
      </el-form-item>
      <el-form-item label="检测结果"
                    id="2">
        <el-input v-model="form.formdetail[2].data1"></el-input>
      </el-form-item>
      <el-form-item label="检测值操作符"
                    id="3">
        <el-input v-model="form.formdetail[3].data1"></el-input>
      </el-form-item>
      <el-form-item label="检测值单位"
                    id="4">
        <el-input v-model="form.formdetail[4].data1"></el-input>
      </el-form-item>
      <el-form-item label="性别"
                    id="5">
        <el-input v-model="form.formdetail[5].data1"></el-input>
      </el-form-item>
      <el-checkbox id="6"
                   v-model="form.formdetail[6].data1">首次出现</el-checkbox>
      <el-form-item label="检测日期"
                    id="7">
        <el-date-picker v-model="form.formdetail[7].data1"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
        </el-date-picker>
        <span class="line"> — </span>
        <el-date-picker v-model="form.formdetail[7].data2"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
        </el-date-picker>
        <!-- <el-checkbox v-model="medicalform.datechecked"
                     class="except">不在其之间</el-checkbox> -->
      </el-form-item>
      <el-form-item label="检测年龄"
                    id="8">
        <el-input-number v-model="form.formdetail[8].data1"
                         controls-position="right"></el-input-number> <span class="line"> — </span>
        <el-input-number v-model="form.formdetail[8].data2"
                         controls-position="right"></el-input-number>
        <!-- <el-checkbox v-model="medicalform.agechecked"
                     class="except">不在其之间</el-checkbox> -->
      </el-form-item>
      <el-form-item label="所需结果"
                    id="9">
        <el-input v-model="form.formdetail[9].data1"></el-input>
        <span class="line"> — </span>
        <el-input v-model="form.formdetail[9].data2"></el-input>
        <!-- <el-checkbox v-model="medicalform.desiredResultchecked"
                     class="except">不在其之间</el-checkbox> -->
      </el-form-item>
      <el-form-item label="检测类型"
                    id="10">
        <el-input v-model="form.formdetail[10].data1"></el-input>
      </el-form-item>
      <el-form-item label="记录来源"
                    id="11">
        <el-input v-model="form.formdetail[11].data1"></el-input>
      </el-form-item>
      <el-form-item label="结果下限范围"
                    id="12">
        <el-input v-model="form.formdetail[12].data1"></el-input>
        <span class="line"> — </span>
        <el-input v-model="form.formdetail[12].data2"></el-input>
        <!-- <el-checkbox v-model="medicalform.lowerLimitchecked"
                     class="except">不在其之间</el-checkbox> -->
      </el-form-item>
      <el-form-item label="结果下限百分比"
                    id="13">
        <el-input v-model="form.formdetail[13].data1"></el-input>
        <span class="line"> — </span>
        <el-input v-model="form.formdetail[13].data2"></el-input>
        <!-- <el-checkbox v-model="medicalform.lowerPctchecked"
                     class="except">不在其之间</el-checkbox> -->
      </el-form-item>
      <el-form-item label="结果上限范围"
                    id="14">
        <el-input v-model="form.formdetail[14].data1"></el-input>
        <span class="line"> — </span>
        <el-input v-model="form.formdetail[14].data2"></el-input>
        <!-- <el-checkbox v-model="medicalform.upperLimitchecked"
                     class="except">不在其之间</el-checkbox> -->
      </el-form-item>
      <el-form-item label="结果上限百分比"
                    id="1">
        <el-input v-model="form.formdetail[1].data1"></el-input>
        <span class="line"> — </span>
        <el-input v-model="form.formdetail[1].data2"></el-input>
        <!-- <el-checkbox v-model="medicalform.upperPctchecked"
                     class="except">不在其之间</el-checkbox> -->
      </el-form-item>
    </draggable>
  </el-form>
</template>

<script>
import draggable from 'vuedraggable'
import axios from 'axios'
export default {
  components: {
    draggable,
  },
  props: ['mainItem'],
  data() {
    return {
      form: {
        id: '',
        formdetail: [
          { data1: '', },//医学检测集合
          {
            data1: '',
            data2: '',
          },          //结果上限百分比
          { data1: '', },//检测结果
          { data1: '', },//检测值操作符
          { data1: '', },//检测值单位
          { data1: '', },//性别
          { data1: false, },//首次出现
          {
            data1: '',
            data2: '',
          },          //检测日期
          {
            data1: -1,
            data2: -1,
          },          //检测年龄
          {
            data1: '',
            data2: '',
          },          //所需结果
          { data1: '', },//检测类型
          { data1: '', },//记录来源
          {
            data1: '',
            data2: '',
          },          //结果下限范围
          {
            data1: '',
            data2: '',
          },          //结果下限百分比
          {
            data1: '',
            data2: '',
          },          //结果上限范围
        ]
      },
      cohortdict: '', //查询队列字典得到
    }
  },
  // 监听条件表单被拖拽到所对应的div的序号变化
  watch: {
    mainItem: {
      handler() {
        if (this.mainItem.groupName == 'medical') {
          this.cohortdict[this.mainItem.itemId]['layer2SortNo'] = this.mainItem.sortNo
          this.cohortdict[this.mainItem.itemId]['layer1SortNo'] = this.mainItem.id
          this.cohortdict[this.mainItem.itemId]['criteriaTypeCode'] = "1"
          this.cohortdict[this.mainItem.itemId]['typeSortNo'] = 1
          this.form.formdetail[this.mainItem.itemId] = Object.assign(this.form.formdetail[this.mainItem.itemId], this.cohortdict[this.mainItem.itemId])
          console.log(this.form.formdetail[this.mainItem.itemId])
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted: function () {
    this.getCohortDict()
  },
  methods: {
    // ageChange(value) {
    //   console.log(value);
    // },
    //查询队列条件字典
    getCohortDict() {
      axios.get('cohort/dict', {
        params: {
          token: this.GLOBAL.token,
          criteriaLayer1Code: 4
        }
      })
        .then((response) => {
          this.cohortdict = response.data.data
          for (var i = 0; i < this.cohortdict.length; i++) {
            delete this.cohortdict[i]['sortNo']
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
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
.medical .el-form-item__content {
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
