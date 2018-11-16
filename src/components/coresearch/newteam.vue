<template>
    <div>
        <el-row style="margin-top:30px;margin-bottom:10px">
            <el-col :span="24">
                <el-steps :active="1" align-center>
                    <el-step title="1 研究开始"></el-step>
                    <el-step title="2 团队建立"></el-step>
                    <el-step title="3 资格审核"></el-step>
                    <el-step title="4 多功能运算"></el-step>
                </el-steps>
            </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="5" >
                <el-row > 
                    <el-card class="box-card">
                        <div >邀请码</div>
                    </el-card>
                </el-row>
                <el-row type="flex" justify="center" style="margin-top:30px;margin-bottom:10px">
                    <el-col :span="16" >
                        <div>生产邀请码个数：</div>
                    </el-col>
                    <el-col :span="8">
                        <div>
                            <el-input 
                            size="small"  
                            v-model="input1">
                            </el-input>
                        </div>
                    </el-col>
                </el-row>
                   
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>团队信息</span>
                        </div>
                    </el-card>   
                </el-row>                        
            </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top:10px;margin-bottom:10px">
            <el-col :span="5" offset="7">
                <el-button type="info" >生成</el-button>
            </el-col>
            <el-col :span="12" offset="7">
                <el-button type="info" >构建团队</el-button>
            </el-col>
        </el-row>
        
    </div>
</template>
<script>
  export default {
    data() {
      return {
        
      }
    },
    methods: {
    }
  };
</script>
<style>
  .box-card {
    height: 400px;
  }
</style>