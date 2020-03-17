<template>
  <el-color-picker class="theme-picker"
                   popper-class="theme-picker-dropdown"
                   v-model="theme"
                   :size="size">
  </el-color-picker>
</template>

<script>

import themePackers from '@/themePackers/themePackers';
import { TREMEPACKERS, TREMEDEFTULTCOLOR } from '@/util/constMap';

export default {
  name: 'ThemePicker',
  props: {
    default: { // 初始化主题，可由外部传入
      type: String,
      //default: '#EB815B'
      default: "" + localStorage.getItem(TREMEPACKERS) + ""
    },
    size: { // 初始化主题，可由外部传入
      type: String,
      default: 'small'
    }
  },
  data () {
    return {
      theme: TREMEDEFTULTCOLOR,
      conut: true,
      showSuccess: true, // 是否弹出换肤成功消息
    }
  },
  mounted () {
    if (this.default != null) {
      this.theme = this.default
      this.$emit('onThemeChange', this.theme)
      this.showSuccess = false;
      this.conut = false;
    }
  },
  watch: {
    theme (val, oldVal) {
      if (this.conut == false) {
        this.conut = true;
        return
      }
      if (typeof val !== 'string' || val == "null") return
      themePackers.createStyle(val, oldVal);
      // 响应外部操作
      this.$emit('onThemeChange', val);
      themePackers.init(val);
      if (this.showSuccess) {
        this.$message({
          message: '换肤成功',
          type: 'success'
        })
      } else {
        this.showSuccess = true
      }
    }
  }
}
</script>

<style>
.theme-picker .el-color-picker__trigger {
  vertical-align: middle;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>