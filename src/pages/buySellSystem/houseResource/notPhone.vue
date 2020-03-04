
<template>
  <list-page :parentData="$data"
             @queryTabData="queryTabData"
             @handleClick="handleClick"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
    <template v-slot:top>
      <!-- 楼盘 -->
      <div class="page-form-inline budingMarinSet">
        
           <el-item label="楼盘名称"
                 prop="comId">
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
        </el-item>
        <el-item label="栋座"
                 prop="cbId"
                 class="page-label-center">
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
        </el-item>
        <el-item label="房间号"
                 prop="roomNo"
                 clearable
                 class="page-label-center">
          <el-select v-model="data.roomNo"
                     filterable
                     placeholder="请选择房间号">
            <el-option v-for="item in roomNoList"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-item>

            <el-input placeholder="最小面积" v-model="data.minInArea"  style="margin-left:30px;width:120px" clearable/>------
             <el-input placeholder="最大面积" v-model="data.maxInArea"  style="width:120px" clearable/>
           <el-date-picker
              v-model="data.timeSelect"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>
       <el-button type="primary"
                     style="margin-left:10px"
                     size="mini"
                     @click="queryNotPhoneParams">查询</el-button>
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
        prop=""
        label="户型"
        :formatter="formatHouseType">
      </el-table-column>
       <el-table-column
        prop=""
        label="朝向"
        :formatter="formatOrientation">
      </el-table-column>
     <el-table-column 
                       label="操作"
                       fixed="right"
                       key="operation">
        <template v-slot="scope">
            <el-button type="info"
                       size="mini"
                       @click="addPhone(scope.row.bhid)"
                       >录入号码</el-button>
                        <el-button type="info"
                       size="mini"
                       @click="toSale(scope.row.id,scope.row.comId,scope.row.cbId,scope.row.bhid)"
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
      
      data: {
        comId: '',
        cbId: '',
        roomNo: '',
        timeSelect: '',
        customName:'',
        tel:'',
        minInArea:'',
        maxInArea:'',
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
    this.queryNotPhone(1);
  },
  methods: {
    queryTabData () {
      console.log(this, '111');
    },
     formatHouseType(row, column){
       if(row.Rooms!=null && row.Rooms!=''){
          return row.Rooms+'室';
       }else{
          return '---';
       }
     
    },

formatOrientation(row, column){
   if(row.orientation!=null && row.orientation!=''){
          return row.orientation;
       }else{
          return '---';
       }
},
    addPhone(id){
        console.log(id)
         var that = this;
        that.$router.push({ path: '/buySellSystem/updatePhone', query: { "id": id } });
    },
    toSale(id,comId,cbId,bhId){
      var that = this
        this.$api.get({
          url: "/houseResource/turnSale",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            id: id,
            type: 2,
            comId:comId,
            cbId:cbId,
            bhId:bhId
          }
        }).then((e) => {
          console.log(e.data)
          if (e.data.code == 200) {
              that.$router.push({ path: '/buySellSystem/addHouse', query: { "id": e.data.code.message } });
          }else{
             alert(e.data.message);
          }
        })
      },

    queryNotPhoneParams(){
        this.queryNotPhone(1);
    },
    remoteInput () {
   
      if (this.data.comId.length==0) {
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
          that.roomNo='';
            that.cbId='';
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
           that.roomNo='';
          that.roomNoList = e.data.data.list;
        }
      })
    },
  queryNotPhone(currentPage){
    var that =this;
   let params={"limit":that.pageJson.pageSize,"page":currentPage-1};
 
        params.comId=that.data.comId;
        params.cbId=that.data.cbId;
        params.roomNo=that.data.roomNo;
        params.beginTime=that.data.timeSelect[0];
        params.endTime=that.data.timeSelect[1];
        params.customName=that.data.customName;
        params.tel=that.data.tel;
        params.minInArea=that.data.minInArea;
        params.maxInArea=that.data.maxInArea;
     console.log(params);
    this.$api.get({
        url: '/houseResource/getNotPhone',
        data: params,       
        token: false
      }).then((e) => {
        console.log(e.data);
        let data=e.data
        if (data.code == 200) {
          that.pageJson.total=data.dataCount;
          that.pageJson.currentPage=data.pageSum;
          that.tableData=data.data;
        } else {
          console.log("查询无号码列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询无号码列表失败");
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
      this.queryNotPhoneParams(1);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.queryNotPhone(val);
    },
    handleSizeChange (val) {
      console.log(`每1页 ${val} 条`);
       this.pageJson.pageSize = val;
      this.queryNotPhone(1);
    }
  },
}
</script>  