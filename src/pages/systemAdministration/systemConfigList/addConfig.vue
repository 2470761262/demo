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
  margin-top: 500px;
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
         
          <div class="left-input-container" >
            <span>参数类型</span>
            <el-select v-model="notice.newsClass" placeholder="请选择" @change="getNum(notice.newsClass)" :disabled="updateState">
              <el-option
                v-for="item in newsClassOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>

          </div>
          <div class="left-input-container">
            <span>参数名称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-input type="text"
                      placeholder="请输入内容"
                      v-model="notice.configName"
                      maxlength="30"
                      show-word-limit></el-input>
          </div>
          <div class="left-input-container">
            <span>参数编号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span> {{notice.configNo!=null? notice.configNo:"选择类型后自动生成编号"}}</span>
          </div>
           <div class="left-input-container" >
            <span>备注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-input type="text"
                      placeholder="请输入内容"
                      v-model="notice.configMemo"
                      maxlength="100"
                      show-word-limit></el-input>
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
  components: { quillEditor },
  props: {},
  data () {
    return {
      quill:null,
      uploadUrl:"",
      updateState:false,
      notice:{
        configId:null,
        newsTitle: null,
        newsContent: null,
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
                  document.getElementById('btnUpload').click();
                } else {
                  this.quill.format("image", false);
                }
              },
              video: function (v) {
                if (v) {
                  alert("不支持上传视频");
                }
              },
              link: function (v) {
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
          value: "1",
          label: "买卖房源"
        },
        {
          value: "2",
          label: "买卖客户"
        }
        ,
        {
          value: "3",
          label: "租赁房源"
        },
        {
          value: "4",
          label: "租赁客户"
        }
        ,
        {
          value: "5",
          label: "用户管理"
        }
      ],


    };
  },
  watch: {},
  computed: {},
  methods: {
    getNum (val) {
      let that = this;
      this.$api.get({
        url: '/Set/judge',
        data: {
          id: val
        },
        token: false,
        headers: { "Content-Type": "application/json" }
      }).then((e) => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          that.notice.configNo = result.data

          console.log(result.data);
          this.$message({ message: result.message });
        } else {
          console.log("添加失败:" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("添加失败");
        console.log(e);
      })
    },
    sendNotice(){
      let that=this;
      if(this.notice.newsClass==null){
        this.$message({
          showClose: true,
          message: '参数类型',
          type: 'warning'
        });
        return;
      }
      if (this.notice.configNo == null) {
        this.$message({
          showClose: true,
          message: '参数名称',
          type: 'warning'
        });
        return;
      }
      if (this.notice.configMemo == null) {
        this.$message({
          showClose: true,
          message: '参数编号',
          type: 'warning'
        });
        return;
      }


      if (this.notice.configId == null) {

      this.$api.get({
        url: '/Set/add',
        data: {
          sysParType:that.notice.newsClass,
          sysParNo:that.notice.configNo,
          sysParName:that.notice.configName,
          memo:that.notice.configMemo,
          addName:"35491",
        },
        token: false,
        headers: { "Content-Type": "application/json" }
      }).then((e) => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
              this.$alert('', '添加成功', {
            dangerouslyUseHTMLString: false
          });
          this.$router.push({ path: "/sys/systemConfigList"});
          console.log(result.data);
          this.$message({message:result.message});
        } else {
          console.log("添加失败:" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("添加失败");
        console.log(e);
      })
      }else{
        console.log(this.notice.configId);
          this.$api.get({
        url: '/Set/update',
        data: {
          sysParID:that.$route.params.configId,
          sysParType:that.notice.newsClass,
          sysParNo:that.notice.configNo,
          sysParName:that.notice.configName,
          memo:that.notice.configMemo,
        },
        token: false,
       
      }).then((e) => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
              this.$alert('', '修改成功', {
            dangerouslyUseHTMLString: false
          });
          this.$router.push({ path: "/sys/systemConfigList"});
          console.log(result.data);
          this.$message({message:result.message});
        } else {
          console.log("修改失败:" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("修改失败");
        console.log(e);
      })
      }
    },
    post () {
      this.$router.push({        path: "/sys/systemConfigList"
      });
    },

  },

  created () {
          this.notice.configId=this.$route.params.configId;
      this.notice.configNo=this.$route.params.sysParNo;
      this.notice.configName=this.$route.params.sysParName;
       this.notice.configMemo=this.$route.params.memo;
       if(this.$route.params.configId!=undefined){
      this.updateState=true;
    }
 console.log(this.$route.params.configId);
     switch(this.$route.params.sysParType){
     case"买卖房源":
      this.notice.newsClass="1";
      break;
       case"买卖客户":
      this.notice.newsClass="2";
      break;
       case"租赁房源":
      this.notice.newsClass="3";
      break;
       case"租赁客户":
      this.notice.newsClass="4";
      break;
       case"用户管理":
      this.notice.newsClass="5";
      break;
      }
  },
  mounted () {

  }
};
</script>