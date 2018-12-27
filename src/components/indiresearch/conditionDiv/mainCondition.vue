<template>
  <div class="main-condition-detail">
    <div class="condition-code">
      <span v-if="id !=0">或</span><span>满足</span>
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
    </el-form>
    <div class="droparea">
      <draggable :options="{group:condition}"
                 @add="getsort"
                 @update="getsortupdate"
                 class="drag-main-condition">
        <div class="drag-cover"></div>
      </draggable>
      <div class="limit-condition">
        <div><span>在主要事件发生日期之前，至少有</span>
          <label><input class="PriorDays num-input"
                   type="number"
                   min="0"></label><span>天的记录，且该条件发生后，至少有</span>
          <label><input class="PostDays num-input"
                   type="number"
                   min="0"></label>
          <span>天的记录。</span></div>
        <div>设定样本<select class="PrimaryLimitSelect">
            <option value="earliest">最早</option>
            <option value="latest">最晚</option>
          </select>发生的主要条件记录，为该样本优先纳入队列的条件记录。</div>
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
      condition: 'diagnose',  //拖拽group名
      itemId: '', //被拖拽元素的id
      cohortdict: '', //查询队列字典得到
      // id: '',
    }
  },
  mounted: function () {
    this.getQueueDict(1)
  },
  methods: {
    //查询队列条件字典
    getQueueDict(condtype) {
      axios.get('cohort/dict', {
        params: {
          token: this.GLOBAL.token,
          criteriaLayer1Code: condtype
        }
      })
        .then((response) => {
          this.cohortdict = response.data.data
          for (var i = 0; i < this.cohortdict.length; i++) {
            delete this.cohortdict[i]['sortNo']
          }
          // console.log(this.cohortdict)
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    //选择一级条件
    selectType(condtype) {
      this.$emit('selectType', condtype, this.id)
      this.getQueueDict(condtype)
      switch (condtype) {
        case '1': this.condition = 'diagnose';
          break;
        case '2': this.condition = 'mar';
          break;
        case '3': this.condition = 'operating';
          break;
        case '4': this.condition = 'medical';
          break;
        case '5': this.condition = 'deathRecords';
          break;
        default:
          break;
      }
    },
    //得到初始序号--rzx
    getsort(evt) {
      this.$emit('insertID', this.id)
      this.itemId = evt.item.getAttribute("id")
      this.cohortdict[this.itemId]['layer2SortNo'] = evt.newIndex
      this.cohortdict[this.itemId]['layer1SortNo'] = this.id
      this.cohortdict[this.itemId]['criteriaTypeCode'] = "1"
      console.log(this.cohortdict[this.itemId])
      this.$emit('getSortNo', this.cohortdict[this.itemId])
    },
    //更新拖拽后序号--rzx
    getsortupdate(evt) {
      this.itemId = evt.item.getAttribute("id")
      this.cohortdict[this.itemId]['layer2SortNo'] = evt.newIndex
      console.log(this.cohortdict[this.itemId])
      this.$emit('getSortNo', this.cohortdict[this.itemId])
    },
  }
}
</script>



