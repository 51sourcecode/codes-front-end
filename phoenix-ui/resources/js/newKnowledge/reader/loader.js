/**
 * Created by Richard.he on 14-9-25.
 */
define(function(require, exports, modules){
    var $ = require("jquery");
    var tpl = require("template");
    var win = require("layer");
    var ui = require("ui");
    var swfcopy = require("swfcopy");

    //导入UI组件库
    RD.ui = ui;

    //Ajax异步请求数据
    function http(options){
        this.url = options.url;
        this.html = options.html;
        this.data = options.data;
        this.success = options.success;
        this.error = options.error;
        this.send();
    }
    $.extend(http.prototype, {
        constructor: http,
        send: function(){
            this.request = $.ajax({
                type: 'post',
                async: true,
                dataType: 'json',
                url: this.url,
                data: this.data,
                success: this.success || http.success,
                error: this.error || http.error
            });
        },
        abort: function(){
            this.request.abort();
        }
    });
    http.ajax = function(options){
        $.ajax({
            type: 'post',
            async: true,
            dataType: 'json',
            level: options.level,//用来判断评论的级别，不坐Ajax的参数处理
            jump: options.jump,//用来判断页码跳转方式，按钮(go)，翻页(page)，默认为空
            url: options.url,
            data: options.data,
            success: options.success || http.success,
            error: options.error || http.error,
            beforeSend: function(xhr){
                //正则表达式校验用户的提交
                var vType_comment_add = /comment\/add/g; //评论
                var vType_report_add = /report\/add/g; //举报
                var vType_pagination_go = /comment\/query/g; //跳转到
                if(vType_comment_add.test(this.url)){
                    return RD.validation.validate_comment_add(this);
                } else if(vType_report_add.test(this.url)){
                    return RD.validation.validate_report_add(this);
                } else if(vType_pagination_go.test(this.url)){
                    return RD.validation.validate_pagination_go(this);
                } else {
                    //TODO
                }

            }
        });
    };
    //<200 ok>后统一处理接口
    http.success = function(rst){
    	//console.log(typeof rst);
        if(rst.result == 1){
            alert("操作成功");
        } else {
            alert(rst.msg);
        }
    };
    //请求失败后统一处理接口
    http.error = function(rsp){
        alert(rsp.responseText||"出错了！");
    };
    
    //时间格式化
    function dateFormat(time, format){
    	var date = new Date(time);
    	var o = {
    	"M+" : date.getMonth()+1, //month
    	"d+" : date.getDate(), //day
    	"h+" : date.getHours(), //hour
    	"m+" : date.getMinutes(), //minute
    	"s+" : date.getSeconds(), //second
    	"q+" : Math.floor((date.getMonth()+3)/3), //quarter
    	"S" : date.getMilliseconds() //millisecond
    	};
    	if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
    	(date.getFullYear()+"").substr(4- RegExp.$1.length));
    	for(var k in o)if(new RegExp("("+ k +")").test(format))
    	format = format.replace(RegExp.$1,
    	RegExp.$1.length==1? o[k] :
    	("00"+ o[k]).substr((""+ o[k]).length));
    	return format;
    }

    //检测是否登录
    function checkLogin(){
        alert("请先登录！");
        return false;
    }

    return {
        JS_POST_CHECK: function(){
            return checkLogin();
        },
        JS_POST_FRIEND: function(options){ //加好友
            //验证登录否
            if(!this.JS_POST_CHECK()) return;
            var opts = options;
            var callback = function(rsp){
                if(rsp.friendStatus==1){
                    var target = $("#JS_iFriend").parent();
                    target.empty().html('<span style="color: #CCCCCC;">等待审核</span>');
                }
            };
            opts.success = callback;
            http.ajax(opts);
        },
        JS_POST_COMMENT: function(options){ //JS远程加载评论
            if(!this.JS_POST_CHECK()) return;
            /**
             * 初始化HTML为一个jQuery节点对象
             * @type {exports|*|jQuery|HTMLElement}
             */
            var $comment = $(tpl.comment);

            //将返回的结果填充到浮层
            var loadComment = function($target, result){
                var list = result.list||[];

                //循环加载评论列表信息<result.list>
                var $plist = $(".JS_comment_plist", $target);
                var $list = $(".rv_cell", $comment).clone();
                    $plist.empty();
                $("textarea", $target).val("");

                var len = result.totalcount||0;
                    len = COMMENT_COUNT_P<len?COMMENT_COUNT_P:len;
                var _len = list.length<len?list.length:len;
                for(var i=0; i<_len; i++){
                    var data = list[i];
                    var clist = $list.clone();
                    loadComment.build(clist, data);
                    $plist.append(clist);
                }
            };
            loadComment.build = function(node, data){
                $(".JS_comment_pic",node).attr("src", data.pic);
                $(".JS_comment_username",node).text(data.username);
                $(".JS_comment_pubtime",node).text(dateFormat(data.createtime.time, 'yyyy-MM-dd'));
                $(".JS_comment_text",node).text(data.content);
                $(".JS_comment_count",node).text(data.count>0?"("+data.count+")":"");

                $(".JS_comment_reply",node).bind('click', comment.reply);

                if(data.isSelf){
                    $(".JS_comment_del",node).bind('click', comment.del);
                } else {
                    $(".JS_comment_del",node).remove();
                }

                //将本条数据存储在该HTML节点上，以备后用
                node.data("list", data);
            };

            //加载子评论信息
            //$html 模板
            //result 数据
            //flag true:清空并填充数据；false:直接插入数据
            var loadCommentInfo = function($html, result, $this, flag){
                var list = result.list || [];
                var $target = $this.parents(".rv_info");
                var $list = $(".rv_cell", $(tpl.comment_subReply)).clone();
                var $reply = $(".rv_reply", $html);

                //清空子评论信息
                //flag = typeof flag !== "undefined" ? flag : true;
                if(flag){
                    $(".rv_cell", $html).remove();
                    $(".JS_rvlist_sub", $html).remove();
                } else {
                    $(".rv_cell:not(.JS_rvlist_sub>.rv_cell)", $html).remove();
                }

                $("textarea", $html).val("");

                var len = result.totalcount||0; //list.length; 
                var _len = COMMENT_COUNT_S<len?COMMENT_COUNT_S:len;
                var _div = $("<div class='JS_rvlist_sub' />");
                //循环加载评论列表信息<result.list>
                var __len = list.length<_len?list.length:_len;
                for(var i=0; i<__len; i++){
                    var clist = $list.clone();
                    var data = list[i];
                    loadCommentInfo.build(clist, data);
                    _div.append(clist);
                }
                $reply.before(_div);

                var totalCount = COMMENT_COUNT_S*result.pno;
                $(".JS_comment_count_sub",$html).text(len>totalCount?len-totalCount:"0");
                $(".JS_comment_more",$html).data('pagination', {pno:result.pno});
                $(".JS_subReport_area", $reply).hide();
                
                $target.append($html);

                len > totalCount ?
                    $(".JS_comment_count_sub", $target).parent().show():
                    $(".JS_comment_count_sub", $target).parent().hide();

                //$(".JS_rvlist_sub").siblings(".rv_cell").remove();
                //alert($(".rv_cell:first", $html).outerHeight());
                /*
                _div.css({
                	height: $(".rv_cell:first", $html).outerHeight()*_len,
                	overflow: 'auto'
                });
                */
            };
            loadCommentInfo.build = function(node, data){
                $(".JS_comment_pic_sub",node).attr("src", data.pic);
                $(".JS_comment_username_sub",node).text(data.username);
                $(".JS_comment_pubtime_sub",node).text(dateFormat(data.createtime.time, 'yyyy-MM-dd'));
                $(".JS_comment_text_sub",node).text(data.content);

                if(data.isSelf){
                    $(".JS_comment_del_sub", node).bind('click', comment.del);
                } else {
                    $(".JS_comment_del_sub", node).remove();
                }

                node.data("list", data);
            };

            //加载子评论框
            var loadCommentArea = function($chtml, $that){
                var $target = $that.closest(".rv_info");

                //当前评论的数据信息
                //var data = comment.getData($that);
                //var $reply = $(tpl.comment_subReply).clone();
                $chtml.find(".rv_cell").remove();
                $chtml.find(".rm_span").hide();

                /*$(".JS_comment_add_sub", $reply).bind('click', function(){
                    comment.add(data, $(this));
                });
                $(".JS_subReport_say", $reply).bind('click', function(){
                    $(".JS_subReport_area", $reply).show();
                });*/
                $target.append($chtml);
            };

            //评论分页
            var loadPage = function($obj, result){
                var $target = $(tpl.pages).clone();
                var pageNo = $(".JS_comment_pageNo", $target);
                var total = result.totalcount;
                var page = result.pno;
                var pageCount = COMMENT_COUNT_P;
                var pages = parseInt(total/pageCount)+parseInt(total%pageCount>0?1:0);
                var pagePre = page>1 ?
                    '<a href="javascript:void(0);">首页</a>'+
                    '<a href="javascript:void(0);">上一页</a>':
                    '<a href="javascript:void(0);" class="no_a">首页</a>'+
                    '<a href="javascript:void(0);" class="no_a">上一页</a>';

                var pageNext = pages>page ?
                    '<a href="javascript:void(0);">下一页</a>'+
                    '<a href="javascript:void(0);">末页</a>':
                    '<a href="javascript:void(0);" class="no_a">下一页</a>'+
                    '<a href="javascript:void(0);" class="no_a">末页</a>';

                var commentTotal = '当前第'+page+'页，共'+pages+'页';

                $(".page_left", $target).html(pagePre+pageNext);
                $(".page_rig span", $target).text(commentTotal);
                $(".JS_comment_pageNo", $target).val(page);

                $(".page_left a:not('.no_a'):contains('首页')", $target).bind('click', {pno:1}, loadPage.doPage);
                $(".page_left a:not('.no_a'):contains('上一页')", $target).bind('click', {pno:page-1}, loadPage.doPage);
                $(".page_left a:not('.no_a'):contains('下一页')", $target).bind('click', {pno:page+1}, loadPage.doPage);
                $(".page_left a:not('.no_a'):contains('末页')", $target).bind('click', {pno:pages}, loadPage.doPage);
                $(".JS_comment_go", $target).bind('click', function(){
                    loadPage.doPage({
                        jump: "go",
                        data: {
                            pno: pageNo.val()
                        }
                    });
                }).data('pagination', {
                        pno: page,
                        pages: pages
                    });

                $(".JS_pages", $obj).remove();
                $obj.append($target);
            };
            loadPage.doPage = function(e){
                var params = {
                    title: KNOWLEDGE_TITLE,
                    kid: KNOWLEDGE_ID,
                    pid: KNOWLEDGE_COMMENT_PID
                };
                $.extend(params, e.data);
                var opts = {
                    url: API_COMMENT_QUERY,
                    data: params,
                    jump: e.jump||"",
                    success: function(result){
                        var $target = $(".JS_comment_body");
                        //装载评论内容
                        loadComment($target, result);
                        //分页
                        loadPage($target, result);
                    }
                };
                http.ajax(opts);
            };

            //评论框动作对象
            var comment = {};
            comment.getData = function($target){
                return $target.closest(".rv_cell").data("list");
            };
            comment.reply = function(){
                var $this = $(this);
                var $target = $this.clone(true);
                var $that = $('<a href="javascript:void(0);" class="collapse">收起</a>');

                //当前评论的数据信息
                var opts, callback;
                var data = comment.getData($that)||{};

                //数据模板
                var $html = $(tpl.comment_subReply);
                var $chtml = $html.clone();

                var collapse = function(){
                    $that.before($target);
                    $that.remove();
                    $target.closest(".rv_info").find(".rv_cont").remove();
                    $target.closest(".rv_info").find(".JS_comment_report_area").remove();
                    var params = $.extend({}, opts);
                    params.success = function(rsp){
                        $target.text("回复("+rsp.totalcount+")");
                    };
                    http.ajax(params);
                };


                //当前评论的数据信息
                $(".JS_comment_add_sub", $chtml).bind('click', function(){
                    comment.add(data, $(this));
                });
                $(".JS_subReport_say", $chtml).bind('click', function(){
                    $(".JS_subReport_area", $chtml).show();
                });
                $(".JS_comment_more", $chtml).bind('click', function(){
                    var pagination = $(this).data('pagination');
                    pagination.pno++;
                    $.extend(opts.data, pagination);
                    http.ajax(opts);
                });

                //返回数据处理
                callback = function(result){
                    $this.before($that);
                    $this.remove();
                    $that.bind('click', collapse);

                    //这里判断result.list为空的情况
                    var list = result.list || [];
                    if(list.length == 0){
                        loadCommentArea($chtml, $that);
                    } else {
                        //装载评论内容
                        loadCommentInfo($chtml, result, $that, false);
                    }
                };

                //配置子评论ajax查询
                opts = {
                    url: API_COMMENT_QUERY,
                    data: {
                        title: KNOWLEDGE_TITLE,
                        kid: KNOWLEDGE_ID,
                        psize: COMMENT_COUNT_S,
                        pid: data.id,
                        pno: 1
                    }
                };
                opts.success = callback;
                http.ajax(opts);
            };
            comment.add = function(list, $this){
                var opts, params, level, reloadFn;
                $this = $this ? $this : $(this);
                if(list.knowledgeId){
                    level = 1; //子评论
                    params = {
                        kid: list.knowledgeId,
                        userid: list.userid,
                        pid: list.id,
                        content: $this.closest(".report_area").find("textarea").val()
                    };
                    reloadFn = function(rsp){
                    	//子评论重载
                    	loadCommentInfo(
                			$this.closest(".rv_cont"),
                			rsp,
                            $this,
                            true
                    	);
                    };
                } else {
                    level = 0; //主评论
                    params = {
                        kid: KNOWLEDGE_ID,
                        userid: KNOWLEDGE_USER_ID,
                        pid: KNOWLEDGE_COMMENT_PID,
                        content: $this.closest(".report_area").find("textarea").val()
                    };
                    reloadFn = function(rsp){
                    	//主评论重载
                    	var $target = $(".JS_comment_body");
                        //装载评论内容
                        loadComment($target, rsp);
                        //分页
                        loadPage($target, rsp);
                        //设置评论条数
                        $("#JS_iComment").text("评论("+rsp.totalcount+")");
                    };
                }
                opts = {
                    url: API_COMMENT_ADD,
                    data: params,
                    level: level,
                    success: reloadFn
                };
                http.ajax(opts);
            };
            comment.del = function(){
                var that = this;
            	RD.ui.confirm("确实要删除这条评论吗？", function(r){
            	if(r){
	                var $this = $(that);
	                var list = comment.getData($this);
	                var callback = function(rsp){
	                	if(/sub/g.test($this.attr('class'))){
	                		//子评论删除
	                    	loadCommentInfo(
	                			$this.closest(".rv_cont"),
	                			rsp,
                                $this,
                                true
	                    	);
	                	} else {
	                		//删除主评论
	                		var $target = $(".JS_comment_body");
	                        //装载评论内容
	                        loadComment($target, rsp);
	                        //分页
	                        loadPage($target, rsp);
	                	}
	                };
	
	                var params = {
	                    id: list.id,
	                    kId: KNOWLEDGE_ID
	                };
	                var opts = {
	                    url: API_COMMENT_DEL,
	                    data: params,
	                    success: callback
	                };
	                http.ajax(opts);
            	}});
            };

            //返回数据处理
            var callback = function(result){
                var layer = win(options);
                //这里判断status为0的话，加载错误信息
                if(result.status == 0){
                    var target = layer.getTarget();
                    target.find("#JS_layer_content").empty().html('<h3 style="color:red;padding:15px;">'+result.errormessage+'</h3>');
                    return;
                }
                var __$html__ = $comment.clone();
                $(".JS_comment", __$html__).data("comment", result);
                $(".JS_comment_title", __$html__).text(result.title);
                $(".JS_comment_add", __$html__).bind('click', comment.add);

                //这里判断result.list为空的情况
                var list = result.list || [];
                if(list.length == 0){
                    $(".JS_comment_plist", __$html__).html("<p style='color:red;'>暂无相关评论</p>");
                } else {
                    //装载评论内容
                    loadComment(__$html__, result);
                    //分页
                    loadPage(__$html__, result);
                }
                layer.setContent(__$html__);
            };
            options.success = callback;
            return new http(options);
        },
        JS_POST_SHARED: function(options){
            var layer = win(options);
            var __html__ = $(tpl.shared);

            layer.setContent(__html__);
        },
        JS_POST_COLLECTION: function(options){
            //返回数据处理
            var callback = function(result){
                var layer = win(options);
                var collect_add = function(){
                    var opts = $.extend({}, options, {
                        modal: true,
                        index: 1,
                        width: options.width-100,
                        height: 266
                    });
                    var collect_add_ok = function(){
                        alert("collect add ok");
                    };
                    var collect_add_cancel = function(){
                        layer.cancel.call(this);
                    };

                    var __layer__ = win(opts);
                    var __$html__ = $(tpl.collection_add);
                    var btn_ok = $(".JS_collect_add_ok", __$html__);
                    var btn_cancel = $(".JS_collect_add_cancel", __$html__);

                    btn_ok.bind('click', collect_add_ok);
                    btn_cancel.bind('click', collect_add_cancel);

                    __layer__.setContent(__$html__);
                };
                var collect_ok = function(){
                    alert("collect ok");
                };
                var collect_cancel = function(){
                    layer.cancel.call(this);
                };

                var __$html__ = $(tpl.collection);

                $(".JS_collect_add", __$html__).bind('click', collect_add);
                $(".JS_collect_ok", __$html__).bind('click', collect_ok);
                $(".JS_collect_cancel", __$html__).bind('click', collect_cancel);

                layer.setContent(__$html__);
            };
            options.success = callback;
            return new http(options);
        },
        JS_POST_BOOKMARK: function(options){
            //返回数据处理
            var callback = function(result){
                var layer = win(options);
                //这里判断status为0的话，加载错误信息
                if(result.status == 0){
                    alert("出错了！！！");
                    return;
                }

                var __html__ = $(tpl.bookmark);

                layer.setContent(__html__);
            };
            options.success = callback;
            return new http(options);
        },
        JS_POST_CATALOG: function(options){
            //返回数据处理
            var callback = function(result){
                var layer = win(options);
                layer.setContent($(tpl.catalog));
            };
            options.success = callback;
            return new http(options);
        },
        JS_POST_REPORT: function(options){
            if(!this.JS_POST_CHECK()) return;
            var layer = win(options);
            var __html__ = $(tpl.report);
            var report_ok = function(){
                var r_type = $(".JS_report_type input:checked", __html__).attr("value");
                var r_desc = $(".JS_report_area textarea", __html__).val();
                var params = {
                    type: r_type,
                    desc: r_desc
                };
                var opts = {
                    url: options.url,
                    data: $.extend(options.data, params),
                    success: function(rsp){
                    	$(".JS_report_btn a:contains('取消')", __html__).trigger('click');
                    	alert("举报成功");
                    }
                };
                http.ajax(opts);
            };
            var report_cancel = function(){
                layer.cancel.call(this);
            };

            $(".JS_report_btn a:contains('取消')", __html__).bind('click', report_cancel);
            $(".JS_report_btn a:contains('确定')", __html__).bind('click', report_ok);

            layer.setContent(__html__);
        },
        JS_POST_JUMPTO: function(options){
            var layer = win(options);
            layer.setContent($(tpl.jumpTo));
        },
        JS_POST_FONT: function(options){
            var layer = win(options);
            layer.setContent($(tpl.font));
        },
        JS_POST_EDIT: function(options){
            //TODO
        },
        JS_POST_SEARCH_KEYWORD: function(options){
        	//type:1 查询人
        	var searchPeople = function(data, html){
        		$(".JS_user_image", html).attr("src", data.picPath);
        		$(".JS_user_name", html).text(data.name);
        		$(".JS_user_address", html).text(data.city);
        		$(".JS_user_birthday", html).text("");
        		$(".JS_user_description", html).text(data.remark);
        	};
        	
        	//type:2 查询机构
        	var searchOrg = function(){
        		console.log("机构查询暂时为空");
        	};
        	
        	//返回数据处理
            var callback = function(rsp){
                var layer = win(options);
                var html = "";
                //这里判断result为0的话，加载错误信息
                if(rsp.result == 0){
                	html = '<p style="line-height:40px; text-align:center; color:red;">用户不存在</p>';
                } else {
                	html = $(tpl.keyword);
                	switch(rsp.type){
                		case 1:
                			searchPeople(rsp.user,html);
                			break;
                		case 2:
                			searchOrg();
                			break;
            			default:
            				break;
                	}
                }
                layer.setContent(html);
            };
            options.success = callback;
            return new http(options);
        },
        JS_POST_COPY: function(options){
        	var html = $(tpl.copy),
                layer = win(options),
                hideTimeout = null;
                snsShare = tpl.snsShare;
            $("a:contains(搜索)", html).attr("href", API_COPY_SEARCH+"?text="+options.text);
            $("a:contains(分享)", html).mouseover(function(){
                if($("#JS_layer_share").length>0){
                    $("#JS_layer_share").show();
                    return;
                }
                var jtShare = $('<div id="JS_layer_share" class="bookmark shadow" />');
                var self = $(this).parent();
                var width = self.width();
                var height = self.height();
                var left = self.offset().left;
                var top = self.offset().top;

                self.css('position', 'relative');
                jtShare.css({
                    width: 100,
                    height: height*(snsShare.btns.length),
                    position: 'absolute',
                    left: left+width+5,
                    top: top
                });
                jtShare.mouseover(function(){
                    clearTimeout(hideTimeout);
                    $(this).show();
                }).mousedown(function(e){
                    e.stopPropagation();
                });

                for(var i=0; i<snsShare.btns.length; i++){
                    var btn = snsShare.btns[i];
                    var dom_a = "<a";
                    dom_a += ' title="'+btn.title+'"';
                    dom_a += ' class="'+btn.className+'"';
                    dom_a += ' href="javascript:void(0)"';
                    dom_a += ' onclick="snsShare.share(\''+btn.className+'\',\''+options.text+'\');return false;"';
                    dom_a += ' >'+btn.title+'</a>';
                    var $a = $(dom_a);
                    jtShare.append($a);
                }
                jtShare.appendTo("body");
            }).mouseout(function(){
                hideTimeout = setTimeout(function(){
                    $("#JS_layer_share").hide();
                }, 100);
            });
            $("a:contains(复制)", html).attr("id", "Jtext");

            function copyToClipboard(txt) {
                var zclip = new ZeroClipboard.Client();
                zclip.setHandCursor(true);
                zclip.setText(txt);
                zclip.addEventListener("complete", function(client) {
                    $("[id^='ZeroClipboardMovie']").parent().remove();
                    alert("复制成功！");
                });
                zclip.glue("Jtext");
            }

            layer.setContent(html);
            copyToClipboard(options.text);
        }
    }
});