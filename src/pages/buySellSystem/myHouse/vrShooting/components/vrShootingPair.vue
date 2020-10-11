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
        房屋坐落
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
          data-anchor="VR拍摄楼盘 => select"
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
            :data-anchor="'VR拍摄楼盘 => select => option:' + item.name"
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
          data-anchor="VR拍摄栋座 => select"
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
            :data-anchor="'VR拍摄栋座 => select => option:' + item.name"
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
          data-anchor="VR拍摄房号 => select"
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
            :data-anchor="'VR拍摄房号 => select => option:' + item.name"
            @click.native="log_socket.sendUserActionData"
            :key="item.value"
            :label="item.name"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <!-- 所属门店 -->
    <div class="search-item">
      <div class="search-item-title ">所属门店</div>
      <div class="search-item-body">
        <el-select
          class="anchor-point"
          popper-class="options-myhouse-custom-item anchor-point"
          data-anchor="VR拍摄所属门店 => select"
          @click.native="log_socket.sendUserActionData"
          v-model="form.storeId"
          placeholder="请输入门店名称"
          clearable
          filterable
          @focus="departmentFocus"
          @change="departmentChange"
          :loading="department.loading"
          value-key="value"
        >
          <el-option
            class="anchor-point"
            :data-anchor="'VR拍摄所属门店 => select => option:' + item.depName"
            @click.native="log_socket.sendUserActionData"
            v-for="item in department.list"
            :key="item.depId"
            :label="item.depName"
            :value="item.depId"
          ></el-option>
        </el-select>
      </div>
    </div>

    <!-- 申请人 -->
    <div class="search-item">
      <div class="search-item-title ">申请人</div>
      <div class="search-item-body">
        <el-select
          class="width100 anchor-point"
          popper-class="options-myhouse-custom-item anchor-point"
          data-anchor="VR拍摄列表 申请人 => select"
          @click.native="log_socket.sendUserActionData"
          v-model="agent.value"
          placeholder="请输入申请人姓名"
          clearable
          filterable
          @change="agentChange"
          :loading="agent.loading"
          value-key="value"
        >
          <el-option
            class="anchor-point"
            :data-anchor="
              'VR拍摄列表 申请人 => select => option:' + item.perName
            "
            @click.native="log_socket.sendUserActionData"
            v-for="item in agent.list"
            :key="item.accountId"
            :label="item.perName"
            :value="item.accountId"
          ></el-option>
        </el-select>
      </div>
    </div>
    <!-- 状态 -->
    <div class="search-item">
      <div class="search-item-title ">状态</div>
      <div class="search-item-body">
        <el-select
          clearable
          data-anchor="VR拍摄状态 => select"
          @click.native="log_socket.sendUserActionData"
          v-model="form.taskState"
          popper-class="options-myhouse-custom-item anchor-point"
        >
          <el-option
            class="anchor-point"
            :data-anchor="'VR拍摄状态 => select => option:' + item.title"
            v-for="item in statusList"
            :key="item.title"
            :label="item.title"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <!-- 申请结果 -->
    <div class="search-item">
      <div class="search-item-title ">申请结果</div>
      <div class="search-item-body">
        <el-select
          clearable
          data-anchor="VR拍摄申请结果 => select"
          @click.native="log_socket.sendUserActionData"
          v-model="form.status"
          popper-class="options-myhouse-custom-item anchor-point"
        >
          <el-option
            class="anchor-point"
            :data-anchor="'VR拍摄申请结果 => select => option:' + item.title"
            v-for="item in searchTabList"
            :key="item.title"
            :label="item.title"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <!-- 申请时间 -->
    <div class="search-item">
      <div class="search-item-title ">申请时间</div>
      <div class="search-item-body">
        <el-date-picker
          v-model="form.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
          value-format="yyyy-MM-dd HH:mm:ss"
          class="anchor-point"
          :data-anchor="'VR拍摄 申请时间:' + form.time"
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
            data-anchor="VR拍摄列表重置"
            @click="resetLoad"
            >重置</span
          >
          <button
            class="anchor-pointn"
            data-anchor="VR拍摄列表搜索"
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

// 状态
const STATUSLIST = [
  { title: "全部", value: "" },
  { title: "等待拍摄", value: 9000 },
  { title: "等待上传数据包", value: 10000 },
  { title: "房源已上传", value: 20000 },
  { title: "已经分配人员制作", value: 30000 },
  { title: "处理中", value: 40000 },
  { title: "客户审核中", value: 45000 },
  { title: "已完成", value: 50000 },
  { title: "已取消", value: 51000 },
  { title: "制作失败", value: 52000 }
];
// 申请结果
const SEARCHTABLIST = [
  { title: "全部", value: "" },
  { title: "拍摄中", value: 0 },
  { title: "制作中", value: 4 },
  { title: "制作完成", value: 1 },
  { title: "已取消", value: 2 },
  { title: "系统取消", value: 5 },
  { title: "已失败", value: 3 }
];

export default {
  inject: ["form"],
  mixins: [cascadeHouse],
  data() {
    return {
      getBuildDataUrl: "/community/vr/apply",
      getTowerDataUrl: "/mateHouse/queryComBuilding",
      getRoomsDataUrl: "/mateHouse/queryBuildIngHouses",
      statusList: STATUSLIST,
      searchTabList: SEARCHTABLIST,
      department: {
        loading: false,
        list: []
      }, // 所属门店
      agent: {
        loading: false,
        list: [],
        value: ""
      } // 申请人
    };
  },
  methods: {
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
    getDepartmentList() {
      this.department.loading = true;
      this.$api
        .post({
          url: "/myHouse/vrApplyStoreList",
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
      if (this.department.list.length == 0) {
        this.getDepartmentList();
      }
    },
    /**
     * @example: 所属门店选择事件
     */
    departmentChange(value) {
      this.agent.list = [];
      this.agent.value = "";
      this.form.applyPer = "";
      if (value != "") {
        this.getAgentList();
      }
    },
    /**
     * @example: 获取跟单人列表数据
     */
    getAgentList() {
      this.agent.loading = true;
      this.$api
        .post({
          url: "/spotCheck/spotCheckRecordList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            selectType: "MORE_SELECT_PER",
            selectDepartment: this.form.storeId
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.agent.list = e.data.data;
          }
        })
        .finally(() => {
          this.agent.loading = false;
        });
    },
    /**
     * @example: 申请人选择事件
     */
    agentChange(value) {
      this.agent.value = value;
      this.form.applyPer = value;
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
      this.form.applyPer = this.agent.value;
    }
  }
};
</script>
