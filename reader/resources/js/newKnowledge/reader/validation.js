/**
 * 阅读器校验模块
 */
define(function(require, exports, moudles){
    var $ = require("jquery");

    return {
        validate_comment_add: function(options){
            var isSpace = /^(\s)*$/g;

            var context = $(".JS_comment_body");
            var level = options.level == 0 ? "" : "_sub";
            var str = $(".JS_validate_textarea"+level+":visible", context).val();
            if(isSpace.test(str)){
                alert("评论内容不能为空");
                return false;
            } else {
                return true;
            }
        },
        validate_report_add: function(options){
            var isSpace = /^(\s)*$/g;

            var context = $(".JS_report_body");
            var str = $(".JS_validate_textarea", context).val();
            if(isSpace.test(str)){
                alert("举报内容不能为空");
                return false;
            } else {
                return true;
            }
        },
        validate_pagination_go: function(options){
            var context = $(".JS_comment_body");
            var target = $(".JS_validate_pageNo", context);
            var pagination = target.siblings(".JS_comment_go").data('pagination');
            if(pagination){
                if(options.jump=="go"){
                    var value = parseInt(target.val());
                    if(!($.isNumeric(value))||value>pagination.pages){
                        target.val(pagination.pages);
                        alert("您输入的页码无效");
                        return false;
                    } else {
                        return true;
                    }
                }
            } else {
                return false;
            }
        }
    }
});
