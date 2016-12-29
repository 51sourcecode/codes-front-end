/**
 * 配置SeaJS FOR Reader
 */
var baseUrl = "/phoenix-ui";

//统一定义全局接口变量
var API_ACTION_FRIEND = baseUrl+"/knowledge/friends/add.json";
var API_ACTION_COLLECTION = baseUrl+"/knowledge/collection/add.json";
var API_ACTION_BOOKMARK = baseUrl+"/knowledge/bookmark/add.json";
var API_ACTION_REPORT = baseUrl+"/knowledge/report/add.json";
var API_COMMENT_QUERY = baseUrl+"/knowledge/comment/query.json"; //?times="+Math.random()*(0-100)
var API_COMMENT_ADD = baseUrl+"/knowledge/comment/add.json";
var API_COMMENT_DEL = baseUrl+"/knowledge/comment/del.json";
var API_SEARCH_KEYWORD = baseUrl+"/knowledge/user/query.json";
var API_COPY_SEARCH = baseUrl+"/knowledge/text/search.json";
var API_TAG_SEARCH = baseUrl+"/knowledge/tag/search.json";

//配置系统默认参数
var COMMENT_COUNT_P = 5; //父评论默认显示的条数
var COMMENT_COUNT_S = 3; //子评论默认显示的条数

seajs.config({
    alias: {
        'jquery': baseUrl+'/resources/js/common/lib/jquery-1.7.1.min.js',
        'selectText': baseUrl+'/resources/js/common/lib/jquery.selectText.js',
        'layer': baseUrl+'/resources/js/common/lib/jquery.layer.js',
        'scrollBar': baseUrl+'/resources/js/common/lib/jquery.tinyscrollbar.js',
        'scrollImage': baseUrl+'/resources/js/common/lib/jquery.scrollImage.js',
        'tags': baseUrl+'/resources/js/common/lib/jquery.tags.js',
        'swfcopy': baseUrl+'/resources/js/common/lib/ZeroClipboard.js',
        'validation': baseUrl+'/resources/js/newKnowledge/reader/validation.js',
        'template': baseUrl+'/resources/js/newKnowledge/reader/template.js',
        'ui': baseUrl+'/resources/js/newKnowledge/reader/ui.js',
        'loader': baseUrl+'/resources/js/newKnowledge/reader/loader.js',
        'reader': baseUrl+'/resources/js/newKnowledge/reader/reader.js'
    }
});

seajs.use(['jquery', 'reader'], function($) {
    $(document).ready(function() {
        //阅读器功能部分绑定事件
        $("#JS_iFriend").bind('click', RD.act.iFriend);
        $("#JS_iComment").bind('click', RD.act.iComment);
        $("#JS_iShared").bind('click', RD.act.iShared);
        $("#JS_iFavorite").bind('click', RD.act.iFavorite);

        $("#JS_download").bind('click', RD.act.download);
        $("#JS_bookmark").bind('click', RD.act.bookmark);
        $("#JS_catalog").bind('click', RD.act.catalog);
        $("#JS_report").bind('click', RD.act.report);
        $("#JS_jumpTo").bind('click', RD.act.jumpTo);
        $("#JS_font").bind('click', RD.act.font);
        $("#JS_edit").bind('click', RD.act.edit);
        $(".at_exportFile").on('click', RD.act.exportFile);
        
        //鼠标悬停在阅读器关键词上面显示悬浮框
        $(".JS_aLink").on('mouseover', RD.act.iShow);

        //点击标签跳转
        $(".JS_tags a").bind('click', RD.act.iTag);

        //展开固定的区域
        //$("[class^='JS_expand']").on('click', RD.act.iExpand);

        //阅读器目录点击收缩/展开
        $(".JS_catalog_list").bind('click', RD.act.expand);

        //选中阅读器文字内容弹出提示框
        $("#JS_aContent").selectText();

        //阅读器目录区域鼠标滚动/拖动事件
        $('.JS_scrollBar').tinyscrollbar({
            wheelSpeed: 300
        });

        //初始化图片滚动
        $('.JS_scrollImage').scrollImage({
            pre: '.l_arrow',
            next: '.r_arrow'
        });

        //动态显示Tags的个数
        $('.JS_tags').tags({
            count: 5
        });

        //点击阅读器内容区关闭弹出框
        function closeK(){
            var flag = $("#inplace"),
                pm;
            if (flag.length) {
                pm = $("#privilege-manager-1");
                pm.hide();
                $(document.body).append(pm);
                document.body.removeChild(flag[0]);
            }
            $("div[id^='JS_layer']").remove();
            window.onresize = null;
        }

        $("body").bind('mousedown', function (e) {
            closeK();
        });

        $(".close").live("click",function(){
            closeK();
        });
    });
});