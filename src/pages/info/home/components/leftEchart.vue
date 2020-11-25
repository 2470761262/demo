<style lang="less" scoped>
.rank-item {
  background: #ffffff;
  box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
  border-radius: 8px;
  flex: 0 0 calc((100% - 32px) / 2);
  margin: 0 8px;
  background: #fff;
  padding: 24px 0;
  .rank-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    .head-title {
      font-size: @font18;
      color: #303133;
      font-weight: bold;
      display: flex;
      align-items: baseline;
      position: relative;
      .after-content {
        margin-left: 16px;
        display: flex;
        align-items: center;
        color: #909399;
        cursor: pointer;
        .after-text {
          font-size: @font14;
        }
        .iconfont {
          font-size: 12px;
          transform: scale(0.5);
          margin-left: 2px;
        }
      }
    }
    .head-btn {
      cursor: pointer;
      color: @backgroud;
      font-size: @font14;
      &::before {
        margin-right: 8px;
      }
    }
  }
  .echart-content {
    // width: 418px;
    padding: 0 24px;
    height: 254px;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 24px;
      right: 24px;
      height: 1px;
      background: #f0f2f5;
    }
    #chart {
      width: 100%;
      height: 213px;
    }
    .cheart-foot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        color: #909399;
        font-size: @font12;
      }
      button {
        background: #fff;
        border: 1px solid @backgroud;
        color: @backgroud;
        width: 85px;
        height: 28px;
        border-radius: 4px;
        font-size: @font12;
        text-align: center;
        line-height: 1;
        outline: none;
        cursor: pointer;
      }
    }
    .is-empty {
      height: 213px;
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
  .rank-list {
    margin-top: 24px;
    .rank-list-head {
      display: flex;
      padding: 0 24px;
      .head-item {
        .head-item-f;
      }
    }
  }
  .rank-list-data {
    margin-top: 7px;
    padding: 16px 0px 0;
    height: 300px;
    position: relative;
    .is-fixed {
      z-index: 10;
      border-radius: 4px;
      position: absolute;
      bottom: 0;
      left: 24px;
      right: 24px;
      background: linear-gradient(
          360deg,
          rgba(48, 192, 181, 0.08) 0%,
          rgba(34, 186, 175, 0.22) 100%
        )
        #fff;
      height: 58px;
      box-shadow: 0px 3px 13px 0px rgba(147, 147, 147, 0.1);
      .scrollbar > .data-item;
      margin-bottom: 0;
    }
    .scrollbar {
      height: 100%;
      /deep/.el-scrollbar__wrap {
        overflow-x: hidden;
      }
      .scroll-pad {
        padding: 0 24px;
        .is-empty {
          height: 300px;
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
        &.is-emplt-split {
          &::after {
            content: "";
            display: block;

            height: 82px;
          }
        }
      }
      .data-item {
        &:last-child {
          margin-bottom: 0;
        }
        display: flex;
        align-items: center;
        margin-bottom: 24px;
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
    }
  }
}
.head-item-f(@color:@backgroud,@font:@font16) {
  cursor: pointer;
  color: #303133;
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
  <div class="rank-item">
    <div class="rank-head">
      <span class="head-title">
        <span class="title-text">经纪人业绩</span>
        <div
          class="after-content"
          @click.stop="changeSelectFlag()"
          v-if="
            parentInstance.roleConfig.indexRankBroker &&
              refresh.defaultBroker.name
          "
        >
          <span class="after-text">{{
            checkName || refresh.defaultBroker.name
          }}</span>
          <span class="iconfont iconjuxing"></span>
        </div>
        <ls-select
          v-if="selectFlag"
          key-id="accountId"
          title-key="perName"
          @getRemote="getRemote"
          place-str="搜索经纪人"
          @close="changeSelectFlag"
        />
      </span>
      <span class="head-btn el-icon-refresh" @click="reLoadData()"
        >更新数据</span
      >
    </div>
    <div class="echart-content">
      <template v-if="!loading && !isDefaultBroker">
        <div class="is-empty">
          <img
            src="https://sysimgs.oss-cn-shenzhen.aliyuncs.com/Background/kong.png"
            alt=""
          />
          <div>暂无数据</div>
        </div>
      </template>
      <template v-else>
        <div id="chart" ref="echart"></div>
      </template>
      <div class="cheart-foot">
        <span>更新时间：{{ nowTime }}</span>
        <button @click="headleChangeTime">
          {{ changeTime ? "查看上月" : "回到本月" }}
        </button>
      </div>
    </div>
    <div class="rank-list">
      <div class="rank-list-head">
        <div
          class="head-item"
          :class="{ active: index == refresh.rankType }"
          v-for="(item, index) in choiceList"
          :key="item.type"
          @click="setActiveType(index)"
        >
          {{ item.title }}
        </div>
      </div>
      <div class="rank-list-data" v-loading="loading">
        <el-scrollbar class="scrollbar" id="broker">
          <!-- 如果需要显示is-fixed 则需要加上这个样式is-emplt-split -->
          <div
            class="scroll-pad"
            :class="{ 'is-emplt-split': isDefaultBroker }"
          >
            <div
              class="data-item"
              v-for="item in refresh.renderlist"
              :key="item.accountId"
            >
              <div class="rank-img" v-if="item.isTopThree">
                <img :src="item.prefix" alt="" />
              </div>
              <div class="rank-icon" v-else>
                {{ item.prefix }}
              </div>
              <div class="rank-middle">
                <img :src="item.userImage" alt="" />
                <span class="per-name">{{ item.name }}</span>
              </div>
              <div class="rank-value">
                <span>￥</span>
                <span>{{ item.sumCommission }}</span>
              </div>
            </div>
            <div
              class="is-empty"
              v-if="refresh.renderlist.length == 0 && !loading"
            >
              <img
                src="https://sysimgs.oss-cn-shenzhen.aliyuncs.com/Background/kong.png"
                alt=""
              />
              <div>暂无数据</div>
            </div>
            <div v-if="isEndPage">已经到底部了</div>
          </div>
        </el-scrollbar>
        <div class="is-fixed" v-if="isDefaultBroker">
          <div class="rank-icon">
            {{ refresh.defaultBroker.rank }}
          </div>
          <div class="rank-middle">
            <img :src="refresh.defaultBroker.userImage" alt="" />
            <span class="per-name">{{ refresh.defaultBroker.name }}</span>
          </div>
          <div class="rank-value">
            <span>￥</span>
            <span>{{ refresh.defaultBroker.sumCommission }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lsSelect from "../../components/lsSelect";
//echart配置文件
import config from "../config/echartConfig";
//echarts
import echarts from "@/util/echartsConfig";
//工具
import util from "@/util/util";
function comNum(num) {
  if (num < 10) {
    return `0${num}.`;
  }
  return `${num}.`;
}
export default {
  inject: ["parentInstance"],
  components: {
    lsSelect
  },
  data() {
    return {
      realTime: new Date(),
      selectFlag: false,
      refresh: {
        echartInstance: null, //图标实例
        rankType: 2, //激活下标
        renderlist: [], //激活
        shopListPage: {
          //门店分页
          limit: 999,
          currentPage: 1,
          totalPage: 1
        },
        areaListPage: {
          //区域分页
          limit: 10,
          currentPage: 1,
          totalPage: 1
        },
        companyListPage: {
          //公司分页
          limit: 10,
          currentPage: 1,
          totalPage: 1
        },
        shopList: {
          //缓存门店
          list: [],
          defaultBroker: {}
        },
        areaList: {
          //缓存区域
          list: [],
          defaultBroker: {}
        },
        companyList: {
          //缓存公司
          list: [],
          defaultBroker: {}
        },
        defaultBroker: {}
      },
      choiceList: [
        {
          title: "门店排名",
          type: 4,
          cacheList: "shopList",
          loadDisabled: true
        },
        { title: "区域排名", type: 3, cacheList: "areaList" },
        {
          title: "公司排名",
          type: 2,
          cacheList: "companyList",
          loadDisabled: true
        }
      ],
      loading: true,
      changeTime: true,
      checkName: "", //经纪人名称
      checkId: null //经纪人ID
    };
  },
  computed: {
    /**
     * @example:
     */

    isEndPage() {
      const active = this.choiceList[this.refresh.rankType];
      const activePage = this.refresh[active.cacheList + "Page"];
      if (
        !active.loadDisabled &&
        activePage.currentPage > 1 &&
        activePage.currentPage > activePage.totalPage
      ) {
        return true;
      }
      return false;
    },
    nowTime() {
      return util.format(new Date(), "yyyy-MM-dd");
    },
    /**
     * @example: 是否存在默认
     */

    isDefaultBroker() {
      return Object.keys(this.refresh.defaultBroker).length > 0;
    }
  },
  created() {
    this.loadPage();
  },
  mounted() {
    document
      .querySelector("#broker .el-scrollbar__wrap")
      .addEventListener("scroll", this.scroll);
  },
  beforeDestroy() {
    document
      .querySelector("#broker .el-scrollbar__wrap")
      .removeEventListener("scroll", this.scroll);
  },
  methods: {
    scroll({ target }) {
      if (target.scrollTop + target.clientHeight == target.scrollHeight) {
        this.loadPage();
      }
    },
    /**
     * @example: 分页加载
     */

    loadPage() {
      const active = this.choiceList[this.refresh.rankType];
      const activePage = this.refresh[active.cacheList + "Page"];
      const isFirst = this.refresh[active.cacheList].list.length == 0;
      if (
        (!active.loadDisabled &&
          activePage.currentPage <= activePage.totalPage) ||
        isFirst
      ) {
        this.getList(activePage.currentPage, isFirst);
      }
    },
    /**
     * @example: 获取经纪人数据
     */

    getRemote(done, name) {
      this.$api
        .get({
          url: "/statistics/index/rank/broker",
          data: {
            name: name || "", // this.checkName,
            limit: 30
          }
        })
        .then(({ data }) => {
          done(data.data);
        });
    },
    /**
     * @example: 切换时间
     */

    headleChangeTime() {
      const changeTime = this.changeTime;
      if (this.changeTime) this.realTime.setMonth(this.realTime.getMonth() - 1);
      else this.realTime.setMonth(this.realTime.getMonth() + 1);

      this.changeTime = !this.changeTime;
      this.reLoadData();
    },
    /**
     * @example: 重置
     */

    reLoadData() {
      //清除画布
      this.refresh.echartInstance && this.refresh.echartInstance.clear();
      //重置属性
      Object.assign(this.$data.refresh, this.$options.data.call(this).refresh);
      //获取接口
      this.getList();
    },
    /**
     * @example: 切换当前选择类型234244
     */

    setActiveType(index) {
      this.refresh.rankType = index;
      this.getList();
    },
    /**
     * @example:  获取列表数据
     */
    getList(page = 1, reset = true) {
      const active = this.choiceList[this.refresh.rankType];
      const activePage = this.refresh[active.cacheList + "Page"];
      if (this.refresh[active.cacheList].list.length > 0 && reset) {
        this.refresh.renderlist = this.refresh[active.cacheList].list;
        this.refresh.defaultBroker = this.refresh[
          active.cacheList
        ].defaultBroker;
        this.$nextTick(() => {
          this.renderEchart({
            lease: this.refresh.defaultBroker.saleCommission,
            deal: this.refresh.defaultBroker.rentCommission,
            project: this.refresh.defaultBroker.projectCommission
          });
          document
            .getElementById("broker")
            .querySelector(".el-scrollbar__wrap").scrollTop = 0;
        });
        return;
      }
      this.loading = true;
      return this.$api
        .get({
          url: "/statistics/index/rank-list/broker",
          data: {
            rankType: active.type,
            date: util.format(this.realTime, "yyyy-MM") + "-01",
            limit: activePage.limit,
            id: this.checkId,
            page
          }
        })
        .then(({ data }) => {
          const brokerRankList = data.data.brokerRankList.list || [];
          //缓存对应数据
          this.refresh[active.cacheList].list = [
            ...this.refresh[active.cacheList].list,
            ...brokerRankList
          ].map((v, i) => {
            let sumCommission = "****";

            switch (
              this.refresh.rankType //激活下标
            ) {
              case 1: //区域  只显示前3名的真实数据
              case 2: //公司 显示前3名以外的真实数据
                if (i <= 2 && typeof v.sumCommission != "string") {
                  sumCommission = util.regexNum(
                    v.sumCommission ? v.sumCommission.toFixed(2) : 0
                  );
                } else {
                  if (v.sumCommission && typeof v.sumCommission == "string") {
                    sumCommission = v.sumCommission;
                  }
                }
                break;
              default:
                if (typeof v.sumCommission != "string") {
                  sumCommission = util.regexNum(
                    v.sumCommission ? v.sumCommission.toFixed(2) : 0
                  );
                }
                break;
            }

            return {
              ...v,
              isTopThree: i <= 2 ? true : false,
              prefix:
                i <= 2
                  ? `https://img.0be.cn/pc/attence_bz_0${i}.svg`
                  : comNum(i + 1),
              sumCommission
            };
          });
          //赋值给渲染数组
          this.refresh.renderlist = this.refresh[active.cacheList].list;

          //显示底部默认经纪人
          const defaultBroker = data.data.defaultBroker;

          if (defaultBroker && Object.keys(defaultBroker).length > 0 && reset) {
            this.refresh[active.cacheList].defaultBroker = {
              ...defaultBroker,
              ...{
                rank: comNum(defaultBroker.rank),
                sumCommission: util.regexNum(
                  defaultBroker.sumCommission.toFixed(2)
                )
              }
            };
            this.refresh.defaultBroker = this.refresh[
              active.cacheList
            ].defaultBroker;
            this.$nextTick(() => {
              this.renderEchart({
                lease: defaultBroker.saleCommission,
                deal: defaultBroker.rentCommission,
                project: defaultBroker.projectCommission
              });
              document
                .getElementById("broker")
                .querySelector(".el-scrollbar__wrap").scrollTop = 0;
            });
          } else {
            this.refresh.echartInstance &&
              reset &&
              this.refresh.echartInstance.dispose();
          }
          this.loading = false;
          activePage.totalPage = data.data.brokerRankList.totalPage;
          activePage.currentPage++;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    /**
     * @example: 切换查询下拉框状态
     */
    changeSelectFlag(value) {
      this.selectFlag = !this.selectFlag;

      if (value) {
        this.checkName = value.perName;
        this.checkId = value.accountId;
        this.reLoadData();
      }
    },
    /**
     * @example: 初始化Echart
     */
    initEchart() {
      this.$nextTick(() => {
        this.refresh.echartInstance = echarts.init(this.$refs.echart);
      });
    },
    /**
     * @example: 渲染Echart
     */
    renderEchart(echartData) {
      if (!this.refresh.echartInstance) this.initEchart();
      Promise.resolve().then(() => {
        this.refresh.echartInstance.setOption(config(echartData));
      });
    }
  }
};
</script>
