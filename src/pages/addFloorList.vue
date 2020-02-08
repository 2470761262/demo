
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
    <template #tableColumn="cell">
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
      queryData: {
        houseName: '',
        taskName: '',
        inputValue: '',
        timeSelect: '',
      },
      pageJson: {
        currentPage: 1,
        total: 50
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
        { prop: 'house', label: "房源坐落" },
        { prop: 'priceArea', label: "售价/面积" },
        { prop: 'type', label: "户型" },
        { prop: 'economicPro', label: "经济人" },
        { prop: 'validateType', label: "验真状态" },
        { prop: 'cutPro', label: "客户姓名" },
        { prop: 'addTime', label: "发布时间" },
        { prop: 'cellType', label: "类型" },
      ],
      tableData: [{
        house: '龙腾花园-16栋-604室',
        priceArea: '234万/100平',
        type: '3室2厅1卫',
        levae: '精装修',
        economicPro: '周杰伦',
        validateType: '通过',
        cutPro: '周杰伦1',
        addTime: '2019-01-01 18:00:00',
        cellType: '号码异常',
        operation: '3',
      }, {
        house: '龙腾花园-16栋-604室',
        priceArea: '234万/100平',
        type: '3室2厅1卫',
        levae: '精装修',
        economicPro: '周杰伦2',
        validateType: '通过',
        cutPro: '周杰伦2',
        addTime: '2019-01-01 18:00:00',
        cellType: '号码异常',
        operation: '3',
      }],
    }
  },
  methods: {
    queryTabData () {
      console.log(this, '111');
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
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
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