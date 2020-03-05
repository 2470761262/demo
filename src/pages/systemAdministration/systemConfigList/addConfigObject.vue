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
  font-size: 1rem;
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
            <div>{{configId}}-{{notice.configName}}-{{notice.configNo}}</div>
          </div>
          <div class="left-input-container">
            <span>公司参数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-select v-model="notice.comId" placeholder="请选择">
                <el-option
                v-for="item in companyDefault"
                :key="item.value"
                :label="item.CompanyName"
                :value="item.value"
              ></el-option>
              <el-option
                v-for="item in tableData"
                :key="item.value"
                :label="item.CompanyName"
                :value="item.id"
              ></el-option>
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
            <el-select v-model="notice.configObject" placeholder="请选择">
              <el-option
                v-for="item in configObject"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              ></el-option>
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
            <el-select v-model="notice.unit" placeholder="请选择">
              <el-option
                v-for="item in unit"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="left-input-container">
            <span>是否允许&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-select v-model="notice.paraIsAllowed" placeholder="请选择">
              <el-option
                v-for="item in paraIsAllowed"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-header>

        <div class="footerContainer el-top">
          <el-button type="primary"
                     @click="sendNotice">发送</el-button>
          <el-button @click="post">取消</el-button>
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
import getMenuRid from '@/minxi/getMenuRid';
export default {
  mixins: [getMenuRid],
  //https://kang-bing-kui.gitbook.io/quill/wen-dang-document/themes 官网帮助文档
  components: { quillEditor },
  props: {},
  data () {
    return {
      quill: null,

      notice: {
        configId: null,
        paraNum1: null,
        paraNum2: null,
        paraNum3: null,
        unit: null,
        comId: "",
        paraIsAllowed: null,
        configObject: null,
        paraNum4: null,
        newsTitle: null,
        newsContent: null,
        addPer: null, //44430,
        receiveAcountIds: null, //[44430],
        sendWay: null,
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
              image: function (value) {
                if (value) {
                  console.log(value);
                  document.getElementById("btnUpload").click();
                } else {
                  this.quill.format("image", false);
                }
              },
              video: function(v) {
                if (v) {
                  alert("不支持上传视频");
                }
              },
              link: function(v) {
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
        } ,
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
      tableData: []
    };
  },
  watch: {},
  computed: {},
  mounted() {},
  methods: {
    queryCompanyDatas(currentPage) {
      let params = { limit: 100, page: currentPage };
      let that = this;

      this.$api
        .post({
          url: "/company/list",
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
          } else {
            console.log("查询公司管理列表结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询公司管理列表失败");
          console.log(e);
        });
    },

    sendNotice() {
      let that = this.notice;
      console.log(this.notice);
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
      this.$api
        .get({
          url: "/Set/companyAdd",
          data: {
            sysParObj: that.configObject,
            sysParID: this.configId,
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
            console.log(result.message);
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
    },
    post() {
      this.$router.push({ path: "/sys/systemConfigList" });
    }
  },
  created() {
    this.queryCompanyDatas(1);
      this.configId=this.$route.params.configId;
      this.notice.configNo=this.$route.params.sysParNo;
      this.notice.configName=this.$route.params.sysParName;
       this.notice.paraIsAllowed = this.paraIsAllowed[0].value
         this.notice.configObject = this.configObject[0].value
         this.notice.parRange = this.parRange[0].value
         this.notice.unit = this.unit[0].value
      this.notice.comId=this.companyDefault[0].value
     console.log(this.notice.comId);
  }
};
</script>