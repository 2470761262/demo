<style lang="less" scoped>
@import url(../../../../assets/publicLess/addHouse.less);
.page-cell-for-add {
  .for-add-table {
    margin-top: 45px;
    display: inline-table;
    .for-add-header {
      display: table-header-group;
    }
    .for-add-tbody {
      display: table-row-group;
      .for-add-td {
        padding: 20px 0;
        border-bottom: 2px dashed #f4f4f4;
      }
    }
    .for-add-tr {
      display: table-row;
      .for-add-td {
        display: table-cell;
        width: 105px;
        text-align: center;
        font-size: 15px;
        padding-right: 45px;
        &:first-child {
          padding-right: 0;
        }
      }
    }
  }
}
.tr-flex {
  display: flex;
  position: relative;
  span {
    align-self: flex-end;
    position: absolute;
    right: -10px;
  }
}
.for-add-tr {
  &.after-tips {
    &::after {
      position: static;
      content: attr(data-tips);
      color: red;
      font-size: 13px;
    }
  }
}
.select-pad-width_70 {
  margin-left: 30px;
}
.el-leave-active {
  position: static;
}
</style>
<template>
  <div class="page-cell-addHouse form-error-tips">
    <div id="addHouseType">
      <div class="page-cell-item">
        <div class="item-before" data-before="*"></div>
        <el-radio-group v-model="addHouseType" @change="houseTypeChange" size="mini">
          <el-radio label="basicInformation">单套录入</el-radio>
          <el-radio label="morePushHouse">多套录入</el-radio>
        </el-radio-group>
        <span class="addhouse-tips">(多套录入仅支持同一小区同一业主)</span>
      </div>
    </div>
    <!--  -->
    <div
      class="page-cell-item-flex form-error-tips"
      :class="{'after-tips':errorBags.has('communityId')}"
      :data-tips="errorBags.first('communityId')"
    >
      <div class="page-cell-item select-nobor">
        <div class="item-before" data-before="*">楼盘</div>
        <el-select
          filterable
          remote
          :remote-method="remoteCommunityName"
          data-vv-name="communityId"
          data-vv-as="楼盘名称"
          v-validate="'required'"
          v-model="selectPageCommunit.id"
          placeholder="请选择楼盘名称"
          @focus="remoteCommunityNameInput"
          @change="remoteCommunityNameChange"
          :loading="selectPageCommunit.loading"
        >
          <el-option
            v-for="item in selectPageCommunit.list"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div
        class="form-error-tips select-pad-width_70"
        :class="{'after-tips':errorBags.has('tableForList')}"
        :data-tips="errorBags.first('tableForList')"
      >
        <div class="page-cell-item select-nobor">
          <el-input
            placeholder="几"
            maxlength="2"
            v-number
            data-vv-name="tableForList"
            data-vv-as="套数"
            v-validate="'required'"
            @input="houseListChange"
            v-model="tableForList"
          >
            <div slot="prepend" class="item-before">共</div>
            <div slot="append" class="item-before">套</div>
          </el-input>
        </div>
      </div>
      <div
        class="form-error-tips select-pad-width_70"
        :class="{'after-tips':errorBags.has('tableAvgPirce')}"
        :data-tips="errorBags.first('tableAvgPirce')"
      >
        <div class="page-cell-item select-nobor">
          <el-input
            placeholder="￥"
            v-number.floot
            data-vv-name="tableAvgPirce"
            data-vv-as="总售价"
            v-validate="'required'"
            @input="tableAvgChange('tableAvgPirce','price')"
            v-model="tableAvgPirce"
          >
            <div slot="prepend" class="item-before">总售价</div>
            <div slot="append" class="item-before">万</div>
          </el-input>
        </div>
      </div>
      <div
        class="form-error-tips select-pad-width_70"
        :class="{'after-tips':errorBags.has('bottomPriceAvgPrice')}"
        :data-tips="errorBags.first('bottomPriceAvgPrice')"
      >
        <div class="page-cell-item select-nobor">
          <el-input
            placeholder="￥"
            v-number.floot
            data-vv-name="bottomPriceAvgPrice"
            data-vv-as="总底价"
            v-validate="{required:true,isGreater:[tableAvgPirce,'总售价']}"
            @input="tableAvgChange('bottomPriceAvgPrice','bottomPrice')"
            v-model="bottomPriceAvgPrice"
          >
            <div slot="prepend" class="item-before">总底价</div>
            <div slot="append" class="item-before">万</div>
          </el-input>
        </div>
      </div>
    </div>
    <transition name="el">
      <div class="page-cell-for-add" v-if="tableFor.length > 0">
        <div class="for-add-table">
          <div class="for-add-header">
            <div class="for-add-tr">
              <div class="for-add-td">序号</div>
              <div class="for-add-td">楼栋</div>
              <div class="for-add-td">房间号</div>
              <div class="for-add-td">售价</div>
              <div class="for-add-td">总底价</div>
            </div>
          </div>
          <div class="for-add-tbody">
            <div
              class="for-add-tr"
              :class="{'after-tips':errorBags.has('buildingId'+(index+1)) || errorBags.has('roomId'+(index+1)) || errorBags.has('bottomPrice'+(index+1))}"
              :data-tips="errorBags.first('buildingId'+(index+1)) || errorBags.first('roomId'+(index+1)) || errorBags.first('bottomPrice'+(index+1))"
              v-for="(item,index) in tableFor"
              :key="index"
            >
              <div class="for-add-td">{{index+1}}</div>
              <div class="for-add-td select-nobor">
                <el-select
                  filterable
                  remote
                  :data-vv-name="'buildingId'+(index+1)"
                  :data-vv-as="'楼栋'+(index+1)"
                  v-validate="'required'"
                  :remote-method="remoteBuildingNo"
                  @change="remoteBuildingNoChange($event,index)"
                  v-model="item.buildingId"
                  placeholder="楼栋"
                >
                  <el-option
                    v-for="item in selectPageBuilding.list"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="for-add-td select-nobor">
                <el-select
                  filterable
                  remote
                  :remote-method="remoteRoomNo"
                  :data-vv-name="'roomId'+(index+1)"
                  :data-vv-as="'房间号'+(index+1)"
                  v-validate="'required'"
                  v-model="item.roomId"
                  @change="remoteRoomNoChange($event,index)"
                  @blur="selectPageRoom.focusIndex = -1"
                  @focus="selectPageRoom.focusIndex = index"
                  placeholder="房间号"
                >
                  <el-option
                    v-for="item in selectPageRoom.list"
                    :key="item.value"
                    :disabled="filterRoomDisabled().includes(item.value)"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="for-add-td select-nobor select-pad-width_70">
                <div class="tr-flex">
                  <el-input
                    placeholder="售价"
                    v-number.floot
                    @input="updatePirce('tableAvgPirce','price')"
                    v-model="item.price"
                  ></el-input>
                  <span>万</span>
                </div>
              </div>
              <div class="for-add-td select-nobor select-pad-width_70">
                <div class="tr-flex">
                  <el-input
                    placeholder="底价"
                    v-number.floot
                    :data-vv-name="'bottomPrice'+(index+1)"
                    :data-vv-as="'楼栋'+(index+1)"
                    v-validate="{isGreater:[item.price,'售价']}"
                    @input="updatePirce('bottomPriceAvgPrice','bottomPrice')"
                    v-model="item.bottomPrice"
                  ></el-input>
                  <span>万</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 业主姓名 -->
    <div
      class="form-error-tips maging-top_60 margin-bot_20"
      :class="{'after-tips':errorBags.has('customerName')}"
      :data-tips="errorBags.first('customerName')"
    >
      <div class="page-cell-item select-nobor center-flex">
        <el-input
          placeholder="请输入业主姓名"
          data-vv-name="customerName"
          data-vv-as="业主姓名"
          v-validate="'required|isChinese'"
          v-model="form.customerName"
        >
          <div slot="prepend" class="item-before" data-before="*">业主姓名</div>
        </el-input>
        <div class="input-after-checkbox">
          <el-radio-group v-model="form.sex" size="mini">
            <el-radio
              :label="item.label"
              v-for="(item, index) in sexList"
              :key="index"
            >{{ item.title }}</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
    <!-- 电话号码 -->
    <div
      class="form-error-tips margin-bot_20"
      :class="{'after-tips':errorBags.has('tel')}"
      :data-tips="errorBags.first('tel')"
    >
      <div class="page-cell-item select-nobor">
        <el-input
          placeholder="默认拨打为第一个号码"
          data-vv-name="tel"
          data-vv-as="电话号码"
          v-validate="'required|phone'"
          v-model="form.tel"
        >
          <div slot="prepend" class="item-before" data-before="*">手机号</div>
          <div slot="append" @click="addTelToList" class="item-after item-before-col">
            <i class="el-icon-circle-plus-outline"></i>
            <div>新增</div>
          </div>
        </el-input>
      </div>
    </div>
    <!-- 电话号码 for -->
    <transition-group name="el">
      <div
        class="form-error-tips margin-bot_20"
        :class="{'after-tips':errorBags.has('tel'+item)}"
        :data-tips="errorBags.first('tel'+item)"
        v-for="(item,index) in addTel"
        :key="item"
      >
        <div class="page-cell-item select-nobor">
          <el-input
            placeholder="请输入业主电话号码"
            :data-vv-name="'tel'+item"
            :data-vv-as="'电话号码'+item"
            v-validate="'phone'"
            v-model="form['tel'+item]"
          >
            <div slot="prepend" class="item-before">手机号{{item}}</div>
            <div
              slot="append"
              @click="removeTelToList(index,item)"
              class="item-after item-before-col"
            >
              <i class="el-icon-circle-plus-outline"></i>
              <div>删除</div>
            </div>
          </el-input>
        </div>
      </div>
    </transition-group>
    <div class="page-cell-item-flex maging-top_60 margin-bot_20">
      <!-- 房屋证件 -->
      <div
        class="form-error-tips"
        :class="{'after-tips':errorBags.has('certificateType')}"
        :data-tips="errorBags.first('certificateType')"
      >
        <div class="page-cell-item">
          <div class="item-before" data-before="*">房屋证件</div>
          <el-select
            v-model="form.certificateType"
            v-validate="'required'"
            data-vv-name="certificateType"
            data-vv-as="房屋证件"
            placeholder="请选择房屋证件"
          >
            <el-option
              v-for="item in certificateTypeList"
              :key="item.label"
              :label="item.title"
              :value="item.label"
            ></el-option>
          </el-select>
        </div>
      </div>
      <!-- 售价 -->
      <!-- <div class="form-error-tips select-pad-width_100"
           :class="{'after-tips':errorBags.has('price')}"
           :data-tips="errorBags.first('price')">
        <div class="page-cell-item select-nobor">
          <el-input placeholder="请输入售价"
                    v-validate="'required|decimal:2|noZero1'"
                    data-vv-name="price"
                    data-vv-as="售价"
                    v-model="form.price">
            <div slot="prepend"
                 class="item-before"
                 data-before="*">售价</div>
            <div slot="append"
                 class="item-after item-before-col">万</div>
          </el-input>
        </div>
      </div>-->
      <!-- 底价 -->
      <!-- <div class="form-error-tips select-pad-width_100"
           :class="{'after-tips':errorBags.has('bottomPrice')}"
           :data-tips="errorBags.first('bottomPrice')">
        <div class="page-cell-item select-nobor">
          <el-input placeholder="请输入底价"
                    v-validate="'required|decimal:2|noZero1'"
                    data-vv-name="bottomPrice"
                    data-vv-as="底价"
                    v-model="form.bottomPrice">
            <div slot="prepend"
                 class="item-before"
                 data-before="*">底价</div>
            <div slot="append"
                 class="item-after item-before-col">万</div>
          </el-input>
        </div>
      </div>-->
    </div>
    <!-- 证号 -->
    <div class="form-error-tips margin-bot_20">
      <div class="page-cell-item select-nobor">
        <el-input placeholder="请输入产权证号" v-model="form.certificateNo">
          <div slot="prepend" class="item-before">证号</div>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
let sex = [
  { title: "女士", label: 0 },
  { title: "先生", label: 1 }
];
let certificateType = [
  { title: "不动产权证", label: 1 },
  { title: "购房合同", label: 2 },
  { title: "拆迁安置协议书", label: 3 }
];
export default {
  name: "morePushHouse",
  props: {
    houseType: {
      type: String
    }
  },
  data() {
    return {
      addHouseType: this.houseType,
      sexList: sex,
      addTel: [], //123电话号码数组
      tableForList: "", //共多少套
      tableAvgPirce: "", //总售价
      bottomPriceAvgPrice: "", //总底价
      tableFor: [], //表格
      form: {
        customerName: "", //用户姓名
        sex: 0, //业主称谓
        tel: "", //业主电话号码
        certificateType: "", //房屋证件
        // price: '',//售价
        // bottomPrice: '',//底价
        certificateNo: "" //证号
      },
      certificateTypeList: certificateType,
      selectPageBuilding: {
        loading: "",
        list: []
      },
      selectPageRoom: {
        loading: "",
        list: [],
        focusIndex: undefined // 当前触发的index
      },
      selectPageCommunit: {
        loading: false,
        id: "",
        name: "",
        list: []
      }
    };
  },
  activated() {
    this.addHouseType = this.houseType;
  },
  methods: {
    remoteCommunityNameChange(e) {
      let findResultIndex = this.selectPageCommunit.list.findIndex(item => {
        return item.value == e;
      });
      this.selectPageCommunit.name = this.selectPageCommunit.list[
        findResultIndex
      ].name;
      this.tableFor = [];
      this.tableForList = "";
      this.tableAvgPirce = "";
      this.bottomPriceAvgPrice = "";
      this.remoteBuildingNo();
    },
    //楼盘获取焦点 第一次点击就进行查询
    remoteCommunityNameInput() {
      if (this.selectPageCommunit.list.length == 0) {
        this.remoteCommunityName();
      }
    },
    //获取楼盘数据
    remoteCommunityName(e) {
      let that = this;
      that.selectPageCommunit.loading = true;
      this.$api
        .post({
          url: "/mateHouse/queryCommunity",
          data: {
            page: 1,
            limit: 50,
            communityName: e == undefined ? "" : e.trim()
          },
          qs: true,
          token: false
        })
        .then(e => {
          let data = e.data;
          if (data.code == 200) {
            that.selectPageCommunit.list = data.data.list;
            that.selectPageCommunit.loading = false;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    //查询栋座
    remoteBuildingNo(e) {
      let that = this;
      //验证楼盘
      that.$validator
        .validate("communityId", this.selectPageCommunit.id)
        .then(result => {
          if (result) {
            that.selectPageBuilding.loading = true;
            that.$api
              .post({
                url: "/mateHouse/queryComBuilding",
                data: {
                  page: 1,
                  limit: 50,
                  comBuildingName: e == undefined ? "" : e.trim(),
                  comId: that.selectPageCommunit.id
                },
                qs: true,
                token: false
              })
              .then(e => {
                let data = e.data;
                if (data.code == 200) {
                  that.selectPageBuilding.list = data.data.list;
                  that.selectPageBuilding.loading = false;
                }
              })
              .catch(e => {
                console.log(e);
              });
          }
        });
    },
    //楼栋选择
    remoteBuildingNoChange(e, index) {
      let findResultIndex = this.selectPageBuilding.list.findIndex(item => {
        return item.value == e;
      });
      this.tableFor[index].buildingNo = this.selectPageBuilding.list[
        findResultIndex
      ].name;
      //清空对应的房间
      this.tableFor[index].roomNo = "";
      this.tableFor[index].roomId = "";
      this.remoteRoomNo(null, index);
    },
    //查询房间号
    remoteRoomNo(e, index) {
      let that = this;
      if (index == undefined) {
        index = this.selectPageRoom.focusIndex;
      }
      //验证楼栋
      that.$validator
        .validate("buildingId" + (index + 1), this.tableFor[index].buildingId)
        .then(result => {
          if (result) {
            that.selectPageRoom.loading = true;
            that.$api
              .post({
                url: "/mateHouse/queryBuildIngHouses",
                data: {
                  page: 1,
                  limit: 50,
                  comId: that.selectPageCommunit.id,
                  cbId: that.tableFor[index].buildingId,
                  roomNo: e == undefined ? "" : e.trim(),
                  isNotSale: 1
                },
                qs: true,
                token: false
              })
              .then(e => {
                let data = e.data;
                if (data.code == 200) {
                  that.selectPageRoom.list = data.data.list;
                  that.selectPageRoom.loading = false;
                }
              })
              .catch(e => {
                console.log(e);
              });
          }
        });
    },
    //房间号选择更改事件
    remoteRoomNoChange(e, index) {
      let findResultIndex = this.selectPageRoom.list.findIndex(item => {
        return item.value == e;
      });
      this.tableFor[index].roomNo = this.selectPageRoom.list[
        findResultIndex
      ].name;
    },
    //输入的套数改变
    houseListChange(e) {
      let that = this;
      this.tableFor = [];
      for (let i = 0; i < e; i++) {
        this.tableFor.push({
          price: !Number.isNaN(that.tableAvgPirce)
            ? (that.tableAvgPirce / e).toFixed(2)
            : "",
          buildingNo: "",
          buildingId: "",
          roomNo: "",
          roomId: "",
          bottomPrice: !Number.isNaN(that.bottomPriceAvgPrice)
            ? (that.bottomPriceAvgPrice / e).toFixed(2)
            : ""
        });
      }
    },
    //输入的总价钱设置tab的平均值
    tableAvgChange(objName, toObjName) {
      let that = this;
      this.tableFor.forEach(item => {
        if (!Number.isNaN(that[objName]))
          item[toObjName] = (that[objName] / that.tableFor.length).toFixed(2);
      });
    },
    //当前选择已经存在这个房间则不让在重复选择
    filterRoomDisabled() {
      return this.tableFor
        .map(item => {
          return item.roomId;
        })
        .join(",");
    },
    //同步更新价钱
    updatePirce(priceName, itemName) {
      if (!Number.isNaN(this[itemName])) {
        let price = 0;
        this.tableFor.forEach(item => {
          if (item[itemName] != "" && !Number.isNaN(Number(item[itemName]))) {
            price += Number(item[itemName]);
          }
        });
        this[priceName] = price || "";
      }
    },
    //添加电话号码
    addTelToList() {
      let defaultList = [1, 2, 3];
      if (this.addTel.length < 3) {
        for (let index = 0; index < defaultList.length; index++) {
          if (!this.addTel.includes(defaultList[index])) {
            this.addTel.push(defaultList[index]);
            break;
          }
        }
      }
      this.addTel.sort();
    },
    //删除电话号码
    removeTelToList(index, item) {
      this.addTel.splice(index, 1);
      this.form["tel" + item] = "";
    },
    houseTypeChange(e) {
      this.$emit("update:houseType", e);
    },
    //验证
    validateAll() {
      let that = this;
      return this.$validator
        .validateAll()
        .then(e => {
          if (e) {
            return true;
          }
          return false;
        })
        .then(e => {
          if (e) {
            return this.upLoadData();
          } else {
            return false;
          }
        });
    },
    //提交数据d
    upLoadData() {
      let that = this;
      return this.$api
        .post({
          url: "/draft-house/multiple",
          data: {
            communityName: that.selectPageCommunit.name,
            communityId: that.selectPageCommunit.id,
            list: that.tableFor,
            ...that.form
          },
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.$store.commit("updateId", e.data.data);
            return true;
          } else {
            return false;
          }
        })
        .catch(e => {
          return false;
        });
    }
  }
};
</script>
