<style lang="less" scoped>
@import "../../less/public.less";
.split-line {
  background: #f2f2f2;
  // prettier-ignore
  height: 7PX;
}
.search-tab {
  display: flex;
  // prettier-ignore
  padding:15PX 0PX 15PX 15PX;
  div {
    cursor: pointer;
    border: 1px solid @backgroud;
    border-radius: 4px;
    // prettier-ignore
    padding: 5PX 15PX;
    font-size: @font14;
    color: @backgroud;
    // prettier-ignore
    margin-right: 20PX;
    &.active {
      background: @backgroud;
      color: #fff;
      border-color: transparent;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
<template>
  <div>
    <div class="search-content">
      <!-- 楼盘 栋座 房间号 联级 -->
      <div class="search-item">
        <div class="search-item-title title-width80">
          楼盘
        </div>
        <div class="search-item-body">
          <el-select
            v-model="buildOptData"
            placeholder="楼盘名称"
            class="input-content  anchor-point"
            clearable
            filterable
            remote
            popper-class="options-myhouse-custom-item anchor-point"
            data-anchor="我的房源楼盘 => select"
            @click.native="log_socket.sendUserActionData"
            @focus="remoteBuildInput"
            @change="remoteBuildChange"
            :remote-method="buildRemoteMethod"
            :loading="buildLoading"
            value-key="value"
          >
            <el-option
              v-for="item in buildForList"
              class="anchor-point"
              :data-anchor="'我的房源列表楼盘 => select => option:' + item.name"
              @click.native="log_socket.sendUserActionData"
              :key="item.value"
              :label="item.name"
              :value="item"
            >
            </el-option>
          </el-select>
          <!-- 栋座 -->
          <el-select
            v-model="towerOptData"
            placeholder="栋座"
            clearable
            filterable
            class="input-content  anchor-point"
            popper-class="options-myhouse-custom-item anchor-point"
            data-anchor="我的房源栋座 => select"
            @click.native="log_socket.sendUserActionData"
            value-key="value"
            remote
            :remote-method="queryRoomNo"
            @change="remoteRoomNoChange"
            :loading="towerLoading"
          >
            <el-option
              v-for="item in towerForList"
              class="anchor-point"
              :data-anchor="'我的房源列表栋座 => select => option:' + item.name"
              @click.native="log_socket.sendUserActionData"
              :key="item.value"
              :label="item.name"
              :value="item"
            >
            </el-option>
          </el-select>
          <!-- 房间号 -->
          <el-select
            v-model="roomOptData"
            placeholder="房间号"
            clearable
            filterable
            popper-class="options-myhouse-custom-item anchor-point"
            class="input-content  anchor-point"
            data-anchor="我的房源房号 => select"
            @click.native="log_socket.sendUserActionData"
            remote
            :remote-method="queryRoomData"
            :loading="roomLoading"
            value-key="value"
            @change="queryRoomDataChange"
          >
            <el-option
              v-for="item in roomForList"
              class="anchor-point"
              :data-anchor="'我的房源列表房号 => select => option:' + item.name"
              @click.native="log_socket.sendUserActionData"
              :key="item.value"
              :label="item.name"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- 房源编号 -->
      <div class="search-item">
        <div class="search-item-title ">
          房源编号
        </div>
        <div class="search-item-body">
          <el-input
            clearable
            v-model="houseNo"
            class="input-text"
            placeholder="房源编号"
          ></el-input>
        </div>
      </div>
      <!-- 业主 -->
      <div class="search-item">
        <div class="search-item-title ">业主姓名</div>
        <div class="search-item-body">
          <el-input
            clearable
            v-model="cusName"
            class="input-text"
            placeholder="业主姓名"
            @blur="handleInputBlur('cusName', 'customName')"
          ></el-input>
        </div>
      </div>
      <!-- 电话 -->
      <div class="search-item">
        <div class="search-item-title ">业主电话</div>
        <div class="search-item-body">
          <el-input
            clearable
            v-model="cusPhone"
            class="input-text"
            placeholder="业主电话"
            @blur="handleInputBlur('cusPhone', 'tel')"
          ></el-input>
        </div>
      </div>
      <!-- 价格 -->
      <div
        class="search-item "
        :class="{
          'error-tips': errorBags.has('priceMax')
        }"
        :data-tips="errorBags.first('priceMax')"
      >
        <div class="search-item-title ">价格</div>
        <div class="search-item-body">
          <div class="input-group">
            <el-input placeholder="最小值" v-model="priceMin">
              <i slot="suffix"></i>
              <template v-slot:suffix>万</template>
            </el-input>
            <span>至</span>
            <el-input
              data-vv-validate-on="blur"
              placeholder="最大值"
              data-vv-name="priceMax"
              v-model="priceMax"
              data-vv-as="价格最大值"
              v-validate="{
                flota: true,
                isLess: [priceMin, false, true]
              }"
            >
              <template v-slot:suffix>万</template>
            </el-input>
          </div>
        </div>
      </div>
      <!-- 面积 -->
      <div
        class="search-item "
        :class="{
          'error-tips': errorBags.has('areaMax')
        }"
        :data-tips="errorBags.first('areaMax')"
      >
        <div class="search-item-title ">面积</div>
        <div class="search-item-body">
          <div class="input-group">
            <el-input placeholder="最小值" v-model="areaMin">
              <i slot="suffix"></i>
              <template v-slot:suffix>㎡</template>
            </el-input>
            <span>至</span>
            <el-input
              placeholder="最大值"
              v-model="areaMax"
              data-vv-name="areaMax"
              v-validate="{
                flota: true,
                isLess: [areaMin, false, true]
              }"
              data-vv-as="面积最大值"
            >
              <template v-slot:suffix>㎡</template>
            </el-input>
          </div>
        </div>
      </div>
      <!-- 挂牌时间 -->
      <div class="search-item">
        <div class="search-item-title ">挂牌时间</div>
        <div class="search-item-body">
          <el-date-picker
            v-model="form.time"
            type="daterange"
            range-separator="至"
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
    <div class="split-line"></div>
    <div class="search-tab">
      <div
        v-for="item in searchTabList"
        :class="{ active: form.workType == item.value }"
        :key="item.value"
        @click="setWorkType(item)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
//楼盘 楼栋 房间号 级联 mixins
import cascadeHouse from "@/minxi/cascadeHouse";

const SEARCHTABLIST = [
  { title: "我的房源", value: "1" },
  { title: "我的录入", value: "3" },
  { title: "我的实勘", value: "6" },
  { title: "我的钥匙", value: "4" },
  { title: "我的委托", value: "5" }
];
export default {
  inject: ["form"],
  mixins: [cascadeHouse],
  $_veeValidate: {
    validator: "new" // give me my own validator scope.
  },
  data() {
    return {
      searchTabList: SEARCHTABLIST,
      houseNo: "", //房源编号
      cusName: "", //业主姓名
      cusPhone: "", //业主号码
      priceMin: "", //价格最小
      priceMax: "", //价格最大
      areaMin: "", //最小面积
      areaMax: "", //最大面积
      time: [] //挂牌时间
    };
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
    setWorkType(item) {
      this.form.workType = item.value;
    },
    changeNavTypeIndex(index) {
      this.typeActiveIndex = index;
    },
    openMessage(message) {
      this.$message.error(message);
    },
    validateFrom() {
      this.$validator.validateAll().then(e => {
        if (e) {
          this.form.minInArea = this.areaMin;
          this.form.maxInArea = this.areaMax;
          this.form.minPrice = this.priceMin;
          this.form.maxPrice = this.priceMax;
          this.form.customName = this.cusName;
          this.form.houseNo = this.houseNo;
          this.form.tel = this.tel;
        }
      });
    }
  }
};
</script>
