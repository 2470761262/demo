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
</style>
<template>
  <div class="page-content">
    <list-page
      v-show="!showForm"
      :parentData="$data"
      @queryTabData="queryTabData"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <template v-slot:top>
        <div class="query-cell">
          <el-button type="primary" size="mini" @click="addPosition"
            >新增</el-button
          >
          <div class="query-right">
            <el-input
              placeholder="角色名称搜索"
              size="small"
              v-model="queryData.keyword"
            >
            </el-input>
            <el-button
              type="primary"
              size="mini"
              @click="queryAddFloorListParams"
              >查询</el-button
            >
          </div>
        </div>
      </template>
      <template #tableColumn="cell">
        <template v-for="item in cell.tableData">
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :formatter="item.formatClientType"
            :key="item.prop"
          ></el-table-column>
        </template>

        <el-table-column label="操作" fixed="right" width="420px">
          <template v-slot="scope">
            <el-button
              type="primary"
              size="mini"
              @click="setEmployeeAuthority(scope.row)"
              >个人权限设置</el-button
            >
            <el-button
              type="warning"
              size="mini"
              @click="setPosition(scope.row)"
              >权限设置</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="updatePosition(scope.row)"
              >修改</el-button
            >
            <el-button type="danger" size="mini" @click="delPosition(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </template>
    </list-page>
    <template>
      <el-card class="box-card" v-show="showForm">
        <div slot="header" class="clearfix">
          <span>人员管理</span>
        </div>
        <div class="text item">
          <div class="formItem">
            <el-input v-model="positionObj.positionName" placeholder="角色名称">
              <template slot="prepend">角色名称:</template>
            </el-input>
          </div>
          <div class="formItem">
            <el-input v-model="positionObj.positionDesc" placeholder="角色描述">
              <template slot="prepend">角色描述:</template>
            </el-input>
          </div>
          <!--          <div class="formItem ">-->
          <!--            <el-input v-model="positionObj.positionLevel"-->
          <!--                      placeholder="角色级别">-->
          <!--              <template slot="prepend">角色级别:</template>-->
          <!--            </el-input>-->
          <!--          </div>-->
          <!--          <div class="formItem " v-if="role">-->
          <!--            <el-input v-model="positionObj.roleName"-->
          <!--                      readonly="readonly"-->
          <!--                      placeholder="岗位">-->
          <!--              <template slot="prepend">关联岗位:</template>-->
          <!--            </el-input>-->
          <!--          </div>-->
        </div>
        <div class="text item">
          <div class="formItem" style="float: right;margin-right: 230px;">
            <el-button type="primary" @click="savePositionObj">保存</el-button>
            <el-button type="primary" @click="cancel">取消</el-button>
          </div>
        </div>
      </el-card>
    </template>
  </div>
</template>
<script>
import listPage from "@/components/listPage";
import getMenuRid from "@/minxi/getMenuRid";
import getToken from "@/minxi/getUrlToken";
export default {
  mixins: [getMenuRid, getToken],
  components: {
    listPage
  },
  data() {
    return {
      sidebarFlag: false,
      role: false,
      loading: false,
      showForm: false,
      queryData: {
        keyword: "",
        roleName: "",
        oldRoleId: null
      },
      pageJson: {
        currentPage: 1, //当前页码
        total: 0, //总记录数
        pageSize: 10 //每页条数
      },
      tableDataColumn: [
        { prop: "id", label: "岗位ID", formatter: row => row.id },
        {
          prop: "positionName",
          label: "角色名称",
          formatter: row => row.positionName
        },
        {
          prop: "positionCount",
          label: "角色人数",
          formatter: row => row.positionCount
        },
        {
          prop: "positionDesc",
          label: "角色描述",
          formatter: row => row.positionDesc
        },
        { prop: "modDate", label: "操作时间", formatter: row => row.modDate }
        // { prop: 'del', label: "有效状态",formatter:(row)=> row.del},
        // { prop: 'postRuleCode', label: "PC角色权限码",formatter:(row)=> row.postRuleCode},
        // { prop: 'postClientRuleCode', label: "客户端权限码",formatter:(row)=> row.postClientRuleCode},
        // { prop: 'postWapRuleCode', label: "WAP权限码",formatter:(row)=> row.postWapRuleCode},
        // { prop: 'positionWage', label: "岗位工资",formatter:(row)=> row.positionwage},
        // { prop: 'positionLevel', label: "角色级别",formatter:(row)=> row.positionLevel},
        // { prop: 'addName', label: "添加人",formatter:(row)=> row.addName},
      ],
      tableData: [],
      positionObj: {},
      saveType: null
    };
  },
  mounted() {
    this.queryData.oldRoleId = this.$route.query.id;
    this.queryData.roleName = this.$route.query.name;
    this.queryAddFloorList(1);
  },
  methods: {
    queryTabData() {
      console.log(this, "111");
    },
    //查询按钮
    queryAddFloorListParams() {
      this.queryAddFloorList(1);
    },
    //查询数据
    queryAddFloorList(currentPage) {
      var that = this;
      let params = { limit: that.pageJson.pageSize, page: currentPage };
      params.keyword = that.queryData.keyword;
      if (that.queryData.oldRoleId != null) {
        this.role = true;
        params.oldRoleId = that.queryData.oldRoleId;
        console.log(params);
        this.$api
          .post({
            url: "/sys/position",
            data: params,
            qs: true
          })
          .then(e => {
            console.log(e.data);
            let data = e.data;
            if (data.code == 200) {
              that.pageJson.total = data.data.totalCount;
              that.pageJson.currentPage = data.data.currPage;
              that.tableData = data.data.list;
            }
          })
          .catch(e => {
            console.log("查询角色列表失败");
            console.log(e);
          });
      } else {
        this.$alert("", "请从岗位管理页面选择对应岗位!!!", {
          dangerouslyUseHTMLString: false
        });
        this.$router.push({ path: "/sys/roleManagementList" });
      }
    },
    //取消
    cancel() {
      this.positionObj = {};
      this.showForm = false;
    },
    // queryTabData() {
    //   this.$emit("queryTabData");
    //   console.log(this.queryData);
    //   this.queryAddFloorListParams();
    // },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryAddFloorList(val);
    },
    handleSizeChange(val) {
      console.log(`每1页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryAddFloorList(1);
    },
    //新增
    addPosition() {
      console.log("add..");
      this.positionObj = {};
      if (this.queryData.oldRoleId != null) {
        this.positionObj.oldRoleId = this.queryData.oldRoleId;
        this.positionObj.roleName = this.queryData.roleName;
      }
      this.showForm = true;
      this.saveType = "add";
    },
    //修改
    updatePosition(e) {
      console.log(e, "update..");
      this.$api
        .get({
          url: "/sys/position/" + e.id
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            console.log(result.data);
            this.positionObj = result.data;
            if (this.queryData.oldRoleId != null) {
              this.positionObj.oldRoleId = this.queryData.oldRoleId;
              this.positionObj.roleName = this.queryData.roleName;
            }
            this.showForm = true;
            this.saveType = "update";
          } else {
            console.log("修改查询操作失败：" + result.message);
            this.$message.error("修改查询操作失败：" + result.message);
          }
        });
    },
    //删除
    delPosition(e) {
      console.log(e, "del..");
      this.$confirm("确定删除 " + e.positionName + " 角色么？", "友情提醒", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        this.$api
          .delete({
            url: "/sys/position/" + e.id,
            data: this.ruleObj,
            headers: { "Content-Type": "application/json;charset=UTF-8" }
          })
          .then(e => {
            console.log(e.data);
            let result = e.data;
            if (result.code == 200) {
              console.log(result.message);
              console.log(result.data);
              this.$message.info("操作成功");
              this.saveType = null;
              this.queryAddFloorListParams();
            } else {
              console.log("删除操作失败：" + result.message);
              this.$message.error("删除操作失败：" + result.message);
            }
          });
      });
    },
    //设置权限
    setPosition(e) {
      var that = this;
      //跳转页面
      that.$router.push({ path: "/sys/setPosition", query: { id: e.id } });
    },
    //保存角色信息
    savePositionObj() {
      if (!this.positionObj) {
        this.$message.error("角色信息未填写");
        return;
      }
      if (!this.positionObj.positionName) {
        this.$message.error("角色名称未填写");
        return;
      }
      if (!this.positionObj.positionDesc) {
        this.$message.error("角色描述未填写");
        return;
      }
      // if (!this.positionObj.positionLevel) {
      //   this.$message.error("角色级别未填写");
      //   return;
      // }
      if (!this.saveType) {
        this.$message.error("保存信息saveType错误");
        return;
      }
      this.$api
        .put({
          url: "/sys/position/" + this.saveType,
          data: this.positionObj,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            console.log(result.data);
            this.$message.info("操作成功");
            this.showForm = false;
            this.saveType = null;
            //刷新表格
            this.queryAddFloorListParams();
          } else {
            console.log("删除操作失败：" + result.message);
            this.$message.error("删除操作失败：" + result.message);
          }
        })
        .catch(e => {
          console.log("删除操作失败异常");
          console.log(e);
        });
      this.$message.error("删除操作失败异常");
    },
    //个人权限设置
    setEmployeeAuthority(e) {
      let that = this;
      //跳转页面
      that.$router.push({
        path: "/sys/authority/employeeList",
        query: { id: e.id }
      });
    }
  }
};
</script>
