<style lang="less" scoped>
.log-content {
  // prettier-ignore
  margin-top: 10PX;
  border: 1px solid #d5d5d5;
  .log-content-head {
    // prettier-ignore
    padding: 0 28PX;
    font-size: @font16;
    display: flex;
    justify-content: space-between;
    // prettier-ignore
    height: 30PX;
    border-bottom: 1px solid #d5d5d5;
    .log-head-item {
      position: relative;
      height: 100%;
      // prettier-ignore
      line-height: 30PX;
      cursor: pointer;
      // prettier-ignore
      padding: 0 10PX;
      &.active {
        color: @backgroud;
        &::after {
          content: "";
          // prettier-ignore
          height: 2PX;
          width: 100%;
          background: @backgroud;
          position: absolute;
          bottom: -1px;
          left: 0;
        }
      }
    }
  }
  .log-tab-content {
    // prettier-ignore
    padding-left: 30PX;
    .log-tab-scroll {
      // prettier-ignore
      padding-top: 30PX;
      max-height: 565px;
      overflow: auto;
      // prettier-ignore
      padding-right: 20PX;
      .item-title {
        font-size: @font16;
        // prettier-ignore
        margin-bottom: 15PX;
      }
      .item-tips {
        display: flex;
        color: #aaaaaa;
        font-size: @font14;
        // prettier-ignore
        margin-bottom: 15PX;
        // prettier-ignore
        line-height: 30PX;
        // &:last-child {
        //   margin-bottom: 0;
        // }
        .item-tips-title {
          // prettier-ignore
          width: 70PX;
          flex-shrink: 0;
        }
        .item-tips-message {
          word-break: break-all;
          text-align: justify;
          flex: 1;
        }
      }
    }
  }
}
.scroll-bttom {
  font-size: @font16;
  padding: 20px 0;
}
</style>
<template>
  <div class="log-content">
    <div class="log-content-head">
      <div
        class="log-head-item"
        :class="{ active: activeIndex == index }"
        v-for="(item, index) in logTab"
        :key="item.title"
        @click="setTabIndex(index)"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="log-tab-content">
      <!-- 跟进 -->
      <div
        class="log-tab-scroll"
        infinite-scroll-immediate="false"
        v-infinite-scroll="load"
        v-show="activeIndex == 0"
      >
        <leftProgress v-for="item in follow.list" :key="item.id">
          <div class="item-title">{{ item.FollowTime }}</div>
          <div class="item-tips">
            <div class="item-tips-title">跟进人 :</div>
            <div class="item-tips-message">
              {{ item.followPerName }}({{ item.followPerDepartmentName }})
            </div>
          </div>
          <div class="item-tips">
            <div class="item-tips-title">跟进内容:</div>
            <div class="item-tips-message">{{ item.Memo }}</div>
          </div>
        </leftProgress>
        <template v-if="follow.loading">
          <div class="scroll-bttom">
            <i class="el-icon-loading"></i> 加载中...
          </div>
        </template>
        <template v-else-if="follow.loadPageEnd">
          <div class="scroll-bttom">
            暂无数据~
          </div>
        </template>
      </div>
      <!-- 带看 -->
      <div
        class="log-tab-scroll"
        infinite-scroll-immediate="false"
        v-infinite-scroll="load"
        v-show="activeIndex == 1"
      >
        <leftProgress v-for="item in pair.list" :key="item.id">
          <div class="item-title">{{ item.FollowTime }}</div>
          <div class="item-tips">
            <div class="item-tips-title">带看人:</div>
            <div class="item-tips-message">
              {{ item.lookPerName }}({{ item.lookPerNameDepartmentName }})
            </div>
          </div>
          <div class="item-tips">
            <div class="item-tips-title">带看时间:</div>
            <div class="item-tips-message">{{ item.AddTime | emptyRead }}</div>
          </div>
          <div class="item-tips">
            <div class="item-tips-title">带看总结:</div>
            <div class="item-tips-message">
              {{ item.Memo }}
            </div>
          </div>
        </leftProgress>
        <template v-if="pair.loading">
          <div class="scroll-bttom">
            <i class="el-icon-loading"></i> 加载中...
          </div>
        </template>
        <template v-else-if="pair.loadPageEnd">
          <div class="scroll-bttom">
            暂无数据~
          </div>
        </template>
      </div>
      <!-- 语音 -->
      <div
        class="log-tab-scroll"
        infinite-scroll-immediate="false"
        v-infinite-scroll="load"
        v-show="activeIndex == 2"
      >
        <leftProgress v-for="item in voice.list" :key="item.id">
          <div class="item-title">{{ item.FollowTime }}</div>
          <div class="item-tips">
            <div class="item-tips-message">
              {{ item.followPerName }}({{ item.followPerDepartmentName }})
            </div>
          </div>
          <div class="item-tips">
            <div class="item-tips-message">
              <ls-audio :url="item.Memo" v-if="item.Memo" />
              <span v-else>语音链接无效!</span>
            </div>
          </div>
        </leftProgress>
        <template v-if="voice.loading">
          <div class="scroll-bttom">
            <i class="el-icon-loading"></i> 加载中...
          </div>
        </template>
        <template v-else-if="voice.loadPageEnd">
          <div class="scroll-bttom">
            暂无数据~
          </div>
        </template>
      </div>
      <div
        class="log-tab-scroll"
        infinite-scroll-immediate="false"
        v-infinite-scroll="load"
        v-show="activeIndex == 3"
      >
        <div class="scroll-bttom">
          开发中...
        </div>
      </div>
      <div
        class="log-tab-scroll"
        infinite-scroll-immediate="false"
        v-infinite-scroll="load"
        v-show="activeIndex == 4"
      >
        <div class="scroll-bttom">
          开发中...
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import leftProgress from "../otherCom/leftProgress";
const LOGTAB = [
  { title: "跟进", methodsName: "getHouseFollow", storageData: "follow" },
  { title: "带看", methodsName: "getHousePairFollowList", storageData: "pair" },
  { title: "语音", methodsName: "getHouseVoice", storageData: "voice" },
  { title: "面访" },
  { title: "日志" }
];
export default {
  computed: {
    ...mapState({
      houseId: state => state.houseDateil.id,
      followUpdate: state => state.houseDateil.followUpdate
    })
  },
  watch: {
    followUpdate() {
      Object.assign(this.$data.follow, this.$options.data().follow);
      this.getHouseFollow();
    }
  },
  components: {
    leftProgress,
    lsAudio: () => import("@/components/audio")
  },
  data() {
    return {
      follow: {
        list: [],
        totalPage: 0,
        page: 1,
        loading: false,
        loadPageEnd: false
      },
      voice: {
        list: [],
        totalPage: 0,
        page: 1,
        loading: false,
        loadPageEnd: false
      },
      pair: {
        list: [],
        totalPage: 0,
        page: 1,
        loading: false,
        loadPageEnd: false
      },
      logTab: LOGTAB,
      activeIndex: 0
    };
  },
  created() {
    //this.getList();
    this.setTabIndex(0);
  },
  methods: {
    /**
     * @example: 设置当前激活的Index
     * @param {Object} item 当前对象
     * @param {Number} index  当前下标
     */
    setTabIndex(index) {
      this.activeIndex = index;

      let activeData = this[this.logTab[this.activeIndex].storageData];
      if (activeData.list.length == 0) {
        this.getList();
      }
    },
    //获取列表数据
    getList() {
      switch (this.activeIndex) {
        case 0: //跟进
          this.getHouseFollow();
          break;
        case 1: //带看
          this.getHousePairFollowList();
          break;
        case 2: //语音
          this.getHouseVoice();
          break;
      }
    },
    //获取带看列表
    getHousePairFollowList() {
      this.pair.loading = true;
      this.$api
        .get({
          url: "/agentHouse/pairFollow/getHousePairFollowList",
          data: {
            page: this.pair.page,
            limit: 7,
            houseId: this.houseId
          },
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            this.pair.list = [...this.pair.list, ...result.data.list];
            this.pair.totalPage = result.data.totalPage;
          }
        })
        .catch(() => {})
        .finally(() => {
          this.pair.loading = false;
          if (this.pair.totalPage == 1 || this.pair.list.length == 0) {
            this.pair.loadPageEnd = true;
          }
        });
    },
    //获取语音列表
    getHouseVoice() {
      this.voice.loading = true;
      this.$api
        .get({
          url: "/agentHouse/follow/getHouseFollowList",
          data: {
            page: this.voice.page,
            limit: 7,
            houseId: this.houseId,
            followType: "VOICE"
          },
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            result.data.list.forEach((item, index) => {
              if (item.Memo != null) {
                item.Memo = item.Memo.split("voice:")[1];
              }
            });
            this.voice.list = [...this.voice.list, ...result.data.list];
            this.voice.totalPage = result.data.totalPage;
          }
        })
        .catch(() => {})
        .finally(() => {
          this.voice.loading = false;
          if (this.voice.totalPage == 1 || this.voice.list.length == 0) {
            this.voice.loadPageEnd = true;
          }
        });
    },
    //获取跟进列表
    getHouseFollow() {
      this.follow.loading = true;
      this.$api
        .get({
          url: "/agentHouse/follow/getHouseFollowList",
          data: {
            page: this.follow.page,
            limit: 7,
            houseId: this.houseId,
            followType: "NORMAL"
          },
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            this.follow.list = [...this.follow.list, ...result.data.list];
            this.follow.totalPage = result.data.totalPage;
          }
        })
        .catch(() => {})
        .finally(() => {
          this.follow.loading = false;
          if (this.follow.totalPage == 1 || this.follow.list.length == 0) {
            this.follow.loadPageEnd = true;
          }
        });
    },
    /**
     * @example: 滚动到底
     */
    load() {
      let activeData = this[this.logTab[this.activeIndex].storageData];
      if (activeData.page < activeData.totalPage) {
        ++activeData.page;
        this.getList();
      } else {
        activeData.loadPageEnd = true;
      }
    }
  }
};
</script>
