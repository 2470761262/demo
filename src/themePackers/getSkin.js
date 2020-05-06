import api from '@/api/require';
import themePackers from "@/themePackers/themePackers";
import util from '@/util/util';
import {
    TREMEPACKERS,
} from '@/util/constMap';
export function getColor () {
    themePackers.createImport();
    api.get({
        url: '/sys/skin/color'
    }).then((e) => {
        return e.data.data
    }).then((e) => {
        if (util.localStorageGet(TREMEPACKERS) != e) {
            themePackers.createImport(e);
        }
    })
}


