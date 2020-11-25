<style lang="less" scoped>
.normal-content {
  height: 698px;
  background: #ffffff;
  box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
  border-radius: 8px;
  flex: 0 0 calc((100% - 32px) / 2);
  margin: 0 8px;
  &.small-height {
    height: 406px;
    .normal-scroll {
      height: 340px;
      &::before {
        display: none;
      }
      .scrollbar-pad {
        &::after {
          display: none;
        }
      }
    }
  }
  .normal-title {
    margin: 0 24px;
    height: 66px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f0f2f5;
    .title-text {
      color: #303133;
      font-size: @font18;
      font-weight: bold;
    }
    .title-btn {
      display: flex;
      color: @backgroud;
      cursor: pointer;
      align-items: center;
      line-height: 1;
      .btn-prefix {
        font-size: @font16;
        margin-right: 8px;
      }
      .btn-title {
        font-size: @font14;
      }
    }
  }
  .normal-scroll {
    height: 632px;
    position: relative;
    &::before {
      content: "";
      left: 0;
      bottom: 0;
      height: 24px;
      width: 100%;
      position: absolute;
      background: #ffffff;
      box-shadow: 0px -2px 15px 0px rgba(0, 0, 0, 0.1);
      border-radius: 0px 0px 8px 8px;
      z-index: 10;
    }
    .scrollbar {
      height: 100%;
      /deep/.el-scrollbar__wrap {
        overflow-x: hidden;
      }
      .scrollbar-pad {
        &::after {
          content: "";
          height: 26px;
          display: block;
        }
        .data-item {
          display: flex;
          align-items: center;
          margin-top: 30px;
          .rank-img {
            padding-left: 16px;
          }
          .rank-icon {
            padding-left: 16px;
            font-size: @font16;
            color: #303133;
            font-family: rank;
          }
          .rank-middle {
            flex: 1;
            display: flex;
            align-items: center;
            margin-left: 24px;
            img {
              width: 32px;
              height: 32px;
              border-radius: 50%;
              margin-right: 8px;
            }
            .per-name {
              font-size: @font16;
              color: #303133;
              font-weight: bold;
            }
          }
          .rank-value {
            display: flex;
            align-items: baseline;
            font-weight: bold;
            padding-right: 16px;
            span {
              &:first-child {
                font-size: @font12;
                margin-right: 2px;
              }
              &:last-child {
                font-size: @font16;
                color: #303133;
                font-family: lsx;
              }
            }
          }
        }
        .is-empty {
          margin-top: 50px;
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
  }
}
</style>

<template>
  <div class="normal-content" :class="{ 'small-height': list.length < 6 }">
    <div class="normal-title">
      <div class="title-text">门店业绩</div>
      <div class="title-btn" @click="getData">
        <div class="btn-prefix el-icon-refresh-right"></div>
        <div class="btn-title">更新数据</div>
      </div>
    </div>
    <div class="normal-scroll" v-loading="loading">
      <el-scrollbar class="scrollbar">
        <div class="scrollbar-pad">
          <div class="data-item" v-for="item in list" :key="item.accountId">
            <div class="rank-img" v-if="item.isTopThree">
              <img :src="item.prefix" alt="" />
            </div>
            <div v-else class="rank-icon">
              {{ item.prefix }}
            </div>
            <div class="rank-middle">
              <!-- <img :src="item.userImage" alt="" /> -->
              <span class="per-name">{{ item.deptName }}</span>
            </div>
            <div class="rank-value">
              <span>￥</span>
              <span>{{ item.sumCommission }}</span>
            </div>
          </div>
          <div v-if="isEmpty" class="is-empty">
            <img
              src="https://sysimgs.oss-cn-shenzhen.aliyuncs.com/Background/kong.png"
              alt=""
            />
            <div>暂无数据</div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import util from "@/util/util";

function comNum(num) {
  if (num < 10) {
    return `0${num}.`;
  }
  return `${num}.`;
}
export default {
  computed: {
    isEmpty() {
      return !this.loading && this.list.length == 0;
    }
  },
  data() {
    return {
      list: [],
      loading: true
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      this.$api
        .get({
          url: "/statistics/index/rank/support/store",
          data: {
            limit: 20
          }
        })
        .then(({ data }) => {
          this.list = data.data.storeRankList.map((v, i) => {
            return {
              ...v,
              isTopThree: i <= 2 ? true : false,
              prefix:
                i <= 2
                  ? `https://img.0be.cn/pc/attence_bz_0${i}.svg`
                  : comNum(i + 1),
              sumCommission: util.regexNum(v.sumCommission)
            };
          });
        })
        .then(() => {
          this.loading = false;
        });
    }
  }
};
</script>
