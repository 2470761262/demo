<template>
  <div class="demand-box">
    <div
      class="demand-btn"
      @click="moreSelectFlag = true"
      v-if="plate == 0 && attentionStatus.flag == 1"
    >
      新增需求
    </div>
    <el-tabs
      v-model="changeTabsValue"
      @tab-click="handleClick"
      class="demand-tabs"
    >
      <el-tab-pane
        v-for="(item, idx) in demand.data"
        :key="idx"
        :name="idx + ''"
      >
        <span slot="label">{{ item }}</span>
      </el-tab-pane>
    </el-tabs>
    <template v-for="(item, idx) in demandList.data">
      <el-tabs
        v-model="demandTabsValue"
        type="card"
        v-show="changeTabsValue == idx"
        class="infor-tabs"
        :key="idx"
      >
        <el-tab-pane label="需求信息" name="demand">
          <div class="demand-msg">
            <div class="msg-title">
              <span class="msg-headline">需求信息</span>
              <span class="msg-time"
                >更新时间：{{ customer.data.ModTime }}</span
              >
              <span
                class="msg-update"
                @click="demandConfirm"
                v-if="plate == 0 && attentionStatus.flag == 1"
                >修改</span
              >
            </div>
            <!-- 二手住宅 -->
            <div class="msg-content" v-show="item.requireType == 1">
              <section class="msg-row-group">
                <div class="msg-row">
                  <span class="msg-row-title">期望首付：</span>
                  <div
                    class="msg-row-txt"
                    v-if="item.minFirstPrice && item.maxFirstPrice"
                  >
                    {{ item.minFirstPrice | formatMoney }} -
                    {{ item.maxFirstPrice | formatMoney }}万
                  </div>
                  <div class="msg-row-txt" v-else>暂无</div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">期望面积：</span>
                  <div class="msg-row-txt" v-if="item.minArea && item.maxArea">
                    {{ item.minArea || 0 }} - {{ item.maxArea || 0 }}m²
                  </div>
                  <div class="msg-row-txt" v-else>暂无</div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">期望总价：</span>
                  <div
                    class="msg-row-txt"
                    v-if="item.minPrice && item.maxPrice"
                  >
                    {{ item.minPrice | formatMoney }} -
                    {{ item.maxPrice | formatMoney }}万
                  </div>
                  <div class="msg-row-txt" v-else>暂无</div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">付款方式：</span>
                  <div class="msg-row-txt">
                    {{ item.payWay | formatPayWay }}
                  </div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">购买户型：</span>
                  <div class="msg-row-txt">{{ item.rooms | formatSymbol }}</div>
                </div>
              </section>
              <section class="msg-row-group">
                <div class="msg-row">
                  <span class="msg-row-title">期望楼层：</span>
                  <div class="msg-row-txt">
                    {{ item.floors | formatFloor }}
                  </div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">购买用途：</span>
                  <div class="msg-row-txt">
                    {{ item.buyDestination || "暂无" }}
                  </div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">期望小学：</span>
                  <div
                    class="msg-row-txt"
                    v-if="
                      item.primarySchool != null && item.primarySchool != ''
                    "
                  >
                    <p
                      v-for="(primarySchool, idx) in item.primarySchool"
                      :key="idx"
                    >
                      {{ primarySchool }}
                    </p>
                  </div>
                  <div class="msg-row-txt" v-else>暂无</div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">期望中学：</span>
                  <div
                    class="msg-row-txt"
                    v-if="item.middleSchool != null && item.middleSchool != ''"
                  >
                    <p
                      v-for="(middleSchool, idx) in item.middleSchool"
                      :key="idx"
                    >
                      {{ middleSchool }}
                    </p>
                  </div>
                  <div class="msg-row-txt" v-else>暂无</div>
                </div>
              </section>
            </div>
            <!-- 二手商铺 -->
            <div class="msg-content" v-show="item.requireType == 2">
              <section class="msg-row-group">
                <div class="msg-row">
                  <span class="msg-row-title">期望首付：</span>
                  <div
                    class="msg-row-txt"
                    v-if="item.minFirstPrice && item.maxFirstPrice"
                  >
                    {{ item.minFirstPrice | formatMoney }} -
                    {{ item.maxFirstPrice | formatMoney }}万
                  </div>
                  <div class="msg-row-txt" v-else>暂无</div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">期望面积：</span>
                  <div class="msg-row-txt" v-if="item.minArea && item.maxArea">
                    {{ item.minArea || 0 }} - {{ item.maxArea || 0 }}m²
                  </div>
                  <div class="msg-row-txt" v-else>暂无</div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">期望总价：</span>
                  <div
                    class="msg-row-txt"
                    v-if="item.minPrice && item.maxPrice"
                  >
                    {{ item.minPrice | formatMoney }} -
                    {{ item.maxPrice | formatMoney }}万
                  </div>
                  <div class="msg-row-txt" v-else>暂无</div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">商铺类型：</span>
                  <div class="msg-row-txt">
                    {{ item.shopTypes | formatShopType }}
                  </div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">付款方式：</span>
                  <div class="msg-row-txt">
                    {{ item.payWay | formatPayWay }}
                  </div>
                </div>
              </section>
              <section class="msg-row-group">
                <div class="msg-row">
                  <span class="msg-row-title">期望单价：</span>
                  <div
                    class="msg-row-txt"
                    v-if="item.minUnitPrice && item.maxUnitPrice"
                  >
                    {{ item.minUnitPrice }} - {{ item.maxUnitPrice }}元/平
                  </div>
                  <div class="msg-row-txt" v-else>暂无</div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">期望装修：</span>
                  <div class="msg-row-txt">
                    {{ item.decoration | formatSymbol }}
                  </div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">商铺用途：</span>
                  <div class="msg-row-txt">
                    {{ item.shopUses | formatShopUse }}
                  </div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">附属设施：</span>
                  <div class="msg-row-txt">
                    {{ item.facilitys | formatFacility }}
                  </div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">其他需求：</span>
                  <div class="msg-row-txt">
                    {{ item.otherNeeds | formatOtherNeed }}
                  </div>
                </div>
              </section>
            </div>
            <!-- 二手写字楼 -->
            <div class="msg-content" v-show="item.requireType == 4">
              <section class="msg-row-group">
                <div class="msg-row">
                  <span class="msg-row-title">期望首付：</span>
                  <div
                    class="msg-row-txt"
                    v-if="item.minFirstPrice && item.maxFirstPrice"
                  >
                    {{ item.minFirstPrice | formatMoney }} -
                    {{ item.maxFirstPrice | formatMoney }}万
                  </div>
                  <div class="msg-row-txt" v-else>暂无</div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">期望面积：</span>
                  <div class="msg-row-txt" v-if="item.minArea && item.maxArea">
                    {{ item.minArea || 0 }} - {{ item.maxArea || 0 }}m²
                  </div>
                  <div class="msg-row-txt" v-else>暂无</div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">期望总价：</span>
                  <div
                    class="msg-row-txt"
                    v-if="item.minPrice && item.maxPrice"
                  >
                    {{ item.minPrice | formatMoney }} -
                    {{ item.maxPrice | formatMoney }}万
                  </div>
                  <div class="msg-row-txt" v-else>暂无</div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">付款方式：</span>
                  <div class="msg-row-txt">
                    {{ item.payWay | formatPayWay }}
                  </div>
                </div>
              </section>
              <section class="msg-row-group">
                <div class="msg-row">
                  <span class="msg-row-title">期望单价：</span>
                  <div
                    class="msg-row-txt"
                    v-if="item.minUnitPrice && item.maxUnitPrice"
                  >
                    {{ item.minUnitPrice }} - {{ item.maxUnitPrice }}元/平
                  </div>
                  <div class="msg-row-txt" v-else>暂无</div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">期望装修：</span>
                  <div class="msg-row-txt">
                    {{ item.decoration | formatSymbol }}
                  </div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">楼栋需求：</span>
                  <div class="msg-row-txt">
                    {{ item.buildingNeeds | formatBuildingNeed }}
                  </div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">房间需求：</span>
                  <div class="msg-row-txt">
                    {{ item.roomNeeds | formatRoomNeed }}
                  </div>
                </div>
              </section>
            </div>
            <!-- 买新房、商铺、写字楼 -->
            <div
              class="msg-content"
              v-if="
                item.requireType == 8 ||
                  item.requireType == 16 ||
                  item.requireType == 32
              "
            >
              <section class="msg-row-group">
                <div class="msg-row">
                  <span class="msg-row-title">期望首付：</span>
                  <div
                    class="msg-row-txt"
                    v-if="item.minFirstPrice && item.maxFirstPrice"
                  >
                    {{ item.minFirstPrice | formatMoney }} -
                    {{ item.maxFirstPrice | formatMoney }}万
                  </div>
                  <div class="msg-row-txt" v-else>暂无</div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">期望面积：</span>
                  <div class="msg-row-txt" v-if="item.minArea && item.maxArea">
                    {{ item.minArea || 0 }} - {{ item.maxArea || 0 }}m²
                  </div>
                  <div class="msg-row-txt" v-else>暂无</div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">期望总价：</span>
                  <div
                    class="msg-row-txt"
                    v-if="item.minPrice && item.maxPrice"
                  >
                    {{ item.minPrice | formatMoney }} -
                    {{ item.maxPrice | formatMoney }}万
                  </div>
                  <div class="msg-row-txt" v-else>暂无</div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">购买房型：</span>
                  <div class="msg-row-txt">{{ item.rooms | formatSymbol }}</div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">期望楼层：</span>
                  <div class="msg-row-txt">
                    {{ item.floors | formatFloor }}
                  </div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">付款方式：</span>
                  <div class="msg-row-txt">
                    {{ item.payWay | formatPayWay }}
                  </div>
                </div>
              </section>
              <section class="msg-row-group">
                <div class="msg-row">
                  <span class="msg-row-title">交房类型：</span>
                  <div class="msg-row-txt">
                    {{ item.tradeHouseType | formatHouseType }}
                  </div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">物业类型：</span>
                  <div class="msg-row-txt">
                    {{ item.manageCompanyType | formatCompanyType }}
                  </div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">期望楼盘：</span>
                  <div
                    class="msg-row-txt"
                    v-if="item.community1 || item.community2 || item.community3"
                  >
                    <p v-if="item.community1">
                      {{ item.community1 }}
                    </p>
                    <p v-if="item.community2">
                      {{ item.community2 }}
                    </p>
                    <p v-if="item.community3">
                      {{ item.community3 }}
                    </p>
                  </div>
                  <div class="msg-row-txt" v-else>暂无</div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">购买用途：</span>
                  <div class="msg-row-txt">
                    {{ item.buyDestination || "暂无" }}
                  </div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">期望装修：</span>
                  <div class="msg-row-txt">
                    {{ item.decoration | formatSymbol }}
                  </div>
                </div>
              </section>
            </div>
            <!-- 租赁住宅 -->
            <div class="msg-content" v-show="item.requireType == 64">
              <section class="msg-row-group">
                <div class="msg-row">
                  <span class="msg-row-title">期望租金：</span>
                  <div
                    class="msg-row-txt"
                    v-if="item.minPrice && item.maxPrice"
                  >
                    {{ item.minPrice }} - {{ item.maxPrice }}元
                  </div>
                  <div class="msg-row-txt" v-else>暂无</div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">期望面积：</span>
                  <div class="msg-row-txt" v-if="item.minArea && item.maxArea">
                    {{ item.minArea || 0 }} - {{ item.maxArea || 0 }}m²
                  </div>
                  <div class="msg-row-txt" v-else>暂无</div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">租赁户型：</span>
                  <div class="msg-row-txt">{{ item.rooms | formatSymbol }}</div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">租赁方式：</span>
                  <div class="msg-row-txt">
                    {{ item.rentWay | formatRentWay }}
                  </div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">付款方式：</span>
                  <div class="msg-row-txt">
                    {{ item.payMethod | formatPayMethod }}
                  </div>
                </div>
              </section>
              <section class="msg-row-group">
                <div class="msg-row">
                  <span class="msg-row-title">入住日期：</span>
                  <div class="msg-row-txt">
                    {{ item.moveIntoTime | formatMoveIntoTime }}
                  </div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">期望装修：</span>
                  <div class="msg-row-txt">
                    {{ item.decoration | formatSymbol }}
                  </div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">期望楼层：</span>
                  <div class="msg-row-txt">
                    {{ item.floors | formatFloor }}
                  </div>
                </div>
              </section>
            </div>
            <!-- 租赁商铺 -->
            <div class="msg-content" v-show="item.requireType == 128">
              <section class="msg-row-group">
                <div class="msg-row">
                  <span class="msg-row-title">期望租金：</span>
                  <div
                    class="msg-row-txt"
                    v-if="item.minPrice && item.maxPrice"
                  >
                    {{ item.minPrice }} - {{ item.maxPrice }}元
                  </div>
                  <div class="msg-row-txt" v-else>暂无</div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">期望面积：</span>
                  <div class="msg-row-txt" v-if="item.minArea && item.maxArea">
                    {{ item.minArea || 0 }} - {{ item.maxArea || 0 }}m²
                  </div>
                  <div class="msg-row-txt" v-else>暂无</div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">期望单价：</span>
                  <div
                    class="msg-row-txt"
                    v-if="item.minUnitPrice && item.maxUnitPrice"
                  >
                    {{ item.minUnitPrice }} - {{ item.maxUnitPrice }}元
                  </div>
                  <div class="msg-row-txt" v-else>暂无</div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">附属设施：</span>
                  <div class="msg-row-txt">
                    {{ item.facilitys | formatFacility }}
                  </div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">其他需求：</span>
                  <div class="msg-row-txt">
                    {{ item.otherNeeds | formatOtherNeed }}
                  </div>
                </div>
              </section>
              <section class="msg-row-group">
                <div class="msg-row">
                  <span class="msg-row-title">期望装修：</span>
                  <div class="msg-row-txt">
                    {{ item.decoration | formatSymbol }}
                  </div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">商铺类型：</span>
                  <div class="msg-row-txt">
                    {{ item.shopTypes | formatShopType }}
                  </div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">商铺用途：</span>
                  <div class="msg-row-txt">
                    {{ item.shopUses | formatShopUse }}
                  </div>
                </div>
              </section>
            </div>
            <!-- 租赁写字楼 -->
            <div class="msg-content" v-show="item.requireType == 256">
              <section class="msg-row-group">
                <div class="msg-row">
                  <span class="msg-row-title">期望租金：</span>
                  <div
                    class="msg-row-txt"
                    v-if="item.minPrice && item.maxPrice"
                  >
                    {{ item.minPrice }} - {{ item.maxPrice }}元
                  </div>
                  <div class="msg-row-txt" v-else>暂无</div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">期望面积：</span>
                  <div class="msg-row-txt" v-if="item.minArea && item.maxArea">
                    {{ item.minArea || 0 }} - {{ item.maxArea || 0 }}m²
                  </div>
                  <div class="msg-row-txt" v-else>暂无</div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">期望单价：</span>
                  <div
                    class="msg-row-txt"
                    v-if="item.minUnitPrice && item.maxUnitPrice"
                  >
                    {{ item.minUnitPrice }} - {{ item.maxUnitPrice }}元
                  </div>
                  <div class="msg-row-txt" v-else>暂无</div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">期望商圈：</span>
                  <div class="msg-row-txt">
                    {{ item.businessCircle | formatSymbol }}
                  </div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">楼栋需求：</span>
                  <div class="msg-row-txt">
                    {{ item.buildingNeeds | formatBuildingNeed }}
                  </div>
                </div>
              </section>
              <section class="msg-row-group">
                <div class="msg-row">
                  <span class="msg-row-title">期望装修：</span>
                  <div class="msg-row-txt">
                    {{ item.decoration | formatSymbol }}
                  </div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">房间需求：</span>
                  <div class="msg-row-txt">
                    {{ item.roomNeeds | formatRoomNeed }}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="推荐房源" name="recommend" class="align">
          <img src="../../../../assets/images/inDevelopment.png" alt="" />
        </el-tab-pane>
        <el-tab-pane label="客源解读" name="unscramble" class="align">
          <img src="../../../../assets/images/inDevelopment.png" alt="" />
        </el-tab-pane>
        <el-tab-pane label="合作信息" name="cooperation" class="align">
          <img src="../../../../assets/images/inDevelopment.png" alt="" />
        </el-tab-pane>
      </el-tabs>
    </template>
    <!-- 多选弹出层 -->
    <demand-more-select
      ref="moreSelect"
      styleType="0"
      :visible.sync="moreSelectFlag"
      width="506px"
      title="选择需求信息(多选)"
      @demandConfirm="demandConfirm"
      v-model="demandValueData"
      :isDisabled="true"
      data-vv-name="moreSelect"
      data-vv-as="需求信息"
      v-validate="'required|arrFlatLength:0'"
    >
    </demand-more-select>
  </div>
</template>

<script>
import { division } from "../../../../util/accurateComputeUtil";
import demandMoreSelect from "../../addCustomers/components/demandMoreSelect";
export default {
  inject: [
    "demand",
    "demandList",
    "customer",
    "permissionList",
    "demandValue",
    "customerId",
    "attentionStatus",
    "plate"
  ],
  data() {
    return {
      moreSelectFlag: false,
      changeTabsValue: "0",
      demandTabsValue: "demand",
      demandValueList: this.demandValue,
      requireType: null
    };
  },
  components: { demandMoreSelect },
  filters: {
    /**
     * @example: 金额除以1万
     */
    formatMoney(val) {
      return division(val, 10000);
    },
    /**
     * @example: 格式化付款方式
     */
    formatPayWay(val) {
      switch (val) {
        case 1:
          return "一次性";
        case 2:
          return "商业贷款";
        case 4:
          return "公积金贷款";
        case 8:
          return "组合贷款";
        default:
          return "暂无";
      }
    },
    /**
     * @example: 格式化$符号改成，
     */
    formatSymbol(val) {
      if (val) {
        return val.replace(/\$/g, ",");
      } else {
        return "暂无";
      }
    },
    /**
     * @example: 格式化期望楼层
     */
    formatFloor(val) {
      if (val.length > 0) {
        let arr = [];
        val.forEach(item => {
          switch (item) {
            case 1:
              arr.push("低楼层");
              break;
            case 2:
              arr.push("中楼层");
              break;
            case 4:
              arr.push("高楼层");
              break;
            case 8:
              arr.push("不要一楼");
              break;
            case 16:
              arr.push("不要顶楼");
              break;
          }
        });
        return arr.toString();
      } else {
        return "暂无";
      }
    },
    /**
     * @example: 格式化商铺类型
     */
    formatShopType(val) {
      if (val.length > 0) {
        let arr = [];
        val.forEach(item => {
          switch (item) {
            case 1:
              arr.push("临街店面");
              break;
            case 2:
              arr.push("写字楼配套");
              break;
            case 4:
              arr.push("档口摊位");
              break;
            case 8:
              arr.push("其他");
              break;
          }
        });
        return arr.toString();
      } else {
        return "暂无";
      }
    },
    /**
     * @example: 格式化商铺用途
     */
    formatShopUse(val) {
      if (val.length > 0) {
        let arr = [];
        val.forEach(item => {
          switch (item) {
            case 1:
              arr.push("餐饮");
              break;
            case 2:
              arr.push("休闲娱乐");
              break;
            case 4:
              arr.push("生活服务");
              break;
            case 8:
              arr.push("零售");
              break;
            case 16:
              arr.push("批发");
              break;
            case 32:
              arr.push("酒店宾馆");
              break;
            case 64:
              arr.push("汽车服务");
              break;
            case 128:
              arr.push("美容美发");
              break;
            case 256:
              arr.push("其他");
              break;
          }
        });
        return arr.toString();
      } else {
        return "暂无";
      }
    },
    /**
     * @example: 格式化附属设施
     */
    formatFacility(val) {
      if (val.length > 0) {
        let arr = [];
        val.forEach(item => {
          switch (item) {
            case 1:
              arr.push("可明火");
              break;
            case 2:
              arr.push("可外摆");
              break;
            case 4:
              arr.push("停车位");
              break;
            case 8:
              arr.push("天然气");
              break;
            case 16:
              arr.push("网络");
              break;
            case 32:
              arr.push("中央空调");
              break;
            case 64:
              arr.push("其他");
              break;
          }
        });
        return arr.toString();
      } else {
        return "暂无";
      }
    },
    /**
     * @example: 格式化其他需求
     */
    formatOtherNeed(val) {
      if (val.length > 0) {
        let arr = [];
        val.forEach(item => {
          switch (item) {
            case 1:
              arr.push("面积大");
              break;
            case 2:
              arr.push("层高大");
              break;
            case 4:
              arr.push("临街");
              break;
            case 8:
              arr.push("空铺");
              break;
            case 16:
              arr.push("其他");
              break;
          }
        });
        return arr.toString();
      } else {
        return "暂无";
      }
    },
    /**
     * @example: 格式化楼栋
     */
    formatBuildingNeed(val) {
      if (val.length > 0) {
        let arr = [];
        val.forEach(item => {
          switch (item) {
            case 1:
              arr.push("知名物业");
              break;
            case 2:
              arr.push("带客梯");
              break;
            case 4:
              arr.push("带货梯");
              break;
            case 8:
              arr.push("其他");
              break;
          }
        });
        return arr.toString();
      } else {
        return "暂无";
      }
    },
    /**
     * @example: 格式化房间
     */
    formatRoomNeed(val) {
      if (val.length > 0) {
        let arr = [];
        val.forEach(item => {
          switch (item) {
            case 1:
              arr.push("可注册公司");
              break;
            case 2:
              arr.push("有老板间");
              break;
            case 4:
              arr.push("有会议室");
              break;
            case 8:
              arr.push("带办公家具");
              break;
            case 16:
              arr.push("带停车位");
              break;
            case 32:
              arr.push("其他");
              break;
          }
        });
        return arr.toString();
      } else {
        return "暂无";
      }
    },
    /**
     * @example: 格式化交房类型
     */
    formatHouseType(val) {
      switch (val) {
        case 0:
          return "不限";
        case 1:
          return "期房";
        case 2:
          return "现房";
        default:
          return "暂无";
      }
    },
    /**
     * @example: 格式化物业类型
     */
    formatCompanyType(val) {
      switch (val) {
        case 1:
          return "普通住宅";
        case 2:
          return "别墅";
        case 4:
          return "商铺";
        case 8:
          return "写字楼";
        case 16:
          return "其他";
        default:
          return "暂无";
      }
    },
    /**
     * @example: 格式化租赁方式
     */
    formatRentWay(val) {
      switch (val) {
        case 0:
          return "不限";
        case 1:
          return "合租";
        case 2:
          return "整租";
        default:
          return "暂无";
      }
    },
    /**
     * @example: 格式化租赁付款方式
     */
    formatPayMethod(val) {
      switch (val) {
        case 0:
          return "不限";
        case 1:
          return "月付";
        case 2:
          return "季付";
        case 3:
          return "半年付";
        case 4:
          return "年付";
        default:
          return "暂无";
      }
    },
    /**
     * @example: 格式化租赁入住时间
     */
    formatMoveIntoTime(val) {
      if (val) {
        let time = val.split(" ");
        return time[0];
      } else {
        return "暂无";
      }
    }
  },
  created() {
    // this.$set(this.$data, "demandValueData", this.demandValue);
  },
  computed: {
    demandValueData: {
      get() {
        return this.demandValueList;
      },
      set(val) {
        this.demandValueList = val;
      }
    }
  },
  methods: {
    /**
     * @example: tabs点击事件
     */
    handleClick(e) {
      this.demandTabsValue = "demand";
      this.requireType = this.demandList.data[e.index].requireType;
      console.log(this.requireType);
    },
    demandConfirm() {
      this.$store.commit("updateDemandValue", this.demandValueData);
      let query = {
        customerId: btoa(this.customerId),
        step: 2
      };
      if (this.requireType) {
        query.require = this.requireType;
      }
      this.$router.push({
        path: "/customers/editCustomers",
        query: query
      });
    }
  }
};
</script>

<style lang="less" scoped>
.demand-box {
  padding: 24px;
  margin-top: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  position: relative;
  .demand-btn {
    display: inline-block;
    font-size: @font16;
    color: #fff;
    background: @backgroud;
    border-radius: 4px;
    padding: 8px 16px;
    position: absolute;
    right: 24px;
    z-index: 10;
    cursor: pointer;
  }
  .demand-tabs {
    margin-bottom: 9px;
    width: 960px;
    /deep/ .el-tabs__item {
      margin-bottom: 15px;
      font-size: @font18;
      font-weight: bold;
    }
  }
  .infor-tabs {
    /deep/ .el-tabs__item {
      font-size: @font16;
      //prettier-ignore
      line-height: 48PX;
      height: auto;
      border: none;
      border-radius: 4px;
      margin-right: 16px;
      background: #f0f2f5;
      color: #909399;
    }
    /deep/ .el-tabs__item.is-active {
      background: @backgroud;
      color: #fff;
    }
    .demand-msg {
      .msg-title {
        display: flex;
        align-items: flex-end;
        padding-bottom: 40px;
        padding-top: 10px;
        font-size: @font14;
        .msg-headline {
          margin-right: 8px;
          font-size: @font24;
          color: #303133;
          font-weight: bold;
        }
        .msg-time {
          color: #606266;
        }
        .msg-update {
          margin-left: auto;
          color: @backgroud;
          cursor: pointer;
        }
      }
      .msg-content {
        display: flex;
        .msg-row-group {
          flex: 0.5;
          &:first-child {
            margin-right: 48px;
          }
          .msg-row {
            display: flex;
            flex: 0.5;
            //prettier-ignore
            font-size: @font16;
            margin-bottom: 33px;
            .msg-row-title {
              // width: 220px;
              display: inline-block;
              color: #606266;
            }
            .msg-row-txt {
              width: 380px;
              text-align: right;
              display: inline-block;
              margin-left: auto;
              color: #303133;
              p {
                text-align: right;
              }
            }
          }
        }
      }
    }
  }
  /deep/ .el-tabs--card > .el-tabs__header {
    border-bottom: none;
  }
  /deep/ .el-tabs--card > .el-tabs__header .el-tabs__nav {
    border: none;
  }
  /deep/ .el-tabs__item.is-active {
    color: @backgroud;
  }
}
.align {
  text-align: center;
}
</style>
