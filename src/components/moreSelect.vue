<style lang="less" scoped>
.title {
  background: rgb(237, 237, 237);
  width: 100%;
  height: 30px;
  display: flex;
}
.selectBox {
  width: 94%;
  padding: 10px 3% 10px 3%;
}
.selectType {
  width: 50%;
}
.line {
  display: flex;

  margin-top: 20px;
}
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
  .center-but {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
span {
  font-size: 10px;
}
</style>
<template>
  <div>
    <el-popover placement="left" width="700" v-model="visible">
      <div class="definition-flex-warp">
        <div class="definition-flex-cell definition-back">
          <div class="pop-title">更多筛选</div>
          <div class="el-icon-close" @click="visible = false"></div>
        </div>
        <div class="definition-checkBox">
          <div class="selectBox">
            <div class="line">
              <div class="selectType">
                <span>楼盘名称</span>
                <el-select
                  v-model="more.comId"
                  style="width:60%"
                  @focus="remoteInput"
                  @change="queryCBId()"
                  filterable
                  remote
                  clearable
                  placeholder="请输入楼盘名称搜索"
                  :remote-method="remoteMethod"
                >
                  <el-option
                    v-for="item in moreOptions"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="selectType">
                <span>栋座</span>
                <el-select
                  v-model="more.cbId"
                  style="width:30%"
                  filterable
                  clearable
                  placeholder="请选择楼栋"
                  @change="queryRoomNo()"
                >
                  <el-option
                    v-for="item in moreCbIdList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <span>房号</span>
                <el-select
                  v-model="more.bhId"
                  style="width:30%"
                  filterable
                  placeholder="请选择房间号"
                >clearable
                  <el-option
                    v-for="item in moreRoomNoList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="line">
              <div class="selectType">
                <span>建筑面积</span>
                <el-input style="width:30%" clearable v-model="more.minInArea"></el-input>
                <span>-</span>
                <el-input style="width:30%" clearable v-model="more.maxInArea"></el-input>
                <span>㎡</span>
              </div>
              <div class="selectType">
                <span>总价</span>
                <el-input style="width:30%" v-model="more.minPrice" clearable placeholder="最低"></el-input>万
                <el-input v-model="more.maxPrice" style="width:30%" clearable placeholder="最高"></el-input>
                <span>万</span>
              </div>
            </div>
            <div class="line">
              <div class="selectType">
                <span>录入时间</span>
                <el-date-picker
                  v-model="more.addTime"
                  type="daterange"
                  range-separator="至"
                  style="width:70%"
                  :default-time="['00:00:00', '23:59:59']"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </div>
              <div class="selectType">
                <span>跟进时间</span>
                <el-date-picker
                  v-model="more.followTime"
                  type="daterange"
                  style="width:70%"
                  :default-time="['00:00:00', '23:59:59']"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </div>
            </div>
            <div class="line">
              <div class="selectType">
                <span>产权年限</span>
                <el-select v-model="more.propertyYear" clearable style="width:70%">
                  <el-option
                    v-for="(item) in PropertyList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="selectType">
                <span>楼层</span>
                <el-input style="width:30%" clearable v-model="more.minFloor"></el-input>-
                <el-input v-model="more.maxFloor" style="width:30%"></el-input>
              </div>
            </div>
            <div class="line">
              <div class="selectType">
                <span>物理区域</span>
                <el-select v-model="more.area" clearable style="width:70%">
                  <el-option
                    v-for="(item) in RegionList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="selectType">
                <!-- <span>房源状态</span>
                <el-select v-model="more.houseType"
                           style="width:30%">
                  <el-option v-for='(item) in houseTypeList'
                             :key="item.value"
                             :value='item.value'
                             :label="item.label"></el-option>  
                </el-select>-->
                <span>委托</span>
                <el-select v-model="more.entrustType" clearable style="width:30%">
                  <el-option
                    v-for="(item) in EntrustList"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="line">
              <div class="selectType">
                <span>作业类型</span>
                <el-select v-model="more.taskType" clearable style="width:70%">
                  <el-option
                    v-for="(item) in taskList"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="selectType">
                <span>房屋用途</span>
                <el-select v-model="more.buildType" clearable style="width:70%">
                  <el-option
                    v-for="(item) in buildTypeList"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="line" style="display:flex;align-items:center">
              <span>区域</span>
              <el-select
                v-model="more.deptParentId"
                :remote-method="remoteArea"
                clearable
                @focus="remoteSelect"
                @change="queryShop"
                style="width:35%"
              >
                <el-option
                  v-for="(item) in deptParentList"
                  :key="item.depId"
                  :value="item.depId"
                  :label="item.depName"
                ></el-option>
              </el-select>
              <el-select v-model="more.store" @change="queryPer" clearable style="width:30%">
                <el-option
                  v-for="(item) in storeList"
                  :key="item.depId"
                  :value="item.depId"
                  :label="item.depName"
                ></el-option>
              </el-select>
              <el-select v-model="more.personnel" clearable style="width:20%">
                <el-option
                  v-for="(item) in perList"
                  :key="item.accountId"
                  :value="item.accountId"
                  :label="item.perName"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="center-but">
          <el-button type="primary" size="mini" @click="setTabRender">搜索</el-button>
          <el-button type="primary" size="mini" @click="remove">清空</el-button>
        </div>
      </div>
      <el-button slot="reference" size="mini" type="primary">更多筛选</el-button>
    </el-popover>
  </div>
</template>
<script>
import sidebarList from "./sidebarList";
export default {
  inheritAttrs: false,
  data() {
    return {
      PropertyList: [
        {
          label: "满二",
          value: "2"
        },
        {
          label: "满五",
          value: "5"
        }
      ],
      EntrustList: [
        {
          label: "没有委托",
          value: "0"
        },
        {
          label: "普通委托",
          value: "1"
        },
        {
          label: "独家委托",
          value: "2"
        },
        {
          label: "全部委托",
          value: "3"
        }
      ],
      taskList: [
        {
          label: "录入",
          value: "0"
        },
        {
          label: "跟单",
          value: "1"
        },
        {
          label: "委托",
          value: "2"
        },
        {
          label: "钥匙",
          value: "3"
        },
        {
          label: "实勘",
          value: "4"
        }
      ],
      buildTypeList: [
        {
          label: "普通住宅",
          value: "普通住宅"
        },
        {
          label: "别墅",
          value: "别墅"
        },
        {
          label: "商业",
          value: "商业"
        },
        {
          label: "车位",
          value: "车位"
        },
        {
          label: "商铺",
          value: "商铺"
        },
        {
          label: "写字楼",
          value: "写字楼"
        },
        {
          label: "商住",
          value: "商住"
        },
        {
          label: "底商(门店)",
          value: "底商(门店)"
        },
        {
          label: "店面",
          value: "店面"
        }
      ],
      visible: false,

      loding: true,
      RegionList: [],
      perList: [],
      deptParentList: [],
      storeList: [],
      more: {
        comId: "",
        bhId: "",
        taskType: "",
        entrustType: "",
        propertyYear: "",
        buildType: "",
        cbId: "",
        deptParentId: "",
        store: "",
        personnel: "",
        area: "",
        minFloor: "",
        maxFloor: "",
        addTime: "",
        followTime: "",
        houseType: "",
        minInArea: "",
        maxInArea: "",
        maxPrice: "",
        minPrice: ""
      },
      houseTypeList: [
        { label: "在售", value: "0" },
        { label: "暂不售", value: "1" },
        { label: "无号码", value: "2" },
        { label: "潜在房源", value: "3" },
        { label: "在售无跟单", value: "4" }
      ],
      moreRoomNoList: [],
      moreOptions: [],
      moreCbIdList: []
    };
  },
  mounted() {
    this.queryConstant();
  },
  methods: {
    remoteSelect() {
      if (this.more.deptParentId.length == 0) {
        this.remoteArea();
      }
    },
    remoteInput() {
      if (this.more.comId.length == 0) {
        this.remoteMethod();
      }
    },
    remove() {
      Object.assign(this.$data, this.$options.data.call(this));
      this.$emit("moreSelectChange", "");
    },
    remoteMethod(query) {
      var that = this;
      if (query !== "") {
        this.$api
          .get({
            url: "/mateHouse/queryCommunity",
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
            console.log(e.data);
            if (e.data.code == 200) {
              that.moreOptions = e.data.data.list;
            }
          });
      } else {
        this.moreOptions = [];
      }
      this.queryConstant();
      this.$emit("moreSelectChange", '');
    },
    queryCBId() {
      var that = this;
      this.$api
        .get({
          url: "/mateHouse/queryComBuilding",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comId: that.more.comId,
            page: 1,
            limit: 50
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.more.bhId = "";
            that.more.cbId = "";
            that.moreCbIdList = e.data.data.list;
          }
        });
    },
    setTabRender() {
      console.log(111);
      let data = "";
      for (let key in this.more) {
        console.log(key, this.more[key]);
        if (this.more[key] != "") {
          data = this.more;
          break;
        }
      }
      this.$emit("moreSelectChange", data);
      this.visible = false;
    },
    queryRoomNo() {
      var that = this;
      this.$api
        .get({
          url: "/mateHouse/queryBuildIngHouses",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comId: that.more.comId,
            cbId: that.more.cbId,
            page: 1,
            limit: 50
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.more.bhId = "";
            that.moreRoomNoList = e.data.data.list;
          }
        });
    },
    queryConstant() {
      return this.$api
        .get({
          url: "/mateHouse/queryConstant",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            constant: "Region"
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.RegionList = e.data.data;
          }
        });
    },
    remoteArea(query) {
      var that = this;
      if (query !== "") {
        this.$api
          .post({
            url: `${
              that.$attrs.deptUrl ? that.$attrs.deptUrl : "moreSelect/dep/area"
            }`,
            qs: true,
            data: {
              selectType: "MORE_SELECT_AREA"
            }
          })
          .then(e => {
            console.log(e.data);
            if (e.data.code == 200) {
              that.deptParentList = e.data.data;
            }
          });
      } else {
        this.deptParentList = [];
      }
    },
    queryShop() {
      var that = this;
      this.$api
        .post({
          url: `${
            that.$attrs.deptUrl ? that.$attrs.deptUrl : "moreSelect/dep/area"
          }`,
          qs: true,
          data: {
            selectType: "MORE_SELECT_SHOP",
            deptId: this.more.deptParentId
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.storeList = e.data.data;
          }
        });
    },
    queryPer() {
      var that = this;
      this.$api
        .post({
          url: `${
            that.$attrs.deptUrl ? that.$attrs.deptUrl : "moreSelect/dep/area"
          }`,
          token: false,
          qs: true,
          data: {
            selectType: "MORE_SELECT_PER",
            deptId: this.more.store
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.perList = e.data.data;
          }
        });
    }
  }
};
</script>
