<template>
  <!-- 房源系统-业务管理 -->
  <div class="container">
    <span class="position">当前位置：</span>
    <div class="header">
      <div class="nav">
        <div class="item" v-for="(item, index) in navList" :key="index" :class="{'active': navActiveIndex===index}">{{item}}</div>
      </div>
      <div class="header-bottom">
        <div class="head-content-input">
          <input
            type="text"
            placeholder="请输入姓名、门店、区域"
            class="content-input anchor-point"
            v-model="businessKeyword"
            @keydown.enter="fuzzySearch"
          />
          <button
            class="inquire-content anchor-point"
            @click="fuzzySearch"
          >
            <i class="el-icon-search"></i>
          </button>
        </div>
        <div class="right">
          <el-radio-group v-model="searchType">
            <el-radio-button
             class="btn"
             :label="item.value"
             v-for="(item, index) in searchTypes"
             :key="index"
            >{{item.name}}
            </el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
    <!-- 作业数据 -->
    <div class="work">
      <div class="head">
        <div class="topic">资源统计</div>
        <div class="tip-box">
          <div class="text">数据说明</div>
          <i class="el-icon-question"></i>
        </div>
      </div>
      <div class="content">
        <el-table
        :data="workData"
        style="width: 100%">
          <el-table-column
            v-for="(item, index) in workColumn"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            >
          </el-table-column>
        </el-table>
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
        </el-pagination>
      </div>
    </div>
    <!-- 开发数据 -->
    <div class="develop">
      <div class="head">
        <div class="search-box">
          <div class="title">查询时间</div>
          <div class="time-box">
            <input class="ipt" type="text" placeholder="起始时间">
            <span class="pre">至</span>
            <input class="ipt" type="text" placeholder="结束时间">
          </div>
          <button class="search-btn">重置</button>
          <button class="search-btn active">搜索</button>
        </div>
        <div class="tip-box">
          <div class="text">数据说明</div>
          <i class="el-icon-question"></i>
        </div>
      </div>
      <div class="content">
        <el-table
         :data="developData"
         style="width: 100%">
          <el-table-column
            v-for="(item, index) in developColumn"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :fixed="item.fixed">
            <el-table-column
              v-for="(list, i) in item.children"
              :key="i"
              :prop="list.prop"
              :label="list.label"
              :width="list.width">
            </el-table-column>
          </el-table-column>
        </el-table>
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
        </el-pagination>
      </div>
    </div>
    <!-- 鑫币数据 -->
    <div class="currency">
      <div class="head">
        <div class="search-box">
          <div class="title">查询时间</div>
          <div class="time-box">
            <input class="ipt" type="text" placeholder="起始时间">
            <span class="pre">至</span>
            <input class="ipt" type="text" placeholder="结束时间">
          </div>
          <button class="search-btn">重置</button>
          <button class="search-btn active">搜索</button>
        </div>
        <div class="tip-box">
          <div class="text">数据说明</div>
          <i class="el-icon-question"></i>
        </div>
      </div>
      <div class="nav-box">
        <div class="item"
         v-for="(item, index) in currencyTypes"
         :key="index"
         :class="{'active': currencyTypeIndex===index}"
         @click="changeCurrencyType(index)"
        >{{item.name}}</div>
        <p class="tip">注：取值数据截止到昨天24点整</p>
      </div>
      <div class="content">
        <el-table
         :data="currencyData"
         style="width: 100%">
          <el-table-column
            v-for="(item, index) in currencyColumn"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            >
          </el-table-column>
        </el-table>
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navActiveIndex: 0,
      navList: ["业务管理", "买卖房源", "租赁房源", "客源", "人员管理"],
      businessKeyword: "",
      searchTypes: [
        {
          name: "经纪人",
          value: 0
        }, {
          name: "门店",
          value: 1
        }, {
          name: "区域",
          value: 2
        }
      ],
      searchType: 0,
      currentPage1: 4,
      currencyTypeIndex: 0,
      currencyTypes: [
        {
          name: "鑫币统计",
          value: 0
        }, {
          name: "业绩统计",
          value: 1
        }
      ],
      workColumn: [
        {
          prop: "",
          label: "姓名/门店/区域",
          width: "150"
        }, {
          prop: "",
          label: "跟单房源量",
          width: "150"
        }, {
          prop: "",
          label: "独家委托量",
          width: "150"
        }, {
          prop: "",
          label: "普通委托量",
          width: "150"
        }, {
          prop: "",
          label: "钥匙委托量",
          width: "150"
        }, {
          prop: "",
          label: "房源录入量",
          width: "150"
        }, {
          prop: "",
          label: "客户量",
          width: "150"
        }
      ],
      workData: [], // 作业数据,
      developColumn: [
        {
          prop: "",
          label: "姓名/门店/区域",
          width: "150",
          fixed: "left"
        }, {
          label: "房源开发",
          width: "450",
          children: [
            {
              prop: "",
              label: "电开次数",
              width: "150"
            }, {
              prop: "",
              label: "新增验真",
              width: "150"
            }, {
              prop: "",
              label: "库存验真",
              width: "150"
            }
          ]
        }, {
          label: "房源维护",
          width: "600",
          children: [
            {
              prop: "",
              label: "被看次数",
              width: "150"
            }, {
              prop: "",
              label: "电话回访",
              width: "150"
            }, {
              prop: "",
              label: "写面访",
              width: "150"
            }, {
              prop: "",
              label: "写跟进",
              width: "150"
            }
          ]
        }, {
          label: "房源开发",
          width: "300",
          children: [
            {
              prop: "",
              label: "电开次数",
              width: "100"
            }, {
              prop: "",
              label: "新增客户",
              width: "100"
            }, {
              prop: "",
              label: "认领客户",
              width: "100"
            }
          ]
        }, {
          label: "房源维护",
          width: "500",
          children: [
            {
              prop: "",
              label: "带看客户数",
              width: "100"
            }, {
              prop: "",
              label: "1带多看",
              width: "100"
            }, {
              prop: "",
              label: "3日内首看",
              width: "100"
            }, {
              prop: "",
              label: "7日内首看",
              width: "100"
            }, {
              prop: "",
              label: "复看",
              width: "100"
            }
          ]
        }
      ],
      developData: [], // 开发数据
      currencyColumn: [
        {
          prop: "",
          label: "姓名/门店/区域",
          width: "150"
        }, {
          prop: "",
          label: "本月新增",
          width: "150"
        }, {
          prop: "",
          label: "昨日新增",
          width: "150"
        }, {
          prop: "",
          label: "本月兑换（品牌分）",
          width: "150"
        }, {
          prop: "",
          label: "本月兑换（物品）",
          width: "150"
        }, {
          prop: "",
          label: "剩余鑫币",
          width: "150"
        }
      ],
      currencyData: [] // 鑫币数据
    }
  },
  created() {
    this.getWorkData();
  },
  methods: {
    getWorkData() {
      let params = {
          staLev: 1, //0经纪人,1门店,2区域
          dateFlag: "",//日
          perName: "",
          page: 1,
          limit: 10
      };
      this.$api
        .post({
          url: "/static/listStaticResource2",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params
        })
        .then(e => {
          console.log(e,"=========");
          if (data.code == 200) {
            this.developData = e.data.data.data;
          }
        })
        .catch(() => {})
        .finally(() => {});
    },
    fuzzySearch() {
      console.log(this.businessKeywoord, "模糊搜索-------");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    changeCurrencyType(index) {
      this.currencyTypeIndex = index;
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  min-height: 100%;
  // prettier-ignore
  padding: 12PX 16PX 51PX;
  background: #F0F7F7;
  .position {
    line-height: 1;
    font-size: @font12;
    color: #303133;
  }
  .header {
    // prettier-ignore
    margin-top: 12PX;
    // prettier-ignore
    padding: 24PX 24PX 20PX 24PX;
    background: #fff;
    border-radius: 8px;
    .nav {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid #F0F2F5;
      .item {
        // prettier-ignore
        margin: 0 36PX 16PX 0;
        line-height: 1;
        font-size: @font18;
        color: #909399;
        &.active {
          font-weight: bold;
          color: #303133;
        }
      }
    }
    .header-bottom {
      display: flex;
      justify-content: space-between;
      // prettier-ignore
      padding-top: 10PX;
      .head-content-input {
        // prettier-ignore
        width: 494PX;
        // prettier-ignore
        height: 48PX;
        display: flex;
        .content-input {
          // prettier-ignore
          width: 411PX;
          border: 1px solid rgba(206, 206, 206, 1);
          border-right: none;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          text-indent: 16px;
          // line-height: 48px;
          height: 100%;
          box-sizing: border-box;
          outline: none;
          font-size: @font16;
          &::placeholder {
            font-size: @font16;
            color: #a6aaaf;
          }
        }
        .inquire-content {
          flex: 1;
          background: @backgroud;
          outline: none;
          border: 0;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          font-size: @font24;
          color: #fff;
          cursor: pointer;
        }
      }
      .right {
        display: flex;
        align-items: center;
        // prettier-ignore
        padding: 2PX;
        border: 1px solid @backgroud;
        border-radius: 4px;
        /deep/.el-radio-group {
          line-height: inherit;
          .btn {
            .el-radio-button__inner {
              // prettier-ignore
              width: 114PX;
              // prettier-ignore
              height: 40PX;
              padding: 0;
              border: none;
              border-radius: 4px;
              // prettier-ignore
              line-height: 40PX;
              font-size: @font16;
              color: @backgroud;
              box-shadow: none;
            }
            &.is-active {
              .el-radio-button__inner {
                background: @backgroud;
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
  .work,
  .develop,
  .currency {
    // prettier-ignore
    margin-top: 16PX;
    // prettier-ignore
    padding: 24PX 16PX 18PX;
    background: #fff;
    border-radius: 8px;
    .head {
      display: flex;
      justify-content: space-between;
      .topic {
        line-height: 1;
        font-size: @font24;
        font-weight: bold;
        color: #303133;
      }
      .tip-box {
        display: flex;
        align-items: center;
        .text {
          // prettier-ignore
          margin-right: 8PX;
          line-height: 1;
          font-size: @font16;
          color: #247257;
        }
        i {
          font-size: @font16;
          color: #247257;
        }
      }
      .search-box{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .title {
          // prettier-ignore
          margin-right: 10PX;
          font-size: @font14;
          font-weight: bold;
          color: #303133;
        }
        .time-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          // prettier-ignore
          width: 308PX;
          // prettier-ignore
          height: 34PX;
          padding: 0 10px;
          // prettier-ignore
          margin-right: 16PX;
          border: 1px solid #CECECE;
          border-radius: 4px;
          box-sizing: border-box;
          .ipt {
            // prettier-ignore
            width: 130PX;
            border: none;
            outline: none;
            font-size: @font14;
            &::placeholder {
              color: #909399;
            }
          }
          .pre {
            font-size: @font12;
            color: #303133;
          }
        }
        .search-btn {
          // prettier-ignore
          width: 90PX;
          // prettier-ignore
          height: 36PX;
          border: none;
          border-radius: 4px;
          background: #fff;
          outline: none;
          line-height: 1;
          text-align: center;
          font-size: @font12;
          color: @backgroud;
          cursor: pointer;
          &.active {
            // prettier-ignore
            margin-left: 9PX;
            background: @backgroud;
            color: #fff;
          }
        }
      }
    }
    .nav-box {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .item {
        position: relative;
        display: flex;
        align-items: flex-end;
        // prettier-ignore
        margin: 24PX 0 29PX;
        // prettier-ignore
        height: 26PX;
        font-size: @font18;
        color: #303133;
        cursor: pointer;
        &:not(:last-of-type) {
          // prettier-ignore
          margin-right: 36PX;
        }
        &.active {
          font-size: @font24;
          color: @backgroud;
          &::after {
            content: "";
            position: absolute;
            // prettier-ignore
            bottom: -17PX;
            width: 100%;
            // prettier-ignore
            height: 4PX;
            background: @backgroud;
            // prettier-ignore
            border-radius: 4PX;
          }
        }
      }
      .tip {
        // prettier-ignore
        margin-left: 26PX;
        font-size: @font14;
        color: #909399;
      }
    }
    /deep/.content {
      // prettier-ignore
      margin-top: 24PX;
      .el-table__header-wrapper {
        background: #F0F5F4;
      }
      .el-table th {
        // prettier-ignore
        height: 48PX;
        padding: 0;
        background: #F0F5F4;
        font-weight: normal;
        font-size: @font16;
        color: #303133;
        .cell {
          line-height: 1;
        }
      }
    }
  }
}
</style>
