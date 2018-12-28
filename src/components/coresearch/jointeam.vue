<template>
  <div>
    <el-row type="flex"
            justify="center"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="2">
        <div>团队id</div>
      </el-col>
      <el-col :span="10">
        <el-input size="small"
                  placeholder="空白等待输入"
                  v-model="team.collaborationId">
        </el-input>
      </el-col>
      <el-col :span="1"></el-col>
    </el-row>
    <el-row type="flex"
            justify="center"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="2">
        <div>研究协议</div>
      </el-col>
      <el-col :span="10">
        <div>
          <el-checkbox v-model="checked">我同意接收研究发起人相关协议</el-checkbox>
          <el-button type="text"
                     @click="messagebox()">阅读协议</el-button>
        </div>
      </el-col>
      <el-col :span="1"></el-col>
    </el-row>
    <el-row type="flex"
            justify="center"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="6">
        <el-button type="primary"
                   :disabled="!this.checked"
                   @click="addParticipation(1)">加入研究</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="primary"
                   @click="addParticipation(2)">拒绝加入</el-button>
      </el-col>
    </el-row>
    <el-row type="flex"
            justify="center"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="2">
        <div>队列所属研究id</div>
      </el-col>
      <el-col :span="10">
        <div>
          <el-input size="small"
                    placeholder="空白等待输入"
                    v-model="cohort.collaborationId">
          </el-input>
        </div>
      </el-col>
      <el-col :span="1">
      </el-col>
    </el-row>
    <el-row type="flex"
            justify="center"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="2">
        <div>userid(消息获取)</div>
      </el-col>
      <el-col :span="10">
        <div>
          <el-input size="small"
                    placeholder="空白等待输入"
                    v-model="cohort.userId">
          </el-input>
        </div>
      </el-col>
      <el-col :span="1"></el-col>
    </el-row>
    <el-row type="flex"
            justify="center"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="2">
        <div>队列id(消息获取)</div>
      </el-col>
      <el-col :span="10">
        <div>
          <el-input size="small"
                    placeholder="空白等待输入"
                    v-model="cohort.cohortId">
          </el-input>
        </div>
      </el-col>
      <el-col :span="1"></el-col>
    </el-row>
    <el-row type="flex"
            justify="center"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="2">
        <div>单位code(待定)</div>
      </el-col>
      <el-col :span="10">
        <div>
          <el-input size="small"
                    placeholder="空白等待输入"
                    v-model="cohort.organizationCode">
          </el-input>
        </div>
      </el-col>
      <el-col :span="1"></el-col>
    </el-row>
    <el-row type="flex"
            justify="center"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="6">
        <el-button type="primary"
                   @click="updateCollaborCohortAccredit(1)">同意授权</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="primary"
                   @click="updateCollaborCohortAccredit(2)">拒绝授权</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      checked: false,
      team: { collaborationId: '' },
      cohort: {
        collaborationId: '',
        userId: '',
        cohortId: '',
        organizationCode: '',
        accreditState: ''
      }
    }
  },
  methods: {
    messagebox() {
      this.$alert('协议内容', '协议', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          });
        }
      });
    },
    addParticipation(PARTICIPATIONSTATE) {
      this.$confirm('确认加入？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('/collaboration/addParticipation', {
          "token": this.GLOBAL.token,
          "collabrationId": this.team.collaborationId,
          "participationState": PARTICIPATIONSTATE
        })
          .then((response) => {
            if (response.data.code == 0) {
              this.$message.success("成功！");
              console.log("deletesuccess")
              this.getCollaborInfo(this.$route.query.collaborationId)
            } else {
              this.$message.error("失败！");
            }
          })
          .catch(function (error) {
            console.log("error", error);
          });
      }).catch(() => {

      });
    },
    updateCollaborCohortAccredit(ACCREDITSTATE) {
      this.$confirm('确认授权？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('/collaboration/updateCollaborCohortAccredit', {
          "token": this.GLOBAL.token,
          "collabrationId": this.cohort.collaborationId,
          "userId": this.cohort.userId,
          "cohortId": this.cohort.cohortId,
          "organizationCode": this.cohort.organizationCode,
          "accreditState": ACCREDITSTATE
        })
          .then((response) => {
            if (response.data.code == 0) {
              this.$message.success("成功！");
              console.log("deletesuccess")
              this.getCollaborInfo(this.$route.query.collaborationId)
            } else {
              this.$message.error("失败！");
            }
          })
          .catch(function (error) {
            console.log("error", error);
          });
      }).catch(() => {

      });
    }
  }
}
</script>