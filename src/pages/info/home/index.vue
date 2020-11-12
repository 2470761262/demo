<style lang="less" scoped>
@font-face {
  font-family: "lsx";
  src: url(~@/assets/DIN-Bold.otf);
}
@font-face {
  font-family: "rank";
  src: url(~@/assets/DIN-BlackItalic.otf);
}
.back {
  background: #f0f7f7;
  flex: 1;
  .content {
    padding: 24px 24px 53px;

    width: 1168px;
    margin: 0 auto;
    display: flex;
    .main {
      flex: 1;
      .main-head {
        color: #303133;
        line-height: 1;
        .head-title {
          font-size: @font24;
          font-weight: bold;
        }
        .head-titps {
          font-size: @font18;

          margin-top: 16px;
        }
      }
      .icon-row {
        display: flex;

        margin: 24px -8px 0;
        .row-item {
          .shadow-box;

          flex: 0 0 calc((100% - 64px) / 4);

          margin: 0 8px;

          height: 110px;
          background: #fff;
          display: flex;
          align-items: center;
          .row-item-icon {
            width: 82px;
            text-align: center;
          }
          .row-item-data {
            line-height: 1;
            .row-data-title {
              color: #909399;
              font-size: @font14;

              margin-bottom: 16px;
            }
            .row-data-value {
              display: flex;
              align-items: baseline;
              .value-after {
                font-size: @font16;
                font-weight: bold;

                margin-right: 4px;
              }
              .value-data {
                font-family: lsx;
                font-size: @font24;
                color: #303133;
                font-weight: bold;
              }
            }
          }
        }
      }
      .resource {
        .shadow-box;

        padding: 24px;

        margin-top: 24px;
        .head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          line-height: 1;

          margin-bottom: 24px;
          .head-title {
            color: #303133;
            font-weight: bold;
            font-size: @font18;
          }
          .head-more {
            color: @backgroud;
            cursor: pointer;
            font-size: @font14;
            &::after {
              content: "\e62d";
              font-family: iconfont;
              font-size: @font14;
            }
          }
        }
        .layout-content {
          display: flex;
          flex-wrap: wrap;

          margin: 0 -8px;
          .layout-item {
            flex: 0 0 calc((100% - 48px) / 3);

            margin: 0 8px;

            height: 98px;
            background: #f7f7f9;

            border-radius: 4px;
            box-sizing: border-box;
            line-height: 1;
            &:nth-child(-n + 3) {
              margin-bottom: 16px;
            }
            .item-title {
              padding-top: 22px;

              text-indent: 22px;
              font-size: @font14;
              color: #606266;

              margin-bottom: 16px;
            }
            .item-data {
              font-size: 32px;
              font-family: lsx;
              font-weight: bold;
              color: #303133;
              text-align: center;
            }
          }
        }
      }
      .visual {
        display: flex;

        margin-top: 24px;
        .rank-item {
          .shadow-box;
          flex: 1;

          margin-right: 16px;
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
            padding: 0 24px;

            height: 254px;
            position: relative;
            //
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

              //margin-top: 17PX;

              //padding-bottom: 19PX;
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
              .scrollbar> .data-item;
            }
            .scrollbar {
              height: 100%;
              /deep/.el-scrollbar__wrap {
                overflow-x: hidden;
              }
              .scroll-pad {
                padding: 0 24px;
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
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
    .right {
      width: 292px;

      margin-left: 24px;

      // @media screen and(min-width:1280PX) {
      //     width:calc(100vw / 1440 * 292);
      // }
      .sticky {
        top: 20px;
        position: sticky;
        .clock-in {
          .shadow-box;
          position: relative;

          height: 518px;
          overflow: hidden;
          line-height: 1;
          &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;

            height: 225px;
            width: 100%;
            background: linear-gradient(
              180deg,
              rgba(53, 183, 170, 0.17) 0%,
              rgba(24, 129, 113, 0) 100%
            );
          }
          .clock-posi {
            position: relative;
            .clock-qr {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: 10;
              background: rgba(255, 255, 255, 0.8);

              border-radius: 8px 8px 0 0;

              backdrop-filter: blur(2px);
              display: flex;
              flex-direction: column;
              align-items: center;

              padding-top: 58px;
              box-sizing: border-box;
              .clock-qr-image {
                width: 184px;

                height: 184px;
              }
              .clock-qr-tips {
                font-size: @font18;
                color: #303133;
                font-weight: bold;

                margin-top: 25px;
              }
            }
            .change-clock {
              padding-top: 4px;

              height: 26px;

              padding-right: 6px;
              display: flex;
              justify-content: flex-end;
              position: relative;
              z-index: 1;
              .qr-tips {
                height: 26px;
                background: #ffffff;
                box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.1);

                width: 125px;

                margin-right: 8px;
                text-align: center;

                line-height: 26px;
                position: relative;
                font-size: @font12;
                color: #303133;
                &::after {
                  content: "";
                  position: absolute;
                  border: 4px solid transparent;
                  border-left-color: #fff;
                  right: 0;
                  top: 50%;
                  transform: translate(100%, -50%);
                }
              }
              .qr-change {
                width: 26px;
                height: 100%;
                //background: red;
                cursor: pointer;
              }
            }
            .per-data {
              position: relative;
              z-index: 1;

              margin-top: 6px;
              text-align: center;
              img {
                border-radius: 50%;

                width: 96px;

                height: 96px;
              }
              h3 {
                color: #303133;

                font-size: 28px;

                margin-top: 18px;
              }
              h4 {
                color: #606266;
                font-size: @font16;

                margin-top: 16px;
                font-weight: normal;
              }
            }
            .clock-pad {
              padding: 0 24px;

              margin-top: 24px;
              .navto-color {
                background: #f8f8f9;

                border-radius: 4px;

                padding: 12px;
                .summary-tips {
                  line-height: 24px;

                  font-size: 14px;
                  color: #909399;
                }
                button {
                  margin-top: 16px;
                  outline: none;
                  background: @backgroud;
                  color: #fff;

                  height: 36px;
                  background: #247257;

                  border-radius: 4px;
                  border: 0;
                  width: 100%;
                  cursor: pointer;
                }
              }
              .split-line {
                margin-top: 24px;
                height: 1px;
                background: #f0f2f5;
              }
            }
          }
          .help-title {
            color: #303133;
            font-size: @font18;

            margin: 24px 0 18px;

            padding-left: 24px;
          }
          .help-btn-group {
            display: flex;
            .help-btn-item {
              flex: 1;
              text-align: center;
              font-size: 0;
              .click-area {
                display: inline-block;
                cursor: pointer;
                div {
                  margin-top: 9px;
                  font-size: @font14;
                  color: #303133;
                }
              }
            }
          }
        }
        .partner {
          margin-top: 24px;

          height: 80px;
          background: #008778;

          box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);

          border-radius: 8px;

          padding: 6px;
          line-height: 1;
          box-sizing: border-box;
          .partner-inner {
            border-radius: 4px;
            border: 1px solid #c5a570;
            display: flex;
            height: 100%;
            align-items: center;
            box-sizing: border-box;

            padding: 0 12px 0 16px;
            .inner-middle {
              flex: 1;

              margin-left: 8px;
              h4 {
                font-size: @font18;
                color: #fff;
                font-weight: bold;
              }
              h5 {
                font-size: @font14;
                color: #fff;

                margin-top: 8px;
                font-weight: normal;
              }
            }
            button {
              width: 65px;

              height: 24px;
              background: linear-gradient(90deg, #e4d1a9 0%, #c5a570 100%);

              box-shadow: 0px 2px 4px 0px rgba(0, 101, 90, 0.46);

              border-radius: 4px;
              border: 0;
              outline: 0;
              color: #fff;
              font-size: @font12;
              cursor: pointer;
            }
          }
        }
        .notice-content {
          margin-top: 24px;

          padding: 24px;
          .shadow-box;
          .notice-head {
            display: flex;
            align-items: center;
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
            .notice-list-item {
              display: flex;

              margin-bottom: 24px;
              &:last-child {
                margin-bottom: 0px;
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
          }
        }
      }
    }
  }
}
.shadow-box() {
  background: #ffffff;

  box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);

  border-radius: 8px;
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
  <div class="back">
    <div class="content">
      <div class="main">
        <div class="main-head">
          <h3 class="head-title">宜昌杨秀芹,中午好</h3>
          <div class="head-titps">Welcome to XinJia</div>
        </div>
        <div class="icon-row">
          <!-- 本业工资 -->
          <div class="row-item">
            <div class="row-item-icon">
              <img src="https://img.0be.cn/pc/attence_17.svg" alt="" />
            </div>
            <div class="row-item-data">
              <div class="row-data-title">本月工资</div>
              <div class="row-data-value">
                <span class="value-after">￥</span>
                <span class="value-data">7,900</span>
              </div>
            </div>
          </div>
          <!-- 业绩核算 -->
          <div class="row-item">
            <div class="row-item-icon">
              <img src="https://img.0be.cn/pc/attence_18.svg" alt="" />
            </div>
            <div class="row-item-data">
              <div class="row-data-title">业绩核算</div>
              <div class="row-data-value">
                <span class="value-after">￥</span>
                <span class="value-data">21,900</span>
              </div>
            </div>
          </div>
          <!-- 品牌分 -->
          <div class="row-item">
            <div class="row-item-icon">
              <img src="https://img.0be.cn/pc/attence_16.svg" alt="" />
            </div>
            <div class="row-item-data">
              <div class="row-data-title">品牌分</div>
              <div class="row-data-value">
                <!-- <span class="value-after">￥</span> -->
                <span class="value-data">50000</span>
              </div>
            </div>
          </div>
          <!-- 品牌分 -->
          <div class="row-item">
            <div class="row-item-icon">
              <img src="https://img.0be.cn/pc/attence_19.svg" alt="" />
            </div>
            <div class="row-item-data">
              <div class="row-data-title">级别</div>
              <div class="row-data-value">
                <!-- <span class="value-after">￥</span> -->
                <span class="value-data">F3</span>
              </div>
            </div>
          </div>
        </div>
        <!-- resource -->
        <div class="resource">
          <div class="head">
            <span class="head-title">我的资源</span>
            <span class="head-more">查看更多</span>
          </div>
          <div class="layout-content">
            <div class="layout-item">
              <div class="item-title">跟单房源量（套）</div>
              <div class="item-data">482</div>
            </div>
            <div class="layout-item">
              <div class="item-title">独家委托量（套）</div>
              <div class="item-data">29</div>
            </div>
            <div class="layout-item">
              <div class="item-title">房源实勘量（套）</div>
              <div class="item-data">274</div>
            </div>
            <div class="layout-item">
              <div class="item-title">钥匙委托量（套）</div>
              <div class="item-data">784</div>
            </div>
            <div class="layout-item">
              <div class="item-title">房源录入量（套）</div>
              <div class="item-data">341</div>
            </div>
            <div class="layout-item">
              <div class="item-title">客户量（套）</div>
              <div class="item-data">3</div>
            </div>
          </div>
        </div>
        <!-- echart -->
        <div class="visual">
          <div class="rank-item">
            <div class="rank-head">
              <span class="head-title">
                <span class="title-text">经纪人业绩</span>
                <div
                  class="after-content"
                  @click="changeSelectFlag('agentSelectFlag')"
                >
                  <span class="after-text">林俊杰</span>
                  <span class="iconfont iconjuxing"></span>
                </div>
                <lsSelect
                  v-if="root.agentSelectFlag"
                  key-value="agentSelectFlag"
                  place-str="搜索经纪人"
                  @close="changeSelectFlag"
                />
              </span>
              <span class="head-btn el-icon-refresh">更新数据</span>
            </div>
            <div class="echart-content">
              <div id="chart" ref="leftEchart"></div>
              <div class="cheart-foot">
                <span>更新时间：2020-11-04</span>
                <button>查看上月</button>
              </div>
            </div>
            <div class="rank-list">
              <div class="rank-list-head">
                <div class="head-item active">门店排名</div>
                <div class="head-item">区域排名</div>
                <div class="head-item">公司排名</div>
              </div>
              <div class="rank-list-data">
                <el-scrollbar class="scrollbar">
                  <!-- 如果需要显示is-fixed 则需要加上这个样式is-emplt-split -->
                  <div class="scroll-pad is-emplt-split">
                    <div class="data-item">
                      <div class="rank-img">
                        <img
                          src="https://img.0be.cn/pc/attence_bz_00.svg"
                          alt=""
                        />
                      </div>
                      <div class="rank-middle">
                        <img
                          src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=222251486,3350228821&fm=11&gp=0.jpg"
                          alt=""
                        />
                        <span class="per-name">Empty House</span>
                      </div>
                      <div class="rank-value">
                        <span>￥</span>
                        <span>21,391</span>
                      </div>
                    </div>
                    <div class="data-item">
                      <div class="rank-img">
                        <img
                          src="https://img.0be.cn/pc/attence_bz_01.svg"
                          alt=""
                        />
                      </div>
                      <div class="rank-middle">
                        <img
                          src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=222251486,3350228821&fm=11&gp=0.jpg"
                          alt=""
                        />
                        <span class="per-name">Au Volant</span>
                      </div>
                      <div class="rank-value">
                        <span>￥</span>
                        <span>21,391</span>
                      </div>
                    </div>
                    <div class="data-item">
                      <div class="rank-img">
                        <img
                          src="https://img.0be.cn/pc/attence_bz_02.svg"
                          alt=""
                        />
                      </div>
                      <div class="rank-middle">
                        <img
                          src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=222251486,3350228821&fm=11&gp=0.jpg"
                          alt=""
                        />
                        <span class="per-name">Hero</span>
                      </div>
                      <div class="rank-value">
                        <span>￥</span>
                        <span>21,391</span>
                      </div>
                    </div>
                    <div class="data-item">
                      <div class="rank-icon">
                        04.
                      </div>
                      <div class="rank-middle">
                        <img
                          src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=222251486,3350228821&fm=11&gp=0.jpg"
                          alt=""
                        />
                        <span class="per-name">I Took A Pill In Ibiza</span>
                      </div>
                      <div class="rank-value">
                        <span>￥</span>
                        <span>21,391</span>
                      </div>
                    </div>
                    <div class="data-item">
                      <div class="rank-icon">
                        05.
                      </div>
                      <div class="rank-middle">
                        <img
                          src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=222251486,3350228821&fm=11&gp=0.jpg"
                          alt=""
                        />
                        <span class="per-name">Creep</span>
                      </div>
                      <div class="rank-value">
                        <span>￥</span>
                        <span>21,391</span>
                      </div>
                    </div>
                    <div class="data-item">
                      <div class="rank-icon">
                        06.
                      </div>
                      <div class="rank-middle">
                        <img
                          src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=222251486,3350228821&fm=11&gp=0.jpg"
                          alt=""
                        />
                        <span class="per-name">空姐陷阱</span>
                      </div>
                      <div class="rank-value">
                        <span>￥</span>
                        <span>21,391</span>
                      </div>
                    </div>
                    <div class="data-item">
                      <div class="rank-icon">
                        07.
                      </div>
                      <div class="rank-middle">
                        <img
                          src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=222251486,3350228821&fm=11&gp=0.jpg"
                          alt=""
                        />
                        <span class="per-name">Outside</span>
                      </div>
                      <div class="rank-value">
                        <span>￥</span>
                        <span>21,391</span>
                      </div>
                    </div>
                  </div>
                </el-scrollbar>
                <div class="is-fixed">
                  <div class="rank-icon">
                    21.
                  </div>
                  <div class="rank-middle">
                    <img
                      src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=222251486,3350228821&fm=11&gp=0.jpg"
                      alt=""
                    />
                    <span class="per-name">Contact(我)</span>
                  </div>
                  <div class="rank-value">
                    <span>￥</span>
                    <span>21,391</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="rank-item">
            <div class="rank-head">
              <span class="head-title">
                <span class="title-text">门店业绩</span>
                <div
                  class="after-content"
                  @click="changeSelectFlag('deptSelectFlag')"
                >
                  <span class="after-text">中诚一店</span>
                  <span class="iconfont iconjuxing"></span>
                </div>
                <lsSelect
                  v-if="root.deptSelectFlag"
                  place-str="搜索门店"
                  key-value="deptSelectFlag"
                  @close="changeSelectFlag"
                />
              </span>
              <span class="head-btn el-icon-refresh">更新数据</span>
            </div>
            <div class="echart-content">
              <div id="chart" ref="rightEchart"></div>
              <div class="cheart-foot">
                <span>更新时间：2020-11-04</span>
                <button>查看上月</button>
              </div>
            </div>
            <div class="rank-list">
              <div class="rank-list-head">
                <div class="head-item active">公司排名</div>
                <div class="head-item">团队级别排名</div>
                <div class="head-item">区域排名</div>
              </div>
              <div class="rank-list-data">
                <el-scrollbar class="scrollbar">
                  <!-- 如果需要显示is-fixed 则需要加上这个样式is-emplt-split -->
                  <div class="scroll-pad is-emplt-split">
                    <div class="data-item">
                      <div class="rank-img">
                        <img
                          src="https://img.0be.cn/pc/attence_bz_00.svg"
                          alt=""
                        />
                      </div>
                      <div class="rank-middle">
                        <span class="per-name">Redbone</span>
                      </div>
                      <div class="rank-value">
                        <span>￥</span>
                        <span>21,391</span>
                      </div>
                    </div>
                    <div class="data-item">
                      <div class="rank-img">
                        <img
                          src="https://img.0be.cn/pc/attence_bz_01.svg"
                          alt=""
                        />
                      </div>
                      <div class="rank-middle">
                        <span class="per-name">Where We Started</span>
                      </div>
                      <div class="rank-value">
                        <span>￥</span>
                        <span>21,391</span>
                      </div>
                    </div>
                    <div class="data-item">
                      <div class="rank-img">
                        <img
                          src="https://img.0be.cn/pc/attence_bz_02.svg"
                          alt=""
                        />
                      </div>
                      <div class="rank-middle">
                        <span class="per-name">It Ain't Me</span>
                      </div>
                      <div class="rank-value">
                        <span>￥</span>
                        <span>21,391</span>
                      </div>
                    </div>
                    <div class="data-item">
                      <div class="rank-icon">
                        04.
                      </div>
                      <div class="rank-middle">
                        <span class="per-name">Good Love</span>
                      </div>
                      <div class="rank-value">
                        <span>￥</span>
                        <span>21,391</span>
                      </div>
                    </div>
                    <div class="data-item">
                      <div class="rank-icon">
                        05.
                      </div>
                      <div class="rank-middle">
                        <span class="per-name">Creep</span>
                      </div>
                      <div class="rank-value">
                        <span>￥</span>
                        <span>21,391</span>
                      </div>
                    </div>
                    <div class="data-item">
                      <div class="rank-icon">
                        06.
                      </div>
                      <div class="rank-middle">
                        <span class="per-name">空姐陷阱</span>
                      </div>
                      <div class="rank-value">
                        <span>￥</span>
                        <span>21,391</span>
                      </div>
                    </div>
                    <div class="data-item">
                      <div class="rank-icon">
                        07.
                      </div>
                      <div class="rank-middle">
                        <span class="per-name">Outside</span>
                      </div>
                      <div class="rank-value">
                        <span>￥</span>
                        <span>21,391</span>
                      </div>
                    </div>
                  </div>
                </el-scrollbar>
                <div class="is-fixed">
                  <div class="rank-icon">
                    21.
                  </div>
                  <div class="rank-middle">
                    <span class="per-name">Ocean(本店)</span>
                  </div>
                  <div class="rank-value">
                    <span>￥</span>
                    <span>21,391</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="sticky">
          <div class="clock-in">
            <div class="clock-posi">
              <div class="clock-qr">
                <img
                  class="clock-qr-image"
                  src="https://lsxjytestimgs.oss-cn-shenzhen.aliyuncs.com/scanUpload/96cd92a9348246b78d5b812c63567e0e.jpg"
                  alt=""
                />
                <div class="clock-qr-tips">手机微信扫码签到</div>
              </div>
              <div class="change-clock">
                <div class="qr-tips">提前打卡，点这里</div>
                <div class="qr-change">
                  <img src="https://img.0be.cn/pc/attence_bz_03.svg" alt="" />
                </div>
              </div>
              <div class="per-data">
                <img
                  src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3226010111,403035871&fm=11&gp=0.jpg"
                  alt=""
                />
                <h3>史泰龙</h3>
                <h4>国贸一店-中诚片区</h4>
              </div>
              <div class="clock-pad">
                <div class="navto-color">
                  <div class="summary-tips">
                    忙碌一日总是非常短暂，不妨写一写今天都做了些什么吧！
                  </div>
                  <button>去写总结</button>
                </div>
                <div class="split-line"></div>
              </div>
            </div>
            <h3 class="help-title">自助申请</h3>
            <div class="help-btn-group">
              <div class="help-btn-item">
                <div class="click-area">
                  <img src="https://img.0be.cn/pc/attence_22.svg" alt="" />
                  <div>请假</div>
                </div>
              </div>
              <div class="help-btn-item">
                <div class="click-area">
                  <img src="https://img.0be.cn/pc/attence_21.svg" alt="" />
                  <div>保薪酬</div>
                </div>
              </div>
              <div class="help-btn-item">
                <div class="click-area">
                  <img src="https://img.0be.cn/pc/attence_23.svg" alt="" />
                  <div>免考勤</div>
                </div>
              </div>
            </div>
          </div>
          <div class="partner">
            <div class="partner-inner">
              <img src="https://img.0be.cn/pc/attence_xzjh.svg" alt="" />
              <div class="inner-middle">
                <h4>我要成为合伙人</h4>
                <h5>让杰出的你更成功</h5>
              </div>
              <button>立即申请</button>
            </div>
          </div>
          <div class="notice-content">
            <div class="notice-head">
              <div class="head-item active">
                系统公告
              </div>
              <div class="head-item ">
                规则文档
              </div>
              <div class="head-more">
                <span>更多</span>
              </div>
            </div>
            <div class="notice-list">
              <div class="notice-list-item">
                <div class="notice-item-text">
                  系统公告系统公告系统公告系统公告系统公告系统公告系统公
                </div>
                <div class="notice-item-time">04-12</div>
              </div>
              <div class="notice-list-item">
                <div class="notice-item-text">系统公告系统公告系统公</div>
                <div class="notice-item-time">04-12</div>
              </div>
              <div class="notice-list-item">
                <div class="notice-item-text">系统公告系统公告系统公</div>
                <div class="notice-item-time">04-12</div>
              </div>
              <div class="notice-list-item">
                <div class="notice-item-text">系统公告系统公告系统公</div>
                <div class="notice-item-time">04-12</div>
              </div>
              <div class="notice-list-item">
                <div class="notice-item-text">系统公告系统公告系统公</div>
                <div class="notice-item-time">04-12</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { V2Init } from "vcomposition2";
import { echartEnter } from "./realization/echart";
import lsSelect from "../components/lsSelect";
export default V2Init({
  created: [echartEnter],
  components: {
    lsSelect
  }
});
</script>
