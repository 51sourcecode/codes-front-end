/* jquery plugin: select text */
define(function(require,exports,moudles){
    return function(jquery){
        (function($) {
            $.fn.selectText = function() {
                ZeroClipboard.setMoviePath(baseUrl+"/resources/js/common/lib/ZeroClipboard.swf" );
                var $this = $(this);
                //鼠标抬起进，获取选择文字的字数。并根据字数，是否显示弹出层
                $this.mouseup(function(e){
                    //IE和火狐兼容性的处理函数。
                    function _selectText(){
                        if(document.selection){
                            return document.selection.createRange().text;// IE
                        } else {
                            return window.getSelection().toString(); //标准
                        }
                    }
                    var str = _selectText();
                    if(str.length>0){
                        RD.act.iCopy(e, str);
                    }
                });
                //阻止冒泡，防止第一次选中文字时，由于冒泡，而触发了$(document).click事件
                $this.click(function(e){
                    //e.stopPropagation();
                });
                return $this;
            };
        })(jquery);
    }
});