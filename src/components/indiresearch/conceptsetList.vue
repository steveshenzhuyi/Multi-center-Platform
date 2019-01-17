<template>
  <div>
    <el-button type="text"
               @click="dialogVisible = true">点击打开 Dialog</el-button>

    <el-dialog title="概念集列表"
               :visible.sync="dialogVisible"
               width="60%"
               :before-close="handleClose">
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
                           @click="getConceptId(scope.row)">查看</el-button>
                <el-button type="text"
                           size="small"
                           @click="getConceptId(scope.row)">编辑</el-button>
                <el-button type="text"
                           size="small"
                           @click.native.prevent="deleteRow(scope.$index, conceptsetList)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <span slot="footer"
                class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-col>
      </el-row>
    </el-dialog>
    <!--新增概念集 by lqh—-->
    <el-dialog title="新增概念集"
               :visible.sync="createConceptVisible"
               width="60%"
               :before-close="handleClose">
      <component :is="mycreateconceptset"
                 @getdata="getMultipleSelection"
                 @getdata1="getExcludeditems"
                 @getdata2="getChilerenConcepts"
                 @getdata3="getConceptName"
                 @getdata4="getConceptDes"></component>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="loadData()">取 消</el-button>
        <el-button type="primary"
                   @click="createConceptset()">确 定</el-button>
      </span>
    </el-dialog>
    <!--编辑概念集 by lqh—-->
    <el-dialog title="编辑概念集"
               :visible.sync="createConceptVisible2"
               width="60%"
               :before-close="handleClose">
      <component :is="mycreateconceptset"
                 :existConceptId="existConceptId"
                 @getdata="getMultipleSelection"
                 @getdata1="getExcludeditems"
                 @getdata2="getChilerenConcepts"
                 @getdata3="getConceptName"
                 @getdata4="getConceptDes"></component>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="loadData()">取 消</el-button>
        <el-button type="primary"
                   @click="editConceptSet()">确 定</el-button>
      </span>
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
      conceptSetName: '',
      conceptSetDes: '',
      Excludeditems: [],
      ChilerenConcepts: [],
      multipleSelection: [],
      concepts: [],
      concept_exist: false,
      existConceptId: '',
      createConceptVisible: false,
      createConceptVisible2: false,
      dialogVisible: false,
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
      console.log(row);
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    postConceptData() {
      this.createConceptVisible = false;
      this.createConceptVisible2 = false;
      this.concepts = [];
      for (var i = 0; i < this.multipleSelection.length; i++) {
        this.concepts.push({
          conceptCode: this.multipleSelection[i].subject,
          excludeTag: "0",
          childTag: "0"
        });
      }
      for (var i = 0; i < this.Excludeditems.length; i++) {
        this.concept_exist = false;
        var a = []
        a = this.Excludeditems[i].split('#')
        for (var j = 0; j < this.concepts.length; j++) {
          if (a[0].indexOf(this.concepts[j].conceptCode) != -1) {
            this.concept_exist = true;
            this.concepts[j].excludeTag = "1"
          }
        }
        if (!this.concept_exist) {
          this.concepts.push({
            conceptCode: a[0],
            excludeTag: "1",
            childTag: "0"
          });
        }
      }
      for (var i = 0; i < this.ChilerenConcepts.length; i++) {
        this.concept_exist = false;
        var a = []
        a = this.ChilerenConcepts[i].split('#')
        for (var j = 0; j < this.concepts.length; j++) {
          if (a[0].indexOf(this.concepts[j].conceptCode) != -1) {
            this.concept_exist = true;
            this.concepts[j].childTag = "1"
          }
        }
        if (!this.concept_exist) {
          this.concepts.push({
            conceptCode: a[0],
            excludeTag: "0",
            childTag: "1"
          });
        }
      }
      //console.log(this.concepts)
    },
    getConceptName(val) {
      this.conceptSetName = val;
    },
    getConceptDes(val) {
      this.conceptSetDes = val;
    },
    getExcludeditems(val) {
      this.Excludeditems = val;
      //console.log(this.Excludeditems)
    },
    getChilerenConcepts(val) {
      this.ChilerenConcepts = val;
      //console.log(this.ChilerenConcepts)
    },
    getMultipleSelection(val) {
      this.multipleSelection = val;
      //console.log(this.multipleSelection)
    },
    createConceptset() {
      this.$options.methods.postConceptData.bind(this)()
      axios.post('/conceptSet/createConceptSet?token=' + this.GLOBAL.token, ({
        "conceptSetName": this.conceptSetName,
        "description": this.conceptSetDes,
        "concepts": this.concepts,
      }))
        .then(response => {
          if (response.data.code == "0") {
            //this.$message.success("新建成功！")
            this.reload()
          }
        })
    },
    getConceptId(row) {
      console.log(row)
      this.createConceptVisible2 = true;
      this.existConceptId = row.id
      console.log(this.existConceptId)
    },
    editConceptSet() {
      this.$options.methods.postConceptData.bind(this)()
      axios.post('/conceptSet/update', ({
        "token": this.GLOBAL.token,
        "conceptSetId": this.existConceptId,
        "conceptSetName": this.conceptSetName,
        "description": this.conceptSetDes,
        "concepts": this.concepts,
      }))
        .then(response => {
          if (response.data.code == "0") {
            //this.$message.success("新建成功！")
            this.reload()
          }
        })
    },
    loadData() {
      this.createConceptVisible = false
      this.createConceptVisible2 = false
      //this.reload()
    },
    //删除某条概念集
    deleteRow(index, rows) {
      rows.splice(index, 1);
    }
  }
};
</script>