<style lang="less" scoped>
@import url(../../../../assets/publicLess/addHouse.less);
</style>
<template>
  <div
    class="page-cell-addHouse"
    element-loading-text="我在去获取数据的路上了~"
    v-loading="loading"
    v-scrollError="errorBags.items"
  >
    <div class="form-error-tips" id="addHouseType">
      <div class="page-cell-item">
        <div class="item-before" data-before="*"></div>
        <el-radio-group v-model="addHouseType" @change="houseTypeChange" size="mini">
          <el-radio label="basicInformation" :disabled="disabled">单套录入</el-radio>
          <el-radio label="morePushHouse" :disabled="disabled">多套录入</el-radio>
        </el-radio-group>
        <span class="addhouse-tips">(多套录入仅支持同一小区同一业主)</span>
      </div>
    </div>
    <!-- 楼盘名称 -->
    <div class="page-cell-item-flex">
      <div
        class="form-error-tips"
        :class="{'after-tips':errorBags.has('communityId')}"
        :data-tips="errorBags.first('communityId')"
      >
        <div class="page-cell-item select-nobor">
          <div class="item-before" data-before="*">楼盘</div>
          <el-select
            filterable
            v-addHouse
            remote
            :remote-method="remoteCommunityName"
            data-vv-name="communityId"
            data-vv-as="楼盘名称"
            v-validate="'required'"
            v-model="formData.communityId"
            placeholder="请选择楼盘名称"
            @focus="remoteCommunityNameInput"
            @change="remoteCommunityNameChange"
            :loading="selectPageCommunit.loading"
            :disabled="disabled"
          >
            <el-option
              v-for="item in selectPageCommunit.list"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <!-- 栋座 -->
      <div
        class="form-error-tips select-pad-width_100"
        :class="{'after-tips':errorBags.has('buildingId')}"
        :data-tips="errorBags.first('buildingId')"
      >
        <div class="page-cell-item">
          <div class="item-before" data-before="*">栋座</div>
          <el-select
            filterable
            remote
            :remote-method="remoteBuildingNo"
            data-vv-name="buildingId"
            data-vv-as="栋座"
            v-validate="'required'"
            v-model="formData.buildingId"
            @change="remoteBuildingNoChange"
            :loading="selectPageeBuildingNo.loading"
            placeholder="请选择栋座"
            :disabled="disabled"
          >
            <el-option
              v-for="item in selectPageeBuildingNo.list"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <!-- 房间号 -->
      <div
        class="form-error-tips select-pad-width_100"
        :class="{'after-tips':errorBags.has('roomId')}"
        :data-tips="errorBags.first('roomId')"
      >
        <div class="page-cell-item">
          <div class="item-before" data-before="*">房间号</div>
          <el-select
            filterable
            remote
            :remote-method="remoteRoomNo"
            data-vv-name="roomId"
            data-vv-as="房间号"
            v-validate="'required'"
            v-model="formData.roomId"
            :loading="selectPageRoomNo.loading"
            @change="remoteRoomNoChange"
            placeholder="请选择房间号"
            :disabled="disabled"
          >
            <el-option
              v-for="item in selectPageRoomNo.list"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
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
          v-validate="'required|isChinese|chineseLen'"
          v-model="formData.customerName"
          maxlength="5"
          minlength="2"
        >
          <div slot="prepend" class="item-before" data-before="*">业主姓名</div>
        </el-input>
        <div class="input-after-checkbox">
          <el-radio-group v-model="formData.sex" size="mini">
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
          v-model="formData.tel"
          data-vv-name="tel"
          data-vv-as="电话号码"
          v-validate="'required|phoneLen|phone'"
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
            v-model="formData['tel'+item]"
            :data-vv-name="'tel'+item"
            :data-vv-as="'电话号码'+item"
            v-validate="{phone:true,isSame:[ [formData.tel,  ...addTel.map(tel=>  formData['tel'+tel]) ],'手机号']}"
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
            v-model="formData.certificateType"
            v-validate="'required'"
            data-vv-name="certificateType"
            data-vv-as="房屋证件"
            placeholder="请选择房屋证件"
          >
            <el-option
              v-for="item in certificateType"
              :key="item.label"
              :label="item.title"
              :value="item.label"
            ></el-option>
          </el-select>
        </div>
      </div>
      <!-- 售价 -->
      <div
        class="form-error-tips select-pad-width_100"
        :class="{'after-tips':errorBags.has('price')}"
        :data-tips="errorBags.first('price')"
      >
        <div class="page-cell-item select-nobor">
          <el-input
            placeholder="请输入售价"
            v-validate="'required|decimal:2|noZero1'"
            data-vv-name="price"
            data-vv-as="售价"
            v-model="formData.price"
          >
            <div slot="prepend" class="item-before" data-before="*">售价</div>
            <div slot="append" class="item-after item-before-col">万</div>
          </el-input>
        </div>
      </div>
      <!-- 底价 -->
      <div
        class="form-error-tips select-pad-width_100"
        :class="{'after-tips':errorBags.has('bottomPrice')}"
        :data-tips="errorBags.first('bottomPrice')"
      >
        <div class="page-cell-item select-nobor">
          <el-input
            placeholder="请输入底价"
            data-vv-name="bottomPrice"
            data-vv-as="底价"
            v-validate="{required:true,decimal:2,isGreater:[formData.price,'售价'],noZero1:true}"
            v-model="formData.bottomPrice"
          >
            <div slot="prepend" class="item-before" data-before="*">底价</div>
            <div slot="append" class="item-after item-before-col">万</div>
          </el-input>
        </div>
      </div>
    </div>
    <!-- 证号 -->
    <div
      class="form-error-tips margin-bot_20"
      :class="{'after-tips':errorBags.has('certificateNo')}"
      :data-tips="errorBags.first('certificateNo')"
    >
      <div class="page-cell-item select-nobor">
        <el-input
          placeholder="请输入产权证号"
          v-validate="'numeric|noZero'"
          data-vv-name="certificateNo"
          data-vv-as="产权证号"
          v-model="formData.certificateNo"
        >
          <div slot="prepend" class="item-before">证号</div>
        </el-input>
      </div>
    </div>
    <div class="dividing_line"></div>
    <div class="cell-tabs page-cell-item-flex">
      <div
        class="page-cell-item-flex form-error-tips"
        :class="{'after-tips':errorBags.has('area')}"
        :data-tips="errorBags.first('area')"
      >
        <div class="cell-tabs-item-title">面积</div>
        <div class="cell-tabs-item-data">
          <div class="item-deep-data">
            <input
              type="text"
              key="area"
              maxlength="8"
              @click.stop
              :placeholder="formData.area"
              data-vv-name="area"
              data-vv-as="面积"
              v-validate="'decimal:2|noZero1'"
              v-model="changeInput.area"
              class="min-input"
              v-show="changeBut.area"
            />
            <span v-show="!changeBut.area">{{formData.area || 0}}平方</span>
          </div>
          <div
            class="but-append"
            :data-tips="changeBut.area ? '完成' : '修改'"
            @click.stop="changeAreaBut"
          >
            <i class="el-icon-question"></i>
          </div>
        </div>
      </div>
      <div
        class="page-cell-item-flex form-error-tips"
        :class="{'after-tips':getErrorFlag}"
        :data-tips="getErrorText"
      >
        <div class="cell-tabs-item-title">房型</div>
        <div class="cell-tabs-item-data">
          <div class="item-deep-data">
            <div class="input-tips" key="input-tips" v-show="changeBut.roomType">
              <input
                type="text"
                key="room"
                maxlength="2"
                :placeholder="formData.room"
                @click.stop
                v-model="changeInput.room"
                data-vv-as="室"
                v-validate="'numeric|noZero|max:2'"
                data-vv-name="room"
                class="min-input"
              />室
              <input
                type="text"
                key="hall"
                maxlength="2"
                :placeholder="formData.hall"
                @click.stop
                v-model="changeInput.hall"
                data-vv-as="厅"
                data-vv-name="hall"
                v-validate="'numeric|noZero|max:2'"
                class="min-input"
              />厅
              <input
                type="text"
                key="toilet"
                maxlength="2"
                :placeholder="formData.toilet"
                @click.stop
                v-model="changeInput.toilet"
                data-vv-as="卫"
                data-vv-name="toilet"
                v-validate="'numeric|noZero|max:2'"
                class="min-input"
              />卫
              <input
                type="text"
                key="balcony"
                maxlength="2"
                :placeholder="formData.balcony"
                @click.stop
                v-model="changeInput.balcony"
                data-vv-as="阳台"
                data-vv-name="balcony"
                v-validate="'numeric|noZero|max:2'"
                class="min-input"
              />阳台
            </div>
            <span
              v-show="!changeBut.roomType"
            >{{formData.room || 0}}室{{formData.hall || 0}}厅{{formData.toilet || 0}}卫{{formData.balcony || 0}}阳台</span>
          </div>
          <div
            class="but-append"
            :data-tips="changeBut.roomType ? '完成' : '修改'"
            @click.stop="changeRoomTypeBut"
          >
            <i class="el-icon-question"></i>
          </div>
        </div>
      </div>
      <div class="page-cell-item-flex">
        <div class="cell-tabs-item-title">物业公司</div>
        <div class="cell-tabs-item-data">
          <div class="item-deep-data">{{formData.propertyCompany}}</div>
          <div class="but-append" v-if="formData.propertyCompany" data-tips="反馈">
            <i class="el-icon-question"></i>
          </div>
        </div>
      </div>
      <div class="page-cell-item-flex">
        <div class="cell-tabs-item-title">评估价</div>
        <div class="cell-tabs-item-data">{{formData.valuation}}</div>
      </div>
      <div class="page-cell-item-flex">
        <div class="cell-tabs-item-title">房屋朝向</div>
        <div class="cell-tabs-item-data">{{formData.face}}</div>
      </div>
      <div class="page-cell-item-flex">
        <div class="cell-tabs-item-title">电梯</div>
        <div class="cell-tabs-item-data">{{formData.isElevator == 0 ? '否' : '是'}}</div>
      </div>
      <div class="page-cell-item-flex">
        <div class="cell-tabs-item-title">房屋用途</div>
        <div class="cell-tabs-item-data">{{formData.houseUse}}</div>
      </div>
      <div class="page-cell-item-flex">
        <div class="cell-tabs-item-title">土地性质</div>
        <div class="cell-tabs-item-data">{{formData.landCharacteristic}}</div>
      </div>
      <div class="page-cell-item-flex">
        <div class="cell-tabs-item-title">产权性质</div>
        <div class="cell-tabs-item-data">{{formData.property}}</div>
      </div>
      <div class="page-cell-item-flex">
        <div class="cell-tabs-item-title">户型结构</div>
        <div class="cell-tabs-item-data">{{formData.roomType | mapFilter('ROOMTYPE')}}</div>
      </div>
      <div class="page-cell-item-flex">
        <div class="cell-tabs-item-title">房屋结构</div>
        <div class="cell-tabs-item-data">{{formData.houseStruct}}</div>
      </div>
      <div class="page-cell-item-flex">
        <div class="cell-tabs-item-title">小学划片</div>
        <div class="cell-tabs-item-data">{{formData.primarySchool}}</div>
      </div>
      <div class="page-cell-item-flex">
        <div class="cell-tabs-item-title">竣工时间</div>
        <div class="cell-tabs-item-data">{{formData.buildingTime}}</div>
      </div>
      <div class="page-cell-item-flex">
        <div class="cell-tabs-item-title">中学划片</div>
        <div class="cell-tabs-item-data">{{formData.middleSchool}}</div>
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
//import { mapState } from "vuex";
import util from "@/util/util";
export default {
  name: "basicInformation",
  props: {
    getData: {
      type: Boolean,
      default: false
    },
    houseType: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    paramsObj: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  filters: {
    mapFilter(value, ListName, resultValue = null) {
      return util.countMapFilter(value, ListName, resultValue);
    }
  },
  directives: {
    addHouse: {
      bind(el, value, vnode) {
        let addedbuilding = document.createElement("div");
        addedbuilding.style.cssText =
          "padding:4px 10px;text-align: right;color:#67C23A;cursor: pointer;";
        addedbuilding.innerText = "补充楼盘";
        addedbuilding.onclick = function() {
          vnode.context.addedbuilding();
        };
        el.querySelector(".el-scrollbar").after(addedbuilding);
      }
    }
  },
  computed: {
    getErrorFlag() {
      let ErroeField = ["room", "hall", "toilet", "balcony"];
      return ErroeField.some(item => this.errorBags.has(item));
    },
    getErrorText() {
      let ErroeField = ["room", "hall", "toilet", "balcony"];
      for (let index = 0; index < ErroeField.length; index++) {
        if (this.errorBags.first(ErroeField[index]) != null) {
          return this.errorBags.first(ErroeField[index]);
        }
      }
    },
    formData() {
      this.$set(
        this.$data,
        "step",
        JSON.parse(JSON.stringify(this.$store.state.addHouse.formData.step1))
      );
      return this.step;
    }
  },
  watch: {
    formData: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        //deff 获取到修改的属性
        let deffData = util.diffGet(
          this.$store.state.addHouse.formData.step1,
          this.formData
        );
        //判断当前是否有修改，如果有修改则length大于0
        let flag = Object.keys(deffData).length > 0 ? true : false;
        //判断store存储的是否与这次相同，相同则不commit
        if (this.$store.state.addHouse.isformDataNoCommit != flag) {
          this.$store.commit("updateIsformDataNoCommit", flag);
        }
        //把修改的过的值给与deffData用于传送后台，如果在一次进入也可以顺便把这个值清空
        this.deffData = deffData;
      }
    }
  },
  mounted() {
    //true 则去获取数据
    if (this.getData) {
      this.getLoadData();
    }
    window.addEventListener("click", this.bodyClick);
    if (this.$route.query.flag == "potentia") {
      this.getCommunityData(this.$route.query.comId);
      this.getBuildingData(this.$route.query.cbId);
      this.getRoomData(this.$route.query.bhId);
      this.selectPageCommunit.list.push({
        value: this.$route.query.comId,
        name: this.$route.query.communityName
      });
      this.formData.communityId = this.$route.query.comId;
      this.selectPageeBuildingNo.list.push({
        value: this.$route.query.cbId,
        name: this.$route.query.buildingName
      });
      this.formData.buildingId = this.$route.query.cbId;
      this.selectPageRoomNo.list.push({
        value: this.$route.query.bhId,
        name: this.$route.query.roomNo
      });
      this.formData.roomId = this.$route.query.bhId;
      this.formData.roomNo = this.$route.query.roomNo;
      this.formData.communityName = this.$route.query.communityName;
      this.formData.buildingNo = this.$route.query.buildingName;
      this.formData.customerName = this.$route.query.customerName;
      this.formData.tel = this.$route.query.tel;
    }
    console.log(this.$route.query.flag);
  },
  destroyed() {
    window.removeEventListener("click", this.bodyClick);
  },
  activated() {
    this.addHouseType = this.houseType;
  },
  methods: {
    //补充楼盘
    addedbuilding() {
      this.$router.push({ path: "/buySellSystem/CommunityReplenish" });
    },
    houseTypeChange(e) {
      this.$emit("update:houseType", e);
    },
    //点击其他位置进行判断，取消input
    bodyClick() {
      let that = this;
      //面积
      if (that.changeBut.area == true && !util.isNull(that.changeInput.area)) {
        if (
          that.changeInput.area == that.formData.area ||
          that.formData.area == null
        ) {
          that.changeBut.area = false;
        } else {
          that.$message({
            message: that.errorBags.first("area") || "修改的面积还未保存~",
            type: "warning"
          });
        }
      } else {
        that.changeBut.area = false;
      }
      //房型
      if (that.changeBut.roomType == true) {
        let list = ["room", "hall", "toilet", "balcony"];
        let flag = false;
        for (let i = 0; i < list.length; i++) {
          if (
            that.changeInput[list[i]] == that.formData[list[i]] ||
            that.formData[list[i]] == null
          ) {
            flag = false;
          } else {
            that.$message({
              message: that.getErrorText || "修改的房型还未保存~",
              type: "warning"
            });
            flag = true;
            break;
          }
        }
        that.changeBut.roomType = flag;
      } else {
        that.changeBut.roomType = false;
      }
    },
    //房型的切换修改
    async changeRoomTypeBut() {
      let flag = !this.changeBut.roomType;
      let that = this;
      let list = ["room", "hall", "toilet", "balcony"];
      if (flag == false) {
        for (let i = 0; i < list.length; i++) {
          let valiFlag = await this.$validator.validate(
            list[i],
            this.changeInput[list[i]]
          );
          if (!valiFlag || util.isNull(that.changeInput[list[i]])) {
            that.$message({
              message: that.getErrorText || "房型输入是空值",
              type: "warning"
            });
            flag = true;
            break;
          }
        }
        if (!flag) {
          for (let i = 0; i < list.length; i++) {
            that.formData[list[i]] =
              that.changeInput[list[i]] || that.formData[list[i]];
          }
        }
      }
      this.changeBut.roomType = flag;
    },
    //面积的切换修改
    async changeAreaBut() {
      let flag = !this.changeBut.area;
      let that = this;
      if (flag == false) {
        let valiFlag = await this.$validator.validate(
          "area",
          this.changeInput.area
        );
        if (!valiFlag || util.isNull(that.changeInput.area)) {
          that.$message({
            message: "面积输入的有问题",
            type: "warning"
          });
          flag = true;
        } else {
          that.formData.area = that.changeInput.area || that.formData.area;
        }
      }
      this.changeBut.area = flag;
    },
    //跳转到补充楼盘页面
    toHouse() {
      var that = this;
      that.$router.push({ path: "/buySellSystem/CommunityReplenish" });
    },
    //查询楼盘
    remoteCommunityName(e) {
      let that = this;
      that.selectPageCommunit.loading = true;
      this.$api
        .post({
          //url: "/mateHouse/queryCommunity",
          url: "/community/addHouse", //带权限
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
    //楼盘获取焦点 第一次点击就进行查询
    remoteCommunityNameInput() {
      if (this.selectPageCommunit.list.length == 0) {
        this.remoteCommunityName();
      }
    },
    //楼盘选择更改事件
    remoteCommunityNameChange(e) {
      console.log(e);
      let findResultIndex = this.selectPageCommunit.list.findIndex(item => {
        return item.value == e;
      });
      this.formData.communityName = this.selectPageCommunit.list[
        findResultIndex
      ].name;
      this.formData.buildingId = "";
      this.formData.roomId = "";
      this.formData.buildingNo = "";
      this.formData.roomNo = "";
      this.selectPageeBuildingNo.list = [];
      this.selectPageRoomNo.list = [];
      //初始化楼盘选中获取的数据
      this.formData.buildingTime = "";
      this.formData.property = "";
      this.formData.primarySchool = "";
      this.formData.middleSchool = "";
      this.formData.propertyCompany = "";
      //初始化楼栋选中获取的数据
      this.formData.isElevator = "";
      this.formData.houseUse = "";
      this.formData.houseStruct = "";
      //初始化房间号选中获取的数据
      this.formData.valuation = "";
      this.formData.area = 0;
      this.formData.face = "";
      this.formData.room = 0;
      this.getCommunityData(e);
      this.remoteBuildingNo();
    },
    //获取楼盘当前选中楼栋信息
    getCommunityData(id) {
      this.$api.get({ url: `/draft-house/community/${id}` }).then(e => {
        let data = e.data.data;
        if (e.data.code == 200) {
          this.formData.buildingTime = data.finishYear;
          this.formData.property = data.ownerProperty;
          this.formData.primarySchool = data.primarySchool;
          this.formData.middleSchool = data.middleSchool;
          this.formData.propertyCompany = data.propertyCompany;
        }
      });
    },
    //查询栋座
    remoteBuildingNo(e) {
      let that = this;
      //验证楼盘
      that.$validator
        .validate("communityId", this.formData.communityId)
        .then(result => {
          if (result) {
            that.selectPageeBuildingNo.loading = true;
            that.$api
              .post({
                url: "/mateHouse/queryComBuilding",
                data: {
                  page: 1,
                  limit: 50,
                  comBuildingName: e == undefined ? "" : e.trim(),
                  comId: that.formData.communityId
                },
                qs: true,
                token: false
              })
              .then(e => {
                let data = e.data;
                if (data.code == 200) {
                  that.selectPageeBuildingNo.list = data.data.list;
                  that.selectPageeBuildingNo.loading = false;
                }
              })
              .catch(e => {
                console.log(e);
              });
          }
        });
    },
    //栋座选择更改事件
    remoteBuildingNoChange(e) {
      let findResultIndex = this.selectPageeBuildingNo.list.findIndex(item => {
        return item.value == e;
      });
      this.formData.buildingNo = this.selectPageeBuildingNo.list[
        findResultIndex
      ].name;
      this.formData.roomNo = "";
      this.formData.roomId = "";
      this.selectPageRoomNo.list = [];
      //初始化楼栋选中获取的数据
      this.formData.isElevator = "";
      this.formData.houseUse = "";
      this.formData.houseStruct = "";
      //初始化房间号选中获取的数据
      this.formData.valuation = "";
      this.formData.area = 0;
      this.formData.face = "";
      this.formData.room = 0;
      this.getBuildingData(e);
      this.remoteRoomNo();
    },
    //获取楼栋当前选中楼栋信息
    getBuildingData(id) {
      this.$api.get({ url: `/draft-house/building/${id}` }).then(e => {
        let data = e.data.data;
        if (e.data.code == 200) {
          if (
            data.primarySchool != null &&
            !data.primarySchool.includes("未知")
          ) {
            this.formData.primarySchool = data.primarySchool;
          }
          if (
            data.middleSchool != null &&
            !data.middleSchool.includes("未知")
          ) {
            this.formData.middleSchool = data.middleSchool;
          }
          this.formData.isElevator = data.elevatorNum;
          this.formData.houseUse = data.buildType;
          this.formData.houseStruct = data.buildingStructure;
        }
      });
    },
    //查询房间号
    remoteRoomNo(e) {
      let that = this;
      //验证楼栋
      that.$validator
        .validate("buildingId", this.formData.buildingId)
        .then(result => {
          if (result) {
            that.selectPageRoomNo.loading = true;
            that.$api
              .post({
                url: "/mateHouse/queryBuildIngHouses",
                data: {
                  page: 1,
                  limit: 50,
                  comId: that.formData.communityId,
                  cbId: that.formData.buildingId,
                  roomNo: e == undefined ? "" : e.trim(),
                  isNotSale: 1
                },
                qs: true,
                token: false
              })
              .then(e => {
                let data = e.data;
                if (data.code == 200) {
                  that.selectPageRoomNo.list = data.data.list;
                  that.selectPageRoomNo.loading = false;
                }
              })
              .catch(e => {
                console.log(e);
              });
          }
        });
    },
    //房间号选择更改事件
    remoteRoomNoChange(e) {
      let findResultIndex = this.selectPageRoomNo.list.findIndex(item => {
        return item.value == e;
      });
      this.formData.roomNo = this.selectPageRoomNo.list[findResultIndex].name;
      this.formData.floor = this.selectPageRoomNo.list[findResultIndex].floor;
      //初始化房间号选中获取的数据
      this.formData.valuation = "";
      this.formData.area = 0;
      this.formData.face = "";
      this.formData.room = 0;
      this.getRoomData(e);
    },
    //获取房间号数据
    getRoomData(id) {
      this.$api.get({ url: `/draft-house/room/${id}` }).then(e => {
        let data = e.data.data;
        if (e.data.code == 200) {
          this.formData.valuation = data.valuation;
          this.formData.area = data.outArea;
          this.formData.face = data.orientation;
          this.formData.room = data.rooms || 0;
          this.formData.roomType = data.roomType;
        }
      });
    },
    removeTelToList(index, item) {
      this.addTel.splice(index, 1);
      this.formData["tel" + item] = "";
    },
    //添加电话号码123
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
    //验证
    validateAll() {
      let that = this;
      return this.$validator
        .validateAll()
        .then(e => {
          if (e && !that.changeBut.area && !that.changeBut.roomType) {
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
    //获取
    getLoadData() {
      this.loading = true;
      let url = `/draft-house/${this.$store.state.addHouse.formData.id}`;
      if (this.paramsObj.getEditUrl) {
        url =
          this.paramsObj.getEditUrl + this.$store.state.addHouse.formData.id;
      }
      return this.$api
        .get({
          url: url
        })
        .then(e => {
          if (e.data.code == 200) {
            this.$store.commit("updateId", e.data.data.id);
            this.$store
              .dispatch("InitFormData", {
                commitName: "updateStep1",
                json: e.data.data
              })
              .then(() => {
                this.selectPageCommunit.list.push({
                  value: this.formData.communityId,
                  name: this.formData.communityName
                });
                this.selectPageeBuildingNo.list.push({
                  value: this.formData.buildingId,
                  name: this.formData.buildingNo
                });
                this.selectPageRoomNo.list.push({
                  value: this.formData.roomId,
                  name: this.formData.roomNo,
                  disabled: this.formData.disabled
                });
              });
            //添加tel 1 2 3
            let tel = ["tel1", "tel2", "tel3"];
            tel.forEach((item, index) => {
              if (util.isNotNull(e.data.data[item])) {
                this.addTel.push(parseInt(item.replace(/[a-zA-Z]*/g, "")));
              }
            });
          }
        })
        .catch(e => {
          return false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    //创建
    upLoadData(e) {
      let that = this;
      let data = {
        ...that.deffData
      };
      let method = "post";
      let url = "/draft-house";
      if (this.paramsObj.editUrl) {
        url = this.paramsObj.editUrl;
      }
      if (that.$store.state.addHouse.formData.id != "") {
        data.id = that.$store.state.addHouse.formData.id;
        method = "put";
      }
      if (Object.keys(this.deffData).length == 0) {
        //没有做出修改
        return true;
      }
      return this.$api[method]({
        url: url,
        data: data,
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      })
        .then(e => {
          if (e.data.code == 200) {
            //存入Vuex;
            if (e.data.data != null) {
              that.$store.commit("updateId", e.data.data);
            }
            that.$store.commit("updateStep1", that.deffData);
            return true;
          } else {
            return false;
          }
        })
        .catch(e => {
          return false;
        });
    }
  },
  data() {
    return {
      addHouseType: this.houseType,
      step: {},
      addTel: [],
      sexList: sex,
      changeBut: {
        area: false,
        roomType: false
      },
      changeInput: {
        area: "",
        room: "",
        hall: "",
        toilet: "",
        balcony: ""
      },
      certificateType: certificateType,
      options: [],
      selectPageCommunit: {
        // 楼栋
        list: [],
        loading: false
      },
      selectPageeBuildingNo: {
        // 栋座
        list: [],
        loading: false
      },
      selectPageRoomNo: {
        // 房间号
        list: [],
        loading: false
      },
      loading: false,
      deffData: {},
      roomTypeStr: ""
    };
  }
};
</script>
