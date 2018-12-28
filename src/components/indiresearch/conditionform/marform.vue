<template>
  <el-form ref="form"
           :model="form"
           size="mini"
           :inline="true"
           class="mar">
    <!-- id对应条件在字典的index -->
    <draggable :options="{group:'mar'}">
      <el-form-item label="用药记录合集"
                    id="0">
        <el-input v-model="form.formdetail[0].data1"></el-input>
        <!-- <el-checkbox v-model="marform.collectionchecked"
                     class="except">不在其之间</el-checkbox> -->
      </el-form-item>
      <el-form-item label="性别"
                    id="1">
        <el-input v-model="form.formdetail[1].data1"></el-input>
      </el-form-item>
      <el-checkbox v-model="form.formdetail[2].data1"
                   id="2">首次出现</el-checkbox>
      <el-form-item label="用药日期"
                    id="3">
        <el-date-picker v-model="form.formdetail[3].data1"
                        type="date"
                        placeholder="选择日期">
        </el-date-picker>
        <span class="line"> — </span>
        <el-date-picker v-model="form.formdetail[3].data2"
                        type="date"
                        placeholder="选择日期">
        </el-date-picker>
        <!-- <el-checkbox v-model="marform.datechecked"
                     class="except">不在其之间</el-checkbox> -->
      </el-form-item>
      <el-form-item label="用药天数"
                    id="4">
        <el-input-number v-model="form.formdetail[4].data1"
                         controls-position="right"></el-input-number><span class="line"> — </span>
        <el-input-number v-model="form.formdetail[4].data2"
                         controls-position="right"></el-input-number>
        <!-- <el-checkbox v-model="marform.dayschecked"
                     class="except">不在其之间</el-checkbox> -->
      </el-form-item>
      <el-form-item label="用药剂量"
                    id="5">
        <el-input v-model="form.formdetail[5].data1"></el-input>
        <span class="line"> — </span>
        <el-input v-model="form.formdetail[5].data2"></el-input>
        <!-- <el-checkbox v-model="marform.dosechecked"
                     class="except">不在其之间</el-checkbox> -->
      </el-form-item>
      <el-form-item label="用药年龄"
                    id="6">
        <el-input-number v-model="form.formdetail[6].data1"
                         controls-position="right"></el-input-number><span class="line"> — </span>
        <el-input-number v-model="form.formdetail[6].data2"
                         controls-position="right"></el-input-number>
        <!-- <el-checkbox v-model="marform.agechecked"
                     class="except">不在其之间</el-checkbox> -->
      </el-form-item>
      <el-form-item label="用药路径"
                    id="7">
        <el-input v-model="form.formdetail[7].data1"></el-input>
      </el-form-item>
      <el-form-item label="用药方式"
                    id="8">
        <el-input v-model="form.formdetail[8].data1"></el-input>
      </el-form-item>
      <el-form-item label="用药单位"
                    id="9">
        <el-input v-model="form.formdetail[9].data1"></el-input>
      </el-form-item>
      <el-form-item label="记录来源"
                    id="10">
        <el-input v-model="form.formdetail[10].data1"></el-input>
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
  props: ['conditionFormId', 'mainItem'],
  data() {
    return {
      form: {
        id: '',
        formdetail: [
          { data1: '', }, //用药记录集合
          { data1: '', }, //性别
          { data1: false, }, //首次出现
          {
            data1: '',
            data2: '',
          },               //用药日期
          {
            data1: '',
            data2: '',
          },              //用药天数
          {
            data1: '',
            data2: '',
          },            //用药剂量
          {
            data1: -1,
            data2: -1,
          },           //用药年龄
          { data1: '', },//用药路径 
          { data1: '', },//用药方式
          { data1: '', },//用药单位
          { data1: '', },//记录来源

        ]
      },
      cohortdict: '', //查询队列字典得到
    }
  },
  // 监听条件表单被拖拽到所对应的div的序号变化
  watch: {
    conditionFormId() {
      this.form.id = this.conditionFormId
    },
    mainItem: {
      handler() {
        if (this.mainItem.groupName == 'diagnose') {
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
    // }
    //查询队列条件字典
    getCohortDict() {
      axios.get('cohort/dict', {
        params: {
          token: this.GLOBAL.token,
          criteriaLayer1Code: 2
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
.mar .el-form-item__content {
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