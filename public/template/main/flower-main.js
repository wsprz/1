import "../js/jquery.js";
import {setCookie,getCookie} from "./cookie.js";
import { flower } from "./flower.js";
// import { flower } from "../js/flower.js";
// console.log(flower)

new flower({
    url: "api/product?dataName=list",
    prodiv: $(".prodiv"),
    // method:{
    //     set:setCookie,
    //     getCookie:getCookie
    // }
    set:setCookie,
    getCookie:getCookie
});
