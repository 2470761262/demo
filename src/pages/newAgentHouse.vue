
<style lang="less" scoped>
.query-cell {
  display: flex;
}
.top{
  margin-top: 10px;
}
</style>
<template>
  <list-page :parentData="$data"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
    <template v-slot:inputTo>
      <div class="query-cell">
        <el-input placeholder="房源编号"
                  v-model="queryData.HouseNo"
                  clearable>
          <template slot="prepend">房源编号</template>
        </el-input>
         <el-input placeholder="客户姓名"
                  v-model="queryData.Customers"
                  clearable>
          <template slot="prepend">客户姓名</template>
        </el-input>
         <el-input placeholder="楼盘名称"
                  v-model="queryData.CommunityName"
                  clearable>
          <template slot="prepend">楼盘名称</template>
        </el-input>
        <el-button type="primary"
                   size="mini" @click="queryAgentHouseByParams">查询</el-button>
      </div>
    </template>
    <template v-slot:tableColumn="cell">
      <template v-for="(item) in cell.tableData">
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
            class="top"
                       size="mini"
                       @click="distributeEvent(item.methosName,scope.row.id)"
                       v-for="(item,index) in getOpeBtns(scope.row.id)"
                       :key="index">{{item.name}}</el-button>
          </div>
        </template>
      </el-table-column>
    </template>
  </list-page>
</template>
<script>
import listPage from '@/components/listPage';
import Vue from 'Vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
export default {
  components: {
    listPage
  },
  data () {
    return {
      loading: true,
      queryData: {
        CommunityName: '',
      },
      configSet: {
        selectToTime: false,
        selectTo: false
      },
      pageJson: {
        currentPage: 1,//当前页码
        total: 9,//总记录数
        pageSize: 10//每页条数
      },
      tableDataColumn: [
         { prop: 'HouseNo', label: "房源编号" },
        { prop: 'Customers', label: "客户姓名" },
        { prop: 'Tel', label: "委托方式" },
        { prop: 'CommunityName', label: "楼盘" },
        { prop: 'BuildingName', label: "栋座" },
        { prop: 'Decoration', label: "精装修" },
        { prop: 'InArea', label: "面积(㎡)" },
        { prop: 'Price', label: "售价(万元)" },
        { prop: 'AddTime', label: "录入时间" }
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
  mounted(){
    this.queryAgentHouseDatas(1);    
  },
  methods: {
    queryAgentHouseByParams(){
      this.queryAgentHouseDatas(1);    
    },
    queryAgentHouseDatas(currentPage){
      let params={"limit":this.pageJson.pageSize};
      if(this.queryData.newsTitle!=null){
         params.HouseNo=this.queryData.HouseNo;
          params.Customers=this.queryData.Customers;
        params.CommunityName=this.queryData.CommunityName;
      }
      this.$api.get({
        url: '/agent_house',
        data: params,       
        token: false
      }).then((e) => {
        
        let result = e.data;  
        this.loading=false;
        if (result.code == 200) {
         
          this.pageJson.total=result.data.totalCount;
          this.pageJson.currentPage=result.data.currPage;
          this.tableData=result.data.data;
        } else {
          console.log("查询新增房源列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询新增房源列表失败");
        console.log(e);
      })
    },
    
    distributeEvent (e,noticeId) {
      this[e](noticeId);
    },
    addCookie(id){
      if(window.$cookies.get("houseId")==null){
         window.$cookies.set("houseId", id);
   this.queryAgentHouseDatas(1); 
      }else{
         window.$cookies.set("houseId",  window.$cookies.get("houseId")+','+id);
         
         this.queryAgentHouseDatas(1); 
      }
     
    },
    postUrl(){
    
 this.$router.push({ path: "/menuFrame/agentHouseContrast",query:{houseId:window.$cookies.get("houseId")} });
    },
    removeCookie(id){
      let postId="";
      let houseId=window.$cookies.get("houseId");
      if(houseId.split(",")[1]==undefined&&houseId==id){
     window.$cookies.remove("houseId");

     }else{
       
      let cookie=houseId.split(',');
      console.log(cookie);
      for(let i=0;i<cookie.length;i++){
         if(i==0&&id!=cookie[i]){
           postId+=cookie[i];
         }else if(cookie[i]!=id){
            postId+=','+cookie[i];
         }
      }
      window.$cookies.set("houseId", postId);
     }
      this.queryAgentHouseDatas(this.pageJson.currentPage); 
    },
    getOpeBtns (type) {
       let typ=type;
      let array=[

             ];
            if(window.$cookies.get("houseId")!=null ){
             if(window.$cookies.get("houseId").split(",")[1]==undefined&&window.$cookies.get("houseId")==typ){
                array=[
         { name: '查看', isType: '1,3', methosName: 'showNoticeDetail' },
        { name: '删除', isType: '1,3', methosName: 'removeCookie'},
        { name: '去对比', isType: '1,3', methosName: 'postUrl'},
               ]
             }
            else if(window.$cookies.get("houseId").split(",")!=""){
      let houseId=window.$cookies.get("houseId").split(",");
         for(var i=0;i<houseId.length;i++){
           if(typ==houseId[i]){
            array=[
         { name: '查看', isType: '1,3', methosName: 'showNoticeDetail' },
        { name: '删除', isType: '1,3', methosName: 'removeCookie'},
        { name: '去对比', isType: '1,3', methosName: 'postUrl'},
             ];
            break;
         }else if(i+1==houseId.length){
            array=[
         { name: '查看', isType: '1,3', methosName: 'showNoticeDetail' },
      
        { name: '添加对比', isType: '1,3', methosName: 'addCookie'},
             ];
             break;
         }
         }
      } else{
        array=[
         { name: '查看', isType: '1,3', methosName: 'showNoticeDetail' },
      
        { name: '添加对比', isType: '1,3', methosName: 'addCookie'},
             ];

      }
      }else{
      array=[
         { name: '查看', isType: '1,3', methosName: 'showNoticeDetail' },
      
        { name: '添加对比', isType: '1,3', methosName: 'addCookie'},
             ];

      }
      // return array.filter((item) => {
      //   return item.isType.includes(type)
      // })
      
      return array;
    },
    handleSizeChange (val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize= val;
      this.queryNoticeDatas(1);
    },
    handleCurrentChange (val) {
      this.queryNoticeDatas(val);
    },
    showNoticeDetail(noticeId){
       this.$router.push({ path: "/menuFrame/houseDetails",query:{houseId:noticeId} });
    }

  },
}
</script>  