export class flower {
    constructor(options) {
        this.url = options.url;
        this.prodiv = options.prodiv;
        this.set=options.set;
        this.getCookie=options.getCookie;
        // this.set=options.method.set;
        // this.getCookie=options.method.getCookie;
        this.init();
      

    }
    init() {
        var that = this;
        $.ajax({
            url: this.url, success: function (res) {
                console.log(res)
                that.res = res.page_data;
                that.display();
            }
        })
    }
    display() {
        var str = "";
        var id = location.href;
        id = id.split("?")[1];
        id = id.substring("3", id.length);
        for (var i = 0; i < this.res.length; i++) {
            if (this.res[i].id == id) {
                str += ` 
                <div class="prodiv-l">
                    <div class="sbox">
                        <img src="${this.res[i].src}" alt="" />
                        <span></span>
                        <p></p>
                    </div>
                    <div class="bbox">
                        <img src="${this.res[i].src}" alt="" />
                    </div>
                    <ul class="tbox">
                        <li><img src="${this.res[i].src}" alt="" /></li>
                        <li><img src="https://img.7hua.com/proimgs/C-9011014202.jpg" alt="" /></li>
                    </ul>
                </div>
                <div class="prodiv-r">
                    <div class="top">
                        <h3>${this.res[i].name}</h3>
                        <p>${this.res[i].present}</p>
                    </div>
                    <div class="middle">
                        <div class="middle-l">
                            <span>市场价:$123</span>
                            <span>七彩价:${this.res[i].price}</span>
                        </div>
                        <div class="middle-m">去手机购买</div>
                        <div class="middle-r">
                            商品评价:<i></i>(共213条评价)
                        </div>
                    </div>
                    <div id="fj" class="bottom">
                        <h4>选择附加:</h4>
                        <select>
                            <option value="0">无</option>
                            <option data-id2="100" value="10">红玫瑰(10元)一支</option>
                            <option data-id2="200" value="20">白玫瑰(20元)一支</option>
                            <option data-id2="300" value="30">黑玫瑰(30元)一支</option>
                        </select>
                        <select>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </div>
                    <div class="add">
                        <div id="add-red" class="num">
                            <input id="number" class="txt" type="text" value="1" />
                            <div class="num-r">
                                <input type="button" value="+" />
                                <input type="button" value="-" />
                            </div>
                        </div>
                        <div data-id2="${this.res[i].id}" class="purchase">
                            <a>立即购买</a>
                            <a class="purchase-car">加入购物车</a>
                        </div>
                    </div>
                </div>
            `;
            }
        }
        $(".prodiv").html(str);
        this.addEvent();
        fdj();
        add();
    }
    addEvent() {
        var that = this;
        that.id = $(this).parent().attr("data-id2");
        $(".purchase").on("click", "a", function () {
            that.id = $(this).parent().attr("data-id2");
            if ($(this).index() == 0) {
                if (that.getCookie("onoff") != "") {
                    // that.id = $(this).parent().attr("data-id2");
                    that.setCookie(that.id);
                    location.href = "goods.html"
                }else {
                    alert("请先登录");
                }
            }else{
                    that.setCookie(that.id);
                    alert("加入购物车成功");
            }
        });

    }
    setCookie(goodid) {
        this.goods = this.getCookie("goods") === "" ? [] : JSON.parse(this.getCookie("goods"));
        if (this.goods.length < 1) {
            this.goods.push({
                id: goodid,
                num: 1
            });
        } else {
            var onoff = true;
            for (var i = 0; i < this.goods.length; i++) {
                if (this.goods[i].id == goodid) {
                    this.goods[i].num++;
                    onoff = false;
                    break;
                }
            }
            if (onoff) {
                this.goods.push({
                    id: goodid,
                    num: 1
                });
            }

        }
        if (parseInt($("#number").val()) != 1) {
            for (var i = 0; i < this.goods.length; i++) {
                if (this.goods[i].id == goodid) {
                    this.goods[i].num += parseInt($("#number").val())-1;
                    break;
                }
            }
        }
        this.set("goods", JSON.stringify(this.goods));
    }
}

// new flower({
//     url: "data/list.json",
//     prodiv: $(".prodiv")
// });
function add() {
    $("#add-red").on("click", "input", function () {
        var num = parseInt($("#number").attr("value"));
        if ($(this).attr("value") === "+") {
            num++;
        } else if ($(this).attr("value") === "-") {
            num--;
            if (num == 0) {
                num = 1;
            }
        }
        $("#number").attr("value", num);
    })
}

function fdj() {
    $(".tbox").children().mouseover(function () {
        console.log(1)
        $(".bbox").children("img").attr("src", "" + $(this).children("img").attr('src') + "");
        $(".sbox").children("img").attr("src", "" + $(this).children("img").attr('src') + "");
    });
    $(".sbox").mouseover(function () {
        var ospan = $(".sbox").children("span");
        $(".bbox").css({ display: "block" });
        $(ospan).css({ display: "block" });
        $(".sbox").mousemove(function (eve) {
            var e = eve || window.event;
            var l = e.offsetX - $(ospan).width() / 2;
            var t = e.offsetY - $(ospan).height() / 2;
            if (l <= 0) l = 0;
            if (l >= $(".sbox").width() - $(ospan).width()) l = $(".sbox").width() - $(ospan).width();
            if (t <= 0) t = 0;
            if (t >= $(".sbox").height() - $(ospan).height()) t = $(".sbox").height() - $(ospan).height();
            $(ospan).css({ left: l, top: t });
            var ll = l / ($(".sbox").width() - $(ospan).width());
            var tt = t / ($(".sbox").height() - $(ospan).height());
            $(".bbox").children("img").css({ left: ll * ($(".bbox").width() - $(".bbox").children("img").width()), top: tt * ($(".bbox").height() - $(".bbox").children("img").height()) });
        })
    });
    $(".sbox").mouseout(function () {
        $(".bbox").css({ display: "none" });
        $(".sbox").children("span").css({ display: "none" });
    })
}
