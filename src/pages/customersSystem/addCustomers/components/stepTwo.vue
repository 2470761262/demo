<style lang="less" scoped>
@import "../less/form.less";

.step-content {
  .step-content();
  padding: 0 24px 24px;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
  .split-line {
    margin-top: 39px;
  }
}
.heade-content {
  display: flex;
  justify-content: space-between;
  padding-top: 24px;
  .heade-content-left {
    display: flex;
    align-items: center;
    .demand-item {
      position: relative;
      // prettier-ignore
      font-size: 18PX;
      margin-right: 36px;
      cursor: pointer;
      color: rgba(96, 98, 102, 1);
      &.active {
        color: @backgroud;
        &::after {
          position: absolute;
          content: "";
          height: 2px;
          background: @backgroud;
          left: 9px;
          right: 9px;
          bottom: -9px;
        }
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .heade-btn-change {
    height: 48px;
    // prettier-ignore
    font-size: 16PX;
  }
}
</style>
<template>
  <section>
    <section class="step-content">
      <div class="heade-content">
        <div class="heade-content-left">
          <div class="demand-item">
            租赁住宅
          </div>
          <div class="demand-item active">
            买二手住宅
          </div>
          <div class="demand-item">
            租赁商铺
          </div>
          <div class="demand-item">
            买二手写字楼
          </div>
          <div class="demand-item">
            租赁写字楼
          </div>
        </div>
        <el-button class="heade-btn-change" type="primary"
          >修改需求类型</el-button
        >
      </div>
      <i class="split-line"></i>
      <!-- 购买用途 -->
      <div class="input-group">
        <div class="input-head">购买用途</div>
        <el-select
          v-model="mock"
          popper-class="options-item"
          class="input-content"
          placeholder="请选择客户购买用途"
        >
          <el-option
            v-for="item in purchasepurpose"
            :key="item.value"
            :label="item.key"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <!-- 期望总价 -->
      <div class="input-group">
        <div class="input-head">期望总价</div>
        <div class="input-group-split">
          <el-input
            placeholder="最小值"
            class="input-content is-suffix"
            v-model="mock"
          >
            <template v-slot:suffix>
              <i class="suffix-tips">万元</i>
            </template>
          </el-input>
          <i class="input-split"></i>
          <el-input
            placeholder="最大值"
            class="input-content is-suffix"
            v-model="mock"
          >
            <template v-slot:suffix>
              <i class="suffix-tips">万元</i>
            </template>
          </el-input>
        </div>
      </div>
      <!-- 首付金额 -->
      <div class="input-group">
        <div class="input-head">期望总价</div>
        <div class="input-group-split">
          <el-input
            placeholder="最小值"
            class="input-content is-suffix"
            v-model="mock"
          >
            <template v-slot:suffix>
              <i class="suffix-tips">万元</i>
            </template>
          </el-input>
          <i class="input-split"></i>
          <el-input
            placeholder="最大值"
            class="input-content is-suffix"
            v-model="mock"
          >
            <template v-slot:suffix>
              <i class="suffix-tips">万元</i>
            </template>
          </el-input>
        </div>
      </div>
      <!-- 期望面积 -->
      <div class="input-group">
        <div class="input-head">期望面积</div>
        <div class="input-group-split">
          <el-input
            placeholder="最小值"
            class="input-content is-suffix"
            v-model="mock"
          >
            <template v-slot:suffix>
              <i class="suffix-tips">㎡</i>
            </template>
          </el-input>
          <i class="input-split"></i>
          <el-input
            placeholder="最大值"
            class="input-content is-suffix"
            v-model="mock"
          >
            <template v-slot:suffix>
              <i class="suffix-tips">㎡</i>
            </template>
          </el-input>
        </div>
      </div>
      <!-- 期望装修 -->
      <div class="input-group">
        <div class="input-head">期望装修</div>
        <label
          class="radio-content"
          v-for="item in decoration"
          :key="item.value"
        >
          <input type="radio" name="sex" :value="item.value" v-model="mock" />
          <div class="radio-title">{{ item.key }}</div>
        </label>
      </div>
      <!-- 购房类型 -->
      <div class="input-group">
        <div class="input-head">购房类型</div>
        <el-select
          v-model="mock"
          popper-class="options-item"
          class="input-content"
          placeholder="请选择客户购买类型"
        >
          <el-option
            v-for="item in purchasepurpose"
            :key="item.value"
            :label="item.key"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </section>
    <i class="split-step-content"></i>
    <section class="step-content">
      <!-- 期望小学 -->
      <div class="input-group">
        <div class="input-head">期望小学</div>
        <el-select
          v-model="seleMock"
          multiple
          popper-class="options-item"
          class="input-content"
          placeholder="请选择客期望小学（多选）"
        >
          <el-option
            v-for="item in textMock"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <!-- 期望中学 -->
      <div class="input-group">
        <div class="input-head">期望中学</div>
        <el-select
          v-model="seleMock"
          multiple
          popper-class="options-item"
          class="input-content"
          placeholder="请选择客期望中学（多选）"
        >
          <el-option
            v-for="item in textMock"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <!-- 期望楼盘 -->
      <div class="input-group">
        <div class="input-head">期望楼盘</div>
        <el-select
          v-model="seleMock"
          multiple
          popper-class="options-item"
          class="input-content"
          placeholder="请选择客期望楼盘（多选）"
        >
          <el-option
            v-for="item in textMock"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <!-- 看房经历 -->
      <div class="input-group">
        <div class="input-head">看房经历</div>
        <el-input
          type="textarea"
          class="input-content is-auto-height"
          placeholder="请输入客户的看房经历"
          v-model="mock"
          clearable
          resize="none"
          :autosize="{ minRows: 3, maxRows: 6 }"
        />
      </div>
    </section>
  </section>
</template>

<script>
import { PURCHASEPURPOSE, DECORATION } from "@/util/constMap";
export default {
  data() {
    return {
      mock: "",
      purchasepurpose: PURCHASEPURPOSE,
      decoration: DECORATION,
      seleMock: [],
      textMock: [
        {
          value: "选项1",
          label: "学校1"
        },
        {
          value: "选项2",
          label: "学校2"
        },
        {
          value: "选项3",
          label: "学校3"
        },
        {
          value: "选项4",
          label: "学校4"
        },
        {
          value: "选项5",
          label: "学校5"
        }
      ]
    };
  }
};
</script>
