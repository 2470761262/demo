<script>
import otherIframe from "@/pages/buySellSystem/otherIframe/otherIframe";
import rouetTabsArray from "./routerTabJs/index";
export default {
  name: "customersIframe",
  extends: otherIframe,
  data() {
    return {
      activeChild: "/customersSystem/allCustomers", //默认显示的路径 tabs路径
      routerTab: rouetTabsArray
    };
  }
};
</script>
