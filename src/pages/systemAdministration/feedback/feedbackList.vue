<style lang="less" scoped>
.formItem {
  margin: 10px;
  display: inline-block;
}
.accept-tips {
  margin-left: 30px;
  font-size: 18px;
  color: #666;
}
</style>
<template>
  <div>
    <list-page
      v-show="!showForm"
      :parentData="$data"
      @queryTabData="queryTabData"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <template v-slot:top>
        <div class="page-form-inline budingMarinSet" style="margin: 10px;">
          <el-input
            style="width: 400px;"
            placeholder="功能点或内容搜索"
            v-model="queryData.keyword"
          >
            <template slot="prepend">关键字搜索</template>
          </el-input>

          <el-date-picker
            v-model="queryData.time"
            type="daterange"
            unlink-panels
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
            <template slot="prepend">日期选择</template>
          </el-date-picker>

          <el-button
            type="primary"
            style="margin-left:10px;"
            @click="queryAddFloorListParams"
            >查询</el-button
          >
          <span class="accept-tips">一经采纳将奖励10~100鑫币不等</span>
        </div>
      </template>

      <template #tableColumn="cell">
        <template v-for="item in cell.tableData">
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :formatter="item.formatter"
            :key="item.prop"
          ></el-table-column>
        </template>
        <el-table-column label="反馈图片" width="200px">
          <template v-slot="scope">
            <div class="demo-image__preview">
              <el-image
                style="width: 40px; height: 40px"
                v-for="(iitem, index) in scope.row.pics"
                :src="iitem"
                :preview-src-list="scope.row.pics"
                :key="index"
              ></el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template v-slot="scope">
            <el-button
              type="primary"
              size="mini"
              :disabled="scope.row.replyDel != null"
              @click="
                Reply(
                  scope.row.accounId,
                  scope.row.accountName,
                  scope.row.functionPoint,
                  scope.row.pics,
                  scope.row.id
                )
              "
              >答复</el-button
            >
            <el-button
              type="warning"
              size="mini"
              :disabled="scope.row.adopted"
              @click="openAccept(scope.row)"
              >采纳</el-button
            >
          </template>
        </el-table-column>
      </template>
    </list-page>
    <fixed-popup
      :visible.sync="visible"
      v-if="visible"
      title="是否采纳?"
      width="3.5rem"
      style-type="0"
      @confirmEmit="confirmEmit"
    >
      <div>
        <span style="margin-left: 20px;font-size: larger">奖励：</span>
        <el-input-number
          style="width:60%"
          v-model="reward"
          :min="1"
          :max="1000"
          size="medium"
        />
      </div>
    </fixed-popup>
    <el-dialog title="给予答复" :visible.sync="dialogVisible" width="40%">
      <div>{{ accountName }}的反馈：{{ message }}</div>
      <div style="display:flex;margin-top:20px;flex-wrap:wrap;">
        <div class="demo-image__preview" style="width:100%;margin-bottom:20px">
          <el-image
            style="width: 40px; height: 40px"
            v-for="(iitem, index) in pics"
            :src="iitem"
            :preview-src-list="pics"
            :key="index"
          ></el-image>
        </div>
        <div>答复：</div>

        <el-input style="width:90%" v-model="msg" type="textarea" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateReply()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import listPage from "@/components/listPage";
import getToken from "@/minxi/getUrlToken";
export default {
  mixins: [getToken],
  components: {
    listPage
  },
  data() {
    return {
      acceptActiveRow: null,
      visible: false,
      loading: false,
      dialogVisible: false,
      adoptVisible: false,
      pics: "",
      accountName: "",
      accounId: "",
      message: "",
      id: "",
      msg: "",
      reward: 10,
      showForm: false,
      queryData: {
        keyword: ""
      },
      pageJson: {
        currentPage: 1, //当前页码
        total: 0, //总记录数
        pageSize: 10 //每页条数
      },
      tableDataColumn: [
        {
          prop: "accountName",
          label: "反馈人名称",
          width: "100px",
          formatter: row => row.accountName
        },
        {
          prop: "functionPoint",
          label: "功能点",
          width: "200px",
          formatter: row => row.functionPoint
        },
        { prop: "suggest", label: "反馈内容", formatter: row => row.suggest },
        {
          prop: "addTime",
          label: "反馈时间",
          width: "200px",
          formatter: row => row.addTime
        },
        {
          prop: "replyMessage",
          label: "答复",
          width: "200px",
          formatter: row => row.replyMessage
        },
        {
          prop: "replyPer",
          label: "答复人",
          // width: "200px",
          formatter: row => row.replyPer
        },
        {
          prop: "replyDel",
          label: "答复状态",
          // width: "200px",
          formatter: row => (row.replyDel == 1 ? "已答复" : "未答复")
        },
        {
          prop: "adopted",
          label: "是否采纳",
          // width: "200px",
          formatter: row =>
            row.adopted == 1 ? "已采纳，并奖励" + row.reward + "鑫币" : "未采纳"
        }
      ],
      tableData: [],
      positionObj: {},
      saveType: null
    };
  },
  mounted() {
    this.queryAddFloorList(1);
  },
  methods: {
    /**
     * @example: 打开采纳弹框 并且设置当前点击的行为采纳row
     */
    openAccept(value) {
      this.visible = true;
      this.acceptActiveRow = value;
    },
    confirmEmit() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      console.log("是否采纳确定触发事件");
      let that = this;
      if (this.reward < 0) {
        this.$message({
          type: "info",
          message: "不给奖励就算了，还扣钱？"
        });
        return false;
      }
      this.$api
        .post({
          url: "/sys/onlineFeedback/adopt/" + that.acceptActiveRow.id,
          data: {
            id: 1,
            reward: that.reward
          },
          qs: true
        })
        .then(e => {
          console.log(e.data);
          let data = e.data;
          if (data.code == 200) {
            that.msg = "";
            this.$message({
              type: "info",
              message: "采纳成功"
            });
            that.visible = false;
            that.queryAddFloorListParams();
          } else {
            that.reward = 10;
            that.$message({
              message: data.message,
              type: "warning"
            });
          }
        })
        .catch(e => {
          console.log("上传失败");
          console.log(e);
        })
        .finally(e => {
          this.loading = false;
        });
    },
    // queryTabData() {
    //   console.log(this, "111");
    // },
    //查询按钮
    queryAddFloorListParams() {
      //debugger;
      this.queryAddFloorList(1);
    },
    //查询数据
    queryAddFloorList(currentPage) {
      this.loading = true;
      var that = this;
      let params = { limit: that.pageJson.pageSize, page: currentPage };
      params.keyword = that.queryData.keyword;
      if (that.queryData.time) {
        params.beginTime = that.queryData.time[0];
        params.endTime = that.queryData.time[1];
      }
      console.log(params);
      this.$api
        .post({
          url: "/sys/onlineFeedback",
          data: params,
          qs: true
        })
        .then(e => {
          console.log(e.data);
          let data = e.data;
          if (data.code == 200) {
            that.pageJson.total = data.data.totalCount;
            that.pageJson.currentPage = data.data.currPage;
            that.tableData = data.data.list;
          } else {
            that.$message({
              message: data.message,
              type: "warning"
            });
          }
        })
        .catch(e => {
          console.log("查询反馈列表失败");
          console.log(e);
        })
        .finally(e => {
          this.loading = false;
        });
    },
    //取消
    cancel() {
      this.positionObj = {};
      this.showForm = false;
    },
    Reply(aid, name, msg, pic, id) {
      //打开弹窗
      console.log(id, name, msg, pic, id);
      this.accounId = aid;
      this.accountName = name;
      this.message = msg;
      this.dialogVisible = true;
      this.pics = pic;
      this.id = id;
    },
    updateReply() {
      let that = this;
      if (this.msg == "") {
        this.$message({
          type: "info",
          message: "请填写回复信息"
        });
        return false;
      }
      this.$api
        .post({
          url: "/sys/onlineFeedback/" + that.id,
          data: {
            id: 1,
            msg: that.msg,
            userId: that.accounId
          },
          qs: true
        })
        .then(e => {
          console.log(e.data);
          let data = e.data;
          if (data.code == 200) {
            that.msg = "";
            this.$message({
              type: "info",
              message: "上传成功"
            });
            that.dialogVisible = false;
          } else {
            that.msg = "";
            that.$message({
              message: data.message,
              type: "warning"
            });
          }
        })
        .catch(e => {
          that.msg = "";
          console.log("上传失败");
          console.log(e);
        })
        .finally(e => {
          this.loading = false;
        });
    },
    del(del) {
      let a = del == 1 ? "已答复" : "未答复";
    },
    queryTabData() {
      this.$emit("queryTabData");
      console.log(this.queryData);
      this.queryAddFloorListParams();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryAddFloorList(val);
    },
    handleSizeChange(val) {
      console.log(`每1页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryAddFloorList(1);
    }
  }
};
</script>
