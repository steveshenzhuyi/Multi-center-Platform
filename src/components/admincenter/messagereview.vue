<template>
  <div>
    <br>
    <!-- 审核 -->
    <!--（“同意”、“拒绝”按钮如果用el-col，随着屏幕变窄el-col的宽度也会变窄，两个按钮就会重叠，
        因此需要把按钮和input放在同一行，所以使用表格(否则按钮和input会自动换行)。用el的表格会有无法居中的问题，所以用普通表格） -->
    <el-row style="margin-top:15px. margin-buttom:10px">
      <el-col :span=5
              :offset=4>
        <div class="SubTitle"><i class="myIcon-tongji"></i> 待审核</div>
      </el-col>
    </el-row>
    <el-row v-for="(val, index) in ApplyList"
            type="flex"
            align="middle"
            style="margin-top:20px"
            :key="index">
      <el-col :span=6
              :offset=4>
        <el-alert type="info"
                  :closable="false"
                  :title="val.message"
                  v-on:click.native="GoToReview(index)"></el-alert>
      </el-col>
      <el-col :span=8
              :offset=1>
        <td>
          <el-button type="primary"
                     icon="el-icon-success"
                     size="medium"
                     @click="AgreeReview(index)">同意</el-button>
          <el-button type="info"
                     icon="el-icon-error"
                     @click="RejectReview(index)"
                     size="medium"
                     style="margin-right:10px">拒绝</el-button>
        </td>
        <td>
          <el-input v-model="RejectReason"
                    placeholder="请输入拒绝原因"></el-input>
        </td>
      </el-col>
    </el-row>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      ApplyNumber: 0
    }
  },
  methods: {
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
  }
}
</script>

<style>
@import "~@/assets/AdminInfo/css_admin/css_admin.css";
@import "~@/assets/AdminInfo/css_admin/myIcon/iconfont.css";
</style>