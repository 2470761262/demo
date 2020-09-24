<template>
  <!-- 楼盘、楼栋、房间号选择组件 -->
  <el-row :gutter="gutter">
    <el-form-item :label="label">
      <el-col :span="8">
        <el-select
          class="anchor-point"
          popper-class="anchor-point"
          :data-anchor="dataAnchor + '楼盘 => select'"
          @click.native="log_socket.sendUserActionData"
          v-model="buildOptData"
          placeholder="楼盘名称"
          clearable
          filterable
          remote
          @focus="remoteBuildInput"
          @change="remoteBuildChange"
          :remote-method="buildRemoteMethod"
          :loading="buildLoading"
          value-key="value"
        >
          <el-option
            class="anchor-point"
            :data-anchor="dataAnchor + '楼盘 => select => option:' + item.name"
            @click.native="log_socket.sendUserActionData"
            v-for="item in buildForList"
            :key="item.value"
            :label="item.name"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-select
          class="anchor-point"
          popper-class="anchor-point"
          :data-anchor="dataAnchor + '我的验真栋座 => select'"
          @click.native="log_socket.sendUserActionData"
          v-model="towerOptData"
          placeholder="栋座号"
          clearable
          filterable
          remote
          :remote-method="queryRoomNo"
          @change="remoteRoomNoChange"
          :loading="towerLoading"
          value-key="value"
        >
          <el-option
            class="anchor-point"
            :data-anchor="dataAnchor + '栋座 => select => option:' + item.name"
            @click.native="log_socket.sendUserActionData"
            v-for="item in towerForList"
            :key="item.value"
            :label="item.name"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-select
          class="anchor-point"
          popper-class="anchor-point"
          :data-anchor="dataAnchor + '房号 => select'"
          @click.native="log_socket.sendUserActionData"
          v-model="roomOptData"
          placeholder="房号"
          clearable
          filterable
          remote
          :remote-method="queryRoomData"
          @change="queryRoomDataChange"
          :loading="roomLoading"
          value-key="value"
        >
          <el-option
            class="anchor-point"
            :data-anchor="dataAnchor + '房号 => select => option:' + item.name"
            @click.native="log_socket.sendUserActionData"
            v-for="item in roomForList"
            :key="item.value"
            :label="item.name"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
    </el-form-item>
  </el-row>
</template>
<script>
export default {
  props: {
    // 楼盘、楼栋、房间号input框之间的间隔
    gutter: {
      type: Number,
      default: 10
    },
    // 前缀名
    label: {
      type: String,
      default: "房屋坐落"
    },
    dataAnchor: {
      type: String,
      default: "我的验真"
    },
    // 楼盘id
    comId: {
      type: String,
      default: ""
    },
    // 楼栋id
    cbId: {
      type: String,
      dafault: ""
    },
    // 房间号id
    bhId: {
      type: String,
      default: ""
    },
    // 获取楼盘数据的url地址
    getBuildDataUrl: {
      type: String,
      default: "/community/information/verify"
    },
    // 获取楼栋数据的url地址
    getTowerDataUrl: {
      type: String,
      default: "/mateHouse/queryComBuilding"
    },
    // 获取房间号数据的url地址
    getRoomsDataUrl: {
      type: String,
      default: "/mateHouse/queryBuildIngHouses"
    }
  },
  data() {
    return {
      buildLoading: false, //楼盘select loading
      buildOptData: {}, //当前楼盘选择数据
      buildForList: [], //楼盘select数据
      towerLoading: false, //栋座select loading
      towerOptData: {}, //栋座选中数据
      towerForList: [], //栋座select数据
      roomLoading: false, //房间号select loading
      roomOptData: {}, //房间号选中数据
      roomForList: [], //房间号select数据
      selfComId: this.comId,
      selfCbId: this.cbId,
      selfBhId: this.bhId
    };
  },
  watch: {
    selfComId(val) {
      this.$emit("update:comId", val);
    },
    selfCbId(val) {
      this.$emit("update:cbId", val);
    },
    selfBhId(val) {
      this.$emit("update:bhId", val);
    }
  },
  methods: {
    /**
     * @example: 重置楼盘条件
     */
    reset() {
      this.selfComId = "";
      this.selfCbId = "";
      this.selfBhId = "";
      this.buildOptData = {};
      this.buildForList = [];
      this.towerOptData = {};
      this.buildForList = [];
      this.towerForList = [];
      this.roomOptData = {};
      this.roomForList = [];
    },
    /**
     * @example: 远程获取楼盘信息
     */
    buildRemoteMethod(query) {
      this.buildLoading = true;
      this.$api
        .get({
          url: this.getBuildDataUrl,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            communityName: query,
            page: 1,
            limit: 50
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.buildForList = e.data.data.list;
          }
        })
        .finally(() => {
          this.buildLoading = false;
        });
    },
    /**
     * @example: 楼盘激活第一时获取数据
     */
    remoteBuildInput() {
      // this.buildForList.length === 0 && this.buildRemoteMethod();
      this.buildRemoteMethod();
    },
    /**
     * @example: 楼盘选择更改触发事件
     * @param {Obejct} item 当前选中对象
     */
    remoteBuildChange(item) {
      const { name = undefined, value = undefined } = item;

      //如果删除或者手动删除传入空字符串将会把楼栋数据清理为空字符串
      let comId = value ? value : "";
      // this.$emit("update:comId", comId);
      this.selfComId = comId;
      //清理楼栋数据
      this.towerForList = [];
      this.selfCbId = "";
      this.towerOptData = {};
      //清理房间号数据
      this.selfBhId = "";
      this.roomOptData = {};
      this.roomForList = [];
      // 触发父组件楼盘改变事件
      this.$emit("buildDataChange", comId);
      //获取楼栋select
      this.queryRoomNo();
    },
    /**
     * @example: 获取栋座远程数据
     * @param {String} name 栋座名称
     */
    queryRoomNo(name) {
      this.towerLoading = true;
      this.$api
        .get({
          url: this.getTowerDataUrl,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comBuildingName: name == undefined ? "" : name.trim(),
            comId: this.selfComId,
            page: 1,
            limit: 100
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.towerForList = e.data.data.list;
          }
        })
        .finally(() => {
          this.towerLoading = false;
        });
    },
    /**
     * @example: 楼栋选择更改触发事件
     * @param {Obejct} item 当前选中对象
     */
    remoteRoomNoChange(item) {
      const { name = undefined, value = undefined } = item;
      //如果删除或者手动删除传入空字符串将会把楼栋数据清理为空字符串
      let cbId = value ? value : "";
      this.selfCbId = cbId;
      //清理房间号数据
      this.selfBhId = "";
      this.roomOptData = {};
      this.roomForList = [];
      // 触发父组件楼栋号改变事件
      this.$emit("towerDataChange", cbId);
      //获取房间号数据
      this.queryRoomData();
    },
    /**
     * @example: 远程获取房间号信息
     * @param {String} e 输入搜索的文本
     */
    queryRoomData(e) {
      this.$api
        .get({
          url: this.getRoomsDataUrl,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comId: this.selfComId,
            cbId: this.selfCbId,
            page: 1,
            limit: 500,
            roomNo: e == undefined ? "" : e.trim()
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.roomForList = e.data.data.list;
          }
        })
        .finally(() => {
          this.towerLoading = false;
        });
    },
    /**
     * @example:房间号修改选中触发事件
     * @param {Ojbect} item 选中时选中的数据
     */
    queryRoomDataChange(item) {
      const { name = undefined, value = undefined } = item;
      let bhId = value ? value : "";
      this.selfBhId = bhId;
      // 触发父组件房间号改变事件
      this.$emit("roomDataChange", bhId);
    }
  }
};
</script>
<style lang="less" scoped>
.el-select-dropdown__item {
  // prettier-ignore
  height: 40PX;
  // prettier-ignore
  line-height: 40PX;
  font-size: @font14;
}
</style>
