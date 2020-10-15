<style lang="less" scoped>
.target-content {
  // prettier-ignore
  min-height: 114PX;
  border-bottom: 1px solid #f0f2f5;
  // prettier-ignore
  padding: 16PX;
  display: flex;
  flex-direction: column;
  .is-real {
    flex: 1;
    display: flex;
    flex-direction: column;
    .empty-content {
      // prettier-ignore
      border-radius: 6PX;
      flex: 1;
      border: 1px dashed #909399;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      // prettier-ignore
      padding: 16PX;
      .target-bor {
        text-align: center;
      }
      &.is-empty {
        align-items: flex-start;
      }
      .iconbianzu2 {
        font-size: @font21;
      }
      .empty-title {
        color: #606166;
        font-size: @font14;
        // prettier-ignore
        margin-top: 14PX;
      }
    }
    .target-list {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      .target-list-item {
        flex: 0 0 20%;
        font-size: 0;
        text-align: center;
        &:nth-child(n + 6) {
          // prettier-ignore
          margin-top: 16PX;
        }
        .item-posi {
          display: inline-block;
          position: relative;
          // prettier-ignore
          width: 76PX;
          // prettier-ignore
          height: 76PX;
          // prettier-ignore
          border-radius: 6PX;
          .remove-btn {
            position: absolute;
            // prettier-ignore
            top: -7PX;
            // prettier-ignore
            right:-7PX ;
            color: #d62727;
            font-size: @font14;
            text-align: center;
            cursor: pointer;
          }
          .is-cover {
            position: absolute;
            // prettier-ignore
            bottom: 4PX;
            left: 0;
            width: 100%;
            display: flex;
            cursor: pointer;
            .is-no-check {
              // prettier-ignore
              width: 12PX;
              // prettier-ignore
              height: 12PX;
              background: #ffffff;
              border: 1px solid #909399;
              border-radius: 50%;
              // prettier-ignore
              margin: 0 5PX 0 3PX;
              &.is-check {
                &::after {
                  font-family: element-icons !important;
                  content: "\e79c";
                  font-size: @font12;
                  color: @backgroud;
                }
              }
            }
            .cover-title {
              font-size: @font12;
              color: #fff;
            }
          }
          img {
            // prettier-ignore
            border-radius: 6PX;
            // prettier-ignore
            width: 100%;
            // prettier-ignore
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="target-content">
    <div class="is-real" ref="target">
      <div class="empty-content" :class="{ 'is-empty': !isEmpty }">
        <template v-if="isEmpty">
          <div class="target-bor" @click="isEmptyList">
            <i class="iconfont iconbianzu2"></i>
            <div class="empty-title">将您拍摄的{{ title }}添加至此处</div>
          </div>
        </template>
        <div class="target-list" v-else>
          <div
            class="target-list-item"
            v-for="(item, index) in currentArray"
            :key="item.id"
            v-loading="item.loading"
          >
            <div class="item-posi">
              <img :src="item.url" alt="" />
              <div
                class="remove-btn iconbianzu12 iconfont"
                v-if="!item.loading"
                @click="spliceItem(item, index)"
              ></div>
              <div class="is-cover" @click="setCover(item)">
                <div
                  class="is-no-check"
                  :class="{ 'is-check': item.id == coverData.id }"
                ></div>
                <div class="cover-title">设为封面</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from "@/util/util";
export default {
  inject: ["dragParent"],
  props: {
    coverData: Object,

    title: String,

    currentArray: Array
  },
  watch: {
    /**
     * @example: 类型切换时重新更新目标区域的xy
     */

    "dragParent.currentType"() {
      this.$nextTick(() => {
        this.targetInit();
      });
    },
    "currentArray.length"(v) {
      if (v % 6 == 0)
        this.$nextTick(() => {
          this.targetInit();
        });
    }
  },
  computed: {
    isEmpty() {
      return this.currentArray.length == 0;
    }
  },
  mounted() {
    this.targetInit();
  },
  methods: {
    /**
     * @example: 设置封面
     */

    setCover(item) {
      if (item.id == this.coverData.id) {
        this.$emit("update:coverData", {});
      } else {
        this.$emit("update:coverData", item);
      }
    },
    /**
     * @example:
     */
    isEmptyList() {
      this.$emit("isEmptyList");
    },
    /**
     * @example: 删除对应元素
     */
    spliceItem(item, index) {
      if (item.id == this.coverData.id) {
        this.$emit("update:coverData", {});
      }
      this.$emit("restoreImageType", item, index);
    },
    targetInit() {
      let top = util.getElementTop(this.$refs.target);
      let left = util.getElementLeft(this.$refs.target);
      let com = getComputedStyle(this.$refs.target);
      this.dragParent.$emit("targetInit", {
        top: top,
        left: left,
        right: parseInt(com.width) + left,
        bottom: parseInt(com.height) + top
      });
    }
  }
};
</script>
