import Vue from "vue";
import Vuex from "vuex";
import addHouse from "@/store/addHouse/addHouse";
import menuRid from "@/store/menuRid/menuRid";
import navAuthority from "@/store/navAuthority/navAuthority";
import addCustomers from "@/store/addCustomers/addCustomers";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    addHouse,
    menuRid,
    navAuthority,
    addCustomers
  }
});
export default store;
