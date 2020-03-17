// 引入组件
import feedbackBox from './feedback/feedbackBox.vue'
import elModelBox from './elModelBox/elModelBox.vue';
import fixedPopup from './fixedPopup/fixedPopup.vue';
export default {
  install(Vue) {
    Vue.component('feedback', feedbackBox)
    Vue.component('elModelBox', elModelBox);
    Vue.component('fixedPopup', fixedPopup);
  }
}
