
<style lang="less" scoped>
.query-cell {
  display: flex;
}
</style>
<template>
  <list-page :parentData="$data"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
    <template v-slot:inputTo>
      <div class="query-cell">
        <el-input placeholder="标题名称"
                  v-model="queryData.houseName"
                  clearable>
          <template slot="prepend">标题</template>
        </el-input>
        <el-button type="primary"
                   size="mini"
                   @click="test2">查询</el-button>
        <el-button type="primary"
                   size="mini"
                   @click="test3">添加公告</el-button>
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
                       size="mini"
                       @click="distributeEvent(item.methosName)"
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
      },
      configSet: {
        selectToTime: false,
        selectTo: false
      },
      pageJson: {
        currentPage: 1,
        total: 50
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
      tableDataColumn: [
        { prop: 'house', label: "编号" },
        { prop: 'priceArea', label: "公告标题" },
        { prop: 'type', label: "公告类型" },
        { prop: 'economicPro', label: "发布人" },
        { prop: 'validateType', label: "公司" },
        { prop: 'addTime', label: "添加时间" },
        { prop: 'cellType', label: "操作" },
      ],
      tableData: [{
        house: '龙腾花园-16栋-604室',
        priceArea: '234万/100平',
        type: '3室2厅1卫',
        levae: '精装修',
        economicPro: '王龙海',
        validateType: '通过',
        cutPro: '王龙海1',
        addTime: '2019-01-01 18:00:00',
        cellType: '号码异常',
        operation: '3',
      }, {
        house: '龙腾花园-16栋-604室',
        priceArea: '234万/100平',
        type: '3室2厅1卫',
        levae: '精装修',
        economicPro: '王龙海2',
        validateType: '通过',
        cutPro: '王龙海2',
        addTime: '2019-01-01 18:00:00',
        cellType: '号码异常',
        operation: '3',
      }],
    }
  },
  methods: {
    distributeEvent (e) {
      this[e]();
    },
    test3 () {

    },
    test2 () {

    },
    test1 () {
      console.log(11111111);
    },
    isForBut (type) {
      let array = [
        { name: '查看', isType: '3', methosName: 'test1' }
      ]
      return array.filter((item) => {
        return item.isType.includes(type)
      })
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