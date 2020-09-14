<template>
  <!-- 买卖房源-审核列表 -->
  <div class="examine-container">
    <breadcrumb></breadcrumb>
    <nav-menu :navMenuIndex="1"></nav-menu>
    <tabs :navActiveIndex="4"></tabs>
    <div class="conditions">
      <div class="conditions-box">
        <el-row :gutter="32">
          <el-form label-position="right" label-width="80px">
            <el-col :span="12">
              <el-row :gutter="10">
                <el-form-item label="楼盘">
                  <el-col :span="8">
                    <el-select
                      class="anchor-point"
                      popper-class="anchor-point"
                      data-anchor="审核列表楼盘 => select"
                      @click.native="log_socket.sendUserActionData"
                      v-model="buildOptData"
                      placeholder="楼盘"
                      clearable
                      filterable
                      remote
                      @focus="remoteBuildInput"
                      @change="remoteBuildChange"
                      :remote-method="buildRemoteMethod"
                      :loading="buildLoading"
                      value-key="value"
                    >
                      <el-option
                        class="anchor-point"
                        :data-anchor="
                          '审核列表楼盘 => select => option:' + item.name
                        "
                        @click.native="log_socket.sendUserActionData"
                        v-for="item in buildForList"
                        :key="item.value"
                        :label="item.name"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-select
                      class="anchor-point"
                      popper-class="anchor-point"
                      data-anchor="审核列表栋座 => select"
                      @click.native="log_socket.sendUserActionData"
                      v-model="towerOptData"
                      placeholder="栋座"
                      clearable
                      filterable
                      remote
                      :remote-method="queryRoomNo"
                      @change="remoteRoomNoChange"
                      :loading="towerLoading"
                      value-key="value"
                    >
                      <el-option
                        class="anchor-point"
                        :data-anchor="
                          '审核列表栋座 => select => option:' + item.name
                        "
                        @click.native="log_socket.sendUserActionData"
                        v-for="item in towerForList"
                        :key="item.value"
                        :label="item.name"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-select
                      class="anchor-point"
                      popper-class="anchor-point"
                      data-anchor="审核列表房号 => select"
                      @click.native="log_socket.sendUserActionData"
                      v-model="roomOptData"
                      placeholder="请输入房号"
                      clearable
                      filterable
                      remote
                      :remote-method="queryRoomData"
                      @change="queryRoomDataChange"
                      :loading="roomLoading"
                      value-key="value"
                    >
                      <el-option
                        class="anchor-point"
                        :data-anchor="
                          '审核列表房号 => select => option:' + item.name
                        "
                        @click.native="log_socket.sendUserActionData"
                        v-for="item in roomForList"
                        :key="item.value"
                        :label="item.name"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-row>
            </el-col>
            <el-col :span="6">
              <el-form-item label="提交时间">
                <el-date-picker
                  prefix-icon="prefix-icon"
                  v-model="conditions.timeSelect"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="起始时间"
                  end-placeholder="结束时间"
                  value-format="yyyy-MM-dd"
                  @change="query(1)"
                  :default-time="['00:00:00', '23:59:59']"
                  class="anchor-point"
                  :data-anchor="
                    '审核列表搜索 提交时间:' + conditions.timeSelect
                  "
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="房源编号">
                <el-input
                  v-model="conditions.houseNo"
                  placeholder="请输入房源编号"
                  @change="query(1)"
                  class="anchor-point"
                  :data-anchor="'审核列表搜索 房源编号:' + conditions.houseNo"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审核项目">
                <el-select
                  class="width100 anchor-point"
                  popper-class="anchor-point"
                  data-anchor="审核列表审核项目 => select"
                  @click.native="log_socket.sendUserActionData"
                  filterable
                  v-model="checkProject"
                  clearable
                  @change="reviewProject"
                  placeholder="请选择"
                >
                  <el-option
                    class="anchor-point"
                    :data-anchor="
                      '审核列表审核项目 => select => option:' + item.label
                    "
                    @click.native="log_socket.sendUserActionData"
                    v-for="item in checkProjectList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审核类型">
                <el-select
                  class="width100 anchor-point"
                  popper-class="anchor-point"
                  data-anchor="审核列表审核类型 => select"
                  @click.native="log_socket.sendUserActionData"
                  filterable
                  v-model="type"
                  clearable
                  @change="querylistByParams"
                  placeholder="请选择"
                >
                  <el-option
                    class="anchor-point"
                    :data-anchor="
                      '审核列表审核类型 => select => option:' + item.label
                    "
                    @click.native="log_socket.sendUserActionData"
                    v-for="item in typeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审核状态">
                <el-select
                  class="width100 anchor-point"
                  popper-class="anchor-point"
                  data-anchor="审核列表审核状态 => select"
                  @click.native="log_socket.sendUserActionData"
                  filterable
                  v-model="status"
                  clearable
                  @change="querylistByParams"
                  placeholder="请选择"
                >
                  <el-option
                    class="anchor-point"
                    :data-anchor="
                      '审核列表审核状态 => select => option:' + item.label
                    "
                    @click.native="log_socket.sendUserActionData"
                    v-for="item in stateList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <div class="conditions-btn">
        <button
          class="btn anchor-pointn"
          @click="reset"
          data-anchor="审核列表重置"
        >
          重置
        </button>
        <button
          class="btn active anchor-pointn"
          @click="query(1)"
          data-anchor="审核列表搜索"
        >
          搜索
        </button>
      </div>
    </div>
    <div class="main">
      <div class="right">
        <div class="right-panel">
          <div class="search">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <div class="scroll-tree">
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
        </div>
      </div>
      <div class="content">
        <div class="table">
          <el-table
            :data="tableData"
            @sort-change="changeWorkSort"
            height="100%"
            v-loading="loading"
            ref="tableList"
            @cell-dblclick="toHouseDetail"
          >
            <el-table-column
              fixed="left"
              prop="communityName"
              label="楼盘名称"
              width="150"
              align="left"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="checkProject"
              label="审核项目"
              min-width="80"
              align="right"
            >
            </el-table-column>
            <el-table-column
              prop="checkType"
              label="审核类型"
              min-width="80"
              align="right"
            >
            </el-table-column>
            <el-table-column label="附件" min-width="40" align="right">
              <template v-slot="scope">
                <span>{{ scope.row.accessory == 1 ? "有" : "无" }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="举报原因"
              v-if="checkProject == '11'"
              min-width="200"
            >
              <template v-slot="scope">
                {{ scope.row.ownerMemo }}
              </template>
            </el-table-column>
            <el-table-column
              prop="checkAddPerName"
              label="提交人"
              min-width="50"
              align="right"
            >
            </el-table-column>
            <el-table-column
              prop="checkAddTime"
              label="提交时间"
              min-width="100"
              align="right"
              :sortable="true"
              :sort-orders="['ascending', 'descending']"
            >
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="180">
              <template v-slot="scope">
                <el-button
                  class="anchor-point"
                  type="text"
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
                  type="text"
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
                  type="text"
                  v-if="scope.row.tag != 0"
                  class="examine anchor-point"
                  >已审核</el-button
                >
                <el-button
                  data-anchor="审核列表查看详情 => click"
                  class="anchor-point"
                  type="text"
                  v-if="scope.row.accessory == 1"
                  @click="getAccessory(scope.row)"
                  size="mini"
                  >查看附件</el-button
                >
                <el-button
                  data-anchor="审核列表查看详情 => click"
                  class="examine anchor-point"
                  type="text"
                  v-else
                  size="mini"
                  >查看附件</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageJson.page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageJson.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageJson.total"
        >
        </el-pagination>
      </div>
    </div>
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
import breadcrumb from "../components/entranceBreadcrumb.vue";
import navMenu from "../components/entranceNavMenu.vue";
import tabs from "./components/tabs.vue";
import util from "@/util/util";
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import { SMALLThumb } from "@/util/constMap";
export default {
  components: {
    breadcrumb,
    navMenu,
    tabs,
    ElImageViewer
  },
  data() {
    return {
      filterText: "",
      treeData: [], //结构树
      treeLoading: false,
      treeCondition: {
        0: [], //公司数组
        1: [], //部门数组
        2: [] //人员数组
      },
      defaultProps: {
        children: "childrenNodes",
        label: "labelName"
      },
      loading: false,
      accessoryAllList: [],
      bigAccessoryFile: [],
      checkProject: "",
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
      type: "",
      typeList: defaultCheck,
      status: "",
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
      conditions: {
        comId: "",
        cbId: "",
        bhId: "",
        houseNo: "",
        timeSelect: []
      },
      buildLoading: false, //楼盘select loading
      buildOptData: {}, //当前楼盘选择数据
      buildForList: [], //楼盘select数据
      towerLoading: false, //栋座select loading
      towerOptData: {}, //栋座选中数据
      towerForList: [], //栋座select数据
      roomLoading: false, //房间号select loading
      roomOptData: {}, //房间号选中数据
      roomForList: [], //房间号select数据
      sortColumn: "id",
      sortType: 1,
      tableData: [],
      pageJson: {
        page: 1,
        limit: 10,
        total: 0,
        pageSum: 0
      },
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      btnDisabled: {
        checkHouse: true,
        checkStatus: true
      },
      showAccessory: false,
      showViewer: false,
      showImgIndexImg: null,
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
      chooseTree: [], //选中的树节点
      activeName: "first",
      resetAccessory: {}, //重置附件
      accessoryTable: false, //是否展示tab切换
      bigAccessoryFileKey: "", //大图展示的key值
      showImgIndex: 0, //展示大的数组索引
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
      checkId: 0,
      row: {},
      showPopUp: false,
      checkStatus: 1,
      checkMemo: ""
    };
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
      return result;
    }
  },
  watch: {
    filterText(val) {
      this.$refs.treeForm.filter(val);
    }
  },
  created() {
    this.getTree();
    this.query();
  },
  mounted() {
    this.resetAccessory = util.deepCopy(this.accessoryFile);
  },
  methods: {
    /**
     * @example: 作业数据排序变化触发事件
     */
    changeWorkSort({ column, prop, order }) {
      this.sortColumn = prop;
      this.sortType = order == "ascending" ? 0 : 1;
      Object.assign(this.pageJson, this.$options.data().pageJson);
      this.query();
    },
    /**
     * @example: 改变每页请求数据数量
     * @param {val} 请求数
     * @param {type} 分页类型
     */
    handleSizeChange(val) {
      this.pageJson.limit = val;
      this.query();
    },
    /**
     * @example: 改变分页当前页码
     * @param {val} 页码
     * @param {type} 分页类型
     */
    handleCurrentChange(val) {
      this.pageJson.page = val;
      this.query(val);
    },
    getTree() {
      this.treeLoading = true;
      //读取树数据
      this.$api
        .post({
          url: "/myHouse/myCheckList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            tree: "1"
          }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            this.treeData = result.data;
          }
        })
        .catch(e => {
          console.log(e, "读取失败");
        })
        .finally(e => {
          this.treeLoading = false;
        });
    },
    handleCheckChange(data, checked, node) {
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
      this.query();
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
    /**
     * @example: 楼盘激活第一时获取数据
     */
    remoteBuildInput() {
      // this.buildForList.length === 0 && this.buildRemoteMethod();
      this.buildRemoteMethod();
    },
    /**
     * @example: 远程获取楼盘信息
     */
    buildRemoteMethod(query) {
      this.buildLoading = true;
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
          if (e.data.code == 200) {
            this.buildForList = e.data.data.list;
          }
        })
        .finally(() => {
          this.buildLoading = false;
        });
    },
    /**
     * @example: 楼盘选择更改触发事件
     * @param {Obejct} item 当前选中对象
     */
    remoteBuildChange(item) {
      const { name = undefined, value = undefined } = item;

      //如果删除或者手动删除传入空字符串将会把楼栋数据清理为空字符串
      this.conditions.comId = value ? value : "";

      //清理楼栋数据
      this.towerForList = [];
      this.conditions.cbId = "";
      this.towerOptData = {};

      //清理房间号数据
      this.conditions.bhId = "";
      this.roomOptData = {};
      this.roomForList = [];

      this.query();
      //获取楼栋select
      this.queryRoomNo();
    },
    /**
     * @example: 获取栋座远程数据
     * @param {String} name 栋座名称
     */
    queryRoomNo(name) {
      this.towerLoading = true;
      this.$api
        .get({
          url: "/mateHouse/queryComBuilding",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comBuildingName: name == undefined ? "" : name.trim(),
            comId: this.conditions.comId,
            page: 1,
            limit: 100
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.towerForList = e.data.data.list;
          }
        })
        .finally(() => {
          this.towerLoading = false;
        });
    },
    /**
     * @example: 楼栋选择更改触发事件
     * @param {Obejct} item 当前选中对象
     */
    remoteRoomNoChange(item) {
      const { name = undefined, value = undefined } = item;

      //如果删除或者手动删除传入空字符串将会把楼栋数据清理为空字符串
      this.conditions.cbId = value ? value : "";

      //清理房间号数据
      this.conditions.bhId = "";
      this.roomOptData = {};
      this.roomForList = [];

      this.query();
      //获取房间号数据
      this.queryRoomData();
    },
    /**
     * @example: 远程获取房间号信息
     * @param {String} e 输入搜索的文本
     */
    queryRoomData(e) {
      this.$api
        .get({
          url: "/mateHouse/queryBuildIngHouses",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comId: this.conditions.comId,
            cbId: this.conditions.cbId,
            page: 1,
            limit: 500,
            roomNo: e == undefined ? "" : e.trim()
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.roomForList = e.data.data.list;
          }
        })
        .finally(() => {
          this.towerLoading = false;
        });
    },
    /**
     * @example:房间号修改选中触发事件
     * @param {Ojbect} item 选中时选中的数据
     */
    queryRoomDataChange(item) {
      const { name = undefined, value = undefined } = item;

      this.conditions.bhId = value ? value : "";
      this.query();
    },
    /**
     * @example: 搜索
     */
    query(currentPage = 1) {
      this.pageJson.page = currentPage;
      this.loading = true;
      let params = { limit: this.pageJson.limit, page: currentPage };
      params.comId = this.conditions.comId;
      params.cbId = this.conditions.cbId;
      params.bhId = this.conditions.bhId;
      params.beginTime = this.conditions.timeSelect
        ? this.conditions.timeSelect[0]
        : undefined;
      params.endTime = this.conditions.timeSelect
        ? this.conditions.timeSelect[1]
        : undefined;
      params.houseNo = this.conditions.houseNo;

      params.status = this.status;
      params.checkProject = this.checkProject;
      params.checkTypeStr = this.type;
      params.treeCompany = this.treeCondition[0].join(",");
      params.treeDepartment = this.treeCondition[1].join(",");
      params.treeAccount = this.treeCondition[2].join(",");
      params.sortColumn = this.sortColumn;
      params.sortType = this.sortType;
      this.$api
        .post({
          url: "/myHouse/myCheckList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params,
          token: false
        })
        .then(e => {
          let data = e.data;
          if (data.code == 200) {
            this.$refs.tableList.bodyWrapper.scrollTop = 0;
            this.pageJson.total = data.data.checkList.totalCount;
            this.tableData = data.data.checkList.list;
            // let btnList = data.data.btnList;
            data.data.btnList.forEach(item => {
              if (this.btnDisabled.hasOwnProperty(item.rUrl)) {
                this.btnDisabled[item.rUrl] = false;
              }
            });
          }
        })
        .catch(e => {
          console.log("查询审核列表失败");
          console.log(e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * 重置查询条件
     */
    reset() {
      Object.assign(this.$data.conditions, this.$options.data().conditions);
      this.buildOptData = {};
      this.towerOptData = {};
      this.roomOptData = {};
      this.checkProject = "";
      this.type = "";
      this.status = "";
      this.query();
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
    querylistByParams() {
      this.query();
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
    iamgeViewClose() {
      this.showViewer = false;
      this.showImgIndexImg = null;
    },
    changeShowImg(url, index) {
      this.showViewer = true;
      this.showImgIndex = index;
      this.showImgIndexImg = url.replace(SMALLThumb, "");
    },
    accesssoryTabClick(tab, event) {
      let key = parseInt(tab.index) + 1;
      this.bigAccessoryFile.forEach(item => {
        item.data = this.accessoryFile[key][item.key];
      });
    },
    /**
     * 审核
     */
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
    //跳转房源详情页面
    toHouseDetail(row) {
      if (row.tag === 1) return;
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
    }
  }
};
</script>
<style lang="less">
.children-page {
  height: 100%;
}
</style>
<style lang="less" scoped>
.el-select-dropdown__item {
  // prettier-ignore
  height: 40PX;
  // prettier-ignore
  line-height: 40PX;
  font-size: @font14;
}
.examine-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  .conditions {
    // prettier-ignore
    padding: 0 24PX 20PX 24PX;
    background: #fff;
    // prettier-ignore
    border-bottom-left-radius: 8PX;
    // prettier-ignore
    border-bottom-right-radius: 8PX;
    /deep/.conditions-box {
      .el-form-item__label {
        // prettier-ignore
        line-height: 36PX;
        font-weight: bold;
        font-size: @font14;
        color: #303133;
      }
      .el-input__inner {
        // prettier-ignore
        height: 36PX;
        font-size: @font14;
      }
      .el-form-item {
        // prettier-ignore
        margin-bottom: 16PX;
      }
      .el-range-input {
        text-align: left;
        // prettier-ignore
        text-indent: 5PX;
        font-size: @font14;
      }
      .prefix-icon {
        width: 0;
      }
      .el-date-editor {
        width: 100%;
        .el-range-separator {
          display: flex;
          justify-content: center;
          align-items: center;
          width: auto;
          padding: 0;
          line-height: 1;
          text-indent: 0;
          font-size: @font14;
        }
      }
      .width100 {
        width: 100%;
      }
    }
    .conditions-btn {
      display: flex;
      justify-content: flex-end;
      .btn {
        // prettier-ignore
        width: 90PX;
        // prettier-ignore
        height: 36PX;
        border: none;
        border-radius: 4px;
        background: #fff;
        outline: none;
        line-height: 1;
        text-align: center;
        font-size: @font12;
        color: @backgroud;
        cursor: pointer;
        &.active {
          // prettier-ignore
          margin-left: 9PX;
          background: @backgroud;
          color: #fff;
        }
      }
    }
  }
  .main {
    flex: 1;
    display: flex;
    flex-direction: row;
    // prettier-ignore
    min-height: 300PX;
    // prettier-ignore
    margin-top: 16PX;
    // prettier-ignore
    padding: 16PX;
    background: #fff;
    border-radius: 8px;
    /deep/.right {
      display: flex;
      flex-direction: column;
      // prettier-ignore
      width: 224PX;
      height: 100%;
      // prettier-ignore
      margin-right: 16PX;
      background: #f0f7f7;
      .right-panel {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 0;
        .search {
          // prettier-ignore
          padding: 10PX;
          .el-input__prefix {
            left: 0;
            .el-input__icon {
              // prettier-ignore
              width: 30PX;
              // prettier-ignore
              line-height: 36PX;
              font-size: @font14;
            }
          }
          .el-input--prefix .el-input__inner {
            // prettier-ignore
            height: 36PX;
            padding-left: 30px;
            // prettier-ignore
            line-height: 36PX;
            border: none;
            font-size: @font14;
          }
        }
        .scroll-tree {
          flex: 1;
          background: #f0f7f7;
          overflow: auto;
        }
        /deep/.el-tree {
          background: inherit;
          .el-tree-node__content {
            // prettier-ignore
            height: 40PX;
            .el-icon-caret-right {
              font-size: @font14;
              color: #8ebebe;
            }
            .is-leaf {
              color: transparent !important;
            }
            .el-tree-node__label {
              font-size: @font14;
            }
            .el-checkbox {
              .el-checkbox__inner {
                // prettier-ignore
                width: 16PX;
                // prettier-ignore
                height: 16PX;
                font-size: @font14;
                &::after {
                  // prettier-ignore
                  height: 10PX;
                  // prettier-ignore
                  left:5PX;
                  // prettier-ignore
                  width: 3PX;
                }
              }
            }
          }
          .el-tree-node > .el-tree-node__children {
            overflow: inherit !important;
          }
        }
        /deep/.is-focusable {
          .el-tree-node__children {
            background: #d5f0f0;
          }
        }
      }
    }
    /deep/.content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .table {
        flex: 1;
        display: flex;
        .caret-wrapper {
          // prettier-ignore
          width: 15PX;
          // prettier-ignore
          height: 14PX;
          .sort-caret.ascending {
            // prettier-ignore
            top: -5PX;
          }
          .sort-caret.descending {
            // prettier-ignore
            bottom: -3PX;
          }
        }
        .has-gutter:not(.is-group) {
          background: #f0f5f4;
          tr:nth-child(1) {
            th:nth-child(1) {
              .cell {
                // prettier-ignore
                padding-left: 16PX;
              }
            }
            th:nth-last-child(2) {
              .cell {
                // prettier-ignore
                padding-right: 16PX;
              }
            }
          }
        }
        .el-table__body-wrapper {
          tr {
            td:nth-child(1) {
              .cell {
                // prettier-ignore
                padding-left: 16PX;
              }
            }
            td:last-child {
              .cell {
                // prettier-ignore
                padding-right: 16PX;
              }
            }
          }
        }
        .el-table {
          td {
            .cell {
              line-height: 1;
              font-size: @font16;
              color: #606266;
            }
          }
          th {
            // prettier-ignore
            height: 48PX;
            padding: 0;
            background: #f0f5f4;
            font-weight: normal;
            font-size: @font16;
            color: #303133;
            .cell {
              line-height: 1;
            }
          }
        }
        .el-table__body td {
          // prettier-ignore
          height: 64PX;
        }
        .el-button--mini,
        .el-button--small {
          // prettier-ignore
          min-width: 60PX;
          // prettier-ignore
          margin-left: 16PX;
          padding: 0;
          text-align: left;
          font-size: @font16;
          &.examine {
            color: #a7a7a7;
          }
        }
      }
      .el-pagination {
        // prettier-ignore
        padding: 24PX 5PX 8PX;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .el-pager li,
        .btn-next .el-icon,
        .btn-prev .el-icon,
        button,
        span:not([class*="suffix"]) {
          height: auto;
          line-height: 1;
          font-size: @font16;
          font-weight: normal;
        }
        .el-select .el-input {
          // prettier-ignore
          width: 80PX;
        }
        .el-pagination__sizes .el-input .el-input__inner {
          // prettier-ignore
          height: 22PX;
          // prettier-ignore
          line-height: 20PX;
          font-size: @font14;
        }
        .el-pager .more::before {
          line-height: 1;
        }
        .el-pagination__editor {
          height: auto;
          .el-input__inner {
            // prettier-ignore
            height: 22PX;
          }
        }
        .el-input--mini .el-input__icon {
          line-height: 1;
        }
      }
      .el-table--border,
      .el-table--group {
        border: none;
      }
      .el-table--border::after,
      .el-table--group::after,
      .el-table::before {
        background-color: transparent;
      }
      .el-table--border td {
        border-right: none;
      }
      .is-group {
        tr:first-child {
          th:nth-child(2),
          th:nth-child(3),
          th:nth-child(4) {
            border-bottom: 1px solid #c3dfd9;
            border-right: 1px solid #c3dfd9;
          }
          th:nth-child(5) {
            border-bottom: 1px solid #c3dfd9;
          }
        }
        tr:nth-child(2) {
          th:nth-child(3),
          th:nth-child(6),
          th:nth-child(9) {
            border-right: 1px solid #c3dfd9;
          }
        }
      }
    }
  }
}
</style>
