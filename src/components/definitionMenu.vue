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
          <div class="el-icon-close"></div>
        </div>
        <div class="definition-checkBox">
          <div class="definition-checkBox-item"
               :class="{'disabled':item.disabled}"
               v-for="(item,index) in thatRenderList"
               @click="setListCheck(item)"
               :key="index">
            <input type="checkbox"
                   :checked="item.flag"
                   :disabled="item.disabled">
            <span>{{item.label}}</span>
          </div>
        </div>
      </div>
      <el-button slot="reference"
                 type="primary">自定义菜单</el-button>
    </el-popover>
  </div>
</template>

<script>
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
  data () {
    return {
      visible: false,
      thatRenderList: this.renderList,
      thatTableColumn: []
    }
  },
  created () {
    this.thatTableColumn = JSON.parse(JSON.stringify(this.tableColumn));
    if (this.thatTableColumn.length == 0) {
      this.thatRenderList.forEach((parItem, parindex) => {
        if (parItem.default) {
          parItem.flag = true;
          this.thatTableColumn.push(parItem);
        } else {
          parItem.flag = false;
        }
      })
      this.$emit("update:tableColumn", this.thatTableColumn);
    }

  },
  methods: {
    setListCheck (item) {
      console.log(1111111);
      if (item.disabled)
        return false;
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
      this.$emit("update:tableColumn", this.thatTableColumn);
    }
  },

}
</script>
