<style lang="less" scoped>
.definition-flex-warp {
  .definition-flex-cell {
    display: flex;
  }
  .definition-back {
    height: 40px;
    justify-content: space-between;
    align-items: center;
    .pop-title {
      font-size: 16px;
    }
  }
  .definition-checkBox {
    display: flex;
    flex-wrap: wrap;
    .definition-checkBox-item {
      flex: 0 0 50%;
      margin-top: 15px;
      cursor: pointer;
      &.disabled {
        cursor: no-drop;
        span {
          color: #dedede;
        }
      }
    }
  }
  .center-but {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>
<template>
  <div>
    <el-popover placement="left"
                width="400"
                v-model="visible">
      <div class="definition-flex-warp">
        <div class="definition-flex-cell definition-back">
          <div class="pop-title">自定义菜单设置</div>
          <div class="el-icon-close"
               @click="visible = false"></div>
        </div>
        <div class="definition-checkBox">
          <label class="definition-checkBox-item"
                 :class="{'disabled':item.disabled}"
                 v-for="(item,index) in thatRenderList"
                 :key="index">
            <input type="checkbox"
                   @click="setListCheck(item)"
                   :checked="item.default"
                   :disabled="item.disabled">
            <span>{{item.label}}</span>
          </label>
        </div>
        <div class="center-but">
          <el-button type="primary"
                     size="mini"
                     @click="setTabRender">确定</el-button>
          <el-button type="primary"
                     size="mini"
                     @click="resetTabRender">恢复默认</el-button>
        </div>
      </div>
      <el-button slot="reference"
                 size="mini"
                 :loading="loading"
                 type="primary">自定义菜单</el-button>
    </el-popover>
  </div>
</template>

<script>
import util from "@/util/util";
export default {
  props: {
    resetList: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    renderList: {
      type: Array,
      default: () => []
    },
    tableColumn: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    renderList: {
      immediate: true,
      deep: true,
      handler (newValue, oldValue) {
        if (this.loading) return
        //深度复制父组件数据
        this.thatRenderList = util.deepCopy(newValue);
        //备份
        this.backupsRenderList = util.deepCopy(this.thatRenderList);
        //把列表返回给父组件
        this.setTabRender();
      }
    },
    visible (newVal) {
      if (!newVal && this.submitFlag && this.backupsRenderList.length > 0) {
        this.thatRenderList = this.backupsRenderList;
        this.submitFlag = false;
        this.backupsRenderList = [];
      } else {
        //关闭时在次备份
        this.backupsRenderList = util.deepCopy(this.thatRenderList);
      }
    }
  },
  data () {
    return {
      visible: false, //  弹出框开关
      thatRenderList: [], //checkbox渲染list
      backupsRenderList: [], //存储备份用于恢复除开按钮以外的关闭
      submitFlag: false //修改了是否有提交
    };
  },
  created () { },
  methods: {
    setListCheck (item) {
      item.default = !item.default;
      //如果进行了修改把标记修改为true
      this.submitFlag = true;
    },
    setTabRender () {
      let rendelOptions = ["prop", "label", "width", "order", "formart"];
      let result = [];
      this.thatRenderList.forEach((item, index) => {
        let newObj = {};
        if (item.default) {
          for (let options of rendelOptions) {
            if (options in item) {
              newObj[options] = item[options];
            }
          }
          result.push(newObj);
        }
      });
      //确定按钮提交时把标记关闭
      this.submitFlag = false;

      let difference = this.backupsRenderList.filter((item, index) => item.default != this.thatRenderList[index].default);
      //关闭弹框
      this.visible = false;
      //提交数据到父级
      this.$emit("change", result, difference.length);
    },
    resetTabRender () {
      //重置默认数据
      this.thatRenderList = util.deepCopy(this.resetList);
      //再次渲染
      this.setTabRender();
    }
  }
};
</script>
