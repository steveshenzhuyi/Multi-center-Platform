<template>
  <div>
    <el-tabs v-model="NewVarTabs">
      <!-- 新增变量 -->
      <el-tab-pane :label="Tab1Label"
                   name="NewVariable">
        </br>
        <el-row>
          <el-col :span=19
                  :offset=1>
            <el-form ref="VarForm"
                     :model="VarForm"
                     :rules="VarFormRules"
                     label-width="80px">
              <el-form-item label="变量名称"
                            prop="name"
                            style="width:50%">
                <el-input v-model="VarForm.name"></el-input>
              </el-form-item>
              <el-form-item label="变量类别"
                            prop="layer1Code">
                <el-select v-model="VarForm.layer1Code"
                           placeholder="请选择变量类别"
                           @change="VarCheckLayer2(1)">
                  <el-option v-for="val in VariableLayer1"
                             :key="val.criteriaLayer1Code"
                             :label="val.name"
                             :value="val.criteriaLayer1Code"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="变量类型"
                            prop="typeCode">
                <el-select v-model="VarForm.typeCode"
                           placeholder="请选择变量类型"
                           @change="VarCheckLayer2(1)">
                  <el-option label="定性"
                             value="1"></el-option>
                  <el-option label="定量"
                             value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="出现阶段"
                            prop="sampleCode">
                <el-select v-model="VarForm.sampleCode"
                           placeholder="请选择出现阶段">
                  <el-option v-for="val in VariableSample"
                             :key="val.criteriaSampleCode"
                             :label="val.name"
                             :value="val.criteriaSampleCode"></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="概念集"
                            prop="data1"
                            style="width:50%">
                <el-input v-model="VarForm.data1"
                          v-on:click.native="ConceptSetsVisible = true">
                </el-input>
              </el-form-item> -->
              <el-form-item label="概念集"
                            prop="data1">
                <el-cascader expand-trigger="hover"
                             :options="ConceptSets"
                             v-model="VarForm.data1">
                </el-cascader>
                </el-input>
              </el-form-item>
              <el-form-item label="变量描述"
                            prop="description">
                <el-input type="textarea"
                          v-model="VarForm.description"></el-input>
              </el-form-item>
              <el-form-item label="属性"
                            v-if="VariableLayer2Visible==true"
                            prop="layer2Code">
                <el-select v-model="VarForm.layer2Code"
                           placeholder="请选择属性"
                           @change="VarCheckData23456(1)">
                  <el-option v-for="val in VariableLayer2"
                             :key="val.criteriaLayer2Code"
                             :label="val.name"
                             :value="val.criteriaLayer2Code"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="VariableData5Visible"
                            prop="data5">
                <input type="number"
                       v-model="VarForm.data5"
                       min="0"
                       max="100">
              </el-form-item>
              <el-form-item v-if="VariableData6Visible"
                            prop="data6">
                <input type="number"
                       v-model="VarForm.data6"
                       min="0"
                       max="100">
              </el-form-item>
              <el-form-item v-if="VariableData234Visible"
                            prop="data3">
                <span style="font-size: 8px">（&nbsp;&nbsp;出现时间&nbsp;</span>
                <input type="number"
                       v-model="VarForm.data2"
                       min="0"
                       max="36500">&nbsp;-
                <input type="number"
                       v-model="VarForm.data3"
                       min="0"
                       max="36500"></el-input-number><span style="font-size: 8px">
                  &nbsp;&nbsp;天&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input type="checkbox"
                       v-model="VarForm.data4"> <span style="font-size: 8px">不在其之间</span></el-checkbox>&nbsp;&nbsp;）
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        </br>
        <el-row v-if='EditVarId == ""'>
          <el-col :span=10
                  :offset=2>
            <el-button type="primary"
                       @click="SubmitNewVariable()">提交</el-button>
            <el-button @click="CancelDialog()">取消</el-button>
          </el-col>
        </el-row>
        <el-row v-else>
          <el-col :span=10
                  :offset=2>
            <el-button type="primary"
                       @click="SubmitEditVariable()">编辑</el-button>
            <el-button @click="CancelEditVariable()">取消</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
      <!-- 变量列表 -->
      <el-tab-pane label="变量列表"
                   name="VarList">
        <el-row>
          <el-col :span=24
                  :offset=1>
            <el-table :data="VariableTable"
                      style="width:90%"
                      stripe
                      border
                      @selection-change="HandleSelectionChange"
                      max-height="500">
              <el-table-column type="selection"
                               width="35">
              </el-table-column>
              <el-table-column prop="featureId"
                               v-if="false"></el-table-column>
              <el-table-column prop="name"
                               label="变量名称"
                               min-width="60%"></el-table-column>
              <el-table-column prop="type"
                               label="变量类型"
                               min-width="60%"></el-table-column>
              <el-table-column prop="description"
                               label="变量描述"
                               min-width="150%"
                               show-overflow-tooltip></el-table-column>
              <el-table-column label="编辑"
                               min-width="120%">
                <template slot-scope="scope">
                  <el-button size="mini"
                             type="primary"
                             @click="EditVar(scope.$index)">编辑</el-button>
                  <el-button size="mini"
                             @click="CancelVar(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        </br>
        <el-row>
          <el-col :span=10
                  :offset=1>
            <el-button type="primary"
                       @click="ConfirmVarSelect()">确定</el-button>
            <el-button @click="CancelDialog()">取消</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <!-- 选择概念集的弹窗 -->
    <!-- <el-dialog title="选择概念集"
               :visible.sync="ConceptSetsVisible"
               width="30%"
               append-to-body>
      <el-button type="primary"
                 @click="VarConceptSets = '概念集A'">概念集A</el-button>
      <el-button type="primary"
                 @click="VarConceptSets = '概念集B'">概念集B</el-button>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="ComfirmVarConceptSets()">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    var VarValidateData3 = (rule, value, callback) => {
      if ((value < this.VarForm.data2) || ((value == "") !== (this.VarForm.data2 == "")) || (this.VarForm.data4 && (value == ""))) {
        callback(new Error('请确认时间正确'))
      }
      else {
        callback()
      }
    };
    var VarValidateData5 = (rule, value, callback) => {
      if (this.VariableData5Visible && value === "") {
        callback(new Error('请输入数字'))
      }
      else {
        callback()
      }
    };
    var VarValidateData6 = (rule, value, callback) => {
      if (this.VariableData6Visible && value === "") {
        callback(new Error('请输入数字'))
      }
      else {
        callback()
      }
    };
    return {
      NewVarTabs: "NewVariable",
      Tab1Label: "新增变量",
      // 变量列表
      VariableTable: [],
      EditVarId: "",
      MultiSelection: [],
      // 新增变量
      VarForm: {
        name: "",
        typeCode: "",
        layer1Code: "",
        layer2Code: "",
        sampleCode: "",
        description: "",
        data1: [],  // 诊断 概念集
        data2: "",  // 出现时间 前一个数字
        data3: "",  // 出现时间 后一个数字
        data4: "",  // 是否“不在其之间”，是为1
        data5: "",  // 检测结果 数字
        data6: "",  // 检测值 数字
      },
      VarFormRules: {
        name: [
          { required: true, message: '请输入变量名称', trigger: 'change' }
        ],
        typeCode: [
          { required: true, message: '请选择变量类型', trigger: 'change' }
        ],
        layer1Code: [
          { required: true, message: '请选择变量类别', trigger: 'change' }
        ],
        layer2Code: [
          { required: true, message: '请选择属性', trigger: 'change' }
        ],
        sampleCode: [
          { required: true, message: '请选择变量的出现阶段', trigger: 'change' }
        ],
        description: [

        ],
        data1: [
          { required: true, message: '请选择概念集', trigger: 'change' }
        ],
        data3: [
          { validator: VarValidateData3, trigger: 'change' }
        ],
        data5: [
          { validator: VarValidateData5, trigger: 'change' }
        ],
        data6: [
          { validator: VarValidateData6, trigger: 'change' }
        ]
      },
      VariableLayer1: [],
      VariableSample: [],
      VariableLayer2Visible: false,
      VariableLayer2: [],
      ConceptSets: [],
      VarConceptSets: "",
      VariableData5Visible: false,
      VariableData6Visible: false,
      VariableData234Visible: false
    }
  },
  methods: {
    Initialize() {
      // console.log('ini')
      if (this.$refs['VarForm']) {
        this.VarResetFields()
      }
      this.GetVariableLayer1()
      this.GetVariableSample()
      this.GetConceptSets()
      this.GetVariableTable()
    },
    // 变量列表
    GetVariableTable() {
      axios.get('/feature/getList', {
        params: {
          "token": this.GLOBAL.token
        }
      })
        .then((response) => {
          this.VariableTable = response.data.data
          this.VariableTable.forEach(item => {
            item.description = item.description || ""
            item.type = item.type == 1 ? '定性' : '定量'
          })
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    CancelVar(index) {
      axios.post('/feature/deleteFeature', {
        "token": this.GLOBAL.token,
        "featureId": this.VariableTable[index].featureId
      })
        .then(response => {
          if (response.data.code == "0") {
            this.$alert('删除成功！', '提示', { confirmButtonText: '确定' });
            this.GetVariableTable()
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    EditVar(index) {
      this.VarResetFields()
      this.EditVarId = this.VariableTable[index].featureId
      this.Tab1Label = "编辑变量"
      this.NewVarTabs = "NewVariable"
      axios.get('/feature/getDetail', {
        params: {
          "featureId": this.EditVarId,
          "token": this.GLOBAL.token,
        }
      })
        .then((response) => {
          this.VarForm.name = response.data.data.name
          this.VarForm.typeCode = String(parseInt(response.data.data.type))
          this.VarForm.layer1Code = response.data.data.layer1Name
          this.VarForm.layer2Code = response.data.data.layer2Name
          this.VarForm.sampleCode = response.data.data.sampleCode
          this.VarForm.description = response.data.data.description
          this.VarForm.data1 = response.data.data.data1
          this.VarForm.data2 = response.data.data.data2 || ""
          this.VarForm.data3 = response.data.data.data3 || ""
          this.VarForm.data4 = response.data.data.data4 || ""
          this.VarForm.data5 = response.data.data.data5 || ""
          this.VarForm.data6 = response.data.data.data6 || ""
          this.VarCheckLayer2(0)
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    HandleSelectionChange(val) {
      this.MultiSelection = val
    },
    ConfirmVarSelect() {
      var res = this.MultiSelection.map(item => {
        return {
          'id': item.featureId,
          'name': item.name
        }
      })
      this.$emit('GetVarSelection', res)
      this.CancelDialog()
    },
    // 新增变量
    GetVariableLayer1() {
      axios.get('/feature/criteriaDict', {
        params: {
          "token": this.GLOBAL.token,
        }
      })
        .then((response) => {
          this.VariableLayer1 = response.data.data
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    GetVariableSample() {
      axios.get('/feature/sampleDict', {
        params: {
          "token": this.GLOBAL.token,
        }
      })
        .then((response) => {
          this.VariableSample = response.data.data
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    GetConceptSets() {
      console.log("get")
      axios.get('/structure/getStructure', {
        params: {
          "token": this.GLOBAL.token
        }
      })
        .then((response) => {
          this.ConceptSets = JSON.parse(response.data.data.conceptSetStructure)
          this.ConceptSets = this.myreplace(this.ConceptSets)
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    myreplace(arr) {
      arr.forEach(item => {
        item.value = item.id
        delete item.id
        if (item.children) {
          item.children = this.myreplace(item.children)
        }
      });
      return arr
    },
    // ComfirmVarConceptSets() {
    //   this.VarForm.data1 = this.VarConceptSets
    //   this.ConceptSetsVisible = false
    // },
    VarCheckLayer2(flag) {
      if (this.VarForm.layer1Code != "" && this.VarForm.typeCode != "") {
        if (flag) {
          this.VarForm.layer2Code = ""
        }
        axios.get('/feature/criteriaDict', {
          params: {
            "token": this.GLOBAL.token,
            "criteriaLayer1Code": this.VarForm.layer1Code,
            "criteriaTypeCode": this.VarForm.typeCode
          }
        })
          .then((response) => {
            this.VariableLayer2 = response.data.data
            this.VarCheckData23456(flag)
          })
          .catch(function (error) {
            console.log("error", error);
          });
        this.VariableLayer2Visible = true
      }
    },
    VarCheckData23456(flag) {
      if (flag) {
        this.VarForm.data2 = ""
        this.VarForm.data3 = ""
        this.VarForm.data4 = ""
        this.VarForm.data5 = ""
        this.VarForm.data6 = ""
      }
      // data56
      if (this.VarForm.layer1Code == 4 && this.VarForm.typeCode == 2 && (this.VarForm.layer2Code == 2 || this.VarForm.layer2Code == 3)) {
        switch (parseInt(this.VarForm.layer2Code)) {
          case 2:
            this.VariableData5Visible = true
            this.VariableData6Visible = false
            break
          case 3:
            this.VariableData6Visible = true
            this.VariableData5Visible = false
            break
        }
      }
      else {
        this.VariableData5Visible = false
        this.VariableData6Visible = false
      }
      // data234
      if (parseInt(this.VarForm.layer2Code) > this.VariableLayer2.length - 4 && this.VarForm.typeCode == 2) {
        this.VariableData234Visible = true
      }
      else {
        this.VariableData234Visible = false
      }
    },
    SubmitNewVariable() {
      this.$refs['VarForm'].validate((valid) => {
        if (valid) {
          axios.post('/feature/createFeature', {
            "token": this.GLOBAL.token,
            "name": this.VarForm.name,
            "type": this.VarForm.typeCode,
            "layer1Name": this.VarForm.layer1Code,
            "layer2Name": this.VarForm.layer2Code,
            "description": this.VarForm.description,
            "sampleCode": this.VarForm.sampleCode,
            "data1": this.VarForm.data1,
            "data2": this.VarForm.data2,
            "data3": this.VarForm.data3,
            "data4": this.VarForm.data4,
            "data5": this.VarForm.data5,
            "data6": this.VarForm.data6,
          })
            .then(response => {
              if (response.data.code == "0") {
                this.$alert('新建变量成功！', '提示', { confirmButtonText: '确定' });
                this.VarResetFields()
                this.GetVariableTable()
                this.NewVarTabs = 'VarList'
              }
            })
            .catch(function (error) {
              console.log("error", error);
            });
        }
        else {
          console.log('error submit!!')
        }
      })
    },
    SubmitEditVariable() {
      this.$refs['VarForm'].validate((valid) => {
        if (valid) {
          axios.post('/feature/updateFeature', {
            "token": this.GLOBAL.token,
            "featureId": this.EditVarId,
            "name": this.VarForm.name,
            "type": this.VarForm.typeCode,
            "layer1Name": this.VarForm.layer1Code,
            "layer2Name": this.VarForm.layer2Code,
            "description": this.VarForm.description,
            "sampleCode": this.VarForm.sampleCode,
            "data1": this.VarForm.data1,
            "data2": this.VarForm.data2,
            "data3": this.VarForm.data3,
            "data4": this.VarForm.data4,
            "data5": this.VarForm.data5,
            "data6": this.VarForm.data6
          })
            .then(response => {
              if (response.data.code == "0") {
                this.VarResetFields()
                this.$alert('编辑变量成功！', '提示', { confirmButtonText: '确定' });
                this.GetVariableTable()
                this.Tab1Label = "新增变量"
                this.NewVarTabs = 'VarList'
              }
            })
            .catch(function (error) {
              console.log("error", error);
            });
        }
        else {
          console.log('error submit!!')
        }
      })
    },
    CancelDialog() {
      this.VarResetFields()
      this.PassNewVarVisible()
    },
    CancelEditVariable() {
      this.VarResetFields()
      this.Tab1Label = "新增变量"
      this.NewVarTabs = "VarList"
    },
    VarResetFields() {
      this.$refs['VarForm'].resetFields()
      this.VarForm.data1 = []
      this.VarForm.data2 = ""
      this.VarForm.data3 = ""
      this.VarForm.data4 = ""
      this.VariableLayer2Visible = false
      this.VariableData234Visible = false
      this.VariableData5Visible = false
      this.VariableData6Visible = false
      this.EditVarId = ""
    },
    PassNewVarVisible() {
      this.$emit('GetNewVarVisiable', false)
    },
  }
}
</script>

<style>
</style>