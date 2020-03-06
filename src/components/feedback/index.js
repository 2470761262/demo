// 引入组件
import feedbackBox from './feedbackBox.vue'
export default {
  install(Vue) {
    Vue.component('feedback', feedbackBox)
  }
}
