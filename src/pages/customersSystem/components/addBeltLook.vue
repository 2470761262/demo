<style lang="less" scoped>
.error-tips {
  color: red;
}
.belt-content {
  padding: 15px 0;
  .belt-content-item {
    display: flex;
    align-items: center;
    margin-top: 30px;
    &:first-child {
      margin-top: 0;
    }
    .item-require {
      color: red;
      margin-right: 10px;
      font-size: 20px;
    }
    .item-right {
      flex: 1;
      .item-picker {
        width: 100%;
      }
      .check-content {
        display: flex;
        font-size: 16px;
        color: #666;
        align-items: center;
        .label-content {
          flex: 1;
          margin-left: 50px;
        }
      }
    }
  }
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
              data-vv-name="time"
              data-vv-as="请选择带看时间"
              v-validate="'required'"
              class="item-picker"
              v-model="contentJson.time"
              type="daterange"
              range-separator="至"
              start-placeholder="选择开始时间"
              end-placeholder="选择结束时间"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="belt-content-item">
          <span class="item-require">*</span>
          <div class="item-right">
            <!-- <ls-cascader
              ata-vv-name="cascaderResultg"
              data-vv-as="请选择楼盘"
              v-validate="'required'"
              v-model="cascaderResult"
            ></ls-cascader> -->
            <input
              type="text"
              ata-vv-name="cascaderResultg"
              data-vv-as="请选择楼盘"
              v-validate="'required'"
              v-model="cascaderResultg"
            />
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
    validator: "new"
  },
  components: {
    //  lsCascader,
    lsAddAccompany
  },
  data() {
    return {
      cascaderResultg: "",
      textarea: "",
      isTalk: 0, //是否再谈
      accompanyResult: [], //陪同人
      cascaderResult: [], //带看楼盘
      contentJson: {
        time: [],
        building: []
      }
    };
  },
  methods: {
    confirmEmit() {
      this.$validator.validateAll().then(e => {
        console.log(e, this.$validator);
        console.log(this.errorBags);
      });
    }
  }
};
</script>
