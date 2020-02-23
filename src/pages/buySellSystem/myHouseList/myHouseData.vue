<template>
  <list-page :parentData="$data"
             
             @handleClick="handleClick"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
    <template #tableColumn="cell">
      <!-- <template v-for="(item) in cell.tableData">
        <el-table-column :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                         :key="item.prop">
        </el-table-column>
      </template> -->
      <el-table-column label="房源编号">
        <template v-slot="scope">
          {{scope.row.HouseNo}}
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
          {{scope.row.Price*10000/scope.row.InArea}}
        </template>
      </el-table-column>
      <el-table-column label="户型">
        <template v-slot="scope">
          {{scope.row.room+"室"+scope.row.hall+"厅"+scope.row.toilet+"卫"}}
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
        pageSize: 5 //每页条数
      },
      tableDataColumn: [
        { prop: 'HouseNo', label: "房源编号" },
        { prop: 'CommunityName', label: "楼盘名称" },
        { prop: 'Price', label: "售价(万元)" },
        { prop: 'InArea', label: "面积(m²)" },
        { prop: 'PropertyFee', label: "均价(元/平)" },
        { prop: 'Decoration', label: "户型" },
        { prop: 'Decoration', label: "装修程度" },
        { prop: 'AddTime', label: "录入时间" }
      ],
      tableData: [],
      elTabs: {
        activeName: "tab1",
        list: [
        
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
        url: '/agent_house/myHouseList',
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
          that.tableData = result.data.list;
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
    distributeEvent (e, id) {
      this[e](id);
    },
    isForBut (type) {
      let array = [
        { name: '查看', isType: '1,2,3', methosName: '' }
      ]
      return array.filter((item) => {
        return item.isType.includes(type)
      })
    },
    handleClick () {

    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
       this.queryVerifyHouseDatas(val);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
       this.pageJson.pageSize = val;
       this.queryVerifyHouseDatas(1);
    },
  },
}
</script>