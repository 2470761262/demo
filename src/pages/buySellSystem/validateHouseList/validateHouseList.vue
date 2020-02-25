<template>
  <list-page :parentData="$data"
             @queryTabData="queryTabData"
             @handleClick="handleClick"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
    <template v-slot:tableColumn="cell">
      <!-- <template v-for="(item) in cell.tableData">
        <el-table-column :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                         :key="item.prop">
        </el-table-column>
      </template> -->
      <el-table-column label="房源坐落">
        <template v-slot="scope">
          {{scope.row.communityName+'-'+scope.row.buildingNo+'-'+scope.row.roomNo}}
        </template>
      </el-table-column>
      <el-table-column label="售价(万元)">
        <template v-slot="scope">
          {{scope.row.price}}
        </template>
      </el-table-column>
      <el-table-column label="面积(㎡)">
        <template v-slot="scope">
          {{scope.row.price}}
        </template>
      </el-table-column>
      <el-table-column label="户型">
        <template v-slot="scope">
          {{scope.row.room+"室"+scope.row.hall+"厅"+scope.row.toilet+"卫"}}
        </template>
      </el-table-column>
      <el-table-column label="装修程度">
        <template v-slot="scope">
          {{scope.row.decoration}}
        </template>
      </el-table-column>
      <el-table-column label="经纪人">
        <template v-slot="scope">
          {{scope.row.creatorName}}
        </template>
      </el-table-column>
      <el-table-column label="录入时间">
        <template v-slot="scope">
          {{scope.row.createTime}}
        </template>
      </el-table-column>
      <el-table-column label="业主">
        <template v-slot="scope">
          {{scope.row.customerName}}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template v-slot="scope">
        <el-tag>
          {{scope.row.checkStatus}}
          </el-tag>
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
                     v-for="(item,index) in isForBut(2)"
                     :key="index">{{item.name}}</el-button>
          <!-- </div> -->
        </template>
      </el-table-column>
    </template>
  </list-page>
</template>
<script>
import listPage from '@/components/listPage';
import util from '@/util/util';
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
        pageSize: 10 //每页条数
      },
      tableDataColumn: [
        { prop: 'communityName', label: "房源坐落" },
        { prop: 'price', label: "售价(万元)" },
        { prop: 'area', label: "面积(㎡)" },
        { prop: 'type', label: "户型" },
        { prop: 'levae', label: "装修程度" },
        { prop: 'creatorName', label: "经济人" },
        { prop: 'createTime', label: "录入时间" },
        { prop: 'checkStatus', label: "状态" }
      ],
      tableData: [{
        house: '龙腾花园-16栋-604室',
        price: '234',
        area: '1252',
        type: '3室2厅1卫',
        levae: '精装修',
        economicPro: '周杰伦',
        addTime: '2019-01-01 18:00:00',
        cellType: '待店长验真',
        operation: '1',
      }, {
        house: '龙腾花园-16栋-604室',
        price: '234',
        area: '12',
        type: '3室2厅1卫',
        levae: '精装修',
        economicPro: '周杰伦1',
        addTime: '2019-01-01 18:00:00',
        cellType: '待店长验真',
        operation: '3',
      }],
      elTabs: {
        activeName: "tab1",
        list: [
          { label: '待验真', name: 'tab1' },
          { label: '验真通过', name: 'tab2' },
          { label: '验真未通过', name: 'tab3' },
          { label: '已过期', name: 'tab4' },
          { label: '全部', name: 'tab5' },
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
        houseName: '',
        taskName: '',
        selectValue: '',
        timeSelect: '',
      },
      checkStatusList:[
        {key:'1',value:"待客户验真"},
        {key:'2',value:"待店长验真"},  //客户验真过期
        {key:'3',value:"店长验真通过"},
        {key:'4',value:"验真过期"},
        {key:'5',value:"验真失败"},
        {key:'6',value:"验真成功"}
        ]
    }
  },
  created(){
   console.log("==========="+JSON.stringify(this.GetRequest()));
  },
  mounted () {
    this.queryVerifyHouseByParams(1);
  },
  methods: {
    GetRequest() {
    var url = location.href; //获取url中"?"符后的字串
    console.log("$$$$$$$",location);
    var theRequest=new URLSearchParams(location.hash.substring(location.hash.indexOf('?')));
    var token=theRequest.get("token");
    util.localStorageSet("token",token);
    return token;
    },
    queryVerifyHouseByParams () {
      this.queryVerifyHouseDatas(1);
    },
    queryVerifyHouseDatas (currentPage) {
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      let that = this;
      if (this.queryData.newsTitle != null) {
        params.newsTitle = this.queryData.newsTitle;
      }
      this.$api.post({
        url: '/draft-house/page',
        data: params,
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        token: true,
        
      }).then((e) => {
        console.log(e.data);
        let result = e.data;
        that.loading = false;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);
          that.pageJson.total = result.data.totalCount;
          that.pageJson.currentPage = result.data.currPage;
          that.tableData = result.data.list;
        } else {
          console.log("查询验真房源列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询验真房源列表失败");
        console.log(e);
      })
    },
    getVerifyImg (id) {
      let params = { id: id };
      let that = this;
      that.loading = true;
      this.$api.post({
        url: '/verifyHouse/invitationToVerify',
        data: params,
        token: false,
        qs: true
      }).then((e) => {
        console.log(e.data);
        let result = e.data;
        that.loading = false;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);
          this.$alert('<img src="' + result.data + '"></img>', '业主邀请二维码', {
            dangerouslyUseHTMLString: true
          });
          that.loading = false;
        } else {
          console.log("查询结果：" + result.message);
          alert(result.message);
          that.loading = false;
        }
      }).catch((e) => {
        console.log("查询失败");
        console.log(e);
        that.loading = false;
      })
    },
    open () {
      this.$alert('<img src="https://lsxjytestimgs.oss-cn-shenzhen.aliyuncs.com/verifyHouseShare/b25076270b8248509e9fe815005ced60.jpg"></img>', 'HTML 片段', {
        dangerouslyUseHTMLString: true
      });
    },
    queryTabData () { 
      console.log(this.queryData);
    },
    distributeEvent (e, id) {
      this[e](id);
    },
    isForBut (type) {
      let array = [
        { name: '邀请验真', isType: '2', methosName: 'getVerifyImg' },
        { name: '重新提交', isType: '3', methosName: '' },
        { name: '查看', isType: '1,2,3', methosName: '' }
      ]
      return array.filter((item) => {
        return item.isType.includes(type)
      })
    },
    getCheckStatus (key) {
      let that=this;
      console.log("key="+key);
      return that.checkStatusList.filter((item) => {
        return item.key.includes(key);
      })
    },
    handleClick () {
      console.log(this.queryData);
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    },
  },
}
</script>