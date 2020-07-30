<style lang="less" scoped>
#shareQrCode {
  width: fit-content;
  // prettier-ignore
  margin: 20PX auto;
}
</style>
<template>
  <fixedPopup v-bind="$attrs" v-on="$listeners">
    <template>
      <div id="shareQrCode"></div>
    </template>
  </fixedPopup>
</template>
<script>
import { mapState } from "vuex";
//二维码
import QRCode from "qrcodejs2";
export default {
  computed: {
    ...mapState({
      houseData: state => state.houseDateil.houseData
    })
  },
  watch: {
    houseData: {
      immediate: true,
      handler: function(val, oldVal) {
        this.$nextTick(() => {
          new QRCode("shareQrCode", {
            width: 200,
            height: 200,
            text: val.shareQRCode,
            colorDark: "#000",
            colorLight: "#fff"
          });
        });
      }
    }
  }
};
</script>
