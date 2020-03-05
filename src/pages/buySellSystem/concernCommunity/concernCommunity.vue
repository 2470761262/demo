<template>
  <list-page :parentData="$data"
             @handleClick="handleClick"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
    <template v-slot:left>
      <div style="width:300px;height:560px;background:white;">
        <div style="margin-left:10px;margin-top:px;background:white;">
          <div style="height:20px;"></div>
          <h2>核心盘总览</h2>
          <div>
            <div style="margin-top:10px;height:30px;width:270px;background:RoyalBlue;font-weight:bold;font-size:20px;">
              <div style="color:white;float: left;margin-left:10px;">我的核心盘 </div>
              <div style="color:white;float: right;margin-right:10px;"> {{countAll}}套 </div>
            </div>
            <div style="height:30px;width:270px;background:DarkOrange;font-weight:bold;font-size:20px;">
              <div style="color:white;float: left;margin-left:10px;">存量房总套数 </div>
              <div style="color:white;float: right;margin-right:10px;">{{countConcern}}套 </div>
            </div>
            <div style="height:30px;width:270px;background:LightCoral;font-weight:bold;font-size:20px;">
              <div style="color:white;float: left;margin-left:10px;">在售总套数 </div>
              <div style="color:white;float: right;margin-right:10px;">{{countEffectiveNum}}套 </div>
            </div>

          </div>
            <div style="height:50px;margin-top:10px;">
          <el-select style="width:270px" v-model="queryData.selectCommunity" @change="selectedCommunity($event)" 
            filterable placeholder="请输入您想添加的核心盘">
             <el-option style="width:270px" v-for="item in list"
                       :key="item.id"
                       :label="item.communityName"
                       :value="item.id"
                       :text="item.communityName">
                       <span style="float: left">{{item.communityName}}</span>
      <span style="float: right; color: #8492a6; font-size: 13px"><i class="el-icon-plus"></i></span>
               </el-option>
            </el-select>
      </div>

         
          <div v-for="(item,i) in array"
               :key="i"
               style="height:40px;width:270px;background:CornflowerBlue;font-weight:bold;margin-top:10px;">
            <div style="color:white;float: left;margin-left:5px;font-size:15px;">{{item.communityName}}</div>
            <div style="color:white;float:right;margin-top:5px;font-size:15px;cursor:pointer;"
                 @click="concernOFF(item.id)">
              <el-tooltip placement="right">
                <div slot="content">取消关注</div>
                <i class="el-icon-delete"></i>
              </el-tooltip>
            </div>
            <div style="color:white;float: right;margin-right:15px;font-size:10px;">
              <div>存量套数</div>
              <div>{{item.countConcernCommunity}}套</div>
            </div>

            <div style="color:white;float: right;margin-right:15px;font-size:10px;">
              <div>在售套数</div>
              <div>{{item.effectiveNum}}套</div>
            </div>
          </div>

        </div>

      </div>
    </template>
    <template v-slot:top>

      <div class="page-inline budingMarinSet">

        <el-item label="楼盘名称"
                 prop="comId">
          <el-select v-model="comId"
                     @focus="remoteInput"
                     @change="queryCBId()"
                     filterable
                     remote
                     clearable
                     placeholder="请输入楼盘名称搜索"
                     :remote-method="remoteMethod"
                     :loading="loading">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-item>
        <el-item label="栋座"
                 prop="cbId"
                 class="page-label-center">
          <el-select v-model="cbId"
                     filterable
                     clearable
                     placeholder="请选择楼栋"
                     @change="queryRoomNo()">
            <el-option v-for="item in cbIdList"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-item>
        <el-item label="房间号"
                 prop="roomNo"
                 clearable
                 class="page-label-center">
          <el-select v-model="roomNo"
                     filterable
                     placeholder="请选择房间号">
            <el-option v-for="item in roomNoList"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-item>
      </div>
      <el-input placeholder="姓名"
                style="width:240px"
                v-model="queryData.Customers"
                clearable>
        <template slot="prepend">业主</template>
      </el-input>

      <el-input placeholder="业主电话"
                v-model="queryData.Tel"
                style="margin-left:10px;width:240px"
                clearable>
        <template slot="prepend">电话</template>
      </el-input>
      <!-- </template>
      <template v-slot:> -->
      <el-input placeholder="最小值"
                v-model="queryData.minPrice"
                style="width:160px"
                clearable>
        <template slot="prepend">价格</template>
      </el-input>
      <el-input placeholder="最大值"
                v-model="queryData.maxPrice"
                style="width:100px"></el-input>
                
      <el-input placeholder="最小值"
                v-model="queryData.minInArea"
                style="width:160px"
                clearable>
        <template slot="prepend">面积</template>
      </el-input>
      <el-input placeholder="最大值"
                v-model="queryData.maxInArea"
                style="margin-left:3px;width:100px"></el-input>

     
      <el-button type="primary"
                 style="margin-left:30px"
                 size="mini"
                 @click="querylistByParams()">查询</el-button>

    </template>

    <template #tableColumn="">

      <el-table-column label="房源编号">
        <template v-slot="scope">
          {{scope.row.HouseNo}}
        </template>
      </el-table-column>
      <el-table-column label="楼盘名称">
        <template v-slot="scope">
          {{scope.row.CommunityName}}
        </template>
      </el-table-column>
      <el-table-column label="售价(万元)">
        <template v-slot="scope">
          {{scope.row.Price}}
        </template>
      </el-table-column>
      <el-table-column label="面积(㎡)">
        <template v-slot="scope">
          {{scope.row.InArea}}
        </template>
      </el-table-column>
      <el-table-column label="单价(元/㎡)">
        <template v-slot="scope">
          {{Math.round(scope.row.Price*10000/scope.row.InArea)+"元/m²"}}
        </template>
      </el-table-column>
      <el-table-column label="户型">
        <template v-slot="scope">
          {{scope.row.Rooms+"室"+scope.row.hall+"厅"+scope.row.toilet+"卫"}}
        </template>
      </el-table-column>
      <el-table-column label="装修程度">
        <template v-slot="scope">
          {{scope.row.Decoration}}
        </template>
      </el-table-column>
      <el-table-column label="跟单人">
        <template v-slot="scope">
          {{scope.row.agentPerName}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="info"
          @click="toHouseDetail(scope.row.id)"
          size="mini">查看</el-button>
          </template>
      </el-table-column>
    </template>
  </list-page>
</template>
<script>
import listPage from '@/components/listPage';
import getMenuRid from '@/minxi/getMenuRid';
export default {
  mixins: [getMenuRid],
  components: {
    listPage
  },
  data () {

    return {
      list: [],
      addComId :[],
      input: '',
      loading: true, //控制表格加载动画提示
      pageJson: {
        currentPage: 1, //当前页码
        total: 9, //总记录数
        pageSize: 10 //每页条数
      },
      tableDataColumn: [
        { prop: 'HouseNo', label: "房源编号" },
        { prop: 'CommunityName', label: "楼盘名称" },
        { prop: 'Price', label: "售价(万元)" },
        { prop: 'InArea', label: "面积(m²)" },
        { prop: 'PropertyFee', label: "均价(元/平)" },
        { prop: 'hall', label: "户型" },
        { prop: 'Decoration', label: "装修程度" },
        { prop: 'AgentPer', label: "跟单人" },
        { prop: 'AddTime', label: "录入时间" }
      ],
      tableData: [],
      elTabs: {
        activeName: "tab1",
        list: [

        ]
      },
      options: [],
      cbIdList: [],
      roomNoList: [],
      option: [],
      array: [],
      countEffectiveNum: '',
      countConcern: '',
      countAll: '',
      comId: '',
      cbId: '',
      roomNo: '',
      queryData: {
        communityName: ''
      }
    }
  },
  mounted () {
    this.querylist(1);
    this.queryConcernCount();
    this.queryNotConcernCommunityList();

  },
  methods: {
    selectedCommunity(e){
      // let that = this;
      //  that.addComId = [{id:e,communityName:"东苑小区"}]
      // console.log("aaaaaaaaaaaaaa"+this.queryData.selectCommunity)
      this.$confirm('是否确定关注该楼盘?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         this.addCommunity(e);
         this.querylistByParams ();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
      
    },
    concernOFF (id) {
      this.$confirm('是否确定取消关注该楼盘?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteConcern(id);
        this.querylistByParams ();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    deleteConcern (id) {
      this.$api.post({
        url: '/concern_community/concernOFF/' + id,
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        token: false
      }).then((e) => {
        let result = e.data;
        if (result.code == 200) {
          this.$message({
            type: 'success',
            message: result.message
          });
        } else {
          this.$message({
            type: 'success',
            message: result.message
          });
        }
        this.$router.push({ path: "/buySellSystem/concernCommunity" });
      }).catch((e) => {
        alert("取消关注失败");
        console.log(e);
      })
    },
    querylistByParams () {
      this.querylist(1);
    },
    addCommunity (id) {
      let params = { CommunityID: id + '' };
      this.$api.post({
        url: '/concern_community/add',
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        data: params,
        token: false
      }).then((e) => {
        let result = e.data;
        if (result.code == 200) {
          alert(result.message);
        } else {
          console.log("添加关注" + result.message);
          alert(result.message);
        }

      }).catch((e) => {
        alert("添加关注失败");
        console.log(e);
      })
      this.$router.push({ path: "/buySellSystem/concernCommunity" });
    },
    querylist (currentPage) {
      let params = { limit: this.pageJson.pageSize + '', page: currentPage + '' };
      let that = this;

      if (this.comId != null && this.comId != '') { params.Comid = this.comId; }
      if (this.cbId != null && this.cbId != '') { params.CBid = this.cbId; }
      if (this.roomNo != null && this.roomNo != '') { params.BHID = this.roomNo; }
      if (this.queryData.Customers != null && this.queryData.Customers != '') { params.Customers = this.queryData.Customers; }
      if (this.queryData.Tel != null && this.queryData.Tel != '') { params.Tel = this.queryData.Tel; }
      if (this.queryData.minPrice != null && this.queryData.minPrice != '') { params.minPrice = this.queryData.minPrice; }
      if (this.queryData.maxPrice != null && this.queryData.maxPrice != '') { params.maxPrice = this.queryData.maxPrice; }
      if (this.queryData.minInArea != null && this.queryData.minInArea != '') { params.minInArea = this.queryData.minInArea; }
      if (this.queryData.maxInArea != null && this.queryData.maxInArea != '') { params.maxInArea = this.queryData.maxInArea; }
      this.$api.post({
        url: '/concern_community/list',
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        data: params,
        token: false
      }).then((e) => {
        console.log(e.data);
        let result = e.data;
        that.loading = false;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);
          that.pageJson.total = result.data.totalCount;
          that.pageJson.currentPage = result.data.currPage;
          that.tableData = result.data.list;
        } else {
          console.log("查询我的核心盘列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询我的核心盘失败");
        console.log(e);
      })
    },
    queryConcernCount () {
      this.$api.post({
        url: '/concern_community/CommunityCount',
        token: false
      }).then((e) => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          console.log("统计结果" + result.data);
          var array = result.data;
          this.array = array;
          var countConcern = 0;
          var countEffectiveNum = 0;
          var countAll = 0;
          for (var j = 0; j < array.length; j++) {
            countConcern = countConcern + parseInt(array[j].countConcernCommunity);
            countEffectiveNum = countEffectiveNum + parseInt(array[j].effectiveNum);
            countAll++;
          }
          this.countConcern = countConcern;
          this.countAll = countAll;
          this.countEffectiveNum = countEffectiveNum;
          console.log("总数：" + countConcern);
          return array.forEach(item => {
            return item.array;
          });

        } else {
          console.log("查询核心盘统计结果then：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询核心盘统计结果失败catch");
        console.log(e);
      })
    },
    queryNotConcernCommunityList () {
      var communityName = this.queryData.selectCommunity;
      // if(communityName!=null&&communityName!=''&&communityName!='undefined'){
        this.hasClassA
      this.$api.post({
        url: '/concern_community/notConcernCommunityList?CommunityName=' + communityName,
        token: false
      }).then((e) => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          console.log("楼盘列表" + result.data);
          var that = this;
          var arrayCommunity = result.data;
          this.list = arrayCommunity;
          return list.forEach(item => {
            return item.list;
          });
        } else {
          console.log("查询未关注楼盘then：" + result.message);
        }
      }).catch((e) => {
        console.log("查询未关注楼盘失败catch");
        console.log(e);
      })
      // }
    },
    remoteInput () {   if (this.comId.length == 0) {this.remoteMethod()}    },
    remoteMethod (query) {
      var that = this
      if (query !== '') {
        console.log(query);
        this.loading = true;
        this.$api.get({
          url: "/mateHouse/queryCommunity",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
             page: 1,
             limit: 50,
             communityName: query
          }
        }).then((e) => {
          console.log(e.data)
          if (e.data.code == 200) {
            
            that.loading = false;
            that.options = e.data.data.list;
          }
        })
      } else {
        this.options = [];
      }
    },
    queryCBId () {
      var that = this
      this.$api.get({
        url: "/mateHouse/queryComBuilding",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        token: false,
        qs: true,
        data: {
          comId: this.comId
        }
      }).then((e) => {
        if (e.data.code == 200) {
          that.roomNo='';
            that.cbId='';
          this.cbIdList = e.data.data.list;
        }
      })
      console.log("queryCBId!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + this.comId);
    },
    queryRoomNo () {
      var that = this
      this.$api.get({
        url: "/mateHouse/queryBuildIngHouses",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        token: false,
        qs: true,
        data: {
          comId: this.comId,
          cbId: this.cbId
        }
      }).then((e) => {
        if (e.data.code == 200) {
          that.roomNo='';
          this.roomNoList = e.data.data.list;
        }
      })
    },
 //跳转房源详情页面
    toHouseDetail (id) {
      this.$router.push({ path: "/buySellSystem/houseDetails", query: { houseId: id } });
    },

    handleClick () {

    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.querylist(1);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.querylist(val);
    },
  },
}
</script>