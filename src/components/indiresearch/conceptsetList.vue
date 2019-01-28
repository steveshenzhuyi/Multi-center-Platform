<template>
  <div>
    <el-row style="margin-top:10px;margin-bottom:20px">
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
        <el-table :data="conceptSetList"
                  border
                  stripe
                  height="500"
                  valign="center"
                  style="width: 100%">
          <el-table-column prop="setName"
                           align="center"
                           label="概念集名称"
                           min-width="18%">
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
                           min-width="42%">
            <template slot-scope="scope">
              <!--<el-button-group>
                <el-button type="primary"
                           plain
                           size="small"
                           icon="el-icon-check">选择</el-button>
                <el-button type="primary"
                           plain
                           size="small"
                           icon="el-icon-view">查看</el-button>
                <el-button type="primary"
                           plain
                           size="small"
                           icon="el-icon-edit">编辑</el-button>
                <el-button type="primary"
                           plain
                           size="small"
                           icon="el-icon-delete">删除</el-button>
              </el-button-group>-->
              <el-button @click="handleClick(scope.row)"
                         type="text"
                         size="small">选择</el-button>
              <el-button type="text"
                         size="small"
                         @click="viewGetConceptSetId(scope.row)">查看</el-button>
              <el-button type="text"
                         size="small"
                         @click="editGetConceptSetId(scope.row)">编辑</el-button>
              <el-button type="text"
                         size="small"
                         @click.native.prevent="deleteRow(scope.$index, conceptSetList)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!--新增概念集 by lqh—-->
    <el-dialog title="新增概念集"
               :visible.sync="createConceptVisible"
               v-if="createConceptVisible"
               width="60%"
               :before-close="handleClose"
               append-to-body>
      <component :is="mycreateconceptset"
                 @createConceptVisible="changeCreateVisible"></component>
    </el-dialog>
    <!--编辑概念集 by lqh—-->
    <el-dialog title="编辑概念集"
               :visible.sync="editConceptVisible"
               v-if="editConceptVisible"
               width="60%"
               :before-close="handleClose"
               append-to-body>
      <component :is="mycreateconceptset"
                 :existConceptSetId="existConceptSetId"
                 @editConceptVisible="changeEditVisible"></component>
    </el-dialog>
    <!--查看概念集 by lqh—-->
    <el-dialog title="查看概念集"
               :visible.sync="viewConceptVisible"
               v-if="viewConceptVisible"
               width="60%"
               :before-close="handleClose"
               append-to-body>
      <component :is="mycreateconceptset"
                 :existConceptSetId="existConceptSetId"
                 :isReadOnly="isReadOnly"
                 @viewConceptVisible="changeViewVisible"></component>
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
      conceptSetDialogName: '新增概念集',
      concepts: [],
      concept_exist: false,
      existConceptSetId: '',
      createConceptVisible: false,
      editConceptVisible: false,
      viewConceptVisible: false,
      isReadOnly: false,
      conceptSetList: []
    };
  },
  mounted() {
    this.getConceptSetId();
  },
  methods: {
    getConceptSetId() {
      axios.get('/conceptSet/getConceptSetList', {
        params: {
          "token": this.GLOBAL.token,
        },
      })
        .then((response) => {
          const getData = response.data.data
          for (var i = 0; i < getData.length; i++) {
            const CONCEPTSETID = parseInt(getData[i].CONCEPTSETID)
            this.conceptSetList.push({
              id: CONCEPTSETID.toString(),
              setName: getData[i].NAME,
              setDescription: getData[i].DESCRIPTION == 'null' ? '无' : getData[i].DESCRIPTION,
              lastUpdateTime: getData[i].INPUTDATE.split('T')[0]
            })
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    handleClick(row) {
      this.$emit('getConceptSetId', row.id)
      this.$emit('getVisible', false)
      this.existConceptSetId = row.id
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    viewGetConceptSetId(row) {
      this.conceptSetDialogName = "查看概念集"
      this.viewConceptVisible = true
      this.existConceptSetId = row.id
      this.isReadOnly = true
    },
    editGetConceptSetId(row) {
      this.conceptSetDialogName = "编辑概念集"
      this.editConceptVisible = true
      this.existConceptSetId = row.id
    },
    //删除某条概念集
    deleteRow(index, rows) {
      axios.post('/conceptSet/delete?token=' + this.GLOBAL.token + '&conceptSetId=' + rows.id)
        .then(response => {
          if (response.data.code == 0) {
            this.$message.success("删除成功！")
          }
        })
      rows.splice(index, 1);
    },
    changeCreateVisible(val) {
      this.createConceptVisible = val
    },
    changeEditVisible(val) {
      this.editConceptVisible = val
    },
    changeViewVisible(val) {
      this.viewConceptVisible = val
    }
  }
};
</script>