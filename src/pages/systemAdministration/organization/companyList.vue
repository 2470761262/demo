<style lang="less" scoped>
.query-cell {
  padding: 15px 0;
  display: flex;
  align-items: center;
  .query-right {
    flex: 1;
    text-align: right;
    padding-right: 20px;
    /deep/.el-input {
      width: auto;
    }
  }
}
.page-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.elTree {
  box-sizing: border-box;
  width: 230px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  .elTree-scroll {
    padding: 10px;
    height: 0;
    flex: 1 0 auto;
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    &::-webkit-scrollbar-button,
    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-track-piece {
      display: none;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--color--primary);
      border-radius: 50px;
    }
    .scroll-content-tag {
      margin-right: 20px;
      margin-bottom: 10px;
    }
  }
  /deep/ .el-input {
    margin: 10px 0 10px;
  }
}
</style>

<template>
  <div class="page-content">
    <list-page
      :parentData="$data"
      highlight-current-row
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @current-change="handleChange"
    >
      <template v-slot:left>
        <div class="elTree">
          <div class="elTree-scroll">
            <el-tree
              ref="tree2"
              :data="treeData"
              :default-expanded-keys="[1]"
              node-key="nodeId"
              show-checkbox
              check-strictly
              :props="defaultProps"
              @check-change="checkChange"
              @check="treeCheck"
              :highlight-current="true"
              :filter-node-method="filterNode"
              v-loading="treeLoading"
            ></el-tree>
          </div>
        </div>
      </template>
      <template v-slot:top>
        <div class="query-cell">
          <el-button
            type="primary"
            size="mini"
            :disabled="!(company && company.parentId > 0)"
            @click="toAddCompanyPage(0)"
            >添加同级公司</el-button
          >
          <el-button
            type="primary"
            size="mini"
            :disabled="!(company && company.id)"
            @click="toAddCompanyPage(1)"
            >添加子公司</el-button
          >
          <el-button
            type="primary"
            size="mini"
            :disabled="!(company && company.id)"
            @click="toAddDeptPage"
            >添加子级部门</el-button
          >
          <!-- <el-button type="primary"
                     size="mini"
                     @click="queryCompanyByIsLocked(0)">查询锁定公司</el-button>
          <el-button type="primary"
                     size="mini"
          @click="queryCompanyByIsLocked(1)">查询未锁定公司</el-button>-->
          <el-button
            icon="el-icon-s-platform"
            size="mini"
            @click="setUp()"
            title="设置网站"
            round
          ></el-button>
          <div class="query-right">
            <el-input
              placeholder="公司名称"
              size="small"
              v-model="queryData.CompanyName"
              clearable
            ></el-input>
            <el-select
              v-model="selectTag"
              size="small"
              placeholder="全部"
              @change="SelectTag"
            >
              <el-option
                v-for="item in SelectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-button type="primary" size="mini" @click="queryCompanyByParams"
              >查询</el-button
            >
          </div>
        </div>
      </template>
      <template v-slot:tableColumn="cell">
        <template v-for="item in cell.tableData">
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :key="item.prop"
            :formatter="item.formatter"
          ></el-table-column>
        </template>
        <el-table-column label="操作" width="300" fixed="right">
          <template v-slot="scope">
            <div v-if="scope.row.operation != ''">
              <el-button
                type="primary"
                size="mini"
                @click="distributeEvent(item.methosName, scope.row.id)"
                v-for="(item, index) in getOpeBtns(scope.row.operation)"
                :key="index"
                >{{ item.name }}</el-button
              >
            </div>
          </template>
        </el-table-column>
      </template>
    </list-page>
  </div>
</template>

<script>
import listPage from "@/components/listPage";
import getToken from "@/minxi/getUrlToken";
export default {
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  components: {
    listPage
  },
  mixins: [getToken],
  data() {
    return {
      sidebarFlag: false,
      company: {},
      companyEntity: null,
      department: {},
      loading: false, //控制表格加载动画提示
      queryData: {
        CompanyName: "",
        isLocked: null,
        type: null
      },
      treeData: [],
      filterText: "",
      defaultProps: {
        children: "childrenNodes",
        label: "labelName"
      },
      configSet: {
        selectToTime: false,
        selectTo: false
      },
      pageJson: {
        currentPage: 1, //当前页码
        total: 0, //总记录数
        pageSize: 10 //每页条数
      },
      tableDataColumn: [
        { prop: "companyName", label: "公司名" },
        { prop: "coDesc", label: "公司描述" },
        { prop: "tel", label: "电话" },
        {
          prop: "isLocked",
          label: "是否锁定",
          formatter: function(row) {
            if (row.isLocked == 1) {
              return "正常";
            } else {
              return "锁定";
            }
          }
        },
        { prop: "addDate", label: "添加时间" }
      ],
      tableData: [],
      selectTag: "",
      SelectOptions: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "锁定"
        },
        {
          value: "1",
          label: "正常"
        }
      ],
      treeLoading: true
    };
  },
  mounted() {
    this.getTree();
    this.queryCompanyDatas(1);
  },
  methods: {
    getTree() {
      //读取公司，部门数据
      this.$api
        .post({
          url: "/company/companyTree",
          token: false
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
        .catch(e => {
          console.log("读取失败");
          console.log(e);
        })
        .finally(() => {
          this.treeLoading = false;
        });
    },
    queryCompanyByParams() {
      this.queryData.isLocked = null;
      this.queryCompanyDatas(1);
    },
    queryCompanyDatas(currentPage) {
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      if (this.queryData.CompanyName != null) {
        params.CompanyName = this.queryData.CompanyName;
      }
      if (this.queryData.isLocked != null) {
        params.isLocked = this.queryData.isLocked;
      }
      this.loading = true;
      if (this.selectTag != null && this.selectTag != "") {
        params.isLocked = this.selectTag;
      }
      this.$api
        .post({
          url: "/company/companyList",
          data: params,
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
            console.log("查询公司管理列表结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询公司管理列表失败");
          console.log(e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    queryCompanyByIsLocked(isLocked) {
      this.queryData.isLocked = isLocked;
      this.queryCompanyDatas(1);
    },
    toAddCompanyPage(saveType) {
      if (this.queryData.type == null) {
        this.$alert("", "请选择一个节点", {
          dangerouslyUseHTMLString: false
        });
      } else {
        if (this.queryData.type != 1) {
          console.dir(this.company.parentId, this.company.id);
          if (saveType == 0) {
            this.$router.push({
              path: "/sys/addCompanyManage",
              query: { ParentId: this.company.parentId }
            });
          } else if (saveType == 1) {
            this.$router.push({
              path: "/sys/addCompanyManage",
              query: { ParentId: this.company.id }
            });
          }
        } else if (this.department != null && this.queryData.type != 0) {
          if (saveType == 1) {
            this.$router.push({
              path: "/sys/addCompanyManage",
              query: {
                deptParentID: this.department.id,
                ParentId: this.department.coId
              }
            });
          }
        }
        this.company = null;
      }
    },
    toAddDeptPage() {
      if (this.queryData.type == null) {
        this.$alert("", "请选择一个节点", {
          dangerouslyUseHTMLString: false
        });
      } else {
        if (this.company != null && this.queryData.type != 1) {
          var coId = this.company.id;
          this.$router.push({
            path: "addDeptManage",
            query: { ParentId: coId }
          });
        } else {
          this.$alert("", "请选择一个公司!!!", {
            dangerouslyUseHTMLString: false
          });
        }
      }
    },
    editCompanyDetail(companyId) {
      this.$router.push({
        path: "/sys/editCompanyDetail",
        query: { companyId: companyId }
      });
    },
    delCompanyDetail(id) {
      this.$api
        .post({
          url: "/company/del/" + id,
          token: true,
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            // this.$alert("", "删除成功", {
            //   dangerouslyUseHTMLString: false
            // });
            this.$message({
              type: "info",
              message: "删除成功"
            });
            //this.$router.push({ path: "/sys/companyList" });
            this.getTree();
            this.queryCompanyDatas(1);
          } else {
            // this.$alert("", "该公司有下级公司或部门,操作失败!!!", {
            //   dangerouslyUseHTMLString: false
            // });
            this.$message({
              type: "error",
              message: "该公司有下级公司或部门,操作失败!!!"
            });
          }
        })
        .catch(e => {
          console.log("删除失败");
          console.log(e);
        });
    },
    distributeEvent(e, companyId) {
      this[e](companyId);
    },
    // querySubsidiary(CompanyId){
    //   this.queryCompanyDatas(1,CompanyId);
    // },
    lockCompanyDetail(id) {
      this.isLockedCompanyDetail(id, 0);
    },
    unlockCompanyDetail(id) {
      this.isLockedCompanyDetail(id, 1);
    },
    isLockedCompanyDetail(id, isLocked) {
      this.$api
        .get({
          url: "/company/isLocked?id=" + id + "&isLocked=" + isLocked,
          token: true
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            this.$alert("", "锁定成功", {
              dangerouslyUseHTMLString: false
            });
            this.$router.push({ path: "/sys/companyList" });
          } else {
            this.$alert("", "该公司有下级公司或部门,操作失败!!!", {
              dangerouslyUseHTMLString: false
            });
          }
        })
        .catch(e => {
          console.log("操作失败");
          console.log(e);
        });
    },
    getOpeBtns() {
      let array = [
        { name: "编辑", isType: "1", methosName: "editCompanyDetail" },
        { name: "删除", isType: "1", methosName: "delCompanyDetail" },
        { name: "锁定", isType: "1", methosName: "lockCompanyDetail" },
        { name: "解锁", isType: "1", methosName: "unlockCompanyDetail" }
      ];
      // return array.filter((item) => {
      //   return item.isType.includes(type)
      // })
      return array;
    },
    handleSizeChange(val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryCompanyDatas(1);
    },
    handleCurrentChange(val) {
      this.queryCompanyDatas(val);
    },
    checkChange() {
      //console.log(e, "checkChange");
    },
    treeCheck(e) {
      this.$refs.tree2.setCheckedKeys([e.nodeId]);
      this.queryData.type = e.type;
      if (e.type == 0) {
        this.$api
          .get({
            url: "/company/" + e.businessId,
            token: false
          })
          .then(e => {
            //console.log(e.data);
            let result = e.data;
            if (result.code == 200) {
              //   console.log(result.message);
              //   console.log(result.data);
              this.company = result.data;
            } else {
              console.log("查询公司详情结果：" + result.message);
              alert(result.message);
            }
          })
          .catch(e => {
            console.log("查询公司详情失败");
            console.log(e);
          });
      } else if (e.type == 1) {
        this.$api
          .get({
            url: "/department/" + e.businessId,
            token: false
          })
          .then(e => {
            console.log(e.data);
            let result = e.data;
            if (result.code == 200) {
              //   console.log(result.message);
              //   console.log(result.data);
              this.department = result.data;
            } else {
              console.log("查询部门详情结果：" + result.message);
              alert(result.message);
            }
          })
          .catch(e => {
            console.log("查询部门详情失败");
            console.log(e);
          });
      }
      console.log(this.company);
    },
    //树输入筛选
    filterNode(value, data) {
      console.log(value, data);
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleChange(row) {
      console.log(row, "row");
      this.companyEntity = row;
      console.log(this.companyEntity, "this.companyEntity");
    },
    setUp() {
      if (this.companyEntity != null) {
        console.log("设置网站");
        console.log("this.companyEntity.companyId ,", this.companyEntity.id);
        this.$router.push({
          path: "/sys/setCompanyWebsite",
          query: { companyId: this.companyEntity.id }
        });
      } else {
        this.$alert("", "请选择操作记录", {
          dangerouslyUseHTMLString: false
        });
      }
    },
    SelectTag() {
      this.queryCompanyDatas(1);
    }
  }
};
</script>
