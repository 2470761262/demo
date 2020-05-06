<style lang="less" scoped>
.right {
  float: right;
}
.el-aside {
  border: 1px solid black;
  min-height: 600px;
}
.innerContainer {
  border: 1px solid red;
}
.el-header {
  margin-top: 10px;
}
.el-top {
  margin-top: 600px;
}

.treeTitle {
  font-size: 20px;
  text-align: center;
  border-radius: 1em;
  background-color: bisque;
}
.left-input-container {
  padding: 10px;
  font-size: 20px;
  border-right: 1px solid black;
  border-left: 1px solid black;
  border-radius: 0.5rem;
  .el-input {
    width: 80%;
  }
  span {
    margin-right: 10px;
    margin-left: 5px;
  }
}

.editorContainer {
  width: 100%;
  margin-top: 130px;
}
.myQuillEditor {
  height: 500px;
}
.upload-demo {
  display: none;
}
</style>
<template>
  <div>
    <el-container>
      <el-container>
        <el-header>
          <div class="left-input-container">
            <span>参数编号-参数名称-参数类型</span>
            <div>{{notice.configId}}-{{notice.configName}}-{{notice.configNo}}</div>
          </div>
          <div class="left-input-container">
            <span>公司参数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-select v-model="notice.comId"
                       placeholder="请选择">
              <el-option v-for="item in companyDefault"
                         :key="item.value"
                         :label="item.CompanyName"
                         :value="item.value"></el-option>
              <el-option v-for="item in tableData"
                         :key="item.id"
                         :label="item.companyName"
                         :value="item.id"></el-option>
            </el-select>
          </div>
          <div class="left-input-container">
            <span>参数范围&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-select v-model="notice.parRange"
                       placeholder="请选择">
              <el-option v-for="item in parRange"
                         :key="item.id"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="left-input-container">
            <span>关联对象&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-select v-model="notice.configObject"
                       placeholder="请选择">
              <el-option v-for="item in configObject"
                         :key="item.id"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="left-input-container">
            <span>参数一&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-input type="text"
                      placeholder="请输入内容"
                      v-model="notice.paraNum1"
                      maxlength="10"
                      show-word-limit></el-input>
          </div>
          <div class="left-input-container">
            <span>参数二&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-input type="text"
                      placeholder="请输入内容"
                      v-model="notice.paraNum2"
                      maxlength="10"
                      show-word-limit></el-input>
          </div>
          <div class="left-input-container">
            <span>参数三&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-input type="text"
                      placeholder="请输入内容"
                      v-model="notice.paraNum3"
                      maxlength="10"
                      show-word-limit></el-input>
          </div>
          <div class="left-input-container">
            <span>参数四&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-input type="text"
                      placeholder="请输入内容"
                      v-model="notice.paraNum4"
                      maxlength="10"
                      show-word-limit></el-input>
          </div>
          <div class="left-input-container">
            <span>备注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-input type="text"
                      placeholder="请输入内容"
                      v-model="notice.configMemo"
                      maxlength="100"
                      show-word-limit></el-input>
          </div>
          <div class="left-input-container">
            <span>时间单位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-select v-model="notice.unit"
                       placeholder="请选择">
              <el-option v-for="item in unit"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="left-input-container">
            <span>是否允许&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-select v-model="notice.paraIsAllowed"
                       placeholder="请选择">
              <el-option v-for="item in paraIsAllowed"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </div>
        </el-header>

        <div class="footerContainer el-top">
          <el-button type="primary"
                     @click="sendNotice">发送</el-button>
          <el-button @click="post"
                     v-if="hide==false">取消</el-button>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction 

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image"],
  ["clean"] // remove formatting button
];
import but from '@/evenBus/but'
import getMenuRid from '@/minxi/getMenuRid';
export default {
  mixins: [getMenuRid],
  components: { quillEditor },
  props: {},
  data () {
    return {
      quill: null,

      notice: {
        CompanyName: null,
        configId: null,
        paraNum1: null,
        paraNum2: null,
        paraNum3: null,
        unit: null,
        comId: null,
        paraIsAllowed: null,
        configObject: null,
        paraNum4: null,
        addPer: null, //44430,
        configNo: null,
        configMemo: null,
        configName: null,
        newsClass: null,
        newsType: null,
        sendType: null
      },
      editorOption: {
        placeholder: "请输入公告内容",
        readOnly: false,
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              link: function (v) {
                if (v) {
                  var href = prompt("Enter the URL");
                  this.quill.format("link", href);
                }
              }
            }
          }
        }
      },
      unit: [
        {
          value: "-1",
          label: "默认"
        },
        {
          value: "0",
          label: "小时"
        },
        {
          value: "1",
          label: "天"
        },
        {
          value: "2",
          label: "月"
        },
        {
          value: "3",
          label: "秒"
        },
        {
          value: "4",
          label: "分"
        },
        {
          value: "5",
          label: "套"
        },
        {
          value: "6",
          label: "%"
        }
      ],
      paraIsAllowed: [
        {
          value: "-1",
          label: "默认"
        },
        {
          value: "1",
          label: "允许"
        },
        {
          value: "0",
          label: "不予许"
        }
      ],
      configObject: [
        {
          value: "0",
          label: "默认"
        },
        {
          value: "1",
          label: "人员"
        },
        {
          value: "2",
          label: "部门"
        },
        {
          value: "3",
          label: "岗位"
        }
      ],
      companyDefault: [
        {
          value: "0",
          CompanyName: "默认"
        },

      ],
      parRange: [
        {
          value: "-1",
          label: "默认"
        },
        {
          value: "0",
          label: "个人"
        },
        {
          value: "1",
          label: "部门"
        },
        {
          value: "2",
          label: "部门名下"
        },
        {
          value: "3",
          label: "公司"
        }
      ],
      company: [],
      tableData: [],
      hide: false
    };
  },
  watch: {},
  computed: {},
  mounted () { },
  methods: {
    queryCompanyDatas (currentPage) {
      let params = { limit: 1000, page: currentPage };
      let that = this;

      this.$api
        .post({
          url: "/company/companyList",
          data: params,
          token: false,
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            console.log(result.data);

            this.tableData = result.data.list;
            console.log(typeof (result.data.list[0].id), typeof (this.notice.comId));
          } else {
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询公司管理列表失败");
          console.log(e);
        });
    },
    updateObjectDetail (id) {
      let that = this;
      this.$api.get({
        url: '/Set/setUpId',
        data: {
          id: id
        },
        token: false
      }).then((e) => {

        let result = e.data;
        console.log(result);
        if (result.code == 200) {
          that.notice.configId = result.data.SysParId
          that.notice.configMemo = result.data.memo
          that.notice.comId = parseInt(result.data.comid)
          that.notice.configName = result.data.sysParName
          that.notice.configNo = result.data.sysParNo
          that.notice.paraNum1 = result.data.paraNum
          that.notice.paraNum2 = result.data.paraTwoNum
          that.notice.paraNum3 = result.data.paraNumStr
          that.notice.unit = result.data.unit
          that.notice.paraNum4 = result.data.paraFourNum
          that.notice.parRange = result.data.parRange
          that.notice.configObject = result.data.sysParObj
          that.notice.paraIsAllowed = result.data.paraIsAllowed
          that.notice.CompanyName = result.data.companyName
        } else {
          console.log("修改详情结果：" + result.message);

        }
      }).catch((e) => {
        console.log("修改详情失败");
        console.log(e);
      })
    },
    sendNotice () {
      let that = this.notice;
      if (this.notice.comId == null) {
        this.$message({
          showClose: true,
          message: "公司参数",
          type: "warning"
        });
        return;
      }
      if (this.notice.configNo == null) {
        this.$message({
          showClose: true,
          message: "参数名称",
          type: "warning"
        });
        return;
      }

      if (this.notice.paraNum1 == null) {
        this.$message({
          showClose: true,
          message: "参数1",
          type: "warning"
        });
        return;
      }
      if (this.notice.unit == null) {
        this.$message({
          showClose: true,
          message: "时间单位",
          type: "warning"
        });
        return;
      }
      if (this.$route.params.objectId == undefined) {
        this.$api.get({
          url: "/Set/companyAdd",
          data: {
            sysParObj: that.configObject,
            sysParID: that.configId,
            relationId: "0",
            paraIsAllowed: that.paraIsAllowed,
            parRange: that.parRange,
            paraNum: that.paraNum1,
            paraTwoNum: that.paraNum2,
            paraNumStr: that.paraNum3,
            paraNumFour: that.paraNum4,
            remark: that.configMemo,
            comId: this.notice.comId,
            unit: that.unit
          },
          token: false,
          headers: { "Content-Type": "application/json" }
        })
          .then(e => {
            console.log(e.data);
            let result = e.data;
            if (result.code == 200) {
              this.$alert("", "添加成功", {
                dangerouslyUseHTMLString: false
              });
              this.$router.push({ path: "/sys/systemConfigList" });
              console.log(result.data);
              this.$message({ message: result.message });
            } else {
              console.log("添加失败:" + result.message);
              alert(result.message);
            }
          })
          .catch(e => {
            console.log("添加失败");
            console.log(e);
          });
      }
      else {
        this.$api.get({
          url: "/Set/companyUpdate",
          data: {
            id: this.$route.params.objectId,
            sysParObj: that.configObject,
            sysParID: that.configId,
            relationId: "0",
            paraIsAllowed: that.paraIsAllowed,
            parRange: that.parRange,
            paraNum: that.paraNum1,
            paraTwoNum: that.paraNum2,
            paraNumStr: that.paraNum3,
            paraNumFour: that.paraNum4,
            remark: that.configMemo,
            comId: this.notice.comId,
            unit: that.unit
          },
          token: false,
          headers: { "Content-Type": "application/json" }
        })
          .then(e => {
            console.log(e.data);
            let result = e.data;
            if (result.code == 200) {
              this.$router.push({ path: "/sys/configObjectList" });
              this.$alert("", "修改成功", {
                dangerouslyUseHTMLString: false
              });

              console.log(result.data);
              this.$message({ message: result.message });
            } else {
              console.log("修改失败:" + result.message);
              alert(result.message);
            }
          })
          .catch(e => {
            console.log("修改失败");
            console.log(e);
          });

      }
    },

    post () {
      this.$router.push({ path: "/sys/systemConfigList" });
    }
  },
  mounted () {
    but.$emit('asideNav', false);
  },
  created () {

    but.$emit('asideNav', false);
    if (this.$route.params.objectId !== undefined) {
      this.hide = true;
      this.queryCompanyDatas(1);
      this.updateObjectDetail(this.$route.params.objectId);

    } else {
      this.queryCompanyDatas(1);
      this.notice.configId = this.$route.params.configId;
      console.log(this.configId, 111111111);
      this.notice.configNo = this.$route.params.sysParNo;
      this.notice.configName = this.$route.params.sysParName;
      this.notice.paraIsAllowed = this.paraIsAllowed[0].value
      this.notice.configObject = this.configObject[0].value
      this.notice.parRange = this.parRange[0].value
      this.notice.unit = this.unit[0].value
      this.notice.comId = this.companyDefault[0].value
    }

  },
  destroyed () {
    but.$emit('asideNav', true);
    but.$off('asideNav')
  }
};
</script>