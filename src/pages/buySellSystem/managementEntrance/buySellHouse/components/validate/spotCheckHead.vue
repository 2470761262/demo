<style scoped lang="less">
.conditions {
  // prettier-ignore
  padding: 0 24PX 20PX 24PX;
  background: #fff;
  // prettier-ignore
  border-bottom-left-radius: 8PX;
  // prettier-ignore
  border-bottom-right-radius: 8PX;
  /deep/.conditions-box {
    .el-form-item__label {
      // prettier-ignore
      line-height: 36PX;
      font-weight: bold;
      font-size: @font14;
      color: #303133;
    }
    .el-input__inner {
      // prettier-ignore
      height: 36PX;
      font-size: @font14;
    }
    .el-form-item {
      // prettier-ignore
      margin-bottom: 24PX;
    }
    .el-range-input {
      text-align: left;
      // prettier-ignore
      text-indent: 10PX;
      font-size: @font14;
    }
    .prefix-icon {
      width: 0;
    }
    .el-date-editor {
      width: 100%;
      .el-range-separator {
        display: flex;
        justify-content: center;
        align-items: center;
        width: auto;
        padding: 0;
        line-height: 1;
        text-indent: 0;
        font-size: @font14;
      }
    }
  }
  .conditions-btn {
    display: flex;
    justify-content: flex-end;
    .btn {
      // prettier-ignore
      width: 90PX;
      // prettier-ignore
      height: 36PX;
      border: none;
      border-radius: 4px;
      background: #fff;
      outline: none;
      line-height: 1;
      text-align: center;
      font-size: @font12;
      color: @backgroud;
      cursor: pointer;
      &.active {
        // prettier-ignore
        margin-left: 9PX;
        background: @backgroud;
        color: #fff;
      }
    }
  }
}
</style>
<template>
  <div class="conditions">
    <div class="conditions-box">
      <el-row :gutter="32">
        <el-form label-position="right" label-width="80px">
          <el-col :span="6">
            <el-form-item label="房源编号">
              <el-input
                v-model="form.houseNo"
                placeholder="请输入房源编号"
                @change="moreConditionChange"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-row :gutter="10">
              <el-form-item label="楼盘">
                <el-col :span="8">
                  <el-select
                    v-model="community.value"
                    placeholder="楼盘"
                    clearable
                    filterable
                    remote
                    value-key="value"
                    :loading="community.loading"
                    :remote-method="getCommunityList"
                    @focus="communityFocus"
                    @change="communityChange"
                  >
                    <el-option
                      v-for="item in community.list"
                      :key="item.value"
                      :label="item.name"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-select
                    v-model="building.value"
                    placeholder="栋座"
                    clearable
                    filterable
                    remote
                    value-key="value"
                    :remote-method="getBuilding"
                    @change="buildingChange"
                  >
                    <el-option
                      v-for="item in building.list"
                      :key="item.value"
                      :label="item.name"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-select
                    v-model="room.value"
                    placeholder="请输入房号"
                    clearable
                    filterable
                    remote
                    value-key="value"
                    :remote-method="getRoomList"
                    @change="roomChange"
                  >
                    <el-option
                      v-for="item in room.list"
                      :key="item.value"
                      :label="item.name"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-row>
          </el-col>

          <el-col :span="6">
            <el-form-item label="所属门店">
              <el-select
                v-model="department.value"
                placeholder="所属门店"
                clearable
                filterable
                remote
                @focus="departmentFocus"
                @change="departmentChange"
                :loading="department.loading"
              >
                <el-option
                  v-for="item in department.list"
                  :key="item.depId"
                  :label="item.depName"
                  :value="item.depId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="跟单人">
              <el-select
                v-model="agent.value"
                placeholder="跟单人"
                clearable
                filterable
                remote
                value-key="value"
                :loading="agent.loading"
                @change="agentChange"
              >
                <el-option
                  v-for="item in agent.list"
                  :key="item.accountId"
                  :label="item.perName"
                  :value="item.accountId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="conditions-btn">
      <button class="btn" @click="rest">重置</button>
      <button class="btn active" @click="moreConditionChange">查询</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        houseNo: "",
        comId: "",
        cbId: "",
        bhId: "",
        store: "",
        personnel: ""
      },
      community: {
        loading: false,
        list: [],
        value: ""
      },
      building: {
        loading: false,
        list: [],
        value: ""
      },
      room: {
        loading: false,
        list: [],
        value: ""
      },
      agent: {
        loading: false,
        list: [],
        value: ""
      },
      department: {
        loading: false,
        list: [],
        value: null
      }
    };
  },
  methods: {
    /**
     *@example:查询条件改变事件
     */
    moreConditionChange() {
      this.form.houseNo = this.form.houseNo.trim();
      this.$emit("moreConditionChange", this.form);
    },
    /**
     * @example:重置条件
     */
    rest() {
      Object.assign(this.$data, this.$options.data());
      this.$emit("moreConditionChange", this.form);
    },
    /**
     * @example:楼盘获取焦点事件
     */
    communityFocus() {
      if (this.community.list.length == 0) {
        this.getCommunityList();
      }
    },
    /**
     * @example:楼盘改变事件
     */
    communityChange(item) {
      this.form.comId = item ? item.value : "";
      //清楚楼栋和房间数据
      this.form.cbId = "";
      this.form.bhId = "";
      this.building.value = "";
      this.building.list = [];
      this.room.value = "";
      this.room.list = [];
      this.moreConditionChange();
      if (this.form.comId != "") {
        this.getBuilding();
      }
    },
    /**
     * @example:楼栋改变事件
     */
    buildingChange(item) {
      this.form.cbId = item ? item.value : "";
      //清楚房间数据
      this.room.value = "";
      this.room.list = [];
      this.form.bhId = "";
      this.moreConditionChange();
      if (this.form.cbId != "") {
        this.getRoomList();
      }
    },
    /**
     * @example:房间改变事件
     */
    roomChange(item) {
      this.form.bhId = item ? item.value : "";
      this.moreConditionChange();
    },
    /**
     * @example:部门获取焦点事件
     */
    departmentFocus() {
      if (this.department.list.length == 0) {
        this.getDepartmentList();
      }
    },
    /**
     * @example:部门改变事件
     */
    departmentChange(value) {
      this.form.store = value;
      //清楚人员数据
      this.agent.list = [];
      this.agent.value = "";
      this.form.personnel = "";
      this.moreConditionChange();
      if (value != "") {
        this.getPersonnelList();
      }
    },
    /**
     * @example:人员改变事件
     */
    agentChange(value) {
      this.form.personnel = value;
      this.moreConditionChange();
    },
    /**
     * @example:获取楼盘数据
     * @param {String} 搜索值
     */
    getCommunityList(query) {
      this.community.loading = true;
      this.$api
        .post({
          url: "/spotCheck/spotCheckList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            communityName: query ? query.trim() : "",
            page: 1,
            limit: 50,
            communityType: "community"
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.community.list = e.data.data.list;
          }
        })
        .finally(() => {
          this.community.loading = false;
        });
    },
    /**
     * @example:获取楼栋数据
     */
    getBuilding(query) {
      this.building.loading = true;
      this.$api
        .get({
          url: "/mateHouse/queryComBuilding",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            comId: this.form.comId,
            page: 1,
            limit: 100,
            comBuildingName: query ? query.trim() : ""
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.building.list = e.data.data.list;
          }
        })
        .finally(() => {
          this.building.loading = false;
        });
    },
    /**
     * @example:获取房源列表
     */
    getRoomList(query) {
      this.room.loading = true;
      this.$api
        .get({
          url: "/mateHouse/queryBuildIngHouses",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            comId: this.form.comId,
            cbId: this.form.cbId,
            page: 1,
            limit: 500,
            roomNo: query ? query.trim() : ""
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.room.list = e.data.data.list;
          }
        })
        .finally(() => {
          this.room.loading = false;
        });
    },
    /**
     * @example:获取部门列表
     */
    getDepartmentList() {
      this.department.loading = true;
      this.$api
        .post({
          url: "/spotCheck/spotCheckList",
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
     * @example:获取人员列表
     */
    getPersonnelList() {
      this.agent.loading = true;
      this.$api
        .post({
          url: "/spotCheck/spotCheckList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            selectType: "MORE_SELECT_PER",
            selectDepartment: this.form.store
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
    }
  }
};
</script>
