/**
 * Created by Richard.he on 14-11-20.
 */
define(function(require, exports, modules){
    var $ = require("jquery");
    var tpl = require("template");

    function removeLayer(){
        $("div[id^='JS_layer_confirm']").remove();
    }

    return {
        confirm: function(msg, fn){
            var $mask = $('<div id="JS_layer_confirm_mask" class="confirm-mask"></div>');
            var $html = $(tpl.confirm).clone();
            $(".confirm_msg", $html).text(msg);
            $("body").append($mask, $html);
            $("div[id^='JS_layer_confirm']").bind('mousedown', function(e){
                e.stopPropagation();
            });
            if(fn){
                $(".confirm_btn>.ok", $html).bind('click', function(){
                    removeLayer();
                    fn(true);
                });
                $(".confirm_btn>.cancel", $html).bind('click', function(){
                    removeLayer();
                    fn(false);
                });
            }
            return false;
        }
    }
});