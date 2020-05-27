<style lang="less" scoped>
@import url(../less/popScroll);
.popContent {
  /deep/.didLog-content-sroll {
    padding: 15px 48px !important;
  }
}
.error-tips {
  color: red;
}
.date-picker {
  margin-left: 20px;
  width: 0;
  flex: 1;
  /deep/&.el-date-editor--datetime {
    > .el-input__inner {
      font-size: 16px;
      border: none;
      outline: none;
      background: initial;
      padding-left: 0;
      padding-right: 0;
      color: black;
      &::placeholder {
        color: #666;
      }
    }
  }
  /deep/.el-icon-time {
    display: none;
  }
}
.belt-content {
  .belt-content();
}
.people-tips {
  text-indent: 11px;
  margin-top: 20px;
  color: #666;
  font-size: 15px;
}
.text-center {
  margin-top: 30px;
  font-size: 16px;
  text-align: center;
  color: var(--color--primary);
  span {
    text-decoration: underline;
    cursor: pointer;
  }
}
.valideta-success {
  text-align: center;
  .icon {
    font-size: 70px;
    color: #fed566;
  }
  .success-tips {
    font-size: 16px;
    margin-top: 30px;
  }
}
</style>
<template>
  <fixed-popup
    class="popContent"
    v-bind="$attrs"
    v-on="$listeners"
    @confirmEmit="confirmEmit"
    :butJson="{ cancelBtnShow: !validateFlag }"
  >
    <template v-if="!validateFlag">
      <strong class="error-tips">{{ errorBags.all()[0] }}</strong>
      <div class="belt-content">
        <div class="belt-content-item">
          <!-- <span class="item-require">*</span> -->
          <div class="item-right">
            <down-content :down-ul-flag="false" icon-class="el-icon-date">
              <template v-slot:head>
                <el-date-picker
                  class="date-picker"
                  v-model="reserveTime"
                  type="datetime"
                  placeholder="选择带看时间"
                >
                </el-date-picker>
              </template>
            </down-content>
          </div>
        </div>
        <div class="belt-content-item">
          <!-- <span class="item-require">*</span> -->
          <div class="item-right">
            <ls-cascader
              data-vv-name="cascaderResult"
              data-vv-as="请选择楼盘"
              v-validate="{
                required: cascaderResult.length != 0,
                cascader: [
                  2,
                  ['楼盘', '楼栋', '房间号'],
                  cascaderResult.length,
                  !cascaderResult.length != 0
                ]
              }"
              v-model="cascaderResult"
            ></ls-cascader>
          </div>
        </div>
        <div class="people-tips">
          <span>跟单人:</span>
          <span>钟丽娟</span>
        </div>
        <div class="text-center">
          <span>添加更多预约带看</span>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="valideta-success">
        <div class="icon el-icon-success"></div>
        <div class="success-tips">预约成功</div>
      </div>
    </template>
  </fixed-popup>
</template>

<script>
import downContent from "../customersDetail/components/downContent";
//楼盘 小区 房间号 联动选择
import lsCascader from "./lsCascader";
export default {
  $_veeValidate: {
    validator: "new" // give me my own validator scope.
  },
  components: {
    downContent,
    lsCascader
  },
  data() {
    return {
      validateFlag: false, //是否验证通过

      reserveTime: "", //预约时间

      cascaderResult: [] //带看楼盘
    };
  },
  methods: {
    confirmEmit() {
      if (this.validateFlag) {
        //已验证通过
        this.$emit("update:visible", false);
      } else {
        //未验证
        this.$validator.validateAll().then(e => {
          if (!e) return;
          console.log("验证通过");
          this.validateFlag = true;
        });
      }
    }
  }
};
</script>
