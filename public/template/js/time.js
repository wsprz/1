var d = new Date();//设置时间
var e = new Date();
d.setFullYear(e.getFullYear());
d.setDate(e.getDate());
d.setHours(e.getHours() + 1);
if (d.getHours() > 23) {
    d.setHours(8);
    d.setDate(e.getDate()+1);
}
d.setMinutes(0);
d.setSeconds(0);
d.setMilliseconds(0)
// console.log(d.getTime() - e.getTime())
for(var i=0;i<$("#dtime").children("li").length;i++){
    // console.log($("#dtime").children("li")[i])
    if(parseInt($($("#dtime").children("li")[i]).children("span").html())==d.getHours()-1){
        // console.log(parseInt($($("#dtime").children("li")[i]).children("span").html()))
        
        $($("#dtime").children("li")[i]).children("span").parent().css({color:"#fff",background:"#C81623"});
        $($("#dtime").children("li")[i]).children("span").parent().siblings().css({color:"#666",background:"#2e3a47"});
    }
}

var time = (d.getTime() - e.getTime()) / 1000;
var btime=setInterval(function () {
    var day = 0;
    var hour = 0;
    var minute = 0;
    var second = 0;
    if (time > 0) {
        day = Math.floor(time / (60 * 60 * 24));
        hour = Math.floor(time / (60 * 60)) - (day * 24);
        minute = Math.floor(time / 60) - (day * 24 * 60) - (hour * 60);
        second = Math.floor(time) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
    }else{
        clearInterval(btime);
        history.go(0);
    }
    if (minute <= 9) minute = '0' + minute;
    if (second <= 9) second = '0' + second;
    $("#day").html(day);
    $("#hour").html(hour);
    $("#minute").html(minute);
    $("#second").html(second);
    time--;
}, 1000);
