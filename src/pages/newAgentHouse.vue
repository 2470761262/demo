<template>
  <list-page :parentData="$data"
             @queryTabData="queryTabData"
             @handleClick="handleClick"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
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
                       key="992">
        <template v-slot="scope">
          <div v-if="scope.row.operation!=''">
            <el-button type="info"
                       size="mini"
                       v-for="(item,index) in isForBut(scope.row.operation)"
                       :key="index">{{item.name}}</el-button>
          </div>
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
      pageJson: {
        currentPage: 1,
        total: 50
      },
      tableDataColumn: [
        { prop: 'HouseNo', label: "房源编号" },
        { prop: 'Customers', label: "客户姓名" },
        { prop: 'CommunityName', label: "楼盘" },
        { prop: 'BuildingName', label: "栋座" },
        { prop: 'Decoration', label: "精装修" },
        { prop: 'EntrustType', label: "委托方式" },
        { prop: 'InArea', label: "面积(㎡)" },
        { prop: 'Price', label: "售价(万元)" },
        { prop: 'AddTime', label: "录入时间" }
        
      ],
      tableData: [{
        HouseNo: 'X+CS202001095451',
        Customers: '赵先生',
        CommunityName: '盛景嘉园',
        BuildingName: '登高中路1-66#',
        Decoration: '周杰伦',
        EntrustType: '1',
        InArea: '193.8',
        Price: '155',
        AddTime: '2020-02-06',
        operation: '1',
      }, {
         HouseNo: '+CS201909038558',
        Customers: '欧阳女士',
        CommunityName: '中央美地',
        BuildingName: '清泉新村巷13#',
        Decoration: '简单装修',
        EntrustType: '4',
        InArea: '116.55',
        Price: '119.8',
        AddTime: '2020-01-19',
        operation: '3',
      }],
      elTabs: {
        activeName: "tab1",
        list: [
          { label: '全部', name: 'tab1' },
          { label: '未审核', name: 'tab2' },
          { label: '已审核', name: 'tab3' },
          { label: '审核失败', name: 'tab4' },
        ]
      },
      options: [{
        value: '0',
        label: '默认'
      },
      {
        value: '1',
        label: '独家'
      },
      {
        value: '2',
        label: '限时'
      },
      {
        value: '3',
        label: '托管'
      },
      {
        value: '4',
        label: '收购'
      },
      {
        value: '5',
        label: '上门'
      }, {
        value: '6',
        label: '电话'
      }, {
        value: '7',
        label: '转介'
      }, 
      {
        value: '8',
        label: '陌拜'
      },
      {
        value: '9',
        label: '同行'
      },
      {
        value: '10',
        label: '未签'
      },
      {
        value: '11',
        label: '签约'
      },
      {
        value: '12',
        label: '多家'
      },
      {
        value: '13',
        label: '未委托'
      }],
      queryData: {
        houseName: '',
        taskName: '',
        selectValue: '',
        timeSelect: '',
      }
    }
  },
  methods: {
    //请求数据接口
    queryTabData () {this.$api.get({
        url: '/agent_house',
        data: params,
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        token: false
      }).then((e) => {
        let result = e.data;
        console.log(result.message);
        if (result.code == "SUCCESS") {
          console.log("请求数据成功");
          successFunc(result);
        } else {
          failFunc(result.message);
        }
      }).catch((e) => {
        console.log("获取数据出错");
        console.log(e);
        failFunc('发送异常,登录失败');
      }) },


    isForBut (type) {
      let array = [
        { name: '邀请验真', isType: '2', methosName: '' },
        { name: '重新提交', isType: '3', methosName: '' },
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
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    },
  },
}
</script>