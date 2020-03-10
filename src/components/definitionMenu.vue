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
                   :checked="item.flag"
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
                 type="primary">自定义菜单</el-button>
    </el-popover>
  </div>
</template>

<script>
import util from '@/util/util';
export default {
  props: {
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
        this.thatRenderList = util.deepCopy(newValue);
      }
    },
    tableColumn: {
      immediate: true,
      deep: true,
      handler (newValue, oldValue) {
        this.thatTableColumn = util.deepCopy(newValue);
      }
    },
    visible (newVal) {
      if (newVal) {
        this.ordThatRenderList = util.deepCopy(this.thatRenderList);
        this.ordThatTableColumn = util.deepCopy(this.thatTableColumn);
      } else {
        if (this.submitFlag == false) {
          this.thatRenderList = util.deepCopy(this.ordThatRenderList);
          this.thatTableColumn = util.deepCopy(this.ordThatTableColumn);
        }
      }
    }
  },
  data () {
    return {
      visible: false, //  弹出框开关
      thatRenderList: [],  //checkbox渲染list
      thatTableColumn: [], //表格渲染list
      ordThatRenderList: [], //checkbox渲染list 如果修改了之后没有提交则保存 关闭的时候覆盖给thatRenderList
      ordThatTableColumn: [],//表格渲染list 如果修改了之后没有提交则保存 关闭的时候覆盖给thatTableColumn
      submitFlag: true//修改了是否有提交
    }
  },
  created () {
    if (this.thatTableColumn.length == 0) {
      this.resetTabRender();
    }

  },
  methods: {
    setListCheck (item) {
      if (item.disabled)
        return false;
      this.submitFlag = false;
      item.flag = !item.flag;
      if (item.flag == true) {
        this.thatTableColumn.push(item);
      } else {
        let Index = this.thatTableColumn.findIndex((coLitem) => {
          return coLitem.prop == item.prop;
        })
        this.thatTableColumn.splice(Index, 1);
      }
      this.$forceUpdate();
    },
    setTabRender () {
      this.$emit("change", this.thatTableColumn);
      this.visible = false;
      this.submitFlag = true;
    },
    resetTabRender () {
      this.thatTableColumn = [];
      this.thatRenderList.forEach((parItem, parindex) => {
        parItem.flag = false;
        if (parItem.default) {
          parItem.flag = true;
          this.thatTableColumn.push(parItem);
        }
      })
      this.$forceUpdate();
      this.$emit("change", this.thatTableColumn);
      this.visible = false;
      this.submitFlag = true;
    }
  },

}
</script>
