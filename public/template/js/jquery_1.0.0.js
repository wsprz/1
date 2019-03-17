; (function ($) {
    "use strict";
    $.extend($.fn, {
        banner: function (options) {
            this.LOCAL = {
                autoPlay: options.autoPlay === false ? false : true,
                delayTime: options.delayTime || 500,
                moveTime: options.moveTime || 500,
                index: 0,
                iPrev: options.items.length - 1,
                listOnMove: false,
                sj: options.sj === true ? true : false
            };
            var that = this;
            this.LOCAL.sj = function (i) {
                if (options.sj == true) {
                    options.list.children(".sanjiao").css({ display: "none" }).parent().eq(i).css({ background: "none" }).children(".sanjiao").css({ display: "block" });
                }
            }
            this.LOCAL.listMove = function (i, type) {
                //点击span时走的距离,和图片走之前的初始位置
                options.items.eq(i).css({ left: options.items.eq(0).width() * type }).stop().animate({ left: 0 }, that.LOCAL.moveTime);
                options.items.eq(that.LOCAL.index).stop().animate({ left: -options.items.eq(0).width() * type }, that.LOCAL.moveTime);
                that.LOCAL.index = i;
                options.list.eq(i).css({ "background": "#FB7D2E" });
                that.LOCAL.sj(i);

            }
            this.LOCAL.btnMove = function (type) {
                options.items.eq(that.LOCAL.iPrev).css({ left: 0 }).stop().animate({ left: options.items.eq(0).width() * type }, that.LOCAL.moveTime).end().eq(that.LOCAL.index).css({ left: -options.items.eq(0).width() * type }).stop().animate({ left: 0 }, that.LOCAL.moveTime);
                if (that.LOCAL.listOnMove) {
                    options.list.css({ "background": "#fff" }).eq(that.LOCAL.index).css({ "background": "#FB7D2E" });
                }
                that.LOCAL.sj(that.LOCAL.index);
            }
            if (options.list != undefined && options.list.length > 1) {
                this.LOCAL.listOnMove = true;
                options.list.on("click", function () {
                    options.list.eq(that.LOCAL.index).css({ "background": "none" });
                    //判断点击span时图片走的方向
                    if (that.LOCAL.index < $(this).index()) {
                        that.LOCAL.listMove($(this).index(), 1);
                    }
                    if (that.LOCAL.index > $(this).index()) {
                        that.LOCAL.listMove($(this).index(), -1);
                    }
                });
            }
            this.LOCAL.rightClick = function () {
                if (that.LOCAL.index == options.items.length - 1) {
                    that.LOCAL.index = 0;
                    that.LOCAL.iPrev = options.items.length - 1;
                } else {
                    that.LOCAL.index++;
                    that.LOCAL.iPrev = that.LOCAL.index - 1;
                }
                that.LOCAL.btnMove(-1);
            };
            //判断点击左右按键
            if (options.left != undefined && options.left.length > 0 && options.right != undefined && options.right.length > 0) {
                options.left.on("click", function () {
                    if (that.LOCAL.index == 0) {
                        that.LOCAL.index = options.items.length - 1;
                        that.LOCAL.iPrev = 0;
                    } else {
                        that.LOCAL.index--;
                        that.LOCAL.iPrev = that.LOCAL.index + 1;
                    }
                    that.LOCAL.btnMove(1);
                });
                options.right.on("click", this.LOCAL.rightClick);
            }
            //判断是否自动播放
            if (this.LOCAL.autoPlay) {
                that.LOCAL.timer = setInterval(function () {

                    that.LOCAL.rightClick();
                }, that.LOCAL.delayTime);
                $(this).hover(function () {
                    clearInterval(that.LOCAL.timer);
                }, function () {
                    that.LOCAL.timer = setInterval(function () {
                        that.LOCAL.rightClick();
                    }, that.LOCAL.delayTime);
                });
            }
        }
    })
})(jQuery);