import {
    LOGINDATA
} from '@/util/constMap';
import util from '@/util/util';
export default {
    created () {

        // this.resultRid(util.localStorageGet(LOGINDATA).menuNodes, this.$route.path);
    },
    methods: {
        deepGetRid (list, nowPathName) {
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
            return flag;
        },
        resultRid (list, nowPathName) {
            if (!this.deepGetRid(list, nowPathName)) {
                this.$store.commit("setNowRid", 15); //null);
            }
        }
    }
}
