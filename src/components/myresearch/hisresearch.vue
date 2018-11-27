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
          <el-card class="box-card"
                   shadow="hover">
            <div slot="header"
                 class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0"
                         type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4"
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
          <el-card class="box-card">
            <div slot="header"
                 class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0"
                         type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4"
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
          <el-card class="box-card">
            <div slot="header"
                 class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0"
                         type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4"
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
          <el-card class="box-card">
            <div slot="header"
                 class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0"
                         type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4"
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
      NewVarVisible:false,
      NewConceptVisible:false,
      NewQueneVisible:false,
      NewMethodVisible:false,

      // 概念集假数据/RH
      conceptsets: [
        {
          id:1,
          label: "文件夹1",
          children: [
            {
              id:3,
              label: "概念集A"
            },
            {
              id:4,
              label: "概念集B"
            }
          ]
        },
        {
          id:2,
          label: "文件夹2",
          children: [
            {
              id:5,
              label: "概念集C"
            }
          ]
        }
      ],
      // 队列集假数据/RH
      queuesets: [
        {
          label: "文件夹1",
          children: [
            {
              label: "队列A"
            },
            {
              label: "队列B"
            }
          ]
        },
        {
          label: "文件夹2",
          children: [
            {
              label: "队列C"
            }
          ]
        }
      ],
      // 分析数据假数据/RH
      analysismethods: [
        {
          label: "回归",
          children: [
            {
              label: "SVM"
            },
            {
              label: "RF"
            }
          ]
        },
        {
          label: "分类",
          children: [
            {
              label: "模型A"
            },
            {
              label: "模型B"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
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

      // renderContent(h, { node, data, store }) {
      //   return (
      //     <span>
      //       <span>
      //         <span>{node.label}</span>
      //       </span>
      //       <span style="float: right; margin-left: 50px">
      //       <i class="el-icon-plus" on-click={ () => this.append(store, data) }></i>
      //       <i class="el-icon-delete" on-click={ () => this.remove(store, data) }></i>
      //       </span>
      //     </span>);
      // }

  },
  toHisresearch (){
    
  }
};
</script>
<style>
</style>