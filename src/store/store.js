import Vue from "vue";
import Vuex from "vuex";
import addHouse from "@/store/addHouse/addHouse";
import menuRid from "@/store/menuRid/menuRid";
import navAuthority from "@/store/navAuthority/navAuthority";
import customers from "@/store/customers/customers";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    addHouse,
    menuRid,
    navAuthority,
    customers
  }
});
export default store;
