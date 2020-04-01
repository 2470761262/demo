import  util from '@/util/util';
export default {
  state: {
    navList: []
  },
  mutations: {
    initNavList(state){
      state.navList = util.sessionLocalStorageGet('navAuthority');
    },
    setNavList(state, val) {
      let notExist = true;
      state.navList.forEach(data =>{
        if(data && val && data.id == val.id){
          notExist = false;
        }
      });
      if(notExist){
        state.navList.push(val)
        util.sessionLocalStorageSet('navAuthority',state.navList);
      }
    },
    resetNavList(state){
      state.navList = [];
      util.sessionLocalStorageRemove('navAuthority');
    },
    foreachData(id,thisNavList){

    }

  },
  actions:{
    judgeNavList({commit,state}, id){
      commit('initNavList');
      debugger;
      let thisNavList = [];
      thisNavList = foreachData(thisNavList,id);
      function foreachData(thisNavList,id) {
        for (let key of state.navList) {
          if(key.id == id){
            thisNavList.push(key);
            id = key.parentId;
            foreachData(thisNavList,id);
          }
        }
        return thisNavList;
      }
      if(thisNavList.length > 0){
        thisNavList.reverse();
        state.navList = thisNavList;
      }
    },
  }
};
