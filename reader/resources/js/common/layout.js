/* layout.js */
define(function(require, exports, module) {
    var $ = require("jquery");
    var html_layout = "";
        html_layout += '<div class="fun_layer fun_layer2">';
        html_layout += '<i class="arrow_icon"></i>';
        html_layout += '<div class="bookmark shadow">';
        html_layout += '<div class="tit clr">';
        html_layout += '<h3><i></i>书签</h3>';
        html_layout += '<a class="close" href="javascript:void(0);">关闭</a>';
        html_layout += '</div>';
        html_layout += '<div class="cont">我是中国人，我爱我的国家！</div>';
        html_layout += '</div>';
        html_layout += '</div>';
    var $layout = $(html_layout);

    function layout(options){
        this.W = options.width;
        this.H = options.height;
        this.X = options.left;
        this.Y = options.top;
    }
    layout.prototype.init = function(){
        var $$layout = $layout.clone();
        $$layout.css({
            width: this.W,
            height: this.H,
            left: this.X/2-15,
            top: this.Y+10
        });
        $$layout.find(".arrow_icon").css({
           left: this.X/2
        });
        $$layout.find(".close").bind('click', {target:$$layout}, this.close);
        $("body").append($$layout);//.bind('click', {target:$$layout}, this.close);
    };
    layout.prototype.close = function(e){
        //e.stopPropagation();
        //e.preventDefault();
        e.data.target.remove();
    };

    function _layout(options){
        return new layout(options);
    }

    module.exports = _layout;
});
