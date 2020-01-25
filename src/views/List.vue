<style lang="less">
.page-cell-pad {
  padding: 20px 30px;
  .paga-cell-tab {
    display: flex;
    position: relative;
    height: 500px;
    width: 100%;
    .page-cell-ab {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
  .page-cell-filter {
    display: flex;
    margin: 20px 0;
    .page-cell-input {
      display: flex;
      align-items: center;
      margin-right: 20px;
      &::before {
        content: attr(data-before);
      }
      /deep/.el-input {
        flex: 1;
      }
    }
  }
}
.page-cell-tips {
  display: flex;
  align-items: center;
  border: 1px solid #409eff;
  border-radius: 5px;
  padding: 10px 5px;
  font-size: 14px;
}
</style>
<template>
  <div class="page-cell-pad">
    <div class="page-cell-title">日志详情</div>
    <div class="page-cell-filter">
      <div class="page-cell-input" data-before="关键字：">
        <el-input placeholder="请输入关键字"> </el-input>
      </div>
      <div class="page-cell-input" data-before="时间：">
        <el-date-picker
          v-model="selectTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
      <div class="page-cell-input">
        <el-button-group>
          <el-button type="primary">查询</el-button>
          <el-button type="info" plain>清空</el-button>
        </el-button-group>
      </div>
    </div>
    <div class="page-cell-tips">
      <i class="el-icon-share "></i>
      已选择 4 项 服务调用总计：36.4 万 <span @click="clearTips">清空</span>
    </div>
    <div class="paga-cell-tab">
      <div class="page-cell-ab">
        <el-table
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          border
          :height="500"
          :default-sort="{ prop: 'count', order: 'descending' }"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="time" label="时间" width="180">
          </el-table-column>
          <el-table-column prop="name" label="关键字" width="180">
          </el-table-column>
          <el-table-column
            width="180"
            prop="count"
            label="错误次数"
            sortable
            :sort-method="sortMethod"
          >
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      currentPage: 1, // 当前页
      selectTime: "",
      tableData: [
        {
          time: "2016-05-02",
          name: "未知",
          count: "20"
        },
        {
          time: "2016-05-04",
          name: "超时",
          count: "47"
        },
        {
          time: "2016-05-01",
          name: "参数错误",
          count: "153"
        },
        {
          time: "2016-05-03",
          name: "数据错误",
          count: "6636"
        }
      ]
    };
  },
  methods: {
    handleSelectionChange(e) {
      console.log(e);
    },
    sortMethod(a, b) {
      return a.count < b.count;
    },
    handleDelete() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    clearTips() {
      console.log("清空提示");
    }
  }
};
</script>
