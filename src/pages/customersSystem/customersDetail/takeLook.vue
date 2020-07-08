<template>
  <div>
    <section class="look-content">
      <h5 class="look-title">添加带看</h5>
      <el-divider></el-divider>
      <!-- 带看类型 -->
      <div class="input-group is-required input-group-top">
        <div class="input-head">带看类型</div>
        <el-select
          v-model="value"
          popper-class="options-item"
          class="input-content"
          placeholder="请选择带看类型"
          data-vv-as="带看类型"
          data-vv-name="lookType"
          v-validate="'required'"
        >
          <el-option
            v-for="item in lookTypeList"
            :key="item.value"
            :label="item.key"
            :value="item.value"
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
          disabled
        >
        </el-date-picker>
      </div>
      <!-- 带看时间 -->
      <div class="input-group is-required">
        <div class="input-head">带看时间</div>
        <el-time-picker
          is-range
          v-model="timeValue"
          range-separator="—"
          class="input-content"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
          format="HH:mm"
          data-vv-as="带看时间"
          data-vv-name="timeValue"
          v-validate="'required'"
        >
        </el-time-picker>
        <div
          :class="{
            'after-error-tips': errorBags.has('timeValue')
          }"
          :data-error="errorBags.first('timeValue')"
        ></div>
      </div>
      <!-- 带看房源 -->
      <div class="input-group is-required">
        <div class="input-head">
          <span>带看房源</span>
          <span class="inline-btn" @click="addHouseToList">添加</span>
        </div>
        <div
          class="input-pack mar-btm-35 block"
          v-for="(hous, idx) in addHouse"
          :key="idx"
        >
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
              :key="item.value"
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
            @change="buildChange(hous)"
          >
            <el-option
              v-for="item in hous.cbIdList"
              :key="item.value"
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
            :data-vv-name="'roomNo' + idx"
            v-validate="{
              required: hous.cbId == '' || hous.comId == '' || hous.roomNo == ''
            }"
          >
            <el-option
              v-for="item in hous.roomNoList"
              :key="item.value"
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
            name="feedback"
            :value="item.value"
            v-model="value"
            data-vv-name="way"
            data-vv-as="带看反馈"
            v-validate="'required'"
          />
          <div class="radio-title">{{ item.key }}</div>
        </label>
        <div
          :class="{
            'after-error-tips': errorBags.has('way')
          }"
          :data-error="errorBags.first('way')"
        ></div>
      </div>
      <!-- 带看总结 -->
      <div class="input-group is-required">
        <div class="input-head">带看总结</div>
        <el-input
          v-model="value"
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
    </section>
    <div class="footer">
      <el-button class="floot-btn close-btn" type="info" @click="close"
        >返回</el-button
      >
      <el-button class="floot-btn success-btn" @click="confirm">完成</el-button>
    </div>
  </div>
</template>

<script>
export default {
  $_veeValidate: {
    validator: "new" // give me my own validator scope.
  },
  data() {
    return {
      value: "",
      dateValue: "",
      timeValue: "",
      addHouse: [
        {
          comId: "",
          cbId: "",
          roomNo: "",
          cbIdList: [], //楼栋
          roomNoList: [] //房间号
        }
      ],
      comList: [], //楼盘
      lookTypeList: [
        { key: "新房", value: 1 },
        { key: "二手商铺", value: 2 },
        { key: "二手房", value: 3 }
      ],
      feedbackList: [
        { key: "有意向", value: 4 },
        { key: "在考虑", value: 5 },
        { key: "不满意", value: 6 }
      ]
    };
  },
  created() {
    let time = new Date();
    this.dateValue = time.toLocaleDateString();
  },
  methods: {
    // 添加房源
    addHouseToList() {
      let house = {
        comId: "",
        cbId: "",
        roomNo: "",
        cbIdList: [], //楼栋
        roomNoList: [] //房间号
      };
      this.addHouse.push(house);
    },
    // 删除房源
    removeHouseToList(idx) {
      this.addHouse.splice(idx, 1);
    },
    //楼盘、楼栋、房号三级联动
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
            that.roomNo = "";
            that.cbId = "";
            hous.cbIdList = e.data.data.list;
          }
        });
    },
    buildChange(hous) {
      this.roomNoList = [];
      var that = this;
      this.HouseNoLoading = true;
      this.$api
        .get({
          url: "/mateHouse/queryBuildIngHouses",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comId: hous.comId,
            cbId: hous.cbId,
            limit: 300
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.roomNo = "";
            hous.roomNoList = [...this.roomNoList, ...e.data.data.list];
          }
        })
        .finally(() => {});
    },
    // 返回
    close() {
      this.$router.go(-1);
    },
    // 完成
    confirm() {
      this.$validator.validateAll().then(result => {
        if (result) {
          console.log(1);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../addCustomers/less/form");
.look-content {
  padding: 24px;
  padding: 35px;
  background: #fff;
  border-radius: 8px;
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
</style>
