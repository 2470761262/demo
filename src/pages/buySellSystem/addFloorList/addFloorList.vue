
<template>
  <list-page :parentData="$data"
             @queryTabData="queryTabData"
             @handleClick="handleClick"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
    <template v-slot:selectTo>
      <el-input placeholder="手机号"
                v-model="queryData.inputValue"
                clearable>
        <template slot="prepend">手机号</template>
      </el-input>
    </template>
    <template v-slot:selectTo>
      <el-select v-model="queryData.isCheck" placeholder="请选择" clearable> 
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        <template slot="prepend">审核状态</template>
    </template>




    <template #tableColumn="cell">
      <template v-for="(item) in cell.tableData">
        <el-table-column :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                         :key="item.prop">
        </el-table-column>
      </template>



      <el-table-column 
                       label="操作"
                       fixed="right"
                       key="operation">
        <template v-slot="scope">

            <el-button type="info"
                       size="mini"
                       @click="toCheck(scope.row.id)"
                       >审核</el-button>
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
      loading: false,
      options: [{
          value: '',
          label: '全部'
        },{
          value: '0',
          label: '待审核'
        },{
          value: '1',
          label: '审核通过'
        }, {
          value: '2',
          label: '审核不通过'
        }],
      queryData: {
        houseName: '',
        taskName: '',
        inputValue: '',
        timeSelect: '',
        isCheck:''
      },
      pageJson: {
        currentPage: 1,
        total: 50,
        pageSize: 20
      },
      elTabs: {
        activeName: "tab1",
        list: [
          { label: '全部', name: 'tab1' },
          { label: '待审核', name: 'tab2' },
          { label: '审核通过', name: 'tab3' },
          { label: '审核失败', name: 'tab4' }
        ]
      },
      tableDataColumn: [
        { prop: 'communityName', label: "小区名称" },
        { prop: 'comBuildingName', label: "楼栋号" },
        { prop: 'buildIngHouses', label: "房间号" },
        { prop: 'brokerName', label: "经纪人" },
        { prop: 'brokerPhone', label: "电话" },
        { prop: 'addTime', label: "提交时间" },
        { prop: 'checkStatus', label: "状态" }
       
      ],
      tableData: [{
        // house: '龙腾花园-16栋-604室',
        // priceArea: '234万/100平',
        // type: '3室2厅1卫',
        // levae: '精装修',
        // economicPro: '周杰伦',

        // validateType: '通过',
        // cutPro: '周杰伦1',
        // addTime: '2019-01-01 18:00:00',
        // cellType: '号码异常',
        // operation: '3',
      }],
    }
  },
  mounted(){
    this.queryAddFloorList(2);
  },
  methods: {
    queryTabData () {
      console.log(this, '111');
    },
  queryAddFloorList(info){
    var that =this;
    let params={"limit":that.pageJson.pageSize,"page":that.pageJson.currentPage};
    if(info !=1){
        params.communityName=that.queryData.houseName;
        params.brokerName=that.queryData.taskName;
        params.brokerPhone=that.queryData.inputValue;
        params.beginTime=that.queryData.timeSelect[0];
        params.endTime=that.queryData.timeSelect[1];
        params.isCheck=that.queryData.isCheck;
    }
     
     console.log(params);
    this.$api.get({
        url: '/CommunityReplenish/getCommunityReplenishList',
        data: params,       
        token: false
      }).then((e) => {
        console.log(e.data);
        let data=e.data
        if (data.code == 200) {
          that.pageJson.total=data.data.totalCount;
          that.pageJson.currentPage=data.data.currPage;
          that.tableData=data.data.list;
        } else {
          console.log("查询新增房源列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询新增房源列表失败");
        console.log(e);
      })
  },
toCheck(id){
    var that = this
  that.$router.push({ path: '/buySellSystem/checkFloorList', query: { "id": id } });
},
    isForBut (type) {
      let array = [
        { name: '查看', isType: '3', methosName: '' }
      ]
      return array.filter((item) => {
        return item.isType.includes(type)
      })
    },
    handleClick () {

    },
    queryTabData () {
      this.$emit("queryTabData");
      console.log(this.queryData);
      this.queryAddFloorList(2);
    },
    handleSizeChange (val) {
      this.$emit("handleClick", e);
      console.log(this.$emit("handleClick", e));
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    },
    handleSizeChange (val) {
      console.log(`每1页 ${val} 条`);
    }
  },
}
</script>  