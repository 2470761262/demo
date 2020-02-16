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
.el-main {
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
  <div class="wrapper">
    <el-container>
      <el-aside>
        <el-row>
          <el-col :span="24">
            <div class="treeTitle">人员形式</div>
            <div class="treeContainer">树</div>
          </el-col>
        </el-row>
      </el-aside>
      <el-container class="innerContainer">
        <el-header>
          <div class="left-input-container">
            <span>标题&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="notice.newsTitle"
              maxlength="10"
              show-word-limit
            ></el-input>
          </div>
          <div class="left-input-container">
            <span>公告类型</span>
            <el-select v-model="notice.newsClass" placeholder="请选择">
              <el-option
                v-for="item in newsClassOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span>公告类别</span>
            <el-select v-model="notice.newsType" placeholder="请选择">
              <el-option
                v-for="item in newsTypeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="left-input-container">
            <span>发送方式</span>
            <el-select v-model="notice.sendType" placeholder="请选择">
              <el-option
                v-for="item in sendTypeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span>发送渠道</span>
            <el-select v-model="notice.sendWay" placeholder="请选择">
              <el-option
                v-for="item in sendWayOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-header>
        <el-main>
          <div class="editorContainer">
            <el-upload class="upload-demo" :action="uploadUrl" :on-success="handleAvatarSuccess">
              <el-button size="small" type="primary" id="btnUpload">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <quill-editor
              class="myQuillEditor"
              v-model="notice.newsContent"
              :options="editorOption"
              ref="QuillEditor"
            ></quill-editor>
          </div>
        </el-main>
        <div class="footerContainer right">
          <el-button type="primary" @click="sendNotice">发送</el-button>
          <el-button>取消</el-button>
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
  ["link","image"],
  ["clean"] // remove formatting button
];
export default {
  //https://kang-bing-kui.gitbook.io/quill/wen-dang-document/themes 官网帮助文档
  components: { quillEditor },
  props: {},
  data() {
    return {
      quill:null,
      uploadUrl:"",
      notice:{
        newsTitle: null,
        newsContent: null,
        addPer:null,//44430,
        receiveAcountIds:null,//[44430],
        sendWay:null,
        newsClass:null ,
        newsType:null,
        sendType:null 
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
                  document.getElementById('btnUpload').click();
                } else {
                  this.quill.format("image", false);
                }
              },
              video:function(v){
                if (v) {
                  alert("不支持上传视频");
                } 
              },
              link:function(v){
                if (v) {
                  var href = prompt('Enter the URL');
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
      sendTypeOption: [
        {
          value: "0",
          label: "单独发送"
        },
        {
          value: "1",
          label: "按职位发送"
        },
        {
          value: "2",
          label: "按部门发送"
        },
        {
          value: "3",
          label: "全员发送"
        },
        {
          value: "4",
          label: "按公司发送"
        }
      ],
      sendWayOption: [
        {
          value: "0",
          label: "PC"
        },
        {
          value: "1",
          label: "微信"
        },
        {
          value: "2",
          label: "PC+微信"
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    sendNotice(){
      if(this.notice.newsTitle==null){
        this.$message({
          showClose: true,
          message: '公告标题不能为空哟',
          type: 'warning'
        });
        return;
      }
      if(this.notice.newsContent==null){
        this.$message({
          showClose: true,
          message: '公告内容不能为空空哟',
          type: 'warning'
        });
        return;
      }
      if(this.notice.newsClass==null){
        this.$message({
          showClose: true,
          message: '公告类型要选择哟',
          type: 'warning'
        });
        return;
      }
      if(this.notice.newsType==null){
        this.$message({
          showClose: true,
          message: '公告类别要选择哟',
          type: 'warning'
        });
        return;
      }
      if(this.notice.sendWay==null){
        this.$message({
          showClose: true,
          message: '发送渠道要选择哟',
          type: 'warning'
        });
        return;
      }
      console.log(this.notice);
      this.notice.addPer=44430;//发送人
      this.notice.receiveAcountIds=[44430];//接收人id
      this.$api.post({
        url: '/noticeManage/common/sendNoticeReady',
        data: this.notice,
        token: false,
        headers: { "Content-Type": "application/json" }
      }).then((e) => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);
          this.$message({message:result.message});
        } else {
          console.log("发送公告结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("发送公告结果");
        console.log(e);
      })
    },
    handleAvatarSuccess(res, file) {
        // 如果上传成功
        if (res.code==200) {
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
    this.uploadUrl=this.$api.baseUrl()+"/draft_house/picture";
    console.log(this.uploadUrl);
  },
  mounted() {
    this.quill = this.$refs.QuillEditor.quill;
  }
};
</script>