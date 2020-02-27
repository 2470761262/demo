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
    
    <list-page :parentData="$data"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
      <template v-slot:top>
        <div class="query-cell">
            <el-input placeholder="门店名/部门/小组"
                      v-model="queryData.keyWord"
                      clearable>
              <template slot="prepend">关键字</template>
            </el-input>
            <el-button type="primary"
                     style="margin-left:10px"
                     size="mini"
                     @click="queryStroeByParams">查询</el-button>
            <el-button type="primary"
                     style="margin-left:10px"
                     size="mini"
                     @click="toAddStroePage"
                     v-if="showList">添加</el-button>
            <el-button type="primary"
                style="margin-left:10px"
                size="mini"
                @click="queryStroeDatas(1)">实体店面</el-button>
            <el-button type="primary"
                style="margin-left:10px"
                size="mini"
                @click="queryStroeDeptDatas(1)">行政小组</el-button>
        </div>
      </template>
      <template v-slot:tableColumn="cell"   >
        <template v-for="item in cell.tableData"  >
          <el-table-column :prop="item.prop"
                           :label="item.label"
                           :width="item.width"
                           :key="item.prop">
          </el-table-column>
        </template>
        <el-table-column prop="operation"
                         label="操作"
                         fixed="right"
                         key="operation" >
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
      showList:true,
      loading: false, //控制表格加载动画提示
      queryData: {
        keyWord: "",//查询关键字:以门店名/部门/小组为条件
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
      tableDataColumn:[],
      tableData: [],
    }
  },
  mounted () {
     this.queryStroeDatas(1);
  },
  methods: {
    queryStroeByParams () {
      this.queryStroeDatas(1);
    },
    queryStroeDatas (currentPage) {
        this.showList = true ;
        this.tableData = [];
        this.tableDataColumn = [  { prop: "id", label: "门店id",width:"70px" },
                                { prop: "storeName", label: "店面",width:"165px" },
                                { prop: "flagSale", label: "职务" ,width:"165px"},
                                { prop: "shoreAddress", label: "地址" },
                                { prop: "shoreTel", label: "电话" },
                                { prop: "shoreType", label: "类型" },
                                { prop: "storeDesc", label: "描述" },
                                { prop: "regDate", label: "开业时间", },
                                ]
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      let that = this;
      if (this.queryData.keyWord != null) {
        params.keyWord = this.queryData.keyWord;
      }
      this.$api.post({
        url: '/stroe/list',
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
               switch (result.data.list[i].flagSale) {
                    case "0":
                            result.data.list[i].flagSale  = "文职";
                            break;
                    case "1":
                            result.data.list[i].flagSale  = "职务";
                            break;
                
               }
               switch (result.data.list[i].shoreType) {
                    case 0:
                            result.data.list[i].shoreType  = "加盟店";
                            break;
                    case 1:
                            result.data.list[i].shoreType  = "直营店";
                            break;
                
               }
            }
          this.pageJson.total = result.data.totalCount;
          this.pageJson.currentPage = result.data.currPage;
          this.tableData = result.data.list;

        } else {
          console.log("查询门店管理列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询门店管理列表失败");
        console.log(e);
      })
    },
    queryStroeDeptDatas (currentPage) {
        this.showList = false ;
        this.tableData = []
        this.tableDataColumn = [  { prop: "deptName", label: "小组"},
                                { prop: "storeName", label: "店面",width:"165px" },
                                { prop: "shoreAddress", label: "地址" },
                                { prop: "shoreTel", label: "电话" },
                                { prop: "flagSale", label: "职务" ,width:"120px"},
                                { prop: "shoreType", label: "类型" },
                                { prop: "storeDesc", label: "描述" },
                                { prop: "regDate", label: "开业时间", },
                                ]
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      let that = this;
      if (this.queryData.keyWord != null) {
        params.keyWord = this.queryData.keyWord;
      }
      this.$api.post({
        url: '/stroe/deptList',
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
               switch (result.data.list[i].flagSale) {
                    case "0":
                            result.data.list[i].flagSale  = "文职";
                            break;
                    case "1":
                            result.data.list[i].flagSale  = "职务";
                            break;
                
               }
               switch (result.data.list[i].shoreType) {
                    case 0:
                            result.data.list[i].shoreType  = "加盟店";
                            break;
                    case 1:
                            result.data.list[i].shoreType  = "直营店";
                            break;
                
               }
            }
          this.pageJson.total = result.data.totalCount;
          this.pageJson.currentPage = result.data.currPage;
          this.tableData = result.data.list;

        } else {
          console.log("查询门店管理列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询门店管理列表失败");
        console.log(e);
      })
    },
    toAddStroePage () {
      this.$router.push({ path: "/sys/addStroe" });
    },
    editStroe (id) {
      this.$router.push({ path: "/sys/editStroe", query: { id: id } });
    },
    delStroe (id){
     this.$api.post({
        url: '/stroe/del/'+id,
        token: false,
        headers: { "Content-Type": "application/json" }
      }).then((e) => {
        let result = e.data;
        if (result.code == 200) {
          this.$alert('', '删除成功', {
            dangerouslyUseHTMLString: false
          });
          this.$router.push({ path: "/sys/stroeList"});
        }
      }).catch((e) => {
        console.log("删除失败");
        console.log(e);
      })
    },
    distributeEvent (e, id) {
      this[e](id);
    },
    // querySubsidiary(StroeId){
    //   this.queryStroeDatas(1,StroeId);
    // },
    getOpeBtns (type) {
        let array = [];
        if (this.showList){
             array = [
                        { name: '详情', isType: '1', methosName: 'openDetails' },
                        { name: '编辑', isType: '1', methosName: 'editStroe' },
                        { name: '删除', isType: '1', methosName: 'delStroe' },
                        ]
        }else{
             array = [
                        { name: '详情', isType: '1', methosName: 'openDetails' },
                        ]
        }
     
      // return array.filter((item) => {
      //   return item.isType.includes(type)
      // })
      return array;
    },
    handleSizeChange (val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryStroeDatas(1);
    },
    handleCurrentChange (val) {
      this.queryStroeDatas(val);
    },
    openDetails(row){
        console.log(row)
        this.$router.push({ name: "detailsStroe",params:{id:row}});
    }
  }
};
</script>