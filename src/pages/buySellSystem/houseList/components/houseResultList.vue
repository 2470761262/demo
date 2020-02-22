<style lang="less" scoped>
.query-data-pad {
  padding: 0 20px;
}
.page-query-data {
  display: flex;
  .page-query-data-title {
    font-size: 14px;
    line-height: 32px;
    margin-right: 15px;
  }
  .page-query-data-tag {
    flex: 1;
    .query-tag {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
}
.select-tabs {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-top: 1px solid #d7d7d7;
  border-bottom: 1px solid #d7d7d7;
  .select-tabs-cell {
    display: flex;
    .select-tabs-item {
      display: flex;
      align-items: center;
      margin-right: 80px;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
      .tabs-item-title {
        font-size: 16px;
      }
      .el-icon-sort {
        font-size: 16px;
      }
    }
  }
}
.select-checkbox {
  margin-right: 40px;
  &:last-child {
    margin-right: 0;
  }
  input {
    display: none;
  }
  span {
    display: flex;
    align-items: center;
    font-size: 16px;
    &::after {
      content: "\2713";
      border: 1px solid #767676;
      width: 17px;
      height: 17px;
      box-sizing: border-box;
      margin-left: 10px;
      line-height: 1;
      text-align: center;
    }
  }
  input[type="checkbox"]:checked + span {
    &::after {
      content: "";
    }
  }
}
</style>
<template>
  <div class="query-data-pad">
    <div class="page-query-data">
      <div class="page-query-data-title">所有房源></div>
      <div class="page-query-data-tag">
        <el-tag :key="index"
                class="query-tag"
                v-for="(tag,index) in dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
          {{tag.title}}{{tag.value}}
        </el-tag>
      </div>
    </div>
    <div class="select-tabs">
      <div class="select-tabs-cell">
        <div class="select-tabs-item">
          <div class="tabs-item-title">默认排序</div>
        </div>
        <div class="select-tabs-item">
          <div class="tabs-item-title">价格</div>
          <i class="el-icon-sort"></i>
        </div>
        <div class="select-tabs-item">
          <div class="tabs-item-title">面积</div>
          <i class="el-icon-sort"></i>
        </div>
      </div>
      <div class="select-tabs-cell">
        <label class="select-checkbox">
          <input type="checkbox">
          <span>钥匙</span>
        </label>
        <label class="select-checkbox">
          <input type="checkbox">
          <span>独家</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["form", "Slider"],
  watch: {
    form: {
      deep: true,
      immediate: true,
      handler: function (value) {
        this.renderTag(value);
      }
    }
  },
  data () {
    return {
      dynamicTags: []
    }
  },
  methods: {
    //创建需要渲染的标签
    renderTag (value) {
      console.log(value);
      let that = this;
      //清空
      this.dynamicTags = [];
      //价格
      if (this.Slider.priceSlider[1] != 20) {
        this.dynamicTags.push({ title: `价格:${value.minPrice}-${value.maxPrice}万`, field: "price", arr: false })
      }
      //面积
      if (this.Slider.areaSlider[1] != 20) {
        this.dynamicTags.push({ title: `面积:${value.minInArea}-${value.maxInArea}万`, field: "area", arr: false })
      }
      //楼层
      if (this.Slider.flootSlider[1] != -2) {
        this.dynamicTags.push({ title: `面积:${value.minFloor}-${value.maxFloor}层`, field: "floot", arr: false })
      }
      //商圈
      this.appendFormTag(value.business, '商圈', 'business');
      //房型
      this.appendFormTag(value.houseType, '房型', 'houseType');
      //装修
      this.appendFormTag(value.renovation, '装修', 'renovation');
      //房屋用途
      this.appendFormTag(value.purpose, '房屋用途', 'purpose');
      //朝向
      this.appendFormTag(value.face, '朝向', 'face');
      //小学
      this.appendFormTag(value.primarySchool, '小学', 'primarySchool');
      //中学
      this.appendFormTag(value.middleSchool, '中学', 'middleSchool');
    },
    appendFormTag (to, titleName, fieldName) {
      //房型
      to.forEach((item) => {
        this.dynamicTags.push({ title: `${titleName}:`, value: `${item}`, field: `${fieldName}`, arr: true })
      })
    },
    filterSplice (e) {
      return this.form[e.field].findIndex((item) => {
        return item == e.value;
      })
    },
    //标签关闭
    handleClose (e) {
      if (e.arr) { // 删除多选
        this.form[e.field].splice(this.filterSplice(e), 1);
      } else { // 删除 slider

        if (e.field == 'price') {
          this.Slider.priceSlider = [20, 20];
          this.form.maxPrice = '';
          this.form.minPrice = '';
        }
        if (e.field == 'area') {
          this.Slider.areaSlider = [20, 20];
          this.form.maxInArea = '';
          this.form.minInArea = '';
        }
        if (e.field == 'floot') {
          this.Slider.flootSlider = [-2, -2];
          this.form.maxFloor = '';
          this.form.minFloor = '';
        }
      }
    }
  },
}
</script>
