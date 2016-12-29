$(function(){
	//大标题换背景色
	$('.navTitle').mouseenter(function(){
		var o = $(this);
		var i = o.find('span.icons');
		if(!o.hasClass('currentTitle')){
			//o.find('.knowTitle1').addClass('hover');
			if(i.hasClass('iconHome')) i.addClass('iconHomeHover');
			if(i.hasClass('iconBook')) i.addClass('iconBookHover');
			if(i.hasClass('iconDelete')) i.addClass('iconDeleteHover');
			if(i.hasClass('iconPort')) i.addClass('iconPortHover');
			if(i.hasClass('iconCollect')) i.addClass('iconCollectHover');
			if(i.hasClass('sharMeIcon')) i.addClass('sharMeIconHover');
			if(i.hasClass('myShareIcon')) i.addClass('myShareIconHover');
		}
	}).mouseleave(function(){
		var o = $(this);
		var i = o.find('span.icons');
		if(!o.hasClass('currentTitle')){
			//o.find('.knowTitle1').removeClass('hover');
			if(i.hasClass('iconHome')) i.removeClass('iconHomeHover');
			if(i.hasClass('iconBook')) i.removeClass('iconBookHover');
			if(i.hasClass('iconDelete')) i.removeClass('iconDeleteHover');
			if(i.hasClass('iconPort')) i.removeClass('iconPortHover');
			if(i.hasClass('iconCollect')) i.removeClass('iconCollectHover');
			if(i.hasClass('sharMeIcon')) i.removeClass('sharMeIconHover');
			if(i.hasClass('myShareIcon')) i.removeClass('myShareIconHover');
		}
	});
	
	//展开、关闭我的知识目录
	$('#handleOpen').live('click',function(){
		var t = $(this);
		var dls = $('#groupsList dl.knowGroup');
		if(t.text() == '展开'){
			$.each(dls,function(i,o){
				var dds = $(o).find('dd');
				if(dds.length > 0){
					dds.show();
					$(o).find('.iconOpen').removeClass('iconOpen').addClass('iconClose');
				}
			});
			$('#groupsList').show();
			t.text('关闭');
		}else if(t.text() == '关闭'){
			$.each(dls,function(i,o){
				var dds = $(o).find('dd');
				if(dds.length > 0){
					dds.hide();
					$(o).find('.iconClose').removeClass('iconClose').addClass('iconOpen');
				}
			});
			$('#groupsList').hide();
			t.text('展开');
		}
//		if($('.groupList .iconClose').length == $('.groupList .knowGroup').length){//分组全部展开状态，文字换成关闭
//			$('#handleOpen').text('关闭');
//		}
	});
	$('#groupName').live('keyup',function(moz_ev){
		var ev = null;
        if (window.event){
            ev = window.event;
        }else{
            ev = moz_ev;
        }
        if (ev != null && ev.keyCode == 13)
        {
        	$('#addGroupOk:visible').click();
        }
	});
	//切换展开、关闭二级菜单
	$('.groupList dt .icons,.groupList .subTitle1').live('click',function(){
		var dl = $(this).parent().parent();
		var icons = dl.find('dt .icons');
		if(dl.find('dd').length > 0){
			if(icons.hasClass('iconOpen')){
				dl.find('dd').show();
				icons.removeClass('iconOpen').addClass('iconClose');
			}else{
				dl.find('dd').hide();
				icons.removeClass('iconClose').addClass('iconOpen');
			}
		}
	});
	
	//大标题只显示新增一级目录
	$('.navTitle[item="groupsTitle"]').live('mouseenter',function(){
		var o = $(this).find('.knowTitle1');
		var l = o.offset().left + o.width()+2+'px';
		var t = o.offset().top+1 + 'px';
		var s = 'style="left:'+l+';top:'+t+'"';
		var h = '<div class="groupTools clearfix" '+s+'><span class="icons"><span class="iconSmall sAdd" title="新增目录"></span></span></div>';
		$(this).append(h);
	}).live('mouseleave',function(){
		$('.groupTools').remove();
	});
	
	//一级菜单显示修改、删除和新增
	$('.knowGroup dt').live('mouseenter',function(){
		var o = $(this).find('.subTitle1');
		var l = o.position().left + o.width()+15+'px';
		var t = o.position().top - 2 + 'px';
		var s = 'style="left:'+l+';top:'+t+'"';
		var h='<div class="groupTools clearfix"><span class="icons"><span class="iconSmall sEdit" title="修改此目录"></span></span><span class="icons"><span class="iconSmall sDelete" title="删除此目录"></span></span><span class="icons"><span class="iconSmall sAdd" title="新建子目录"></span></span></div>';
		$(this).append(h);
	}).live('mouseleave',function(){
		$('.groupTools').remove();
	});
	
	//二级菜单只显示删除
	$('.knowGroup dd').live('mouseenter',function(){
		var o = $(this).find('.subTitle2');
		var l = o.position().left + o.width()+15+'px';
		var t = o.position().top - 2 + 'px';
		var s = 'style="left:'+l+';top:'+t+'"';
		var h='<div class="groupTools clearfix"><span class="icons"><span class="iconSmall sEdit" title="修改此目录"></span></span><span class="icons"><span class="iconSmall sDelete" title="删除此目录"></span></span></div>';
		$(this).append(h);
	}).live('mouseleave',function(){
		$('.groupTools').remove();
	});
	
	//新增栏目
	$('.sAdd').live('click',function(){
		var o = $(this);
		var p = $('.groupTools').parent();
		var groupid = p.attr('groupid');
		var sortid = p.attr('sortid');
		var h = '<div class="popEditGroup clearfix"><p clearfix="clearfix"><label class="">请输入目录名称：</label></p><p><input class="inputText" id="groupName"/></p><p id="categroyMessage" class="categroyMessage clearfix"><span class="redText"></span></p><div class="popEditHandle clearfix"><span class="fr"><a href="javascript:void(0);" class="alertCancelBtn">取消</a><a href="javascript:void(0);" class="alertBtn" id="addGroupOk" onclick="categoryAdd(\''+groupid+'\',\''+sortid+'\')">确定</a></span></div></div>'
		jHtml(h,'创建目录','360','');
	});
	
	//修改栏目
	$('.sEdit').live('click',function(){
		var o = $(this);
		var p = $('.groupTools').parent();
		var groupid = p.attr('groupid');
		var sortid = p.attr('sortid');
		var gname = p.find('.groupTitle').text();
		var h = '<div class="popEditGroup clearfix"><p clearfix="clearfix"><label class="">请输入目录名称：</label></p><p><input class="inputText" id="groupName" value="'+gname+'" /></p><p id="categroyMessage" class="categroyMessage clearfix"><span class="redText"></span></p><div class="popEditHandle clearfix"><span class="fr"><a href="javascript:void(0);" class="alertCancelBtn">取消</a><a href="javascript:void(0);" class="alertBtn" id="addGroupOk" onclick="categoryEdit(\''+groupid+'\',\''+gname+'\')">确定</a></span></div></div>'
		jHtml(h,'修改目录','360','');
	});
	
	//取消新增或修改目录
	$('.popEditGroup .alertCancelBtn').live('click',function(){
		$.alerts._hide();
	});
	
	//删除菜单
	$('.sDelete').live('click',function(){
		var o = $(this);
		var gid = $('.groupTools').eq(0).parent().attr('groupid');
		//jConfirmTip('tipsArea','提示：','确定删除此目录吗','',function(re){
		jConfirm('确定删除此目录吗','提示：',function(re){
			if(re){
					$.ajax({
						url : knowledgePath + '/category/delete.json',
						data : {
							id : gid
						},
						cache:false,
						async : false,
						success : function(data){
							if(data.result == 'success'){
								//$.alerts._hideTip('tipsArea',1000);
								if(gid != currentGourpid){
									window.location.reload();
								}else{
									var href0 = window.location.toString();
									var paras = window.location.search;
									var newhref = href0.substr(0,href0.length-paras.length);
									location.href = newhref;									
								}
							}else if(data.result == 'articleNotNull'){
								jAlert('此目录下有文章，暂时无法删除','提示：');
								return;
							}else if(data.result == 'childNotNull'){
								jAlert('此目录下还有子目录，暂时无法删除','提示：');
								return;
							}else{
								$.alerts._hideTip('tipsArea',1000);
								knowListTools.doSearch();
							}
							
						},
						error : function(){
							$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
						}			
					});
				}
		});
	});
	
	//把文章放入回收站
	$('.removeArticles').click(function(){
		var ids = getArtIds();
		if(ids == ''){
			jAlertTip('tipsArea','提示：','请先选择文章',2000);
			return;
		}else{			
			jConfirmTip('tipsArea','提示：','确定要放入回收站吗？','',function(re){
				if(re){
					$.ajax({
						url : knowledgePath + '/article/remove.json',
						async:false,
						data : {
							'ids' : ids
						},
						success : function(data){
							if(data.result == 'success'){
								$.alerts._hideTip('tipsArea',1000);
								//刷新回收站文章列表
								searchknowListTools.doSearch();						
							}
						},
						error : function(){
							$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
						}	
					});
				}				
			});
		}
	});
	
	//彻底删除文章
	$('.deleteArticles').click(function(){
		var ids = getArtIds();
		if(ids == ''){
			jAlertTip('tipsArea','提示：','请先选择文章',2000);
			return;
		}else{			
			jConfirmTip('tipsArea','提示：','删除文章将永久无法恢复，确定删除文章吗','',function(re){
				if(re){
					$.ajax({
						url : knowledgePath + '/article/delete.json',
						async:false,
						data : {
							'ids' : ids
						},
						success : function(data){
							if(data.result == 'success'){
								$.alerts._hideTip('tipsArea',1000);
								//刷新回收站文章列表
								knowListTools.doSearch();							
							}
						},
						error : function(){
							$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
						}	
					})
				}				
			});
		}
	});
	
	//清空回收站
	$('.cleanRecycleBin').click(function(){
		var aa = $(this);
		var pp = $(this).parent().parent();
		if($('ul.listContent').length == 0){
			jAlertTip('tipsArea','提示：','回收站里没有任何文章',2000);
			return;
		}
			jConfirmTip('tipsArea','提示：','确定清空回收站吗','',function(re){
				if(re){
					$.ajax({
						url : knowledgePath + '/article/cleanrecycle.json',
						async:false,
						cache:false,
						data : {
							
						},
						success : function(data){
							if(data.result == 'success'){
								if(pp.hasClass('knowButtons')){
									$.alerts._hideTip('tipsArea',1000);
									//刷新回收站文章列表
									knowListTools.doSearch();
								}
							}
						},
						error : function(){
							$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
						}	
					});
				}
			});
	});
	//左侧清空回收站
	$('.leftCleanRecycleBin').click(function(){
		var aa = $(this);
		var pp = $(this).parent().parent();
		jConfirm('回收站的文章清空后将永久无法恢复，确定清空回收站吗?','提示：',function(re){
				if(re){
					$.ajax({
						url : knowledgePath + '/article/cleanrecycle.json',
						async:false,
						cache:false,
						data : {
							
						},
						success : function(data){
							if(data.result == 'success'){
									//jAlert('tipsArea','提示：','回收站清空成功!');
									window.location.href=knowledgePath + "/article/recycle/";
							}else{
								$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
							}
						},
						error : function(){
							$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
						}	
					});
				}
			});
	});
	
	//批量恢复文章
	$('.recoverArticles').click(function(){
		var ids = getSelectedIds();
		if(ids == ''){
			jAlertTip('tipsArea','提示：','请先选择文章',2000);
			return;
		}else{
			jConfirmTip('tipsArea','提示：','确认恢复所选文章吗','',function(re){
				if(re){
					$.ajax({
						url : knowledgePath + '/article/recover.json',
						data : {
							'ids' : ids
						},
						success:function(data){
							if(data.result == 'success'){
								$.alerts._hideTip('tipsArea',1000);
								//刷新回收站列表
								knowListTools.doSearch();
							}else{
								$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
							}
						},
						error : function(){
							$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
						}	
					});
				}
			});	
		}
	});
	
	//批量加精
	$('.updateEssence').click(function(){
		var ids = getArtIds();
		if(ids == ''){
			jAlertTip('tipsArea','提示：','请先选择文章',2000);
			return;
		}else{			
			jConfirmTip('tipsArea','提示：','确认将所选文章加精吗','',function(re){
				if(re){
					$.ajax({
						url : knowledgePath + '/article/updateEssence.json',
						async:false,
						cache:false,
						data : {
							'ids' : ids
						},
						success : function(data){
							if(data.result == 'success'){
								$.alerts._hideTip('tipsArea',1000);
								//刷新回收站文章列表
								searchknowListTools.doSearch();
							}else{
								$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
							}
						},
						error : function(){
							$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
						}	
					})
				}				
			});
		}
	});
	
	//批量取消加精
	$('.cancelEssence').click(function(){
		var ids = getArtIds();
		if(ids == ''){
			jAlertTip('tipsArea','提示：','请先选择文章',2000);
			return;
		}else{			
			jConfirmTip('tipsArea','提示：','确认将所选文章取消加精吗','',function(re){
				if(re){
					$.ajax({
						url : knowledgePath + '/article/cancelEssence.json',
						async:false,
						data : {
							'ids' : ids
						},
						success : function(data){
							if(data.result == 'success'){
								$.alerts._hideTip('tipsArea',1000);
								//刷新回收站文章列表
								searchknowListTools.doSearch();
							}else{
								$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
							}
						},
						error : function(){
							$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
						}	
					});
				}				
			});
		}
	});
	
	//按钮区域，显示下拉菜单
	$('.knowButtons .button').mouseenter(function(){
		var o = $(this);
		var otype = o.attr('item');
		var olist = $('.buttonsListMenus .buttonList[item="'+otype+'"]');
		$('.buttonList').hide();
		if(olist.length > 0){
			$('.buttonsListMenus').show();
			olist.show();
			var l = o.offset().left;
			var t = o.offset().top + o.height();
			olist.css({'left':l+'px','top':t+'px'}).show();
		}
	});
	//隐藏按钮区域下拉列表菜单
	$('.buttonsListMenus').mouseleave(function(){
		$('.buttonsListMenus').hide();
		$('.buttonList').hide();
	});
	
	//文章列表筛选
	$('.buttonList .menu').mouseenter(function(){
		if(!$(this).hasClass('current'))
		$(this).addClass('hover');
	}).mouseleave(function(){
		if(!$(this).hasClass('current'))
		$(this).removeClass('hover');
	}).click(function(){
		var o = $(this);
		var con = o.attr('con');
		var value = o.attr('value');
		if(typeof(con) != 'undefined' && typeof(value) != 'undefined'){//有值时才刷新列表
			if(!o.hasClass('current')){
				o.parent().parent().find('.menu').removeClass('current').removeClass('hover');
				o.addClass('current hover').attr({'value':'1'});
				searchknowListTools.doSearch();
			}else{
				o.removeClass('current').removeClass('hover').attr({'value':'0'});
			}
		}
	});
	
	//点击目录筛选文章
//	$('.groupTitle').live('click',function(){
//		var o = $(this);
//		if(!o.hasClass('hover')){
//			$('.groupTitle').removeClass('hover');
//			o.addClass('hover');
//			knowListTools.doSearch();
//		}else{
//			o.removeClass('hover');
//			knowListTools.doSearch();
//		}
//	});
	
});
//显示目录列表
function showKnowGroups(){
	$.ajax({
		url : knowledgePath + '/category/list.json',
		async:false,
		cache:false,
		dataType : 'json',
		success : function(data){
			var str = '';
			var groups = data.groups;
			$.each(groups,function(i,o){
				var iconstate = (o.list.length > 0 ? 'iconOpen' : 'iconClose');
				var dl;
				if(o.state=='2'){
					dl = $('<dl class="clearfix pl10" glid="'+o.id+'"><dt groupid="'+o.id+'" sortid="'+o.sortId+'" level="1"><span class="icons '+iconstate+'"></span><span onclick="window.location.href=\''+knowledgePath+'/article/articlelist/?groupid='+o.id+'\'" class="groupTitle subTitle1" groupid="'+o.id+'">'+o.name+'</span></dt></dl>').appendTo($('#groupsList'));
				}else{
					dl = $('<dl class="knowGroup clearfix" glid="'+o.id+'"><dt groupid="'+o.id+'" sortid="'+o.sortId+'" level="1"><span class="icons '+iconstate+'"></span><span onclick="window.location.href=\''+knowledgePath+'/article/articlelist/?groupid='+o.id+'\'" class="groupTitle subTitle1" groupid="'+o.id+'">'+o.name+'</span></dt></dl>').appendTo($('#groupsList'));
				}
				if(currentGourpid == o.id){
					$('.groupTitle[groupid='+o.id +']').addClass('hover');
				}
				$.each(o.list,function(j,m){
					$('<dd style="display:none;" groupid="'+m.id+'" sortid="'+m.sortId+'" level="2"><span onclick="window.location.href=\''+knowledgePath+'/article/articlelist/?groupid='+m.id+'\'" class="groupTitle subTitle2" groupid="'+m.id+'">'+m.name+'</span></dd>').appendTo(dl);
					//显示选中状态
					if(typeof(currentGourpid )!="undefined" && currentGourpid  != '0'){
						var gn = $('.groupTitle[groupid='+currentGourpid +']');
						var pd = gn.parent();
						var level = pd.attr('level');
						gn.addClass('hover');
						//if(level == '2'){
						pd.parent().find('dd').show();
						pd.parent().find('span.icons').removeClass('iconOpen').addClass('iconClose');
						//}
					}
				});
			});
		},
		error : function(){
			$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
		}	
	});
	if($('.groupList .iconClose').length == $('.groupList .knowGroup').length){//分组全部展开状态，文字换成关闭
		$('#handleOpen').text('关闭');
	}
}

//编辑知识目录
function categoryEdit(groupId,groupName){
	var i = $('#groupName');
	var t = $.trim(i.val());
	var e = $('#categroyMessage .redText');
	if(t == ''){
		e.text('请输入目录名称').show();
		return;
	}else if(Utils.getCharLen2(t) > 16){
		e.text('您输入的字符超过限制（8个中文或16位字符内）').show();
		return;
	}else if(ifMatch(t)){
		e.text('目录名称不能包含下列任何字符\\ / : * ? " < > |').show();
		return;
	}else if(t != groupName){
		e.text('').hide();
		$.ajax({
			url : knowledgePath + '/category/update.json',
			async:false,
			type : 'POST',
			dataType : 'json',
			data : {
				'id' : groupId,
				'name' : t
			},
			success : function(data){
				if(data.result == 'success'){
					$('.groupTitle[groupid='+groupId+']').text(t);
					$.alerts._hide();
				}else{
					$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
				}
			},
			error : function(){
				$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
			}	
		});
		
	}else{
		$.alerts._hide();
	}
}
function ifMatch(str){
	var ifmat = false;
	var patternspecile = new RegExp("[/\//:*?\"<>|^\]");
	ifmat = patternspecile.test(str);
	if (ifmat){
		return ifmat;
	}else{
		var pattern = new RegExp(/[\\\/]/g);
		return pattern.test(str);
	}
}
//确定新增目录
function categoryAdd(groupId,sortId){
	var i = $('#groupName');
	var t = $.trim(i.val());
	var e = $('#categroyMessage .redText');
	if(t == ''){
		e.text('请输入目录名称').show();
		return;
	}else if(Utils.getCharLen2(t) > 16){
		e.text('您输入的字符超过限制（8个中文或16位字符内）').show();
		return;
	}else if(ifMatch(t)){
		e.text('目录名称不能包含下列任何字符\\ / : * ? " < > |').show();
		return;
	}else{
		e.text('').hide();
		$.ajax({
			url : knowledgePath + '/category/add.json',
			async:false,
			dataType : 'json',
			type : 'POST',
			data : {
				'id' : groupId,
				'sortId' : sortId,
				'name' : t
			},
			success : function(data){
				if(data.result == 'success'){
					var dt = $('.groupList dt[groupid='+groupId+']');
					var dl = dt.parent();
					if(dt.length>0){
						dl.append('<dd level="2" sortid="'+data.sortId+'" groupid="'+data.id+'"><span class="groupTitle subTitle2" groupid="'+data.id+'"  onclick="window.location.href=\''+knowledgePath+'/article/articlelist/?groupid='+data.id+'\'">'+t+'</span></dd>');
					}else{
						$('.groupList').append('<dl class="knowGroup clearfix"><dt level="1" sortid="'+data.sortId+'" groupid="'+data.id+'"><span class="icons iconClose"></span><span class="groupTitle subTitle1" groupid="'+data.id+'" onclick="window.location.href=\''+knowledgePath+'/article/articlelist/?groupid='+data.id+'\'">'+t+'</span></dt></dl>');
					}
					if(dt.parent().find('dd').length > 0){
						dt.find('.icons').removeClass('iconOpen').addClass('iconClose');
						dt.parent().find('dd').show();
					}
					$.alerts._hide();
				}else{
					$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
				}
				if($('select#knowGroup').length > 0 || $('select#importGroupid').length > 0 || $('select#portGroup').length > 0){
					location.reload();
				}
			},
			error : function(){
				$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
			}	
		});
		
	}
	if($('.groupList .iconClose').length == $('.groupList .knowGroup').length){//分组全部展开状态，文字换成关闭
		$('#handleOpen').text('关闭');
	}
}

function getSelectedIds(name){
	var ids = '';
	var n = 'artid';
	if(typeof(name) != 'undefined'){
		n = name;
	}
	var sc = $(':checkbox[name="'+n+'"][checked]');
	$.each(sc,function(i,o){
		ids += $(o).attr('value') + ','
	});
	if(ids != ''){
		ids = ids.substr(0,ids.length-1);
	}
	return ids;
	
}

//全选或取消全选
function checkAllKnow(obj,name){
	var n = 'artid';
	if(typeof(name) != 'undefined'){
		n = name;
	}
	$(':checkbox[name="'+n+'"]').attr('checked',obj.checked);
	if(obj.checked){
		$('.buttonList[item=check] .menu').eq(0).addClass('current hover');
	}else{
		$('.buttonList[item=check] .menu').eq(0).removeClass('current').removeClass('hover');
	}
}

function checkAllKnow(obj,name){
	$(':checkbox[name='+name+']').attr('checked',obj.checked);
}





//获得列表中已经选中的id的字符串
function getArtIds(){
	var checks = $(':checkbox[name="artid"][checked]');
	var ids = '';
	$.each(checks,function(i,o){
		ids += $(o).attr('value')+',';
	});
	if(ids != ''){
		ids = ids.substr(0,ids.length-1);
	}
	return ids;
}

//全选
function selectAll(name){
	$(':checkbox[name='+name+']').attr('checked','checked');
	$('#checkAllKnow').attr('checked','checked');
	$('.buttonList[item="check"] .menu').eq(0).addClass('current hover');
}
//反选
function deselectAll(name){
	var cc = $(':checkbox[name='+name+']');
	var ca = $('.buttonList[item="check"] .menu').eq(0);
	var ct = $('#checkAllKnow');
	if(ct.length == 0){
		ct = $('.checkAllKnow').eq(0);
	}
	$.each(cc,function(i,o){
		if(o.checked){
			$(o).removeAttr('checked');
		}else{
			$(o).attr('checked','checked');
		}
	});
	var ck = $(':checkbox[name='+name+'][checked]');
	if(ck.length == cc.length){//此种情况为全选
		ct.attr('checked','checked');
		ca.addClass('current hover');
		$('.buttonList[item="check"] .menu').eq(1).removeClass('current').removeClass('hover');
	}else{
		ct.removeAttr('checked');
		ca.removeClass('current').removeClass('hover');
	}
}

//remove single article
function deleteKnow(id){
	jConfirmTip('tipsArea','提示：','确定删除文章吗','',function(re){
		if(re){
			$.ajax({
				url : knowledgePath + '/article/delete.json',
				data : {
					ids : id
				},
				async : false,
				success : function(data){
					if(data.result == 'success'){
						$.alerts._hideTip('tipsArea',1000);
						//刷新回收站文章列表
						knowListTools.doSearch();
					}else{
						$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
					}
				},
				error : function(){
					$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
				}	
			});
		}
	});
}


//delete single article
function removeKnow(id){
	jConfirmTip('tipsArea','提示：',"确定要放入回收站吗？",'',function(re){
		if(re){
			$.ajax({
				url : knowledgePath + '/article/remove.json',
				data : {
					ids : id
				},
				async : false,
				success : function(data){
					if(data.result == 'success'){
						$.alerts._hideTip('tipsArea',1000);
						//刷新回收站文章列表
						knowListTools.doSearch();
					}else{
						$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
					}
				},
				error : function(){
					$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
				}	
			});
		}
	});
}
