<template>
  <list-page :parentData="$data"
             @handleClick="handleClick"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
    <template #tableColumn="cell">
      <el-table-column label="房源编号">
        <template v-slot="scope">
          {{scope.row.HouseNo}}
        </template>
      </el-table-column>
      <el-table-column label="楼盘名称">
        <template v-slot="scope">
          {{scope.row.CommunityName}}
        </template>
      </el-table-column>
      <el-table-column label="售价(万元)">
        <template v-slot="scope">
          {{scope.row.Price}}
        </template>
      </el-table-column>
      <el-table-column label="面积(㎡)">
        <template v-slot="scope">
          {{scope.row.InArea}}
        </template>
      </el-table-column>
      <el-table-column label="均价">
        <template v-slot="scope">
          {{Math.round(scope.row.Price*10000/scope.row.InArea)+"元/m²"}}
        </template>
      </el-table-column>
      <el-table-column label="户型">
        <template v-slot="scope">
          {{scope.row.Rooms+"室"+scope.row.hall+"厅"+scope.row.toilet+"卫"}}
        </template>
      </el-table-column>
      <el-table-column label="装修程度">
        <template v-slot="scope">
          {{scope.row.Decoration}}
        </template>
      </el-table-column>
      <el-table-column label="录入时间">
        <template v-slot="scope">
          {{scope.row.AddTime}}
        </template>
      </el-table-column>
       <el-table-column label="跟单人">
        <template v-slot="scope">
          {{scope.row.agentPerName}}
        </template>
      </el-table-column>
      <el-table-column prop="operation"
                       label="操作"
                       fixed="right"
                       key="992">
        <template v-slot="scope">
          <!-- <div v-if="scope.row.operation!=''"> -->
          <el-button type="info"
                     size="mini"
                     @click="distributeEvent(item.methosName,scope.row.id)"
                     v-for="(item,index) in isForBut(scope.row.id)"
                     :key="index">{{item.name}}</el-button>
          <!-- </div> -->
        </template>
      </el-table-column>
    </template>
  </list-page>
</template>
<script>
import listPage from '@/components/listPage';
import Vue from 'Vue'
import VueCookies from 'vue-cookies';


export default {
  components: {
    listPage
  },
  data () {
    return {
      loading: true, //控制表格加载动画提示
      pageJson: {
        currentPage: 1, //当前页码
        total: 9, //总记录数
        pageSize: 5 //每页条数
      },
      tableDataColumn: [
        { prop: 'HouseNo', label: "房源编号" },
        { prop: 'CommunityName', label: "楼盘名称" },
        { prop: 'Price', label: "售价(万元)" },
        { prop: 'InArea', label: "面积(m²)" },
        { prop: 'PropertyFee', label: "均价(元/平)" },
        { prop: 'hall', label: "户型" },
        { prop: 'Decoration', label: "装修程度" },
        { prop: 'AgentPer', label: "跟单人" },
        { prop: 'AddTime', label: "录入时间" }
      ],
      tableData: [],
      elTabs: {
        activeName: "tab1",
        list: [
        /*  { label: '全部房源', name: 'tab1' },
          { label: '我的录入', name: 'tab2' },
          { label: '我的跟单', name: 'tab3' },
          { label: '我的委托', name: 'tab4' },
          { label: '我的钥匙', name: 'tab5' },
          { label: '我的实勘', name: 'tab6' },
          { label: '验真列表', name: 'tab7' },
          { label: '外网列表', name: 'tab8' },
          { label: '审核列表', name: 'tab9' },
          { label: '我的收藏', name: 'tab10' },
          { label: '草稿房源', name: 'tab11' },*/
        ] 
      },
      options: [{
        value: '选项1',
        label: '全部'
      }, {
        value: '选项2',
        label: '待验真'
      }, {
        value: '选项3',
        label: '客户验真'
      }, {
        value: '选项4',
        label: '店长验真'
      }, {
        value: '选项5',
        label: '验真失败'
      }, {
        value: '选项6',
        label: '已过期'
      }],
      queryData: {
        communityName: ''
      }
    }
  },
  mounted () {
    this.queryVerifyHouseByParams(1);
  },
  methods: {
    queryVerifyHouseByParams () {
      this.queryVerifyHouseDatas(1);
    },
    queryVerifyHouseDatas (currentPage) {

      let params = { limit: this.pageJson.pageSize+'', page: currentPage+'' };
      let that = this;
      if (this.queryData.communityName != null) {
       // params.communityName = this.queryData.communityName;
       console.log("参数");
      }
      this.$api.post({
        url: '/agent_house/newHouseList',
        headers: { "Content-Type": "application/json;charset=UTF-8" },
       data: params,
        token: false
      }).then((e) => {
        console.log(e.data);
        let result = e.data;
        that.loading = false;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);
          that.pageJson.total = result.data.totalCount;
          that.pageJson.currentPage = result.data.currPage;
          this.tableData = result.data.list;
          console.log(result.data.list);
        } else {
          console.log("查询我的房源列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询我的房源列表失败");
        console.log(e);
      })
    },
    open () {
      this.$alert('<img src="https://lsxjytestimgs.oss-cn-shenzhen.aliyuncs.com/verifyHouseShare/b25076270b8248509e9fe815005ced60.jpg"></img>', 'HTML 片段', {
        dangerouslyUseHTMLString: true
      });
    },
    queryTabData () { },
     distributeEvent (e,noticeId) {
       this[e](noticeId);
     },
    addCookie(id){
      if(window.$cookies.get("houseId")==null){
         window.$cookies.set("houseId", id);
   this.queryVerifyHouseDatas(this.pageJson.currentPage); 
      }else{
         window.$cookies.set("houseId",  window.$cookies.get("houseId")+','+id);
        
         this.queryVerifyHouseDatas(this.pageJson.currentPage); 
      }
     
   },
    postUrl(){
    
 this.$router.push({ path: "/buySellSystem/agentHouseContrast",query:{houseId:window.$cookies.get("houseId")} });
   },
   removeCookie(id){
     let postId="";
     let houseId=window.$cookies.get("houseId");
     console.log(houseId);
      if(houseId.split(",")[1]==undefined&&houseId==id){//是否单一id
     window.$cookies.remove("houseId");
     
     }else{//多个id操作
       
      let cookie=houseId.split(',');
      console.log(cookie);
      for(let i=0;i<cookie.length;i++){
         if(i==0&&id!=cookie[i]){//如果是第一个id并且不是要删除的id
           postId+=cookie[i];
         }else if(cookie[i]!=id&&postId==""){//如果是第一个id并且不是要删除的id
            postId+=+cookie[i];
         }else if(cookie[i]!=id) {
           postId+=','+cookie[i];
         }
     }
     window.$cookies.set("houseId", postId);
     }
      this.queryVerifyHouseDatas(this.pageJson.currentPage); 
    },
     isForBut (type) {
       let typ=type;
      let array=[

             ];
             console.log(window.$cookies.get("houseId"));
            if(window.$cookies.get("houseId")!=null ){
             if(window.$cookies.get("houseId").split(",")[1]==undefined&&window.$cookies.get("houseId")==typ){
                array=[
         { name: '查看', isType: '1,3', methosName: 'showNoticeDetail' },
       { name: '删除对比', isType: '1,3', methosName: 'removeCookie'},
       { name: '去对比', isType: '1,3', methosName: 'postUrl'},
               ]
             }
            else if(window.$cookies.get("houseId").split(",")!=""){
     let houseId=window.$cookies.get("houseId").split(",");
         for(var i=0;i<houseId.length;i++){
           if(typ==houseId[i]){
            array=[
         { name: '查看', isType: '1,3', methosName: 'showNoticeDetail' },
        { name: '删除对比', isType: '1,3', methosName: 'removeCookie'},
        { name: '去对比', isType: '1,3', methosName: 'postUrl'},
             ];
            break;
         }else if(i+1==houseId.length){
            array=[
         { name: '查看', isType: '1,3', methosName: 'showNoticeDetail' },
      
       { name: '添加对比', isType: '1,3', methosName: 'addCookie'},
             ];
             
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
      return array;
     },
    handleClick () {

    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    },
    showNoticeDetail(noticeId){
       this.$router.push({ path: "/buySellSystem/houseDetails",query:{houseId:noticeId} });
    }


  },
}
</script>