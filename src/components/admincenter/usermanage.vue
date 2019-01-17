<template>
  <div>
    <!-- 选择框 -->
    <el-row style="margin-top:15px">
      <el-col :span=5
              :offset=18>
        <el-radio-group v-model="OptionValue"
                        fill="#909399"
                        size="medium">
          <el-radio-button v-for="item in options"
                           :key="item.OptionValue"
                           :label="item.OptionValue">{{item.label}}</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <!-- 审核 -->
    <!--（“同意”、“拒绝”按钮如果用el-col，随着屏幕变窄el-col的宽度也会变窄，两个按钮就会重叠，
        因此需要把按钮和input放在同一行，所以使用表格(否则按钮和input会自动换行)。用el的表格会有无法居中的问题，所以用普通表格） -->
    <div v-if="OptionValue==0">
      <el-row style="margin-top:15px. margin-buttom:10px">
        <el-col :span=5
                :offset=1>
          <div class="SubTitle"><i class="myIcon-tongji"></i> 待审核</div>
        </el-col>
      </el-row>
      <el-row v-for="(val, index) in ApplyList"
              type="flex"
              align="middle"
              style="margin-top:20px"
              :key="index">
        <el-col :span=6
                :offset=1>
          <el-alert type="info"
                    :closable="false"
                    :title="val.message"
                    v-on:click.native="GoToReview(index)"></el-alert>
        </el-col>
        <el-col :span=8
                :offset=1>
          <td>
            <el-button type="primary"
                       @click="AgreeReview(index)">同意</el-button>
            <el-button type="primary"
                       @click="RejectReview(index)"
                       style="margin-right:10px">拒绝</el-button>
          </td>
          <td>
            <el-input v-model="RejectReason"
                      placeholder="请输入拒绝原因"></el-input>
          </td>
        </el-col>
      </el-row>
    </div>
    <!-- 审核弹框 -->
    <el-dialog title="审核详情"
               :visible.sync="ReviewDialogVisible"
               width="30%">
      <el-row>
        <el-col :span=12
                :offset=6>
          <p v-for="(val, key) in ApplyList[ApplyNumber].applyinfo">{{key}}： {{val}}</p>
          <img v-if="ApplyList[ApplyNumber].applytype != 0"
               :src="ApplyList[ApplyNumber].url"
               style="width:60px; height:60px; padding-left:0">
          </br>
          </br>
          <el-button type="primary"
                     @click="AgreeReview(ApplyNumber)">同意</el-button>
          <el-button type="primary"
                     @click="RejectReview(ApplyNumber)"
                     style="margin-right:10px">拒绝</el-button>
          </br>
          </br>
          <el-input v-model="RejectReason"
                    placeholder="请输入拒绝原因"></el-input>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 分配 -->
    <div v-if="OptionValue==1">
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
    </div>
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
      // ------下拉框------
      options: [{ OptionValue: 0, label: '审核' }, { OptionValue: 1, label: '分配' }],
      OptionValue: 0,
      // ------审核------
      ApplyList: [
        {          'applytype': 0,
          'applyinfo': { '申请类别': '注册申请', '申请人': '张三', '邮箱': 'xxxx@zju.edu.cn', '所属医院': '浙江省xxxx医院', '科室': '外科', '注册角色': '院方医生', '提交日期': '2018年10月29日' },
          'message': '张三提出了平台注册申请，点击查看详情。'        },
        {          'applytype': 1,
          'applyinfo': { '申请类别': '伦理通过申请', '申请人': '张三', '邮箱': 'xxxx@zju.edu.cn', '所属医院': '浙江省xxxx医院', '科室': '外科', '项目名称': '肾病管理项目', '项目发起人': '李四', '提交日期': '2018年10月29日' },
          'message': '肾病管理项目团队张三提交了团队伦理资料，点击查看详情。',
          'url': '../../../static/AdminInfo/EthicsPass.png'        },
        {          'applytype': 2,
          'applyinfo': { '申请类别': '队列使用申请', '项目发起人': '李四', '邮箱': 'xxxx@zju.edu.cn', '所属医院': '浙江省xxxx医院', '科室': '外科', '项目名称': '肾病管理项目', '提交日期': '2018年10月29日' },
          'message': '肾病管理项目团队发起人李四向您提出了队列使用申请，点击查看详情。',
          'url': '../../../static/AdminInfo/UseQueue.png'        }
      ],   // (这里URL放到static的原因是，assets里的url不能动态加载（路径会错）,即assets一般放自己的东西，static一般放别人的)
      RejectReason: "",
      ReviewDialogVisible: false,
      ApplyNumber: 0,
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
    // ------审核------
    AgreeReview(index) {
      this.ReviewDialogVisible = false
      // 传消息给后端，以及审核成功提示
    },
    RejectReview(index) {
      if (this.RejectReason == "") {
        this.$alert('请输入拒绝原因', '提示', { confirmButtonText: '确定' });
      }
      else {
        this.ReviewDialogVisible = false
        // 传消息给后端，以及审核成功提示
      }
    },
    GoToReview(index) {
      this.ReviewDialogVisible = true
      this.ApplyNumber = index
    },

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
      // 传消息给后端，以及修改成功提示
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
@import "../../assets/AdminInfo/css_admin/css_admin.css";
@import "../../assets/AdminInfo/css_admin/myIcon/iconfont.css";
.mytd {
  width: 55px;
  font-size: 14px;
}
</style>