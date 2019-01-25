<template>
  <div>
    <el-form ref="VarForm"
             :model="VarForm"
             :rules="VarFormRules"
             label-width="80px">
      <el-row>
        <el-col :offset="1"
                :span="10">
          <el-form-item label="变量名称"
                        prop="name">
            <el-input v-model="VarForm.name"
                      style="max-width:217px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="1"
                :span="10">
          <el-form-item label="变量类别"
                        prop="layer1Code">
            <el-select v-model="VarForm.layer1Code"
                       placeholder="请选择变量类别"
                       @change="">
              <el-option v-for="val in VariableLayer1"
                         :key="val.criteriaLayer1Code"
                         :label="val.name"
                         :value="val.criteriaLayer1Code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :offset="1"
                :span="10">
          <el-form-item label="变量类型"
                        prop="typeCode">
            <el-select v-model="VarForm.typeCode"
                       placeholder="请选择变量类型"
                       @change="">
              <el-option label="定性"
                         value="1"></el-option>
              <el-option label="定量"
                         value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="1"
                :span="10">
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
        </el-col>
        <el-col :offset="1"
                :span="10">
          <el-form-item label="概念集"
                        prop="data1">
            <el-input v-model="VarForm.data1"
                      v-on:click.native="conceptSetListVisible = true"
                      style="max-width:217px">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="1"
                :span="21">
          <el-form-item label="变量描述"
                        prop="description">
            <el-input type="textarea"
                      v-model="VarForm.description"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="1"
                :span="10">
          <el-form-item label="属性"
                        v-if="VariableLayer2Visible==true"
                        prop="layer2Code">
            <el-select v-model="VarForm.layer2Code"
                       placeholder="请选择属性"
                       @change="">
              <el-option v-for="val in VariableLayer2"
                         :key="val.criteriaLayer2Code"
                         :label="val.name"
                         :value="val.criteriaLayer2Code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item v-if="VariableData5Visible"
                        label-width="20px"
                        prop="data5">
            <input type="number"
                   v-model="VarForm.data5"
                   min="0"
                   max="100">
          </el-form-item>
          <el-form-item v-if="VariableData6Visible"
                        label-width="20px"
                        prop="data6">
            <input type="number"
                   v-model="VarForm.data6"
                   min="0"
                   max="100">
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="1"
                :span="20">
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
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col :offset="2">
        <el-checkbox v-model="VarForm.flag">同时新增到变量库</el-checkbox>
      </el-col>
    </el-row>
    <!-- 选择概念集的弹窗 -->
    <el-dialog :visible.sync="conceptSetListVisible"
               width="60%"
               :before-close="handleClose"
               append-to-body>
      <span slot="title"
            class="dialog-title"><i class="el-icon-tickets"></i> 概念集列表</span>
      <component :is="myconceptsetList"
                 @getConceptSetId="selectConceptSetId"
                 @getVisible="selectVisible"></component>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="conceptSetListVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="conceptSetListVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import conceptsetList from '../conceptsetList.vue'
export default {
  components: {
    'conceptsetList': conceptsetList
  },
  data() {
    var VarValidateData3 = (rule, value, callback) => {
      if ((value < this.VarForm.data2) || ((value == "") !== (this.VarForm.data2 == "")) || (this.VarForm.data4 && (value == ""))) {
        callback(new Error('请确认时间正确'))
      } else {
        callback()
      }
    };
    var VarValidateData5 = (rule, value, callback) => {
      if (this.VariableData5Visible && value === "") {
        callback(new Error('请输入数字'))
      } else {
        callback()
      }
    };
    var VarValidateData6 = (rule, value, callback) => {
      if (this.VariableData6Visible && value === "") {
        callback(new Error('请输入数字'))
      } else {
        callback()
      }
    };
    return {
      VarForm: {
        name: "",
        typeCode: "",
        layer1Code: "",
        layer2Code: "",
        sampleCode: "",
        description: "",
        data1: "",  // 诊断 概念集
        data2: "",  // 出现时间 前一个数字
        data3: "",  // 出现时间 后一个数字
        data4: "",  // 是否“不在其之间”，是为1
        data5: "",  // 检测结果 数字
        data6: "",  // 检测值 数字
        flag: 0,  // 是否加入变量库
      },
      VarFormRules: {
        name: [{ required: true, message: '请输入变量名称', trigger: 'change' }],
        typeCode: [{ required: true, message: '请选择变量类型', trigger: 'change' }],
        layer1Code: [{ required: true, message: '请选择变量类别', trigger: 'change' }],
        layer2Code: [{ required: true, message: '请选择属性', trigger: 'change' }],
        sampleCode: [{ required: true, message: '请选择变量的出现阶段', trigger: 'change' }],
        description: [],
        data1: [{ required: true, message: '请选择概念集', trigger: 'change' }],
        data3: [{ validator: VarValidateData3, trigger: 'change' }],
        data5: [{ validator: VarValidateData5, trigger: 'change' }],
        data6: [{ validator: VarValidateData6, trigger: 'change' }]
      },
      VariableLayer1: [],
      VariableSample: [],
      VariableLayer2Visible: false,
      VariableLayer2: [],
      myconceptsetList: conceptsetList,
      conceptSetListVisible: false,
      VariableData5Visible: false,
      VariableData6Visible: false,
      VariableData234Visible: false
    }
  },
  watch: {
    'VarForm.typeCode'() {
      this.VarCheckLayer2()
      this.VarCheckData23456()
    },
    'VarForm.layer1Code'() {
      this.VarCheckLayer2()
      this.VarCheckData23456()
    },
    'VarForm.layer2Code'() {
      this.VarCheckData23456()
    },
  },
  computed: {
    mywidth() {
      if (this.$refs['myselect']) {
        return this.$refs['myselect'].$el.clientWidth
      } else {
        return null
      }
    }
  },
  methods: {
    OpenNewVarDialog() {
      this.GetVariableLayer1()
      this.GetVariableSample()
    },
    CloseNewVarDialog() {
      this.VarResetFields()
      this.$emit('PostNewVarVisiable', false)
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
    VarCheckLayer2() {
      if (this.VarForm.layer1Code != "" && this.VarForm.typeCode != "") {
        this.VarForm.layer2Code = ""
        axios.get('/feature/criteriaDict', {
          params: {
            "token": this.GLOBAL.token,
            "criteriaLayer1Code": this.VarForm.layer1Code,
            "criteriaTypeCode": this.VarForm.typeCode
          }
        })
          .then((response) => {
            this.VariableLayer2 = response.data.data
          })
          .catch(function (error) {
            console.log("error", error);
          });
        this.VariableLayer2Visible = true
      }
    },
    VarCheckData23456() {
      // data56
      if (this.VarForm.layer1Code == 4 && this.VarForm.typeCode == 2 && (this.VarForm.layer2Code == 2 || this.VarForm.layer2Code == 3)) {
        this.VariableData5Visible = (parseInt(this.VarForm.layer2Code) == 2)
        this.VariableData6Visible = (parseInt(this.VarForm.layer2Code) == 3)
      } else {
        this.VariableData5Visible = false
        this.VariableData6Visible = false
      }
      // data234
      if (parseInt(this.VarForm.layer2Code) > this.VariableLayer2.length - 4 && this.VarForm.typeCode == 2) {
        this.VariableData234Visible = true
      } else {
        this.VariableData234Visible = false
      }
    },
    SubmitNewVariable() {
      this.$refs['VarForm'].validate((valid) => {
        if (valid) {
          axios.post('/feature/createFeature', {
            "token": this.GLOBAL.token,
            "flag": this.VarForm.flag ? "Both" : "RS",
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
            "researchId": 16 // 应该是this.$route.params.RESEARCHID
          })
            .then(response => {
              if (response.data.code == "0") {
                this.$alert('新建变量成功！', '提示', {
                  confirmButtonText: '确定',
                  callback: () => {
                    this.CloseNewVarDialog()
                  }
                })
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
      this.VarForm.data1 = ""
      this.VarForm.data2 = ""
      this.VarForm.data3 = ""
      this.VarForm.data4 = ""
      this.VarForm.flag = 0
      this.VariableLayer2Visible = false
      this.VariableData234Visible = false
      this.VariableData5Visible = false
      this.VariableData6Visible = false
    },
    // -----概念集弹窗-----
    selectConceptSetId(val) {
      this.VarForm.data1 = val
    },
    selectVisible(val) {
      this.conceptSetListVisible = val
      console.log(this.conceptSetListVisible)
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          this.reload()
        })
        .catch(_ => { });
    },
  }
}
</script>

<style>
.dialog-title {
  font-size: 18px;
}
.el-icon-tickets {
  font-size: 20px;
}
@import "~@/assets/AdminInfo/css_admin/css_admin.css";
@import "~@/assets/AdminInfo/css_admin/myIcon/iconfont.css";
</style>