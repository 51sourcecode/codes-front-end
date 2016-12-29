define(function(require, exports, module){
    return function(jquery){
        (function($){
            $.fn.tags = function(options){
                var target = $(this);
                var handler = target.siblings().find(".JS_show_tags");
                var count = options.count;
                var lis = $("li", target);
                var len = lis.length;
                if(len<count){
                    handler.remove();
                } else {
                    showLis();
                    handler.toggle(showAll, showLis);
                }

                function showLis(){
                    lis.each(function(i){
                        if(i<count){
                            $(this).show();
                        } else {
                            $(this).hide();
                        }
                    });

                }

                function showAll(){
                    lis.show();
                }
            }
        })(jquery);
    }
});