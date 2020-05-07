<style lang="less" scoped>
.didLog {
  /deep/.didLog-content-sroll {
    padding: 0 !important;
  }
}
.pop-custome-head {
  width: 200px;
  font-size: 15px;
  margin-bottom: 15px;
  padding-left: 15px;
  .custome-head-tips {
    color: #666;
    font-size: inherit;
    .icon {
      margin-right: 5px;
    }
  }
  .custome-head-name {
    text-indent: 21px;
    margin-top: 5px;
  }
}
.tel-content {
  padding: 15px;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  display: flex;
  .pop-custome-head {
    padding-left: 0;
    margin-bottom: 0;
  }
  .call-phone {
    align-self: center;
    width: 35px;
    height: 35px;
    color: #fff;
    background: #40a375;
    border-radius: 50%;
    font-size: 22px;
    text-align: center;
    line-height: 35px;
  }
}
.pop-custome-foot {
  text-align: center;
  padding: 10px 0;
}
</style>
<template>
  <fixedPopup v-bind="$attrs"
              v-on="$listeners"
              class="didLog">
    <template>
      <div class="pop-custome-head">
        <h3 class="custome-head-tips"><i class="el-icon-s-custom icon"></i>业主姓名</h3>
        <div class="custome-head-name">{{data.customerName}}</div>
      </div>
      <div class="tel-content">
        <div class="pop-custome-head">
          <h3 class="custome-head-tips"><i class="el-icon-phone icon"></i>录入电话</h3>
          <div class="custome-head-name">{{data.tel}}</div>
        </div>
        <i class="el-icon-phone call-phone"></i>
      </div>
      <div class="tel-content">
        <div class="pop-custome-head">
          <h3 class="custome-head-tips"><i class="el-icon-phone icon"></i>验真电话</h3>
          <div class="custome-head-name">{{data.checkTel}}</div>
        </div>
        <i class="el-icon-phone call-phone"
           v-if="data.checkTel!='-'&&data.checkTel!=''"></i>
      </div>
      <div class="pop-custome-foot">
        <el-button type="info"
                   size="mini"
                   @click="cancel">关闭</el-button>
      </div>
    </template>
  </fixedPopup>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => { }
    }

  },
  methods: {
    cancel () {
      this.$emit("update:visible", false);
    }
  },
}
</script>

