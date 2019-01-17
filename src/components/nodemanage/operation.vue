<template>
  <div>
    <el-row type="flex"
            justify="center"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="4">
        当前团队：
      </el-col>
      <el-col :span="4"
              :offset="1">
        当前课题：
      </el-col>
      <el-col :span="4"
              :offset="1">
        用户权限：
      </el-col>
    </el-row>
    <el-row type="flex"
            justify="center"
            style="margin-top:30px;margin-bottom:10px">

      <el-col :span="10">
        <el-row style="margin-top:30px;margin-bottom:30px">查询条件： </el-row>
        <el-form ref="form"
                 :model="form"
                 label-width="100px">

          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="操作时间">
            <el-date-picker v-model="form.dateRange"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="操作序号">
            <el-input v-model="form.number"></el-input>
          </el-form-item>
          <el-form-item label="操作类型">
            <el-select v-model="form.type"
                       placeholder="请选择操作类型">
              <el-option label="类型一"
                         value="1"></el-option>
              <el-option label="类型二"
                         value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="onSubmit">查询</el-button>

          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8"
              :offset="2">
        <el-card></el-card>
      </el-col>
    </el-row>
    <el-row type="flex"
            justify="center"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="20">
        <el-row style="margin-top:30px;margin-bottom:30px">查询结果： </el-row>
        <el-table :data="queryResult"
                  border
                  style="width: 100%">
          <el-table-column header-align="center"
                           align="center"
                           prop="time"
                           label="操作时间"
                           width="150">
          </el-table-column>
          <el-table-column header-align="center"
                           align="center"
                           prop="type"
                           label="操作类型"
                           width="150">
          </el-table-column>
          <el-table-column header-align="center"
                           align="center"
                           prop="number"
                           label="序号"
                           width="150">
          </el-table-column>
          <el-table-column header-align="center"
                           align="center"
                           prop="content"
                           label="操作内容"
                           width="150">
          </el-table-column>
          <el-table-column header-align="center"
                           align="center"
                           prop="dataCenter"
                           label="对应数据中心"
                           width="150">
          </el-table-column>
          <el-table-column header-align="center"
                           align="center"
                           prop="applicant"
                           label="操作申请者"
                           width="150">
          </el-table-column>
          <el-table-column header-align="center"
                           align="center"
                           prop="team"
                           label="团队"
                           width="150">
          </el-table-column>
          <el-table-column header-align="center"
                           align="center"
                           prop="researchName"
                           label="研究课题"
                           min-width="150">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        number: '',
        dateRange: '',
        type: '',
      },
      queryResult: []
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

