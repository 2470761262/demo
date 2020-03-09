
<template>
  <list-page :parentData="$data"
             @queryTabData="queryTabData"
             @handleClick="handleClick"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
    <template v-slot:top>
      <!-- 楼盘 -->
      <div class="page-form-inline budingMarinSet">

        <!-- <el-item label="楼盘名称"
                 prop="comId"> -->
          <el-select v-model="data.comId"
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
        <!-- </el-item> -->
        <!-- <el-item label="栋座"
                 prop="cbId"
                 class="page-label-center"> -->
          <el-select v-model="data.cbId"
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
        <!-- </el-item> -->
        <!-- <el-item label="房间号"
                 prop="roomNo"
                 clearable
                 class="page-label-center"> -->
          <el-select v-model="data.roomNo"
                     filterable
                     placeholder="请选择房间号">
            <el-option v-for="item in roomNoList"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value">
            </el-option>
          </el-select>
        <!-- </el-item> -->
        <el-date-picker v-model="data.timeSelect"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
        <el-button type="primary"
                   style="margin-left:10px"
                   size="mini"
                   @click="queryquerySoleHouseParams">查询</el-button>
         <definitionmenu class="menuMarin"
                          :renderList="tableColumnField"
                          :tableColumn="tableData"
                          @change="tabColumnChange"></definitionmenu>
      </div>
    </template>

    <template #tableColumn>
      <template v-for="(item) in tableData" >
        <el-table-column :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                         :key="item.prop">
        </el-table-column>
      </template>
      <el-table-column prop=""
                       label="户型"
                       :formatter="formatHouseType">
      </el-table-column>
      <el-table-column label="操作"
                       fixed="right"
                       key="operation">
        <template v-slot="scope">
          <el-button type="info"
                     size="mini"
                     @click="distributeEvent(item.methosName,scope.row.id)"
                     v-for="(item,index) in isForBut(scope.row.id)"
                     :key="index">{{item.name}}</el-button>
        </template>
      </el-table-column>

    </template>
  </list-page>
</template>
<script>
import listPage from '@/components/listPage';
import getMenuRid from '@/minxi/getMenuRid';
import houseContrast from '@/minxi/houseContrast';
import definitionmenu from '@/components/definitionMenu';

export default {
  mixins: [getMenuRid, houseContrast],
  components: {
    listPage,
    definitionmenu
  },
  data () {

    return {
      loading: false,

      data: {
        comId: '',
        cbId: '',
        roomNo: '',
        timeSelect: ''
      },
      options: [],
      cbIdList: [],
      roomNoList: [],
      pageJson: {
        currentPage: 1, //当前页码
        total: 0, //总记录数
        pageSize: 10 //每页条数
      },
       tableColumnField: [
        { prop: 'houseNo', label: '房源编号', width: '170', order: false, disabled: true, default: true },
        { prop: '1', label: '楼盘名称', order: false, width: '150', disabled: true, default: true },
        { prop: 'price', label: '售价(万元)', width: '120', order: 'custom', disabled: false, default: true },
        { prop: '2', label: '面积(㎡)', width: '120', order: 'custom', disabled: false, default: true },
        { prop: 'unitpaice', label: '单价(元/㎡)', width: '120', order: 'custom', disabled: false, default: true },
        { prop: '3', label: '户型', width: '120', order: false, disabled: false, default: true },
        { prop: '4', label: '被看次数', width: '120', order: 'custom', disabled: false, default: true },
        { prop: '5', label: '未跟进天数', width: '120', order: 'custom', disabled: false, default: true },
        { prop: '6', label: '未被看天数', width: '120', order: 'custom', disabled: false, default: true },
        { prop: '7', label: '录入时间', width: '120', order: 'custom', disabled: false, default: true },
        { prop: '8', label: '杀杀杀', width: '120', order: 'custom', disabled: false, default: false },
        { prop: '9', label: '杀35杀杀', width: '150', order: 'custom', disabled: false, default: false }
      ],
      tableData: []
    }
  },
  mounted () {
    this.queryVerifyHouseDatas(1);
  },
  methods: {
     tabColumnChange (e) {
     
      this.tableData = e;
        console.log(e,"111111111111");
       console.log(this.tableData,"111111111");
      //console.log("this.tableColumn",this.tableColumn);
    },
    queryTabData () {
      console.log(this, '111');
    },
    formatHouseType (row, column) {
      return row.rooms + '室' + row.hall + '厅' + row.toilet + '卫';
    },

    toLook (id) {
      var that = this;
      that.$router.push({ path: '/buySellSystem/houseDetails', query: { "houseId": id } });
    },
    queryquerySoleHouseParams () {
      this.querySoleHouseList(1);
    },
    remoteInput () {

      if (this.data.comId.length == 0) {
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
          comId: that.data.comId,
          page: 1,
          limit: 50
        }
      }).then((e) => {
        if (e.data.code == 200) {
          that.data.roomNo = '';
          that.data.cbId = '';
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
          comId: that.data.comId,
          cbId: that.data.cbId,
          page: 1,
          limit: 50
        }
      }).then((e) => {
        if (e.data.code == 200) {
          that.data.roomNo = '';
          that.roomNoList = e.data.data.list;
        }
      })
    },
    queryVerifyHouseDatas (currentPage) {
      var that = this;
      let params = { "limit": that.pageJson.pageSize, "page": currentPage-1 };
      params.comId = that.data.comId;
      params.cbId = that.data.cbId;
      params.roomNo = that.data.roomNo;
      params.beginTime = that.data.timeSelect[0];
      params.endTime = that.data.timeSelect[1];
      this.$api.get({
        url: '/soleHouse/querySoleHouse',
        data: params,
        token: false
      }).then((e) => {
        console.log(e.data);
        let data = e.data
        if (data.code == 200) {
         that.pageJson.total=data.dataCount;
          that.pageJson.currentPage=data.pageSum;
          that.tableData=data.data;
        } else {
          console.log("查询独家房源列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询独家房源列表失败");
        console.log(e);
      })
    },

    handleClick () {

    },
    queryTabData () {
      this.$emit("queryTabData");
      console.log(this.queryData);
      this.queryquerySoleHouseParams(1);
    },
    handleSizeChange (val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryVerifyHouseDatas(1);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.queryVerifyHouseDatas(val);
    }
  },
}
</script>  