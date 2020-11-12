<style lang="less" scoped>
@import "../less/form.less";

.step-content {
  .step-content();
  padding: 0 24px 24px;
  background: rgba(255, 255, 255, 1);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  overflow: hidden;
  .split-line {
    margin-top: 39px;
  }
}
.heade-content {
  display: flex;
  justify-content: space-between;
  padding-top: 24px;
  .heade-content-left {
    display: flex;
    align-items: center;
    .demand-item {
      position: relative;
      // prettier-ignore
      font-size: 18PX;
      margin-right: 36px;
      cursor: pointer;
      color: rgba(96, 98, 102, 1);
      &.active {
        color: @backgroud;
        &::after {
          position: absolute;
          content: "";
          height: 2px;
          background: @backgroud;
          left: 9px;
          right: 9px;
          bottom: -9px;
        }
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .heade-btn-change {
    height: 48px;
    // prettier-ignore
    font-size: 16PX;
  }
}
</style>
<template>
  <section>
    <div class="step-content">
      <div class="heade-content">
        <div class="heade-content-left">
          <div
            class="demand-item"
            v-for="(item, idx) in headerList"
            :key="idx"
            :class="headerActive == item ? 'active' : ''"
            @click="changeDemand(item, idx)"
          >
            {{ item | formatdemand }}
          </div>
        </div>
        <el-button
          class="heade-btn-change"
          type="primary"
          @click="moreSelectFlag = true"
          >修改需求类型</el-button
        >
      </div>
      <i class="split-line"></i>
    </div>
    <old-hous
      v-show="isOldHous"
      :requirement="headerActive"
      ref="old"
    ></old-hous>
    <new-hous
      v-show="isNewHous"
      :requirement="headerActive"
      ref="new"
    ></new-hous>
    <tenement
      v-show="isTenement"
      :requirement="headerActive"
      ref="ten"
    ></tenement>
    <!-- 多选弹出层 -->
    <demand-more-select
      ref="moreSelect"
      styleType="0"
      :visible.sync="moreSelectFlag"
      width="506px"
      title="选择需求信息(多选)"
      @demandConfirm="demandConfirm"
      v-model="demandValue"
      data-vv-name="moreSelect"
      data-vv-as="需求信息"
      v-validate="'required|arrFlatLength:0'"
    >
    </demand-more-select>
  </section>
</template>

<script>
import { PURCHASEPURPOSE, DECORATION } from "@/util/constMap";
import demandMoreSelect from "./demandMoreSelect";
import oldHous from "./oldHous";
import newHous from "./newHous";
import tenement from "./tenement";
import util from "@/util/util";
export default {
  components: {
    demandMoreSelect, //需求多选组件
    oldHous,
    newHous,
    tenement
  },
  data() {
    return {
      moreSelectFlag: false,
      demandValue: this.$store.state.addCustomers.demandValue,
      headerList: [],
      headerActive: this.$route.query.require,
      requirements: [],
      editRequireType: this.$route.query.require
    };
  },
  computed: {
    isOldHous() {
      return (
        this.headerActive == 1 ||
        this.headerActive == 2 ||
        this.headerActive == 4
      );
    },
    isNewHous() {
      return (
        this.headerActive == 8 ||
        this.headerActive == 16 ||
        this.headerActive == 32
      );
    },
    isTenement() {
      return (
        this.headerActive == 64 ||
        this.headerActive == 128 ||
        this.headerActive == 256
      );
    }
  },
  filters: {
    formatdemand(val) {
      switch (val) {
        case 1:
          return "买二手住宅";
        case 2:
          return "买二手商铺";
        case 4:
          return "买二手写字楼";
        case 8:
          return "买新房住宅";
        case 16:
          return "买新房商铺";
        case 32:
          return "买新房写字楼";
        case 64:
          return "租赁住宅";
        case 128:
          return "租赁商铺";
        case 256:
          return "租赁写字楼";
      }
    }
  },
  created() {
    this.changeDemandValue();
  },
  methods: {
    // 修改需求保存
    demandConfirm() {
      this.$store.commit("updateDemandValue", this.demandValue);
      this.changeDemandValue();
      this.moreSelectFlag = false;
    },
    //改变头部标题
    changeDemandValue() {
      this.headerList = [];
      if (this.demandValue.list0.length != 0) {
        this.headerList.push(...this.demandValue.list0);
      }
      if (this.demandValue.list1.length != 0) {
        this.headerList.push(...this.demandValue.list1);
      }
      if (this.demandValue.list2.length != 0) {
        this.headerList.push(...this.demandValue.list2);
      }
      if (!this.headerActive) {
        this.headerActive = this.headerList[0];
      }
      this.changeStoreStep2();
      this.$nextTick(() => {
        this.getStep2(this.headerActive);
      });
    },
    changeStoreStep2() {
      let formData = this.$store.state.addCustomers.formData;
      this.requirements = formData.step2;
      // 先添加
      for (let i = 0; i < this.headerList.length; i++) {
        let demandTemplate = util.deepCopy(formData.demandTemplate);
        demandTemplate.requireType = this.headerList[i];
        let isExist = false;
        for (let j = 0; j < this.requirements.length; j++) {
          if (this.requirements[j].requireType == this.headerList[i]) {
            isExist = true;
            break;
          }
        }
        if (!isExist) {
          this.requirements.push(demandTemplate);
        }
      }
      // 删除多余的requirements
      for (let i = 0; i < this.requirements.length; i++) {
        let isExist = false;
        for (let j = 0; j < this.headerList.length; j++) {
          if (this.requirements[i].requireType == this.headerList[j]) {
            isExist = true;
            break;
          }
        }
        if (!isExist) {
          this.requirements.splice(i, 1);
        }
      }
      this.$store.commit("updateStep2", this.requirements);
    },
    async changeDemand(item, idx) {
      await this.updataStep2(this.headerActive);
      this.headerActive = item;
      this.getStep2(item);
    },
    //更新step2的数据
    updataStep2() {
      let formData = this.$store.state.addCustomers.formData.step2;
      let moduleName = "";
      switch (this.headerActive) {
        case 1:
        case 2:
        case 4:
          moduleName = "old";
          break;
        case 8:
        case 16:
        case 32:
          moduleName = "new";
          break;
        case 64:
        case 128:
        case 256:
          moduleName = "ten";
      }
      for (let i = 0; i < formData.length; i++) {
        if (formData[i].requireType == this.headerActive) {
          formData[i] = util.deepCopy(this.$refs[moduleName].data);
        }
      }
      console.log(formData, "formData");
      this.$store.commit("updateStep2", formData);
    },
    // 反写step2的数据
    getStep2(item) {
      let formData = util.deepCopy(
        this.$store.state.addCustomers.formData.step2
      );
      let moduleName = "";
      switch (item) {
        case 1:
        case 2:
        case 4:
          moduleName = "old";
          break;
        case 8:
        case 16:
        case 32:
          moduleName = "new";
          break;
        case 64:
        case 128:
        case 256:
          moduleName = "ten";
      }
      for (let i = 0; i < formData.length; i++) {
        if (formData[i].requireType == item) {
          this.$refs[moduleName].data = formData[i];
        }
      }
    }
  }
};
</script>
