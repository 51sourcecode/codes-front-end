define(function(require, exports, module){
  
//return function(){
   var $ = require("jquery");
   require("global")(window);
   //(function($, win) {
    var win=window;
    var doc = win.document,
        GT = {};
        
        
    /*
     * 头部鼠标划过效果
     * 私信通知获取数据列表
     */
    GT.headerAnimate = {
        
        hoverSelector: ".j-select",
        
        letterCls: "header-letter",
        
        notesCls: "header-notes",
        
        hoverCls: "j-hd-hover",
        
        letterStatus: false, // 私信数据是否保存成功
        
        notesStatus: false, // 通知数据是否请求成功
        
        
        getletterData: function() {
        
            console.log("私信数据");
            this.letterStatus = true;
        },
        
        getNotesData: function () {
            
            console.log("通知数据");
            this.notesStatus = true;
        },
        
        hoverHandle: function (elem) {
            
            // 显示下拉列表
            $(elem).toggleClass(this.hoverCls);
            
            // 获取通知数据
            if ( $(elem).hasClass(this.notesCls) && !this.notesStatus) {
                    
                this.getNotesData();
            }
            
            // 获取私信数据
            if ( $(elem).hasClass(this.letterCls) && !this.letterStatus) {
                    
                this.getletterData();
            }        
        },
        
        init: function () {
        
            var that = this;
            
            $(that.hoverSelector).hover(function() {
                
                that.hoverHandle(this);
            });
            $(that.hoverSelector).mouseleave(function() {
            });
        }
    };
    GT.headerAnimate.init();
    
    GT.headerSearch = {
        init : function(){
            $('.header-search .search-default').click(function(){
                $(this).hide();
                $('.header-search .search-inp').val('').focus();
            });
            $('.header-search .search-inp').focus(function(){
                $('.header-search .search-default').hide();
            }).blur(function(){
                var val = $.trim($('.header-search .search-inp').val());
                if(val == ''){
                    $('.header-search .search-default').show();
                }
            });
        }   
    };
    GT.headerSearch.init();
    

    /*
    * cookie 设置
    * expires 过期时间 可设置毫秒数数
    * 注：删除cookie时 如果添加了路径 要删除路径
    */
    GT.cookie = {
        set:function(key,value,expires,path,domain,bsecure){
            //转换为毫秒数
            if ('number' == typeof expires) {
                var startime = new Date();
                expires.setTime(startime.getTime() + expires);
            }
            var s = key + "=" + value
            + (path ? "; path=" + path : "; path=" + "/")
            + (expires ? "; expires=" + expires.toGMTString() : "; expires=" + "")
            + (domain ? "; domain=" + domain : "; domain=" + "gintong.com")
            + (bsecure ? "; secure" : '');
            doc.cookie = s;
                
        },
        get:function(key){
            var reg = new RegExp("(^| )" + key + "=([^;]*)(;|\x24)"),
                result = reg.exec(document.cookie);
                
            if (result) {
                return result[2] || null;
            }
            return null;    
        },
        remove:function(key,path,domain){
            this.set(key, '', new Date(0),path,domain);
        }
    }; 
    
    
    /*
     * 私信 通知 数字显示
     * 顶部通告显示
     */
    function Notes() {
    
        this.$letterNum = $("#j-letter-num");
        this.$notesNum = $("#j-notes-num");
        
        this.url = "/msg/last.json";
        
        this.init();
    }
    /**
     * 判断是显示，还是隐藏
     * 返回的数量，cookies中记录的时间，返回数据中的时间
     */
    function showOrHide(num, cookieTime, time,closeFlag) {
        if (num == 0) {//返回数量为0，直接退出
            return false;
        }
        if (!cookieTime) {//cookies中没有时间，表示第一次
            cookieTime = 0;
        }
        if (time > cookieTime) {//返回的时间比cookies中的要大，表示有更新
            return true;
        } else {//返回的数量比cookies中的小，说明用户直接在通知列表查看了数据，此时要根据关闭状态判断
            if (GT.cookie.get(closeFlag) == "close") {
                return false;
            } else {
                return true;
            }
        }
    }    
    Notes.prototype = {
        
        constructor:Notes,
        
        // 替换html中的%s的值
        replaceText: function (text) {
            var i = 1, args = arguments;
            
            return text.replace(/%s/g, function () {
                return (i < args.length) ? args[i++] : "";
            });
        },
        
        // 渲染私信处理
        renderLetter: function(num, cookieTime, time) {
        
            if(showOrHide(num, cookieTime, time,"closeLetter")){
                $("#j-letter-num").html(num).show();
                // 设置cookie
                GT.cookie.set("letterTime", time);
                GT.cookie.set("closeLetter", "open");
                return true;
            }
            return false;
        },
        
        // 渲染通知数据
        renderNotes: function(num, cookieTime, time) {
            if(showOrHide(num, cookieTime, time,"closeNotes")){
                //显示并设置打开状态
                $("#j-notes-num").html(num).show();
                GT.cookie.set("notesTime", time);
                GT.cookie.set("closeNotes", "open");
                return true;
            }
            return false;
        },
        renderTips: function(showLetter,showNotes){
            if ($("#topLetterTip").length > 0) {
                $("#topLetterTip").remove();
            }
            if(showLetter || showNotes){
                var html = '<div class="tipsy tipsy-n" style="position:fixed;top:%spx; left:%spx; width:130px;" id="topLetterTip"><div class="tipsy-inner" style="width:70px;background-color: #d35400;border-color:#e67e22;"><div class="tipsy-arrow" style="">&nbsp;</div><ul class="topLetterTip clearfix">%s%s</ul><span class="tipClose latestClose"></span></div></div>';
                var jLetterNum= $('#j-letter-num').parent();
                var offset = jLetterNum.offset();
                var height = jLetterNum.height();
                var width = jLetterNum.width();
                var top = height;
                var left = offset.left;
//              left += width;
                var letter = showLetter?'<li style="color:#fff;" class="js_top_letter">您有新私信</li>':'';
                var notes = showNotes?'<li style="color:#fff;" class="js_top_notes">您有新通知</li>':'';
                html = this.replaceText(html, top, left, letter, notes);
                var $html = $(html);
                // 绑定关闭事件
                $html.find("span.tipClose").click(function(){
                   var topLetterTip = $("#topLetterTip");
                   if($(".js_top_letter",topLetterTip).length>0){
                      GT.cookie.set("closeLetter", "close");
                   }
                   if($(".js_top_notes",topLetterTip).length>0){
                      GT.cookie.set("closeNotes", "close");
                   }
                  $("#j-notes-num").hide();
                  $("#j-letter-num").hide();
                   topLetterTip.remove();
                });
                // 插入到页面中去
                $("body").append($html);
            }
        },
        /*
         * 公告渲染
         * TODO： 有点乱需重新考虑
         */
        renderTop: function (obj) {
            
            if (!obj || typeof obj != "object") {return false;}
            
            var time = obj.timestamp,
                cookieTime = GT.cookie.get("topTime");
            if(showOrHide(1, cookieTime, time,"closeTop")){
                GT.cookie.set("topTime", obj.timestamp);
                GT.cookie.get("closeTop", "open");
                // 删除已有
                if ($("#website-top").length > 0) {
                    $("#website-top").remove();
//                    $('#header').css({'height':'56px'})
                }
                var title = obj.title,
                url = contextPath+"/msg/affiche/detail/?id=" + obj.id,
                subject = obj.subject;
                var html = '<div id="website-top" class="clearfix"><div id="website-topC"><p><i></i> %s： %s，点击<a href="%s">查看详情</a><span></span></p></div></div>';
                html = this.replaceText(html, subject, title, url);
                var $html = $(html);
//              $('#header').css({'height':'105px'})
                // 绑定关闭事件
                $html.find("span").click(function(){
                    $("#website-top").remove();
                    GT.cookie.set("closeTop", "close");
                    $('#header').css({'height':'140px'})
                });
                // 插入到页面中去
                if($('.twoLevelNav').length == 0){
                     $("#header").after($html);
                }else{
                    $('.twoLevelNav').after($html);
//                  $('#website-top').css({'top':'56px'});
//                  $('#header').css({'height':'105px'})
                }
               
            }
        },
        
        // 处理数据
        doData: function (data) {
            var letterTime = data.letterVisible || 0, // 私信时间戳
                notesTime = data.affiche_time || 0,   // 通知时间戳
               
                letterNum = data.letterNum || 0,      // 私信数
                notesNum = data.affiche_new || 0,     // 通知数量
                 
                letterCookieTime = GT.cookie.get("letterTime"), // cookie中私信时间戳
                notesCookieTime = GT.cookie.get("notesTime");   // cookie中 通知时间戳
                
            
            var showLetter = this.renderLetter(letterNum, letterCookieTime, letterTime);
            var showNotes = this.renderNotes(notesNum, notesCookieTime, notesTime);
            //this.renderTips(showLetter,showNotes);
            // 顶部公共渲染
            this.renderTop(data.top);
        },
        
        // 获取数据 一分钟获取一次
        getData: function () {
        
            var that = this;
            win.setTimeout(function(data){
                
                $.get(that.url+'?_='+new Date().getTime(), function (data) {

                    that.doData(data);
                }, "json");

                win.setTimeout(arguments.callee, 1000 * 60 * 3); 
            }, 0);
        },
        
        fireEvent: function () {
                    
            $(".header-letter-btn").bind("click", function(event) {
                event.preventDefault();
                
                if ($("#j-letter-num").html() * 1 > 0) {
                    GT.cookie.set("closeLetter", "close");
                }
                
                win.location.href = this.href;
            });
            
            $(".header-notes-btn").bind("click", function(event) {
                event.preventDefault();
                
                if ($("#j-notes-num").html() * 1 > 0) {
                    GT.cookie.set("closeNotes", "close");
                }
                
                win.location.href = this.href;
            }); 
        },
        
        init: function () {
            this.getData();
            this.fireEvent();
        }
    };
        
    GT.Notes = new Notes();
    
    win.GT = GT;
    $('.sensitive').bind('change',function(){
        var obj = $(this);
        $.ajax({
            url : dataPath + '/sensitive/check.json',
            data : {
                word:obj.val()
            },
            dataType : 'json',
            type:'POST',
            cache : false,
            async : false,
            success : function (data) {
                if(data.result.length>0){
                    var html='<span class="sensitiveError clearfix mt10 fl mb10" style="font-size:12px;line-height:20px;">您输入的内容中有敏感词';
                    $.each(data.result,function(i,o){
                        html+='<font color=\'red\'>"'+o+'"</font>';
                        if(i<data.result.length-1 && data.result.length>1){
                            html+='、';
                        }
                    });
                    html+=',建议您立即删掉。</span>';
                    $(obj).next('.sensitiveError').remove();
                    obj.after(html);
                }else{
                    $(obj).next('.sensitiveError').remove();
                }
            }
        });
    });    
//}(jQuery, window));
//}

});