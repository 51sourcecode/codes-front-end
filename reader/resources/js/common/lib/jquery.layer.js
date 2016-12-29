/**
 * <layer> 弹出框类函数
 * <width> 弹出框的宽度
 * <height> 弹出框的高度
 * <left> 弹出框的左偏移
 * <top> 弹出框的上偏移
 * <html> 填充到弹出框的静态HTML内容
 * <url> 填充到弹出框的动态(远程加载)HTML内容
 * <modal> 是否模态显示-false
 */
define(function(require, exports, modules){
    var $ = require("jquery");

    var html_layer = "";
    html_layer += '<div class="fun_layer">';
    html_layer += '<i class="arrow_icon"></i>';
    html_layer += '<div id="JS_layer_content" class="bookmark shadow"></div>';
    html_layer += '</div>';
    var $layer = $(html_layer);

    function layer(options){
        this.W = options.width;
        this.H = options.height;
        this.X = options.left||$(options.eTarget).offset().left+$(options.eTarget).width()/2;
        this.Y = options.top||$(options.eTarget).offset().top+$(options.eTarget).height()/2;
        this.html = options.html||'';
        this.url = options.url||'';
        this.modal = options.modal||false;
        this.index = options.index||0; //浮动层的显示层级
        this.target = null;
        this.eTarget = options.eTarget;
        this.init();
    }
    $.extend(layer.prototype, {
        constructor: layer,
        init: function(){
            var $$layer = $layer.clone();
            $$layer.attr({
                id: "JS_layer_"+this.index
            });
            $$layer.bind('mousedown', function(e){
                e.stopPropagation();
            });

            if(this.modal){
                $(".arrow_icon", $$layer).remove();
                $$layer.css({
                    width: this.W,
                    height: this.H,
                    position: "absolute",
                    left: "50%",
                    top: this.H?"50%":this.Y,
                    marginLeft: -this.W/2,
                    marginTop: -this.H/2,
                    zIndex: 1000
                }).appendTo("body");

                var mask_css = "";
                mask_css += 'width: '+$(document).width()+'px;';
                mask_css += 'height: 100%;';
                mask_css += 'overflow: hidden;';
                mask_css += 'background-color: #000;';
                mask_css += 'position: fixed;';
                mask_css += 'left:0; top:0;';
                mask_css += 'z-index: 999;';
                mask_css += 'opacity: .1;';
                mask_css += 'filter:alpha(opacity=10);';

                var layer_mask = $('<div id="JS_layer_mask" style="'+mask_css+'"></div>');

                layer_mask.bind('mousedown', function(e){
                    e.stopPropagation();
                });

                layer_mask.appendTo("body");
            } else {
                //处理已经生成的浮层
                if($("div[id^='JS_layer']").length>0) this.close();
            	
                var leftOffset = 10;
                $$layer.css({
                    width: this.W,
                    height: this.H?this.H:"auto",
                    left: this.X-this.W/2>0?this.X-this.W/2:leftOffset,
                    top: this.Y+20
                }).appendTo("body").hide();

                $$layer.animate({
                    top: this.Y+10,
                    opacity: 'show'
                }, 300);

                $("#JS_layer_content", $$layer).css({
                    width: this.W-2
                });

                $$layer.find(".arrow_icon").css({
                    left: parseInt($$layer.css('left'))>leftOffset?this.W/2-leftOffset:this.X-leftOffset
                });

                $$layer.find(".close").bind('click', this.close);
            }

            this.target = $$layer;

            var $eTarget = $(this.eTarget);
            window.onresize = function(){
                if($eTarget.attr("data-resize")==="true"&&$$layer.is(":visible")){
                    $("body").trigger('mousedown');
                    $eTarget.trigger('click');
                }
            };
        },
        close: function(){
            $("div:not(#JS_layer_content)[id^='JS_layer']").remove();
            $("[id^='ZeroClipboardMovie']").parent().remove();
            window.onresize = null;
        },
        cancel: function(){
            $(this).closest("div:not(#JS_layer_content)[id^='JS_layer']").remove();
            $("#JS_layer_mask").remove();
        },
        getTarget: function(){
            return this.target;
        },
        getContent: function(){
            return $("#JS_layer_content", this.target);
        },
        setContent: function(node){
            try{
                if(node.is("object")){
                    $("#JS_layer_content", this.target).empty().append(node);
                } else {
                    $("#JS_layer_content", this.target).empty().html(node);
                }
            } catch(e) {
                $("#JS_layer_content", this.target).empty().html(node);
            }
        }
    });

/*
    function ajaxGet(url){
        var loading = "";
        loading += '<div class="loading" style="text-align: center; padding: 20px 0;">';
        loading += '<img src="'+baseUrl+'/resources/images/v4/newKnowledge/loading.gif" />';
        loading += '</div>';
        $("#JS_layer .bookmark").html(loading);

        var _result = "";
        $.ajax({
            url: url,
            async: false,
            type: 'get',
            dataType: 'html',
            complete: function(){
                $("#JS_layer .loading").remove();
            },
            success: function(result){ _result = result; },
            error: function(error){ _result = error; }
        });
        return _result;
    }
*/

    function _layer(options){
        return new layer(options||{});
    }

    modules.exports = _layer;
});
