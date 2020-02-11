<style lang="less" scoped>
.page-body {
  height: 100%;
  display: flex;
  flex-direction: column;
  .page-body-conter {
    flex: 1;
    display: flex;
    .page-body-conter-right {
      flex: 1;
      overflow: hidden;
    }
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
      <div class="page-body-conter-left-slot">
        <slot name="tree"></slot>
      </div>
      <div class="page-body-conter-right">
        <div class="query-center">
          <slot name="inputTo">
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
          </slot>
          <div v-if="configSet.selectTo"
               :class="['query-center-item',{'page-cell-append ':$scopedSlots.selectTo ? false : true}]"
               data-before="状态">
            <slot name="selectTo">
              <el-select v-model="queryData.selectValue"
                         placeholder="请选择">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </slot>
          </div>
          <template v-if="configSet.selectToTime">
            <div class="query-center-item">
              <el-date-picker v-model="queryData.timeSelect"
                              type="daterange"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
              </el-date-picker>
            </div>
            <div class="query-but">
              <el-button type="primary"
                         @click="queryTabData">查询</el-button>
            </div>
          </template>
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
          <slot name="tableColumn"
                :tableData="tableDataColumn"></slot>
        </el-table>
      </div>
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
  watch: {
    $attrs: {
      deep: true,
      immediate: true,
      handler: function (val, oldVal) {
        Object.assign(this.$data, val.parentData);
      }
    }
  },
  data () {
    return {
      configSet: {
        selectToTime: true,
        selectTo: true
      },
      pageJson: {},
      tableDataColumn: [],
      tableData: [],
      elTabs: {},
      options: [],
      queryData: {
        houseName: '',
        taskName: '',
        selectValue: '',
        timeSelect: '',
      }
    }
  },
  methods: {
    //查询按钮
    queryTabData () {
      this.$emit('queryTabData');
    },
    //tab切换
    handleClick (e) {
      this.$emit('handleClick', e);
    },
    //每页数据设置事件
    handleSizeChange (e) {
      this.$emit('handleSizeChange', e);
    },
    //前往多少页事件
    handleCurrentChange (e) {
      this.$emit('handleCurrentChange', e);
    }
  },
}
</script>