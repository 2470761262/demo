<script>
import exploration from "@/pages/buySellSystem/addHouse/components/exploration";

export default {
  data() {
    return {
      isHouseDetailOpen: true,
      id: this.$attrs.houseId
    };
  },
  extends: exploration
};
</script>
