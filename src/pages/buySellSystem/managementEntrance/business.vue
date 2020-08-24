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
        <div class="title">资源统计</div>
        <div class="tip-box">
          <div class="text">数据说明</div>
          <i class="el-icon-question"></i>
        </div>
      </div>
      <div class="content">
        <el-table
        :data="tableData"
        style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
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
            <input class="ipt" type="text" placeholder="起始时间">至
            <input class="ipt" type="text" placeholder="结束时间">
          </div>
          <button>重置</button>
          <button>搜索</button>
        </div>
        <div class="tip-box">
          <div class="text">数据说明</div>
          <i class="el-icon-question"></i>
        </div>
      </div>
      <div class="content">
        <el-table
         :data="tableData"
         style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
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
            <input type="text" placeholder="起始时间">至
            <input type="text" placeholder="结束时间">
          </div>
          <button>重置</button>
          <button>搜索</button>
        </div>
        <div class="tip-box">
          <div class="text">数据说明</div>
          <i class="el-icon-question"></i>
        </div>
      </div>
      <div class="nav-box">
        <div class="item" v-for="(item, index) in currencyTypes" :key="index">{{item.name}}</div>
        <p class="tip">注：取值数据截止到昨天24点整</p>
      </div>
      <div class="content">
        <el-table
         :data="tableData"
         style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
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
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      currentPage1: 4,
      currencyTypes: [
        {
          name: "鑫币统计",
          value: 0
        }, {
          name: "业绩统计",
          value: 1
        }
      ]
    }
  },
  methods: {
    fuzzySearch() {
      console.log(this.businessKeywoord, "模糊搜索-------");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  min-height: 100%;
  padding: 10px 20px;
  background: #F0F7F7;
  .position {
    font-size: @font14;
  }
  .header {
    margin-top: 10px;
    padding: 25px;
    background: #fff;
    border-radius: 10px;
    .nav {
      display: flex;
      justify-content: flex-start;
      border-bottom: 1px solid #ddd;
      .item {
        margin: 0 40px 20px 0;
        font-size: @font16;
        color: #999;
        &.active {
          font-weight: 900;
          color: #000;
        }
      }
    }
    .header-bottom {
      display: flex;
      justify-content: space-between;
      padding-top: 20px;
      .head-content-input {
        // prettier-ignore
        width: 455PX;
        // prettier-ignore
        height: 40PX;
        display: flex;
        .content-input {
          // prettier-ignore
          width: 390PX;
          border: 1px solid rgba(206, 206, 206, 1);
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
        padding: 5px;
        border: 1px solid #247257;
        border-radius: 5px;
        .el-radio-group {
          line-height: inherit;
          .btn {
            .el-radio-button__inner {
              // prettier-ignore
              width: 114PX;
              // prettier-ignore
              height: 32PX;
              padding: 0;
              border-color: #fff;
              border-radius: 5px;
              // prettier-ignore
              line-height: 30PX;
              font-size: @font16;
              color: #247257;
              box-shadow: none;
            }
            &.is-active {
              .el-radio-button__inner {
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
    margin-top: 20px;
    padding: 25px;
    background: #fff;
    border-radius: 10px;
    .head {
      display: flex;
      justify-content: space-between;
      .title {
        font-size: @font26;
        font-weight: 900;
      }
      .tip-box {
        display: flex;
        align-items: center;
        .text {
          // prettier-ignore
          margin-right: 5PX;
          font-size: @font14;
          color: #247257;
        }
        i {
          font-size: @font14;
          color: #247257;
        }
      }
      .search-box{
        .time-box {

        }
      }
    }
  }
}
</style>
