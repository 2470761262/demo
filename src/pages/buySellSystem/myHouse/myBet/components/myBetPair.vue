<style lang="less" scoped>
@import "../../less/public.less";
.split-line {
  background: #f2f2f2;
  // prettier-ignore
  height: 7PX;
}
.search-tab {
  display: flex;
  // prettier-ignore
  padding:15PX 0PX 15PX 15PX;
  div {
    cursor: pointer;
    border: 1px solid @backgroud;
    border-radius: 4px;
    // prettier-ignore
    padding: 5PX 15PX;
    font-size: @font14;
    color: @backgroud;
    // prettier-ignore
    margin-right: 20PX;
    &.active {
      background: @backgroud;
      color: #fff;
      border-color: transparent;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
<template>
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
          class="input-content  anchor-point"
          clearable
          filterable
          remote
          popper-class="options-myhouse-custom-item anchor-point"
          data-anchor="我的房源楼盘 => select"
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
            :data-anchor="'我的房源列表楼盘 => select => option:' + item.name"
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
          data-anchor="我的房源栋座 => select"
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
            :data-anchor="'我的房源列表栋座 => select => option:' + item.name"
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
          data-anchor="我的房源房号 => select"
          @click.native="log_socket.sendUserActionData"
          remote
          :remote-method="queryRoomData"
          :loading="roomLoading"
          value-key="value"
          @change="queryRoomDataChange"
        >
          <el-option
            v-for="item in roomForList"
            class="anchor-point"
            :data-anchor="'我的房源列表房号 => select => option:' + item.name"
            @click.native="log_socket.sendUserActionData"
            :key="item.value"
            :label="item.name"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <!-- 业主姓名 -->
    <div class="search-item">
      <div class="search-item-title ">业主姓名</div>
      <div class="search-item-body">
        <el-input
          clearable
          v-model="houseNo"
          class="input-text "
          placeholder="业主姓名"
        ></el-input>
      </div>
    </div>
    <!-- 业主电话 -->
    <div class="search-item">
      <div class="search-item-title ">业主电话</div>
      <div class="search-item-body">
        <el-input
          clearable
          v-model="houseNo"
          class="input-text "
          placeholder="业主电话"
        ></el-input>
      </div>
    </div>
    <!-- 房源编号 -->
    <div class="search-item">
      <div class="search-item-title ">房源编号</div>
      <div class="search-item-body">
        <el-input
          clearable
          v-model="houseNo"
          class="input-text "
          placeholder="房源编号"
        ></el-input>
      </div>
    </div>

    <!-- 对赌状态 -->
    <div class="search-item">
      <div class="search-item-title ">对赌状态</div>
      <div class="search-item-body">
        <el-select
          clearable
          v-model="form.checkProject"
          popper-class="options-myhouse-custom-item anchor-point"
        >
          <el-option
            class="anchor-point"
            v-for="item in bettype"
            :key="item.title"
            :label="item.title"
            :value="item.value"
          ></el-option>
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
</template>

<script>
//楼盘 楼栋 房间号 级联 mixins
import cascadeHouse from "@/minxi/cascadeHouse";

const BETTYPE = [
  { value: 0, title: "努力中" },
  { value: 1, title: "成功" },
  { value: 2, title: "失败" },
  { value: 3, title: "过期" },
  { value: 4, title: "注销" }
];

export default {
  inject: ["form"],
  mixins: [cascadeHouse],
  data() {
    return {
      bettype: BETTYPE,
      checkStatusValue: this.form.checkStatusValue, //验真状态
      houseNo: "", //房源编号
      cusName: "", //业主姓名
      cusTel: "" //业主电话
    };
  },
  methods: {
    resetLoad() {
      Object.assign(this.$parent.$data.form, this.$parent.$options.data().form);
      Object.assign(this.$data, this.$options.data.call(this.$parent));
    },
    setWorkType(item) {
      this.form.workType = item.value;
    },
    changeNavTypeIndex(index) {
      this.typeActiveIndex = index;
    },
    openMessage(message) {
      this.$message.error(message);
    },
    validateFrom() {
      this.form.houseNo = this.houseNo;
      this.form.customerName = this.cusName;
      this.form.tel = this.cusTel;
    }
  }
};
</script>
