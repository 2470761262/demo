<style lang="less" scoped>
.content {
  background: #f0f7f7;
  display: flex;
  justify-content: center;
  padding: 24px 24px 0;
  flex: 1;
  align-items: flex-start;
  .main {
    width: 852px;
    .shadow-box;
    .body {
      padding: 24px;
      line-height: 1;
      .title {
        color: #303133;
        font-size: @font16;
        font-weight: bold;
        margin-top: 24px;
        &:first-child {
          margin-top: 0;
        }
        &.is-require {
          display: flex;
          align-items: center;
          &::before {
            content: "";
            background: #f62f2f;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 8px;
          }
        }
      }
      .tips {
        width: 804px;
        height: 36px;
        line-height: 36px;
        background: rgba(255, 150, 0, 0.07);
        color: #ff9600;
        font-size: @font16;
        text-indent: 16px;
        margin-top: 16px;
      }
      .check {
        width: 579px;
        display: flex;
        flex-wrap: wrap;
        .check-item {
          width: 124px;
          height: 128px;
          background: #f0f2f5;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          margin-right: 16px;
          margin-top: 16px;
          cursor: pointer;
          &.is-check {
            background: @backgroud;
            color: #fff;
          }
          img {
            width: 52px;
            height: 52px;
            background: #cbd3e0;
            border-radius: 50%;
            padding: 2px;
            box-sizing: border-box;
          }
          h3 {
            margin-top: 16px;
            font-size: @font16;
            font-weight: normal;
          }
        }
      }
      .col-textarea {
        width: 579px;
        height: 162px;
        background: #ffffff;
        border-radius: 4px;
        border: 1px solid #cecece;
        margin-top: 16px;
        /deep/.el-textarea {
          height: 100%;
          .el-textarea__inner {
            height: 100%;
            padding: 16px;
            font-size: @font16;
            font-family: "Microsoft Yahei", Helvetica, Arial, sans-serif;
            //   &::placeholder {
            //     font-size: @font16;
            //   }
          }
          .el-input__count {
            bottom: 16px;
            right: 16px;
            font-size: @font16;
          }
        }
      }
    }
    .foot {
      display: flex;
      height: 72px;
      background: #ffffff;
      box-shadow: 0px -2px 15px 0px rgba(0, 0, 0, 0.1);
      align-items: center;
      padding-left: 24px;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      button {
        width: 109px;
        height: 40px;
        border-radius: 4px;
        border: 0;
        outline: none;
        margin-right: 16px;
        cursor: pointer;
      }
      .reset {
        background: #f4f4f5;
        font-size: @font16;
        color: #606266;
      }
      .submit {
        background: @backgroud;
        color: #fff;
      }
    }
  }
  .other {
    width: 292px;
    margin-left: 24px;
    .dept-msg {
      .shadow-box;
      height: 152px;
      display: flex;
      align-items: center;
      .dept-data {
        width: 171px;
        display: flex;
        justify-content: center;
        .center {
          line-height: 1;
          .dept-title {
            color: #303133;
            font-size: @font24;
            font-weight: bold;
          }
          .dept-per {
            font-size: @font16;
            margin-top: 16px;
          }
        }
      }
      .split-line {
        height: 115px;
        background: #f0f2f5;
        width: 1px;
      }
      .dept-num {
        flex: 1;
        text-align: center;
        line-height: 1;
        .dept-num-title {
          font-size: 32px;
          color: #303133;
          font-weight: bold;
          height: 46px;
        }
        .dept-num-tips {
          color: #606266;
          font-size: @font14;
        }
      }
    }
    .staff-list {
      line-height: 1;
      .shadow-box;
      margin-top: 25px;
      padding-bottom: 24px;
      .list-title {
        font-weight: bold;
        color: #303133;
        font-size: @font18;
        padding: 24px 24px 0;
      }
      .list-content {
        height: 200px;
        display: flex;
        flex-direction: column;
        margin-top: 16px;
        .scrollbar {
          height: 100%;
          // flex: 1;
          // height: 0;
          /deep/.el-scrollbar__wrap {
            overflow-x: hidden;
            flex: 1;
          }
          /deep/.is-horizontal {
            display: none;
          }
          .scrollbar-pad {
            padding: 0 24px;
            .list-item {
              padding: 16px;
              height: 96px;
              background: #f8f8f9;
              border-radius: 4px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              box-sizing: border-box;
              line-height: 1;
              margin-bottom: 16px;
              position: relative;
              .item-head {
                display: flex;
                img {
                  width: 36px;
                  height: 36px;
                  border-radius: 50%;
                  margin-right: 8px;
                }
                .head-middle {
                  .head-middle-name {
                    font-size: @font14;
                    color: #303133;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    .name-tag {
                      height: 16px;
                      border-radius: 2px;
                      border: 1px solid #247257;
                      padding: 0 4px;
                      font-weight: normal;
                      line-height: 14px;
                      font-size: @font12;
                      color: #247257;
                      box-sizing: border-box;
                      margin-left: 8px;
                    }
                  }
                  .head-middle-dept {
                    color: #606266;
                    font-size: @font12;
                    margin-top: 8px;
                  }
                }
              }
              .item-foot {
                margin-top: 16px;
                font-size: @font12;
                color: #909399;
              }
            }
          }
        }
      }
    }
    .nav-page {
      .shadow-box;
      margin-top: 24px;
      padding: 24px;
      .nav-page-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #303133;
        font-size: @font18;
        font-weight: bold;
        cursor: pointer;
        .nav-point {
          font-size: inherit;
        }
      }
      .nav-page-tips {
        color: #ff9600;
        height: 32px;
        background: rgba(255, 150, 0, 0.07);
        border-radius: 4px;
        line-height: 32px;
        margin-top: 17px;
        text-align: center;
      }
    }
  }
}

.shadow-box() {
  background: #ffffff;
  box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
  border-radius: 8px;
}
</style>
<template>
  <div class="content">
    <div class="main">
      <div class="body">
        <div class="title is-require">
          选择解锁员工
        </div>
        <div class="tips">
          每次仅能为一名员工提交解锁申请
        </div>
        <div class="check">
          <div class="check-item is-check">
            <img
              src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1819216937,2118754409&fm=26&gp=0.jpg"
              alt=""
            />
            <h3>胡彦斌</h3>
          </div>
          <div class="check-item">
            <img
              src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1819216937,2118754409&fm=26&gp=0.jpg"
              alt=""
            />
            <h3>胡彦斌</h3>
          </div>
          <div class="check-item">
            <img
              src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1819216937,2118754409&fm=26&gp=0.jpg"
              alt=""
            />
            <h3>胡彦斌</h3>
          </div>
          <div class="check-item">
            <img
              src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1819216937,2118754409&fm=26&gp=0.jpg"
              alt=""
            />
            <h3>胡彦斌</h3>
          </div>
          <div class="check-item">
            <img
              src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1819216937,2118754409&fm=26&gp=0.jpg"
              alt=""
            />
            <h3>胡彦斌</h3>
          </div>
        </div>
        <div class="title is-require">
          申请解锁原因
        </div>
        <div class="col-textarea">
          <el-input
            type="textarea"
            placeholder="请输入申请原因"
            maxlength="50"
            show-word-limit
            resize="none"
          >
          </el-input>
        </div>
      </div>
      <div class="foot">
        <button class="reset">重置</button>
        <button class="submit">提交申请</button>
      </div>
    </div>
    <div class="other">
      <div class="dept-msg">
        <div class="dept-data">
          <div class="center">
            <div class="dept-title">中诚一店</div>
            <div class="dept-per">店长：林俊杰</div>
          </div>
        </div>
        <div class="split-line"></div>
        <div class="dept-num">
          <div class="dept-num-title">3</div>
          <div class="dept-num-tips">被锁定员工</div>
        </div>
      </div>
      <div class="staff-list">
        <div class="list-title">已锁定员工（2）</div>
        <div class="list-content">
          <el-scrollbar class="scrollbar">
            <div class="scrollbar-pad">
              <div class="list-item">
                <div class="item-head">
                  <img
                    src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1819216937,2118754409&fm=26&gp=0.jpg"
                    alt=""
                  />
                  <div class="head-middle">
                    <div class="head-middle-name">
                      <div class="name-text">林俊杰</div>
                      <div class="name-tag">经纪人</div>
                    </div>
                    <div class="head-middle-dept">中诚片区-中诚一店</div>
                  </div>
                </div>
                <div class="item-foot">
                  2020-11-05 16:54:17 成为免考勤员工
                </div>
              </div>
              <div class="list-item">
                <div class="item-head">
                  <img
                    src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1819216937,2118754409&fm=26&gp=0.jpg"
                    alt=""
                  />
                  <div class="head-middle">
                    <div class="head-middle-name">
                      <div class="name-text">林俊杰</div>
                      <div class="name-tag">经纪人</div>
                    </div>
                    <div class="head-middle-dept">中诚片区-中诚一店</div>
                  </div>
                </div>
                <div class="item-foot">
                  2020-11-05 16:54:17 成为免考勤员工
                </div>
              </div>
              <div class="list-item">
                <div class="item-head">
                  <img
                    src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1819216937,2118754409&fm=26&gp=0.jpg"
                    alt=""
                  />
                  <div class="head-middle">
                    <div class="head-middle-name">
                      <div class="name-text">林俊杰</div>
                      <div class="name-tag">经纪人</div>
                    </div>
                    <div class="head-middle-dept">中诚片区-中诚一店</div>
                  </div>
                </div>
                <div class="item-foot">
                  2020-11-05 16:54:17 成为免考勤员工
                </div>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>
      <div class="nav-page">
        <div class="nav-page-title">
          <div class="title-text">免考勤员工（2）</div>
          <div class="nav-point el-icon-arrow-right"></div>
        </div>
        <div class="nav-page-tips">点击查看被锁定员工账号，并为其申请解锁</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
