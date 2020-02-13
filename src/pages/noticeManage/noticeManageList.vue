<style lang="less" scoped>
.query-cell {
  display: flex;
}
</style>
<template>
  <list-page
    :parentData="$data"
    @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange"
  >
    <template v-slot:inputTo>
      <div class="query-cell">
        <el-input
          placeholder="标题名称"
          v-model="queryData.newsTitle"
          clearable
        >
          <template slot="prepend">标题</template>
        </el-input>
        <el-button type="primary" style="margin-left:10px"
                   size="mini" @click="queryNoticeByParams">查询</el-button>
        <el-button type="primary" 
                   size="mini" @click="toAddNoticePage">添加公告</el-button>
      </div>
    </template>
    <template v-slot:tableColumn="cell">
      <template v-for="item in cell.tableData">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :key="item.prop"
        >
        </el-table-column>
      </template>
      <el-table-column
        prop="operation"
        label="操作"
        fixed="right"
        key="operation"
      >
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
</template>
<script>
import listPage from "@/components/listPage";
export default {
  components: {
    listPage
  },
  data() {
    return {
      loading: true, //控制表格加载动画提示
      queryData: {
        newsTitle: ""
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
        { prop: "id", label: "编号" },
        { prop: "newsTitle", label: "公告标题" },
        { prop: "newsType", label: "公告类型" },
        { prop: "perName", label: "发布人" },
        { prop: "companyName", label: "公司" },
        { prop: "addDate", label: "添加时间" }
      ],
      tableData: [
        //   {
        //   id: '111',
        //   newsTitle: 'wwwwww',
        //   newsType: 'xx',
        //   perName: 'xxx',
        //   companyName: 'xxxx',
        //   addDate: '2019-01-01 18:00:00'
        // }
      ],
    }
  },
  mounted() {
    this.queryNoticeDatas(1);
  },
  methods: {
    queryNoticeByParams() {
      this.queryNoticeDatas(1);
    },
    queryNoticeDatas(currentPage) {
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      let that = this;
      if (this.queryData.newsTitle != null) {
        params.newsTitle = this.queryData.newsTitle;
      }
      this.$api.post({
        url: '/noticeManage/queryNoticeDatas',
        data: params,       
        token: false
      }).then((e) => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);
          this.pageJson.total=result.data.totalCount;
          this.pageJson.currentPage=result.data.currPage;
          this.tableData=result.data.list;
        } else {
          console.log("查询公告管理列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询公告管理列表失败");
        console.log(e);
      })
    },
    toAddNoticePage(){
      this.$router.push({ path: "/menuFrame/addNotice"});
    },
    showNoticeDetail (noticeId) {
      this.$router.push({ path: "/menuFrame/noticeDetail",query:{noticeId:noticeId} });
    },
    distributeEvent (e,noticeId) {
      this[e](noticeId);
    },
    getOpeBtns(type) {
      let array = [
        { name: '查看', isType: '1,3', methosName: 'showNoticeDetail' }
        // { name: '编辑', isType: '1', methosName: 'test1' }
      ]
      // return array.filter((item) => {
      //   return item.isType.includes(type)
      // })
      return array;
    },
    handleSizeChange(val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryNoticeDatas(1);
    },
    handleCurrentChange(val) {
      this.queryNoticeDatas(val);
    }
  }
};
</script>
