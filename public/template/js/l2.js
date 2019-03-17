class Login {
    constructor(options) {
        this.btn = options.btn;
        this.user = options.user;
        this.pass = options.pass;
        this.msg = options.msg;
        this.url = options.url;
        this.type = Math.random();
        this.init();
    }
    init() {
        var that = this;
        this.btn.onclick = function () {
            that.load()
        }
       
    }
    load() {
        var that = this;
        console.log(this.user.value)
        console.log(this.pass.value)
        ajaxPost(this.url, {
            user: this.user.value,
            pass: this.pass.value
           
        }).then(function (res) {
            that.res=JSON.parse(res);
            console.log(that.res)
            switch (that.res.error) {
                case 0:
                    alert("登录成功");   
                    // that.res = JSON.parse(res);
                    setCookie("onoff",JSON.stringify(1));
                    location.href="index.html";
                    break;
                case 1:
                    alert("登录失败，请重新登录");
                    break;
                default:
                  
            }
        }, function (code) {
            console.log("前端的ajax请求失败，有可能是网络原因或接口错误，或服务器问题，反正不一定是登录失败");
        })
    }
}
new Login({
    btn: document.getElementById("btn"),
    user: document.getElementById("user"),
    pass: document.getElementById("pass"),
    msg: document.getElementById("msg"),
    url: "api/login"
});