<template>
  <div>
    <el-form :model="bayesianForm"
             ref="bayesianForm"
             label-width="100px">
      <el-form-item prop="methodname"
                    label="模型名称"
                    :rules="[{required: true, message: '请输入模型名称', trigger: 'blur' }]">
        <el-input v-model="bayesianForm.methodname"
                  size="mini"
                  style="width:200px;"></el-input>
      </el-form-item>
    </el-form>
    <!-- <el-row style="margin-top:10px;margin-bottom:10px">
      模型名称: &nbsp;<el-input v-model="bayesianForm.methodname"
                size="mini"
                style="width:200px;"></el-input>
    </el-row> -->
    <el-row :gutter="20">
      <el-col :span="20">

        <el-row :gutter="10">
          <el-col :span="10">
            <fieldset style=" min-width: inherit; height:220px;border-width:0.5px;border-style: double">
              <el-table :data="Varlist"
                        ref="singleTable"
                        max-height="200"
                        tooltip-effect="dark"
                        highlight-current-row
                        :row-class-name="tableRowClassName1"
                        @row-click="getRowdetail1">

                <el-table-column prop="name">
                </el-table-column>
                <el-table-column prop="featureId"
                                 v-if="idshow1">

                </el-table-column>

              </el-table>
            </fieldset>
          </el-col>

          <el-col :span="4">

            <div style="margin-top: 40%; text-align:center;">
              <!-- 右移 -->
              <el-button type="info"
                         @click="rightshift"
                         icon="icon el-icon-d-arrow-right"></el-button>

            </div>
            <!-- 左移 -->
            <div style="margin-top: 30%; text-align:center;">
              <el-button type="info"
                         @click="leftshift"
                         icon="icon el-icon-d-arrow-left"></el-button>

            </div>

            <div style="margin-top:60%; text-align:center;">
              <!-- 右移 -->
              <el-button type="info"
                         @click="rightshift2"
                         icon="icon el-icon-d-arrow-right"></el-button>

            </div>
            <!-- 左移 -->
            <div style="margin-top: 30%; text-align:center;">
              <el-button type="info"
                         @click="leftshift2"
                         icon="icon el-icon-d-arrow-left"></el-button>

            </div>

          </el-col>
          <el-col :span="10">
            <fieldset style="  min-width: inherit; height:220px;border-width:0.5px;border-style: double">
              <el-table :data="Chosenlist1"
                        max-height="200"
                        ref="singleTable"
                        tooltip-effect="dark"
                        @row-click="getRowdetail2">

                <el-table-column prop="name"
                                 label="结局变量">
                </el-table-column>
                <el-table-column prop="featureId"
                                 v-if="idshow2">

                </el-table-column>

              </el-table>
            </fieldset>
            <fieldset style="  min-width: inherit; height:220px;border-width:0.5px;border-style: double">
              <el-table :data="Chosenlist2"
                        max-height="200"
                        ref="singleTable"
                        tooltip-effect="dark"
                        :row-class-name="tableRowClassName3"
                        @row-click="getRowdetail3">

                <el-table-column prop="name"
                                 label="自变量">
                </el-table-column>
                <el-table-column prop="featureId"
                                 v-if="idshow3">

                </el-table-column>

              </el-table>
            </fieldset>
          </el-col>
        </el-row>

      </el-col>
      <el-col :span="4">
        <el-row style="margin-top: 30%; ">
          <el-button type="primary"
                     v-if="isnew"
                     @click="save">确定</el-button>
          <el-button type="primary"
                     v-else
                     @click="edit">编辑</el-button>
        </el-row>
        <el-row style="margin-top: 15%;">
          <el-button type="primary"
                     @click="cancel">取消</el-button>
        </el-row>
        <el-row style="margin-top: 15%; ">
          <el-button type="primary"
                     @click="help">帮助</el-button>
        </el-row>
      </el-col>
    </el-row>

    <el-row style="margin-top:10px;margin-bottom:10px">

      <fieldset class="groupbox-boarder">
        <legend class="one-of-groupbox-boarder">参数设置</legend>
        <el-row>
          模型 &nbsp;<el-select v-model="value7"
                     size="mini"
                     style="width:100px;">
            <el-option v-for="item in options7"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>

        </el-row>
      </fieldset>

    </el-row>
    <el-row style="margin-top:10px;margin-bottom:10px">

      <fieldset class="groupbox-boarder">
        <legend class="one-of-groupbox-boarder">高级参数</legend>
        <el-row tyle="margin-top:20px;margin-bottom:10px">
          smoothing &nbsp;<el-input type="number"
                    v-model="input7_1"
                    size="mini"
                    style="width:100px;"></el-input> &nbsp;
          <el-checkbox v-model="check7">fit prior</el-checkbox>

        </el-row>
        <el-row tyle="margin-top:10px;margin-bottom:10px">
          alpha &nbsp; <el-input type="number"
                    v-model="input7_2"
                    size="mini"
                    style="width:100px;"></el-input>
        </el-row>
        <el-row>
          gamma &nbsp;<el-input type="number"
                    v-model="input7_3"
                    size="mini"
                    style="width:100px;"></el-input>
        </el-row>
      </fieldset>

    </el-row>

  </div>
</template>
<script>
export default {
  data() {
    return {
      bayesianForm: {
        methodname: '',

      },
      idshow1: false,
      idshow2: false,
      idshow3: false,
      isnew: true,
      currentRow2: [],
      currentRow1: [],
      currentRow3: [],
      Varlist: [{ 'featureId': 123, 'name': '变量1' }, { 'featureId': 124, 'name': '变量2' }, { 'featureId': 127, 'name': '变量3' }, { 'featureId': 129, 'name': '变量4' }, { 'featureId': 122, 'name': '变量5' }],
      Chosenlist1: [],
      Chosenlist2: [],
      index1: -1,
      index3: -1,



      value7: [],
      value7_1: [],
      value7_2: [],
      check7: true,
      input7_1: 0.0001,
      input7_2: 1.0,
      input7_3: 1.0,
      options7: [
        {
          value: '选项1',
          label: '高斯'
        }, {
          value: '选项2',
          label: '多项分布'
        },
        {
          value: '选项3',
          label: '伯努利'
        }
      ],
    }
  },
  methods: {
    tableRowClassName1({ row, rowIndex }) {
      row.index = rowIndex;
      // this.index1 = row.index;
      // this.index1 = rowIndex

    },
    tableRowClassName3({ row, rowIndex }) {
      row.index = rowIndex;
      // this.index1 = row.index;
      // this.index1 = rowIndex

    },
    getRowdetail1(row, event, column) {

      this.index1 = row.index;
      this.currentRow1 = row;


    },
    getRowdetail2(row, event, column) {
      // console.log(row.name, row.featureId);

      this.currentRow2 = row;


    },
    getRowdetail3(row, event, column) {
      // console.log(row.name, row.featureId);
      this.index3 = row.index;
      this.currentRow3 = row;


    },



    rightshift: function () {
      // console.log('右移1')
      var t = this.currentRow1;
      if (this.index1 != -1) {
        if (this.Chosenlist1.length == 0) {
          this.Chosenlist1.push(t);
          this.Varlist.splice(this.index1, 1)
          this.index1 = -1
          this.currentRow1 = null
        }
        else {

          this.$alert('只能选择一个结局变量');

        }
      } else {
        this.$alert("请选择变量")
      }

    },

    leftshift: function () {
      // console.log('左移1')
      var t = this.currentRow2;
      this.Varlist.push(t);

      this.Chosenlist1.splice(0, 1);

    },
    rightshift2: function () {

      if (this.index1 != -1) {

        this.Chosenlist2.push(this.currentRow1);
        this.Varlist.splice(this.index1, 1);
        this.index1 = -1
        this.currentRow1 = null

      }
      else {
        this.$alert('请选择变量')
      }



    },
    leftshift2: function () {
      // console.log('左移2')
      var t = this.currentRow3;
      this.Varlist.push(t);
      this.Chosenlist2.splice(this.index3, 1);
      this.index3 = -1
      this.currentRow3 = null

    },
    save: function () {

    },
    edit: function () {

    },
    cancel: function () {

    },
    help: function () {

    },
  }


}
</script>
<style>
</style>
