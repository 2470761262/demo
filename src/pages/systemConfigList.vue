<template>
  <list-page :parentData="$data"
             @queryTabData="queryTabData"
             @handleClick="handleClick"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
            <template v-slot:inputTo>
      <div class="query-cell" >
        <el-button type="primary"
                   size="mini"
                   @click="toAddConfig">添加系统规则</el-button>
      </div>
    </template>
    <template v-slot:tableColumn="cell">
         
      <!-- <template v-for="(item) in cell.tableData">
        <el-table-column :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                         :key="item.prop">
        </el-table-column>
      </template> -->
      <el-table-column label="编号">
        <template v-slot="scope">
          {{scope.row.sysParNo}}
        </template>
      </el-table-column>
      <el-table-column label="参数名称">
        <template v-slot="scope">
          {{scope.row.sysParName}}
        </template>
      </el-table-column>
      <el-table-column label="类型">
        <template v-slot="scope" >
          {{scope.row.sysParType}}
        </template>
      </el-table-column>
      <el-table-column label="是否有效">
        <template v-slot="scope" >
          {{scope.row.Del==0? "有效":"无效"}}
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
       elTabs: {
        activeName: "tab1",

      },
      queryData: {
        houseName: '',
        taskName: '',
        selectValue: '',
        timeSelect: '',
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
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      let that = this;
      if (this.queryData.newsTitle != null) {
        params.newsTitle = this.queryData.newsTitle;
      }
      this.$api.get({
        url: '/Set',
        data: params,
        token: false
      }).then((e) => {
        console.log(e.data);
        let result = e.data;
        that.loading = false;
        console.log(result.data.data.length);
        if (result.code == 200) {
            for(var i=0;i<result.data.data.length;i++){
             console.log(result.data.data[i].sysParType);
                 switch(result.data.data[i].sysParType){
                     case "1" :
                         result.data.data[i].sysParType="买卖房源";
                         break;
                          case "2" :
                         result.data.data[i].sysParType="买卖客户";
                         break;
                          case "3" :
                         result.data.data[i].sysParType="租赁房源";
                         break;
                          case "4" :
                         result.data.data[i].sysParType="租赁客户";
                         break;
                         case "5" :
                         result.data.data[i].sysParType="用户管理";
                         break;

                 }
            }
          console.log(result.message);
          console.log(result.data);
          that.pageJson.total = result.data.recordsTotal;
          that.pageJson.currentPage = result.data.pageNum;
          that.tableData = result.data.data;
          
        } else {
          console.log("查询系统参数配置列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询系统参数配置列表失败");
        console.log(e);
      })
    },
    postConfig (id) {
      this.$router.push({ path: "/menuFrame/addConfigObject", query: { configId: id } });
    },
        toAddConfig () {
      this.$router.push({ path: "/menuFrame/addConfig" });
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
    queryTabData () { },
    distributeEvent (e, id) {
      this[e](id);
    },
    isForBut (type) {
      let array = [
        { name: '修改', isType: '2', methosName: 'getVerifyImg' },
        { name: '添加关联对象', isType: '1,2,3', methosName: 'postConfig' },
        { name: '查看关联对象', isType: '1,2,3', methosName: '' },
      ]
      return array.filter((item) => {
        return item.isType.includes(type)
      })
    },
    handleClick () {

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