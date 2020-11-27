<style lang="less" scoped>
.content {
  flex: 1;
  height: 0;
  background: #f0f7f7;
  display: flex;
  flex-direction: column;
  .head {
    background: #fff;
    // position: sticky;
    // top: 0;
    // z-index: 10;
    .head-type {
      height: 67px;
      display: flex;
      padding: 0 24px;
      border-bottom: 1px solid #f0f2f5;
      .head-type-item {
        position: relative;
        line-height: 67px;
        margin-right: 46px;
        color: #303133;
        font-size: @font18;
        cursor: pointer;
        &.active {
          color: @backgroud;
          font-weight: bold;
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
    }
    .head-underling-nva {
      display: flex;
      height: 58px;
      justify-content: space-between;
      align-items: center;
      padding: 0 24px;
      .head-nav-box {
        display: flex;
        .head-nav-item {
          height: 26px;
          padding: 0 8px;
          border-radius: 4px;
          border: 1px solid transparent;
          box-sizing: border-box;
          font-size: @font14;
          text-align: center;
          line-height: 24px;
          color: #606266;
          margin-right: 16px;
          cursor: pointer;
          &.active {
            color: @backgroud;
            background: @opacityBackground;
            border: 1px solid @backgroud;
          }
        }
      }
      .btn-add {
        height: 40px;
        padding: 0 16px;
        line-height: 40px;
        background: @backgroud;
        border: none;
        border-radius: 4px;
        color: #fff;
        outline: none;
        cursor: pointer;
      }
    }
  }
  .scroll {
    flex: 1;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .list-content {
      display: flex;
      margin-top: 24px;
      justify-content: center;
      padding-bottom: 24px;
      .list-left {
        width: 852px;
        background: #fff;
        box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
        border-radius: 8px;
        padding: 24px;
        box-sizing: border-box;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        @media screen and(min-width:1440px) and (max-width: 1920px) {
          width: calc(100vw / 1440 * 852);
        }
        @media screen and(min-width:1921px) {
          width: calc(1920px / 1440 * 852);
        }
        .list-serch {
          display: flex;
          flex-wrap: wrap;
          border-bottom: 1px solid #f0f2f5;
          .serch-item-btn {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            button {
              outline: 0;
              border: 0;
              width: 90px;
              height: 36px;
              border-radius: 4px;
              line-height: 36px;
              cursor: pointer;
            }
            .serch-reset {
              background: transparent;
              color: @backgroud;
            }
            .serch-submit {
              background: @backgroud;
              color: #fff;
              margin-left: 8px;
            }
          }
          .serch-item {
            display: flex;
            align-items: center;
            margin-right: 16px;
            margin-bottom: 16px;
            @media screen and(max-width: 1470px) {
              &:nth-child(4n -1) {
                margin-right: 0 !important;
              }
            }
            &:nth-child(5n -1) {
              margin-right: 0;
            }
            .serch-item-text {
              width: 56px;
              text-align: center;
              color: #303133;
              font-size: @font14;
              margin-right: 8px;
            }
            .serch-item-select {
              width: 193px;
              /deep/.el-input {
                .el-input__inner {
                  height: 40px;
                  line-height: 40px;
                }
              }
            }
          }
        }
        .list-flex {
          flex: 1;
          display: flex;
          flex-direction: column;
          .list-tab {
            display: table;
            width: 100%;
            // height: 100%;
            //table-layout: fixed;
            border-collapse: collapse;
            margin-top: 24px;
            .list-tab-head {
              background: #f6f6f6;
              display: table-header-group;
              .list-tab-col {
                display: table-cell;
                height: 48px;
                vertical-align: middle;
                font-size: @font16;
                color: #303133;
                &:nth-child(3) {
                  padding-right: 20px;
                }
                &:first-child {
                  padding-left: 16px;
                }
                &:last-child {
                  text-align: center;
                }
              }
            }
            .list-tab-body {
              display: table-row-group;
              .is-empty {
                display: table-row;
              }
              .tab-body-row {
                display: table-row;
                width: 100%;
                height: 96px;
                border-bottom: 1px solid #f0f2f5;
                &:hover {
                  box-shadow: 0px 7px 12px 0px rgba(0, 0, 0, 0.08);
                }
                .tab-body-cell {
                  display: table-cell;
                  vertical-align: middle;
                  &:first-child {
                    padding-left: 16px;
                  }
                  &:last-child {
                    text-align: center;
                  }
                  .clock-day {
                    line-height: 1;
                    color: #606266;
                    .clock-time-head {
                      font-size: @font16;
                    }
                    .clock-time-week {
                      font-size: @font14;
                      margin-top: 8px;
                    }
                  }
                  .clock-per {
                    display: flex;
                    line-height: 1;
                    .clock-per-img {
                      width: 40px;
                      height: 40px;
                      border-radius: 50%;
                    }
                    .clock-per-data {
                      margin-left: 16px;
                      flex-shrink: 0;
                      .per-data-head {
                        display: flex;
                        .per-name {
                          color: #606266;
                          font-size: @font16;
                          margin-right: 8px;
                        }
                        .per-type {
                          width: 56px;
                          height: 16px;
                          font-size: @font12;
                          text-align: center;
                          line-height: 14px;
                          border-radius: 2px;
                          box-sizing: border-box;
                          &0 {
                            border: 1px solid @backgroud;
                            color: @backgroud;
                          }
                          &1 {
                            border: 1px solid #c5a570;
                            color: #c5a570;
                          }
                        }
                      }
                      .per-dept {
                        color: #909399;
                        font-size: @font14;
                        margin-top: 10px;
                      }
                    }
                  }
                  .clock-result {
                    line-height: 1;
                    .clock-result-head {
                      font-size: @font16;
                      color: #606266;
                    }
                    .clock-result-type {
                      font-size: @font12;
                      margin-top: 8px;
                      &[data-type="error"] {
                        color: #ef5656;
                      }
                      &[data-type="normal"] {
                        color: #0da88b;
                      }
                      &[data-type="warning"] {
                        color: #f6a420;
                      }
                    }
                  }
                  .clock-log {
                    font-size: @font16;
                    color: #606266;
                  }
                  .clock-read {
                    width: 80px;
                    height: 26px;
                    text-align: center;
                    line-height: 26px;
                    border-radius: 4px;
                    font-size: @font14;
                    display: inline-block;
                    &[data-type="error"] {
                      color: #ef5656;
                      background: rgba(239, 86, 86, 0.1);
                    }
                    &[data-type="info"] {
                      color: #909399;
                      background: rgba(144, 147, 153, 0.1);
                    }
                    &[data-type="normal"] {
                      color: #0da88b;
                      background: rgba(13, 168, 139, 0.1);
                    }
                    &[data-type="warning"] {
                      color: #f6a420;
                      background: rgba(246, 164, 32, 0.1);
                    }
                  }
                }
              }
            }
          }
          .is-empty {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 237px;
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
        .list-foot {
          margin-top: 24px;
        }
      }
      .list-right {
        width: 292px;
        margin-left: 24px;

        .posi-sticky {
          position: sticky;
          top: 24px;
          .calendar-dots {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            &.is-hide {
              visibility: hidden;
            }
          }
          .calendar-foot {
            display: flex;
            height: 55px;
            align-items: center;
            padding-left: 16px;
            .calendar-foot-item {
              display: flex;
              font-size: @font14;
              align-items: center;
              margin-right: 22px;
              color: #606266;
              &:last-child {
                margin-right: 0;
              }
              &:nth-child(1) {
                &::before {
                  background: #0da88b;
                }
              }
              &:nth-child(2) {
                &::before {
                  background: #f6a420;
                }
              }
              &:nth-child(3) {
                &::before {
                  background: #ef5656;
                }
              }
              &::before {
                content: "";
                width: 8px;
                height: 8px;
                border-radius: 50%;
                margin-right: 8px;
              }
            }
          }
          .collapse-box {
            background: #ffffff;
            box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
            border-radius: 8px;
            .collapse-box-head {
              height: 60px;
              padding-left: 24px;
              color: #303133;
              font-size: @font18;
              line-height: 60px;
              font-weight: bold;
            }
            .collapse-box-scroll {
              height: 277px;
              .scrollbar {
                height: 100%;
                position: relative;
                /deep/.el-scrollbar__wrap {
                  overflow-x: hidden;
                }
                /deep/.is-horizontal {
                  display: none;
                }
                .scrollbar-warp {
                  display: flex;
                  flex-wrap: wrap;
                  padding: 0 24px;
                  margin: 0 -8px;
                  .is-empty {
                    position: absolute;
                    top: 60px;
                    left: 50%;
                    text-align: center;
                    transform: translateX(-50%);
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
                  .scrollbar-item {
                    flex: 0 0 calc((100% - 32px) / 2);
                    margin: 0 8px 16px;
                    height: 71px;
                    background: #f8f8f9;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    cursor: pointer;
                    &.active {
                      background: @opacityBackground;
                      border: 1px solid @backgroud;
                      box-sizing: border-box;
                    }
                    .posi-tips {
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 52px;
                      height: 15px;
                      font-size: @font12;
                      text-align: center;
                      line-height: 15px;
                      color: #fff;
                      background-image: url(https://img.0be.cn/pc/bp1.png);
                      background-size: 100% 100%;
                      background-repeat: no-repeat;
                    }
                    img {
                      width: 34px;
                      height: 34px;
                      border-radius: 50%;
                      margin-right: 9px;
                    }
                    .item-right {
                      line-height: 1;
                      .item-title {
                        font-size: @font14;
                        color: #303133;
                        font-weight: bold;
                      }
                      .item-dept {
                        margin-top: 8px;
                        color: #606266;
                        font-size: @font12;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
.options-item {
  .el-select-dropdown__item {
    height: 48px;
    line-height: 48px;
    font-size: @font16;
  }
  .el-select-dropdown__wrap {
    // prettier-ignore
    max-height: 274PX;
  }
  .el-select-dropdown__item {
    display: flex;
    // prettier-ignore
    height: 40PX;
    // prettier-ignore
    line-height: 40PX;
    /deep/span {
      font-size: @font14;
    }
  }
  /deep/.popper__arrow {
    // prettier-ignore
    top: -6PX ;
  }
}
</style>
<template>
  <div class="content">
    <div class="head">
      <div class="head-type">
        <div
          class="head-type-item"
          v-for="(item, index) in navs"
          :key="index"
          :class="{ active: currentNavIndex == index }"
          @click="navigateToOhter(item.path)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="head-underling-nva">
        <div class="head-nav-box">
          <div
            class="head-nav-item"
            v-for="(item, index) in subNavs"
            :key="index"
            :class="{ active: currentSubNavIndex == index }"
            @click="navigateToOhter(item.path, index)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="scroll">
      <div class="list-content">
        <div class="list-left">
          <div class="list-serch">
            <div class="serch-item">
              <div class="serch-item-text">员工信息</div>
              <el-select
                class="serch-item-select"
                v-model="refresh.personAccountPer"
                placeholder="请选择"
                filterable
                remote
                value-key="accountId"
                :remote-method="getPerList"
                popper-class="options-item"
                clearable
              >
                <el-option
                  :value="item"
                  :label="item.perName"
                  v-for="item in refresh.perList"
                  :key="item.accountId"
                ></el-option>
              </el-select>
            </div>
            <div class="serch-item">
              <div class="serch-item-text">考勤状态</div>
              <!--   @change="setChangeList" -->
              <el-select
                class="serch-item-select"
                popper-class="options-item"
                v-model="refresh.attendanceStatus"
                placeholder="请选择"
              >
                <el-option value="" label="全部"></el-option>
                <el-option value="0" label="正常考勤"></el-option>
                <el-option value="1" label="迟到"></el-option>
                <el-option value="2" label="早退"></el-option>
                <el-option value="3" label="旷工"></el-option>
                <el-option value="4" label="请假"></el-option>
              </el-select>
            </div>
            <div class="serch-item">
              <div class="serch-item-text">日志提交</div>
              <!--  @change="setChangeList" -->
              <el-select
                class="serch-item-select"
                v-model="refresh.summaryAddStatus"
                placeholder="请选择"
                popper-class="options-item"
              >
                <el-option value="" label="全部"></el-option>
                <el-option value="0" label="已提交"></el-option>
                <el-option value="-1" label="未提交"></el-option>
                <el-option value="-2" label="无需提交"></el-option>
              </el-select>
            </div>
            <div class="serch-item">
              <div class="serch-item-text">批阅情况</div>
              <!--   @change="setChangeList" -->
              <el-select
                class="serch-item-select"
                v-model="refresh.summaryCheckStatus"
                placeholder="请选择"
                popper-class="options-item"
              >
                <el-option value="" label="全部"></el-option>
                <el-option value="0" label="待批阅"></el-option>
                <el-option value="1" label="已批阅"></el-option>
                <el-option value="-1" label="未批阅"></el-option>
                <el-option value="-2" label="无需批阅"></el-option>
              </el-select>
            </div>
            <div class="serch-item-btn">
              <button class="serch-reset" @click="refreshData">重置</button>
              <button class="serch-submit" @click="setChangeList">搜索</button>
            </div>
          </div>
          <div class="list-flex">
            <div class="list-tab">
              <div class="list-tab-head">
                <div class="list-tab-col">考勤日期</div>
                <div class="list-tab-col">考勤人</div>
                <div class="list-tab-col">上午考勤</div>
                <div class="list-tab-col">下午考勤</div>
                <div class="list-tab-col">日志</div>
                <div class="list-tab-col">日志批阅</div>
              </div>

              <div class="list-tab-body">
                <div
                  class="tab-body-row"
                  v-for="(item, index) in refresh.renderList"
                  :key="index"
                  @click="gotoDetail(item)"
                >
                  <div class="tab-body-cell">
                    <div class="clock-day">
                      <div class="clock-time-head">
                        {{ item.attendanceDate }}
                      </div>
                      <div class="clock-time-week">{{ item.week }}</div>
                    </div>
                  </div>
                  <div class="tab-body-cell">
                    <div class="clock-per">
                      <img
                        class="clock-per-img"
                        :src="item.personImageUrl"
                        alt=""
                      />
                      <div class="clock-per-data">
                        <div class="per-data-head">
                          <div class="per-name">{{ item.personName }}</div>
                          <div
                            class="per-type"
                            :class="'per-type' + item.attendanceType"
                          >
                            {{ item.attendanceText }}
                          </div>
                        </div>
                        <div class="per-dept">{{ item.departmentName }}</div>
                      </div>
                    </div>
                  </div>
                  <!-- 上午考勤 -->
                  <div class="tab-body-cell">
                    <div class="clock-result">
                      <div class="clock-result-head">
                        {{ item.morningAttendanceInfo || "暂无记录" }}
                      </div>
                      <div
                        class="clock-result-type"
                        :data-type="item.morningCheckInTypeOn"
                      >
                        {{ item.morningOnDutyResult | getText }}
                      </div>
                      <div
                        class="clock-result-type"
                        :data-type="item.morningCheckInTypeOff"
                      >
                        {{ item.morningOffDutyResult | getText }}
                      </div>
                    </div>
                  </div>
                  <!-- 下午考勤 -->
                  <div class="tab-body-cell">
                    <div class="clock-result">
                      <div class="clock-result-head">
                        {{ item.afternoonAttendanceInfo || "暂无记录" }}
                      </div>
                      <div
                        class="clock-result-type"
                        :data-type="item.afternoonCheckInTypeOn"
                      >
                        {{ item.afternoonOnDutyResult | getText }}
                      </div>
                      <div
                        class="clock-result-type"
                        :data-type="item.afternoonCheckInTypeOff"
                      >
                        {{ item.afternoonOffDutyResult | getText }}
                      </div>
                    </div>
                  </div>
                  <div class="tab-body-cell">
                    <div class="clock-log">
                      {{ item.summaryAddStatus }}
                    </div>
                  </div>
                  <div class="tab-body-cell">
                    <div
                      class="clock-read"
                      :data-type="item.summaryCheckStatusType"
                    >
                      {{ item.summaryCheckStatus }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="is-empty"
              v-if="refresh.renderList.length == 0 && !loading"
            >
              <img
                src="https://sysimgs.oss-cn-shenzhen.aliyuncs.com/Background/kong.png"
                alt=""
              />
              <div>暂无数据</div>
            </div>
            <div v-if="loading" class="is-empty">
              <div class="el-icon-loading"></div>
              <div>加载中...</div>
            </div>
          </div>
          <div class="list-foot">
            <!--  :page-sizes="[100, 200, 300, 400]"  sizes-->
            <el-pagination
              :current-page.sync="refresh.page.currentPage"
              :page-size="refresh.page.pagesize"
              layout="total,prev, pager, next, jumper"
              :total="refresh.page.total"
              @current-change="paginationChange"
            >
            </el-pagination>
          </div>
        </div>
        <div class="list-right">
          <div class="posi-sticky">
            <ls-collapse v-model="activeCollapse">
              <ls-collapse-item
                sign="calendar1"
                :title="`我的管理(${mySlave.count})`"
              >
                <template>
                  <div class="collapse-box">
                    <div class="collapse-box-head">
                      <div>我的管理({{ mySlave.count }})</div>
                    </div>
                    <div class="collapse-box-scroll">
                      <el-scrollbar class="scrollbar">
                        <div
                          class="scrollbar-warp"
                          v-infinite-scroll="getMySlaveList"
                          infinite-scroll-immediate
                        >
                          <div
                            class="scrollbar-item"
                            v-for="item in mySlave.list"
                            :key="item.accountId"
                            :class="{
                              active:
                                refresh.personAccountPer.accountId ==
                                item.accountId
                            }"
                            @click="setSlaveName(item)"
                          >
                            <div class="posi-tips" v-if="item.freeInfo">
                              {{ item.freeInfo }}
                            </div>
                            <img :src="item.headImgUrl" alt="" />
                            <div class="item-right">
                              <div class="item-title">{{ item.perName }}</div>
                              <div class="item-dept">{{ item.deptName }}</div>
                            </div>
                          </div>
                          <div class="is-empty" v-if="mySlave.list.length == 0">
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
              </ls-collapse-item>
              <ls-collapse-item
                sign="calendar2"
                :title="`我的关注(${myInterest.count})`"
              >
                <template>
                  <div class="collapse-box">
                    <div class="collapse-box-head">
                      <div>我的关注({{ myInterest.count }})</div>
                    </div>
                    <div class="collapse-box-scroll">
                      <el-scrollbar class="scrollbar">
                        <div
                          class="scrollbar-warp"
                          v-infinite-scroll="getMyInterestList"
                          infinite-scroll-immediate
                        >
                          <div
                            class="scrollbar-item"
                            v-for="item in myInterest.list"
                            :key="item.accountId"
                            :class="{
                              active:
                                refresh.personAccountPer.accountId ==
                                item.accountId
                            }"
                            @click="setInterestName(item)"
                          >
                            <div class="posi-tips" v-if="item.freeInfo">
                              {{ item.freeInfo }}
                            </div>
                            <img :src="item.headImgUrl" alt="" />
                            <div class="item-right">
                              <div class="item-title">{{ item.perName }}</div>
                              <div class="item-dept">{{ item.deptName }}</div>
                            </div>
                          </div>
                          <div
                            class="is-empty"
                            v-if="myInterest.list.length == 0"
                          >
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
              </ls-collapse-item>
              <ls-collapse-item sign="calendar" :title="collapseTile">
                <!-- 
                      :is-empty="false"
                   -->
                <ls-calendar
                  choice="multiple"
                  @change="setChangeList"
                  @headChange="headChange"
                  v-model="refresh.calendarTiem"
                >
                  <!-- <template v-slot:dots="{ col }">
                    <div
                      class="calendar-dots"
                      :class="{ 'is-hide': refresh.calendarTiem == col.time }"
                      :style="{ 'background-color': color[col.type] }"
                    ></div>
                  </template>
                  <template v-slot:foot>
                    <div class="calendar-foot">
                      <div class="calendar-foot-item">考勤正常</div>
                      <div class="calendar-foot-item">考勤异常</div>
                      <div class="calendar-foot-item">无考勤</div>
                    </div>
                  </template> -->
                </ls-calendar>
              </ls-collapse-item>
            </ls-collapse>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lsCalendar from "@/pages/info/components/calendar";
import lsCollapse from "@/pages/info/components/collapse";
import lsCollapseItem from "@/pages/info/components/collapseItem";
import clockRuleHead from "@/pages/info/mixins/clockRuleHead.js";
import util from "@/util/util";

function textColor(type) {
  switch (type) {
    case 0:
      return "normal";
    case 1: //迟到
    case 2: //早退
    case 4: //请假
    case 5: //迟到请假
      return "warning";
    case 3: //旷工
      return "error";
    default:
      return "warning";
  }
}

const Week = ["日", "一", "二", "三", "四", "五", "六"];
function getDay(time) {
  return "星期" + Week[new Date(time).getDay()];
}

function getSummaryCheckStatusType(text) {
  switch (text) {
    case "已批阅":
      return "normal";
    case "未批阅":
      return "error";
    case "待批阅":
      return "warning";
    case "无需批阅":
      return "info";
    default:
      return "info";
  }
}
export default {
  mixins: [clockRuleHead],
  inject: ["loginDataRemoteMixin"],
  components: {
    lsCalendar,
    lsCollapse,
    lsCollapseItem
  },
  computed: {
    collapseTile() {
      return util.format(new Date(), "yyyy年MM月dd日");
    }
  },
  data() {
    return {
      activeCollapse: "calendar1",
      color: ["#0DA88B", "#F6A420", "#EF5656"],
      currentNavIndex: 0,
      currentSubNavIndex: 3,
      subNavs: [
        {
          name: "我的日志",
          path: "/clockList/log",
          rUrl: "myWorkSummary"
        },
        {
          name: "考勤统计",
          path: "/clockList/statistic",
          rUrl: "statistics"
        },
        {
          name: "考勤审批",
          path: "/clockList/examine",
          rUrl: "audit"
        },
        {
          name: "日志管理",
          path: "/clockList/myInfo",
          rUrl: "workSummary"
        }
      ],
      subSecondNavs: [
        {
          name: "考勤规则管理",
          path: "/clockRule/list",
          rUrl: "rule"
        },
        {
          name: "名言警句配置",
          path: "/clockRule/quotes",
          rUrl: "famous"
        }
      ],
      refresh: {
        page: {
          currentPage: 1,
          total: 1,
          pagesize: 20
        },
        perList: [], //人员列表
        personAccountPer: {
          perName: "",
          accountId: ""
        }, //员工姓名personAccount
        summaryAddStatus: "", //日志提交
        summaryCheckStatus: "", //日志批阅
        attendanceStatus: "", //考勤状态
        calendarTiem: [], //util.format(new Date(), "yyyy-MM-dd"), //日历时间
        renderList: [] //渲染结果数组
      },
      mySlave: {
        //我的管理
        list: [],
        limit: 10,
        totalPage: 1,
        count: 0,
        currentPage: 1
      },
      myInterest: {
        //我的关注
        list: [],
        limit: 10,
        totalPage: 1,
        count: 0,
        currentPage: 1
      },
      loading: true
    };
  },
  created() {
    this.getLoginPer();
    this.getList();
    this.getMySlaveList();
    this.getMyInterestList();
  },
  filters: {
    getText(value) {
      if (value == null || value === "") return "暂无";
      const text = ["正常", "迟到", "早退", "旷工", "请假", "迟到早退"];
      return text[value];
    }
  },
  methods: {
    /**
     * @example: 获取当前登录人的名称
     */

    getLoginPer() {
      this.refresh.personAccountPer = {
        perName: this.loginDataRemoteMixin.data.userName,
        accountId: this.loginDataRemoteMixin.data.accountId
      };
      this.refresh.perList = [
        {
          accountId: this.loginDataRemoteMixin.data.accountId,
          perName: this.loginDataRemoteMixin.data.userName
        }
      ];
    },
    paginationChange() {
      document.querySelector(".scroll").scrollTop = 0;
      this.getList();
    },
    /**
     * @example: 前往日志详情
     */

    gotoDetail(item) {
      this.$router.push({ path: "/logDetail", query: { id: item.summaryId } });
    },
    /**
     * @example:我的管理点击查询
     */

    setInterestName(item) {
      this.refresh.personAccountPer = item;
      this.refresh.perList = [item];
      this.setChangeList();
    },
    /**
     * @example: 获取我的管理列表
     */

    getMyInterestList() {
      if (
        this.myInterest.list.length == 0 ||
        this.myInterest.currentPage <= this.myInterest.totalPage
      ) {
        this.$api
          .post({
            url: "/attendance/attendanceWorkSummary/listMyInterest",
            data: {
              limit: this.myInterest.limit,
              pageNum: this.myInterest.currentPage
            },
            qs: true
          })
          .then(({ data }) => {
            this.myInterest.list = [...this.myInterest.list, ...data.data.list];
            this.myInterest.count = data.data.totalCount;
            this.myInterest.totalPage = data.data.totalPage;
            this.myInterest.currentPage++;
          });
      }
    },
    /**
     * @example:我的管理点击查询
     */

    setSlaveName(item) {
      this.refresh.personAccountPer = item;
      this.refresh.perList = [item];
      this.setChangeList();
    },
    /**
     * @example: 获取我的管理列表
     */

    getMySlaveList() {
      if (
        this.mySlave.list.length == 0 ||
        this.mySlave.currentPage <= this.mySlave.totalPage
      ) {
        this.$api
          .post({
            url: "/attendance/attendanceWorkSummary/mySlaveList",
            data: {
              limit: this.mySlave.limit,
              pageNum: this.mySlave.currentPage
            },
            qs: true
          })
          .then(({ data }) => {
            this.mySlave.list = [...this.mySlave.list, ...data.data.list];
            this.mySlave.count = data.data.totalCount;
            this.mySlave.totalPage = data.data.totalPage;
            this.mySlave.currentPage++;
          });
      }
    },
    /**
     * @example: 重置
     */

    refreshData() {
      Object.assign(this.$data.refresh, this.$options.data.call(this).refresh);
      this.getLoginPer();
      this.getList();
    },
    /**
     * @example: 查询人员
     */
    getPerList(name) {
      this.$api
        .post({
          url: "/attendance/attendanceWorkSummary/attendanceSummaryPersons",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            limit: 20,
            keyWord: name
          }
        })
        .then(({ data }) => {
          if (data.data.list && data.data.list.length > 0) {
            this.refresh.perList = data.data.list;
          } else {
            this.refresh.perList = [];
          }
        });
    },
    /**
     * @example: 日志按钮点击事件
     */

    headChange(time) {
      this.refresh.calendarTiem = [];
      this.setChangeList();
    },
    setChangeList() {
      Object.assign(this.$data.refresh.page, this.$options.data().refresh.page);
      this.refresh.renderList = [];
      this.getList();
    },
    getList() {
      const refresh = this.refresh;
      this.loading = true;
      let data = {
        limit: refresh.page.pagesize,
        attendanceDates: this.refresh.calendarTiem,
        page: refresh.page.currentPage,
        addStatus: refresh.summaryAddStatus,
        checkStatus: refresh.summaryCheckStatus,
        attendanceStatus: refresh.attendanceStatus
      };
      if (this.refresh.personAccountPer != "") {
        data.personIds = [this.refresh.personAccountPer.accountId];
      }

      this.$api
        .post({
          url: "/attendance/attendanceWorkSummary/listMySummary",
          data,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(({ data }) => {
          refresh.renderList = data.data.list.map((v, i) => {
            let morningCheckInTypeOff = textColor(v.morningOffDutyResult); //早上颜色状态
            let morningCheckInTypeOn = textColor(v.morningOnDutyResult); //早上颜色状态
            let afternoonCheckInTypeOff = textColor(v.afternoonOffDutyResult); //下午颜色状态
            let afternoonCheckInTypeOn = textColor(v.afternoonOnDutyResult); //下午颜色状态
            let week = getDay(v.attendanceDate);
            let attendanceText = v.attendanceType ? "无需考勤" : "正常考勤";
            let summaryCheckStatusType = getSummaryCheckStatusType(
              v.summaryCheckStatus
            );
            return {
              ...v,
              ...{
                morningCheckInTypeOff,
                morningCheckInTypeOn,
                afternoonCheckInTypeOff,
                afternoonCheckInTypeOn,
                week,
                attendanceText,
                summaryCheckStatusType
              }
            };
          });
          refresh.page.total = data.data.totalCount;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
