<template>
  <div>
    <el-row style="margin-top:30px;margin-bottom:10px">
      <el-col :span="24">
        <el-steps :active="2"
                  align-center>
          <el-step title="1 研究开始"></el-step>
          <el-step title="2 团队建立"></el-step>
          <el-step title="3 多中心运算"></el-step>
          <el-step title="4 成果讨论"></el-step>
          <el-step title="5 资格审核"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-row :gutter="20"
            type="flex"
            justify="center">
      <el-col :span="8">
        <el-row>
          <el-card class="box-card">
            <div slot="header"
                 class="clearfix">
              <span>资格审核</span>
            </div>
            <!-- <input ref="files"
                   type="file"
                   name="avatar"
                   id="avatar"
                   v-on:change="upload"> -->

            <el-upload action="http://10.12.45.82:3000/upload"
                       :data="{token: this.GLOBAL.token}"
                       :on-preview="handlePreview"
                       :on-remove="handleRemove"
                       :file-list="fileList2"
                       list-type="picture">
              <el-button type="primary">材料上传</el-button>
              <div slot="tip"
                   class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-card>
        </el-row>
        <!-- <el-row type="flex"
                justify="center"
                style="margin-top:10px;margin-bottom:10px">

          <el-button type="primary">材料上传</el-button>
        </el-row> -->
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-card class="box-card">
            <div slot="header"
                 class="clearfix">
              <span>审核状态</span>
            </div>
            <div>
              <el-row>
                <el-col :span="12">
                  项目发起人：张XX
                </el-col>
                <el-col :span="12">
                  通过
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-row>
        <el-row type="flex"
                justify="center"
                style="margin-top:10px;margin-bottom:10px">
          <el-button type="primary">催一下</el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      a: { token: this.GLOBAL.token },
      fileList2: []
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    upload: function (e) {
      var self = this
      let file = e.target.files[0]
      /* eslint-disable no-undef */
      let param = new FormData() // 创建form对象
      param.append('file', file, file.name) // 通过append向form对象添加数据
      param.append('token', this.GLOBAL.token) // 添加form表单中其他数据
      param.append('rename', "123")
      console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      // 添加请求头
      axios.post('/upload', param)
        .then(response => {
          if (response.data.code === 0) {
            self.ImgUrl = response.data.data
          }
          console.log(response.data)
        })
    }
  }
}
</script>

<style>
.box-card {
  height: 400px;
}
</style>
