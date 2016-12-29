define(function(require, exports, module){
	//var $ = require("jquery");
//(function($) {
	require("global")(window);
	return function($){
		$.alerts = {
		verticalOffset : 0,
		horizontalOffset : 0,
		repositionOnResize : true,
		overlayOpacity : .00,
		overlayColor : '#000',
		overlaySize : 'fit',
		draggable : true,
		okButton : '确定',
		cancelButton : '取消',
		alertTimer : null,
		dialogClass : null,
		alert : function(message, title, callback,fitsize) {
			if (title == null)
				title = '警告';
			$.alerts._show(title, message, null, null, null, 'alert', function(
					result) {
				if (callback)
					callback(result);
			},fitsize);
		},
		alertTip : function(targetId,title,html,timer,callback,fitsize){
			$.alerts._showTip(targetId,title,html,timer,'alertTip',function(result){
				
				if(callback){
					callback(result);
				}
			},fitsize);
		},
		confirm : function(message, title, callback,fitsize) {
			if (title == null)
				title = '确认';
			$.alerts._show(title, message, null, null, null, 'confirm',
					function(result) {
						if (callback)
							callback(result);
					},fitsize);
		},
		confirmCenter : function(message, title, callback,fitsize) {
			if (title == null)
				title = '确认';
			$.alerts._show(title, message, null, null, null, 'confirmCenter',
					function(result) {
						if (callback)
							callback(result);
					},fitsize);
		},
		confirmTip : function(targetId,title,html,timer,callback,fitsize){
			$.alerts._showTip(targetId,title,html,timer,'confirmTip',function(result){
				if(callback){
					callback(result);
				}
			},fitsize);
		},
		prompt : function(message, title, value, callback,fitsize) {
			if (title == null)
				title = '请输入';
			$.alerts._show(title, message, value, null, null, 'prompt',
					function(result) {
						if (callback)
							callback(result);
					},fitsize);
		},
		iframe : function(url, title, width, height,fitsize) {
			if (title == null)
				title = '提示';
			$.alerts._show(title, url, null, width, height, 'iframe', null,fitsize);
		},
		choose : function(message, title, width, height, callback,fitsize,validator) {
			if (title == null)
				title = '提示';
			$.alerts._show(title, message, null, width, height, 'choose',
					function(result) {
						if (callback)
							callback(result);
					},fitsize,validator);
		},
		html : function(message, title, width, height, callback,fitsize) {
			if (title == null)
				title = '提示';
			$.alerts._show(title, message, null, width, height, 'html', callback,fitsize);
		},
		_show : function(title, msg, value, width, height, type, callback,fitsize,validator) {
			$("#popup_container,.popup_container").remove();
			$('#popup_container_shadow,.popup_container_shadow').remove();
			$.alerts._overlay('show',fitsize);
			$("BODY").append(
							'<div id="popup_container" class="gSys_msg_box clearfix"><div class="popup_container_shadow" id="popup_container_shadow"></div><div class="popup_container_content clearfix" id="popup_container_content"><div class="popup_container_wrap clearfix" id="popup_container_wrap">'
									+ '<div id="popup_title" class="ptitle  clearfix"><h4></h4><a href="javascript:;" class="fn-bg aclose" title="关闭">关闭</a></div>'
									+ '<div id="popup_message_box" class="pbox clearfix"><div class="pmsg"><b title="提示:" class="ico"></b><div class="ct" id="popup_message"></div></div></div>'
									+ '<div id="popup_opt_box" class="popt"><div class="opt" id="opt"></div></div>'
									+ '</div></div></div>');
			if ($.alerts.dialogClass)
				$("#popup_container").addClass($.alerts.dialogClass);
			if (width == null) {
				width = 460;
			}
			$("#popup_container").css({position : 'absolute',zIndex : 99995,padding : '1px',margin : 0,width : width + 'px'});
			if (height) {
				$("#popup_message_box").css("height", height + 'px');
			}
			$("#popup_title h4").html(title);
			$("#popup_message_box b").addClass(type);
			$("#popup_message").text(msg);
			$("#popup_message").html(
					$("#popup_message").text().replace(/\n/g, '<br />'));
			$.alerts._maintainPosition(true);
			$.alerts._reposition();
			$("#popup_title a").click(function() {
				var re = true;
				if (callback){
					re = callback(false);
				}
				if(re != "show"){
					$.alerts._hide();
				}
			});
			switch (type) {
			case 'alert':
				$("#opt").html('<div class="alertButtonArea clearfix"><span class="alertButtonAreaSpan alertButtonAreaSpanOne"><a id="popup_ok" href="javascript:void(0);" class="alertBtn">'+ $.alerts.okButton + '</a></span></div>');
				$("#popup_ok").click(function() {
					$.alerts._hide();
					callback(true);
					return false;
				});
				 $("#popup_ok").focus().keypress(function(e) {
					if (e.keyCode == 13 || e.keyCode == 27)
						$("#popup_ok").trigger('click');
				});
				break;
			case 'confirm':
				$("#opt").html('<div class="alertButtonArea clearfix"><p class="clearfix"><span class="alertButtonAreaSpan alertButtonAreaSpanTwo"><a id="popup_cancel" href="javascript:void(0);" class="alertCancelBtn">'	+ $.alerts.cancelButton + '</a><a id="popup_ok" href="javascript:void(0);" class="alertBtn">' + $.alerts.okButton + '</a></span></p></div>');
				$("#popup_ok").click(function() {
					$.alerts._hide();
					if (callback)
						callback(true);
					return false;

				});
				$("#popup_cancel").click(function() {
					$.alerts._hide();
					if (callback){
						callback(false);
						return false;
					}
				});
				$("#popup_ok").focus();
				$("#popup_ok, #popup_cancel").keypress(function(e) {
					if (e.keyCode == 13)
						$("#popup_ok").trigger('click');
					if (e.keyCode == 27)
						$("#popup_cancel").trigger('click');
				});
				break;
			case 'confirmCenter':
				$("#opt").html('<div class="alertButtonArea clearfix"><p class="clearfix"><span class="alertButtonAreaSpan alertButtonAreaSpanTwo" style="float:none;"><a id="popup_cancel" href="javascript:void(0);" class="button buttonNo" style="margin-right:15px; font-weight:normal; height:24px; line-height:24px; padding:2px 15px;">'	+ $.alerts.cancelButton + '</a><a id="popup_ok" href="javascript:void(0);" class="button buttonPureBlue" style="font-weight:normal; height:24px; line-height:24px; padding:2px 15px;">' + $.alerts.okButton + '</a></span></p></div>');
				$("#popup_ok").click(function() {
					$.alerts._hide();
					if (callback)
						callback(true);
					return false;

				});
				$("#popup_cancel").click(function() {
					$.alerts._hide();
					if (callback){
						callback(false);
						return false;
					}
				});
				$("#popup_ok").focus();
				$("#popup_ok, #popup_cancel").keypress(function(e) {
					if (e.keyCode == 13)
						$("#popup_ok").trigger('click');
					if (e.keyCode == 27)
						$("#popup_cancel").trigger('click');
				});
				break;
			case 'iframe':
				$("#popup_message_box").remove();
				$("#popup_opt_box").remove();
				$("#popup_container").append("<div id='popup_iframe_box' class='piframe'><div id='loading' class='loading'><img src='./loading.gif'></div></div>");
				$("#loading").css({width : width + "px",height : height + "px",padding : 0,margin : 0});
				if ($.browser.msie && ($.browser.version == "6.0" || $.browser.version == "7.0")) {
					$("#loading").css("fontSize", height * 0.9 + 'px');
				}
				if ($.browser.msie && $.browser.version == "6.0") {
					$("#popup_title").width((parseInt(width) + 2) + 'px');
				}
				var iframe = document.createElement("iframe");
				iframe.id = "iframe";
				iframe.width = width + "px";
				iframe.height = height + "px";
				iframe.scrolling = "auto";
				iframe.setAttribute("frameborder", "0", 0);
				iframe.src = msg;
				iframe.style.display = "none";
				$("#popup_iframe_box").append(iframe);
				$(iframe).load(function() {
					iframe.style.display = "block";
					$("#loading").hide();
				});
				break;
			case 'prompt':
				$("#popup_message_box b").remove();
				$("#popup_message").attr("class", "cp");
				$("#popup_message").append(	'<br /><input type="text" class="pinput" size="48" id="popup_prompt" />');
				$("#opt").html('<div cleass="alertButtonArea clearfix"><p class="clearfix"><span class="alertButtonAreaSpan alertButtonAreaSpanTwo"><a id="popup_cancel" href="javascript:void(0);" class="alertCancelBtn">' + $.alerts.cancelButton + '</a><a id="popup_ok" href="javascript:void(0);" class="alertBtn">' + $.alerts.okButton + '</a></span></p></div>');
				$("#popup_ok").click(function() {
					var val = $("#popup_prompt").val();
					$.alerts._hide();
					if (callback)
						callback(val);
					return false;
				});
				$("#popup_cancel").click(function() {
					$.alerts._hide();
					if (callback)
						callback(null);
					return false;
				});
				$("#popup_prompt, #popup_ok, #popup_cancel").keypress(
						function(e) {
							if (e.keyCode == 13)
								$("#popup_ok").trigger('click');
							if (e.keyCode == 27)
								$("#popup_cancel").trigger('click');
						});
				if (value)
					$("#popup_prompt").val(value);
				$("#popup_prompt").focus().select();
				break;
			case 'choose':
				$("#popup_message_box b").remove();
				$("#popup_message_box br").remove();
				$("#popup_message").attr("class", "cp");
				$("#opt").html('<div class="alertButtonArea clearfix"><p class="clearfix"><span class="alertButtonAreaSpan alertButtonAreaSpanTwo"><a id="popup_cancel" href="javascript:void(0);" class="alertCancelBtn">' + $.alerts.cancelButton + '</a><a id="popup_ok" href="javascript:void(0);" class="alertBtn">' + $.alerts.okButton + '</a></span></p></div>');
				$("#popup_ok").click(function() {
					if(validator){
						if(!validator()){
							return false;
						}
					}
					var val = $("#popup_message");
					$.alerts._hide();
					if (callback)
						callback(val);
					return false;
				});
				$("#popup_cancel").click(function() {
					$.alerts._hide();
					if (callback)
						callback(null);
					return false;
				});
				$("#popup_ok, #popup_cancel").keypress(function(e) {
					if (e.keyCode == 13)
						$("#popup_ok").trigger('click');
					if (e.keyCode == 27)
						$("#popup_cancel").trigger('click');
				});
				break;
			case 'html':
				$("#popup_message_box b").remove();
				$("#popup_opt_box").remove();
				$("#popup_ok").click(function() {
					$.alerts._hide();
					return false;
				});
				$("#popup_cancel").click(function() {
					$.alerts._hide();
					return false;
				});
				break;
			}
			var allHeight = $('#popup_container_wrap').outerHeight();
			var allWidth = $('#popup_container_wrap').outerWidth();
			if(fitsize && fitsize == 'whole'){
				//$("#popup_overlay").css({'height':allHeight+'px','width':allWidth+'px'});
				$('.overlayMask').css({'height':$(document).height()+'px'});
			}else{
				//$("#popup_overlay").css({'height':allHeight+'px','width':allWidth+'px','left':$('#popup_container_wrap').css('left'),'top':$('#popup_container_wrap').css('top')});
			}
			$("#popup_container").css({'height':allHeight+'px'});
			$("#popup_container_shadow").css({'height':allHeight+'px'});
			this._reposition();
			//DD_belatedPNG.fix('.pngfix,.alertImg');
		},
		_showMessage : function(msg, value, width, height, timer,callBack,fitsize){
			$("#popup_container,.popup_container").remove();
			$('#popup_container_shadow,.popup_container_shadow').remove();
			$.alerts._overlay('show',fitsize);
			var widthVal = (width == '' ? '420px' : width+'px');
			$("BODY").append('<div class="popup_container_shadow" id="popup_container_shadow"></div><div id="popup_container" class="gSys_msg_message clearfix" style="width:'+widthVal+'">'
					+'<iframe class="iframebg"   scrolling="no" style="height:44px;left:-2px;top:0px;left:1px;position:absolute;visibility:inherit;z-index:-1;" frameborder=0></iframe> <div class="popup_container_content clearfix" id="popup_container_content" style="border:1px solid #dbdbdb;position:static;"><div class="popup_container_wrap clearfix" id="popup_container_wrap" style="border:none;">'									
					+ '<div id="popup_message_box" class="pbox2 clearfix"><div class="pmsg clearfix"><b title="" class="ico"></b><div class="ct ctDiv wordbreak  clearfix" id="popup_message">'+ msg +'</div></div></div>'
					+ '</div></div></div>');
			$("#popup_message").html(msg);
			$("#popup_message").html($("#popup_message").html().replace(/\n/g, '<br />'));
			
			$("#popup_container").css({position : 'absolute',"z-index" : "999999",padding : '0px',margin : 0,'border-style':'none','height':$('#popup_container_wrap').outerHeight()});//,'border':'2px solid #f1e2cb'
//			if (height) {
//				$("#popup_message_box").css("height", height + 'px');
//			}			
			//$.alerts._maintainPosition(true);
			$.alerts._reposition();
			width == '' ? widthVal1 = ($('#popup_container_content').outerWidth())  + 'px' : widthVal1 = width;
			$('#popup_container_shadow').css({position : 'absolute',"z-index" : "999998",padding : '16px',"margin-left" :"0px",width :widthVal1 ,height: $("#popup_container").height() + 'px',left:($('#popup_container').offset().left -16) +'px',top:($('#popup_container').offset().top -16)+'px'});
			if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) { 
				$('#popup_container_shadow').css({position : 'absolute',"z-index" : "999998",padding : '16px',"margin-left" :"0px",width :widthVal1 ,height: $("#popup_container").height() + 'px',left:($('#popup_container').offset().left -16) +'px',top:($('#popup_container').offset().top -16)+'px'});
				if(fitsize && fitsize == 'whole'){
					$('.overlayMask').addClass('wholeMask').css({'height':$(window).height()+$(window).scrollTop()+'px','background-repeat':'repeat'});
				}else{
					$('.overlayMask').removeClass('wholeMask');
				}
			}
			//DD_belatedPNG.fix('.pngfix,.alertImg');
			if(timer){
				$.alerts.alertTimer = setTimeout('$.alerts._hide('+ timer +','+callBack+')',timer);
				
			}
		},
		_showBlogAlert : function(msg, value, width, height, timer,callBack,fitsize){
			$(".mBlogAlertArea,#mBlogAlertArea,#longDiary_overlay").remove();
			$('#popup_container_shadow,.popup_container_shadow').remove();
			var sizearea2 = (fitsize && fitsize=='whole' ? 'overlayMask' : '');
			$("BODY").append('<div id="longDiary_overlay">'
					+'<iframe style="position:absolute;z-index:0;width:100%;height:100%;top:0px;left:0px;scrolling:no;visible:hidden;" frameborder="0" src="'+imagesRoot+'/transparent.html" allowtransparency="true"></iframe>'
					+'<div class="'+sizearea2+' pngfix"></div>'
					+'</div>');
			$("#longDiary_overlay").css({position : 'absolute',zIndex : 99990,top : '0px',left : '0px',width : $('body').width()+'px',height : $(document).height()+'px'});
			//$.alerts._overlay('show',fitsize);
			var widthVal = (width == '' ? '420px' : width+'px');
			$('body').append('<div class="mBlogAlertArea clearfix" id="mBlogAlertArea" style="width:'+widthVal+'">'
				+'<div class="mBlogAlertInner clearfix"><span class="mBlogAlertClose" title="关闭"></span>'+msg+'</div>'
				+'</div>');
			if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) { 
				//$('#popup_container_shadow').css({position : 'absolute',"z-index" : "999998",padding : '1px',"margin-left" :"0px",width :widthVal1 ,height: $("#popup_container").height()　+ 2 + 'px',left:($('#popup_container').offset().left + 6) +'px',top:($('#popup_container').offset().top + 3)+'px'});
				if(fitsize && fitsize == 'whole'){
					$('.overlayMask').addClass('wholeMask').css({'height':$('body').height()+'px','background-repeat':'repeat'});
				}else{
					$('.overlayMask').removeClass('wholeMask');
				}
			}
			$.alerts._resetLongDiary();
			$(window).resize(function(){
				$.alerts._resetLongDiary();
			}).scroll(function(){
				$.alerts._resetLongDiary();
			});
			if(timer){
				$.alerts.alertTimer = setTimeout('$.alerts._hide('+ timer +','+callBack+')',timer);
			}
			$('.mBlogAlertClose').click(function(){
				$.alerts._cancelLongDiary();
			});
		},
		_resetLongDiary : function(){
			var indexMain = $('.indexMain');
			var top = indexMain.offset().top + 1;
			var left = ($(window).width()-$('#mBlogAlertArea').width())/2;
			$('#popup_overlay').css({'width':$(window).width()});
			$('#mBlogAlertArea').css({top:top+'px',left:left+'px'});
			if($('#mBlogAlertArea').height() > $('body').height()){
				$('#popup_overlay').css({'width':$(window).width(),'height':$('#mBlogAlertArea').height()+100+'px'});
				$('#longDiary_overlay').css({'width':$(window).width(),'height':$('#mBlogAlertArea').height()+100+'px'});
				$('#mBlogAlertArea').css({top:top+'px',left:left+'px'});
			}else{
				$('#popup_overlay').css({'width':$(window).width(),'height':$('body').height()});
				$('#longDiary_overlay').css({'width':$(window).width(),'height':$('body').height()});
			}
		},
		_cancelLongDiary : function(){
			if($('#mBlogAlertArea .longDiaryEdit').length > 0){//正在编辑长观点
				jConfirmCenter('确认放弃编辑？','提示：',function(re){
					if(re){
						$('.mBlogAlertArea').hide();
						$('#popup_overlay,#longDiary_overlay').remove();
					}else{
						$('#longDiary_overlay').show();
					}
				},'whole');
				$('#longDiary_overlay').hide();
				$('#popup_overlay').css({'z-index':'99993'});
				$("#popup_container").css({'top':$('.indexMain').offset().top + 80 +'px','border':''}).find('#popup_container_shadow,#popup_title span,#popup_title h4').hide();
				$('#popup_title').css({'background':'#fff','border':'none'});
				$('.popup_container_content').css({'border':'#d9d9d9 solid 1px','':''});
				$('.gSys_msg_box .pbox').css({'background':'#fff','border':'none'});
				$('.pmsg').css({'padding':'0px 0 10px'});
			}else{
				$('.mBlogAlertArea').hide();
				$('#popup_overlay,#longDiary_overlay').remove();
			}
		},
		_showTip : function(targetId,title,html,timer,tipType,callback){
			var targetDiv = $('#'+targetId);		
			if(title == null){
				title = '提示：'
			}
			if(!targetDiv.is(":hidden")){
				//targetDiv.html('').slideUp();
			}
			targetDiv.html('<div class="alertTipArea clearfix"><div class="alertTipText"></div></div>');
			switch(tipType){
				case 'alertTip' :
					targetDiv.find('.alertTipText').append('<h4 class="tac clearfix"><span class="redText">'+title+html+'</span></h4>');
				break;
				case 'confirmTip' :
					targetDiv.find('.alertTipText').append('<h4 class="tac clearfix"><span class="redText">'+title+html+'</span><span class="tipsButtons"><a id="popup_ok" href="javascript:void(0);" class="alertBtnTip">' + $.alerts.okButton + '</a><a id="popup_cancel" href="javascript:void(0);" class="alertCancelBtnTip">'	+ $.alerts.cancelButton + '</a></span></h4>');
					$("#popup_ok").click(function() {
						if (callback)
							callback(true);
							//$.alerts._hideTip(targetId);
						return false;

					});
					$("#popup_cancel").click(function() {
						if (callback){
							callback(false);
							$.alerts._hideTip(targetId);
							return false;
						}
					});
				break;
			}
			targetDiv.slideDown();
			if(typeof(timer) != 'undefined' && timer != '' && timer != null){
				$.alerts.alertTimer = setTimeout('$.alerts._hideTip("'+ targetId +'")',timer);
			}
			
		},
		_hide : function(timer,callBack) {
			$("#popup_container,.popup_container").hide();
			$('#popup_container_shadow,.popup_container_shadow').hide();
			$.alerts._overlay('hide');
			$.alerts._maintainPosition(false);
			clearTimeout($.alerts.alertTimer);
			if(callBack){
				callBack();
			}
		},
		_hideTip : function(targetId,timer,callBack){
			$('#'+targetId).slideUp().html('');
			clearTimeout($.alerts.alertTimer);
			if(callBack){
				callBack();
			}
		},
		_timerHide : function(timer,callBack) {
			$.alerts.alertTimer = setTimeout('$.alerts._hide('+ timer +')',timer);
		},
		_timerTipHide : function(targetId,timer){
			//$.alerts.alertTimer = setTimeout('$.alerts._hideTip('+ targetId +')',timer);
		},
		_overlay : function(status,fitsize) {
			var sizearea = (fitsize && fitsize=='whole' ? 'filter:alpha(opacity=15);opacity: 0.15; background-color:#363636;' : 'filter:alpha(opacity=100);opacity: 1; background-color:transparent;');
			var sizearea2 = (fitsize && fitsize=='whole' ? 'overlayMask' : '');
			var sizeopacity = (fitsize && fitsize=='whole' ? 0.3 : 1);
			switch (status) {
			case 'show':
				$.alerts._overlay('hide');
				$("BODY").append('<div id="popup_overlay">'
						+'<iframe style="position:absolute;z-index:0;width:100%;height:100%;top:0px;left:0px;scrolling:no;visible:hidden;" frameborder="0" src="'+imagesRoot+'/transparent.html" allowtransparency="true"></iframe>'
						+'<div class="'+sizearea2+' pngfix"></div>'
						+'</div>');
				$("#popup_overlay").css({position : 'absolute',zIndex : 99990,top : '0px',left : '0px',width : $('body').width()+'px',height : $(document).height()+'px'});
				if ($.browser.msie && $.browser.version == "6.0") {
					$("#popup_overlay").width($(window).width());
				}
				;
				break;
			case 'hide':
				$("#popup_overlay").remove();
				break;
			}
		},
		_reposition : function() {
			var top = (($(window).height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.alerts.verticalOffset;
			var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
			if (top < 0)
				top = 0;
			if (left < 0)
				left = 0;
			top = top + $(window).scrollTop();
			$("#popup_container").css({
				top : top + 50 + 'px',
				left : left + 'px'
			});
			$("#popup_overlay").height($(document).height());
		},
		_maintainPosition : function(status) {
			if ($.alerts.repositionOnResize) {
				switch (status) {
				case true:
					$(window).bind('resize', $.alerts._reposition);
					break;
				case false:
					$(window).unbind('resize', $.alerts._reposition);
					break;
				}
			}
		},
		//弹出灰色背景图片和简单操作指示
		showMaskMsg : function(msg,width,height,timer,callback){
			width = parseInt(width);
			height = parseInt(height);
			var left = ($(window).width()-width)/2;
			var top = ($(window).height()-height)/2;
			var top2 = (top < 0 ? 0 : top);
			var maskstr = '<div class="maskMsgBg" id="" style="position: absolute;top:0px;left:0px; z-index: 99990;scrolling:no;">'
				+'<iframe style="position:absolute;z-index:0;width:100%;height:100%;top:0;left:0;scrolling:no;" frameborder="0"  src="'+imagesRoot+'/transparent.html" allowtransparency="true"></iframe>'
				+'<div class="pngfix" style="background:url('+imagesPath+'/msgTransBg.png) repeat; width:100%; height:100%; position:absolute;z-index:99991;top:0;left:0;">&nbsp;</div>'
				+'</div>'
				+'<div class="maskMsgContent" style="position:absolute; z-index: 99992; margin:0 auto;height:'+height+'px; width:'+width+'px; top:'+top2+'px;left:'+left+'px;">'
				+ msg
				+'</div>';
			//$('body').append('<div class="maskMsgArea" id="maskMsgArea">'+maskstr+'</div>');
			$('body').append(maskstr);
			var height2 = (height > $(window).height() ? height : $(window).height());
			$('.maskMsgBg,.maskMsgBg div.pngfix').css({'width':$(window).width()+'px','height':(height2+150)+'px'});
			//DD_belatedPNG.fix('.pngfix,.alertImg');
		}
	};
	jAlert = function(message, title, callback,fitsize) {
		$.alerts.alert(message, title, callback,fitsize);
	};
	jConfirm = function(message, title, callback,fitsize) {
		$.alerts.confirm(message, title, callback,fitsize);
	};
	jConfirmCenter = function(message, title, callback,fitsize) {
		$.alerts.confirmCenter(message, title, callback,fitsize);
	};
	jPrompt = function(message, title, value, callback,fitsize) {
		$.alerts.prompt(message, title, value, callback,fitsize);
	};
	jIframe = function(url, title, width, height,fitsize) {
		$.alerts.iframe(url, title, width, height,fitsize);
	};
	jChoose = function(html, title, width, height, callback,fitsize,validator) {
		$.alerts.choose(html, title, width, height, callback,fitsize,validator);
	};
	jHtml = function(html, title, width, height,fitsize) {
		$.alerts.html(html, title, width, height,fitsize);
	};
	jAlertTip = function(targetId,title,html,timer,callback,fitsize){
		$.alerts.alertTip(targetId,title,html,timer,callback,fitsize);
	};
	jConfirmTip = function(targetId,title,html,timer,callback,fitsize){
		$.alerts.confirmTip(targetId,title,html,timer,callback,fitsize);
	};
	
	};
	
//})(jQuery);
});