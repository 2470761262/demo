<style lang="less" scoped>
.left-input-container {
  padding: 10px;

  border-radius: 0.5rem;

  .el-input {
    width: 80%;
  }

  span {
    margin-right: 10px;
    margin-left: 5px;
  }
}

.el-top {
  margin-top: 50px;
}

.flex-row {
  display: flex;

  &.flex-row50 {
    /deep/ .el-form-item {
      flex: 0 0 40%;
    }
  }

  /deep/ .el-form-item {
    flex: 0 0 20%;

    .el-select {
      width: 100%;
    }

    .el-date-editor {
      width: 100%;
    }
  }
}

.form-content {
  background: #fff;
  height: 100%;
  padding-top: 20px;
  padding-left: 20px;
  box-sizing: border-box;
}

.flex-centent {
  text-align: center;
  padding: 5px 0;
}
</style>
<template>
  <div class="form-content">
    <el-form
      ref="form"
      :rules="rules"
      :model="companyEntity"
      label-width="130px"
    >
      <div class="flex-row">
        <el-form-item label="公司名称:" :required="true" prop="companyName">
          <el-input
            type="text"
            placeholder="请输入内容"
            v-model="companyEntity.companyName"
            maxlength="10"
            show-word-limit
            @input="GetPinyin()"
          ></el-input>
        </el-form-item>
        <el-form-item label="公司名首拼:">
          <el-input
            type="text"
            placeholder="请输入内容"
            v-model="companyEntity.header"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="电话:">
          <el-input
            placeholder="请输入内容"
            v-model="companyEntity.tel"
          ></el-input>
        </el-form-item>

        <el-form-item label="加入类型:" :required="true">
          <el-select
            type="text"
            placeholder="请输入内容"
            v-model="companyEntity.joinType"
            show-word-limit
          >
            <el-option label="直营" :value="1" />
            <el-option label="加盟" :value="2" />
          </el-select>
        </el-form-item>
      </div>
      <div class="flex-row">
        <el-form-item label="开业时间:">
          <el-date-picker
            v-model="companyEntity.regDate"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="公司类型:" :required="true">
          <el-select
            type="text"
            placeholder="请输入内容"
            v-model="companyEntity.comType"
            show-word-limit
          >
            <el-option label="经纪" :value="1" />
            <el-option label="物业" :value="2" />
            <el-option label="平台" :value="3" />
            <el-option label="金融" :value="4" />
            <el-option label="代理" :value="5" />
          </el-select>
        </el-form-item>
        <el-form-item label="选择负责人:" :required="true" prop="managerPer">
          <el-dialog
            title="请选择:"
            :visible.sync="dialogVisible1"
            width="50%"
            :before-close="handleClose1"
          >
            <!-- <list-page
              :parentData="$data"
              highlight-current-row
              @handleSizeChange="handleSizeChange"
              @handleCurrentChange="handleCurrentChange"
              @current-change="handleChange"
            >
              <template v-slot:tableColumn="cell">
                <template v-for="item in cell.tableData">
                  <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    :key="item.prop"
                  ></el-table-column>
                </template>
              </template>
            </list-page>-->
            <el-input
              placeholder="输入关键字进行过滤"
              v-model="filterText"
              class="treeSearch"
            ></el-input>
            <el-tree
              ref="treeForm"
              :data="treeData"
              node-key="nodeId"
              show-checkbox
              :props="defaultProps"
              @check-change="handleCheckChange"
              :highlight-current="true"
              :filter-node-method="filterNode"
              check-strictly
              :action="''"
              empty-text="暂无数据，请检查权限"
              auto-expand-parent
              :default-expanded-keys="curNodeId"
              :default-checked-keys="curNodeId"
              v-loading="treeLoading"
            ></el-tree>
          </el-dialog>
          <el-input
            type="text"
            placeholder="请输入内容"
            v-model="companyEntity.managerPerName"
            @focus="getDialogVisible1()"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址:">
          <el-input
            type="text"
            placeholder="请输入内容"
            v-model="companyEntity.address"
            maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item>
      </div>
      <div class="flex-row flex-row50">
        <el-form-item label="公司描述:">
          <el-input
            type="text"
            placeholder="请输入内容"
            v-model="companyEntity.companyDesc"
            maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="设置管辖区域:" :required="true" prop="regionName">
          <el-input
            type="text"
            placeholder="请输入内容"
            @focus="getDialogVisible()"
            v-model="companyEntity.regionName"
            show-word-limit
          ></el-input>
        </el-form-item>
      </div>
      <div class="footerContainer el-top">
        <el-button type="primary" @click="savecompany()">确定</el-button>
        <el-button type="primary" @click="back()">返回</el-button>
      </div>
    </el-form>

    <fixed-popup
      title="鑫家区域"
      mask-hide-event
      typeClass="system"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-tree
        :props="props"
        :load="loadNode"
        lazy
        :default-expanded-keys="treeExpanded"
        @check-change="treecheck"
        node-key="id"
        ref="tree"
        show-checkbox
      ></el-tree>
      <template v-slot:floot>
        <div class="flex-centent">
          <el-button size="mini" @click="resetTree">重置</el-button>
          <el-button size="mini" @click="getTreeCheck">确定</el-button>
        </div>
      </template>
    </fixed-popup>
  </div>
</template>

<script>
//import listPage from "@/components/listPage";
import getMenuRid from "@/minxi/getMenuRid";

export default {
  mixins: [getMenuRid],
  components: {
    //  listPage
  },
  props: {},
  data() {
    return {
      treeExpanded: [],
      props: {
        label: "Name",
        children: "children",
        isLeaf: "leaf"
      },
      rules: {
        companyName: [
          {
            required: true,
            message: "请输入公司名,公司名是唯一的",
            trigger: "blur"
          }
        ],
        region: [
          { required: true, message: "请选择管辖区域", trigger: "change" }
        ],
        managerPer: [
          { required: true, message: "请选择负责人", trigger: "blur" }
        ]
      },
      loading: false, //控制表格加载动画提示
      queryData: {
        keyWord: "",
        isLocked: null, //0 查询锁定,1 查询未锁定,2 查询异常用户
        del: 0, //0 查询在职用户,1 查询离职用户,2 查询待离职用户
        type: 0 //0 内部  1 游客
      },
      configSet: {
        selectToTime: false,
        selectTo: false
      },
      pageJson: {
        currentPage: 1, //当前页码
        total: 9, //总记录数
        pageSize: 5 //每页条数
      },
      tableDataColumn: [
        { prop: "perName", label: "姓名" },
        { prop: "deptName", label: "部门" },
        { prop: "companyName", label: "公司" },
        { prop: "positionName", label: "岗位" }
      ],
      currentRow: null,
      tableData: [],
      dialogVisible1: false,
      companyEntity: {
        companyName: null,
        header: null,
        tel: null,
        joinType: null,
        regDate: null,
        comType: null,
        managerPer: null,
        address: null,
        companyDesc: null,
        parentId: null,
        deptParentId: null,
        backUrl: null,
        regionName: "",
        region: null
      },
      dialogVisible: false,
      regionName: [],
      region: [],
      checkAll: false,
      cityCheckAll: false,
      checkedCities: [],
      isIndeterminate: true,
      jumpNodeId: "",
      id: 350000,
      treeData: [],
      defaultProps: {
        children: "childrenNodes",
        label: "labelName"
      },
      curNodeId: [],
      filterText: "",
      treeLoading: true,
      checkedId: null,
      checkedType: null
    };
  },
  watch: {
    filterText(val) {
      this.$refs.treeForm.filter(val);
    },
    filterTextChange(val) {
      this.$refs.treeFormChange.filter(val);
    }
  },
  computed: {},
  methods: {
    loadNode(node, resolve) {
      if (node.level == 0) {
        this.checked(this.id).then(e => {
          resolve(e);
        });
      } else if (node.level == 1) {
        this.checked(node.data.id).then(e => {
          e.forEach(item => {
            item.leaf = true;
          });
          resolve(e);
        });
      }
    },
    resetTree() {
      this.$refs.tree.setCheckedKeys([]);
    },
    getTreeCheck() {
      let arr = this.$refs.tree.getCheckedNodes().filter(item => {
        return item.LevelType != 2;
      });
      this.companyEntity.regionName = arr
        .map(item => {
          return item.Name;
        })
        .join(",");
      this.companyEntity.region = arr
        .map(item => {
          return item.id;
        })
        .join(",");
      this.dialogVisible = false;
    },
    treecheck(data, isChecked) {
      if (isChecked && data.LevelType == 2) {
        if (this.treeExpanded.length != 0) {
          this.treeExpanded.splice(0, 1, data.id);
        } else {
          this.treeExpanded.push(data.id);
        }
      }
    },
    getDialogVisible1() {
      this.dialogVisible1 = true;
      this.getPrincipal(1);
    },
    getPrincipal(currentPage) {
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      params.coId = this.companyEntity.coId;
      params.postId = this.$api
        .post({
          url: "/employee/selectPrincipal",
          data: params,
          token: false,
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            console.log(result.data);

            this.pageJson.total = result.data.totalCount;
            this.pageJson.currentPage = result.data.currPage;
            this.tableData = result.data.list;
          } else {
            console.log("查询负责人列表结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询负责人列表失败");
          console.log(e);
        });
    },
    handleClose1() {
      this.dialogVisible1 = false;
    },
    handleSizeChange(val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.getPrincipal(1);
    },
    handleCurrentChange(val) {
      this.getPrincipal(val);
    },
    handleChange(row) {
      if (row != null) {
        this.companyEntity.managerPer = row.accountId;
        this.companyEntity.managerPerName = row.perName;
      }
    },
    checked(id) {
      return this.$api
        .get({
          url: "/company/regionName?id=" + id
        })
        .then(e => {
          if (e.data.code == 200) {
            e.data.data.forEach(item => {
              item.children = [];
            });
            return e.data.data;
          } else {
            // return Promise.reject(result.message);
          }
        })
        .catch(e => {
          this.$message.error(e.message);
        });
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.regionName : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.regionName.length;
      console.log(this.cityCheckAll);
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.regionName.length;
    },
    handleCheckedCitiesChange1(value, parentValue) {
      let result = true;
      if (this.checkedCities.length == 0) {
        this.checkedCities.push(parentValue);
      }
      this.checkedCities.forEach(item => {
        if (item.ShortName == parentValue.ShortName) {
          result = false;
        }
      });
      if (result) {
        this.checkedCities.push(parentValue);
      }
      console.log(this.checkedCities, " this.checkedCities");
    },
    getDialogVisible(id) {
      this.dialogVisible = true;
      this.checkedCities = [];
      if (id == null || id == undefined) {
        id = 350000;
      }
      this.$api
        .get({
          url: "/company/regionName?id=" + id,
          token: false
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            console.log(result.data);
            this.regionName = result.data;
          } else {
            console.log("载入结果" + +result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("读取失败");
          console.log(e);
        });
    },
    setDialogVisible() {
      this.dialogVisible = false;
    },
    handleClose() {
      console.log(this.checkedCities);
      this.companyEntity.regionName = "";
      this.dialogVisible = false;

      for (let index in this.checkedCities) {
        console.log(this.checkedCities[index]);
        if (index == this.checkedCities.length - 1) {
          this.companyEntity.regionName += this.checkedCities[index].Name;
          this.companyEntity.region += this.checkedCities[index].id;
        } else {
          this.companyEntity.regionName += this.checkedCities[index].Name + ",";
          this.companyEntity.region += this.checkedCities[index].id + ",";
        }
      }
      console.log(this.companyEntity.region);
    },
    savecompany() {
      if (
        this.companyEntity.tel &&
        !/^(((13[0-9]{1})|(19[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(
          this.companyEntity.tel
        )
      ) {
        this.$alert("", "请填写正确的电话号码!!!", {
          dangerouslyUseHTMLString: false
        });
      }
      let params = this.companyEntity;
      this.$api
        .post({
          url: "/company/add",
          data: params,
          //token: false,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            this.$alert("", "添加成功", {
              dangerouslyUseHTMLString: false
            });
            if (this.backUrl === "hrTree") {
              this.$router.push({
                path: "/sys/hrTree/hrTree",
                query: { cur: this.jumpNodeId }
              });
            } else {
              this.$router.push({ path: "/sys/companyList" });
            }
            console.log(result.data);
            this.$message({ message: result.message });
          } else {
            this.$alert("", result.message, {
              dangerouslyUseHTMLString: false
            });
          }
        })
        .catch(e => {
          console.log("添加失败");
          console.log(e);
        });
    },
    back() {
      if (this.backUrl === "hrTree") {
        this.$router.push({
          path: "/sys/hrTree/hrTree",
          query: { cur: this.jumpNodeId }
        });
      } else {
        this.$router.push({ path: "/sys/companyList" });
      }
    },
    GetPinyin() {
      if (
        this.companyEntity != null &&
        this.companyEntity.companyName != null &&
        this.companyEntity.companyName != "" &&
        this.companyEntity.companyName.length > 0
      ) {
        this.$api
          .post({
            url: "/company/getPinyin",
            data: { name: this.companyEntity.companyName },
            qs: true
          })
          .then(e => {
            let result = e.data;
            if (result.code === 200) {
              this.companyEntity.header = result.message;
            } else {
              this.companyEntity.header = "";
            }
          })
          .catch(e => {
            console.log(e, "错误");
          });
      }
    },
    handleCheckChange(data, checked) {
      if (checked == true) {
        if (data.type !== 2) {
          this.$message({
            type: "error",
            message: "请勾选人员"
          });
          this.$refs.treeForm.setCheckedNodes([]);
        } else {
          this.$message({
            type: "success",
            message: "已勾选【" + data.labelName + "】"
          });
          this.$refs.treeForm.setCheckedNodes([data]);
          this.companyEntity.managerPer = data.businessId;
          this.companyEntity.managerPerName = data.labelName;
          this.companyEntity.perName = data.labelName;
        }
        console.log("当前类型：" + data.type + ",ID：" + data.businessId);
      }
    },
    filterNode(value, data) {
      console.log("value：" + value);
      console.log(data);
      if (!value) return true;
      if (data.labelName != null) {
        return data.labelName.indexOf(value) !== -1;
      }
    }
  },
  created() {},
  mounted() {
    console.log(this.$route.query.ParentId, this.$route.query.deptParentID);
    if (
      this.$route.query.ParentId != null &&
      this.$route.query.deptParentID == null
    ) {
      this.companyEntity.parentId = this.$route.query.ParentId;
      this.companyEntity.deptParentId = 0;
    } else if (this.$route.query.deptParentID != null) {
      this.companyEntity.parentId = this.$route.query.ParentId;
      this.companyEntity.deptParentId = this.$route.query.deptParentID;
    }

    console.log(
      this.companyEntity.parentId,
      this.companyEntity.deptParentId,
      "addCompanyPage"
    );
    if (this.$route.query.back != null) {
      this.backUrl = this.$route.query.back;
    }
    if (this.$route.query.cur != null) {
      this.jumpNodeId = this.$route.query.cur;
    }
    //读取树数据
    this.$api
      .post({
        url: "/sys/tree/com/manager"
      })
      .then(e => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);
          this.treeData = result.data;
        } else {
          console.log("载入结果" + +result.message);
          alert(result.message);
        }
      })
      .then(() => {
        if (this.$route.query.cur != null) {
          this.curNodeId = [this.$route.query.cur];
          this.$nextTick(() => {
            this.handleCheckChange(
              this.$refs.treeForm.getNode(...this.curNodeId).data,
              true
            );
          });
        }
      })
      .catch(e => {
        console.log("读取失败");
        console.log(e);
      })
      .finally(() => {
        this.treeLoading = false;
      });
  }
};
</script>
