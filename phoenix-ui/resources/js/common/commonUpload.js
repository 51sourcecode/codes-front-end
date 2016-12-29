/**
 * 2012-12-26 common upload init for all pages
 */

//统一初始化一个附件上传组件
/**
 * 
 * @param targetId 初始化附件的页面id
 * @param pageType 默认为add：新增页面、update：修改页面、detail：详情页面
 * @param incId 公司id
 * @param count 可上传的附件数
 * @param type 模块名称 如 people、customer、requirement等
 * @param 显示附件列表的id，默认为没有这个参数；如果参数为空，则根据目标元素的下的attachmentListArea来确定附件列表显示的位置
 * @param 列表上传附件的名称
 */
function commonUpload1(targetId,pageType,moduleType,incId,count,type,taskId,listAreaId,toolName,fileIdsName,seat,frame,getinfourl,showErrorMethod,showErrorMsgId){
	//统一初始化一个附件上传组件
	var taskId0,listAreaId0,fileIdsName0,seat0,frame0;
	taskId0 = ((typeof(taskId) == 'undefined' || taskId == null || taskId == '' || taskId == undefined) ? 'taskId' : taskId);
	listAreaId0 = ((typeof(listAreaId) == 'undefined' || listAreaId == null || listAreaId == '' || listAreaId == undefined) ? 'listArea1' : listAreaId);
	fileIdsName0 = ((typeof(fileIdsName) == 'undefined' || fileIdsName == null || fileIdsName == '' || fileIdsName == undefined) ? 'fileIds' : fileIdsName);
	seat0 = ((typeof(seat) == 'undefined' || seat == null || seat == '' || seat == undefined) ? 'before' : seat);
	frame0 = ((typeof(frame) == 'undefined' || frame == null || frame == '' || frame == undefined) ? '<div id="'+listAreaId0+'" class=" attachmentListArea clearfix"><ul class="attTitle clearfix"><li class="attName">文件</li><li  class="attTime">上传时间</li><li  class="attOperate">操作</li></ul></div>' : frame);
	var getinfourl0 = (typeof(getinfourl) != 'undefined' && getinfourl!='' ? getinfourl : undefined);
	var mu0 = ((typeof(frame) == 'undefined' || frame == null || frame == '' || frame == undefined) ? 'mu' : toolName);
	
	mu0 = new MultiUpload({
		'fatherDiv' : targetId,
		'moduleType' : moduleType,
		'incId' : incId,
		'count' : count,
		'taskId' : taskId0,
		'fileIdsName':fileIdsName0,
		'type' : type,
		'seat' : seat0,
		'frame' : frame0,
		'showFatherDivId' : listAreaId0,
		'buttonImageUrl' : imagesPath + '/demand_browse.gif',
		'buttonWidth' : '81',
		'buttonHeight' : '24',
		'buttonTextLeftPadding' : '0',
		'getinfourl' : getinfourl0,
		'showErrorMethod' : showErrorMethod,
		'showErrorMsgId' : showErrorMsgId
	});
	mu0.pageInit();
	$('#'+targetId+' .fj1,#'+targetId+' .fj2').wrapAll('<div class="orangeWrap clearfix"></div>');
	return mu0;
}
//根据文件后缀判断显示图片
function checkShowImg(fileName) {
	var suffixArray = fileName.split('.')
	var suffix = suffixArray[suffixArray.length-1];
	var imgName = '';
	if (suffix == 'txt' || suffix == 'bmp' || suffix == 'doc' || suffix == 'docx' || suffix == 'gif' || suffix == 'jpg' || suffix == 'pdf' || suffix == 'ppt' || suffix == 'pptx' || suffix == 'rar' || suffix == 'xls' || suffix == 'xlsx' || suffix == 'png' || suffix == 'zip') { // 详细文件类型图片没有收集齐
		imgName = suffix + '.gif';
	} else{
		imgName = 'doc.gif';
	}
	return imgName;
}

//定义附件列表
//file对象的属性：filestatus、id、index、name、post、size、type
function showLead(file, showFatherDivId) {
	//删除提示信息
	$('#'+showFatherDivId).parent().find('.errorStyle').remove();

	$('<div class="peopleInB_list" id="'+file.id+'_fatherDiv"><div class="peopleInB_Title peopleInB_CSV" id="'+file.id+'">'+ file.name +'</div><div id="progressbar01"></div><span class="peopleInB_Success"><div id="'+ file.id + '_div" class="waitUpload">待上传</div></span><div class="thisPro"></div></div>').appendTo($('#' + showFatherDivId));

	Utils.resetPopupWrap();
}

function showDiv(file, showFatherDivId) {
	//删除提示信息
	
	$('#'+showFatherDivId).parent().find('.errorStyle').remove();
	$('<ul class="attContent clearfix" id="'+file.id+'_fatherDiv">'
			+'<li class="attName textoverflow">' + file.name + '</li>'
			+'<li class="attTime">' + new Date().format("yyyy-MM-dd hh:mm") + '</li>'
			+'<li class="attOperate textoverflow"><div id="'+ file.id + '_div" class="waitUpload">待上传</div></li>'
			+'</ul>').appendTo($('#' + showFatherDivId));
	Utils.resetPopupWrap();
}
//移除附件，移除已经上传但没有保存的附件
function removeFile(fileId, fileName, id,fileIdsDiv) {
	var _s = uploaders_cache[fileIdsDiv];
	$.each(_s.files,function(i,o){
		if (o.name == fileName) {
			_s.removeFile(o);
			return false;
		}// 防止同名文件重复添加
	});
	$('#' + fileId + '_fatherDiv').remove();
	Utils.resetPopupWrap();
	$.ajax({
		url : dataPath + '/attachment/delete.json',
		data : 'fileId=' + id,
		dataType : 'json',
		cache : false,
		async : false,
		type : 'POST',
		success : function(data) {
			var fileIds = $('input[name=fileIds]').val();
			if(typeof(fileIds)!='undefined'){
				fileIds = fileIds.replace(id + ',', '');
				$('input[name=fileIds]').val(fileIds);
			}
		},
		error : function(){
			$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
		}	
	});
}

//选中附件复选框
function choseAllFile(obj) {
	$(':checkbox[name="fileName"]').attr("checked", obj.checked);
}
//下载附件
function download(ids, objName) {
    if(ids==undefined||ids==""){
    	ids="";
    	$(':checkbox[name="fileName"][checked]').each(function(i) {
    		ids += this.value + ",";
    	});	
    }
    if(objName==undefined||objName==null){
    	objName="";
    }
	if (ids.length > 0) {
		var request_url = contextPath + '/attachment/downloadFileSize.json';
		$.ajax({
			url : request_url,
			type:'get',
			async : false,
			data : "fileIds=" + ids + "&objName=" + objName,
			success : function(result) {
				var total = result.total;
				if (total > 1024 * 1024 * 1024) {
					jConfirm('文件超过1G,下载时间稍长,是否继续？', '提示', function(re) {
						if (re) {
							//window.open(contextPath + '/attachment/download?fileIds=' + ids + "&objName=" + objName);
							window.open(nginxRoot+ '/web/download?fileIds='+ ids + "&objName=" + objName);
						}
					});
				} else {
					//window.open(contextPath + '/attachment/download?fileIds=' + ids + "&objName=" + objName);
					window.open(nginxRoot+ '/web/download?fileIds='+ ids + "&objName=" + objName);
				}
			},
			error : function(result) {
				$.alerts._showMessage('系统忙请稍候再试！', '','','',2000);
			}
		});

	}else{
		$.alerts._showMessage("请先选择要下载的文件!","",'','',2000);
	}

}
function downloadFile(fileId) {
	fileId=fileId.replace(/^\s+|\s+$/g, '');
	if (fileId!=undefined&&fileId.length > 0) {
		var request_url = contextPath + '/attachment/downloadFileSize.json';
		$.ajax({
			url : request_url,
			type:'get',
			async : false,
			data : "fileIds=" + fileId,
			success : function(result) {
				var total = result.total;
				if (total > 1024 * 1024 * 1024) {
					jConfirm('文件超过1G,下载时间稍长,是否继续？', '提示', function(re) {
						if (re) {
							//window.open(contextPath + '/attachment/download?fileIds=' + ids);
							window.open(nginxRoot+ '/web/download?fileIds='+ fileId);
						}
					});
				} else {
					//window.open(contextPath + '/attachment/download?fileIds=' + fileId);
					window.open(nginxRoot+ '/web/download?fileIds='+ fileId);
				}
			},
			error : function(result) {
				$.alerts._showMessage('系统忙请稍候再试！', '','','',2000);
			}
		});

	}else{
		$.alerts._showMessage('请先选择要下载的文件！', '','','',2000);
	}
}

//修改时需要显示已经上传成功的附加列表
function initSuccessUploadFile(showFatherId,taskId) {
	var fid = $('#'+showFatherId).parent().attr('id');
	$.ajax({
		url : dataPath + '/attachment/getFiles.json',
		data : 'taskId=' + $('#'+taskId+'').val(),
		dataType : 'json',
		type : 'GET',
		cache : false,
		async : false,
		success : function(data) {
			var fileList = data.fileList;
			$.each(fileList,function(i, o) {
				$('<ul class="attContent clearfix" id="' + o.id +'_fatherDiv">'
					+'<li class="attName textoverflow js_name">' + o.fileTitle + '</li>'
					+'<li class="attTime">' + o.ctime.substring(0,16) + '</li>'
					+'<li class="attOperate textoverflow"><div id="'+ o.id + '_div" class="waitUpload"><a href="javascript:removeFile(\''
					+ o.id + '\',\'' + o.fileTitle + '\',\'' + o.id + '\',\''+fid+'\')">删除</a></li>'
					+'</ul>').appendTo($('#'+showFatherId));
			});
		}
	});
}

//显示详情页附件列表
function getFileList(){
	$.ajax({
		url : dataPath + '/attachment/getFiles.json',
		data : 'taskId=' + $('#taskId').val(),
		dataType : 'json',
		type : 'GET',
		cache : false,
		async : false,
		success : function(data) {
			var fileList = data.fileList;
			//alert(fileList.length )
			if(fileList.length > 0){
				$.each(fileList,function(i, o) {
				var imgName = checkShowImg(o.fileTitle);
				var size = parseInt(parseInt(o.fileSize)/1024);
	
				var fileStr ='<div class="clearfix fileDivStyle"><div class="fileCheck"><input type="checkbox" value="'+ o.id +'"  name="fileName" class="attCheckbox attL1" /></div><dl style="cursor:pointer;" class="clearfix" id="'+ o.id +'_fatherDiv" onclick = "downloadFile(\''+ o.id + '\')">'
						+'<dt><span><img src="'
						+ imagesPath
						+ '/'
						+ imgName
						+ '" /></span></dt><dd class="fileNameStyle" title ="'+  o.fileTitle +'">' + (Utils.getCharLen2(o.fileTitle) > 10 ? Utils.getSubstring3(o.fileTitle,12) : o.fileTitle) + '</dd><dd class="sizeTime">' + size +'KB' +'&nbsp;'+ o.ctime.substring(0,10)+'</dd></dl></div>';
				  $('#fileListDiv').append(fileStr);
				});
				$('.downLoadFile').show();
			}else{
				var fileStr ='<ul class="clearfix fl tl pt12"><li class="attName textoverflow fl">暂无相关资料</li></ul>';
				$('#fileListDiv').append(fileStr);
				$('.downLoadFile').hide();
			}
		}
	});
}
function commonUpload(targetId,pageType,moduleType,incId,count,type,taskId,listAreaId,toolName,fileIdsName,seat,frame,getinfourl,showErrorMethod,showErrorMsgId,callbak,lead){
	//统一初始化一个附件上传组件
	var taskId0,listAreaId0,fileIdsName0,seat0,frame0;
	taskId0 = ((typeof(taskId) == 'undefined' || taskId == null || taskId == '' || taskId == undefined) ? 'taskId' : taskId);
	listAreaId0 = ((typeof(listAreaId) == 'undefined' || listAreaId == null || listAreaId == '' || listAreaId == undefined) ? 'listArea1' : listAreaId);
	fileIdsName0 = ((typeof(fileIdsName) == 'undefined' || fileIdsName == null || fileIdsName == '' || fileIdsName == undefined) ? 'fileIds' : fileIdsName);
	seat0 = ((typeof(seat) == 'undefined' || seat == null || seat == '' || seat == undefined) ? 'before' : seat);
	frame0 = ((typeof(frame) == 'undefined' || frame == null || frame == '' || frame == undefined) ? '<div id="'+listAreaId0+'" class="attachmentListArea clearfix"><ul class="attTitle clearfix"><li class="attName">文件</li><li  class="attTime">上传时间</li><li  class="attOperate">操作</li></ul></div>' : frame);
	var getinfourl0 = (typeof(getinfourl) != 'undefined' && getinfourl!='' ? getinfourl : undefined);
	var mu0 = ((typeof(frame) == 'undefined' || frame == null || frame == '' || frame == undefined) ? 'mu' : toolName);
	var ext, size;//附件限制设置
	$.ajax({
		url : dataPath + '/inc/' + incId + '/attachment/'+ moduleType + '/list.json',
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
	ext = (typeof(ext) == 'undefined' ? '' : ext.replace(/\*\./g,""));
	if(ext.charAt(0) ==';'){
		ext = ext.substring(1);
	}
	if(ext.charAt(ext.length-1) ==';'){
		ext = ext.substring(0,ext.length-1);
	}
	ext = ext.replace(/;/g,",");
	
	
	var fd = $('#'+targetId);//附件输出区域
	var fdInnerHtml = [];
	fd.empty();//清空区域
	var fi = $('input[name='+fileIdsName0+']');//获取id输出框
	if(fi.size()==0){//如果没有id输出框就创建一个
//		fdInnerHtml.push('<input type="text" value="" name="');
//		fdInnerHtml.push(fileIdsName0);
//		fdInnerHtml.push('" id="');
//		fdInnerHtml.push(targetId);
//		fdInnerHtml.push('_fileIds" style="display:none;"/>');
		fi = $('<input type="text" value="" name="'+fileIdsName0+'" id="'+targetId+'_fileIds" style="display:none;"/>').appendTo(fd);
	}
	
	//输出已有附件的列表
	try{

		//判断是否是导入导出页面上传
		if(lead !== 'lead'){
			if (seat0 == 'before') {
				fdInnerHtml.push(frame0);
			}
			fdInnerHtml.push('<div class="orangeWrap clearfix"><div class="attachmentButtonArea fj1"><span class="fj-span"><a id="');
			fdInnerHtml.push(targetId);
			fdInnerHtml.push('_addFilesButton" class="divAddFiles" href="javascript:">+添加附件</a></span>&nbsp;</div>');
			fdInnerHtml.push('<div class="fj2"><div id="attachmentErrorMSG" class="attachmentErrorMSG" style="display:none;color:red;"></div><div class="fileTypeInfo w500" id="showFileTypeL">附件大小不超过');
			fdInnerHtml.push(size);
			fdInnerHtml.push(' MB，支持<a href="javascript:void(0)" onclick="$(this).replaceWith(\'');
			fdInnerHtml.push(ext);
			fdInnerHtml.push('\');">这些格式</a>文件。</div></div></div>');
			if (seat0 == 'after') {
				fdInnerHtml.push(frame0);
			}
			fd.append(fdInnerHtml.join(''));
		}else{
			fdInnerHtml.push('<div class="orangeWrap clearfix"><div class="attachmentButtonArea fj1" id="leadDiv"><span class="fj-span"><a id="');
			fdInnerHtml.push(targetId);
			fdInnerHtml.push('_addFilesButton" class="leadSty" href="javascript:">+添加附件</a></span></div>');
			fdInnerHtml.push('&nbsp;<span class="proIfo">一次最多上传<span>100</span>个csv文件 ,超出100自动移除末尾文件</span></div>');
			fd.append(fdInnerHtml.join(''));
		}
		
		
		
		if(typeof(plupload) == "undefined"){
			$.getScript(scriptsPath +'/plupload/plupload.full.min.js',function(){
				var btn = targetId+'_addFilesButton';
				$.getScript(scriptsPath +'/plupload/i18n/zh_CN.js');
				if(lead !== 'lead'){
					pluploadInit(targetId,btn,count,ext, size,listAreaId0,taskId0,fi);
				}else{
					pluploadInit(targetId,btn,count,ext, size,listAreaId0,taskId0,fi,lead);
				}
				if (typeof (initSuccessUploadFile) == "function" && targetId != 'letterAttListArea') {
					initSuccessUploadFile(listAreaId0,taskId0);
				}
			});
		}else{
			if(lead !== 'lead'){
				pluploadInit(targetId,targetId+'_addFilesButton',count,ext, size,listAreaId0,taskId0,fi);
			}else{
				pluploadInit(targetId,targetId+'_addFilesButton',count,ext, size,listAreaId0,taskId0,fi,lead);
			}
			
			if (typeof (initSuccessUploadFile) == "function" && targetId != 'letterAttListArea') {
				initSuccessUploadFile(listAreaId0,taskId0);
			}
		}
	}catch(err){
		txt="此页面存在一个错误。\n\n";
		txt+="错误描述: " + err.description + "\n\n";
		txt+="点击OK继续。\n\n";
		alert(txt);
	}
}
function utf8_decode( str_data ) {
    // Converts a UTF-8 encoded string to ISO-8859-1 
    //
    // version: 1009.2513
    // discuss at: http://phpjs.org/functions/utf8_decode
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // +      input by: Aman Gupta
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Norman "zEh" Fuchs
    // +   bugfixed by: hitwork
    // +   bugfixed by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: utf8_decode('Kevin van Zonneveld');
    // *     returns 1: 'Kevin van Zonneveld'
    var tmp_arr = [], i = 0, ac = 0, c1 = 0, c2 = 0, c3 = 0;
     
    str_data += '';
     
    while ( i < str_data.length ) {
        c1 = str_data.charCodeAt(i);
        if (c1 < 128) {
            tmp_arr[ac++] = String.fromCharCode(c1);
            i++;
        } else if ((c1 > 191) && (c1 < 224)) {
            c2 = str_data.charCodeAt(i+1);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = str_data.charCodeAt(i+1);
            c3 = str_data.charCodeAt(i+2);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
  
    return tmp_arr.join('');
}

//所有的上传控件集合
var uploaders_cache={};
/**
 * 初始化上传控件
 * @param container 整个上传区域id,包含附件列表和上传按钮
 * @param btnId 按钮id
 * @param count 限制文件个数
 * @param ext 限制文件后缀
 * @param size 限制文件大小
 * @param listAreaId0 附件列表区域id
 * @param taskId0 
 * @param idsInut id输出框
 */
function pluploadInit(container,btnId,count,ext, size,listAreaId0,taskId0,idsInut,lead){
	var fatherDiv = $('#'+container);
	var uploader = new plupload.Uploader({
		  browse_button: btnId, // this can be an id of a DOM element or the DOM element itself
		  url: nginxRoot + '/web/upload',
		  runtimes : 'html5,flash,html4',
		  filters : {
				// 每个文件的限制大小
			    max_file_size : size+'mb',
				prevent_duplicates: true,//防止重复
				// 可以选择的文件
				mime_types: [
					//{title : "Image files", extensions : "jpg,gif,png"},
					//{title : "Zip files", extensions : "zip"},
					{title : "All files", extensions : ext}
				]
			},

			flash_swf_url : contextPath+'/resources/plupload/Moxie.swf',
			file_data_name : 'filedata',//附件data域名字
//			multipart : false,
			multipart_params : {
				'uid' : currentUser.id,
				'sid' : _cookid,
				'sessionId' : _cookid,
				'taskId' : $('#'+taskId0).val()
			}// 随文件上传一同向上传接收程序提交的Post数据
		});
		uploader.init();
		//添加一个文件时执行事件
		uploader.bind('FilesAdded', function(up, files) {
		  //var tooMuch = false;
			var dup_names = '';
//			$.each(up.files,function(i,o){
//				if(!Utils.isChinese2(o.name)){
//					up.files[i].name = utf8_decode(o.name);
//				}
//			});
//			files = up.files;
		  plupload.each(files, function(file) {
			  if(!Utils.isChinese2(file.name)){
				  file.name = utf8_decode(file.name);
				}
//			  if(!tooMuch){// TODO 校验数量限制
//				  plupload.removeFile(file);
//			  }else{
//				  var total = $('#'+container+' .attachmentListArea').children().length;
//				  if()
//			  }
			  var dup = false;
			  //校验重复上传
			  //console.log($(".peopleInB_Success").length);
			  if($(".peopleInB_Success").length>count){
				  jAlert("上传文件超过限制");
				  return;
			  }
			$('a',fatherDiv).each(function(){
				if($(this).text()==file.name){
					dup = true;
					uploader.removeFile(file);
				}
			});
			$('.js_name',fatherDiv).each(function(){
				  if($(this).text()==file.name){
					  dup = true;
					  uploader.removeFile(file);
				  }
			});
			if(!dup){
				if(lead !== 'lead'){
					showDiv(file,listAreaId0);
					if(fatherDiv.find('.attachError')){
						fatherDiv.find('.attachError').remove();
					}
				}else{
					showLead(file,listAreaId0);
				}			
			}else{
				dup_names+='、'+file.name;
			}
		  });
		  if(dup_names!=''){
				dup_names = dup_names.substr(1);
				showErrorMsg(dup_names+' 文件已经存在，请勿重复上传  或者修改文件名称之后再次尝试');
			}else{
				this.start();//文件添加完毕之后自动开始上传
				this.disableBrowse(true);
			}
		  //console.log('FilesAdded');
		});
		uploader.bind('FilesRemoved', function(up, files) {//文件开始上传
//			console.log('FilesRemoved');
//			console.log(up.state);
			if(up.state == plupload.STOPPED){
				this.disableBrowse(false);
			}
		});
		uploader.bind('UploadFile', function(up, file) {//文件开始上传
			//console.log('UploadFile');
			$('input[type="submit"]').attr('disabled','disabled');
			// setFileState(file.id, '上传中…');
			$('#' + file.id + '_div').text("");
			if(lead !== 'lead'){
				$('<div class="fj-jdt-div"><div class="jdt-div"></div></div><span id="' + file.id + '_span"></span>').appendTo($('#' + file.id + '_div'));
			}else{
				$('<div class="fj-jdt-div1"><div class="jdt-div1"></div></div><span id="' + file.id + '_span"></span>').appendTo($('#' + file.id + '_div'));
			}
		});
		uploader.bind('UploadProgress', function(up, file) {//上传进度
			//console.log('UploadProgress');
			var percent = file.percent;
			//console.log(file);
			percent = (percent >100 ? 100 : percent);
			$('#' + file.id + '_span').text(percent + '% ');
			$('#' + file.id + '_div div div').css('width', percent + '%');
			if(percent == 100){
				$('input[type="submit"]').removeAttr('disabled');
			}
		});
		uploader.bind('FileUploaded', function(up, file, info) {//上传一个文件完毕
			//console.log('FileUploaded');
			var data = $.parseJSON(info.response);
			var fileIdsDiv = idsInut;
			var fileIds = fileIdsDiv.val();
			fileIds += data.id + ',';
			fileIdsDiv.val(fileIds);
			$('#' + file.id + '_div').empty();

			if(lead !== 'lead'){
				$('<a href="javascript:void(0);">删除</a>').bind('click',{
						'file' : file,
						'id' : data.id,
						'obj':this
					},function(event) {
//						removeFileDiv(event.data.file.id,event.data.file.name, event.data.id,event.data.obj,fileIdsDiv);
						removeFile(event.data.file.id , event.data.file.name , event.data.id,container);
					}).appendTo($('#' + file.id + '_div'));
			}else{
				$('<div class="peopleInB_listGB"></div>').on('click',{
					'file' : file,
					'id' : data.id,
					'obj':this
				},function(event) {
//					removeFileDiv(event.data.file.id,event.data.file.name, event.data.id,event.data.obj,fileIdsDiv);
					removeFile(event.data.file.id , event.data.file.name , event.data.id,container);
				}).appendTo($('#' + file.id + '_div').parent().parent());
			}
			

			$('#' + file.id).click(function() {
				downloadFile('' + data.id);
			});
			$('#'+file.id+'_fatherDiv').attr('fid',data.id); 
		});
		uploader.bind('UploadComplete', function(up, files) {//上传一个文件完毕
			//console.log('UploadComplete');
			this.disableBrowse(false);
		});
		uploader.bind('Error', function(up, err) {
			//console.log(err);
			showErrorMsg(err.message);
		});
		uploaders_cache[container] = uploader;
		/**
		 * 移除一个文件
		 * @param fileId 文件id
		 * @param fileName 文件名字
		 * @param id server端文件id
		 * @param obj 
		 * @param fileIdsDiv 文件id输出框
		 */
		function removeFileDiv(fileId, fileName, id,obj,fileIdsDiv) {
			var _s = uploaders_cache['card_create_file_div']
			for ( var i in _s.customSettings.fileQueue) {
				if (_s.customSettings.fileQueue[i].name == fileName) {
					_s.cancelUpload(fileId);
					_s.customSettings.fileQueue.splice(i, 1);
					break;
				}// 防止同名文件重复添加
			}
			$('#' + fileId + '_fatherDiv').remove();
			$.ajax({
				url : dataPath + '/attachment/delete.json',
				data : 'fileId=' + id,
				dataType : 'json',
				cache : false,
				async : false,
				type : 'POST',
				success : function(data) {
					var fileIds = fileIdsDiv.val();
					if(typeof(fileIds)!='undefined'){
						fileIds = fileIds.replace(id + ',', '');
						fileIdsDiv.val(fileIds);
					}
					Utils.resetPopupWrap();
				}
			});
		}
		function showErrorMsg(msg){
			$.alerts._showMessage(msg, '','','', 2000);
		}
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
