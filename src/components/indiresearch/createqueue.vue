<template>
  <div class="creat-queue-vue">
    <!-- 队列基本信息表单 -->
    <div class="user-fill-info"
         style="margin-top:20px">
      <el-form :model="queueInfo"
               :rules="rules"
               ref="queueInfo"
               label-width="110px"
               label-position="left"
               class="queue-Info">
        <!-- <el-form-item label="队列类型"
                      prop="type">
          <el-radio-group v-model="queueInfo.type">
            <el-radio label="1">队列筛选</el-radio>
            <el-radio label="2">队列模式</el-radio>
            <el-radio label="3">变量模式</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="队列名称"
                      prop="name">
          <el-col :span="11">
            <el-input v-model="queueInfo.name"
                      placeholder="请输入队列名称"></el-input>
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="队列创建时间"
                      required>
          <el-col :span="11">
            <el-form-item prop="date">
              <el-date-picker type="date"
                              placeholder="请选择创建日期"
                              v-model="queueInfo.date"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item> -->
        <!-- <el-form-item label="队列创建者"
                      prop="creator">
          <el-col :span="11">
            <el-input v-model="queueInfo.creator"
                      placeholder="请输入队列创建者"></el-input>
          </el-col>
        </el-form-item> -->
        <!-- <el-form-item label="关键字">
          <el-col :span="11">
            <el-input v-model="queueInfo.keyword"
                      placeholder="请输入关键字"></el-input>
          </el-col>
        </el-form-item> -->
        <el-form-item label="队列描述">
          <el-col :span="11">
            <el-input type="textarea"
                      v-model="queueInfo.desc"
                      placeholder="请输入队列描述"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <el-row :gutter="20">
      <el-col :span="18">
        <div class="conditon-info"
             style="margin-left:10px">
          <!-- 主要条件 -->
          <div class="main-condition">
            <div class="one-of-main-condition">
              <span>主要条件：满足下列条件其中之一的人群队列</span>
            </div>
            <div class="main-condition-detail">
              <div class="condition-code">
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
                <draggable :options="{group:condition}"
                           @add="getsort"
                           @update="getsortupdate">
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
            <div class=main-condition-detail>
              <span style="padding-left:50%">
                <img src="../../assets/plus.png"
                     @click="add">
              </span>
            </div>
            <!-- <div class="limit-condition">
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
            </div> -->
          </div>
          <div class="secondary-condition">
            <div style="transform: translate(10px, -20px);">
              <span style="background:#ffffff;">次要条件：在满足主要条件的同时，也满足下列
                <select v-model="limitvalue"
                        class="PrimaryLimitSelect">
                  <option value="all">全部</option>
                  <option value="any">之一</option>
                  <option value="at_most">至多</option>
                  <option value="at_least">至少</option>
                </select>
                <select class="PrimaryLimitSelect">
                  <option value="0">0个</option>
                </select>
                条件的人群
              </span>
            </div>
            <div class="secondary-condition-detail"
                 style="margin-top:-5px">
              <div style="margin-top:-25px;line-height:1.6">
                <div>
                  <span style="">并</span>
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
          </div>
          <div>
            <el-button style="float:right;margin-top:10px"
                       @click="resetForm('queueInfo')">取消</el-button>
            <el-button type="primary"
                       style="float:right;margin-right:5px;margin-top:10px"
                       @click="submitForm('queueInfo')">保存</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div id="sifting-condition-item"
             class="sifting-queue-content">
          <!-- 下拉选择显示右侧二级条件 -->
          <component :is="comName"
                     ref="comName"
                     :queuedict="queuedict"></component>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Vue from 'vue'
import axios from 'axios'
import diagnoseForm from './conditionform/diagnoseform.vue'
import marForm from './conditionform/marform.vue'
import operatingForm from './conditionform/operatingform.vue'
import medicalForm from './conditionform/medicalform.vue'
import deathRecordsForm from './conditionform/deathRecordsform.vue'
import { error } from 'util';

const items = []

export default {
  components: {
    'diagnoseForm': diagnoseForm,
    'marForm': marForm,
    'operatingForm': operatingForm,
    'medicalForm': medicalForm,
    'deathRecordsForm': deathRecordsForm,
    draggable,
  },

  data() {
    return {
      limitvalue: '',
      comName: 'diagnoseForm',
      condition: 'diagnose',
      queuedict: '',
      queueInfo: {
        // type: '',
        // date: '',
        // creator: '',
        // keyword: '',
        name: '',
        desc: ''
      },
      // 表单验证
      rules: {
        // type: [
        //   { required: true, message: '请选择队列类型', trigger: 'blur' },
        // ],
        name: [
          { required: true, message: '请输入队列名称', trigger: 'blur' },
        ],
        // date: [
        //   { type: 'date', required: true, message: '请选择创建时间', trigger: 'change' }
        // ],
      },
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
        condtype: '',
      },
      creatInfo: '',
      sortNo: ''
    }
  },
  methods: {
    add() {
      console.log('jia')
      this.items.push(items)
    },
    choosetype(condtype) {
      // axios.get('cohort/dict', {
      //   params: {
      //     token: this.GLOBAL.token,
      //     criteriaLayer1Code: condtype
      //   }
      // })
      //   .then((response) => {
      //     this.queuedict = response.data.data
      //     console.log(this.queuedict)
      //   })
      //   .catch(function (error) {
      //     console.log("error", error);
      //   });

      console.log(condtype)
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
    submitForm(queueInfo) {
      // console.log(this.$refs.comName.diagnoseform)
      //表单验证--rzx
      // this.$refs[queueInfo].validate((valid) => {
      //   if (valid) {
      //     console.log('valid success!!');
      //   } else {
      //     console.log('valid error!!');
      //     return false;
      //   }
      // });
      this.creatInfo = {
        collaborationTag: "1",
        token: this.GLOBAL.token,
      }
      this.creatInfo = Object.assign(this.creatInfo, this.queueInfo)
      console.log(this.creatInfo)
      axios.get('cohort/create', {
        params: this.creatInfo
      })
        .then((response) => {
          console.log(response)
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    resetForm(queueInfo) {
      this.$refs[queueInfo].resetFields();
    },
    getsort(evt) {
      console.log(evt.newIndex)
      // console.log(evt.newIndex)
    },
    getsortupdate(evt) {
      console.log(evt.newIndex)
      // console.log(evt.newIndex)
    }
  }
}

</script>
<style>
.main-condition {
  border: 1px solid #ccc;
  display: block;
  /* margin-top: 40px; */
}
.main-condition-detail:hover {
  background-color: rgba(234, 235, 242, 0.67);
}
.secondary-condition {
  border: 1px solid #ccc;
  display: block;
  margin-top: 40px;
}
.main-condition-detail,
.secondary-condition-detail {
  padding: 10px;
  width: 92%;
  background: #ffffff;
  position: relative;
  margin: 20px;
  border: 1px solid #ccc;
}
.limit-condition {
  margin-left: 10px;
  margin-bottom: 5px;
  font-size: 14px;
  line-height: 1.5;
  color: #606266;
}
.one-of-main-condition {
  transform: translate(10px, -12px);
  background: #ffffff;
  padding: 0 10px;
  width: 330px;
}
input.num-input {
  width: 60px;
  border: 0px;
  border-bottom: 1px solid #d5d5d5;
}

.condition-code {
  background-color: #fff;
  padding: 0 10px;
  width: 60px;
  text-align: center;
  margin-top: -28px;
  line-height: 2;
}
.drag-cover {
  width: 100%;
  height: 10px;
  /* background-color: rgba(216, 216, 216, 0.18); */
  /* position: absolute; */
}
.sifting-queue-content {
  background: linear-gradient(to bottom, #eaeaea, #f9f9f9);
  border-radius: 5px;
  padding: 10px 0 0 10px;
  display: block;
}
.line {
  color: #606266;
}
</style>
<style>
.droparea .el-input {
  width: 130px;
  display: inline-block;
}
/* .droparea .el-form-item__content {
  display: inline-block;
} */
.droparea .el-form-item__label {
  text-align: left;
}
.siftingform {
  margin-top: 10px;
}
</style>

