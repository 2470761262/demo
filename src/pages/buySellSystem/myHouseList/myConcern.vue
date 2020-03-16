<style scoped>
.Impression-body {
  width: 300px;
  background-color: white;
  height: 500px;
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
</style>
<template>
  <list-page :parentData="$data"
             @sort-change="sortMethod"
             @handleClick="handleClick"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
    <template v-slot:left>
      <div class="Impression-body">
        <div style="height:30px">
          <el-select v-model="imdataimdata"
                     @change="selectImpression($event)"
                     filterable
                     placeholder="请输入您添加过的房源印象">
            <el-option v-for="item in MyImpressionList"
                       :key="item.id"
                       :label="item.impression"
                       :value="item">
            </el-option>
          </el-select>
        </div>
        <div style="height:30px">
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
                    closable>
              {{item.impression}}
            </el-tag>
          </span>
        </div>
      </div>
    </template>
    <template v-slot:top>
      <div class="page-form-inline ">
        <el-item label="楼盘名称"
                 prop="comId">
          <el-select v-model="queryData.CommunityName"
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
                       :value="item.value">
            </el-option>
          </el-select>
        </el-item>
        <el-item label="栋座"
                 prop="cbId"
                 class="page-label-center">
          <el-select v-model="queryData.BuildingName"
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
          <el-select v-model="queryData.RoomNo"
                     filterable
                     placeholder="请选择房间号">
            <el-option v-for="item in roomNoList"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-item>
        <el-input placeholder="业主姓名"
                  v-model="queryData.Customers"
                  style="margin-left:25px;width:240px"
                  clearable>
          <template slot="prepend">业主姓名</template>
        </el-input>

        <el-input placeholder="业主电话"
                  v-model="queryData.Tel"
                  style="margin-left:30px;width:240px"
                  clearable>
          <template slot="prepend">电话</template>
        </el-input>

        <el-input placeholder="最小值"
                  v-model="queryData.minPrice"
                  style="margin-left:25px;width:160px"
                  clearable>
          <template slot="prepend">价格</template>
        </el-input>
        <el-input placeholder="最大值"
                  v-model="queryData.maxPrice"
                  style="margin-left:10px;width:100px"></el-input>
        <br />
        <el-input placeholder="最小值"
                  v-model="queryData.minInArea"
                  style="width:160px"
                  clearable>
          <template slot="prepend">面积</template>
        </el-input>
        <el-input placeholder="最大值"
                  v-model="queryData.maxInArea"
                  style="margin-left:10px;width:100px"></el-input>

        <template slot="prepend">房源状态</template>
        <el-date-picker v-model="queryData.timeSelect"
                        type="daterange"
                        range-separator="至"
                        value-format="yyyy-MM-dd"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
        <span>
          <el-checkbox style='margin-left:10px'
                       @click="keySelect()" /> 钥匙</span>
        <span>
          <el-checkbox style='margin-left:10px;background:#fff'
                       @click="onlySelect()" /> 独家</span>
        <span style='color:rgb(90,159,203);cursor:pointer;margin-left:20px'
              @click="remove">
          清除
        </span>
        <el-button type="primary"
                   style="margin-left:30px"
                   size="mini"
                   @click="querylistByParams">查询</el-button>
      </div>
    </template>

    <template #tableColumn="">

      <!-- <el-table-column label="房源编号">
        <template v-slot="scope">
          {{scope.row.HouseNo}}
        </template>
      </el-table-column>
      <el-table-column label="楼盘名称">
        <template v-slot="scope">
          {{scope.row.CommunityName}}
        </template>
      </el-table-column>
      <el-table-column label="栋座">
        <template v-slot="scope">
          {{scope.row.BuildingName}}
        </template>
      </el-table-column>
      <el-table-column label="房间号">
        <template v-slot="scope">
          {{scope.row.RoomNo}}
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
      <el-table-column label="被看次数">
        <template v-slot="scope">
          {{scope.row.seenNum}}
        </template>
      </el-table-column>
      <el-table-column label="未被看天数">
        <template v-slot="scope">
          {{scope.row.noSeenDay}}
        </template>
      </el-table-column>
      <el-table-column label="跟单人">
        <template v-slot="scope">
          {{scope.row.AgentPerName}}
        </template>
      </el-table-column> -->
      <template v-for="(item) in tableDataColumn">
        <el-table-column :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                         :key="item.prop"
                         :formatter="item.formart"
                         :sort-orders="['ascending', 'descending']"
                         :sortable="item.order">
        </el-table-column>
      </template>
      <el-table-column label="操作"
                       fixed="right"
                       key="operation">
        <template v-slot="scope">
          <el-button type="info"
                     style='background:green'
                     @click="toHouseDetail(scope.row.id)"
                     size="mini">查看</el-button>
          <div v-if="scope.row.CollectID != null && scope.row.CollectID!= '' ">
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
import listPage from '@/components/listPage';
import getMenuRid from '@/minxi/getMenuRid';
export default {
  mixins: [getMenuRid],
  components: {
    listPage
  },
  data () {
    return {
      optionsList: [],
      cbIdList: [],
      roomNoList: [],
      imtag: false,
      imdataimdata: '',
      addList: [],
      imdata: '',
      showImpression: true,
      impression: '',
      MyImpressionList: [],
      dialogVisible: false,
      value: '',
      input: '',
      addPer: '',
      loading: true, //控制表格加载动画提示
      pageJson: {
        currentPage: 1, //当前页码
        total: 9, //总记录数
        pageSize: 10 //每页条数
      },
      tableDataColumn: [
        { prop: 'HouseNo', label: "房源编号", width: '110px', order: false, disabled: false, default: true },
        { prop: 'CommunityName', label: "楼盘名称", width: '110px', order: false, disabled: false, default: true },
        { prop: 'BuildingName', label: "栋座", width: '110px', order: false, disabled: false, default: true },
        { prop: 'RoomNo', label: "房间号", width: '110px', order: false, disabled: false, default: true },
        { prop: 'Price', label: "售价(万元)", width: '120px', order: 'custom', disabled: false, default: true, formart: item => item.Price + '万元' },
        { prop: 'InArea', label: "面积(m²)", width: '110px', order: 'custom', disabled: false, default: true, formart: item => item.InArea + 'm²' },
        { prop: 'unitpaice', label: "单价(元/平)", width: '130px', order: 'custom', disabled: false, default: true, format: item => item.unitpaice + '元/㎡' },
        { prop: '', label: "被看次数", width: '110px', order: 'custom', disabled: false, default: true },//自己补充
        { prop: '', label: "未被带看天数", width: '130px', order: 'custom', disabled: false, default: true },//自己补充
        { prop: '', label: "未跟进天数", width: '130px', order: 'custom', disabled: false, default: true },//自己补充
        { prop: 'agentPerName', label: "跟单人", width: '110px', order: false, disabled: false, default: true },
        { prop: '', label: "户型", width: '110px', order: false, disabled: false, default: true, formart: item => item.Rooms + '室' + item.hall + '厅' + item.toilet + '卫' },
      ],
      tableData: [],
      elTabs: {
        activeName: "tab1",
        list: [

        ]
      },
      ImpressionList: [],
      options: [{
        value: '选项1',
        label: '全部'
      }, {
        value: '选项2',
        label: '待验真'
      }, {
        value: '选项3',
        label: '客户验真'
      }, {
        value: '选项4',
        label: '店长验真'
      }, {
        value: '选项5',
        label: '验真失败'
      }, {
        value: '选项6',
        label: '已过期'
      }],
      queryData: {
        CommunityName: '',
        BuildingName: '',
        timeSelect: '',
        RoomNo: '',
        cbId: '',
        isOnly: '',
        keyOwner: ''
      },

    }
  },
  mounted () {
    this.querylist(1, 'id', 'ascending');
    this.queryMyImpression();
  },
  methods: {
    sortMethod (e) {
      console.log(e, "eeee排序");
      this.querylist(1, 'id', 'ascending');
    },
    keySelect () {
      if (this.queryData.keyOwner != '') {
        this.queryData.keyOwner = '';
      } else {
        this.queryData.keyOwner = '1';
      }
    },
    onlySelect () {
      if (this.queryData.isOnly != '') {
        this.queryData.isOnly = '';
      } else {
        this.queryData.isOnly = '1';
      }
    },
    handleClose (tag) {
      console.log('删除前：', this.ImpressionList)
      for (let i = 0; i < this.ImpressionList.length; i++) {
        if (this.ImpressionList[i].id == tag) {
          this.ImpressionList.splice(i, 1);
        }
      }
      console.log('删除后：', this.ImpressionList)
      this.querylistByParams();
    },
    remove () {
      Object.assign(this.$data, this.$options.data.call(this));
      this.querylist(1);
    },
    selectImpression (e) {
      let that = this;
      var selecti = 0;
      for (var i = 0; i < that.ImpressionList.length; i++) {
        if (that.ImpressionList[i].id == e.id) {
          selecti = 1;
        }
      }
      if (selecti == 1) {
        that.ImpressionList = this.ImpressionList
      } else {        var addList = [{ id: e.id, impression: e.impression, houseId: e.houseId }];
        that.ImpressionList = this.ImpressionList.concat(addList);      }
      this.querylistByParams();
    },
    remoteMethod (query) {
      var that = this
      if (query !== '') {
        this.loading = true;
        this.$api.get({
          url: "/agentHouse/impression/getHouseImpressionList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            communityName: query
          }
        }).then((e) => {
          console.log(e.data)
          if (e.data.code == 200) {
            that.loading = false;
            that.options = e.data.data.list;
            that.dynamicTags = e.data.data.list;
          }
        })
      } else {
        this.options = [];
      }
    },
    queryHouseImpression () {
      var that = this
      this.$api.get({
        url: "/agentHouse/impression/getHouseImpressionList",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        token: false,
      }).then((e) => {
        console.log(e.data.code);
        if (e.data.code == 200) {
          this.Impression = e.data.data;
          that.ImpressionList = e.data.data;
        }
      })
    },
    ifOFF (id) {
      this.$confirm('是否确定取消关注?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.concernOFF(id);
        this.$message({
          type: 'success',
          message: '操作成功!'
        });
        this.querylist(1);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    }, concernOFF (id) {
      this.$api.post({
        url: "/agent_house/concernHouseOFF/" + id,
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        token: false,
      }).then((e) => { })
    },
    queryMyImpression () {
      var that = this
      var impression = this.imdata;
      this.$api.get({
        url: "/agentHouse/impression/getMyImpressionList?impression=" + impression,
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        token: false,
        qs: true,
        data: {
          MyImpressionList: that.MyImpressionList
        }
      }).then((e) => {
        if (e.data.code == 200) {
          that.MyImpressionList = e.data.data;
        }
      })
    },
    //跳转房源详情页面
    toHouseDetail (id) {
      this.$router.push({ path: "/buySellSystem/houseDetails", query: { houseId: id } });
    },
    //清除
    show (msg) {
      var that = this
      if (msg == 0) {
        this.$confirm('清除当前所有房源印象?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.ImpressionList = []
          this.querylistByParams();
          this.$message({
            type: 'success',
            message: '清除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      } else if (msg == 1) {
        this.$confirm('还原所有房源印象?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.get({
            url: "/agentHouse/impression/getHouseImpressionList",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            token: false,
          }).then((e) => {
            console.log(e.data.code);
            if (e.data.code == 200) {
              that.ImpressionList = e.data.data;
              this.querylistByParams();
            }
          })
          this.$message({
            type: 'success',
            message: '还原成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });

      }    },
    querylistByParams () {
      this.querylist(1, 'id', 'ascending');
    },
    querylist (currentPage, column, type) {
      let params = { limit: this.pageJson.pageSize + '', page: currentPage + '' };
      let that = this;
      if (this.ImpressionList != null && this.ImpressionList != '') {
        that.addList = [];
        for (var j = 0; j < that.ImpressionList.length; j++) {
          var houseid = that.ImpressionList[j].houseId;
          var newList = [houseid];
          that.addList = that.addList.concat(newList);
        }
        params.list = that.addList;
      }
      if (this.queryData.CommunityName != null && this.queryData.CommunityName != '') { params.CommunityName = this.queryData.CommunityName; }
      if (this.queryData.isOnly != null && this.queryData.isOnly != '') { params.isOnly = this.queryData.isOnly; }
      if (this.queryData.keyOwner != null && this.queryData.keyOwner != '') { params.keyOwner = this.queryData.keyOwner; }
      if (this.queryData.BuildingName != null && this.queryData.BuildingName != '') { params.BuildingName = this.queryData.BuildingName; }
      if (this.queryData.RoomNo != null && this.queryData.RoomNo != '') { params.RoomNo = this.queryData.RoomNo; }
      if (this.queryData.Customers != null && this.queryData.Customers != '') { params.Customers = this.queryData.Customers; }
      if (this.queryData.Tel != null && this.queryData.Tel != '') { params.Tel = this.queryData.Tel; }
      if (this.queryData.minPrice != null && this.queryData.minPrice != '') { params.minPrice = this.queryData.minPrice; }
      if (this.queryData.maxPrice != null && this.queryData.maxPrice != '') { params.maxPrice = this.queryData.maxPrice; }
      if (this.queryData.minInArea != null && this.queryData.minInArea != '') { params.minInArea = this.queryData.minInArea; }
      if (this.queryData.maxInArea != null && this.queryData.maxInArea != '') { params.maxInArea = this.queryData.maxInArea; }
      if (this.queryData.timeSelect != null && this.queryData.timeSelect[0] != null && this.queryData.timeSelect[0] != '') { params.minAddTime = this.queryData.timeSelect[0]; }
      if (this.queryData.timeSelect != null && this.queryData.timeSelect[1] != null && this.queryData.timeSelect[1] != '') { params.maxAddTime = this.queryData.timeSelect[1]; }
      this.$api.post({
        url: '/agent_house/myCollectHouseList',
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        data: params,
        token: false
      }).then((e) => {
        console.log(e.data);
        let result = e.data;
        that.loading = false;
        if (result.code == 200) {
          that.pageJson.total = result.data.totalCount;
          that.pageJson.currentPage = result.data.currPage;
          that.tableData = result.data.list;
        } else {
          console.log("查询我的关注列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询我的关注失败");
        console.log(e);
      })
    },
    remoteInput () {

      if (this.queryData.CommunityName.length == 0) {
        this.remoteMethod();
      }
    },
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
            that.optionsList = e.data.data.list;
          }
        })
      } else {
        this.optionsList = [];
      }
      console.log("remoteMethod!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + this.comId);
    },
    queryCBId () {
      var that = this
      this.$api.get({
        url: "/mateHouse/queryComBuilding",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        token: false,
        qs: true,
        data: {
          comId: this.queryData.CommunityName
        }
      }).then((e) => {
        if (e.data.code == 200) {
          that.queryData.RoomNo = '';
          that.queryData.BuildingName = '';
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
          comId: this.queryData.CommunityName,
          cbId: this.queryData.BuildingName
        }
      }).then((e) => {
        if (e.data.code == 200) {
          that.queryData.RoomNo = '';
          this.roomNoList = e.data.data.list;
        }
      })
    },
    handleClick () {

    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.querylist(1, 'id', 'ascending');
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.querylist(val, 'id', 'ascending');
    },
  },
}
</script>