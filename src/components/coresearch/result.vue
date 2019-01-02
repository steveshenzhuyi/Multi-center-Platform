<template>
  <div>
    <el-row :gutter="20"
            type="flex"
            justify="center"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="8">
        <el-row>
          <el-card>
            <div class="box-card">
              <el-tree :data="results"
                       @node-click="handleNodeClick"></el-tree>
            </div>
          </el-card>
        </el-row>
        <el-row style="margin-top:30px;margin-bottom:10px">
          <el-col :span="10"
                  :offset="7">
            <el-button type="primary"
                       @click="goQualification()">资格审核</el-button>
          </el-col>
        </el-row>

      </el-col>
      <el-col :span="14">
        <el-row>
          <el-card type="flex"
                   justify="center">
            <div class="box-card">
              <el-row>
                <div class="inside-card">
                  <span>结果描述</span>
                  <el-row>结果名：{{detail.NAME}}</el-row>
                  <el-row>描述：{{detail.DESCRIPTION}}</el-row>
                </div>
              </el-row>
              <el-row type="flex"
                      justify="space-around"
                      style="position:absolute;bottom:10px">
                <!-- <el-col :span="7">
                <el-button type="primary">提出讨论</el-button>
              </el-col> -->
                <el-col :span="10"
                        :offset="5">
                  <el-button type="primary"
                             @click="selectFinalResult()">作为成果</el-button>
                </el-col>

              </el-row>
            </div>
          </el-card>

        </el-row>

      </el-col>
      <el-col :span="6"
              v-if="false">
        <el-row>
          <el-card class="box-card">
            <div slot="header"
                 class="clearfix">
              <span>成果反馈</span>
            </div>
            <el-row>
              <div>现有反馈</div>
            </el-row>
            <el-row style="margin-top:10px;margin-bottom:10px">
              <div>
                <el-input type="textarea"
                          rows="5"
                          size="small"
                          placeholder="反馈栏"
                          v-model="input2">
                </el-input>
              </div>
            </el-row>
            <el-row type="flex"
                    justify="center"
                    style="margin-top:10px;margin-bottom:10px">
              <el-button type="primary">提交反馈</el-button>
            </el-row>
            <el-row>
              <div style="height: 100px">预设成果分配方案</div>
            </el-row>
            <el-row type="flex"
                    justify="center"
                    style="margin-top:30px;margin-bottom:10px">
              <el-button type="primary">同意结题</el-button>
            </el-row>
          </el-card>
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
      list: [],
      detail: [],
      results: [],
      input2: null
    }
  },
  mounted() {
    console.log(this.$route.query.collaborationId)
    this.getResearchResultList()
  },
  methods: {
    getResearchResultList() {
      axios.get('result/getResearchResultList', {
        params: {
          token: this.GLOBAL.token,
          researchId: this.$route.query.collaborationId,
          researchTypeTag: 0,
          offset: 0,
          limit: 10
        }
      })
        .then((response) => {
          if (response.data.msg == "成功获取结果列表") {
            //console.log("success")
            this.list = response.data.data
            console.log("data", this.data)
            this.getResearchResultDetail(this.list[0].RESULTID)
            for (var i = 0; i < this.list.length; i++) {

              this.results.push({
                label: this.list[i].NAME,
                id: this.list[i].RESULTID
              })


            }
            // axios.get('collaboration/CollaborInfo', {
            //   params: {
            //     token: this.GLOBAL.token,
            //     collaborationId: 12
            //   }
            // })
            //   .then((response) => {
            //     if (response.data.msg == "success!") {
            //       //console.log("success")


            //       this.detail = response.data.data
            //       console.log("detail", this.detail)
            //     }
            //   })
            //   .catch(function (error) {
            //     console.log("error", error);
            //   });
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    getResearchResultDetail(RESULTID) {
      axios.get('result/getResearchResultDetail', {
        params: {
          token: this.GLOBAL.token,
          resultId: RESULTID

        }
      })
        .then((response) => {
          if (response.data.msg == "成功获取结果详情") {
            //console.log("success")
            this.detail = response.data.data

          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    selectFinalResult() {
      this.$confirm('是否作为最终结果?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('/result/selectFinalResult', {
          "token": this.GLOBAL.token,
          "resultId": this.detail.RESULTID,
          "finalResultTag": "1"

        })
          .then((response) => {
            if (response.data.msg == "成功修改成果信息") {
              this.$message.success("成功！");
              console.log("deletesuccess")
              //this.getCollaborInfo(this.$route.query.collaborationId)
            } else {
              this.$message.error("失败！");
            }
          })
          .catch(function (error) {
            console.log("error", error);
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    goQualification() {
      this.$router.push({
        path: 'qualification',
        query:
          {
            collaborationId: 12
          }
      });
    },
    handleNodeClick(data) {
      this.getResearchResultDetail(data.id)
    },
  }
};
</script>
<style>
.box-card {
  position: relative;
  height: 500px;
  overflow: auto;
  overflow-x: hidden;
}
/* .inside-card {
  height: 400px;
} */
</style>