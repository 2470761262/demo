<style lang="less" scoped>
.query-item-content {
  display: flex;
  .query-tips {
    margin-right: 10px;
    font-size: 15px;
    color: #666;
    flex-shrink: 0;
  }
  .query-tag-content {
    flex: 1;
    .query-tag {
      height: 20px;
      line-height: 18px;
      margin-right: 10px;
      font-size: 14px;
      margin-bottom: 5px;
    }
  }
}
.result-content {
  padding: 0 30px;
  .row-house-item {
    display: flex;
    padding: 15px 0;
    border-bottom: 1px solid #dbdbdb;
    /deep/.el-checkbox {
      align-self: center;
      .el-checkbox__label {
        display: none;
      }
    }
    .item-pic {
      width: 120px;
      height: 85px;
      border-radius: 6px;
      margin: 0 15px;
    }
    .item-msg {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .msg-head {
        display: flex;
        align-items: center;
        .msg-head-no {
          font-size: 16px;
          color: #999;
          margin-right: 60px;
        }
        .msg-head-tips {
          background: #0b8148;
          border-radius: 4px;
          margin-right: 20px;
          font-size: 17px;
          padding: 2px 15px;
          color: #fff;
          line-height: 1;
          &:last-child {
            margin-right: 0;
          }
        }
      }
      .msg-title {
        font-size: 17px;
        color: #333;
        word-break: break-all;
      }
      .msg-foot {
        font-size: 14px;
        color: #666;
        vertical-align: middle;
        word-break: break-all;
        .msg-foot-price {
          margin: 0 10px;
          color: #e5a670;
          font-size: 20px;
          vertical-align: middle;
        }
        .msg-foot-unitPrice {
          vertical-align: middle;
        }
      }
    }
    .detail-btn {
      align-self: center;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      color: #fff;
      line-height: 50px;
      text-align: center;
      background: #0a8349;
      font-size: 30px;
      cursor: pointer;
    }
  }
}
</style>
<template>
  <div>
    <div class="query-item-content">
      <div class="query-tips">筛选条件:</div>
      <div class="query-tag-content">
        <el-tag
          :key="index"
          class="query-tag"
          v-for="(tag, index) in dynamicTags"
          closable
          :disable-transitions="true"
          @close="handleClose(tag)"
          >{{ tag.title }}{{ tag.value }}</el-tag
        >
      </div>
      <div class="check-content">
        <el-checkbox v-model="form.isKey" true-label="1" false-label=""
          >钥匙</el-checkbox
        >
        <el-checkbox v-model="form.isOnly" true-label="1" false-label=""
          >独家</el-checkbox
        >
      </div>
    </div>
    <section
      class="result-content"
      v-loading="loading"
      element-loading-text="不如跳舞 ~ UrbbrGroun"
    >
      <div class="row-house-item" v-for="item in queryData" :key="item.id">
        <el-checkbox
          v-model="houseChecked"
          :true-label="item.id"
          false-label=""
          @change="houseCheckChange"
        ></el-checkbox>
        <el-image class="item-pic" :src="item.picUrl"></el-image>
        <div class="item-msg">
          <div class="msg-head">
            <div class="msg-head-no">{{ item.houseNo }}</div>
            <div class="msg-head-tips" v-if="item.keyOwner > 0">钥匙</div>
            <div class="msg-head-tips" v-if="item.isOnly > 0">独家</div>
          </div>
          <div class="msg-title">{{ item.title }}</div>
          <div class="msg-foot">
            {{ item.communityName }} / {{ item.inArea }}㎡ /
            {{ item.rooms }}房{{ item.hall || 0 }}厅{{ item.toilet || 0 }}卫
            <span class="msg-foot-price">￥{{ item.price || 0 }}万</span>
            <span class="msg-foot-unitPrice"
              >{{ item.unitPrice || 0 }}元/平</span
            >
          </div>
        </div>
        <div class="el-icon-document detail-btn" @click="goDetail(item)"></div>
      </div>
    </section>
  </div>
</template>

<script>
import but from "@/evenBus/but";
export default {
  inject: ["form"],
  data() {
    return {
      loading: true,
      dynamicTags: [],
      queryData: [],
      houseChecked: ""
    };
  },
  watch: {
    form: {
      deep: true,
      immediate: true,
      handler: function(value, ordvalue) {
        this.renderTag(value);
        this.getHouseData(JSON.parse(JSON.stringify(value)));
      }
    }
  },
  methods: {
    /**
     * @example: 房源checkchange
     */
    houseCheckChange(value) {
      const checkItem = this.queryData.filter(item => item.id === value);
      this.$emit("change", checkItem);
    },

    goDetail(item) {
      this.$router.push({
        name: "houseDetails",
        params: { houseId: item.id }
      });
    },

    renderTag(value) {
      //清空
      this.dynamicTags = [];
      //价格
      if (value.minPrice !== "") {
        this.dynamicTags.push({
          title: `价格:${value.minPrice}-${
            value.maxPrice === "" ? "无限" : value.maxPrice
          }万`,
          field: "price",
          arr: false
        });
      }
      //面积
      if (value.minInArea !== "") {
        this.dynamicTags.push({
          title: `面积:${value.minInArea}-${
            value.maxInArea === "" ? "无限" : value.maxInArea
          }㎡`,
          field: "area",
          arr: false
        });
      }
      //楼层
      if (value.minFloor !== "") {
        this.dynamicTags.push({
          title: `楼层:${value.minFloor}-${
            value.maxFloor === "" ? "无限" : value.maxFloor
          }层`,
          field: "floot",
          arr: false
        });
      }

      //楼栋号
      if (value.cbNo != null && value.cbNo != "") {
        this.dynamicTags.push({
          title: `楼栋号:${value.cbNo}`,
          field: "cbNo",
          arr: false
        });
      }

      //房间号
      if (value.roomNumber != null && value.roomNumber != "") {
        this.dynamicTags.push({
          title: `房间号:${value.roomNumber}`,
          field: "roomNumber",
          arr: false
        });
      }
      //楼盘名称
      if (value.communityName != null && value.communityName != "") {
        this.dynamicTags.push({
          title: `楼盘名称:${value.communityName}`,
          field: "communityName",
          arr: false
        });
      }
      //商圈
      this.appendFormTag(value.business, "商圈", "business");
      //房型
      this.appendFormTag(value.houseType, "房型", "houseType");
      //装修
      this.appendFormTag(value.renovation, "装修", "renovation");
      //房屋用途
      this.appendFormTag(value.purpose, "房屋用途", "purpose");
      //朝向
      this.appendFormTag(value.face, "朝向", "face");
      //小学
      this.appendFormTag(value.primarySchool, "小学", "primarySchool");
      //中学
      this.appendFormTag(value.middleSchool, "中学", "middleSchool");
      if (value.searchInfo != null && value.searchInfo != "") {
        this.dynamicTags.push({
          title: `搜索关键字:${value.searchInfo}`,
          field: "searchInfo",
          arr: false
        });
      }
    },

    filterSplice(e) {
      return this.form[e.field].findIndex(item => {
        return item == e.value;
      });
    },

    //标签关闭
    handleClose(e) {
      if (e.arr) {
        // 删除多选
        this.form[e.field].splice(this.filterSplice(e), 1);
      } else {
        // 删除 slider
        but.$emit("removeTag", e);
      }
    },

    appendFormTag(to, titleName, fieldName) {
      //房型
      to.forEach(item => {
        this.dynamicTags.push({
          title: `${titleName}:`,
          value: `${item}`,
          field: `${fieldName}`,
          arr: true
        });
      });
    },

    getHouseData(value) {
      this.loading = true;
      //搜索时清空之前的推荐数据
      this.houseChecked = "";
      this.$emit("change", []);

      Object.keys(value).forEach(item => {
        if (value[item] instanceof Array) {
          value[item] = value[item].join(",");
        }
      });
      let restuleParms = Object.assign({}, value, {
        page: 1,
        limit: 5
      });
      this.$api
        .post({
          url: "/saleCustomerRecommend/recommendHouseList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: restuleParms
        })
        .then(e => {
          if (e.data.code == 200) {
            this.queryData = e.data.data.list;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
