<style lang="less" scoped>
.page-body {
  height: 100%;
  display: flex;
  flex-direction: column;
  .page-body-conter {
    flex: 1;
  }
  .page-body-floot {
    display: flex;
    justify-content: center;
  }
}
.query-center {
  display: flex;
  @media (max-width: 1300px) {
    flex-wrap: wrap;
  }
}
.query-center-item {
  margin-right: 20px;
  margin-bottom: 10px;
  @media (max-width: 992px) {
    width: 100%;
    margin-right: 0px;
    /deep/.el-select {
      width: 100%;
    }
    /deep/.el-input__inner {
      width: 100%;
    }
  }
  &:last-of-type {
    margin-right: 0;
  }
}
.page-cell-append {
  display: flex;
  // align-items: center;
  &::before {
    content: attr(data-before);
    flex-shrink: 0;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background-color: #f5f7fa;
    color: #909399;
    padding: 0 20px;
    font-size: 14px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: 0;
    display: flex;
    align-items: center;
  }
  /deep/.el-input__inner {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
/deep/.el-tabs__nav-wrap {
  &::after {
    display: none;
  }
}
</style>
<template>
  <div class="page-body">
    <div class="page-body-conter">
      <div class="query-center">
        <div class="query-center-item">
          <el-input placeholder="楼盘名称"
                    v-model="queryData.houseName"
                    clearable>
            <template slot="prepend">楼盘</template>
          </el-input>
        </div>
        <div class="query-center-item">
          <el-input placeholder="姓名"
                    v-model="queryData.taskName"
                    clearable>
            <template slot="prepend">任务人</template>
          </el-input>
        </div>
        <div class="page-cell-append query-center-item"
             data-before="状态">
          <el-select v-model="queryData.selectValue"
                     placeholder="请选择">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="query-center-item">
          <el-date-picker v-model="queryData.timeSelect"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="query-but">
          <el-button type="primary">查询</el-button>
        </div>
      </div>
      <el-tabs v-model="elTabs.activeName"
               @tab-click="handleClick">
        <el-tab-pane :label="item.label"
                     :name="item.name"
                     v-for="(item,index) in elTabs.list"
                     :key="index">
        </el-tab-pane>
      </el-tabs>
      <el-table :data="tableData"
                border>
        <el-table-column :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                         v-for="(item) in tableDataColumn"
                         :key="item.prop">
        </el-table-column>
        <el-table-column prop="operation"
                         label="操作"
                         fixed="right">
          <template v-slot="scope">
            <div v-if="scope.row.operation!=''">
              <el-button type="info"
                         size="mini"
                         v-for="(item,index) in isForBut(scope.row.operation)"
                         :key="index">{{item.name}}</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-body-floot">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="pageJson.currentPage"
                     :page-sizes="[5, 10, 15, 20]"
                     :page-size="100"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="pageJson.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      pageJson: {
        currentPage: 1,
        total: 50
      },
      tableDataColumn: [
        { prop: 'house', label: "房源坐落", width: 180 },
        { prop: 'price', label: "售价(万元)" },
        { prop: 'area', label: "面积(㎡)" },
        { prop: 'type', label: "户型" },
        { prop: 'levae', label: "装修程度" },
        { prop: 'economicPro', label: "经济人" },
        { prop: 'addTime', label: "录入时间" },
        { prop: 'cellType', label: "状态" }
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
        operation: '2',
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
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
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