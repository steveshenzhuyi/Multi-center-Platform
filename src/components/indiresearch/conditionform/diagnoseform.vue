<template>
  <div>
    <el-form ref="forms"
             v-for="(form,index) in forms"
             :key="index"
             size="mini"
             :inline="true"
             class="diagnose">
      <!-- id对应条件在字典的index -->
      <draggable :options="{group:'diagnose'}">
        <el-form-item label="诊断编码集合"
                      id="0">
          <el-input v-model="form.formdetail[0].data1"></el-input>
          <!-- <el-checkbox v-model="form.codechecked"
  class="except">不在其之间</el-checkbox> -->
        </el-form-item>
        <el-form-item label="诊断日期"
                      id="1">
          <el-date-picker v-model="form.formdetail[1].data1"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
          </el-date-picker>
          <span class="line"> — </span>
          <el-date-picker v-model="form.formdetail[1].data2"
                          type="date"
                          value-format="yyyy-MM-dd"
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
        <el-form-item label="诊断年龄"
                      id="2">
          <el-input-number v-model="form.formdetail[2].data1"
                           controls-position="right"></el-input-number> <span class="line"> — </span>
          <el-input-number v-model="form.formdetail[2].data2"
                           controls-position="right"></el-input-number>
          <!-- <el-checkbox v-model="form.agechecked"
  class="except">不在其之间</el-checkbox> -->
        </el-form-item>
        <el-form-item label="记录来源"
                      id="3">
          <el-input v-model="form.formdetail[3].data1"></el-input>
        </el-form-item>
        <el-form-item label="性别"
                      id="4">
          <el-input v-model="form.formdetail[4].data1"></el-input>
        </el-form-item>
        <el-checkbox v-model="form.formdetail[5].data1"
                     id="5">首次出现</el-checkbox>
        <!-- <el-form-item label="诊断类型">
        <el-input v-model="form.type"></el-input>
      </el-form-item> -->
      </draggable>
    </el-form>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import axios from 'axios'
export default {
  components: {
    draggable,
  },
  props: ['mainItem', 'mainCondId'],
  data() {
    return {
      id: '',
      formdetail: [
        {
          data1: '',
          criteriaLayer1Code: "1",
          criteriaLayer2Code: "1",
          name: "诊断编码集合"
        },
        {
          data1: '',
          data2: '',
          criteriaLayer1Code: "1",
          criteriaLayer2Code: "2",
          name: "诊断日期"
        },
        {
          data1: -1,
          data2: -1,
          criteriaLayer1Code: "1",
          criteriaLayer2Code: "3",
          name: "诊断年龄"
        },
        {
          data1: '',
          criteriaLayer1Code: "1",
          criteriaLayer2Code: "4",
          name: "记录来源"
        },
        {
          data1: '',
          criteriaLayer1Code: "1",
          criteriaLayer2Code: "5",
          name: "性别"
        },
        {
          data1: false,
          criteriaLayer1Code: "1",
          criteriaLayer2Code: "6",
          name: "首次出现"
        },
      ],
      forms: [],
      formCount: 0
      // cohortdict: '', //查询队列字典得到
    }
  },
  watch: {
    mainCondId: {
      handler() {
        this.formCount = 0
        this.forms.push({ id: this.id, formdetail: this.formdetail })
        for (var i = 0; i < this.mainCondId.length; i++) {
          if (this.mainCondId[i]['condtype'] == 1) {
            this.formCount += 1
            console.log(this.forms[this.formCount - 1])
            this.forms[this.formCount - 1]['id'] = this.mainCondId[i]['id']
          }
        }
        console.log(this.forms)
      },
      deep: true,
      immediate: true
    },
    // 监听条件表单被拖拽到所对应的div的序号变化
    mainItem: {
      handler() {
        if (this.mainItem.groupName == 'diagnose') {
          // if (this.forms[0].id === "" || this.forms[0].id === this.mainItem.id) {
          this.forms[0].id = this.mainItem.id
          console.log(this.forms[0].id)
          this.forms[0].formdetail[this.mainItem.itemId]['layer2SortNo'] = this.mainItem.sortNo
          this.forms[0].formdetail[this.mainItem.itemId]['layer1SortNo'] = this.mainItem.id
          this.forms[0].formdetail[this.mainItem.itemId]['criteriaTypeCode'] = "1"
          this.forms[0].formdetail[this.mainItem.itemId]['typeSortNo'] = 1
          // this.form.formdetail[this.mainItem.itemId] = Object.assign(this.form.formdetail[this.mainItem.itemId], this.cohortdict[this.mainItem.itemId])
          // console.log(this.forms[0].formdetail[this.mainItem.itemId])
          console.log(this.forms)
          // }
        }
      },
      deep: true,
      immediate: true
    },
  },
  mounted: function () {
    // this.forms.push({ id: this.id, formdetail: this.formdetail })
    // this.getCohortDict()
  },
  methods: {
    //查询队列条件字典
    // getCohortDict() {
    //   axios.get('cohort/dict', {
    //     params: {
    //       token: this.GLOBAL.token,
    //       criteriaLayer1Code: 1
    //     }
    //   })
    //     .then((response) => {
    //       this.cohortdict = response.data.data.

    //       // for (var i = 0; i < this.cohortdict.length; i++) {
    //       //   delete this.cohortdict[i]['sortNo']
    //       // }
    //     })
    //     .catch(function (error) {
    //       console.log("error", error);
    //     });
    // },

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
