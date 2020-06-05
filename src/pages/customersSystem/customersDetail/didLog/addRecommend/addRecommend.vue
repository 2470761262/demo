<style lang="less" scoped></style>
<template>
  <fixed-popup v-bind="$attrs" v-on="$listeners" @confirmEmit="confirmEmit">
    <section>
      <query-content @reset="reset"></query-content>
    </section>
    <section>
      <render-query @change="checkChange"></render-query>
    </section>
  </fixed-popup>
</template>

<script>
import queryContent from "./queryContent";
import renderQuery from "./renderQuery";
import { mapState } from "vuex";
export default {
  provide() {
    return {
      form: this.form
    };
  },
  components: {
    queryContent,
    renderQuery
  },
  data() {
    return {
      form: {
        searchInfo: "",
        communityName: "", //楼盘名
        cbNo: "", //楼栋号
        roomNumber: "", //房间号
        comId: "",
        cbId: "",
        roomNo: "",
        minFloor: "",
        maxFloor: "",
        minInArea: "",
        maxInArea: "",
        minPrice: "",
        maxPrice: "",
        business: [], //商圈
        houseType: [], //房型
        renovation: [], //装修
        purpose: [], //房源用途
        face: [], //朝向
        primarySchool: [], //小学划片
        middleSchool: [], //中学划片
        isOnly: "", //是否独家
        isKey: "" //钥匙
      },
      houseCheckItem: []
    };
  },
  computed: {
    ...mapState({
      detail: value => {
        return value.customers.detail.cusDetail.data;
      }
    })
  },
  methods: {
    /**
     * @example: 推荐房源checkChange
     */
    checkChange(item) {
      this.houseCheckItem = item;
    },
    reset() {
      Object.assign(this.$data.form, this.$options.data.call(this).form);
    },
    confirmEmit() {
      if (this.houseCheckItem.length === 0) {
        this.$message.warning("请勾选一条需要推荐的房源");
        return;
      }
      let {
        communityName,
        houseNo,
        price,
        inArea,
        id,
        hall,
        rooms,
        toilet
      } = this.houseCheckItem[0];

      let mergeParams = {
        customerName: this.detail.customers,
        customerId: this.detail.id, //客户id
        communityName,
        houseRoom: rooms,
        houseHall: hall,
        houseToilet: toilet,
        housePrice: price,
        houseNo,
        houseArea: inArea,
        houseId: id
      };

      //合并用户数据和房源数据
      //   let mergeParams = Object.assign(
      //     {},
      //     { customerName: "杨先生", customerId: 0 },
      //     this.houseCheckItem[0]
      //   );
      console.log(mergeParams, "添加推荐参数");
      this.$api
        .post({
          url: "/saleCustomerRecommend/recommendHouse",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: mergeParams
        })
        .then(e => {
          let result = e.data;
          console.log(result);
          this.$message({
            type: "info",
            message: result.message
          });
          if (result.code == 200) {
            console.log("推荐成功");
          }
        })
        .catch(e => {
          console.log("【【【【uups,推荐房源失败】】】】");
          console.log(e);
        });
    }
  }
};
</script>
