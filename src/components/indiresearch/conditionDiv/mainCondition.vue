<template>
  <div class="main-condition-detail"
       v-model="importdetail">
    <div class="condition-code">
      <span v-if="id !=0">或</span><span>满足</span>
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
                 :mainCondId="mainCondId"
                 ref="formName"
                 @bindData="bindData"></component>
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
      mainCondId: { primarycond: '', id: '', secondcond: '' },//主要条件div对应的条件类型、id序号
      importdetail: [],
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
      this.mainCondId.primarycond = primarycond
      this.mainCondId.id = this.id
      console.log(this.mainCondId)
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
      this.mainCondId.secondcond = secondcond
    },
    //监测表单数据改变
    bindData() {
      // console.log(this.$refs.formName.form)
      this.importdetail = this.$refs.formName.form.formdetail
      console.log(this.importdetail)
    }
  },
  // //得到初始序号--rzx
  // getsort(evt) {
  //   this.itemId = evt.item.getAttribute("id")
  //   this.$emit('getSortNo', this.itemId, evt.newIndex, this.id, this.formName)
  // },
  // //更新拖拽后序号--rzx
  // getsortupdate(evt) {
  //   this.itemId = evt.item.getAttribute("id")
  //   this.$emit('getSortNo', this.itemId, evt.newIndex, this.id, this.formName)
  // },
}
</script>



