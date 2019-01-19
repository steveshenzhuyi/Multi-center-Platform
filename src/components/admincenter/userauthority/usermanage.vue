<template>
  <div>
    <!-- 用户管理 -->
    <el-row :gutter="20"
            style="margin-top:15px">
      <el-col :span=4
              :offset=1>
        <td class="mytd">姓名：</td>
        <td>
          <el-input placeholder="请输入姓名"
                    prefix-icon="el-icon-search"
                    size="medium"
                    v-model="SearchInput.name"></el-input>
        </td>
      </el-col>
      <el-col :span=4>
        <td class="mytd">用户id：</td>
        <td>
          <el-input placeholder="请输入用户id"
                    prefix-icon="el-icon-search"
                    size="medium"
                    v-model="SearchInput.id"></el-input>
        </td>
      </el-col>
    </el-row>
    <el-row :gutter="20"
            style="margin-top:15px">
      <el-col :span=4
              :offset=1>
        <td class="mytd">医院：</td>
        <td>
          <el-input placeholder="请输入医院"
                    prefix-icon="el-icon-search"
                    size="medium"
                    v-model="SearchInput.hospital"></el-input>
        </td>
      </el-col>
      <el-col :span=4>
        <td class="mytd">科室：</td>
        <td>
          <el-input placeholder="请输入科室"
                    prefix-icon="el-icon-search"
                    size="medium"
                    v-model="SearchInput.department"></el-input>
        </td>
      </el-col>
      <el-col :span=4>
        <el-button type="primary"
                   size="medium"
                   icon="el-icon-search"
                   round
                   @click="">搜索</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top:25px">
      <el-col :span=24
              :offset=1>
        <el-table :data="UserList"
                  style="width:80%"
                  stripe
                  border>
          <el-table-column prop="id"
                           label="用户id"
                           width=100
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="name"
                           label="姓名"
                           width=120
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="email"
                           label="邮箱"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="hospital"
                           label="医院"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="department"
                           label="科室"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="roletext"
                           label="角色"
                           show-overflow-tooltip></el-table-column>
          <el-table-column label="角色分配">
            <template slot-scope="scope">
              <el-button size="mini"
                         type="primary"
                         icon="el-icon-edit"
                         plain
                         round
                         @click="EditRole(scope.$index)">修改</el-button>
            </template>
          </el-table-column>
          <el-table-column label="用户操作"
                           width=300>
            <template slot-scope="scope">
              <el-button size="mini"
                         type="primary"
                         @click="ViewUserInfo(scope.$index)">查看</el-button>
              <el-button size="mini"
                         type="primary"
                         plain
                         @click="">编辑</el-button>
              <el-button size="mini"
                         type="info"
                         plain
                         @click="DeleteUser(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 角色分配弹框 -->
    <el-dialog title="修改权限"
               :visible.sync="EditRoleDialogVisible"
               @close="CancelEditRole()"
               width="15%">
      <el-row>
        <el-col :span=20
                :offset=2>
          <div v-for="(val, index) in RoleList">
            <el-checkbox v-model="EditRoleInfo[index]">{{val}}</el-checkbox>
            </br>
            </br>
          </div>
          </br>
          <el-button type="primary"
                     @click="AgreeEditRole()"
                     size="mini">确认</el-button>
          <el-button type="primary"
                     @click="CancelEditRole()"
                     size="mini">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 查看用户弹框 -->
    <el-dialog title="个人信息"
               :visible.sync="UserInfoDialogVisible"
               width="30%">
      <p v-for="(val, key) in UserInfo"
         style="padding-left:10px">{{key}}： {{val}}</p>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="UserInfoDialogVisible=false"
                   size="mini">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // ------分配------
      SearchInput: { "name": "", "id": "", "hospital": "", "department": "" },
      UserList: [
        { id: '1', name: '张三', email: 'zhangsan@zju.edu.cn', hospital: '邵逸夫医院', department: '心内科', password: '123', role: [true, false, true] },
        { id: '2', name: '李四', email: 'lisi@zju.edu.cn', hospital: '浙江大学第一附属医院', department: '心内科', password: '321', role: [true, false, false] },
        { id: '3', name: '王五', email: 'wangwu@zju.edu.cn', hospital: '浙江大学附属妇产科医院', department: '超声1科', password: '1234567', role: [true, true, false] }
      ],
      // ---role---
      RoleList: ["院方医生 ", "院方数据维护 ", "角色3"],
      EditRoleInfo: [false, false, false],  // 存储被修改人原始的role，点确定后传入后端（现在是传入总表）
      EditRoleId: "",
      EditRoleDialogVisible: false,
      // ---info---
      UserInfoDialogVisible: false,
      UserInfo: {}
    }
  },
  created() {
    this.CreateRoleText()
  },
  methods: {
    // ------分配------
    // ---role---
    CreateRoleText() { // 该函数在每次从后端那里拿到表后执行。为了动态响应写成了set，其实如果每次拿表应该是不用的
      this.UserList.forEach(item => {
        this.$set(item, "roletext", item.role.map((val, index) => { return val ? this.RoleList[index] : "" }).join(" "))
      });
    },
    EditRole(index) {
      this.EditRoleDialogVisible = true
      this.EditRoleId = this.UserList[index].id
      this.EditRoleInfo = this.UserList[index].role
    },
    AgreeEditRole() {
      // 传EditRoleId和EditRoleInfo给后端，以及修改成功提示
      this.UserList.find(item => item.id == this.EditRoleId).role = this.EditRoleInfo // 这句其实应该是刷新页面，从后端重新拿表
      this.CreateRoleText()
      this.EditRoleDialogVisible = false
    },
    CancelEditRole() {
      this.EditRoleDialogVisible = false
      this.EditRoleId = ""
      this.EditRoleInfo = [false, false, false]
    },
    // ---info---
    ViewUserInfo(index) {
      let MapTable = { 'id': 'id', 'name': '姓名', 'email': '邮箱', 'hospital': '医院', 'department': '科室', 'password': '密码', 'roletext': '角色' }
      for (let key in MapTable) {
        this.UserInfo[MapTable[key]] = this.UserList[index][key]
      }
      this.UserInfoDialogVisible = true
    },
    DeleteUser(index) {
      this.$confirm('是否确认删除该用户？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.UserList.splice(index, 1) // 应该是传消息给后端并刷新列表
      }).catch(() => { })
    }
  }
}
</script>

<style>
@import "~@/assets/AdminInfo/css_admin/css_admin.css";
@import "~@/assets/AdminInfo/css_admin/myIcon/iconfont.css";
.mytd {
  width: 55px;
  font-size: 14px;
}
</style>