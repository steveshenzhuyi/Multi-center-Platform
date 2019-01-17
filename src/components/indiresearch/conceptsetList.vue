<template>
  <div>
    <!--<el-button type="text"
               @click="dialogVisible = true">点击打开 Dialog</el-button>

    <el-dialog title="概念集列表"
               :visible.sync="dialogVisible"
               width="60%"
               :before-close="handleClose">-->
    <el-row style="margin-top:10px;margin-bottom:10px">
      <el-col :span="2"
              :offset="18">
        <el-button type="primary"
                   size="medium"
                   @click="createConceptVisible = true">新增</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top:10px;margin-bottom:10px"
            type="flex"
            justify="center">
      <el-col :span="16">
        <el-table :data="conceptsetList"
                  border
                  stripe
                  valign="center"
                  style="width: 100%">
          <el-table-column prop="setName"
                           align="center"
                           label="概念集名称"
                           min-width="20%">
          </el-table-column>
          <el-table-column prop="setDescription"
                           align="center"
                           label="概念集描述"
                           min-width="20%">
          </el-table-column>
          <el-table-column prop="lastUpdateTime"
                           align="center"
                           label="最后一次更新时间"
                           min-width="20%">
          </el-table-column>
          <el-table-column label="操作"
                           align="center"
                           min-width="40%">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)"
                         type="text"
                         size="small">选择</el-button>
              <el-button type="text"
                         size="small"
                         @click="getConceptSetId(scope.row)">查看</el-button>
              <el-button type="text"
                         size="small"
                         @click="getConceptSetId(scope.row)">编辑</el-button>
              <el-button type="text"
                         size="small"
                         @click.native.prevent="deleteRow(scope.$index, conceptsetList)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!--<span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>-->
    <!--新增概念集 by lqh—-->
    <el-dialog title="新增概念集"
               :visible.sync="createConceptVisible"
               width="60%"
               :before-close="handleClose"
               append-to-body>
      <component :is="mycreateconceptset"
                 @createConceptVisible="changeCreateVisible"></component>
    </el-dialog>
    <!--编辑概念集 by lqh—-->
    <el-dialog title="编辑概念集"
               :visible.sync="editConceptVisible"
               width="60%"
               :before-close="handleClose"
               append-to-body>
      <component :is="mycreateconceptset"
                 :existConceptSetId="existConceptSetId"
                 @editConceptVisible="changeEditVisible"></component>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import createconceptset from './createconceptset/createconceptset.vue';
export default {
  components: {
    'createconceptset': createconceptset
  },
  data() {
    return {
      mycreateconceptset: createconceptset,
      concepts: [],
      concept_exist: false,
      existConceptSetId: '',
      createConceptVisible: false,
      editConceptVisible: false,
      conceptsetList: [{
        id: 1,
        setName: '糖尿病',
        setDescription: '二型',
        lastUpdateTime: '2019-01-01',
      }, {
        id: 2,
        setName: '高血压',
        setDescription: '原发性',
        lastUpdateTime: '2019-01-02',
      }, {
        id: 3,
        setName: '药',
        setDescription: '药不能停',
        lastUpdateTime: '2019-01-03',
      }]
    };
  },
  methods: {
    handleClick(row) {
      this.$emit('getConceptSetId', row.setName)
      this.$emit('getVisible', false)
      console.log(row);
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    getConceptSetId(row) {
      console.log(row)
      this.editConceptVisible = true;
      this.existConceptSetId = row.id
      console.log(this.existConceptSetId)
    },
    //删除某条概念集
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    changeCreateVisible(val) {
      this.createConceptVisible = val
    },
    changeEditVisible(val) {
      this.editConceptVisible = val
    }
  }
};
</script>