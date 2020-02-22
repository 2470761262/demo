<style lang="less" scoped>
.query-cell {
  display: flex;
}
</style>
<template>
  <list-page :parentData="$data"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
    <template v-slot:top>
      <div class="query-cell">
        <!-- <el-input placeholder="用户名"
                  v-model="queryData.newsTitle"
                  clearable>
          <template slot="prepend">用户名</template>
        </el-input> -->
        <el-button type="primary"
                   style="margin-left:10px"
                   size="mini"
                   @click="queryOnLineUserDatas(1)">刷新</el-button>
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
      <el-table-column prop="userInfo.userImage" label="用户头像" width="90" >
                 <!-- 图片的显示 -->
                 <template   slot-scope="scope">            
                    <img :src="scope.row.userInfo.userImage"  width="50" height="50" />
                 </template>         
      </el-table-column> 
      <el-table-column prop="loginTime" :formatter="formatLoginTime"  label="登录时间"  >                 
      </el-table-column> 
      <el-table-column prop="clientType" :formatter="formatClientType"  label="登录终端" width="90" >                 
      </el-table-column> 
      <el-table-column prop="operation"
                       label="操作"
                       fixed="right"
                       key="operation">
        <template v-slot="scope">
          <div v-if="scope.row.operation!=''">
            <el-button type="info"
                       size="mini"
                       @click="distributeEvent(item.methosName,scope.row.perId,scope.row.perType)"
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
Date.prototype.Format = function (fmt) {
    var o = {
            "M+": this.getMonth() + 1, // 月份
            "d+": this.getDate(), // 日
            "h+": this.getHours(), // 小时
            "m+": this.getMinutes(), // 分
            "s+": this.getSeconds(), // 秒
            "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
            "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + ""));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
export default {
  components: {
    listPage
  },
  data () {
    return {
      loading: false, //控制表格加载动画提示
      queryData: {
        newsTitle: ""
      },
      configSet: {
        selectToTime: false,
        selectTo: false
      },
      pageJson: {
        currentPage: 1, //当前页码
        total: 0, //总记录数
        pageSize: 1 //每页条数
      },
      tableDataColumn: [
        { prop: "perId", label: "用户编码" },
        { prop: "userInfo.loginName", label: "登录名" },
        { prop: "userInfo.deptName", label: "所在部门" },
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
      tableAllData:[]
    }
  },
  mounted () {
    this.queryOnLineUserDatas(1);
  },
  methods: {
    formatLoginTime(row, column){
      return new Date(row.loginTime).Format('yy-MM-dd hh:mm:ss');
    },
    formatClientType(row, column){
      if(row.perType == 0 ){
        return 'PC端';
      } else if(row.clientType==3){
        return '公众号';
      }else if(row.clientType==4){
        return '小程序';
      }else{
        return '未知';
      }
    },
    queryNoticeByParams () {
      this.queryOnLineUserDatas(1);
    },
    queryOnLineUserDatas (currentPage) {
      let params = { pageSize: this.pageJson.pageSize, pageNum: currentPage,"clientType":0 };
      let that = this;
      if(currentPage!=1){//从第二页开始，不请求，因为第一页的时候数据已经全部请求下来
          this.pageJson.currentPage = currentPage;
          //this.pageJson.total = result.data.totalCount;
        that.tableData=that.getPageData(that.tableAllData,currentPage,this.pageJson.pageSize);
        return;
      }      
      this.$api.post({
        url: '/onLineUser/queryOnLineUsers',
        data: params,
        token: false,
        headers: { "Content-Type": "application/json" }
      }).then((e) => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);
          this.pageJson.total = result.data.totalCount;
          this.pageJson.currentPage = result.data.currPage;
          this.tableAllData = result.data.list;
          this.tableData = that.getPageData(this.tableAllData,currentPage,params.pageSize);
        } else {
          console.log("查询在线用户列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询在线用户列表失败");
        console.log(e);
      })
    },
    getPageData(allData,currentPage,pageSize){
      let start=(currentPage-1)*pageSize;
      let end=(currentPage-1)*pageSize+pageSize;
      return allData.slice(start,end);
    },
    offLineUser (perId,perType) {
      alert("查看用户详情实现");
    },
    distributeEvent (e, perId,perType) {
      this[e](perId,perType);
    },
    getOpeBtns (type) {
      let array = [
        { name: '查看用户', isType: '1,3', methosName: 'offLineUser' }
        // { name: '编辑', isType: '1', methosName: 'test1' }
      ]
      // return array.filter((item) => {
      //   return item.isType.includes(type)
      // })
      return array;
    },
    handleSizeChange (val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryOnLineUserDatas(1);
    },
    handleCurrentChange (val) {
      this.queryOnLineUserDatas(val);
    }
  }
};
</script>
