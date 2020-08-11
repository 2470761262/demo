<style lang="less" scoped>
.tab-page {
  /deep/.header-tab-cell {
    // prettier-ignore
    height: 50PX;
    font-size: @font16;
    background: rgba(240, 242, 245, 1);
    color: rgba(48, 49, 51, 1);
    font-weight: normal;
    .cell {
      justify-content: center;
      display: flex;
      align-items: center;
      white-space: nowrap;
    }
  }

  /deep/.tab-cell-item {
    // prettier-ignore
    height: 50PX;
    font-size: @font16;
    text-align: center;
    .cell {
      white-space: nowrap;
    }
  }
}

/deep/.caret-wrapper {
  height: auto;
  .sort-caret {
    position: static;
    &:first-child {
      margin-bottom: 3px;
    }
  }
}
.checkTel-type {
  .checkTel-type- {
    &success {
      color: #40a375;
    }
    &error {
      color: red;
    }
  }
}
.tab-page-floot {
  padding-top: 16px;
  padding-bottom: 14px;
  display: flex;
  justify-content: flex-end;
}
/deep/.el-table__header-wrapper {
  position: sticky;
  top: 0px;
  z-index: 10;
}
/deep/.el-table {
  overflow: visible;
  .cell {
    // prettier-ignore
    line-height: 23PX;
  }
}
.operation-btn {
  background: @backgroud;
  color: #fff;
  // prettier-ignore
  margin-right: 10PX;
  font-size: @font14;
  // prettier-ignore
  width: 66PX;
  // prettier-ignore
  padding: 5PX 0;
  border-radius: 4px;
  outline: none;
  border: none;
  cursor: pointer;
  &[disabled] {
    background: @opacityBackground;
    cursor: no-drop;
  }
  &:last-child {
    margin-right: 0;
  }
}
.div-line {
  display: flex;
  .span-width {
    flex: 1;
  }
}
.cus-box {
  display: flex;
}
.el-icon-picture {
  // prettier-ignore
  font-size: 27PX;
  cursor: pointer;
}
</style>
<template>
  <div class="tab-page" v-loading="loading">
    <div class="tab-page-flex">
      <el-table
        :data="renderList"
        header-cell-class-name="header-tab-cell"
        cell-class-name="tab-cell-item"
        @sort-change="sortMethod"
        @row-dblclick="navDetailt"
      >
        <el-table-column
          :fixed="item.fixed"
          v-for="(item, index) in tableColumnField"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :sort-method="sortDevName"
          :sortable="item.order"
          :formatter="item.formart"
          :sort-orders="['ascending', 'descending']"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
    </div>
    <div class="tab-page-floot">
      <el-pagination
        @current-change="currentchange"
        @size-change="handleSizeChange"
        :page-sizes="[30, 50, 70]"
        :page-size="pageJson.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageJson.dataCount"
        :current-page="pageJson.currentPage"
      >
      </el-pagination>
    </div>
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
const dom = document;
import util from "@/util/util";
import { SMALLThumb } from "@/util/constMap";
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
export default {
  inject: ["form"],
  components: {
    ElImageViewer
  },
  mounted() {
    this.resetAccessory = util.deepCopy(this.accessoryFile);
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
      loading: true,
      renderList: [],
      tableColumnField: [
        {
          prop: "communityName",
          label: "楼盘名称"
        },
        {
          prop: "checkProject",
          label: "审核项目"
        },
        {
          prop: "checkType",
          label: "审核类型"
        },
        {
          label: "附件",
          formart: row => {
            if (row.accessory == 1) {
              return (
                <i
                  class="el-icon-picture"
                  onClick={this.getAccessory.bind(this, row)}
                ></i>
              );
            }
          }
        },
        {
          prop: "checkAddPerName",
          label: "提交人"
        },
        {
          prop: "checkAddTime",
          label: "提交时间"
        },
        {
          prop: "checkStatus",
          label: "审核状态"
        },
        {
          prop: "checkMemo",
          label: "审核说明"
        }
      ],
      pageJson: {
        total: 1,
        pageSize: 30,
        currentPage: 1,
        dataCount: 0
      },
      accessoryAllList: [],
      bigAccessoryFile: [],
      resetAccessory: {}, //重置附件
      accessoryTable: false, //是否展示tab切换
      bigAccessoryFileKey: "", //大图展示的key值
      activeName: "first",
      showAccessory: false,
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
      showViewer: false,
      showImgIndexImg: null,
      showImgIndex: 0 //展示大的数组索引
    };
  },
  watch: {
    form: {
      deep: true,
      immediate: true,
      handler: function(value, ordvalue) {
        this.getHouseData(JSON.parse(JSON.stringify(value))).then(() => {
          dom.querySelector(".scroll-tab").scrollTop = 0;
          //  this.$parent.ListeningScroll();
        });
      }
    }
  },
  methods: {
    accesssoryTabClick(tab, event) {
      let key = parseInt(tab.index) + 1;
      this.bigAccessoryFile.forEach(item => {
        item.data = this.accessoryFile[key][item.key];
      });
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
    //解决索引只排序当前页的问题,增加函数自定义索引序号
    sortDevName(str1, str2) {
      let res = 0;
      for (let i = 0; ; i++) {
        if (!str1[i] || !str2[i]) {
          res = str1.length - str2.length;
          break;
        }

        const char1 = str1[i];
        const char1Type = this.getChartType(char1);
        const char2 = str2[i];
        const char2Type = this.getChartType(char2);
        // 类型相同的逐个比较字符
        if (char1Type[0] === char2Type[0]) {
          if (char1 === char2) {
            continue;
          } else {
            if (char1Type[0] === "zh") {
              res = char1.localeCompare(char2);
            } else if (char1Type[0] === "en") {
              res = char1.charCodeAt(0) - char2.charCodeAt(0);
            } else {
              res = char1 - char2;
            }
            break;
          }
        } else {
          // 类型不同的，直接用返回的数字相减
          res = char1Type[1] - char2Type[1];
          break;
        }
      }

      if (this.form.sortColumn == "floor") {
        res = str1.floor > str2.floor ? 1 : -1;
      } else if (this.form.sortColumn == "addTime") {
        res = str1.addTime > str2.addTime ? 1 : -1;
      }

      return res;
    },
    getChartType(char) {
      // 数字可按照排序的要求进行自定义，我这边产品的要求是
      // 数字（0->9）->大写字母（A->Z）->小写字母（a->z）->中文拼音（a->z）
      if (/^[\u4e00-\u9fa5]$/.test(char)) {
        return ["zh", 300];
      }
      if (/^[a-zA-Z]$/.test(char)) {
        return ["en", 200];
      }
      if (/^[0-9]$/.test(char)) {
        return ["number", 100];
      }
      return ["others", 999];
    },
    /**
     * @example: 双击前往详情
     */
    navDetailt(item) {
      util.openPage.call(this, {
        name: "houseDetails",
        params: { houseId: item.eid, dept: item.perDept }
      });
    },
    /**
     * @example: 远程排序
     */
    sortMethod(item) {
      let order = JSON.parse(JSON.stringify(item));
      this.InitPageJson();
      //this.pageJson.currentPage = 1;
      switch (order.order) {
        case "ascending":
          this.form.sortColumn = order.prop;
          this.form.sortType = 0;
          break;
        case "descending":
          this.form.sortColumn = order.prop;
          this.form.sortType = 1;
      }
    },
    handleSizeChange(pageSize) {
      this.pageJson.pageSize = pageSize;
      this.getHouseData(JSON.parse(JSON.stringify(this.form)), true);
    },
    /**
     * @example: 分页组件页面改变时触发
     * @param {number} pageIndex
     */

    currentchange(pageIndex) {
      this.pageJson.currentPage = pageIndex;
      this.getHouseData(JSON.parse(JSON.stringify(this.form)), false).then(
        () => {
          dom.querySelector(".scroll-tab").scrollTop = 0;
          // this.$parent.ListeningScroll();
        }
      );
    },
    InitPageJson() {
      this.pageJson = {
        total: 1,
        currentPage: 1,
        pageSize: this.pageJson.pageSize,
        dataCount: 0
      };
    },
    getHouseData(value, initPage = true) {
      this.loading = true;
      if (initPage) this.InitPageJson();

      let params = Object.assign({}, value, {
        page: this.pageJson.currentPage,
        limit: this.pageJson.pageSize
      });

      if (params.time && params.time.length == 2) {
        params.beginTime = params.time[0];
        params.endTime = params.time[1];
      }
      delete params.time;
      return this.$api
        .post({
          url: "/myHouse/myCheckList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params
        })
        .then(e => {
          let data = e.data;
          if (data.code == 200) {
            this.renderList = data.data.checkList.list;
            this.pageJson.total = data.data.checkList.totalPage;
            this.pageJson.dataCount = data.data.checkList.totalCount;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
