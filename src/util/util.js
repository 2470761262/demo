export default {
  localStorageSet (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  localStorageGet (key) {
    if (localStorage.getItem(key) == null || localStorage.getItem(key) == '') {
      return null;
    } else {
      return JSON.parse(localStorage.getItem(key));
    }
  },
  localStorageClear () {
    localStorage.clear()
  },
  localStorageRemove (key) {
    localStorage.removeItem(key);
  }
}


