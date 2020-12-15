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
          data-anchor="我的验真楼盘 => select"
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
            :data-anchor="'我的验真列表楼盘 => select => option:' + item.name"
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
          data-anchor="我的验真栋座 => select"
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
            :data-anchor="'我的验真列表栋座 => select => option:' + item.name"
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
          data-anchor="我的验真房号 => select"
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
            :data-anchor="'我的验真列表房号 => select => option:' + item.name"
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
          class="input-text anchor-point"
          :data-anchor="'我的验真列表搜索 业主姓名:' + cusName"
          clearable
          v-model="cusName"
          maxlength="5"
          placeholder="业主姓名"
          oninput="value = value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, '')"
          @blur="handleInputBlur('cusName', 'customerName')"
        ></el-input>
      </div>
    </div>
    <!-- 电话 -->
    <div class="search-item">
      <div class="search-item-title ">业主电话</div>
      <div class="search-item-body">
        <el-input
          class="input-text anchor-point"
          :data-anchor="'我的验真列表搜索 业主电话:' + cusPhone"
          v-number
          clearable
          maxlength="11"
          v-model="cusPhone"
          placeholder="业主电话"
          @blur="handleInputBlur('cusPhone', 'tel')"
        ></el-input>
      </div>
    </div>
    <!-- 所属区域 -->
    <div class="search-item">
      <div class="search-item-title ">所属区域</div>
      <div class="search-item-body">
        <el-select
          class="width100 anchor-point"
          popper-class="anchor-point"
          data-anchor="我的验真所属区域 => select"
          @click.native="log_socket.sendUserActionData"
          v-model="form.areaId"
          placeholder="请输入区域名称"
          clearable
          filterable
          @focus="areaFocus"
          @change="areaChange"
          :loading="area.loading"
          value-key="value"
        >
          <el-option
            class="anchor-point"
            :data-anchor="
              '我的验真所属区域 => select => option:' + item.depName
            "
            @click.native="log_socket.sendUserActionData"
            v-for="item in area.list"
            :key="item.depId"
            :label="item.depName"
            :value="item.depId"
          ></el-option>
        </el-select>
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
          v-model="form.storeId"
          placeholder="请输入门店名称"
          clearable
          filterable
          @focus="departmentFocus"
          :loading="department.loading"
          value-key="value"
        >
          <el-option
            class="anchor-point"
            :data-anchor="
              '我的验真所属门店 => select => option:' + item.depName
            "
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
          data-anchor="我的验真验真状态 => select"
          @click.native="log_socket.sendUserActionData"
          clearable
          v-model="form.checkStatus"
          popper-class="options-myhouse-custom-item anchor-point"
        >
          <el-option
            class="anchor-point"
            :data-anchor="'我的验真验真状态 => select => option:' + item.title"
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
          data-anchor="我的验真验真类型 => select"
          @click.native="log_socket.sendUserActionData"
          clearable
          v-model="form.source"
          popper-class="options-myhouse-custom-item anchor-point"
        >
          <el-option
            class="anchor-point"
            :data-anchor="'我的验真验真类型 => select => option:' + item.title"
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
          data-anchor="我的验真验真方式 => select"
          @click.native="log_socket.sendUserActionData"
          clearable
          v-model="form.mode"
          popper-class="options-myhouse-custom-item anchor-point"
        >
          <el-option
            class="anchor-point"
            :data-anchor="'我的验真验真方式 => select => option:' + item.title"
            v-for="item in validateWayList"
            :key="item.title"
            :label="item.title"
            :value="item.value"
          ></el-option>
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
          :default-time="['00:00:00', '23:59:59']"
          class="anchor-point"
          :data-anchor="'我的验真 提交时间:' + form.time"
        >
        </el-date-picker>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="search-item span-flex">
      <div class="search-item-body">
        <div class="btn-content">
          <span
            class="anchor-pointn"
            data-anchor="我的验真列表重置"
            @click="resetLoad"
            >重置</span
          >
          <button
            class="anchor-pointn"
            data-anchor="我的验真列表搜索"
            @click="validateFrom"
          >
            搜索
          </button>
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
  { title: "待验真", value: "1" }, //checkSubStatus:0
  { title: "验真成功", value: "2" },
  { title: "验真失败", value: "3" }
  // { title: "已过期", value: "4" } //checkSubStatus:1
];
// 验真类型
const VALIDATETYPELIST = [
  { title: "全部", value: "" },
  { title: "录入验真", value: "1" },
  { title: "抽检验真", value: "2" },
  { title: "修改号码验真", value: "3" },
  { title: "库存验真", value: "4" }
];
// 验真方式
const VALIDATEWAYLIST = [
  { title: "全部", value: "" },
  { title: "微信验真", value: "1" },
  { title: "短信验真", value: "2" },
  { title: "信息员验真", value: "3" },
  { title: "暂无", value: "0" }
];
export default {
  inject: ["form"],
  mixins: [cascadeHouse],
  data() {
    return {
      isInitLoadroomList: false, // 选择楼栋是否加载房间列表
      validateWayList: VALIDATEWAYLIST,
      validateTypeList: VALIDATETYPELIST,
      searchTabList: SEARCHTABLIST,
      checkStatusValue: this.form.checkStatusValue, //验真状态
      cusName: "", //业主姓名
      cusPhone: "", //业主号码
      area: {
        loading: false,
        list: []
      }, // 所属区域
      department: {
        // 所属门店
        loading: false,
        list: []
      }
    };
  },
  methods: {
    /**
     * @example: 所属门店获取焦点事件
     */
    areaFocus() {
      this.getAreaList();
    },
    /**
     * @example: 所属门店选择事件
     */
    areaChange(value) {
      this.department.list = [];
      this.form.storeId = "";
      if (value != "") {
        this.getDepartmentList();
      }
    },
    /**
     * @example: 远程获取房间号信息
     * @param {String} e 输入搜索的文本
     */
    queryRoomData(e) {
      this.$api
        .get({
          url: "/mateHouse/queryBuildIngHouses",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            comId: this.form.comId,
            cbId: this.form.cbId,
            limit: 20,
            roomNo: e == undefined ? "" : e.trim()
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.roomForList = e.data.data.list;
          }
        })
        .finally(() => {
          this.roomLoading = false;
        });
    },
    /**
     * @example: 请求所属门店数据
     */
    getAreaList() {
      this.area.loading = true;
      this.$api
        .post({
          url: "/myHouse/myVerifyList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            selectType: "MORE_SELECT_AREA"
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.area.list = e.data.data;
          }
        })
        .finally(() => {
          this.area.loading = false;
        });
    },
    /**
     * @example: 请求所属门店数据
     */
    getDepartmentList() {
      this.department.loading = true;
      this.$api
        .post({
          url: "/myHouse/myVerifyList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            selectType: "MORE_SELECT_SHOP",
            areaId: this.form.areaId
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
      if (this.department.list.length == 0) {
        this.getDepartmentList();
      }
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
      this.form.customerName = this.cusName;
      this.form.tel = this.cusPhone;
      this.form.random = new Date().getTime();
    }
  }
};
</script>
