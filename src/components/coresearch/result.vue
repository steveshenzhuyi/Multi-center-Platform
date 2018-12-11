<template>
  <div>
    <el-row :gutter="20"
            type="flex"
            justify="center"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="5">
        <el-row>
          <el-card class="box-card">
            <el-tree :data="results"
                     :props="defaultProps"
                     @node-click="handleNodeClick"></el-tree>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-card class="box-card">
            <div class="inside-card">
              <span>结果描述</span>
            </div>
            <div>
              <el-row type="flex"
                      justify="space-between">
                <el-col :span="6">
                  <el-button type="info">提出讨论</el-button>
                </el-col>
                <el-col :span="6">
                  <el-button type="info"
                             @click="goQualification()">作为成果</el-button>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="6">
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
              <el-button type="info">提交反馈</el-button>
            </el-row>
            <el-row>
              <div style="height: 100px">预设成果分配方案</div>
            </el-row>
            <el-row type="flex"
                    justify="center"
                    style="margin-top:30px;margin-bottom:10px">
              <el-button type="info">同意结题</el-button>
            </el-row>
          </el-card>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      results: [{
        label: '结果1'
      }, {
        label: '结果2'
      }, {
        label: '结果3'
      }],
      input2: null
    }
  },
  methods: {
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
      // if (data.id > 0) {
      //   this.getCollaborInfo(data.id)
      //   //this.detail[3][0].NAME = "agags"
      // }

    },
  }
};
</script>
<style>
.box-card {
  height: 500px;
}
.inside-card {
  height: 400px;
}
</style>