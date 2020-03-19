<style lang="less" scoped>
.operation-content {
  padding: 0 20px;
  /deep/.el-tabs__content {
    padding: 0;
  }
  /deep/.el-tabs__item {
    height: 48px;
    line-height: 48px;
    font-size: 18px;
    &.is-active {
      color: black;
    }
  }
  .list-content {
    padding: 15px;
    max-height: 800px;
    overflow-x: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    &::-webkit-scrollbar-button,
    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-track-piece {
      display: none;
    }
    &::-webkit-scrollbar-thumb {
      background: #c9c9c9;
      border-radius: 50px;
    }
    .list-content-item {
      padding-left: 40px;
      position: relative;
      //   &:last-child {
      //     .pad-line {
      //       display: none;
      //     }
      //   }
      &:after {
        content: "";
        height: 100%;
        width: 12px;
        height: 12px;
        position: absolute;
        top: 0;
        left: 0;
        background: #3d6cde;
        z-index: 1;
        border-radius: 50%;
      }
      &::before {
        content: "";
        background: #edf3ff;
        width: 2px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 5px;
      }
    }
  }
}

.content-item-head {
  display: flex;
  justify-content: space-between;
  .content-item-time {
    font-size: 20px;
    color: black;
  }
  .content-item-but {
    width: 105px;
    height: 37px;
    line-height: 37px;
    text-align: center;
    color: #969696;
    font-size: 17px;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    position: relative;
    border: none;
    outline: none;
    overflow: hidden;
    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
      background-image: radial-gradient(circle, black 10%, transparent 10%);
      transform: scale(10, 10);
      opacity: 0;
      transition: transform 0.3s, opacity 0.5s;
    }
    &:active:after {
      transform: scale(0, 0);
      opacity: 0.3;
      transition: 0s;
    }
  }
}
.content-item-body {
  .item-body-text {
    margin-top: 8px;
    font-size: 18px;
    color: #b5b5b5;
    word-wrap: break-word;
    line-height: 30px;
    padding-bottom: 25px;
  }
  .pad-line {
    padding-top: 25px;
    height: 1px;
    background: #d5d5d5;
    background-clip: content-box;
    padding-bottom: 25px;
  }
}
.fixed {
  transform: translate(0, 0);
  margin-bottom: 10px;
  /deep/.didLog-content {
    position: static;
    .didLog-content-mask {
      display: none;
    }
    .didLog-content-body {
      position: static;
      transform: translate(0, 0);
      background: #fff;
      padding: 0;
      .didLog-content-box {
        padding: 0;
        .didLog-content-box-title {
          display: none;
        }
        .raido-group {
          margin-top: 0;
        }
      }
      .pop-but {
        text-align: right;
        > .el-button {
          width: 105px;
          height: 37px;
          background: #0d824b;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
          span {
            color: #fff;
            font-size: 17px;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="operation-content">
    <el-tabs type="border-card"
             @tab-click="changeTabsEvent"
             v-model="changeTabsValue">
      <el-tab-pane label="跟进记录"
                   name="follow">
        <div class="list-content"
             infinite-scroll-immediate="false"
             v-infinite-scroll="load">
          <div class="fixed">
            <followUp :visible.sync="followUpFlag"
                      v-if="followUpFlag"
                      width="100%"
                      title=""></followUp>
          </div>
          <transition-group name="el">
            <template v-for="item in follow.list">
              <div :key="item.id">
                <div class="list-content-item"
                     v-if="!item.isTellFollow">
                  <div class="content-item-head ">
                    <div class="content-item-time">2020-02-14&nbsp;&nbsp;&nbsp;&nbsp;11:04:21</div>
                    <button class="content-item-but">删除</button>
                  </div>
                  <div class="content-item-body">
                    <div class="item-body-text">{{item.followPerName | emptyRead}}({{item.followPerDepartmentName | emptyRead}}),{{item.Memo}}</div>
                  </div>
                </div>
                <div class="list-content-item"
                     v-if="item.isTellFollow">
                  <div class="content-item-head ">
                    <div class="content-item-time">2020-02-15&nbsp;&nbsp;&nbsp;&nbsp;11:04:21</div>
                    <button class="content-item-but">删除</button>
                  </div>
                  <div class="content-item-body">
                    <playAudio :url="item.Memo"></playAudio>
                    <div class="pad-line"></div>
                  </div>
                </div>
              </div>
            </template>
          </transition-group>
          <template v-if="follow.loading">
            <i class="el-icon-loading"></i> 加载中...
          </template>
          <template v-if="follow.loadPageEnd">
            暂无数据~
          </template>
        </div>
      </el-tab-pane>
      <el-tab-pane label="被看详情"
                   name="1"></el-tab-pane>
      <el-tab-pane label="电话修改记录"
                   name="2"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
//写跟进弹出层 
import followUp from '../didLog/followUp';
import playAudio from '@/components/audio';
import but from "@/evenBus/but.js";
export default {
  inject: ["houseId"],
  components: {
    playAudio,
    followUp
  },
  data () {
    return {
      follow: {
        list: [],
        totalPage: 0,
        page: 1,
        loading: false,
        loadPageEnd: false
      },
      followUpFlag: true,
      changeTabsValue: 'follow'
    }
  },
  created () {
    this.getList();
    but.$on('followReolad', () => {
      Object.assign(this.$data.follow, this.$options.data().follow);
      this.getHouseFollow();
    })
  },
  destroyed () {
    but.$off('followReolad');
  },
  methods: {
    changeTabsEvent (e) {
      if (this[this.changeTabsValue].list.length > 0) {
        return;
      }
      this.getList();
    },
    getList () {
      switch (this.changeTabsValue) {
        case "follow":
          this.getHouseFollow();
          break;
      }
    },
    getHouseFollow () {
      let that = this;
      let params = {
        page: that.follow.page,
        limit: 6,
        houseId: that.houseId.id
      };
      this.follow.loading = true;
      this.$api
        .get({
          url: "/agentHouse/follow/getHouseFollowList",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            result.data.list.forEach(item => {
              if (item.FollowType.includes("电话")) {
                item.Memo = item.Memo.replace("voice:", "");
                item.isTellFollow = true;
              } else {
                item.isTellFollow = false;
              }
            });
            that.follow.list = [...that.follow.list, ...result.data.list];
            that.follow.totalPage = result.data.totalPage;
          }
        })
        .catch(() => {

        }).finally(() => {
          this.follow.loading = false;
        });
    },
    load () {
      if (this[this.changeTabsValue].page < this[this.changeTabsValue].totalPage) {
        ++this[this.changeTabsValue].page;
        this.getList();
      } else {
        this.follow.loadPageEnd = true;
      }
    }
  },
}
</script>
