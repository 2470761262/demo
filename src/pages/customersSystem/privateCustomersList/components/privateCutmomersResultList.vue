<style lang="less" scope>
.ResultWarp {
  position: relative;
  .ResultTil {
    font-size: @font24;
    margin-bottom: 25px;
  }
  .ResultListHeaderBack {
    background: #f0f2f5;
  }
  .ResultListCell {
    padding-left: 45px;
    font-size: @font16;
    height: 64px;
  }
}
.paginationRow {
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  .Pagemsg {
    padding: 10px 0;
    font-size: @font16;
    > span {
      padding-right: 10px;
    }
  }
  /deep/.el-pagination {
    /deep/.el-pager {
      > li {
        padding: 0 8px;
      }
      /deep/.active {
        border-radius: 4px;
        color: #ffffff;
        background: @backgroud;
        font-size: 16px;
      }
    }
  }
}
</style>
<template>
  <div class="ResultWarp">
    <div class="ResultTil">客源列表</div>

    <el-table
      :data="tableData"
      header-cell-class-name="ResultListCell ResultListHeaderBack"
      cell-class-name="ResultListCell"
      @row-click="navigateTo"
      v-loading="loading"
    >
      <div v-for="(item, index) in tableDataColumn" :key="index">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :min-width="item.width"
          :key="item.prop"
          :formatter="item.formart"
        ></el-table-column>
      </div>
    </el-table>
    <div class="paginationRow">
      <div class="Pagemsg">
        <span>总共{{ dataCount }}条</span>
        <span
          >显示{{ dataCount == 0 ? 0 : limit * page - limit + 1 }}-{{
            dataCount > limit * page ? limit * page : dataCount
          }}条</span
        >
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[15, 25, 35]"
        :page-size="limit"
        layout=" prev, pager, next, sizes,jumper"
        :total="dataCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import tableMenu from "@/util/getTableMenu";
export default {
  inject: ["form"],
  components: {},
  data() {
    return {
      tableDataColumn: [
        {
          prop: "mainTainTime",
          label: "上次维护时间",
          width: "180",
          formart: item => item.mainTainTime || "暂无"
        },
        {
          prop: "customers",
          label: "姓名",
          width: "180",
          formart: item => item.customers || "暂无"
        },
        {
          prop: "online",
          label: "渠道",
          width: "130",
          formart: item => (item.onLine == 0 ? "线下" : "线上") || "暂无"
        },
        {
          prop: "sex",
          label: "性别",
          width: "120px",
          formart: item => (item.sex == 0 ? "男" : "女") || "暂无"
        },
        {
          prop: "sourceType",
          label: "客户来源",
          width: "110px",
          formart: item => this.housesource(item.sourceType) || "暂无"
        },
        {
          prop: "requireType",
          label: "购房需求",
          width: "130px",
          formart: item => this.houserequire(item.requireType) || "暂无"
        }
      ],
      renderList: [],
      menuLoading: true, //自定义菜单
      tableColumn: [],
      tableData: [],
      loading: false,
      isPrivate: "", //是否私客，true私客，false公客

      limit: 15, //分页参数，每页条数
      page: 1, //分页参数，第几页
      pageSum: 0, //总页数
      dataCount: 0, //总条数
      sortDirection: "", //排序方式，DESC降序（默认），ASC升序
      sortColumn: "", //排序字段，默认id
      customerIds: [] //客户id，数字数组
    };
  },
  watch: {
    form: {
      deep: true,
      // immediate: true,
      handler: function(value, ordvalue) {
        console.log(value);
        this.page = 1;
        this.pageSum = 0;
        this.dataCount = 0;
        this.apply();
      }
    }
  },
  created() {},
  mounted() {
    //console.log(111111111);

    this.apply();

    tableMenu.getTableMenu(this.tableDataColumn, 1).then(e => {
      this.menuLoading = false;
      this.renderList = e;
    });
  },
  methods: {
    apply() {
      var that = this;
      this.loading = true;
      this.$api

        .post({
          url: "/saleCustomer/listMyCustomers",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          data: {
            limit: that.limit,
            page: that.page,
            isPrivate: true, //是否私客，true私客，false公客
            keyWord: that.form.searchType === "1" ? that.form.keyWord : "", //关键词-客户信息
            myImpression: that.form.searchType === "2" ? that.form.keyWord : "", //关键词-客户印象
            requirementType:
              that.form.requirementType == ""
                ? null
                : that.form.requirementType, //需求类型参数
            desireIntensitys: that.form.desireIntensitys, //意愿
            pairNumbers: that.form.pairNumbers, //带看次数，多选，数字数组
            attentionStatus: that.form.attentionStatus ? 0 : "", //是否关注
            isBuy: that.form.isBuy == 1 ? 1 : "", //是否成交
            minPrice: that.form.minPrice, //最低价
            maxPrice: that.form.maxPrice, //最高价
            minArea: that.form.minArea, //最小面积
            maxArea: that.form.maxArea, //最大面积
            houseNumbers: that.form.houseNumbers, //房型 需要处理数据
            minAddTime: that.form.minAddTime, //委托开始时间
            maxAddTime: that.form.maxAddTime, //委托结束时间
            minMainTainTime: that.form.minMainTainTime, //维护开始时间
            maxMainTainTime: that.form.maxMainTainTime, //维护结束时间
            minLastPairFollowTime: that.form.minLastPairFollowTime, //带看开始时间
            maxLastPairFollowTime: that.form.maxLastPairFollowTime //带看结束时间
          }
        })
        .then(e => {
          console.log(e.data);
          let json = e.data;
          if (json.code == 200) {
            this.tableData = json.data.data;
            this.pageSum = json.data.pageSum;
            this.dataCount = json.data.dataCount;
          } else if (json.code == 400) {
            alert(json.message);
            console.log("失败     " + json);
          }
          this.loading = false;
        });
    },
    handleSizeChange(val) {
      this.limit = val;
      this.apply();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.apply();
    },
    houserequire(i) {
      let type;
      switch (i) {
        case 1:
          type = "买二手住宅";
          break;
        case 2:
          type = "买二手商铺";
          break;
        case 4:
          type = "买二手写字楼";
          break;
        case 8:
          type = "买新房住宅";
          break;
        case 16:
          type = "买新房商铺";
          break;
        case 32:
          type = "买新房写字楼";
          break;
        case 64:
          type = "租赁住宅";
          break;
        case 128:
          type = "租赁商铺";
          break;
        case 256:
          type = "租赁写字楼";
          break;
        default:
          break;
      }
      return type;
    },
    housesource(i) {
      let type;
      switch (i) {
        case 11:
          type = "老客户";
          break;
        case 12:
          type = "转介绍";
          break;
        case 13:
          type = "亲戚朋友";
          break;
        case 14:
          type = "同学";
          break;
        case 21:
          type = "业主资料";
          break;
        case 22:
          type = "重复购买";
          break;
        case 31:
          type = "58同城";
          break;
        case 32:
          type = "安居客";
          break;
        case 33:
          type = "朋友圈";
          break;
        case 34:
          type = "其他网络";
          break;
        case 41:
          type = "公众号";
          break;
        case 42:
          type = "小程序";
          break;
        case 43:
          type = "APP";
          break;
        default:
          break;
      }
      return type;
    },
    navigateTo(row) {
      this.$router.push({
        path: "/customers/customersDetail",
        query: { customerId: row.id }
      });
    }
  }
};
</script>
