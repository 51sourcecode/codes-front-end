/*!
 * MultiUpload for xheditor
 * @requires xhEditor
 * 
 * @author Yanis.Wang<yanis.wang@gmail.com>
 * @site http://xheditor.com/
 * @licence LGPL(http://www.opensource.org/licenses/lgpl-license.php)
 * 
 * @Version: 0.9.2 (build 100505)
 */
define(function(require, exports, module){
	var $ = require("jquery");
	require("jAlert")($);
	var imports=require('import'),
	contextPath="",
	currentUser="",
	_cookid="";

	SWFUpload=require('swfupload');
var selected;
var MultiUpload;

if (MultiUpload == undefined) {
	MultiUpload = function(settings) {
		this.initMultiUpload(settings);
		selected = this;
	};
}
//imports.showDiv();
MultiUpload.prototype.initMultiUpload = function(settings) {
	this.swfu = {};
	this.selQueue = [];
	this.selectID = {};
	this.arrMsg = [];
	this.save = {};
	this.shangchuan = {};
	this.fatherDivId = {};
	this.allSize = 0;
	this.uploadSize = 0;
	this.fatherDiv = settings.fatherDiv;
	this.incId = settings.incId;
	this.moduleType = settings.moduleType;
	this.count = settings.count;
	this.taskId = settings.taskId;
	this.fileIdsName = settings.fileIdsName;
	this.type = settings.type;
	this.seat = settings.seat;
	this.frame = settings.frame;
	this.showFatherDivId =settings.showFatherDivId;
	this.buttonImageUrl=settings.buttonImageUrl;
	this.buttonWidth =settings.buttonWidth;
	this.buttonHeight =settings.buttonHeight;
	this.buttonText =settings.buttonText;
	this.buttonTextStyle =settings.buttonTextStyle;
	this.buttonTextLeftPadding =settings.buttonTextLeftPadding;
	this.buttonTextTopPadding =settings.buttonTextTopPadding;
	this.uploadurl = settings.uploadurl;
	this.getinfourl = settings.getinfourl;
	this.showErrorMethod = settings.showErrorMethod;
	this.showErrorMsgId = settings.showErrorMsgId;
}
MultiUpload.prototype.removeFile = function() {
	var file;
	if (!selectID)
		return;
	for ( var i in selQueue) {
		file = selQueue[i];
		if (file.id == selectID) {
			selQueue.splice(i, 1);
			allSize -= file.size;
			swfu.cancelUpload(file.id);
			$('#' + file.id).remove();
			selectID = null;
			break;
		}
	}
	$('#btnClear').hide();
	if (selQueue.length == 0)
		$('#controlBtns').hide();
}
MultiUpload.prototype.startUploadFiles = function(swfu) {

	if (swfu.getStats().files_queued > 0) {
		$('#controlBtns').hide();
		swfu.startUpload();
	} else
		MultiUpload.prototype.showErrorMsg(errorName);
}
MultiUpload.prototype.setFileState = function(fileid, txt) {
	$('#' + fileid + '_state').text(txt);
}
MultiUpload.prototype.cancelUpload =function(id){
		$('#' + id + '_fatherDiv').remove();
		selected.swfu.cancelUpload(id);
}
MultiUpload.prototype.fileQueued = function(file)// 队列添加成功
{
	if(this.customSettings.fileLimit<=this.customSettings.fileQueue.length){
		this.cancelUpload(file.id);
		MultiUpload.prototype.showErrorMsg('附件不得超过'+this.customSettings.fileLimit+'个！');
		return false;
	}
	for ( var i in this.customSettings.fileQueue)
		if (this.customSettings.fileQueue[i].name == file.name) {
			selected.swfu.cancelUpload(file.id);
			MultiUpload.prototype.showErrorMsg(file.name + '文件已经存在，请勿重复上传  或者修改文件名称之后再次尝试');
			return false;
		}// 防止同名文件重复添加
	var status=0;
	$('#'+selected.fatherDiv+' a').each(function(){
		if($(this).text()==file.name){
			selected.swfu.cancelUpload(file.id);
			status++;
			MultiUpload.prototype.showErrorMsg(file.name + "文件已经存在，请勿重复上传  或者修改文件名称之后再次尝试");
			return false;
		}
	});
	$('#'+selected.fatherDiv+' .js_name').each(function(){
		  if($(this).text()==file.name){
		   selected.swfu.cancelUpload(file.id);
		   status++;
		   MultiUpload.prototype.showErrorMsg(file.name + "文件已经存在，请勿重复上传  或者修改文件名称之后再次尝试");
		   return false;
		  }
	});
	if(status>0){
		return false;
	}
	if (typeof (countPlus) == 'function') { // 增加上传计数
		countPlus();
	}
	if (this.customSettings.fileQueue.length == 0)
		$('#controlBtns').show();
	this.customSettings.fileQueue.push(file);
	selected.allSize += file.size;
	if (typeof (imports.showDiv()) == 'function') {
		imports.showDiv(file,this.showFatherDivId);
	}
	if (typeof (updateNumber) == 'function') {
		updateNumber();
	}
	selected.swfu.startUpload();
}
// function showDiv(fatherDiv,file){
// $('<div id="'+file.id+'_fatherDiv" class="fj-list"><div
// class="fj-list-div"><a href="javascript:void(0);"
// id="'+file.id+'">'+file.name+'</a></div><div id="'+ file.id + '_div"
// class="waitUpload">待上传</div></div>').appendTo(fatherDiv);
//
// }
MultiUpload.prototype.fileQueueError = function(file, errorCode, message)// 队列添加失败
{
	var errorName = '';
	switch (errorCode) {
	case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
		errorName = "只能同时上传 " + this.settings.file_upload_limit + " 个文件";
		MultiUpload.prototype.showErrorMsg(errorName);
		break;
	case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
		errorName = "选择的文件【" + file.name + "】超过了当前大小限制："+ this.settings.file_size_limit;
		MultiUpload.prototype.showErrorMsg(errorName);
		break;
	case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
		errorName = "您选择的【"+file.name+"】文件没有内容,请重新上传";
		MultiUpload.prototype.showErrorMsg(errorName);
		break;
	case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
		errorName = "文件扩展名必需为：" + this.settings.file_types_description + " (" + this.settings.file_types + ")";
		MultiUpload.prototype.showErrorMsg(errorName);
		break;
	default:
		errorName = "未知错误，请稍后重试";
	MultiUpload.prototype.showErrorMsg(errorName);
		break;
	}
}
MultiUpload.prototype.uploadStart = function(file)// 单文件上传开始
{
	$('input[type="submit"]').attr('disabled','disabled');
	// setFileState(file.id, '上传中…');
	$('#' + file.id + '_div').text("");
	$('<div class="fj-jdt-div"><div class="jdt-div"></div></div><span id="' + file.id + '_span"></span>').appendTo($('#' + file.id + '_div'));
	var oc = $('#' + fatherDivId + 'save').attr("onClick");
	if (oc != '') {
		save = oc;
	}
	$('#' + fatherDivId + 'save').attr('onclick', '')	
}
MultiUpload.prototype.uploadProgress = function(file, bytesLoaded, bytesTotal)// 单文件上传进度
{
	var percent = Math.ceil((bytesLoaded) / file.size * 100);
	percent = (percent >100 ? 100 : percent);
	// var percent=Math.ceil((uploadSize+bytesLoaded)/allSize*100);
	$('#' + file.id + '_span').text(percent + '% ');
	// $('#progressBar div').css('width',percent+'px');
	$('#' + file.id + '_div div div').css('width', percent + '%');
	if(percent == 100){
		$('input[type="submit"]').removeAttr('disabled');
	}
}
MultiUpload.prototype.removeFileDiv = function(fileId, fileName, id,obj,fatherDivId1) {
	$('#' + fileId + '_fatherDiv').remove();
	for ( var i in obj.customSettings.fileQueue) {
		if (obj.customSettings.fileQueue[i].name == fileName) {
			obj.cancelUpload(fileId);
			obj.customSettings.fileQueue.splice(i, 1);
			break;
		}// 防止同名文件重复添加
	}
	$.ajax({
		url : dataPath + '/attachment/delete.json',
		data : 'fileId=' + id,
		dataType : 'json',
		cache : false,
		async : false,
		type : 'POST',
		success : function(data) {
			var fileIdsDiv = $('#'+fatherDivId1).find('input[name^=fileIds]');
			var fileIds = fileIdsDiv.val();
			fileIds = fileIds.replace(id + ',', '');
			fileIdsDiv.val(fileIds);
			Utils.resetPopupWrap();
		}
	});
//	var height = parseInt($("#" + fatherDivId).css('height'));
//	$("#" + fatherDivId).css('height', (height + 25) + 'px');
//	var mheight = parseInt($("#cr_middle").css('height'));
//	$("#cr_middle").css('height', (mheight - 25) + 'px');
	if (typeof (updateNumber) == 'function') {
		updateNumber();
	}
	if (typeof (imports.getTotalSize) == 'function') {
		imports.getTotalSize();
	}
}

MultiUpload.prototype.uploadSuccess = function(file, serverData)// 单文件上传成功
{
	for ( var i in this.customSettings.fileQueue) {
		if (this.customSettings.fileQueue[i].name == file.name) {
			this.customSettings.fileQueue[i].filestatus = -4;
			break;
		}
	}
	var data ;
	try{
		data = eval(serverData);
	}catch(e){
		data = eval("("+serverData+")");
	}
	var fatherId = selected.fatherDiv;
	var fileIdsDiv = $('#'+fatherId).find("input[name='"+selected.fileIdsName+"']");
	var fileIds = fileIdsDiv.val();
	fileIds += data.id + ',';
	fileIdsDiv.val(fileIds);
	$('#' + file.id + '_div').empty();
	$('<a href="javascript:void(0);">删除</a>').bind('click',{
				'file' : file,
				'id' : data.id,
				'obj':this
			},function(event) {
				MultiUpload.prototype.removeFileDiv(event.data.file.id,event.data.file.name, event.data.id,event.data.obj,fatherId);
			}).appendTo($('#' + file.id + '_div'));
	$('#' + file.id).click(function() {
		downloadFile('' + data.id);
	});
	$('#'+file.id+'_fatherDiv').attr('fid',data.id); 
	
	for ( var i in this.customSettings.fileQueue) {
		if (this.customSettings.fileQueue[i].filestatus == -1) {
			this.startUpload();
			break;
		}
	}
	if (typeof (countMinus) == 'function') { // 增加上传计数
		countMinus();
	}
}
MultiUpload.prototype.removeAllFile = function() {
	var file;
	for ( var i in this.selQueue) {
		file = selQueue[i];
		selQueue.splice(i, 1);
		allSize -= file.size;
		swfu.cancelUpload(file.id);
	}
}

MultiUpload.prototype.uploadError = function(file, errorCode, message)// 单文件上传错误
{
	MultiUpload.prototype.setFileState(file.id, '上传失败！');
}
MultiUpload.prototype.uploadComplete = function(file)// 文件上传周期结束
{
	if (swfu.getStats().files_queued > 0)
		swfu.uploadStart();
	else
		uploadAllComplete();
}
MultiUpload.prototype.uploadAllComplete = function()// 全部文件上传成功
{
	$('#' + fatherDivId + 'save').attr('onclick', save);
}
formatBytes = function(bytes) {
	var s = [ 'Byte', 'KB', 'MB', 'GB', 'TB', 'PB' ];
	var e = Math.floor(Math.log(bytes) / Math.log(1024));
	return (bytes / Math.pow(1024, Math.floor(e))).toFixed(2) + " " + s[e];
}
/**
 * 附件上传初始化方法，需求要$(document).ready(function() {})中调用
 * 
 * @param fatherDiv
 *            附件上传显示在JSP中的Div的id
 * @param incId
 *            公司Id， 没有公司Id时输入0
 * @param moduleType
 *            模块类型Id 0:需求、1：业务需求、2：客户、3：项目、4：会员、5：名片、6:公司名片、7：公司资讯
 * @param count
 *            允许上传的附件数量
 * @param taskId
 *            文件组Id，用于与相应记录关联的字段
 * @param type
 *            上传文件在服务器保存的位置
 * @param seat
 *            附件列表显示的位置 数据：'after'：在附件上传按钮后边显示；'before'：在附件上传按钮前边显示
 * @param frame
 *            附件列表初始化框架
 */
MultiUpload.prototype.pageInit = function() {
	var self = this;
	if(typeof(this.buttonImageUrl)=='undefined'){
		this.buttonImageUrl = imagesPath + '/demand_browse.png';
	}
	if(typeof(this.buttonWidth)=='undefined'){
		this.buttonWidth =81;
	}
	if(typeof(this.buttonHeight)=='undefined'){
		this.buttonHeight =24;
	}
	if(typeof(this.buttonText)=='undefined'){
		this.buttonText ='';
	}
	if(typeof(this.buttonTextStyle)=='undefined'){
		this.buttonTextStyle ='';
	}
	if(typeof(this.buttonTextLeftPadding)=='undefined'){
		this.buttonTextLeftPadding =20;
	}
	if(typeof(this.buttonTextTopPadding)=='undefined'){
		this.buttonTextTopPadding =0;
	}
	if(typeof(this.uploadurl)=='undefined'){
		this.uploadurl = nginxRoot + '/web/upload';
	}
	if(typeof(this.getinfourl)=='undefined'){
		this.getinfourl = dataPath + '/inc/' + this.incId + '/attachment/'+ this.moduleType + '/list.json';
	}
	var ext, size;
	$.ajax({
		url : self.getinfourl,
		dataType : 'json',
		type : 'GET',
		cache : false,
		async : false,
		success : function(data) {
			var attachment = data.attachmentSetting;
			ext = attachment.fromat;
			size = attachment.size;
		}
	});
	this.ext = ext;
	this.size = size;
	this.removeAllFile();
	// var f = new Object();
	// f.name='DClient.exe';
	// selQueue.push(f);
	this.initDiv(this.fatherDiv, ext, size, this.seat, this.frame,this.fileIdsName);
	var uploadurl,useget = 0, params = {}// 默认值

//	var uploadurl = dataPath + '/attachment/upload', useget = 0, params = {}// 默认值
	// uploadurl = this.getQuery('uploadurl') || uploadurl;
	// ext = getQuery('ext') || ext;
	// size = getQuery('size') || size;
	// count = getQuery('count') || this.count;
	// useget = getQuery('useget') || useget;
	// var tmpParams = getQuery('params');
	// if (tmpParams) {
	// try {
	// eval("tmpParams=" + tmpParams);
	// } catch (ex) {
	// }
	// ;
	// params = $.extend({}, params, tmpParams);
	// }
	// ext = ext.match(/([^\(]+?)\s*\(\s*([^\)]+?)\s*\)/i);
	// setTimeout(fixHeight, 10);
	this.swfu = new SWFUpload({
		// Flash组件
		flash_url : contextPath + "/resources/js/swfupload/swfupload.swf",
		prevent_swf_caching : false,// 是否缓存SWF文件

		// 服务器端
		upload_url : this.uploadurl,
		file_post_name : "filedata",
		post_params : {
			'type' : this.type,
			'taskId' : $('#' + this.taskId).val(),
			'moduleType' : this.moduleType,
			'uid' : currentUser.id,
			'sid' : _cookid,
			'sessionId' : _cookid
		},// 随文件上传一同向上传接收程序提交的Post数据
		use_query_string : false,// 是否用GET方式发送参数

		// 文件设置
		file_types : ext,// 文件格式限制
		file_size_limit : this.size + ' MB', // 文件大小限制
		file_upload_limit : 0,// 上传文件总数
		file_queue_limit : 0,// 上传队列总数
		custom_settings : {
			show_file_id :'swf_show_file_id_'+this.showFatherDivId,
			fileQueue:[],
			fileLimit:this.count
		},
		showFatherDivId:this.showFatherDivId,

		// 事件处理
		file_queued_handler : MultiUpload.prototype.fileQueued,// 添加成功
		file_queue_error_handler : this.fileQueueError,// 添加失败
		upload_start_handler : this.uploadStart,// 上传开始
		upload_progress_handler : this.uploadProgress,// 上传进度
		upload_error_handler : this.uploadError,// 上传失败
		upload_success_handler : this.uploadSuccess,// 上传成功
		// upload_complete_handler : this.uploadComplete,//上传结束

		// 按钮设置
		button_placeholder_id : "divAddFiles",
		button_width : this.buttonWidth,
		button_height : this.buttonHeight,
		button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
		button_cursor : SWFUpload.CURSOR.HAND,
		button_image_url : this.buttonImageUrl,
		button_text : this.buttonText,
		button_text_style : this.buttonTextStyle,
		button_text_left_padding : this.buttonTextLeftPadding,
		button_text_top_padding : this.buttonTextTopPadding,

		// 调试设置
		debug : false
	});
	this.swfu.upload_complete_handler = this.uploadComplete;
	this.shangchuan.bind('click', {
		'suf' : this.startUploadFiles,
		'swfu' : this.swfu
	}, function(event) {
		event.data.suf(event.data.swfu);
	});
}
MultiUpload.prototype.fixHeight = function() {
	$('#listArea').css('height', (document.body.clientHeight - 56) + 'px');
}
MultiUpload.prototype.getQuery = function(item) {
	var svalue = location.search.match(new RegExp('[\?\&]' + item
			+ '=([^\&]*)(\&?)', 'i'));
	return svalue ? decodeURIComponent(svalue[1]) : '';
}
/**
 * 初始化附件上传按钮以及列表框架
 * 
 * @param fatherDiv
 * @param ext
 * @param size
 * @param seat
 * @param frame
 */
MultiUpload.prototype.initDiv = function(fatherDiv, ext, size, seat, frame,fileIdsName) {
	var fd = $('#' + fatherDiv)
	var ext0 = (typeof(ext) == 'undefined' ? '' : ext.replace(/\*\./g,""));
	if(ext0.charAt(0) ==';'){
		ext0 = ext0.substring(1);
	}
	if(ext0.charAt(ext0.length-1) ==';'){
		ext0 = ext0.substring(0,ext0.length-1);
	}
	fd.empty();
	fatherDivId = fatherDiv;
	var fi = $('input[name='+fileIdsName+']');
	if(typeof(fileIdsName) == 'undefined'){
		fileIdsName = 'fileIds';
	}
	if(fi.size()==0){
		$('<input type="text" value="" name="'+fileIdsName+'" id="' + fatherDivId + '_fileIds" style="display:none;"/>').appendTo(fd);
	}
	
	if (seat == 'before') {
		$(frame).appendTo(fd);
	}
	var buttonArea = $('<div id="" class="attachmentButtonArea fj1"></div>').appendTo(fd);
	$('<span class="fj-span"><div id="divAddFiles" class="divAddFiles"></div></span>&nbsp;').appendTo(buttonArea);
	this.shangchuan = $('<input type="button" id="' + fatherDiv + '_shangchuan"  class="cr-shangchuan"  />');//.appendTo(buttonArea);
	$('<div class="fj2"><div id="attachmentErrorMSG" class="attachmentErrorMSG" style="display:none;color:red;"></div><div class="fileTypeInfo" id="showFileTypeL">附件大小不超过' + size + ' MB，支持<a href="javascript:void(0)" onclick="MultiUpload.prototype.showFileType(this);">这些格式</a>文件。</div><div class="fileTypeInfo" style="display:none" id="sShowFileType">附件大小不超过' + size + ' MB，支持'+ ext0 +'文件。</div></div>').appendTo(fd);
	if (seat == 'after') {
		$(frame).appendTo(fd);
	}
	if (typeof (imports.initSuccessUploadFile) == "function" && this.fatherDiv != 'letterAttListArea') {
		imports.initSuccessUploadFile(this.showFatherDivId,this.taskId);
	}

}
MultiUpload.prototype.showFileType = function(obj){
	$(obj.parentNode.parentNode).find('#sShowFileType').show();
	$(obj.parentNode.parentNode).find('#showFileTypeL').hide();
}

/**
 * 显示错误信息，两种方法
 * 默认是弹出框显示消息，2s消失； 如果指定显示消息的方法为page，则必须指定显示消息的id，3s钟消失
 */
MultiUpload.prototype.showErrorMsg = function(msg,callback){
	var method = selected.showErrorMethod;
	if(method){
		var msgid = selected.showErrorMsgId;
		var tdiv = $('#'+msgid);
		if(method == 'page'){
			if(msgid && tdiv){
				Utils.showSecondMsg(msg,msgid,3000);
			}
		}
	}else{
		$.alerts._showMessage(msg, '','','', 2000);
	}
}


//file queue ready

MultiUpload.prototype.fileQueued = function(file){// 队列添加成功
	if(this.customSettings.fileLimit<=this.customSettings.fileQueue.length){
		this.cancelUpload(file.id);
		jAlert("附件不得超过"+this.customSettings.fileLimit+"个！", "提示");
		return false;
	}
	for ( var i in this.customSettings.fileQueue)
		if (this.customSettings.fileQueue[i].name == file.name) {
			selected.swfu.cancelUpload(file.id);
			jAlert(file.name + "文件已经存在，请勿重复上传  或者修改文件名称之后再次尝试", "提示");
			return false;
		}// 防止同名文件重复添加
	var status=0;
	$('#'+selected.fatherDiv+' a').each(function(){
		if($(this).text()==file.name){
			selected.swfu.cancelUpload(file.id);
			status++;
			jAlert(file.name + "文件已经存在，请勿重复上传  或者修改文件名称之后再次尝试", "提示");
			return false;
		}
	});
	$('#'+selected.fatherDiv+' .js_name').each(function(){
		  if($(this).text()==file.name){
		   selected.swfu.cancelUpload(file.id);
		   status++;
		   jAlert(file.name + "文件已经存在，请勿重复上传  或者修改文件名称之后再次尝试", "提示");
		   return false;
		  }
	});
	if(status>0){
		return false;
	}
	if (this.customSettings.fileQueue.length == 0)
		$('#controlBtns').show();
	this.customSettings.fileQueue.push(file);
	selected.allSize += file.size;
	if (typeof (imports.showDiv) == 'function') {
		imports.showDiv(file,this.showFatherDivId);
	}
	if (typeof (updateNumber) == 'function') {
		updateNumber();
	}
	$('#attUploadSubmit').attr({'disabled':'disabled'}).parent().addClass('disabled').show();
	selected.swfu.startUpload();
	imports.getTotalSize();
	$('#deleteFiles').removeAttr('disabled').parent().removeClass('disabled');
	$('#attUploadSubmit').removeAttr('disabled').parent().removeClass('disabled').show();
}

MultiUpload.prototype.uploadStart = function(file){// 单文件上传开始

	$('#attUploadSubmit').attr({'disabled':'disabled'}).parent().addClass('disabled').show();
	// setFileState(file.id, '上传中…');
	$('#' + file.id + '_div').text("");
	$('<div class="fj-jdt-div mt20" ><div class="jdt-div"></div></div><span id="' + file.id + '_span"></span>').appendTo($('#' + file.id + '_div'));
	var oc = $('#' + fatherDivId + 'save').attr("onClick");
	if (oc != '') {
		save = oc;
	}
	$('#' + fatherDivId + 'save').attr('onclick', '');
}
MultiUpload.prototype.uploadSuccess = function(file, serverData){// 单文件上传成功
	for ( var i in this.customSettings.fileQueue) {
		if (this.customSettings.fileQueue[i].name == file.name) {
			this.customSettings.fileQueue[i].filestatus = -4;
			break;
		}
	}
	var data = eval(serverData);
	var fatherId = selected.fatherDiv;
	var fileIdsDiv = $('#'+fatherId).find('input[name^=fileIds]');
	var fileIds = fileIdsDiv.val();
	fileIds += data + ',';
	fileIdsDiv.val(fileIds);
	$('#' + file.id + '_div').empty();
	$('<a href="javascript:void(0);">删除</a>').bind('click',{
				'file' : file,
				'id' : data,
				'obj':this
			},function(event) {
				MultiUpload.prototype.removeFileDiv(event.data.file.id,event.data.file.name, event.data.id,event.data.obj,fatherId);
			}).appendTo($('#' + file.id + '_div'));
	$('#' + file.id).click(function() {
		downloadFile('' + data);
	});
	$('#'+file.id+'_fatherDiv').attr('fid',data); 
	
	for ( var i in this.customSettings.fileQueue) {
		if (this.customSettings.fileQueue[i].filestatus == -1) {
			this.startUpload();
			break; 
		}
	}
	$('#attUploadSubmit').attr('value','导入').removeAttr('disabled').parent().removeClass('disabled').show();
}
/**
 * 时间格式化方法
 */
Date.prototype.format = function(format) {
	/*
	 * eg:format="yyyy-MM-dd hh:mm:ss";
	 */
	var o = {
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds()
	// millisecond
	}

	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}

	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}
return MultiUpload;
})