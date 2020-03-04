<style scoped>
.as {
  margin-top: 10px;
}
.rule {
  position: absolute;
  width: 0.82rem;
  height: 0.36rem;
  top: 0.08rem;
  right: 0rem;
  background: #111111;
}
.login {
  position: fixed;
  font-size: 24px;
  height: 50rem;
  width: 97%;
  background-color: #ffffff;
  border-radius: 0.25rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
.over {
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  filter: alpha(opacity=70);
  top: 0;
  left: 0;
  z-index: 999;
  background-color: #111111;
}
.if {
  width: 100%;
  height: 100%;
}
.button {
  border-radius: 50%;
  text-indent: -1rem;
  text-align: end;
  padding-right: 20px;
  font-size: 2rem;
}
</style>
<template>
  <list-page
    :parentData="$data"
    @handleClick="handleClick"
    @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange"
  >
    <template v-slot:top>
      <div class="query-cell">
        <!-- <el-input placeholder="用户名"
                  v-model="queryData.newsTitle"
                  clearable>
          <template slot="prepend">用户名</template>
        </el-input>-->
        <div class="query-cell" style="display:flex">
          <el-input placeholder="规则编号或规则名" v-model="queryData.keyWord" clearable>
            <template slot="prepend">搜索</template>
          </el-input>
          <el-select v-model="queryData.sysType">
            <el-option
              v-for="item in sysType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button
            type="primary"
            style="margin-left:10px"
            size="mini"
            @click="queryVerifyHouseByParams"
          >查询</el-button>
        </div>
        <el-button type="primary" style="margin-left:11px" size="mini" @click="toAddConfig()">添加系统规则</el-button>
      </div>
      <div v-show="popup"
           @click="closepopup">
        <!--这里是要展示的内容层-->
        <div class="login">
          <iframe style=""
                  class="if"
                  :src="'/sys/configObjectList?configId='+configId"> </iframe>
        </div>
        <!--这里是半透明背景层-->
        <div class="over"></div>
      </div>
    </template>
    <template v-slot:tableColumn>
      <!-- <template v-for="(item) in cell.tableData">
        <el-table-column :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                         :key="item.prop">
        </el-table-column>
      </template>-->
      <el-table-column label="编号">
        <template v-slot="scope">{{scope.row.sysParNo}}</template>
      </el-table-column>
      <el-table-column label="参数名称">
        <template v-slot="scope">{{scope.row.sysParName}}</template>
      </el-table-column>
      <el-table-column label="类型">
        <template v-slot="scope">{{scope.row.sysParType}}</template>
      </el-table-column>
      <el-table-column label="是否有效">
        <template v-slot="scope">{{scope.row.Del==0? "有效":"无效"}}</template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" fixed="right" key="992">
        <template v-slot="scope">
          <!-- <div v-if="scope.row.operation!=''"> -->
          <el-button
            type="info"
            size="mini"
            @click="distributeEvent(item.methosName,scope.row.id,scope.row.sysParNo,scope.row.sysParName,scope.row.sysParType,scope.row.memo)"
            v-for="(item,index) in isForBut(2)"
            :key="index"
            class="as"
          >{{item.name}}</el-button>
          <!-- </div> -->
        </template>
      </el-table-column>
    </template>
  </list-page>
</template>
<script>
import listPage from "@/components/listPage";
import getMenuRid from "@/minxi/getMenuRid";
export default {
  mixins: [getMenuRid],
  components: {
    listPage
  },
  data() {
    return {
      configId: null,
      loading: true, //控制表格加载动画提示
      popup: 0,
      pageJson: {
        currentPage: 1, //当前页码
        total: 9, //总记录数
        keyWord: null,
        pageSize: 10 //每页条数
      },
      configSet: {
        selectToTime: false,
        selectTo: false
      },
      tableDataColumn: [
        { prop: "communityName", label: "房源坐落" },
        { prop: "price", label: "售价(万元)" },
        { prop: "area", label: "面积(㎡)" },
        { prop: "type", label: "户型" },
        { prop: "levae", label: "装修程度" },
        { prop: "creatorName", label: "经济人" },
        { prop: "createTime", label: "录入时间" },
        { prop: "checkStatus", label: "状态" }
      ],
      tableData: [
        {
          house: "龙腾花园-16栋-604室",
          price: "234",
          area: "1252",
          type: "3室2厅1卫",
          levae: "精装修",
          economicPro: "周杰伦",
          addTime: "2019-01-01 18:00:00",
          cellType: "待店长验真",
          operation: "1"
        },
        ,
        {
          house: "龙腾花园-16栋-604室",
          price: "234",
          area: "12",
          type: "3室2厅1卫",
          levae: "精装修",
          economicPro: "周杰伦1",
          addTime: "2019-01-01 18:00:00",
          cellType: "待店长验真",
          operation: "3"
        }
      ],
      sysType: [
        {
          label: "买卖房源",
          value: "1"
        },
        {
          label: "买卖客户",
          value: "2"
        },
        {
          label: "租赁房源",
          value: "3"
        },
        {
          label: "租赁客户",
          value: "4"
        },
        {
          label: "用户管理",
          value: "5"
        }
      ],
      options: [
        {
          value: "选项1",
          label: "全部"
        },
        {
          value: "选项2",
          label: "待验真"
        },
        {
          value: "选项3",
          label: "客户验真"
        },
        {
          value: "选项4",
          label: "店长验真"
        },
        {
          value: "选项5",
          label: "验真失败"
        },
        {
          value: "选项6",
          label: "已过期"
        }
      ],
      elTabs: {
        activeName: "tab1"
      },
      tableData2: [{}],
      queryData: {
        houseName: "",
        keyWord: null,
        sysType: null,
        taskName: "",
        selectValue: "",
        timeSelect: ""
      }
    };
  },
  mounted() {
    this.queryVerifyHouseByParams(1);
  },
  methods: {
    queryVerifyHouseByParams() {
      this.queryVerifyHouseDatas(1);
    },

    queryVerifyHouseDatas(currentPage) {
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      let that = this;
      console.log(that.queryData.keyWord);
      if (that.queryData.keyWord != null) {
        params.keyWord = that.queryData.keyWord;
      }
      if (that.queryData.sysType != null) {
        params.sysParType = that.queryData.sysType;
      }
      this.$api
        .get({
          url: "/Set",
          data: params,
          token: false
        })
        .then(e => {
          let result = e.data;
          that.loading = false;
          if (result.code == 200) {
            console.log(result.data);
            that.tableData = "";
            for (var i = 0; i < result.data.list.length; i++) {
              switch (result.data.list[i].sysParType) {
                case "1":
                  result.data.list[i].sysParType = "买卖房源";
                  break;
                case "2":
                  result.data.list[i].sysParType = "买卖客户";
                  break;
                case "3":
                  result.data.list[i].sysParType = "租赁房源";
                  break;
                case "4":
                  result.data.list[i].sysParType = "租赁客户";
                  break;
                case "5":
                  result.data.list[i].sysParType = "用户管理";
                  break;
              }
            }

            that.pageJson.total = result.data.totalCount;
            that.pageJson.currentPage = result.data.currPagecurrPagecurrPage;
            that.tableData = result.data.list;
            console.log(that.tableData);
          } else {
            console.log("查询系统参数配置列表结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询系统参数配置列表失败");
          console.log(e);
        });
    },
    postConfig(id, sysParNo, sysParName) {
      console.log(id, sysParNo, sysParName);
      
      this.$router.push({name: "addConfigObject",
        params: { configId: id,sysParNo: sysParNo,sysParName: sysParName }});
    },
    updateConfig(id, sysParNo, sysParName, sysParType, memo) {
      console.log(memo);
      this.$router.push({        name: "addConfig",
        params: {configId: id,sysParNo: sysParNo,sysParName: sysParName,sysParType: sysParType,memo: memo
        }      });
    }, 
    toList (id, sysParNo, sysParName, sysParType, memo) {
      this.popup = 1;
      console.log(id);
      this.configId = id;

      //  this.$router.push({        path: "/sys/configObjectList",
      // query: {          configId: id,
      //  sysParNo: sysParNo,
      //    sysParName: sysParName,
      //   sysParType: sysParType,
      //   memo: memo,
      //  keyWord:this.queryData.keyWord,
      //   sysType:this.queryData.sysType
      // }      });
    },
    toAddConfig() {
      this.$router.push({ path: "/sys/addConfig" });
    },

    updateDelRight(id, sysParNo, sysParName, sysParType, memo) {
      this.$api
        .get({
          url: "/Set/updateDel",
          data: {
            del: 0,
            id: id + ","
          },
          token: false
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            this.$alert("", "修改成功", {
              dangerouslyUseHTMLString: false
            });
          } else {
            console.log("修改失败" + result.message);
          }
        })
        .catch(e => {
          console.log("修改失败");
          console.log(e);
        });
    },
    showpopup() {
      this.popup = 1;
    },
    //关闭活动规则页面
    closepopup() {
      this.popup = 0;
    },
    updateDelLeft(id, sysParNo, sysParName, sysParType, memo) {
      this.$api
        .get({
          url: "/Set/updateDel",
          data: {
            del: 1,
            id: id + ","
          },
          token: false
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            this.$alert("", "修改成功", {
              dangerouslyUseHTMLString: false
            });
          } else {
            console.log("修改失败" + result.message);
          }
        })
        .catch(e => {
          console.log("修改失败");
          console.log(e);
        });
    },
    distributeEvent(e, id, sysParNo, sysParName, sysParType, memo) {
      this[e](id, sysParNo, sysParName, sysParType, memo);
    },
    isForBut(type) {
      let array = [
        { name: "修改", isType: "2", methosName: "updateConfig" },
        { name: "添加关联对象", isType: "1,2,3", methosName: "postConfig" },
        { name: "查看关联对象", isType: "1,2,3", methosName: "toList" },
        { name: "转有效", isType: "1,2,3", methosName: "updateDelRight" },
        { name: "转无效", isType: "1,2,3", methosName: "updateDelLeft" }
      ];
      return array.filter(item => {
        return item.isType.includes(type);
      });
    },
    handleClick() {},
    handleSizeChange(val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryVerifyHouseDatas(1);
    },
    handleCurrentChange(val) {
      this.queryVerifyHouseDatas(val);
    }
  }
};
</script>