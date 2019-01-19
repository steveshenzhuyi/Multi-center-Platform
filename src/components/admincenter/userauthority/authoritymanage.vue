<template>
  <div>
    <!-- 权限管理 -->
    <el-row :gutter="20"
            style="margin-top:5px">
      <el-col :span=4
              :offset=4>
        <td class="mytd2">角色名称：</td>
        <td>
          <el-input placeholder="角色名称"
                    prefix-icon="el-icon-search"
                    size="medium"
                    v-model="SearchInput.name"></el-input>
        </td>
      </el-col>
    </el-row>
    <el-row :gutter="20"
            style="margin-top:15px">
      <el-col :span=4
              :offset=4>
        <td class="mytd2">角色编码：</td>
        <td>
          <el-input placeholder="角色编码"
                    prefix-icon="el-icon-search"
                    size="medium"
                    v-model="SearchInput.id"></el-input>
        </td>
      </el-col>
      <el-col :span=2>
        <el-button type="primary"
                   size="medium"
                   icon="el-icon-search"
                   round
                   @click="">搜索</el-button>
      </el-col>
      <el-col :span=4
              :offset=6>
        <el-button type="primary"
                   size="medium"
                   icon="el-icon-circle-plus-outline"
                   round
                   @click="CreateNewRole()">新增角色</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top:25px">
      <el-col :span=24
              :offset=4>
        <el-table :data="RoleList"
                  style="width:60%"
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
               @close="CancelNewRole()"
               width="30%">
      <el-row>
        <el-col :span=20
                :offset=2>
          <td class="mytd2">角色名称：</td>
          <td>
            <el-input placeholder="请输入角色名称"
                      size="medium"
                      v-model="ThisRole.name"></el-input>
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
            <el-checkbox v-model="ThisRole['authority'][index]">{{val}}</el-checkbox>
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
                   @click="CancelNewRole()"
                   size="medium">取消</el-button>
      </span>
    </el-dialog>
    <!-- 查看角色权限弹框 -->
    <el-dialog title="查看角色权限"
               :visible.sync="ViewRoleDialogVisible"
               width="30%">
      <el-row>
        <el-col :span=20
                :offset=2>
          <td class="mytd2">角色名称：</td>
          <td>
            {{ThisViewRole.name}}
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
          <p v-for="val in ThisViewRole.authoritytext"
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
      ThisRole: { 'name': '', 'authority': [false, false, false, false] }, // get到权限列表后，将此authority改为对应数目
      EditRoleId: "",
      // ---查看---
      ViewRoleDialogVisible: false,
      ThisViewRole: {},
    }
  },
  methods: {
    // ------新建------
    CreateNewRole() {
      this.NewRoleDialogVisible = true
    },
    ConfirmNewRole() {
      // 向后端发ThisRole数据
      this.NewRoleDialogVisible = false
      this.ResetNewRole()
    },
    CancelNewRole() {
      this.NewRoleDialogVisible = false
      this.ResetNewRole()
    },
    // ------编辑------
    EditRole(index) {
      this.EditRoleId = this.RoleList[index].id
      this.ThisRole.name = JSON.parse(JSON.stringify(this.RoleList[index].name)) // 编辑是从表里拿来的要注意了
      this.ThisRole.authority = JSON.parse(JSON.stringify(this.RoleList[index].authority))
      this.NewRoleDialogVisible = true
    },
    ConfirmEditRole() {
      // 向后端传ThisRole数据和EditRoleId
      this.NewRoleDialogVisible = false
      this.ResetNewRole()
    },
    ResetNewRole() {
      this.ThisRole.name = ''
      this.ThisRole.authority.forEach((item, index) => {
        this.ThisRole.authority[index] = false
      })
      this.EditRoleId = ""
    },
    // ------查看------
    ViewRole(index) {
      this.ThisViewRole.name = this.RoleList[index].name
      this.ThisViewRole.authoritytext = this.RoleList[index].authority.map((item, index) => {
        return item ? this.AuthorityList[index] : ""
      }).filter(d => d)
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
.mytd2 {
  width: 80px;
  font-size: 14px;
}
</style>