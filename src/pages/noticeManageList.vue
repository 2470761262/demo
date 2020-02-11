
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
                       key="operation">
        <template v-slot="scope">
          <div v-if="scope.row.operation!=''">
            <el-button type="info"
                       size="mini"
                       v-for="(item,index) in getOpeBtns(scope.row.operation)"
                       :key="index">{{item.name}}</el-button>
          </div>
        </template>
      </el-table-column>
    </template>
  </list-page>
</template>
<script>
import listPage from '@/components/noticeListPage';
export default {
  components: {
    listPage
  },
  data () {
    return {
      pageJson: {
        currentPage: 1,//当前页码
        total: 9,//总记录数
        pageSize:5//每页条数
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
      }],
    }
  },
  methods: {
    queryTabData () { },
    getOpeBtns (type) {
      let array = [
        { name: '查看', isType: '3', methosName: '' },
        { name: '编辑', isType: '3', methosName: '' }
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