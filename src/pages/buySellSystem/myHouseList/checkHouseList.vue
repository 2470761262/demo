<style lang="less" scoped>
.flex-cell-content {
  display: flex;
  justify-content: space-around;
}
.page-row-flex {
  display: flex;
  flex-direction: column;
  height: 100%;
}
/deep/.el-dialog__headerbtn {
  z-index: 10;
}
.elTree {
  height: 550px;
  overflow-y: auto;
}
.el-carousel-box {
  margin-top: 20px;
  display: flex;
  .old-el-carousel {
    width: 50%;
  }
  .new-el-carousel {
    width: 100%;
  }
}
</style>
<template>
  <div class="page-row-flex">
    <list-page
      :parentData="$data"
      @handleClick="handleClick"
      :dblclick="true"
      @handleSizeChange="handleSizeChange"
      @cellDblClick="toHouseDetail"
      @handleCurrentChange="handleCurrentChange"
    >
      <template v-slot:left>
        <div class="elTree" v-if="treeData.length > 0">
          <el-input
            data-anchor="审核列表树 => input"
            placeholder="输入关键字进行过滤"
            v-model="filterText"
            class="treeSearch"
          ></el-input>
          <el-tree
            ref="treeForm"
            :data="treeData"
            node-key="nodeId"
            show-checkbox
            :props="defaultProps"
            @check-change="handleCheckChange"
            :highlight-current="true"
            :filter-node-method="filterNode"
            check-strictly
            :action="''"
            empty-text="暂无数据，请检查权限"
            auto-expand-parent
            v-loading="treeLoading"
          ></el-tree>
        </div>
      </template>
      <template v-slot:top>
        <div class="page-list-query-row">
          <div class="query-content-cell">
            <h3 class="query-cell-title">楼盘</h3>
            <el-select
              data-anchor="审核列表楼盘 => select"
              class="anchor-point"
              @click.native="log_socket.sendUserActionData"
              v-model="queryData.comId"
              @focus="remoteInput"
              @change="queryCBId"
              filterable
              remote
              clearable
              placeholder="楼盘名称"
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option
                class="anchor-point"
                @click.native="log_socket.sendUserActionData"
                v-for="item in comList"
                :data-anchor="'审核列表楼盘 => select => option:' + item.name"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select
              data-anchor="审核列表楼栋 => select"
              class="anchor-point"
              @click.native="log_socket.sendUserActionData"
              v-model="queryData.cbId"
              filterable
              clearable
              placeholder="楼栋"
              @change="buildChange"
            >
              <el-option
                class="anchor-point"
                @click.native="log_socket.sendUserActionData"
                v-for="item in cbIdList"
                :data-anchor="'审核列表楼栋 => select => option:' + item.name"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select
              data-anchor="审核列表房间号 => select"
              class="anchor-point"
              @click.native="log_socket.sendUserActionData"
              v-model="queryData.roomId"
              filterable
              @change="querylistByParams"
              placeholder="房间号"
              :loading="HouseNoLoading"
              v-loadmore="loadMore"
            >
              <el-option
                class="anchor-point"
                @click.native="log_socket.sendUserActionData"
                v-for="item in roomNoList"
                :data-anchor="'审核列表房间号 => select => option:' + item.name"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">编号</h3>
            <el-input
              data-anchor="审核列表房源编号 => input"
              placeholder="房源编号"
              v-model="queryData.houseNo"
              class="set-input200"
              @change="querylistByParams"
              clearable
            />
          </div>
          <div class="query-content-cell cell-interval75">
            <h3 class="query-cell-title">提交时间</h3>
            <el-date-picker
              data-anchor="审核列表提交时间 => input"
              v-model="queryData.timeSelect"
              type="daterange"
              class="set-data-pricker anchor-point"
              @change="querylistByParams"
              range-separator="至"
              start-placeholder="开始日期"
              :default-time="['00:00:00', '23:59:59']"
              end-placeholder="结束日期"
            ></el-date-picker>
            <span
              data-anchor="审核列表清除 => click"
              class="query-cell-suffix handlebut anchor-point"
              @click="Remove"
              >清除</span
            >
          </div>
        </div>
        <div class="page-list-query-row">
          <div class="query-content-cell ">
            <h3 class="query-cell-title">审核项目</h3>
            <el-select
              data-anchor="审核列表审核项目 => select"
              filterable
              @click.native="log_socket.sendUserActionData"
              v-model="checkProject"
              clearable
              class="set-select120 anchor-point"
              @change="reviewProject"
              placeholder="全部"
            >
              <el-option
                class="anchor-point"
                @click.native="log_socket.sendUserActionData"
                v-for="item in checkProjectList"
                :data-anchor="'审核列表审核项目 => select => option:' + item.label"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">审核类型</h3>
            <el-select
              data-anchor="审核列表审核类型 => select"
              filterable
              @click.native="log_socket.sendUserActionData"
              v-model="type"
              clearable
              class="set-select120 anchor-point"
              @change="querylistByParams"
              placeholder="全部"
            >
              <el-option
                class="anchor-point"
                @click.native="log_socket.sendUserActionData"
                v-for="item in typeList"
                :data-anchor="'审核列表审核类型 => select => option:' + item.label"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">审核状态</h3>
            <el-select
              data-anchor="审核列表审核状态 => select"
              filterable
              @click.native="log_socket.sendUserActionData"
              v-model="status"
              clearable
              class="set-select120 anchor-point"
              @change="querylistByParams"
              placeholder="全部"
            >
              <el-option
                class="anchor-point"
                @click.native="log_socket.sendUserActionData"
                v-for="item in stateList"
                :data-anchor="'审核列表审核状态 => select => option:' + item.label"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="query-content-cell cell-interval75">
            <el-button
              data-anchor="审核列表查询 => click"
              type="primary"
              size="mini"
              @click="querylistByParams"
              class="anchor-point"
              >查询</el-button
            >
          </div>
          <div class="query-content-cell cell-interval25">
            <moreSelect
              class="anchor-point"
              :configRule="{ entrustType: false, taskType: false }"
              @moreSelectChange="moreSelectChange"
              deptUrl="/myHouse/myCheckList"
            ></moreSelect>
          </div>
        </div>
      </template>

      <template #tableColumn="">
        <el-table-column label="楼盘名称">
          <template v-slot="scope">
            {{ scope.row.communityName }}
          </template>
        </el-table-column>
        <el-table-column label="房源坐落">
          <template v-slot="scope">
            {{ scope.row.buildingName + "栋-" + scope.row.roomNo + "室" }}
          </template>
        </el-table-column>
        <el-table-column label="审核项目">
          <template v-slot="scope">
            {{ scope.row.checkProject }}
          </template>
        </el-table-column>

        <el-table-column label="审核类型">
          <template v-slot="scope">
            {{ scope.row.checkType }}
          </template>
        </el-table-column>
        <el-table-column label="提交人">
          <template v-slot="scope">
            {{ scope.row.checkAddPerName }}
          </template>
        </el-table-column>
        <el-table-column label="提交时间">
          <template v-slot="scope">
            {{ scope.row.checkAddTime }}
          </template>
        </el-table-column>
        <el-table-column label="审核状态">
          <template v-slot="scope">
            {{ scope.row.checkStatus }}
          </template>
        </el-table-column>
        <el-table-column label="审核说明">
          <template v-slot="scope">
            {{ scope.row.checkMemo }}
          </template>
        </el-table-column>
        <el-table-column label="举报说明" v-if="checkProject == '11'">
          <template v-slot="scope">
            {{ scope.row.ownerMemo }}
          </template>
        </el-table-column>
        <el-table-column label="附件">
          <template v-slot="scope">
            <el-image
              v-if="scope.row.accessory == 1"
              :src="accessoryUrl"
              data-anchor="审核列表附件 => table => image"
              @click="getAccessory(scope.row)"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="190">
          <template v-slot="scope">
            <el-button
              class="anchor-point"
              type="primary"
              size="mini"
              data-anchor="审核列表审核 => click"
              v-if="
                scope.row.tag == 0 && scope.row.checkProject == '房源转状态'
              "
              @click="getTitle(scope.row)"
              :disabled="btnDisabled.checkStatus"
              >审核</el-button
            >
            <el-button
              class="anchor-point"
              type="primary"
              size="mini"
              data-anchor="审核列表审核 => click"
              v-if="
                scope.row.tag == 0 && scope.row.checkProject != '房源转状态'
              "
              @click="getTitle(scope.row)"
              :disabled="btnDisabled.checkHouse"
              >审核</el-button
            >
            <el-button
              data-anchor="审核列表已审核 => click"
              size="mini"
              type="warning"
              v-if="scope.row.tag != 0"
              class="anchor-point"
              >已审核</el-button
            >
            <el-button
              data-anchor="审核列表查看详情 => click"
              class="anchor-point"
              type="primary"
              v-if="!(scope.row.checkProject == 13)"
              @click="toHouseDetail(scope.row)"
              size="mini"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </template>
    </list-page>
    <el-dialog
      :title="title"
      :visible.sync="showPopUp"
      width="30%"
      :close-on-click-modal="false"
      :center="true"
    >
      <div>
        <div>
          <span>审核状态:</span>
          <el-radio-group v-model="checkStatus">
            <el-radio :label="1" data-anchor="审核列表通过 => radio"
              >通过</el-radio
            >
            <el-radio :label="2" data-anchor="审核列表不通过 => radio"
              >不通过</el-radio
            >
          </el-radio-group>
        </div>
        <div v-if="row.checkProject == 1 || row.replaceType == 2">
          <span>委托截止时间:</span>
          <span>{{ row.proxyMaxTime }}</span>
        </div>
        <div
          v-if="row.checkProject == 0 || row.replaceType == 3"
          style="display:flex"
        >
          <span>钥匙类型:</span>
          <span v-if="row.keyType == 0">钥匙</span>
          <span v-if="row.keyType == 1">指纹锁</span>
          <span v-if="row.keyType == 2">密码锁</span>
          <div v-if="row.keyType == 2" style="margin-left:20px;">
            <span>密码:</span>
            <span>{{ row.keyCode }}</span>
          </div>
        </div>
        <div v-if="row.checkProject == 8">
          <div v-if="row.newSaleTag == 4" style="display:flex">
            <span>成交公司:</span>
            <span>{{ row.dealCompany }}</span>
            <div v-if="row.dealPrice != null && row.dealPrice != ''">
              <span>成交价:</span>
              <span>{{ row.dealPrice }}</span>
            </div>
          </div>
          <div v-if="row.newSaleTag == 6">
            <span>子类型:</span>
            <span v-if="row.subStatus == 0">疑似跳单</span>
            <span v-if="row.subStatus == 1">亲朋好友</span>
          </div>
          <div v-if="row.NewSaleTag == 3">
            <span>子类型:</span>
            <span v-if="row.subStatus == 2">号码错误</span>
            <span v-if="row.subStatus == 3">空号</span>
            <span v-if="row.subStatus == 4">房源不存在</span>
          </div>
        </div>
        <div>
          <el-input
            data-anchor="审核列表审核说明 => input"
            class="anchor-point"
            type="textarea"
            placeholder="请输入审核说明"
            v-model="checkMemo"
          >
          </el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          data-anchor="审核列表取消 => click"
          @click="showPopUp = false"
          class="anchor-point"
          >取 消</el-button
        >
        <el-button
          data-anchor="审核列表确 定 => click"
          type="primary"
          @click="checkHouse()"
          class="anchor-point"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="showAccessory"
      width="60%"
      :modal-append-to-body="false"
    >
      <div slot="title">
        <div style="display:flex">
          <el-tabs
            v-model="activeName"
            v-if="accessoryTable"
            @tab-click="accesssoryTabClick"
          >
            <el-tab-pane
              :name="item.name"
              v-for="(item, index) in accessoryFile"
              :key="index"
            >
              <div
                slot="label"
                v-if="item.newsFileListFlag || item.oldFileListFlag"
              >
                <div slot="label">
                  <span>{{ item.title }}</span>
                </div>
                <span slot="label">新({{ item.newsFileList.length }})</span>
                <span slot="label">旧({{ item.oldFileList.length }})</span>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="el-carousel-box">
        <div
          :class="
            bigAccessoryFile.length > 1 ? 'old-el-carousel' : 'new-el-carousel'
          "
          v-for="(element, index1) in bigAccessoryFile"
          :key="index1"
        >
          <div v-if="bigAccessoryFile.length > 1">{{ element.title }}</div>
          <el-carousel :autoplay="false" height="600px" :ref="element.ref">
            <el-carousel-item
              v-for="(item, index) in element.data"
              :key="index"
              class="anchor-point"
            >
              <img
                :src="item.url"
                @click="changeShowImg(item.url, index1)"
                v-if="item.subType != 7"
                style="width:100%;height:100%;object-fit:scale-down;"
              />
              <video
                :src="item.url"
                controls="controls"
                v-else
                height="100%"
                style="object-fit: scale-down;"
                width="100%"
              ></video>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <el-image-viewer
        v-if="showViewer"
        :on-close="iamgeViewClose"
        :url-list="showImgList"
      >
      </el-image-viewer>
    </el-dialog>
  </div>
</template>
<script>
/**
 * 作业人申请
 */
const taskProCheck = [
  { label: "钥匙申请", value: 0 },
  { label: "实勘申请", value: 12 },
  { label: "普通委托申请", value: "2,1" },
  { label: "独家委托申请", value: "1,1" },
  { label: "限时委托申请", value: "3,1" }
];
/**
 * 取代申请
 */
const replaceCheck = [
  { label: "钥匙取代", value: 3 },
  { label: "实勘取代", value: 13 },
  { label: "普通委托取代", value: "2,44" },
  { label: "独家委托取代", value: "1,44" },
  { label: "限时委托取代", value: "3,44" }
];
/**
 * 房源转状态
 */
const houseTypeCheck = [
  { label: "他司售", value: 4 },
  { label: "业主自售", value: 6 },
  { label: "暂不售", value: 5 },
  { label: "无效", value: 3 }
];
/**
 * 举报类型
 */
const reportCheck = [
  { value: "5", label: "虚假实勘" },
  { value: "6", label: "虚假委托" },
  { value: "7", label: "虚假钥匙" },
  { value: "8", label: "虚假跟进" },
  { value: "9", label: "房屋已售" },
  { value: "10", label: "虚假业主号码" },
  { value: "11", label: "其他" }
];
/**
 * 默认类型
 */
const defaultCheck = [
  { value: "0", label: "钥匙人" },
  { value: "1", label: "独家委托审核" },
  { value: "4", label: "他司售" },
  { value: "2", label: "虚假实勘" }
];
import listPage from "@/components/listPage";
import getMenuRid from "@/minxi/getMenuRid";
import util from "@/util/util";
import moreSelect from "@/components/moreSelect";
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import { SMALLThumb } from "@/util/constMap";
export default {
  mixins: [getMenuRid],

  components: {
    listPage,
    moreSelect,
    ElImageViewer
  },
  computed: {
    showImgList() {
      let result = [];
      this.bigAccessoryFile[this.showImgIndex].data.forEach(item => {
        if (item.subType != 7) {
          result.push(item.url.replace(SMALLThumb, ""));
        }
      });
      if (this.showImgIndexImg != null) {
        let index = result.findIndex(item => {
          return item == this.showImgIndexImg;
        });
        if (index) {
          let data = result[index];
          result.splice(index, 1); //移除元素避免重复
          result.unshift(data); //往前添加元素
        }
      }
      console.log(result, "ffff");
      return result;
    }
  },
  data() {
    return {
      HouseNoLoading: false,
      houseNoPage: {
        // 房间分页数据
        currentPage: 1,
        totalPage: 1,
        limit: 30
      },
      showViewer: false,
      showImgIndexImg: null,
      type: "",
      checkProject: "",
      option: "",
      status: "",
      cbIdList: "",
      roomNoList: "",
      comList: "",
      moreSelect: [],
      dialogVisible: false,
      value: "",
      input: "",
      addPer: "",
      loading: true, //控制表格加载动画提示
      pageJson: {
        currentPage: 5, //当前页码
        total: 9, //总记录数
        pageSize: 10 //每页条数
      },
      tableDataColumn: [
        { prop: "HouseNo", label: "房源编号" },
        { prop: "CommunityName", label: "楼盘名称" },
        { prop: "Price", label: "售价(万元)" },
        { prop: "InArea", label: "面积(m²)" },
        { prop: "PropertyFee", label: "均价(元/m²)" },
        { prop: "hall", label: "户型" },
        { prop: "Decoration", label: "装修程度" },
        { prop: "AgentPer", label: "跟单人" },
        { prop: "AddTime", label: "录入时间" }
      ],
      tableData: [],
      elTabs: {
        activeName: "tab1",
        list: []
      },
      stateList: [
        {
          value: "0",
          label: "待审核"
        },
        {
          value: "1",
          label: "审核通过"
        },
        {
          value: "2",
          label: "未通过"
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
      checkProjectList: [
        {
          value: "1",
          label: "作业人申请"
        },
        {
          value: "4",
          label: "取代申请"
        },
        {
          value: "8",
          label: "房源转状态"
        },
        {
          value: "11",
          label: "举报"
        },
        {
          value: "10",
          label: "录入修改"
        }
      ],
      typeList: defaultCheck,
      queryData: {
        comId: "",
        CommunityName: "",
        timeSelect: "",
        roomNo: "",
        roomId: "",
        cbId: "",
        cbName: "",
        houseNo: ""
      },
      accessoryUrl: require("../../../assets/images/accessory.png"),
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
      optionsList: [],
      checkId: 0,
      row: {},
      accessoryAllList: [],
      bigAccessoryFile: [],
      accessoryFile: {
        1: {
          title: "外景图",
          newsFileList: [],
          oldFileList: [],
          type: 1,
          newsFileListFlag: false,
          oldFileListFlag: false,
          name: "first"
        },
        2: {
          title: "客厅",
          newsFileList: [],
          oldFileList: [],
          type: 2,
          newsFileListFlag: false,
          oldFileListFlag: false,
          name: "second"
        },
        3: {
          title: "卧室图",
          newsFileList: [],
          oldFileList: [],
          type: 3,
          newsFileListFlag: false,
          oldFileListFlag: false,
          name: "third"
        },
        4: {
          title: "厨房",
          newsFileList: [],
          oldFileList: [],
          type: 4,
          newsFileListFlag: false,
          oldFileListFlag: false,
          name: "fourth"
        },
        5: {
          title: "卫生间",
          newsFileList: [],
          oldFileList: [],
          type: 5,
          newsFileListFlag: false,
          oldFileListFlag: false,
          name: "fifth"
        },
        6: {
          title: "户型",
          newsFileList: [],
          oldFileList: [],
          type: 6,
          newsFileListFlag: false,
          oldFileListFlag: false,
          name: "sixth"
        },
        7: {
          title: "视频",
          newsFileList: [],
          oldFileList: [],
          type: 7,
          newsFileListFlag: false,
          oldFileListFlag: false,
          name: "seventh"
        }
      },
      showAccessory: false,
      fill: "fill",
      btnDisabled: {
        checkHouse: true,
        checkStatus: true
      },
      treeData: [], //结构树
      filterText: "",
      defaultProps: {
        children: "childrenNodes",
        label: "labelName"
      },
      treeLoading: false,
      treeCondition: {
        0: [], //公司数组
        1: [], //部门数组
        2: [] //人员数组
      },
      chooseTree: [], //选中的树节点
      activeName: "first",
      resetAccessory: {}, //重置附件
      accessoryTable: false, //是否展示tab切换
      bigAccessoryFileKey: "", //大图展示的key值
      showImgIndex: 0 //展示大的数组索引
    };
  },
  mounted() {
    this.querylist(1);
    this.getTree();
    this.resetAccessory = util.deepCopy(this.accessoryFile);
  },
  watch: {
    filterText(val) {
      this.$refs.treeForm.filter(val);
    }
  },
  methods: {
    iamgeViewClose() {
      this.showViewer = false;
      this.showImgIndexImg = null;
    },
    changeShowImg(url, index) {
      this.showViewer = true;
      this.showImgIndex = index;
      this.showImgIndexImg = url.replace(SMALLThumb, "");
    },
    /**
     * 审核项目change
     */
    reviewProject(value) {
      switch (String(value)) {
        case "1":
          this.typeList = taskProCheck;
          break;
        case "4":
          this.typeList = replaceCheck;
          break;
        case "8":
          this.typeList = houseTypeCheck;
          break;
        case "11":
          this.typeList = reportCheck;
          break;
        default:
          this.typeList = defaultCheck;
          break;
      }
      this.type = "";
      this.querylistByParams();
    },
    moreSelectChange(e) {
      this.moreSelect = e;
      this.querylist(1, "id", "descending");
    },
    accesssoryTabClick(tab, event) {
      let key = parseInt(tab.index) + 1;
      this.bigAccessoryFile.forEach(item => {
        item.data = this.accessoryFile[key][item.key];
      });
    },
    /**
     * 解析附件
     *@param {Array} list //附件数组
     */
    getFile(list) {
      //重置标记
      this.bigAccessoryFile = [];
      this.accessoryTable = false;
      this.bigAccessoryFileKey = "";
      this.accessoryFile = util.deepCopy(this.resetAccessory); //重置外景图等附件数组;
      if (list != null) {
        Object.keys(list).forEach(item => {
          let data = [];
          //循环解析数组
          if (list[item] != null) {
            list[item].forEach((element, index) => {
              if (element.subType != 7 && !element.url.includes(SMALLThumb)) {
                element.url = element.url + SMALLThumb;
              }
              if (element.subType) {
                //保存外景图等附件信息
                element.activeIndex = index;
                this.accessoryTable = true;
                this.accessoryFile[element.subType][item].push(element);
                this.accessoryFile[element.subType][item + "Flag"] = true;
              }
            });
            //如果有外景图等附件大图显示为第一种附件
            if (this.bigAccessoryFileKey == "") {
              Object.keys(this.accessoryFile).forEach(accesy => {
                if (
                  this.accessoryFile[accesy][item].length > 0 &&
                  data.length == 0
                ) {
                  data = this.accessoryFile[accesy][item];
                  this.activeName = this.accessoryFile[accesy].name;
                  this.bigAccessoryFileKey = accesy;
                }
              });
            } else {
              data = this.accessoryFile[this.bigAccessoryFileKey][item];
            }
            if (data.length == 0) {
              //如果没有外景图等附件就默认为当前数组
              data = list[item];
            }
            let title = item == "oldFileList" ? "原图" : "取代图";
            this.bigAccessoryFile.push({
              title: title,
              data: data,
              key: item
            });
          }
        });
      }
      this.showAccessory = true;
    },
    getAccessory(row) {
      let checkId = row.id;
      let that = this;
      let exists = false;
      this.accessoryAllList.forEach(element => {
        if (element.key == checkId) {
          exists = true;
          this.getFile(element.value);
          return true;
        }
      });
      if (exists) {
        return true;
      }
      this.$api
        .get({
          url: "/agentHouse/followPic/getAccessory/" + checkId,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {},
          token: false
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            if (row.Type == 13) {
              result.data.push({ CheckID: checkId, url: row.picUrl });
            }
            that.accessoryAllList.push({ key: checkId, value: result.data });

            that.getFile(result.data);
          }
        })
        .catch(e => {
          that.$message("获取失败");
        });
    },
    checkHouse() {
      let that = this;
      let params = {
        id: this.checkId,
        CheckMemo: this.checkMemo,
        Tag: this.checkStatus
      };
      if (params.Tag == 2) {
        if (!util.isNotNull(this.checkMemo)) {
          this.$alert("", "请填写审核失败理由!!!", {
            dangerouslyUseHTMLString: false
          });
          return true;
        }
      }

      this.showPopUp = false;
      this.loading = true;
      this.$api
        .post({
          url: `/agentHouse/propertyCheck/${
            this.row.checkProject == "房源转状态" ? "checkStatus" : "checkHouse"
          }`,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params,
          token: false
        })
        .then(e => {
          let result = e.data;
          that.loading = false;
          that.$message(result.message);
          if (result.code == 200) {
            that.querylistByParams();
            that.CheckMemo = "";
          }
        })
        .catch(e => {
          that.$message("操作失败");
          that.loading = false;
        });
    },
    // remoteInput() {
    //   if (this.comId.length == 0) {
    //     this.remoteMethod();
    //   }
    // },
    // remoteMethod(query) {
    //   var that = this;
    //   if (query !== "") {
    //     this.loading = true;

    //     this.$api
    //       .get({
    //         url: "/mateHouse/queryCommunity",
    //         headers: { "Content-Type": "application/json;charset=UTF-8" },
    //         token: false,
    //         qs: true,
    //         data: {
    //           communityName: query,
    //           page: 1,
    //           limit: 50
    //         }
    //       })
    //       .then(e => {
    //         console.log(e.data.code);
    //         if (e.data.code == 200) {
    //           that.loading = false;
    //           that.comList = e.data.data.list;
    //         }
    //       });
    //   } else {
    //     this.options = [];
    //   }
    // },
    Remove() {
      let tab = this.tableColumn;
      Object.assign(this.$data, this.$options.data.call(this));
      this.tabColumnChange(tab);
      this.querylist(1, "id", "descending");
    },
    tabColumnChange(e) {
      this.tableColumn = e;
    },
    queryCBId() {
      var that = this;
      this.$api
        .get({
          url: "/mateHouse/queryComBuilding",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            comId: that.queryData.comId,
            page: 1,
            limit: 50
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.queryData.roomNo = "";
            that.queryData.cbId = "";
            that.cbIdList = e.data.data.list;
          }
        });
      let obj = {};
      obj = this.comList.find(item => {
        return item.value === that.queryData.comId;
      });
      this.queryData.CommunityName = obj.name;
      this.querylistByParams();
    },
    getTitle(row) {
      this.titleList.forEach(element => {
        if (element.key == row.Type) {
          this.title = element.value;
        }
      });
      this.checkId = row.id;
      this.row = row;
      this.showPopUp = true;
    },
    buildChange() {
      Object.assign(this.$data.houseNoPage, this.$options.data().houseNoPage);
      this.roomNoList = [];
      this.queryRoomNo();
    },
    loadMore() {
      if (this.houseNoPage.currentPage < this.houseNoPage.totalPage) {
        ++this.houseNoPage.currentPage;
        this.queryRoomNo();
      }
    },
    queryRoomNo() {
      var that = this;
      this.HouseNoLoading = true;
      this.$api
        .get({
          url: "/mateHouse/queryBuildIngHouses",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            comId: that.queryData.comId,
            cbId: that.queryData.cbId,
            page: this.houseNoPage.currentPage,
            limit: 300
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.queryData.roomNo = "";
            this.roomNoList = [...this.roomNoList, ...e.data.data.list];
            this.houseNoPage.totalPage = e.data.data.totalPage;
          }
        })
        .finally(() => {
          this.HouseNoLoading = false;
        });
      let obj = {};
      obj = this.cbIdList.find(item => {
        return item.value === that.queryData.cbId;
      });
      this.queryData.cbName = obj.name;
      this.querylistByParams();
    },
    //跳转房源详情页面
    toHouseDetail(row) {
      var that = this;
      this.$api
        .get({
          url: "/agent_house/valid/" + row.eid,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          if (e.data.code == 200) {
            if (e.data.data == 1) {
              util.openPage.call(this, {
                name: "houseDetails",
                params: { houseId: row.eid }
              });
            } else {
              util.openPage.call(this, {
                name: "historyDetails",
                params: { houseId: row.eid, tradeType: 0 }
              });
            }
          }
        });
    },
    querylistByParams() {
      console.log(this.queryData.timeSelect);
      this.querylist(1);
    },
    querylist(currentPage) {
      var that = this;
      that.loading = true;
      let params = {
        limit: that.pageJson.pageSize,
        page: currentPage
      };

      if (Object.keys(this.moreSelect).length != 0) {
        for (let key in this.moreSelect) {
          if (key == "addTime" && this.moreSelect[key] !== "") {
            params.beginTime = this.moreSelect[key][0];
            params.endTime = this.moreSelect[key][1];
          } else if (key == "followTime" && this.moreSelect[key] !== "") {
            params.beginFollowTime = this.moreSelect[key][0];
            params.endFollowTime = this.moreSelect[key][1];
          } else {
            params[key] = this.moreSelect[key];
          }
        }
      } else {
        params.comId = that.queryData.comId;
        params.cbId = that.queryData.cbId;
        params.bhId = that.queryData.roomId;
        params.beginTime = that.queryData.timeSelect[0];
        params.endTime = that.queryData.timeSelect[1];
        params.status = that.status;
        params.checkProject = that.checkProject;
        params.checkTypeStr = that.type;
        params.houseNo = that.queryData.houseNo;
      }
      params.treeCompany = this.treeCondition[0].join(",");
      params.treeDepartment = this.treeCondition[1].join(",");
      params.treeAccount = this.treeCondition[2].join(",");
      params.sortColumn = "id";
      this.$api
        .post({
          url: "/myHouse/myCheckList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params,
          token: false
        })
        .then(e => {
          let result = e.data;
          that.loading = false;
          if (result.code == 200) {
            that.pageJson.total = result.data.checkList.totalCount;
            that.pageJson.currentPage = result.data.checkList.currPage;
            that.tableData = result.data.checkList.list;
            result.data.btnList.forEach(item => {
              if (that.btnDisabled.hasOwnProperty(item.rUrl)) {
                that.btnDisabled[item.rUrl] = false;
              }
            });
          } else {
            console.log("查询我的跟单列表结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询我的跟单失败");
          console.log(e);
        });
    },
    distributeEvent(e, id) {
      this[e](id);
    },
    isForBut(type) {
      let array = [{ name: "查看", isType: "1,2,3", methosName: "" }];
      return array.filter(item => {
        this.item.push("12222222222222222222222222222222222");
        return item.isType.includes(type);
      });
    },
    remoteInput() {
      if (this.queryData.CommunityName.length == 0) {
        this.remoteMethod();
      }
    },
    remoteMethod(query) {
      var that = this;
      if (query !== "") {
        console.log(query);
        this.loading = true;
        this.$api
          .get({
            url: "/community/check",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            token: false,
            qs: true,
            data: {
              communityName: query,
              page: 1,
              limit: 50
            }
          })
          .then(e => {
            console.log(e.data);
            if (e.data.code == 200) {
              that.loading = false;
              that.comList = e.data.data.list;
            }
          });
      } else {
        this.optionsList = [];
      }
      console.log(
        "remoteMethod!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + this.comId
      );
    },
    handleClick() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.querylist(1);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageJson.currentPage = val;
      this.querylist(val);
    },
    handleCheckChange(data, checked, indeterminate) {
      let key = data.type;
      this.chooseTree = []; //清空数组
      this.chooseTree.push(data.businessId);
      if (key == 1) {
        this.getUnderDepartment(data.childrenNodes);
      }
      if (checked) {
        let set = new Set([...this.treeCondition[key], ...this.chooseTree]);
        this.treeCondition[key] = [...set];
      } else {
        this.treeCondition[key] = this.treeCondition[key].filter(item => {
          return !this.chooseTree.includes(item);
        });
      }
      this.querylistByParams(1);
    },
    getUnderDepartment(list) {
      list.forEach(item => {
        if (item.type == 1) {
          this.chooseTree.push(item.businessId);
          if (item.childrenNodes != null && item.childrenNodes.length > 0) {
            this.getUnderDepartment(item.childrenNodes);
          }
        }
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      if (data.labelName != null) {
        return data.labelName.indexOf(value) !== -1;
      }
    },
    getTree() {
      this.treeLoading = true;
      this.$api
        .post({
          url: "/myHouse/myCheckList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            tree: "1"
          }
        })
        .then(e => {
          this.treeLoading = false;
          if (e.data.code == 200 && e.data.data.length > 0) {
            this.treeData = e.data.data;
          }
        })
        .catch(e => {
          this.treeLoading = false;
        });
    }
  }
};
</script>
