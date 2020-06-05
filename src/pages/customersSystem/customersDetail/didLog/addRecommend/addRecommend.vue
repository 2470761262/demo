<style lang="less" scoped></style>
<template>
  <fixed-popup v-bind="$attrs" v-on="$listeners" @confirmEmit="confirmEmit">
    <section>
      <query-content @reset="reset"></query-content>
    </section>
    <section>
      <render-query></render-query>
    </section>
  </fixed-popup>
</template>

<script>
import queryContent from "./queryContent";
import renderQuery from "./renderQuery";
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
      }
    };
  },
  methods: {
    reset() {
      Object.assign(this.$data.form, this.$options.data.call(this).form);
    },
    confirmEmit(done) {
      // this.$emit("transmitConfirm");
    }
  }
};
</script>
