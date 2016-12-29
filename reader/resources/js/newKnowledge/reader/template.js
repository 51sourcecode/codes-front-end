/**
 * HTML模板文件
 */
define(function(require, exports, modules){
    //此处不能加声明，默认为全局变量
    var tpl_snsShare = {
        text : "分享内容",
        url : window.location.href,
        pic : '',
        btns : [
            {
                title : '新浪微博',
                className : 'icon_sina',
                url : 'http://service.weibo.com/share/share.php?url=[$url]&title=[$text]&content=gb2312&pic=[$pic]',
                width : 650,
                height : 500
            },
            {
                title : '腾讯微博',
                className : 'icon_qq',
                url : 'http://share.v.t.qq.com/index.php?c=share&a=index&url=[$url]&title=[$text]&pic=[$pic]',
                width : 612,
                height : 350
            },
            {
                title : 'QQ空间',
                className : 'icon_qzone',
                url : 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=[$url]&title=[$text]&pics=[$pic]&summary=',
                width : 612,
                height : 500
            }
        ],
        share : function(className, txt){
            this.text = txt;
            for (var i = 0; i < document.images.length; i++) {
                if(document.images[i].width >= 400 && document.images[i].height >= 300 || document.images[i].height >= 400 && document.images[i].width >= 300){
                    this.pic = document.images[i].src;
                    break;
                }
            }
            for (var j = 0; j < this.btns.length; j++) {
                if(this.btns[j].className == className){
                    url = this.btns[j].url;
                    url = url.replace(/\[\$text\]/g, encodeURIComponent(this.text));
                    url = url.replace(/\[\$pic\]/g, encodeURIComponent(this.pic));
                    url = url.replace(/\[\$url\]/g, encodeURIComponent(this.url));
                    window.open(url, 'snsShare', 'toolbar=0,status=0,resizable=1,width='+this.btns[j].width+',height='+this.btns[j].height+',left='+Math.round(screen.width/2 - this.btns[j].width/2)+',top='+Math.round(screen.height/2 - this.btns[j].height/2));
                    break;
                }
            }
        }
    };

    //评论框
    var tpl_comment = "";
    tpl_comment += '<div class="JS_comment_body" style="position:relative;">';
    tpl_comment += '<div class="tit clr">'; //评论标题开始
    tpl_comment += '<h3><i></i><span class="JS_comment_title"></span></h3>';
    tpl_comment += '<a href="javascript:void(0);" class="close">关闭</a>';
    tpl_comment += '</div>'; //评论标题结束
    tpl_comment += '<div class="JS_comment review">'; //评论内容开始
    tpl_comment += '<div class="report_area">'; //评论框开始
    tpl_comment += '<textarea class="JS_validate_textarea" placeholder="发表评论"></textarea>';
    tpl_comment += '<div class="rv_a1 clr">';
    tpl_comment += '<span class="prm">最多输入500个字</span>';
    tpl_comment += '<a href="javascript:void(0);" class="JS_comment_add btn">发表评论</a>'; //父级发表评论按钮
    tpl_comment += '</div>';
    tpl_comment += '</div>'; //评论框结束
    tpl_comment += '<div class="JS_comment_plist rv_list">'; //评论列表开始
    tpl_comment += '<div class="rv_cell clr">'; //评论信息开始
    tpl_comment += '<div class="img"><img class="JS_comment_pic" src="../../../resources/images/v4/newKnowledge/img1.jpg" alt="" /></div>';
    tpl_comment += '<div class="rv_info">'; //评论正文开始
    tpl_comment += '<div class="rv_tit clr">'; //评论正文标题开始
    tpl_comment += '<h3 class="JS_comment_username">用户名</h3>'; //用户名
    tpl_comment += '<span class="JS_comment_pubtime time">发布时间</span>'; //发表时间
    tpl_comment += '</div>'; //评论正文标题结束
    tpl_comment += '<div class="JS_comment_text rv_txt">评论内容</div>'; //正文
    tpl_comment += '<div class="rv_btn clr">'; //回复按钮开始
    tpl_comment += '<a class="JS_comment_reply" href="javascript:void(0);">回复<span class="JS_comment_count"></span></a>';
    tpl_comment += '<a class="JS_comment_del" href="javascript:void(0);">删除</a>';
    tpl_comment += '</div>'; //回复按钮结束
    tpl_comment += '</div>'; //评论正文结束
    tpl_comment += '</div>'; //评论信息结束
    tpl_comment += '</div>'; //评论列表结束
    tpl_comment += '</div>'; //评论内容结束
    tpl_comment += '</div>';

    //分页
    var tpl_pages = "";
    tpl_pages += '<div class="JS_pages page_warp clr">'; //分页开始
    tpl_pages += '<div class="page_left"></div>';
    tpl_pages += '<div class="page_rig">';
    tpl_pages += '<span></span>';
    tpl_pages += '<input type="text" class="JS_comment_pageNo JS_validate_pageNo ipt" value="1" style="display:inline-block; margin:0 5px;" />';
    tpl_pages += '<a href="javascript:void(0);" class="JS_comment_go jump">跳转</a>';
    tpl_pages += '</div>';
    tpl_pages += '</div>'; //分页结束

    //评论回复
    /*var tpl_comment_reply = "";
    tpl_comment_reply += '<div class="rv_cont">'; //外框
    tpl_comment_reply += '<div class="rv_reply">'; //评论回复框
    tpl_comment_reply += '<div class="rv_more clr">'; //更多评论
    tpl_comment_reply += '<div class="rm_span">还有<span class="JS_comment_count_sub">0</span>条回复 ';
    tpl_comment_reply += '<a href="javascript:void(0);">点击查看>></a>';
    tpl_comment_reply += '</div>';
    tpl_comment_reply += '<div class="rv_btn2"><a class="JS_subReport_say" href="javascript:void(0);"><i></i>我也说一句</a></div>';
    tpl_comment_reply += '<div class="JS_subReport_area report_area report_area3">'; //子评论回复框
    tpl_comment_reply += '<textarea placeholder="发表评论"></textarea>';
    tpl_comment_reply += '<div class="rv_a1 clr">';
    tpl_comment_reply += '<span class="prm">最多输入500个字</span>';
    tpl_comment_reply += '<a href="javascript:void(0);" class="JS_comment_add btn">发表评论</a>';
    tpl_comment_reply += '</div>';
    tpl_comment_reply += '</div>'; //子评论回复框结束
    tpl_comment_reply += '</div>'; //更多评论结束
    tpl_comment_reply += '</div>'; //评论回复框结束
    tpl_comment_reply += '</div>'; //外框结束*/

    //评论回复
    var tpl_comment_subReply = "";
    tpl_comment_subReply += '<div class="rv_cont">'; //外框
    tpl_comment_subReply += '<div class="rv_cell rv_cell2 clr">'; //用户图像和评论
    tpl_comment_subReply += '<div class="img"><img class="JS_comment_pic_sub" src="" alt="用户头像" /></div>'; //用户图像
    tpl_comment_subReply += '<div class="rv_info">'; //用户评论
    tpl_comment_subReply += '<div class="rv_tit clr">';
    tpl_comment_subReply += '<h3 class="JS_comment_username_sub"></h3>';
    tpl_comment_subReply += '<span class="JS_comment_pubtime_sub time"></span>';
    tpl_comment_subReply += '</div>';
    tpl_comment_subReply += '<div class="JS_comment_text_sub rv_txt"></div>'; //评论文字
    tpl_comment_subReply += '<div class="rv_btn clr">'; //删除按钮
    tpl_comment_subReply += '<a class="JS_comment_del_sub" href="javascript:void(0);">删除</a>';
    tpl_comment_subReply += '</div>'; //删除按钮结束
    tpl_comment_subReply += '</div>'; //用户评论结束
    tpl_comment_subReply += '</div>'; //用户图像和评论结束
    tpl_comment_subReply += '<div class="rv_reply">'; //评论回复框
    tpl_comment_subReply += '<div class="rv_more clr">'; //更多评论
    tpl_comment_subReply += '<div class="rm_span">还有<span class="JS_comment_count_sub">0</span>条回复 ';
    tpl_comment_subReply += '<a class="JS_comment_more" href="javascript:void(0);">点击查看>></a>';
    tpl_comment_subReply += '</div>';
    tpl_comment_subReply += '<div class="rv_btn2"><a class="JS_subReport_say" href="javascript:void(0);"><i></i>我也说一句</a></div>';
    tpl_comment_subReply += '<div class="JS_subReport_area report_area report_area3">'; //子评论回复框
    tpl_comment_subReply += '<textarea class="JS_validate_textarea_sub" placeholder="发表评论"></textarea>';
    tpl_comment_subReply += '<div class="rv_a1 clr">';
    tpl_comment_subReply += '<span class="prm">最多输入500个字</span>';
    tpl_comment_subReply += '<a href="javascript:void(0);" class="JS_comment_add_sub btn">发表评论</a>';
    tpl_comment_subReply += '</div>';
    tpl_comment_subReply += '</div>'; //子评论回复框结束
    tpl_comment_subReply += '</div>'; //更多评论结束
    tpl_comment_subReply += '</div>'; //评论回复框结束
    tpl_comment_subReply += '</div>'; //外框结束
    
    //分享
    var tpl_shared = "";
    tpl_shared += '<div class="JS_shared_body">'; //分享
    tpl_shared += '<div class="share_tit clr">'; //分享标题
    tpl_shared += '<ul>';
    tpl_shared += '<li><a href="javascript:void(0);" class="cur">站内分享</a></li>';
    tpl_shared += '<li class="reportId"><a href="javascript:void(0);">站外分享</a></li>';
    tpl_shared += '</ul>';
    tpl_shared += '<div class="close"><a href="javascript:void(0);" class="close">关闭</a></div>';
    tpl_shared += '</div>'; //分享标题结束
    tpl_shared += '<div class="Share">'; //分享标题结束
    tpl_shared += '<div class="station">'; //站内分享
    tpl_shared += '<div class="share_cont1 report">'; //站内分享
    tpl_shared += '<div id=gtgpm-after-this class="report_tit">选择分享对象</div>';
	//tpl_shared += "<div class=gtg-sf-dale></div>";
    tpl_shared += '<dl class="clr">';
    tpl_shared += '<dd>';
    //tpl_shared += '<input type="radio" name="rad" class="rad" />';
    //tpl_shared += '<label>好友</label>';
    tpl_shared += '</dd>';
    tpl_shared += '<dd>';
    //tpl_shared += '<input type="radio" name="rad" class="rad" />';
    //tpl_shared += '<label>组织</label>';
    tpl_shared += '</dd>';
    tpl_shared += '<dd>';
    //tpl_shared += '<input type="radio" name="rad" class="rad" />';
    //tpl_shared += '<label>桐人</label>';
    tpl_shared += '</dd>';
    tpl_shared += '<dd>';
    //tpl_shared += '<input type="radio" name="rad" class="rad" />';
    //tpl_shared += '<label>金桐脑</label>';
    tpl_shared += '</dd>';
    tpl_shared += '</dl>';
    tpl_shared += '</div>';
    tpl_shared += '<div class="report_tit" style="padding-bottom:20px;padding-left:20px;">说说分享的理由</div>'; //分享内容
    tpl_shared += '<div class="report_area">';
    tpl_shared += '<textarea placeholder="这个不错，推荐给你看看…"></textarea>';
    tpl_shared += '</div>'; //分享内容结束
    tpl_shared += '<div class="report_btn clr" style="padding-bottom:20px;padding-top:20px;" ><a href="#" class="btn" id="Determine">确定</a><a href="#" id="cancel">取消</a></div>';
    tpl_shared += '</div>';//站内分享结束
    tpl_shared += '<div class="share_cont1 report outside" style="display:none;">'; //站外分享
/*    tpl_shared += '<div class="bdsharebuttonbox">'
    tpl_shared += '<a href="#" class="bds_more" data-cmd="more">';
    tpl_shared += '</a><a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>';
    tpl_shared += '<a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>';
    tpl_shared += '<a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>';
    tpl_shared += '<a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a>';
    tpl_shared += '<a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>';
    tpl_shared += '<a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a>';
    tpl_shared += '<a href="#" class="bds_bdysc" data-cmd="bdysc" title="分享到百度云收藏"></a>';
    tpl_shared += '<a href="#" class="bds_douban" data-cmd="douban" title="分享到豆瓣网"></a>';
    tpl_shared += '<a href="#" class="bds_tqf" data-cmd="tqf" title="分享到腾讯朋友"></a>';
    tpl_shared += '</div>';*/
    tpl_shared += '</div>'; //站外分享结束
    tpl_shared += '</div>'; //分享结束
    tpl_shared += '</div>'; //分享结束
    
    //收藏
    var tpl_collection = "";
    tpl_collection += '<div class="JS_collect_body collect_warp report">'; //收藏
    tpl_collection += '<div class="collect_tit clr">'; //收藏标题
    tpl_collection += '<h3><i></i>收藏目录</h3>';
    tpl_collection += '<a href="javascript:void(0);" class="JS_collect_add add_btn">添加收藏目录</a>';
    tpl_collection += '</div>'; //收藏标题结束
    tpl_collection += '<div class="catalog_box">'; //目录结构
    tpl_collection += '<ul>';
    tpl_collection += '<li>';
    tpl_collection += '<div class="core clr">'; //栏目列表
    tpl_collection += '<div class="t"><i class="icn1"></i>目录2<i class="icn2"></i></div>';
    tpl_collection += '<div class="ed clr">'; //栏目操作
    tpl_collection += '<a href="javascript:void(0);" class="bt1">添加</a>';
    tpl_collection += '<a href="javascript:void(0);" class="bt2">编辑</a>';
    tpl_collection += '<a href="javascript:void(0);" class="bt3">删除</a>';
    tpl_collection += '</div>'; //栏目操作结束
    tpl_collection += '</div>'; //栏目列表结束
    tpl_collection += '</li>';
    tpl_collection += '</ul>';
    tpl_collection += '</div>'; //目录结构结束
    tpl_collection += '<div class="collect_btn collect_btn1 clr">'; //按钮
    tpl_collection += '<a href="javascript:void(0);" class="JS_collect_ok btn">确定</a>';
    tpl_collection += '<a href="javascript:void(0);" class="JS_collect_cancel">取消</a>';
    tpl_collection += '</div>'; //按钮结束
    tpl_collection += '</div>'; //收藏结束

    //收藏目录添加
    var tpl_collection_add = "";
    tpl_collection_add += '<div class="collect_warp report">'; //添加收藏
    tpl_collection_add += '<div class="collect_fm">'; //收藏内容
    tpl_collection_add += '<div class="clt_ipt">';
    tpl_collection_add += '<label>名称：</label>';
    tpl_collection_add += '<input type="text" placeholder="请输入目录名称" class="ipt" />';
    tpl_collection_add += '</div>';
    tpl_collection_add += '<div class="clt_ipt">';
    tpl_collection_add += '<label class="t">描述：</label>';
    tpl_collection_add += '<textarea placeholder="请输入目录描述内容"></textarea>';
    tpl_collection_add += '</div>';
    tpl_collection_add += '</div>'; //收藏内容结束
    tpl_collection_add += '<div class="collect_btn collect_btn2 clr">'; //收藏按钮
    tpl_collection_add += '<a href="javascript:void(0);" class="JS_collect_add_ok btn">确定</a>';
    tpl_collection_add += '<a href="javascript:void(0);" class="JS_collect_add_cancel">取消</a>';
    tpl_collection_add += '</div>'; //收藏按钮结束
    tpl_collection_add += '</div>'; //添加收藏结束

    //收藏目录删除
    var tpl_collection_del = "";

    //书签
    var tpl_bookmark = "";
    tpl_bookmark += '<div class="JS_bookmark_body">'; //书签
    tpl_bookmark += '<div class="tit clr">'; //书签标题
    tpl_bookmark += '<h3><i></i>书签</h3>';
    tpl_bookmark += '<a href="javascript:void(0);" class="close">关闭</a>';
    tpl_bookmark += '</div>'; //书签标题结束
    tpl_bookmark += '<div class="cont">'; //书签列表
    tpl_bookmark += '<div class="tit2"><a href="javascript:void(0);">将本页加入书签</a></div>';
    tpl_bookmark += '<div class="cell">'; //书签列表信息
    tpl_bookmark += '<i></i>';
    tpl_bookmark += '<div class="at clr">'; //列表头
    tpl_bookmark += '<h4 class="clr">';
    tpl_bookmark += '<a href="javascript:void(0);" target="_blank">市场的基本逻辑</a>';
    tpl_bookmark += '<span>（第17页）</span>';
    tpl_bookmark += '</h4>';
    tpl_bookmark += '<div class="time">2014-07-02 10:57:49</div>';
    tpl_bookmark += '</div>'; //列表头结束
    tpl_bookmark += '<div class="txt"><a href="#" target="_blank">创立超越西方经济学的中</div>';
    tpl_bookmark += '</div>'; //书签列表信息结束
    tpl_bookmark += '<div class="page_warp clr">'; //书签分页
    tpl_bookmark += '<div class="page_left">'; //数字分页
    tpl_bookmark += '<a href="#" class="no_a">首页</a>';
    tpl_bookmark += '<a href="#" class="no_a">上一页</a>';
    tpl_bookmark += '<a href="#">下一页</a>';
    tpl_bookmark += '<a href="#">末页</a>';
    tpl_bookmark += '<span>共309条信息</span>';
    tpl_bookmark += '</div>'; //数字分页结束
    tpl_bookmark += '<div class="page_rig"><span>当前第1页,共7页</span>'; //快捷跳转
    tpl_bookmark += '<input type="text" class="ipt" value="1" />';
    tpl_bookmark += '<a href="javascript:void(0);" class="jump">跳转</a>';
    tpl_bookmark += '</div>'; //快捷跳转结束
    tpl_bookmark += '</div>'; //书签分页结束
    tpl_bookmark += '</div>'; //书签列表结束
    tpl_bookmark += '</div>'; //书签结束
    
    //目录
    var tpl_catalog = "";
    tpl_catalog += '<div class="JS_catalog_body">'; //目录开始
    tpl_catalog += '<div class="tit clr">';
    tpl_catalog += '<h3><i></i>目录</h3>';
    tpl_catalog += '<a href="#" class="close">关闭</a>';
    tpl_catalog += '</div>';
    tpl_catalog += '<div class="catalog">';
    tpl_catalog += '<dl>';
    tpl_catalog += '<dd class="clr"><a href="#">前言</a><span>1</span></dd>';
    tpl_catalog += '<dd class="clr"><a href="#">第一章  官员出身的企业家</a><span>3</span></dd>';
    tpl_catalog += '<dd class="clr"><a href="#">第二章  官员出身的企业家</a><span>5</span></dd>';
    tpl_catalog += '</dl>';
    tpl_catalog += '</div>';
    tpl_catalog += '<div class="page_warp clr">';
    tpl_catalog += '<div class="page_left">';
    tpl_catalog += '<a href="#" class="no_a">首页</a>';
    tpl_catalog += '<a href="#" class="no_a">上一页</a><a href="#">下一页</a><a href="#">末页</a>';
    tpl_catalog += '<span>共309条信息</span>';
    tpl_catalog += '</div>';
    tpl_catalog += '<div class="page_rig">';
    tpl_catalog += '<span>当前第1页,共7页</span>';
    tpl_catalog += '<input type="text" class="ipt" value="1" />';
    tpl_catalog += '<a href="#" class="jump">跳转</a>';
    tpl_catalog += '</div>';
    tpl_catalog += '</div>';
    tpl_catalog += '</div>'; //目录结束
    
    //举报
    var tpl_report = "";
    tpl_report += '<div class="JS_report_body">'; //举报
    tpl_report += '<div class="tit clr">'; //举报标题
    tpl_report += '<h3><i></i>您为什么要举报此信息？</h3>';
    tpl_report += '<a href="javascript:void(0);" class="close">关闭</a>';
    tpl_report += '</div>'; //举报标题结束
    tpl_report += '<div class="report">'; //举报正文
    tpl_report += '<dl class="JS_report_type clr">'; //举报类型
    tpl_report += '<dd>';
    tpl_report += '<input type="radio" name="rad" class="rad" value="1" checked />';
    tpl_report += '<label>色情淫秽</label>';
    tpl_report += '</dd>';
    tpl_report += '<dd>';
    tpl_report += '<input type="radio" name="rad" class="rad" value="2" />';
    tpl_report += '<label>骚扰谩骂</label>';
    tpl_report += '</dd>';
    tpl_report += '<dd>';
    tpl_report += '<input type="radio" name="rad" class="rad" value="3" />';
    tpl_report += '<label>广告欺诈</label>';
    tpl_report += '</dd>';
    tpl_report += '<dd>';
    tpl_report += '<input type="radio" name="rad" class="rad" value="4" />';
    tpl_report += '<label>反动言论</label>';
    tpl_report += '</dd>';
    tpl_report += '<dd>';
    tpl_report += '<input type="radio" name="rad" class="rad" value="5" />';
    tpl_report += '<label>其他</label>';
    tpl_report += '</dd>';
    tpl_report += '</dl>'; //举报类型结束
    tpl_report += '<div class="report_tit">举报理由：</div>';
    tpl_report += '<div class="JS_report_area report_area">'; //举报描述
    tpl_report += '<textarea class="JS_validate_textarea" placeholder="描述恶意行为…"></textarea>';
    tpl_report += '</div>'; //举报描述结束
    tpl_report += '<div class="JS_report_btn report_btn">'; //举报提交按钮
    tpl_report += '<a href="javascript:void(0);" class="JS_cancel">取消</a>';
    tpl_report += '<a href="javascript:void(0);" class="btn">确定</a>';
    tpl_report += '</div>'; //举报提交按钮结束
    tpl_report += '</div>'; //举报正文结束
    tpl_report += '</div>'; //举报结束

    //跳转到
    var tpl_jumpTo = "";
    tpl_jumpTo += '<div class="jump_w"> 跳转至';
    tpl_jumpTo += '<input type="text" class="ipt" value="1" />';
    tpl_jumpTo += '页<a href="javascript:void(0);" class="btn">确认</a> ';
    tpl_jumpTo += '</div>';

    //阅读器字体缩放
    var tpl_font = "";
    tpl_font += '<div id="JS_ftw" class="font_w" style="font-size:14px;">';
    tpl_font += '<a class="cur font1" href="javascript:void(0);" onclick="RD.act.font.size(this);"><span class="a1">A1</span></a>';
    tpl_font += '<a class="font2" href="javascript:void(0);" onclick="RD.act.font.size(this);"><span class="a2">A1</span></a>';
    tpl_font += '<a class="font3" href="javascript:void(0);" onclick="RD.act.font.size(this);"><span class="a3">A1</span></a>';
    tpl_font += '<a class="font4" href="javascript:void(0);" onclick="RD.act.font.size(this);"><span class="a4">A1</span></a>';
    tpl_font += '</div>';
    
    //复制内容弹出层
    var tpl_copy = "";
    tpl_copy += '<div class="JS_copy_body">'; //搜索查询开始
    tpl_copy += '<ul class="text_copy">';
    tpl_copy += '<li><a href="javascript:void(0);" target="_blank">搜索</a></li>';
    tpl_copy += '<li><a href="javascript:void(0);">分享到</a></li>';
    tpl_copy += '<li><a href="javascript:void(0);">复制</a></li>';
    tpl_copy += '<li class="bor"><a href="javascript:void(0);">创建为人脉</a></li>';
    tpl_copy += '<li><a href="javascript:void(0);">创建为组织</a></li>';
    tpl_copy += '<li><a href="javascript:void(0);">创建为需求</a></li>';
    tpl_copy += '</ul>';
    tpl_copy += '</div>'; //搜索查询结束
    
    //关键词查询框
    var tpl_keyword = "";
    tpl_keyword += '<div class="JS_keyword_body">'; //关键词查询框内容开始
    tpl_keyword += '<div class="books_top clr">'; //基本信息描述开始
    tpl_keyword += '<div class="img"><img class="JS_user_image" src="" alt="用户头像"></div>';
    tpl_keyword += '<div class="info">';
    tpl_keyword += '<h3 class="JS_user_name">用户名</h3>';
    tpl_keyword += '<p>籍贯：<span class="JS_user_address"></span></p>';
    tpl_keyword += '<p>出生年月：<span class="JS_user_birthday"></span></p>';
    tpl_keyword += '</div>';
    tpl_keyword += '</div>'; //基本信息描述结束
    tpl_keyword += '<div class="books_cont">';
    tpl_keyword += '<p class="JS_user_description">瑞穗证劵亚洲公司董事总经理，首席经</p>';
    tpl_keyword += '</div>';
    tpl_keyword += '</div>'; //关键词查询框内容结束

    //确认提示框
    var tpl_confirm = "";
    tpl_confirm += '<div id="JS_layer_confirm" class="confirm">';
    tpl_confirm += '<div class="confirm_msg"></div>'; //消息
    tpl_confirm += '<div class="confirm_btn">'; //按钮
    tpl_confirm += '<a href="javascript:void(0);" class="cancel">取消</a>';
    tpl_confirm += '<a href="javascript:void(0);" class="ok">确定</a>';
    tpl_confirm += '</div>'; //按钮结束
    tpl_confirm += '</div>';

    return {
        comment: tpl_comment,
        comment_subReply: tpl_comment_subReply,
        shared: tpl_shared,
        collection: tpl_collection,
        collection_add: tpl_collection_add,
        collection_del: tpl_collection_del,
        bookmark: tpl_bookmark,
        catalog: tpl_catalog,
        report: tpl_report,
        font: tpl_font,
        jumpTo: tpl_jumpTo,
        pages: tpl_pages,
        copy: tpl_copy,
        keyword: tpl_keyword,
        snsShare: tpl_snsShare,
        confirm: tpl_confirm
    }
});
