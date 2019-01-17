<template>
  <div>
    <el-row style="margin-top:30px;margin-bottom:10px">
      <el-col :span="24">
        <el-steps :active="4"
                  align-center>
          <el-step title="1 研究开始"
                   style="cursor:pointer"
                   @click.native="goMyTeam()"></el-step>
          <el-step title="2 团队建立"
                   style="cursor:pointer"
                   @click.native="goNewTeam()"></el-step>
          <el-step title="3 多中心运算"
                   style="cursor:pointer"
                   @click.native="goNewCoresearch()"></el-step>
          <el-step title="4 成果讨论"
                   style="cursor:pointer"
                   @click.native="goResult()"></el-step>
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
                       ref="upload"
                       :data="{token: this.GLOBAL.token,rename: 1}"
                       :on-preview="handlePreview"
                       :on-remove="handleRemove"
                       :on-change="handleChange"
                       :file-list="certificationList"
                       list-type="picture">
              <el-button slot="trigger"
                         size="small"
                         type="primary">上传图片</el-button>
              <div slot="tip"
                   class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%"
                   :src="dialogImageUrl"
                   alt="">
            </el-dialog>
          </el-card>
        </el-row>
        <el-row type="flex"
                justify="center"
                style="margin-top:10px;margin-bottom:10px">

          <el-button type="primary"
                     @click="submitResearchApproval()">申请审核</el-button>
        </el-row>
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
                  项目发起人：{{Initiator[0]['name'.toUpperCase()]}}
                </el-col>
                <el-col :span="12">
                  {{getApprovalState(Initiator[0]['approvalResultTag'.toUpperCase()])}}
                </el-col>
              </el-row>
              <div v-if=" detail.length > 0">
                <el-row v-for="people in detail"
                        :key="people.USERID"
                        style="margin-top:10px;margin-bottom:10px">
                  <el-col :span="12">
                    项目参与人：{{people['name'.toUpperCase()]}}
                  </el-col>
                  <el-col :span="12">
                    {{getApprovalState(people['approvalResultTag'.toUpperCase()])}}
                  </el-col>
                </el-row>
              </div>
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
      certificationUrl: [],
      certificationList: [],
      detail: [],
      dialogImageUrl: '',
      dialogVisible: false
    };
  },
  mounted() {
    console.log("collaborationId", this.$route.query.collaborationId)
    this.getResearchVerifyStatus(this.$route.query.collaborationId)
  },
  computed: {
    Initiator: function () {
      return this.detail.splice(0, 1)
    },
    ApprovalState: function () {

    }
  },
  methods: {
    getResearchVerifyStatus(RESEARCHID) {
      axios.get('result/getResearchVerifyStatus', {
        params: {
          token: this.GLOBAL.token,
          researchTypeTag: 0,
          researchId: RESEARCHID
        }
      })
        .then((response) => {
          if (response.data.code == 0) {
            console.log("data", response.data.data)
            this.detail = response.data.data

          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    getApprovalState(APPROVALRESULTTAG) {
      if (APPROVALRESULTTAG == 0) {
        return "未提交"
      } else if (APPROVALRESULTTAG == 1) {
        return "待审核 "
      } else if (APPROVALRESULTTAG == 2) {
        return "已通过"
      } else if (APPROVALRESULTTAG == 3) {
        return "未通过"
      }
    },
    handleRemove(file, fileList) {
      this.certificationList = fileList
      console.log(this.certificationList)

    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;

    },
    handleChange(file, fileList) {
      this.certificationList = fileList
      console.log(this.certificationList)

    },

    /* 不用element上传图片方法*/
    // upload: function (e) {
    //   var self = this
    //   let file = e.target.files[0]
    //   /* eslint-disable no-undef */
    //   let param = new FormData() // 创建form对象
    //   param.append('file', file, file.name) // 通过append向form对象添加数据
    //   param.append('token', this.GLOBAL.token) // 添加form表单中其他数据
    //   param.append('rename', "1")
    //   console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
    //   let config = {
    //     headers: { 'Content-Type': 'multipart/form-data' }
    //   }
    //   // 添加请求头
    //   axios.post('/upload', param)
    //     .then(response => {
    //       if (response.data.code === 0) {
    //         self.ImgUrl = response.data.data
    //       }
    //       console.log(response.data)
    //     })
    // },
    submitResearchApproval() {
      this.$confirm('确认提交资格审核', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //this.$refs.upload.submit();
        for (var i = 0; i < this.certificationList.length; i++) {
          this.certificationUrl.push(this.certificationList[i].response.filepath)
        }
        console.log("url", this.certificationUrl)







        axios.post('/result/submitResearchApproval', {
          "token": this.GLOBAL.token,
          "researchTypeTag": "0",
          "researchId": this.$route.query.collaborationId,
          "certificationUrl": this.certificationUrl

        })
          .then((response) => {
            if (response.data.code == 0) {
              this.$message.success("提交成功！");

            } else {
              this.$message.error("提交失败！");
            }
          })
          .catch(function (error) {
            console.log("error", error);
          });

        axios.post('/result/editResearchCert', {
          "token": this.GLOBAL.token,
          "researchTypeTag": "0",
          "researchId": this.$route.query.collaborationId,
          "certificationUrl": this.certificationUrl

        })
          .then((response) => {
            if (response.data.code == 0) {
              //his.$message.success("提交成功！");
              this.getResearchVerifyStatus(this.$route.query.collaborationId)

            } else {
              //this.$message.error("提交失败！");
            }
          })
          .catch(function (error) {
            console.log("error", error);
          });


      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消申请'
        });
      });
    },
    goMyTeam() {
      this.$router.push({
        path: 'myteam',
        query:
          {
            collaborationId: this.$route.query.collaborationId
          }
      });
    },
    goNewTeam() {
      console.log(this.researchDetail)
      this.$router.push({
        path: 'newteam',
        query:
          {
            collaborationId: Number(this.collaborationId)
          }
      });
    },
    goNewCoresearch() {
      this.$router.push({
        path: 'newcoresearch',
        query:
          {
            collaborationId: Number(this.collaborationId)
          }
      })
    },
    goResult() {
      this.$router.push({
        path: 'result',
        query:
          {
            collaborationId: Number(this.collaborationId)
          }
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
