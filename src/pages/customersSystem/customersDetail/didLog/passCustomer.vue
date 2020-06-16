<style lang="less" scoped>
@import url(../../less/popScroll);
.head-input {
  .head-input(false);
}
.query-content {
  width: 414px;
  margin: 20px 0;
}
.query-tips {
  display: flex;
  font-size: 17px;
  color: #999;
  .query-tips-left {
    margin-right: 20px;
  }
  .query-tips-right {
    :nth-child(1) {
      margin-bottom: 10px;
    }
  }
}
.tab-content {
  margin-top: 20px;
}
.foot-page {
  margin: 20px;
  display: flex;
  justify-content: center;
}
</style>
<template>
  <fixed-popup v-bind="$attrs" v-on="$listeners" @confirmEmit="confirmEmit">
    <div class="query-content">
      <down-content
        :down-ul-flag="false"
        :is-need-fool="false"
        icon-class="iconzongjian iconfont"
      >
        <template v-slot:head>
          <div class="head-input">
            <input
              type="text"
              placeholder="请输入指定接收方"
              @keydown.enter="passSearch"
              @blur="passSearch"
            />
          </div>
        </template>
      </down-content>
    </div>
    <div class="query-tips">
      <div class="query-tips-left">说明:</div>
      <div class="query-tips-right">
        <p>1. 系统推荐经纪人为各区域房源回访鑫币值(7日内)前5名</p>
        <p>2. 若需PASS客户给指定的接收方,请在搜索栏内进行搜索</p>
      </div>
    </div>
    <section class="tab-content">
      <el-table :data="pageInfo.list" tooltip-effect="dark">
        <el-table-column label width="65">
          <template v-slot="scope">
            <el-radio
              :label="scope.row.accountId"
              v-model="templateRadio"
              @change="getTemplateRow(scope.$index, scope.row)"
              >{{ null }}</el-radio
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="perName"
          label="姓名"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="score"
          label="鑫币总数"
          width="100"
        ></el-table-column>
        <el-table-column prop="pdeptName" label="区域"></el-table-column>
        <el-table-column prop="companyName" label="公司名称"></el-table-column>
      </el-table>
    </section>
    <div class="foot-page">
      <el-pagination
        background
        hide-on-single-page
        layout="prev,pager,next,jumper,total"
        :total="pageInfo.totalCount"
        :page-size="pageInfo.pageSize"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </fixed-popup>
</template>

<script>
import downContent from "../components/downContent";
export default {
  props: {
    pageInfo: {
      default: () => {
        return {
          totalCount: 0,
          currPage: 1,
          pageSize: 10,
          list: []
        };
      }
    }
  },
  components: {
    downContent
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.tableData.push({
        accountId: i + 1,
        perName: "谢谢你" + i,
        score: 40 + i,
        pdeptName: "中城片区",
        companyName: "绿色鑫家园(龙岩)"
      });
    }
  },
  methods: {
    confirmEmit() {
      if (this.selectedPer.length == 0) {
        this.$message({
          type: "info",
          message: "没有选中任何员工"
        });
      } else {
        this.$emit("passAccount", this.selectedPer);
      }
    },
    passSearch(e) {
      // console.log(e);
      this.keyWord = e.target.value;
      if (this.keyWord.trim() == "") {
        this.$message({
          type: "info",
          message: "输入参数为空，无法查询"
        });
        return;
      }
      this.$emit("search", e);
    },
    getTemplateRow(a, b) {
      this.selectedPer = b;
    },
    handleCurrentChange(val) {
      var _that = this;
      let list = {
        name: _that.keyWord,
        page: val
      };
      this.$emit("pageSearch", list);
    }
  },
  data() {
    return {
      tableData: [],
      templateRadio: "",
      keyWord: "",
      selectedPer: {}
      // tableColumn: [
      //   {
      //     prop: "name",
      //     label: "姓名"
      //   },
      //   {
      //     prop: "xinCode",
      //     label: "鑫币"
      //   },
      //   {
      //     prop: "area",
      //     label: "区域"
      //   },
      //   {
      //     prop: "companyName",
      //     label: "公司名称"
      //   }
      // ]
    };
  }
};
</script>
