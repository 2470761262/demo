<style lang="less" scoped>
.query-data-pad {
  padding: 0 20px;
}
.page-query-data {
  display: flex;
  .page-query-data-title {
    font-size: 16px;
    line-height: 32px;
    margin-right: 15px;
  }
  .page-query-data-tag {
    flex: 1;
    .query-tag {
      margin-right: 10px;
      margin-bottom: 10px;
      font-size: 16px;
    }
  }
}
.i {
  cursor: pointer;
}
.select-tabs {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-top: 1px solid #d7d7d7;
  border-bottom: 1px solid #d7d7d7;
}
.select-tabs-cell {
  display: flex;
  .select-tabs-item {
    display: flex;
    align-items: center;
    margin-right: 98px;
    cursor: pointer;
    &:last-child {
      margin-right: 0;
    }
    .tabs-item-title {
      font-size: 18px;
    }
    .el-icon-sort {
      font-size: 18px;
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
    font-size: 18px;
    &::after {
      content: "";
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
      content: "\2713";
    }
  }
  input[type="radio"]:checked + span {
    &::after {
      content: "\2713";
    }
  }
}
.select-for-warp {
  min-height: 400px;
  .select-for-item {
    display: flex;
    padding: 12px 0;
    border-bottom: 1px solid #dbdbdb;
    .select-for-item-img {
      width: 140px;
      height: 100px;
      border-radius: 4px;
      overflow: hidden;
      align-self: center;
      /deep/.el-image {
        width: 100%;
        height: 100%;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .select-for-item-data {
      margin-left: 50px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .item-data-top {
        display: flex;
        align-items: center;
        .item-data-top-no {
          //margin-right: 80px;
          flex: 1;
          width: 0;
          color: #adadad;
          font-size: 14px;
        }
        .item-data-top-tag {
          display: flex;
          .top-tag-item {
            font-size: 14px;
            padding: 2px 8px;
            background: var(--color--primary);
            border-radius: 4px;
            color: #fff;
          }
        }
        .broker-content {
          display: flex;
          align-items: center;
          margin-left: 30px;
          .broker-img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
          }
          .brokerName,
          .deparName {
            font-size: 15px;
            color: #333;
          }
        }
      }
      i {
        cursor: pointer;
      }
      .item-data-downPayment {
        font-size: 16px;
        color: #636363;
      }
      .item-data-middle {
        font-size: 20px;
        color: #636363;
        margin: 10px 0;
      }
      .item-data-plate {
        // font-size: 14px;
        //
        // align-self: flex-start;
        //
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .plate-warp {
          padding: 4px 10px;
          border: 1px solid #ddd;
          border-radius: 20px;
        }
      }
      .item-data-bottom {
        display: flex;
        .item-data-bottom-detali {
          color: #636363;
          font-size: 16px;
          align-self: flex-end;
          flex: 1;
          width: 0;
        }
        .item-data-bottom-price {
          font-size: 20px;
          color: #e5a670;
          line-height: 1;
        }
        .item-data-bottom-avgPirce {
          align-self: flex-end;
          margin-left: 10px;
          color: #636363;
          font-size: 14px;
        }
      }
    }
    .select-for-item-but {
      margin: 0 30px;
      height: 50px;
      width: 50px;
      color: #fff;
      font-size: 30px;
      align-self: center;
      background: var(--color--primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.select-page-nav {
  display: flex;
  margin-top: 30px;
  justify-content: center;
  /deep/.el-pagination {
    .el-pagination__total {
      font-size: 15px;
    }
    li {
      font-size: 15px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
    .el-pagination__jump {
      font-size: 15px;
    }
  }
}
.flex-cell {
  display: flex;

  .flex-cell-tab {
    flex: 1;
    width: 0;
  }
  .menuMarin {
    margin-right: 60px;
    margin-left: 20px;
  }
}
.image-slot {
  height: 100%;
}
.is-order {
  color: var(--color--primary);
  font-weight: 600;
}
</style>
<template>
  <div class="query-data-pad">
    <div
      class="page-query-data"
      v-if="dynamicTags.length > 0 || querySelectFlag"
    >
      <div class="page-query-data-title">所有房源&nbsp;></div>
      <div class="page-query-data-tag">
        <el-tag
          :key="index"
          class="query-tag"
          v-for="(tag, index) in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
          >{{ tag.title }}{{ tag.value }}</el-tag
        >
      </div>
      <div class="select-tabs-cell" v-if="querySelectFlag">
        <label class="select-checkbox">
          <input type="checkbox" @click="elevatorSelect()" />
          <span>电梯</span>
        </label>
        <label class="select-checkbox">
          <input type="checkbox" @click="keySelect()" />
          <span>钥匙</span>
        </label>
        <label class="select-checkbox">
          <input type="checkbox" @click="onlySelect()" />
          <span>独家</span>
        </label>
      </div>
    </div>
    <!-- 缩小时不显示 -->
    <div class="select-tabs" v-if="!querySelectFlag">
      <div class="select-tabs-cell">
        <div
          class="select-tabs-item"
          :class="{ 'is-order': form.sortColumn == 'id' }"
          @click="defaultSelect()"
        >
          <div class="tabs-item-title">默认排序</div>
        </div>
        <div
          class="select-tabs-item"
          :class="{ 'is-order': form.sortColumn == 'price' }"
          @click="priceSelect()"
        >
          <div class="tabs-item-title">价格</div>
          <i class="el-icon-sort"></i>
        </div>
        <div
          class="select-tabs-item"
          :class="{ 'is-order': form.sortColumn == 'inArea' }"
          @click="inAreaSelect()"
        >
          <div class="tabs-item-title">面积</div>
          <i class="el-icon-sort"></i>
        </div>
      </div>
      <div class="select-tabs-cell">
        <label class="select-checkbox">
          <input type="checkbox" @click="elevatorSelect()" />
          <span>电梯</span>
        </label>
        <label class="select-checkbox">
          <input type="checkbox" @click="keySelect()" />
          <span>钥匙</span>
        </label>
        <label class="select-checkbox">
          <input type="checkbox" @click="onlySelect()" />
          <span>独家</span>
        </label>
      </div>
    </div>
    <div
      class="select-for-warp"
      v-loading="loading"
      element-loading-text="我在去获取数据的路上了~"
    >
      <template v-if="!querySelectFlag">
        <template v-if="renderList.length > 0">
          <!-- @dblclick="toHouseDetail(item)" -->
          <div
            class="select-for-item"
            v-for="(item, index) in renderList"
            :key="index"
            @click.stop="toHouseDetail(item)"
          >
            <div class="select-for-item-img">
              <el-image
                :src="item.picUrl + '?x-oss-process=style/thumb'"
                fit="cover"
              >
                <div slot="placeholder" class="image-slot">
                  加载中
                  <span>...</span>
                </div>
                <div slot="error" fit="cover" class="image-slot">
                  <el-image :src="'' | houseMiniImg"></el-image>
                </div>
              </el-image>
            </div>
            <div class="select-for-item-data">
              <div class="item-data-top">
                <div class="item-data-top-no overText">{{ item.houseNo }}</div>
                <div class="item-data-top-tag">
                  <div class="top-tag-item overText" v-if="item.keyOwner > 0">
                    钥匙
                  </div>
                  <div
                    class="top-tag-item overText"
                    style="margin-left:5px"
                    v-if="item.isOnly > 0"
                  >
                    独家
                  </div>
                </div>
                <div class="broker-content" v-if="item.plate == 0">
                  <img
                    class="broker-img"
                    :src="item.headimgurl | defaultImg"
                    alt="经纪人"
                  />
                  <div class="brokerName">{{ item.brokerName }}/</div>
                  <div class="deparName">{{ item.deptName }}</div>
                </div>
              </div>
              <div class="item-data-plate">
                <!-- 店公共盘 -->
                <div class="plate-warp" v-if="(item.plate | plateResult) != ''">
                  {{ item.plate | plateResult }}
                </div>
                <div class="item-data-downPayment"></div>
                参考首付:
                {{ item.price | downPaymentFilter(downPaymentPercent) }}万
              </div>
              <div class="item-data-middle overText">{{ item.title }}</div>
              <div class="item-data-bottom">
                <div class="item-data-bottom-detali overText">
                  {{ item.communityName }} &nbsp;/&nbsp;{{ item.inArea }}㎡
                  &nbsp;/&nbsp;{{ item.rooms }}房2厅1卫
                </div>
                <div class="item-data-bottom-price overText">
                  ￥{{ item.price }}万
                </div>
                <div class="item-data-bottom-avgPirce overText">
                  {{ item.unitPrice }}元/平
                </div>
              </div>
            </div>
            <!-- <div class="select-for-item-but">
              <i
                class="el-icon-document icon i"
                @click.stop="toHouseDetail(item)"
              ></i>
            </div> -->
          </div>
        </template>
        <template v-else>
          <el-alert title="暂无数据" type="primary" center show-icon></el-alert>
        </template>
      </template>
      <template v-else>
        <div class="flex-cell">
          <div class="flex-cell-tab">
            <el-table
              :data="renderList"
              v-if="tableColumn.length > 0"
              @sort-change="sortMethod"
              :default-sort="{ prop: 'price', order: 'descending' }"
              border
            >
              <el-table-column
                v-for="(item, index) in tableColumn"
                :key="index"
                :prop="item.prop"
                :label="item.label"
                :min-width="item.width"
                :sortable="item.order"
                :formatter="item.formart"
                :sort-orders="['ascending', 'descending']"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column label="操作" fixed="right" width="80px">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="toHouseDetail(scope.row)"
                    >查看</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <definitionmenu
            class="menuMarin"
            :loading="menuLoading"
            :renderList="menuRenderList"
            :tableColumn="tableColumn"
            :resetList="tableColumnField"
            @change="tabColumnChange"
          ></definitionmenu>
        </div>
      </template>
    </div>
    <div class="select-page-nav">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pageJson.currentPage"
        :page-size="pageJson.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="pageJson.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import definitionmenu from "@/components/definitionMenu";
import tableMenu from "@/util/getTableMenu";
export default {
  inject: ["form", "Slider"],
  components: {
    definitionmenu
  },
  props: {
    querySelectFlag: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    form: {
      deep: true,
      // immediate: true,
      handler: function(value, ordvalue) {
        this.renderTag(value);
        this.getHouseData(JSON.parse(JSON.stringify(value)));
      }
    }
  },
  created() {
    tableMenu.getTableMenu(this.tableColumnField, 16).then(e => {
      this.menuLoading = false;
      this.menuRenderList = e;
      console.log(this.renderList, "this.renderListthis.renderList");
      this.renderTag(this.form);
      this.getHouseData(JSON.parse(JSON.stringify(this.form)));
    });
  },
  data() {
    return {
      dynamicTags: [],
      menuRenderList: [],
      loading: false,
      pageJson: {
        total: 1,
        pageSize: 8,
        currentPage: 1
      },
      tableColumnField: [
        {
          prop: "houseNo",
          label: "房源编号",
          width: "170",
          order: false,
          disabled: false,
          default: true
        },
        {
          prop: "communityName",
          label: "小区名称",
          order: false,
          width: "150",
          disabled: true,
          default: true
        },
        {
          prop: "inArea",
          label: "面积(m²)",
          width: "110",
          order: "custom",
          disabled: false,
          default: true,
          formart: item => item.inArea + "m²"
        },
        {
          prop: "price",
          label: "售价(万元)",
          width: "120",
          order: "custom",
          disabled: false,
          default: true,
          formart: item => item.price + "万元"
        },
        {
          prop: "downPayment",
          label: "参考首付",
          width: "120",
          order: false,
          disabled: false,
          default: true,
          formart: item =>
            (item.price * this.downPaymentPercent).toFixed(1) + "万元"
        },
        {
          prop: "seenNum",
          label: "被看次数",
          width: "120",
          order: "custom",
          disabled: false,
          default: true
        },
        {
          prop: "outfollow",
          label: "未跟进天数",
          width: "120",
          order: "custom",
          disabled: false,
          default: true
        },
        {
          prop: "noSeenDay",
          label: "未被看天数",
          width: "120",
          order: true,
          disabled: false,
          default: true
        },
        {
          prop: "addTime",
          label: "添加时间",
          width: "120",
          order: "custom",
          disabled: false,
          default: true
        },
        {
          prop: "brokerName",
          label: "跟单人",
          width: "120",
          order: false,
          disabled: false,
          default: true,
          formart: item =>
            item.brokerName != undefined ? item.brokerName : item.agentName
        },
        {
          prop: "houseType",
          label: "户型",
          width: "150",
          order: false,
          disabled: false,
          default: true,
          formart: item =>
            (item.rooms || 0) +
            "室" +
            (item.hall || 0) +
            "厅" +
            (item.toilet || 0) +
            "卫"
        },
        {
          prop: "unitPrice",
          label: "单价(元/㎡)",
          width: "120",
          order: "custom",
          disabled: false,
          default: true,
          format: item => item.unitPrice + "元/㎡"
        },
        {
          prop: "face",
          label: "朝向",
          width: "120",
          order: false,
          disabled: false,
          default: true
        },
        {
          prop: "floor",
          label: "楼层",
          width: "120",
          order: false,
          disabled: false,
          default: true
        },
        {
          prop: "decoration",
          label: "装修",
          width: "120",
          order: false,
          disabled: false,
          default: true
        },
        {
          prop: "addName",
          label: "录入人",
          width: "120",
          order: false,
          disabled: false,
          default: true
        }
      ],
      tableColumn: [],
      menuLoading: true, //自定义菜单
      renderList: [],
      downPaymentPercent: 0.3 //首付的百分比
    };
  },
  filters: {
    downPaymentFilter(value, downPaymentPercent) {
      return (value * downPaymentPercent).toFixed(1);
    },
    plateResult(value) {
      let plate = {
        //  0: "个人跟单房源",
        1: "店公公告盘",
        4: "在售无跟单"
        //  6: "暂不售",
        //  7: "我售",
        //  8: "业主自售",
        // 9: "他司售",
        // 10: "无效"
      };
      return plate[value] ? plate[value] : "";
    }
  },
  methods: {
    elevatorSelect() {
      if (this.form.elevator != "") {
        this.form.elevator = "";
      } else {
        this.form.elevator = "1";
      }
    },
    tabColumnChange(e, length = 0) {
      console.log(e, "e");
      this.tableColumn = e;
      if (length > 0) {
        let prop = e.map(item => {
          return { prop: item.prop };
        });
        tableMenu.insert(prop, 16);
      }
    },
    toHouseDetail(item) {
      let id = item.id;
      console.log(item, "谢谢谢谢谢谢谢谢");
      if (item.hasOwnProperty("houseId")) {
        id = item.houseId;
      }
      this.$router.push({
        name: "houseDetails",
        params: { houseId: id, dept: item.perDept }
      });
    },
    //远程排序
    sortMethod(item) {
      this.form.sortColumn = item.prop;
      this.form.sortType = item.order;
      //  this.getHouseData(JSON.parse(JSON.stringify(value)));
      console.log(item);
    },
    keySelect() {
      if (this.form.keyOwner != "") {
        this.form.keyOwner = "";
      } else {
        this.form.keyOwner = "1";
      }
    },
    onlySelect() {
      if (this.form.isOnly != "") {
        this.form.isOnly = "";
      } else {
        this.form.isOnly = "1";
      }
    },
    defaultSelect() {
      this.form.sortColumn = "id";
      this.form.sortType = "ascending";
    },
    priceSelect() {
      this.form.sortColumn = "price";
      if (this.form.sortType == "ascending") {
        this.form.sortType = "descending";
      } else {
        this.form.sortType = "ascending";
      }
      console.log(this.form.sortType);
    },
    inAreaSelect() {
      this.form.sortColumn = "inArea";
      if (this.form.sortType == "ascending") {
        this.form.sortType = "descending";
      } else {
        this.form.sortType = "ascending";
      }
      console.log(this.form.sortType);
    },
    InitPageJson() {
      this.pageJson = { total: 1, currentPage: 1, pageSize: 8 };
    },
    getHouseData(value, initPage = true) {
      let that = this;
      this.loading = true;
      Object.keys(value).forEach(item => {
        if (value[item] instanceof Array) {
          value[item] = value[item].join(",");
        }
      });
      let actionUrl = value.action;
      value.action = "";
      console.log(value, "==============>?");
      let restuleParms = Object.assign({}, value, {
        page: that.pageJson.currentPage,
        limit: that.pageJson.pageSize
      });
      return this.$api
        .get({
          url: actionUrl,
          token: false,
          data: restuleParms
        })
        .then(e => {
          let data = e.data;
          if (initPage) that.InitPageJson();
          if (data.code == 200) {
            console.log(data);
            that.renderList = data.data.data;
            that.pageJson.total = data.data.dataCount;
          }
        })
        .finally(() => {
          that.loading = false;
        });
    },
    //创建需要渲染的标签
    renderTag(value) {
      let that = this;
      console.log(value);
      //清空
      this.dynamicTags = [];
      //价格
      if (value.minPrice !== "") {
        this.dynamicTags.push({
          title: `价格:${value.minPrice}-${
            value.maxPrice == "9999" ? "无限" : value.maxPrice
          }万`,
          field: "price",
          arr: false
        });
      }
      //首付
      if (value.minDownPayment !== "") {
        this.dynamicTags.push({
          title: `首付:${value.minDownPayment}-${
            value.maxDownPayment == "9999" ? "无限" : value.maxDownPayment
          }万`,
          field: "downPayment",
          arr: false
        });
      }
      //面积
      if (value.minInArea !== "") {
        this.dynamicTags.push({
          title: `面积:${value.minInArea}-${
            value.maxInArea == "9999" ? "无限" : value.maxInArea
          }㎡`,
          field: "area",
          arr: false
        });
      }
      //楼层
      if (value.minFloor !== "") {
        this.dynamicTags.push({
          title: `楼层:${value.minFloor}-${
            value.maxFloor == "9999" ? "无限" : value.maxFloor
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
      //房源类型
      if (value.title != null && value.title != "") {
        this.dynamicTags.push({
          title: `房源类型:${value.title}`,
          field: "type",
          arr: false
        });
      } else {
        this.dynamicTags.push({
          title: `房源类型:全部在售`,
          field: "type",
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

        if (e.field == "price") {
          this.Slider.priceSlider = [20, 20];
          this.form.maxPrice = "";
          this.form.minPrice = "";
        }
        if (e.field == "area") {
          this.Slider.areaSlider = [20, 20];
          this.form.maxInArea = "";
          this.form.minInArea = "";
        }
        if (e.field == "floot") {
          this.Slider.flootSlider = [-2, -2];
          this.form.maxFloor = "";
          this.form.minFloor = "";
        }
        if (e.field == "communityName") {
          this.form.communityName = "";
          this.form.cbNo = "";
          this.form.roomNumber = "";
          this.form.comId = "";
          this.form.cbId = "";
          this.form.roomNo = "";
        }
        if (e.field == "cbNo") {
          this.form.cbNo = "";
          this.form.roomNumber = "";
          this.form.cbId = "";
          this.form.roomNo = "";
        }
        if (e.field == "roomNumber") {
          this.form.roomNumber = "";
          this.form.roomNo = "";
        }
        if (e.field == "searchInfo") {
          this.form.searchInfo = "";
        }
      }
    },
    //跳转第几页
    handleCurrentChange(e) {
      this.pageJson.currentPage = e;
      this.getHouseData(JSON.parse(JSON.stringify(this.form)), false);
    }
  }
};
</script>
