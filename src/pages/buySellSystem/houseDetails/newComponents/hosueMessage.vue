<style lang="less" scoped>
.message-content {
  flex: 1;
  padding-left: 50px;
  display: flex;
  flex-direction: column;
  .message-content-head {
    // display: flex;
    font-size: 0;
    margin-bottom: 15px;
    padding-left: 10px * @base;
    .head-price {
      color: #d51e05;
      font-weight: 600;
      // prettier-ignore
      margin-right: 30PX;
      display: inline-block;
      :nth-child(1) {
        font-size: @font26;
      }
      :nth-child(2) {
        font-size: @font14;
      }
    }
    .head-avg-price,
    .head-adjust {
      display: inline-block;
      font-size: @font14;
    }
    .head-adjust {
      // prettier-ignore
      margin-left: 30PX;
      color: #d51e05;
      font-weight: 600;
    }
  }
  .head-hurdle-content {
    display: flex;
    justify-content: space-between;
    height: 58px * @base;
    border-top: 1px solid #d5d5d5;
    border-bottom: 1px solid #d5d5d5;
    box-sizing: border-box;
    padding-left: 30px * @base;
    // prettier-ignore
    padding-right: 50PX;
    .hurdle-content-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .item-title {
        color: #aaaaaa;
        font-size: @font16;
      }
      .item-msg {
        font-size: @font16;
        // prettier-ignore
        margin-top: 5PX;
      }
    }
  }
  .head-message-hurdle {
    padding-left: 10px * @base;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 18px * @base;
    .message-hurdle-cell {
      display: flex;
      .hurdle-cell-item {
        flex: 1;
        display: flex;
        font-size: @font14;
        width: 0;
        &.left8 {
          flex: 0.8;
        }
        .cell-item-title {
          // prettier-ignore
          width: 90PX;
          color: #aaaaaa;
          flex-shrink: 0;
        }
        .cell-item-data {
          &.over-flex {
            display: flex;
            width: 0;
            flex: 1;
            .overText {
              flex: 1;
              width: 0;
            }
          }
        }
      }
    }
  }
}
.inline-btn {
  color: @backgroud;
  cursor: pointer;
  font-weight: 600;
  margin-left: 5px;
  flex-shrink: 0;
  i {
    font-size: @font16;
  }
  &.red {
    color: #d51e05;
  }
}
</style>
<template>
  <div class="message-content">
    <div class="message-content-head">
      <div class="head-price">
        <span>200</span>
        <span>万元</span>
      </div>
      <div class="head-avg-price">
        <span>单价:</span>
        <span>10000元/平</span>
      </div>
      <div class="head-adjust">
        <span>调价记录</span>
        <span class="el-icon-question"></span>
      </div>
    </div>
    <div class="head-hurdle-content">
      <div class="hurdle-content-item">
        <div class="item-title">户型</div>
        <div class="item-msg">3-2-1-1</div>
      </div>
      <div class="hurdle-content-item">
        <div class="item-title">面积</div>
        <div class="item-msg">89.23平</div>
      </div>
      <div class="hurdle-content-item">
        <div class="item-title">朝向</div>
        <div class="item-msg">南/北</div>
      </div>
      <div class="hurdle-content-item">
        <div class="item-title">楼层</div>
        <div class="item-msg">30/49</div>
      </div>
    </div>
    <div class="head-message-hurdle">
      <!-- 评估价 & 物业费 -->
      <div class="message-hurdle-cell">
        <div class="hurdle-cell-item left8">
          <div class="cell-item-title">
            评估价
          </div>
          <div class="cell-item-data">
            暂无数据
          </div>
        </div>
        <div class="hurdle-cell-item">
          <div class="cell-item-title">
            物业费
          </div>
          <div class="cell-item-data overText">
            1.68元/月/㎡
          </div>
        </div>
      </div>
      <!-- 独家信息 & 钥匙信息 -->
      <div class="message-hurdle-cell">
        <div class="hurdle-cell-item left8">
          <div class="cell-item-title">
            独家信息
          </div>
          <div class="cell-item-data overText">
            2020-12-11到期
          </div>
        </div>
        <div class="hurdle-cell-item">
          <div class="cell-item-title">
            钥匙信息
          </div>
          <div class="cell-item-data over-flex">
            <span class="overText">有钥匙(国贸店)</span>
            <span class="inline-btn">
              <i class="iconfont iconxiegenjin"></i> 修改</span
            >
          </div>
        </div>
      </div>
      <!-- 上次带看 & 30日被看-->
      <div class="message-hurdle-cell">
        <div class="hurdle-cell-item left8">
          <div class="cell-item-title">
            上次带看
          </div>
          <div class="cell-item-data overText">
            2020-06-20
          </div>
        </div>
        <div class="hurdle-cell-item">
          <div class="cell-item-title">
            30日被看
          </div>
          <div class="cell-item-data overText">
            3次
          </div>
        </div>
      </div>

      <!-- 跟单人-->
      <div class="message-hurdle-cell">
        <div class="hurdle-cell-item">
          <div class="cell-item-title">
            跟单人
          </div>
          <div class="cell-item-data">
            张晓明(XXXXXXXXX)
            <span class="inline-btn red">
              跟单职责<i class="el-icon-question"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
