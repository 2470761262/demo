<style lang="less" scoped>
.notice-content {
  margin-top: 24px;
  padding: 24px 0;
  background: #ffffff;
  line-height: 1;
  box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
  border-radius: 8px;
  .notice-head {
    display: flex;
    align-items: center;
    padding: 0 24px;
    .head-item {
      .head-item-f(#303133, @font14);
      &.active {
        font-size: @font18;
      }
    }
    .head-more {
      color: @backgroud;
      flex: 1;
      text-align: right;
      span {
        cursor: pointer;
        &::after {
          content: "\e62d";
          font-family: iconfont;
          font-size: @font14;
        }
      }
    }
  }
  .notice-list {
    margin-top: 28px;
    height: 166px;
    .scrollbar {
      height: 100%;
      /deep/.el-scrollbar__wrap {
        overflow-x: hidden;
      }
      .notice-list-pad {
        padding: 0 24px;
      }
    }
    .notice-list-item {
      display: flex;
      margin-top: 24px;
      &:first-child {
        margin-top: 0px;
      }
      font-size: @font14;
      color: #606266;
      cursor: pointer;
      &:hover {
        .notice-item-text {
          text-decoration: underline;
        }
      }
      .notice-item-text {
        width: 164px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .notice-item-time {
        flex: 1;
        text-align: right;
        color: #909399;
      }
    }
    .is-empty {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 114px;
        height: 94px;
      }
      div {
        font-size: @font14;
        color: #606266;
        margin-top: 24px;
      }
    }
  }
}
.head-item-f(@color:@backgroud,@font:@font16) {
  cursor: pointer;
  color: @color;
  font-size: @font;

  margin-right: 24px;
  &.active {
    position: relative;
    font-weight: bold;
    color: @backgroud;
    font-size: @font16;

    padding-bottom: 9px;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;

      height: 4px;
      background: @backgroud;

      border-radius: 2px 2px 0px 0px;
    }
  }
}
</style>

<template>
  <div class="notice-content" :key="root.sxsx">
    <div class="notice-head">
      <div
        class="head-item"
        :class="{ active: root.activeIndex == 0 }"
        @click="setActiveIndex(0)"
      >
        系统公告
      </div>
      <div
        class="head-item "
        :class="{ active: root.activeIndex == 1 }"
        @click="setActiveIndex(1)"
      >
        规则文档
      </div>
      <!-- <div class="head-more" @click="navToMoer">
        <span>更多</span>
      </div> -->
    </div>
    <div class="notice-list" v-loading="root.loading">
      <el-scrollbar class="scrollbar" id="notice">
        <div class="notice-list-pad">
          <div
            class="notice-list-item"
            v-for="item in root.activeList"
            :key="item.id"
            @click="navTouch(item)"
          >
            <div class="notice-item-text" :title="item.title">
              {{ item.title }}
            </div>
            <div class="notice-item-time">{{ item.date }}</div>
          </div>
        </div>
        <div v-if="cd.isEmpty" class="is-empty">
          <img
            src="https://sysimgs.oss-cn-shenzhen.aliyuncs.com/Background/kong.png"
            alt=""
          />
          <div>暂无数据</div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { enter } from "./realization/notice";
import { V2Init } from "vcomposition2";
export default V2Init({
  created: [enter]
});
</script>
