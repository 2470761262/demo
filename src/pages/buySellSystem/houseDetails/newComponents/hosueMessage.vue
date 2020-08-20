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
      cursor: pointer;
    }
    .head-adjust {
      // prettier-ignore
      margin-left: 30PX;
      color: #d51e05;
      font-weight: 600;
      position: relative;
      .el-icon-question:hover + .hover-posi-tips {
        display: block;
      }
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
  border: none;
  background: none;
  outline: none;
  &[disabled] {
    color: #999;
    cursor: no-drop;
  }
  i {
    font-size: @font16;
  }
  &.red {
    color: #d51e05;
    position: relative;
    .el-icon-question:hover + .hover-posi-tips {
      display: block;
    }
  }
}
.hover-posi-tips:hover {
  display: block;
}
.hover-posi-tips {
  z-index: 300;
  display: none;
  position: absolute;
  // prettier-ignore
  width: 500PX;
  left: 50%;
  // prettier-ignore
  bottom: 0PX;
  background: #737373;
  // prettier-ignore
  padding: 10PX 20PX;
  box-sizing: border-box;
  transform: translate(-50%, 100%);
  color: #fff;
  // prettier-ignore
  line-height: 30PX;
  text-align: justify;
  // prettier-ignore
  box-shadow: 0 2PX 12PX 0 rgba(0, 0, 0, 0.3);
  div,
  p {
    font-size: @font14;
    // prettier-ignore
    margin-bottom: 10PX;
    word-break: break-all;
    &:last-child {
      margin-bottom: 0;
    }
  }
  div {
    p {
      // prettier-ignore
      padding-left: 20PX;
    }
  }
}
</style>
<template>
  <div class="message-content">
    <div class="message-content-head">
      <div class="head-price">
        <span>{{ houseData.tradePrice || houseData.Price }}</span>
        <span v-if="houseData.tradePrice || houseData.Price">万元</span>
      </div>
      <div class="head-avg-price">
        <span>单价：</span>
        <span>{{ houseData.averagePrice | emptyRead("元/平") }}</span>
      </div>
      <div class="head-adjust">
        <span @click="openPopUp('openAdjustFlag')">调价记录</span>
        <span class="el-icon-question"></span>

        <div class="hover-posi-tips">
          <p>1、价格变动请及时修改，与成交价不一致，可能影响业绩分配比例！</p>
        </div>
      </div>
    </div>
    <div class="head-hurdle-content">
      <div class="hurdle-content-item">
        <div class="item-title">户型</div>
        <div class="item-msg">{{ houseType }}</div>
      </div>
      <div class="hurdle-content-item">
        <div class="item-title">面积</div>
        <div class="item-msg">{{ houseData.InArea | emptyRead("平") }}</div>
      </div>
      <div class="hurdle-content-item">
        <div class="item-title">朝向</div>
        <div class="item-msg">{{ houseData.Face | emptyRead }}</div>
      </div>
      <div class="hurdle-content-item">
        <div class="item-title">楼层</div>
        <div class="item-msg">{{ foolAll }}</div>
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
            {{ houseData.valuation | emptyRead("元/平") }}
          </div>
        </div>
        <div class="hurdle-cell-item">
          <div class="cell-item-title">
            物业费
          </div>
          <div class="cell-item-data overText">
            {{ houseData.PropertyFee | emptyReadZero("/月/㎡") }}
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
            {{ proxyMaxTime }}
          </div>
        </div>
        <div class="hurdle-cell-item">
          <div class="cell-item-title">
            钥匙信息
          </div>
          <div class="cell-item-data over-flex">
            <span class="overText">{{ isKeyMessage }}</span>
            <button
              class="inline-btn"
              :disabled="keyStorageDisabled"
              @click="openPopUp('keyStorageFlag')"
              v-if="isKeyStorage"
            >
              <i class="iconfont iconxiegenjin"></i> 修改
            </button>
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
            {{ lastPairTime }}
          </div>
        </div>
        <div class="hurdle-cell-item">
          <div class="cell-item-title">
            30日被看
          </div>
          <div class="cell-item-data overText">
            {{ houseData.seenNumRecent }}次
          </div>
        </div>
      </div>
      <!-- 跟单人-->
      <div class="message-hurdle-cell">
        <div class="hurdle-cell-item left8">
          <div class="cell-item-title">
            业主类型
          </div>
          <div class="cell-item-data">
            {{ houseData.customerType }}
          </div>
        </div>
        <div class="hurdle-cell-item">
          <div class="cell-item-title">
            跟单人
            <span class="inline-btn red">
              <i class="el-icon-question"></i>

              <div class="hover-posi-tips">
                <p>
                  1、房源验真通过后，请在3天内完善房源"选填信息"，否则将取消跟单权；
                </p>
                <div>
                  2、请定期维护业主，否则将取消跟单权，维护业主的有效动作为：
                  <p>①通过工作号回访业主通话30秒（含）以上;</p>
                  <p>②填写有效文字跟进或面访记录;</p>
                  <p>③该房源被带看;</p>
                  <p>
                    ④上传作业项：添加钥匙委托、普通/独家委托、上传实勘信息；
                  </p>
                </div>
              </div>
            </span>
          </div>
          <div class="cell-item-data">
            {{ agentPerMessage }}
          </div>
        </div>
      </div>
    </div>
    <!-- 修改存放门店 -->
    <key-storage
      title="修改存放门店"
      :visible.sync="keyStorageFlag"
      width="320px"
      maskHideEvent
      v-if="keyStorageFlag"
    ></key-storage>

    <price-adjustment
      title="调价记录"
      :visible.sync="openAdjustFlag"
      width="980PX"
      v-if="openAdjustFlag"
    >
    </price-adjustment>
  </div>
</template>

<script>
import { mapState } from "vuex";
import util from "@/util/util";
export default {
  data() {
    return {
      keyStorageFlag: false,
      perId: "", //登录人ID
      openAdjustFlag: false
    };
  },
  components: {
    keyStorage: () => import("../newDidLog/keyStorage"),
    priceAdjustment: () => import("../newDidLog/priceAdjustment")
  },
  created() {
    if (util.localStorageGet("logindata")) {
      this.perId = util.localStorageGet("logindata").accountId;
    }
  },
  computed: {
    ...mapState({
      houseData: state => state.houseDateil.houseData,
      reloData: state => state.houseDateil.reloData
    }),
    //楼层
    foolAll() {
      let { emptyRead } = this.$options.filters;
      return `${emptyRead(this.houseData.Floor)}/${emptyRead(
        this.houseData.floorNum
      )}`;
    },
    houseType() {
      let { Rooms, hall, toilet, balcony } = this.houseData;
      return `${Rooms || 0}-${hall || 0}-${toilet || 0}-${balcony || 0}`;
    },
    //独家信息
    proxyMaxTime() {
      if (
        this.houseData.onlyOwner &&
        this.houseData.isOnly !== 0 &&
        this.houseData.isOnly !== 2 &&
        this.houseData.proxyMaxTime !== null
      ) {
        return `${util.format(this.houseData.proxyMaxTime, "yyyy-MM-dd")}到期`;
      }
      return "暂无";
    },
    //上次带看时间
    lastPairTime() {
      if (this.houseData.lastPairTime !== null) {
        return `${util.format(this.houseData.lastPairTime, "yyyy-MM-dd")}`;
      }
      return "暂无";
    },
    //跟单人信息
    agentPerMessage() {
      if (this.houseData.agentPerName != null) {
        return `${this.houseData.agentPerName}(${this.houseData.agentPerTel})`;
      }
      return "无跟人";
    },
    /**
     * @example: 钥匙信息
     */
    isKeyMessage() {
      if (
        this.houseData.keyOwner > 0 &&
        this.houseData.keyStorageDeptName !== null
      ) {
        return `有钥匙(${this.houseData.keyStorageDeptName})`;
      }
      return "暂无";
    },
    /**
     * @example: 修改钥匙存放门店Disabled
     */
    keyStorageDisabled() {
      return (
        !(this.houseData.keyOwner > 0) || !this.reloData.updateKeyStorageDept
      );
    },
    /**
     * @example: 修改钥匙存放门店按钮是否显示
     */
    isKeyStorage() {
      return this.houseData.agentHouseMethod.keyOwner == this.perId;
    }
  },
  methods: {
    openPopUp(PopName) {
      this[PopName] = true;
    }
  }
};
</script>
