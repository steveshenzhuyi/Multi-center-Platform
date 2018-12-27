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
        <el-form-item label="队列名称"
                      prop="name">
          <el-col :span="11">
            <el-input v-model="queueInfo.name"
                      placeholder="请输入队列名称"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="队列描述">
          <el-col :span="11">
            <el-input type="textarea"
                      v-model="queueInfo.description"
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
            <component :is="maindiv.component"
                       v-for="(maindiv,index) in maindivs"
                       :id="maindiv.id"
                       :key="index"
                       @selectType="choosetype"
                       @getSortNo="getSortNo"
                       @insertID="insertID"></component>
            <div class=main-condition-detail>
              <span style="padding-left:50%"
                    @click="addMajor('maincondition')">
                <img src="../../assets/plus.png">
              </span>
            </div>
          </div>
          <!-- 次要条件 -->
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
            <component :is="minordiv.component"
                       v-for="(minordiv,index) in minordivs"
                       :id="minordiv.id"
                       :key="index"></component>
            <div class=secondary-condition-detail>
              <span style="padding-left:50%"
                    @click="addMinor('minorcondition')">
                <img src="../../assets/plus.png">
              </span>
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
                     :conditionFormId="conditionFormId"
                     :mainItem="mainItem"
                     ref="mainCondName"></component>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Vue from 'vue'
import axios from 'axios'
import diagnoseForm from './conditionForm/diagnoseform.vue'
import marForm from './conditionForm/marform.vue'
import operatingForm from './conditionForm/operatingform.vue'
import medicalForm from './conditionForm/medicalform.vue'
import deathRecordsForm from './conditionForm/deathRecordsform.vue'
import maincondition from './conditionDiv/mainCondition.vue'
import minorcondition from './conditionDiv/minorCondition.vue'

export default {
  components: {
    'diagnoseForm': diagnoseForm,
    'marForm': marForm,
    'operatingForm': operatingForm,
    'medicalForm': medicalForm,
    'deathRecordsForm': deathRecordsForm,
    draggable,
    'maincondition': maincondition,
    'minorcondition': minorcondition,
  },
  data() {
    return {
      limitvalue: '',
      comName: 'diagnoseForm', //右侧加载的组件
      queueInfo: {
        name: '',
        description: ''
      },
      // 表单验证
      rules: {
        name: [
          { required: true, message: '请输入队列名称', trigger: 'blur' },
        ],
        // date: [
        //   { type: 'date', required: true, message: '请选择创建时间', trigger: 'change' }
        // ],
      },
      creatInfo: {},
      conditiondetails: [],
      importdetails: [],
      maindivs: [{ component: "maincondition", id: 0 }],
      maindivCount: 0,
      mainItem: { itemId: '', sortNo: 0, id: 0, groupName: '' },
      condId: [{ cond: 'diagnoseForm', id: 0 },
      { cond: 'marForm', id: '' },
      { cond: 'operatingForm', id: '' },
      { cond: 'medicalForm', id: '' },
      { cond: 'deathRecordsForm', id: '' },],
      lastcondId: 0, //保存上一次condtype id结果
      mainCondName: '',
      minordivs: [{ component: "minorcondition", id: 0 }],
      minordivCount: 0,
      conditionFormId: '',
    }
  },
  methods: {
    //新增主要条件
    addMajor(component) {
      this.maindivCount = this.maindivCount + 1
      this.maindivs.push({
        'component': component,
        'id': this.maindivCount
      })
      this.condId[0]['id'] = this.maindivCount
      console.log(this.maindivs)
      console.log(this.maindivCount)
    },
    //新增次要条件
    addMinor(component) {
      this.minordivCount = this.minordivCount + 1
      this.minordivs.push({
        'component': component,
        'id': this.minordivCount
      })
      console.log(this.minordivs)
      console.log(this.minordivCount)
    },
    //选择一级条件
    choosetype(condtype, id) {
      console.log(condtype, id)
      for (var i = 0; i < this.condId.length; i++) {
        if (this.condId[i].id == this.lastcondId) {
          this.condId[i].id = ''
        }
      }
      switch (condtype) {
        case '1': this.comName = 'diagnoseForm';
          this.condId[0]['id'] = id
          break;
        case '2': this.comName = 'marForm';
          this.condId[1]['id'] = id
          break;
        case '3': this.comName = 'operatingForm';
          this.condId[2]['id'] = id
          break;
        case '4': this.comName = 'medicalForm';
          this.condId[3]['id'] = id
          break;
        case '5': this.comName = 'deathRecordsForm';
          this.condId[4]['id'] = id
          break;
        default:
          break;
      }
      this.lastcondId = id
    },
    // 条件表单插入DIV的id区别位置
    insertID(id) {
      console.log(id)
      this.conditionFormId = id
    },
    //得到每个item的sortno和在字典中的序号
    getSortNo(itemId, newIndex, id, groupName) {
      this.mainItem.itemId = itemId
      this.mainItem.sortNo = newIndex
      this.mainItem.id = id
      this.mainItem.groupName = groupName
    },
    submitForm(queueInfo) {
      //表单验证--rzx
      // this.$refs[queueInfo].validate((valid) => {
      //   if (valid) {
      //     console.log('valid success!!');
      //   } else {
      //     console.log('valid error!!');
      //     return false;
      //   }
      // });
      this.fulfilCreatInfo(queueInfo)
      console.log(this.creatInfo)
      axios.post('cohort/create', {
        params: this.creatInfo
      })
        .then((response) => {
          console.log(response)
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    //重置表单
    resetForm(queueInfo) {
      this.$refs[queueInfo].resetFields();
    },
    //拼接队列创建条件--rzx
    fulfilCreatInfo(queueInfo) {
      this.creatInfo = {
        token: this.GLOBAL.token,
        detail: []
      }
      this.creatInfo = Object.assign(this.creatInfo, this.queueInfo)
      // 若id存在则读取子组件form
      for (var i = 0; i < this.condId.length; i++) {
        if (this.condId[i].id !== '') {
          this.mainCondName = this.condId[i].cond
          // 去掉未拖拽出来的条件
          for (var j = 0; j < this.$refs.mainCondName.form.formdetail.length; j++) {
            if (this.$refs.mainCondName.form.formdetail[j]['layer2SortNo'] !== undefined) {
              this.importdetails.push(this.$refs.mainCondName.form.formdetail[j])
            }
          }
        }
      }
      console.log(this.importdetails)
      this.creatInfo['detail'] = this.importdetails
    },
  }
}
</script>
<style>
.main-condition {
  border: 1px solid #ccc;
  display: block;
  /* margin-top: 40px; */
}
.main-condition-detail:hover,
.secondary-condition-detail:hover {
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
  position: absolute;
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

