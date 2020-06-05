<style lang="less" scoped>
@pad: 0 30px;

//顶部搜索
.query-head {
  display: flex;
  height: 35px;
  padding: @pad;
  .head-left {
    flex: 1;
    border: 2px solid var(--color--primary);
    display: flex;
    box-shadow: inset 2px 4px 10px rgba(0, 0, 0, 0.2);
    i {
      font-size: 20px;
      margin: 0 20px;
      color: #999;
      height: 100%;
      &::after {
        vertical-align: middle;
        width: 0;
        height: 100%;
        display: inline-block;
        content: "";
      }
      &::before {
        vertical-align: middle;
      }
    }
    input {
      outline: none;
      border: none;
      height: 100%;
      flex: 1;
      background: inherit;
      font-size: 17px;
      padding-right: 20px;
      &::placeholder {
        color: #999;
      }
    }
  }
  .query-left-button {
    border: none;
    outline: none;
    background: var(--color--primary);
    color: #fff;
    width: 138px;
    cursor: pointer;
    margin-right: 20px;
    &:active {
      box-shadow: inset 2px 4px 10px rgba(0, 0, 0, 0.3);
    }
  }
  .query-reset {
    .query-left-button;
    width: 107px;
    margin-right: 0;
    background: #fff;
    border: 2px solid var(--color--primary);
    color: black;
    font-size: 17px;
    box-shadow: none;
  }
}

// 楼栋 & 栋座 & 房间号
.select-content {
  margin-top: 30px;
  display: flex;
  padding: @pad;
  .select-item {
    display: flex;
    align-items: center;
    margin-right: 30px;
    flex: 1;
    &:first-child {
      flex: none;
      .ls-select {
        width: 144px;
      }
    }
    &:last-child {
      margin-right: 0;
    }
    .select-item-title {
      font-size: 17px;
      font-weight: normal;
      color: #666;
      margin-right: 10px;
      flex-shrink: 0;
    }
    .ls-select {
      height: 30px;
      line-height: 30px;
      flex: 1;
      /deep/.is-focus {
        .el-input__suffix {
          border-left-color: var(--color--primary);
          .el-icon-arrow-up::before {
            content: "\E790";
          }
        }
      }
      /deep/.el-input {
        .el-input__inner {
          height: 30px;
          line-height: 30px;
        }
        .el-input__suffix {
          .el-input__icon {
            line-height: 30px;
          }
        }
      }
    }
  }
}

//分割线
.split-line {
  margin: 20px 0 15px;
  height: 5px;
  background: #f2f2f2;
  text-align: center;
  &-text {
    height: auto;
    padding: 5px 0;
    cursor: pointer;
  }
}

//期望input组
.input-group {
  display: flex;
  padding: @pad;
  align-items: center;
  margin-bottom: 25px;
  justify-content: space-between;
  .input-group-left {
    font-size: 17px;
    span {
      margin: 0 10px;
      color: #0d834a;
      font-weight: 600;
    }
  }
  .input-group-right {
    display: flex;
    .input-group-content {
      display: flex;
      align-items: center;
      font-size: 0;
      .group-input-pirfix {
        .col-title;
      }
      input {
        width: 110px;
        text-align: center;
        outline: none;
        border: none;
        border-bottom: 1px solid #ddd;
        height: 30px;
        &::placeholder {
          color: #999;
        }
      }
      .group-split-line {
        height: 1px;
        width: 15px;
        background: #333;
        margin: 0 10px;
      }
      .group-input-suffix {
        color: black;
        margin-left: 5px;
      }
    }
    .group-input-submit {
      background: #fff;
      outline: none;
      border: 1px solid #333;
      border-radius: 4px;
      padding: 4px 20px;
      margin-left: 15px;
      align-self: center;
      cursor: pointer;
      &:active {
        box-shadow: inset 2px 4px 10px rgba(0, 0, 0, 0.3);
      }
    }
  }
}

//chueckBox 组
.check-group {
  padding: @pad;
  display: flex;
  margin-top: 30px;
  .check-group-left {
    .col-title;
    flex-shrink: 0;
  }
  /deep/.el-checkbox-group {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    margin: 0 -15px;
    .check-item {
      flex: 0 0 calc((100% - 180px) / 6);
      margin: 15px 15px 0px;
      width: 0;
      &:nth-child(-n + 6) {
        margin-top: 0;
      }
      .el-checkbox {
        width: 100%;
        height: 25px;
        padding: 0;
        line-height: 23px;
        &.is-checked {
          background: var(--color--primary);
          .el-checkbox__label {
            color: #fff;
          }
        }
        .el-checkbox__input {
          display: none;
        }
        .el-checkbox__label {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
          padding-left: 0;
          text-align: center;
          vertical-align: middle;
          font-size: 14px;
        }
      }
    }
  }
}

.col-title() {
  font-size: 17px;
  margin-right: 20px;
  width: 75px;
  text-align: justify;
  height: 25px;
  line-height: 25px;
  &::after {
    content: "";
    width: 100%;
    height: 0;
    display: inline-block;
  }
}
</style>
<template>
  <div>
    <!-- 顶部搜索 -->
    <div class="query-head">
      <div class="head-left">
        <i class="el-icon-search"></i>
        <input type="text" placeholder="请输入关键字" v-model="searchInfo" />
      </div>
      <button class="query-left-button" @click="goSearch">开始搜索</button>
      <button class="query-reset" @click="resetFormData">
        <i class="el-icon-refresh-right"></i>
        重置
      </button>
    </div>
    <!-- 楼栋 & 栋座 & 房间号-->
    <div class="select-content">
      <div class="select-item">
        <div class="select-item-title">楼盘名称</div>
        <el-select
          class="ls-select"
          v-model="communitySelect.value"
          placeholder="请输入楼盘称呼"
          clearable
          filterable
          remote
          @focus="focusCommunity"
          @change="communityChange"
          :remote-method="remoteCommunity"
          :loding="communitySelect.loading"
          value-key="value"
        >
          <el-option
            v-for="item in communitySelect.list"
            :key="item.value"
            :label="item.name"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
      <div class="select-item">
        <div class="select-item-title">栋座</div>
        <el-select
          class="ls-select"
          v-model="buildingSelect.value"
          placeholder="请选择栋座"
          clearable
          filterable
          @change="buildingChange"
          :loding="buildingSelect.loading"
          value-key="value"
        >
          <el-option
            v-for="item in buildingSelect.list"
            :key="item.value"
            :label="item.name"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
      <div class="select-item">
        <div class="select-item-title">房间号</div>
        <el-select
          class="ls-select"
          v-model="roomSelect.value"
          placeholder="请选择房间号"
          clearable
          filterable
          @change="roomChange"
          :loding="roomSelect.loading"
          value-key="value"
        >
          <el-option
            v-for="item in roomSelect.list"
            :key="item.value"
            :label="item.name"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div v-show="queryFlag">
      <div class="split-line"></div>
      <!-- 期望价格 -->
      <div class="input-group">
        <div class="input-group-left">期望价格<span>100 - 120</span>万</div>
        <div class="input-group-right">
          <div class="input-group-content">
            <input
              type="text"
              placeholder="最低价格"
              v-model="inputGruop.minPrice"
            />
            <div class="group-split-line"></div>
            <input
              type="text"
              placeholder="最高价格"
              v-model="inputGruop.maxPrice"
            />
            <div class="group-input-suffix">万</div>
          </div>
          <button
            class="group-input-submit"
            @click="queryData('Price', '价格')"
          >
            提交
          </button>
        </div>
      </div>
      <!--期望面积  -->
      <div class="input-group">
        <div class="input-group-left">期望面积<span>100 - 120</span>㎡</div>
        <div class="input-group-right">
          <div class="input-group-content">
            <input
              type="text"
              placeholder="最小面积"
              v-model="inputGruop.minInArea"
            />
            <div class="group-split-line"></div>
            <input
              type="text"
              placeholder="最大面积"
              v-model="inputGruop.maxInArea"
            />
            <div class="group-input-suffix">万</div>
          </div>
          <button
            class="group-input-submit"
            @click="queryData('InArea', '面积')"
          >
            提交
          </button>
        </div>
      </div>
      <!-- 楼栋 -->
      <div class="input-group">
        <div class="input-group-right">
          <div class="input-group-content">
            <div class="group-input-pirfix">楼层</div>
            <input
              type="text"
              placeholder="最小楼层"
              v-model="inputGruop.minFloor"
            />
            <div class="group-split-line"></div>
            <input
              type="text"
              placeholder="最高楼层"
              v-model="inputGruop.maxFloor"
            />
            <div class="group-input-suffix">万</div>
          </div>
          <button
            class="group-input-submit"
            @click="queryData('Floor', '楼层')"
          >
            提交
          </button>
        </div>
      </div>
      <!-- 商圈 -->
      <div class="check-group">
        <div class="check-group-left">商圈</div>
        <el-checkbox-group v-model="form.business" size="small">
          <div
            v-for="(item, index) in RegionList"
            :key="index"
            class="check-item"
          >
            <el-tooltip
              :content="item.name"
              :disabled="item.name.length < 4"
              placement="top"
            >
              <el-checkbox :label="item.value" border>{{
                item.name
              }}</el-checkbox>
            </el-tooltip>
          </div>
        </el-checkbox-group>
      </div>
      <!-- 房型 -->
      <div class="check-group">
        <div class="check-group-left">房型</div>
        <el-checkbox-group v-model="form.houseType" size="small">
          <div
            v-for="(item, index) in RoomsList"
            :key="index"
            class="check-item"
          >
            <el-tooltip
              :content="item.name"
              :disabled="item.name.length < 4"
              placement="top"
            >
              <el-checkbox :label="item.value" border>{{
                item.name
              }}</el-checkbox>
            </el-tooltip>
          </div>
        </el-checkbox-group>
      </div>
      <!-- 装修 -->
      <div class="check-group">
        <div class="check-group-left">装修</div>
        <el-checkbox-group v-model="form.renovation" size="small">
          <div
            v-for="(item, index) in RenovationList"
            :key="index"
            class="check-item"
          >
            <el-tooltip
              :content="item.name"
              :disabled="item.name.length < 4"
              placement="top"
            >
              <el-checkbox :label="item.value" border>{{
                item.name
              }}</el-checkbox>
            </el-tooltip>
          </div>
        </el-checkbox-group>
      </div>
      <!-- 房屋用途 -->
      <div class="check-group">
        <div class="check-group-left">房屋用途</div>
        <el-checkbox-group v-model="form.purpose" size="small">
          <div
            v-for="(item, index) in PurposeList"
            :key="index"
            class="check-item"
          >
            <el-tooltip
              :content="item.name"
              :disabled="item.name.length < 4"
              placement="top"
            >
              <el-checkbox :label="item.value" border>{{
                item.name
              }}</el-checkbox>
            </el-tooltip>
          </div>
        </el-checkbox-group>
      </div>
      <!-- 朝向 -->
      <div class="check-group">
        <div class="check-group-left">朝向</div>
        <el-checkbox-group v-model="form.face" size="small">
          <div
            v-for="(item, index) in faceList"
            :key="index"
            class="check-item"
          >
            <el-tooltip
              :content="item.name"
              :disabled="item.name.length < 4"
              placement="top"
            >
              <el-checkbox :label="item.value" border>{{
                item.name
              }}</el-checkbox>
            </el-tooltip>
          </div>
        </el-checkbox-group>
      </div>
      <!-- 小学划片 -->
      <div class="check-group">
        <div class="check-group-left">小学划片</div>
        <el-checkbox-group v-model="form.primarySchool" size="small">
          <div
            v-for="(item, index) in MathPrimarySchoolListfirst"
            :key="index"
            class="check-item"
          >
            <el-tooltip
              :content="item.name"
              :disabled="item.name.length < 4"
              placement="top"
            >
              <el-checkbox :label="item.value" border>{{
                item.name
              }}</el-checkbox>
            </el-tooltip>
          </div>
          <div class="check-item">
            <el-button
              type="text"
              @click="triggerSchoolSizeFlag('PrimarySizeFlag')"
              >{{ PrimarySizeFlag ? "收起" : "更多" }}</el-button
            >
          </div>
        </el-checkbox-group>
      </div>
      <!-- 中学划片 -->
      <div class="check-group">
        <div class="check-group-left">中学划片</div>
        <el-checkbox-group v-model="form.middleSchool" size="small">
          <div
            v-for="(item, index) in MathMiddleSchoolListfirst"
            :key="index"
            class="check-item"
          >
            <el-tooltip
              :content="item.name"
              :disabled="item.name.length < 4"
              placement="top"
            >
              <el-checkbox :label="item.value" border>{{
                item.name
              }}</el-checkbox>
            </el-tooltip>
          </div>
          <div class="check-item">
            <el-button
              type="text"
              @click="triggerSchoolSizeFlag('MiddleSizeFlag')"
              >{{ MiddleSizeFlag ? "收起" : "更多" }}</el-button
            >
          </div>
        </el-checkbox-group>
      </div>
    </div>
    <div class="split-line split-line-text" @click="switchqQuery">
      ({{ queryFlag ? "单击收起" : "单击展开更多筛选" }} )
    </div>
  </div>
</template>

<script>
import but from "@/evenBus/but";
export default {
  inject: ["form"],
  computed: {
    MathPrimarySchoolListfirst() {
      let sliceSize = [0, 11];
      if (this.PrimarySizeFlag) {
        sliceSize = [0, this.PrimarySchoolList.length - 1];
      }
      return this.PrimarySchoolList.slice(...sliceSize);
    },
    MathMiddleSchoolListfirst() {
      let sliceSize = [0, 11];
      if (this.MiddleSizeFlag) {
        sliceSize = [0, this.MiddleSchoolList.length - 1];
      }
      return this.MiddleSchoolList.slice(...sliceSize);
    }
  },
  data() {
    return {
      queryFlag: false,
      searchInfo: "", //关键字
      RegionList: [], //商圈
      faceList: [], //朝向
      PrimarySchoolList: [], //小学
      MiddleSchoolList: [], //中学
      RoomsList: [], //房型
      RenovationList: [], //装修
      PurposeList: [], //房屋用途
      PrimarySizeFlag: false, //中学开关
      MiddleSizeFlag: false, //小学开关
      inputGruop: {
        minFloor: "",
        maxFloor: "",
        minInArea: "",
        maxInArea: "",
        minPrice: "",
        maxPrice: ""
      },
      communitySelect: {
        // 楼盘select
        loading: false,
        list: [],
        value: {}
      },
      buildingSelect: {
        // 栋座select
        loading: false,
        list: [],
        value: {}
      },
      roomSelect: {
        // 房间select
        loading: false,
        list: [],
        value: {}
      }
    };
  },
  created() {
    but.$on("removeTag", this.removeTag);
  },
  destroyed() {
    but.$off("removeTag");
  },
  mounted() {
    //获取  商圈 & 朝向 & 小学 & 中学 & 房型 & 装修 & 房屋用途
    const queryCheckList = [
      "Region",
      "face",
      "PrimarySchool",
      "MiddleSchool",
      "Rooms",
      "Renovation",
      "Purpose"
    ];
    queryCheckList.forEach(element => {
      this.queryConstant(element);
    });
  },
  methods: {
    /**
     * @example: 删除联动
     */

    removeTag(e) {
      if (e.field == "price") {
        this.form.maxPrice = "";
        this.form.minPrice = "";
        this.inputGruop.maxPrice = "";
        this.inputGruop.minPrice = "";
      }
      if (e.field == "area") {
        this.form.maxInArea = "";
        this.form.minInArea = "";
        this.inputGruop.maxInArea = "";
        this.inputGruop.minInArea = "";
      }
      if (e.field == "floot") {
        this.form.maxFloor = "";
        this.form.minFloor = "";
        this.inputGruop.maxFloor = "";
        this.inputGruop.minFloor = "";
      }
      if (e.field == "communityName") {
        this.form.communityName = "";
        this.form.cbNo = "";
        this.form.roomNumber = "";
        this.form.comId = "";
        this.form.cbId = "";
        this.form.roomNo = "";
        this.communitySelect.value = {};
        this.buildingSelect.value = {};
        this.roomSelect.value = {};
      }
      if (e.field == "cbNo") {
        this.form.cbNo = "";
        this.form.roomNumber = "";
        this.form.cbId = "";
        this.form.roomNo = "";
        this.buildingSelect.value = {};
        this.roomSelect.value = {};
      }
      if (e.field == "roomNumber") {
        this.form.roomNumber = "";
        this.form.roomNo = "";
        this.roomSelect.value = {};
      }
      if (e.field == "searchInfo") {
        this.form.searchInfo = "";
        this.searchInfo = "";
      }
    },
    switchqQuery() {
      this.queryFlag = !this.queryFlag;
    },
    /**
     * @example: 重置表单
     */
    resetFormData() {
      //解构出当前组件需要重置的初始数据
      const {
        inputGruop,
        communitySelect,
        buildingSelect,
        roomSelect,
        searchInfo
      } = this.$options.data.call(this);
      //将初始数据合并
      const merge = {
        inputGruop,
        communitySelect,
        buildingSelect,
        roomSelect,
        searchInfo
      };
      //重置
      Object.assign(this.$data, merge);
      //通知父组件重置注入数据
      this.$emit("reset");
    },
    /**
     * @example: 开始搜索
     */
    goSearch() {
      this.form.searchInfo = this.searchInfo;
    },
    /**
     * @example: 判断是否最高小于最小
     */
    isGreater(field) {
      return (
        parseInt(this.inputGruop["max" + field]) <
        parseInt(this.inputGruop["min" + field])
      );
    },
    /**
     * @example: input组的提交按钮
     */
    queryData(field, suffix) {
      if (this.isGreater(field)) {
        this.$message.warning(`最低${suffix}不能大于最高${suffix}`);
        return;
      }
      this.form["max" + field] = parseFloat(this.inputGruop["max" + field]);
      this.form["min" + field] = parseFloat(this.inputGruop["min" + field]);
    },
    focusCommunity() {
      this.communitySelect.list.length === 0 && this.remoteCommunity();
    },
    /**
     * @example: 远程获取楼盘列表
     */

    remoteCommunity(query = "") {
      this.communitySelect.loading = true;
      this.$api
        .get({
          url: "/community/houseList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            communityName: query,
            limit: 30
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.communitySelect.list = e.data.data.list;
          }
        })
        .catch(() => {})
        .finally(() => {
          this.communitySelect.loading = false;
        });
    },
    /**
     * @example: 楼栋change
     */
    communityChange(item) {
      this.form.communityName = item.name;
      this.form.comId = item.value;
      //清空楼栋value
      this.buildingSelect.value = {};
      this.form.cbNo = "";
      this.form.cbId = "";
      //清空房间号
      this.roomSelect.value = {};
      this.form.roomNumber = "";
      this.form.roomNo = "";
      this.remoteBuilding();
    },
    /**
     * @example: 远程获取栋座列表
     */
    remoteBuilding() {
      this.buildingSelect.loading = true;
      this.$api
        .get({
          url: "/mateHouse/queryComBuilding",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            comId: this.form.comId,
            limit: 50
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.buildingSelect.list = e.data.data.list;
          }
        })
        .catch(() => {})
        .finally(() => {
          this.buildingSelect.loading = false;
        });
    },
    /**
     * @example: 栋座change
     */
    buildingChange(item) {
      this.form.cbNo = item.name;
      this.form.cbId = item.value;
      //清空房间号
      this.roomSelect.value = {};
      this.form.roomNumber = "";
      this.form.roomNo = "";

      this.remoteRoom();
    },
    /**
     * @example: 远程获取房间号列表
     */
    remoteRoom() {
      this.roomSelect.loading = true;
      this.$api
        .get({
          url: "/mateHouse/queryBuildIngHousesBySale",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            comId: this.form.comId,
            cbId: this.form.cbId,
            limit: 100
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.roomSelect.list = e.data.data.list;
          }
        })
        .catch(() => {})
        .finally(() => {
          this.roomSelect.loading = false;
        });
    },
    /**
     * @example: 房间号change
     */
    roomChange(item) {
      this.form.roomNumber = item.name;
      this.form.roomNo = item.value;
    },
    /**
     * @example: Data属性的取反
     * @param {string} value
     */

    triggerSchoolSizeFlag(value) {
      this[value] = !this[value];
    },

    /**
     * @example: 获取checkBox的统一接口 传入需要获取的名称
     */

    queryConstant(constant) {
      return this.$api
        .get({
          url: "/mateHouse/queryConstant",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            constant: constant
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this[constant + "List"] = e.data.data;
          }
        })
        .catch(() => {});
    }
  }
};
</script>
