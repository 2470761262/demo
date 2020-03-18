<style lang="less" scoped>
.query-cell {
  display: flex;
}
.elTree {
  width: 200px;
  margin-right: 20px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  padding: 15px 15px 15px;
  border-radius: 10px;

  /deep/ .el-input {
    margin: 10px 0 10px;
  }

  float: left;
}
</style>


<template >
  <div>
    <template>
      <div class="elTree">
        <el-tree
          ref="tree2"
          :data="treeData"
          :default-expanded-keys="[1]"
          node-key="nodeId"
          show-checkbox
          :props="defaultProps"
          @check-change="checkChange"
          @check="treeCheck"
          :highlight-current="true"
          :filter-node-method="filterNode"
        ></el-tree>
      </div>
    </template>
    <list-page
      :parentData="$data"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <template v-slot:top>
        <div class="query-cell">
          <el-input placeholder="公司名称" v-model="queryData.CompanyName" clearable>
            <template slot="prepend">公司名</template>
          </el-input>
          <el-button
            type="primary"
            style="margin-left:10px"
            size="mini"
            @click="queryCompanyByParams"
          >查询</el-button>
          <el-button type="primary" size="mini" @click="toAddCompanyPage(0)">添加同级公司</el-button>
          <el-button type="primary" size="mini" @click="toAddCompanyPage(1)">添加子公司</el-button>
          <el-button type="primary" size="mini" @click="toAddDeptPage">添加子级部门</el-button>
          <el-button type="primary" size="mini" @click="queryCompanyByIsLocked(0)">查询锁定公司</el-button>
          <el-button type="primary" size="mini" @click="queryCompanyByIsLocked(1)">查询未锁定公司</el-button>
        </div>
      </template>
      <template v-slot:tableColumn="cell">
        <template v-for="item in cell.tableData">
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :key="item.prop"
          ></el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" fixed="right" key="operation">
          <template v-slot="scope">
            <div v-if="scope.row.operation!=''">
              <el-button
                type="info"
                size="mini"
                @click="distributeEvent(item.methosName,scope.row.id)"
                v-for="(item,index) in getOpeBtns(scope.row.operation)"
                :key="index"
              >{{item.name}}</el-button>
            </div>
          </template>
        </el-table-column>
      </template>
    </list-page>
  </div>
</template >



<script>
import listPage from "@/components/listPage";
export default {
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  components: {
    listPage
  },
  data() {
    return {
      sidebarFlag:false,
      company: {},
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
        total: 9, //总记录数
        pageSize: 10 //每页条数
      },
      tableDataColumn: [
        
        { prop: "companyName", label: "公司名" },
        { prop: "coDesc", label: "公司描述" },
        { prop: "tel", label: "电话" },
        { prop: "addDate", label: "添加时间" }
      ],
      tableData: []
    }
  },
  mounted() {
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
      });
    this.queryCompanyDatas(1);
  },
  methods: {
    queryCompanyByParams() {
      this.queryData.isLocked = null;
      this.queryCompanyDatas(1);
    },
    queryCompanyDatas(currentPage) {
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      let that = this;
      if (this.queryData.CompanyName != null) {
        params.CompanyName = this.queryData.CompanyName;
      }
      if (this.queryData.isLocked != null) {
        params.isLocked = this.queryData.isLocked;
      }
      this.$api
        .post({
          url: "/company/companyList",
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
            console.log("查询公司管理列表结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询公司管理列表失败");
          console.log(e);
        });
    },
    queryCompanyByIsLocked(isLocked) {
      this.queryData.isLocked = isLocked;
      this.queryCompanyDatas(1);
    },
    toAddCompanyPage (saveType) {
      if(this.queryData.type == null ){
        this.$alert('', '请选择一个节点', {
            dangerouslyUseHTMLString: false
          });
      }else {
        if(this.queryData.type != 1){
          if (saveType == 0){
            this.$router.push({ name: "addCompanyManage", params:{ParentId:this.company.ParentId} });
          }else if(saveType == 1){
            this.$router.push({ name: "addCompanyManage", params:{ParentId:this.company.id}  });
          }
      }else if(this.department != null && this.queryData.type != 0){
          if(saveType == 1){
            this.$router.push({ name: "addCompanyManage", params:{deptParentID:this.department.id,ParentId:this.department.coId}  });
          }
      }
      this.company=null;
      }
    },
    toAddDeptPage () {
      if(this.queryData.type == null){
        this.$alert('', '请选择一个节点', {
            dangerouslyUseHTMLString: false
          });
      }else{
        if(this.company != null && this.queryData.type != 1){
        var coId = this.company.id;
      this.$router.push({ name: "addDeptManage", params: { ParentId: coId } });
      }else{
         this.$alert('', '请选择一个公司!!!', {
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
            this.$alert("", "删除成功", {
              dangerouslyUseHTMLString: false
            });
            this.$router.push({ path: "/sys/companyList" });
          }else{
             this.$alert("", "该公司有下级公司或部门,操作失败!!!", {
              dangerouslyUseHTMLString: false
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
    lockCompanyDetail(id){
      this.isLockedCompanyDetail(id,0)
    },
    unlockCompanyDetail(id){
      this.isLockedCompanyDetail(id,1)
    },
    isLockedCompanyDetail(id,isLocked){
        this.$api.get({
          url:"/company/isLocked?id="+id+"&isLocked="+isLocked,
          token:true,
        }).then(e=>{
          let result = e.data;
          if (result.code == 200) {
            this.$alert("", "锁定成功", {
              dangerouslyUseHTMLString: false
            });
            this.$router.push({ path: "/sys/companyList" });
          }else{
             this.$alert("", "该公司有下级公司或部门,操作失败!!!", {
              dangerouslyUseHTMLString: false
            });
          }
        }).catch(e => {
          console.log("操作失败");
          console.log(e);
        });
    },
    getOpeBtns(type) {
      let array = [
        { name: "编辑", isType: "1", methosName: "editCompanyDetail" },
        { name: "删除", isType: "1", methosName: "delCompanyDetail" },
        { name: "锁定", isType: "1", methosName: "lockCompanyDetail" },
        { name: "解锁", isType: "1", methosName: "unlockCompanyDetail" },
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
    checkChange(e, data, childData) {
      console.log(e, "checkChange");
    },
    treeCheck(e, data) {
      this.queryData.type = e.type;
      if (e.type == 0) {
        this.$api
          .get({
            url: "/company/" + e.businessId,
            token: false
          })
          .then(e => {
            console.log(e.data);
            let result = e.data;
            if (result.code == 200) {
              console.log(result.message);
              console.log(result.data);
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
              console.log(result.message);
              console.log(result.data);
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
    },
    //树输入筛选
    filterNode(value, data) {
      console.log(value, data);
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  }
};
</script>
