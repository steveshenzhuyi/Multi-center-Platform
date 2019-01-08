<template>
  <div>
    <el-steps :active="0"
              style="padding-top:10px;padding-left:10px;padding-right:10px">
      <el-step title="研究开始"></el-step>
      <el-step title="队列生成"></el-step>
      <el-step title="变量生成"></el-step>
      <el-step title="模型选择"></el-step>
      <el-step title="结果分析"></el-step>
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

      <el-form-item label="研究描述"
                    prop="desc">
        <el-input type="textarea"
                  :autosize="{ minRows: 5, maxRows: 10}"
                  v-model="newresearch.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="ifnew=true">立即创建</el-button>
        <el-button @click="resetForm('newresearch')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="提示"
               :visible.sync="ifnew"
               width="30%"
               :before-close="handleClose">
      <span>是否创建该研究？</span>
      确认后将跳转至新建队列页面。
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="ifnew = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false;tonewresearch(newresearch)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      ifnew: false,
      newresearch: {
        name: "",
        desc: "",
      },
      rules: {
        name: [
          { required: true, message: '请输入研究名称', trigger: 'blur' },
        ],
        desc: [
          { required: true, message: '请输入研究内容', trigger: 'blur' },
        ],
      },
      // 表单验证

    }
  },

  methods: {
    tonewresearch(_newresearch) {
      console.log(_newresearch.name, _newresearch.desc);
      this.$router.push({
        path: 'createcohort',
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

  }
}
</script>

<style>
.el-form {
  width: 60%;
  margin-top: 20px;
  margin-left: 5%;
  margin-right: 5%;
}
</style>