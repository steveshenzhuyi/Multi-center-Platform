<template>
  <div class="main-condition-detail"
       v-model="importdetail">
    <div class="condition-code">
      <span v-if="id !=0">或</span><span>满足</span>
    </div>
    <i class="el-icon-delete"
       @click="deleteMainDiv"></i>
    <el-form ref="mainCondId"
             :model="mainCondId"
             class="mainCondId">
      <el-select v-model="mainCondId.primarycond"
                 placeholder="请选择"
                 @change="selectPrimary"
                 style="padding-bottom:10px">
        <el-option v-for="primarycond in primaryconds"
                   :key="primarycond.index"
                   :label="primarycond.name"
                   :value="primarycond.sortNo">
        </el-option>
      </el-select>
      <el-select v-model="mainCondId.secondcond"
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
                 :viewdetail="viewdetail"
                 ref="formName"
                 @sendformData="getformData"></component>
    </div>
    <div class="limit-condition"
         slot="footer"
         style="display: block;"><span>在主要事件发生日期之前，至少有</span>
      <label><input class="PriorDays num-input"
               type="number"
               min="0"></label><span>天的记录，且该条件发生后，至少有</span>
      <label><input class="PostDays num-input"
               type="number"
               min="0"></label>
      <span>天的记录。</span></div>
  </div>
</template>
<script>
// import draggable from 'vuedraggable'
import Vue from 'vue'
import axios from 'axios'
import diagnoseForm from '../conditionForm/diagnoseform.vue'
import marForm from '../conditionForm/marform.vue'
import operatingForm from '../conditionForm/operatingform.vue'
import medicalForm from '../conditionForm/medicalform.vue'
import deathRecordsForm from '../conditionForm/deathRecordsform.vue'

export default {
  components: {
    // draggable,
    'diagnoseForm': diagnoseForm,
    'marForm': marForm,
    'operatingForm': operatingForm,
    'medicalForm': medicalForm,
    'deathRecordsForm': deathRecordsForm,
  },
  props: ['id', 'viewdetails'],
  data() {
    return {
      primaryconds: [],
      secondconds: [],
      formName: '', //加载的表单
      mainCondId: { primarycond: '', id: '', secondcond: '' },//主要条件div对应的条件类型、id序号
      importdetail: [],
      viewdetail: [],
    }
  },
  computed: {
    getAllmainCondId() {
      return this.$store.state.cohortView.all_mainCondId[this.id];
    }
  },
  watch: {
    getAllmainCondId(val) {
      this.mainCondId = val;
    }
  },
  mounted: function () {
    this.getCohortDict()
    this.reproduceCohort()
    this.mainCondId.id = this.id
    this.$store.commit('Push_MainCondId', this.mainCondId)
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
      this.$store.commit('Update_MainCondId', this.mainCondId)
    },
    //选择二级条件
    selectSecondary(secondcond) {
      this.mainCondId.secondcond = secondcond
      this.$store.commit('Update_MainCondId', this.mainCondId)
    },
    //监测表单数据改变
    getformData(form) {
      // console.log(this.$refs.formName.form)
      this.importdetail = form.formdetail
      // this.importdetail = this.$refs.formName.form.formdetail
      console.log(this.importdetail)
    },
    //查看队列详情初始化
    reproduceCohort() {
      this.viewdetail = this.viewdetails[this.id]
      // console.log(this.id)
      console.log(this.viewdetail)
      if (this.viewdetail != undefined) {
        this.mainCondId.primarycond = this.viewdetail[0].typeSortNo
        this.mainCondId.id = this.id
        this.getCohortDict(this.mainCondId.primarycond)
        switch (this.mainCondId.primarycond) {
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
      }
    },
    //删除主要条件div
    deleteMainDiv() {
      this.$emit('deleteMainDiv', this.id)
      this.$store.commit('Change_MainCondId', this.id)
    },
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
<style>
.PriorDays,
.PostDays {
  width: 60px;
  border: 0px;
  border-bottom: 1px solid #d5d5d5;
}
.condition-code {
  border-radius: 6px;
}
.main-condition-detail .el-icon-delete {
  margin-left: 97%;
  transform: translate(0px, -35px);
  background: #fff;
  width: 30px;
  line-height: 2;
  text-align: center;
  font-size: 20px;
  border-radius: 6px;
  color: #409eff;
  font-weight: bold;
}
</style>




