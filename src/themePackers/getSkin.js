import api from '@/api/require';
import themePackers from "@/themePackers/themePackers";





export function getColor(){
    api.get({
        url:'/sys/skin/color'
    }).then((e)=>{
        console.log(e);
        return e.data
       
     }).then((e)=>{
        themePackers.createImport(e.data);
     })
}


