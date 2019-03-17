class Option {
    constructor(options) {
        this.goods = options.goods;
        this.goods2 = options.goods2;
        this.goodb = options.goodb;
        this.url = options.url;
        this.num = options.num;
        this.index = options.index;
        this.init();
    }
    init() {
        var that = this;
        $.ajax({
            url: this.url,
        
            success: function (res) {
                // console.log(res)
                that.res = res.page_data;
                that.display();
                that.goods.children("li").mouseover(function(){
                    that.index=$(this).index();
                    if(that.index!=3){
                        that.display();
                    }
                });
            }
        })
    }
    display() {
        var str = "";
        for (var i = this.index * this.num; i < this.index * this. num + this.num; i++) {
            if (i < this.res.length) {
                if (i == this.index*this.num) {
                    str += ` <li class="tel">
                                <div class="pic-left">
                                    <a href="#">
                                        <img src="${this.res[i].src}" />
                                    </a>
                                </div>
                                <div class="pic-right">
                                    <h2>${this.res[i].name}</h2>
                                    <p>${this.res[i].details}</p>
                                    <div>
                                        <span>${this.res[i].price}</span>
                                        <a href="#">立即购买</a>
                                    </div>
                                </div>
                            </li>`;
                } else {
                    str += `<li>
                            <div class="color">
                                <a href="#"><img src="${this.res[i].src}" /></a>
                                <p>${this.res[i].name}</p>
                                <span>${this.res[i].details}</span>
                                <span>${this.res[i].price}</span>
                            </div>
                        </li>`;
                }
            }
        }
        this.goodb.children("ul").html(str);
    }
}
new Option({
    url: "/api/product?dataName=product&count=21",
    goods: $("#goods"),
    goodb: $("#goodb"),
    index: 0,
    num: 7
});
new Option({
    url: "/api/product?dataName=product&count=21",
    goods: $("#goods2"),
    goodb: $("#goodb2"),
    index: 0,
    num: 7
});
new Option({
    url: "/api/product?dataName=product&count=21",
    goods: $("#goods3"),
    goodb: $("#goodb3"),
    index: 0,
    num: 7
});



// 菜单
class list{
    constructor(options){
        this.url=options.url;
        this.menuL=options.menuL;
        this.init();
    }
    init(){
        var that=this;
        $.ajax({
            url: this.url,
            success: function (res) {
                that.res = res;
            }
        })
        $("#classify").mouseover(function () {
            $("#menu").css({ display: "block" }).find("li").hover(function () { 
                $(this).children("div").show();
                // console.log($(this).index())
                that.display($(this).index());
             }, function () { 
                 $(this).children("div").hide();
                });
        });
    }
    display(j){
        for(var i=0;i<this.res.length;i++){
            // console.log(this.res[i])
            if(i==j){
                // console.log(this.res[j].length)
                for(var k=0;k<this.res[j].length;k++){
                    var str="";
                    var str1="";
                    // console.log(this.res[j][k])
                    for(var a in this.res[j][k]){
                        // console.log(a)
                        if(a=="title"){
                            str+=`
                                <span>${this.res[j][k][a]}</span>
                                <i>></i>
                                `;
                        }else{
                            str1+=`${this.res[j][k][a]}`
                        }
                        // console.log(str1)
                    }
                    this.menuL.children("li").eq(j).find(".menu-ceng-left").children("dl").eq(k).children("dt").html(str).next().html(str1)
                }
                
            
            }
        }
    }
}
new list({
    url:"data/wz.json",
    menuL:$("#menuL")
});

$(window).scroll(function(){
    if($(document).scrollTop()>window.innerHeight){
        $(".floor").css({display:"block"});
    }else{
        $(".floor").css({display:"none"});
    }
    if($(document).scrollTop()>$(".goodsCss").eq(0).offset().top-$(".goodsCss").height()&&$(document).scrollTop()<$(".goodsCss").eq(1).offset().top){
        $(".floor").children("li").eq(0).css({background:"#C81623"}).children("a").css({color:"#fff"}).parent().nextAll().css({background:"rgba(255,255,255, .6)"}).children("a").css({color:"#C81623"});
    }else if($(document).scrollTop()>=$(".goodsCss").eq(1).offset().top-$(".goodsCss").height()&&$(document).scrollTop()<$(".goodsCss").eq(2).offset().top){
        $(".floor").children("li").eq(1).css({background:"#C81623"}).children("a").css({color:"#fff"}).parent().siblings("li").css({background:"rgba(255,255,255, .6)"}).children("a").css({color:"#C81623"});
    }else  if($(document).scrollTop()>$(".goodsCss").eq(2).offset().top-$(".goodsCss").height()){
        $(".floor").children("li").eq(2).css({background:"#C81623"}).children("a").css({color:"#fff"}).parent().siblings("li").css({background:"rgba(255,255,255, .6)"}).children("a").css({color:"#C81623"});
    }
});
$(".floor").children("li").on("click",function(){
    // $(this).parent().children("li").css({background:"rgba(255,255,255, .6)"}).children("a").css({color:"#C81623"});
    if($(this).index()==3){
        $("html").stop().animate({
            scrollTop:0
        });
        // $(this).css({background:"#C81623"}).children("a").css({color:"#fff"});
    }else{
        $("html").stop().animate({
            scrollTop:$(".goodsCss").eq($(this).index()).offset().top
        });
        // $(this).css({background:"#C81623"}).children("a").css({color:"#fff"});
    }
});

// console.log($(".goodsCss").eq(0).offset().top);
// console.log($(".goodsCss").eq(1).offset().top);
// console.log($(".goodsCss").eq(2).offset().top);