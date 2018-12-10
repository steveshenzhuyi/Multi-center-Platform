<template>
  <div>
    <!-- 新增变量主页面 -->
    <el-row style="margin-top:20px;margin-bottom:10px">
      <el-col :span=2
              :offset=1>
        <el-dropdown @command="NewCommand"
                     split-button
                     type="primary">
          新增
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">新增变量</el-dropdown-item>
            <el-dropdown-item command="b">自定义变量</el-dropdown-item>
            <el-dropdown-item command="c">从变量库添加</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span=3>
        <el-button type="primary"
                   @click="DeleteVar()">批量删除</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top:20px;margin-bottom:10px">
      <el-col :span=20
              :offset=1>
        <el-table :data="VariableTable"
                  style="width:80%"
                  @selection-change="VarTableSelChange"
                  stripe
                  border>
          <el-table-column type="selection"
                           width="55"></el-table-column>
          <el-table-column prop="VarCName"
                           label="变量名称（中文）"
                           width="150"></el-table-column>
          <el-table-column prop="VarEName"
                           label="变量名称（英文）"
                           width="150"></el-table-column>
          <el-table-column prop="VarDiscription"
                           label="变量描述"
                           width="200"></el-table-column>
          <el-table-column prop="VarType"
                           label="变量类型"
                           width="120"></el-table-column>
          <el-table-column prop="SQL"
                           label="SQL语句"
                           width="300"
                           show-overflow-tooltip></el-table-column>
          <el-table-column label="编辑">
            <template slot-scope="scope">
              <el-button size="mini"
                         type="primary"
                         @click="EditVar(scope.$index)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 新增变量弹框 -->
    <el-dialog title="新增变量"
               :visible.sync="NewVarDialogVisiable"
               width="40%">
      <el-form ref="NewVarForm"
               :model="NewVarForm"
               :rules="NewVarRules"
               label-width="80px">
        <el-form-item label="中文名称"
                      prop="VarCName">
          <el-input v-model="NewVarForm.VarCName"></el-input>
        </el-form-item>
        <el-form-item label="英文名称"
                      prop="VarEName">
          <el-input v-model="NewVarForm.VarEName"></el-input>
        </el-form-item>
        <el-form-item label="变量描述">
          <el-input v-model="NewVarForm.VarDiscription"
                    type="textarea"
                    :rows=3></el-input>
        </el-form-item>
        <el-form-item label="变量类型"
                      prop="VarType">
          <el-select v-model="NewVarForm.VarType">
            <el-option v-for="item in VarTypeOptions"
                       :key="item.OptionValue"
                       :label="item.label"
                       :value="item.OptionValue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="SQL语句"
                      prop="SQL">
          <el-input v-model="NewVarForm.SQL"
                    type="textarea"
                    :rows=3></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="CreateNewVar(NewVarForm)">新增变量</el-button>
          <el-button @click="CancelNewVarDialog(NewVarForm)">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      VariableTable: [{
        VarCName: '性别',
        VarEName: 'GENDER',
        VarDiscription: '样本的性别',
        VarType: '定性',
        SQL: 'SELECT PERSON_ID, CASE WHEN WHATWAHTWAHT'
      },
      {
        VarCName: '年龄',
        VarEName: 'AGE',
        VarDiscription: '样本的年龄',
        VarType: '定量',
        SQL: 'SELECT PERSON_ID, TO_NUMBER(WHATWAHTWAHT)'
      }],
      NewVarDialogVisiable: false,
      VarTableSelection: [],
      NewVarForm: {
        VarCName: '',
        VarEName: '',
        VarDiscription: '',
        VarType: '',
        SQL: ''
      },
      NewVarRules: {
        VarCName: [{ required: true, message: '请输入中文名称', trigger: 'blur' }],
        VarEName: [{ required: true, message: '请输入英文名称', trigger: 'blur' }],
        VarType: [{ required: true, message: '请输入变量类型', trigger: 'blur' }],
        SQL: [{ required: true, message: '请输入SQL语句', trigger: 'blur' }]
      },
      VarTypeOptions: [{ OptionValue: '定性', label: '定性' }, { OptionValue: '定量', label: '定量' }],
    }
  },
  methods: {
    NewCommand(command) {
      switch (command) {
        case "a":
          this.NewVarDialogVisiable = true
          break
        case "b":
          // 自定义变量
          break
        case "c":
        // 从变量库添加
      }
    },
    VarTableSelChange(val) {
      this.VarTableSelection = val
    },
    DeleteVar() {
      this.VariableTable = this.VariableTable.filter(t => !this.VarTableSelection.some(s => s.VarCName === t.VarCName))
    },
    EditVar(index) {

    },
    CreateNewVar(NewVarForm) {
      this.$refs.NewVarForm.validate((valid) => {
        if (valid) {
          this.VariableTable.push(this.MyDeepCopy(this.NewVarForm))
          this.$refs.NewVarForm.resetFields();
          this.NewVarDialogVisiable = false
          alert('新增成功！');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    CancelNewVarDialog(NewVarForm) {
      this.$refs.NewVarForm.resetFields();
      this.NewVarDialogVisiable = false
    },
    MyDeepCopy(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
  }
}
</script>

<style>
</style>