<style lang="less" scoped>
.basics-content {
  .content-title {
    font-size: 22px;
    margin-bottom: 35px;
  }
  .basics-layout-content {
    font-size: 18px;
    display: flex;
    flex-wrap: wrap;
    .basics-layout-item {
      flex: 0 0 50%;
      display: flex;
      margin-top: 33px;
      &:nth-child(-n + 2) {
        margin-top: 0;
      }
      &:nth-child(2n) {
        .basics-layout-item-title {
          text-indent: 50px;
        }
        .basics-layout-item-message {
          text-indent: 30px;
        }
      }
      .basics-layout-item-title {
        width: 160px;
        color: #b4b4b4;
      }
      .basics-layout-item-message {
        flex: 1;
        width: 0;
      }
    }
  }
}
</style>
<template>
  <section class="basics-content">
    <h3 class="content-title">基础信息</h3>
    <div class="basics-layout-content">
      <div class="basics-layout-item">
        <div class="basics-layout-item-title">客户籍贯</div>
        <div class="basics-layout-item-message" v-html="detail.areaId || kong">
          新罗区
        </div>
      </div>
      <div class="basics-layout-item">
        <div class="basics-layout-item-title">客户来源</div>
        <div class="basics-layout-item-message" v-html="detail.source || kong">
          鑫家网
        </div>
      </div>
      <div class="basics-layout-item">
        <div class="basics-layout-item-title">期望面积</div>
        <div class="basics-layout-item-message" v-html="detail.hopeArea">
          1-1平
        </div>
      </div>
      <div class="basics-layout-item">
        <div class="basics-layout-item-title">首付金额</div>
        <div class="basics-layout-item-message" v-html="detail.hopeFirtPay">
          1-1
        </div>
      </div>
      <div class="basics-layout-item">
        <div class="basics-layout-item-title">期望总价</div>
        <div class="basics-layout-item-message" v-html="detail.hopeAllPay">
          1-1万
        </div>
      </div>
      <div class="basics-layout-item">
        <div class="basics-layout-item-title">付款方式</div>
        <div class="basics-layout-item-message">
          未填写
        </div>
      </div>
      <div class="basics-layout-item">
        <div class="basics-layout-item-title">
          购买户型
        </div>
        <div class="basics-layout-item-message" v-html="detail.rooms || kong">
          3房
        </div>
      </div>
      <div class="basics-layout-item">
        <div class="basics-layout-item-title">装修需求</div>
        <div
          class="basics-layout-item-message"
          v-html="detail.decoration || kong"
        >
          毛坯
        </div>
      </div>
      <div class="basics-layout-item">
        <div class="basics-layout-item-title">期望小学</div>
        <div class="basics-layout-item-message" v-html="detail.school1 || kong">
          未填写
        </div>
      </div>
      <div class="basics-layout-item">
        <div class="basics-layout-item-title">期望中学</div>
        <div class="basics-layout-item-message" v-html="detail.school2 || kong">
          未填写
        </div>
      </div>
      <div class="basics-layout-item">
        <div class="basics-layout-item-title">上次带看</div>
        <div
          class="basics-layout-item-message"
          v-html="detail.lastPairFollowTime || kong"
        >
          2020-03-01
        </div>
      </div>
      <div class="basics-layout-item">
        <div class="basics-layout-item-title">录入时间</div>
        <div class="basics-layout-item-message" v-html="detail.addTime || kong">
          2020-01-01
        </div>
      </div>
      <div class="basics-layout-item">
        <div class="basics-layout-item-title">录入人</div>
        <div class="basics-layout-item-message" v-html="detail.addName || kong">
          钟丽娟
        </div>
      </div>
      <div class="basics-layout-item">
        <div class="basics-layout-item-title">PASS方</div>
        <div
          class="basics-layout-item-message"
          v-html="detail.passOwnerName || kong"
        >
          暂无
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      kong: "未填写"
    };
  },
  // watch:{
  //   detail: {
  //     immediate: true,
  //     deep: true,
  //     handler(newValue) {

  //     }
  // },
  computed: {
    ...mapState({
      detail: value => {
        const kong = "未填写";
        const kongValue = 1;
        let dc = value.customers.detail.cusDetail;
        //因为detail会在数据没有加进去时就运行一次，所以第一次必然为空，会报错,因此要做一个非空判断，非空再来做操作
        if (dc) {
          dc = dc.data;
          //期望面积
          if (dc.minArea == null) {
            dc.minArea = kongValue;
          }
          if (dc.maxArea == null) {
            dc.maxArea = kong;
          }
          dc.hopeArea = dc.minArea + "-" + dc.maxArea + "平";
          console.log("basic---------------", dc.hopeArea);
          //首付金额
          if (dc.minFirstPrice == null) {
            dc.minFirstPrice = kongValue;
          }
          if (dc.maxFirstPrice == null) {
            dc.maxFirstPrice = kongValue;
          }
          dc.hopeFirtPay = dc.minFirstPrice + "-" + dc.maxFirstPrice + "万";

          //期望总价
          if (dc.minPrice == null) {
            dc.minPrice = kong;
          }
          if (dc.maxPrice == null) {
            dc.maxPrice = kong;
          }
          dc.hopeAllPay = dc.minPrice + "-" + dc.maxPrice + "万";
          let reg = new RegExp("\\$", "g");
          //装修需求
          if (dc.decoration) {
            if (dc.decoration.indexOf("$") != -1) {
              dc.decoration = dc.decoration.replace(reg, ",");
              dc.decoration = dc.decoration.substr(0, dc.decoration.length - 1);
            }
          }

          //购买户型
          if (dc.rooms) {
            if (dc.rooms.indexOf("$") != -1) {
              dc.rooms = dc.rooms.replace(reg, ",");
              dc.rooms = dc.rooms.substr(0, dc.rooms.length - 1);
            }
          }
          if (dc.school1) {
            //期望中学
            if (dc.school1.indexOf("$") != -1) {
              dc.school1 = dc.school1.replace(reg, ",");
              dc.school1 = dc.school1.substr(0, dc.school1.length - 1);
            }
          }
          if (dc.school2) {
            //期望小学
            if (dc.school2.indexOf("$") != -1) {
              dc.school2 = dc.school2.replace(reg, ",");
              dc.school2 = dc.school2.substr(0, dc.school2.length - 1);
            }
          }
          //上次带看
          if (dc.lastPairFollowTime)
            dc.lastPairFollowTime = moment(dc.lastPairFollowTime).format(
              "YYYY-MM-DD"
            );
          //录入时间
          if (dc.addTime) dc.addTime = moment(dc.addTime).format("YYYY-MM-DD");
        }

        return dc ? dc : {};
      }
    })
  },
  mounted() {},
  methods: {
    init() {}
  }
};
</script>
