//import { LOGINDATA } from "@/util/constMap";
//import util from "@/util/util";
export default {
  created() {
    // this.resultRid(util.localStorageGet(LOGINDATA).menuNodes, this.$route.path);
  },
  methods: {
    deepGetRid(list, nowPathName) {
      // eslint-disable-next-line no-unused-vars
      let flag = false;
      for (let i = 0; i < list.length; i++) {
        if (list[i].rurl == nowPathName) {
          this.$store.commit("setNowRid", list[i].id);
          flag = true;
        } else {
          if (list[i].children) {
            if (this.deepGetRid(list[i].children, nowPathName)) {
              return true;
            }
          }
        }
      }
    }
  }
};
