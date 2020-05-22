<style lang="less" scoped>
.button-mixins() {
  background: #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 15px;
  cursor: pointer;
  border: 2px solid #ababab;
  box-sizing: border-box;
  opacity: 1;
  transition: none !important;
  font-family: "SimHei", sans-serif;
  &:active {
    opacity: 0.6;
  }
}
.input-group() {
  display: flex;
  height: 25px;
  padding: 0;
  input {
    width: 50px;
    height: 100%;
    font-size: 15px;
    color: #767676;
    box-sizing: border-box;
    border-width: 1px;
    outline: none;
    border: 1px solid #c4c4c4;
    font-family: "SimHei", sans-serif;
    text-indent: 2px;
    &:focus {
      border-color: var(--color--primary);
    }
  }
  span {
    margin: 0 4px;
    height: 1px;
    width: 6px;
    align-self: center;
    background: #767676;
  }
}
.query-content {
  padding: 15px 0;
  position: relative;
  .select-input {
    display: flex;
    width: 980px;
    .select-input-set {
      display: flex;
      align-items: center;
      flex: 1;
      border: 2px solid #ababab;
      height: 35px;
      box-sizing: border-box;
      .el-icon-search {
        font-size: 22px;
        margin: 0 10px;
        color: #c3c3c3;
      }
      .select-input-sub {
        outline: none;
        border: none;
        font-size: 16px;
        flex: 1;
        background: inherit;
        &::-webkit-input-placeholder {
          color: #c3c3c3;
        }
      }
    }
    .select-but-sub {
      width: 130px;
      .button-mixins();
      border-left-width: 0px;
    }
  }
  .query-change-content {
    .query-change-item {
      display: flex;
      align-items: center;
      margin-top: 20px;
      > h3 {
        font-size: 15px;
        color: black;
        font-weight: normal;
      }
      ul {
        display: flex;
        margin-left: 10px;
        li {
          font-size: 15px;
          padding: 2px 6px;
          border-radius: 4px;
          transition: all 0.4s ease-in-out;
          margin-right: 20px;
          color: #767676;
          cursor: pointer;
          line-height: 21px;
          &:last-child {
            margin-right: 0;
          }
          &[data-btn] {
            padding: 0;
          }
          &.is-activate {
            background: var(--color--primary);
            color: #fff;
          }
          &.is-query-input {
            .input-group;
          }
          .is-time {
            width: 240px;
            margin-right: 20px;
            /deep/.el-date-editor {
              height: 25px;
              width: 100%;
              .el-range__icon,
              .el-range-separator,
              .el-range__close-icon {
                line-height: 19px;
              }
            }
          }
          &.flex-item {
            padding: 0 !important;
            display: flex;
          }
        }
        .is-button {
          height: 100%;
          .button-mixins;
          padding: 0;
          margin-right: 0;
          border: none;
          border-radius: 0;
          color: #fff;
          padding: 0 10px;
          background: var(--color--primary);
        }
      }
    }
    .query-just {
      width: 980px;
      display: flex;
      justify-content: space-between;
      .query-change-item {
        margin-bottom: 0;
      }
    }
  }
  .icon {
    position: absolute;
    left: 1208px;
    bottom: 13px;
    font-size: 20px;
    color: var(--color--primary);
    transform: rotateZ(90deg);
    cursor: pointer;
    transition: transform 0.3s ease-in;
    &.is-active {
      transform: rotateZ(-90deg);
    }
  }
}
</style>
<template>
  <section class="query-content">
    <div class="select-input">
      <div class="select-input-set">
        <i class="el-icon-search"></i>
        <input
          type="text"
          class="select-input-sub"
          placeholder="请输入客户姓名,联系方式"
          v-model="form.keyWord"
        />
      </div>
      <button class="select-but-sub" @click="search">开始搜索</button>
    </div>
    <transition name="el-fade-in-linear">
      <div class="query-change-content" v-if="changeQuery">
        <div class="query-change-item">
          <h3>意向:</h3>
          <ul>
            <li
              @click="changeDesireUnlimit"
              :class="{ 'is-activate': selectedDesire }"
            >
              不限
            </li>
            <li
              @click="changeDesireField('selectedDesireWeek')"
              :class="{ 'is-activate': selectedDesireWeek }"
            >
              较弱({{ fatherQueryGroup[1]["较弱"] }})
            </li>
            <li
              @click="changeDesireField('selectedDesireCommon')"
              :class="{ 'is-activate': selectedDesireCommon }"
            >
              一般({{ fatherQueryGroup[1]["一般"] }})
            </li>
            <li
              @click="changeDesireField('selectedDesireStrong')"
              :class="{ 'is-activate': selectedDesireStrong }"
            >
              强烈({{ fatherQueryGroup[1]["强烈"] }})
            </li>
          </ul>
        </div>
        <div class="query-change-item">
          <h3>进度:</h3>
          <ul>
            <li
              :class="{ 'is-activate': selectedPair }"
              @click="changePairUnlimit()"
            >
              不限
            </li>
            <li
              @click="changePairField(index)"
              :class="{ 'is-activate': changePairClass(index) }"
              v-for="(item, index) in fatherQueryGroup[0]"
              :key="index"
            >
              {{ index }}({{ item }})
            </li>
            <li v-for="(item, index) in activeParams" :key="index">
              {{ index }}({{ item }})
            </li>
          </ul>
        </div>
        <div class="query-change-item">
          <h3>价格:</h3>
          <ul>
            <li
              @click="changePriceSelected('unlimit')"
              :class="{ 'is-activate': priceSelected['unlimit'] }"
            >
              不限
            </li>
            <li
              @click="changePriceSelected(0, 50)"
              :class="{ 'is-activate': priceSelected['0'] }"
            >
              50万以下
            </li>
            <li
              @click="changePriceSelected(50, 100)"
              :class="{ 'is-activate': priceSelected['50'] }"
            >
              50-100万
            </li>
            <li
              @click="changePriceSelected(100, 150)"
              :class="{ 'is-activate': priceSelected['100'] }"
            >
              100-150万
            </li>
            <li
              @click="changePriceSelected(150, 200)"
              :class="{ 'is-activate': priceSelected['150'] }"
            >
              150-200万
            </li>
            <li
              @click="changePriceSelected(200, null)"
              :class="{ 'is-activate': priceSelected['200'] }"
            >
              200万以上
            </li>
            <li class="is-query-input">
              <input
                type="text"
                v-model="minPrice"
                oninput="value=value.replace(/[^\d]/g,'')"
                @change="handlerPriceChange"
              />
              <span></span>
              <input
                type="text"
                v-model="maxPrice"
                oninput="value=value.replace(/[^\d]/g,'')"
                @change="handlerPriceChange"
              />
            </li>
            <li data-btn>
              <button class="is-button" @click="searchWithParams">确定</button>
            </li>
          </ul>
        </div>
        <div class="query-change-item">
          <h3>面积:</h3>
          <ul>
            <li
              @click="changeAreaSelected('unlimit')"
              :class="{ 'is-activate': areaSelected['unlimit'] }"
            >
              不限
            </li>
            <li
              @click="changeAreaSelected(0, 50)"
              :class="{ 'is-activate': areaSelected['0'] }"
            >
              50㎡以下
            </li>
            <li
              @click="changeAreaSelected(50, 70)"
              :class="{ 'is-activate': areaSelected['50'] }"
            >
              50-70㎡
            </li>
            <li
              @click="changeAreaSelected(70, 90)"
              :class="{ 'is-activate': areaSelected['70'] }"
            >
              70-90㎡
            </li>
            <li
              @click="changeAreaSelected(90, 110)"
              :class="{ 'is-activate': areaSelected['90'] }"
            >
              90-110㎡
            </li>
            <li
              @click="changeAreaSelected(110, 130)"
              :class="{ 'is-activate': areaSelected['110'] }"
            >
              110-130㎡
            </li>
            <li
              @click="changeAreaSelected(130, 150)"
              :class="{ 'is-activate': areaSelected['130'] }"
            >
              130-150㎡
            </li>
            <li
              @click="changeAreaSelected(150, 200)"
              :class="{ 'is-activate': areaSelected['150'] }"
            >
              150-200㎡
            </li>
            <li
              @click="changeAreaSelected(200, null)"
              :class="{ 'is-activate': areaSelected['200'] }"
            >
              200㎡以上
            </li>
            <li class="is-query-input">
              <input
                type="text"
                v-model="minArea"
                oninput="value=value.replace(/[^\d]/g,'')"
                @change="handleAreaChange"
              />
              <span></span>
              <input
                type="text"
                v-model="maxArea"
                oninput="value=value.replace(/[^\d]/g,'')"
                @change="handleAreaChange"
              />
            </li>
            <li data-btn>
              <button class="is-button" @click="searchWithParams">确定</button>
            </li>
          </ul>
        </div>
        <div class="query-change-item">
          <h3>房型:</h3>
          <ul>
            <li
              @click="changeRoomSelectedUnlimit()"
              :class="{ 'is-activate': roomSelectedUnlimit }"
            >
              不限
            </li>
            <li
              v-for="(item, index) in roomSelected"
              :key="index"
              @click="changeRoomSelected(index)"
              :class="{ 'is-activate': roomSelected[index] }"
            >
              {{ index == 5 ? index + "房以上" : index + "房" }}
            </li>
          </ul>
        </div>
        <div class="query-just">
          <div class="query-change-item">
            <h3>带看时间:</h3>
            <ul>
              <li class="flex-item">
                <div class="is-time">
                  <el-date-picker
                    v-model="form.pairTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  >
                  </el-date-picker>
                </div>
                <button class="is-button" @click="searchPairTime">确定</button>
              </li>
            </ul>
          </div>
          <div class="query-change-item">
            <h3>录入时间:</h3>
            <ul>
              <li class="flex-item">
                <div class="is-time">
                  <el-date-picker
                    v-model="form.addTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  >
                  </el-date-picker>
                </div>
                <button class="is-button" @click="searchAddTime">确定</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
    <div
      class="el-icon-d-arrow-left icon"
      :class="{ 'is-active': !changeQuery }"
      @click="triggerChange"
    ></div>
  </section>
</template>

<script>
export default {
  props: {
    fatherMethod: {
      type: Function,
      default: null
    },
    fatherQueryGroup: {
      type: Array,
      default: () => [
        {
          未带看: 0,
          首次带看: 0,
          二次带看: 0,
          三次带看: 0,
          四次带看: 0,
          五次带看以上: 0
        },
        { 强烈: 0, 一般: 0, 较弱: 0 },
        { 在谈: 0, 签约: 0 }
      ]
    }
  },
  computed: {
    activeParams: function() {
      let p = {};
      for (let key in this.fatherQueryGroup[2]) {
        if (["在谈", "签约"].includes(key)) {
          p[key] = this.fatherQueryGroup[2][key];
        }
      }
      return p;
    }
  },
  watch: {
    selectedPairNone: function(val) {
      this.updatePairParams(val, 0);
    },
    selectedPairOne: function(val) {
      this.updatePairParams(val, 1);
    },
    selectedPairTwo: function(val) {
      this.updatePairParams(val, 2);
    },
    selectedPairThree: function(val) {
      this.updatePairParams(val, 3);
    },
    selectedPairFour: function(val) {
      this.updatePairParams(val, 4);
    },
    selectedPairFiveUp: function(val) {
      this.updatePairParams(val, 5);
    },
    selectedDesireStrong: function(val) {
      this.updateDesireParams(val, 2);
    },
    selectedDesireCommon: function(val) {
      this.updateDesireParams(val, 1);
    },
    selectedDesireWeek: function(val) {
      this.updateDesireParams(val, 0);
    },
    "form.pairTime": function(newValue, oldValue) {
      if (!newValue) {
        this.minLastPairFollowTime = null;
        this.maxLastPairFollowTime = null;
        this.searchWithParams();
      }
    },
    "form.addTime": function(newValue, oldValue) {
      if (!newValue) {
        this.minAddTime = null;
        this.maxAddTime = null;
        this.searchWithParams();
      }
    }
  },
  data() {
    return {
      priceSelected: {
        unlimit: true,
        0: false,
        50: false,
        100: false,
        150: false,
        200: false
      },
      areaSelected: {
        unlimit: true,
        0: false,
        50: false,
        70: false,
        90: false,
        110: false,
        130: false,
        150: false,
        200: false
      },
      roomSelected: {
        5: false,
        4: false,
        3: false,
        2: false,
        1: false
      },
      roomSelectedUnlimit: true, //房型 不限 条件。默认选中
      selectedDesire: true,
      selectedDesireStrong: false,
      selectedDesireWeek: false,
      selectedDesireCommon: false,
      selectedPair: true, //进度，不限
      selectedPairNone: false,
      selectedPairOne: false,
      selectedPairTwo: false,
      selectedPairThree: false,
      selectedPairFour: false,
      selectedPairFiveUp: false,
      selectedPairParams: [], //带看多选条件
      selectedDesireIntensitys: [], //意向多选条件
      selectedHouseNumbers: [], //房型多选条件
      minPrice: null, //最小价格条件
      maxPrice: null, //最大价格条件
      minArea: null, //最小面积条件
      maxArea: null, //最大面积条件
      minLastPairFollowTime: null, //最大带看时间条件
      maxLastPairFollowTime: null, //最大带看时间条件
      minAddTime: null, //最小录入时间条件
      maxAddTime: null, //最大录入时间条件
      changeQuery: false,
      form: {
        keyWord: "",
        addTime: "",
        pairTime: ""
      }
    };
  },
  methods: {
    searchPairTime() {
      if (this.form.pairTime) {
        this.minLastPairFollowTime = this.form.pairTime[0];
        this.maxLastPairFollowTime = this.form.pairTime[1];
        this.searchWithParams();
      } else {
        this.$message({
          type: "info",
          message: "请选择搜索带看时间"
        });
      }
    },
    searchAddTime() {
      if (this.form.addTime) {
        this.minAddTime = this.form.addTime[0];
        this.maxAddTime = this.form.addTime[1];
        this.searchWithParams();
      } else {
        this.$message({
          type: "info",
          message: "请选择搜索录入时间"
        });
      }
    },
    handlerPriceChange() {
      for (let key in this.priceSelected) {
        this.priceSelected[key] = false;
        console.log("ssssss");
      }
    },
    handleAreaChange() {
      for (let key in this.areaSelected) {
        this.areaSelected[key] = false;
      }
    },
    changeRoomSelectedUnlimit() {
      this.roomSelectedUnlimit = true;
      for (let key in this.roomSelected) {
        this.roomSelected[key] = false;
      }
      this.selectedHouseNumbers = []; //条件置空
      this.searchWithParams();
    },
    changeRoomSelected(field) {
      this.roomSelectedUnlimit = false;
      this.roomSelected[field] = !this.roomSelected[field];

      if (this.roomSelected[field]) {
        //增加选中 房型 条件
        if (!this.selectedHouseNumbers.includes(field)) {
          this.selectedHouseNumbers.push(field);
        }
      } else {
        //移除选中改条件
        var index = this.selectedHouseNumbers.indexOf(field);
        if (index > -1) {
          this.selectedHouseNumbers.splice(index, 1);
          console.log(field, this.selectedHouseNumbers, "移除了房型条件");
        }
      }

      this.searchWithParams();
    },
    changeAreaSelected(min, max) {
      this.areaSelected[min] = true;
      for (let key in this.areaSelected) {
        if (key != min) {
          this.areaSelected[key] = false;
        }
      }
      if (min == "unlimit") {
        this.minArea = null;
        this.maxArea = null;
      } else {
        this.minArea = min;
        this.maxArea = max;
      }
      this.searchWithParams();
    },
    changePriceSelected(min, max) {
      this.priceSelected[min] = true;
      for (let key in this.priceSelected) {
        if (key != min) {
          this.priceSelected[key] = false;
        }
      }
      if (min == "unlimit") {
        this.minPrice = null;
        this.maxPrice = null;
      } else {
        this.minPrice = min;
        this.maxPrice = max;
      }
      this.searchWithParams();
    },
    updateDesireParams(changeVal, value) {
      if (value == -1) {
        this.selectedDesireIntensitys = [];
        this.searchWithParams();
        return;
      }
      if (changeVal) {
        if (!this.selectedDesireIntensitys.includes(value)) {
          this.selectedDesireIntensitys.push(value);
          console.log(value, this.selectedDesireIntensitys, "添加了意向条件后");
        }
      } else {
        var index = this.selectedDesireIntensitys.indexOf(value);
        if (index > -1) {
          this.selectedDesireIntensitys.splice(index, 1);
          console.log(value, this.selectedDesireIntensitys, "移除了意向条件");
        }
      }
      this.searchWithParams();
    },
    updatePairParams(changeVal, value) {
      if (value == -1) {
        this.selectedPairParams = [];
        this.searchWithParams();
        return;
      }
      if (changeVal) {
        if (!this.selectedPairParams.includes(value)) {
          this.selectedPairParams.push(value);
          console.log(value, this.selectedPairParams, "添加了带看次数条件后");
        }
      } else {
        var index = this.selectedPairParams.indexOf(value);
        if (index > -1) {
          this.selectedPairParams.splice(index, 1);
          console.log(value, this.selectedPairParams, "移除了带看次数条件");
        }
      }
      this.searchWithParams();
    },
    changePairUnlimit() {
      this.selectedPairParams = [];
      this.selectedPair = true;
      this.selectedPairNone = false;
      this.selectedPairOne = false;
      this.selectedPairTwo = false;
      this.selectedPairThree = false;
      this.selectedPairFour = false;
      this.selectedPairFiveUp = false;
      this.searchWithParams();
    },
    changePairField(field) {
      if (field == "未带看") this.selectedPairNone = !this.selectedPairNone;
      if (field == "首次带看") this.selectedPairOne = !this.selectedPairOne;
      if (field == "二次带看") this.selectedPairTwo = !this.selectedPairTwo;
      if (field == "三次带看") this.selectedPairThree = !this.selectedPairThree;
      if (field == "四次带看") this.selectedPairFour = !this.selectedPairFour;
      if (field == "五次带看以上") {
        this.selectedPairFiveUp = !this.selectedPairFiveUp;
      }
      if (
        !this.selectedPairNone &&
        !this.selectedPairOne &&
        !this.selectedPairTwo &&
        !this.selectedPairThree &&
        !this.selectedPairFour &&
        !this.selectedPairFiveUp
      ) {
        this.selectedPair = true;
      } else {
        this.selectedPair = false;
      }
    },
    changePairClass(field) {
      if (field == "未带看") return this.selectedPairNone;
      if (field == "首次带看") return this.selectedPairOne;
      if (field == "二次带看") return this.selectedPairTwo;
      if (field == "三次带看") return this.selectedPairThree;
      if (field == "四次带看") return this.selectedPairFour;
      if (field == "五次带看以上") return this.selectedPairFiveUp;
    },
    changeDesireUnlimit() {
      this.selectedDesire = true;
      this.selectedDesireStrong = this.selectedDesireWeek = this.selectedDesireCommon = false;
      this.searchWithParams();
    },
    changeDesireField(field) {
      this[field] = !this[field];
      if (
        !this.selectedDesireStrong &&
        !this.selectedDesireWeek &&
        !this.selectedDesireCommon
      ) {
        this.selectedDesire = true; //都没选择，那么“不限”给自动选中
      } else {
        this.selectedDesire = false;
      }
    },
    searchWithParams() {
      if (!this.fatherMethod) {
        console.log("父组件未初始化搜索方法");
      }
      if (
        this.minPrice &&
        this.maxPrice &&
        Number(this.minPrice) > Number(this.maxPrice)
      ) {
        this.$message({
          type: "info",
          message: "最小价格不能大于最大价格"
        });
        this.minPrice = this.maxPrice = null;
        return;
      }
      if (
        this.minArea &&
        this.maxArea &&
        Number(this.minArea) > Number(this.maxArea)
      ) {
        this.$message({
          type: "info",
          message: "最小面积不能大于最大面积"
        });
        this.minArea = this.maxArea = null;
        return;
      }
      this.fatherMethod({
        keyWord: this.form.keyWord,
        pairNumbers: this.selectedPairParams,
        desireIntensitys: this.selectedDesireIntensitys,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        minArea: this.minArea,
        maxArea: this.maxArea,
        houseNumbers: this.selectedHouseNumbers,
        minAddTime: this.minAddTime,
        maxAddTime: this.maxAddTime,
        minLastPairFollowTime: this.minLastPairFollowTime,
        maxLastPairFollowTime: this.maxLastPairFollowTime
      });
    },
    search() {
      console.log("点击关键词搜索按钮的搜索");
      this.searchWithParams();
    },
    triggerChange() {
      this.changeQuery = !this.changeQuery;
    }
  }
};
</script>
