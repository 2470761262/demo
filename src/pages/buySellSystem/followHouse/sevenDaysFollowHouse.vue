<template>
  <list-page :parentData="$data"
             @handleClick="handleClick"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
    <template v-slot:top>
      <div class="page-form-inline ">
        <el-input placeholder="楼盘名称"
                  style="width:280px"
                  @change="querylistByParams()"
                  v-model="queryData.CommunityName">
          <template slot="prepend">楼盘名称 </template>
        </el-input>

        <el-input placeholder="开始日期"
                  @change="querylistByParams()"
                  style="margin-left:30px;width:240px"
                  v-model="queryData.minFollowEndTime"
                  clearable>
          <template slot="prepend">最后带看时间</template>
        </el-input>
        <el-input placeholder="结束时期"
                  @change="querylistByParams()"
                  style="margin-left:30px;width:240px"
                  v-model="queryData.maxFollowEndTime "
                  clearable> </el-input>

        <el-input placeholder="姓名"
                  style="margin-left:30px;width:240px"
                  @change="querylistByParams()"
                  v-model="queryData.Customers"
                  clearable>
          <template slot="prepend">业主</template>
        </el-input>

        <el-input placeholder="业主电话"
                  v-model="queryData.Tel "
                  @change="querylistByParams()"
                  style="margin-left:30px;width:240px"
                  clearable>
          <template slot="prepend">电话</template>
        </el-input>

        <el-select v-model="queryData.houseStates"
                   style="margin-left:10px"
                   @change="querylistByParams()"
                   placeholder="请选择"
                   clearable>
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <template slot="prepend">房源类型</template>
        <el-button type="primary"
                   style="margin-left:30px"
                   @change="querylistByParams()"
                   size="mini"
                   @click="querylistByParams()">查询</el-button>
      </div>
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
      <el-table-column label="最后带看时间">
        <template v-slot="scope">
          {{scope.row.FollowEndTime}}
        </template>
      </el-table-column>
      <el-table-column prop="operation"
                       label="操作"
                       fixed="right"
                       key={{scope.row.id}}>
        <template v-slot="scope">
          <!-- <div v-if="scope.row.operation!=''"> -->
          <el-button type="info"
                     size="mini"
                     @click="distributeEvent(item.methosName,scope.row.id)"
                     v-for="(item,index) in isForBut(2)"
                     :key="index">{{item.name}}</el-button>
          <!-- </div> -->

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
        { prop: 'FollowEndTime', label: "最后带看时间" }
      ],
      tableData: [],
      elTabs: {
        activeName: "tab1",
        list: [

        ]
      },
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
        communityName: ''
      }
    }
  },
  mounted () {
    this.querylist(1);
    this.queryConcernCount();
  },
  methods: {
    querylistByParams () {
      this.querylist(1);
    },
    addCommunity (comid) {
      console.log(comid);
    },
    querylist (currentPage) {
      let params = { limit: this.pageJson.pageSize + '', page: currentPage + '' };
      let that = this;
      if (this.queryData.CommunityName != null) { params.CommunityName = this.queryData.CommunityName; }
      if (this.queryData.Customers != null) { params.Customers = this.queryData.Customers; }
      if (this.queryData.Tel != null) { params.Tel = this.queryData.Tel; }
      if (this.queryData.minFollowEndTime != null) { params.minFollowEndTime = this.queryData.minFollowEndTime; }
      if (this.queryData.maxFollowEndTime != null) { params.maxFollowEndTime = this.queryData.maxFollowEndTime; }
      this.$api.post({
        url: '/agent_house/listFollowHouse',
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
        } else {
          console.log("查询核心盘统计结果then：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询核心盘统计结果失败catch");
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
        return item.isType.includes(type)
      })
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