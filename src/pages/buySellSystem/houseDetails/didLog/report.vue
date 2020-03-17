<style lang="less">
.sumitButClass {
  background: #ad1600;
  span {
    color: #fff;
  }
}
</style>
<script>
import followUp from './followUp.vue';
export default {
  extends: followUp,
  data () {
    return {
      sumitButClass: 'sumitButClass',
      cancelFlag: true,
      text: '',
      pop: {
        model: 0,
        textarea: '',
        loading: false,
        checkList: [
          { title: '虚假实勘', value: 0 },
          { title: '虚假委托', value: 1 },
          { title: '虚假钥匙', value: 2 },
          { title: '虚假跟进', value: 3 },
          { title: '房屋已售', value: 4 },
          { title: '虚假业务号码', value: 5 },
          { title: '其他', value: 6 }
        ]
      }
    }
  },
  methods: {
    result () {
      console.log(this.pop);
    }
  },
}
</script>

