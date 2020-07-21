import Vue from "vue";
import Vuex from "vuex";
import addHouse from "@/store/addHouse/addHouse";
import menuRid from "@/store/menuRid/menuRid";
import navAuthority from "@/store/navAuthority/navAuthority";
import houseDateil from "@/store/houseDetail/houseDetail";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    addHouse,
    menuRid,
    navAuthority,
    houseDateil
  }
});
export default store;
