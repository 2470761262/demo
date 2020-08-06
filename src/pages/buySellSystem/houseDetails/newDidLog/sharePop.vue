<style lang="less" scoped>
#shareQrCode {
  width: fit-content;
  // prettier-ignore
  margin: 20PX auto;
  img {
    width: 300px;
    height: 300px;
  }
}
#shareTxt {
  text-align: center;
  color: #e3726c;
}
</style>
<template>
  <fixedPopup v-bind="$attrs" v-on="$listeners">
    <template>
      <div id="shareQrCode">
        <img :src="shareUrl" />
      </div>
      <div id="shareTxt">微信扫一扫,立即分享房源</div>
    </template>
  </fixedPopup>
</template>
<script>
import { mapState } from "vuex";
//二维码
import QRCode from "qrcodejs2";
export default {
  props: {
    shareUrl: {
      type: String
    }
  },
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
          console.log("==============>", this.shareUrl);
          // new QRCode("shareQrCode", {
          //   width: 200,
          //   height: 200,
          //   text: val.shareQRCode,
          //   colorDark: "#000",
          //   colorLight: "#fff"
          // });
        });
      }
    }
  },
  methods: {}
};
</script>
