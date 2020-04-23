<style lang="less" scoped>
.bet-content {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  .bet-tips {
    line-height: 35px;
    p {
      font-size: 15px;
    }
  }
  .bet-input {
    display: flex;
    align-items: center;
    .bet-input-text {
      font-size: 18px;
      color: black;
    }
    .bet-input-content {
      width: 110px;
      margin: 0 20px;
      /deep/.el-input {
        input {
          border: none;
          border-bottom: 1px solid #c0c4cc;
          border-radius: 0;
          padding: 0;
        }
      }
    }
  }
}
.pop-but {
  /deep/span {
    font-size: 12px !important;
  }
  .button-back {
    background: #108f51;
    /deep/span {
      color: #fff;
    }
  }
}
</style>
<template>
  <fixedPopup v-bind="$attrs"
              v-on="$listeners">
    <template>
      <div class="bet-content">
        <div class="bet-tips">
          <p>1，对赌鑫币值封顶为{{betConf.upper}}个</p>
          <p>2，{{betConf.expireDay}}天内成交可获得{{betConf.odds}}倍鑫币</p>
          <p>3，合同审核通过前{{betConf.startHour}}小时提交为有效</p>
        </div>
        <div class="bet-input">
          <div class="bet-input-text">对赌鑫币值</div>
          <div class="bet-input-content">
            <el-input v-model="butValue"
                      data-vv-name="butValue"
                      data-vv-as="鑫币值"
                      v-validate="{'min_value':betConf.lower,'max_value':betConf.upper}"
                      v-number
                      placeholder="输入对赌鑫币值"></el-input>
            <div v-if="errorBags.has('butValue')">{{errorBags.first('butValue')}}</div>
            <div v-else>(对赌鑫币{{betConf.lower}}起投)</div>
          </div>
          <div class="bet-input-text">个</div>
        </div>
      </div>
      <div class="pop-but">
        <el-button size="small"
                   @click="hidePop">取消</el-button>
        <el-button size="small"
                   :disabled="!showBetBtn"
                   class="button-back"
                   :loading="loading"
                   @click="result">确定</el-button>
      </div>
    </template>
  </fixedPopup>
</template>
<script>
import but from "@/evenBus/but.js";
export default {
  inject: ["houseId"],
  data () {
    return {
      butValue: '',
      loading: false,
      betConf: {
        startHour: 0,
        expireDay: 0,
        odds: 0,
        upper: 0,
        lower: 0,
      },
      showBetBtn: false,
    }
  },
  created () {
    but.$on("betConf", (value) => {
      this.betConf = value;
    })
    but.$on("betBtn", (value) => {
      this.showBetBtn = value;
    })
  },
  destroyed () {
    but.$off('betConf');
    but.$off('betBtn');
  },
  methods: {
    result () {
      this.$validator
        .validateAll().then((e) => {
          if (e) {
            var that = this;
            let params = { "HouseId": that.houseId.id, "Amount": that.butValue };
            this.$emit('update:visible', false)
            this.$api.post({
              url: '/house/bet/add',
              data: params,
              headers: { "Content-Type": "application/json" }
            }).then((e) => {
              let data = e.data
              this.$message.error(data.message);
              if (data.code == 200) {
                 this.$alert('对赌已生效', '支付成功', {
                   confirmButtonText: '加油',
                 });
                but.$emit("getBetInfo")
              }
            }).catch((e) => {
            })
          }
        })
    },
    hidePop () {
      this.$emit('update:visible', false)
    }
  },
}
</script>
