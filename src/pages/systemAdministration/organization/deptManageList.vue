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


<template>
  <div>
    <template >
      <div class="elTree">
        <!--        <el-input placeholder="输入关键字进行过滤" v-model="filterText">-->
        <!--        </el-input>-->
        <el-tree ref="tree2"
                 :data="treeData"
                 :default-expanded-keys="[1]"
                 node-key="nodeId"
                 show-checkbox
                 :props="defaultProps"
                 @check-change="checkChange"
                 @check="treeCheck"
                 :highlight-current="true"
                 :filter-node-method="filterNode"></el-tree>
      </div>
    </template>

    <list-page :parentData="$data"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
      <template v-slot:top>
        <div class="query-cell">
          <el-input placeholder="部门名称"
                    v-model="queryData.DeptName"
                    clearable>
            <template slot="prepend">部门名</template>
          </el-input>
          <el-button type="primary"
                     style="margin-left:10px"
                     size="mini"
                     @click="queryDeptByParams">查询</el-button>
          <el-button type="primary"
                     size="mini"
                     @click="toAddDeptPage(0)">添加同级部门</el-button>
          <el-button type="primary"
                     size="mini"
                     @click="toAddDeptPage(1)">添加子级部门</el-button>
          <el-button type="primary"
                     size="mini"
                     @click="queryDeptByIsLocked(0)">查询锁定部门</el-button>
          <el-button type="primary"
                     size="mini"
                     @click="queryDeptByIsLocked(1)">查询未锁定部门</el-button>
        </div>
      </template>
      <template v-slot:tableColumn="cell">
        <template v-for="item in cell.tableData">
          <el-table-column :prop="item.prop"
                           :label="item.label"
                           :width="item.width"
                           :key="item.prop">
          </el-table-column>
        </template>
        <el-table-column prop="operation"
                         label="操作"
                         fixed="right"
                         key="operation">
          <template v-slot="scope">
            <div v-if="scope.row.operation!=''">
              <el-button type="info"
                         size="mini"
                         @click="distributeEvent(item.methosName,scope.row.id)"
                         v-for="(item,index) in getOpeBtns(scope.row.operation)"
                         :key="index">{{item.name}}</el-button>
            </div>
          </template>
        </el-table-column>
      </template>
    </list-page>
  </div>
</template>

<script>
import listPage from "@/components/listPage";

export default { 
  
  components: {
    listPage
  },
  data () {
    return {
      loading: false, //控制表格加载动画提示
      department:{},
      queryData: {
        DeptName: "",
        del: 0,
        isLocked:null,
        flag:false,
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
        { prop: "id", label: "部门id" },
        { prop: "deptName", label: "部门名" },
        { prop: "header", label: "部门名称首拼" },
        { prop: "managerPer", label: "负责人id" },
        { prop: "deptParentID", label: "上级部门id" },
        { prop: "joinType", label: "加入类型:1 直营 2 加盟" },
        { prop: "deptType", label: "部门类型：1综合，2业务，3行政，4联营" },
        { prop: "del", label: "是否有效: 0有效,1无效" },
        { prop: "isLocked", label: "是否锁定: 0锁定,1正常" },
        { prop: "address", label: "部门地址" },
      ],
      tableData: [],
      treeData: [],
      filterText: "",
      defaultProps: {
        children: "childrenNodes",
        label: "labelName"
      },
    }
  },
  mounted () {
    //读取公司，部门数据
      this.$api
        .post({
          url: "/sys/account/company/tree",
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
            console.log("载入结果"+ + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("读取失败");
          console.log(e);
        });
     this.queryDeptDatas(1);
  },
  methods: {
    queryDeptByParams () {
      this.queryData.isLocked = null;
      this.queryDeptDatas(1);
    },
    queryDeptDatas (currentPage) {
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      let that = this;
      if (this.queryData.DeptName != null) {
        params.deptName = this.queryData.DeptName;
      }
      if (this.queryData.isLocked != null) {
        params.isLocked = this.queryData.isLocked;
      }
        params.del = this.queryData.del;
      this.$api.post({
        url: '/department/list',
        data: params,
        token: false,
        headers: { "Content-Type": "application/json" }
      }).then((e) => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);
          for (var i = 0; i < result.data.list.length; i++) {
               switch (result.data.list[i].del) {
                    case 0:
                            result.data.list[i].del  = "有效";
                            break;
                    case 1:
                            result.data.list[i].del  = "无效";
                            break;
                    
               }
               switch (result.data.list[i].isLocked) {
                    case 0:
                            result.data.list[i].isLocked  = "锁定";
                            break;
                    case 1:
                            result.data.list[i].isLocked  = "正常";
                            break;
                    
               }
               switch (result.data.list[i].deptType) {
                    case 1:
                            result.data.list[i].deptType  = "综合";
                            break;
                    case 2:
                            result.data.list[i].deptType  = "业务";
                            break;
                    case 3:
                            result.data.list[i].deptType  = "行政";
                            break;
                    case 4:
                            result.data.list[i].deptType  = "联营";
                            break;
                    
               }
               switch (result.data.list[i].joinType) {
                    case 1:
                            result.data.list[i].joinType  = "直营";
                            break;
                    case 2:
                            result.data.list[i].joinType  = "加盟";
                            break;
                    
               }
            }
          this.pageJson.total = result.data.totalCount;
          this.pageJson.currentPage = result.data.currPage;
          this.tableData = result.data.list;
        } else {
          console.log("查询部门管理列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询部门管理列表失败");
        console.log(e);
      })
    },
    queryDeptByIsLocked(isLocked){
      this.queryData.isLocked = isLocked;
      this.queryDeptDatas (1);
    },
    toAddDeptPage (saveType) {
      if(this.queryData.flag ){
        if(saveType == 0){
        this.$router.push({ name: "addDeptManage",params: {deptParentID:this.department.deptParentID,coId:this.department.coId }});
        this.department = null;
        }else if(saveType == 1){
        this.$router.push({ name: "addDeptManage",params: {deptParentID:this.department.id,coId:this.department.coId }});
        this.department = null;
       }
      }else{
         this.$alert('', '请选择一个部门节点', {
            dangerouslyUseHTMLString: false
          });
      }
    },
    editDeptDetail (id) {
      this.$router.push({ path: "/sys/editDeptDetail", query: { id: id } });
    },
    delDeptDetail (id){
     this.$api.post({
        url: '/department/del/'+id,
        token: false,
        headers: { "Content-Type": "application/json" }
      }).then((e) => {
        let result = e.data;
        if (result.code == 200) {
          this.$alert('', '删除成功', {
            dangerouslyUseHTMLString: false
          });
          this.$router.push({ path: "/sys/deptManageList"});
        }
      }).catch((e) => {
        console.log("删除失败");
        console.log(e);
      })
    },
    distributeEvent (e, id) {
      this[e](id);
    },
    // querySubsidiary(DeptId){
    //   this.queryDeptDatas(1,DeptId);
    // },
    getOpeBtns (type) {
      let array = [
         { name: '编辑', isType: '1', methosName: 'editDeptDetail' },
         { name: '删除', isType: '1', methosName: 'delDeptDetail' },
        // { name: '子部门', isType: '1', methosName: 'querySubsidiary' },
      ]
      // return array.filter((item) => {
      //   return item.isType.includes(type)
      // })
      return array;
    },
    handleSizeChange (val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryDeptDatas(1);
    },
    handleCurrentChange (val) {
      this.queryDeptDatas(val);
    },
    checkChange (e, data, childData) {
      console.log(e, data, childData, "checkChange"); 
    },
    treeCheck (e, data) {
     this.queryData.flag = true ;
    if(e.type == 0 ){
      this.$api.get({
        url: '/company/'+e.businessId,
        token: false
      }).then((e) => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);
          this.company=result.data;
        } else {
          console.log("查询公司详情结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询公司详情失败");
        console.log(e);
      })    
      }else if (e.type == 1 ) {
      this.$api.get({
        url: '/department/'+e.businessId,
        token: false
      }).then((e) => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);
          this.department=result.data;
        } else {
          console.log("查询部门详情结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询部门详情失败");
        console.log(e);
      })    
      }
     
      
      console.log(e, data, "check..");
    },
    //树输入筛选
    filterNode (value, data) {
      console.log(value, data);
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
  }
};
</script>