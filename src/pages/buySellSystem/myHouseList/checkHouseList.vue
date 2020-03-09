<style lang="less" scoped>
.a {
  background-image: url(../../../assets/images/channel_current.png);
}
</style>
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
            <el-option v-for="item in optionsList"
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
        <el-button type="primary"
                   style="margin-left:30px"
                   size="mini"
                   @click="querylistByParams">查询</el-button>
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
          {{scope.row.checkProject}}
        </template>
      </el-table-column>

      <el-table-column label="审核类型">
        <template v-slot="scope">
          {{scope.row.checkType}}
        </template>
      </el-table-column>
      <el-table-column label="提交人">
        <template v-slot="scope">
          {{scope.row.addPerName}}
        </template>
      </el-table-column>
      <el-table-column label="提交时间">
        <template v-slot="scope">
          {{scope.row.AddTime}}
        </template>
      </el-table-column>
      <el-table-column label="审核状态">
        <template v-slot="scope">
          {{scope.row.checkStatus}}
        </template>
      </el-table-column>
      <el-table-column label="备注说明">
        <template v-slot="scope">
          {{scope.row.CheckMemo}}
        </template>
      </el-table-column>
      <el-table-column label="附件">
        <template v-slot="scope">
          <el-image v-if="scope.row.accessory==1"
                    :src="accessoryUrl">

          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       fixed="right"
                       key="operation">
        <template v-slot="scope">
          <el-button type="success"
                     size="mini"
                     v-if="scope.row.Tag==0"
                     @click="getTitle(scope.row.Type)">审核</el-button>
          <el-button size="mini"
                     type="info"
                     v-else>已审核</el-button>
          <el-dialog :title="title"
                     :visible.sync="showPopUp"
                     width="30%"
                     :modal="false"
                     :center="true">
            <div>
              <div>
                <span>审核状态:</span>
                <el-radio-group v-model="checkStatus">
                  <el-radio :label="1">通过</el-radio>
                  <el-radio :label="2">不通过</el-radio>
                </el-radio-group>
              </div>
              <div>
                <el-input type="textarea"
                          placeholder="请输入审核说明"
                          v-model="checkMemo">
                </el-input>
              </div>
            </div>
            <span slot="footer"
                  class="dialog-footer">
              <el-button @click="showPopUp = false">取 消</el-button>
              <el-button type="primary"
                         @click="checkHouse(scope.row.id)">确 定</el-button>
            </span>
          </el-dialog>

          <el-button type="success"
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
import util from "@/util/util";
export default {
  mixins: [getMenuRid],

  components: {
    listPage
  },
  data () {
    return {
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

      },
      accessoryUrl: require('../../../assets/images/accessory.png'),
      showPopUp: false,
      checkStatus: 1,
      checkMemo: "",
      titleList: [
        {
          key: 0,
          value: "钥匙人申请审核"
        },
        {
          key: 1,
          value: "委托申请审核"
        },
        {
          key: 4,
          value: "取代申请审核"
        },
        {
          key: 8,
          value: "房源转状态审核"
        },
        {
          key: 11,
          value: "举报审核"
        },
        {
          key: 12,
          value: "实勘人申请审核"
        }
      ],
      title: "",
      optionsList: []
    }
  },
  mounted () {
    this.querylist(1);
  },
  methods: {
    checkHouse (id) {
      let that = this;
      let params = {
        id: id,
        CheckMemo: this.checkMemo,
        Tag: this.checkStatus
      }
      if (!util.isNotNull(this.checkMemo)) {
        this.$.message("审核说明未填")
        return true;
      }
      this.showPopUp = false;
      this.$api.post({
        url: '/agentHouse/propertyCheck/checkHouse',
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        data: params,
        token: false
      }).then((e) => {
        let result = e.data;
        that.loading = false;
        that.$message(result.message);
        if (result.code == 200) {
          that.querylistByParams();
        }
      }).catch((e) => {
        that.$message("操作失败");
      })

    },
    getTitle (checkType) {
      this.titleList.forEach(element => {
        if (element.key == checkType) {
          this.title = element.value;
        }
      });
      this.showPopUp = true;
    },
    queryAddPerId () {
      var that = this
      this.$api.get({
        url: "/mateHouse/queryComBuilding",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        token: false,
        qs: true,
        data: {
          comId: that.form.comId
        }
      }).then((e) => {
        if (e.data.code == 200) {
          that.cbIdList = e.data.data.list;
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
            that.optionsList = e.data.data.list;
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