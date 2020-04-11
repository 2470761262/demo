<style lang="less" scoped>
.flex-row {
  display: flex;
  &.flex-row40 {
    /deep/.el-form-item {
      flex: 0 0 40%;
    }
  }
  /deep/.el-form-item {
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
    <el-form ref="form"
             :rules="rules"
             :model="DeptEntity"
             label-width="130px">
      <div class="flex-row">
        <el-form-item label="部门名称:"
                      prop="deptName">
          <el-input v-model="DeptEntity.deptName"
                    readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="部门首拼"
                      prop="header">
          <el-input v-model="DeptEntity.header"
                    readonly="readonly"></el-input>
        </el-form-item>

        <el-form-item label="电话:">
          <el-input v-model="DeptEntity.tel"></el-input>
        </el-form-item>
        <el-form-item label="开业时间">
          <el-date-picker v-model="DeptEntity.regDate"
                          type="date"
                          placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </div>
      <div class="flex-row">
        <el-form-item label="部门类型:"
                      prop="deptType">
          <el-select type="text"
                     v-model="DeptEntity.deptType">
            <el-option label="综合"
                       :value="1" />
            <el-option label="业务"
                       :value="2" />
            <el-option label="行政"
                       :value="3" />
            <el-option label="联营"
                       :value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="片区:"
                      prop="isArea">
          <el-select type="text"
                     placeholder="是否片区"
                     v-model="DeptEntity.isArea">
            <el-option label="是片区"
                       :value="1" />
            <el-option label="不是片区"
                       :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门编码:">
          <el-input type="text"
                    placeholder="请输入内容"
                    v-model="DeptEntity.deptCode"
                    maxlength="100"
                    show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="选择负责人:"
                      prop="perName">
          <el-dialog title="请选择:"
                     :visible.sync="dialogVisible"
                     width="50%"
                     :before-close="handleClose">
            <list-page :parentData="$data"
                       highlight-current-row
                       @handleSizeChange="handleSizeChange"
                       @handleCurrentChange="handleCurrentChange"
                       @current-change="handleChange">
              <template v-slot:tableColumn="cell">
                <template v-for="item in cell.tableData">
                  <el-table-column :prop="item.prop"
                                   :label="item.label"
                                   :width="item.width"
                                   :key="item.prop"></el-table-column>
                </template>
              </template>
            </list-page>
          </el-dialog>
          <el-input type="text"
                    v-model="DeptEntity.perName"
                    @focus="getDialogVisible()"></el-input>
        </el-form-item>
      </div>

      <el-form-item label="加入类型"
                    prop="joinType">
        <el-select type="text"
                   placeholder="请输入内容"
                   v-model="DeptEntity.joinType">
          <el-option label="直营"
                     :value="1" />
          <el-option label="加盟"
                     :value="2" />
          <el-option label="联营"
                     :value="3" />
        </el-select>
      </el-form-item>

      <el-form-item label="部门属性:">
        <el-select type="text"
                   placeholder="请输入内容"
                   v-model="DeptEntity.isCom"
                   show-word-limit>
          <el-option label="运营期"
                     :value="1" />
          <el-option label="拓展期"
                     :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="选择店面:">
        <el-dialog title="请选择:"
                   :visible.sync="dialogVisible3"
                   width="40%"
                   :before-close="handleClose">
          <list-page :parentData="$data"
                     highlight-current-row
                     @handleSizeChange="handleSizeChange3"
                     @handleCurrentChange="handleCurrentChange3"
                     @current-change="handleChange3">
            <template v-slot:tableColumn="cell">
              <template v-for="item in cell.tableData">
                <el-table-column :prop="item.prop"
                                 :label="item.label"
                                 :width="item.width"
                                 :key="item.prop"></el-table-column>
              </template>
            </template>
          </list-page>
        </el-dialog>
        <el-input type="text"
                  v-model="DeptEntity.storeName"
                  @focus="getDialogVisible3()"
                  readonly="readonly"></el-input>
      </el-form-item>

      <el-form-item label="地址:">
        <el-input type="text"
                  placeholder="请输入内容"
                  v-model="DeptEntity.address"></el-input>
      </el-form-item>
      <el-form-item label="部门描述">
        <el-input type="text"
                  placeholder="请输入内容"
                  v-model="DeptEntity.deptDesc"></el-input>
      </el-form-item>

      <div class="footerContainer el-top">
        <el-button type="primary"
                   @click="saveDept()">确定</el-button>
        <el-button type="primary"
                   @click="back()">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import listPage from "@/components/listPage";
import getMenuRid from "@/minxi/getMenuRid";
export default {
  mixins: [getMenuRid],
  components: {
    listPage
  },
  props: {},
  data() {
    return {
      rules: {
        deptName: [
          { required: true, message: "请输入部门名", trigger: "blur" }
        ],
        header: [
          { required: true, message: "请输入部门首拼", trigger: "blur" }
        ],
        managerPer: [
          { required: true, message: "请选择负责人", trigger: "blur" }
        ],
        deptType: [
          { required: true, message: "请选择部门类型", trigger: "blur" }
        ],
        joinType: [
          { required: true, message: "请选择加入类型", trigger: "blur" }
        ]
      },
      sidebarFlag: false,
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
      DeptEntity: {
        id: null,
        deptName: null,
        header: null,
        tel: null,
        joinType: null,
        deptCode: null,
        regDate: null,
        deptType: null,
        managerPer: null,
        address: null,
        deptDesc: null,
        isArea: null,
        backUrl: null,
        perName: null,
        sId: null,
        storeName: null
      },
      dialogVisible: false,
      dialogVisible3: false,
      jumpNodeId: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    getDialogVisible() {
      debugger;
      this.dialogVisible = true;
      this.getPrincipal(1);
      this.tableDataColumn = [
        { prop: "perName", label: "姓名" },
        { prop: "deptName", label: "部门" },
        { prop: "companyName", label: "公司" },
        { prop: "positionName", label: "岗位" }
      ];
    },
    getPrincipal(currentPage) {
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      params.coId = this.DeptEntity.coId;
      params.postId = this.$api
        .post({
          url: "/employee/dept/selectPrincipal",
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
    handleClose() {
      this.dialogVisible = false;
      this.dialogVisible3 = false;
    },
    saveDept() {
      if (
        /^(((13[0-9]{1})|(19[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(
          this.DeptEntity.tel
        )
      ) {
        let params = this.DeptEntity;
        this.$api
          .put({
            url: "/department/update",
            data: params,
            token: false,
            headers: { "Content-Type": "application/json" }
          })
          .then(e => {
            let result = e.data;
            if (result.code == 200) {
              console.log(result.message);
              this.$alert("", "修改成功", {
                dangerouslyUseHTMLString: false
              });

              if (this.backUrl === "hrTree") {
                this.$router.push({
                  path: "/sys/hrTree/hrTree",
                  query: { cur: this.jumpNodeId }
                });
              } else {
                this.$router.push({ path: "/sys/DeptManageList" });
              }
              console.log(result.data);
              this.$message({ message: result.message });
            }
          })
          .catch(e => {
            console.log("修改失败");
            console.log(e);
          });
      } else {
        this.$alert("", "请填写正确的电话号码!!!", {
          dangerouslyUseHTMLString: false
        });
      }
    },
    back() {
      if (this.backUrl === "hrTree") {
        this.$router.push({
          path: "/sys/hrTree/hrTree",
          query: { cur: this.jumpNodeId }
        });
      } else {
        this.$router.push({ path: "/sys/DeptManageList" });
      }
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
      console.log(row);
      this.DeptEntity.managerPer = row.accountId;
      this.DeptEntity.perName = row.perName;
    },
    getStores(currentPage) {
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      this.$api
        .post({
          url: "/stroe/list/dept",
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
            //debugger;
            if (result.data.list != null && result.data.list.length > 0) {
              this.pageJson.total = result.data.totalCount;
              this.pageJson.currentPage = result.data.currPage;
              this.tableData = result.data.list;
            } else {
              this.$alert("", "请检查你的权限范围!!!", {
                dangerouslyUseHTMLString: false
              });
            }
          } else {
            console.log("查询门店列表结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询门店列表结果：失败!!!");
          console.log(e);
        });
    },
    getDialogVisible3() {
      this.dialogVisible3 = true;
      this.getStores(1);
      this.tableDataColumn = [{ prop: "storeName", label: "门店" }];
    },
    handleSizeChange3(val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.getStores(1);
    },
    handleCurrentChange3(val) {
      this.getStores(val);
    },
    handleChange3(row) {
      console.log(row);
      this.DeptEntity.storeName = row.storeName;
      this.DeptEntity.sId = row.id;
    }
  },
  created() {
    this.id = this.$route.query.id;
    if (this.$route.query.back != null) {
      this.backUrl = this.$route.query.back;
    }
    if (this.$route.query.cur != null) {
      this.jumpNodeId = this.$route.query.cur;
    }
  },
  mounted() {
    console.log("准备查询部门详情");
    this.$api
      .get({
        url: "/department/" + this.id,
        token: false
      })
      .then(e => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);
          this.DeptEntity = result.data;
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
};
</script>
