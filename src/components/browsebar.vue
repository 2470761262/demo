<style lang="less" scoped>
.browse-nav-content {
  top: 458px;
  position: absolute;
  right: 10%;
  transform: translateX(calc(100% + 1px));
  display: flex;
  z-index: 9999;
  flex-direction: column;
  > button:last-child {
    margin-left: 0;
  }
}
</style>
<template>
  <div class="browse-nav-content" v-if="browse.id">
    <el-button @click="browsePage('last')" v-if="browse.last"
      >上一套
    </el-button>
    <el-button @click="browsePage('next')" v-if="browse.next">下一套</el-button>
  </div>
</template>

<script>
import util from "@/util/util";
export default {
  props: {
    browse: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  mounted() {},
  destroyed() {},
  methods: {
    browsePage(direct) {
      let that = this;
      let url = "/house/browse/near";
      let param = {
        id: this.browse.id,
        topTime: this.browse.topTime,
        direct: direct
      };
      this.$api
        .post({
          url: url,
          data: param,
          qs: true
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            console.log("浏览记录添加成功");
            let item = result.data;
            if (!item) {
              that.browse[direct] = 0;
              that.$message.error("当前已到最后一套！");
              return;
            }
            that.$message.success((direct==="next"?'下一套':'上一套')+"加载成功！")
            let browseLog = { id: item.id, topTime: item.topTime };
            browseLog[direct] = item.total;
            that.browse.id = browseLog.id;
            that.browse.topTime = browseLog.topTime;
            that.browse[direct] = browseLog[direct];
            util.sessionLocalStorageSet("houseDetails:browse", that.browse);

            if (item.Type == 1) {
              //楼盘情况
              console.log(
                "进入我的跟单房源详情 /buySellSystem/houseDetails/" +
                  item.HouseId
              );
              that.$router.push({
                name: "houseDetails",
                params: {
                  houseId: item.HouseId,
                  browse: browseLog,
                  key: new Date()
                }
              });
            } else if (item.Type == 2) {
              //楼盘情况
              console.log(
                "进入店公共盘房源详情 /buySellSystem/houseDetails/" +
                  item.HouseId
              );
              that.$router.push({
                // path: "/buySellSystem/houseDetails/" + new Date(),
                name: "houseDetails",
                params: {
                  houseId: item.HouseId,
                  browse: browseLog,
                  key: new Date()
                }
              });
            } else if (item.Type == 3) {
              //楼盘情况
              console.log(
                "进入在售无跟单房源详情 /buySellSystem/houseDetails/" +
                  item.HouseId
              );
              that.$router.push({
                // path: "/buySellSystem/houseDetails/" + new Date(),
                name: "houseDetails",
                params: {
                  houseId: item.HouseId,
                  browse: browseLog,
                  key: new Date()
                }
              });
            } else if (item.Type == 4) {
              console.log("进入暂不售房源详情");
              that.$router.push({
                // path: "/buySellSystem/historyDetails/" + new Date(),
                name: "historyDetails",
                params: {
                  houseId: item.HouseId,
                  housePageType: "notSale",
                  browse: browseLog,
                  key: new Date()
                }
              });
            } else if (item.Type == 5) {
              console.log("进入楼盘详情");
              that.$router.push({
                // path: "/buySellSystem/buildingHouseDetail/" + new Date(),
                name: "buildingHouseDetail",
                params: {
                  houseId: item.HouseId,
                  browse: browseLog,
                  key: new Date()
                }
              });
            } else if (item.Type == 6) {
              //楼盘情况
              console.log("进入楼盘详情");
              that.$router.push({
                // path: "/buySellSystem/potentialHouseDetail/" + new Date(),
                name: "potentialHouseDetail",
                params: {
                  houseId: item.HouseId,
                  houseType: 1,
                  browse: browseLog,
                  key: new Date()
                }
              });
            } else if (item.Type == 7) {
              console.log("进入交易房源详情");
              that.$router.push({
                // path: "/buySellSystem/tradeHouseDetail/" + new Date(),
                name: "tradeHouseDetail",
                params: {
                  houseId: item.HouseId,
                  houseType: 2,
                  browse: browseLog,
                  key: new Date()
                }
              });
            }
          } else {
            console.log("浏览记录添加失败" + result.message);
          }
        })
        .catch(e => {
          if (e.response != undefined) {
            console.log(e.response);
          }
        });
    }
  }
};
</script>
