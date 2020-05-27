<style lang="less" scoped>
.right {
  float: right;
}
.innerContainer {
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  width: 100%;
}
.el-header {
  margin-top: 10px;
  width: 100%;
  height: auto !important;
}

.treeTitle {
  font-size: 20px;
  text-align: center;
  border-radius: 1em;
  background-color: bisque;
}
.left-input-container {
  width: 53%;
  float: left;
  font-size: 0.15rem;
  border-right: 1px solid black;
  border-left: 1px solid black;
  border-radius: 0.5rem;
  div {
    margin: 8px;
  }
  .el-input {
    width: 80%;
  }
  span {
    margin-right: 10px;
    margin-left: 5px;
  }
}
.right-input-container {
  position: relative;
  width: 45%;
  height: 200px;
  border: 1px dotted black;
  .selectedNodeTip {
    position: absolute;
    right: 0px;
    top: 0px;
    color: grey;
  }
  ul {
    list-style: none;
    margin-left: 5px;
    margin-top: 5px;
    height: 95%;
    width: 90%;
    overflow: auto;
    li {
      border-radius: 3px;
      background-color: lightgray;
      border: 1px solid grey;
      float: left;
      padding: 5px;
      padding-right: 8px;
      margin: 2px;
      img {
        cursor: pointer;
        margin-left: 5px;
        width: 15px;
        height: 15px;
      }
    }
  }
}
.asideInAddNotice {
  background-color: white !important;
  min-height: 600px;
  margin-right: 5px;
  overflow: auto;
}
.treeAndTitleContainer {
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  padding: 15px 15px 15px;
  border-radius: 10px;
}
.editorContainer {
  width: 100%;
}
.myQuillEditor {
  height: 500px;
}
.upload-demo {
  display: none;
}
.wrapper {
  height: 100%;
  /deep/.el-container {
    height: 100%;
  }
}
.after-tips {
  &:after {
    content: attr(data-tips);
    display: block;
    color: red;
  }
}
</style>
<template>
  <div class="wrapper">
    <el-container>
      <el-container class="innerContainer">
        <el-header>
          <div class="left-input-container">
            <div
              :class="{ 'after-tips': errorBags.has('title') }"
              :data-tips="errorBags.first('title')"
            >
              <div>
                <span>标题&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <el-input
                  type="text"
                  placeholder="请输入内容"
                  v-model="notice.newsTitle"
                  maxlength="10"
                  show-word-limit
                  v-validate="'required'"
                  data-vv-as="标题"
                  data-vv-name="title"
                ></el-input>
              </div>
            </div>
            <div style="display:flex">
              <div
                :class="{ 'after-tips': errorBags.has('newsClass') }"
                :data-tips="errorBags.first('newsClass')"
              >
                <span>公告类型</span>
                <el-select
                  v-model="notice.newsClass"
                  placeholder="请选择"
                  v-validate="'required'"
                  data-vv-as="公告类型"
                  data-vv-name="newsClass"
                >
                  <el-option
                    v-for="item in newsClassOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div
                :class="{ 'after-tips': errorBags.has('newsType') }"
                :data-tips="errorBags.first('newsType')"
              >
                <span>公告类别</span>
                <el-select
                  v-model="notice.newsType"
                  placeholder="请选择"
                  v-validate="'required'"
                  data-vv-as="公告类别"
                  data-vv-name="newsType"
                >
                  <el-option
                    v-for="item in newsTypeOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
        </el-header>
        <el-main>
          <div
            :class="{ 'after-tips': errorBags.has('newsContent') }"
            :data-tips="errorBags.first('newsContent')"
          >
            <div class="editorContainer">
              <el-upload
                class="upload-demo"
                :action="uploadUrl"
                :headers="myHeader"
                :on-success="handleAvatarSuccess"
              >
                <el-button size="small" type="primary" id="btnUpload"
                  >点击上传</el-button
                >
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
              <quill-editor
                class="myQuillEditor"
                v-model="notice.newsContent"
                :options="editorOption"
                ref="QuillEditor"
                v-validate="'required'"
                data-vv-as="公告内容"
                data-vv-name="newsContent"
              ></quill-editor>
            </div>
          </div>
        </el-main>
        <div class="footerContainer right">
          <el-button type="primary" @click="update">保存</el-button>
          <el-button>取消</el-button>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import util from "@/util/util";
import { TOKEN } from "@/util/constMap";
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
import getMenuRid from "@/minxi/getMenuRid";
export default {
  $_veeValidate: {
    validator: "new" // give me my own validator scope.
  },
  mixins: [getMenuRid],
  //https://kang-bing-kui.gitbook.io/quill/wen-dang-document/themes 官网帮助文档
  components: { quillEditor },
  props: {},
  data() {
    return {
      quill: null,
      uploadUrl: "",
      myHeader: "",
      notice: {
        newsTitle: null,
        newsContent: null,
        newsClass: null,
        newsType: null,
        id: 0
      },
      editorOption: {
        placeholder: "请输入公告内容",
        readOnly: false,
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function(value) {
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
      newsClassOption: [
        {
          value: "0",
          label: "公告"
        },
        {
          value: "1",
          label: "通知"
        }
      ],
      newsTypeOption: [
        {
          value: "系统",
          label: "系统"
        },
        {
          value: "人事",
          label: "人事"
        },
        {
          value: "行政",
          label: "行政"
        },
        {
          value: "业务",
          label: "业务"
        },
        {
          value: "企划",
          label: "企划"
        }
      ],
      treeLoading: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    /**
     * 编辑
     */
    update() {
      this.$validator.validateAll().then(e => {
        if (e) {
          this.$api
            .post({
              url: "/noticeManage/edit",
              headers: { "Content-Type": "application/json" },
              data: this.notice
            })
            .then(e => {
              if (e.data.code == 200) {
                this.$router.push({ path: "/sys/noticeManageList" });
              }
            });
        }
      });
    },
    /**
     * 获取编辑详情
     */
    getDetails() {
      this.$api
        .get({
          url: "/noticeManage/" + this.notice.id,
          token: false
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            Object.keys(result.data).forEach(item => {
              if (this.notice.hasOwnProperty(item)) {
                this.notice[item] = result.data[item];
              }
            });
          } else {
            this.$message(result.message);
          }
        });
    },
    handleAvatarSuccess(res, file) {
      // 如果上传成功
      if (res.code == 200) {
        let imageUrl = res.data.url;
        // 获取富文本组件实例
        let quill = this.$refs.QuillEditor.quill;
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片，imageUrl为服务器返回的图片链接地址
        quill.insertEmbed(length, "image", imageUrl);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        // 提示信息，需引入Message
        alert("图片插入失败");
      }
    }
  },
  created() {
    this.uploadUrl = this.$api.baseUrl() + "/noticeManage/common/picture";
    this.myHeader = { tk: util.localStorageGet(TOKEN) };
  },
  mounted() {
    this.quill = this.$refs.QuillEditor.quill;
    if (this.$route.params.noticeId) {
      this.notice.id = this.$route.params.noticeId;
      util.sessionLocalStorageSet(
        "editNotice.vue:noticeId",
        this.$route.params.noticeId
      );
    } else {
      if (util.sessionLocalStorageGet("editNotice.vue:noticeId")) {
        this.notice.id = util.sessionLocalStorageGet("editNotice.vue:noticeId");
      }
    }
    console.log(this.notice.id, "fffffff");
    this.getDetails();
  }
};
</script>
