<style lang="less">
.div {
  position: absolute;
}
.list{
 display:flex; 
 flex-direction:row;
 height:40px;
 width:270px;
 background:CornflowerBlue;
 font-weight:bold;
 margin-top:10px;
 color:#fff;
 flex-wrap: wrap;
 -webkit-align-content: center;
 .communityName{
   width:40%;
   font-size: 15px;
   padding:5px 5px;
   white-space: nowrap;/*设置不换行*/
   overflow: hidden; /*设置隐藏*/
   text-overflow: ellipsis; /*设置隐藏部分为省略号*/
 }
 .countNum{
   width:25%;
   font-size: 12px;
   text-align: center;
   .cNum{
     margin: 0px 6px;
     border-radius: 50px;
     background-color: #fff;
     border-color: #fff;
     color: #000;
   }
 }
 .effectiveNum{
   width:25%;
   font-size: 12px;
   text-align: center;
   .eNum{
     margin: 0px 6px;
     border-radius: 50px;
     background-color: #fff;
     border-color: #fff;
     color: #000;
   }
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
    <template v-slot:left>
      <div style="width:300px;height:560px;background:white;">
        <div style="margin-left:10px;margin-top:px;background:white;">
          <div style="height:20px;"></div>
          <h2>核心盘总览</h2>
          <div>
            <div
              style="margin-top:10px;height:30px;width:270px;background:RoyalBlue;font-weight:bold;font-size:20px;"
            >
              <div style="color:white;float: left;margin-left:10px;">我的核心盘</div>
              <div style="color:white;float: right;margin-right:10px;">{{countAll}}套</div>
            </div>
            <div
              style="height:30px;width:270px;background:DarkOrange;font-weight:bold;font-size:20px;"
            >
              <div style="color:white;float: left;margin-left:10px;">存量房总套数</div>
              <div style="color:white;float: right;margin-right:10px;">{{countConcern}}套</div>
            </div>
            <div
              style="height:30px;width:270px;background:LightCoral;font-weight:bold;font-size:20px;"
            >
              <div style="color:white;float: left;margin-left:10px;">在售总套数</div>
              <div style="color:white;float: right;margin-right:10px;">{{countEffectiveNum}}套</div>
            </div>
          </div>
          <div style="height:50px;margin-top:10px;">
            <el-select
              style="width:270px"
              v-model="queryData.selectCommunity"
              @change="selectedCommunity($event)"
              filterable
              placeholder="请输入您想添加的核心盘"
            >
              <el-option
                style="width:270px"
                v-for="item in list"
                :key="item.id"
                :label="item.communityName"
                :value="item.id"
                :text="item.communityName"
              >
                <span style="float: left">{{item.communityName}}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">
                  <i class="el-icon-plus"></i>
                </span>
              </el-option>
            </el-select>
          </div>

          <div
            v-for="(item,i) in array"
            :key="i"
            class="list"
          >
            <div class="communityName" >{{item.communityName}}</div>
            <div class="effectiveNum">
              <div>在售套数</div>
              <div class="eNum">{{item.effectiveNum}}套</div>
            </div>
            <div class="countNum">
              <div>存量套数</div>
              <div class="cNum">{{item.countConcernCommunity}}套</div>
            </div>
            <div class="concernOff" @click="concernOFF(item.id)" >
              <el-tooltip placement="right">
                <div slot="content">取消关注</div>
                <i class="el-icon-delete"></i>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:top>
      <div class="page-inline budingMarinSet">
        <el-select
          v-model="comId"
          @focus="remoteInput"
          @change="queryCBId()"
          filterable
          remote
          clearable
          placeholder="请输入楼盘名称搜索"
          :remote-method="remoteMethod"
          :loading="loading"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>

        <el-select v-model="cbId" filterable clearable placeholder="请选择楼栋" @change="queryRoomNo()">
          <el-option
            v-for="item in cbIdList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>

        <el-select v-model="roomNo" filterable placeholder="请选择房间号">
          <el-option
            v-for="item in roomNoList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>

        <!-- </div>
        <div style="width:540px">-->
        <el-input
          placeholder="姓名"
          style="width:240px"
          v-model="queryData.Customers"
          @change="querylistByParams()"
          clearable
        >
          <template slot="prepend">业主</template>
        </el-input>

        <el-input
          placeholder="业主电话"
          v-model="queryData.Tel"
          style="margin-left:10px;width:240px"
          @change="querylistByParams()"
          clearable
        >
          <template slot="prepend">电话</template>
        </el-input>
        <!-- </template>
        <template v-slot:>-->
        <el-input
          placeholder="最小值"
          v-model="queryData.minPrice"
          style="width:160px;margin-top:10px"
          @change="querylistByParams()"
          clearable
        >
          <template slot="prepend">价格</template>
        </el-input>
        <el-input
          placeholder="最大值"
          v-model="queryData.maxPrice"
          @change="querylistByParams()"
          style="width:100px"
        ></el-input>

        <el-input
          placeholder="最小值"
          v-model="queryData.minInArea"
          @change="querylistByParams()"
          style="width:160px"
          clearable
        >
          <template slot="prepend">面积</template>
        </el-input>
        <el-input
          placeholder="最大值"
          v-model="queryData.maxInArea"
          @change="querylistByParams()"
          style="margin-left:3px;width:100px"
        ></el-input>

        <span>
          <input type="checkbox" style="margin-left:10px" @click="keySelect()" /> 钥匙
        </span>
        <span>
          <input type="checkbox" style="margin-left:10px;background:#fff" @click="onlySelect()" /> 独家
        </span>
        <span style="color:rgb(90,159,203);cursor:pointer;margin-left:20px"
              @click="remove">清除</span>
        <el-button
          type="primary"
          size="mini"
          style="margin-left:10px"
          @click="querylistByParams()"
        >查询</el-button>
        <el-button style="width:100px;height:30px;border:0" size="mini">
          <moreSelect @moreSelectChange="moreSelectChange" style="height:40px;margin-right:5px;"></moreSelect>
        </el-button>
      </div>
    </template>

    <template #tableColumn>
      <!-- <el-table-column label="房源编号"
                       min-width="13%">
        <template v-slot="scope">
          {{scope.row.HouseNo}}
        </template>
      </el-table-column>
      <el-table-column label="楼盘名称"
                       min-width="12.588%">
        <template v-slot="scope">
          {{scope.row.CommunityName}}
        </template>
      </el-table-column>
      <el-table-column label="售价(万元)"
                       min-width="7.3%">
        <template v-slot="scope">
          {{scope.row.Price}}
        </template>
      </el-table-column>
      <el-table-column label="面积(㎡)"
                       min-width="6.7%">
        <template v-slot="scope">
          {{scope.row.InArea}}
        </template>
      </el-table-column>
      <el-table-column label="单价(元/㎡)"
                       min-width="9%">
        <template v-slot="scope">
          {{Math.round(scope.row.Price*10000/scope.row.InArea)+"元/m²"}}
        </template>
      </el-table-column>
      <el-table-column label="户型"
                       min-width="9.2%">
        <template v-slot="scope">
          {{scope.row.Rooms+"室"+scope.row.hall+"厅"+scope.row.toilet+"卫"}}
        </template>
      </el-table-column>
      <el-table-column label="装修程度"
                       min-width="9.2%">
        <template v-slot="scope">
          {{scope.row.Decoration}}
        </template>
      </el-table-column>
      <el-table-column label="被看次数"
                       min-width="7.3%">
        <template v-slot="scope">
          {{scope.row.Rooms}}
        </template>
      </el-table-column>
      <el-table-column label="房源状态"
                       min-width="7.3%">
        <template v-slot="scope">
          {{scope.row.Rooms}}
        </template>
      </el-table-column>
      <el-table-column label="跟单人"
                       min-width="7.3%">
        <template v-slot="scope">
          {{scope.row.agentPerName}}
        </template>
      </el-table-column>-->
      <template v-for="(item) in tableDataColumn">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :key="item.prop"
          :formatter="item.formart"
          :sort-orders="['ascending', 'descending']"
          :sortable="item.order"
        ></el-table-column>
      </template>
      <el-table-column label="操作" min-width="12.8%">
        <template v-slot="scope">
          <el-button
            type="info"
            size="mini"
            @click="toSale(scope.row.comId,scope.row.cbId,scope.row.bhId,scope.row.communityName,scope.row.buildingName,scope.row.roomNo)"
          >转在售</el-button>
          <el-button type="success" @click="toHouseDetail(scope.row.id)" size="mini">查看</el-button>
        </template>
      </el-table-column>
    </template>
  </list-page>
</template>
<script>
import listPage from "@/components/listPage";
import moreSelect from "@/components/moreSelect";
import getMenuRid from "@/minxi/getMenuRid";
import houseContrast from "@/minxi/houseContrast";
import definitionmenu from "@/components/definitionMenu";
export default {
  mixins: [getMenuRid, houseContrast],
  components: {
    listPage,
    moreSelect,
    definitionmenu
  },
  data() {
    return {
      list: [],
      addComId: [],
      input: "",
      loading: true, //控制表格加载动画提示
      pageJson: {
        currentPage: 1, //当前页码
        total: 9, //总记录数
        pageSize: 10 //每页条数
      },
      state: [
        { value: "1", label: "房源编号1" },
        { value: "2", label: "房源编号2" },
        { value: "3", label: "房源编号3" }
      ],
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
          label: "均价(元/平)",
          width: "130px",
          order: "custom",
          disabled: false,
          default: true,
          format: item => item.unitpaice + "元/㎡"
        },
        //{
         // prop: "decoration",
         // label: "装修程度",
        //  width: "110px",
        //  order: false,
        //  disabled: false,
        //  default: true
       // },
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
          order: "custom",
          disabled: false,
          default: true
        },
        // { prop: '', label: "房源状态", width: '110px', order: false, disabled: false, default: true },//自己补充
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
            item.rooms + "室" + item.hall + "厅" + item.toilet + "卫"
        }
      ],
      tableColumn: [],
      tableData: {},
      moreSelect: [],
      elTabs: {
        activeName: "tab1",
        list: []
      },
      options: [],
      cbIdList: [],
      roomNoList: [],
      option: [],
      array: [],
      countEffectiveNum: "",
      countConcern: "",
      countAll: "",
      comId: "",
      cbId: "",
      roomNo: "",
      queryData: {
        communityName: "",
        isOnly: "",
        keyOwner: ""
      }
    };
  },
  mounted() {
    this.queryVerifyHouseDatas(1, "id", "descending");
    this.queryConcernCount();
    this.queryNotConcernCommunityList();
  },
  methods: {
    remove () {
      let tab = this.tableColumn;
      Object.assign(this.$data, this.$options.data.call(this));
      this.tabColumnChange(tab);
      this.queryVerifyHouseDatas(1, 'id', 'descending');
    },
    sortMethod(e) {
      console.log(e, "eeee排序");
      this.queryVerifyHouseDatas(1, e.prop, e.order);
    },
    tabColumnChange(e) {
      let that = this;
      that.tableColumn = e;
      console.log(this.tableColum);
    },
    toSale(comId, cbId, bhId, communityName, buildingName, roomNo) {
      var that = this;
      that.$router.push({
        path: "/buySellSystem/addHouse",
        query: {
          comId: comId,
          cbId: cbId,
          bhId: bhId,
          communityName: communityName,
          buildingName: buildingName,
          roomNo: roomNo,
          flag: "potentia",
          customerName: null,
          tel: null
        }
      });
    },
    moreSelectChange(e) {
      this.moreSelect = e;
      console.log(Object.keys(this.moreSelect).length);
    },
    keySelect() {
      if (this.queryData.keyOwner != "") {
        this.queryData.keyOwner = "";
      } else {
        this.queryData.keyOwner = "1";
      }
      this.queryVerifyHouseDatas(1, "id", "ascending");
    },
    onlySelect() {
      if (this.queryData.isOnly != "") {
        this.queryData.isOnly = "";
      } else {
        this.queryData.isOnly = "1";
      }
      this.queryVerifyHouseDatas(1, "id", "ascending");
    },
    selectedCommunity(e) {
      this.$confirm("是否确定关注该楼盘?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.addCommunity(e);
          this.querylistByParams();
          this.$message({
            message: "关注成功",
            type: "success"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    concernOFF(id) {
      this.$confirm("是否确定取消关注该楼盘?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteConcern(id);
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deleteConcern(comId) {
      this.$api
        .post({
          url: "/concern_community/concernOFF",
          qs: true,
          data: { comId: comId }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: result.message
            });
            this.queryConcernCount();
            this.querylistByParams();
          } else {
            this.$message({
              type: "success",
              message: result.message
            });
          }
          this.$router.push({ path: "/buySellSystem/concernCommunity" });
        })
        .catch(e => {
          alert("取消关注失败");
          console.log(e);
        });
    },
    querylistByParams() {
      this.queryVerifyHouseDatas(1, "id", "ascending");
    },
    addCommunity(id) {
      let params = { CommunityID: id + "" };
      this.$api
        .post({
          url: "/concern_community/add",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params,
          token: false
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            this.queryConcernCount();
            this.querylistByParams();
            console.log(123);
          } else {
            console.log("添加关注" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          alert("添加关注 失败");
          console.log(e);
        });
    },
    queryVerifyHouseDatas(currentPage, column, type) {
      let params = { limit: this.pageJson.pageSize, page: currentPage - 1 };
      let that = this;
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
        if (this.comId != null && this.comId != "") {
          params.comId = this.comId;
        }
        if (this.cbId != null && this.cbId != "") {
          params.cbId = this.cbId;
        }
        if (this.queryData.isOnly != null && this.queryData.isOnly != "") {
          params.isOnly = this.queryData.isOnly;
        }
        if (this.queryData.keyOwner != null && this.queryData.keyOwner != "") {
          params.keyOwner = this.queryData.keyOwner;
        }
        if (this.roomNo != null && this.roomNo != "") {
          params.roomNo = this.roomNo;
        }
        if (
          this.queryData.Customers != null &&
          this.queryData.Customers != ""
        ) {
          params.customName = this.queryData.Customers;
        }
        if (this.queryData.Tel != null && this.queryData.Tel != "") {
          params.tel = this.queryData.Tel;
        }
        if (this.queryData.minPrice != null && this.queryData.minPrice != "") {
          params.minPrice = this.queryData.minPrice;
        }
        if (this.queryData.maxPrice != null && this.queryData.maxPrice != "") {
          params.maxPrice = this.queryData.maxPrice;
        }
        if (
          this.queryData.minInArea != null &&
          this.queryData.minInArea != ""
        ) {
          params.minInArea = this.queryData.minInArea;
        }
        if (
          this.queryData.maxInArea != null &&
          this.queryData.maxInArea != ""
        ) {
          params.maxInArea = this.queryData.maxInArea;
        }
      }
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
          url: "/myHouse/getMyKernelHouse",
          data: params,
          qs: true
        })
        .then(e => {
          console.log(e.data);
          that.loading = false;
          if (e.data.code == 200) {
            that.pageJson.total = e.data.data.dataCount;
            that.tableData = e.data.data.data;
          } else {
            console.log("查询我的核心盘列表结果：" + e.data.message);
            alert(e.data.message);
          }
        })
        .catch(e => {
          console.log("查询我的核心盘失败");
          console.log(e);
        });
    },
    queryConcernCount() {
      this.$api
        .post({
          url: "/concern_community/CommunityCount",
          qs: true
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            console.log("统计结果" + result.data);
            this.array = result.data;
            var countConcern = 0;
            var countEffectiveNum = 0;
            var countAll = 0;
            for (var j = 0; j < this.array.length; j++) {
              countConcern =
                countConcern + parseInt(this.array[j].countConcernCommunity);
              countEffectiveNum =
                countEffectiveNum + parseInt(this.array[j].effectiveNum);
              countAll++;
            }
            this.countConcern = countConcern;
            this.countAll = countAll;
            this.countEffectiveNum = countEffectiveNum;
            console.log("总数：" + countConcern);
            return this.array.forEach(item => {
              return item.array;
            });
            this.querylist(1);
          } else {
            console.log("查询核心盘统计结果then：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询核心盘统计结果失败catch");
          console.log(e);
        });
    },
    queryNotConcernCommunityList() {
      this.$api
        .post({
          url: "/concern_community/notConcernCommunityList",
          data: { CommunityName: "" },
          qs: true
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            console.log("楼盘列表" + result.data);
            var that = this;
            var arrayCommunity = result.data;
            that.list = arrayCommunity;
            return that.list.forEach(item => {
              return item.list;
            });
          } else {
            console.log("查询未关注楼盘then：" + result.message);
          }
        })
        .catch(e => {
          console.log("查询未关注楼盘失败catch");
          console.log(e);
        });
      // }
    },
    remoteInput() {
      if (this.comId.length == 0) {
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
            url: "/community/concern",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            token: false,
            qs: true,
            data: {
              comId: this.comId
            }
          })
          .then(e => {
            if (e.data.code == 200) {
              that.roomNo = "";
              that.cbId = "";
              this.cbIdList = e.data.data.list;
            }
          });
        console.log("queryCBId!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + this.comId);
      }
      this.querylistByParams();
    },
    queryRoomNo() {
      var that = this;
      this.$api
        .get({
          url: "/mateHouse/queryBuildIngHouses",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comId: this.comId,
            cbId: this.cbId
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.roomNo = "";
            this.roomNoList = e.data.data.list;
          }
        });
      var that = this;
      this.$api
        .get({
          url: "/mateHouse/queryBuildIngHouses",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comId: this.comId,
            cbId: this.cbId
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.roomNo = "";
            this.roomNoList = e.data.data.list;
          }
        });
      this.querylistByParams();
    },
    //跳转房源详情页面
    toHouseDetail(id) {
      console.log(id);
      var that = this;
      that.$router.push({ name: "houseDetails", params: { houseId: id } });
    },

    handleClick() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryVerifyHouseDatas(1, "id", "ascending");
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryVerifyHouseDatas(val, "id", "ascending");
    }
  }
};
</script>
