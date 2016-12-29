/* reader.js */
define(function(require, exports, modules){
    var $ = require("jquery"); //加载jquery框架
    require("selectText")($); //加载文本选中插件
    require("scrollBar")($); //加载滚动条插件
    require("scrollImage")($); //加载图片滚动插件
    require("tags")($); //加载tags插件

    if(typeof RD === 'undefined') RD = {};

    //阅读器加载模块
    RD.loader = require("loader"); //加载loader

    //阅读器校验模块
    RD.validation = require("validation");

    //阅读器动作事件
    RD.act = {};

    //加好友
    RD.act.iFriend = function(){
        var params = { //这里是传递到后台的参数
            senduid: KNOWLEDGE_USER_SID,
            receiveuid: KNOWLEDGE_USER_RID
        };
        var opts = { //这是提交到后台的请求参数.
            url: API_ACTION_FRIEND, //请求的url
            data: params //传递到后台的参数，如aid=a1234567&uid=u1234567
        };
        RD.loader.JS_POST_FRIEND(opts); //发送异步Ajax请求
    };

    //评论框
    RD.act.iComment = function(e){
        var params = {
            kid: KNOWLEDGE_ID,
            pid: KNOWLEDGE_COMMENT_PID,
            pno: KNOWLEDGE_COMMENT_PNO,
            title: KNOWLEDGE_TITLE
        };
        var opts = { //初始化弹出框的配置参数
    		modal: true,
            width: 730, //弹出框的宽度
            left: e.pageX, //弹出框的左偏移
            top: e.pageY, //弹出框的上偏移
            data: params, //传递到后台的参数，如aid=a1234567&uid=u1234567
            url: API_COMMENT_QUERY //加载远程评论请求
        };
        RD.loader.JS_POST_COMMENT(opts); //发送异步Ajax请求
    };

    //分享
    RD.act.iShared = function(e){
        var params = {
            title: KNOWLEDGE_TITLE,
            kid: KNOWLEDGE_ID
        };
        var opts = { //初始化弹出框的配置参数
            width: 750, //弹出框的宽度
            left: e.pageX, //弹出框的左偏移
            top: e.pageY, //弹出框的上偏移
            eTarget: e.target, //将原始触发对象暂存，以便后用
            data: params, //传递到后台的参数，如aid=a1234567&uid=u1234567
            url: "" //加载远程评论请求
        };
        RD.loader.JS_POST_SHARED(opts); //发送异步Ajax请求
    };

    //收藏
    RD.act.iFavorite = function(e){
        var params = { //这里是传递到后台的参数
            kid: KNOWLEDGE_ID,
            columnid: KNOWLEDGE_CID,
            type: KNOWLEDGE_TYPE,
            source: KNOWLEDGE_SOURCE,
            categoryid: KNOWLEDGE_CGID
        };
        var opts = { //这是提交到后台的请求参数.
            width: 730, //弹出框的宽度
            left: e.pageX, //弹出框的左偏移
            top: e.pageY, //弹出框的上偏移
            eTarget: e.target, //将原始触发对象暂存，以便后用
            url: API_ACTION_COLLECTION, //请求的url
            data: params //传递到后台的参数，如aid=a1234567&uid=u1234567
        };
        RD.loader.JS_POST_COLLECTION(opts); //发送异步Ajax请求
    };
    
    //下载文档
    RD.act.download = function(e){
        alert("执行下载请求, 做法同加好友");
    };

    //书签
    RD.act.bookmark = function(e){
        var params = {

        };
        var opts = { //初始化弹出框的配置参数
            width: 720, //弹出框的宽度
            left: e.pageX, //弹出框的左偏移
            top: e.pageY, //弹出框的上偏移
            eTarget: e.target, //将原始触发对象暂存，以便后用
            data: params, //传递到后台的参数，如aid=a1234567&uid=u1234567
            url: API_ACTION_BOOKMARK //加载远程评论请求
        };
        RD.loader.JS_POST_BOOKMARK(opts);
    };
    
    //目录
    RD.act.catalog = function(e){
        var params = {

        };
        var opts = { //初始化弹出框的配置参数
            width: 720, //弹出框的宽度
            left: e.pageX, //弹出框的左偏移
            top: e.pageY, //弹出框的上偏移
            eTarget: e.target, //将原始触发对象暂存，以便后用
            data: params, //传递到后台的参数，如aid=a1234567&uid=u1234567
            url: API_COMMENT_QUERY //加载远程评论请求
        };
        RD.loader.JS_POST_CATALOG(opts);
    };

    //举报
    RD.act.report = function(e){
        var params = {
            kid: KNOWLEDGE_ID,
            userid: KNOWLEDGE_USER_ID,
            type: "",
            desc: ""
        };
        var opts = { //初始化弹出框的配置参数
            width: 720, //弹出框的宽度
            left: e.pageX, //弹出框的左偏移
            top: e.pageY, //弹出框的上偏移
            eTarget: e.target, //将原始触发对象暂存，以便后用
            data: params, //传递到后台的参数，如aid=a1234567&uid=u1234567
            url: API_ACTION_REPORT //加载远程评论请求
        };
        RD.loader.JS_POST_REPORT(opts);
    };

    //跳转到
    RD.act.jumpTo = function(e){
        var opts = {
            width: 230,
            left: e.pageX,
            top: e.pageY,
            eTarget: e.target
        };
        RD.loader.JS_POST_JUMPTO(opts);
    };

    //处理字号大小
    RD.act.font = function(e){
        var opts = {
            width: 210,
            height: 64,
            left: e.pageX,
            top: e.pageY,
            eTarget: e.target
        };
        RD.loader.JS_POST_FONT(opts);
    };
    RD.act.font.size = function(self){
        $(self).siblings("a").removeClass("cur");
        var clas=$(self).attr("class");
        var siblingcss=$(self).siblings("a")
        $(self).addClass("cur");
        $.each(siblingcss,function (i,o){
            $("#JS_aContent").addClass(clas).removeClass(siblingcss.eq(i).attr("class"));
        })

    };

    //编辑
    RD.act.edit = function(e){
        var opts = {};
        RD.loader.JS_POST_EDIT(opts);
    };
    
    //根据关键词搜索并显示相关信息
    RD.act.iShow = function(e){
    	var self = $(this);
    	var params = {
			id: self.attr("data-id"),
			type: self.attr("data-type")
    	};
    	var opts = {
            width: 320,
            left: e.pageX,
            top: e.pageY,
            data: params,
            url: API_SEARCH_KEYWORD
        };
        RD.loader.JS_POST_SEARCH_KEYWORD(opts);
    };

    //选择文本并搜索
    RD.act.iCopy = function(e, str){
        var opts = {
            width: 100,
            height: 230,
            left: e.pageX,
            top: e.pageY,
            text: str
        };
        RD.loader.JS_POST_COPY(opts);
    };

    //选择文本并搜索
    RD.act.iTag = function(){
        var keyword = $(this).text().trim();
        $(this).attr("href", API_TAG_SEARCH+"?keyword="+keyword);
    };

    //选择文本并搜索
    //selector <class> 必须以"JS_expand"开头
    //"expand"前后单词拼起来组成目标元素的class
    //如：JS_expand_tags : JS_tags
    RD.act.iExpand = function(){
        var self = $(this);
        var selector = self.attr('class');
        var sArr = selector.split("_");
        var s = sArr[0]+"_"+sArr[2];
        var $s = $("."+s);
        if($s.is(':hidden')){
            $s.show();
        } else {
            $s.hide();
        }
    };

    //目录列表展开/收缩
    RD.act.expand = function(){
        var self = $(this);
        var self_dl = self.siblings("dl");
        self.closest('ul').find("dl").hide();
        self_dl.show();

        //重新计算滚动区的高度
        var viewPortArea = self.closest(".JS_scrollBar").data("plugin_tinyscrollbar");
        viewPortArea.update();
    };
    
    //导出附件
    RD.act.exportFile = function(event){
    	var ev = event || window.event;
    	var target = ev.target || ev.srcElement;
    	//附件的id
    	var id = $(target).parent().siblings('dt').find('.at_content').attr('id');
		$.ajax({
			url : '',
			cache:false,
			data : {
				'taskId' : id
			},
			success : function(data){
				
			},
			error : function(){
				$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
			}
		})
    };

});
