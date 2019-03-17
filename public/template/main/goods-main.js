import "../js/jquery.js";
import {setCookie,getCookie} from "./cookie.js";
import {car} from "./goods.js";
console.log(car)
new car({
    url:"api/product?dataName=shopping&count=21",
    itemBox:$(".item-box"),
   method:{
        setCookie:setCookie,
        getCookie:getCookie
    }
    // setCookie:setCookie,
    // getCookie:getCookie
});