<template>
  <div>

    <el-form :model="ttest_1Form"
             ref="ttest_1Form"
             label-width="100px">
      <el-form-item prop="methodname"
                    label="模型名称"
                    :rules="[{required: true, message: '请输入模型名称', trigger: 'blur' }]">
        <el-input v-model="ttest_1Form.methodname"
                  size="mini"
                  style="width:200px;"></el-input>
      </el-form-item>
    </el-form>
    <!-- <el-row style="margin-top:10px;margin-bottom:10px">
      模型名称: &nbsp;<el-input v-model="ttest_1Form.methodname"
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
                        :row-class-name="tableRowClassName"
                        @row-click="getRowdetail1"
                        @current-change="handleCurrentChange1">
                <!-- <el-table-column type="selection"
                                 width="55">
                </el-table-column> -->

                <el-table-column prop="name">
                </el-table-column>
                <el-table-column prop="featureId"
                                 v-if="idshow">

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
          </el-col>
          <el-col :span="10">
            <fieldset style="  min-width: inherit; height:220px;border-width:0.5px;border-style: double">
              <el-table :data="Chosenlist"
                        max-height="200"
                        ref="singleTable"
                        tooltip-effect="dark"
                        @current-change="handleCurrentChange2">
                <!-- <el-table-column type="selection"
                                 width="55">
                </el-table-column> -->
                <el-table-column prop="name"
                                 label="目标变量">
                </el-table-column>
                <el-table-column prop="featureId"
                                 v-if="idshow2">

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

    <el-row style="margin-top:10px;margin-bottom:10px">置信区间百分比：
      <el-input-number v-model="ttest_1Form.percent"
                       controls-position="right"
                       :min="0"
                       :max="100"></el-input-number>%

    </el-row>
    <el-row style="margin-top:10px;margin-bottom:10px">零假设的期望值：
      <el-input style="width:180px;"
                v-model="ttest_1Form.expect"></el-input>

    </el-row>
    \
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
      idshow: false,
      idshow2: false,
      Varlist: [],
      Chosenlist: [],

      currentRow2: [],
      currentRow1: [],

      ttest_1Form: {
        percent: 95,
        expect: '',
        methodname: '',


      },
      List1: [],
      index1: -1,


    }
  },

  mounted() {
    this.getVariableTable();
    this.getModleID();
  },
  methods: {
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
          // console.log('打印变量表')
          // console.log(this.VarTable)

        })
        .catch(function (error) {
          console.log("error", error);
        });
    },

    //获取修改的模型ID
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
              this.ttest_1Form.methodname = this.MethodDetails.name;


              this.ttest_1Form.percent = JSON.parse(this.MethodDetails.data.data1);

              this.ttest_1Form.expect = JSON.parse(this.MethodDetails.data.data2);

              this.isnew = false
              var todolist = this.MethodDetails.feature;
              console.log(todolist);
              this.checklist(todolist);
              //这边解析数组


            }
          })
          .catch(function (error) {
            console.log("error", error);
          });

      }
      else {
        if (this.VarTable != null) {
          this.Varlist = this.VarTable;
          // console.log('打印页面变量表')
          // console.log(this.Varlist)

        }

      }


    },
    checklist(t) {
      if (t.length != 0) {
        var choosenId = parseInt(t[0].featureId);//获得选中的变量id

        // console.log(choosenId);
        // console.log(this.VarTable.length)
        var data1 = this.VarTable;
        this.Chosenlist = data1.filter(function (item) {
          return item.featureId == choosenId;
          //this.Chosenlist.push(item)
        })
        var data2 = this.VarTable;
        var t = this.remove(this.VarTable, choosenId);
        data2.splice(t, 1)
        this.Varlist = data2



      }
    },
    //返回索引
    remove(arr, cd) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].featureId == cd) return i;
      }
      return -1;


    },
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex



    },
    getRowdetail1(row, event, column) {

      this.index1 = row.index;
      this.currentRow1 = row;


    },
    rightshift: function () {
      // var t = this.Chosenlist.length;
      if (this.index1 != -1) {
        if (this.Chosenlist.length < 1) {
          this.Chosenlist.push(this.currentRow1);
          this.Varlist.splice(this.index1, 1);
          this.index1 = -1;
        }
        else {

          this.$message('只能选择一个目标变量');

        }
      } else {
        this.$alert("请选择变量")
      }

    },
    leftshift: function () {
      this.Varlist.push(this.currentRow2);
      this.Chosenlist.splice(this.currentRow2, 1);


    },


    // rightshift: function () {
    //   // var t = this.Chosenlist.length;
    //   if (this.Chosenlist.length < 1) {
    //     this.Chosenlist.push(this.currentRow1);
    //     this.Varlist.splice(this.currentRow1, 1);
    //   }
    //   else {

    //     this.$message('只能选择一个目标变量');

    //   }

    // },
    // leftshift: function () {
    //   this.Varlist.push(this.currentRow2);
    //   this.Chosenlist.splice(this.currentRow2, 1);


    // },
    handleCurrentChange1(val) {

      //this.currentRow1 = val;
      //console.log(this.currentRow1.featureId);
    },
    handleCurrentChange2(val) {
      this.currentRow2 = val;
    },
    save: function () {

      for (var i = 0; i < this.Chosenlist.length; i++) {
        // console.log(this.Chosenlist[i].featureId)

        var f = { 'sortNo': i + 1, 'featureId': this.Chosenlist[i].featureId, 'featureType': 1 }
        this.List1.push(f);


      }
      // console.log(this.List1)


      axios.post('/model/create', {
        "token": this.GLOBAL.token,
        //"name": JSON.stringify(this.mstjForm.methodname),
        "name": this.ttest_1Form.methodname,
        "modelTypeLayer1Code": 2,
        "modelTypeLayer2Code": 1,
        "data": {
          "data1": JSON.stringify(this.ttest_1Form.percent),
          "data2": JSON.stringify(this.ttest_1Form.expect),

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
    cancel: function () {

    },
    help: function () {

    },
    edit: function () {
      for (var i = 0; i < this.Chosenlist.length; i++) {
        // console.log(this.Chosenlist[i].featureId)

        var f = { 'sortNo': i + 1, 'featureId': this.Chosenlist[i].featureId, 'featureType': 1 }
        this.List1.push(f);


      }
      console.log(this.List1)


      axios.post('/model/edit', {
        "token": this.GLOBAL.token,

        "modelId": this.mid,
        "name": this.ttest_1Form.methodname,
        "modelTypeLayer1Code": 2,
        "modelTypeLayer2Code": 1,
        "data": {
          "data1": JSON.stringify(this.ttest_1Form.percent),
          "data2": JSON.stringify(this.ttest_1Form.expect),

        },

        "feature": this.List1





      })
        .then(response => {
          if (response.data.code == "0") {
            this.$alert('修改成功');
            console.log(response.data.data.modelId)
            // this.getVariableTable()
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });


    }



    // handleChange2_1(value) {
    //   console.log(value);
    // },



    // rightshift: function () {

    //   this.Chosenlist.push.apply(this.Chosenlist, this.multipleSelection1);
    //   this.Varlist = this.Varlist.filter(v => !this.multipleSelection1.includes(v))



    // },
    // leftshift: function () {
    //   this.Varlist.push.apply(this.Varlist, this.multipleSelection2);
    //   this.Chosenlist = this.Chosenlist.filter(v => !this.multipleSelection2.includes(v))

    // },
    // handleSelectionChange1(val) {
    //   this.multipleSelection1 = val;
    //   //console.log(this.$refs.multipleTable.store.states.selection);

    // },
    // handleSelectionChange2(val) {
    //   this.multipleSelection2 = val;
    //   //console.log(this.$refs.multipleTable.store.states.selection);

    // },
  }
}
</script>

<style>
</style>