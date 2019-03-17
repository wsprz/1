class Register {
    constructor(options) {
        this.btn = options.btn;
        this.user = options.user;
        this.pass = options.pass;
        this.msg = options.msg;
        this.url = options.url;
        this.init();
    }
    init() {
        var that = this;
        this.btn.onclick = function () {
            if(uonOff && ponOff && p2onOff && eonOff&&bbonoff){
                that.load();
            }else{
                alert("注册失败,请填写正确信息或信息填写完整")
            }
            
        }
    }
  
    load() {
        var that = this;
        ajaxPost(this.url, {
            tel: this.user.value,
            pass: this.pass.value
        }).then(function (res) {
            
            that.res=JSON.parse(res);
            console.log(that.res.error)
            switch (that.res.error) {
                case 1:
                    that.msg.innerHTML = "用户名已被注册,请换一个";
                    alert("用户名已被注册,请换一个")
                     break;
                case 0:
                    alert("注册成功，3秒之后调转到登录");
                    setTimeout(() => {
                        location.href="l2.html"
                    }, 3000);
                    break;
                case "2":
                    that.msg.innerHTML = "请输入完整信息"; break;
            }
        }, function (code) {
            console.log("前端的ajax请求失败，有可能是网络原因或接口错误，或服务器问题，反正不一定是注册失败");
        })
    }

}





new Register({
    btn: document.getElementById("btn"),
    user: document.getElementById("user"),
    pass: document.getElementById("pass"),
    msg: document.getElementById("msg"),
    url: "api/reg"
})
