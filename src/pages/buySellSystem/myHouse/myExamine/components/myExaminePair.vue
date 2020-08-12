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
    <!-- 提交时间 -->
    <div class="search-item">
      <div class="search-item-title ">提交时间</div>
      <div class="search-item-body">
        <el-date-picker
          v-model="form.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
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
          @blur="handleInputBlur('houseNo', 'houseNo')"
        ></el-input>
      </div>
    </div>

    <!-- 审核项目 -->
    <div class="search-item">
      <div class="search-item-title ">审核项目</div>
      <div class="search-item-body">
        <el-select
          v-model="form.checkProject"
          clearable
          popper-class="options-myhouse-custom-item anchor-point"
        >
          <el-option
            class="anchor-point"
            v-for="item in checkprojectlist"
            :key="item.title"
            :label="item.title"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <!-- 审核类型 -->
    <div class="search-item">
      <div class="search-item-title ">审核类型</div>
      <div class="search-item-body">
        <el-select
          v-model="form.checkTypeStr"
          clearable
          popper-class="options-myhouse-custom-item anchor-point"
        >
          <el-option
            class="anchor-point"
            v-for="item in defaultcheck"
            :key="item.title"
            :label="item.title"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <!-- 审核状态 -->
    <div class="search-item">
      <div class="search-item-title ">审核状态</div>
      <div class="search-item-body">
        <el-select
          v-model="form.status"
          clearable
          popper-class="options-myhouse-custom-item anchor-point"
        >
          <el-option
            class="anchor-point"
            v-for="item in statelist"
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

const CHECKPROJECTLIST = [
  { value: "1", title: "作业人申请" },
  { value: "4", title: "取代申请" },
  {
    value: "8",
    title: "房源转状态"
  },
  {
    value: "11",
    title: "举报"
  },
  {
    value: "10",
    title: "录入修改"
  }
];
const DEFAULTCHECK = [
  { value: "0", title: "钥匙人" },
  { value: "1", title: "独家委托审核" },
  { value: "4", title: "他司售" },
  { value: "2", title: "虚假实勘" }
];
const STATELIST = [
  { value: "0", title: "待审核" },
  { value: "1", title: "审核通过" },
  { value: "2", title: "未通过" }
];
export default {
  inject: ["form"],
  mixins: [cascadeHouse],
  data() {
    return {
      checkprojectlist: CHECKPROJECTLIST, //审核项目
      defaultcheck: DEFAULTCHECK, //审核类型
      statelist: STATELIST,
      checkStatusValue: this.form.checkStatusValue, //验真状态
      houseNo: "" //房源编号
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
      this.form.random = new Date().getTime();
    }
  }
};
</script>
