<template>
  <div>
    <section class="look-content">
      <div class="look-box">
        <h5 class="look-title">添加带看</h5>
        <el-divider></el-divider>
        <!-- 带看类型 -->
        <div class="input-group is-required input-group-top">
          <div class="input-head">带看类型</div>
          <el-select
            v-model="requireType"
            popper-class="options-item"
            class="input-content"
            placeholder="请选择带看类型"
            data-vv-as="带看类型"
            data-vv-name="lookType"
            v-validate="'required'"
            @change="changeType"
          >
            <el-option
              v-for="item in lookTypeList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
          <div
            :class="{
              'after-error-tips': errorBags.has('lookType')
            }"
            :data-error="errorBags.first('lookType')"
          ></div>
        </div>
        <!-- 带看日期 -->
        <div class="input-group is-required">
          <div class="input-head">带看日期</div>
          <el-date-picker
            v-model="dateValue"
            type="date"
            class="input-content"
            placeholder="选择日期"
            @change="changDate"
            :picker-options="startDateDisabled"
            disabled
          ></el-date-picker>
        </div>
        <!-- 带看时间 -->
        <div class="input-group is-required">
          <div class="input-head">带看时间</div>
          <div class="input-group-split relative">
            <el-time-picker
              class="input-content"
              v-model="timeStar"
              @change="changStarTime"
              format="HH:mm"
              value-format="HH:mm"
              :picker-options="{
                selectableRange: `00:00:00 -${nowTime + ':00'}`
              }"
              placeholder="开始时间"
              data-vv-as="开始时间"
              data-vv-name="timeStar"
              v-validate="'required'"
            ></el-time-picker>
            <div
              class="tip-style"
              :class="{
                'after-error-tips': errorBags.has('timeStar')
              }"
              :data-error="errorBags.first('timeStar')"
            ></div>
            <i class="input-split"></i>
            <el-time-picker
              class="input-content"
              v-model="timeEnd"
              @change="changEndTime"
              format="HH:mm"
              value-format="HH:mm"
              :picker-options="{
                selectableRange: `${
                  timeStar ? timeStar + ':00' : nowTime + ':00'
                } -${nowTime + ':00'}`
              }"
              placeholder="结束时间"
              data-vv-as="结束时间"
              data-vv-name="timeEnd"
              v-validate="'required'"
            ></el-time-picker>
            <div
              class="tip-style left"
              :class="{
                'after-error-tips': errorBags.has('timeEnd')
              }"
              :data-error="errorBags.first('timeEnd')"
            ></div>
          </div>
        </div>
      </div>
      <div class="look-box">
        <div class="conten-box" v-for="(hous, idx) in addHouse" :key="idx">
          <!-- 带看房源 -->
          <div class="input-group is-required">
            <div class="input-head">
              <span>带看房源</span>
              <span class="inline-btn" @click="addHouseToList" v-if="idx == 0"
                >添加</span
              >
            </div>
            <div class="input-pack mar-btm-35 block">
              <!-- 楼盘 -->
              <el-select
                v-model="hous.comId"
                popper-class="options-item"
                class="select-content"
                placeholder="请选择楼盘"
                remote
                clearable
                @focus="remoteInput(hous.comId)"
                @change="queryCBId(hous)"
                :remote-method="remoteMethod"
                filterable
              >
                <el-option
                  v-for="item in comList"
                  :key="item.index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
              <!-- 楼栋 -->
              <el-select
                v-model="hous.cbId"
                popper-class="options-item"
                class="select-content"
                placeholder="请选择楼栋"
                filterable
                @change="buildChange(hous)"
              >
                <el-option
                  v-for="item in hous.cbIdList"
                  :key="item.index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
              <!-- 房间号 -->
              <el-select
                v-model="hous.roomNo"
                popper-class="options-item"
                class="select-content"
                placeholder="请选择房号"
                data-vv-as="带看房源"
                filterable
                @change="roomChange(hous)"
                :data-vv-name="'roomNo' + idx"
                v-validate="{
                  required:
                    hous.cbId == '' || hous.comId == '' || hous.roomNo == '',
                  isSame: [
                    [...addHouse.map((housList, index) => housList.roomNo)],
                    '房源'
                  ]
                }"
              >
                <el-option
                  v-for="item in hous.roomNoList"
                  :key="item.index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
              <i
                v-show="addHouse.length > 1"
                class="el-icon-remove inline-remove-btn"
                @click="removeHouseToList(idx)"
              ></i>
              <div
                :class="{
                  'after-error-tips': errorBags.has('roomNo' + idx)
                }"
                :data-error="errorBags.first('roomNo' + idx)"
              ></div>
            </div>
          </div>
          <!-- 带看反馈 -->
          <div class="input-group is-required">
            <div class="input-head">带看反馈</div>
            <label
              class="radio-content"
              v-for="item in feedbackList"
              :key="item.value"
            >
              <input
                type="radio"
                :name="'way' + (idx + 1)"
                :value="item.value"
                v-model="hous.cusfeedback"
                :data-vv-name="'way' + (idx + 1)"
                data-vv-as="带看反馈"
                v-validate="'required'"
              />
              <div class="radio-title">{{ item.key }}</div>
            </label>
            <div
              :class="{
                'after-error-tips': errorBags.has('way' + (idx + 1))
              }"
              :data-error="errorBags.first('way' + (idx + 1))"
            ></div>
          </div>
        </div>
      </div>

      <div class="look-box">
        <!-- 带看总结 -->
        <div class="input-group is-required">
          <div class="input-head">带看总结</div>
          <el-input
            v-model="memo"
            clearable
            type="textarea"
            rows="8"
            class="textarea-content"
            show-word-limit
            maxlength="30"
            placeholder="请填写本次带看总结"
            data-vv-name="content"
            data-vv-as="带看总结"
            v-validate="'required|chineseLens'"
          />
          <div
            :class="{
              'after-error-tips': errorBags.has('content')
            }"
            :data-error="errorBags.first('content')"
          ></div>
        </div>
      </div>

      <div>
        <div class="look-box">
          <!-- action上传地址 -->
          <el-upload
            :action="uploadUrl"
            list-type="picture-card"
            :headers="headers"
            name="file"
            :before-upload="beforeImageUpload"
            :on-success="handleImageSuccess"
            :file-list="fileList"
            :on-error="uploadError"
            :limit="3"
          >
            <!-- 十字图标 -->
            <i slot="default" class="el-icon-plus"></i>
            <!-- 文件 -->
            <div slot="file" slot-scope="{ file }">
              <video
                v-if="file.raw.type.split('video').length >= 2"
                style="width:100%"
                v-bind:src="file.url"
              ></video>
              <img
                class="el-upload-list__item-thumbnail"
                v-else-if="file.raw.type.split('image').length >= 2"
                :src="file.url"
                alt
              />
              <img
                class="el-upload-list__item-thumbnail"
                v-else
                src="../../../assets/images/file.png"
                alt
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
              <span class="uploadName">{{ file.name }}</span>
            </div>
            <div slot="tip" class="el-upload__tip">
              支持添加图片、视频、文件，最多3份，单份大小限制5M以内
            </div>
          </el-upload>
        </div>
      </div>
    </section>
    <div class="footer">
      <el-button class="floot-btn close-btn" type="info" @click="close"
        >返回</el-button
      >
      <el-button
        class="floot-btn success-btn"
        @click="confirm"
        v-loading.fullscreen.lock="fullscreenLoading"
        >完成</el-button
      >
    </div>
    <fixedPopup
      :visible.sync="alertflag"
      styleType="0"
      customFlag="true"
      @confirmEmit="confirmEmit"
      @customBtn="customBtn"
    >
      <div class="alert-txt">
        改变带看类型会导致已录入的带看房源被清空。是否继续？
      </div>
    </fixedPopup>
  </div>
</template>

<script>
import util from "@/util/util";
import { TOKEN } from "@/util/constMap";

let token = util.localStorageGet(TOKEN);

export default {
  $_veeValidate: {
    validator: "new" // give me my own validator scope.
  },
  data() {
    return {
      fileList: [], //上传文件列表（用于展示）
      mediaList: [], //上传文件列表（用于提交到接口保存）
      headers: {
        tk: token
      },
      requireType: "",
      requireTypeOld: "",
      BeforeChangeType: "",
      dateValue: "",
      nowTime: "",
      timeStar: "",
      timeEnd: "",
      startDateDisabled: {},
      customerId: this.$route.query.customerId,
      startTime: "",
      endTime: "",
      Cusfeedback: "", //带看反馈
      memo: "", // 带看总结
      houseEidList: [],
      addHouse: [
        {
          comId: "",
          cbId: "",
          roomNo: "",
          agentPer: "",
          houseEid: "",
          cusfeedback: "",
          cbIdList: [], //楼栋
          roomNoList: [] //房间号
        }
      ],
      comList: [], //楼盘
      lookTypeList: [],
      feedbackList: [
        { key: "有意向", value: 0 },
        { key: "在考虑", value: 1 },
        { key: "不满意", value: 2 }
      ],
      fullscreenLoading: false,
      alertflag: false,
      loading: null, //加载中
      uploadUrl:this.$api.baseUrl()+'/saleCustomerOperation/addMedia'
    };
  },
  created() {
    let time = new Date();
    let hours = "";
    let minutes = "";
    this.dateValue = time;
    hours = time.getHours();
    minutes = time.getMinutes();
    if (hours >= 0 && hours <= 9) {
      hours = "0" + hours;
    }
    if (minutes >= 0 && minutes <= 9) {
      minutes = "0" + minutes;
    }
    this.nowTime = hours + ":" + minutes;
    // 限制开始日期不能超过当前日期
    this.startDateDisabled.disabledDate = times => {
      return times.getTime() > Date.now();
    };
    this.getCusRequired();
    this.validateInit();
  },
  methods: {
    /**
     * 上传失败
     */
    uploadError() {
      this.loading.close();
    },
    /**
     * 上传图片前的操作
     */
    beforeImageUpload(file) {
      let that = this;
      const isLt5M = file.size / 1024 / 1024 <= 5;
      if (!isLt5M) {
        that.$notify({
          title: "上传错误",
          message: file.name + "大小超过5M！，无法上传",
          type: "warning",
          duration: 3000
        });
      } else {
        that.loading = that.$loading({
          lock: true,
          text: file.name + "上传中",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
      }
      return isLt5M;
    },
    /**
     * 上传成功
     */
    handleImageSuccess(res, file, fileList) {
      // 上传成功
      this.fileList = fileList;
      this.loading.close();
      if (res.code == 200) {
        this.$notify({
          title: "上传成功",
          message: file.name + "上传成功",
          type: "success"
        });
        this.mediaList.push(res.data);
      } else {
        this.$notify({
          title: "上传错误",
          message: file.name + "大小超过5M，无法上传",
          type: "warning",
          duration: 3000
        });
        this.fileList.splice(this.fileList.length - 1, 1);
      }
      console.log("上传成功", res, file);
    },
    /**
     * 删除上传文件
     */
    handleRemove(file) {
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].uid == file.uid) {
          this.fileList.splice(i, 1);
          this.mediaList.splice(i, 1);
        }
      }
    },
    /**
     * @example: 获取客户需求列表
     */
    getCusRequired() {
      let that = this;
      that.$api
        .post({
          url: "/saleCustomerDetail/getCusRequired",
          data: { customerId: this.customerId },
          qs: true,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            for (let i = 0; i < e.data.data.length; i++) {
              if (
                e.data.data[i].key == 8 ||
                e.data.data[i].key == 16 ||
                e.data.data[i].key == 32
              ) {
                e.data.data.splice(i, 1);
                i--;
              }
            }
            that.lookTypeList = e.data.data;
          }
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          }
        });
    },
    /**
     * @example: 添加房源
     */
    addHouseToList() {
      let house = {
        comId: "",
        cbId: "",
        roomNo: "",
        agentPer: "",
        houseEid: "",
        cusfeedback: "",
        cbIdList: [], //楼栋
        roomNoList: [] //房间号
      };
      this.addHouse.push(house);
    },
    /**
     * @example: 删除房源
     */
    removeHouseToList(idx) {
      this.addHouse.splice(idx, 1);
    },
    /**
     * @example: 改变日期事件
     */
    changDate() {
      this.timeStar = "";
      this.timeEnd = "";
      let nowtime = new Date();
      let time = this.dateValue.toLocaleDateString();
      if (nowtime.toLocaleDateString() != time) {
        this.nowTime = "23:59";
      } else {
        let hours = "";
        let minutes = "";
        hours = nowtime.getHours();
        minutes = nowtime.getMinutes();
        if (hours >= 0 && hours <= 9) {
          hours = "0" + hours;
        }
        if (minutes >= 0 && minutes <= 9) {
          minutes = "0" + minutes;
        }
        this.nowTime = hours + ":" + minutes;
      }
    },
    /**
     * @example: 改变开始时间
     */
    changStarTime() {
      this.timeEnd = "";
    },
    /**
     * @example: 改变事件，传给后端拼接字符串
     */
    changEndTime() {
      let time = this.dateValue.toLocaleDateString();
      this.startTime = time + " " + this.timeStar;
      this.endTime = time + " " + this.timeEnd;
    },
    /**
     * @example: 楼盘、楼栋、房号三级联动
     */
    remoteInput(comId) {
      if (comId.length == 0) {
        this.remoteMethod();
      }
    },
    remoteMethod(query) {
      var that = this;
      if (query !== "") {
        this.$api
          .get({
            url: "/community/myConcern",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            token: false,
            data: {
              communityName: query,
              page: 1,
              limit: 50
            }
          })
          .then(e => {
            if (e.data.code == 200) {
              that.comList = e.data.data.list;
            }
          });
      }
    },
    queryCBId(hous) {
      var that = this;
      this.$api
        .get({
          url: "/mateHouse/queryComBuilding",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comId: hous.comId,
            page: 1,
            limit: 50
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            hous.roomNo = "";
            hous.cbId = "";
            hous.cbIdList = e.data.data.list;
          }
        });
    },
    buildChange(hous) {
      this.roomNoList = [];
      var that = this;
      if (this.requireType) {
        this.HouseNoLoading = true;
        this.$api
          .get({
            url: "/saleCustomerDetail/queryBuildIngHouses",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            token: false,
            qs: true,
            data: {
              comId: hous.comId,
              cbId: hous.cbId,
              requireId: this.requireType,
              limit: 300
            }
          })
          .then(e => {
            if (e.data.code == 200) {
              hous.roomNo = "";
              hous.roomNoList = [...this.roomNoList, ...e.data.data.list];
            }
          })
          .finally(() => {});
      } else {
        that.$message("请先选择带看类型");
      }
    },
    roomChange(hous) {
      let that = this;
      let postData = {
        communityId: hous.comId,
        communityBuildingId: hous.cbId,
        buildingHouseId: hous.roomNo,
        requireId: this.requireType
      };
      that.$api
        .post({
          url: "saleCustomerDetail/getAgentHouseByCommunity",
          data: postData,
          qs: true,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            hous.houseEid = e.data.data.id;
            hous.agentPer = e.data.data.AgentPer;
          }
        })
        .catch(e => {
          hous.houseEid = "";
          hous.agentPer = "";
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          }
        });
    },
    // 返回
    close() {
      this.$router.go(-1);
    },
    /**
     * @example: 提交
     */
    confirm() {
      this.fullscreenLoading = true;
      let that = this;
      let postData = {
        requireType: that.requireType,
        startTime: that.startTime,
        endTime: that.endTime,
        cusEid: that.customerId,
        memo: that.memo,
        houses: [],
        houseEids: [],
        houseAgentPers: [],
        mediaList: that.mediaList
      };
      that.addHouse.forEach(item => {
        let house = {};
        if (item.houseEid) {
          house.houseEid = item.houseEid;
        } else {
          house.houseEid = "";
        }
        if (item.agentPer) {
          house.houseAgentPer = item.agentPer;
        } else {
          house.houseAgentPer = "";
        }
        house.cusfeedback = item.cusfeedback;
        postData.houses.push(house);
      });
      this.$validator.validateAll().then(result => {
        if (result) {
          that.$api
            .post({
              url: "/saleCustomer/addPairRecord",
              data: postData,
              timeout:50000,
              headers: {
                "Content-Type": "application/json"
              }
            })
            .then(e => {
              if (e.data.code == 200) {
                that.close();
              }
            })
            .catch(e => {
              this.fullscreenLoading = false;
              if (e.response != undefined) {
                that.$message(e.response.data.message);
              }
            });
        } else {
          this.fullscreenLoading = false;
        }
      });
    },
    /**
     * @example: 初始化表的验证消息
     */
    validateInit() {
      const dictionary = {
        zh_CN: {
          messages: {
            required: field => field + "不能为空",
            arrFlatLength: field => field + "不能为空"
          }
        }
      };
      this.$validator.updateDictionary(dictionary);
    },
    changeType(val) {
      if (this.requireTypeOld) {
        if (
          this.requireTypeOld == 64 ||
          this.requireTypeOld == 128 ||
          this.requireTypeOld == 256
        ) {
          if (val != 64 && val != 128 && val != 256) {
            this.BeforeChangeType = this.requireTypeOld;
            this.alertflag = true;
          }
        } else {
          if (val == 64 || val == 128 || val == 256) {
            this.BeforeChangeType = this.requireTypeOld;
            this.alertflag = true;
          }
        }
      }
      this.requireTypeOld = val;
    },
    confirmEmit() {
      this.addHouse = [
        {
          comId: "",
          cbId: "",
          roomNo: "",
          agentPer: "",
          houseEid: "",
          cusfeedback: "",
          cbIdList: [], //楼栋
          roomNoList: [] //房间号
        }
      ];
      this.alertflag = false;
    },
    customBtn() {
      this.requireTypeOld = this.BeforeChangeType;
      this.requireType = this.BeforeChangeType;
      this.alertflag = false;
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../addCustomers/less/form");
.look-content {
  .look-box {
    padding: 24px;
    margin-bottom: 16px;
    background: #fff;
    border-radius: 8px;

    .uploadName {
      background-color: rgba(144, 147, 153, 0.7);
      color: white;
      display: inline-block;
      width: 100%;
      text-align: center;
      position: absolute;
      left: 0;
      bottom: 0;
    }

    .look-title {
      font-size: @font24;
    }
    .step-content();
    .input-group-top {
      margin-top: 16px;
    }
    .textarea-content {
      width: 506px;
    }
    .select-content {
      width: 163px;
      & + .select-content {
        margin-left: 8px;
      }
    }
    .conten-box {
      margin-bottom: 30px;
    }
  }
}
.footer {
  margin: 16px 0 22px 0;
  text-align: center;
  .floot-btn {
    font-size: @font16;
    width: 136px;
    height: 48px;
    margin-right: 16px;
  }
  .close-btn {
    background: #fff;
    color: rgba(144, 147, 153, 1);
    border: 1px solid rgba(206, 206, 206, 1);
  }
  .success-btn {
    background: @backgroud;
    color: rgba(255, 255, 255, 1);
    -border: none;
  }
}
.mar-btm-35 {
  margin-bottom: 35px;
}
.block {
  display: block !important;
}
.relative {
  position: relative;
}
.tip-style {
  position: absolute;
  width: 200px;
  top: 48px;
}
.left {
  left: 280px;
}
.alert-txt {
  padding-top: 24px;
  font-size: @font16;
}
</style>
<style lang="less">
.el-time-spinner__item {
  //prettier-ignore
  height: 32PX;
  //prettier-ignore
  line-height: 32PX;
}
.el-time-panel__content::after,
.el-time-panel__content::before {
  //prettier-ignore
  height: 32PX;
  //prettier-ignore
  line-height: 32PX;
}
.view-item {
  display: flex;
  // prettier-ignore
  margin-bottom: 30PX;
  position: relative;
  &.error-tips {
    &::after {
      content: attr(data-error);
      position: absolute;
      // prettier-ignore
      bottom: -4PX;
      // prettier-ignore
      left: 100PX;
      color: red;
      font-size: @font13;
      transform: translateY(100%);
    }
  }
  .view-item-left {
    font-size: @font16;
    flex-shrink: 0;

    // margin-right: 20PX;
    // prettier-ignore
    width: 80PX;
    position: relative;
    text-align: justify;
    // prettier-ignore
    height: 32PX;
    // prettier-ignore
    margin-right: 20PX;
    // prettier-ignore
    line-height: 32PX;
    &::after {
      display: inline-block;
      width: 100%;
      content: "";
    }
    &.is-require {
      &::before {
        content: "*";
        color: red;
        position: absolute;
        line-height: 1;
        // prettier-ignore
        left: -15PX;
        // prettier-ignore
        top: 10PX;
      }
    }
    &.is-center {
      align-self: center;
    }
  }
  .view-item-right {
    flex: 1;
    &.is-center {
      align-self: center;
    }
  }
}
</style>
