<template>
  <div>
    <el-row type="flex"
            justify="center"
            style="margin-top:30px;margin-bottom:10px">
      <el-col :span="8">
        <el-row style="margin-top:30px;margin-bottom:30px"><i class="myIcon-jilu"></i>当前节点列表： </el-row>
        <el-table :data="nodeList"
                  border
                  style="width: 100%"
                  @row-click="goNodeDetail">
          <el-table-column header-align="center"
                           align="center"
                           prop="nodeNumber"
                           label="节点编号"
                           width="80">
          </el-table-column>
          <el-table-column header-align="center"
                           align="center"
                           prop="nodeName"
                           label="节点名称"
                           min-width="80">
          </el-table-column>
          <el-table-column header-align="center"
                           align="center"
                           prop="linkStatus"
                           label="连接状态"
                           width="80">
          </el-table-column>
          <el-table-column header-align="center"
                           align="center"
                           prop="networkDelay"
                           label="网络延时"
                           width="80">
          </el-table-column>

        </el-table>
      </el-col>
      <el-col :span="10"
              :offset="2">
        <el-card style="margin-top:30px;margin-bottom:30px">
          <el-row type="flex"
                  justify="center"
                  style="margin-top:30px;margin-bottom:10px">
            <el-col :span="10">
              当前登陆节点：
            </el-col>
            <el-col :span="10"
                    :offset="2">
              当前产块节点：
            </el-col>
          </el-row>
          <el-row type="flex"
                  justify="center"
                  style="margin-top:10px;margin-bottom:10px">
            <el-col :span="10">
              登陆节点累计操作数目：
            </el-col>
            <el-col :span="10"
                    :offset="2">
              累计操作数目：
            </el-col>
          </el-row>
        </el-card>
        <el-row style="margin-top:30px;margin-bottom:30px"><i class="myIcon-jilu"></i>最新操作信息： </el-row>
        <el-table :data="latestOperation"
                  border
                  style="width: 100%">
          <el-table-column header-align="center"
                           align="center"
                           prop="nodeNumber"
                           label="区块号"
                           width="120">
          </el-table-column>
          <el-table-column header-align="center"
                           align="center"
                           prop="nodeName"
                           label="生产节点"
                           min-width="120">
          </el-table-column>
          <el-table-column header-align="center"
                           align="center"
                           prop="linkStatus"
                           label="操作ID"
                           width="120">
          </el-table-column>
          <el-table-column header-align="center"
                           align="center"
                           prop="networkDelay"
                           label="时间"
                           width="120">
          </el-table-column>
          <el-table-column header-align="center"
                           align="center"
                           prop="linkStatus"
                           label="操作类型"
                           width="120">
          </el-table-column>
          <el-table-column header-align="center"
                           align="center"
                           prop="networkDelay"
                           label="产块时间"
                           width="120">
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
      nodeList: [{
        nodeNumber: '1',
        nodeName: 'AAA',
        linkStatus: '正常',
        networkDelay: '200ms'
      }],
      latestOperation: [{

      }]
    }
  },
  methods: {
    goNodeDetail(row) {
      //console.log(row)
      this.$router.push({
        path: 'nodedetail',
        params:
          {
            node: 1
          }
      });
    }
  }
}
</script>

<style>
@import "../../assets/AdminInfo/css_admin/css_admin.css";
@import "../../assets/AdminInfo/css_admin/myIcon/iconfont.css";
</style>