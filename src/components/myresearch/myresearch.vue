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
                     @click="toHisresearch()">历史研究</el-button>
        </el-col>
      </el-col>
      <el-col :span="18">
        <el-steps :active="2"
                  align-center>
          <el-step title="1 队列选择"></el-step>
          <el-step title="2 数据模型"></el-step>
          <el-step title="3 预测结果"></el-step>
          <el-step title=""></el-step>
        </el-steps>

      </el-col>
      <el-col :span="2">
        <el-button type="primary"
                   @click="NewVarVisible=true">新增变量</el-button>
        <el-dialog title="新建变量"
                   :visible.sync="NewVarVisible"
                   width="30%"
                   :before-close="handleClose">
          <span>这是一段新建变量</span>
          <span slot="footer"
                class="dialog-footer">
            <el-button @click="NewVarVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="NewVarVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">

        <!-- 概念集模块/RH -->
        <el-row>
          <el-card class="box-card"
                   style="text-align:center;font-size:13px;">
            <div slot="header"
                 style="height:12px;"
                 class="clearfix">
              <span>概念集</span>
            </div>

            <el-tree :data="conceptsets"
                     :props="defaultProps"
                     @node-click="handleNodeClick"
                     default-expand-all
                     node-key="id"></el-tree>
            <el-button style="margin-bottom:5px;margin-top:5px"
                       type="primary"
                       @click="NewConceptVisible=true">新建</el-button>
            <el-dialog title="新建概念集"
                       :visible.sync="NewConceptVisible"
                       width="30%"
                       :before-close="handleClose">
              <span>这是一段新建概念集</span>
              <span slot="footer"
                    class="dialog-footer">
                <el-button @click="NewConceptVisible = false">取 消</el-button>
                <el-button type="primary"
                           @click="NewConceptVisible = false">确 定</el-button>
              </span>
            </el-dialog>
          </el-card>
        </el-row>

        <!-- 队列模块/RH -->
        <el-row>
          <el-card class="box-card"
                   style="text-align:center;font-size:13px;">
            <div slot="header"
                 style="height:12px;"
                 class="clearfix">
              <span>队列</span>
            </div>
            <el-tree :data="queuesets"
                     :props="defaultProps"
                     @node-click="handleNodeClick"
                     default-expand-all></el-tree>
            <el-button style="margin-bottom:5px;margin-top:5px"
                       type="primary"
                       @click="NewQueneVisible=true">新建</el-button>
            <el-dialog title="新建队列"
                       :visible.sync="NewQueneVisible"
                       width="30%"
                       :before-close="handleClose">
              <span>这是一段新建队列</span>
              <span slot="footer"
                    class="dialog-footer">
                <el-button @click="NewQueneVisible = false">取 消</el-button>
                <el-button type="primary"
                           @click="NewQueneVisible = false">确 定</el-button>
              </span>
            </el-dialog>

          </el-card>
        </el-row>

        <!-- 分析模块/RH -->
        <el-row>
          <el-card class="box-card"
                   style="text-align:center;font-size:13px;">
            <div slot="header"
                 style="height:12px;"
                 class="clearfix">
              <span>分析方法</span>
            </div>
            <el-tree :data="analysismethods"
                     :props="defaultProps"
                     @node-click="handleNodeClick"
                     default-expand-all></el-tree>
            <el-button style="margin-bottom:5px;margin-top:5px"
                       type="primary"
                       @click="NewMethodVisible=true">新建</el-button>
            <el-dialog title="新建方法"
                       :visible.sync="NewMethodVisible"
                       width="30%"
                       :before-close="handleClose">
              <span>这是一段新建方法</span>
              <span slot="footer"
                    class="dialog-footer">
                <el-button @click="NewMethodVisible = false">取 消</el-button>
                <el-button type="primary"
                           @click="NewMethodVisible = false">确 定</el-button>
              </span>
            </el-dialog>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="18">

        <!-- 构建模块/RH -->
        <el-row>
          <el-card class="box-card">
            <div slot="header"
                 style="height:12px;font-size:13px;"
                 class="clearfix">
              <span>构建</span>
            </div>
            <el-table :data="tableData"
                      style="width: 100%">
              <el-table-column prop="quene"
                               label="队列"
                               width="180">
              </el-table-column>
              <el-table-column prop="method"
                               label="分析方法">
              </el-table-column>
            </el-table>
            <el-button style="float:right;margin-bottom:5px;margin-top:5px"
                       type="primary">计算 </el-button>

          </el-card>
        </el-row>

        <!-- 分析结果模块/RH -->
        <el-row>
          <el-card class="box-card"
                   style="height:100%">
            <div slot="header"
                 style="height:12px;font-size:13px;"
                 class="clearfix">
              <span>分析结果</span>
            </div>
            <el-button style="float:right;margin-bottom:5px;margin-top:5px"
                       type="primary">保存</el-button>
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
      tableData: [{
        quene: '队列A',
        method: 'SVM',
      }, {
        quene: '队列B',
        method: 'RF',
      }],
      // 概念集假数据/RH
      conceptsets: [
        {
          id: 1,
          label: "文件夹1",
          children: [
            {
              id: 3,
              label: "概念集A"
            },
            {
              id: 4,
              label: "概念集B"
            }
          ]
        },
        {
          id: 2,
          label: "文件夹2",
          children: [
            {
              id: 5,
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
    toHisresearch: function () {
      console.log(1)

      this.$router.push({ path: "/hisresearch" });
    }
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

};
</script>
<style>
</style>