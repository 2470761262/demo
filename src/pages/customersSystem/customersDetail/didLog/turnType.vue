<style lang="less" scoped>
@import url(../../less/popScroll);
.error-tips {
  color: red;
}
.belt-content {
  .belt-content();
}
.isVisible {
  display: none;
}
</style>
<template>
  <fixed-popup v-bind="$attrs" v-on="$listeners" @confirmEmit="confirmEmit">
    <template>
      <div class="belt-content">
        <div class="belt-content-item">
          <div class="item-right">
            <el-radio-group v-model="formData.isBuy" @change="statusChange">
              <el-radio-button label="已购"></el-radio-button>
              <el-radio-button label="暂不购"></el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div :class="{ isVisible: isVisible }">
          <div class="item-right">
            <div class="check-content">
              <div class="label-content">
                <el-radio v-model="formData.buyWay" :label="'我司成交'"
                  >我司成交</el-radio
                >
                <el-radio v-model="formData.buyWay" :label="'他司成交'"
                  >他司成交</el-radio
                >
                <el-radio v-model="formData.buyWay" :label="'客户自购'"
                  >客户自购</el-radio
                >
              </div>
            </div>
          </div>
        </div>
        <div :class="{ isVisible: isVisible }">
          <div class="item-right">
            <div class="check-content">
              <span>成交楼盘</span>
              <el-select
                v-model="formData.community"
                clearable
                filterable
                remote
                :remote-method="queryCommunityByKeyWord"
                :loading="searchLoading"
                placeholder="请选择成交楼盘"
              >
                <el-option
                  v-for="item in communityList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value + ':' + item.name"
                ></el-option>
              </el-select>
            </div>
            <div class="check-content">
              <span>成交金额</span>
              <el-input
                clearable
                v-model="formData.buyAmount"
                style="width:60%;margin-left:20px"
                placeholder="成交金额"
              ></el-input>
            </div>
            <div class="check-content">
              <span>成交时间</span>
              <el-date-picker
                type="date"
                v-model="formData.buyTime"
                placeholder="选择日期"
              >
              </el-date-picker>
            </div>
          </div>
        </div>
      </div>
    </template>
  </fixed-popup>
</template>

<script>
export default {
  components: {},
  props: {
    customerId: {
      type: Number, // 定义接收到的数据的类型
      default: 0,
      required: false //规定这个数据是否必传,默认false
    }
  },
  data() {
    return {
      formData: {
        buyAmount: null,
        buyTime: null,
        buyWay: "我司成交",
        isBuy: "已购", //1已购，2暂不购
        community: ""
      },
      status: null,
      isVisible: false,
      searchLoading: false,
      communityList: []
    };
  },
  methods: {
    queryCommunityByKeyWord(query) {
      if (query !== "") {
        let _that = this;
        this.searchLoading = true;
        _that.$api
          .get({
            url: "/community/houseList",
            qs: true,
            data: { communityName: query }
          })
          .then(e => {
            _that.searchLoading = false;
            let result = e.data;
            if (result.code == 200) {
              console.log(result, "查询楼盘");
              _that.communityList = result.data.list;
            } else {
              console.log("查询楼盘" + result.message);
              _that.$message({
                type: "info",
                message: result.message
              });
            }
          })
          .catch(e => {
            _that.searchLoading = false;
            console.log("查询楼盘失败catch");
            console.log(e);
          })
          .finally(() => {});
      } else {
        this.communityList = [];
      }
    },
    statusChange(e) {
      console.log("切换了", e, this.formData.isBuy);

      if (e == "已购") {
        this.isVisible = false;
      } else {
        this.isVisible = true;
      }
    },
    addPairRecord(params, callback) {
      let _that = this;
      _that.$api
        .post({
          url: "/saleCustomer/addPairRecord",
          data: params,
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let result = e.data;
          _that.$message({
            type: "info",
            message: result.message
          });
          if (result.code == 200) {
            console.log(result, "添加带看");
            callback();
          } else {
            console.log("录入客源" + result.message);
            _that.$message({
              type: "info",
              message: result.message
            });
          }
        })
        .catch(e => {
          console.log("录入客源失败catch");
          console.log(e);
        })
        .finally(() => {});
    },
    confirmEmit() {
      let _that = this;
      // this.$validator.validateAll().then(e => {
      //   if (!e) return;
      // });
      if (_that.formData.isBuy == "已购") {
        _that.formData.isBuy = 1;
      } else {
        _that.formData.isBuy = 2;
      }
      if (_that.formData.isBuy == 1 && !_that.formData.community) {
        _that.$message({
          type: "info",
          message: "请指定成交楼盘"
        });
        return;
      }
      console.log(this.formData);
      if (this.customerId && this.customerId != 0) {
        //在该组件内响应添加带看
        console.log(this.customerId, "添加带看在组件内响应");
      } else {
        console.log(
          "添加带看在父组件内响应，请在父组件内注册事件confirmTurnType"
        );
        _that.$emit("confirmTurnType", this.$data);
      }
    }
  }
};
</script>
