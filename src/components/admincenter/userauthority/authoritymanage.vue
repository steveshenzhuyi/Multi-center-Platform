<template>
  <div>
    <!-- 权限管理 -->
    <el-row>
      <el-col :offset=4>
        <el-form :inline="true"
                 label-width="80px"
                 size="medium">
          <el-form-item label="角色名称:">
            <el-input placeholder="请输入角色名称"
                      prefix-icon="el-icon-search"
                      v-model="SearchInput.name"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset=4
              :span=10>
        <el-form :inline="true"
                 label-width="80px"
                 size="medium">
          <el-form-item label="角色编码:">
            <el-input placeholder="请输入角色编码"
                      prefix-icon="el-icon-search"
                      v-model="SearchInput.id"></el-input>
          </el-form-item>
          <el-form-item label=" "
                        label-width="30px">
            <el-button type="primary"
                       icon="el-icon-search"
                       round
                       @click="">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :offset=2
              :span=2>
        <el-button type="primary"
                   size="medium"
                   icon="el-icon-circle-plus-outline"
                   round
                   @click="CreateNewRole()">新增角色</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top:5px">
      <el-col :span=14
              :offset=4>
        <el-table :data="RoleList"
                  stripe
                  border>
          <el-table-column prop="id"
                           label="角色编码"
                           min-width="250px"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="name"
                           label="角色名称"
                           min-width="250px"
                           show-overflow-tooltip></el-table-column>
          <el-table-column label="角色权限操作"
                           min-width=300>
            <template slot-scope="scope">
              <el-button size="mini"
                         type="primary"
                         @click="ViewRole(scope.$index)">查看</el-button>
              <el-button size="mini"
                         type="primary"
                         plain
                         @click="EditRole(scope.$index)">编辑</el-button>
              <el-button size="mini"
                         type="info"
                         plain
                         @click="DeleteRole(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 新增、编辑角色弹框 -->
    <el-dialog :title='EditRoleId?"编辑角色":"新增角色"'
               :visible.sync="NewRoleDialogVisible"
               @close="CancelNew_EditRole()"
               width="25%">
      <el-row>
        <el-col :span=20
                :offset=2>
          <td class="mytd2">角色名称：</td>
          <td>
            <el-input placeholder="请输入角色名称"
                      size="medium"
                      v-model="EditRoleInfo.name"></el-input>
          </td>
        </el-col>
      </el-row>
      </br>
      <el-row>
        <el-col :span=20
                :offset=2>
          <td class="mytd2">角色权限：</td>
        </el-col>
      </el-row>
      </br>
      <el-row>
        <el-col :span=20
                :offset=6>
          <div v-for="(val, index) in AuthorityList">
            <el-checkbox v-model="EditRoleInfo['authority'][index]">{{val}}</el-checkbox>
            </br>
            </br>
          </div>
        </el-col>
      </el-row>
      <span slot="footer"
            class="dialog-footer">
        <el-button v-if="!EditRoleId"
                   type="primary"
                   @click="ConfirmNewRole()"
                   size="medium">确认</el-button>
        <el-button v-else
                   type="primary"
                   @click="ConfirmEditRole()"
                   size="medium">确认</el-button>
        <el-button type="primary"
                   @click="CancelNew_EditRole()"
                   size="medium">取消</el-button>
      </span>
    </el-dialog>
    <!-- 查看角色权限弹框 -->
    <el-dialog title="查看角色权限"
               :visible.sync="ViewRoleDialogVisible"
               width="20%">
      <el-row>
        <el-col :span=20
                :offset=2>
          <td class="mytd2">角色名称：</td>
          <td>
            {{ViewRoleInfo.name}}
          </td>
        </el-col>
      </el-row>
      </br>
      <el-row>
        <el-col :span=20
                :offset=2>
          <td class="mytd2">角色权限：</td>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=20
                :offset=6>
          <p v-for="val in ViewRoleInfo.authoritytext"
             style="padding-left:10px">{{val}}</p>
        </el-col>
      </el-row>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="ViewRoleDialogVisible=false"
                   size="medium">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // ---主页面---
      SearchInput: { 'name': '', 'id': '' },
      RoleList: [
        { 'id': '001', 'name': '之江管理员', 'authority': [true, true, true, true] },
        { 'id': '002', 'name': '院方管理员', 'authority': [false, true, true, true] },
        { 'id': '003', 'name': '普通用户', 'authority': [false, false, false, true] },
        { 'id': '004', 'name': '个人用户', 'authority': [false, false, false, false] },
      ],
      AuthorityList: ['伦理审核', '用户管理', '数据库删改', '构建团队'],
      // ---新建和编辑---
      NewRoleDialogVisible: false,
      EditRoleId: "",
      EditRoleInfo: { 'name': '', 'authority': [false, false, false, false] }, // get到权限列表后，将此authority改为对应数目
      // ---查看---
      ViewRoleDialogVisible: false,
      ViewRoleId: "",
      ViewRoleInfo: {},
    }
  },
  watch: {
    EditRoleId(val) {
      if (val) {
        this.EditRoleInfo.name = JSON.parse(JSON.stringify(this.RoleList.find(item => item.id == val).name))
        this.EditRoleInfo.authority = JSON.parse(JSON.stringify(this.RoleList.find(item => item.id == val).authority))
      } else {
        this.ResetEditRoleInfo()
      }
    },
    ViewRoleId(val) {
      this.ViewRoleInfo.name = this.RoleList.find(item => item.id == val).name
      this.ViewRoleInfo.authoritytext = this.RoleList.find(item => item.id == val).authority.map((item, index) => {
        return item ? this.AuthorityList[index] : ""
      }).filter(d => d)
    }
  },
  methods: {
    // ------新建------
    CreateNewRole() {
      this.NewRoleDialogVisible = true
    },
    ConfirmNewRole() {
      // 向后端发EditRoleInfo数据
      this.NewRoleDialogVisible = false
      this.ResetEditRoleInfo()
    },
    CancelNew_EditRole() {
      this.NewRoleDialogVisible = false
      this.ResetEditRoleInfo()
      this.EditRoleId = ""
    },
    // ------编辑------
    EditRole(index) {
      this.EditRoleId = this.RoleList[index].id
      this.NewRoleDialogVisible = true
    },
    ConfirmEditRole() {
      // 向后端传EditRoleInfo数据和EditRoleId
      this.NewRoleDialogVisible = false
      this.EditRoleId = ""
    },
    ResetEditRoleInfo() {
      this.EditRoleInfo.name = ''
      this.EditRoleInfo.authority.forEach((item, index) => {
        this.EditRoleInfo.authority[index] = false
      })
    },
    // ------查看------
    ViewRole(index) {
      this.ViewRoleId = this.RoleList[index].id
      this.ViewRoleDialogVisible = true
    },
    // ------删除------
    DeleteRole(index) {
      this.$confirm('是否确认删除该角色？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.RoleList.splice(index, 1) // 应该是传这个index对应的id给后端并刷新列表
      }).catch(() => { })
    }
  }
}
</script>

<style>
</style>