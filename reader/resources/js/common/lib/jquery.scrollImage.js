define(function(require,exports,moudles){
    return function(jquery){
        (function($){
            $.fn.scrollImage = function(options){
                var context = $(".JS_scrollImage");
                var scrollArea = $(".scrollArea", context);
                var slideArea = $(".slideArea", context);
                var pre = options.pre;
                var next = options.next;
                var idx = 0;
                var count = $(".scrollArea li", context).length;
                var scrollCount = parseInt(count/4)+(count%4>0)?1:0;
                var scrollWidth = scrollArea.width();

                var $pre = $(pre, context);
                var $next = $(next, context);

                $pre.bind('click', __pre__);
                $next.bind('click', __next__);

                function __pre__(){
                    if(idx<=0){
                        $(this).find("a").removeClass("cur");
                    } else {
                        slideArea.animate({
                            left: -scrollWidth*(--idx)
                        }, 'fast');
                        $(this).find("a").addClass("cur");
                    }
                }
                function __next__(){
                    if(scrollCount==idx){
                        $(this).find("a").removeClass("cur");
                    } else {
                        slideArea.animate({
                            left:-scrollWidth*(++idx)
                        }, 'fast');
                        $(this).find("a").addClass("cur");
                    }
                }
            }
        })(jquery);
    }
});