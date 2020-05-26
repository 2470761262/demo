<style lang="less" scoped>
.flex-cell-content {
  display: flex;
  justify-content: space-around;
}
.attention-content {
  margin-right: 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 300px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 15px 15px 0;
  box-sizing: border-box;
  .attention-select {
    width: 100%;
    /deep/.el-select {
      width: 100%;
    }
  }
  .but-group {
    text-align: right;
    padding-right: 20px;
    /deep/.el-button {
      span {
        color: var(--color--primary);
      }
    }
  }
  .attention-scroll-content {
    flex: 1 0 auto;
    overflow-y: auto;
    overflow-x: hidden;
    height: 0;
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    &::-webkit-scrollbar-button,
    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-track-piece {
      display: none;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--color--primary);
      border-radius: 50px;
    }
    .scroll-content-tag {
      margin-right: 20px;
      margin-bottom: 10px;
    }
  }
}
.hide-query {
  position: absolute;
  height: 100%;
  color: var(--color--primary);
  right: -10px;
  top: 0;
  font-size: 20px;
  cursor: pointer;
  &::after {
    content: "";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
}
</style>
<template>
  <list-page
    :parentData="$data"
    @sort-change="sortMethod"
    @handleClick="handleClick"
    @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange"
  >
    <template v-slot:top>
      <div class="page-list-query-row">
        <div class="query-content-cell">
          <h3 class="query-cell-title">楼盘</h3>
          <el-select
            data-anchor="我的关注楼盘 => select"
            class="anchor-point"
            v-model="data.comId"
            @focus="remoteInput"
            @change="queryCBId"
            filterable
            remote
            clearable
            placeholder="楼盘名称"
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              data-anchor="我的关注楼盘 => select => option"
              class="anchor-point"
              v-for="item in optionsList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select
            data-anchor="我的关注楼栋 => select"
            class="anchor-point"
            v-model="data.cbId"
            filterable
            clearable
            placeholder="楼栋"
            @change="buildChange"
          >
            <el-option
              data-anchor="我的关注楼栋 => select => option"
              class="anchor-point"
              v-for="item in cbIdList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select
            data-anchor="我的关注房间号 => select"
            class="anchor-point"
            v-model="data.roomNo"
            filterable
            clearable
            @change="querylistByParams"
            placeholder="房间号"
            :loading="HouseNoLoading"
            v-loadmore="loadMore"
          >
            <el-option
              data-anchor="我的关注房间号 => select => option"
              class="anchor-point"
              v-for="item in roomNoList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">编号</h3>
          <el-input
            data-anchor="我的关注房源编号 => input"
            placeholder="房源编号"
            v-model="data.houseNo"
            class="set-input200 anchor-point"
            @change="querylistByParams"
            clearable
          />
        </div>
        <div class="query-content-cell cell-interval75">
          <h3 class="query-cell-title">业主</h3>
          <el-input
            data-anchor="我的关注业主姓名 => input"
            placeholder="姓名"
            class="set-input120 anchor-point"
            @change="querylistByParams"
            v-model="data.customName"
            clearable
          />
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">电话</h3>
          <el-input
            data-anchor="我的关注业主电话 => input"
            placeholder="业主电话"
            v-model="data.tel"
            class="set-input200 anchor-point"
            @change="querylistByParams"
            clearable
          />
        </div>
        <div class="query-content-cell cell-interval45">
          <definitionmenu
            class="anchor-point"
            :renderList="renderList"
            :tableColumn="tableColumn"
            @change="tabColumnChange"
            :loading="menuLoading"
            :resetList="tableDataColumn"
          ></definitionmenu>
        </div>
      </div>
      <div class="page-list-query-row">
        <div class="query-content-cell ">
          <h3 class="query-cell-title">价格</h3>
          <el-input
            data-anchor="我的关注价格最小值 => input"
            placeholder="最小值"
            v-model="data.minPrice"
            class="set-input90 anchor-point"
            @change="querylistByParams"
            clearable
          />
          <span class="cut-off-rule"></span>
          <el-input
            data-anchor="我的关注价格最大值 => input"
            placeholder="最大值"
            v-model="data.maxPrice"
            class="set-input90 anchor-point"
            @change="querylistByParams"
            clearable
          />
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">面积</h3>
          <el-input
            data-anchor="我的关注面积最小值 => input"
            placeholder="最小值"
            v-model="data.minInArea"
            class="set-input90 anchor-point"
            @change="querylistByParams"
            clearable
          />
          <span class="cut-off-rule"></span>
          <el-input
            data-anchor="我的关注面积最大值 => input"
            placeholder="最大值"
            v-model="data.maxInArea"
            class="set-input90 anchor-point"
            @change="querylistByParams"
            clearable
          />
          <span class="query-cell-suffix">平方</span>
        </div>
        <div class="query-content-cell cell-interval75">
          <h3 class="query-cell-title">录入时间</h3>
          <el-date-picker
            data-anchor="我的关注录入时间 => input"
            v-model="data.timeSelect"
            type="daterange"
            class="set-data-pricker anchor-point"
            @change="querylistByParams"
            range-separator="至"
            :default-time="['00:00:00', '23:59:59']"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <span
            data-anchor="我的关注清除 => click"
            class="query-cell-suffix handlebut anchor-point"
            @click="remove"
            >清除</span
          >
        </div>
        <div class="query-content-cell cell-interval45">
          <label class="query-checkbox">
            <input
              data-anchor="我的关注钥匙 => checkbox"
              class="anchor-point"
              type="checkbox"
              v-model="queryData.keyOwner"
              value="1"
              @click="keySelect"
            />
            <span>钥匙</span>
          </label>
          <label class="query-checkbox">
            <input
              data-anchor="我的关注独家 => checkbox"
              class="anchor-point"
              type="checkbox"
              v-model="queryData.isOnly"
              value="1"
              @click="onlySelect"
            />
            <span>独家</span>
          </label>
        </div>
        <div class="query-content-cell cell-interval45">
          <el-button
            data-anchor="我的关注查询 => click"
            type="primary"
            size="mini"
            @click="querylistByParams"
            class="anchor-point"
            >查询</el-button
          >
        </div>
        <div class="query-content-cell cell-interval25">
          <moreSelect
            :configRule="{
              deptParentId: false,
              store: false,
              personnel: false
            }"
            @moreSelectChange="moreSelectChange"
            ref="moreSelect"
            class="anchor-point"
          ></moreSelect>
        </div>
      </div>
    </template>
    <template v-slot:left>
      <div class="attention-content" v-if="!querySelectFlag">
        <div class="attention-select">
          <el-select
            class="anchor-point"
            v-model="imdataimdata"
            @focus="removeImpressionInput"
            @change="selectImpression($event)"
            filterable
            data-anchor="我的关注房源印象 => select"
            placeholder="请输入您添加过的房源印象"
            :loading="loading"
          >
            <el-option
              data-anchor="我的关注房源印象 => select => option"
              class="anchor-point"
              v-for="item in MyImpressionList"
              :key="item.index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </div>
        <div class="but-group">
          <el-button
            data-anchor="我的关注房一键还原 => click"
            class="anchor-point"
            type="text"
            @click="show(1)"
            >一键还原</el-button
          >
          <el-button
            data-anchor="我的关注房一键清除 => click"
            class="anchor-point"
            type="text"
            @click="show(0)"
            >一键清除</el-button
          >
        </div>
        <div class="attention-scroll-content" v-if="showImpression">
          <span v-for="item in ImpressionList" :key="item.index">
            <el-tag
              data-anchor="我的关注房印象tag => click"
              class="scroll-content-tag anchor-point"
              @close="handleClose(item.index)"
              closable
              >{{ item }}</el-tag
            >
          </span>
        </div>
      </div>
      <div
        class="hide-query anchor-point"
        data-anchor="我的关注房印象切换显示窗口 => click"
        @click="() => (querySelectFlag = !querySelectFlag)"
        :class="
          querySelectFlag ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'
        "
      ></div>
    </template>
    <template v-slot:tableColumn>
      <template v-for="item in tableColumn">
        <el-table-column
          class-name="anchor-point"
          :prop="item.prop"
          :label="item.label"
          :min-width="item.width"
          :key="item.prop"
          :formatter="item.formart"
          show-overflow-tooltip
          :sort-orders="['ascending', 'descending']"
          :sortable="item.order"
        ></el-table-column>
      </template>
      <el-table-column label="操作" min-width="180" fixed="right">
        <template v-slot="scope">
          <el-button
            class="anchor-point"
            type="primary"
            @click="toHouseDetail(scope.row.id)"
            size="mini"
            data-anchor="我的关注查看 => click"
            >查看</el-button
          >
          <el-button
            class="anchor-point"
            type="primary"
            v-if="scope.row.collectId != null && scope.row.collectId != ''"
            slot="reference"
            @click="ifOFF(scope.row.id)"
            size="mini"
            data-anchor="我的关注取消关注 => click"
            >取消关注</el-button
          >
          <el-button
            type="info"
            v-else
            slot="reference"
            size="mini"
            class="anchor-point"
            data-anchor="我的关注印象关注 => click"
            >印象关注</el-button
          >
        </template>
      </el-table-column>
    </template>
  </list-page>
</template>
<script>
import listPage from "@/components/listPage";
import getMenuRid from "@/minxi/getMenuRid";
import moreSelect from "@/components/moreSelect";
import definitionmenu from "@/components/definitionMenu";
import tableMenu from "@/util/getTableMenu";
export default {
  mixins: [getMenuRid],
  components: {
    listPage,
    moreSelect,
    definitionmenu
  },
  data() {
    return {
      HouseNoLoading: false,
      houseNoPage: {
        // 房间分页数据
        currentPage: 1,
        totalPage: 1,
        limit: 30
      },
      querySelectFlag: false,
      optionsList: [],
      cbIdList: [],
      roomNoList: [],
      imtag: false,
      imdataimdata: "",
      addList: [],
      imdata: "",
      showImpression: true,
      impression: "",
      MyImpressionList: [],
      dialogVisible: false,
      value: "",
      input: "",
      addPer: "",
      loading: true, //控制表格加载动画提示
      pageJson: {
        currentPage: 1, //当前页码
        total: 9, //总记录数
        pageSize: 10 //每页条数
      },
      tableColumn: [],
      tableDataColumn: [
        {
          prop: "houseNo",
          label: "房源编号",
          width: "170px",
          order: false,
          disabled: false,
          default: true
        },
        {
          prop: "communityName",
          label: "楼盘名称",
          width: "170px",
          order: false,
          disabled: true,
          default: true
        },
        // {
        //   prop: "buildingName",
        //   label: "栋座",
        //   width: "100px",
        //   order: false,
        //   disabled: false,
        //   default: true
        // },
        // {
        //   prop: "roomNo",
        //   label: "房间号",
        //   width: "100px",
        //   order: false,
        //   disabled: false,
        //   default: true
        // },
        {
          prop: "price",
          label: "售价(万元)",
          width: "120px",
          order: "custom",
          disabled: true,
          default: true,
          formart: item => item.price + "万元"
        },
        {
          prop: "inArea",
          label: "面积(m²)",
          width: "110px",
          order: "custom",
          disabled: true,
          default: true,
          formart: item => item.inArea + "m²"
        },
        {
          prop: "unitPrice",
          label: "单价(元/平)",
          width: "130px",
          order: "custom",
          disabled: false,
          default: true,
          format: item => item.unitPrice + "元/㎡"
        },
        {
          prop: "seenNum",
          label: "被看次数",
          width: "110px",
          order: "custom",
          disabled: false,
          default: true
        }, //自己补充
        {
          prop: "noSeenDay",
          label: "未被带看天数",
          width: "150px",
          order: "custom",
          disabled: false,
          default: true
        }, //自己补充
        {
          prop: "outfollow",
          label: "未跟进天数",
          width: "130px",
          order: "custom",
          disabled: false,
          default: true
        }, //自己补充
        {
          prop: "brokerName",
          label: "跟单人",
          width: "110px",
          order: false,
          disabled: false,
          default: true
        },
        {
          prop: "",
          label: "户型",
          width: "110px",
          order: false,
          disabled: true,
          default: true,
          formart: item =>
            (item.rooms || 0) +
            "室" +
            (item.hall || 0) +
            "厅" +
            (item.toilet || 0) +
            "卫"
        }
      ],
      menuLoading: true, //自定义菜单
      renderList: [],
      tableData: [],
      elTabs: {
        activeName: "tab1",
        list: []
      },
      ImpressionList: [],
      data: {
        comId: "",
        cbId: "",
        roomNo: "",
        timeSelect: "",
        customName: "",
        tel: "",
        minInArea: "",
        maxInArea: "",
        minPrice: "",
        maxPrice: "",
        isKey: "",
        isOnly: "",
        houseNo: ""
      },
      queryData: {
        CommunityName: "",
        BuildingName: "",
        timeSelect: "",
        RoomNo: "",
        cbId: "",
        isOnly: "",
        isKey: ""
      },
      moreSelect: {},
      sortColumn: "id", //排序字段
      sortType: "descending", //排序类型
      transitionOrderList: [
        {
          key: "outfollow",
          value: "lastFollowTime"
        },
        {
          key: "noSeenDay",
          value: "lastPairTime"
        }
      ] //转换排序字段数组
    };
  },
  mounted() {
    // this.querylist(1, "id", "descending");
    // this.queryMyImpression();
    let that = this;
    // that.show(1);
    tableMenu.getTableMenu(this.tableDataColumn, 5).then(e => {
      this.menuLoading = false;
      this.renderList = e;
      this.querylistByParams();
    });
  },
  methods: {
    moreSelectChange(e) {
      this.moreSelect = e;
      this.querylist(1);
    },
    tabColumnChange(e, length = 0) {
      this.tableColumn = e;
      if (length > 0) {
        let prop = e.map(item => {
          return { prop: item.prop };
        });
        tableMenu.insert(prop, 5);
      }
    },
    sortMethod(e) {
      console.log(e, "eeee排序");
      this.sortColumn = e.prop;
      this.sortType = e.order;
      this.transitionOrderList.forEach(Element => {
        if (Element.key == e.prop) {
          this.sortColumn = Element.value;
          if (e.order == "descending") {
            this.sortType = "ascending";
          } else {
            this.sortType = "descending";
          }
        }
      });
      this.querylist(1);
    },
    keySelect() {
      if (this.data.isKey != "") {
        this.data.isKey = "";
      } else {
        this.data.isKey = "1";
      }
      this.querylistByParams(1);
    },
    onlySelect() {
      if (this.data.isOnly != "") {
        this.data.isOnly = "";
      } else {
        this.data.isOnly = "1";
      }
      this.querylistByParams(1);
    },
    handleClose(index) {
      console.log("删除前：", this.ImpressionList);
      this.ImpressionList.splice(index, 1);
      console.log("删除后：", this.ImpressionList);
      this.querylistByParams();
    },
    remove() {
      this.queryData.isKey = "";
      this.queryData.isOnly = "";
      let tab = this.tableColumn;
      let renderList = this.renderList;
      Object.assign(this.$data, this.$options.data.call(this));
      this.renderList = renderList;
      this.menuLoading = false;
      this.tabColumnChange(tab);
      //this.querylist(1, "id", "descending");
      this.show(1);
    },
    selectImpression(e) {
      let that = this;
      //   that.ImpressionList = [];
      if (!that.ImpressionList.includes(e)) {
        that.ImpressionList.push(e);
      }
      this.querylistByParams();
    },
    // remoteMethod(query) {
    //   var that = this;
    //   if (query !== "") {
    //     this.loading = true;
    //     this.$api
    //       .get({
    //         url: "/agentHouse/impression/getHouseImpressionList",
    //         headers: { "Content-Type": "application/json;charset=UTF-8" },
    //         token: false,
    //         qs: true,
    //         data: {
    //           communityName: query
    //         }
    //       })
    //       .then(e => {
    //         console.log("777", e.data);
    //         if (e.data.code == 200) {
    //           that.loading = false;
    //           that.options = e.data.data.list;
    //           that.dynamicTags = e.data.data.list;
    //         }
    //       });
    //   } else {
    //     this.options = [];
    //   }
    // },
    queryHouseImpression() {
      var that = this;
      this.$api
        .get({
          url: "/agentHouse/impression/getHouseImpressionList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          console.log("888", e.data.code);
          if (e.data.code == 200) {
            this.Impression = e.data.data;
            that.ImpressionList = e.data.data;
          }
        });
    },
    ifOFF(id) {
      this.$confirm("是否确定取消关注?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.concernOFF(id);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        })
        .catch(() => {});
    },
    concernOFF(id) {
      let that = this;
      this.$api
        .post({
          url: "/agent_house/concernHouseOFF/" + id,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          that.deleteMyAttention(id);
        });
    },
    deleteMyAttention(houseId) {
      this.$api
        .post({
          url: "/myHouse/deleteMyAttention",
          data: {
            houseId: houseId
          },
          qs: true,
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(e => {});
    },
    queryMyImpression() {
      var that = this;
      var impression = this.imdata;
      this.$api
        .get({
          url:
            "/agentHouse/impression/getMyImpressionList?impression=" +
            impression,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          qs: true,
          data: {}
        })
        .then(e => {
          if (e.data.code == 200) {
            let impressions = e.data.data;
            let arr = [];
            for (let index in impressions) {
              if (!arr.includes(impressions[index].impression)) {
                arr.push(impressions[index].impression);
              }
            }
            that.MyImpressionList = arr;
            this.querylist(1);
          }
        });
    },
    //跳转房源详情页面
    toHouseDetail(id) {
      let that = this;
      that.$router.push({ name: "houseDetails", params: { houseId: id } });
    },
    //清除
    show(msg) {
      var that = this;
      if (msg == 0) {
        this.$confirm("清除当前所有房源印象?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            that.ImpressionList = [];
            this.querylistByParams();
            this.$message({
              type: "success",
              message: "清除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      } else if (msg == 1) {
        // this.$confirm("还原所有房源印象?", "提示", {
        //   confirmButtonText: "确定",
        //   cancelButtonText: "取消",
        //   type: "warning"
        // })
        //   .then(() => {
        this.$api
          .get({
            url: "/agentHouse/impression/getHouseImpressionList",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            token: false
          })
          .then(e => {
            console.log("666", e.data.code, e.data.data);
            if (e.data.code == 200) {
              let impressions = e.data.data;
              let arr = [];
              for (let index in impressions) {
                if (!arr.includes(impressions[index].impression)) {
                  arr.push(impressions[index].impression);
                }
              }
              that.ImpressionList = arr;
              this.querylistByParams();
            }
          });
        // this.$message({
        //   type: "success",
        //   message: "还原成功!"
        // });
        // })
        // .catch(() => {
        //   this.$message({
        //     type: "info",
        //     message: "已取消"
        //   });
        // });
      }
    },
    querylistByParams() {
      let that = this;
      that.querylist(1);
    },
    querylist(currentPage) {
      let params = {
        limit: this.pageJson.pageSize + "",
        page: currentPage + ""
      };
      let that = this;
      if (this.ImpressionList != null && this.ImpressionList != "") {
        params.list = this.ImpressionList;
      }
      if (Object.keys(this.moreSelect).length != 0) {
        for (let key in this.moreSelect) {
          if (key == "addTime" && this.moreSelect[key] !== "") {
            params.beginTime = this.moreSelect[key][0];
            params.endTime = this.moreSelect[key][1];
          } else if (key == "followTime" && this.moreSelect[key] !== "") {
            params.beginFollowTime = this.moreSelect[key][0];
            params.endFollowTime = this.moreSelect[key][1];
          } else if (key == "bhId") {
            params.roomNo = this.moreSelect.bhId;
          } else {
            params[key] = this.moreSelect[key];
          }
        }
      } else {
        if (that.data.comId != null && that.data.comId != "") {
          params.comId = that.data.comId;
        }
        if (that.data.cbId != null && that.data.cbId != "") {
          params.cbId = this.data.cbId;
        }
        if (that.data.roomNo != null && this.data.roomNo != "") {
          params.roomNo = that.data.roomNo;
        }
        if (that.data.customName != null && that.data.customName != "") {
          params.customName = that.data.customName;
        }
        if (that.data.tel != null && that.data.tel != "") {
          params.tel = this.data.tel;
        }
        if (that.data.minPrice != null && that.data.minPrice != "") {
          params.minPrice = that.data.minPrice;
        }
        if (that.data.maxPrice != null && that.data.maxPrice != "") {
          params.maxPrice = that.data.maxPrice;
        }
        if (that.data.minInArea != null && that.data.minInArea != "") {
          params.minInArea = that.data.minInArea;
        }
        if (that.data.maxInArea != null && that.data.maxInArea != "") {
          params.maxInArea = that.data.maxInArea;
        }
        if (that.data.houseNo != null && that.data.houseNo != "") {
          params.houseNo = that.data.houseNo;
        }
        if (
          that.data.timeSelect != null &&
          that.data.timeSelect[0] != null &&
          that.data.timeSelect[0] != ""
        ) {
          params.beginTime = that.data.timeSelect[0];
        }
        if (
          that.data.timeSelect != null &&
          that.data.timeSelect[1] != null &&
          that.data.timeSelect[1] != ""
        ) {
          params.endTime = that.data.timeSelect[1];
        }
      }
      params.isOnly = that.data.isOnly;
      params.isKey = that.data.isKey;
      params.sortColumn = that.sortColumn;
      params.sortType = that.sortType;
      this.$api
        .post({
          url: "/myHouse/getMyAttention",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params,
          token: false
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          that.loading = false;
          if (result.code == 200) {
            // that.pageJson.total = result.data.totalCount;
            // that.pageJson.currentPage = result.data.currPage;
            // that.tableData = result.data.list;

            that.pageJson.total = result.data.dataCount;

            that.tableData = result.data.data;
          } else {
            console.log("查询我的关注列表结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询我的关注失败");
          console.log(e);
        });
    },
    remoteInput() {
      if (this.queryData.CommunityName.length == 0) {
        this.remoteMethod();
      }
    },
    remoteMethod(query) {
      var that = this;
      if (query !== "") {
        console.log(query);
        this.loading = true;
        this.$api
          .get({
            url: "/community/myConcern",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            token: false,
            qs: true,
            data: {
              page: 1,
              limit: 50,
              communityName: query
            }
          })
          .then(e => {
            console.log(e.data);
            if (e.data.code == 200) {
              that.loading = false;
              that.optionsList = e.data.data.list;
            }
          });
      } else {
        this.optionsList = [];
      }
      console.log(
        "remoteMethod!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + this.comId
      );
    },
    removeImpressionInput() {
      let that = this;
      console.log("removeImpressionInput->", that.imdataimdata);
      // if(that.imdataimdata!="")
      that.imdataimdata = "";
      that.queryMyImpression();
      //  else
      //  that.imdataimdata="";
    },
    queryCBId() {
      var that = this;
      this.$api
        .get({
          url: "/mateHouse/queryComBuilding",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comId: this.data.comId,
            page: 1,
            limit: 9999
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.data.RoomNo = "";
            that.data.cbId = "";
            this.cbIdList = e.data.data.list;
          }
        });
      this.querylistByParams();
      console.log("queryCBId!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + this.comId);
    },
    buildChange() {
      Object.assign(this.$data.houseNoPage, this.$options.data().houseNoPage);
      this.roomNoList = [];
      this.queryRoomNo();
    },
    loadMore() {
      if (this.houseNoPage.currentPage < this.houseNoPage.totalPage) {
        ++this.houseNoPage.currentPage;
        this.queryRoomNo();
      }
    },
    queryRoomNo() {
      var that = this;
      this.HouseNoLoading = true;
      this.$api
        .get({
          url: "/mateHouse/queryBuildIngHouses",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comId: that.data.comId,
            cbId: that.data.cbId,
            page: this.houseNoPage.currentPage,
            limit: 300
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.data.roomNo = "";
            this.roomNoList = [...this.roomNoList, ...e.data.data.list];
            this.houseNoPage.totalPage = e.data.data.totalPage;
          }
        })
        .finally(() => {
          this.HouseNoLoading = false;
        });
      this.querylistByParams();
    },
    handleClick() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.querylist(1);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.querylist(val);
    }
  }
};
</script>
