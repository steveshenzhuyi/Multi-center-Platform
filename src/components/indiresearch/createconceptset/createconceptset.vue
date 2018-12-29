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
                      auto-complete="off"
                      placeholder="请输入集合名称"
                      class="form-control"
                      @blur.stop="NameInputBlur()"></el-input>
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
                      v-model="NewConceptSets.SetDescription"
                      auto-complete="off"
                      placeholder="请输入集合描述"
                      class="form-control"
                      @blur.stop="DesInputBlur()"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['existConceptId'],
  data() {
    return {
      //新增概念集假数据
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
      props: {
        existConceptId: {
          type: String,
          required: true
        }
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
      firstTableAll: [],
      tableAll: [],
      tableChecked: [],
      conceptsLength: 0
    }
  },

  mounted() {
    //console.log(this.existConceptId);

    if (this.existConceptId) {
      axios.get('/conceptSet/getConceptSetDetail', {
        params: {
          "token": this.GLOBAL.token,
          "conceptSetId": this.existConceptId
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
            var CONCEPTCODE = parseInt(response.data.data.concepts[i].CONCEPTCODE)
            var CHILDTAG = parseInt(response.data.data.concepts[i].CHILDTAG)
            var EXCLUDETAG = parseInt(response.data.data.concepts[i].EXCLUDETAG)
            this.tableAll.push({
              subject: CONCEPTCODE.toString(),
              label: '',
              domain: '',
              class: '',
              voc: '',
              std: '',
              Except: CONCEPTCODE.toString(),
              ChilerenConcept: CONCEPTCODE.toString()
            })
            // axios.get('/knowledgeGraph/queryConceptID', {
            //   params: {
            //     "token": this.GLOBAL.token,
            //     "query": CONCEPTCODE
            //   },
            //   timeout: 1000 * 60 * 3
            // }
            // )
            //   .then((response) => {
            //     const searchConcepts = response.data.results.bindings
            //     this.tableAll.push({
            //       subject: CONCEPTCODE.toString(),
            //       label: searchConcepts[0].label.value,
            //       domain: searchConcepts[0].domain.value,
            //       class: searchConcepts[0].class.value,
            //       voc: searchConcepts[0].voc.value,
            //       std: Object.getOwnPropertyNames(searchConcepts[0]).length > 5 ? searchConcepts[0].std.value : '',
            //       Except: CONCEPTCODE.toString(),
            //       ChilerenConcept: CONCEPTCODE.toString()
            //     })
            //   })
            //   .catch(function (error) {
            //     console.log("error", error);
            //   });
            if (CHILDTAG == 1) {
              this.checkedChilerenConcepts.push(CONCEPTCODE.toString())
            }
            if (EXCLUDETAG == 1) {
              this.checkedExcludeditems.push(CONCEPTCODE.toString())
            }
            if (CHILDTAG == 0 && EXCLUDETAG == 0) {
              console.log(111)
              this.$nextTick(function () {
                this.$refs.multipleTable.toggleRowSelection(this.tableAll[i], true);
              })
            }
          }
          //this.firstTableAll = this.tableAll
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
    //var rows = this.firstTableAll
    this.$nextTick(function () {
      for (var i = 0; i < this.conceptsLength; i++) {
        this.$refs.multipleTable.toggleRowSelection(this.tableAll[i], true);
      }
      //this.$options.methods.NameInputBlur();
      //this.$options.methods.DesInputBlur();
    })
    //this.$options.methods.NameInputBlur();
    //this.$options.methods.DesInputBlur();
  },
  methods: {
    getSearchData() {
      //console.log(this.existConceptId);
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
      // this.firstTableAll.forEach(row => {
      //   this.$refs.multipleTable.toggleRowSelection(row, true);
      // });
      this.tableChecked = [];
      for (var i = 0; i < this.multipleSelection.length; i++) {
        this.tableChecked.push({
          subject: this.multipleSelection[i].subject,
          label: this.multipleSelection[i].label,
          domain: this.multipleSelection[i].domain,
          class: this.multipleSelection[i].class,
          voc: this.multipleSelection[i].voc,
          std: this.multipleSelection[i].std,
          Except: this.multipleSelection[i].Except,
          ChilerenConcept: this.multipleSelection[i].ChilerenConcept
        });
      }
      for (var i = 0; i < this.checkedExcludeditems.length; i++) {
        var concept_exist = false;
        var a = []
        a = this.checkedExcludeditems[i].split('#')
        for (var j = 0; j < this.tableChecked.length; j++) {
          if (a[0].indexOf(this.tableChecked[j].subject) != -1) {
            concept_exist = true;
            //this.tableChecked[j].excludeTag = "1"
          }
        }
        if (!concept_exist) {
          const result = this.tableAll.find(g => g.subject === a[0])
          this.tableChecked.push(result)
        }
      }
      for (var i = 0; i < this.checkedChilerenConcepts.length; i++) {
        var concept_exist = false;
        var a = []
        a = this.checkedChilerenConcepts[i].split('#')
        for (var j = 0; j < this.tableChecked.length; j++) {
          if (a[0].indexOf(this.tableChecked[j].subject) != -1) {
            concept_exist = true;
            //this.tableChecked[j].childTag = "1"
          }
        }
        if (!concept_exist) {
          const result = this.tableAll.find(g => g.subject === a[0])
          this.tableChecked.push(result)
        }
      }
      var rows = this.tableChecked
      this.$nextTick(function () {
        rows.forEach(row => {
          this.$refs.multipleTable2.toggleRowSelection(row, true);
        });
      })
    },
    //新增概念集所需
    NameInputBlur() {
      this.$emit('getdata3', this.NewConceptSets.SetName);
      this.$emit('getdata4', this.NewConceptSets.SetDescription);
    },
    DesInputBlur() {
      this.$emit('getdata3', this.NewConceptSets.SetName);
      this.$emit('getdata4', this.NewConceptSets.SetDescription);
    },
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
      this.$emit('getdata', this.multipleSelection);
      this.$emit('getdata3', this.NewConceptSets.SetName);
      this.$emit('getdata4', this.NewConceptSets.SetDescription);
    },
    handleCheckAllExcludeditemsChange(val) {
      this.checkedExcludeditems = val ? this.Excludeditems : [];
      this.$emit('getdata1', this.checkedExcludeditems);
      this.isIndeterminate1 = false;
      //console.log(1111)
    },
    handleCheckedExcludeditemsChange(value) {
      this.$emit('getdata1', this.checkedExcludeditems);
      this.$emit('getdata3', this.NewConceptSets.SetName);
      this.$emit('getdata4', this.NewConceptSets.SetDescription);
      this.checkedExcludeditems = value;
      let checkedCount = value.length;
      this.checkAll1 = checkedCount === this.Excludeditems.length;
      this.isIndeterminate1 =
        checkedCount > 0 && checkedCount < this.Excludeditems.length;
    },
    handleCheckAllChilerenConceptsChange(val) {
      this.checkedChilerenConcepts = val ? this.ChilerenConcepts : [];
      this.$emit('getdata2', this.checkedChilerenConcepts);
      this.$emit('getdata3', this.NewConceptSets.SetName);
      this.$emit('getdata4', this.NewConceptSets.SetDescription);
      this.isIndeterminate2 = false;
    },
    handleCheckedChilerenConceptsChange(value) {
      this.$emit('getdata2', this.checkedChilerenConcepts);
      this.$emit('getdata3', this.NewConceptSets.SetName);
      this.$emit('getdata4', this.NewConceptSets.SetDescription);
      let checkedCount = value.length;
      this.checkAll2 = checkedCount === this.ChilerenConcepts.length;
      this.isIndeterminate2 =
        checkedCount > 0 && checkedCount < this.ChilerenConcepts.length;
    },
  },
  // computed: {
  //   // 新增概念集中实现搜索功能
  //   SearchResult() {
  //     const InputConceptName = this.InputConceptName;
  //     if (InputConceptName) {
  //       return this.tableAll.filter(data => {
  //         return Object.keys(data).some(key => {
  //           return String(data[key]).indexOf(InputConceptName) > -1;
  //         });
  //       });
  //     }
  //     return this.tableAll;
  //   },
  //   options() {
  //     return this.$store.state.options;
  //   }
  // },
}
</script>
>