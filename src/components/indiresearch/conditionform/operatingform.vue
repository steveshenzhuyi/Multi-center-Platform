<template>
  <div>
    <el-form ref="form"
             :model="form"
             label-width="100px"
             label-position="left"
             :inline="true"
             size="mini"
             class="operating">
      <!-- id对应条件在字典的index -->
      <!-- <draggable :options="{group:'operating'}"> -->
      <div class="form-item"
           v-if="visible[0].show">
        <i class="el-icon-close"
           @click=changevisible(0)></i>&nbsp;
        <el-form-item label="手术操作集合">
          <el-input v-model="form.formdetail[0].data1"
                    @focus="getConceptsetList"></el-input>
          <!-- <el-checkbox v-model="operatingform.collectionchecked"
                     class="except">不在其之间</el-checkbox> -->
        </el-form-item>
      </div>
      <div class="form-item"
           v-if="visible[1].show">
        <i class="el-icon-close"
           @click=changevisible(1)></i>&nbsp;
        <el-form-item label="手术时间">
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
          <!-- <el-checkbox v-model="operatingform.datechecked"
                     class="except">不在其之间</el-checkbox> -->
        </el-form-item>
      </div>
      <div class="form-item"
           v-if="visible[2].show">
        <i class="el-icon-close"
           @click=changevisible(2)></i>&nbsp;
        <el-form-item label="手术年龄">
          <el-input-number v-model="form.formdetail[2].data1"
                           controls-position="right"></el-input-number><span class="line"> — </span>
          <el-input-number v-model="form.formdetail[2].data2"
                           controls-position="right"></el-input-number>
          <!-- <el-checkbox v-model="operatingform.agechecked"
                     class="except">不在其之间</el-checkbox> -->
        </el-form-item>
      </div>
      <div class="form-item"
           v-if="visible[3].show">
        <i class="el-icon-close"
           @click=changevisible(3)></i>&nbsp;
        <el-form-item label="数目">
          <el-input-number v-model="form.formdetail[3].data1"
                           controls-position="right"></el-input-number><span class="line"> — </span>
          <el-input-number v-model="form.formdetail[3].data2"
                           controls-position="right"></el-input-number>
          <!-- <el-checkbox v-model="operatingform.numberchecked"
                     class="except">不在其之间</el-checkbox> -->
        </el-form-item>
      </div>
      <div class="form-item"
           v-if="visible[4].show">
        <i class="el-icon-close"
           @click=changevisible(4)></i>&nbsp;
        <el-form-item label="记录来源">
          <el-input v-model="form.formdetail[4].data1"></el-input>
        </el-form-item>
      </div>
      <div class="form-item first-time"
           v-if="visible[5].show">
        <i class="el-icon-close"
           @click=changevisible(5)></i>&nbsp;
        <el-form-item label="性别">
          <el-input v-model="form.formdetail[5].data1"></el-input>
        </el-form-item>
      </div>
      <div class="form-item first-time"
           v-if="visible[6].show">
        <i class="el-icon-close"
           @click=changevisible(6)></i>&nbsp;
        <input type="checkbox"
               v-model="form.formdetail[6].data1"
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
    <!-- 主要条件时间窗 -->
    <div class="limit-condition"
         slot="footer"
         style="display: block;"
         v-if="mainlimit"><span>在主要事件发生日期之前，至少有</span>
      <label><input class="PriorDays num-input"
               type="number"
               min="0"
               v-model="form.formdetail[7].data1"></label><span>天的记录，且该条件发生后，至少有</span>
      <label><input class="PostDays num-input"
               type="number"
               min="0"
               v-model="form.formdetail[7].data2"></label>
      <span>天的记录。</span></div>
    <!-- 次要条件时间窗、概念限制 -->
    <div class="limit-condition"
         slot="footer"
         style="display: block;"
         v-if="minorlimit">该条件发生在主要条件之前
      <label><input class="num-input"
               type="number"
               min="0"
               v-model="form.formdetail[7].data1"></label>天和之后
      <label><input class="num-input"
               type="number"
               min="0"
               v-model="form.formdetail[7].data2"></label>天
      <span class="occurrence-choose">，且集合内
        <select class="occurrence-select"
                value="2"
                v-model="form.formdetail[8].data1">
          <option value="at least">至少</option>
          <option value="at most">至多</option>
          <option value="exactly">唯有</option>
        </select>
        满足
        <input class="occurrence-input"
               type="number"
               min="0"
               value="1"
               v-model="form.formdetail[8].data2">种
        <select value="0"
                class="occurrence-distinct"
                v-model="form.formdetail[8].data3">
          <option value="using any">任何</option>
          <option value="using distinct">不同</option>
        </select>
        概念的发生。
      </span>
    </div>
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
  props: ['mainCondId', 'minorCondId', 'viewdetail', 'viewdetail2'],
  data() {
    return {
      myconceptsetList: conceptsetList,
      conceptSetListVisible: false,
      form: {
        formdetail: [{
          data1: '',
          criteriaLayer1Code: "3",
          criteriaLayer2Code: "1",
          name: "手术操作集合"        },
        {
          data1: '',
          data2: '',
          criteriaLayer1Code: "3",
          criteriaLayer2Code: "2",
          name: "手术时间"        },
        {
          data1: 0,
          data2: 0,
          criteriaLayer1Code: "3",
          criteriaLayer2Code: "3",
          name: "手术年龄"        },
        {
          data1: '',
          data2: '',
          criteriaLayer1Code: "3",
          criteriaLayer2Code: "4",
          name: "数目"        },
        {
          data1: '',
          criteriaLayer1Code: "3",
          criteriaLayer2Code: "5",
          name: "记录来源"        },
        {
          data1: '',
          criteriaLayer1Code: "3",
          criteriaLayer2Code: "6",
          name: "性别"        },
        {
          data1: true,
          criteriaLayer1Code: "3",
          criteriaLayer2Code: "7",
          name: "首次出现"        },
        {
          data1: '',
          data2: '',
          criteriaLayer1Code: "3",
          criteriaLayer2Code: "8",
          name: "时间窗"        },
        {
          data1: 'at least',
          data2: '',
          data3: 'using any',
          criteriaLayer1Code: "3",
          criteriaLayer2Code: "9",
          name: "概念限制"        }]
      },
      // cohortdict: '', //查询队列字典得到
      visible: [],
      initialform: [],//初始表单，恢复初始值
      mainlimit: false,
      minorlimit: false,
    }
  },
  computed: {
    getId() {
      if (this.mainCondId != undefined) {
        return this.mainCondId.id;
      } else if (
        this.minorCondId != undefined) {
        return this.minorCondId.id;
      }
    },
  },
  watch: {
    //删除条件后，id改变，调整排序
    getId(id) {
      this.form.formdetail.forEach(f => {
        if (f.layer1SortNo != undefined) {
          f.layer1SortNo = id
        }
      })
    },
    mainCondId: {
      handler() {
        if (this.mainCondId.primarycond === 3) {
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
        if (this.minorCondId.primarycond === 3) {
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
    form: {
      handler() {
        //限制条件
        if (this.mainCondId != undefined && (this.form.formdetail[7].data1 != '' || this.form.formdetail[7].data2 != '')) {
          this.form.formdetail[7].layer1SortNo = this.mainCondId.id
          this.form.formdetail[7].criteriaTypeCode = "1"
          this.form.formdetail[7].typeSortNo = 1
          this.form.formdetail[7].layer2SortNo = 8
        } else if (this.minorCondId != undefined && (this.form.formdetail[7].data1 != '' || this.form.formdetail[7].data2 != '')) {
          console.log('dd')
          this.form.formdetail[7].layer1SortNo = this.minorCondId.id
          this.form.formdetail[7].criteriaTypeCode = "2"
          this.form.formdetail[7].typeSortNo = 2
          this.form.formdetail[7].layer2SortNo = 8
        }
        if (this.minorCondId != undefined && this.form.formdetail[8].data2 != '') {
          this.form.formdetail[8].layer1SortNo = this.minorCondId.id
          this.form.formdetail[8].criteriaTypeCode = "2"
          this.form.formdetail[8].typeSortNo = 2
          this.form.formdetail[8].layer2SortNo = 9
        }
        console.log(this.form.formdetail)
        this.$emit('sendformData', this.form)
      },
      deep: true,
    },
  },
  beforeMount: function () {
    for (var i = 0; i < 7; i++) {
      this.visible.push({ show: false })
    }
    this.getCohortDict()
  },
  mounted: function () {
    this.initialform = JSON.parse(JSON.stringify(this.form.formdetail))
    this.reproduceForm()
    if (this.mainCondId != undefined) {
      this.mainlimit = true
    }
    else if (this.minorCondId != undefined) {
      this.minorlimit = true
    }
  },
  methods: {
    //查询队列条件字典
    getCohortDict() {
      axios.get('cohort/dict', {
        params: {
          token: this.GLOBAL.token,
          criteriaLayer1Code: 3
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
    //删除所选二级条件
    changevisible(showindex) {
      console.log(showindex)
      this.visible[showindex].show = false
      this.form.formdetail[showindex] = this.initialform[showindex];
    },
    //查看队列详情初始化
    reproduceForm() {
      if (this.viewdetail != undefined) {
        this.mainlimit = true
        this.viewdetail.forEach(item => {
          this.form.formdetail[item.criteriaLayer2Code - 1] = item
          if (item.name.search("时间窗") == -1 && item.name.search("概念限制") == -1) {
            this.visible[item.criteriaLayer2Code - 1].show = true
          }
        })
        // console.log(this.form.formdetail)
      }
      if (this.viewdetail2 != undefined) {
        this.minorlimit = true
        this.viewdetail2.forEach(item => {
          this.form.formdetail[item.criteriaLayer2Code - 1] = item
          if (item.name.search("时间窗") == -1 && item.name.search("概念限制") == -1) {
            this.visible[item.criteriaLayer2Code - 1].show = true
          }
        })
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
/* .operating .el-input__inner {
  display: none;
}
.operating .el-checkbox__input {
  display: none;
}
.operating .el-input-number {
  display: none;
}
.operating .el-range-input {
  display: none;
}
.operating .el-range-editor.el-input__inner {
  display: none;
}
.operating .except {
  display: none;
}
.operating .line {
  display: none;
}
.operating .el-form-item__content {
  display: none;
}
.operating .el-checkbox__label {
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
.operating .el-form-item__label {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 2px 2px 2px 2px;
  box-shadow: 0 8px 6px -6px #777;
  padding: 0 20px;
  display: inline-block;
  margin: 0 5px 12px 0;
  text-align: center;
}
.operating .el-form-item--mini .el-form-item__label {
  line-height: 38px;
} */
.dialog-title {
  font-size: 18px;
}
.el-icon-tickets {
  font-size: 20px;
}
.operating .el-icon-close {
  margin-top: 6px;
}
.first-time {
  font-size: 14px;
  color: #606266;
  line-height: 28px;
}
</style>
