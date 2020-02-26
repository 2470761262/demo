import {
  LOGINDATA
} from '@/util/constMap';
import util from '@/util/util';
export default {
  created() {
    //this.deepGetRid(util.localStorageGet(LOGINDATA).menuNodes, this.$route.path);
  },
  methods: {
    deepGetRid(list, nowPathName) {
      //this.$store.commit("setNowRid", 1);
      //console.log(this.$store.state.menuRid, "111");
      //   for (let i = 0; i < list.length; i++) {
      //     if (list[i].rurl != nowPathName) {
      //     } else {
      //       if (list[i].children) {
      //         this.deepGetRid(list[i].children, nowPathName);
      //       }
      //     }
      //   }
    }
  }
}
