<template>
  <div>
    <el-row :gutter=30
            style="margin-top:40px;margin-bottom:10px">
      <!-- 图片+团队 -->
      <el-col :span=5
              :offset=1>
        <div><img src="../../assets/AdminInfo/UserPhoto.png"
               style="width:100%; height:auto; padding:0; margin:0"></div>
        <br>
        <br>
        <div class="SubTitle"><i class="myIcon-qunzu"></i> 团队</div>
        <div>
          <ul>
            <li v-for="(val, index) in team"
                @click="GoToTeam(index)">{{val}}</li>
          </ul>
        </div>
      </el-col>
      <!-- 个人信息+重置密码 -->
      <el-col :span=6>
        <div class="SubTitle"><i class="myIcon-yonghu"></i> 个人信息</div>
        <br>
        <p v-for="(val, key) in UserInfo"
           style="padding-left:10px">{{key}}： {{val}}</p>
        <br>
        <br>
        <div style="margin-left:18%">
          <el-button type="primary"
                     @click="ResetPassword()">重置密码</el-button>
        </div>
      </el-col>
      <!-- 通知 -->
      <el-col :span=6>
        <div class="SubTitle"><i class="myIcon-xinxi"></i> 通知-研究</div>
        </br>
        <div v-for="(val, index) in notice_research">
          <el-alert :title=val.content
                    :type='val.flag_NR==1?"success":"warning"'
                    show-icon
                    @close="CloseNotice(index,0)"
                    v-on:click.native="GoToNotice(index,0)">
          </el-alert>
          </br>
        </div>
        </br>
        </br>
        <div class="SubTitle"><i class="myIcon-xinxi"></i> 通知-审核</div>
        </br>
        <div v-for="(val, index) in notice_review">
          <el-alert :title=val.content
                    type="info"
                    show-icon
                    @close="CloseNotice(index,1)"
                    v-on:click.native="GoToNotice(index,1)"></el-alert>
          </br>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      team: ["糖尿病预测分析（6）", "肾病管理项目（3）"],
      UserInfo: {        '用户名': 'lion',
        '姓名': '张三',
        '所属医院': '浙江省xxxxxx医院',
        '所属科室': '心内科',
        '用户角色': '院方医生',
        '邮箱': 'xxxxxxx@zju.edu.cn'      },
      notice_research: [{ 'content': 'xxx团队已构建成功，点击上传审核资料。', 'flag_NR': 1 },
      { 'content': '您的伦理资料审核未通过，点击查看原因', 'flag_NR': -1 }],
      notice_review: [{ 'content': 'xxx团队发起人xxx向您提出了队列使用申请，点击此处查看审批。' }]
    }
  },
  methods: {
    ResetPassword() {
      // 进入重置密码页面
    },
    GoToTeam(index) {
      // 跳转至该团队界面
      this.$notify({ title: '提示', message: '将跳转至团队' + index })
    },
    CloseNotice(index, category) {
      // category 0为research通知，1为review通知；index为是第几个
      // 在通知列表中关掉该通知
    },
    GoToNotice(index, category) {
      // 参数意义同上
      //跳至该通知界面
      this.$notify({ title: '提示', message: '跳转页面' })
    }
  }
}
</script>

<style>
@import "../../assets/AdminInfo/css_admin/css_admin.css";
@import "../../assets/AdminInfo/css_admin/myIcon/iconfont.css";
</style>