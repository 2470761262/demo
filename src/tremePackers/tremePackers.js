import util from '@/util/util';
import { TREMEPACKERS, TREMEDEFTULTCOLOR } from '@/util/constMap';
import api from '@/api/require';
export default (color) => {
  let tremePackers = util.localStorageGet(TREMEPACKERS);
  if (!color) {
    if (tremePackers) {
      document.documentElement.style.setProperty('--color--primary', tremePackers);
    } else {
      document.documentElement.style.setProperty('--color--primary', TREMEDEFTULTCOLOR);
    }
  } else {
    document.documentElement.style.setProperty('--color--primary', color);
  }

}


