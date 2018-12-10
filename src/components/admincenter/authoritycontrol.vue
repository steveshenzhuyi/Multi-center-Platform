<template>
  <div>
    <!-- 选择框 -->
    <el-row style="margin-top:20px;margin-bottom:10px">
      <el-col :span=5
              :offset=5>
        <el-select v-model="OptionValue">
          <el-option v-for="item in options"
                     :key="item.OptionValue"
                     :label="item.label"
                     :value="item.OptionValue"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <!-- 审核 -->
    <!--（“同意”、“拒绝”按钮如果用el-col，随着屏幕变窄el-col的宽度也会变窄，两个按钮就会重叠，
        因此需要把按钮和input放在同一行，所以使用表单(否则按钮和input会自动换行)。用el的表单会有无法居中的问题，所以用普通表单） -->
    <div v-if="OptionValue==0">
      <el-row style="margin-top:20px;margin-bottom:10px">
        <el-col :span=5
                :offset=1>
          <div class="SubTitle"><i class="myIcon-tongji"></i> 待审核</div>
        </el-col>
      </el-row>
      <el-row v-for="(val, index) in ApplyList"
              type="flex"
              align="middle"
              style="margin-top:20px;margin-bottom:10px"
              :key="index">
        <el-col :span=6
                :offset=1>
          <el-alert type="info"
                    :closable="false"
                    :title=val.message
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
               :src=ApplyList[ApplyNumber].url
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
      <el-row style="margin-top:20px;margin-bottom:10px">
        <el-col :span=4
                :offset=1>
          <el-input placeholder="请输入姓名/邮箱搜索"
                    prefix-icon="el-icon-search"
                    v-model="SearchInput"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top:10px;margin-bottom:10px">
        <el-col :span=24
                :offset=1>
          <el-table :data="DistributionList"
                    style="width:70%"
                    stripe
                    border>
            <el-table-column prop="name"
                             label="姓名"
                             width="100"></el-table-column>
            <el-table-column prop="email"
                             label="邮箱"
                             width="200"></el-table-column>
            <el-table-column prop="hospital"
                             label="医院"
                             width="200"></el-table-column>
            <el-table-column prop="department"
                             label="科室"
                             width="120"></el-table-column>
            <el-table-column prop="RoleText"
                             label="角色"
                             width="200"></el-table-column>
            <el-table-column label="修改权限">
              <template slot-scope="scope">
                <el-button size="mini"
                           type="primary"
                           @click="GoToModify(scope.$index)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <!-- 分配弹框 -->
    <el-dialog title="修改权限"
               :visible.sync="ModifyDialogVisible"
               width="15%">
      <el-row>
        <el-col :span=20
                :offset=2>
          <div v-for="(val, index) in RoleList">
            <el-checkbox v-model=CheckedRole[ModifyNumber][index]>{{val}}</el-checkbox>
            </br>
            </br>
          </div>
          </br>
          <el-button type="primary"
                     @click="AgreeModify()"
                     size="mini">确认</el-button>
          <el-button type="primary"
                     @click="CancelModify()"
                     size="mini">取消</el-button>
        </el-col>
      </el-row>
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
      SearchInput: "",
      DistributionList: [
        { name: '张三', email: 'zhangsan@zju.edu.cn', hospital: '邵逸夫医院', department: '心内科', role: [true, false, true], RoleText: '' },
        { name: '李四', email: 'lisi@zju.edu.cn', hospital: '浙江大学第一附属医院', department: '心内科', role: [true, false, false], RoleText: '' },
        { name: '王五', email: 'wangwu@zju.edu.cn', hospital: '浙江大学附属妇产科医院', department: '超声1科', role: [true, true, false], RoleText: '' }
      ],
      RoleList: ["院方医生 ", "院方数据维护 ", "角色3"],
      CheckedRole: [[false, false, false]],  // 存储每个人的role，作为多选框的数据源，点确定后会被传入DistributionList
      ModifyDialogVisible: false,
      ModifyNumber: 0
    }
  },
  mounted() {
    this.init()
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
    CreateRoleText_CheckedRole() {
      this.CheckedRole = []
      for (var i = 0; i < this.DistributionList.length; i++) {
        var thisrole = this.DistributionList[i].role
        var thistext = ((thisrole[0] ? this.RoleList[0] : "").concat(thisrole[1] ? this.RoleList[1] : "")).concat(thisrole[2] ? this.RoleList[2] : "")
        // 此处只能用concat()，不能用+，原因未知
        this.DistributionList[i].RoleText = thistext
        this.CheckedRole.push(this.MyDeepCopy(thisrole))
      }
    },
    GoToModify(index) {
      this.ModifyDialogVisible = true
      this.ModifyNumber = index
    },
    AgreeModify() {
      // 传消息给后端，以及修改成功提示
      this.DistributionList[this.ModifyNumber].role = this.CheckedRole[this.ModifyNumber]
      this.CreateRoleText_CheckedRole()
      this.ModifyDialogVisible = false
    },
    CancelModify() {
      this.CreateRoleText_CheckedRole()
      this.ModifyDialogVisible = false
    },
    MyDeepCopy(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    // ------初始化页面------
    init() {
      this.CreateRoleText_CheckedRole()
      // this.$alert(this.CheckedRole)
    }
  }
}
</script>

<style>
@import "../../assets/AdminInfo/css_admin/css_admin.css";
@import "../../assets/AdminInfo/css_admin/myIcon/iconfont.css";
</style>