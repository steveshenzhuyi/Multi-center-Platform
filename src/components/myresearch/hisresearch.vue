<template>
  <div>
    <el-row style="margin-top:10px;margin-bottom:10px;">
      <el-col :span="4"
              style="text-align:center">
        <el-col :span="12"
                style="">
          <el-button type="primary">我的研究</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="primary"
                     @click="toHisresearch">历史研究</el-button>
        </el-col>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="6">

        <!-- 概念集模块/RH -->
        <el-row>
          <el-card id="newresearch"
                   class="box-card"
                   shadow="hover">
            <span class="el-icon-plus"></span>
          </el-card>

        </el-row>
      </el-col>

      <el-col :span="6">
        <!-- 构建模块/RH -->
        <el-row>
          <el-card class="box-card"
                   shadow="hover">
            <div slot="header"
                 class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0"
                         type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 3"
                 :key="o"
                 class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
        </el-row>
      </el-col>

      <el-col :span="6">
        <!-- 构建模块/RH -->
        <el-row>
          <el-card class="box-card"
                   shadow="hover">
            <div slot="header"
                 class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0"
                         type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 3"
                 :key="o"
                 class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="6">

        <!-- 构建模块/RH -->
        <el-row>
          <el-card class="box-card"
                   shadow="hover">
            <div slot="header"
                 class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0"
                         type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 3"
                 :key="o"
                 class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
        </el-row>
      </el-col>

    </el-row>
  </div>
</template>
<script>
let id = 1000;

export default {
  data() {
    return {
      NewVarVisible: false,
      NewConceptVisible: false,
      NewQueneVisible: false,
      NewMethodVisible: false,
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    handleNodeClick(data) {
      // console.log(data);
    },
    append(store, data) {
      store.append({ id: id++, label: 'testtest', children: [] }, data);
    },

    remove(store, data) {
      store.remove(data);
    },
  },
  toHisresearch() {

  }
};
</script>
<style>
#newresearch {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  font-size: 80px;
  color: dimgrey;
  width: 396.75px;
  height: 161px;
}
</style>