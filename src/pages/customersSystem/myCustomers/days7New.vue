<style lang="less" scoped>
@import url("../less/custTab.less");
</style>
<template>
  <!-- 
      :expand-row-keys='[1,3]'
      row-key="id"
  -->
  <list-Page :parentData="$data"
             @sort-change="sortMethod"
             :border="true"
             default-expand-all
             :cellClass="cellClass"
             headerClass="headerCellSet1"
             @handleCurrentChange="handleCurrentChange"
             @handleSizeChange="handleSizeChange">
    <template v-slot:top>
      <section class="query-content">
        <div class="empty-query">
          <div class="page-list-query-row"
               v-if="changeQuery">
            <div class="query-content-cell">
              <h3 class="query-cell-title">电话</h3>
              <el-select clearable
                         placeholder="客户电话"
                         class="set-select120"
                         v-model="sssss">
                <el-option v-for="item in ssslist"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </div>
            <div class="query-content-cell cell-interval75">
              <h3 class="query-cell-title">客户意向</h3>
              <el-select clearable
                         placeholder="全部"
                         class="set-select120"
                         v-model="sssss">
                <el-option v-for="item in ssslist"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </div>
            <div class="query-content-cell cell-interval75">
              <h3 class="query-cell-title">带看进度</h3>
              <el-select clearable
                         placeholder="全部"
                         class="set-select120"
                         v-model="sssss">
                <el-option v-for="item in ssslist"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </div>
          </div>
          <div class="page-list-query-row"
               v-if="changeQuery">
            <div class="query-content-cell">
              <h3 class="query-cell-title">价格</h3>
              <el-input placeholder="最小值"
                        v-model="sssss"
                        class="set-input90"
                        clearable />
              <span class="cut-off-rule"></span>
              <el-input placeholder="最大值"
                        v-model="sssss"
                        class="set-input90"
                        clearable />
              <span class="query-cell-suffix">万元</span>
            </div>
            <div class="query-content-cell cell-interval75">
              <h3 class="query-cell-title">面积</h3>
              <el-input placeholder="最小值"
                        v-model="sssss"
                        class="set-input90"
                        clearable />
              <span class="cut-off-rule"></span>
              <el-input placeholder="最大值"
                        v-model="sssss"
                        class="set-input90"
                        clearable />
              <span class="query-cell-suffix">平方</span>
            </div>
            <div class="query-content-cell cell-interval75">
              <h3 class="query-cell-title">户型</h3>
              <el-input placeholder="最小值"
                        v-model="sssss"
                        class="set-input90"
                        clearable />
              <span class="cut-off-rule"></span>
              <el-input placeholder="最大值"
                        v-model="sssss"
                        class="set-input90"
                        clearable />
            </div>
          </div>
          <div class="page-list-query-row"
               v-if="changeQuery">
            <div class="query-content-cell">
              <h3 class="query-cell-title">带看时间</h3>
              <el-date-picker v-model="sssss"
                              type="daterange"
                              class="set-data-pricker set-pricker-width260"
                              range-separator="至"
                              start-placeholder="开始日期"
                              :default-time="['00:00:00', '23:59:59']"
                              end-placeholder="结束日期">
              </el-date-picker>
            </div>
            <div class="query-content-cell  cell-interval180">
              <h3 class="query-cell-title">录入时间</h3>
              <el-date-picker v-model="sssss"
                              type="daterange"
                              class="set-data-pricker set-pricker-width260"
                              range-separator="至"
                              start-placeholder="开始日期"
                              :default-time="['00:00:00', '23:59:59']"
                              end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </div>
        </div>
        <span class="el-icon-d-arrow-left icon"
              :class="{'is-active':!changeQuery}"
              @click="triggerChange"></span>
      </section>
    </template>
    <template v-slot:title>
      <h3 class="page-tab-title"><i class="iconzaishouwugendan iconfont"></i> <span>客源列表</span></h3>
    </template>
    <template v-slot:left>
      <left-attention v-model="querySelectFlag"></left-attention>
    </template>
    <template v-slot:tableColumn>
      <el-table-column type="expand"
                       width="1px">
        <template v-slot:default="props">
          <!-- pp属性名请按照实际字段进行修改 -->
          <!-- 判断当前列是否有 'pp' 这个属性 如果有则显示印象 且长度大于0 -->
          <template v-if="props.row.pp && props.row.pp.length > 0">
            <div class="flex-expand">
              <div class="flex-impression-content">
                <div v-for="(item,index) in props.row.pp"
                     :key="index">{{item}}</div>
              </div>
              <label class="trigger-impression-btn">
                <input type="checkbox">
                <i class="iconfont"></i>
              </label>
            </div>
          </template>
        </template>
      </el-table-column>
      <template v-for="(item) in tableColumn">
        <el-table-column :prop="item.prop"
                         :label="item.label"
                         :min-width="item.width"
                         :key="item.prop"
                         :formatter="item.formart"
                         show-overflow-tooltip
                         :fixed="item.fixed ? 'right' :false"
                         :sort-orders="['ascending', 'descending']"
                         :sortable="item.order"></el-table-column>
      </template>
    </template>
  </list-Page>
</template>

<script>
import listPage from "@/components/listPage";
import leftAttention from "../components/leftAttention";
import { setImpression } from '@/util/tabUtil';
export default {
  components: {
    listPage,
    leftAttention
  },
  data () {
    return {
      sssss: '',//请按照实际字段名进行修改，
      ssslist: [//请按照实际字段名进行修改，
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }
      ],
      changeQuery: true,//顶部开关
      querySelectFlag: false,//侧边印象开关
      loading: false,
      pageJson: {
        currentPage: 1, //当前页码
        total: 50, //总记录数
        pageSize: 10 //每页条数
      },
      tableColumn: [
        { prop: "qq", label: "姓名", width: "120px", order: false },
        {
          prop: "ww",
          label: "意向",
          width: "120px",
          order: true,
          formart: () => <el-rate value={2} max={3} disabled></el-rate>
        },
        { prop: "ee", label: "总价", width: "120px", order: true },
        { prop: "rr", label: "面积", width: "120px", order: true },
        { prop: "tt", label: "户型", width: "120px", order: true },
        { prop: "yy", label: "带看进度", width: "120px", order: true },
        { prop: "uu", label: "上次带看", width: "120px", order: true },
        { prop: "ii", label: "录入时间", width: "120px", order: true },
        {
          prop: "cz",
          label: "操作",
          width: "300px",
          order: false,
          fixed: true,
          formart: () => {
            return (
              <div>
                <el-button type="primary" size="mini" icon="el-icon-phone">
                  一键拨号
                </el-button>
                <el-button type="warning" size="mini" icon="el-icon-date">
                  预约带看
                </el-button>
                <el-button type="danger" size="mini" icon="el-icon-edit">
                  写跟进
                </el-button>
              </div>
            );
          }
        }
      ], //定义表格数据
      tableData: [
        {
          id: 1,
          qq: "张先生(男)",
          ee: "90-120万",
          rr: "80-90㎡",
          tt: "3房",
          yy: "为带看",
          uu: "站务",
          ii: "2020-02-01",
          pp: ["活跃呵护", "心机汪", "一是同行"]
        },
        {
          id: 2,
          qq: "张先生(男)",
          ee: "90-120万",
          rr: "80-90㎡",
          tt: "3房",
          yy: "为带看",
          uu: "站务",
          ii: "2020-02-01"
        },
        {
          id: 3,
          qq: "张先生(女)",
          ee: "90-120万",
          rr: "80-90㎡",
          tt: "3房",
          yy: "为带看",
          uu: "站务",
          ii: "2020-02-01",
          pp: ["活跃呵护2", "心机汪2", "一是同行2"]
        },
        {
          id: 4,
          qq: "张先生(女)",
          ee: "90-120万",
          rr: "80-90㎡",
          tt: "3房",
          yy: "为带看",
          uu: "站务",
          ii: "2020-02-01",
          pp: []
        }
      ] //存放表格数据
    };
  },
  mounted () {
    this.$nextTick(setImpression);
  },
  methods: {
    triggerChange () {
      this.changeQuery = !this.changeQuery;
    },
    /**
     * 设置如果有当前行有印象数据则行先生对应的calss
     */
    cellClass ({ row }) {
      if (row.hasOwnProperty("pp")) {
        return "cellset";
      }
      return "cellItemSet";
    },
    /**
     * 排序触发
     */
    sortMethod (e) { },
    /**
     * @param {number} e
     * 设置一页显示多少个
     */
    handleSizeChange (e) { },
    /**
     * 前往多少页
     * @param {number} e
     */
    handleCurrentChange (e) { }
  }
};
</script>
