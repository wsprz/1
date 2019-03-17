var ouser = document.getElementById("user");
var opass = document.getElementById("pass");
var opass2 = document.getElementById("pass2");
var otel = document.getElementById("tel");
var Txtidcode = document.getElementById("Txtidcode");
var obtn = document.getElementById("btn");
var uonOff = ponOff = p2onOff = eonOff = bbonoff = false;

ouser.onblur = function () {
    var reg = /^[\u2E80-\u9FFF\w\-]{4,20}$/;
    if (reg.test(this.value)) {

        uonOff = true;
    } else {
        this.nextElementSibling.innerHTML = "用户名不符合规则";
        setTimeout(function () {
            ouser.nextElementSibling.innerHTML = "用户名仅支持中文、字母、数字、“-”“_”的组合，4-20个字符";
        }, 3000);
        uonOff = false
    }
}

opass.onblur = function () {
    var a = b = c = 0;
    var numReg = /\d+/;
    if (numReg.test(this.value)) a = 1;
    var azReg = /[a-zA-Z]+/;
    if (azReg.test(this.value)) b = 1;
    var tsReg = /[\~\!\@\#\$\%\^\&\*\(\)\_\+\`\-\=\{\}\[\]\\|\;\'\:\"\,\.\/\<\>\?]+/;
    if (tsReg.test(this.value)) c = 1;
    ponOff = true;
    switch (a + b + c) {
        case 1: this.nextElementSibling.innerHTML = "简单"; break;
        case 2: this.nextElementSibling.innerHTML = "一般"; break;
        case 3: this.nextElementSibling.innerHTML = "最难"; break;
        default:
            this.nextElementSibling.innerHTML = "至少输入数字字母或特殊字符";
            ponOff = false;
    }

    if (opass2.value === this.value) {
        p2onOff = true
    } else {
        opass2.nextElementSibling.innerHTML = "两次密码不一致"

        setTimeout(function () {
            opass.nextElementSibling.innerHTML = "密码可以是数字,字母,特殊字符";
            opass2.nextElementSibling.innerHTML = ""
        }, 3000);
        p2onOff = false
    }
}

opass2.onblur = function () {
    if (opass.value === this.value) {
        p2onOff = true
    } else {
        this.nextElementSibling.innerHTML = "两次密码不一致"
        console.log(1)
        setTimeout(function () { opass2.nextElementSibling.innerHTML = "" }, 3000);
        p2onOff = false
    }
}

otel.onblur = function () {
    var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (reg.test(this.value)) {
        eonOff = true
        // console.log(eonOff)
    } else {
        this.nextElementSibling.innerHTML = "请输入正确的手机号"
        var that=this;
        setTimeout(function(){
            that.nextElementSibling.innerHTML = ""
        },3000);
        eonOff = false
    }
}
$.idcode.setCode();
Txtidcode.onblur = function () {
    var IsBy = $.idcode.validateCode();
    if (IsBy) {
        bbonoff = true;
    } else {
        document.getElementById("yzm").innerHTML="不符合"
        setTimeout(function(){
            document.getElementById("yzm").innerHTML="不区分大小写"
        },3000);
    }

};


