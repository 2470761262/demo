<style lang="less" scoped>
.page-cell {
  padding-left: 60px;
  padding-top: 60px;
  padding-bottom: 20px;
  .page-cell-title {
    font-size: 24px;
    color: #333;
    font-weight: 600;
    margin-top: 20px;
    &:first-child {
      margin-top: 0;
    }
  }
  .page-cell-item {
    margin-top: 20px;
    display: flex;
    /deep/.el-input-group {
      width: auto;
    }
    /deep/.el-input-group__prepend,
    /deep/.el-input-group__append {
      border: none;
      background: none;
    }
    /deep/.el-input-group__prepend {
      padding: 0;
    }
    /deep/.el-input__inner {
      border-radius: 4px;
      width: 210px;
    }
    .item-after {
      color: #1c7334;
      font-size: 14px;
      cursor: pointer;
      &.item-before-col {
        text-align: center;
        color: #606266;
      }
    }
    .item-before {
      font-size: 16px;
      color: #606266;
      width: 80px;
      align-self: center;
      white-space: nowrap;
      flex-shrink: 0;
      &:before {
        content: attr(data-before);
        color: red;
      }
    }
    .item-input-groud {
      display: flex;
      /deep/.el-input__inner {
        width: 80px;
      }
    }
  }
}
/deep/.el-radio {
  margin-left: 0 !important;
}
</style>
<template>
  <div class="page-cell">
    <div class="page-cell-title">房屋坐落</div>
    <!-- 楼盘名称 -->
    <div class="page-cell-item">
      <el-input placeholder="请输入楼盘名称" v-model="formData.floor">
        <div slot="prepend" class="item-before" data-before="*">楼盘</div>
        <div slot="append" class="item-after">
          补充楼盘<i class="el-icon-question"></i>
        </div>
      </el-input>
    </div>
    <!-- 栋座 -->
    <div class="page-cell-item">
      <div class="item-before" data-before="*">栋座</div>
      <el-select filterable v-model="formData.tung" placeholder="请选择栋座">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <!-- 房间号 -->
    <div class="page-cell-item">
      <div class="item-before" data-before="*">房间号</div>
      <el-select filterable v-model="formData.room" placeholder="请选择房间号">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="page-cell-title">业主信息</div>
    <!-- 业主姓名 -->
    <div class="page-cell-item">
      <el-input placeholder="请输入业主姓名" v-model="formData.perName">
        <div slot="prepend" class="item-before" data-before="*">业主姓名</div>
      </el-input>
    </div>
    <!-- 称谓 -->
    <div class="page-cell-item">
      <div slot="prepend" class="item-before" data-before="*">称谓</div>
      <el-radio-group v-model="formData.sex" size="mini">
        <el-radio
          :label="item"
          border
          v-for="(item, index) in sexList"
          :key="index"
          >{{ item }}</el-radio
        >
      </el-radio-group>
    </div>
    <!-- 电话号码 -->
    <div class="page-cell-item">
      <el-input placeholder="请输入业主电话号码" v-model="formData.perTell">
        <div slot="prepend" class="item-before" data-before="*">手机号</div>
        <div slot="append" class="item-after item-before-col">
          <i class="el-icon-circle-plus-outline"></i>
          <div>新增</div>
        </div>
      </el-input>
    </div>
    <div class="page-cell-title">基础信息</div>
    <!-- 售价 -->
    <div class="page-cell-item">
      <el-input placeholder="请输入售价" v-model="formData.price">
        <div slot="prepend" class="item-before" data-before="*">售价</div>
        <div slot="append" class="item-after item-before-col">万元</div>
      </el-input>
    </div>
    <!-- 底价 -->
    <div class="page-cell-item">
      <el-input placeholder="请输入售价" v-model="formData.bottomPrice">
        <div slot="prepend" class="item-before" data-before="*">底价</div>
        <div slot="append" class="item-after item-before-col">万元</div>
      </el-input>
    </div>
    <!-- ，面积 -->
    <div class="page-cell-item">
      <el-input placeholder="请输入售价" v-model="formData.area">
        <div slot="prepend" class="item-before">面积</div>
        <div slot="append" class="item-after item-before-col">平米</div>
      </el-input>
    </div>
    <!-- 房型 -->
    <div class="page-cell-item">
      <div class="item-before">房型</div>
      <div class="item-input-groud">
        <el-input v-model="formData.houseRoom">
          <div slot="append" class="item-after item-before-col">室</div>
        </el-input>
        <el-input v-model="formData.houseHall">
          <div slot="append" class="item-after item-before-col">厅</div>
        </el-input>
        <el-input v-model="formData.houseToilet">
          <div slot="append" class="item-after item-before-col">卫</div>
        </el-input>
        <el-input v-model="formData.houseBalcony">
          <div slot="append" class="item-after item-before-col">阳台</div>
        </el-input>
      </div>
    </div>
    <!-- 朝向 -->
    <div class="page-cell-item">
      <div slot="prepend" class="item-before">朝向</div>
      <el-radio-group v-model="formData.orientation" size="mini">
        <el-radio
          :label="item"
          border
          v-for="(item, index) in orientationList"
          :key="index"
          >{{ item }}</el-radio
        >
      </el-radio-group>
    </div>
    <!-- 装修 -->
    <div class="page-cell-item">
      <div slot="prepend" class="item-before">装修类型</div>
      <el-radio-group v-model="formData.renovation" size="mini">
        <el-radio
          :label="item"
          border
          v-for="(item, index) in renovationList"
          :key="index"
          >{{ item }}</el-radio
        >
      </el-radio-group>
    </div>
  </div>
</template>
<script>
let sex = ["先生", "女生"];
let orientation = ["东", "南", "西", "北"];
let renovation = ["毛胚", "简装", "精装修", "豪华装修"];
import { mapState } from "vuex";
export default {
  name: "basicInformation",
  computed: {
    ...mapState({
      formData: state => {
        return state.addHouse.formData.step1;
      }
    })
  },
  data() {
    return {
      sexList: sex,
      options: [
        { value: 1, label: 1 },
        { value: 2, label: 2 }
      ],
      orientationList: orientation,
      renovationList: renovation
    };
  }
};
</script>
