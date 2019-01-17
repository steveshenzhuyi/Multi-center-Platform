<template>
  <div>
    <el-form ref="form"
             :model="form"
             label-width="100px"
             label-position="left"
             :inline="true"
             size="mini"
             class="diagnose">
      <!-- id对应条件在字典的index -->
      <!-- <draggable :options="{group:'diagnose'}"> -->
      <div class="form-item"
           v-if="visible[0].show">
        <i class="el-icon-close"
           @click=changevisible(0)></i>&nbsp;
        <el-form-item label="诊断编码集合">
          <el-input v-model="form.formdetail[0].data1"></el-input>
          <!-- <el-checkbox v-model="form.codechecked"
  class="except">不在其之间</el-checkbox> -->
          <!-- <i class="el-icon-close">@click=changevisible()</i> -->
        </el-form-item>
      </div>
      <div class="form-item"
           v-if="visible[1].show">
        <i class="el-icon-close"
           @click=changevisible(1)></i>&nbsp;
        <el-form-item label="诊断日期">
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
          <!-- <el-checkbox v-model="form.datechecked"
  class="except">不在其之间</el-checkbox> -->
        </el-form-item>
      </div>
      <div class="form-item"
           v-if="visible[2].show">
        <i class="el-icon-close"
           @click=changevisible(2)></i>&nbsp;
        <el-form-item label="诊断年龄">
          <el-input-number v-model="form.formdetail[2].data1"
                           controls-position="right"></el-input-number> <span class="line"> — </span>
          <el-input-number v-model="form.formdetail[2].data2"
                           controls-position="right"></el-input-number>
          <!-- <el-checkbox v-model="form.agechecked"
  class="except">不在其之间</el-checkbox> -->
        </el-form-item>
      </div>
      <div class="form-item"
           v-if="visible[3].show">
        <i class="el-icon-close"
           @click=changevisible(3)></i>&nbsp;
        <el-form-item label="记录来源">
          <el-input v-model="form.formdetail[3].data1"></el-input>
        </el-form-item>
      </div>
      <div class="form-item"
           v-if="visible[4].show">
        <i class="el-icon-close"
           @click=changevisible(4)></i>&nbsp;
        <el-form-item label="性别">
          <el-input v-model="form.formdetail[4].data1"></el-input>
        </el-form-item>
      </div>
      <div class="form-item first-time"
           v-if="visible[5].show">
        <i class="el-icon-close"
           @click=changevisible(5)></i>&nbsp;
        <!-- <el-checkbox v-model="form.formdetail[5].data1">首次出现</el-checkbox> -->
        <input type="checkbox"
               v-model="form.formdetail[5].data1"
               disabled
               checked /><span>首次出现</span>
      </div>
      <!-- <el-form-item label="诊断类型">
        <el-input v-model="form.type"></el-input>
      </el-form-item> -->
      <!-- </draggable> -->
    </el-form>
  </div>
</template>

<script>
// import draggable from 'vuedraggable'
import axios from 'axios'
export default {
  components: {
    // draggable,
  },
  props: ['mainCondId', 'minorCondId', 'viewdetail'],
  data() {
    return {
      form: {
        id: '',
        formdetail: [{
          data1: '',
          criteriaLayer1Code: "1",
          criteriaLayer2Code: "1",
          name: "诊断编码集合"        },
        {
          data1: '',
          data2: '',
          criteriaLayer1Code: "1",
          criteriaLayer2Code: "2",
          name: "诊断日期"        },
        {
          data1: 0,
          data2: 0,
          criteriaLayer1Code: "1",
          criteriaLayer2Code: "3",
          name: "诊断年龄"        },
        {
          data1: '',
          criteriaLayer1Code: "1",
          criteriaLayer2Code: "4",
          name: "记录来源"        },
        {
          data1: '',
          criteriaLayer1Code: "1",
          criteriaLayer2Code: "5",
          name: "性别"        },
        {
          data1: true,
          criteriaLayer1Code: "1",
          criteriaLayer2Code: "6",
          name: "首次出现"        },],
      },
      // cohortdict: '', //查询队列字典得到
      visible: [{ show: true }, { show: false }, { show: false }, { show: false }, { show: false }, { show: false }],
      initialform: [],//初始表单，恢复初始值
    }
  },
  updated: function () {
    this.$emit('sendformData', this.form)
  },
  watch: {
    mainCondId: {
      handler() {
        if (this.mainCondId.primarycond === 1) {
          this.form.id = this.mainCondId.id
          if (this.mainCondId.secondcond != 0) {
            this.visible[this.mainCondId.secondcond - 1].show = true
            this.form.formdetail[this.mainCondId.secondcond - 1].layer1SortNo = this.mainCondId.id
            this.form.formdetail[this.mainCondId.secondcond - 1].criteriaTypeCode = "1"
            this.form.formdetail[this.mainCondId.secondcond - 1].typeSortNo = 1
            //不需要了
            this.form.formdetail[this.mainCondId.secondcond - 1].layer2SortNo = this.mainCondId.secondcond - 1
          }
        }
      },
      deep: true,
      // immediate: true
    },
    minorCondId: {
      handler() {
        if (this.minorCondId.primarycond === 1) {
          this.form.id = this.minorCondId.id
          if (this.minorCondId.secondcond != 0) {
            this.visible[this.minorCondId.secondcond - 1].show = true
            this.form.formdetail[this.minorCondId.secondcond - 1].layer1SortNo = this.minorCondId.id
            this.form.formdetail[this.minorCondId.secondcond - 1].criteriaTypeCode = "2"
            this.form.formdetail[this.minorCondId.secondcond - 1].typeSortNo = 2
            //不需要了
            this.form.formdetail[this.minorCondId.secondcond - 1].layer2SortNo = this.minorCondId.secondcond - 1
          }
        }
      },
      deep: true,
      // immediate: true
    },
  },
  mounted: function () {
    this.initialform = JSON.parse(JSON.stringify(this.form.formdetail))
    this.reproduceForm()
  },
  methods: {
    //删除所选二级条件
    changevisible(showindex) {
      console.log(showindex)
      this.visible[showindex].show = false
      this.form.formdetail[showindex] = this.initialform[showindex];
    },
    //查看队列详情初始化
    reproduceForm() {
      if (this.viewdetail != undefined) {
        this.viewdetail.forEach(item => {
          this.form.formdetail[item.criteriaLayer2Code - 1] = item
          this.visible[item.criteriaLayer2Code - 1].show = true
        })
        // console.log(this.form.formdetail)
      }
    }
  }
}
</script>
<style>
/* .diagnose .el-input__inner {
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
} */
.diagnose .el-icon-close {
  margin-top: 6px;
}
.first-time {
  font-size: 14px;
  color: #606266;
  line-height: 28px;
}
</style>
