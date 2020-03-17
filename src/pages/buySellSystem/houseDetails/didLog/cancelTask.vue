<script>
import followUp from './followUp.vue';
export default {
  extends: followUp,
  data () {
    return {
      text: '请输入取消作业人的原因',
      pop: {
        checkList: [
          { title: '委托人', value: 0 },
          { title: '钥匙人', value: 1 },
          { title: '实勘人', value: 2 }
        ]
      }
    }
  },
  methods: {
    result () {
      console.log(this.pop, 2222);
    }
  },
}
</script>
