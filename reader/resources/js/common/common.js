define(function(require, exports, module){
	var $ = require("jquery");
	
	var contextPath = "",
		knowledgeHost = "";
	var browserType = checkBrowser();
	$(function(){    //x-add1 x-wh
		$(".x-wh&.x-add1").live('hover',function(){
			$(".wS").show();
		})
		$(".x-wh&.x-add1 img").live('hover',function(){
			$(".wS").show();
		})
		$(".x-wh&.x-add1").live('mouseout',function(){
			$(".wS").hide();
		});

		
		$(".search-inp").focus(function(){
			$(".search-sub").css({background:'url('+imagesRoot+'/search_hover.png) no-repeat 50%'});
			$(".search-inp").css({border:'1px solid #f79d44'});
		}).blur(function(){
			$(".search-sub").css({background:''});
			$(".search-inp").css({border:""});
		})
		$(".header-search").mouseover(function(){
			$(".search-sub").attr({id:"search-sub1"});
			$(".search-inp").attr({id:"search-inp1"});
		}).mouseout(function(){
			$(".search-sub").attr({id:""});
			$(".search-inp").attr({id:""});
		})
		$('.infoTotal').live(browserType,function(){
			$('.topTip').hide();
			$('.topRight a.topListTitle,.topRight .infoTotal').removeClass('topHover');
			$(this).addClass('topHover');
			$(this).find('.topListTitle').addClass('topHover');
			$(this).find('.topTip').show();
			//$(this).find("iframe").css("height",$(this).find(".newIframeDiv").height());
		});
		$('.topRight').live('mouseleave',function(){
			$(this).find('.infoTotal,a.topListTitle').removeClass('topHover');
			$('.topTip').hide();
		});	
		
		$("#myCompanyList").mouseover(function(){
			$('.mainCompany').addClass('myCompanyBg');
		}).mouseout(function(){
			$('.mainCompany').removeClass('myCompanyBg');
		});
		//意见反馈
		$("#feedBack").click(function(){
			var url = window.location.href;
			location.href = contextPath+'/inc/10001/content/26/?url='+ url;
		})
		$("#gotoTop").live('click',function(){
			$('html,body').animate({scrollTop:0},100);
		});
		
		//分享、返回顶部等 右侧悬浮框
		if($('body#login').length <= 0 && $('body#register').length <= 0 && $('body#errorInfo').length <= 0){
			$('body').append('<ul id="memoryBox"><li id="publish" ><h3></h3><span></span><div class="pubSec"><a href="'+ contextPath + '/requirement/add/tzxq/" target="_blank">发布投资需求</a><a href="'
					+ contextPath + '/requirement/add/rzxq/" target="_blank">发布融资需求</a><a href="'
					+ contextPath + '/people/addPeople/" target="_blank">创建人脉</a><a href="'
					+ contextPath + '/personal/customer/" target="_blank">新建客户</a><a href="'
					+ knowledgeHost + '/article/add/?groupid=" target="_blank">新建文章</a><a href="'
					+ knowledgeHost + '/article/diary/add/" target="_blank">发布观点</a></div></li><li id="share"><h3></h3><span></span><div class="shareSec"><a href="'
					+ contextPath + '/people/group/share/index/" target="_blank">分享人脉</a><a href="'
					+ contextPath + '/personal/customer/" target="_blank">分享客户</a><a href="'
					+ contextPath + '/friend/index/" target="_blank">引荐好友</a><a href="'
					+ contextPath + '/requirement/index/tzxq" target="_blank">分享投资需求</a><a href="'
					+ contextPath + '/requirement/index/rzxq" target="_blank">分享融资需求</a><a href="'
					+ knowledgeHost + '/article/index/" target="_blank">分享知识</a></div></li><a  href="'
					+ contextPath + '/suggestion/suggestionform?errUrl='+encodeURIComponent(window.location.href)+'" target="_blank"><li id="option"><h3></h3></li></a><li style="display: none;" id="top"><h3></h3><a  href=""></a></li></ul>');
			handleGoto();
			$("#publish").mouseover(function(){
				$("#publish>span").css({display:"block"});
				$("#publish>h3").css({display:"block"});
				$(".pubSec").css({display:"block"});
			}).mouseout(function(){
				$("#publish>h3").css({display:"none"});
				$("#publish>span").css({display:"none"});
				$(".pubSec").css({display:"none"});
			});
			$("#share").mouseover(function(){
				$("#share>h3").css({display:"block"});
				$("#share>span").css({display:"block"});
				$(".shareSec").css({display:"block"});
			}).mouseout(function(){
				$("#share>h3").css({display:"none"});
				$("#share>span").css({display:"none"});
				$(".shareSec").css({display:"none"});
			});
			$("#option").mouseover(function(){
				$("#option>h3").css({display:"block"});
			}).mouseout(function(){
				$("#option>h3").css({display:"none"});
			});
			$("#top").mouseover(function(){
				$("#top>h3").css({display:"block"});
			}).mouseout(function(){
				$("#top>h3").css({display:"none"});
			});
			$("#top").live('click',function(){
			 	$('html,body').animate({scrollTop:0},100);
			});
		}
		
		$(window).scroll(function(){
			handleGoto();
		});
		
		//输入框样式调整
		$('input.inputText').live('focus',function(){
			$(this).addClass('inputTextHover');
		}).live('blur',function(){
			$(this).removeClass('inputTextHover');
		});
		$('input.inputStyle').live('focus',function(){
			$(this).addClass('inputTextHover');
		}).live('blur',function(){
			$(this).removeClass('inputTextHover');
		});
		
		$('.personalLeft,.threeClumn_l,#personalLeft,#left').css({'height':$('#bd').height()+10});	
		$('#iframe3').css('height',$('.topRelation .topTip').find('li').length * 27 +28+'px');
		//左侧导航修改头像链接
		$('.headPortrait dt').mouseenter(function(){
			$(this).find('.button').show();
		}).mouseleave(function(){
			$(this).find('.button').hide();
		});
		
	});
	
	
	function checkBrowser(){
		var browser = $.browser;
		var sUserAgent = navigator.userAgent.toLowerCase();
	    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";    
	    var bIsIpod = sUserAgent.match(/ipod/i) == "ipod";    
	    var bIsIphone = sUserAgent.match(/iphone/i) == "iphone";    
	    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";  
	    var bIsMidp = sUserAgent.match(/midp/i) == "midp";  
	    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";  
	    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";  
	    var bIsAndroid = sUserAgent.match(/android/i) == "android";  
	    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";  
	    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	    if(bIsIpad || bIsIpod || bIsIphone || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM){
	    	return 'click';
	    }else{
	    	return 'mouseover';
	    }
	}
	
	function handleGoto(){
		$('#memoryBox').css({'left' : 25,'top':400 });
		if($('body').length>0){
			$(window).scrollTop() > 500 ? $("#top").fadeIn(100): $("#top").fadeOut(200);
		}
	}
	
});

/*//get the tip at top every certain time
function getTopTip(){

	$.ajax({
		url : webContextPath+'/msg/last.json',
		async : true,
		cache : false,
		success : function(data){
		}
	});
}
// 写cookies函数 
function SetCookie(name, value){// 两个参数，一个是cookie的名子，一个是值
	var Days = 30; // 此 cookie 将被保存 30 天
	document.cookie = name + "=" + escape(value) + ";path=/;domain=gintong.com";
}
function getCookie(name){// 取cookies函数
	var arr = document.cookie
			.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (arr != null)
		return unescape(arr[2]);
	return null;

}
function delCookie(name){// 删除cookie
	var cval = getCookie(name);
	if (cval != null){
		var expires = new Date();
		expires.setTime(expires.getTime() - 1);
		document.cookie = name + "=" + cval + ";path=/;domain=gintong.com;expires=" + expires.toGMTString();
	}
}

*//**
 * 关闭操作提示
 * @param obj 出发对象
 *//*
function operateNoticeClose(obj,type){
	$(".operateNoticeDiv").remove();
//	这里需要向服务器提交一个请求
	$.get(dataPath+'/msg/operate/close.json',{'type':type});
	return false;
}

*//**
 * 忽略检测最新公告
 *//*
function ignoreTopNotice(obj){
	$('#announcement').slideUp('slow',function(){
		$('#announcement').hide();
	});
	if(typeof(currentUser)!="undefined" && currentUser.id){
		$.ajax({
			url : webContextPath+'/msg/newest/ignore.json?uid='+currentUser.id+'&timestamp='+new Date().getTime(),
			async : true,
			dataType : 'jsonp',
			success : function(data){
			},
			error : function(){
				$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
			}	
		});
	}
}
*//**
 * 忽略检测最新通知
 *//*
function ignoreLatest(){
	SetCookie('MsgCountIgnore','ignore');
		if(typeof(currentUser)!="undefined" && currentUser.id){
		$.ajax({
			url : webContextPath+'/msg/last/ignore.json?uid='+currentUser.id+'&timestamp='+new Date().getTime(),
			async : true,
			dataType : 'jsonp',
			success : function(data){
			},
			error : function(){
				$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
			}	
		});
	}
}

function getLocalHref(){
	var str = window.location.toString();
	return contextPath + '/suggestion/suggestionform?errUrl=' + str;
}

var showHelpMessage = {
	getMessage : function(msgids){
		var self = this;
		var hm = getCookie('HELPMESSAGE'+currentUser.id);
		if(msgids && hm){
			hm = self.getNewHm(hm,msgids);
		}		
		if(typeof(hm)!='undefined' && hm != null && hm != ''){
			var hmm;
			$.ajax({
				url : dataPath + '/message/help/find.json',
				data : {'types' : hm},
				async : true,
				success : function(data){
					hmm = data;
					var idvarr = hm.split('_')
					if(typeof(hmm)!='undefined' && hmm != null){
						$.each(idvarr,function(i){
							var type = idvarr[i];
							if(idvarr[i] != ''){
								self.getMsgHtml(hmm[type],type);
							}
						});
					}
				}
			});
		}
	},
	getNewHm : function(hm,msgids){//比较传入的数值是否在cookie中，返回一个新的字符串
		var arr1 = hm.split('_');
		var arr2 = msgids.split('_');
		var arr = new Array();
		if(arr2.length > 0){
			$.each( arr2, function(i, m){
				var a2 = arr2[i];
				if($.inArray(a2,arr1) > -1 && $.inArray(a2,arr) == -1){
					arr.push(a2);
				}
			});
		}
		return arr.join('_');
		
	},	
	showMessage : function(msg,id){
		var tdiv;
		if(id == '1' || id == '2' || id == '3' || id=='4'){//此为箭头朝上提醒
			 tdiv = $('#helpMsgArea'+id);
		}else if(id == '5'){//此时为好友页面图片提示
			tdiv = $('body');
		}else if(id=='6' || id=='7' || id=='8'){//此为消息中心提醒，箭头朝左
			tdiv = '';
		}else{
			return '';
		}
	},
	getMsgHtml : function(msg,id){
		var html = '';
		var tdiv;
		if(typeof(msg)!='undefined' && typeof(id)!='undefined' && msg!=null && id != null && msg != '' && id != ''){
			if(id == '1' || id == '2' || id == '3' || id=='4'){//此为箭头朝上提醒,均为页面顶部提醒
				tdiv = $('#helpMsgArea'+id);
				if(typeof(tdiv) != 'undefined' && tdiv.length > 0){
					if(id=='4'){
						var left = -70;
						var top = 30;
						html += '<div class="tipsy tipsy-n" id="helpMegText'+id+'" style="position:absolute;top:'+top+'px; left:'+left+'px; width:210px;"><iframe frameborder="0" style="position:absolute;z-index:0;width:200px;height:82px;top:8px;left:6px;scrolling:no; background:transparent;" src="about:blank;"></iframe><div class="tipsy-inner msgText" style=" width:200px;padding:5px 5px 22px;line-height: 18px;">'+msg+'<span class="msgTextHandle"><a href="javascript:void(0);" onclick="showHelpMessage.deleteMessage(\''+id+'\',event)">知道了</a></span><div class="tipsy-arrow" style="top:-7px;"></div></div></div>'
						tdiv.css({'position':'relative','z-index':'999'}).append(html);
					}else{
						var left = tdiv.position().left + ((tdiv.width() - 220)/2 );
						var top = tdiv.position().top + tdiv.height() +3;
						html += '<div class="tipsy tipsy-n" id="helpMegText'+id+'" style="position:absolute;top:'+top+'px; left:'+left+'px; width:210px;"><div class="tipsy-inner msgText" style=" width:200px;padding:5px 5px 22px;line-height: 18px;">'+msg+'<span class="msgTextHandle"><a href="javascript:void(0);" onclick="showHelpMessage.deleteMessage(\''+id+'\',event)">知道了</a></span><div class="tipsy-arrow" style="top:-7px;"></div></div></div>'
						tdiv.after(html);
					}
				}
			}else if(id == '5'){//此时为好友页面图片提示
				$('#helpMsgArea4').live('click',function(event){
					tdiv = $('#chooseArea');
					var frmUser = $('#helpMsgArea4');//好友提示表示好友列表页
					if(tdiv.length > 0 && frmUser.length>0){
						var isie6 = $.browser.msie && ($.browser.version == "6.0") && !$.support.style;
						//var filter = isie6 ? 'background:url('+imagesPath+'/msgTransBg.png) repeat;' : 'background-color:#000;opacity: 0.5;filter:alpha(opacity=50);';
						var filter =  'background:url('+imagesPath+'/msgTransBg.png) repeat;';
						html += '<div class="friHelpMsg" id="helpMegText'+id+'" style="position: absolute;top:0px;left:0px; z-index: 99990;width:'+$(document).width()+'px;height:'+$(document).height()+'px;scrolling:no;">'
						+'<div class="" style="position: absolute; z-index: 99991;  width: 100%; height: 100%; top: 0px; left: 0px;'+filter+'">'
						//+ isie6 ? '' : '<iframe frameborder="0" id="" style="position: absolute; z-index: 99991; width: 100%; height: 100%; top: 0px; left: 0px;"></iframe>'
						+'</div>'
						+'<div class="" style="position:relative; width:810px; height:100%; z-index: 99992;"><img src="'+imagesPath+'/'+msg+'" title="好友分组信息设置操作提示" style="position:absolute; top:140px; left:0px;z-index:99993;" /><span class="friMsgHandle" title="知道了" onclick="showHelpMessage.deleteMessage('+id+',event)">&nbsp;</span></div>'
						+'</div>'
						$('body').append(html);
						if(isie6){
							$('#pageSizeSelect').attr('disabled','disabled');
						}
					}
				});				
			}else if(id=='6' || id=='7' || id=='8'){//此为消息中心提醒，箭头朝左
				tdiv = $('#helpMsgArea'+id);
				if(typeof(tdiv) != 'undefined' && tdiv.length > 0){
					var left = tdiv.position().left + tdiv.width();
					var top = tdiv.position().top + ((tdiv.height()-30)/2) -10;
					html += '<div class="tipsy tipsy-w" id="helpMegText'+id+'" style="position:absolute;top:'+top+'px; left:'+left+'px; width:210px;"><div class="tipsy-inner msgText" style=" width:200px;padding:5px 5px 22px;line-height: 18px;">'+msg+'<span class="msgTextHandle"><a href="javascript:void(0);" onclick="showHelpMessage.deleteMessage('+id+',event)">知道了</a></span><div class="tipsy-arrow" style="top:15px; left:-5px;"></div></div></div>';
					tdiv.after(html)
				}
			}else if(id=='9'){//此为我的首页邀请好友提醒
				tdiv = $('#announcement');
				var htmlStr = '<div id="helpMegText'+id+'" class="invite" onclick="return closeTopInviteTip('+id+',event)" style="cursor: pointer;"><p><strong id="temp_fix_1">您好</strong>:欢迎登录金桐网，您还可以<a href="javascript:void(0)" onclick="return closeTopInviteTip('+id+',event)">邀请更多朋友</a>加入金桐网！</p><span><a href="javascript:void(0)" onclick="showHelpMessage.deleteMessage('+id+',event)"></a></span></div>';
				tdiv.after(htmlStr);
				if(typeof(DD_belatedPNG)!="undefined")
					DD_belatedPNG.fix('#temp_fix_1');
				setTimeout('showHelpMessage.deleteMessage('+id+')',1000*60*3);
			}else{
				html += '';
			}
			if(html != ''){
				//$('body').append(html);
			}
			
		}
	},
	deleteMessage : function(id,event){
		if(event){
			Utils.stopBubble(event);
		}
		$.ajax({
			url : dataPath + '/message/help/delete.json',
			data :{
				type : id
			},
			type : 'POST',
			async : true,
			success : function(data){
				if(data.result == 'success'){
					//$('#helpMegText'+id).remove();
					$('#helpMegText'+id).slideUp('slow',function(){
						$('#helpMegText'+id).hide();
					});
					if(id=='5'){
						$('#pageSizeSelect').removeAttr('disabled');
						location.reload();
					}
				}else{
					if(id=='5'){
						//$('#helpMegText'+id).remove();
						$('#helpMegText'+id).slideUp('slow',function(){
							$('#helpMegText'+id).hide();
						});
					}
					$.alerts._showMessage('系统出现问题，请稍后重试','','','',2000);
				}
			},
			error : function(){
				if(id=='5'){
					//$('#helpMegText'+id).remove();
					$('#helpMegText'+id).slideUp('slow',function(){
						$('#helpMegText'+id).hide();
					});
				}
				$.alerts._showMessage('系统出现问题，请稍后重试','','','',2000);
			}
		})
	}
}
function closeTopInviteTip(id,event){
	Utils.stopBubble(event);
	if(id == '9'){
		$.ajax({
			url : dataPath + '/message/help/delete.json',
			data :{
				type : id
			},
			type : 'POST',
			async : true,
			success : function(data){
				if(data.result == 'success'){
					//$('#helpMegText'+id).remove();
					$('#helpMegText'+id).slideUp('slow',function(){
						$('#helpMegText'+id).hide();
					});
					window.location.href=contextPath+'/invite/';
				}else{
					window.location.href=contextPath+'/invite/';
				}
				return false;
			},
			error : function(){
				window.location.href=contextPath+'/invite/';
				return false;
			}
		});
	}
	return false;
}
*//**
 * 设置顶部选中状态
 * @param aid a链接的id
 *//*
function setTopHover(aid){
	var a = $("#"+aid);
	a.parent().parent().find("a.selected").removeClass("selected")
	a.addClass("selected")
}

*/