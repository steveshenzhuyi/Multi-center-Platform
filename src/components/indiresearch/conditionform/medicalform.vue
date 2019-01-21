<template>
  <div>
    <el-form ref="form"
             :model="form"
             label-width="110px"
             label-position="left"
             :inline="true"
             size="mini"
             class="medical">
      <!-- <draggable :options="{group:'medical'}"> -->
      <div class="form-item"
           v-if="visible[0].show">
        <i class="el-icon-close"
           @click=changevisible(0)></i>&nbsp;
        <el-form-item label="医学检测集合">
          <el-input v-model="form.formdetail[0].data1"
                    @focus="getConceptsetList"></el-input>
          <!-- <el-checkbox v-model="medicalform.medicalSetchecked"
                     class="except">不在其之间</el-checkbox> -->
        </el-form-item>
      </div>
      <div class="form-item"
           v-if="visible[1].show">
        <i class="el-icon-close"
           @click=changevisible(1)></i>&nbsp;
        <el-form-item label="检测日期">
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
          <!-- <el-checkbox v-model="medicalform.datechecked"
                     class="except">不在其之间</el-checkbox> -->
        </el-form-item>
      </div>
      <div class="form-item"
           v-if="visible[2].show">
        <i class="el-icon-close"
           @click=changevisible(2)></i>&nbsp;
        <el-form-item label="检测年龄">
          <el-input-number v-model="form.formdetail[2].data1"
                           controls-position="right"></el-input-number> <span class="line"> — </span>
          <el-input-number v-model="form.formdetail[2].data2"
                           controls-position="right"></el-input-number>
          <!-- <el-checkbox v-model="medicalform.agechecked"
                     class="except">不在其之间</el-checkbox> -->
        </el-form-item>
      </div>
      <div class="form-item"
           v-if="visible[3].show">
        <i class="el-icon-close"
           @click=changevisible(3)></i>&nbsp;
        <el-form-item label="所需结果">
          <el-col :span="10">
            <el-input v-model="form.formdetail[3].data1"></el-input>
          </el-col>
          <el-col :span="2"
                  :offset="1">
            <span class="line"> — </span>
          </el-col>
          <el-col :span="10">
            <el-input v-model="form.formdetail[3].data2"></el-input>
            <!-- <el-checkbox v-model="medicalform.desiredResultchecked"
                     class="except">不在其之间</el-checkbox> -->
          </el-col>
        </el-form-item>
      </div>
      <div class="form-item"
           v-if="visible[4].show">
        <i class="el-icon-close"
           @click=changevisible(4)></i>&nbsp;
        <el-form-item label="检测类型">
          <el-input v-model="form.formdetail[4].data1"></el-input>
        </el-form-item>
      </div>
      <div class="form-item first-time"
           v-if="visible[5].show">
        <i class="el-icon-close"
           @click=changevisible(5)></i>&nbsp;
        <el-form-item label="记录来源">
          <el-input v-model="form.formdetail[5].data1"></el-input>
        </el-form-item>
      </div>
      <div class="form-item"
           v-if="visible[6].show">
        <i class="el-icon-close"
           @click=changevisible(6)></i>&nbsp;
        <el-form-item label="结果下限范围">
          <el-col :span="10">
            <el-input v-model="form.formdetail[6].data1"></el-input>
          </el-col>
          <el-col :span="2"
                  :offset="1">
            <span class="line"> — </span>
          </el-col>
          <el-col :span="10">
            <el-input v-model="form.formdetail[6].data2"></el-input>
          </el-col>
          <!-- <el-checkbox v-model="medicalform.lowerLimitchecked"
                     class="except">不在其之间</el-checkbox> -->
        </el-form-item>
      </div>
      <div class="form-item"
           v-if="visible[7].show">
        <i class="el-icon-close"
           @click=changevisible(7)></i>&nbsp;
        <el-form-item label="结果下限百分比">
          <el-col :span="10">
            <el-input v-model="form.formdetail[7].data1"></el-input>
          </el-col>
          <el-col :span="2"
                  :offset="1">
            <span class="line"> — </span>
          </el-col>
          <el-col :span="10">
            <el-input v-model="form.formdetail[7].data2"></el-input>
          </el-col>
          <!-- <el-checkbox v-model="medicalform.lowerPctchecked"
                     class="except">不在其之间</el-checkbox> -->
        </el-form-item>
      </div>
      <div class="form-item"
           v-if="visible[8].show">
        <i class="el-icon-close"
           @click=changevisible(8)></i>&nbsp;
        <el-form-item label="结果上限范围">
          <el-col :span="10">
            <el-input v-model="form.formdetail[8].data1"></el-input>
          </el-col>
          <el-col :span="2"
                  :offset="1">
            <span class="line"> — </span>
          </el-col>
          <el-col :span="10">
            <el-input v-model="form.formdetail[8].data2"></el-input>
          </el-col>
          <!-- <el-checkbox v-model="medicalform.upperLimitchecked"
                     class="except">不在其之间</el-checkbox> -->
        </el-form-item>
      </div>
      <div class="form-item"
           v-if="visible[9].show">
        <i class="el-icon-close"
           @click=changevisible(9)></i>&nbsp;
        <el-form-item label="结果上限百分比">
          <el-col :span="10">
            <el-input v-model="form.formdetail[9].data1"></el-input>
          </el-col>
          <el-col :span="2"
                  :offset="1">
            <span class="line"> — </span>
          </el-col>
          <el-col :span="10">
            <el-input v-model="form.formdetail[9].data2"></el-input>
          </el-col>
          <!-- <el-checkbox v-model="medicalform.upperPctchecked"
                     class="except">不在其之间</el-checkbox> -->
        </el-form-item>
      </div>
      <div class="form-item"
           v-if="visible[10].show">
        <i class="el-icon-close"
           @click=changevisible(10)></i>&nbsp;
        <el-form-item label="检测结果">
          <el-input v-model="form.formdetail[10].data1"></el-input>
        </el-form-item>
      </div>
      <div class="form-item"
           v-if="visible[11].show">
        <i class="el-icon-close"
           @click=changevisible(11)></i>&nbsp;
        <el-form-item label="检测值操作符">
          <el-input v-model="form.formdetail[11].data1"></el-input>
        </el-form-item>
      </div>
      <div class="form-item"
           v-if="visible[12].show">
        <i class="el-icon-close"
           @click=changevisible(12)></i>&nbsp;
        <el-form-item label="检测值单位">
          <el-input v-model="form.formdetail[12].data1"></el-input>
        </el-form-item>
      </div>
      <div class="form-item"
           v-if="visible[13].show">
        <i class="el-icon-close"
           @click=changevisible(13)></i>&nbsp;
        <el-form-item label="性别">
          <el-input v-model="form.formdetail[13].data1"></el-input>
        </el-form-item>
      </div>
      <div class="form-item first-time"
           v-if="visible[14].show">
        <i class="el-icon-close"
           @click=changevisible(14)></i>&nbsp;
        <!-- <el-checkbox v-model="form.formdetail[14].data1">首次出现</el-checkbox> -->
        <input type="checkbox"
               v-model="form.formdetail[14].data1"
               disabled
               checked /><span>首次出现</span>
      </div>
      <!-- </draggable> -->
    </el-form>
    <!-- 选择概念集的弹窗 -->
    <el-dialog :visible.sync="conceptSetListVisible"
               width="60%"
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
        id: '',
        formdetail: [{
          data1: '',
          criteriaLayer1Code: "4",
          criteriaLayer2Code: "1",
          name: "医学检测集合"        },
        {
          data1: '',
          data2: '',
          criteriaLayer1Code: "4",
          criteriaLayer2Code: "2",
          name: "检测日期"        },
        {
          data1: 0,
          data2: 0,
          criteriaLayer1Code: "4",
          criteriaLayer2Code: "3",
          name: "检测年龄"
        },
        {
          data1: '',
          data2: '',
          criteriaLayer1Code: "4",
          criteriaLayer2Code: "4",
          name: "所需结果"
        },
        {
          data1: '',
          criteriaLayer1Code: "4",
          criteriaLayer2Code: "5",
          name: "检测类型"        },
        {
          data1: '',
          criteriaLayer1Code: "4",
          criteriaLayer2Code: "6",
          name: "记录来源"        },
        {
          data1: '',
          data2: '',
          criteriaLayer1Code: "4",
          criteriaLayer2Code: "7",
          name: "结果下限范围"        },
        {
          data1: '',
          data2: '',
          criteriaLayer1Code: "4",
          criteriaLayer2Code: "8",
          name: "结果下限百分比"        },
        {
          data1: '',
          data2: '',
          criteriaLayer1Code: "4",
          criteriaLayer2Code: "9",
          name: "结果上限范围"        },
        {
          data1: '',
          data2: '',
          criteriaLayer1Code: "4",
          criteriaLayer2Code: "10",
          name: "结果上限百分比"        },
        {
          data1: '',
          criteriaLayer1Code: "4",
          criteriaLayer2Code: "11",
          name: "检测结果"        },
        {
          data1: '',
          criteriaLayer1Code: "4",
          criteriaLayer2Code: "12",
          name: "检测值操作符"        },
        {
          data1: '',
          criteriaLayer1Code: "4",
          criteriaLayer2Code: "13",
          name: "检测值单位"        },
        {
          data1: '',
          criteriaLayer1Code: "4",
          criteriaLayer2Code: "14",
          name: "性别"        },
        {
          data1: true,
          criteriaLayer1Code: "4",
          criteriaLayer2Code: "15",
          name: "首次出现"        },]
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
        if (this.mainCondId.primarycond === 4) {
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
        if (this.minorCondId.primarycond === 4) {
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
  beforeMount: function () {
    for (var i = 0; i < 15; i++) {
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
          criteriaLayer1Code: 4
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
/* .medical .el-input__inner {
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
} */
.dialog-title {
  font-size: 18px;
}
.el-icon-tickets {
  font-size: 20px;
}
.medical .el-icon-close {
  margin-top: 6px;
}
.first-time {
  font-size: 14px;
  color: #606266;
  line-height: 28px;
}
</style>
