<style lang="less" scoped>
@import url(../less/popScroll);
.error-tips {
  color: red;
}
.belt-content {
  .belt-content();
}
</style>
<template>
  <fixed-popup v-bind="$attrs" v-on="$listeners" @confirmEmit="confirmEmit">
    <template>
      <strong class="error-tips">{{ errorBags.all()[0] }}</strong>
      <div class="belt-content">
        <div class="belt-content-item">
          <span class="item-require">*</span>
          <div class="item-right">
            <el-date-picker
              data-vv-name="beltTime"
              data-vv-as="请选择带看时间"
              v-validate="'required'"
              class="item-picker"
              v-model="beltTime"
              type="daterange"
              range-separator="至"
              start-placeholder="选择开始时间"
              end-placeholder="选择结束时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="belt-content-item">
          <span class="item-require">*</span>
          <div class="item-right">
            <ls-cascader
              ata-vv-name="cascaderResult"
              data-vv-as="请选择楼盘"
              v-validate="{
                required: true,
                cascader: [2, ['楼盘', '楼栋', '房间号'], cascaderResult.length]
              }"
              v-model="cascaderResult"
            ></ls-cascader>
          </div>
        </div>
        <div class="belt-content-item">
          <span class="item-require">*</span>
          <div class="item-right">
            <ls-Add-accompany
              data-vv-name="accompanyResult"
              data-vv-as="请选择陪同人"
              v-validate="'required'"
              v-model="accompanyResult"
            ></ls-Add-accompany>
          </div>
        </div>
        <div class="belt-content-item">
          <span class="item-require">*</span>
          <div class="item-right">
            <div class="check-content">
              <span>是否再谈</span>
              <div class="label-content">
                <el-radio v-model="isTalk" :label="0">否</el-radio>
                <el-radio v-model="isTalk" :label="1">是</el-radio>
              </div>
            </div>
          </div>
        </div>
        <div class="belt-content-item">
          <span class="item-require">*</span>
          <div class="item-right">
            <div class="check-content">
              <el-input
                data-vv-name="textarea"
                data-vv-as="带看想法"
                v-validate="'required'"
                v-model="textarea"
                type="textarea"
                clearable
                resize="none"
                placeholder="对本次带看有什么想说的?"
                :autosize="{ minRows: 6, maxRows: 8 }"
              ></el-input>
            </div>
          </div>
        </div>
      </div>
    </template>
  </fixed-popup>
</template>

<script>
//楼盘 小区 房间号 联动选择
import lsCascader from "./lsCascader";
//陪同人
import lsAddAccompany from "./lsAddAccompany";
export default {
  $_veeValidate: {
    validator: "new" // give me my own validator scope.
  },
  components: {
    lsCascader,
    lsAddAccompany
  },
  props: {
    customerId: {
      type: Number, // 定义接收到的数据的类型
      default: 0,
      required: false //规定这个数据是否必传,默认false
    }
  },
  data() {
    return {
      textarea: "",
      isTalk: 0, //是否再谈
      accompanyResult: [], //陪同人
      cascaderResult: [], //带看楼盘
      beltTime: [] //带看时间
    };
  },
  methods: {
    confirmEmit() {
      let _that = this;
      this.$validator.validateAll().then(e => {
        if (!e) return;
        if (this.customerId && this.customerId != 0) {
          //在该组件内响应添加带看
          console.log(this.customerId, "添加带看在组件内响应");
          console.log(this.accompanyResult, "陪同人");
          console.log(this.cascaderResult, "带看楼盘");
          console.log(this.beltTime, "带看时间");
          // this.cascaderResult[0].value//楼盘id
          // this.cascaderResult[1].value//楼栋id
          // this.cascaderResult[2].value//房间id
          let params = {
            houseEid: 70,
            memo: _that.textarea,
            startTime: _that.beltTime[0],
            endTime: _that.beltTime[0],
            cusEid: _that.customerId,
            dzTogether: this.accompanyResult[0].key
          };
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
                this.$emit("update:visible", false);
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
        } else {
          console.log(
            "添加带看在父组件内响应，请在父组件内注册事件confirmAddLook"
          );
          _that.$emit("confirmAddLook", this.$data);
        }
      });
    }
  }
};
</script>
