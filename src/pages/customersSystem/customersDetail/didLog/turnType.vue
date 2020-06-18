<style lang="less" scoped>
@import url(../../less/popScroll);

.type-content {
  .pop-head {
    span {
      color: red;
      margin-right: 10px;
    }
    font-size: 17px;
  }
  .radio-content {
    .radio-content();
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 20px;
    .radio-content-item {
      flex: none;
      div {
        padding: 0 30px;
      }
    }
  }
}
.split-line {
  height: 4px;
  background: #f2f2f2;
  margin: 20px 0;
}
@height: 33px;
@line-height: 33px;
.type-content-inline {
  flex: 1;
  margin-right: 20px;
  &:last-child {
    margin-right: 0;
  }
  .radio-content {
    padding: 0;
    margin-left: 15px;
    width: 160px;
  }
  .select-set {
    height: @height;
    line-height: @line-height;
    .set-input;
  }
  .set-input() {
    /deep/.el-input__inner {
      height: @height;
      line-height: @line-height;
    }
  }
  .input-suffix {
    color: black;
    font-size: 16px;
    margin-left: 5px;
  }
  .el-input {
    .set-input;
    /deep/.el-input__inner {
      border: none;
      border-bottom: 1px solid #ddd;
    }
  }
}
.flex-content {
  display: flex;
}
.mragin-line {
  margin-top: 20px;
  width: 50%;
  .picker-set {
    width: 160px;
    /deep/.el-input__inner {
      height: @height;
      line-height: @line-height;
    }
    /deep/.el-input__prefix,
    /deep/.el-input__suffix {
      .el-input__icon {
        line-height: @line-height;
      }
    }
  }
}
</style>
<template>
  <fixed-popup v-bind="$attrs" v-on="$listeners" @confirmEmit="confirmEmit">
    <template>
      <div class="type-content">
        <div class="pop-head"><span>*</span>请选择转换原因</div>
        <div class="radio-content">
          <label class="radio-content-item">
            <input
              v-model="formData.isBuyStr"
              type="radio"
              name="removePop"
              value="已购"
              @change="statusChange"
            />
            <div>已购</div>
          </label>
          <label class="radio-content-item">
            <input
              v-model="formData.isBuyStr"
              type="radio"
              name="removePop"
              value="暂不购"
              @change="statusChange"
            />
            <div>暂不购</div>
          </label>
        </div>
        <div class="radio-content" v-if="!isVisible">
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
      <div class="split-line" v-if="!isVisible"></div>
      <div class="flex-content" v-if="!isVisible">
        <div class="type-content type-content-inline">
          <div class="pop-head"><span>*</span>成交楼盘</div>
          <div class="radio-content">
            <el-select
              class="select-set"
              v-model="formData.community"
              clearable
              filterable
              remote
              :remote-method="queryCommunityByKeyWord"
              :loading="searchLoading"
              placeholder="请输入楼盘称呼"
            >
              <el-option
                v-for="item in communityList"
                :key="item.value"
                :label="item.name"
                :value="item.value + ':' + item.name"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="type-content type-content-inline">
          <div class="pop-head"><span>*</span>成交金额</div>
          <div class="radio-content">
            <el-input
              clearable
              v-model="formData.buyAmount"
              oninput="value=value.replace(/[^\d]/g,'')"
              placeholder="请输入成交价"
            ></el-input>
            <div class="input-suffix">万</div>
          </div>
        </div>
      </div>
      <div class="type-content mragin-line" v-if="!isVisible">
        <div class="pop-head"><span>*</span>成交时间</div>
        <div class="radio-content">
          <el-date-picker
            type="date"
            class="picker-set"
            v-model="formData.buyTime"
            placeholder="请选择成交时间"
          >
          </el-date-picker>
        </div>
      </div>
      <!-- <div class="type-content-item">
        <div class="item-right">
          <el-radio-group v-model="formData.isBuyStr" @change="statusChange">
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
      </div> -->
      <!-- <div :class="{ isVisible: isVisible }">
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
                oninput="value=value.replace(/[^\d]/g,'')"
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
        </div> -->
      <!-- </div> -->
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
        buyWay: "",
        isBuyStr: "已购",
        isBuy: 1, //1已购，2暂不购
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

      if (this.formData.isBuyStr == "已购") {
        this.isVisible = false;
      } else {
        this.isVisible = true;
      }
    },
    changeStatusApply(params, callback) {
      let _that = this;
      _that.$api
        .post({
          url: "/saleCustomerOperation/changeStatus",
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
            console.log(result, "申请转状态");
            callback();
          } else {
            console.log("申请转状态" + result.message);
            _that.$message({
              type: "info",
              message: result.message
            });
          }
        })
        .catch(e => {
          console.log("申请转状态失败catch");
          console.log(e);
        })
        .finally(() => {});
    },
    confirmEmit() {
      let _that = this;
      // this.$validator.validateAll().then(e => {
      //   if (!e) return;
      // });
      if (_that.formData.isBuyStr == "已购") {
        _that.formData.isBuy = 1;
      } else {
        _that.formData.isBuy = 2;
        _that.formData.remark = "该客户暂不考虑购房";
      }
      if (_that.formData.isBuy == 1) {
        if (!_that.formData.community) {
          _that.$message({
            type: "info",
            message: "请指定成交楼盘"
          });
          return;
        }
        _that.formData.buyCommunity = _that.formData.community.split(":")[1];
        _that.formData.buyCommunityId = _that.formData.community.split(":")[0];
        if (!_that.formData.buyTime) {
          _that.$message({
            type: "info",
            message: "请指定成交时间"
          });
          return;
        }
        if (!_that.formData.buyAmount) {
          _that.$message({
            type: "info",
            message: "请指定成交金额"
          });
          return;
        }
        _that.formData.remark = "该客户已购房，状态申请";
      }
      console.log(this.formData);
      if (this.customerId && this.customerId != 0) {
        //在该组件内响应添加带看
        console.log(this.customerId, "转状态申请在组件内响应");
        this.formData.customerId = this.customerId;
        _that.changeStatusApply(this.formData, s => {
          _that.$emit("update:visible", false); //状态申请成功后关闭当前窗口
          _that.$emit("confirmTurnType", _that.$data);
        });
      }
    }
  }
};
</script>
