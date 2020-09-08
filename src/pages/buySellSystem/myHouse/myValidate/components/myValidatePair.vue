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

    <!-- 业主 -->
    <div class="search-item">
      <div class="search-item-title ">业主姓名</div>
      <div class="search-item-body">
        <el-input
          clearable
          v-model="cusName"
          maxlength="5"
          class="input-text "
          placeholder="业主姓名"
          oninput="value = value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, '')"
          @blur="handleInputBlur('cusName', 'customrName')"
        ></el-input>
      </div>
    </div>
    <!-- 电话 -->
    <div class="search-item">
      <div class="search-item-title ">业主电话</div>
      <div class="search-item-body">
        <el-input
          v-number
          clearable
          maxlength="11"
          v-model="cusPhone"
          class="input-text"
          placeholder="业主电话"
          @blur="handleInputBlur('cusPhone', 'tel')"
        ></el-input>
      </div>
    </div>
    <!-- 所属门店 -->
    <div class="search-item">
      <div class="search-item-title ">所属门店</div>
      <div class="search-item-body">
        <el-select
          class="anchor-point"
          popper-class="anchor-point"
          data-anchor="我的验真所属门店 => select"
          @click.native="log_socket.sendUserActionData"
          v-model="form.department"
          placeholder="请输入门店名称"
          clearable
          filterable
          @focus="departmentFocus"
          :loading="department.loading"
          value-key="value"
        >
          <el-option
            class="anchor-point"
            :data-anchor="'我的验真所属门店 => select => option:' + item.depName"
            @click.native="log_socket.sendUserActionData"
            v-for="item in department.list"
            :key="item.depId"
            :label="item.depName"
            :value="item.depId"
          ></el-option>
        </el-select>
      </div>
    </div>
    <!-- 验真状态 -->
    <div class="search-item">
      <div class="search-item-title ">验真状态</div>
      <div class="search-item-body">
        <el-select
          clearable
          v-model="form.checkStatusValue"
          popper-class="options-myhouse-custom-item anchor-point"
        >
          <el-option
            class="anchor-point"
            v-for="item in searchTabList"
            :key="item.title"
            :label="item.title"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <!-- 验真类型 -->
    <div class="search-item">
      <div class="search-item-title ">验真类型</div>
      <div class="search-item-body">
        <el-select
          clearable
          v-model="form.validateType"
          popper-class="options-myhouse-custom-item anchor-point"
        >
          <el-option
            class="anchor-point"
            v-for="item in validateTypeList"
            :key="item.title"
            :label="item.title"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <!-- 验真方式 -->
    <div class="search-item">
      <div class="search-item-title ">验真方式</div>
      <div class="search-item-body">
        <el-select
          clearable
          v-model="form.validateWay"
          popper-class="options-myhouse-custom-item anchor-point"
        >
          <el-option
            class="anchor-point"
            v-for="item in validateWayList"
            :key="item.title"
            :label="item.title"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>

    <!-- 录入时间 -->
    <div class="search-item">
      <div class="search-item-title ">录入时间</div>
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

// 验真状态
const SEARCHTABLIST = [
  { title: "全部", value: "" },
  { title: "草稿", value: "0" },
  { title: "待验真", value: "1" }, //checkSubStatus:0
  { title: "验真成功", value: "2" },
  { title: "验真失败", value: "3" },
  { title: "已过期", value: "4" } //checkSubStatus:1
];
// 验真类型
const VALIDATETYPELIST = [
  { title: "全部", value: "" },
  { title: "类型1", value: "0" },
  { title: "类型2", value: "1" }
]
// 验真方式
const VALIDATEWAYLIST = [
  { title: "全部", value: "" },
  { title: "方式1", value: "0" },
  { title: "方式2", value: "1" }
]
export default {
  inject: ["form"],
  mixins: [cascadeHouse],
  data() {
    return {
      validateWayList: VALIDATEWAYLIST,
      validateTypeList: VALIDATETYPELIST,
      searchTabList: SEARCHTABLIST,
      checkStatusValue: this.form.checkStatusValue, //验真状态
      cusName: "", //业主姓名
      cusPhone: "", //业主号码
      department: {
        loading: false,
        list: []
      }, // 所属门店
    };
  },
  methods: {
    /**
     * @example: 请求所属门店数据
     */
    getDepartmentList() {
      this.department.loading = true;
      this.$api
        .post({
          url: "/spotCheck/spotCheckRecordList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            selectType: "MORE_SELECT_SHOP"
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.department.list = e.data.data;
          }
        })
        .finally(() => {
          this.department.loading = false;
        });
    },
    /**
     * @example: 所属门店获取焦点事件
     */
    departmentFocus() {
      this.getDepartmentList();
    },
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
      this.form.customrName = this.cusName;
      this.form.tel = this.cusPhone;
      this.form.random = new Date().getTime();
    }
  }
};
</script>
