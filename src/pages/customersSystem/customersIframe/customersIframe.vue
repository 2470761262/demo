<script>
import otherIframe from "@/pages/buySellSystem/otherIframe/otherIframe";
import rouetTabsArray from "./routerTabJs/index";
import setImpression from "@/util/tabUtil";
export default {
  name: "customersIframe",
  extends: otherIframe,
  data() {
    return {
      activeChild: "/customersSystem/allCustomers", //默认显示的路径 tabs路径
      routerTab: rouetTabsArray
    };
  },
  created() {
    setImpression.agencyImpressionClick();
  },
  destroyed() {
    setImpression.removeImpressionClick();
  }
};
</script>
