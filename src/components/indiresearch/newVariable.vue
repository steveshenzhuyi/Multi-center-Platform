<template>
  <div>
    <el-steps :active="2"
              style="padding-top:10px;padding-left:10px;padding-right:10px">
      <el-step title="1 研究开始"
               style="cursor:pointer"
               @click.native="gonewResearch()"></el-step>
      <el-step title="2 队列生成"
               style="cursor:pointer"
               @click.native="gocreateCohort()"></el-step>
      <el-step title="3 变量生成"
               style="cursor:pointer"
               @click.native="gonewVariable()"></el-step>
      <el-step title="4 模型选择"
               style="cursor:pointer"
               @click.native="goselectModel()"></el-step>
      <el-step title="5 结果分析"
               style="cursor:pointer"
               @click.native="goanalysisResult()"></el-step>
    </el-steps>
    </br>

    <!-- 主页面 -->
    <el-row>
      <el-col :offset=4>
        <div class="SubTitle2"><i class="myIcon-jilu"></i> 变量列表</div>
        </br>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span=10
              :offset=4>
        <el-table :data="VariableTable"
                  stripe
                  border
                  max-height="500">
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
                           min-width="100%">
            <template slot-scope="scope">
              <!-- <el-button size="mini"
                             type="primary"
                             @click="EditVar(scope.$index)">编辑</el-button> -->
              <el-button size="mini"
                         type="info"
                         icon="el-icon-delete"
                         @click="CancelVar(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span=3
              :offset=1>
        <el-button type="primary"
                   plain
                   @click="NewVarVisible=true"
                   style="width:120px">新增变量</el-button>
        </br></br>
        <el-button type="primary"
                   plain
                   @click="VarLibVisible=true"
                   style="width:120px">从变量库导入</el-button>
        </br></br>
        <el-button type="primary"
                   @click=""
                   round
                   @click="goselectModel()"
                   style="width:120px">下一步<i class="el-icon-d-arrow-right el-icon--right"></i></el-button>
      </el-col>
    </el-row>
    </br>
    <el-row>
      <el-col :offset=4>
        <el-button type="primary"
                   @click=""
                   icon="el-icon-edit-outline">统计</el-button>
      </el-col>
    </el-row>

    <!-- 新增变量弹框 -->
    <el-dialog title="新增变量"
               :visible.sync="NewVarVisible"
               @open="OpenNewVarDialog()"
               @close="CloseNewVarDialog()"
               width="40%"
               append-to-body>
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
            <el-form-item label="概念集"
                          prop="data1"
                          style="width:50%">
              <el-input v-model="VarForm.data1"
                        v-on:click.native="conceptSetListVisible = true">
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
      <el-row>
        <el-col :offset=2>
          <el-checkbox v-model="VarForm.flag">同时新增到变量库</el-checkbox>
        </el-col>
      </el-row>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="CloseNewVarDialog()">取 消</el-button>
        <el-button type="primary"
                   @click="SubmitNewVariable()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 选择概念集的弹窗 -->
    <el-dialog title="概念集列表"
               :visible.sync="conceptSetListVisible"
               width="60%"
               :before-close="handleClose"
               append-to-body>
      <span slot="footer"
            class="dialog-footer">
        <component :is="myconceptsetList"
                   @getConceptSetId="selectConceptSetId"
                   @getVisible="selectVisible"></component>
        <el-button @click="conceptSetListVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="conceptSetListVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 变量库弹窗 -->
    <el-dialog title="变量库"
               :visible.sync="VarLibVisible"
               @open="OpenVarLibDialog()"
               @close="CloseVarLibDialog()"
               width="50%"
               append-to-body>
      <el-row>
        <el-col :span=24
                :offset=1>
          <el-table :data="VarLibTable"
                    style="width:90%"
                    ref="VarLibTable"
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
            <!-- <el-table-column label="编辑"
                               min-width="120%">
                <template slot-scope="scope">
                  <el-button size="mini"
                             type="primary"
                             @click="EditVar(scope.$index)">编辑</el-button>
                  <el-button size="mini"
                             @click="CancelVar(scope.$index)">删除</el-button>
                </template>
              </el-table-column> -->
          </el-table>
        </el-col>
      </el-row>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="CloseVarLibDialog()">取 消</el-button>
        <el-button type="primary"
                   @click="ConfirmVarSelect()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import axios from 'axios'
import conceptsetList from './conceptsetList.vue'
export default {
  components: {
    'conceptsetList': conceptsetList
  },
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
      // ------主页面------
      VariableTable: [{ 'id': '1', 'name': '性别', 'type': '定性', 'description': '样本的性别' },
      { 'id': '2', 'name': '年龄', 'type': '定量', 'description': '样本的年龄' }],
      NewVarVisible: false,
      VarLibVisible: false,

      // ------新增变量弹窗------
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
        flag: 0,  // 是否加入变量库
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
      myconceptsetList: conceptsetList,
      conceptSetListVisible: false,
      VarConceptSets: "",
      VariableData5Visible: false,
      VariableData6Visible: false,
      VariableData234Visible: false,

      // ------变量库弹窗------
      VarLibTable: [],
      MultiSelection: []
    }
  },
  created() {

  },
  methods: {
    // ------主页面------
    CancelVar(index) {
      // 删除 VariableTable[index].id
    },

    // ------新增变量弹窗------
    OpenNewVarDialog() {
      this.GetVariableLayer1()
      this.GetVariableSample()
    },
    CloseNewVarDialog() {
      this.VarResetFields()
      this.NewVarVisible = false
    },
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
    ComfirmVarConceptSets() {
      this.VarForm.data1 = this.VarConceptSets
      this.conceptSetListVisible = false
    },
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
                this.CloseNewVarDialog()
                this.GetVarLibTable()
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
    VarResetFields() {
      this.$refs['VarForm'].resetFields()
      this.VarForm.data1 = []
      this.VarForm.data2 = ""
      this.VarForm.data3 = ""
      this.VarForm.data4 = ""
      this.VarForm.flag = 0
      this.VariableLayer2Visible = false
      this.VariableData234Visible = false
      this.VariableData5Visible = false
      this.VariableData6Visible = false
    },

    // ------变量库弹窗------
    OpenVarLibDialog() {
      this.GetVarLibTable()
    },
    CloseVarLibDialog() {
      this.VarLibTable.forEach(row => {
        this.$refs['VarLibTable'].toggleRowSelection(row, false)
      })
      this.VarLibVisible = false
    },
    GetVarLibTable() {
      axios.get('/feature/getList', {
        params: {
          "token": this.GLOBAL.token
        }
      })
        .then((response) => {
          this.VarLibTable = response.data.data
          this.VarLibTable.forEach(item => {
            item.description = item.description || ""
            item.type = item.type == 1 ? '定性' : '定量'
          })
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
        }
      })
      // 向后端发送res，更新变量列表
      this.VarLibVisible = false
      this.CloseVarLibDialog()
    },

    // 进度条跳转 RH
    gonewResearch() {
      this.$router.push({
        path: 'newResearch',
      });
    },
    gocreateCohort() {
      this.$router.push({
        path: 'createcohort',
      });
    },
    gonewVariable() {
      this.$router.push({
        path: 'newVariable',
      });
    },
    goselectModel() {
      this.$router.push({
        path: 'selectModel',
      });
    },
    goanalysisResult() {
      this.$router.push({
        path: 'analysisResult',
      });
    },
    //-----概念集弹窗-----
    selectConceptSetId(val) {
      this.VarForm.data1 = val
    },
    selectVisible(val) {
      this.conceptSetListVisible = val
      console.log(this.conceptSetListVisible)
    }
  }
}
</script>

<style>
@import "../../assets/AdminInfo/css_admin/css_admin.css";
@import "../../assets/AdminInfo/css_admin/myIcon/iconfont.css";
</style>