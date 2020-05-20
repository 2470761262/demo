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
          v-model="form.searchData"
        />
      </div>
      <button class="select-but-sub" @click="search">开始搜索</button>
    </div>
    <transition name="el-fade-in-linear">
      <div class="query-change-content" v-if="changeQuery">
        <div class="query-change-item">
          <h3>意向:</h3>
          <ul>
            <li class="is-activate">不限</li>
            <li>强烈(10)</li>
            <li>一般(12)</li>
            <li>较弱(7)</li>
          </ul>
        </div>
        <div class="query-change-item">
          <h3>进度:</h3>
          <ul>
            <li class="is-activate">不限</li>
            <li>为带看(30)</li>
            <li>首次带看(12)</li>
            <li>二次带看(3)</li>
            <li>三次带看(2)</li>
            <li>四次带看(5)</li>
            <li>五次带看(7)</li>
            <li>五次带看以上(2)</li>
            <li>再谈(1)</li>
            <li>签约(2)</li>
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
    }
  },
  data() {
    return {
      changeQuery: false,
      form: {
        searchData: "",
        tasttime: ""
      }
    };
  },
  methods: {
    search() {
      console.log("执行了父组件的方法");
      if (this.fatherMethod) {
        this.fatherMethod({});
      } else {
        console.log("xx ");
      }
    },
    triggerChange() {
      this.changeQuery = !this.changeQuery;
    }
  }
};
</script>
