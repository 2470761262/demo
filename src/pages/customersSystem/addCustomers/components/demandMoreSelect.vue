<style lang="less" scoped>
@import "../less/form.less";

.tag-content {
  .step-content > .input-group > .tag-content;
  /deep/.el-tag {
    margin-top: 16px;
  }
}
.more-content {
  padding-top: 24px;
  .split-line {
    height: 1px;
    background: rgba(240, 242, 245, 1);
    display: block;
  }
  .ul-content {
    display: flex;
    // prettier-ignore
    font-size: 16PX;
    .ul-content-area {
      flex: 1;
      &:nth-child(1) {
        // prettier-ignore
        flex: 0 0 223PX;
      }
      border-right: 1px solid rgb(240, 242, 245);
      .area-title {
        margin-top: 21px;
        font-size: inherit;
        line-height: 21px;
        color: rgba(96, 98, 102, 1);
      }
      .check-content {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        justify-content: space-between;
        margin-top: 43px;
        cursor: pointer;
        input[type="checkbox"] {
          position: relative;
          font-family: element-icons !important;
          width: 16px;
          height: 16px;
        }
        input[type="checkbox"]:checked::after {
          background: @backgroud;
          color: #fff;
          content: "\e6da";
        }
        input[type="checkbox"]::after {
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          line-height: 16px;
          text-align: center;
          border-radius: 4px;
          content: " ";
        }
      }
      .cascader-left-item {
        margin-top: 43px;
        font-size: inherit;
        color: rgba(48, 49, 51, 1);
        cursor: pointer;
        &.active-item {
          color: @backgroud;
        }
      }
      &:last-child {
        border-right: none;
        padding-left: 24px;
      }
    }
  }
}
</style>
<template>
  <fixed-popup
    v-bind="$attrs"
    v-on="$listeners"
    :butJson="{
      cancelBtnText: '重置',
      confirmBtnText: '保存'
    }"
    custom-flag
    @customBtn="customBtn"
    @confirmEmit="confirmEmit"
  >
    <div class="more-content">
      <i class="split-line"></i>
      <div class="ul-content">
        <div class="ul-content-area">
          <p class="area-title">一级分类</p>
          <div
            class="cascader-left-item"
            :class="{ 'active-item': renderLeftIndex == index }"
            v-for="(item, index) in renderLeftList"
            :key="item.value"
            @click="changeActive(index)"
          >
            {{ item.title }}
          </div>
        </div>
        <div class="ul-content-area">
          <p class="area-title">物业分类</p>
          <label
            v-for="item in renderLeftList[renderLeftIndex].children"
            :key="item.value"
            class="check-content"
          >
            <input
              type="checkbox"
              v-model="dataJson['list' + renderLeftIndex]"
              :value="item.value"
              @change="checkChangeActive(item)"
            />
            <div>
              {{ item.title }}
            </div>
          </label>
        </div>
      </div>
      <div class="tag-content">
        <el-tag
          v-for="(tag, index) in showActiveList"
          :key="index"
          closable
          type="info"
          @close="removeActive(tag, true)"
        >
          {{ tag.title }}
        </el-tag>
      </div>
    </div>
  </fixed-popup>
</template>

<script>
const listData = [
  {
    title: "买二手",
    value: "A",
    children: [
      {
        title: "住宅",
        value: 1
      },
      {
        title: "商铺",
        value: 2
      },
      {
        title: "写字楼",
        value: 4
      }
    ]
  },
  {
    title: "买新房",
    value: "B",
    children: [
      {
        title: "住宅",
        value: 8
      },
      {
        title: "商铺",
        value: 16
      },
      {
        title: "写字楼",
        value: 32
      }
    ]
  },
  {
    title: "租赁",
    value: "C",
    children: [
      {
        title: "住宅",
        value: 64
      },
      {
        title: "商铺",
        value: 128
      },
      {
        title: "写字楼",
        value: 256
      }
    ]
  }
];
import util from "@/util/util";
export default {
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {
      dataJson: {
        list0: [],
        list1: [],
        list2: []
      },
      isChangeCommit: false, //
      orderDataJson: {},
      showActiveList: [],
      renderLeftList: listData,
      renderLeftIndex: 0
    };
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler: function(val, oldVal) {
        if (Object.keys(val).length != 0) {
          this.dataJson = JSON.parse(JSON.stringify(val));
        }
      }
    },
    "$attrs.visible"(value) {
      if (value) {
        this.orderDataJson = JSON.parse(JSON.stringify(this.dataJson)); // util.deepCopy();
        this.resetShowActiveList();
        this.isChangeCommit = false;
      } else {
        if (!this.isChangeCommit) {
          this.dataJson = this.orderDataJson;
        }
      }
      console.log("attrs.visible", this.dataJson);
    }
  },
  methods: {
    /**
     * @example: 重新渲染showActiveList
     */

    resetShowActiveList() {
      this.showActiveList = [];
      Object.keys(this.orderDataJson).forEach((item, index) => {
        this.orderDataJson[item].forEach((ordChildItem, ordChildIndex) => {
          this.renderLeftList[index].children.forEach(
            (childItem, childIndex) => {
              if (childItem.value == ordChildItem) {
                this.checkChangeActive(childItem, index);
              }
            }
          );
        });
      });
    },
    confirmEmit() {
      this.isChangeCommit = true;
      this.$emit("input", JSON.parse(JSON.stringify(this.dataJson)));
      this.$emit("demandConfirm", {
        rendList: JSON.parse(JSON.stringify(this.showActiveList)),
        dataJson: JSON.parse(JSON.stringify(this.dataJson))
      });
    },
    /**
     * @example:  重置
     */

    customBtn() {
      Object.assign(this.$data, this.$options.data.call(this));
    },
    /**
     * @example:  修改父级显示下标
     */
    changeActive(index) {
      this.renderLeftIndex = index;
    },
    /**
     * @example: 删除对应下标的数据
     * @param {Obejct} nowSign
     * @param {Object} relevance 用于判断是tag点击删除 还是 checkout删除
     */
    removeActive(nowSign, relevance = false) {
      let isIndex = this.showActiveList.findIndex(item => {
        return item.sign == (relevance ? nowSign.sign : nowSign);
      });

      if (relevance) {
        let relevanceIndex = this.dataJson[
          "list" + nowSign.parentIndex
        ].findIndex(item => {
          return item == nowSign.value;
        });
        this.dataJson["list" + nowSign.parentIndex].splice(relevanceIndex, 1);
      }
      console.log(isIndex, "isIndex");
      if (isIndex > -1) {
        return this.showActiveList.splice(isIndex, 1);
      }
      return [];
    },
    /**
     * @example: 用于判断是否存在 如果穿在则删除 否则添加
     * @param {Obejct} nowItem checkout当前点击的数据
     */
    checkChangeActive(nowItem, parentIndex) {
      let typeTitle;
      const nowSign = `${
        parentIndex != undefined ? parentIndex : this.renderLeftIndex
      }-${nowItem.value}`;
      console.log(nowSign, parentIndex);
      if (this.removeActive(nowSign).length == 0) {
        switch (parentIndex != undefined ? parentIndex : this.renderLeftIndex) {
          case 0:
            typeTitle = "买二手";
            break;
          case 1:
            typeTitle = "买新房";
            break;
          case 2:
            typeTitle = "租赁";
            break;
        }
        this.showActiveList.push({
          title: typeTitle + nowItem.title,
          sign: nowSign,
          value: nowItem.value,
          parentIndex: this.renderLeftIndex
        });
      }
    }
  }
};
</script>
