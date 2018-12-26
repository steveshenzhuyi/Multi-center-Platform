<template>
  <el-form ref="form"
           :model="form"
           size="mini"
           :inline="true"
           class="diagnose">
    <draggable :options="{group:'diagnose'}">
      <el-checkbox v-model="form.formdetail[5].data1"
                   id="5">首次出现</el-checkbox>
      <el-form-item label="性别"
                    id="4">
        <el-input v-model="form.formdetail[4].data1"></el-input>
      </el-form-item>
      <el-form-item label="记录来源"
                    id="3">
        <el-input v-model="form.formdetail[3].data1"></el-input>
      </el-form-item>
      <!-- <el-form-item label="诊断类型">
        <el-input v-model="form.type"></el-input>
      </el-form-item> -->
      <el-form-item label="诊断编码集合"
                    id="0">
        <el-input v-model="form.formdetail[0].data1"></el-input>
        <!-- <el-checkbox v-model="form.codechecked"
                     class="except">不在其之间</el-checkbox> -->
      </el-form-item>
      <el-form-item label="诊断年龄"
                    id="2">
        <el-input-number v-model="form.formdetail[2].data1"
                         controls-position="right"></el-input-number><span class="line"> - </span>
        <el-input-number v-model="form.formdetail[2].data2"
                         controls-position="right"></el-input-number>
        <!-- <el-checkbox v-model="form.agechecked"
                     class="except">不在其之间</el-checkbox> -->
      </el-form-item>
      <el-form-item label="诊断日期"
                    id="1">
        <el-date-picker v-model="form.formdetail[1].data1"
                        type="date"
                        placeholder="选择日期">
        </el-date-picker>
        <span class="line"> — </span>
        <el-date-picker v-model="form.formdetail[1].data2"
                        type="date"
                        placeholder="选择日期">
        </el-date-picker>
        <!-- <el-date-picker v-model="form.datearray"
                        type="daterange"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker> -->
        <!-- <el-checkbox v-model="form.datechecked"
                     class="except">不在其之间</el-checkbox> -->
      </el-form-item>
      <el-button type="primary"
                 @click="submitForm(form)">保存</el-button>
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
  // props: ['queuedict'],
  data() {
    return {
      // form: {
      //   debut: { data1: false },
      //   sex: {
      //     data1: '',
      //   },
      //   code: {
      //     date1: '',
      //   },
      //   codechecked: false,
      //   age: {
      //     data1: '',
      //     data2: '',
      //   },
      //   agechecked: false,
      //   type: '',
      //   date: {
      //     data1: '',
      //     data2: '',
      //   },
      //   datechecked: false,
      //   source: {
      //     data1: '',
      //   },
      // },
      form: {
        formdetail: [
          { data1: '', },
          {
            data1: '',
            data2: '',
          },
          {
            data1: -1,
            data2: -1,
          },
          { data1: '', },
          { data1: '', },
          { data1: false, },
        ]
      },
      queuedict: []
    }
  },
  mounted: function () {
    this.getQueueDict()
  },
  methods: {
    //查询队列条件字典
    getQueueDict() {
      axios.get('cohort/dict', {
        params: {
          token: this.GLOBAL.token,
          criteriaLayer1Code: "1"
        }
      })
        .then((response) => {
          this.queuedict = response.data.data
          // this.renameKeys()
          // console.log(this.queuedict)
          // this.form.code = Object.assign(this.form.code, this.queuedict[0])
          // this.form.date = Object.assign(this.form.date, this.queuedict[1])
          // this.form.age = Object.assign(this.form.age, this.queuedict[2])
          // this.form.source = Object.assign(this.form.source, this.queuedict[3])
          // this.form.sex = Object.assign(this.form.sex, this.queuedict[4])
          // this.form.debut = Object.assign(this.form.debut, this.queuedict[5])
          // console.log(this.form)
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    //替换字典里面的key--rzx
    renameKeys() {
      for (var i = 0; i < this.queuedict.length; i++) {
        this.queuedict[i]['typeSortNo'] = this.queuedict[i]['sortNo']
        delete this.queuedict[i]['sortNo']
      }
    },
    // ageChange(value) {
    //   console.log(value);
    // },
    submitForm(form) {
      console.log(form)
    },
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
.diagnose .el-form-item__content {
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
