<style scoped>
.Impression-body {
  width: 265px;
  background-color: white;
  height: 6.8rem;
  margin-top: 0.2rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-right: 5px;
}
.tag-all {
  margin-top: 8px;
}
.Impression-tag {
  margin-top: 12px;
  margin-left: 12px;
}
.opset {
  float: right;
  margin-right: 10px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.querySelectFlag {
  flex: 0 !important;
  margin-right: 0px !important;
  position: relative;
  padding-right: 40px;
}
.hide-query {
  position: absolute;
  right: 0;
  padding-right: 10px;
  top: 500px;
  font-size: 20px;
  cursor: pointer;
}
</style>
<template>
  <list-page :parentData="$data"
             @sort-change="sortMethod"
             @handleClick="handleClick"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">

    <template v-slot:top>
      <div class="page-form-inline">
        <!-- <el-item label="楼盘名称" prop="comId"> -->
        <el-select v-model="data.comId"
                   @focus="remoteInput"
                   @change="queryCBId()"
                   filterable
                   remote
                   clearable
                   placeholder="请输入楼盘名称搜索"
                   :remote-method="remoteMethod"
                   :loading="loading">
          <el-option v-for="item in optionsList"
                     :key="item.value"
                     :label="item.name"
                     :value="item.value"></el-option>
        </el-select>
        <!-- </el-item>
        <el-item label="栋座" prop="cbId" class="page-label-center">-->
        <el-select v-model="data.cbId"
                   filterable
                   clearable
                   placeholder="请选择楼栋"
                   @change="queryRoomNo()"
                   style="width: 130px;">
          <el-option v-for="item in cbIdList"
                     :key="item.value"
                     :label="item.name"
                     :value="item.value"></el-option>
        </el-select>
        <!-- </el-item>
        <el-item label="房间号" prop="roomNo" clearable class="page-label-center">-->
        <el-select v-model="data.roomNo"
                   @change="querylistByParams()"
                   filterable
                   placeholder="请选择房间号"
                   style="width: 130px;">
          <el-option v-for="item in roomNoList"
                     :key="item.value"
                     :label="item.name"
                     :value="item.value"></el-option>
        </el-select>
        <!-- </el-item> -->
        <el-input placeholder="业主姓名"
                  @change="querylistByParams()"
                  v-model="data.customName"
                  style="margin-left:25px;width:200px"
                  clearable>
          <template slot="prepend">业主姓名</template>
        </el-input>

        <el-input placeholder="业主电话"
                  @change="querylistByParams()"
                  v-model="data.tel"
                  style="margin-left:30px;width:200px"
                  clearable>
          <template slot="prepend">电话</template>
        </el-input>

        <el-input placeholder="最小值"
                  @change="querylistByParams()"
                  v-model="data.minPrice"
                  style="margin-left:25px;width:160px"
                  clearable>
          <template slot="prepend">价格</template>
        </el-input>
        <el-input placeholder="最大值"
                  @change="querylistByParams()"
                  v-model="data.maxPrice"
                  style="margin-left:10px;width:100px"></el-input>
        <el-input placeholder="最小值"
                  @change="querylistByParams()"
                  v-model="data.minInArea"
                  style="width:160px;margin-top:5px;"
                  clearable>
          <template slot="prepend">面积</template>
        </el-input>
        <el-input placeholder="最大值"
                  @change="querylistByParams()"
                  v-model="data.maxInArea"
                  style="margin-left:10px;width:100px"></el-input>

        录入时间：
        <el-date-picker v-model="data.timeSelect"
                        @change="querylistByParams()"
                        type="daterange"
                        range-separator="至"
                        value-format="yyyy-MM-dd"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"></el-date-picker>
        <span>
          <input type="checkbox"
                 style="margin-left:10px"
                 @click="keySelect()" /> 钥匙
        </span>
        <span>
          <input type="checkbox"
                 style="margin-left:10px;background:#fff"
                 @click="onlySelect()" /> 独家
        </span>
        <span style="color:rgb(90,159,203);cursor:pointer;margin-left:20px"
              @click="remove">清除</span>
        <el-button type="primary"
                   style="margin-left:10px"
                   size="mini"
                   @click="querylistByParams">查询</el-button>
        <el-button style="margin-left:10px;height:30px;border:0"
                   size="mini">
          <moreSelect @moreSelectChange="moreSelectChange"
                      style="height:40px;margin-right:5px;"></moreSelect>
        </el-button>
        <el-button style="margin-left:10px;height:30px;border:0"
                   size="mini">
          <definitionmenu class="menuMarin"
                          :renderList="tableDataColumn"
                          :tableColumn="tableColumn"
                          @change="tabColumnChange"></definitionmenu>
        </el-button>
      </div>
    </template>

    <template v-slot:left>
      <div :class="{'querySelectFlag':querySelectFlag}">
        <div class="Impression-body">
          <div style="height:30px;margin-top:10px;width:inherit;">
            <i icon="el-icon-search"></i>
            <el-select v-model="imdataimdata"
                       @focus="removeImpressionInput"
                       @change="selectImpression($event)"
                       filterable
                       placeholder="请输入您添加过的房源印象"
                       :loading="loading"
                       style="width: -webkit-fill-available;margin: 10px 10px;">
              <el-option v-for="item in MyImpressionList"
                         :key="item.id"
                         :label="item.impression"
                         :value="item"></el-option>
            </el-select>
          </div>
          <div style="height:30px;margin-top: inherit;">
            <el-button class="opset"
                       type="text"
                       @click="show(1)">一键还原</el-button>
            <el-button class="opset"
                       type="text"
                       @click="show(0)">一键清除</el-button>
          </div>
          <div class="tag-all"
               v-if="showImpression">
            <span v-for="item in ImpressionList"
                  :key="item.id">
              <el-tag class="Impression-tag"
                      size="mini"
                      @close="handleClose(item.id)"
                      type="success"
                      closable>{{item.impression}}</el-tag>
            </span>
          </div>
        </div>
        <div class="hide-query"
             @click="()=> querySelectFlag = !querySelectFlag "
             :class="querySelectFlag ? 'el-icon-d-arrow-right': 'el-icon-d-arrow-left'  "></div>
      </div>
    </template>

    <template #tableColumn>
      <template v-for="(item) in tableColumn">
        <el-table-column :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                         :key="item.prop"
                         :formatter="item.formart"
                         :sort-orders="['ascending', 'descending']"
                         :sortable="item.order"></el-table-column>
      </template>
      <el-table-column label="操作"
                       fixed="right"
                       key="operation">
        <template v-slot="scope">
          <el-button type="info"
                     style="background:green"
                     @click="toHouseDetail(scope.row.id)"
                     size="mini">查看</el-button>
          <div v-if="scope.row.collectId != null && scope.row.collectId!= '' ">
            <el-button type="info"
                       slot="reference"
                       @click="ifOFF(scope.row.id)"
                       size="mini">取消关注</el-button>
          </div>
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
export default {
  mixins: [getMenuRid],
  components: {
    listPage,
    moreSelect,
    definitionmenu
  },
  data () {
    return {
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
          width: "110px",
          order: false,
          disabled: false,
          default: true
        },
        {
          prop: "communityName",
          label: "楼盘名称",
          width: "110px",
          order: false,
          disabled: false,
          default: true
        },
        {
          prop: "buildingName",
          label: "栋座",
          width: "110px",
          order: false,
          disabled: false,
          default: true
        },
        {
          prop: "roomNo",
          label: "房间号",
          width: "110px",
          order: false,
          disabled: false,
          default: true
        },
        {
          prop: "price",
          label: "售价(万元)",
          width: "120px",
          order: "custom",
          disabled: false,
          default: true,
          formart: item => item.price + "万元"
        },
        {
          prop: "inArea",
          label: "面积(m²)",
          width: "110px",
          order: "custom",
          disabled: false,
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
          width: "130px",
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
          disabled: false,
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
        keyOwner: "",
        isOnly: ""
      },
      queryData: {
        CommunityName: "",
        BuildingName: "",
        timeSelect: "",
        RoomNo: "",
        cbId: "",
        isOnly: "",
        keyOwner: ""
      },
      moreSelect: {}
    };
  },
  mounted () {
    // this.querylist(1, "id", "descending");
    // this.queryMyImpression();
    let that = this;
    that.show(1);
  },
  methods: {
    moreSelectChange (e) {
      this.moreSelect = e;
      this.querylist(1, "id", "descending");
    },
    tabColumnChange (e) {
      this.tableColumn = e;
    },
    sortMethod (e) {
      console.log(e, "eeee排序");
      this.querylist(1, e.prop, e.order);
    },
    keySelect () {
      if (this.data.keyOwner != "") {
        this.data.keyOwner = "";
      } else {
        this.data.keyOwner = "1";
      }
      this.querylistByParams(1, "id", "descending");
    },
    onlySelect () {
      if (this.data.isOnly != "") {
        this.data.isOnly = "";
      } else {
        this.data.isOnly = "1";
      }
      this.querylistByParams(1, "id", "descending");
    },
    handleClose (tag) {
      console.log("删除前：", this.ImpressionList);
      for (let i = 0; i < this.ImpressionList.length; i++) {
        if (this.ImpressionList[i].id == tag) {
          this.ImpressionList.splice(i, 1);
        }
      }
      console.log("删除后：", this.ImpressionList);
      this.querylistByParams();
    },
    remove () {
      this.queryData.keyOwner = "";
      this.queryData.isOnly = "";
      let tab = this.tableColumn;
      Object.assign(this.$data, this.$options.data.call(this));
      this.tabColumnChange(tab);
      //this.querylist(1, "id", "descending");
      this.show(1);
    },
    selectImpression (e) {
      let that = this;
      //that.queryMyImpression();
      var selecti = 0;
      for (var i = 0; i < that.ImpressionList.length; i++) {
        if (that.ImpressionList[i].id == e.id) {
          selecti = 1;
        }
      }
      if (selecti == 1) {
        that.ImpressionList = this.ImpressionList;
      } else {
        var addList = [
          { id: e.id, impression: e.impression, houseId: e.houseId }
        ];
        that.ImpressionList = this.ImpressionList.concat(addList);
      }
      this.querylistByParams();
    },
    remoteMethod (query) {
      var that = this;
      if (query !== "") {
        this.loading = true;
        this.$api
          .get({
            url: "/agentHouse/impression/getHouseImpressionList",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            token: false,
            qs: true,
            data: {
              communityName: query
            }
          })
          .then(e => {
            console.log(e.data);
            if (e.data.code == 200) {
              that.loading = false;
              that.options = e.data.data.list;
              that.dynamicTags = e.data.data.list;
            }
          });
      } else {
        this.options = [];
      }
    },
    queryHouseImpression () {
      var that = this;
      this.$api
        .get({
          url: "/agentHouse/impression/getHouseImpressionList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          console.log(e.data.code);
          if (e.data.code == 200) {
            this.Impression = e.data.data;
            that.ImpressionList = e.data.data;
          }
        });
    },
    ifOFF (id) {
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
          this.querylist(1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    concernOFF (id) {
      this.$api
        .post({
          url: "/agent_house/concernHouseOFF/" + id,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => { });
    },
    queryMyImpression () {
      var that = this;
      var impression = this.imdata;
      this.$api
        .get({
          url:
            "/agentHouse/impression/getMyImpressionList?impression=" +
            impression,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            MyImpressionList: that.MyImpressionList
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.MyImpressionList = e.data.data;
          }
        });
    },
    //跳转房源详情页面
    toHouseDetail (id) {
      let that = this;
      that.$router.push({ name: "houseDetails", params: { houseId: id } });
    },
    //清除
    show (msg) {
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
            console.log(e.data.code);
            if (e.data.code == 200) {
              that.ImpressionList = e.data.data;
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
    querylistByParams () {
      let that = this;
      that.querylist(1, "id", "descending");
    },
    querylist (currentPage, column, type) {
      let params = {
        limit: this.pageJson.pageSize + "",
        page: currentPage + ""
      };
      let that = this;
      if (this.ImpressionList != null && this.ImpressionList != "") {
        that.addList = [];
        for (var j = 0; j < that.ImpressionList.length; j++) {
          var houseid = that.ImpressionList[j].houseId;
          var newList = [houseid];
          that.addList = that.addList.concat(newList);
        }
        params.list = new Set(that.addList);
      }
      if (Object.keys(this.moreSelect).length != 0) {
        for (let key in this.moreSelect) {
          if (this.key == "addTime" && this.moreSelect[key] !== "") {
            params.biginTime = this.moreSelect[key][0];
            params.endTime = this.moreSelect[key][1];
          } else if (this.key == "followTime" && this.moreSelect[key] !== "") {
            params.biginFollowTime = this.moreSelect[key][0];
            params.endFollowTime = this.moreSelect[key][1];
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
        if (that.data.roomNo != null && this.data.RoomNo != "") {
          params.roomNo = this.data.roomNo;
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
      params.keyOwner = that.data.keyOwner;
      if (column == "" || type == null || type == undefined) {
        params.sortColumn = "id";
      } else {
        params.sortColumn = column;
      }
      if (type == "" || type == null || type == undefined) {
        params.sortType = "descending";
      } else {
        params.sortType = type;
      }
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
    remoteInput () {
      if (this.queryData.CommunityName.length == 0) {
        this.remoteMethod();
      }
    },
    remoteMethod (query) {
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
    removeImpressionInput () {
      let that = this;
      console.log("removeImpressionInput->", that.imdataimdata);
      // if(that.imdataimdata!="")
      that.imdataimdata = "";
      that.queryMyImpression();
      //  else
      //  that.imdataimdata="";
    },
    queryCBId () {
      var that = this;
      this.$api
        .get({
          url: "/mateHouse/queryComBuilding",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comId: this.queryData.CommunityName
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.queryData.RoomNo = "";
            that.queryData.BuildingName = "";
            this.cbIdList = e.data.data.list;
          }
        });
      this.querylistByParams();
      console.log("queryCBId!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + this.comId);
    },
    queryRoomNo () {
      var that = this;
      this.$api
        .get({
          url: "/mateHouse/queryBuildIngHouses",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comId: this.queryData.CommunityName,
            cbId: this.queryData.BuildingName
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.queryData.RoomNo = "";
            this.roomNoList = e.data.data.list;
          }
        });
      this.querylistByParams();
    },
    handleClick () { },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.querylist(1, "id", "ascending");
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.querylist(val, "id", "ascending");
    }
  }
};
</script>
