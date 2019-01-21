<template>
  <div class="secondary-condition-detail"
       style="margin-top:-5px"
       v-model="importdetail2">
    <div style="margin-top:-25px;line-height:1.6">
      <div class="condition-code">
        <span v-if="id !=0">并</span>
        <span>满足</span>
      </div>
      <el-form ref="siftingform"
               :model="siftingform"
               class="siftingform">
        <el-select v-model="siftingform.primarycond"
                   placeholder="请选择"
                   @change="selectPrimary"
                   style="padding-bottom:10px">
          <el-option v-for="primarycond in primaryconds"
                     :key="primarycond.index"
                     :label="primarycond.name"
                     :value="primarycond.sortNo">
          </el-option>
        </el-select>
        <el-select v-model="siftingform.secondcond"
                   placeholder="请选择"
                   @change="selectSecondary"
                   style="padding-bottom:10px">
          <el-option v-for="secondcond in secondconds"
                     :key="secondcond.index"
                     :label="secondcond.name"
                     :value="secondcond.sortNo">
          </el-option>
        </el-select>
      </el-form>
      <div>
        <component :is="formName"
                   :minorCondId="minorCondId"
                   ref="formName"></component>
      </div>
      <div class="limit-condition"
           slot="footer"
           style="display: block;">该条件发生在主要条件&nbsp;
        <select class="before-and-after"
                value="1">
          <option value="1">之前</option>
          <option value="-1">之后</option>
        </select>&nbsp;
        <label><input class="num-input"
                 type="number"
                 min="0"></label>&nbsp;天&nbsp;和&nbsp;<select class="before-and-after"
                value="-1">
          <option value="1">之前</option>
          <option ng-selected="true"
                  value="-1"
                  selected="selected">之后</option>
        </select>&nbsp;
        <label><input class="num-input"
                 type="number"
                 min="0"></label>&nbsp;天
        <span class="occurrence-choose">
          ，且集合内
          <select class="occurrence-select"
                  value="2">
            <option value="2">至少</option>
            <option value="1">至多</option>
            <option value="0">唯有</option>
          </select>
          满足
          <input class="occurrence-input"
                 type="number"
                 min="0"
                 value="1">
          种
          <select value="0"
                  class="occurrence-distinct">
            <option value="0">任何</option>
            <option value="1">不同</option>
          </select>
          概念的发生。
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import Vue from 'vue'
import axios from 'axios'
import diagnoseForm from '../conditionForm/diagnoseform.vue'
import marForm from '../conditionForm/marform.vue'
import operatingForm from '../conditionForm/operatingform.vue'
import medicalForm from '../conditionForm/medicalform.vue'
import deathRecordsForm from '../conditionForm/deathRecordsform.vue'

export default {
  components: {
    draggable,
    'diagnoseForm': diagnoseForm,
    'marForm': marForm,
    'operatingForm': operatingForm,
    'medicalForm': medicalForm,
    'deathRecordsForm': deathRecordsForm,
  },
  props: ['id'],
  data() {
    return {
      primaryconds: [],
      secondconds: [],
      siftingform: {
        primarycond: '',
        secondcond: '',
      },
      formName: '', //加载的表单
      minorCondId: { primarycond: '', id: '', secondcond: '' },//次要条件div对应的条件类型、id序号
      importdetail2: [],
    }
  },
  mounted: function () {
    this.getCohortDict()
  },
  methods: {
    //读取字典表
    getCohortDict(criteriaLayer1Code) {
      axios.get('cohort/dict', {
        params: {
          token: this.GLOBAL.token,
          criteriaLayer1Code: criteriaLayer1Code
        }
      }).then((response) => {
        if (criteriaLayer1Code == undefined) {
          this.primaryconds = response.data.data
        }
        else {
          this.secondconds = response.data.data
        }
      }).catch(function (error) {
        console.log("error", error);
      });
    },
    //选择一级条件
    selectPrimary(primarycond) {
      this.minorCondId.primarycond = primarycond
      this.minorCondId.id = this.id
      console.log(this.minorCondId)
      axios.get('cohort/dict', {
        params: {
          token: this.GLOBAL.token,
          criteriaLayer1Code: primarycond
        }
      }).then((response) => {
        this.secondconds = response.data.data
      }).catch(function (error) {
        console.log("error", error);
      });
      switch (primarycond) {
        case 1: this.formName = 'diagnoseForm';
          break;
        case 2: this.formName = 'marForm';
          break;
        case 3: this.formName = 'operatingForm';
          break;
        case 4: this.formName = 'medicalForm';
          break;
        case 5: this.formName = 'deathRecordsForm';
          break;
        default:
          break;
      }
    },
    //选择二级条件
    selectSecondary(secondcond) {
      this.minorCondId.secondcond = secondcond
    },
    // //监测表单数据改变
    // bindData() {
    //   // console.log(this.$refs.formName.form)
    //   this.importdetail = this.$refs.formName.form.formdetail
    //   console.log(this.importdetail)
    // }
  },
}
</script>
<style>
.num-input,
.occurrence-input {
  width: 60px;
  border: 0px;
  border-bottom: 1px solid #d5d5d5;
}
.before-and-after,
.occurrence-select,
.occurrence-distinct {
  color: #606266;
  border: 0px;
}
.condition-code {
  border-radius: 6px;
}
</style>
</style>




