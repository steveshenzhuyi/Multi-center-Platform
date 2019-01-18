<template>
  <div>
    <el-card>
      <el-row type="flex"
              justify="center"
              style="margin-top:30px;margin-bottom:10px">
        XXX节点
      </el-row>
      <el-row type="flex"
              justify="center"
              style="margin-top:30px;margin-bottom:10px">
        <el-col :span="5">
          节点ID：
        </el-col>
        <el-col :span="5"
                :offset="2">
          管理账户：
        </el-col>
        <el-col :span="5"
                :offset="2">
          连接状态：
        </el-col>
      </el-row>
      <el-row type="flex"
              justify="center"
              style="margin-top:30px;margin-bottom:10px">
        <el-col :span="5">
          是否产块：
        </el-col>
        <el-col :span="5"
                :offset="2">
          上次产块时间：
        </el-col>
        <el-col :span="5"
                :offset="2">

        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-row type="flex"
              justify="center"
              style="margin-top:30px;margin-bottom:10px">
        <el-col :span="20">
          <el-row style="margin-top:30px;margin-bottom:30px">节点近期操作记录： </el-row>
          <el-table :data="operationRecord"
                    border
                    style="width: 100%">
            <el-table-column header-align="center"
                             align="center"
                             prop="time"
                             label="区块序号"
                             width="150">
            </el-table-column>
            <el-table-column header-align="center"
                             align="center"
                             prop="type"
                             label="区块哈希"
                             width="150">
            </el-table-column>
            <el-table-column header-align="center"
                             align="center"
                             prop="number"
                             label="操作时间"
                             width="150">
            </el-table-column>
            <el-table-column header-align="center"
                             align="center"
                             prop="content"
                             label="操作id"
                             width="150">
            </el-table-column>
            <el-table-column header-align="center"
                             align="center"
                             prop="dataCenter"
                             label="操作类型"
                             width="150">
            </el-table-column>
            <el-table-column header-align="center"
                             align="center"
                             prop="applicant"
                             label="操作内容"
                             min-width="150">
            </el-table-column>
            <el-table-column header-align="center"
                             align="center"
                             prop="team"
                             label="申请人"
                             width="150">
            </el-table-column>
            <el-table-column header-align="center"
                             align="center"
                             prop="researchName"
                             label="用于项目"
                             width="150">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      operationRecord: []
    }
  }
}
</script>
