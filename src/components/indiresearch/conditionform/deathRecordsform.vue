<template>
  <el-form ref="form"
           :model="form"
           size="mini"
           :inline="true"
           class="deathRecords">
    <draggable :options="{group:'deathRecords'}">
      <el-form-item label="死亡记录集合"
                    id="0">
        <el-input v-model="form.formdetail[0].data1"></el-input>
        <!-- <el-checkbox v-model="deathRecordsform.recordSetchecked"
                     class="except">不在其之间</el-checkbox> -->
      </el-form-item>
      <el-form-item label="死亡时间"
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
        <!-- <el-checkbox v-model="deathRecordsform.deathdatechecked"
                     class="except">不在其之间</el-checkbox> -->
      </el-form-item>
      <el-form-item label="死亡年龄"
                    id="2">
        <el-input-number v-model="form.formdetail[2].data1"
                         controls-position="right"></el-input-number> <span class="line"> — </span>
        <el-input-number v-model="form.formdetail[2].data2"
                         controls-position="right"></el-input-number>
        <!-- <el-checkbox v-model="deathRecordsform.deathagechecked"
                     class="except">不在其之间</el-checkbox> -->
      </el-form-item>
      <el-form-item label="死亡原因"
                    id="3">
        <el-input v-model="form.formdetail[3].data1"></el-input>
      </el-form-item>
      <el-form-item label="性别"
                    id="4">
        <el-input v-model="form.formdetail[4].data1"></el-input>
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
          { data1: '', },//死亡记录集合
          {
            data1: '',
            data2: '',
          },          //死亡时间
          {
            data1: -1,
            data2: -1,
          },          //死亡年龄
          { data1: '', },//死亡原因
          { data1: '', },//性别
        ]
      },
      cohortdict: '', //查询队列字典得到
    }
  },
  // 监听条件表单被拖拽到所对应的div的序号变化
  watch: {
    mainItem: {
      handler() {
        if (this.mainItem.groupName == 'deathRecords') {
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
          criteriaLayer1Code: 5
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
.deathRecords .el-form-item__content {
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
