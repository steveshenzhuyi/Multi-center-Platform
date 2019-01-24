<template>
  <div>
    <el-form ref="form"
             :model="form"
             label-width="100px"
             label-position="left"
             :inline="true"
             size="mini"
             class="deathRecords">
      <!-- <draggable :options="{group:'deathRecords'}"> -->
      <div class="form-item"
           v-if="visible[0].show">
        <i class="el-icon-close"
           @click=changevisible(0)></i>&nbsp;
        <el-form-item label="死亡记录集合">
          <el-input v-model="form.formdetail[0].data1"
                    @focus="getConceptsetList"></el-input>
          <!-- <el-checkbox v-model="deathRecordsform.recordSetchecked"
                     class="except">不在其之间</el-checkbox> -->
        </el-form-item>
      </div>
      <div class="form-item"
           v-if="visible[1].show">
        <i class="el-icon-close"
           @click=changevisible(1)></i>&nbsp;
        <el-form-item label="死亡时间">
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
      </div>
      <div class="form-item"
           v-if="visible[2].show">
        <i class="el-icon-close"
           @click=changevisible(2)></i>&nbsp;
        <el-form-item label="死亡年龄">
          <el-input-number v-model="form.formdetail[2].data1"
                           controls-position="right"></el-input-number> <span class="line"> — </span>
          <el-input-number v-model="form.formdetail[2].data2"
                           controls-position="right"></el-input-number>
          <!-- <el-checkbox v-model="deathRecordsform.deathagechecked"
                     class="except">不在其之间</el-checkbox> -->
        </el-form-item>
      </div>
      <div class="form-item"
           v-if="visible[3].show">
        <i class="el-icon-close"
           @click=changevisible(3)></i>&nbsp;
        <el-form-item label="死亡原因">
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
      <!-- </draggable> -->
    </el-form>
    <!-- 选择概念集的弹窗 -->
    <el-dialog :visible.sync="conceptSetListVisible"
               width="50%"
               :before-close="handleClose"
               append-to-body>
      <span slot="title"
            class="dialog-title"><i class="el-icon-tickets"></i> 概念集列表</span>
      <component :is="myconceptsetList"
                 @getConceptSetId="selectConceptSetId"
                 @getVisible="selectVisible"></component>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="conceptSetListVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="conceptSetListVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import draggable from 'vuedraggable'
import axios from 'axios'
import conceptsetList from '../conceptsetList.vue'
export default {
  components: {
    'conceptsetList': conceptsetList
    // draggable,
  },
  props: ['mainCondId', 'minorCondId', 'viewdetail'],
  data() {
    return {
      myconceptsetList: conceptsetList,
      conceptSetListVisible: false,
      form: {
        formdetail: [{
          data1: '',
          criteriaLayer1Code: "5",
          criteriaLayer2Code: "1",
          name: "死亡记录集合"        },
        {
          data1: '',
          data2: '',
          criteriaLayer1Code: "5",
          criteriaLayer2Code: "2",
          name: "死亡时间"        },
        {
          data1: 0,
          data2: 0,
          criteriaLayer1Code: "5",
          criteriaLayer2Code: "3",
          name: "死亡年龄"        },
        {
          data1: '',
          criteriaLayer1Code: "5",
          criteriaLayer2Code: "4",
          name: "死亡原因"        },
        {
          data1: '',
          criteriaLayer1Code: "5",
          criteriaLayer2Code: "5",
          name: "性别"        },]
      },
      // cohortdict: '', //查询队列字典得到
      visible: [],
      initialform: [],//初始表单，恢复初始值
    }
  },
  updated: function () {
    this.$emit('sendformData', this.form)
  },
  // 监听条件表单被拖拽到所对应的div的序号变化
  watch: {
    mainCondId: {
      handler() {
        if (this.mainCondId.primarycond === 5) {
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
        if (this.minorCondId.primarycond === 5) {
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
  beforeMount: function () {
    for (var i = 0; i < 5; i++) {
      this.visible.push({ show: false })
    }
    this.getCohortDict()
  },
  mounted: function () {
    this.initialform = JSON.parse(JSON.stringify(this.form.formdetail))
    this.reproduceForm()
  },
  methods: {
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
          console.log(this.cohortdict.length)
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
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
    },
    //---概念集列表---
    getConceptsetList() {
      this.conceptSetListVisible = true
      console.log(this.conceptSetListVisible)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    selectConceptSetId(val) {
      this.form.formdetail[0].data1 = val
    },
    selectVisible(val) {
      this.conceptSetListVisible = val
      console.log(this.conceptSetListVisible)
    }
  }
}
</script>
<style>
/* .deathRecords .el-input__inner {
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
} */
.dialog-title {
  font-size: 18px;
}
.el-icon-tickets {
  font-size: 20px;
}
.deathRecords .el-icon-close {
  margin-top: 6px;
}
.first-time {
  font-size: 14px;
  color: #606266;
  line-height: 28px;
}
</style>
