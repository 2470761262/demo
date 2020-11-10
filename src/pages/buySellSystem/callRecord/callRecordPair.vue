<style lang="less" scoped>
@import "../myHouse/less/public.less";
.content-child {
  .content-warp {
    background: #fff;
    // prettier-ignore
    padding: 0 24PX;
    .implant-nav {
      display: flex;
      // prettier-ignore
      padding:16PX 0 24PX;
      .implant-nav-item {
        // prettier-ignore
        padding: 8PX 16PX;
        color: #606266;
        cursor: pointer;
        // prettier-ignore
        margin-right: 8PX;
        font-size: @font14;
        &.active {
          color: #fff;
          background: @backgroud;
          // prettier-ignore
          border-radius:8PX ;
        }
      }
    }
  }
  .search-content {
    background: #fff;
  }
}
.span-flex {
  padding-right: 0 !important;
}
@media screen and (max-width: 1440px) {
  .search-item {
    &:nth-child(3n) {
      padding-right: 0 !important;
    }
  }
}
@media screen and (min-width: 1440px) {
  .search-item {
    &:nth-child(4n) {
      padding-right: 0 !important;
    }
  }
}
</style>
<template>
  <div class="content-child">
    <div class="search-content">
      <!-- 通话类型 -->
      <div class="search-item ">
        <div class="search-item-title ">通话类型</div>
        <div class="search-item-body">
          <el-select
            v-model="form.followType"
            placeholder="请选择通话类型"
            clearable
            filterable
            data-anchor="话单选择通话类型 => select"
            @click.native="log_socket.sendUserActionData"
            @change="getSubFollowType"
          >
            <el-option
              v-for="item in followTypeList"
              class="anchor-point"
              :data-anchor="'话单选择通话类型 => select => option:' + item.name"
              @click.native="log_socket.sendUserActionData"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- 通话子类型 -->
      <div class="search-item ">
        <div class="search-item-title ">子类型</div>
        <div class="search-item-body">
          <el-select
            v-model="form.subFollowType"
            placeholder="请选择通话子类型"
            clearable
            filterable
            data-anchor="话单选择通话子类型 => select"
            @click.native="log_socket.sendUserActionData"
          >
            <el-option
              v-for="item in subFollowTypeList"
              class="anchor-point"
              :data-anchor="
                '话单选择通话子类型 => select => option:' + item.name
              "
              @click.native="log_socket.sendUserActionData"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- 回访人 -->
      <div class="search-item">
        <div class="search-item-title ">回访人</div>
        <div class="search-item-body">
          <el-input
            clearable
            maxlength="10"
            v-model="perName"
            class="input-text"
            placeholder="请输入回访人"
            @blur="handleInputBlur('perName', 'perName')"
          ></el-input>
        </div>
      </div>
      <!-- 回访人电话 -->
      <div class="search-item">
        <div class="search-item-title ">主叫号码</div>
        <div class="search-item-body">
          <el-input
            clearable
            v-number
            maxlength="11"
            v-model="caller"
            class="input-text"
            placeholder="请输入回访人电话"
            @blur="handleInputBlur('caller', 'caller')"
          ></el-input>
        </div>
      </div>
      <!-- 拨打电话 -->
      <div class="search-item">
        <div class="search-item-title ">被叫号码</div>
        <div class="search-item-body">
          <el-input
            clearable
            v-number
            maxlength="11"
            v-model="called"
            class="input-text"
            placeholder="请输入拨打电话"
            @blur="handleInputBlur('called', 'called')"
          ></el-input>
        </div>
      </div>
      <!-- 通话时间 -->
      <div class="search-item">
        <div class="search-item-title ">通话时间</div>
        <div class="search-item-body">
          <el-date-picker
            v-model="form.time"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </div>

      <!-- 按钮 -->
      <div class="search-item span-flex">
        <div class="search-item-body">
          <div class="btn-content">
            <span @click="resetLoad">重置</span>
            <button @click="validateFrom">搜索</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//楼盘 楼栋 房间号 级联 mixins
import cascadeHouse from "@/minxi/cascadeHouse";
export default {
  inject: ["form"],
  mixins: [cascadeHouse],
  $_veeValidate: {
    validator: "new" // give me my own validator scope.
  },
  data() {
    return {
      isInitLoadroomList: false, // 选择楼栋是否加载房间列表
      followTypeList: [],
      caller: "", //主叫
      called: "", // 被叫
      perName: "", // 回访人
      subFollowTypeList: [], //子类型
      time: [] //转换时间
    };
  },
  created() {
    this.getFollowType();
  },
  methods: {
    /**
     * @example: 失去焦点
     * @param {string} formField 失去交单的属性名称
     * @param {string} toFileld  需要赋值给form的属性名称
     */
    handleInputBlur(formField, toFileld) {
      this.form[toFileld] = this[formField];
    },
    resetLoad() {
      Object.assign(this.$parent.$data.form, this.$parent.$options.data().form);
      Object.assign(this.$data, this.$options.data());
    },
    validateFrom() {
      this.$validator.validateAll().then(e => {
        console.log(e);
        if (e) {
          this.form.followType = this.followType;
          this.form.subFollowType = this.subFollowType;
          this.form.perName = this.perName;
          this.form.caller = this.caller;
          this.form.called = this.called;
          this.form.time = this.time;
          this.form.random = new Date().getTime();
        }
      });
    },
    getFollowType() {
      this.$api
        .get({
          url: "/midtel/followTypes",
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            this.followTypeList = result.data;
          } else {
            alert(result.message);
          }
        });
    },
    getSubFollowType(code) {
      this.$api
        .get({
          url: "/midtel/subFollowTypes/" + code,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            this.subFollowTypeList = result.data;
          } else {
            alert(result.message);
          }
        });
    }
  }
};
</script>
