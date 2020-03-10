<template>
  <list-page :parentData="$data"
             @handleClick="handleClick"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
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
            <el-option v-for="item in comList"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-item>

        <el-item label="栋座"
                 prop="cbId"
                 class="page-label-center">
          <el-select v-model="queryData.cbId"
                     filterable
                     clearable
                     placeholder="请选择楼栋"
                     @change="queryRoomNo()">
            <el-option v-for="item in cbIdList"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value">
              <!--如果接口是模糊搜索，value改成item.name就行 -->
            </el-option>
          </el-select>
        </el-item>
        <el-item label="房间号"
                 prop="roomNo"
                 clearable
                 class="page-label-center">
          <el-select v-model="queryData.roomNo"
                     filterable
                     placeholder="请选择房间号">
            <el-option v-for="item in roomNoList"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-item>

        <el-select v-model="value"
                   filterable
                   placeholder="请选择">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <template slot="prepend">房源状态</template>
        <el-date-picker v-model="queryData.timeSelect"
                        type="daterange"
                        range-separator="至"
                        value-format="yyyy-MM-dd"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
        <span style='color:rgb(90,159,203);cursor:pointer;margin-left:20px'>
          清除
        </span>
        <div style="margin-top:15px">
          <span style="margin-left:30px">
            审核项目：
          </span>
          <el-select filterable
                     placeholder="请选择">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <span style="margin-left:30px">
            审核类型：
          </span>
          <el-select filterable
                     placeholder="请选择">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <span style="margin-left:30px">
            审核状态：
          </span>
          <el-select filterable
                     placeholder="请选择">
            <el-option v-for="item in state"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary"
                     style="margin-left:30px"
                     size="mini"
                     @click="querylistByParams">查询</el-button>
        </div>

      </div>
    </template>

    <template #tableColumn="">
      <el-table-column label="楼盘名称">
        <template v-slot="scope">
          {{scope.row.communityName}}
        </template>
      </el-table-column>
      <el-table-column label="房源坐落">
        <template v-slot="scope">
          {{scope.row.buildingName+"栋-"+scope.row.roomNo+"室"}}
        </template>
      </el-table-column>
      <el-table-column label="审核项目">
        <template v-slot="scope">
          {{scope.row.TypeString}}
        </template>
      </el-table-column>

      <el-table-column label="审核类型">
        <template v-slot="scope">
          {{scope.row.TypeString}}
        </template>
      </el-table-column>
      <el-table-column label="提交人">
        <template v-slot="scope">
          {{scope.row.AddPerString}}
        </template>
      </el-table-column>
      <el-table-column label="提交时间">
        <template v-slot="scope">
          {{scope.row.AddTime}}
        </template>
      </el-table-column>
      <el-table-column label="审核状态">
        <template v-slot="scope">
          {{scope.row.TagString}}
        </template>
      </el-table-column>
      <el-table-column label="备注说明">
        <template v-slot="scope">
          {{scope.row.CheckMemo}}
        </template>
      </el-table-column>
      <el-table-column label="附件">
        <template v-slot="scope">
          {{scope.row.sad}}
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       fixed="right"
                       key="operation">
        <template v-slot="scope">
          <el-button type="info"
                     @click="toHouseDetail(scope.row.id)"
                     size="mini">审核</el-button>
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
      cbIdList: '',
      roomNoList: '',
      comList: '',
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
      state: [{
        value: '0',
        label: '待审核'
      }, {
        value: '1',
        label: '已审核'
      }, {
        value: '-1',
        label: '未通过'
      },],
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
        timeSelect: '',
        roomNo: '',
        cbId: '',
      },

    }
  },
  mounted () {
    this.querylist(1);
  },
  methods: {
    remoteInput () {

      if (this.comId.length == 0) {
        this.remoteMethod();
      }
    },
    remoteMethod (query) {
      var that = this
      if (query !== '') {
        this.loading = true;

        this.$api.get({
          url: "/mateHouse/queryCommunity",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            communityName: query,
            page: 1,
            limit: 50
          }
        }).then((e) => {
          console.log(e.data.code)
          if (e.data.code == 200) {

            that.loading = false;
            that.comList = e.data.data.list;

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
          comId: that.queryData.CommunityName,
          page: 1,
          limit: 50
        }
      }).then((e) => {
        if (e.data.code == 200) {
          that.queryData.roomNo = '';
          that.queryData.cbId = '';
          that.cbIdList = e.data.data.list;
        }
      })
    },
    queryRoomNo () {
      var that = this
      this.$api.get({
        url: "/mateHouse/queryBuildIngHouses",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        token: false,
        qs: true,
        data: {
          comId: that.queryData.comId,
          cbId: that.queryData.cbId,
          page: 1,
          limit: 50
        }
      }).then((e) => {
        if (e.data.code == 200) {
          that.queryData.roomNo = '';
          that.roomNoList = e.data.data.list;
        }
      })
    },
    //跳转房源详情页面
    toHouseDetail (id) {
      this.$router.push({ name: "houseDetails", params: { houseId: id } });
    },
    querylistByParams () {
      console.log(this.queryData.timeSelect);
      this.querylist(1);
    },
    querylist (currentPage) {
      let params = { limit: this.pageJson.pageSize + '', page: currentPage + '', listType: 'myAgent' };
      let that = this;
      if (this.queryData.CommunityName != null && this.queryData.CommunityName != '') { params.CommunityName = this.queryData.CommunityName; }
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
        url: '/agentHouse/propertyCheck/myHousePropertyCheckList',
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
          console.log("查询我的跟单列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询我的跟单失败");
        console.log(e);
      })
    },
    distributeEvent (e, id) {
      this[e](id);
    },
    isForBut (type) {
      let array = [
        { name: '查看', isType: '1,2,3', methosName: '' }
      ]
      return array.filter((item) => {
        this.item.push("12222222222222222222222222222222222")
        return item.isType.includes(type)
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
            that.comList = e.data.data.list;
          }
        })
      } else {
        this.optionsList = [];
      }
      console.log("remoteMethod!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + this.comId);
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