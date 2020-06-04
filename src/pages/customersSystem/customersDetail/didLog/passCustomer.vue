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
  <fixed-popup v-bind="$attrs" v-on="$listeners">
    <div class="query-content">
      <down-content
        :down-ul-flag="false"
        :is-need-fool="false"
        icon-class="iconzongjian iconfont"
      >
        <template v-slot:head>
          <div class="head-input">
            <input type="text" placeholder="请输入指定接收方" />
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
      <el-table :data="tableData" tooltip-effect="dark">
        <el-table-column label="" width="65">
          <template scope="scope">
            <el-radio
              prop="id"
              :label="scope.row.id"
              v-model="templateRadio"
              @change.native="getTemplateRow(scope.$index, scope.row)"
            ></el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column
          prop="xinCode"
          label="鑫币总数"
          width="100"
        ></el-table-column>
        <el-table-column prop="area" label="区域"></el-table-column>
        <el-table-column prop="companyName" label="公司名称"></el-table-column>
      </el-table>
    </section>
    <div class="foot-page">
      <el-pagination
        background
        hide-on-single-page
        layout="prev,pager,next,jumper,total"
        :total="1000"
      >
      </el-pagination>
    </div>
  </fixed-popup>
</template>

<script>
import downContent from "../components/downContent";
export default {
  components: {
    downContent
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.tableData.push({
        id: i + 1,
        name: "谢谢你" + i,
        xinCode: 40 + i,
        area: "中城片区",
        companyName: "绿色鑫家园(龙岩)"
      });
    }
  },
  data() {
    return {
      tableData: [],
      templateRadio: ""
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
