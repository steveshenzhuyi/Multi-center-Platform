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
          </el-card>
        </el-row>
        <el-row type="flex"
                justify="center"
                style="margin-top:10px;margin-bottom:10px">
          <el-button type="primary">材料上传</el-button>
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
export default {

}
</script>

<style>
.box-card {
  height: 400px;
}
</style>
