<template>
  <div>
    <!--新增概念集 by lqh—-->
    <el-form :model="NewConceptSets"
             :rules="rules"
             ref="NewConceptSets"
             label-width="100px"
             class="demo-ruleForm concept-container">
      <el-row :gutter="10"
              style="margin-top:10px;margin-bottom:10px"
              type="flex"
              justify="center">

        <el-col :span="14">
          <el-input prefix-icon="el-icon-search"
                    :readonly="isReadOnly"
                    v-model="InputConceptName"
                    type="text"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary"
                     @click="getSearchData">搜索</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top:10px;margin-bottom:10px">
        <el-col :span="16"
                :offset="4">
          <el-form-item label="集合名称"
                        prop="SetName"
                        class="form-inline">
            <el-input type="text"
                      v-model="NewConceptSets.SetName"
                      :readonly="isReadOnly"
                      auto-complete="off"
                      placeholder="请输入集合名称"
                      class="form-control"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin-top:10px;margin-bottom:10px">
        <el-col :span="14"
                :offset="4">
          <el-form-item label="集合描述"
                        prop="SetDescription"
                        class="form-inline">
            <el-input type="textarea"
                      :rows="2"
                      :readonly="isReadOnly"
                      v-model="NewConceptSets.SetDescription"
                      auto-complete="off"
                      placeholder="请输入集合描述"
                      class="form-control"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin-top:10px;margin-bottom:10px"
              type="flex"
              justify="center">
        <el-col :span="20">
          <el-tabs v-model="activeName"
                   type="card"
                   @tab-click="handleClick">
            <el-tab-pane label="待选择"
                         name="first">
              <el-table :data="tableAll"
                        ref="multipleTable"
                        valign="center"
                        height="300"
                        border
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                <el-table-column type="selection"
                                 label="全选"
                                 width="60"></el-table-column>
                <el-table-column prop="subject"
                                 label="概念编号"
                                 width="120"></el-table-column>
                <el-table-column prop="label"
                                 label="概念名称"
                                 width="160"></el-table-column>
                <el-table-column prop="domain"
                                 label="概念领域"
                                 width="90"></el-table-column>
                <el-table-column prop="class"
                                 label="概念类型"
                                 width="90"></el-table-column>
                <el-table-column prop="voc"
                                 label="术语表"
                                 width="90"></el-table-column>
                <el-table-column prop="std"
                                 label="标准概念"
                                 width="90"></el-table-column>
                <el-table-column width="100">
                  <template slot="header"
                            slot-scope="scope">
                    <el-checkbox :indeterminate="isIndeterminate1"
                                 v-model="checkAll1"
                                 @change="handleCheckAllExcludeditemsChange">排除</el-checkbox>
                  </template>
                  <template slot-scope="scope">
                    <el-checkbox-group v-model="checkedExcludeditems"
                                       @change="handleCheckedExcludeditemsChange">
                      <el-checkbox :label="scope.row.Except">&nbsp;</el-checkbox>
                    </el-checkbox-group>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot="header"
                            slot-scope="scope">
                    <el-checkbox :indeterminate="isIndeterminate2"
                                 v-model="checkAll2"
                                 @change="handleCheckAllChilerenConceptsChange">子概念</el-checkbox>
                  </template>
                  <template slot-scope="scope">
                    <el-checkbox-group v-model="checkedChilerenConcepts"
                                       @change="handleCheckedChilerenConceptsChange">
                      <el-checkbox :label="scope.row.ChilerenConcept">&nbsp;</el-checkbox>
                    </el-checkbox-group>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="已选择"
                         name="second">
              <el-table :data="tableChecked"
                        ref="multipleTable2"
                        valign="center"
                        height="300"
                        border
                        style="width: 100%"
                        @selection-change="handleSelectionChange2">
                <el-table-column type="selection"
                                 label="全选"
                                 width="60"></el-table-column>
                <el-table-column prop="subject"
                                 label="概念编号"
                                 width="120"></el-table-column>
                <el-table-column prop="label"
                                 label="概念名称"
                                 width="160"></el-table-column>
                <el-table-column prop="domain"
                                 label="概念领域"
                                 width="90"></el-table-column>
                <el-table-column prop="class"
                                 label="概念类型"
                                 width="90"></el-table-column>
                <el-table-column prop="voc"
                                 label="术语表"
                                 width="90"></el-table-column>
                <el-table-column prop="std"
                                 label="标准概念"
                                 width="90"></el-table-column>
                <el-table-column width="100">
                  <template slot="header"
                            slot-scope="scope">
                    <el-checkbox :indeterminate="isIndeterminate1"
                                 v-model="checkAll1"
                                 @change="handleCheckAllExcludeditemsChange">排除</el-checkbox>
                  </template>
                  <template slot-scope="scope">
                    <el-checkbox-group v-model="checkedExcludeditems"
                                       @change="handleCheckedExcludeditemsChange">
                      <el-checkbox :label="scope.row.Except">&nbsp;</el-checkbox>
                    </el-checkbox-group>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot="header"
                            slot-scope="scope">
                    <el-checkbox :indeterminate="isIndeterminate2"
                                 v-model="checkAll2"
                                 @change="handleCheckAllChilerenConceptsChange">子概念</el-checkbox>
                  </template>
                  <template slot-scope="scope">
                    <el-checkbox-group v-model="checkedChilerenConcepts"
                                       @change="handleCheckedChilerenConceptsChange">
                      <el-checkbox :label="scope.row.ChilerenConcept">&nbsp;</el-checkbox>
                    </el-checkbox-group>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <el-form-item>
        <el-row style="margin-top:30px;margin-bottom:10px">
          <el-col :span="4"
                  :offset="20">

            <el-button @click="loadData()">取 消</el-button>
            <el-button type="primary"
                       @click="createConceptset('NewConceptSets')">确 定</el-button>

          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['existConceptSetId', 'isReadOnly'],
  inject: ['reload'],
  data() {
    return {
      activeName: 'first',
      multipleSelection: [],
      multipleSelection2: [],
      InputConceptName: "",
      checkAll1: false,
      isIndeterminate1: false,
      checkAll2: false,
      isIndeterminate2: false,
      checkedExcludeditems: [],
      checkedChilerenConcepts: [],
      Excludeditems: [],
      ChilerenConcepts: [],
      concepts: [],
      concept_exist: false,
      NewConceptSets: {
        SetName: "",
        SetDescription: ""
      },
      rules: {
        SetName: [
          { required: true, message: '请输入概念名称', trigger: 'blur' }
        ]
      },
      // tableAll: [
      //   {
      //     subject: "1862084081",
      //     label: "盐酸二甲双胍",
      //     domain: "药品",
      //     class: "IN",
      //     voc: "NCCD",
      //     std: "76423",
      //     Except: "1862084081#1",
      //     ChilerenConcept: "1862084081#0"
      //   },
      //   {
      //     subject: "1862234183",
      //     label: "盐酸二甲双胍",
      //     domain: "药品",
      //     class: "IN",
      //     voc: "NCCD",
      //     std: "183745",
      //     Except: "1862234183#1",
      //     ChilerenConcept: "1862234183#0"
      //   },
      //   {
      //     subject: "1862084082",
      //     label: "盐酸二甲双胍 0.25克",
      //     domain: "药品",
      //     class: "SCDC",
      //     voc: "NCCD",
      //     std: "76423",
      //     Except: "1862084082#1",
      //     ChilerenConcept: "1862084082#1"
      //   }
      // ],
      tableAll: [],
      tableChecked: [],
      conceptsLength: 0,
      conceptIdList: '',
    }
  },

  mounted() {
    if (this.existConceptSetId) {
      axios.get('/conceptSet/getConceptSetDetail', {
        params: {
          "token": this.GLOBAL.token,
          "conceptSetId": this.existConceptSetId
        }
      })
        .then((response) => {
          this.NewConceptSets.SetName = response.data.data.conceptSetName
          if (response.data.data.description != 'null') {
            this.NewConceptSets.SetDescription = response.data.data.description
          }
          const concepts = response.data.data.concepts
          this.conceptsLength = concepts.length
          for (var i = 0; i < concepts.length; i++) {
            const conceptCode = parseInt(response.data.data.concepts[i].conceptCode)
            const childTag = parseInt(response.data.data.concepts[i].childTag)
            const excludeTag = parseInt(response.data.data.concepts[i].excludeTag)
            const OMOPVersion = parseInt(response.data.data.concepts[i].OMOPVersion)
            if (childTag == 1) {
              console.log(childTag)
              this.checkedChilerenConcepts.push(conceptCode.toString())
            }
            if (excludeTag == 1) {
              this.checkedExcludeditems.push(conceptCode.toString())
            }

            this.tableAll.push({
              OMOPVersion: OMOPVersion.toString(),
              subject: conceptCode.toString(),
              label: concepts[i].redundancy.label,
              domain: concepts[i].redundancy.domain,
              class: concepts[i].redundancy.class,
              voc: concepts[i].redundancy.voc,
              std: concepts[i].redundancy.std,
              Except: conceptCode.toString(),
              ChilerenConcept: conceptCode.toString()
            })
          }
          for (let i = 0; i < this.tableAll.length; i++) {
            this.Excludeditems[i] = this.tableAll[i].Except
            this.ChilerenConcepts[i] = this.tableAll[i].ChilerenConcept
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    }

  },
  updated() {
    this.$nextTick(function () {
      for (var i = 0; i < this.conceptsLength; i++) {
        this.$refs.multipleTable.toggleRowSelection(this.tableAll[i], true);
      }
    })
  },
  methods: {
    getSearchData() {
      //console.log(this.existConceptSetId);
      const InputConceptName = this.InputConceptName;
      axios.get('/knowledgeGraph/queryConcept', {
        params: {
          "token": this.GLOBAL.token,
          "query": InputConceptName
        },
        timeout: 1000 * 60 * 2
      })
        .then((response) => {
          const searchConcepts = response.data.data.results.bindings
          for (var i = 0; i < searchConcepts.length; i++) {
            var concept_exist = false;
            var a = []
            a = searchConcepts[i].subject.value.split('#')
            for (var j = 0; j < this.tableAll.length; j++) {
              if (a[1].indexOf(this.tableAll[j].subject) != -1) {
                concept_exist = true;
                //this.tableChecked[j].excludeTag = "1"
              }
            }
            if (!concept_exist) {
              this.tableAll.push({
                subject: a[1],
                OMOPVersion: '1',
                label: searchConcepts[i].label.value,
                domain: searchConcepts[i].domain.value,
                class: searchConcepts[i].class.value,
                voc: searchConcepts[i].voc.value,
                std: Object.getOwnPropertyNames(searchConcepts[i]).length > 5 ? searchConcepts[i].std.value : '',
                Except: a[1],
                ChilerenConcept: a[1]
              })
            }
          }
          for (let i = 0; i < this.tableAll.length; i++) {
            this.Excludeditems[i] = this.tableAll[i].Except
            this.ChilerenConcepts[i] = this.tableAll[i].ChilerenConcept
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    handleClick(tab, event) {
      this.tableChecked = [];
      for (var i = 0; i < this.multipleSelection.length; i++) {
        console.log(this.multipleSelection)
        this.tableChecked.push({
          subject: this.multipleSelection[i].subject,
          OMOPVersion: this.multipleSelection[i].OMOPVersion,
          label: this.multipleSelection[i].label,
          domain: this.multipleSelection[i].domain,
          class: this.multipleSelection[i].class,
          voc: this.multipleSelection[i].voc,
          std: this.multipleSelection[i].std,
          Except: this.multipleSelection[i].Except,
          ChilerenConcept: this.multipleSelection[i].ChilerenConcept
        });
      }

      var rows = this.tableChecked
      this.$nextTick(function () {
        rows.forEach(row => {
          this.$refs.multipleTable2.toggleRowSelection(row, true);
        });
      })
    },
    //新增概念集所需
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    handleSelectionChange2(val) {
      this.multipleSelection2 = val;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCheckAllExcludeditemsChange(val) {
      this.checkedExcludeditems = val ? this.Excludeditems : [];
      this.isIndeterminate1 = false;
      //console.log(1111)
    },
    handleCheckedExcludeditemsChange(value) {
      this.checkedExcludeditems = value;
      let checkedCount = value.length;
      this.checkAll1 = checkedCount === this.Excludeditems.length;
      this.isIndeterminate1 =
        checkedCount > 0 && checkedCount < this.Excludeditems.length;
    },
    handleCheckAllChilerenConceptsChange(val) {
      this.checkedChilerenConcepts = val ? this.ChilerenConcepts : [];
      this.isIndeterminate2 = false;
    },
    handleCheckedChilerenConceptsChange(value) {
      let checkedCount = value.length;
      this.checkAll2 = checkedCount === this.ChilerenConcepts.length;
      this.isIndeterminate2 =
        checkedCount > 0 && checkedCount < this.ChilerenConcepts.length;
    },
    //---新增/编辑/查看概念集---
    postConceptData() {
      this.$emit('createConceptVisible', false);
      this.$emit('editConceptVisible', false);
      this.$emit('viewConceptVisible', false);
      this.concepts = [];
      for (var i = 0; i < this.multipleSelection.length; i++) {
        this.concepts.push({
          OMOPVersion: this.multipleSelection[i].OMOPVersion,
          conceptCode: this.multipleSelection[i].subject,
          excludeTag: "0",
          childTag: "0",
          redundancy: {
            label: this.multipleSelection[i].label,
            domain: this.multipleSelection[i].domain,
            class: this.multipleSelection[i].class,
            voc: this.multipleSelection[i].voc,
            std: this.multipleSelection[i].std
          }
        });
      }
      for (var i = 0; i < this.checkedExcludeditems.length; i++) {
        this.concept_exist = false;
        var a = []
        a = this.checkedExcludeditems[i]
        console.log(a)
        for (var j = 0; j < this.concepts.length; j++) {
          if (a.indexOf(this.concepts[j].conceptCode) != -1) {
            this.concept_exist = true;
            this.concepts[j].excludeTag = "1"
          }
        }
        if (!this.concept_exist) {
          let index = this.tableAll.findIndex(element => element.subject === a);
          this.concepts.push({
            OMOPVersion: this.tableAll[index].OMOPVersion,
            conceptCode: this.tableAll[index].subject,
            excludeTag: "1",
            childTag: "0",
            redundancy: {
              label: this.tableAll[index].label,
              domain: this.tableAll[index].domain,
              class: this.tableAll[index].class,
              voc: this.tableAll[index].voc,
              std: this.tableAll[index].std
            }
          });
        }
      }
      for (var i = 0; i < this.checkedChilerenConcepts.length; i++) {
        this.concept_exist = false;
        var a = []
        a = this.checkedChilerenConcepts[i]
        for (var j = 0; j < this.concepts.length; j++) {
          if (a.indexOf(this.concepts[j].conceptCode) != -1) {
            this.concept_exist = true;
            this.concepts[j].childTag = "1"
          }
        }
        if (!this.concept_exist) {
          let index = this.tableAll.findIndex(element => element.subject === a);
          this.concepts.push({
            OMOPVersion: this.tableAll[index].OMOPVersion,
            conceptCode: this.tableAll[index].subject,
            excludeTag: "0",
            childTag: "1",
            redundancy: {
              label: this.tableAll[index].label,
              domain: this.tableAll[index].domain,
              class: this.tableAll[index].class,
              voc: this.tableAll[index].voc,
              std: this.tableAll[index].std
            }
          });
        }
      }
      //console.log(this.concepts)
    },
    createConceptset(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //alert('submit!');
          this.$options.methods.postConceptData.bind(this)()
          if (this.existConceptSetId) {
            axios.post('/conceptSet/update?token=' + this.GLOBAL.token, ({
              "conceptSetId": this.existConceptSetId,
              "name": this.NewConceptSets.SetName,
              "description": this.NewConceptSets.SetDescription,
              "concepts": this.concepts,
            }))
              .then(response => {
                if (response.data.code == "0") {
                  this.$message.success("编辑成功！")
                  //this.reload()
                }
              })
          } else {
            axios.post('/conceptSet/createConceptSet?token=' + this.GLOBAL.token, ({
              "name": this.NewConceptSets.SetName,
              "description": this.NewConceptSets.SetDescription,
              "concepts": this.concepts,
            }))
              .then(response => {
                if (response.data.code == "0") {
                  //this.$message.success("新建成功！")
                  //this.reload()
                }
              })
          }
        } else {
          //console.log('error submit!!');
          return false;
        }
      });
    },
    editConceptSet() {
      this.$options.methods.postConceptData.bind(this)()

    },
    loadData() {
      this.$emit('createConceptVisible', false);
      this.$emit('editConceptVisible', false);
      this.$emit('viewConceptVisible', false);
      //this.$refs.publicimport.channelName = ''
      //this.reload()
    },
  },
}
</script>
>