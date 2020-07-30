<style lang="less" scoped>
@import "../newLess/cardContent";
.maintain-content {
  .card-content;
  .card-message-title {
    .card-message-title;
  }
  .card-message-cell {
    .card-message-cell;
  }
}
</style>
<template>
  <section class="maintain-content">
    <div class="card-head">
      <h3 class="card-head-title">维护信息</h3>
      <span class="card-head-tips"
        >上次更新: {{ houseData.UpdateTime | emptyRead }}</span
      >
    </div>
    <div class="card-message-content">
      <h3 class="card-message-title">价格信息</h3>
      <!-- 上次交易时间 & 付款要求 -->
      <div class="card-message-cell">
        <div class="card-message-item">
          <div class="card-item-title">上次交易时间</div>
          <div class="card-item-data">
            {{ houseData.IsTwoYears | emptyRead }}
          </div>
        </div>
        <div class="card-message-item">
          <div class="card-item-title">付款要求</div>
          <div class="card-item-data">一次性付款</div>
        </div>
      </div>
      <!-- 上次交易金额 & 是否唯一住房 -->
      <div class="card-message-cell">
        <div class="card-message-item">
          <div class="card-item-title">上次交易金额</div>
          <div class="card-item-data">
            {{ houseData.LastTransactionAmount | emptyRead("万") }}
          </div>
        </div>
        <div class="card-message-item">
          <div class="card-item-title">是否唯一住房</div>
          <div class="card-item-data">不唯一</div>
        </div>
      </div>
      <!-- 抵押情况 -->
      <div class="card-message-cell">
        <div class="card-message-item">
          <div class="card-item-title">抵押情况</div>
          <div class="card-item-data">{{ pledgeMessage }}</div>
        </div>
      </div>

      <h3 class="card-message-title section-spilit">价格信息</h3>
      <!-- 房屋用途 & 房屋现状 -->
      <div class="card-message-cell">
        <div class="card-message-item">
          <div class="card-item-title">房屋用途</div>
          <div class="card-item-data">
            {{ houseData.buildtype | emptyRead }}
          </div>
        </div>
        <div class="card-message-item">
          <div class="card-item-title">房屋现状</div>
          <div class="card-item-data">
            {{
              houseData.HousingSituation
                | mapFilter("HOUSINGSITUATION")
                | emptyRead
            }}
          </div>
        </div>
      </div>
      <!-- 装修情况 & 附属配套 -->
      <div class="card-message-cell">
        <div class="card-message-item">
          <div class="card-item-title">装修情况</div>
          <div class="card-item-data">
            {{ houseData.Decoration | emptyRead }}
          </div>
        </div>
        <div class="card-message-item">
          <div class="card-item-title">附属配套</div>
          <div class="card-item-data">
            {{ houseData.HouseBelong | mapFilter("HOUSEBELONG") | emptyRead }}
          </div>
        </div>
      </div>
      <!-- 小学划片 & 小学占用 -->
      <div class="card-message-cell">
        <div class="card-message-item">
          <div class="card-item-title">小学划片</div>
          <div class="card-item-data">
            {{ houseData.primarySchool | emptyRead }}
          </div>
        </div>
        <div class="card-message-item">
          <div class="card-item-title">小学占用</div>
          <div class="card-item-data">
            {{
              houseData.primarySchoolGrade
                | mapFilter("PRIMARYSCHOOLUSE", "未占用")
            }}
          </div>
        </div>
      </div>
      <!-- 中学划片 & 中学占用 -->
      <div class="card-message-cell">
        <div class="card-message-item">
          <div class="card-item-title">中学划片</div>
          <div class="card-item-data">
            {{ houseData.middleSchool | emptyRead }}
          </div>
        </div>
        <div class="card-message-item">
          <div class="card-item-title">中学占用</div>
          <div class="card-item-data">
            {{
              houseData.middleSchoolGrade
                | mapFilter("MIDDLESCHOOLUSE", "未占用")
            }}
          </div>
        </div>
      </div>
      <!-- 户口情况 & 房屋占用 -->
      <div class="card-message-cell">
        <div class="card-message-item">
          <div class="card-item-title">户口占用</div>
          <div class="card-item-data">
            {{ houseData.sign | mapFilter("SIGN") | emptyRead }}
          </div>
        </div>
        <div class="card-message-item">
          <div class="card-item-title">房屋证件</div>
          <div class="card-item-data">
            {{
              houseData.certificateType
                | mapFilter("CERTIFICATETYPE")
                | emptyRead
            }}
          </div>
        </div>
      </div>
      <!-- 挂牌时间 -->
      <div class="card-message-cell">
        <div class="card-message-item">
          <div class="card-item-title">挂牌时间</div>
          <div class="card-item-data">{{ AddTime }}</div>
        </div>
      </div>
      <h3 class="card-message-title section-spilit">特色信息</h3>
      <!-- 特色信息 & 物业公司 -->
      <div class="card-message-cell">
        <div class="card-message-item">
          <div class="card-item-title">电梯配套</div>
          <div class="card-item-data">
            {{ houseData.Elevator | mapFilter("ISELEVATOR") | emptyRead }}
          </div>
        </div>
        <div class="card-message-item">
          <div class="card-item-title">物业公司</div>
          <div class="card-item-data">
            {{ houseData.propertyCompany | emptyRead }}
          </div>
        </div>
      </div>
      <!-- 产权性质 & 土地性质 -->
      <div class="card-message-cell">
        <div class="card-message-item">
          <div class="card-item-title">产权性质</div>
          <div class="card-item-data">
            {{ houseData.HouseProperty | emptyRead }}
          </div>
        </div>
        <div class="card-message-item">
          <div class="card-item-title">土地性质</div>
          <div class="card-item-data">
            {{
              houseData.LandCharacteristic
                | mapFilter("LANDCHARACTERISTIC")
                | emptyRead
            }}
          </div>
        </div>
      </div>
      <!-- 户型结构 & 房屋结构 -->
      <div class="card-message-cell">
        <div class="card-message-item">
          <div class="card-item-title">户型结构</div>
          <div class="card-item-data">
            {{ houseData.FamilyStructure | mapFilter("ROOMTYPE") | emptyRead }}
          </div>
        </div>
        <div class="card-message-item">
          <div class="card-item-title">房屋结构</div>
          <div class="card-item-data">
            {{ houseData.BuildingStructure | emptyRead }}
          </div>
        </div>
      </div>
      <!-- 竣工时间 -->
      <div class="card-message-cell">
        <div class="card-message-item">
          <div class="card-item-title">竣工时间</div>
          <div class="card-item-data">{{ BuildingTime }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import util from "@/util/util";
export default {
  filters: {
    mapFilter(value, ListName, resultValue = null) {
      return util.countMapFilter(value, ListName, resultValue);
    }
  },
  computed: {
    ...mapState({
      houseData: state => state.houseDateil.houseData
    }),
    //挂牌时间
    AddTime() {
      if (this.houseData.AddTime !== null) {
        return `${util.format(this.houseData.AddTime, "yyyy-MM-dd")}`;
      }
      return "暂无";
    },
    /**
     * @example: 竣工时间
     */
    BuildingTime() {
      if (this.houseData.BuildingTime !== null) {
        return `${util.format(this.houseData.AddTime, "yyyy")}年`;
      }
      return "暂无";
    },
    //抵押情况
    pledgeMessage() {
      let {
        mortgage, //抵押
        mortgageLoanBank, //银行
        subbranch, //支行
        balance, //余贷
        monthlyMortgage //月供
      } = this.houseData;
      //
      return mortgage == 0
        ? "未抵押"
        : [
            {
              value: "有抵押",
              suffix: ""
            },
            {
              value: mortgageLoanBank,
              suffix: "",
              transform: "MORTGAGEBANK"
            },
            {
              value: subbranch,
              suffix: ""
            },
            {
              value: balance,
              suffix: "万"
            },
            {
              value: monthlyMortgage,
              suffix: "元"
            }
          ]
            // 第一种 后面无逗号
            // .map(item => {
            //   if (item.transform) {
            //     return {
            //       ...item,
            //       value: this.$options.filters.mapFilter(
            //         item.value,
            //         item.transform
            //       )
            //     };
            //   }
            //   return item;
            // })
            // .filter(item => item.value != null)
            // .map(item => item.value + item.suffix)
            // .join(",");
            //第二种 后面有逗号
            .map(item => {
              if (item.transform) {
                return this.$options.filters.mapFilter(
                  item.value,
                  item.transform
                );
              }
              if (item.value == null) {
                return item.suffix;
              }
              return item.value + item.suffix;
            })
            .join(",")
            .replace(",万", ",")
            .replace(",,", ",");
    }
  }
};
</script>
