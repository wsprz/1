$(".leftNav").find("li").find(".r").children("a").hover(function(){$(this).attr("class","on").siblings().attr("class","").parent().children("a").eq(0).attr("class","on")},function(){$(this).attr("class","").parent().children("a").eq(0).attr("class","on")})
$(".list").children("ul").on("click","li",function(){
    location.href=`flower.html?id=${$(this).attr("data-id")}`;
});

class list{
    constructor(options){
        this.url=options.url;
        this.list=options.list;
        this.index=options.index;
        this.num=options.num;
        this.init();
    }
    init(){
        var that=this;
        $.ajax({
            url:this.url,
            success:function(res){
                that.res=res.page_data;
                console.log(that.res)
                that.display();
                that.creatPage();
            }
        });
    }
    display(){
        var str="";
        for(var i=this.index*this.num;i<this.index*this.num+this.num;i++){
            if(i<this.res.length){
                str+=`<li data-id="${this.res[i].id}">
                        <div class="color">
                            <a href="#"><img src="${this.res[i].src}" /></a>
                            <p>${this.res[i].name}</p>
                            <span>${this.res[i].present}</span>
                            <span>${this.res[i].price}</span>
                        </div>
                    </li>`
            }
        }
        this.list.children("ul").html(str);
    }
    creatPage(){
        var that=this;
        $("#Pagination").pagination(this.res.length,{
            num_edge_entries: 1,
            num_display_entries: 3,
            num_display_entries:3, 
            callback:function(index){
                that.index=index;
                that.display();
                // console.log(that.res.length)
            },
            items_per_page:8 
            }
              
        )
    }

}
new list({
    url:"api/product?dataName=list",
    list:$(".list"),
    index:0,
    num:8
});
