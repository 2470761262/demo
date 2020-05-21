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
            <li class="is-activate">不限</li>
            <li>50万以下</li>
            <li>50-100万</li>
            <li>100-150万</li>
            <li>150-200万</li>
            <li>200万以上</li>
            <li class="is-query-input">
              <input type="text" />
              <span></span>
              <input type="text" />
            </li>
            <li data-btn><button class="is-button">确定</button></li>
          </ul>
        </div>
        <div class="query-change-item">
          <h3>面积:</h3>
          <ul>
            <li class="is-activate">不限</li>
            <li>50㎡以下</li>
            <li>50-70㎡</li>
            <li>70-90㎡</li>
            <li>90-110㎡</li>
            <li>110-130㎡</li>
            <li>130-150㎡</li>
            <li>150-200㎡</li>
            <li>200㎡以上</li>
            <li class="is-query-input">
              <input type="text" />
              <span></span>
              <input type="text" />
            </li>
            <li data-btn><button class="is-button">确定</button></li>
          </ul>
        </div>
        <div class="query-change-item">
          <h3>房型:</h3>
          <ul>
            <li class="is-activate">不限</li>
            <li>1房</li>
            <li>50-70㎡</li>
            <li>70-90㎡</li>
            <li>90-110㎡</li>
            <li>110-130㎡</li>
            <li>130-150㎡</li>
            <li>150-200㎡</li>
            <li>200㎡以上</li>
            <li class="is-query-input">
              <input type="text" />
              <span></span>
              <input type="text" />
            </li>
            <li data-btn><button class="is-button">确定</button></li>
          </ul>
        </div>
        <div class="query-just">
          <div class="query-change-item">
            <h3>带看时间:</h3>
            <ul>
              <li class="flex-item">
                <div class="is-time">
                  <el-date-picker
                    v-model="form.tasttime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  >
                  </el-date-picker>
                </div>
                <button class="is-button">确定</button>
              </li>
            </ul>
          </div>
          <div class="query-change-item">
            <h3>录入时间:</h3>
            <ul>
              <li class="flex-item">
                <div class="is-time">
                  <el-date-picker
                    v-model="form.tasttime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  >
                  </el-date-picker>
                </div>
                <button class="is-button">确定</button>
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
    }
  },
  data() {
    return {
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
      changeQuery: false,
      form: {
        keyWord: "",
        tasttime: ""
      }
    };
  },
  methods: {
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
      if (this.fatherMethod) {
        this.fatherMethod({
          keyWord: this.form.keyWord,
          pairNumbers: this.selectedPairParams,
          desireIntensitys: this.selectedDesireIntensitys
        });
      } else {
        console.log("父组件未初始化搜索方法");
      }
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
