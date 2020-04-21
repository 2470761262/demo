<style lang="less" scoped>
.page-tab-title {
  color: #666666;
  font-size: 15px;
  display: flex;
  align-items: center;
  .iconfont {
    font-size: 23px;
    margin-right: 10px;
  }
}
.attention-content {
  margin-right: 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 280px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 15px 15px 0;
  box-sizing: border-box;
  .attention-select {
    width: 100%;
    /deep/.el-select {
      width: 100%;
    }
  }
  .but-group {
    text-align: right;
    padding-right: 20px;
    /deep/.el-button {
      span {
        color: var(--color--primary);
      }
    }
  }
  .attention-scroll-content {
    flex: 1 0 auto;
    overflow-y: auto;
    overflow-x: hidden;
    height: 0;
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    &::-webkit-scrollbar-button,
    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-track-piece {
      display: none;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--color--primary);
      border-radius: 50px;
    }
    .scroll-content-tag {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
}
.hide-query {
  position: absolute;
  height: 100%;
  color: var(--color--primary);
  right: -10px;
  top: 0;
  font-size: 20px;
  cursor: pointer;
  &::after {
    content: "";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
}
/deep/.headerCellSet1 {
  color: var(--color--primary);
  text-align: center;
  font-weight: normal;
  height: 50px;
  padding: 0;
}
/deep/.el-table__body-wrapper,
/deep/.el-table__fixed-body-wrapper {
  .el-table__expanded-cell {
    padding-top: 0;
    padding-bottom: 0;
    //
  }
  .el-table__expand-column {
    //   display: none;
    overflow: hidden;
  }
}
/deep/.cellset {
  color: #262626;
  padding: 0;
  vertical-align: middle;
  height: 50px;
  font-size: 15px;
  text-align: center;
  border-bottom: none;
}
.flex-expand {
  display: inline-block;
  padding-bottom: 10px;
  .flex-impression-content {
    display: inline-flex;
    vertical-align: middle;
    > div {
      color: #fff;
      background: var(--color--primary);
      border-radius: 10px;
      padding: 2px 8px;
      margin-right: 10px;
    }
  }
  .trigger-impression-btn {
    display: inline-block;
    vertical-align: middle;
    > input {
      display: none;
    }
    input:checked + .iconfont::before {
      content: "😉";
    }
    input:checked + .iconfont::after {
      content: "展开更多印象";
      font-size: 14px;
      color: #e2e2e2;
      margin-left: 10px;
    }
    .iconfont {
      display: inline-block;
      cursor: pointer;
      &::before {
        content: "😎";
        width: 20px;
        height: 20px;
        border-radius: 50%;
        text-align: center;
        line-height: 20px;
        background: #cccccc;
        color: #fff;
      }
    }
  }
}
/deep/.el-button--mini {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
<template>
  <!-- :expand-row-keys='[1,3]' -->
  <list-Page @handleCurrentChange="handleCurrentChange"
             :parentData="$data"
             @sort-change="sortMethod"
             :border="true"
             row-key="id"
             default-expand-all
             :cellClass="cellClass"
             headerClass="headerCellSet1"
             @handleSizeChange="handleSizeChange">
    <template v-slot:top>
      <allCustomersQuery></allCustomersQuery>
    </template>
    <template v-slot:title>
      <h3 class="page-tab-title"><i class="iconzaishouwugendan iconfont"></i> <span>客源列表</span></h3>
    </template>
    <template v-slot:left>
      <transition name="el-fade-in-linear">
        <div class="attention-content"
             v-if="querySelectFlag">
          <div class="attention-select">
            <el-select v-model="imdataimdata"
                       filterable
                       placeholder="请输入您添加过的客源印象">
            </el-select>
          </div>
          <div class="but-group">
            <el-button type="text">一键还原</el-button>
            <el-button type="text">一键清除</el-button>
          </div>
          <div class="attention-scroll-content">
            <el-tag v-for="item in 6"
                    :key="item.index"
                    size="small"
                    class="scroll-content-tag"
                    closable>活跃客户(3)</el-tag>
          </div>
        </div>
      </transition>
      <div class="hide-query"
           @click="triggerLeft"
           :class="querySelectFlag ? 'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></div>
    </template>
    <template v-slot:tableColumn>
      <el-table-column type="expand"
                       width="1px">
        <template v-slot:default="props">
          <template v-if="props.row.pp">
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
import allCustomersQuery from "./components/allCustomersQuery";
export default {
  components: {
    listPage,
    allCustomersQuery
  },
  data() {
    return {
      querySelectFlag: true,
      imdataimdata: "",
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
                <el-button type="primary" size="mini" icon="el-icon-date">
                  预约带看
                </el-button>
                <el-button type="primary" size="mini" icon="el-icon-edit">
                  写跟进
                </el-button>
              </div>
            );
          }
        }
      ], //定义表格字段
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
          ii: "2020-02-01"
        },
        {
          id: 5,
          qq: "张先生(女)",
          ee: "90-120万",
          rr: "80-90㎡",
          tt: "3房",
          yy: "为带看",
          uu: "站务",
          ii: "2020-02-01"
        },
        {
          id: 6,
          qq: "张先生(女)",
          ee: "90-120万",
          rr: "80-90㎡",
          tt: "3房",
          yy: "为带看",
          uu: "站务",
          ii: "2020-02-01"
        },
        {
          id: 7,
          qq: "张先生(女)",
          ee: "90-120万",
          rr: "80-90㎡",
          tt: "3房",
          yy: "为带看",
          uu: "站务",
          ii: "2020-02-01"
        },
        {
          id: 8,
          qq: "张先生(女)",
          ee: "90-120万",
          rr: "80-90㎡",
          tt: "3房",
          yy: "为带看",
          uu: "站务",
          ii: "2020-02-01"
        },
        {
          id: 9,
          qq: "张先生(女)",
          ee: "90-120万",
          rr: "80-90㎡",
          tt: "3房",
          yy: "为带看",
          uu: "站务",
          ii: "2020-02-01"
        },
        {
          id: 10,
          qq: "张先生(女)",
          ee: "90-120万",
          rr: "80-90㎡",
          tt: "3房",
          yy: "为带看",
          uu: "站务",
          ii: "2020-02-01"
        },
        {
          id: 11,
          qq: "张先生(女)",
          ee: "90-120万",
          rr: "80-90㎡",
          tt: "3房",
          yy: "为带看",
          uu: "站务",
          ii: "2020-02-01"
        },
        {
          id: 12,
          qq: "张先生(女)",
          ee: "90-120万",
          rr: "80-90㎡",
          tt: "3房",
          yy: "为带看",
          uu: "站务",
          ii: "2020-02-01"
        }
      ] //存放表格数据
    };
  },
  mounted() {
    this.$nextTick(this.setImpression);
  },
  methods: {
    /**
     * 设置如果有当前行有印象数据则行先生对应的calss
     */

    cellClass({ row }) {
      if (row.hasOwnProperty("pp")) {
        return "cellset";
      }
      return "cellItemSet";
    },
    setImpression() {
      let checkBox = document.querySelectorAll(".trigger-impression-btn");
      [...checkBox].forEach(item => {
        let check = item.querySelector("input");
        check.addEventListener(
          "click",
          function(e) {
            let children = this.parentElement.previousElementSibling.children;
            if (this.checked) {
              [...children].forEach((childrenItem, index) => {
                index != 0 && (childrenItem.style.cssText = "display:none");
              });
            } else {
              [...children].forEach((childrenItem, index) => {
                childrenItem.style.cssText = "display:block";
              });
            }
          },
          false
        );
      });
    },
    /**
     * 切换左侧
     */
    triggerLeft() {
      this.querySelectFlag = !this.querySelectFlag;
    },
    /**
     * 排序触发
     */
    sortMethod() {},
    /**
     * @param {number} e
     * 设置一页显示多少个
     */
    handleSizeChange(e) {},
    /**
     * 前往多少页
     * @param {number} e
     */
    handleCurrentChange(e) {}
  }
};
</script>
