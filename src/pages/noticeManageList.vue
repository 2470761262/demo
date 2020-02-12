
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
                   size="mini">查询</el-button>
        <el-button type="primary"
                   size="mini">添加公告</el-button>
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
                       v-for="(item,index) in getOpeBtns(scope.row.operation)"
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
        currentPage: 1,//当前页码
        total: 9,//总记录数
        pageSize: 5//每页条数
      },
      tableDataColumn: [
        { prop: 'noticeNo', label: "编号" },
        { prop: 'noticeTitle', label: "公告标题" },
        { prop: 'noticeType', label: "公告类型" },
        { prop: 'publishPerson', label: "发布人" },
        { prop: 'companyId', label: "公司" },
        { prop: 'addTime', label: "添加时间" },
      ],
      tableData: [{
        noticeNo: '龙腾花园-16栋-604室',
        noticeTitle: '234万/100平',
        noticeType: '3室2厅1卫',
        publishPerson: '精装修',
        companyId: '王龙海1',
        addTime: '2019-01-01 18:00:00',
        operation: '3',
      },
      {
        noticeNo: '龙腾花园-16栋-604室',
        noticeTitle: '234万/100平',
        noticeType: '3室2厅1卫',
        publishPerson: '精装修',
        companyId: '郑然1',
        addTime: '2019-01-01 18:00:00',
        operation: '1',
      }],
    }
  },
  methods: {
    test1 () {
      console.log(11);
    },
    test2 () {
      console.log(222);
    },
    distributeEvent (e) {
      this[e]();
    },
    getOpeBtns (type) {
      let array = [
        { name: '查看', isType: '1,3', methosName: 'test2' },
        { name: '编辑', isType: '1', methosName: 'test1' }
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