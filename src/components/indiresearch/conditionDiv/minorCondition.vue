<template>
  <div class="secondary-condition-detail"
       style="margin-top:-5px">
    <div style="margin-top:-25px;line-height:1.6">
      <div class="condition-code">
        <span v-if="id !=0">并</span>
        <span>满足</span>
      </div>
      <el-form ref="siftingform"
               :model="siftingform"
               label-width="100px"
               :inline="true"
               class="siftingform">
        <el-select v-model="siftingform.condtype"
                   placeholder="请选择"
                   @change="choosetype"
                   style="padding-bottom:10px">
          <el-option v-for="item in condtypes"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <!-- <component :is="comName"></component> -->
      </el-form>
      <div class="droparea">
        <draggable :options="{group:condition}">
          <div class="drag-cover"></div>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import Vue from 'vue'
import axios from 'axios'
import diagnoseForm from '../conditionform/diagnoseform.vue'
import marForm from '../conditionform/marform.vue'
import operatingForm from '../conditionform/operatingform.vue'
import medicalForm from '../conditionform/medicalform.vue'
import deathRecordsForm from '../conditionform/deathRecordsform.vue'

export default {
  components: {
    'diagnoseForm': diagnoseForm,
    'marForm': marForm,
    'operatingForm': operatingForm,
    'medicalForm': medicalForm,
    'deathRecordsForm': deathRecordsForm,
    draggable,
  },
  props: ['id'],
  data() {
    return {
      condtypes: [{
        value: '1',
        label: '诊断编码'
      }, {
        value: '2',
        label: '用药记录'
      }, {
        value: '3',
        label: '手术操作'
      }, {
        value: '4',
        label: '医学检测'
      }, {
        value: '5',
        label: '死亡记录'
      }],
      siftingform: {
        condtype: '1',
      },
    }
  },
  methods: {
    //选择一级条件
    choosetype(condtype) {
      console.log(condtype)
      this.getQueueDict(condtype)
      switch (condtype) {
        case '1': this.comName = 'diagnoseForm';
          this.condition = 'diagnose';
          break;
        case '2': this.comName = 'marForm';
          this.condition = 'mar';
          break;
        case '3': this.comName = 'operatingForm';
          this.condition = 'operating';
          break;
        case '4': this.comName = 'medicalForm';
          this.condition = 'medical';
          break;
        case '5': this.comName = 'deathRecordsForm';
          this.condition = 'deathRecords';
          break;
        default:
          break;
      }
    },
  }
}
</script>



