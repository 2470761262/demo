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
    <div class="work"></div>
    <!-- 开发数据 -->
    <div class="develop"></div>
    <!-- 鑫币数据 -->
    <div class="currency"></div>
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
      searchType: 0
    }
  },
  methods: {
    fuzzySearch() {
      console.log(this.businessKeywoord, "模糊搜索-------");
    }
  }
}
</script>
<style lang="less">
.container {
  min-height: 100%;
  padding: 10px 20px;
  background: #F0F7F7;
  .position {
    font-size: @font14;
  }
  .header {
    margin-top: 10px;
    padding: 30px;
    background: #fff;
    border-radius: 15px;
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
        .btn {
          .el-radio-button__inner {
            // prettier-ignore
            width: 114PX;
            border-color: #fff;
            border-radius: 5px;
            font-size: @font16;
            color: #247257;
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
</style>
