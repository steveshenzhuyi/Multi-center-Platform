<template>
  <div>
    <el-form :model="ttest_3Form"
             ref="ttest_3Form"
             label-width="100px"
             class="demo-ttest_2Form">

      <el-row style="margin-top:10px;margin-bottom:10px">
        模型名称: &nbsp;<el-input v-model="ttest_3Form.methodname"
                  size="mini"
                  style="width:200px;"></el-input>
      </el-row>
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
                          :row-class-name="tableRowClassName"
                          @row-click="getRowdetail1"
                          @current-change="handleCurrentChange1">

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
                          @row-click="getRowdetail2"
                          @current-change="handleCurrentChange2">

                  <el-table-column prop="name"
                                   label="检验变量">
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
                          @row-click="getRowdetail3"
                          @current-change="handleCurrentChange3">

                  <el-table-column prop="name"
                                   label="分组变量">
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
          <el-row style="margin-top: 15%; ">
            <el-button type="primary"
                       @click="cancel">取消</el-button>
          </el-row>
          <el-row style="margin-top: 15%;">
            <el-button type="primary"
                       @click="help">帮助</el-button>
          </el-row>
        </el-col>
      </el-row>

      <el-row :gutter="20"
              style="margin-top:10px;margin-bottom:10px">

        <el-col :span="12">
          <el-row>置信区间百分比：
            <el-input-number v-model="ttest_3Form.percent"
                             controls-position="right"
                             :min="0"
                             :max="100"></el-input-number>%
          </el-row>
        </el-col>
        <el-col :span="12">

          <fieldset class="groupbox-boarder">
            <legend class="one-of-groupbox-boarder">预检验</legend>
            <el-checkbox-group v-model="ttest_3Form.tchoose">
              <el-row>
                <el-checkbox :label="1">方差齐性预检验</el-checkbox>
              </el-row>
              <el-row>
                <el-checkbox :label="2">组别相关性检验</el-checkbox>
              </el-row>
            </el-checkbox-group>
          </fieldset>

        </el-col>
      </el-row>
    </el-form>

  </div>
</template>
<script>
import axios from 'axios';
export default {
  props: ['mid'],
  data() {
    return {
      VarTable: [],
      isnew: true,
      MethodDetails: '',


      idshow1: false,
      idshow2: false,
      idshow3: false,
      currentRow2: [],
      currentRow1: [],
      currentRow3: [],
      ttest_3Form: {
        percent: 95,
        tchoose: [],
        methodname: '',


      },
      Varlist: [],
      Chosenlist1: [],
      Chosenlist2: [],
      //可选变量表的指针
      index1: -1,
      //feature表存入的数组
      List1: [],

    }



  },
  mounted() {
    this.getVariableTable();
    this.getModleID();
  },
  methods: {
    //获取变量列表 存在VarTable里
    getVariableTable() {

      axios.get('/feature/getList', {
        params: {
          "token": this.GLOBAL.token
        }
      })
        .then((response) => {
          var cashdata = [];
          cashdata = response.data.data;
          // this.Varlist=response.data.data;
          //变量列表存储
          for (var i = 0; i < cashdata.length; i++) {
            var a = cashdata[i].name
            var b = parseInt(cashdata[i].featureId)
            this.VarTable.push({ "name": a, "featureId": b })
          }

        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    //获取模型id与编辑相关  获得就编辑  没有就是新建
    getModleID() {
      if (this.mid != -1) {
        axios.get('/model/getDetail', {
          params: {
            "token": this.GLOBAL.token,
            "modelId": this.mid
          }
        })
          .then(response => {
            if (response.data.code == "0") {
              this.MethodDetails = response.data.data
              this.ttest_3Form.methodname = this.MethodDetails.name;
              this.ttest_3Form.percent = JSON.parse(this.MethodDetails.data.data1);
              this.ttest_3Form.tchoose = JSON.parse(this.MethodDetails.data.data2);

              this.isnew = false;
              var todolist = (this.MethodDetails.feature);
              //console.log(todolist);
              var datax = this.dataconverse(todolist);
              var c1 = datax[0];

              var c2 = datax[1];
              // console.log(c2);
              var dt1 = this.VarTable;
              var dt2 = this.VarTable;
              var dt3 = this.VarTable;
              this.Chosenlist1 = dt1.filter(function (item) {
                return item.featureId == c1;
                //this.Chosenlist.push(item)
              });
              //console.log(this.Chosenlist1)
              this.Chosenlist2 = dt2.filter(function (item) {
                return item.featureId == c2;
                //this.Chosenlist.push(item)
              })
              //console.log(this.Chosenlist2)
              this.Varlist = dt3.filter(function (item) {
                return item.featureId != c2 && item.featureId != c1;
                //this.Chosenlist.push(item)
              })



            }
          })
          .catch(function (error) {
            console.log("error", error);
          });

      }
      else {
        if (this.VarTable != null) {
          this.Varlist = this.VarTable;


        }

      }


    },
    dataconverse(t) {
      // console.log('现在开始数据转换')
      // console.log(t)
      var da = '';
      var db = '';
      //var dc = [];


      for (var i = 0; i < t.length; i++) {
        var a = parseInt(t[i].featureId);
        var b = parseInt(t[i].featureType);
        if (b == 1) {
          // da.push(a);
          // dc.push(a)
          da = a

        } else {
          //db.push(a);
          // dc.push(a)
          db = a


        }


      }
      // console.log(da)
      // console.log(db)
      // console.log(dc)
      return [da, db]
    },



    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;

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

          this.$alert('只能选择一个检验变量');

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
      // console.log('右移2')
      var t = this.currentRow1;
      if (this.index1 != -1) {
        if (this.Chosenlist2.length == 0) {
          this.Chosenlist2.push(t);
          this.Varlist.splice(this.index1, 1);
          this.index1 = -1
          this.currentRow1 = null
        }
        else {
          this.$alert('只能选择一个分组变量');
        }
      }
      else {
        this.$alert('请选择变量')
      }



    },
    leftshift2: function () {
      // console.log('左移2')
      var t = this.currentRow3;
      this.Varlist.push(t);
      this.Chosenlist2.splice(0, 1);

    },











    handleCurrentChange1(val) {

      //this.currentRow1 = val;
      //console.log(this.currentRow1.featureId);
    },
    handleCurrentChange2(val) {
      //this.currentRow2 = val;
    },
    handleCurrentChange3(val) {

      // this.currentRow3 = val;
      //console.log(this.currentRow1.featureId);
    },
    save: function () {
      for (var i = 0; i < this.Chosenlist1.length; i++) {
        var f = { 'sortNo': i + 1, 'featureId': this.Chosenlist1[i].featureId, 'featureType': 1 }
        this.List1.push(f);
      }

      for (var t = 0; t < this.Chosenlist2.length; t++) {

        var f = { 'sortNo': t + 1, 'featureId': this.Chosenlist2[t].featureId, 'featureType': 2 }
        this.List1.push(f);

      }



      axios.post('/model/create', {
        "token": this.GLOBAL.token,
        //"name": JSON.stringify(this.mstjForm.methodname),
        "name": this.ttest_3Form.methodname,
        "modelTypeLayer1Code": 2,
        "modelTypeLayer2Code": 3,
        "data": {

          "data1": JSON.stringify(this.ttest_3Form.percent),
          "data2": JSON.stringify(this.ttest_3Form.tchoose),

        },

        "feature": this.List1





      })
        .then(response => {
          if (response.data.code == "0") {
            this.$alert('创建成功');
            console.log(response.data.id)
            // this.getVariableTable()
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });



    },
    edit: function () {
      for (var i = 0; i < this.Chosenlist1.length; i++) {
        // console.log(this.Chosenlist[i].featureId)

        var f = { 'sortNo': i + 1, 'featureId': this.Chosenlist1[i].featureId, 'featureType': 1 }
        this.List1.push(f);


      }
      //console.log(this.Chosenlist2)
      for (var t = 0; t < this.Chosenlist2.length; t++) {
        // console.log(this.Chosenlist[i].featureId)

        var f = { 'sortNo': t + 1, 'featureId': this.Chosenlist2[t].featureId, 'featureType': 2 }
        this.List1.push(f);


      }
      //console.log(this.List1)


      axios.post('/model/edit', {
        "token": this.GLOBAL.token,
        //"name": JSON.stringify(this.mstjForm.methodname),
        "modelId": this.mid,
        "name": this.ttest_3Form.methodname,
        "modelTypeLayer1Code": 2,
        "modelTypeLayer2Code": 3,
        "data": {

          "data1": JSON.stringify(this.ttest_3Form.percent),
          "data2": JSON.stringify(this.ttest_3Form.tchoose),

        },
        "feature": this.List1
      })
        .then(response => {
          if (response.data.code == "0") {
            this.$alert('编辑成功');
            console.log(response.data.data.modelId)

          }
        })
        .catch(function (error) {
          console.log("error", error);
        });





    },
    cancel: function () {

    },
    help: function () {

    },

  }
}
</script>

<style>
.groupbox-boarder {
  border: 1px solid #ccc;
  box-shadow: 0px 0px 0px 0px #000;
}
.one-of-groupbox-boarder {
  padding: 0 10px;
  background-color: #428bca;
  color: #fffffb;
}
</style>