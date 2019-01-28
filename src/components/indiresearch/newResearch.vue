<template>
  <div class="newResearchcontainer">
    <el-steps :active="0"
              style="padding-top:10px;padding-left:10px;padding-right:10px">
      <el-step title="1 研究开始"></el-step>
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
    <el-form ref="newresearch"
             :model="newresearch"
             :rules="rules"
             label-width="80px">
      <el-form-item label="研究名称"
                    prop="name">
        <el-input v-model="newresearch.name"
                  placeholder="请输入研究名称"></el-input>
      </el-form-item>

      <el-form-item label="研究目标"
                    prop="target">
        <el-input v-model="newresearch.target"
                  placeholder="请输入研究目的"></el-input>

      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="ifnew(newresearch)">立即创建</el-button>
        <el-button @click="resetForm('newresearch')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="提示"
               :visible.sync="ifnewvisible"
               width="30%"
               :before-close="handleClose">
      <span>是否创建该研究？</span>
      确认后将跳转至新建队列页面。
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="dialogVisible = false;tonewresearch(newresearch)">确 定</el-button>
        <el-button @click="ifnewvisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      ifnewvisible: false,
      newresearch: {
        name: "",
        target: "",
      },
      rules: {
        name: [
          { required: true, message: '请输入研究名称', trigger: 'blur' },
        ],
        target: [
          { required: true, message: '请输入研究目的', trigger: 'blur' },
        ],
      },
      // 表单验证

    }
  },

  methods: {

    ifnew(_newresearch) {

      if ((_newresearch.name == "") || (_newresearch.target == "")) { this.$message('请输入正确的信息！'); }
      else { this.ifnewvisible = true }
    },
    tonewresearch(_newresearch) {
      console.log(_newresearch.name, _newresearch.target);
      _newresearch.token = this.GLOBAL.token
      // 新建个人团队
      axios.post('personalResearch/createResearch',
        _newresearch
      )
        .then((response) => {
          console.log(response)
          // 新建成功，修改状态并跳转
          if (response.data.msg == '成功新建个人研究团队!') {
            this.$router.push({
              path: 'createcohort',
              query: {
                RESEARCHID: response.data.data
              }
            });
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
    }
  }
}
</script>

<style>
.newResearchcontainer .el-form {
  width: 60%;
  margin-top: 20px;
  margin-left: 5%;
  margin-right: 5%;
}
</style>