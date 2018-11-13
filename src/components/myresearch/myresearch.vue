<template>
    <div>
        <el-row style="margin-top:10px;margin-bottom:10px">
            <el-col :span="4">
                <el-col :span="12">
                <el-button type="info">我的研究</el-button>
                </el-col>
                <el-col :span="12">
                <el-button type="info">历史研究</el-button>
                </el-col>
            </el-col>
            <el-col :span="20">
                <el-steps :active="2" align-center>
                    <el-step title="1 队列选择"></el-step>
                    <el-step title="2 数据模型"></el-step>
                    <el-step title="3 预测结果"></el-step>
                    <el-step title=""></el-step>
                </el-steps>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6" >
                <el-row > 
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>概念集</span>
                        </div>
                        <el-tree :data="conceptsets" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                    </el-card>
                </el-row>
                <el-row>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>队列</span>
                        </div>
                        <el-tree :data="queuesets" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                    </el-card>
                </el-row>
                <el-row>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>分析方法</span>
                        </div>
                        <el-tree :data="analysismethods" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                    </el-card>
                </el-row>
            </el-col>
            <el-col :span="18">
                <el-row>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>构建</span>
                        </div>
                        <el-table
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                            prop="date"
                            label="队列"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="分析方法">
                        </el-table-column>
                        </el-table>
                    </el-card>
                </el-row>
                <el-row>
                    <el-card class="box-card" style="height:100%">
                        <div slot="header" class="clearfix" >
                            <span>分析结果</span>
                        </div>

                    </el-card>   
                </el-row>                        
            </el-col>
        </el-row>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        conceptsets: [{
          label: '文件夹1',
          children: [{
            label: '概念集A',
          },
          {
            label: '概念集B',
          }]
        }, {
          label: '文件夹2',
          children: [{
            label: '概念集C',
          }]
        }],
        queuesets: [{
          label: '文件夹1',
          children: [{
            label: '队列A',
          },{
            label: '队列B',
          }]
        }, {
          label: '文件夹2',
          children: [{
            label: '队列C',
          }]
        }],
        analysismethods: [{
          label: '回归',
          children: [{
            label: 'SVM',
          },
          {
            label: 'RF',
          }]
        }, {
          label: '分类',
          children: [{
            label: '模型A',
          }, {
            label: '模型B',
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      }
    }
  };
</script>
<style>
</style>