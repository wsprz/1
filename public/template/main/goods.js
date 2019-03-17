export class car{
    constructor(options){
        this.url=options.url;
        this.itemBox=options.itemBox;
        this.setCookie=options.method.setCookie;
        this.getCookie=options.method.getCookie;
        this.init();
    }
    init(){
        var that=this;
        $.ajax({url:this.url,success:function(res){
            that.twoRes=res.page_data;
           
            that.display();
            that.delect();
            that.add();
            that.total();
            that.number();
        }});
    }
    display(){
        var that=this;
        var str="";
        this.res=JSON.parse(this.getCookie("goods"));
        console.log(this.res)
        this.res.forEach((value) => {
            that.twoRes.forEach((resValue)=>{
                if(value.id==resValue.id){
                    str+=`  <div data-id="${value.id}" class="item-table col">
                    <div class="col-img"><img src="${resValue.src}" /></div>
                    <div class="col-name">
                        <h3>${resValue.name}</h3>
                        <p>未选择附加产品</p>
                    </div>
                    <div class="col-price">${resValue.price}</div>
                    <div class="col-num">
                        <div class="col-num-gb">
                            <input type="button" value="-"/>
                            <input id="number" type="text" value="${value.num}" />
                            <input type="button" value="+"/>
                        </div>
                    </div>
                    <div class="col-total">198元</div>
                    <div class="del" id="${value.id}" class="col-action">×</div>
                </div>`;
                }
            });
        });
        this.itemBox.html(str);
        this.add();
        this.total();
        this.Tprice();
        this.number();

    }
    delect(){
        var that=this;
        this.itemBox.on("click","div.del",function(){
            var goods=[];
            for(var i=0;i<that.res.length;i++){
                if( $(this).attr("id")!=that.res[i].id){
                    goods.push(that.res[i])
                }else{
                    $(this).parent().remove();
                }
            }
            that.setCookie("goods",JSON.stringify(goods));
            that.display(); 
            
        });
    }
    add(){
        var that=this;
        $(".col-num-gb").on("click","input",function(){
            var num=parseInt($(this).parent().children("#number").attr("value"));
            if($(this).attr("value")==="+"){
                num++;
            }else if($(this).attr("value")==="-"){
                num--;
               if(num==0){
                   num=1;
               }
            }
            $(this).parent().children("#number").attr("value",num);
            // console.log(that.res)
            for(var i=0;i<that.res.length;i++){
                // console.log($(this).parent().parent().parent().attr("data-id"))
                if(that.res[i].id==$(this).parent().parent().parent().attr("data-id")){
                    that.res[i].num=parseInt($(this).parent().children("#number").attr("value"));
                    that.setCookie("goods",JSON.stringify(that.res));
                }
            }
            that.total();
            that.number();
        })
        
    }
    total(){
        for(var i=0;i<this.itemBox.children(".item-table").length;i++){
           this.itemBox.children("div").eq(i).children(".col-total").html(this.itemBox.children("div").eq(i).children(".col-price").html().substring(1,this.itemBox.children("div").eq(i).children(".col-price").html().length)*parseInt(this.itemBox.children("div").eq(i).find("#number").attr("value")))
        }
        this.Tprice();
    }
    Tprice(){
        var price=0;
        for(var i=0;i<this.itemBox.children(".item-table").length;i++){
            price+=parseInt(this.itemBox.children(".item-table").eq(i).find(".col-total").html());
        }
        $("#price").html(price);
    }
    number(){
        var num=0;
        for(var i=0;i<this.itemBox.children(".item-table").length;i++){
            num+=parseInt(this.itemBox.children(".item-table").eq(i).find("#number").val());
        }
        $("#num").html(num);

    }
}
// new car({
//     url:"data/shopping.json",
//     itemBox:$(".item-box")
// });