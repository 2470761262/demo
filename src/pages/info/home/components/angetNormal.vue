<style lang="less" scoped>
.normal-content {
  height: 698px;
  background: #ffffff;
  box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
  border-radius: 8px;
  flex: 1;
  margin-right: 16px;
  &:last-child {
    margin-right: 0px;
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
          margin-top: 24px;
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
}
</style>

<template>
  <div class="normal-content">
    <div class="normal-title">
      <div class="title-text">经纪人业绩</div>
      <div class="title-btn">
        <div class="btn-prefix el-icon-refresh-right"></div>
        <div class="btn-title">更新数据</div>
      </div>
    </div>
    <div class="normal-scroll">
      <el-scrollbar class="scrollbar">
        <div class="scrollbar-pad">
          <div class="data-item">
            <div class="rank-img">
              <img src="https://img.0be.cn/pc/attence_bz_00.svg" alt="" />
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
              <img src="https://img.0be.cn/pc/attence_bz_01.svg" alt="" />
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
              <img src="https://img.0be.cn/pc/attence_bz_02.svg" alt="" />
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
            <div class="rank-icon">
              05.
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
            <div class="rank-icon">
              06.
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
            <div class="rank-icon">
              07.
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
            <div class="rank-icon">
              08.
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
            <div class="rank-icon">
              09.
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
            <div class="rank-icon">
              10.
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
            <div class="rank-icon">
              11.
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
            <div class="rank-icon">
              12.
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
            <div class="rank-icon">
              13.
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
            <div class="rank-icon">
              14.
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
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {};
</script>
