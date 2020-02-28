
<template>
  <list-page :parentData="$data"
             @queryTabData="queryTabData"
             @handleClick="handleClick"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
    <template v-slot:top>
      <!-- 楼盘 -->
      <div class="page-form-inline budingMarinSet">
        
          <el-select v-model="data.comId"
                     @change="queryCBId()"
                     filterable
                     remote
                     placeholder="请输入楼盘进行搜索"
                     :remote-method="remoteMethod"
                     :loading="loading">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value">
            </el-option>
          </el-select>
         
      
          <el-select v-model="data.cbId"
                     filterable
                     placeholder="请选择楼栋"
                     @change="queryRoomNo()">
            <el-option v-for="item in cbIdList"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value">
            </el-option>
          </el-select>
       
       
          <el-select v-model="data.roomNo"
                     filterable
                     placeholder="请选择房间号">
            <el-option v-for="item in roomNoList"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="data.type" placeholder="请选择" clearable> 
                <el-option
                v-for="item in option"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-input placeholder="业主姓名" v-model="data.customName"  style="margin-left:30px;width:240px" clearable/>
           <el-input placeholder="业主电话" v-model="data.tel"  style="margin-left:30px;width:240px" clearable/>
       <el-button type="primary"
                     style="margin-left:10px"
                     size="mini"
                     @click="queryPotentialHouseParams">查询</el-button>
      </div>
    </template>
   




    <template #tableColumn="cell">
      <template v-for="(item) in cell.tableData">
        <el-table-column :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                         :key="item.prop">
        </el-table-column>
      </template>

     <el-table-column 
                       label="操作"
                       fixed="right"
                       key="operation">
        <template v-slot="scope">

            <el-button type="info"
                       size="mini"
                       @click="toLook(scope.row.id)"
                       v-if="scope.row.type!==1"
                       >查看</el-button>

             <el-button type="info"
                       size="mini"
                       @click="toSale(scope.row.id)"
                       >转在售</el-button>
        </template>
       
      </el-table-column>


    </template>
  </list-page>
</template>
<script>
import listPage from '@/components/listPage';
export default {
  components: {
    listPage
  },
  data () {
    
    return {
      loading: false,
       option: [
         {
          value: 'build',
          label: '楼盘数据'
        }, {
          value: 'trade',
          label: '成交数据'
        }],
      data: {
        comId: '',
        cbId: '',
        roomNo: '',
        customName:'',
        tel:'',
        type:''
      },
      options: [],
      cbIdList: [],
      roomNoList: [],
      pageJson: {
        currentPage: 1, //当前页码
        total: 0, //总记录数
        pageSize: 10 //每页条数
      },
      tableDataColumn: [
        { prop: 'communityName', label: "小区名称" },
        { prop: 'buildingName', label: "楼栋号" },
        { prop: 'roomNo', label: "房间号" },
        { prop: 'inArea', label: "面积(m²)"},
        { prop: 'customers', label: "业主" },
        { prop: 'tel', label: "业主电话"}
       
      ],
      tableData: [{
        // house: '龙腾花园-16栋-604室',
        // priceArea: '234万/100平',
        // type: '3室2厅1卫',
        // levae: '精装修',
        // economicPro: '周杰伦',

        // validateType: '通过',
        // cutPro: '周杰伦1',
        // addTime: '2019-01-01 18:00:00',
        // cellType: '号码异常',
        // operation: '3',
      }],
    }
  },
  mounted(){
     this.data.type='build';
    this.queryPotentialHouse(1);
  },
  methods: {
    queryTabData () {
      console.log(this, '111');
    },
    toLook(id){
        console.log(id);
         var that = this;
        that.$router.push({ name: 'houseDetails', params: { "houseId": id } });
    },
    toSale(id){},
    queryPotentialHouseParams(){
        this.queryPotentialHouse(1);
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
          comId: that.data.comId
        }
      }).then((e) => {
        if (e.data.code == 200) {
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
          cbId: that.data.cbId
        }
      }).then((e) => {
        if (e.data.code == 200) {
          that.roomNoList = e.data.data.list;
        }
      })
    },
  queryPotentialHouse(currentPage){
    var that =this;
   let params={"limit":that.pageJson.pageSize,"page":currentPage};
 
        params.comId=that.data.comId;
        params.cbId=that.data.cbId;
        params.roomNo=that.data.roomNo;
        params.customName=that.data.customName;
        params.tel=that.data.tel;
        params.type=that.data.type;
     console.log(params);
    this.$api.get({
        url: '/houseResource/potentialHouseList',
        data: params,       
        token: false
      }).then((e) => {
        console.log(e.data);
        let data=e.data
        if (data.code == 200) {
          that.pageJson.total=data.data.totalCount;
          that.pageJson.currentPage=data.data.currPage;
          that.tableData=data.data.list;
        } else {
          console.log("查询潜在出售列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询潜在出售列表失败");
        console.log(e);
      })
  },
    isForBut (type) {
      let array = [
        { name: '查看', isType: '3', methosName: '' }
      ]
      return array.filter((item) => {
        return item.isType.includes(type)
      })
    },
    handleClick () {

    },
    queryTabData () {
      this.$emit("queryTabData");
      console.log(this.queryData);
      this.querySaleNotTracking(2);
      this.queryPotentialHouseParams(1);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.queryPotentialHouse(val);
    },
    handleSizeChange (val) {
      console.log(`每1页 ${val} 条`);
       this.pageJson.pageSize = val;
      this.queryPotentialHouse(1);
    }
  },
}
</script>  