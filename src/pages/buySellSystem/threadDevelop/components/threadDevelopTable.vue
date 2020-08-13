<template>
  <div class="tab-page">
    <div class="tab-page-flex">
      <el-table
        :data="renderList"
        header-cell-class-name="header-tab-cell"
        :cell-class-name="tabDirection"
        default-expand-all
        :show-header="false"
      >
        <el-table-column
          v-for="(item, index) in tableColumnField"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :sortable="item.order"
          :formatter="item.formart"
          :sort-orders="['ascending', 'descending']"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="250" fixed="right">
          <template v-slot="scope">
            <div class="table-btn-panel">
              <div class="table-btn-row">
                <el-button
                  class="anchor-point"
                  type="primary"
                  size="mini"
                  data-anchor="开发线索一键拨号 => click"
                  @click="dialNumber(scope.row)"
                  icon="el-icon-phone-outline"
                >一键拨号</el-button>
                <el-button
                  class="anchor-point"
                  type="primary"
                  data-anchor="开发线索转为在售 => click"
                  @click="houseOperate(scope.row)"
                  size="mini"
                  icon="el-icon-refresh"
                >转为在售</el-button>
              </div>
              <div>
                <el-button
                  class="anchor-point"
                  type="primary"
                  data-anchor="开发线索写跟进 => click"
                  @click="writeRecord(scope.row)"
                  size="mini"
                  icon="el-icon-edit"
                >写跟进</el-button>
                <el-button
                  class="anchor-point"
                  type="primary"
                  data-anchor="开发线索查记录 => click"
                  @click="findRecord(scope.row)"
                  size="mini"
                  icon="el-icon-time"
                >查记录</el-button>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tab-page-floot">
      <!-- 
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      -->
      <el-pagination
        @current-change="currentchange"
        @size-change="handleSizeChange"
        :page-sizes="[30, 50, 70]"
        :page-size="pageJson.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageJson.dataCount"
        :current-page="pageJson.currentPage"
      ></el-pagination>
    </div>
    <fixedPopup
      :visible.sync="alertflag"
      styleType="1"
      :customFlag="true"
      title="查记录"
      width="420px"
      class="record-dialog"
    >
      <template>
        <el-tabs v-model="recordActiveName">
          <el-tab-pane label="跟进" name="follow">
            <div class="list-content" infinite-scroll-immediate="false" v-infinite-scroll="load">
              <el-timeline>
                <el-timeline-item
                  v-for="(activity, index) in activities"
                  :key="index"
                  :icon="activity.icon"
                  :type="activity.type"
                  :color="activity.color"
                  :size="activity.size"
                  :timestamp="activity.createTime"
                  placement="top"
                >
                  <div class="record-dialog-column">
                    <span class="title">跟进人：</span>
                    <span>{{ activity.followName }}</span>
                  </div>
                  <div class="record-dialog-column">
                    <span class="title">跟进内容：</span>
                    <span>{{ activity.content }}</span>
                  </div>
                </el-timeline-item>
              </el-timeline>
              <div class="bottom-tip" v-if="follow.loading">
                <i class="el-icon-loading"></i> 加载中...
              </div>
              <div class="bottom-tip" v-else-if="follow.loadPageEnd">
                已经到最底部了~
              </div>
              <div class="bottom-tip" v-if="!follow.loading && activities.length === 0">
                暂无数据~
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="语音" name="voice">
            <div class="list-content" infinite-scroll-immediate="false" v-infinite-scroll="load">
              <el-timeline>
                <el-timeline-item
                  v-for="(activity, index) in voiceList"
                  :key="index"
                  :icon="activity.icon"
                  :type="activity.type"
                  :color="activity.color"
                  :size="activity.size"
                  :timestamp="activity.createTime"
                  placement="top"
                >
                  <div>
                    <div>
                      <span class="audio-title">{{ activity.followName }}</span>
                      <el-audio :fixed="false" :url="activity.content">
                        经纪人讲房
                      </el-audio>
                    </div>
                  </div>
                </el-timeline-item>
              </el-timeline>
              <div class="bottom-tip" v-if="voice.loading">
                <i class="el-icon-loading"></i> 加载中...
              </div>
              <div class="bottom-tip" v-else-if="voice.loadPageEnd">
                已经到最底部了~
              </div>
              <div class="bottom-tip" v-if="voiceList.length == 0">
                暂无数据
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
    </fixedPopup>
    <!-- 写跟进 -->
    <follow-up :visible.sync="followUpFlag" :rowId="rowId" v-if="followUpFlag" />
  </div>
</template>
<script>
const dom = document;
import {
  addResizeListener,
  removeResizeListener
} from "element-ui/src/utils/resize-event";
import util from "@/util/util";
import followUp from "./followUp.vue";
import elAudio from "@/components/audio";
export default {
  inject: ["form"],
  components: {
    elAudio,
    followUp
  },
  data() {
    return {
      followUpFlag: false, //跟进弹框开关
      rowId: "", // 写跟进时行id
      recordActiveName: "follow",
      activities: [],
      voiceList: [],
      follow: {
        list: [],
        totalPage: 0,
        page: 1,
        loading: true,
        loadPageEnd: false
      },
      voice: {
        list: [],
        totalPage: 0,
        page: 1,
        loading: false,
        loadPageEnd: false
      },
      alertflag: false,
      renderList: [],
      tableColumnField: [
        {
          label: "楼盘名称",
          order: false,
          width: "300",
          formart: item => {
            return (
              <div class="tab-com-item">
                <div class="tab-house-title">{item.communityName}</div>
                <div class="tab-houseno">
                  {item.area ? item.area + "平" : "暂无"}&nbsp;/&nbsp;
                  {item.face ? item.face : "暂无"}&nbsp;/&nbsp;{item.rooms || 0}
                  -{item.hall || 0}-{item.toilet || 0}-{item.balcony || 0}
                </div>
                <div class="tab-houseno">
                  {item.buildYear ? item.buildYear + "年竣工" : "暂无"}
                  &nbsp;/&nbsp;{item.buildType ? item.buildType : "暂无"}
                  &nbsp;/&nbsp;
                  {item.buildingStructure ? item.buildingStructure : "暂无"}
                </div>
              </div>
            );
          }
        },
        {
          label: "学校划片",
          order: "custom",
          formart: item => {
            return (
              <div class="tab-com-item">
                <div class="tab-house-tip">学校划片：</div>
                <div class="tab-houseno">
                  {item.primarySchool ? item.primarySchool : "暂无"}&nbsp;
                  {item.middleSchool ? item.middleSchool : "暂无"}
                </div>
              </div>
            );
          }
        },
        {
          label: "历史跟单人",
          order: "custom",
          formart: item => {
            return (
              <div class="tab-com-item">
                <div class="tab-house-tip">历史跟单人：</div>
                <div class="tab-houseno">
                  {item.lastFollwers.length > 0
                    ? item.lastFollwers.join(" ")
                    : "暂无"}
                </div>
              </div>
            );
          }
        },
        {
          label: "进开发线索说明",
          order: "custom",
          formart: item => {
            return (
              <div class="tab-com-item">
                <div class="tab-houseno">{item.saleStatusChangeTime}</div>
                <div class="tab-houseno">
                  {item.saleRemark ? item.saleRemark : "暂无"}
                </div>
              </div>
            );
          }
        },
        {
          label: "上次回访",
          order: "custom",
          formart: item => {
            return (
              <div class="tab-com-item">
                <div class="tab-house-tip">上次回访：</div>
                <div class="tab-houseno">
                  {item.lastCallTime ? item.lastCallTime : "暂无"}
                </div>
              </div>
            );
          }
        }
      ],
      pageJson: {
        total: 1,
        pageSize: 30,
        currentPage: 1,
        dataCount: 0
      }
    };
  },
  watch: {
    form: {
      deep: true,
      immediate: true,
      handler: function(value, ordvalue) {
        this.getHouseData(JSON.parse(JSON.stringify(value))).then(() => {
          dom.querySelector(".scroll-tab").scrollTop = 0;
          this.$parent.ListeningScroll();
        });
      }
    }
  },
  methods: {
    /**
     * @example: 设置Tab方向
     */
    tabDirection({ column }) {
      return column.label == "楼盘名称" ? "tab-cell-left" : "tab-cell-item";
    },
    /**
     * @example: 分页组件页面每页请求条数改变触发事件
     * @param {number} pageSize
     */
    handleSizeChange(pageSize) {
      this.pageJson.pageSize = pageSize;
      this.getHouseData(JSON.parse(JSON.stringify(this.form)), true);
    },
    /**
     * @example: 分页组件页面改变时触发
     * @param {number} pageIndex
     */
    currentchange(pageIndex) {
      this.pageJson.currentPage = pageIndex;
      this.getHouseData(JSON.parse(JSON.stringify(this.form)), false).then(
        () => {
          dom.querySelector(".scroll-tab").scrollTop = 0;
          this.$parent.ListeningScroll();
        }
      );
    },
    InitPageJson() {
      this.pageJson = {
        total: 1,
        currentPage: 1,
        pageSize: this.pageJson.pageSize,
        dataCount: 0
      };
    },
    /**
     * 获取开发线索列表
     */
    getHouseData(value, initPage = true) {
      if (initPage) this.InitPageJson();
      let restuleParms = Object.assign({}, value, {
        page: this.pageJson.currentPage,
        limit: this.pageJson.pageSize
      });
      return this.$api
        .post({
          url: "/mateHouse/getMateHouse/devClueIndex",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: restuleParms
        })
        .then(e => {
          let data = e.data;
          if (data.code == 200) {
            this.renderList = data.data.data;
            this.pageJson.total = data.data.pageSum;
            this.pageJson.dataCount = data.data.dataCount;
          }
        })
        .finally(() => {});
    },
    /**
     * 一键拨号
     */
    dialNumber(row) {
      let params = {
        roomId: row.id, // 列表id
        area: row.area, // 面积
        communityName: row.communityName, // 楼盘名称
        contactPerName: row.owner // 业主姓名
      };
      this.$api
        .post({
          url: "/noticeManage/common/OneTouchDialPhoneByRoom",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params
        })
        .then(e => {
          let data = e.data;
          if (data.code == 200) {
            this.$message({ type: "success", message: data.message });
          } else {
            this.$message.error(data.message);
          }
        })
        .finally(() => {});
    },
    /**
     * 转为在售
     */
    houseOperate(row) {
      this.toSale(
        row.communityId,
        row.buildingId,
        row.id,
        row.communityName,
        row.comBuildingName,
        row.roomNo
      );
    },
    /**
     * 写跟进
     */
    writeRecord(row) {
      this.rowId = row.id;
      this.followUpFlag = true;
    },
    /**
     * 查记录
     */
    findRecord(row) {
      this.currentRowId = row.id;
      this.recordActiveName = "follow";
      this.follow.totalPage = 0;
      this.voice.totalPage = 0;
      this.follow.page = 1;
      this.voice.page = 1;
      this.follow.loadPageEnd = false;
      this.voice.loadPageEnd = false;
      this.activities = [];
      this.voiceList = [];
      this.alertflag = true;
      this.getHouseFollow();
      this.getHouseVoiceList();
    },
    /**
     * 转在售跳转
     */
    toSale(comId, cbId, bhId, communityName, buildingName, roomNo) {
      this.$router.push({
        path: "/buySellSystem/addHouse",
        query: {
          method: "tosale",
          comId: comId,
          cbId: cbId,
          bhId: bhId,
          communityName: communityName,
          buildingName: buildingName,
          roomNo: roomNo,
          flag: "potentia",
          customerName: null,
          tel: null
        }
      });
    },
    /**
     * 查记录下拉滚动分页
     */
    load() {
      if (
        this[this.recordActiveName].page < this[this.recordActiveName].totalPage
      ) {
        ++this[this.recordActiveName].page;
        this.getList();
      } else {
        this[[this.recordActiveName]].loadPageEnd = true;
      }
    },
    /**
     * 根据不同类型获取（跟进/语音）记录数据
     */
    getList() {
      switch (this.recordActiveName) {
        case "follow":
          this.getHouseFollow();
          break;
        case "voice":
          this.getHouseVoiceList();
          break;
      }
    },
    /**
     * 获取跟进记录列表
     */
    getHouseFollow() {
      let params = {
        page: this.follow.page,
        limit: 7,
        roomId: this.currentRowId,
        followType: 1
      };
      this.follow.loading = true;
      this.$api
        .post({
          url: "/roomFollow/follows",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params
        })
        .then(e => {
          if (e.data.code === 200) {
            this.activities = [...this.activities, ...e.data.data.list];
            this.follow.totalPage = e.data.data.totalPage;
          }
        })
        .catch(() => {})
        .finally(() => {
          this.follow.loading = false;
        });
    },
    /**
     * 获取语音记录列表
     */
    getHouseVoiceList() {
      let params = {
        page: this.voice.page,
        limit: 7,
        roomId: this.currentRowId,
        followType: 2
      };
      this.voice.loading = true;
      this.$api
        .post({
          url: "/roomFollow/follows",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: Object.assign({}, params, { followType: 2 })
        })
        .then(e => {
          if (e.data.code === 200) {
            this.voiceList = [...this.voiceList, ...e.data.data.list];
            this.voice.totalPage = e.data.data.totalPage;
          }
        })
        .catch(() => {})
        .finally(() => {
          this.voice.loading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.tab-page {
  /deep/.header-tab-cell {
    height: 64px;
    font-size: @font16;
    background: rgba(240, 242, 245, 1);
    color: rgba(48, 49, 51, 1);
    font-weight: normal;
    .cell {
      justify-content: center;
      display: flex;
      align-items: center;
    }
  }
  /deep/.tab-cell-item {
    height: 64px;
    font-size: @font16;
    text-align: left;
    .cell {
      white-space: nowrap;
    }
  }
  /deep/.tab-cell-left {
    text-align: left;
    white-space: nowrap;
    // padding-left: 32px;
    padding-left: 5px;
    padding-right: 60px;
    cell {
      white-space: nowrap;
    }
  }
  .tab-page-flex {
    display: flex;
  }
  .table-btn-panel {
    display: inline-flex;
    flex-direction: column;
    padding: 0 12px;
    .table-btn-row {
      margin-bottom: 10px;
    }
    .anchor-point {
      min-width: 98px;
      text-align: left;
    }
  }
}
/deep/.el-table__body-wrapper,
/deep/.el-table__fixed-body-wrapper {
  .el-table__expanded-cell {
    padding: 0 0 10px 42px;
  }
  .el-table__expand-column {
    //   display: none;
    overflow: hidden;
  }
  tbody {
    tr:last-child {
      td {
        border-bottom: none;
      }
    }
  }
}
.tab-com-item {
  margin-top: 10px;
  .tab-house-title {
    font-size: @font18;
    font-weight: 600;
    color: black;
  }
  .tab-house-tip {
    font-size: @font16;
    color: #b1b1b1;
  }
  .tab-houseno {
    margin-top: 10px;
    font-size: @font16;
  }
}
/deep/.caret-wrapper {
  height: auto;
  .sort-caret {
    position: static;
    &:first-child {
      margin-bottom: 3px;
    }
  }
}
.tab-page-floot {
  padding-top: 16px;
  padding-bottom: 14px;
  display: flex;
  justify-content: flex-end;
}
/deep/.el-table__header-wrapper {
  position: sticky;
  top: 0;
  z-index: 10;
}
/deep/.el-table {
  overflow: visible;
}
/*********** 查记录弹窗 ***********/
.list-content {
  padding-top: 10px;
  max-height: 500px;
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
}
/deep/.record-dialog {
  .didLog-content-sroll {
    display: flex;
    .el-tabs--top {
      display: flex;
      flex-direction: column;
      width: 100%;
      .el-tabs__content {
        flex: 1;
        height: 0;
        overflow: auto;
      }
    }
  }
}
/deep/.didLog-content-body {
  .el-tab-pane {
    padding-left: 5px;
    .bottom-tip {
      padding: 0 10px 20px;
      font-size: @font14;
      color: #999;
    }
  }
  .record-dialog-column {
    display: flex;
    font-size: @font14;
    color: #999;
    .title {
      display: inline-block;
      // prettier-ignore
      width: 80PX;
    }
    span:nth-child(2) {
      flex: 1;
    }
  }
  .audio-contenr {
    // prettier-ignore
    height: 45PX;
    .audio-contenr-but {
      // prettier-ignore
      width: 22PX;
      // prettier-ignore
      height: 22PX;
      // prettier-ignore
      line-height: 22PX;
      // prettier-ignore
      font-size: 22PX;
    }
    .autio-time {
      font-size: @font16;
    }
  }
  .audio-title {
    font-size: @font14;
    color: #999;
  }
}
</style>
