<script>
import exploration from '@/pages/buySellSystem/addHouse/components/exploration';
import houseCheck from '../common/houseCheck';
let enumUpload = new Map();
let houseEnum = [1, 2, 3, 4, 5, 6];//上传类型 => 添加房源
let detailEnum = [1, 4, 2, 3, 5, 6];// 上传类型 =>房源详情
houseEnum.forEach((item, index) => {
  enumUpload.set(item, detailEnum[index]);
})
export default {
  inject: ["houseId"],
  extends: exploration,
  props: {
    replaceType: {
      type: Number
    }
  },
  methods: {
    /**
     * @param {string} picClass 当前上传的类型 如果是视屏则是null
     * @param {file} uploader 上传的文件
     * @param {string} fileListName 对应的数组名字 如果是视屏则是一个对象
     */
    uploadSectionFile (picClass, uploader, fileListName) {
      this[fileListName + 'Loading'] = true;
      let formData = new FormData();
      formData.append("type", this.replaceType);
      formData.append("file", uploader);
      if (enumUpload.has(picClass)) {
        formData.append("subType", enumUpload.get(picClass));
      } else if (picClass === undefined) {
        formData.append("subType", 7);
      }
      this.$api.post({
        url: `/agentHouse/followPic/upload`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      }).then((json) => {
        if (json.data.code == 200) {
          if (picClass != undefined) {
            this[fileListName].push(json.data.data);
          } else {
            this[fileListName] = json.data.data;
          }
        }
      }).catch((e) => {
        this.$message({
          message: '不晓得为什么,反正失败了',
          type: 'warning'
        })
      }).finally(() => {
        this[fileListName + 'Loading'] = false;
      })
    },
    //删除视频
    deleteVideo (item) {
      houseCheck.removeImg(item.id, item.url).then((e) => {
        if (e.data.code == 200) {
          this.houseVideo = {}
          this.$message.success(e.data.message);
        }
      })
    },
    //删除图片
    deleteImg (id, url, index, listName) {
      houseCheck.removeImg(id, url).then((e) => {
        if (e.data.code == 200) {
          this.$message.success(e.data.message);
          this[listName].splice(index, 1)
        }
      })
    }
  }
}
</script>

