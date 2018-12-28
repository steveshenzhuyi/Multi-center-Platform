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
                   @change="selectType"
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
        <draggable :options="{group:groupName}">
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

export default {
  components: {
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
      groupName: 'diagnose',  //拖拽group名
      itemId: '',//被拖拽元素的id
    }
  },
  methods: {
    //选择一级条件
    selectType(condtype) {
      console.log(condtype)
      this.getQueueDict(condtype)
      switch (condtype) {
        case '1': this.groupName = 'diagnose';
          break;
        case '2': this.groupName = 'mar';
          break;
        case '3': this.groupName = 'operating';
          break;
        case '4': this.groupName = 'medical';
          break;
        case '5': this.groupName = 'deathRecords';
          break;
        default:
          break;
      }
    },
    //得到初始序号--rzx
    getsort(evt) {
      this.itemId = evt.item.getAttribute("id")
      this.cohortdict[this.itemId]['layer2SortNo'] = evt.newIndex
      console.log(this.cohortdict[this.itemId])
    },
    //更新拖拽后序号--rzx
    getsortupdate(evt) {
      this.itemId = evt.item.getAttribute("id")
      this.cohortdict[this.itemId]['layer2SortNo'] = evt.newIndex
      console.log(this.cohortdict[this.itemId])
    },
  }
}
</script>



