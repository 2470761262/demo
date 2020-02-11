export default {
  localStorageSet (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  localStorageGet (key) {
    if (localStorage.getItem(key) == null || localStorage.getItem(key) == '') {
      return null;
    } else {
      try {
        return JSON.parse(localStorage.getItem(key));
      } catch (error) {
        return localStorage.getItem(key);
      }
    }
  },
  localStorageClear () {
    localStorage.clear()
  },
  localStorageRemove (key) {
    localStorage.removeItem(key);
  }
}


