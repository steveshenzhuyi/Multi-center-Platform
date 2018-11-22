<template>
    <div>
        <el-row type="flex" justify="center" style="margin-top:30px;margin-bottom:10px">
            <el-col :span="2" >
                <div>研究名称</div>
            </el-col>
            <el-col :span="10">
                <div>
                    <el-input 
                    size="small" 
                    placeholder="空白等待输入" 
                    v-model="input1">
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top:30px;margin-bottom:10px">
            <el-col :span="2" >
                <div>研究介绍</div>
            </el-col>
            <el-col :span="10">
                <div>
                    <el-input
                    type="textarea"
                    rows="5" 
                    size="small" 
                    placeholder="空白等待输入" 
                    v-model="input2">
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top:30px;margin-bottom:10px">
            <el-col :span="2" >
                <div>团队成员</div>
            </el-col>
            <el-col :span="10">
                <div>
                    <el-input
                    class="input-with-cascader" 
                    size="small" 
                    placeholder="姓名" 
                    v-model="input3">
                        <el-cascader size="small" expand-trigger="hover" :options="options" v-model="select1" slot="prepend" placeholder="医院/科室">
                        </el-cascader>

                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top:30px;margin-bottom:10px">
            <el-col :span="2" >
                <div>成果分配</div>
            </el-col>
            <el-col :span="10">
                <div>
                    <el-input 
                    size="small" 
                    placeholder="空白等待输入" 
                    v-model="input1">
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top:30px;margin-bottom:10px">
            <el-col :span="2" >
                <div>研究协议</div>
            </el-col>
            <el-col :span="10">
                <div>
                    <el-checkbox v-model="checked">我同意接收研究发起人相关协议</el-checkbox>
                    <el-button type="text" @click="messagebox()">阅读协议</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top:30px;margin-bottom:10px">
            <el-col :span="6">
                <el-button type="info" :disabled="!this.checked" @click="tonewteam()">创建研究</el-button>
            </el-col>
            <el-col :span="6">
                <el-button type="info" >取消创建</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
      return {
        checked: false,
        options: [{
          value: '1',
          label: '浙一',
          children: [{
            value: '1-1',
            label: '内科',
          }, {
            value: '1-2',
            label: '外科',
          }]
        }, {
          value: '2',
          label: '浙二',
          children: [{
            value: '2-1',
            label: '内科',
            }]
        }]
      }
    },
    methods: {
      messagebox() {
        this.$alert('协议内容', '协议', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
      tonewteam() {
        this.$router.push({path: 'newteam'})
      }
    }
}
</script>


<style>
  .el-cascader .el-input {
    width: 300px;
  }
  
</style>