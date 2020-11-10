<style lang="less" scoped>
@import "../../myHouse/less/public.less";
.content-child {
  .content-warp {
    background: #fff;
    // prettier-ignore
    padding: 0 24PX;
    .implant-nav {
      display: flex;
      // prettier-ignore
      padding:16PX 0 24PX;
      .implant-nav-item {
        // prettier-ignore
        padding: 8PX 16PX;
        color: #606266;
        cursor: pointer;
        // prettier-ignore
        margin-right: 8PX;
        font-size: @font14;
        &.active {
          color: #fff;
          background: @backgroud;
          // prettier-ignore
          border-radius:8PX ;
        }
      }
    }
  }
  .search-content {
    padding-top: 0;
    background: #fff;
  }
}
.span-flex {
  padding-right: 0 !important;
}
@media screen and (max-width: 1440px) {
  .search-item {
    &:nth-child(3n) {
      padding-right: 0 !important;
    }
  }
}
@media screen and (min-width: 1440px) {
  .search-item {
    &:nth-child(4n) {
      padding-right: 0 !important;
    }
  }
}
</style>
<template>
  <div class="content-child">
    <nav-menu :navMenuIndex="1"></nav-menu>
    <tabs :navActiveIndex="7"></tabs>
    <div class="search-content">
      <!-- 楼盘 栋座 房间号 联级 -->
      <div class="search-item">
        <div class="search-item-title title-width80">
          楼盘
        </div>
        <div class="search-item-body">
          <el-select
            v-model="buildOptData"
            placeholder="楼盘名称"
            class="input-content anchor-point"
            clearable
            filterable
            remote
            popper-class="options-myhouse-custom-item anchor-point"
            data-anchor="买卖房源状态记录楼盘 => select"
            @click.native="log_socket.sendUserActionData"
            @focus="remoteBuildInput"
            @change="remoteBuildChange"
            :remote-method="buildRemoteMethod"
            :loading="buildLoading"
            value-key="value"
          >
            <el-option
              v-for="item in buildForList"
              class="anchor-point"
              :data-anchor="
                '买卖房源状态记录楼盘 => select => option:' + item.name
              "
              @click.native="log_socket.sendUserActionData"
              :key="item.value"
              :label="item.name"
              :value="item"
            >
            </el-option>
          </el-select>
          <!-- 栋座 -->
          <el-select
            v-model="towerOptData"
            placeholder="栋座"
            clearable
            filterable
            class="input-content  anchor-point"
            popper-class="options-myhouse-custom-item anchor-point"
            data-anchor="买卖房源状态记录栋座 => select"
            @click.native="log_socket.sendUserActionData"
            value-key="value"
            remote
            :remote-method="queryRoomNo"
            @change="remoteRoomNoChange"
            :loading="towerLoading"
          >
            <el-option
              v-for="item in towerForList"
              class="anchor-point"
              :data-anchor="
                '买卖房源状态记录栋座 => select => option:' + item.name
              "
              @click.native="log_socket.sendUserActionData"
              :key="item.value"
              :label="item.name"
              :value="item"
            >
            </el-option>
          </el-select>
          <!-- 房间号 -->
          <el-select
            v-model="roomOptData"
            placeholder="房间号"
            clearable
            filterable
            popper-class="options-myhouse-custom-item anchor-point"
            class="input-content  anchor-point"
            data-anchor="买卖房源状态记录房号 => select"
            @click.native="log_socket.sendUserActionData"
            remote
            :remote-method="queryAllRoomData"
            :loading="roomLoading"
            value-key="value"
            @change="queryRoomDataChange"
          >
            <el-option
              v-for="item in roomForList"
              class="anchor-point"
              :data-anchor="
                '买卖房源状态记录房号 => select => option:' + item.name
              "
              @click.native="log_socket.sendUserActionData"
              :key="item.value"
              :label="item.name"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- 挂牌时间 -->
      <div class="search-item">
        <div class="search-item-title ">转换时间</div>
        <div class="search-item-body">
          <el-date-picker
            v-model="form.time"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </div>
      <!-- 状态 -->
      <div class="search-item ">
        <div class="search-item-title ">状态</div>
        <div class="search-item-body">
          <el-select
            v-model="form.newSaleTag"
            placeholder="请选择状态"
            clearable
            filterable
            data-anchor="买卖房源状态记录选择状态 => select"
            @click.native="log_socket.sendUserActionData"
          >
            <el-option
              v-for="item in statusList"
              class="anchor-point"
              :data-anchor="
                '买卖房源状态记录选择状态 => select => option:' + item.label
              "
              @click.native="log_socket.sendUserActionData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="search-item span-flex">
        <div class="search-item-body">
          <div class="btn-content">
            <span @click="resetLoad">重置</span>
            <button @click="validateFrom">搜索</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navMenu from "../components/entranceNavMenu.vue";
import tabs from "../buySellHouse/components/tabs.vue";
//楼盘 楼栋 房间号 级联 mixins
import cascadeHouse from "@/minxi/cascadeHouse";
export default {
  inject: ["form"],
  mixins: [cascadeHouse],
  components: {
    navMenu,
    tabs
  },
  $_veeValidate: {
    validator: "new" // give me my own validator scope.
  },
  data() {
    return {
      isInitLoadroomList: false, // 选择楼栋是否加载房间列表
      statusList: [
        {
          value: 3,
          label: "无效"
        },
        {
          value: 4,
          label: "他司售"
        },
        {
          value: 5,
          label: "暂不售"
        },
        {
          value: 6,
          label: "业主自售"
        }
      ],
      status: "", //状态
      time: [] //转换时间
    };
  },
  methods: {
    /**
     * @example: 失去焦点
     * @param {string} formField 失去交单的属性名称
     * @param {string} toFileld  需要赋值给form的属性名称
     */
    handleInputBlur(formField, toFileld) {
      this.form[toFileld] = this[formField];
    },
    resetLoad() {
      Object.assign(this.$parent.$data.form, this.$parent.$options.data().form);
      Object.assign(this.$data, this.$options.data());
    },
    validateFrom() {
      this.$validator.validateAll().then(e => {
        if (e) {
          this.form.status = this.status;
          this.form.time = this.time;
          this.form.random = this.form.random = new Date().getTime();
        }
      });
    }
  }
};
</script>
