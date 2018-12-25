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

        <el-col :span="16">
          <el-input prefix-icon="el-icon-search"
                    v-model="InputConceptName"
                    type="text"></el-input>
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
                      v-model="NewConceptSets.SetDescription"
                      auto-complete="off"
                      placeholder="请输入集合描述"
                      class="form-control"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2"
                :offset="1">
          <el-button type="primary">待选择</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary">已选择</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row style="margin-top:10px;margin-bottom:10px"
            type="flex"
            justify="center">
      <el-col :span="20">
        <el-table :data="SearchResult"
                  v-model="SearchResult"
                  valign="center"
                  height="300"
                  border
                  style="width: 100%"
                  @selction-change="handleSelectionChange">
          <el-table-column type="selection"
                           label="全选"
                           width="60"></el-table-column>
          <el-table-column prop="ConceptCode"
                           label="概念编码"
                           width="120"></el-table-column>
          <el-table-column prop="ConceptName"
                           label="概念名称"
                           width="150"></el-table-column>
          <el-table-column prop="ConceptType"
                           label="概念类别"
                           width="120"></el-table-column>
          <el-table-column prop="ConceptField"
                           label="概念领域"
                           width="120"></el-table-column>
          <el-table-column prop="ConceptSource"
                           label="概念来源（全部）"
                           width="150"></el-table-column>
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
                <el-checkbox :label="scope.row.Except"></el-checkbox>
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
                <el-checkbox :label="scope.row.ChilerenConcept"></el-checkbox>
              </el-checkbox-group>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //新增概念集假数据
      createConceptVisible: false,
      multipleSelection: [],
      InputConceptName: "",
      checkAll1: false,
      isIndeterminate1: false,
      checkAll2: false,
      isIndeterminate2: false,
      checkedExcludeditems: [],
      checkedChilerenConcepts: [],
      //Excludeditems: [' ', '  ', '   '],
      Excludeditems: [],
      ChilerenConcepts: [],
      NewConceptSets: {
        SetName: "",
        SetDescription: ""
      },
      rules: {
        SetName: [
          { required: true, message: '请输入概念名称', trigger: 'blur' }
        ]
      },
      table: [
        {
          ConceptCode: "E14.901",
          ConceptName: "糖尿病",
          ConceptType: "ICD10 code",
          ConceptField: "Condition",
          ConceptSource: "SZ_ICD10",
          Except: " ",
          ChilerenConcept: " "
        },
        {
          ConceptCode: "80_000",
          ConceptName: "糖尿病",
          ConceptType: "ICD10 code",
          ConceptField: "Condition",
          ConceptSource: "SZ_ICD10",
          Except: "  ",
          ChilerenConcept: "  "
        },
        {
          ConceptCode: "E10.904",
          ConceptName: "暴发性1型糖尿病",
          ConceptType: "ICD10 code",
          ConceptField: "Condition",
          ConceptSource: "SZ_ICD10",
          Except: "   ",
          ChilerenConcept: "   "
        }
      ],
    }
  },
  mounted() {
    for (let i = 0; i < this.table.length; i++) {
      this.Excludeditems[i] = this.table[i].Except
      this.ChilerenConcepts[i] = this.table[i].ChilerenConcept
    }
  },
  methods: {
    //新增概念集所需
    getdata() {
      this.Excludeditems = this.table.Except
      //console.log(this.Excludeditems)
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCheckAllExcludeditemsChange(val) {
      this.checkedExcludeditems = val ? this.Excludeditems : [];
      this.isIndeterminate1 = false;
    },
    handleCheckedExcludeditemsChange(value) {
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
  },
  computed: {
    // 新增概念集中实现搜索功能
    SearchResult() {
      const InputConceptName = this.InputConceptName;
      if (InputConceptName) {
        return this.table.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).indexOf(InputConceptName) > -1;
          });
        });
      }
      return this.table;
    },
    options() {
      return this.$store.state.options;
    }

  },
}
</script>
>